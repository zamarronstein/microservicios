const fs = require('fs');
const path = require('path');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

let getFileName = (filename) => {

    let splittedFilename = filename.split('.'),
        extension = '',
        name = filename;

    if (splittedFilename.length > 1) {
        extension = splittedFilename[splittedFilename.length - 1];
    }

    name = splittedFilename[0];

    return {
        name: name,
        ext: extension
    };
};

let deleteFile = (type, id) => {

    let model = null;

    if (type == 'user') {
        model = Usuario;
    } else if (type == 'product') {
        model = Producto;
    }

    model.findById(id, (err, doc) => {

        if (!err && doc) {

            let _path = path.resolve(__dirname, `../../uploads/${type}/${doc.img}`);

            console.log(_path);

            if (fs.existsSync(_path)) {
                console.log('unlinking!');
                fs.unlinkSync(_path);
            }
        }

    });
};

let saveDataFile = (type, id, filename, res) => {

    let model = null;

    if (type == 'user') {
        model = Usuario;
    } else if (type == 'product') {
        model = Producto;
    }

    model.findById(id, (err, doc) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!doc) {

            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Not found!'
                }
            });
        }

        console.log(doc);
        doc.img = filename;

        doc.save((err, docDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            return res.json({
                ok: true,
                docDB,
                message: 'Your file was uploaded successfully!'
            });
        });
    });
};

module.exports = {
    getFileName,
    deleteFile,
    saveDataFile
};