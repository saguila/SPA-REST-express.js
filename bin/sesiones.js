/* Esta implementado,pero en esta practica,no lo usamos como midleware */
var config =  require('../config');
var express = require('express');
var session = require('express-session');
var MYSQLStore = require('express-mysql-session')(session);
module.exports = session({
    saveUninitialized: false, // No guardar la sesion mientras que no se añada algo al objecto session.
    resave: false, // No guardar la sesion a  menos que se modifique.
    secret:'prueba',
    unset: 'destroy', // Si session=null se destruye de la BD.
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    store: new MYSQLStore({
        autoRemove: 'interval',
        host:config.DB.host,
        user:config.DB.user,
        password:config.DB.password,
        database:config.DB.database,
        autoRemoveInterval: 10 // In minutes. Default
    })
})