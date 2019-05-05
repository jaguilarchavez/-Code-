var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        apellido : String,
        nombreUsuario : String,
        correo : String,
        contrasena : String,
        genero : String,
        fechaNacimiento : String,
        foto : String,
        proyectos : Array,
        membresia : mongoose.Schema.Types.ObjectId,
        tarjeta : mongoose.Schema.Types.ObjectId
    },
{
    collection : 'usuarios'
}
);
module.exports = mongoose.model('usuarios',esquema);
