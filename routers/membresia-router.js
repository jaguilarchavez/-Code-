var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var membresia = require("../models/membresia");


//Obtener todas la membresias
router.get("/",function(req,res){
    membresia.find()
    .then(data=>{
        Console.log(req)
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una membresia en particular
router.get("/:id",function(req,res){
    membresia.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//guardar membresia
router.post("/u",function(req,res){
    var m = new membresia({
        tipoMembresia: req.body.tipoMembresia,
        precio: req.body.precio,
        almacenamiento: req.body.almacenamiento,
        fechaInicio: req.body.fechaInicio
    });
    console.log(JSON.stringify({
        tipoMembresia: req.body.tipoMembresia,
        precio: req.body.precio,
        almacenamiento: req.body.almacenamiento,
        fechaInicio: req.body.fechaInicio
    }));
    m.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });
});


//
router.get("/membresia", function (req, res) {
    usuario.aggregate([
        {
            $lookup: {
                from: "membresias",
                localField: "membresia",
                foreignField: "_id",
                as: "membresia"
            }
        },
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.session.codigoUsuario)
            }
        },
        {
            $project: { membresia: 1 }
        }
    ]).then(data => {
        //console.log(data);
        res.send(data);
    })
        .catch(error => {
            res.send(error);
        });


});



module.exports = router;