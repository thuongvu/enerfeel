var express = require("express");
var app = express();
var http = require("http").createServer(app);
var _ = require("underscore");
var mongojs = require('mongojs');
var https = require('https');
var fs = require('fs');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport')
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var db = mongojs('enerfeel', ['lifeEventsCollection']);
mongoose.connect(configDB.url);
app.use(express.logger('dev')); 
app.use(express.bodyParser()); 
app.set('view engine', 'ejs'); 
app.set("ipaddr", "127.0.0.1");
app.set("port", 8080);
app.set("views", __dirname + "/views");
app.use(express.static("public", __dirname + "/public"));

app.get("/", function(req,res) {
	res.render("index.ejs");
})

app.get("/get", function (req, res) {
	// db.lifeEventsCollection.find(function(err, data) {
	// 	console.log(data);
	// 	res.json(data);
	// })
	
	db.lifeEventsCollection.find().stream().pipe(res);
	// var stream = db.lifeEventsCollection.find().stream();

	// stream.on('data', function(data) {

	// }).on('error', function(err) {

	// }).on('close', function() {
	// 	res.send(data);
	// });
	// var sampleData = [
	//  {"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
	//  {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
	//  {"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 5}, 
	//  {"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 15},
	//  {"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size":10},
	//  {"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
	//  {"date": new Date(), "energylevel":4, "note":"slept for a long time", "category": "sleep", "opacity": 1, "size": 10},
	//  {"date": new Date(), "energylevel":5, "note":"ate sensu bean", "category": "meal", "opacity": 4, "size": 5}
	//  ];
	// res.json(sampleData);
});

app.post('/post', function (req, res) {
	console.log(req.body);
	// remember to sanitize this object!!!!!
	var obj = req.body;
	db.lifeEventsCollection.save(obj, function(err, saved) {
		if (err || !saved) {
			console.log("didnt save");
			res.send(200, "SHIT");
		} else {
			console.log("saved");
			res.send(200, "aloha");
		};
	});
});


http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});