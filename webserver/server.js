const express = require('express');
const app = express();

app.get('/', (req, res) => {

    let salida = {
        nombre: 'Juan',
        edad: 35,
        url: req.url
    };

    res.send(salida);
});

app.listen(3000, () => {
    console.log('Escuchando en el puerto 3000!');
});