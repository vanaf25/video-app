import React, {useContext} from 'react';
import {Button} from 'antd'
import {SocketContext} from '../../socket/socket'
const Notifications = () => {
    const {answerCall,call,callAccepted}=useContext(SocketContext)
    const context=useContext(SocketContext);
    console.log(context)
    return (
        <>
            {call?.isReceivedCall && !callAccepted && <div style={{display:"flex",justifyContent:"center"}}>
                <h2>   {call.name} is calling    </h2>
                <Button onClick={answerCall} type={"primary"}>Answer</Button>
            </div>}
        </>
    );
};

export default Notifications;
