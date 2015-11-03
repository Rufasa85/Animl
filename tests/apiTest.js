var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	var lat=47.62
	var lng=-122.32
	request(
		('http://data.fcc.gov/api/block/find?format=json&latitude='+lat+'&longitude='+lng),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				// var sightings = [];
				// var animals = data.data;
				// var noSpecimens = animals.filter(function (animal){
				// 	if (animal.basis === 'Observation') {
				// 		arr.push({lat:animal.decimalLatitude, long:animal.decimalLongitude});
				// 		return true
				// 	}
				// 	else {
				// 		return false
				// 	}
				// })
				res.send(data.County.FIPS)
			}	
		}
	);
});
	
module.exports = router;