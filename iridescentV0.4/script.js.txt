//Using a constructor function
function Iridescent(target,interval,corbase){
    this.target = target;
    this.interval = interval;
		this.corbase = corbase;
    this.corval = function(){
			var corval = []
			for (var i = 0; i <= 255; i++) {
			  corval[i] = this.corbase + i.toString(16);
			}
			return corval;
		};
};

// You can add a property to a previously defined object type by using the prototype property.
// This defines a property that is shared by all objects of the specified type, rather than by just one instance of the object.
Iridescent.prototype.start = function(val){
  if(0 <= val && val < 255){return val;}
  else{throw new Error('Parameter must encode a single-byte (integer 0 to 255) ');}
}

var iri = new Iridescent("sidebar",1000,"#9832");

function change(index) {

	document.getElementById(iri.target).style.backgroundColor = iri.corval()[index];
	document.getElementById("date").innerHTML = iri.corval()[index];
	console.log(iri.corval()[index])

	setTimeout(function(){
		//console.log(index);
		if(0 <= index && index < 255){index = index+1;}
		else {index = 0;}
		//console.log(index);
		change(index);
	}, iri.interval);

}

  // example befor property type is defined
  //change(iri(250));
	change(iri.start(250));
