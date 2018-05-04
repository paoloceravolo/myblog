// variabile contenente il template da applicare
var view = "\
<section class='post'>\
    <header class='post-header'>\
        <h2 class='post-title'><%= denominazione_museo %></h2>\
                        <p class='post-meta'>\
                            By <a class='post-author' href='<% if(typeof(sito_web_sede) !== 'undefined'){%> <%= sito_web_sede %> <% } %>'><%= comune_sede %></a>\
                            <a class='post-category post-category-design' href='<% if(typeof(location.coordinates) !== 'undefined'){%> http://www.google.com/maps/place/<%= location.coordinates[1] %>,<%= location.coordinates[0] %><% } %>' target='_blank'>MAPPA</a>\
                        </p>\
                    </header>\
                    <div class='post-description'>\
                        <p>\
                            <%= denominazione_sede %>\
                        </p>\
                    </div>\
                </section>\
";

// zoom sulle immagini
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

// Selezione sulla provincia
var selezione = document.querySelectorAll("select")[0];
selezione.addEventListener("change", function(){
	console.log("cambio selezione");
	var prov = selezione.value;
	loadData(prov);
});

// Oggetto per includere le coordiante geografiche del dataset
var locations = []

// chiamata AJAX per acquisire i dati
function loadData(prov){
var request = new XMLHttpRequest();
method = 'GET';
uri = 'https://www.dati.lombardia.it/resource/rbg8-vnzg.json';
//uri= 'rbg8-vnzg.json';
request.open(method,uri,true);
request.onload = function(){
	if(request.status >= 200 && request.status < 400){
		console.log('Success!');
		//clean the .posts div
		document.querySelectorAll(".posts")[0].innerHTML = "";
		//console.log(request.responseText);
		var resp = JSON.parse(request.responseText);
		//console.log(resp[0]);
		// scorrere gli oggetti dell'array del file JSON
		
		//console.log("Lung è" + resp.length);
		//console.log(resp[155].location.coordinates)
		//for(var i=0;i<156;i++){
		for(var i=0;i<resp.length;i++){
			// filtro per provincia
			if(resp[i].provincia_sede == prov){
			var template = _.template(
			view
			);
			var render = template(resp[i]);
			document.querySelectorAll(".posts")[0].innerHTML += render;
			}
			// extract the coordinates
			if(resp[i].location){
				var coor = {};
				coor.lat = resp[i].location.coordinates[1];
				coor.lng = resp[i].location.coordinates[0];
				//console.log(coor);
				locations.push(coor);
			}
		}
		//console.log(locations);
		initMap();
	}else{
		throw new Error('BOOM');
	}
};
request.onerror = function(){
	throw new Error('There was a connection error of some sort');
};
//request.withCredentials = true;
request.send();
}
















