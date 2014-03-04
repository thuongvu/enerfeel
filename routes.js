var User = require('./models/user');
var mongojs = require('mongojs');
var db = mongojs('enerfeel', ['users']);
module.exports = function(app, passport) {
	app.get('/auth', passport.authenticate('facebook'));

	// this is my way, because i need to do it this way for an SPA
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook'), function(req, res) {
			console.log("req.user");
			console.log(req.user);
			res.cookie('user', JSON.stringify({
				'token': req.user.token,
				'authLevel': 1,
			}));

			res.redirect('/');
	});

	app.get('/get', isLoggedIn, function(req, res) {
		console.log("req.headers");
		console.log(req.headers);
		if (req.headers.token !== 'null') {
			db.users.findOne({'token' : req.headers.token}, function(err, data) {
				console.log("user Data");
				console.log(data);
				res.send(data.lifeEvents);
			});
		};
	});


	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/'); // can i even do that in an spa? more likely that i send a json w/ data
	});







	// TEST AN ENDPOINT USING ISLOGGEDIN <------------------------------ ******






	// // i don't think i need this one because it's an spa. i'll deal with it clientside?
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		};
	};


};