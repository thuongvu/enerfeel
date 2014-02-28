var mongoose = require('mongoose');

var userSchema = moongose.Schema({
		id: String,
		token: String,
		name: String,
		lifeEvents: []
});