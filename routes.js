var User = require('./models/user');
var mongojs = require('mongojs');
var db = mongojs('enerfeel', ['users']);
module.exports = function(app, passport) {
	app.get('/auth', passport.authenticate('facebook'));

	// this is my way, because i need to do it this way for an SPA
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook'), function(req, res) {
			console.log("user authenticated");
			console.log("mongo query");
			// console.log("req.user");
			console.log(req.user);
			console.log("res")
			// console.log(res);

			// res.redirect('/')
			res.cookie('user', JSON.stringify({
				'token': req.user.token,
				'authLevel': 1,
			}));

			res.redirect('/');
			res.send("blah")
			// console.log("res");
			// console.log(res);
			// res.redirect('/');
			// res.json({"send": "user data"});
			// console.log("res");
			// console.log(res);
			// res.send({"send": "user data"});
			// make a mongodb query w/ id
			// send user data
	});

	app.get('/get', function(req, res) {
		console.log("req.headers");
		console.log(req.headers);
		db.users.findOne({'token' : req.headers.token}, function(err, data) {
			console.log("user Data");
			console.log(data);
			res.send(data.lifeEvents);
		});
		// User.findOne({'token' : req.headers.token}, function(err, user) {
		// 	console.log(user);
		// });
	})


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/'); // can i even do that in an spa? more likely that i send a json w/ data
	});







	// TEST AN ENDPOINT USING ISLOGGEDIN <------------------------------ ******






	// // i don't think i need this one because it's an spa. i'll deal with it clientside?
	// function isLoggedIn(req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		return next();
	// 	} else {
	// 		res.redirect('/');
	// 	};
	// };


};