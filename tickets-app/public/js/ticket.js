var socket = io();

let btnNewTicket = $("#btnGenerateTicket");

socket.on('connect', function() {

    console.log('Connection successfull!');
});

btnNewTicket.on('click', function() {

    socket.emit('next', null, function(response) {

        console.log(response);
    });
});