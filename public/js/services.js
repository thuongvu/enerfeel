angular.module('app.services', []) 
	.factory('EventService', ['$http', '$window', '$cookieStore', '$location', 'MockData' , function ($http, $window, $cookieStore, $location, MockData) {
		var data = [];
		var categories = {};
		var Auth = {};
		Auth.token = null;
		Auth.authLevel = 0;

		var cookie = $cookieStore.get('user');
		if (cookie) {
			Auth = cookie;
			console.log(Auth);
			$cookieStore.remove('user');
		};

		function checkIfLoggedIn(loggedInFunc, loggedOutFunc) {
			if (Auth.authLevel > 0) {
				loggedInFunc();
			} else {
				loggedOutFunc();
			}
		}

		function dataOnLoad() {
			function loggedInFunc() {};
			function loggedOutFunc() {
				data = MockData;
			};
			checkIfLoggedIn(loggedInFunc, loggedOutFunc);
		};

		dataOnLoad();

		function post(eventData, successFunc, errorFunc) {
			$http({
			    method: 'post',
			    url: '/post/event',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: eventData
			}).success(function() {
				successFunc();
			}).error(function() {
				errorFunc();
			});
		};

		function getUserData(successFunc, errorFunc) {
			$http({
			    method: 'get',
			    url: '/get/events',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    }
			})
			.success(function(dataReceived) {
				categories.list = dataReceived.categories;
				var eventsReceived = dataReceived.lifeEvents;
				for (var i = 0; i < eventsReceived.length; i++) {
					if (typeof eventsReceived[i].date === 'string') {
						eventsReceived[i].date = new Date(eventsReceived[i].date)
					};
					data.push(eventsReceived[i]);
				};
				successFunc();
			}).error(function() {
				errorFunc();
			});
		};

		function del(event, successFunc, errorFunc) {
			$http({
			    method: 'DELETE',
			    url: '/delete/event',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: event
			}).success(function() {
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						data.splice(i, 1);
						break;
					};
				};
				successFunc();
			}).error(function() {
				errorFunc();
			})
		};
		function put(event, successFunc, errorFunc) {
			$http({
			    method: 'PUT',
			    url: '/put/event',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: event
			}).success(function() {
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						data.splice(i,1, event);
						break;
					};
				};
				successFunc();
			}).error(function() {
				errorFunc();
			})
		};
		
