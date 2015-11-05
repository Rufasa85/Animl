var express = require('express');
var router = express.Router();
var db = require('../models')
//allows me to accept zipcode, return county FIPS code for use in the BISON API
var zip2Fips = require('../zip2fips.json');
var request= require('request');

//route to animal search form
router.route('/').get(function(req, res){
	if(req.session.user){
		db.user.findById(req.session.user).then(function(user){	
			res.render('search', {user:user});
		})
	}
	else {
		res.render('search', {user:false});
	};
}).post(function(req,res){
	var county = req.body.county || zip2Fips[req.body.zip];
	//console.log(county);
	var reportedSightings = [];
	db.animal.find({
		where:{
			name: req.body.animal.toLowerCase()
		}
	}).then(function(animal){
		if(animal){
			db.sighting.findAll({
				where:{
					animalId: animal.id,
					county:county
				}
			}).then(function(sightings){
				sightings.forEach(function(sighting){
					reportedSightings.push({lat:sighting.latitude, lng:sighting.longitude})
				})
			})
		}
	})
	request(
		('http://bison.usgs.ornl.gov/api/search.json?species='+ req.body.animal.toLowerCase() +'&type=common_name&countyFips='+county+'&count=100'),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				var animals = data.data;
				var sightings = [];
				animals.forEach(function (animal){
						sightings.push({lat:animal.decimalLatitude, lng:animal.decimalLongitude});
				})
				res.render('search/show', {sightings:sightings, animal:req.body.animal.toLowerCase(), reportedSightings:reportedSightings} )
			}	
		}
	);
});

// //route to search results
// router.get('/:animal', function(req, res){
// 	var animal = req.params.animal;
// 	res.render('search/show', {animal:animal})
// })

module.exports = router