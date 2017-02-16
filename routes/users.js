var express = require('express');
var router = express.Router();

router.post('/insertUser', function(req, res, next) {
    var _nombre,_apellidos,_email,_password,_fecha_nacimiento,_sexo;
    var consultas = require('../bin/consultasSQL');
    _nombre = req.body.nombre;
    _apellidos = req.body.apellidos;
    _email = req.body.email;
    _password = req.body.password;
    _fecha_nacimiento = req.body.fecha_nacimiento;
    _sexo = req.body.sexo;
    consultas.insertUsuario({nombre:_nombre,apellidos:_apellidos,email:_email,password:_password,fecha_nacimiento:_fecha_nacimiento,sexo:_sexo},function(err,result){
        if(err) res.status(400);
        else res.end();
    });
});

router.get('/identificacionCorrecta', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var email = req.headers.email , password = req.headers.password;
    if(typeof(email) != 'undefined' && typeof(password) != 'undefined'){
        consultas.selectUsuario(email,function(err,result){
            if(err){
                res.status(500);
            }
            else{
                if(result.password == password){
                    res.end();
                }
                else{
                    res.status(401);
                    res.end();
                }
            }
        });
    }
    else{
        res.status(400);
        res.end();
    }
});

router.get('/loging', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var email = req.headers.email , password = req.headers.password;
    if(typeof(email) != 'undefined' && typeof(password) != 'undefined'){
        consultas.selectUsuario(email,function(err,result){
            if(err){
                res.status(500);
            }
            else{
                if(result.password == password){
                    res.json({usuario:result});
                }
                else{
                    res.status(401);
                    res.end();
                }
            }
        });
    }
    else{
        res.status(400);
        res.end();
    }
});

router.get('/cursosUsuario', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    var id_usuario = req.query.id_usuario;
    if(typeof(id_usuario) != 'undefined'){
        consultas.selectUsuarioCursos(id_usuario,function(err,result){
            if(err){
               res.status(500);
            }
            else {
                var fecha = new Date();
                var cfecha;
                var proximos = [];
                var realizados = [];
                result.forEach(function (curso) {
                    cfecha = new Date(curso.fecha_fin);
                    if (cfecha.getTime() >= fecha.getTime()) {
                        proximos.push({
                            nombre: curso.titulo,
                            lugar: curso.localidad,
                            inicio: curso.fecha_inicio,
                            fin: curso.fecha_fin
                        });
                    }
                    else {
                        realizados.push({
                            nombre: curso.titulo,
                            lugar: curso.localidad,
                            inicio: curso.fecha_inicio,
                            fin: curso.fecha_fin
                        });
                    }

                });
                res.json({cProximos: proximos, cRealizados: realizados});
            }
        });
    }
    else{
        res.status(400);
        res.end();
    }
});

function verificarPlazas(idCurso,callback){ //ver si tenemos plazas libres
    var consultas = require('../bin/consultasSQL');
    consultas.selectCurso(idCurso,function(err,result){
        if(err) callback(null,false);
        if(result.curso.plazas - result.inscritos > 0) callback(null,true);
        else callback(null,false);
    });
}

router.post('/inscribirseCurso', function(req, res, next) {
    var consultas = require('../bin/consultasSQL');
    if(typeof(req.headers.id_usuario) != 'undefined' &&  typeof(req.headers.id_curso) != 'undefined'){
        verificarPlazas(req.headers.id_usuario,function(err2,result2){
            if(result2){
    consultas.insertUsuarioCurso({id_usuario:req.headers.id_usuario,id_curso:req.headers.id_curso},function(err,result){
        if(err){
            res.status(400);
            res.end()
        }
        else res.end();
    });}
    else{
                res.status(400);
                res.end();
            }
        });
}
else{
    res.status(400);
    res.end();
}
});


module.exports = router;
