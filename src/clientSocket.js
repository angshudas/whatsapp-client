/*

  1. connecting client and server
    client : 
    const socket = io( url );
    socket.on('connect',()=>{
      // what do on connect
    });

    server: 
    const io = require('socket-io')(3000,{
      cors : {
        origin : [ array of origins ],
      }
    });

    io.on('connection',socket=>{
      console.log(socket.id);
    })
  
  2. emit -> catch 
    can also send a callback function with params but have to be last parameter
    socket.emit( 'custom-event', params,fun );

    socket.on('custom-event',(param,cb)=>{
        
      cb();
    })

  3. broadcast from server
   socket.broadcast.emit('',params); --> to all users other than the current user
   socket.to(roomId).emit('',params); --> to all users having the socket.id == roomId

  4. join a room 
    client : 
    socket.emit('join-room',room);

    server : 
    socket.on('join-room',room=>{
      socket.join(room);
    })


*/