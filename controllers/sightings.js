var express = require('express');
var router = express.Router();
var db = require('../models');
var request = require('request');

router.get('/', function(req,res){
	db.sighting.findAll({
		where:{
			userId: req.session.user.id
		},
		include:[db.animal]
	}).then(function(sightings){
		var dates =[];
		sightings.forEach(function(sighting){
			var dateString = JSON.stringify(sighting.date).split('T')[0];
			dateString=dateString.slice(1,dateString.length);
			dates.push(dateString);
		})
		res.render('sightings', {sightings:sightings, dates:dates})
	})
})

router.route('/new').get(function(req, res){
	res.render('sightings/new')
}).post(function(req,res) {
	request(
		('http://data.fcc.gov/api/block/find?format=json&latitude='+req.body.latitude+'&longitude='+req.body.longitude),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				var county = data.County.FIPS;
				db.animal.findOrCreate({
					where:{
						name:req.body.animal
					},
					defaults: {
						wantedScore:0
					}
				}).spread(function(animal,created){
					animal.createSighting({
						userId:req.session.user.id,
						name: req.body.animal,
						date:req.body.date,
						latitude:req.body.latitude,
						longitude:req.body.longitude,
						county:county
					}).then(function(sighting){
						res.redirect('/sightings')
					})
				})
			}
		}
	)
})

router.route('/:id').get(function(req,res){
	db.sighting.findAll({
		where:{
			id:req.params.id
		},
		include:[db.animal]
		}).then(function(sighting){
			//manipulating date value so it will autopopulate input field
			var dateString = JSON.stringify(sighting[0].date).split('T')[0];
			dateString=dateString.slice(1,dateString.length);
		res.render('sightings/show', {sighting:sighting[0], date:dateString})
	})
}).post(function(req,res){
	request(
		('http://data.fcc.gov/api/block/find?format=json&latitude='+req.body.latitude+'&longitude='+req.body.longitude),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				var county = data.County.FIPS;
				db.animal.findOrCreate({
					where:{
						name:req.body.animal
					},
					defaults: {
						wantedScore:0
					}
				}).spread(function(animal,created){
					db.sighting.findById(req.params.id).then(function(sighting){
						sighting.animalId=animal.id;
						sighting.name= animal.name;
						sighting.date = req.body.date;
						sighting.latitude = req.body.latitude;
						sighting.longitude= req.body.longitude,
						sighting.county = county
						sighting.save().then(function(sighting){
							res.redirect('/sightings')
						})
					})
				})
			}
		}
	)
}).delete(function(req, res) {
	db.sighting.destroy({
		where:{
			id: req.params.id
		}
	}).then(function(){
		res.send('DELTED!')
	})
})

module.exports = router;