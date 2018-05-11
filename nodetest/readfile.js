const fs = require('fs');

var arg = process.argv;

var buf = fs.readFileSync(arg[2]);
var str = buf.toString();

console.log(str);