const socket = io();

socket.on('connect', function () {
    console.log(`Connected to server.`);

    socket.emit('createMessage', {
        to: 'test@users.com',
        text: 'Hunch, hunch!',
        from: 'firefox@bestcurrentbrowser.net'
    });
});

socket.on('disconnect', function () {
    console.log(`Disconnected from server.`);
});

socket.on('newMessage', function (message) {
    console.log('New Message: ', message);
});
