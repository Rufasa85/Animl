var express = require('express');
var router = express.Router();
var db = require('../models');

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
			longitude:req.body.longitude
		}).then(function(sighting){
			res.redirect('/sightings')
		})
	})
})

module.exports = router;