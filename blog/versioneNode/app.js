const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 8383;
var routes = require('./routes');
var request = require('request');
var async = require("async");

var data = {}

function runInParallel() {
  async.parallel([
    load,
    reduce
  ], function(err, results) {
    //This callback runs when all the functions complete
    console.log("comune: "+data.comune_sede);
  });
}

var test = function(req, res, next){
	if(req.url.length > 3){
		console.log("Request length: "+req.url.length)
	}
	next()
	}

var header = function(req, res, next){
console.log(JSON.stringify(req.headers));
if(req.headers.accept.includes("xml")){console.log("XML OK")};
	next()
	}

// var load = function(req, res, next){
// var load = function(d){
// 	data = d;
//     console.log(data[2].comune_sede);
// 	reduce();
//  	//next();
//  }

var reduce = function(req, res, next){
//var reduce = function(){
	data = data[46];
	console.log("qua");
	//console.log(data.comune_sede);
	//next();
}

var options = {
  url: 'https://www.dati.lombardia.it/resource/rbg8-vnzg.json',
  headers: {
    'User-Agent': 'request'
  }
};
 
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    //console.log(info);
    //load(info);
    //data = info;
  }
}
 
request(options, callback);

var load = function(req, res, next){
	  request('https://www.dati.lombardia.it/resource/rbg8-vnzg.json', function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	      //console.log(body) // Print body.
	      data = JSON.parse(body);
	       console.log(data[2].comune_sede);
	   }
	  });
//.pipe(reduce);
//next();
};



// request
//   .get('https://www.dati.lombardia.it/resource/rbg8-vnzg.json')
//   .on('error', function(err) {
//     console.log(err)
//   }).on('response', function(response) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'
//   });
  //.on('data', function(){console.log(data[2])});
  //.pipe(request.put('http://mysite.com/img.png'))

//esegue quando c'è una chiamata
app.use(header);
app.use(test);
app.use(runInParallel);
//app.use(load);
//app.use(reduce);

// valido per tutte le chiamate
//app.all('*', load, reduce);

const calculator = require('./util/calculator.js')
console.log(calculator.add(2,2)) // prints 4

app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, './public')));
//app.use(express.static('./public'));

app.get('/', function(req, res){
	console.log('Sono qui mi hai chiamato!');
	//res.send('Sono qui mi hai chiamato!\n');
	//res.render()
});
	
app.get ('/musei/:id_museo', reduce);

 // app.get('/musei/:id_museo', function(req, res){
 // 	console.log('se cerchi musei sei nel posto giusto');
 // 	var museo = req.params.id_museo;
 // 	res.send('Questa è la pagina del museo '+museo+'\n');
 // });

app.get('/mappa', function(req, res){
	console.log('se cerchi la mappa sei nel posto giusto');
	//console.log(__dirname);
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