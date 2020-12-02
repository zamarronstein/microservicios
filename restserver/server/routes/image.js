const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const {verificaTokenPorURL} = require('../middlewares/auth');

app.get('/images/:type/:filename', verificaTokenPorURL, (req, res) => {

    let type = req.params.type,
        filename = req.params.filename,
        file_path = path.resolve(__dirname, `../../uploads/${type}/${filename}`);
    
    if (fs.existsSync(file_path)) {

        res.sendFile(file_path);
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'File not exists!'
            }
        });
    }
});


module.exports = app;