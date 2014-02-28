module.exports = function(app, passport) {
	app.get('/auth', passport.authenticate('facebook'));

	// this is my way, because i need to do it this way for an SPA
	app.get('/auth/facebook/callback', passport.authenticate('facebook', function(req, res) {
			console.log("user authenticated")
			console.log("mongo query")
			res.send({"send": "user data"});
			// make a mongodb query w/ id
			// send user data
	}));

	

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/'); // can i even do that in an spa? more likely that i send a json w/ data
	});

	// // i don't think i need this one because it's an spa. i'll deal with it clientside?
	// function isLoggedIn(req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		return next();
	// 	} else {
	// 		res.redirect('/');
	// 	};
	// };


};