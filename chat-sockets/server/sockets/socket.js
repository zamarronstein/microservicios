const { io } = require('../server');
const { Users } = require('../../classes/users');
let users = new Users();
const { message } = require('../utils/message');


io.on('connection', (client) => {

    client.on('enter', (user, callback) => {

        if (!user.name || !user.room) {
            return callback({
                ok: false,
                msg: 'Name and room are required!'
            });
        }

        let connectedUsers = users.addPerson({
            id: client.id,
            name: user.name,
            room: user.room
        });

        client.join(user.room);

        client.broadcast.to(user.room).emit('updateUsersList', users.getPeople());

        return callback({
            ok: true,
            connectedUsers: users.getPeoplePerRoom(user.room)
        });
    });

    client.on('messages', (_message) => {

        let person = users.getPerson(client.id);

        console.log('messages: ', person);

        client.broadcast.to(person.room).emit('messages', message(person.name, _message));
    });

    client.on('disconnect', () => {

        let deletedUser = users.deletePerson(client.id);

        client.broadcast.to(deletedUser.room).emit('updateUsersList', users.getPeople());
        client.broadcast.to(deletedUser.room).emit('messages', message('System', `${deletedUser.name} is out!`));
    });
});