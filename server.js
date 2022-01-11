var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    
    console.log('Un utilisateur s\'est connecté');
    socket.on('disconnect', function (){
        var user_connected = user_connected - 1;
        console.log('Un utilisateur s\'est déconnecté');
    })
    socket.on('chat message', function (msg){
        console.log(msg);
        io.emit('chat message', msg);
    })

})

http.listen(3000, function(){
    console.log("Server running on 3000")
})
