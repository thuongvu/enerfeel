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

		function postData(eventData, successFunc, errorFunc) {
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

		function getData(callback) {
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
				callback(data);
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
				del(event, successFunc, errorFunc);
			},
			updateLifeEvent: function(event, successFunc, errorFunc) { 
				put(event, successFunc, errorFunc);
			},
			addLifeEvent: function(eventData, successFunc, errorFunc) {
				postData(eventData, successFunc, errorFunc);
			},
			getData: function(callback) {
				return getData(callback);
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
		categoriesObj.list = [ {label:'Choose a category', value: 'noCategoryChosen'} ];

		$rootScope.$watch(EventService.categories, function() {
			setTimeout(function() {
				if (EventService.categories.list) {
					categoriesObj.list = EventService.categories.list;
				};
				console.log(categoriesObj.list);
			},100);
		}, true);
		
		function addCategoryXHR(obj) {
			if (EventService.Auth.authLevel > 0) {
				$http({
				    method: 'post',
				    url: '/post/category',
				    headers: {
				        'Content-type': 'application/json',
				        'token': EventService.Auth.token
				    },
				    data: obj
				}).success(function(returnedData) {
					// return returnedData;
				});
			};
		};

		function DeleteCategoryXHR(obj, callback) {
			if (EventService.Auth.authLevel > 0) {
				$http({
				    method: 'delete',
				    url: '/delete/category',
				    headers: {
				        'Content-type': 'application/json',
				        'token': EventService.Auth.token
				    },
				    data: obj
				}).success(function(returnedData) {
					// return returnedData;
					callback();
				});
			};
		};

		return {
			addCategory: function(category) {
				if (typeof category === 'object') {
					var obj = {
						label: category.label,
						value: category.label,
						size: category.size,
						opacity: category.opacity,
						show: 'show.' + category.label,
						sizeCeiling: 5,
						opacityCeiling: 5
					};
					categoriesObj.list.push(obj);
					addCategoryXHR(obj);
				};
				return categoriesObj.list;
			},
			deleteCategory: function (category, callback) {
				if ((category.label !== 'meal') && (category.label !== 'exercise') 
					&& (category.label !== 'work')  && (category.label !== 'sleep')
					&& (category.label !== 'Choose a category')) {
					for (var i = 0; i < categoriesObj.list.length; i++) {
						if (categoriesObj.list[i].label === category.label) {
							categoriesObj.list.splice(i, 1);
							break;
						};
					};
					DeleteCategoryXHR(category, callback);
					return categoriesObj.list;
				} else {
					console.log("can't delete a default")
				};
			},
			categoriesObj: categoriesObj
		};
	}])
