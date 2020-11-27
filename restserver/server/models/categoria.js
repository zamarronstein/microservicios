const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es necesario!']
    },
    usuario: {
        type: ObjectId,
        required: [true, 'El usuario es necesario!']
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);