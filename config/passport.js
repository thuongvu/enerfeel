// var FB 
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FacebookStrategy({
		clientID: configAuth.facebookAuth.clientID,
		clientSecret:configAuth.facebookAuth.clientSecret,
		callbackURL: configAuth.facebookAuth.callbackURL
	},

	function(token, refreshToken, profile, done) {
		process.nextTick(function() {
			User.findOne({'id' : profile.id}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user);
				} else {
					var newUser = new User();

					newUser.id = profile.id;
					newUser.token = token;
					newUser.name = profile.name.givenName;

					newUser.save(function(err) {
						if (err) {
							throw err;
						} else {
							return done(null, newUser);
						};
					});

				}
			});
		});
	}));
};