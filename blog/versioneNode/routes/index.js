// Importing script for loading data 
var Data = require('../util/loaddata.js');

// Routing rules

exports.index = function(req, res){
	console.log('se devi fare login sei nel posto giusto');
	var rdata = {'err': null, 'metadata':{'title': 'Musei della Lombardia'}};
  	res.render('index', rdata);
};

exports.mappa = function(req, res){
	console.log('se cerchi la mappa sei nel posto giusto');
	var rdata = {'err': null, 'metadata':{'title': 'Musei della Lombardia'}};
	res.render('mappa', rdata);
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
		'err': null, 
		'metadata':{'title': 'Musei della Lombardia'},
		'data':filtered[0]
	 	}
	res.render('museo', rdata);
	data.removeAllListeners();
	})
	// import data
	data.process();

};
