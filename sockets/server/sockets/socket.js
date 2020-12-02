const {io} = require('../server');

io.on('connection', (client) => {

    // send messages to client
    client.emit('msg', {
        user: 'Admin',
        msg: 'Welcome!'
    });

    client.on('disconnect', () => {
        console.log('Client disconnected!');
    });

    // Listen messages from client
    client.on('msg', (data, callback) => { // callback function to return a response to the client

        client.broadcast.emit('msg', data);

        /* Server - client, one to one
        console.log(data);

        if (data.user) {
            callback('All its Ok!');
        } else {
            callback('All its Wrong!!!!!!');
        }
        */
    });
});