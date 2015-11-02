var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	request(
		('http://bison.usgs.ornl.gov/api/search.json?species=orca&type=common_name&state=Alaska'),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				var sightings = [];
				var animals = data.data;
				var noSpecimens = animals.filter(function (animal){
					if (animal.basis === 'Observation') {
						arr.push({lat:animal.decimalLatitude, long:animal.decimalLongitude});
						return true
					}
					else {
						return false
					}
				})
				res.send(sightings)
			}	
		}
	);
});
	
module.exports = router;