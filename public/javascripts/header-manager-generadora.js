function busquedaCurso(){
	$("title").text("Busqueda Curso");
	var resp = "<script src=\"/javascripts/search-cursos.js\" language=\"javascript\" type=\"text/javascript\"></script>";
	resp += "<div class=\"panel panel-default\"><div class=\"panel-heading\">Búsqueda de cursos</div>";
	resp += "<div class=\"panel-body\"><div class=\"form-inline\">";
	resp += "<input type=\"text\" class=\"form-control\" name=\"busqueda\" id=\"searchInput\" placeholder=\"Busqueda por nombre\">";
	resp += "<button type=\"submit\" id=\"botonSearchCursos\" class=\"btn btn-primary\"><p class=\"glyphicon glyphicon-search\"> Buscar</p></button></div> <br/>";
	resp += "<div id=\"resultadoBusqueda\"></div></div></div>";
	$("#contenido").html(resp);
}

/* 
$.ajax({
        url : "/",
        type: "POST",
        data: JSON.stringify([
            {id: 1, name: "Shahed"}, 
            {id: 2, name: "Hossain"}
        ]),
        contentType: "application/json; charset=utf-8",
        dataType   : "json",
        success    : function(){
            console.log("Pure jQuery Pure JS object");
        }
    });
*/

function inscribirse(){
	var resp ;
}

function home(){
	$("title").text("Portal de Cursos");
	$("#contenido").html("");
}

function initialise(){

	$("#buscarCursoNav").on("click",function(e){
		busquedaCurso();
	});

	$("#inicioNav").on("click",function(e){
		home();
	});

	$(".itemNav").on("click",function(e){
	  $(".itemNav").removeClass("active");
	  $(this).addClass("active");
	  //e.preventDefault();
	});

};

$(document).ready(function () {
	initialise();
});