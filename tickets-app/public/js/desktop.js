var socket = io();
var btnAttend = $("#btnAttend"),
    spanAttended = $("#spanAttended");

socket.on('connect', function () {

    console.log('Connection successfull!');
});


btnAttend.on('click', function () {

    const params = new URLSearchParams(window.location.search);

    if (params) {

        const desk = params.get('escritorio');

        socket.emit('attend', desk, function (response) {

            if (response.ok) {
                spanAttended.html(response.attended);
            } else {

                spanAttended.html('Ninguno');
            }
        });
    }
});