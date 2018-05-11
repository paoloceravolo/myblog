const http = require('http');
const fs = require('fs');

var s = http.createServer();
// s.on ('request', (req, res) => {});
s.on('request', function(req,res){
	
	console.log('Mi hai chiamato con metodo: '
		+ req.method + 'e con URL: '
		+ req.url);

	var appRoot = process.cwd();
	var path = appRoot + req.url;

	fs.readdir(path, function(err,files){
		//console.log(files);
		if(err){
res.writeHead(400,{'Content-Type': 'application/json'});
res.end(JSON.stringify({error: err})+"\n");
		};
res.writeHead(200,{'Content-Type': 'application/json'});
res.end(JSON.stringify({data: files})+"\n");

	});


});
s.listen(8383);