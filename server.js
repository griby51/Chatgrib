var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    
    console.log('Utilisateur(s) connecté(s) : ');
    socket.on('disconnect', function (){
        var user_connected = user_connected - 1;
        console.log('Utilisateur(s) déconnecté(s) : ');
    })
    socket.on('chat message', function (msg){
        console.log(msg);
        io.emit('chat message', msg);
    })

})

http.listen(3000, function(){
    console.log("Server running on 3000")
})
