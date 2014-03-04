angular.module('app.services', []) // remember to change this so it can be minified
	.factory('EventService', function ($http, $window, $cookieStore) {
		var Auth = {};
		Auth.token = null;
		Auth.authLevel = 0;
		var cookie = $cookieStore.get('user');
		if (cookie) {
			Auth = cookie;
			console.log(Auth);
			$cookieStore.remove('user');
		} else {
			console.log("no cookie yet");
		}

		var data = [
		 // {"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
		 // {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
		 // {"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 5}, 
		 // {"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 15},
		 // {"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size":10},
		 // {"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
		 // {"date": new Date(), "energylevel":4, "note":"slept for a long time", "category": "sleep", "opacity": 1, "size": 10},
		 ];

		function postData(sampleData) {
			// $http.post('/post', sampleData).success(function(data) {
			// 	console.log("this comes from postData")
			// 	console.log(data);
			// 	return data;
			// });


			$http({
			    method: 'post',
			    url: '/post',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: sampleData
			}).success(function(returnedData) {
				console.log(returnedData);
				return returnedData;
			});


		};
		function getData(callback) {
// CHANGES A
// GETDATA GETS BACK DATA
// IF STATEMENT TO FIGURE OUT IF USER IS LOGGED IN OR NOT
// IF NOT LOGGED IN, ASK USER TO LOG IN
// JSON REQUEST W/ DATA FROM COOKIE
			$http({
			    method: 'get',
			    url: '/get',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			})
			.success(function(eventsReceived) {
				for (var i = 0; i < eventsReceived.length; i++) {
					if (typeof eventsReceived[i].date === 'string') {
						eventsReceived[i].date = new Date(eventsReceived[i].date)
					};
					data.push(eventsReceived[i]);
				};
				callback(data);
			});
		};
		function del(event) {
			console.log("deleting event w/ http delete request: ");
			console.log(event);
			$http({
			    method: 'DELETE',
			    url: '/delete',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: event
			}).success(function(status) {
				console.log(status);
			})
		};
		function mod (event) {
			$http({
			    method: 'PUT',
			    url: '/put',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: event
			}).success(function(status) {
				console.log(status);
			})
		};
		

return {
			deleteLifeEvent: function (event) {
				console.log(event)
				console.log("deleteLifeEvent from service")
				del(event);
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						console.log(data.length)
						console.log(event.date + " IS THE ONE");
						data.splice(i, 1);
						console.log(data.length)
						break;
					};
				};

			},
			updateLifeEvent: function(event) { // i think this is redundant for angular, but it will be important when there's a REST api
				mod(event);
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						data.splice(i,1, event);
						break;
					}
				}
			},
			addLifeEvent: function(eventData) {
				data.push(eventData);
				// console.log(eventData);
				// console.log("what")
				// $http.post('/post', eventData).success(function(data) {
				// 	console.log(data);
				// })
				postData(eventData);
			},
			postData: function(sampleData) {
				// $http.post('/post', sampleData).success(function(data) {
				// 	// console.log(data);
				// 	return data;
				// });
				return postData(sampleData);
			},
			getData: function(callback) {
				// $http.get('/get').success(function(data) {
				// 	console.log(data)
				// 	return data;
				// });

				return getData(callback);
			},
			login: function() {
				$window.location.href = '/auth/facebook/callback';
			},
// CHANGES B
// MAKE A LOGIN FUNCTION SPECIFICALLY FOR LOGGING IN AND GETTING THE COOKIE/DESTROYING IT
// THEN VALUE FROM COOKIE SETS THE STATE ON AN OBJECT
// ADD A NEW OBJECT CALLED USERSTATE, WILL HAVE ISAUTHENTICATED TRUE
// THEN IT WILL HAVE TOKEN AS A STRING
// ON ANY OF THESE REQUESTS, IT WILL USE THAT TOKEN AS A 2ND PARAM IN EACH REQUEST
			// ISLOGGEDIN : USERSTATE
			Auth: Auth,
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
			console.log("EventService.allLifeEvents")
			console.log(EventService.allLifeEvents);
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

		function sort(arr) {
				arr.sort(function(a,b) {
					return a.date - b.date	
				})
			return arr;
		} 

		function filterCustomDuration(first, second, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var dateOfProp = obj[prop].date.valueOf();
				// console.log(obj)
				if ((dateOfProp >= first) && (dateOfProp <= second)) {
					arr.push(obj[prop])
				}
			}
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
				// sortTime(arr);
				return sortTime(arr);
			},
			customFilterLifeEvents: function(first, second) {
				currentFilterObj.lifeEvents = []; // empty out currentFilterObj.time
				var results = filterCustomDuration(first, second, currentFilterObj.lifeEvents);
				currentFilterObj.lifeEvents = sortTime(results); 
				return currentFilterObj.lifeEvents;
			},
			test: function() {
				// console.log("blah")
				return "blah";
			},
			currentFilterObj: currentFilterObj,
		}
	}])
	.factory('CategoryService', [function () {
		var categoriesObj = {};
		// categoriesObj.list = [
		// {label:'Choose a category', value: 'noCategoryChosen'},
		// {label:'meal', value: 'meal'},
		// {label: 'exercise', value: 'exercise'},
		// {label: 'work', value: 'work'},
		// {label: 'sleep', value: 'sleep'}
		// ];
		categoriesObj.list = [
		{label:'Choose a category', value: 'noCategoryChosen'},
		{label:'meal', value: 'meal'},
		{label: 'exercise', value: 'exercise', size: 'Minutes', opacity: 'Intensity Level, 1-5', show: 'show.exercise'},
		{label: 'work', value: 'work', size: 'Productivity, 1-5', opacity: 'Stress Level, 1-5, 5 most', show: 'show.work'},
		{label: 'sleep', value: 'sleep', size: 'Number of hours', opacity: 'Sleep quality, 1-5, 5 high', show: 'show.sleep'}
		];
		return {
			addCategory: function(category) {
				if (typeof category === 'object') {
					// console.log("thrown in")
					// console.log(category)
					var obj = {
						label: category.label,
						value: category.label,
						size: category.size,
						opacity: category.opacity,
						show: 'show.' + category.label
					};
					// console.log(obj);
					categoriesObj.list.push(obj);
				};
				return categoriesObj.list;
			},
			deleteCategory: function (category) {
				if (typeof category === 'string') {
					for (var i = 0; i < categoriesObj.list.length; i++) {
						if (categoriesObj.list[i].label === 'meal') {
							categoriesObj.list.splice(i, 1);
							break;
						}
					};
					return categoriesObj.list;
				};
			},
			categoriesObj: categoriesObj
		};
	}])
	// .factory('htt')
