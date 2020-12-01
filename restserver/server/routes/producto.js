const express = require('express');
const app = express();

const Producto = require('../models/producto');

const {verificaToken} = require('../middlewares/auth');

const ObjectId = require('mongoose').Types.ObjectId;

app.get('/producto', (req, res) => {

    let from = req.query.from?req.query.from:0;
    let perPage = req.query.perPage?req.query.perPage:5;

    try {

        from = parseInt(from);
        perPage = parseInt(perPage);
    } catch (e) {
        from = 0;
        perPage = 5;
    }

    Producto.find({})
    .skip(from)
    .limit(perPage)
    .sort({'nombre': 1})
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productos) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            productos
        });
    });
});


app.get('/producto/:id', (req, res) => {

    let id = ObjectId(req.params.id);

    Producto.findById(id, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            producto
        });

    }).populate('usuario', 'nombre email')
      .populate('categoria', 'nombre');
});

app.get('/producto/search/:term', (req, res) => {

    let term = req.params.term;
    let regexp = new RegExp(term, 'i');

    Producto.find({nombre: regexp}, (err, productos) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            productos
        });
    });
});

app.post('/producto', verificaToken, (req, res) => {

    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        disponible: req.body.disponible,
        categoria: ObjectId(req.body.categoriaId),
        usuario: req.usuario._id
    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.put('/producto/:id', (req, res) => {

    let id = ObjectId(req.params.id),
        productoUpdate = buildUpdateProducto(req.body);

    if (Object.keys(productoUpdate).length > 0) { // there are properties in producto to update

        Producto.findOneAndUpdate({ _id: id }, productoUpdate, { new: true }, (err, producto) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                producto
            });
        });

    } else {

        return res.status(400).json({
            ok: true,
            err: {
                message: "Nothing to update!"
            }
        });
    }
});

let buildUpdateProducto = (body) => {

    let producto = {};

    if (body.nombre) {
        producto.nombre = body.nombre;
    }

    if (body.precioUni) {
        producto.precioUni = body.precioUni;
    }

    if (body.descripcion) {
        producto.descripcion = body.descripcion;
    }

    if (body.disponible) {
        producto.disponible = body.disponible;
    }

    return producto;
};

app.delete('/producto/:id', (req, res) => {

    let id = ObjectId(req.params.id),
        productoUpdate = { disponible: false };

    Producto.findOneAndUpdate({ _id: id }, productoUpdate, { new: true }, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        return res.json({
            ok: true,
            producto
        });
    });
});

module.exports = app;