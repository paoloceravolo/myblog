var i = 0;

function cangiant() {

	var d = new Date();
	var color = "#" + d.getMinutes() + d.getSeconds() + d.getMilliseconds();;

	//var xss = "<img src='http://url.to.file.which/not.exist' onerror=alert(document.cookie);>";
	//color = xss;
	document.getElementById("sidebar").style.backgroundColor = color;
	//document.getElementById("date").innerHTML = color;
	var nodeDate = document.getElementById('date');
	if(nodeDate.childNodes[0]){nodeDate.removeChild(nodeDate.childNodes[0])};
	nodeDate.appendChild(document.createTextNode(color));

	i++; //  increment the counter
	setTimeout(function(){

      	//if (i < 100) {
		cangiant();
		//}
	}, 3000);

console.log(color);
//cangiant();
}

cangiant();

//console.log(color);
