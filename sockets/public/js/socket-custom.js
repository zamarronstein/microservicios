var socket = io();

socket.on('connect', function () {
    console.log('Conectado al servidor!');
});

socket.on('disconnect', function () {
    console.log('Server is out!');
});

socket.emit('msg', {
    //user: 'Zama',
    msg: 'Que tal!'
}, function (response) { // Call back function sent to server

    console.log(response);
});

socket.on('msg', function (data) {
    console.log('Server: ', data);
});
