var express = require('express');
var router = express.Router();
var multer = require('multer');

router.post('/insertarCurso',function(req,res,next){
  var _titulo,_description,_localidad,_direccion,_plazas,_fecha_inicio,_fecha_fin;
  var consultas = require('../bin/consultasSQL');
  _titulo = req.query.titulo;
  _descripcion = req.query.descripcion;
  _localidad = req.query.localidad;
  _direccion = req.query.direccion;
  _plazas = req.query.plazas;
  _fecha_inicio = req.query.fecha_inicio;
  _fecha_fin = req.query.fecha_fin;
 consultas.insertCurso({titulo:_titulo,description:_description,localidad:_localidad,direccion:_direccion,plazas:_plazas,fecha_inicio:_fecha_inicio,fecha_fin:_fecha_fin,imagen:''},function(err,result){
     if(err) res.status(400);
     else res.end();
 });
});

router.put('/actualizarCurso',function(req,res,next){
    var _titulo,_description,_localidad,_direccion,_plazas,_fecha_inicio,_fecha_fin,_id;
    var consultas = require('../bin/consultasSQL');
    _id = req.query.id;
    _titulo = req.query.titulo;
    _descripcion = req.query.descripcion;
    _localidad = req.query.localidad;
    _direccion = req.query.direccion;
    _plazas = req.query.plazas;
    _fecha_inicio = req.query.fecha_inicio;
    _fecha_fin = req.query.fecha_fin;
    consultas.updateCurso(_id,{titulo:_titulo,description:_description,localidad:_localidad,direccion:_direccion,plazas:_plazas,fecha_inicio:_fecha_inicio,fecha_fin:_fecha_fin,imagen:''},function(err,result){
        if(err) res.status(400);
        else res.status(200);
        res.end();
    });
});

router.get("/imagenCurso/:id", function(request, response, next) {
    var consultas = require('../bin/consultasSQL');
    var n = Number(request.params.id);
    if (isNaN(n)) {
        next(new Error("Id no numérico"));
    }
    else {
        consultas.selectImgCurso(n, function(err, imagen) {
            if (err) {
            next(err)
            }
            else {
                if (imagen) {
                    response.end(imagen);
                }
                else {
                response.status( 404);
                response.end("Not found");
                }
            }
        });
    }
});

router.delete('/borrarCurso',function(req,res,next){
    var consultas = require('../bin/consultasSQL');
    var _id = req.query.id;
    consultas.deleteCurso(_id,function(err,result){
        if(err) res.status(400);
        else res.end();
    });
});

router.get('/mostrarCurso',function(req,res,next){
    var consultas = require('../bin/consultasSQL');
    var _id = req.query.id;
    consultas.selectCurso(_id,function(err,result){
        if(err) res.status(400);
        var _plazas = result.curso.plazas - result.inscritos; 
        res.json({resultado:{curso:result.curso,horarios:result.horarios,plazas:_plazas}});
    });
});


router.get('/peticionBusquedaCurso', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var busqueda = req.query.str;
    var elemActual = Number(req.query.pos);
    var elemFinal = Number(req.query.num);
    consultas.searchCurso({str:busqueda,pos:elemActual,num:elemFinal},function(err,result){
        if(err) res.status(400);
        res.json({ resultado : result});
    });
});

router.get('/obtenerImagen',function(req,res,next){
    var consultas = require('../bin/consultasSQL');
    var _id = req.query.id;
    consultas.selectImgCurso(_id,function(err,result){
        if(err){
          res.status(404);
          res.end();
        }
        else res.json({img:result});
    });
});

router.put('/actualizarImagenCurso',multer({storage: multer.memoryStorage()}).single("img"),function(req,res,next){
  /* Como maximo las imagenes seran de 64 kb por la columna de la tabla que las contiene que es de tipo BLOW */
  /* Hacer el put con header Content-Type multipart/form-data */
    var consultas = require('../bin/consultasSQL');
    var img = req.file.buffer;
    var idCurso = req.body.idCurso
    consultas.updateImgCurso(idCurso,img,function(err,result){
        if(err) res.status(500);
        else{
          if(result.affectedRows > 0)  res.status(200);
          else res.status(500);
        }
        res.end();
    });
});

module.exports = router;
