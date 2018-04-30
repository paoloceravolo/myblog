var view = "\
<section class='post'>\
    <header class='post-header'>\
        <h2 class='post-title'><%= denominazione_museo %></h2>\
                        <p class='post-meta'>\
                            By <a class='post-author' href='<% if(typeof(sito_web_sede) !== 'undefined'){%> <%= sito_web_sede %> <% } %>'><%= comune_sede %></a>\
                        </p>\
                    </header>\
                    <div class='post-description'>\
                        <p>\
                            <%= denominazione_sede %>\
                        </p>\
                    </div>\
                </section>\
";


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
			document.querySelectorAll(".content")[0].innerHTML += render;
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

















