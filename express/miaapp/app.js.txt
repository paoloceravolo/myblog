const express = require('express');
const port = 8383;
const app = express();
const path = require('path');
const exphbs  = require('express-handlebars');


// view engine setupe Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
	console.log('Sono qui, mi hai chiamato!?');
	var data = {'err':null,'data':{'title': 'prova', 'body': 'prova'}};
	res.render('index',data);
})

app.get('/musei/:id_museo', function(req, res){
	var museo = req.params.id_museo;
	res.send('Pagina del museo '+museo+'\n');
	console.log('Se cerchi un museo sei nel posto giusto!!');
})

app.get('/mappa', function(){
	console.log('Se cerchi la mappa sei nel posto giusto!!');
})

app.listen(port, function(){
	console.log('App in esecuzione su porta '+port);
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!\n')
})