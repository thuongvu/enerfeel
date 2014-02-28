module.exports = function(app, passport) {
	app.get('/auth', passport.authenticate('fb'));

	// app.get('/auth/callback', passport.authenticate('fb', function(req, res) {
	// }));

	// app.get('/logout', function (req, res) {
	// 	req.logout();
	// 	res.redirect('/');
	// });

	// // i don't think i need this one
	// function isLoggedIn(req, res, next) {
	// 	if (req.isAuthenticated()) {
	// 		return next();
	// 	} else {
	// 		res.redirect('/');
	// 	};
	// };


};