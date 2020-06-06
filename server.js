const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./util/messages.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server)

// chatbot name
let chatBot = 'Chat Bot';

// Set static folder
app.use(express.static(path.join(__dirname, 'client')));

// Run when a client connects
io.on('connection', socket => {

    // listen for when a user has joined chat room
    socket.on('join_room', ({userName, room}) => {

        socket.emit('message', formatMessage(chatBot, `Welcome to The Chat App ${userName}!`));

        // Bradcast when a user connects - broadcast.emit will send a message to all users EXCEPT the user that has just connected
        socket.broadcast.emit('message', formatMessage(chatBot, `${userName} has joined the chatroom!`));
    });

    // listen for incoming chat message from client
    socket.on('chat_message', chat_message => {
        // io.emit will send a message to ALL users that are connected
        io.emit('message', formatMessage(chat_message.userName, chat_message.message));
    });

    // Run when client disconnects
    socket.on('disconnect', (data) => {
        // io.emit will send a message to ALL users that are connected
        io.emit('message', formatMessage(chatBot, `${data.userName} has left the chatroom :(`)); // THIS IS CURRENTLY BROKEN - USERNAME IS UNDEFINED
        console.log(data);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});