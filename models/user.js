var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
		fbID: String,
		token: String,
		name: String,
		lifeEvents: []
});

module.exports = mongoose.model('User', userSchema);