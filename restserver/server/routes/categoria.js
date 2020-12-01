const express = require('express');
const Categoria = require('../models/categoria');
const ObjectId = require('mongoose').Types.ObjectId;
const {verificaToken, verificaRole} = require('../middlewares/auth');
const app = express();

app.get('/categoria', (req, res) => {

    Categoria.find({})
    .sort({'nombre': -1})
    .populate('usuario', 'nombre email')
    .exec(
        (err, categorias) => {

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
        }
    );
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

app.post('/categoria', [verificaToken, verificaRole], (req, res) => {

    let categoria = new Categoria({
        nombre: req.body.nombre,
        usuario: req.usuario._id
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

app.put('/categoria/:id', [verificaToken, verificaRole], (req, res) => {

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

app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res) => {

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