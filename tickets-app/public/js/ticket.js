var socket = io();

let btnNewTicket = $("#btnGenerateTicket"),
    lblCurrentTicket = $("#lblCurrentTicket");

socket.on('connect', function() {

    console.log('Connection successfull!');
});

btnNewTicket.on('click', function() {

    socket.emit('next', null, function(response) {

        if (response.ok) {
            lblCurrentTicket.html(response.ticket);
        }
    });
});