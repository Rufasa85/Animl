var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res) {
	request(
		('http://bison.usgs.ornl.gov/api/search.json?species=orca&type=common_name&state=Alaska'),
		function(error, response, body) {
			if(!error && response.statusCode === 200) {
				var data = JSON.parse(body);
				res.send(data)
			}	
		}
	);
});
	
module.exports = router;