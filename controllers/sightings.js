var express = require('express');
var router = express.Router();
var db = require('../models')

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

module.exports = router;