"use strict";

var valor = '';
var posicion = 1;

function busquedaCurso(){
    valor = $("#searchInput").val();
    //posicion = Number($("#posicionActual").val());
    // Llamamos al servidor
    $.ajax({
        type: "GET",
        url: "/peticionBusquedaCurso",
        data: {
            str: valor,
            pos: posicion - 1,
            num: posicion * 5
        },
        // En caso de éxito, colocamos el texto con el resultado
        // en el documento HTML
        success: function (data, textStatus, jqXHR) {
            var respuesta = '<h3>No hay resultados<\/h3>';
            if(data.resultado.cantidad > 0) {
                respuesta = '<table class=\"table\"><tr><td>Nombre<\/td><td>Lugar<\/td><td>Inicio<\/td><td>Fin<\/td><td>Plazas libres<\/td><\/tr>';
                data.resultado.datos.forEach(function (item) {
                    respuesta += '<tr><td>' + item.titulo + '<\/td><td>' + item.localidad + '<\/td><td>' + item.fecha_inicio + '<\/td><td>' + item.fecha_fin + '<\/td><td>' + item.plazas + '<\/td><\/tr>';
                });
                respuesta += '<\/table>';
                var numPaginas = Math.floor( data.resultado.cantidad / 5) + 1;
                if (numPaginas > 1) {
                    respuesta += '<br\/><nav aria-label=\"Page navigation\"><ul class=\"pagination\"><li><button aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;<\/span><\/button><\/li>';
                    for(var i = 1; i <= numPaginas;i++) respuesta += '<li><button type=\"submit\" class=\"indice\"' + ' value=\"' + i + '\">' + i + '<\/button><\/li>';
                    respuesta += '<li><button aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;<\/span><\/button><\/li><\/ul><\/nav>';
                }
            }
            $("#resultadoBusqueda").html(respuesta);//text(data.resultados);
        },

        // En caso de error, mostramos el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });

}

$(document).ready(function (event) {
    $(".pagination.indice").on("click",function(){
        alert("gola");

    });

    //
    $("#botonSearchCursos").on("click", function() {
        // Obtenemos el valor contenido en el cuadro de texto
busquedaCurso();
    });
});