const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 8383;

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

var test = function(req,res,next){
	if(req.url.length > 3){
		console.log("Request length: "+req.url.length);
	}
	next();
};

var header = function(req,res,next){
	//console.log(JSON.stringify(req.headers));
	if(req.headers.accept.includes('xml')){
		console.log("XML ok")
	}
	next();
}

app.use(express.static(path.join(__dirname, './public')));

app.use(header);
app.use(test);






app.get('/', function(req, res){
	console.log('Sono qui mi hai chiamato!');
	//res.send('Sono qui mi hai chiamato!\n');
	//res.render()
});

app.get('/musei/:id_museo', function(req, res){
	console.log('se cerchi musei sei nel posto giusto');
	var museo = req.params.id_museo;
	res.send('Questa è la pagina del museo '+museo+'\n');
});

app.get('/mappa/', function(req, res){
	console.log('se cerchi la mappa sei nel posto giusto');
	var data = {'err': null, 'data':{'title': 'Prova Express-handlebars'}}
	res.render('mappa', data);
});

app.listen(port, function(){
	console.log('Eseguo sulla porta '+port);
});

app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500).send('Qualcosa non va! \n');
});