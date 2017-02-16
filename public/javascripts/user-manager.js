"use strict";
function registroUsuario(){
	var _nombre = $('#dRegistro #nombre').val(),_apellidos = $('#dRegistro #apellidos').val() ,_email = $('#dRegistro #email').val(),
	_password = $('#dRegistro #password').val(),_fecha_nacimiento = $('#dRegistro #fecha_nacimiento').val(),_sexo = $('#dRegistro input[name=gridRadios]:checked').val();
    $.ajax({
        type: "POST",
        url: "/insertUser",
        data: {
            nombre: _nombre,
            apellidos: _apellidos,
            email: _email,
            password: _password,
            fecha_nacimiento: _fecha_nacimiento,
            sexo: _sexo
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
        	alert("Registrado Correctamente");
        	pActivo.hide();
        	pActivo = undefined;
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });

}

function inscribirseCurso(){
if(typeof(usuario) != 'undefined'){
    var _id_usuario = usuario.id_usuario, _id_curso = $('.modal-title').attr('idcurso');
        $.ajax({
        type: "POST",
        url: "/inscribirseCurso",
        headers: {
            id_usuario: parseInt(_id_usuario),
            id_curso: parseInt(_id_curso)
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
            $('#myModal').modal('hide');
            alert('Se ha inscrito al curso correctamente');
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
    }
    else{
        alert('Logeate para inscribirte');
    }
}

function cursosUsuario(){
    if(typeof(usuario) != 'undefined'){
        $.ajax({
            type: "GET",
            url: "/cursosUsuario?id_usuario="+ usuario.id_usuario,
            // En caso de éxito, colocamos el texto con el resultado
            // en el documento HTML
            success: function (data, textStatus, jqXHR) {
                var rea = '',prox = '';
                var tRealizados = $('#dMisCursos #tCursosRealizados'),tProximos =  $('#dMisCursos #tProximosCursos');
            var realizados = data.cRealizados ,proximos = data.cProximos;
            if(realizados.length > 0){
                rea += '<table class="table"><thead><tr><th>Nombre</th><th>Lugar</th><th>Inicio</th><th>Fin</th></tr></thead><tbody>';
            realizados.forEach(function(i){
                rea += '<tr><td>' + i.nombre + '<\/td><td>' + i.lugar + '<\/td><td>' + formatearFecha(i.inicio) + '<\/td><td>' + formatearFecha(i.fin) + '<\/td><\/tr>';
            });
            rea += '</tbody></table>';
            }
            else{
              rea = '<p> No hay cursos realizados </p>'
            }
            if(proximos.length > 0){
            prox += '<table class="table"><thead><tr><th>Nombre</th><th>Lugar</th><th>Inicio</th><th>Fin</th></tr></thead><tbody>';
            proximos.forEach(function(i){
                prox += '<tr><td>' + i.nombre + '<\/td><td>' + i.lugar + '<\/td><td>' + formatearFecha(i.inicio) + '<\/td><td>' + formatearFecha(i.fin) + '<\/td><\/tr>';
            });
                prox += '</tbody></table>';
            }
            else{
                 prox = '<p> No hay cursos terminados </p>'
            }
            tRealizados.html(rea);
            tProximos.html(prox);
            },

            // En caso de error, mostramos el error producido
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error: " + errorThrown);
            }
        });
    }
    else{
        alert('Debes logearte');
    }
}

function identificacion(funcion){
    if(typeof(usuario) != 'undefined'){
        $.ajax({
        type: "GET",
        url: "/identificacionCorrecta",
        headers: {
            email: usuario.email,
            password: usuario.password
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
            if(typeof(funcion) != 'undefined') funcion();
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
    }
    else{
        alert('Debes logearte');    
    }
}

function añadirVistaUsuario(){
$('#misCursosNav').show();
$('#panelBoton').html(usuario.email + '  <button id="bCerrar" type="button" class="btn btn-default">Desconectar</button>');
            if(typeof(pActivo) != 'undefined'){
                pActivo.hide();
            }
            pActivo = $('#dMisCursos');
$("#bCerrar").on("click", function() {
        if(typeof(pActivo) != 'undefined'){
            pActivo.hide();
        }
        cerrar();
    });
}

function cerrar(){
    $('#panelBoton').html('<button id="bIndentificarse" type="button" class="btn btn-default">Identificarse</button>');
    $('#misCursosNav').hide();
    pActivo.hide();
    usuario = undefined;
    pActivo = undefined;
    $("#bIndentificarse").on("click",function(e){
        if(typeof(pActivo) != 'undefined'){
            pActivo.hide();
        }
        pActivo = $("#dIndentificarse");
        pActivo.show();
    });
}

function identificaUsuario() {
var _email = $('#dIndentificarse #email').val(),_password = $('#dIndentificarse #password').val();
if(typeof(_email) != 'undefined' && typeof(_password) != 'undefined'){
	$.ajax({
        type: "GET",
        url: "/loging",
        headers: {
            email: _email,
            password: _password
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
        	usuario = data.usuario; //Guardamos en una variable
            añadirVistaUsuario();
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}
else{
    alert('Rellena todos los campos');
}
}