return {
			deleteLifeEvent: function (event, successFunc, errorFunc) {
				function loggedInFunc() {
					del(event, successFunc, errorFunc);
				};
				
				function notLoggedIn() {
					for (var i = 0; i < data.length; i++) {
						if (event.date === data[i].date) {
							data.splice(i, 1);
							break;
						};
					};
					successFunc();
				};

				checkIfLoggedIn(loggedInFunc, notLoggedIn);
			},
			updateLifeEvent: function(event, successFunc, errorFunc) { 
				function loggedInFunc() {
					put(event, successFunc, errorFunc);
				};

				function notLoggedIn() {
					successFunc();
				};
				
				checkIfLoggedIn(loggedInFunc, notLoggedIn);
			},
			addLifeEvent: function(eventData, successFunc, errorFunc) {
				function loggedInFunc() {
					post(eventData, successFunc, errorFunc);
				};

				function notLoggedIn() {
					successFunc();
				};

				checkIfLoggedIn(loggedInFunc, notLoggedIn);
			},
			getData: function(successFunc, errorFunc) {
				getUserData(successFunc, errorFunc)
			},
			login: function() {
				$window.location.href = '/auth/facebook/callback';
			},
			logout: function() {

					$http({
					    method: 'GET',
					    url: '/logout',
					    headers: {
					        'Content-type': 'application/json',
					        'token': Auth.token
					    }
					}).success(function() {
						Auth.authLevel = 0;
						$location.path('/')
					}).error(function() {

					});

			},
			Auth: Auth,
			allLifeEvents: data,
			categories: categories
		}

	}])
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
				var timeAmount = Date.now() - 2592000000;
			} else if (time === 'all') {
				var timeAmount = 0;
			}
			return timeAmount;
		};

		function filterTimeDuration(timeAmount, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var dateOfProp = obj[prop].date.valueOf();
				if ((dateOfProp > timeAmount) && (dateOfProp < Date.now())) {
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
				if ((dateOfProp >= first) && (dateOfProp <= second)) {
					arr.push(obj[prop])
				}
			}
			return arr;
		};

		function filterByCategoryName(category, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var categoryOfProp = obj[prop].category;

				if (categoryOfProp == category) {
					arr.push(obj[prop]);
				};

			};
			return arr;
		};

		function filterByHour(hour, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var hourOfProp = obj[prop]['date'].getHours();
				if (hour === hourOfProp) {
					arr.push(obj[prop])
				}
			}
			return arr;
		};

		function filterByDate(day, month, year, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var dayOfProp = obj[prop]['date'].getDate();
				var monthOfProp = obj[prop]['date'].getMonth();
				var yearOfProp = obj[prop]['date'].getFullYear();

				if ((day === dayOfProp) && (month === monthOfProp) && (year === yearOfProp)){
					arr.push(obj[prop])
				}
			}
			return arr;
		};

		// filter by energy
		function filterByEnergy(energy, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var energyOfProp = obj[prop].energylevel;
				if (energy === energyOfProp) {
					arr.push(obj[prop])
				};
			};
			return arr;
		};

		// filter by opacity
		function filterByOpacity(opacity, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var opacityOfProp = obj[prop].opacity;
				if (opacity === opacityOfProp) {
					arr.push(obj[prop])
				};
			};
			return arr;
		};

		// filter by size
		function filterBySize(size, arr) {
			for (prop in EventService.allLifeEvents) {
				var obj = EventService.allLifeEvents;
				var sizeOfProp = obj[prop].size;
				if (size === sizeOfProp) {
					arr.push(obj[prop])
				};
			};
			return arr;
		};

		return {
			filterLifeEvents: function(time) {
				currentFilterObj.time = time; // set currentFilterObj.time to what was passed
				currentFilterObj.lifeEvents = []; // empty out currentFilterObj.time
				var timeAmount = determineTimeAmount(time); // determine number for subtraction
				currentFilterObj.time = time; 																							// TESTESTESTESTSETS
				var results = filterTimeDuration(timeAmount, currentFilterObj.lifeEvents); // get me my results!
				currentFilterObj.lifeEvents = sortTime(results); // sort the results
				return currentFilterObj.lifeEvents;
			},
			sortTime: function(arr) {
				return sortTime(arr);
			},
			customFilterLifeEvents: function(first, second) {
				currentFilterObj.lifeEvents = []; 
				var results = filterCustomDuration(first, second, currentFilterObj.lifeEvents);
				currentFilterObj.lifeEvents = sortTime(results); 
				return currentFilterObj.lifeEvents;
			},
			filterActivity: function(category) {
				currentFilterObj.lifeEvents = []; 
				var results = filterByCategoryName(category, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			filterHour: function(date) {
				var hour = date.getHours();
				currentFilterObj.lifeEvents = []; 
				var results = filterByHour(hour, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			filterDate: function(date) {
				var day = date.getDate();
				var month = date.getMonth();
				var year = date.getFullYear();
				currentFilterObj.lifeEvents = []; 
				var results = filterByDate(day, month, year, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			filterEnergy: function(energy) {
				currentFilterObj.lifeEvents = []; 
				var results = filterByEnergy(energy, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			filterOpacity: function(opacity) {
				currentFilterObj.lifeEvents = []; 
				var results = filterByOpacity(opacity, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			filterSize: function(size) {
				currentFilterObj.lifeEvents = []; 
				var results = filterBySize(size, currentFilterObj.lifeEvents); 
				currentFilterObj.lifeEvents = sortTime(results);
				return currentFilterObj.lifeEvents;
			},
			currentFilterObj: currentFilterObj,
		}
	}])
	.factory('CategoryService', ['EventService', '$rootScope', '$http', function (EventService, $rootScope, $http) {
		var categoriesObj = {};
		categoriesObj.list = [ 
			{label:'Choose a category', value: 'noCategoryChosen'},
			{label:'meal', value: 'meal'},
			{label: 'exercise', value: 'exercise', size: 'Minutes', opacity: 'Intensity Level', show: 'show.exercise', sizeCeiling: '180', opacityCeiling: '5'},
			{label: 'work', value: 'work', size: 'Productivity', opacity: 'Stress Level', show: 'show.work', sizeCeiling: '5', opacityCeiling: '5'},
			{label: 'sleep', value: 'sleep', size: 'Number of hours', opacity: 'Sleep quality', show: 'show.sleep', sizeCeiling: '12', opacityCeiling: '5'} 
		];

		function checkIfLoggedIn(loggedInFunc, loggedOutFunc) {
			if (EventService.Auth.authLevel > 0) {
				loggedInFunc();
			} else {
				loggedOutFunc();
			};
		};

		$rootScope.$watch(EventService.categories, function() {
			setTimeout(function() {
				if (EventService.categories.list) {
					categoriesObj.list = EventService.categories.list;
				};
				console.log(categoriesObj.list);
			},100);
		}, true);
		
		function addCategoryXHR(category, successFunc, errorFunc) {
				$http({
				    method: 'post',
				    url: '/post/category',
				    headers: {
				        'Content-type': 'application/json',
				        'token': EventService.Auth.token
				    },
				    data: category
				}).success(function() {
					categoriesObj.list.push(category);
					successFunc();
				}).error(function() {
					errorFunc();
				});
		};

		function deleteCategoryXHR(category, successFunc, errorFunc) {
				$http({
				    method: 'delete',
				    url: '/delete/category',
				    headers: {
				        'Content-type': 'application/json',
				        'token': EventService.Auth.token
				    },
				    data: category
				}).success(function() {
					for (var i = 0; i < categoriesObj.list.length; i++) {
						if (categoriesObj.list[i].label === category.label) {
							categoriesObj.list.splice(i, 1);
							break;
						};
					};
					successFunc();
				}).error(function() {
					errorFunc();
				});
		};

		return {
			addCategory: function(category, successFunc, errorFunc) {
				var re = /-?([_a-z]|[\240-\377])([_a-z0-9-]|[\240-\377])*/g;
				var cssValidatedText = category['label'].match(re).join("");

				var obj = {
					label: cssValidatedText,
					value: cssValidatedText,
					size: category.size,
					opacity: category.opacity,
					show: 'show.' + cssValidatedText,
					sizeCeiling: 5,
					opacityCeiling: 5
				};
					
				function loggedInFunc() {
					addCategoryXHR(obj, successFunc, errorFunc);
				};
				function notLoggedIn() {
					categoriesObj.list.push(obj);
					successFunc();
				};
				
				checkIfLoggedIn(loggedInFunc, notLoggedIn);

			},
			deleteCategory: function (category, successFunc, errorFunc) {
				function loggedInFunc() {
					deleteCategoryXHR(category, successFunc, errorFunc);
				};

				function notLoggedIn() {
					for (var i = 0; i < categoriesObj.list.length; i++) {
						if (categoriesObj.list[i].label === category.label) {
							categoriesObj.list.splice(i, 1);
							break;
						};
					};
					successFunc();
				};

				checkIfLoggedIn(loggedInFunc, notLoggedIn);
			},
			categoriesObj: categoriesObj
		};
	}])
.factory('MockData', [function() {
	var now = new Date();
	var mockData = [
		{
	        "energylevel" : 2,
	        "note" : "slept less than usual",
	        "date" : new Date(now.getTime() - 1227600000 + Math.floor(Math.random() * 1800000)), //14 days ago + 5 hours 1209600000 + 18000000
	        "category" : "sleep",
	        "opacity" : 2,
	        "size" : 1
	    }, 
	    {
	        "energylevel" : 2,
	        "note" : "slept less than usual",
	        "date" : new Date(now.getTime() - 1209600000 + Math.floor(Math.random() * 1800000)), // 14 days ago
	        "category" : "sleep",
	        "opacity" : 2,
	        "size" : 1
	    }, 
	    {
	        "energylevel" : 3,
	        "note" : "ran 3 miles",
	        "date" : new Date(now.getTime() - 1206000000 + Math.floor(Math.random() * 1800000)), // 14 days - 1 hours. 1209600000 - 3600000
	        "category" : "exercise",
	        "opacity" : 4,
	        "size" : 40
	    }, 
	    {
	        "energylevel" : 4,
	        "note" : "ate toast and eggs and milk",
	        "date" : new Date(now.getTime() - 1202400000 + Math.floor(Math.random() * 1800000)), // 14 days - 2 hours. 1209600000 - (3600000 * 2)
	        "category" : "meal",
	        "opacity" : 3,
	        "size" : 3
	    }, 
	    {
	        "energylevel" : 3,
	        "note" : "a little tired.  should've slept more",
	        "date" : new Date(now.getTime() - 1198800000 + Math.floor(Math.random() * 1800000)), // 14 days - 3 hours. 1209600000 - (3600000 * 3)
	        "category" : "work",
	        "opacity" : 2.5,
	        "size" : 2.5
	    }, 
	    {
	        "energylevel" : 4,
	        "note" : "ran 4 miles",
	        "date" : new Date(now.getTime() - 1036800000 + Math.floor(Math.random() * 1800000)), // 12 days
	        "category" : "exercise",
	        "opacity" : 5,
	        "size" : 40
	    }, 
	    {
	        "energylevel" : 3,
	        "note" : "normal sleep",
	        "date" : new Date(now.getTime() - 554400000 + Math.floor(Math.random() * 1800000)), // 6 days + 8 hours sleep
	        "category" : "sleep",
	        "opacity" : 3,
	        "size" : 4
	    }, 
	    {
	        "energylevel" : 3,
	        "note" : "normal sleep",
	        "category" : "sleep",
	        "opacity" : 3,
	        "size" : 4,
	        "date" : new Date(now.getTime() - 518400000 + Math.floor(Math.random() * 1800000)) // 6 days sleep
	    }, 
	    {
	        "energylevel" : 2.5,
	        "note" : "ate a huge meal",
	        "date" : new Date(now.getTime() - 514800000 + Math.floor(Math.random() * 1800000)), // 6 days - 1 hour. 518400000 - 3600000 ate huge meal
	        "category" : "meal",
	        "opacity" : 5,
	        "size" : 4
	    }, 
	    {
	        "energylevel" : 2.5,
	        "note" : "good productivity for a few hours, getting tired", 
	        "date" : new Date(now.getTime() - 504000000 + Math.floor(Math.random() * 1800000)), // 6 days - 4 hours. 518400000 - (3600000 * 4) worked
	        "category" : "work",
	        "opacity" : 4,
	        "size" : 4
	    }, 
	    {
	        "energylevel" : 1,
	        "note" : "very tired. drinking 2 coffees",
	        "date" : new Date(now.getTime() - 500400000 + Math.floor(Math.random() * 1800000)), // 6 days - 5 hours. 518400000 - (3600000 * 5) coffee
	        "category" : "meal",
	        "opacity" : 1,
	        "size" : 1
	    }, 
	    {
	        "energylevel" : 5,
	        "note" : "coffee is AWESOME",
	        "date" : new Date(now.getTime() - 496800000 + Math.floor(Math.random() * 1800000)),  //6 days hours - 6 hours. 518400000 - (3600000 * 6) productivity++
	        "category" : "work",
	        "opacity" : 5,
	        "size" : 5
	    }, 
	    {
	        "energylevel" : 2,
	        "note" : "feeling sleepy",
	        "date" : new Date(now.getTime() - 345600000 + Math.floor(Math.random() * 1800000)), // 4 days tired
	        "category" : "work",
	        "opacity" : 2,
	        "size" : 2
	    }, 
	    {
	        "energylevel" : 3,
	        "note" : "ran for 2 miles",
	        "date" : new Date(now.getTime() - 342000000 + Math.floor(Math.random() * 1800000)), // 4 days - 1 hour. 345600000 - 3600000 run
	        "category" : "exercise",
	        "opacity" : 30,
	        "size" : 4
	    }, 
	    {
	        "energylevel" : 4.5,
	        "note" : "feeling better at work",
	        "date" : new Date(now.getTime() - 338400000 + Math.floor(Math.random() * 1800000)), // 345600000 - (3600000 * 2) productivity++
	        "category" : "work",
	        "opacity" : 4,
	        "size" : 4
	    }, 
	];

	return mockData;

}])
