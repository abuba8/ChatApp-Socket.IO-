var express = require('express');
var app=express();
var http = require('http').Server(app);
//creating a socket.
var io = require('socket.io')(http);
users = [];
//to keep a check on connected and disconnected users.
connections = [];


http.listen(3000, function() {
    console.log('listening to server 3000');
});


app.get('/', function(req, res) {
    res.sendfile('client.html');
});


user=-1;
room =0;


//jo kaam hai wo is may hai after connection is established.
io.on('connection', function(socket){
    
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    
        
        user++;
        if(user%2==0){
            room++;
            socket.join(room)
            
        }
        else{
            socket.join(room)
        }
        socket.emit('connectToRoom',room)

   

    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1);
        
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    
    socket.on('send message',function(data,room){
        console.log(room);
        //msg mil gya server ko, then sending back to all the connected clients in the room.
        io.in(room).emit('new message',data,room); //agar room hata doon tou msg display hojatay hain
        
    })    

    //jani wtf?  
});

