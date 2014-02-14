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


http.listen(app.get("port"), function () {
	console.log("server is up and running.  go to http://" + app.get("ipaddr") + ":" + app.get("port"));
});