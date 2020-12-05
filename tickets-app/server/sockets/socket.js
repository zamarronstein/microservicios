const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

let ticket_control = new TicketControl();

console.log(ticket_control);

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });


    client.on('next', (data, callback) => {

        console.log("*** next!");
        try {

            ticket_control.next();
        } catch (exception) {

            callback({
                ok: false,
                msg: exception
            });
        }

        callback({
            ok: true,
            msg: 'Ticket generated!'
        });

    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback) => {

        console.log(data);

        client.broadcast.emit('enviarMensaje', data);


        // if (mensaje.usuario) {
        //     callback({
        //         resp: 'TODO SALIO BIEN!'
        //     });

        // } else {
        //     callback({
        //         resp: 'TODO SALIO MAL!!!!!!!!'
        //     });
        // }



    });

});