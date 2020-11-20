require('./config/config');
const express = require('express')
const app = express()
const body_parser = require('body-parser');
const mongoose = require('mongoose');

app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

app.get('/usuario', function(req, res) {
    res.send('get World')
})

app.post('/usuario', function(req, res) {

    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            err: true,
            msg: 'name field is required!'
        });
    } else {

        res.send({ person: body })
    }

})

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
})

app.delete('/usuario', function(req, res) {
    res.send('delete World')
})


mongoose.connect('mongodb://172.18.0.3:27017/cafe', (err, resp) => {
    if (err) throw new Error(err);
    console.log('Connected to MongoDB!');
});

app.listen(process.env.PORT, () => {
    console.log(`Listening in port ${process.env.PORT}!`);
})