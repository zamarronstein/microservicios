const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoría es necesario!']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario es necesario!']
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);