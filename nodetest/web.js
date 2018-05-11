const http = require('http');

function handle(req,res){
	console.log('Mi hai chiamato con metodo: '
		+ req.method + 'e con URL: '
		+ req.url);
res.writeHead(200,{'Content-Type': 'application/json'});
res.end(JSON.stringify({error: null})+"\n");
}

var s = http.createServer(handle);
s.listen(8383);