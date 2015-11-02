var express = require('express');
var router = express.Router();
zip2Fips = require('./zip2fips.json')

router.get('/', function(req, res) {
	res.send(zip2Fips)
})

router.get('/:zip', function (req, res) {
	var zip = req.params.zip
	res.send(zip2Fips[zip])	
})

module.exports = router;
