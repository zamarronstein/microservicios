const { io } = require('../server');
const {Users} = require('../../classes/users');
let users = new Users();
const {message} = require('../utils/message');


io.on('connection', (client) => {

    client.on('enter', (user, callback) => {

        if (!user.name) {
            return callback({
                ok: false,
                msg: 'Name of the user is required!'
            });
        }

        let connectedUsers = users.addPerson({
            id: client.id,
            name: user.name
        });

        client.broadcast.emit('updateUsersList', users.getPeople());

        return callback({
            ok: true,
            connectedUsers
        });
    });

    client.on('messages', (_message) => {

        let person = users.getPerson(client.id);

        client.broadcast.emit('messages', message(person.name, _message));
    });

    client.on('disconnect', () => {

        let deletedUser = users.deletePerson(client.id);

        client.broadcast.emit('updateUsersList', users.getPeople());
        client.broadcast.emit('messages', message('System', `${deletedUser.name} is out!`));
    });
});