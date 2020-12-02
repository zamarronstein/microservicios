const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const {isValidExtension, isValidType} = require('../validators/fileValidator');
const {getFileName, deleteFile, saveDataFile} = require('../utils/utils');

app.use(fileUpload({
    useTempFiles: true,
}));

app.post('/upload/:type/:id', (req, res) => {

    let type = req.params.type,
        id = req.params.id;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded!'
            }
        });
    }

    let _file = req.files.file,
        _filename = getFileName(_file.name);

    if (!isValidExtension(_filename.ext)) {

        return res.json({
            ok: false,
            err: {
                message: `Extension is not valid: ${extension}`
            }
        });
    }

    if (!isValidType(type)) {

        return res.json({
            ok: false,
            err: {
                message: `Type is not valid: ${type}`
            }
        });
    }
    
    let new_filename = `${_filename.name}_${new Date().getTime()}`;

    if (_filename.ext) {

        new_filename = `${new_filename}.${_filename.ext}`;
    }

    deleteFile(type, id);

    _file.mv(`uploads/${type}/${new_filename}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        saveDataFile(type, id, new_filename, res);
    });
});

module.exports = app;