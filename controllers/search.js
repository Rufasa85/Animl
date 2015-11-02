var express = require('express');
var router = express.Router();
//route to animal search form
router.get('/', function(req, res){
	res.render('search')
})

//route to search results
router.get('/:animal', function(req, res){
	var animal = req.params.animal;
	res.render('search/show', {animal:animal})
})

module.exports = router