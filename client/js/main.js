// Initializing the socket
const socket = io();

// Chat form element
let chatForm = document.querySelector('#chat-form');
// Chat room name
let room = document.querySelector('#room-name');

// Get user name and room name from query string params
const getName_getRoom = () => {
    // get query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); 

    // get user name
    let userName= urlParams.get('username');
    userName = userName.charAt(0).toUpperCase() + userName.slice(1);
    // get room name
    const roomName = urlParams.get('room');

    return {
        userName,
        roomName
    };
};

// When a user has joined a chat room, send user name & room name to server
socket.emit('join_room', {userName: getName_getRoom().userName, room: getName_getRoom().roomName});

// Change the displayed room name to match the room that was selected
room.innerHTML = getName_getRoom().roomName;

// When a user has left a chat room
socket.emit('disconnect', {userName: getName_getRoom().userName});

// Message from server
socket.on('message', chat_message => {
    printMessage(chat_message.userName, chat_message.message);
});

// Message submit in chat
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text
    let chatMessage = event.target.elements.msg.value;

    // get user name
    const userName = getName_getRoom().userName;
    
    // Emitting the message to the server
    socket.emit('chat_message', {userName: userName, message: chatMessage});

    // Clear input field after message has sent - focus on input field
    event.target.elements.msg.value = '';
    event.target.elements.msg.focus();

});

// Output message to DOM
const printMessage = (userName, message) => {

    // time the message was sent
    const messageSendTime = getTime();

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<p class="meta">${userName} <span>${messageSendTime}</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(messageDiv);
};

// get & format time - toLocaleString
const getTime = () => {
    var date = new Date();

    return date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
};