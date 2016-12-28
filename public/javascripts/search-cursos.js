"use strict";
$(document).ready(function () {
    $("#botonSearchCursos").on("click", function() {
        // Obtenemos el valor contenido en el cuadro de texto
        var valor = $("#searchInput").val();
        var posicion = Number($("#posicionActual").val());
        // Llamamos al servidor
        $.ajax({
            type: "GET",
            url: "/peticionBusquedaCurso",
            data: {
                str: valor,
                pos: posicion,
                num: posicion + 5
            },
            // En caso de éxito, colocamos el texto con el resultado
            // en el documento HTML
            success: function (data, textStatus, jqXHR) {
                var respuesta = '<table class=\"table\"><tr><td>Nombre<\/td><td>Lugar<\/td><td>Inicio<\/td><td>Fin<\/td><td>Plazas libres<\/td><\/tr>';
                data.resultados.forEach(function(item) {
                    respuesta += '<tr><td>' + item.titulo + '<\/td><td>' + item.localidad + '<\/td><td>' + item.fecha_inicio + '<\/td><td>' + item.fecha_fin + '<\/td><td>' + item.plazas + '<\/td><\/tr>';
                });
                respuesta += '<\/table>';
                $("#resultadoBusqueda").html(respuesta);//text(data.resultados);
            },

            // En caso de error, mostramos el error producido
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Se ha producido un error: " + errorThrown);
            }
        });
    });
});