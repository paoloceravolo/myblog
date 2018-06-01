// load data
var request = require('request');
var util = require('util');

var Data = function Data(){
	this.process = function(){
		// funzioni varie
		this.emit('done', {date: new Date()})
	}
}
util.inherits(Data, require('events').EventEmitter);
module.exports = Data;


var data = {};
var options = {
	url: 'https://www.dati.lombardia.it/resource/rbg8-vnzg.json',
	headers: {'User-Agent': 'request'}
};

function callback(error, response, body){
	if(!error && response.statusCode == 200){
		var info = JSON.parse(body);
		console.log('Dati caricati: ');
		data = info[2].comune_sede;
	}
};
request(options,callback);

module.exports.d = data;
module.exports.sum = function(a,b){return a+b};
