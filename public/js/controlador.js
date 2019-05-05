function obtenerUsuario(){
    $.ajax({
        url:"/usuario",
        method:"GET",
        dataType:"JSON",
        success:function(res){
            console.log(res);
            console.log("Respuesta");
        },
        error:function(error){
            console.log(error);
        }
    });
}

$(document).ready(function(){
    console.log("El DOM ha sido cargado");

    $.ajax({
        url:"/proyecto",
        method:"GET",
        dataType:"json",
        success:function(res){
            console.log(res);
            if(res[0].genero=='Femenino'){
                document.getElementById("jum").innerHTML=` <h1 class="display-4">Bienvenida ${res[0].nombre} ${res[0].apellido} &lt;Code&gt;</h1>
                    <p class="lead" style="text-align: center;">La mejor plataforma para desarrollo web. Haz elegido bien.</p>
                <hr class="my-4">
                <div class="text-center">
                    <div class="card text-center" style="width: 18rem;">
                        <img src="../img/${res[0].foto}" class="card-img-top" alt="img">
                        <div class="card-body">
                            <p class="card-text">${res[0].nombre} ${res[0].apellido}</p>
                        </div>
                    </div>
                </div>`;
            }else if(res[0].genero=='Masculino'){
                document.getElementById("jum").innerHTML=` <h1 class="display-4">Bienvenido ${res[0].nombre} ${res[0].apellido} &lt;Code&gt;</h1>
                    <p class="lead" style="text-align: center;">La mejor plataforma para desarrollo web. Haz elegido bien.</p>
                <hr class="my-4">
                    <div class="text-center">
                        <div class="card text-center" style="width: 18rem;">
                            <img src="../img/${res[0].foto}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <p class="card-text">${res[0].nombre} ${res[0].apellido}</p>
                            </div>
                        </div>
                    </div>`;
            }else{
                document.getElementById("jum").innerHTML=` <h1 class="display-4">BienvenidX ${res[0].nombre} ${res[0].apellido} &lt;Code&gt;</h1>
                    <p class="lead" style="text-align: center;">La mejor plataforma para desarrollo web. Haz elegido bien.</p>
                <hr class="my-4">
                <div class="text-center">
                    <div class="card text-center" style="width: 18rem;">
                        <img src="../img/${res[0].foto}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p class="card-text">${res[0].nombre} ${res[0].apellido}</p>
                        </div>
                    </div>
                </div>`;

            }
        },
        error:function(error){
            console.log("Error");
            console.log(error);
        }
    });
});

$("#btn-guardar-usuario").click(function(){
    var parametros = $("#formulario").serialize();
    console.log(parametros);
    $.ajax({
        url: "/usuario/u",
        method: "post",
        data: parametros,
        dataType: "json",
        success: function(res){
            console.log(res);
            console.log("se registro esta mierda");
            
        },
        error:function(error){
            console.log(error);
        }
    });
});

function iniciar(){
    console.log($("#formularioLogin").serialize());
    $.ajax({
        url: "/usuario/login",
        method: "post",
        data: $("#formularioLogin").serialize(),
        dataType: "json",
        success: function (res) {
            if (res.status == 1) {
                //console.log(res);
                //console.log(res.usuario.nombre);
                window.location.href = "/principal.html";
            }
            else {
                console.log(res.mensaje)
            }
        },
        error: function (error) {
            console.error(error);
        }
    });
}

