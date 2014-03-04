var User = require('./models/user');
var mongojs = require('mongojs');
var db = mongojs('enerfeel', ['users']);
module.exports = function(app, passport) {
	app.get('/auth', passport.authenticate('facebook'));

	// this is my way, because i need to do it this way for an SPA
	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook'), function(req, res) {
			console.log("/auth/facebook/callback req.user");
			console.log(req.user);
			res.cookie('user', JSON.stringify({
				'token': req.user.token,
				'authLevel': 1,
			}));

			res.redirect('/');
	});

	app.get('/get', isLoggedIn, function(req, res) {
		console.log("/get req.headers");
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
		res.redirect('/');
	});

	app.del('/delete', function (req, res) {
		console.log("/delete req.headers");
		console.log(req.headers);

		if (req.headers.token !== 'null') {
			db.users.update(
				{token: req.headers.token}, {$pull: {'lifeEvents': {'date': req.body.date}}}
				);
			res.send(200, "maybeeee")
		};
		
	});

	app.post('/post', function (req, res) {
		console.log('/post req.body');
		console.log(req.body);

		if (req.headers.token !== 'null') {
			var obj = req.body;
			db.users.update(
				{token: req.headers.token},
				{$push: {lifeEvents: obj}}
			);
		};
		
	});

	app.put('/put', function (req, res) {
		console.log('/put req.body');
		console.log(req.body);
		if (req.headers.token !== 'null') {
			db.users.update(
				{token: req.headers.token, "lifeEvents.date": req.body.date }, 
				{$set: {"lifeEvents.$.energylevel": req.body.energylevel, "lifeEvents.$.note": req.body.note, "lifeEvents.$.date": req.body.date, "lifeEvents.$.category": req.body.category, "lifeEvents.$.opacity": req.body.opacity, "lifeEvents.$.size": req.body.size}}
				);
		};
		res.send(200, 'modded it!')
	});


	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		};
	};


};