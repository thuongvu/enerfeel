angular.module('app.services', []) // remember to change this so it can be minified
	.factory('EventService', function ($http, $window, $cookieStore) {
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
				// callback(data);
				successFunc();
				// as it stands, the successFunc does NOT get the data from here
				// before, i had a callback that passed the 'data'
				// but it's the same thing as EventService.allLifeEvents, so why pass it?
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
				// return getData(callback);
				getUserData(successFunc, errorFunc)
			},
			login: function() {
				$window.location.href = '/auth/facebook/callback';
			},
			Auth: Auth,
			allLifeEvents: data,
			categories: categories
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
			// if (EventService.Auth.authLevel > 0) {
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
				})	
			// };
		};

		function deleteCategoryXHR(category, successFunc, errorFunc) {
			// if (EventService.Auth.authLevel > 0) {
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
				})
			// };
		};

		return {
			addCategory: function(category, successFunc, errorFunc) {
				// if (typeof category === 'object') {
				var obj = {
					label: category.label,
					value: category.label,
					size: category.size,
					opacity: category.opacity,
					show: 'show.' + category.label,
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

				// };
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
