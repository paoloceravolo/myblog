const http = require('http');
const fs = require('fs');

function lista_dir(path,callback){
	fs.readdir(path,function(err,files){
		if(err){callback(err);return}
		var dir = [];
		//la funzione iterator consente di eseguire la callback solo a conclusione del cilco, oppur ein caso di errore 
		function iterator(index){
			if(index == files.length){
				callback(null,dir);
				return;
			}
			fs.stat(path + files[index],
				function(err,stats){
					if(err){callback(err);return};
					if(stats.isDirectory()){
						dir.push(files[index]);
					};
					iterator(index+1);
				});
		}
		iterator(0);
	});
};

var s = http.createServer();
// s.on ('request', (req, res) => {});
s.on('request', function(req,res){
	
	console.log('Mi hai chiamato con metodo: '
		+ req.method + 'e con URL: '
		+ req.url);

	var appRoot = process.cwd();
	var path = appRoot + req.url;

	lista_dir(path,function(err, listed){
		var error = {'error': err};
		var output = {'error': null,
		'data': listed};
		if(err){
res.writeHead(400,{'Content-Type': 'application/json'});
res.end(JSON.stringify(error)+"\n");
		}
res.writeHead(200,{'Content-Type': 'application/json'});
res.end(JSON.stringify(output)+"\n");
	});
});
s.listen(8383);