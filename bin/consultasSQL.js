mysql = require('mysql');
conf = require('../config');


function busquedaNumResultados(busqueda,callback) {
    var conn = mysql.createConnection(conf.DB);
    if (busqueda != null) {
        query = 'SELECT COUNT(*) AS numfilas FROM CURSOS WHERE MATCH(titulo, descripcion) AGAINST (?)';
        conn.connect(function (err) {
            if (err) callback(err, null);
            else {
                obj = [busqueda.str, busqueda.num, busqueda.pos];
                conn.query(query, obj, function (err, result) {
                    if (err) callback(err, null);
                    else {
                        callback(null, result[0].numfilas);
                        conn.end();
                    }
                });
            }
        });
    }
}
        function dameHorariosCurso(idCurso,callback){
            var conn = mysql.createConnection(conf.DB);
            if (idCurso != null) {
                query = 'SELECT * FROM HORARIOS_CURSO WHERE id_curso = ?';
                conn.connect(function(err){
                    if (err) callback(err, null);
                    else {
                        obj = [idCurso];
                        conn.query(query, obj, function (err, result) {
                            if (err) callback(err, null);
                            else {
                                callback(null, result);
                                conn.end();
                            }
                        });
                    }
                });
            }
        }

module.exports = {
    // Probado
    insertCurso: function(values,callback) {
        var conn = mysql.createConnection(conf.DB);
        if (values != null) {
            query = 'INSERT INTO CURSOS(titulo,descripcion,localidad,direccion,plazas,fecha_inicio,fecha_fin,imagen) VALUES(?,?,?,?,?,?,?,?)';
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    obj = [values.titulo, values.description, values.localidad, values.direccion, values.plazas, values.fecha_inicio, values.fecha_fin, values.imagen];
                    conn.query(query, obj, function (err, result) {
                        if (err) callback(err, null);
                        else {
                            callback(null, result);
                            conn.end();
                        }
                    });
                }
            });
        }
    }
    ,// Probado
    deleteCurso : function(idCurso,callback){
        var conn = mysql.createConnection(conf.DB);
        if(idCurso != null) {
            query = 'DELETE FROM CURSOS WHERE id_curso = ?';
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    obj = [idCurso];
                    conn.query(query, obj, function (err, result) {
                        if (err) callback(err, null);
                        else {
                            callback(null, result);
                            conn.end();
                        }
                    });
                }
            });
        }
        }
    ,// Probado
    updateCurso: function(idCurso,values,callback) {
        var conn = mysql.createConnection(conf.DB);
        if (values != null && idCurso != null) {
            query = 'UPDATE CURSOS SET titulo = ? ,descripcion = ?,localidad = ?,direccion = ?,plazas = ?,fecha_inicio = ?,fecha_fin = ?,imagen = ? WHERE id_curso = ?';
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    obj = [values.titulo, values.description, values.localidad, values.direccion, values.plazas, values.fecha_inicio, values.fecha_fin, values.imagen,idCurso];
                    conn.query(query, obj, function (err, result) {
                        if (err) callback(err, null);
                        else {
                            callback(null, result);
                            conn.end();
                        }
                    });
                }
            });
        }
    }
    , // Probado
    selectCurso: function (idCurso,callback) {
        var conn = mysql.createConnection(conf.DB);
        if (idCurso != null) {
            query = 'SELECT * FROM CURSOS WHERE id_curso = ?';
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    obj = [idCurso];
                    conn.query(query, obj, function (err, result) {
                        if (err) callback(err, null);
                        else {
                            dameHorariosCurso(idCurso,function(err2,result2){
                                if(err2) callback(err, null);
                                else{
                                    callback(null,{curso:result,horarios:result2});
                                    conn.end();
                                }
                            });
                        }
                    });
                }
            });
        }
    }
,  // Probado
    selectAllCurso: function (callback) {
        var conn = mysql.createConnection(conf.DB);
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    conn.query('SELECT * FROM CURSOS', function (err, result) {
                        if (err) callback(err, null);
                        else {
                            callback(null, result);
                            conn.end();
                        }
                    });
                }
            });

    }
    , // Probado
    searchCurso: function(busqueda,callback){
        var conn = mysql.createConnection(conf.DB);
        if(busqueda != null) {
            query = 'SELECT * FROM CURSOS WHERE MATCH(titulo, descripcion) AGAINST (?) ORDER BY fecha_inicio ASC LIMIT ? OFFSET ?';
            conn.connect(function(err){
                if (err) callback(err, null);
                else {
                    obj = [busqueda.str,busqueda.num,busqueda.pos];
                    conn.query(query, obj, function (err, result) {
                        if (err) callback(err, null);
                        else {
                            busquedaNumResultados(busqueda,function(err2,numResultados){
                                if(err) callback(err2,null);
                                else{
                                    callback(null,{cantidad:numResultados,datos:result});
                                    conn.end();
                                }
                            });
                        }
                    });
                }
            });
        }
    }

}