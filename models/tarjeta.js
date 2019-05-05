var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        propietario : mongoose.Schema.Types.ObjectId,
        numeroTarjeta : String,
        ccv : String,
        fechaVencimiento : String
    },
    {
        collection : 'tarjetas'
    }
);
module.exports = mongoose.model('tarjetas',esquema);