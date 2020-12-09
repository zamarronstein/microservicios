var socket = io();

let params = new URLSearchParams(window.location.search);

if (!params.has('name')) {
    //throw new Error('Name is required!');
    window.location.href = 'index.html';
}

let name = params.get('name');

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enter', {name}, (response) => {

        console.log(response);
    });
});

socket.on('updateUsersList', function (users) {
    console.log('updateUsersList', users);
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');
});

socket.on('messages', function(message) {
    console.log(message);
});