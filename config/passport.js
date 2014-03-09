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
			User.findOne({'fbID' : profile.id}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					user.token = token;
					user.save(function(err, success) {
						return done(null, user);
					});
					
				} else {
					var newUser = new User();

					newUser.fbID = profile.id;
					newUser.token = token;
					newUser.name = profile.name.givenName;
					// newUser.categories = [
					// 	{label:'Choose a category', value: 'noCategoryChosen'},
					// 	{label:'meal', value: 'meal'},
					// 	{label: 'exercise', value: 'exercise', size: 'Minutes', opacity: 'Intensity Level, 1-5', show: 'show.exercise'},
					// 	{label: 'work', value: 'work', size: 'Productivity, 1-5', opacity: 'Stress Level, 1-5, 5 most', show: 'show.work'},
					// 	{label: 'sleep', value: 'sleep', size: 'Number of hours', opacity: 'Sleep quality, 1-5, 5 high', show: 'show.sleep'}
					// ];
					newUser.categories = [
						{label:'Choose a category', value: 'noCategoryChosen'},
						{label:'meal', value: 'meal'},
						{label: 'exercise', value: 'exercise', size: 'Minutes', opacity: 'Intensity Level, 1-5', show: 'show.exercise', sizeFloor: 0, sizeCeiling: 180, opacityFloor: 0, opacityCeiling: 5},
						{label: 'work', value: 'work', size: 'Productivity, 1-5', opacity: 'Stress Level, 1-5, 5 most', show: 'show.work', sizeFloor: 0, sizeCeiling: 5, opacityFloor: 0, opacityCeiling: 5},
						{label: 'sleep', value: 'sleep', size: 'Number of hours', opacity: 'Sleep quality, 1-5, 5 high', show: 'show.sleep', sizeFloor: 0, sizeCeiling: 12, opacityFloor: 0, opacityCeiling: 5}
					];

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