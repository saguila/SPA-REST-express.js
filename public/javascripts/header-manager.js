var pActivo;
var usuario;
function initialise(){
	$('#dRegistro #fecha_nacimiento').datepicker();

	$("#inicio").on("click", function() {
		if(typeof(pActivo) != 'undefined'){
			pActivo.hide();
		}
    });
	
	$("#botonInscribirse").on("click", function() {
		inscribirseCurso();
    });

	$("#botonSearchCursos").on("click", function() {
        busquedaCurso();
    });

    $("#bRegistroU").on("click", function() {
        registroUsuario();
    });

	$("#misCursosNav").on("click",function(e){
		if(typeof(pActivo) != 'undefined'){
			pActivo.hide();
		}
		pActivo = $("#dMisCursos");
		pActivo.show();
		cursosUsuario();
	});

   
	$("#buscarCursoNav").on("click",function(e){
		if(typeof(pActivo) != 'undefined'){
			pActivo.hide();
		}
		pActivo = $("#dBusquedaCursos");
		pActivo.show();
	});


	$("#bIndentificarse").on("click",function(e){
		if(typeof(pActivo) != 'undefined'){
			pActivo.hide();
		}
		pActivo = $("#dIndentificarse");
		pActivo.show();
	});

	$(".itemNav").on("click",function(e){
	  $(".itemNav").removeClass("active");	
	  $(this).addClass("active");
	  //e.preventDefault();
	});
		$("#bIndentificarseSubmit").on("click",function(e){
		identificaUsuario();

	});	

	$("#lnkRegistro").on("click",function(e){
		if(typeof(pActivo) != 'undefined')	pActivo.hide();
		pActivo  = $("#dRegistro");
		pActivo.show();
	});	

};

$(document).ready(function () {
	initialise();
});