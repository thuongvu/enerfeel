var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		fbID: String,
		token: String,
		name: String,
		lifeEvents: [],
		categories: []
});

module.exports = mongoose.model('User', userSchema);