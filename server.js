var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
const users = {};


app.use(express.static(__dirname + '/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log("a user connected")
    socket.on('new-user', (name) => {
        console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-message', name);
        /* io.emit('user-connected', name); */
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('chat-message', users[socket.id] + ' has disconnected');
        delete users[socket.id];
    });

    socket.on('send-chat-message', (msg) => {
        io.emit('chat-message', {message: msg, name: users[socket.id]});
    });
})

server.listen(3000, () => {
    console.log('listening on *:3000');
})