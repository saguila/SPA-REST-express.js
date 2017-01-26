function initialise(){

	$("#buscarCursoNav").on("click",function(e){
		$("#dBusquedaCursos").show();
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