const app=require("express")()
const server=require("http").createServer(app);
const cors=require("cors")
const io=require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
const ACTIONS={
    ME:"me",
    DISCONNECT:"disconnect",
    CALLUSER:"calluser",
    ANSWERCALL:"ANSWERCALL"
}
app.use(cors())
const PORT=process.env.PORT || 5000
app.get("/",(req,res)=>{
    res.send('server is running')
})
io.on("connection",(socket)=>{
    console.log("socket connected");
    socket.emit(ACTIONS.ME,socket.id)
    socket.on(ACTIONS.DISCONNECT,()=>{
        socket.broadcast.emit("callended")

    })
    socket.on(ACTIONS.CALLUSER,({userToCall,signalData,from,name})=>{
    io.to(userToCall).emit(ACTIONS.CALLUSER,{signal:signalData,from,name})
    })
    socket.on(ACTIONS.ANSWERCALL,(data,)=>{
        io.to(data.to).emit("callacepted",data.signal)
    })
})
server.listen(PORT,()=>console.log(`server listening on port ${PORT} `))

