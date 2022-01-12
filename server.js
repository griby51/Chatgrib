const fs = require('fs')

//------------Lowdb--------------
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const dbdb = new FileSync("db.json")
const db = low(dbdb)

db.defaults({message: [], user: []}).write()

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    
    console.log('User connected');
    socket.on('disconnect', function (){
        console.log('User disconnected');
    })
    socket.on('chat message', function (msg){
        console.log(msg);
        io.emit('chat message', msg);
    })

    socket.on('log', function(log){
        db.get("message").push(log).write();
    })
    

})

http.listen(3000, function(){
    console.log("Server running on 3000")
})
