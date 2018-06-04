const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const port = 8383;
//var trailingSlash = require('trailing-slash') // Add or remove trailing slashes, and redirect.
const cookeParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

var routes = require('./routes');

// Predispongo il motore di rendering
app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	partialsDir: __dirname + '/views/partials',
}));
app.set('view engine', 'handlebars');

// esempi di funzioni di middleware
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

var filter = function(res,req,next){
	console.log('Dati filtrati: ');
	//console.log(data[44].comune_sede);
	//data = data[44]; 
	next();
}

//app.use(express.static('public'))
// attivazioni di middleware da moduli 
app.use(express.static(path.join(__dirname, 'public'))); // redirect requests of static files to ./public
//app.use(trailingSlash({slash: false})) // slash boolean (default: true): when true a URL will be redirected to contain a slash; when false, it will be redirected to omit one.

// attivazioni di middleware create
//app.use(load);
app.use(header);
app.use(test);
app.use(filter);

// arrivazione middleware di sessione
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookeParser());

app.use(session({secret: 'crema', resave: false, saveUninitialized: true}));
app.use(expressValidator());

// corrispondeza tra endpoint e modulo di routing 
app.get('/', routes.index);
app.get('/mappa/', routes.mappa);
app.get('/musei/:id_museo/', routes.musei);
app.post('/user/add', routes.adduser);

// definizione della porta del server
app.listen(port, function(){
	console.log('Eseguo sulla porta '+port);
});

// costruzione di una response per errori dell'app
app.use(function(err, req, res, next){
	console.log(err.stack);
	res.status(500).send('Qualcosa non va! \n');
});

// export di app per eventuali moduli
//module.exports = app;