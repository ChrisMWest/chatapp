var socket = io('http://localhost:3000');
const messageToBeSent = document.getElementById('send-container');
const messageElement = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const userContainer = document.getElementById('user-container');


const name = prompt('What is your nickname?');
appendMessage("You connected");
socket.emit('new-user', name);

socket.on('chat-message', data => {
    appendMessage(data.name + ": " + data.message);
});

socket.on('user-message', name=> {
    appendMessage(name + ' has connected');
});

socket.on('user-connected', name => {
    appendUser(name);
})

messageToBeSent.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageElement.value;
    socket.emit('send-chat-message', message);
    messageElement.value = '';
});

function appendUser(name){
    const username = document.createElement('div');
    username.innerText = name;
    userContainer.append(username);
}

function removeUser(name){

}

function appendMessage(msg){
    const message = document.createElement('div');
    message.innerText = msg;
    messageContainer.append(message);
}