// Importing script for loading data 
var Data = require('../util/loaddata.js');

// Routing rules

exports.index = function(req, res){
	console.log('se devi fare login sei nel posto giusto');
	var rdata = {'err': req.session.errors, 'metadata':{'title': 'Musei della Lombardia'}};
  	res.render('index', rdata);
};

exports.mappa = function(req, res){
	console.log('se cerchi la mappa sei nel posto giusto');
	if(req.session.email == 'p@unimi.it'){
		var rdata = {'err': req.session.errors, 'metadata':{'title': 'Musei della Lombardia'}};
		res.render('mappa', rdata);
	}else{res.status(500).send('Non sei autenticato! \n');};
};

exports.musei = function(req, res){

	// execution log
	console.log('se cerchi musei sei nel posto giusto');
	// create variable to save imported data
	var data = new Data();
	// create variable to save url parameters
	var museo = req.params.id_museo;
	// event handler 
	data.on('done', function(event){
	console.log('Questa è la pagina del museo '+museo);
	console.log('Leggo evento e verifico: ', event.data[22].comune_sede);
	//console.log(event);
	function isSelectedId(value) {
  	return value.codice_museo == museo;
	}
	var filtered = event.data.filter(isSelectedId);
	console.log(filtered);
	var rdata = {
		'err': req.session.errors, 
		'metadata':{'title': 'Musei della Lombardia'},
		'data':filtered[0]
	 	}
	res.render('museo', rdata);
	data.removeAllListeners();
	})
	// import data
	data.process();

};

exports.adduser = function(req, res){
	let email = req.body.email;
	let pass = req.body.pass;

	req.checkBody('email','Please enter a valid email').isEmail();
	req.checkBody('email','Name is required').notEmpty();
	req.checkBody('pass','Name is required').notEmpty();

	const errors = req.validationErrors();
	if(errors | email!=='p@unimi.it'){
		req.session.errors = errors;
		res.redirect('/');
	}else{
		req.session.success = true;
		req.session.email = email;
		res.redirect('/mappa');
	};
}
