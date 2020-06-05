// Chat form element
let chatForm = document.querySelector('#chat-form');
// Initializing the socket
const socket = io();

// Message from server
socket.on('message', data => {
    console.log(data);
    printMessage(data);
});

// Message submit
chatForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get message text
    let chatMessage = event.target.elements.msg.value;
    
    // Emitting the message to the server
    socket.emit('chat_message', chatMessage);
    event.target.elements.msg.value = '';

});

// Output message to DOM
const printMessage = (message) => {

    // get user name
    const userName = getUserName();

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

const getUserName = () => {
    // get query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); 

    // get user name from urlParams
    const userName = urlParams.get('username');
    return userName;
};