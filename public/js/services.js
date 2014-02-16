angular.module('app.services', [])
	.factory('addService', function() {
		return {
			// add: function()
		}
	})
	.factory('EventService', function() {
		// var data = [1,2,3,4];
		var data = [{"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month"}, {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"hello"},{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "world"}, {"date": new Date(2014, 1, 14, 19), "energylevel":3, "note":"this is cool stuff"}];
		return {
			allLifeEvents: data
		}
	})
	.factory('FilterService', ['EventService', function (EventService) {
		var currentFilterObj = {};
		currentFilterObj.time = "month";
		currentFilterObj.lifeEvents = [];

		function determineTimeAmount(time) {
			if (time === 'day') {
				var timeAmount = Date.now() - 86400000;
			} else if (time === 'week') {
				var timeAmount = Date.now() - 604800000;
			} else if (time === 'month') {
				var timeAmount = Date.now() - 262974000000000;
			}
			return timeAmount;
		};

		function filter(timeAmount, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var dateOfProp = obj[prop].date.valueOf();
				if (dateOfProp > timeAmount) {
					arr.push(obj[prop])
				}
			}
			return arr;
		} 

		return {
			filterLifeEvents : function(time) {
				currentFilterObj.time = time; // set currentFilterObj.time to what was passed
				console.log("currentFilterObj.time from service is " + currentFilterObj.time);
				currentFilterObj.lifeEvents = []; // empty out currentFilterObj.time
				var timeAmount = determineTimeAmount(time); // determine number for subtraction
				var results = filter(timeAmount, currentFilterObj.lifeEvents); // get me my results!
				currentFilterObj.lifeEvents = results;
				return currentFilterObj.lifeEvents;
			},
			currentFilterObj: currentFilterObj,
		}
	}])