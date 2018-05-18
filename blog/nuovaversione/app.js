const express = require('express');
const app = express();
const port = 8383;

app.get('/', function(){
	console.log('Sono qui mi hai chiamato!');
});

app.get('/musei/', function(){
	console.log('se cerchi musei sei nel posto giusto');
});

app.get('/mappa/', function(){
	console.log('se cerchi musei sei nel posto giusto');
});

app.listen(port, function(){
	console.log('Eseguo sulla porta '+port);
});