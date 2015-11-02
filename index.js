var express = require('express');
var app = express();
var request = require('request');
var apiTest = require('./apiTest.js');
var zip2Fips = require('./zip2fipsTest.js')

var ejsLayouts = require('express-ejs-layouts');
app.use(ejsLayouts);
app.set('view engine', 'ejs');

app.use('/', express.static(__dirname + '/static/'));

app.get('/', function(req, res) {
	res.render('index')
});

app.use('/test', apiTest)
app.use('/zip', zip2Fips)
	

app.listen(3000);