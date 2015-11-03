var express = require('express');
var router = express.Router();
//allows me to accept zipcode, return county FIPS code for use in the BISON API
var zip2Fips = require('../zip2fips.json');
var request= require('request');

//route to animal search form
router.route('/').get(function(req, res){
	res.render('search');
}).post(function(req,res){
	var county = req.body.county || zip2Fips[req.body.zip];
	console.log(county);
	request(
		('http://bison.usgs.ornl.gov/api/search.json?species='+ req.body.animal +'&type=common_name&countyFips='+county+'&count=100'),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				var sightings = [];
				var animals = data.data;
				var noSpecimens = animals.filter(function (animal){
					if (animal.basis === 'Observation') {
						sightings.push({lat:animal.decimalLatitude, long:animal.decimalLongitude});
						return true
					}
					else {
						return false
					}
				})
				res.render('search/show', {sightings:sightings, animal:req.body.animal} )
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