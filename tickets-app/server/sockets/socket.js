const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

let ticket_control = new TicketControl();

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
            msg: 'Ticket generated!',
            ticket: ticket_control.getLastTicket()
        });

    });

    client.on('attend', (desk, callback) => {


        let attended = ticket_control.attend(desk);

        callback(attended);
        client.broadcast.emit('update', attended);
    });

});