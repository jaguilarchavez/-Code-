var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var database = require("./modules/database");
var usuarioRouter = require('./routers/usuarios-router');
var membresiaRouter = require('./routers/membresia-router');
var proyectoRouter = require('./routers/proyecto-router');
var app = express();
var test = require("./modules/test");


app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/usuario",usuarioRouter);
app.use("/membresia",membresiaRouter);
app.use("/proyecto",proyectoRouter);




app.get("/",function(req, res){
    res.send(test.mensaje());
});

app.listen(3338,function(){
    console.log("Servidor en linea PUMM");
});