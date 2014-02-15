angular.module('app.services', [])
	.factory('addService', function() {
		return {
			// add: function()
		}
	})
	.factory('eventService', function() {
		// var data = [1,2,3,4];
		var data = [{"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month"}, {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"hello"},{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "world"}, {"date": new Date(2014, 1, 14, 19), "energylevel":3, "note":"this is cool stuff"}];
		return {
			allLifeEvents: data
		}
	})