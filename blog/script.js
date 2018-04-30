var view = "<div class='posts'>\
<p><%= denominazione_museo %></p></div>"


var img = document.querySelectorAll(".post-avatar");
console.log(img.length);

for(var i=0;i<img.length;i++){
	console.log(i);
	img[i].addEventListener("mouseover",function(){
		this.style.zoom = 1.5;
	});
	img[i].addEventListener("mouseout",function(){
		this.style.zoom = 1;
	});
};

var request = new XMLHttpRequest();
method = 'GET';
uri = 'https://www.dati.lombardia.it/resource/rbg8-vnzg.json';
request.open(method,uri,true);
request.onload = function(){
	if(request.status >= 200 && request.status < 400){
		console.log('Success!');
		//console.log(request.responseText);
		var resp = JSON.parse(request.responseText);
		//console.log(resp[0]);
		for(var i=0;i<resp.length;i++){
			var template = _.template(
			view
			);
			var render = template(resp[i]);
			//Attenzione, con questa istruzione il body viene ricaricato, annullando le manipolazioni svolte su gli elementi .post-avatar
			document.body.innerHTML += render;
		}
	}else{
		throw new Error('BOOM');
	}
};
request.onerror = function(){
	throw new Error('There was a connection error of some sort');
};
//request.withCredentials = true;
request.send();

















