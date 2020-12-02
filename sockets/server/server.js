const express = require('express');

// 1. Requerimos socket.io
const socketIO = require('socket.io');

// 2. Requerimos http
const http = require('http');

const path = require('path');

const app = express();

//3. Creamos el server pero pasándole app de express
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// 4. Esta es la comunicación del backend
const io = socketIO(server);
module.exports = {io};

require('./sockets/socket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});