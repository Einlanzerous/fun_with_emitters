const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected`);

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required!');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit(
      'newMessage',
      generateMessage('Server', `Welcome to ChatLand: ${params.room}`)
    );
    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Server', `${params.name} has Joined`)
      );

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log(`createMessage\n`, message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('GPS', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Server', `${user.name} has left the room`)
      );
    }

    console.log(`User disconnected`);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
