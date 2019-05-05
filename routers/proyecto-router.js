var express = require("express");
var router = express.Router();
var usuario = require("../models/usuario");
var proyecto = require("../models/proyecto");
var membresia = require("../models/membresia");


var mongoose = require("mongoose");

router.get("/", function (req, res) {
    usuario.find({ _id: req.session.codigoUsuario })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.send(error);
        });
});

//Listado de todos los poryectos
router.get("/proyectos", function (req, res) {
    usuario.aggregate([
        {
            $lookup: {
                from: "proyectos",
                localField: "proyectos",
                foreignField: "_id",
                as: "proyectos"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.session.codigoUsuario)
            }
        },
        {
            $project: { proyectos: 1 }
        }
    ]).then(data => {
        res.send(data);
    })
        .catch(error => {
            res.send(error);
        });
});


router.get("/proyectos/:id/contenido", function (req, res) {
    proyecto.find({ _id : req.params.id }, {nombre: 1, contenido : 1}) //}
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});

router.get("/compartidos", function (req, res) {
    usuario.aggregate([
        {
            $lookup: {
                from: "proyectos",
                localField: "_id",
                foreignField: "compartidos",
                as: "resultado"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.session.codigoUsuario)
            }
        },
        {
            $project: { resultado: 1 }
        }
    ]).then(data => {
        res.send(data);
    })
        .catch(error => {
            res.send(error);
        });


});

//Metodo para crear proyecto nuevo
router.post("/proyectoNuevo", function (req, res) {
    var p = new proyecto({
        nombre : req.body.nombreProyecto,
        descripcion : req.body.descripcionProyecto,
        fecha : "17/06/2500",
        tamano : "5 MB",
        contenido : [],
        usuario : req.session.codigoUsuario,
        compartidos: []
    });

    p.save()
        .then(obj => {
            res.send(obj);
        })
        .catch(error => {
            res.send(obj);
        });
});

router.post("/:id/usuarioProyecto", function (req, res) {
    usuario.update(
        {
            _id: mongoose.Types.ObjectId(req.session.codigoUsuario)
        },
        {
            $push:
            {
                proyectos: mongoose.Types.ObjectId(req.params.id)
            }
        })
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Compartidos de un  proyecto
router.get("/proyectos/:id/compartidos", function (req, res) {
    proyecto.find({ _id : req.params.id }, {compartidos: 1}) //}
    .then(data => {
        //console.log("2: " + data[0].contenido[0].nombre);
        res.send(data);
    })
    .catch(error => {
        res.send(error);
    });
});
router.post("/proyectos/:idProyecto/:idUsuario/nuevoCompartido", function (req, res) {
    proyecto.update(
        {
            _id: mongoose.Types.ObjectId(req.params.idProyecto)
        },
        {
            $push:
            {
                compartidos: mongoose.Types.ObjectId(req.params.idUsuario)
            }
        })
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;