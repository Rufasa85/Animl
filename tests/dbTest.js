var db = require('../models');

db.user.findOrCreate({
	where:{
		email:'joe@joe.org' 
	},
	defaults :{
		password:'pass',
		county:53033
	}
}).spread(function (user, created) {
	console.log(user.get());
	console.log(created);
})