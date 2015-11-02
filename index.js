var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
//api testing
var apiTest = require('./apiTest.js');
//zip code to fips code testing
var zip2Fips = require('./zip2fipsTest.js');
var searchController= require('./controllers/search.js');
var ejsLayouts = require('express-ejs-layouts');
//adding sessions, attempting proper authentication
var session = require('express-session');

//middlewarez
app.use('/', express.static(__dirname + '/static/'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'dsafasdpghaweoiksghvnasdpoikrhfewpui4h3298p5uy2498p5y24p9utghqw4h9e8uroyqw4e988uriythq34pru',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');


app.get('/', function(req, res) {
	res.render('index')
});

app.get('/signup', function(req, res) {
	res.render('signup')
});

app.get('/login', function(req, res) {
	res.render('login')
});

app.use('/test', apiTest);
app.use('/zip', zip2Fips);
app.use('/search', searchController)
	

app.listen(3000);