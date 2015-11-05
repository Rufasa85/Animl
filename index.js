var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('./models');
//allows me to accept zipcode, return county FIPS code for use in the BISON API
var zip2Fips = require('./zip2fips.json');
//api testing
 // var apiTest = require('./tests/apiTest.js');
// //zip code to fips code testing
// var zip2Fips = require('./zip2fipsTest.js');
var searchController= require('./controllers/search.js');
var sightingsController = require('./controllers/sightings.js')
var ejsLayouts = require('express-ejs-layouts');
//adding sessions, attempting proper authentication
var session = require('express-session');
//adding flash
var flash = require('connect-flash');

//middlewarez
app.use('/', express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
//generating sessions
app.use(session({
  secret: 'dsafasdpghaweoiksghvnasdpoikrhfewpui4h3298p5uy2498p5y24p9utghqw4h9e8uroyqw4e988uriythq34pru',
  resave: false,
  saveUninitialized: true
}));
//checking if user has logged in
app.use(function(req, res, next) {
	if (req.session.user){
		db.user.findById(req.session.user).then(function(user){
			if(user) {
				req.currentUser = user.id;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	}
	else {
		req.currentUser = false;
		next();
	}
});
app.use(flash());
//setting current user to a local variable
app.use(function(req, res, next) {
	res.locals.currentUser = req.currentUser;
	res.locals.alerts = req.flash();
	next();
});

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.render('index')
});

app.route('/signup').get(function(req, res) {
	res.render('signup');
	}).post(function(req, res){
		if(req.body.password !== req.body.password2) {
			req.flash("danger", "Passwords need to match yo!");
			res.redirect('/signup');
		}
		else{
			var county = zip2Fips[req.body.zipcode];
			db.user.findOrCreate({
				where: {
					email:req.body.email
				},
				defaults: {
					password: req.body.password,
					county: county
				}
			}).spread(function(user, created){
				if(created) {
					req.flash('success', 'You are all signed up!');
					res.redirect('/');
				}
				else {
					req.flash('warning', 'That email is already in use!');
					res.redirect('/signup');
				}
			}).catch(function(error){
				req.flash('danger', 'ERROR! ERROR!');
				res.redirect('/signup')
			});	
		}
	})

app.route('/login').get(function(req,res){
		res.render('login');
	}).post(function(req,res){
		db.user.authenticate(
			req.body.email, 
			req.body.password, 
			function(err, user){
				if (err) {
					res.send(err);
				}
				else if (user) {
					req.session.user = user.id;
					req.flash('success', 'You are logged in, spiffy person');
					res.redirect("/");
				}
				else {
					req.flash('warning', 'invalid username or password');
					res.redirect('/login');
				}
			}
		)
	});
app.get('/logout', function(req, res) {
	req.session.user = false;
	req.flash('warning', 'you have logged out!')
	res.redirect('/')
});

app.get('/about', function(req, res) {
	res.render('about')
});

app.get('/about/alexmac', function(req, res) {
	res.render('alex')
});
		
 // app.use('/test', apiTest);
// app.use('/zip', zip2Fips);
app.use('/search', searchController);
app.use('/sightings', sightingsController);
	

app.listen(process.env.PORT || 3000);