var db = require('../models');

db.user.create({
		email:'joe@joe.edu',
		password:'passwordz',
		county:53033
}).then(function (user) {
	console.log(user.get());
})