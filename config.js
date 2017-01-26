var fs = require("fs");
var clavePrivada = fs.readFileSync("./clave_academia.pem");
var certificado = fs.readFileSync("./certificado_academia_firmado.crt");

module.exports = {
	DB : {
		host: 'localhost',
		user: 'academia',
		password: '3,14016pi',
		database: 'academia',
		port: 3306
	}
	,
	APPPORT:3000,
	HTTPS :{
		key : clavePrivada,
		cert : certificado,
	}

}