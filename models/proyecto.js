var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        descripcion : String,
        fecha : String,
        tamano : String,
        contenido : Array,
        usuario : mongoose.Schema.Types.ObjectId,
        compartidos : Array
    },
    {
        collection : 'proyectos'
    }
);
module.exports = mongoose.model('proyectos',esquema);