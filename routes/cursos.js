var express = require('express');
var router = express.Router();

router.get('/buscarCurso', function(req, res, next) {
    res.render('buscarCurso',{title:'Buscar curso'});
});

router.get('/peticionBusquedaCurso', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var busqueda = req.query.str;
    var elemActual = Number(req.query.pos);
    consultas.searchCurso({str:busqueda,pos:elemActual,num:(elemActual + 5)},function(err,result){
        if(err) console.log('Error' + err);
        //json = JSON.stringify(result);
        res.json({resultados:result});
    });
});

module.exports = router;
