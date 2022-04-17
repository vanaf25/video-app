import React, {useEffect, useReducer, useRef} from 'react'
import {io} from 'socket.io-client'
import {ACTIONS} from "./actions"
import Peer from 'simple-peer';
const options={
    "force new connection":true,
     reconnectionAttemptsInfinity:"INFINITY",
    timeout:10000,
    transports:["websocket"]

}
const initialState={
    name:"",
    me:'',
    call:null as any,
    callAccepted:false,
    callEnded:null as any,
    currentStream:null as any
}
interface ActionType{
    type:string,
    payload:any
}
const reducer=(state=initialState,action:ActionType)=>{
switch (action.type) {
    case ACTIONS.ME:{
        return {...state,me:action.payload}
    }
    case ACTIONS.CALLUSER:{
        return {...state,call:action.payload}
    }
    case ACTIONS.SET_CURRENT_STREAM:{
        typeof action.payload==="string" && console.log(action.payload);
      return {...state,currentStream: action.payload}
    }
    case ACTIONS.SET_CALL_ACCEPTED:{
        return {...state,callAccepted:action.payload}
    }
    case ACTIONS.SET_NAME:{
            return {...state,name:action.payload}
    }
    case ACTIONS.DISCONNECT:{
        return {...state,callEnded:action.payload}
    }

}
}
export const SocketContext=React.createContext(initialState as any);
const socket=io('http://localhost:5000',options);
export const   ContextProvider:React.FC<{children:React.ReactNode}>=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    const userVideo=useRef<any>();
    const connectionRef=useRef<any>()
    useEffect(()=>{
        socket.on(ACTIONS.ME,(id)=>dispatch({type:ACTIONS.ME,payload:id}))
        socket.on(ACTIONS.CALLUSER,({from,name,signal})=>{
            dispatch({type:ACTIONS.CALLUSER,payload:{isReceivedCall:true,from,name,signal}})
        })

    },[])
    const answerCall=()=>{
        dispatch({type:ACTIONS.SET_CALL_ACCEPTED,payload:true});
        const peer=new Peer({initiator:false,trickle:false,stream:state?.currentStream})
        peer.on("signal",(data)=>{
            socket.emit(ACTIONS.ANSWERCALL,{
                signal:data,
                to:state?.call.from
            })
        })
        peer.on("stream",(currentStream)=>{
            if (userVideo.current){
                userVideo.current.srcObject=currentStream
            }
        })
        peer.signal(state?.call?.signal);
    }
    const callUser=(id:string)=>{
        const peer=new Peer({initiator:true,trickle:false,stream:state?.currentStream})
        peer.on("signal",(data)=>{
            socket.emit(ACTIONS.CALLUSER,{
                userToCall:id,
                signalData:data,
                from:state?.me,
                name:state?.name
            })
        })
        peer.on("stream",(currentStream)=>{
            if (userVideo.current){
                userVideo.current.srcOject=currentStream
            }
        })
        socket.on(ACTIONS.CALLACEPTED,(signal)=>{
            peer.signal(signal)
        })
        connectionRef.current=peer
    }
    const leaveACall=()=>{
        dispatch({type:ACTIONS.DISCONNECT,payload:true})
        connectionRef.current.destroy()
        window.location.reload()
    }
    const setName=(name:string)=>{
        dispatch({type:ACTIONS.SET_NAME,payload:name})
    }
    console.log(children)
return (
    <SocketContext.Provider value={{
        ...state,
        leaveACall,
        callUser,
        answerCall,
        userVideo,
        connectionRef,
        dispatch,
        setName
    }}>
        {children}
    </SocketContext.Provider>
)
}

export default socket
