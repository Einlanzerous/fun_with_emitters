const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected`);

    socket.emit('newMessage', generateMessage('Server', 'Welcome to the Chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Server', 'New User has Joined'));

    socket.on('createMessage', (message, callback) => {
        console.log(`createMessage\n`, message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('GPS', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected`);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

