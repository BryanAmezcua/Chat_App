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
    console.log('A user has connected');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});