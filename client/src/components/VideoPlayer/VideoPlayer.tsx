import React, {useContext, useEffect, useRef} from 'react';
import classes from './VideoPlayer.module.css'
import {SocketContext} from '../../socket/socket'
import {ACTIONS} from "../../socket/actions";
import {Row,Col} from 'antd'
const VideoPlayer = () => {
    const {name,dispatch,callAccepted,callEnded,userVideo,call}=useContext(SocketContext)
    const myVideo=useRef<any>()

    useEffect(()=>{
        let navigator:any=window.navigator
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if(navigator.getUserMedia) {
            const  handleVideo=(currentStream:any)=>{
                dispatch(
                    {type:ACTIONS.SET_CURRENT_STREAM,payload:currentStream})
                if (myVideo.current){
                    myVideo.current.srcObject=currentStream
                    myVideo.current.play()
                }

            }
            const videoError=(e:any)=>{

            }
            navigator.getUserMedia({video:true,audio:false},handleVideo,videoError)

        }
    },[])
    return (
        <>
            <div className={classes.videoContainer}>
                <h2>{name || "Name"}</h2>
                <video ref={myVideo} controls={false}  autoPlay={true}></video>
            </div>
            {callAccepted && !callEnded &&
            <div className={classes.videoContainer}>
                <h2>{call.name || "Name"}</h2>
                <video ref={userVideo} controls={false}  autoPlay={true}></video>
            </div>}

        </>
    );
};

export default VideoPlayer;
