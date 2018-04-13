// Using object initializers
var iridescent = {
    target: "sidebar",
    interval : 1000,
		corbase: "#6699",
    corval : function(){
			var corval = []
			for (var i = 0; i <= 255; i++) {
			  corval[i] = this.corbase + i.toString(16);
			}
			return corval;
		},
};

function change(index) {

	document.getElementById(iridescent.target).style.backgroundColor = iridescent.corval()[index];
	document.getElementById("date").innerHTML = iridescent.corval()[index];
	console.log(iridescent.corval()[index])

	setTimeout(function(){
		//console.log(index);
		if(0 <= index && index < 255){index = index+1;}
		else {index = 0;}
		//console.log(index);
		change(index);
	}, iridescent.interval);

}

	change(250);

//console.log(color);
