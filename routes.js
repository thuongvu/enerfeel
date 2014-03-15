var User = require('./models/user');
var mongojs = require('mongojs');
var db = mongojs('enerfeel', ['users']);
var sanitizer = require('sanitizer');
module.exports = function(app, passport) {

	app.get("/", function (req,res) {
		res.render("index.ejs");
	})

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

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);

		if (req.headers.token !== 'null') {
			db.users.findOne({'token' : sanitizedHeadersToken}, function(err, data) {
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

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);
		var sanitizedReqBodyDate = sanitizer.sanitize(req.body.date);

		if (req.headers.token !== 'null') {
			db.users.update(
				{token: sanitizedHeadersToken}, {$pull: {'lifeEvents': {'date': sanitizedReqBodyDate}}},
				{}, // options
				function(err, success) {
					if (err || success == 0) {
						res.send(300, "Error");
						console.log("error for /delete/event");
					} else {
						res.send(200, "Success");
						console.log("success for /delete/event");
					};
				}
			);
		};
		
	});

	app.post('/post/event', isLoggedIn, function (req, res) {
		console.log('/post req.body');
		console.log(req.body);

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);

		if (req.headers.token !== 'null') {
			var obj = {
				energylevel: sanitizer.sanitize(req.body.energylevel),
				note: sanitizer.sanitize(req.body.note),
				date: sanitizer.sanitize(req.body.date),
				category: sanitizer.sanitize(req.body.category),
				opacity: sanitizer.sanitize(req.body.opacity),
				size: sanitizer.sanitize(req.body.size)
			};

			db.users.update(
				{token: sanitizedHeadersToken},
				{$push: {lifeEvents: obj}},
				{}, // options
				function(err, success) {
					if (err || success == 0) {
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

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);


		if (req.headers.token !== 'null') {

			var obj = {
				energylevel: sanitizer.sanitize(req.body.energylevel),
				note: sanitizer.sanitize(req.body.note),
				date: sanitizer.sanitize(req.body.date),
				category: sanitizer.sanitize(req.body.category),
				opacity: sanitizer.sanitize(req.body.opacity),
				size: sanitizer.sanitize(req.body.size)
			};

			db.users.update(
				{token: sanitizedHeadersToken, "lifeEvents.date": obj.date }, 
				{$set: {"lifeEvents.$.energylevel": obj.energylevel, "lifeEvents.$.note": obj.note, "lifeEvents.$.date": obj.date, "lifeEvents.$.category": obj.category, "lifeEvents.$.opacity": obj.opacity, "lifeEvents.$.size": obj.size}},
				{}, // options
				function(err, success) {
					if (err || success == 0) {
						res.send(300, "Error");
						console.log("Error for /put/event ");
					} else {
						console.log(success);
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

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);

		if (req.headers.token !== 'null') {
			var obj = {
				label: sanitizer.sanitize(req.body.label),
				value: sanitizer.sanitize(req.body.value),
				size: sanitizer.sanitize(req.body.size),
				opacity: sanitizer.sanitize(req.body.opacity),
				show: sanitizer.sanitize(req.body.show),
				sizeCeiling: sanitizer.sanitize(req.body.sizeCeiling),
				opacityCeiling: sanitizer.sanitize(req.body.opacityCeiling)
			};
			console.log(obj);
			db.users.update(
				{token: sanitizedHeadersToken},
				{$push: {categories: obj}}, 
				{}, //options
				function(err, success) {
					if (err || success == 0) {
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

		var sanitizedHeadersToken = sanitizer.sanitize(req.headers.token);
		var sanitizedReqBodyLabel = sanitizer.sanitize(req.body.label)

		if (req.headers.token !== 'null') {
			db.users.update(
				{token: sanitizedHeadersToken}, {$pull: {'categories': {'label': sanitizedReqBodyLabel}}},
				{}, //options
				function(err, success) {
					if (err || success == 0) {
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
		console.log("/logout");
		console.log(req.headers);
		console.log('req.session');
		console.log(req.session);
		function logOut(callback) {
			req.session = null;
			console.log(req.session);
			callback()
		}
		function sendTwoHundred() {
			res.send(200);
		};

		logOut(sendTwoHundred);
	});

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		};
	};


};