var db = require('../models');

db.user.findOrCreate({
		where:{
			email:'joe@joe.edu'
		},
		defaults: {
			password:'passwordz',
			county:53033
		}
}).spread(function (user, made) {
	db.animal.findOrCreate({
		where:{
			name:'toad lumpsucker'
		},
		defaults: {
			wantedScore: 0
		}
	}).spread(function(animal, created){
		db.sighting.findOrCreate({
			where:{
				userId: user.id,
				animalId: animal.id
			},
			defaults: {
				latitude:122,
				longitude:23465
			}
		}).spread(function(sighting, construct){
			user.addAnimal(animal);
			user.addSighting(sighting);
			animal.addSighting(sighting);
			console.log(animal.get());
			console.log(user.get());
			console.log(sighting.get());
			console.log(created, made, construct);
		})
	})
})