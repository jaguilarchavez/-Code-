function irPrincipal() {
    $.ajax({
        url: "/principal",
        method: "GET",
        dataType: "json",
        success: function (res) {
            document.getElementById("nav-usuario-perfil").innerHTML = `<button class="d-inline btn btn-sm btn-light" id="btn-foto-perfil" name="foto-perfil"
                type="button"><img src="img/sin-foto.jpg" alt="img-31" class="rounded-circle" height="28"
                    width="28">
                <p class="d-inline text-secondary"><strong>${res[0].nombre} ${res[0].apellido}</strong></p>
            </button>`;
            DOM(res[0]);
        },
        error: function (error) {
            console.log(error);
        }
    });
}


function mostrarProyectos() {
    $.ajax({
        url: "/principal/proyectos",
        method: "GET",
        dataType: "json",
        success: function (res) {
            //console.log(res);
            var valor = '';
            valor += `<div class="text-right mb-3">
            <button class="btn btn-sm btn-success" id="btn-proyecto-1" data-toggle="modal"
                data-target="#modalNuevoProyecto" name="proyecto-1" type="button">
                <p class="d-inline"><strong>Nuevo Proyecto</strong></p>
            </button>

            <div class="modal fade" id="modalNuevoProyecto" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Nueva Proyecto </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="name-proyect"></label>
                                <input type="text" class="form-control" id="name-proyect"
                                    placeholder="Nombre">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal"
                                onclick="Crear();">Crear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="row" id="id-proyectos-seccion">`;
            for (var i = 0; i < res[0].proyectos.length; i++) {
                valor += `<div class="col-xl-4 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-body">
                                    <button class="btn btn-sm btn-light" id="${res[0].proyectos[i]._id}" name="${res[0].proyectos[i]._id}"
                                        type="button" onclick='mostrarAbrirProyecto("${res[0].proyectos[i]._id}");'><i
                                            class="fas fa-folder-open fa-2x"></i>
                                        <p class="d-inline text-dark"><strong>${res[0].proyectos[i].nombre}</strong></p>
                                    </button>
                                </div>
                                <div class="card-footer text-muted">
                                    <p class="text-secondary"><strong>Descripción: ${res[0].proyectos[i].descripcion}</strong></p>
                                    <p class="text-secondary"><strong>Tamaño: ${res[0].proyectos[i].tamano}</strong></p>
                                </div>
                            </div>
                        </div>`;
            }
            valor += `</div>
            </div>`;
            document.getElementById("id-principal").innerHTML = valor;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function mostrarProyectosCompartidos() {
    $.ajax({
        url: "/principal/compartidos",
        method: "GET",
        dataType: "json",
        success: function (res) {
            var valor = '';
            valor += `<div class="row" id="id-proyectos-seccion">`;

            for (var i = 0; i < res[0].resultado.length; i++) {
                valor += `<div class="col-xl-4 col-md-6 col-sm-12">
                        <div class="card mb-3">
                            <div class="card-body">
                                <button class="btn btn-sm btn-light" id="${res[0].resultado[i]._id}" name="${res[0].resultado[i]._id}"
                                    type="button" onclick='mostrarAbrirProyecto("${res[0].resultado[i]._id}");'><i
                                        class="fas fa-folder-open fa-2x"></i>
                                    <p class="d-inline text-dark"><strong>${res[0].resultado[i].nombre}</strong></p>
                                </button>
                            </div>
                            <div class="card-footer text-muted">
                                <p class="text-secondary"><strong>Descripción: ${res[0].resultado[i].descripcion}</strong></p>
                                <p class="text-secondary"><strong>Tamaño: ${res[0].resultado[i].tamano}</strong></p>
                            </div>
                        </div>
                    </div>`;
            }
            valor += `</div>
                </div>`;
            document.getElementById("id-principal").innerHTML = valor;
            //console.log(res);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function DOM(datos) {
    var urk = "/principal/membresia";
    $.ajax({
        url: urk,
        dataType: "json",
        method: "get",
        success: function (res) {
            document.getElementById("id-principal").innerHTML = `<div class="container-fluid mb-3">
                        <div class="row">
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Autor</p>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Todo el contenido pertenece a ${datos.nombre} ${datos.apellido}. Derechos reservador por politicas de WebMaker.</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Tecnologías</p>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Javascript<br>Html<br>CSS</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Consumo</p>
                                </div>
                                <div class="card-body text-center">
                                    <p class="display-3 card-text"><i class="fas fa-chart-pie" style="color: teal"></i>
                                        0.5GB/${res[0].membresia[0].almacenamiento}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Anuncios</p>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Visita nuestra sección de noticias para estar al tanto de todo sobre WebMaker</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header text-center" style="background-color: white">
                                    <p class="h5">Tipo de Plan</p>
                                </div>
                                <div class="card-body text-center">
                                    <p class="card-text display-5"><strong>${res[0].membresia[0].tipoMembresia}</strong>
                                    </p>
                                    <p class="card-text">Compartir proyectos: 10 usuarios.
                                    </p>
                                    <p class="card-text">${res[0].membresia[0].almacenamiento} Almacenamiento.
                                    </p>
                                    <button class="btn btn-success" id="btn-nuevo-plan" name="nuevo-plan"
                                        type="button">Adquirir nuevo plan</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Estadisticas</p>
                                </div>
                                <div class="card-body">
                                    <p class="card-text"><i class="fab fa-java fa-2x"></i> Registro alumnos</p>
                                    <p class="card-text"><i class="fab fa-js fa-2x"></i> Tarea-POO</p>
                                    <p class="card-text"><i class="fab fa-html5 fa-2x"></i> Trabajo-jefe</p>
                                    <p class="card-text"><i class="fab fa-css3-alt fa-2x"></i> Trabajo-jefe-style</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-md-6 col-sm-12">
                            <div class="card mb-3">
                                <div class="card-header" style="background-color: white">
                                    <p class="h5">Ultimo acceso</p>
                                </div>
                                <div class="card-body text-center">
                                    <p class="h4 card-text"><i class="fas fa-map-marker-alt fa-1x"
                                            style="color: rgb(62, 65, 231)"></i> Tegucigalpa, Francisco Morazán</p>
                                    <p class="display-4 card-text"><i class="far fa-clock fa-1x"></i> 9:20AM - 10:00AM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>`;
        },
        error: function (error) {
            console.log(error);
        }
    });
}

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

function mostrarAbrirProyecto(idProyecto) {
    $.ajax({
        url: "/principal/proyectos/" + idProyecto + "/contenido/",
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
                        <div class="sidebar-heading1">
                            <p class="h5 text-dark">${res[0].nombre}</p>
                        </div>
                        <div class="list-group1 list-group-flush1">`;
            obtenerRutasHTML(htm, mostrar, ruta, nivelll);

        },
        error: function (error) {
            console.log(error);
        }
    });
}
function obtenerRutasHTML(htm, mostrar, ruta, nivell) {
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
                        </div>
                    </div>`;
            } else if (mostrar[j].tipo == 'archivo') {
                htm += `<button class="list-group-item list-group-item-action text-dark" type="button"
                            id="${mostrar[j].nombre}" onclick="mostrarAbrirArchivo();"><i class="fas fa-file-signature"></i>
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
    document.getElementById("id-principal").innerHTML = htm;
    for (var i = 1; i <= nivelMax; i++) {
        for (var j = 0; j < mostrar.length; j++) {
            if (mostrar[j].nivel == i) {
                if (mostrar[j].tipo == 'carpeta') {
                    var b = "#id-" + mostrar[j].padre;
                    //console.log(b);
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

function mostrarAbrirArchivo() {
    document.getElementById("text-editor").value = prueba;
}

//Prueba creando nuevo proyecto
function Crear() {
    var a = `<div class="col-xl-4 col-md-6 col-sm-12">
    <div class="card mb-3">
        <div class="card-body">
            <button class="btn btn-sm btn-light" id="btn-proyecto-1" name="proyecto-1"
                type="button"><i
                    class="fas fa-folder-open fa-2x"></i>
                <p class="d-inline text-dark"><strong>Sistemas Expertos</strong></p>
            </button>
        </div>
        <div class="card-footer text-muted">
            <p class="text-secondary"><strong>Último acceso: hace 2 días</strong></p>
            <p class="text-secondary"><strong>Tamaño: 30MB</strong></p>
        </div>
    </div>
</div>
<div class="col-xl-4 col-md-6 col-sm-12">
    <div class="card mb-3">
        <div class="card-body">
            <button class="btn btn-sm btn-light" id="btn-proyecto-2" name="proyecto-1"
                type="button"><i class="fas fa-folder-open fa-2x"></i>
                <p class="d-inline text-dark"><strong>POO</strong></p>
            </button>
        </div>
        <div class="card-footer text-muted">
            <p class="text-secondary"><strong>Último acceso: hace 10 días</strong></p>
            <p class="text-secondary"><strong>Tamaño: 160MB</strong></p>
        </div>
    </div>
</div>
<div class="col-xl-4 col-md-6 col-sm-12">
    <div class="card mb-3">
        <div class="card-body">
            <button class="btn btn-sm btn-light" id="btn-proyecto-3" name="proyecto-1"
                type="button"><i class="fas fa-folder-open fa-2x"></i>
                <p class="d-inline text-dark"><strong>Ingenieria en Software</strong></p>
            </button>
            <button class="btn btn-sm btn-light" id="btn-proyecto-3-edit" name="proyecto-1"
                type="button"><i class="fas fa-ellipsis-v"></i>
            </button>
        </div>
        <div class="card-footer text-muted">
            <p class="text-secondary"><strong>Último acceso: hace 20 días</strong></p>
            <p class="text-secondary"><strong>Tamaño: 10MB</strong></p>
        </div>
    </div>
</div>
<div class="col-xl-4 col-md-6 col-sm-12">
    <div class="card mb-3">
        <div class="card-body">
            <button class="btn btn-sm btn-light" id="btn-proyecto-ppr" name="proyecto-66"
                type="button><i class="fas fa-folder-open fa-2x"></i>
                <p class="d-inline text-dark"><strong>${document.getElementById("name-proyect").value}</strong></p>
            </button>
        </div>
        <div class="card-footer text-muted">
            <p class="text-secondary"><strong>Último acceso: hace 0 días</strong></p>
            <p class="text-secondary"><strong>Tamaño: 0 MB</strong></p>
        </div>
    </div>
</div>`;

    $("#id-proyectos-seccion").html(a);
}



$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});