//
function proyectos() {
    $.ajax({
        url: "/proyecto/proyectos",
        method: "GET",
        dataType: "json",
        success: function (res) {
            console.log(res);
            var valor = '<div id="filaProyecto" name="filaProyecto" class="row container-fluid">';
                valor += `<div class="col-xl-12 col-md-12 col-sm-12 text-left">
                            <button type="button" name="nuevoProyecto" data-toggle="modal" data-target="#proyectoNuevoModal"  class="btn btn-outline-primary">Crear proyecto</button>
                        </div><br>`;
                for (var i = 0; i < res[0].proyectos.length; i++) { 
                    valor += `
                    <div class="col-xl-4 col-md-6 col-sm-12">
                        <div class="card mb-3">
                            <img style="width: 50px; height: 50px;" src="img/carpeta.png" class="card-img-top" alt="img">
                            <div class="card-body">
                                <h5 class="card-title">${res[0].proyectos[i].nombre}</h5>
                                <p class="card-text">${res[0].proyectos[i].descripcion}</p>
                                <p class="card-text"><small class="text-muted">${res[0].proyectos[i].tamano}</small></p>
                            </div>
                            <div class="card-footer text-center">
                                <button type="button" id="${res[0].proyectos[i]._id}" name="${res[0].proyectos[i]._id}" onclick='abrirProyecto("${res[0].proyectos[i]._id}");' class="btn btn-outline-warning">Ver proyecto</button>
                                <button type="button"  onclick='listaCompartidos("${res[0].proyectos[i]._id}","${res[0].proyectos[i].usuario}");' class="btn btn-outline-warning" data-toggle="modal" data-target="#compartirModal" data-toggle="tooltip" data-placement="top" title="Compartir">Compartir</button>
                            </div>
                        </div>
                    </div>`;
                        }
                    valor += ` </div>`;
      
            document.getElementById("proyectos").innerHTML = valor;
        },
        error: function (error) {
            console.log(error);
        }
    });
}
//Crear proyecto nuevo
function proyectoNuevo(){
    $.ajax({
            url: "/proyecto/proyectoNuevo",
            method: "POST",
            data: $("#formularioProyecto").serialize(),
            dataType: "json",
            success: function (res) {
                console.log(res);
                $.ajax({
                    url: `/proyecto/${res._id}/usuarioProyecto`,
                    dataType: "json",
                    method: "post",
                    success: function (rese) {
                        proyectos();
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
}
//Listar los usuarios para compartir
function listaCompartidos(idProyecto, idUsuarioDuenio) {
    $.ajax({
        url: `/proyecto/proyectos/${idProyecto}/compartidos`,
        method: "GET",
        dataType: "json",
        success: function (respuesta) {
            $.ajax({
                url: "/usuario",
                method: "GET",
                dataType: "json",
                success: function (res) {
                    var contenid = '';
                    for (var i = 0; i < res.length; i++) {
                        contenid += `<div class="px-1 py-2 story-card" >
                                        <div class="fl" style="float:left;">
                                            <img style="max-width: 60px; padding:0.20rem;" class="img-fluid img-thumbnail rounded-circle"  src="img/${res[i].foto}">
                                        </div>  
                                        <div class="py-1 px-1 fl">
                                            <small class="mr-md-auto"><b> ${res[i].nombre} ${res[i].apellido} </b></small>`;

                        var bandera = false;
                        for (var j = 0; j < respuesta[0].compartidos.length; j++) {
                            if (respuesta[0].compartidos[j] == res[i]._id) {
                                bandera = true;
                                break;
                            } else if(idUsuarioDuenio == res[i]._id){
                                bandera = true;
                                break;
                            }
                        }

                        if (bandera) {
                            contenid += `<button id="btncompartir${res[i]._id}" onclick='compartidos("${res[i]._id}", "${idProyecto}")' class="btn btn-outline-danger btn-sm disabled"><i class="fas fa-plus-circle"></i></button><br>
                                            </div>
                                        </div>`;
                        } else {
                            contenid += `<button id="btncompartir${res[i]._id}" onclick='compartidos("${res[i]._id}","${idProyecto}")' class="btn btn-outline-success btn-sm"><i class="fas fa-plus-circle"></i></button><br>
                                            </div>
                                    </div>`;
                        }
                    }
                    document.getElementById("usuarioCompartido").innerHTML = contenid;
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function compartidos(usuarioID, proyectoID) {
    //console.log(id + " " + nombre + " " + apellido);
    $.ajax({
        url: `/proyecto/proyectos/${proyectoID}/${usuarioID}/nuevoCompartido`,
        method: "POST",
        dataType: "json",
        success: function (res) {
            $(`#btncompartir${usuarioID}`).removeClass("btn-outline-success disabled");
            $(`#btncompartir${usuarioID}`).addClass("btn-outline-danger disabled");
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function abrirProyecto(idProyecto) {
    $.ajax({
        url: "/proyecto/proyectos/" + idProyecto + "/contenido/",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var ruta = ["/"];
            var mostrar = [];
            var nivelll = [0];
            obtenerContenido(res[0].contenido, ruta, mostrar, nivelll)

            var htm = `<div class="row">
                <div class="col-sm-3">
                    <div class="border-right text-white" id="sidebar-wrapper1">
                        <div class="sidebar-heading1 row">
                            <div class="col-xl-6">
                                <p class="h5 text-dark">${res[0].nombre}</p>
                            </div>
                            <div class="col-xl-6">
                                <button type="button" class="btn btn-light" data-toggle="modal" data-target="#carpetaModal" data-toggle="tooltip" data-placement="top" title="Nueva Carpeta"><i class="fas fa-folder" style="color: black;"></i></button>
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Nuevo Archivo"><i class="far fa-sticky-note" style="color: black;"></i></button>
                                <a href="../prueba.html" class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Nuevo Archivo"><i class="far fa-edit"></i></a>
                            </div>
                        </div>
                        <div class="list-group1 list-group-flush1">`;

            rutas(htm, mostrar, ruta, nivelll);

        },
        error: function (error) {
            console.log(error);
        }
    });
}
//
function rutas(htm, mostrar, ruta, nivell) {
    console.log(mostrar);
    nivelMax = 0;
    for (var i = 0; i < mostrar.length; i++) {
        if (mostrar[i].nivel > nivelMax) {
            nivelMax = mostrar[i].nivel;
        }
    }

    for (var j = 0; j < mostrar.length; j++) {
        if (mostrar[j].nivel == 0) {
            if (mostrar[j].tipo == 'carpeta') {
                htm += `<p>
                        <button class="list-group-item list-group-item-action text-dark" type="button" data-toggle="collapse" data-target="#${mostrar[j].nombre}" aria-expanded="false" aria-controls="collapseExample">
                            <i class="fas fa-angle-right"></i> ${mostrar[j].nombre} </button>
                    </p>
                    <div class="collapse" id="${mostrar[j].nombre}">
                        <div class="card card-body" id='id-${mostrar[j].nombre}'>
                            <div class="text-right">
                                <button type="button" class="btn btn-light" data-toggle="modal" data-target="#carpetaModal" data-toggle="tooltip" data-placement="top" title="Nueva Carpeta"><i class="fas fa-folder" style="color: black;"></i></button>
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="top" title="Nuevo Archivo"><i class="far fa-sticky-note" style="color: black;"></i></button>
                            </div> 
                        </div>
                    </div>`;
            } else if (mostrar[j].tipo == 'archivo') {
                htm += `<button class="list-group-item list-group-item-action text-dark" type="button"
                            id="${mostrar[j].nombre}"><i class="fas fa-file-signature"></i>
                                ${mostrar[j].nombre}
                        </button>`;
            }
        }
    }
    htm += `</div>
            </div>
        </div>
        <div class="col-sm-9">
            <textarea name="text-editor" id="text-editor" cols="120" rows="100"></textarea>
        </div>
    </div>`;
    document.getElementById("proyectos").innerHTML = htm;
    for (var i = 1; i <= nivelMax; i++) {
        for (var j = 0; j < mostrar.length; j++) {
            if (mostrar[j].nivel == i) {
                if (mostrar[j].tipo == 'carpeta') {
                    var b = "#id-" + mostrar[j].padre;
                    $(b).append(`<p>
                                <button class="list-group-item list-group-item-action text-dark" type="button" data-toggle="collapse" data-target="#${mostrar[j].nombre}" aria-expanded="false" aria-controls="collapseExample">
                                    <i class="fas fa-angle-right"></i> ${mostrar[j].nombre} </button>
                            </p>
                            <div class="collapse" id="${mostrar[j].nombre}">
                                <div class="card card-body" id='id-${mostrar[j].nombre}'>
                                </div>
                            </div>`);
                } else if (mostrar[j].tipo == 'archivo') {
                    var b = "#id-" + mostrar[j].padre;
                    //console.log(b);
                    $(b).append(`<button class="list-group-item list-group-item-action text-dark" type="button"
                                id="${mostrar[j].nombre}"><i class="fas fa-file-signature"></i>
                                    ${mostrar[j].nombre}
                            </button>`);
                } else {

                }
            }
        }
    }
}
//

function obtenerContenido(array, ruta, mostrar, nivell) {
    for (var i = 0; i < array.length; i++) {

        if (array[i].tipo == 'carpeta') {
            var file = { nivel: nivell[0], tipo: array[i].tipo, nombre: array[i].nombre, padre: ruta[(ruta.length - 1)] };
            mostrar.push(file);
            ruta.push(array[i].nombre);
            nivell[0] = nivell[0] + 1;
            obtenerContenido(array[i].contenido, ruta, mostrar, nivell);

        } else if (array[i].tipo == 'archivo') {
            var file = { nivel: nivell[0], tipo: array[i].tipo, nombre: array[i].nombre + "." + array[i].extension, padre: ruta[(ruta.length - 1)], contenido: array[i].contenido };
            mostrar.push(file);
        } else {
            //return "No define";
        }

        if (i == (array.length - 1)) {
            console.log("Nivel: " + nivell);
            nivell[0] = (nivell[0] - 1);
            ruta.pop();
        }
    }
}
//
function compartir() {
    $.ajax({
        url: "/proyecto/compartidos",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var valor = '';
            valor += `<div class="row" id="id-proyectos-seccion">`;

            for (var i = 0; i < res[0].resultado.length; i++) {
                valor += ` <div class="col-xl-4 col-md-6 col-sm-12">
                <div class="card mb-3">
                    <img style="width: 50px; height: 50px;" src="img/carpeta.png" class="card-img-top" alt="img">
                    <div class="card-body">
                        <h5 class="card-title">${res[0].resultado[i].nombre}</h5>
                        <p class="card-text">${res[0].resultado[i].descripcion}</p>
                        <p class="card-text"><small class="text-muted">${res[0].resultado[i].tamano}</small></p>
                    </div>
                    <div class="card-footer text-center">
                        <button type="button" id="${res[0].resultado[i]._id}" name="${res[0].resultado[i]._id}" onclick='abrirProyecto("${res[0].resultado[i]._id}");' class="btn btn-outline-warning">Ver proyecto</button>
                    </div>
                </div>
            </div>`;
            }
            valor += `</div>
                </div>`;
            document.getElementById("proyectos").innerHTML = valor;
            //console.log(res);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

