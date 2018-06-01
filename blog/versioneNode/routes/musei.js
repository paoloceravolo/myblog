exports.musei = function(req, res){
 	console.log('se cerchi musei sei nel posto giusto');
 	var museo = req.params.id_museo;
 	res.send('Questa è la pagina del museo '+museo+'\n');
 };

// var request = require('request');
// request('https://randomuser.me/api/', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     //console.log(body) // Print the google web page.
//     ready(JSON.parse(body));
//   }
// })
//}