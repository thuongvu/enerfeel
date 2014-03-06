var express = require("express");
var app = express();
var http = require("http").createServer(app);
var _ = require("underscore");
var mongojs = require('mongojs');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var db = mongojs('enerfeel', ['lifeEventsCollection']);
var ObjectId = mongojs.ObjectId;
mongoose.connect(configDB.url);
require ('./config/passport')(passport);
app.use(express.logger('dev')); 
app.use(express.bodyParser()); 
app.set('view engine', 'ejs'); 
app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
app.use(express.static("public", __dirname + "/public"));

// ssl ---------
var options = {
	key: fs.readFileSync('../enerfeelhidden/server.key'),
	cert: fs.readFileSync('../enerfeelhidden/server.crt'),
	ca: fs.readFileSync('../enerfeelhidden/ca.crt'),
	requestCert: true,
	rejectUnauthorized: false,
};
var https = require("https").createServer(options, app);
// ssl end -------

// csrf 
var csrfValue = function(req) {
	var token = (req.body && req.body._csrf) 
	|| (req.query & req.query._csrf) 
	|| (req.headers['x-csrf-token']) 
	|| (req.headers['x-xsrf-token']);
	return token;
};

app.use(express.cookieParser('mysecretheresdfsdf'));
app.use(express.cookieSession());

app.use(express.csrf({value: csrfValue}));
app.use(function(req, res, next) {
	res.cookie('XSRF-TOKEN', req.session._csrf);
	next();
});
// ----- csrf end

app.use(express.session({secret: 'ireallydislikedoingauthenticaitonihopethisissecureenough'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./routes.js')(app, passport);

http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});

https.listen(8081, function() {
	console.log("https server is up and running")
})