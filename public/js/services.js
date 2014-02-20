angular.module('app.services', [])
	.factory('EventService', function() {
		var data = [
		 {"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
		 {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
		 {"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 3}, 
		 {"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 4},
		 {"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size": 5},
		 {"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
		 ];
		return {
			deleteLifeEvent: function (event) {
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						console.log(data.length)
						console.log(event.date + " IS THE ONE");
						data.splice(i, 1);
						console.log(data.length)
						break;
					}
				}
			},
			updateLifeEvent: function(event) { // i think this is redundant for angular, but it will be important when there's a REST api
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						data.splice(i,1, event);
						break;
					}
				}
			},
			allLifeEvents: data
		}
	})
	.factory('FilterService', ['EventService', function (EventService) {
		var currentFilterObj = {};
		currentFilterObj.time = null;
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

		function filterTimeDuration(timeAmount, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var dateOfProp = obj[prop].date.valueOf();
				if (dateOfProp > timeAmount) {
					arr.push(obj[prop])
				}
			}
			return arr;
		}

		function sortTime(arr) {
				arr.sort(function(a,b) {
					return a.date - b.date	
				})
			return arr;
		} 

		return {
			filterLifeEvents: function(time) {
				currentFilterObj.time = time; // set currentFilterObj.time to what was passed
				currentFilterObj.lifeEvents = []; // empty out currentFilterObj.time
				var timeAmount = determineTimeAmount(time); // determine number for subtraction
				var results = filterTimeDuration(timeAmount, currentFilterObj.lifeEvents); // get me my results!
				currentFilterObj.lifeEvents = sortTime(results); // sort the results
				return currentFilterObj.lifeEvents;
			},
			sortTime: function(arr) {
				sortTime(arr);
			},
			currentFilterObj: currentFilterObj,
		}
	}])