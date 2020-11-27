const express = require('express');
const Categoria = require('../models/categoria');
const ObjectId = require('mongoose').Types.ObjectId;
const app = express();

app.get('/categoria', (req, res) => {

    Categoria.find({}, (err, categorias) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categorias
        });
    });
});

app.get('/categoria/:id', (req, res) => {

    let id = ObjectId(req.params.id);

    Categoria.findById({_id: id}, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria
        });
    });
});

app.post('/categoria', (req, res) => {

    let categoria = new Categoria({
        nombre: req.body.nombre,
        usuario: ObjectId(req.body.usuario)
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', (req, res) => {

    let id = ObjectId(req.params.id);
    let change = { nombre: req.body.nombre };

    Categoria.findOneAndUpdate({_id: id}, change, {new: true}, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria
        });
    });
});

app.delete('/categoria/:id', (req, res) => {

    let id = ObjectId(req.params.id);

    Categoria.findOneAndRemove({_id: id}, (err, categoriaBorrada) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            categoria: categoriaBorrada
        });
    });
});

module.exports = app;