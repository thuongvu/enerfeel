var User = require('./models/user');
var mongojs = require('mongojs');
var db = mongojs('enerfeel', ['users']);
module.exports = function(app, passport) {

	app.get("/", function (req,res) {
		res.render("index.ejs");
	})

	// app.get("/view/main", function (req,res) {
	// 	res.render("partials/main");
	// })

	app.get('/auth', passport.authenticate('facebook'));

	app.get('/auth/facebook/callback', 
		passport.authenticate('facebook'), function(req, res) {
			console.log("/auth/facebook/callback req.user");
			console.log(req.user);
			
			function setCookieThen(callback) {
				res.cookie('user', JSON.stringify({
					'token': req.user.token,
					'authLevel': 1,
				}), {secure: true, httpOnly: false});
				callback();
			};

			function redirect() {
				res.redirect('/#/view/main');
			};

			setCookieThen(redirect);

	});

	app.get('/get/events', isLoggedIn, function(req, res) {
		console.log("/get req.headers");
		console.log(req.headers);
		if (req.headers.token !== 'null') {
			db.users.findOne({'token' : req.headers.token}, function(err, data) {
				if (err) {
					res.send(300, "Error");
					console.log("error for /get/events ");
				} else {
					console.log("user Data");
					console.log(data);
					res.json({'lifeEvents': data.lifeEvents, 'categories': data.categories});
				};
			});
		};
	});

	app.del('/delete/event', isLoggedIn, function (req, res) {
		console.log("/delete req.headers");
		console.log(req.headers);

		if (req.headers.token !== 'null') {
			db.users.update(
				{token: req.headers.token}, {$pull: {'lifeEvents': {'date': req.body.date}}}
				);
			res.send(200, "maybeeee")
		};
		
	});

	app.post('/post/event', isLoggedIn, function (req, res) {
		console.log('/post req.body');
		console.log(req.body);

		if (req.headers.token !== 'null') {
			var obj = req.body;
			db.users.update(
				{token: req.headers.token},
				{$push: {lifeEvents: obj}},
				{}, // options
				function(err, success) {
					if (err) {
						res.send(300, "Error");
						console.log("error for /post/event ");
					} else {
						res.send(200, "Success");
						console.log("success for /post/success");
					};
				}
			);
			
		};

		
	});

	app.put('/put/event', isLoggedIn, function (req, res) {
		console.log('/put req.body');
		console.log(req.body);
		if (req.headers.token !== 'null') {
			db.users.update(
				{token: req.headers.token, "lifeEvents.date": req.body.date }, 
				{$set: {"lifeEvents.$.energylevel": req.body.energylevel, "lifeEvents.$.note": req.body.note, "lifeEvents.$.date": req.body.date, "lifeEvents.$.category": req.body.category, "lifeEvents.$.opacity": req.body.opacity, "lifeEvents.$.size": req.body.size}},
				{}, // options
				function(err, success) {
					if (err) {
						res.send(300, "Error");
						console.log("Error for /put/event ");
					} else {
						res.send(200, "Success");
						console.log("Success for /post/success");
					};
				}
				);
		};
	});

	// ----------------------

	app.post('/post/category', isLoggedIn, function (req, res) {
		console.log('/post/category req.body');
		console.log(req.body);

		if (req.headers.token !== 'null') {
			var obj = req.body;
			db.users.update(
				{token: req.headers.token},
				{$push: {categories: obj}}, 
				{}, //options
				function(err, success) {
					if (err) {
						res.send(300, "Error");
						console.log("Error for /post/category");
					} else {
						res.send(200, "Success");
						console.log("Success for /post/category");
					};
				}
			);
		};
		
	});

	app.del('/delete/category', isLoggedIn, function (req, res) {
		console.log("/delete/category req.headers");
		console.log(req.headers);
		console.log('req.body');
		console.log(req.body);

		if (req.headers.token !== 'null') {
			db.users.update(
				{token: req.headers.token}, {$pull: {'categories': {'label': req.body.label}}},
				{}, //options
				function(err, success) {
					if (err) {
						res.send(300, "Error");
						console.log("Error for /delete/category");
					} else {
						res.send(200, "Success");
						console.log("Success for/delete/category");
					};
				}
			);
		};
		
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		};
	};


};