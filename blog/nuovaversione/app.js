const express = require('express');
const app = express();
const port = 8383;

app.get('/', function(req, res){
	console.log('Sono qui mi hai chiamato!');
	res.send('Sono qui mi hai chiamato!\n');
});

app.get('/musei/:id_museo', function(req, res){
	console.log('se cerchi musei sei nel posto giusto');
	var museo = req.params.id_museo;
	res.send('Questa è la pagina del museo '+museo+'\n');
});

app.get('/mappa/', function(){
	console.log('se cerchi la mappa sei nel posto giusto');
});

app.listen(port, function(){
	console.log('Eseguo sulla porta '+port);
});

app.use(function(err, req, res, next){
	conole.log(err.stack);
	res.status(500).send('Qualcosa non va! \n');
});