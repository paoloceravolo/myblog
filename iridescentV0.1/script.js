var i = 0;

function cangiant() {

	var d = new Date();
	var color = "#" + d.getHours() + d.getMinutes() + d.getSeconds();

	document.getElementById("sidebar").style.backgroundColor = color;
	document.getElementById("date").innerHTML = color;

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

// document.getElementById("date").innerHTML = d.getHours();
//console.log(color);