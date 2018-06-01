const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 8383;
const request = require('request');

var Data = require('./util/loaddata.js');

var routes = require('./routes');

// console.log(Data.d);
// console.log(Data.sum(3,5));

var data = new Data();
data.on('done', function(event){
	console.log('Leggo evento: ', event.data[22].comune_sede);
	data.removeAllListeners();
})
data.process();

var filter = function(res,req,next){
	console.log('Dati filtrati: ');
	//console.log(data[44].comune_sede);
	//data = data[44]; 
	next();
}


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

//app.use(load);
app.use(header);
app.use(test);
app.use(filter);


app.get('/', routes.index);

app.get('/musei/:id_museo', function(req, res){
	console.log('se cerchi musei sei nel posto giusto');
	var museo = req.params.id_museo;
	res.send('Questa è la pagina del\
	 museo '+museo+data.comune_sede+'\n');
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

module.exports = app;