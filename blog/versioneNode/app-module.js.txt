const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 8383;
var routes = require('./routes');
var request = require('request');

var Data = require('./util/loaddata.js')
var data = new Data()

data.on('done', function(details){
  console.log(details.data[2].comune_sede);
  app.get('/musei/:id_museo', function(req, res){
  	console.log('qui sei veramente nel posto giusto');
  	var museo = req.params.id_museo;
  	res.send('Questa è la pagina del museo '+museo+'\n');
  });
  data.removeAllListeners()
});

data.process()

// Test emitter with modules
// var Job = require('./util/loaddata.js')
// var job = new Job()

// job.on('done', function(details){
//   console.log('Job was completed at', details.completedOn)
//   job.removeAllListeners()
// })
// job.process()
// END Test emitter with modules



//console.log(d.data());
//console.log(d.filter);

// Test event emitters
// data.on('testEvent', function () {
//   return console.log('responded to testEvent');
// });

// app.get('/test', function (req, res) {
//   app.emit('testEvent');
//   return res.status(200).end();
// });
// END Test event emitters

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
	
app.get('/musei/:id_museo', function(req, res){
  	console.log('se cerchi musei sei nel posto giusto');
  	var museo = req.params.id_museo;
  	res.send('Questa è la pagina del museo '+museo+'\n');
  });

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