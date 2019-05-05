var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        tipoMembresia : String,
        precio : Number,
        almacenamiento : String,
        fechaInicio : String,
        usuarios : Array
    },
    {
        collection : 'membresias'
    }
);

module.exports = mongoose.model('membresias',esquema);