var express = require('express');
var router = express.Router();

router.get('/buscarCurso', function(req, res, next) {
    res.render('buscarCurso',{title:'Buscar curso'});
});

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
        else res.end();
    });
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
        res.json(result);
    });
});


router.get('/peticionBusquedaCurso', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var busqueda = req.query.str;
    var elemActual = Number(req.query.pos);
    consultas.searchCurso({str:busqueda,pos:elemActual,num:(elemActual + 5)},function(err,result){
        if(err) res.status(400);
        res.json({ resultado : result});
    });
});

router.get('/obtenerImagen',function(req,res,next){
    var consultas = require('../bin/consultasSQL');
    var _id = req.query.id;
    consultas.selectCurso(_id,function(err,result){
        if(err) res.status(400);
        res.json(result);
    });
});

module.exports = router;
