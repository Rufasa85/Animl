var bcrypt = require('bcrypt');
var password = 'password';
bcrypt.hash(password, 10, function (err, hash){
	console.log(password)
	password = hash;
	//console.log(hash);
	//console.log(password)
})