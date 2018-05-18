const express = require('express');

var app = express();

app.get("/",hello,log);

function log(req,res,next){
	console.log(new Date(),req.method,req.url);
	next();
}

function hello(req,res,next){
	res.write("Sono qui! \n" + "Mi hai chiamato? \n" );
	res.end();
	next();
}

app.listen(8383, function(err){
	if(err){console.log("Errore");}
	else{console.log("Mi hai chiamato");}
});