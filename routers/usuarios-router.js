var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var mongoose = require("mongoose");

//Listado de usuarios
router.get("/", function (req, res) {
    usuario.find().sort({ orden: 1 })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

router.get('/comprobar-sesion',function(req, res){
    if(req.session.correoUsuario){
        res.send({ comprobacion: 1, mensaje: "Ya hay una sesión: " + req.session.codigoUsuario + " >> " + req.session.correoUsuario});
    } else {
        res.send({ comprobacion: 0, mensaje: "No hay sesión, logearse "});
    }
});

router.post("/login", function (req, res) {
    usuario.find({ correo: req.body.correoLogin, contrasena: req.body.contrasenaLogin })
        .then(data => {
            if (data.length == 1) {//Significa que si encontro un usuario con las credenciales indicadas
                //Establecer las variables de sesion
                req.session.codigoUsuario = data[0]._id;
                req.session.correoUsuario =  data[0].correo;
                //console.log(req.session.codigoUsuario);
                res.send({ status: 1, mensaje: "Usuario autenticado con éxito", usuario: data[0] });
            } else {
                res.send({ status: 0, mensaje: "Credenciales inválidas" });
            }
        })
        .catch(error => {
            res.send(error);
        });
});


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/home.html");
});


        // REGISTRAR //
//Petición para registrar un usuario
router.post("/registro", function (req, res) {
    var r = new usuario({
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        nombreUsuario : req.body.usuario,
        correo : req.body.correo,
        contrasena : req.body.contrasena,
        genero : req.body.genero,
        fechaNacimiento: req.body.fechaNacimiento,
        foto :  "sin-foto.jpg",
        proyectos : [],
        membresia : mongoose.Types.ObjectId(),
        tarjeta : mongoose.Types.ObjectId()
    });

    console.log(JSON.stringify({
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        nombreUsuario : req.body.usuario,
        correo : req.body.correo,
        contrasena : req.body.contrasena,
        genero : req.body.genero,
        fechaNacimiento: req.body.fechaNacimiento,
        foto :  "sin-foto.jpg",
        proyectos : [],
        membresia : mongoose.Types.ObjectId(),
        tarjeta : mongoose.Types.ObjectId()
    }));

    r.save()
        .then(obj => {
            res.send(obj);
        })
        .catch(error => {
            res.send(obj);
        });

});


module.exports = router;