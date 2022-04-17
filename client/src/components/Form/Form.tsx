import React, {ChangeEventHandler, useContext, useState} from 'react';
import {Button, Form,Input, Row } from 'antd';
import classes from './Form.module.css'
import {SocketContext} from "../../socket/socket";
import {ACTIONS} from "../../socket/actions";
import set = Reflect.set;
import Notifications from "../Notifiactions/Notifications";
const FormComponent = () => {
    const {me,name,callUser,callEnded,leaveACall,callAccepted,setName}=useContext(SocketContext)
    const [idToCall,setIdToCall]=useState('')
    return (
        <div className={classes.form}>
            <Form style={{marginBottom:20}}>
                <Row justify={"space-between"}>

                    <Form.Item style={{margin:"0 0 0 0"}}  name={"name"}>
                        <h2>Account Info</h2>
                        <Input value={name} onChange={(e:any)=>setName(e.target.value)} placeholder={"Your name"} style={{marginBottom:10}}/>
                        <Button onClick={()=>navigator.clipboard.writeText(me)}  style={{width:"100%"}} type={"primary"}>Copy your Id</Button>
                    </Form.Item>
                    <Form.Item style={{margin:"0 0 0 0"}}  name={"name"}>
                        <h2>Make a call</h2>
                        <Input onChange={(e:any)=>setIdToCall(e.target.value)} placeholder={'Id to call'} style={{marginBottom:10}} />
                        {callAccepted && !callEnded ?
                            <Button onClick={leaveACall} style={{width:"100%"}} type={"primary"}>Hang up</Button>:
                            <Button onClick={()=>callUser(idToCall)}  style={{width:"100%"}} type={"primary"}>Call</Button>
                        }
                    </Form.Item>
                </Row>
            </Form>
            <Notifications/>
        </div>
    );
};

export default FormComponent;
