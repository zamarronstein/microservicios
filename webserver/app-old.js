const http = require('http');
http.createServer((req, resp) => {

    resp.writeHead(200, { 'Content-Type': 'application/json' });

    let salida = {
        nombre: 'Juan',
        edad: 35,
        url: req.url
    };

    resp.write(JSON.stringify(salida));
    resp.end();
}).listen(3000);

console.log('Escuchando el puerto 3000!');