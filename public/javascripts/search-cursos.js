"use strict";

var valor = '';
var elementosPagina = 5; /* Para cambiar el numero de resultados por pantalla*/
var posicion = 1;
var numPaginas = 1;

/* Funcion para codificar el BLOW de mysql en BASE64 para que se pueda mostrar la imagen */
function encode (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN;
        chr3 = i < input.length ? input[i++] : Number.NaN;

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}

function formatearFecha(fechaString){
    var fechaObject = new Date(fechaString);
    return fechaObject.getDate() + '-' + (fechaObject.getMonth() + 1) + '-' +fechaObject.getFullYear();
}

function formatearHora(horaString){
    return horaString.substring(0,5);
}

function busquedaCurso(){
    valor = $("#searchInput").val();
    //posicion = Number($("#posicionActual").val());
    // Llamamos al servidor
    $.ajax({
        type: "GET",
        url: "/peticionBusquedaCurso",
        data: {
            str: valor,
            pos: (posicion - 1) * elementosPagina,
            num: elementosPagina
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
            var respuesta = '<h3>No hay resultados<\/h3>';
            if(data.resultado.cantidad > 0) {

                respuesta = '<table class=\"table\"><tr><td>Nombre<\/td><td>Lugar<\/td><td>Inicio<\/td><td>Fin<\/td><td>Plazas libres<\/td><\/tr>';
                data.resultado.datos.forEach(function (item) {
                    respuesta += '<tr>' +  '<td><a class=\"match\" idCurso=' +  item.id_curso + '>'+ item.titulo + '<\/a><\/td><td>' + item.localidad + '<\/td><td>' + formatearFecha(item.fecha_inicio) + '<\/td><td>' + formatearFecha(item.fecha_fin) + '<\/td><td>' + item.plazas + '<\/td><\/tr>';
                });
                respuesta += '<\/table>';
                numPaginas = Math.floor( data.resultado.cantidad / elementosPagina) + 1;
                if (numPaginas > 1) {
                    respuesta += '<br\/><nav aria-label=\"Page navigation\"><ul class=\"pagination\">';
                    for(var i = 1; i <= numPaginas;i++) respuesta += '<li><button type=\"submit\" id=\"indice'+ i + '\"class=\"indice\"' + ' value=\"' + i + '\">' + i + '<\/button><\/li>';
                }
            }
            $("#resultadoBusqueda").html(respuesta);
            if(data.resultado.cantidad > 0){
                if(!($("#myModal").length)) crearModal();
                manejadorResultados(); // una vez que tenemos los datos ponemos el manejador de resultados
            if(data.resultado.cantidad > elementosPagina){
                manejadorIndice();
            }
            }
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });

}

function manejadorIndice(){
    $(".indice").on("click",function(e){
        if(e.target.id == 'Next'){
                if(posicion < numPaginas) {
                    posicion = 1;
                }

        }
        else if(e.target.id == 'Previous'){
            if(posicion > 1){
                    posicion =  -1;
            }
        }
        else{
            posicion = parseInt($(this).attr("value"));
            $(".indice").removeClass("active");
            $(this).addClass("active");
        }
        busquedaCurso();
    });

}

function crearModal(){
var res = '<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">';
  res += '<div class=\"modal-dialog\" role=\"document\">';
    res+= '<div class=\"modal-content\">'
       res+= '<div class=\"modal-header\">';
         res+= '<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;<\/span><\/button>';
         res+= '<h4 class=\"modal-title\" id=\"myModalLabel\"><\/h4><\/div>';
       res+= '<div class=\"modal-body">';
       res+= '<\/div>';
       res+= '<div class=\"modal-footer\">';
         res+= '<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cerrar<\/button>';
         res+= '<button type=\"button\" id=\"botonInscribirse\" class=\"btn btn-primary\">Inscribirse<\/button>';
       res+= '<\/div><\/div><\/div><\/div>';
       $("#contenido").append(res);
}

function mostrarImagenCurso(idCurso){
    $.ajax({
        type: "GET",
        url: "/obtenerImagen",
        data: {
            id: idCurso
        },
        success: function (data, textStatus, jqXHR) {
            var bytes = new Uint8Array(data.img.data);
            $("#imgCurso").attr("src",'data:image/gif;base64,'+ encode(bytes));
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //Si pasa lo que sea no mostramos imagen
        }
     });
}

function formatearModal(idCurso){
    $.ajax({
        type: "GET",
        url: "/mostrarCurso",
        data: {
            id: idCurso
        },
        success: function (data, textStatus, jqXHR) {
            var curso = data.resultado.curso;

            var horarios = "";
            // Presentamos los datos de los horarios
            if(data.resultado.horarios.length > 0){
                data.resultado.horarios.forEach(function(i,index){
                    horarios += i.dia + ': ' + formatearHora(i.hora_ini) + " - "+ formatearHora(i.hora_fin);
                    if(index + 1 < data.resultado.horarios.length) horarios += " , ";
                });
            }
            var fecha = 'desde el ' + formatearFecha(curso.fecha_inicio) + ' hasta el ' + formatearFecha(curso.fecha_fin);
            $(".modal-title").text(curso.titulo);
            var body = '<img id=\"imgCurso\" src=\" \" class=\"img-responsive pull-right\"><p>' + curso.descripcion + '</p>' + '<h5>Lugar de imparticion:</h5>'+ curso.direccion + '<h5>Ciudad:</h5>';
            body += '<p>' + curso.localidad + '</p>' + '<h5>Duracion:</h5>' + '<p>' + fecha + '</p>' + '<h5>Horarios:</h5>' + horarios;
            body += '<h5>Plazas:</h5>' + curso.plazas + ' (' + data.resultado.plazas + ' vacantes)';
            $(".modal-body").html(body);
            mostrarImagenCurso(idCurso);
        },
        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}

function manejadorResultados(){
    $(".match").on("click",function(){
        var id = $(this).attr("idcurso");
        formatearModal(id);
        $('#myModal').modal('show');
    });
}

$(document).ready(function (event) {
    
    $("#botonSearchCursos").on("click", function() {
        // Obtenemos el valor contenido en el cuadro de texto
        busquedaCurso();
    });
});