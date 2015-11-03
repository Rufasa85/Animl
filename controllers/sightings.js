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
		res.render('sightings', {sightings:sightings})
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

module.exports = router;