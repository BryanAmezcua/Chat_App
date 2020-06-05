const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Run when a client connects
io.on('connection', socket => {
    // Welcome a user who has connected
    socket.emit('message', 'Welcome to Chat App');

    // Bradcast when a user connects - broadcast.emit will send a message to all users EXCEPT the user that has just connected
    socket.broadcast.emit('message', 'A user has joined the chat');

    // Run when client disconnects
    socket.on('disconnect', () => {
        // io.emit will send a message to ALL users that are connected
        io.emit('message', 'A user has left the chat');
    });

    // listen for incoming chat message from client
    socket.on('chat_message', chatMessage => {
        io.emit('message', chatMessage);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});