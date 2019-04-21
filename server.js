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
queue =[];
user=-1;
room =0;
var roomID;
x=1
function client(socket,x){
      if(x==1 || queue.length==0){
        user++;
        if(user%2==0){
            room++;
            socket.join(room)  
            console.log("abc")
            socket.roomID = room;
        }
        else{
            socket.join(room)
            socket.roomID = room;
        }
        socket.emit('connectToRoom',room)
    }
    if(x==0){
        if(queue.length!=0){
            var roomID = queue.shift();
            socket.join(roomID)
            console.log(roomID)
            socket.emit('connectToRoom',roomID)
            x=1;
        }
    }
}


//jo kaam hai wo is may hai after connection is established.
io.on('connection', function(socket){
    
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
    client(socket,x);
    
    



    socket.on('disconnect',function(data){
        roomID = socket.roomID;
        queue.push(roomID)
        console.log(roomID)
        x=0;
        console.log("hhhhhh")
        user--;
        //client(socket,x)
                   
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets connected', connections.length);
        })
    
       


        socket.on('send message',function(data,room){
            console.log(room);
            //msg mil gya server ko, then sending back to all the connected clients in the room.
            io.in(room).emit('new message',data,room); //agar room hata doon tou msg display hojatay hain
            
        })    
    
       
    });
