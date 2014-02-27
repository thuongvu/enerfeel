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
var ObjectId = mongojs.ObjectId;
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
	console.log(req.body);
	db.lifeEventsCollection.find(function(err, data) {
		console.log(data);
		res.json(data);
	});
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

app.del('/delete', function (req, res) {
	console.log(req.body);
	console.log(req.body._id);
	db.lifeEventsCollection.remove({_id: ObjectId(req.body._id)});
	res.send(200, "maybeeee")
	// res.send(300, "ERROR")
});

app.put('/put', function (req, res) {
	console.log(req.body);
	console.log(req.body._id);
	console.log(req.body.note);
	db.lifeEventsCollection.findAndModify({
		query: {_id: ObjectId(req.body._id)},
		update: {energylevel: req.body.energylevel, note: req.body.note, date: req.body.date, category: req.body.category, opacity: req.body.opacity, size: req.body.size},
		new: true
	})
	res.send(200, 'modded it!')
})


http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});