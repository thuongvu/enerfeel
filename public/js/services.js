angular.module('app.services', []) // remember to change this so it can be minified
	// .factory('Token', ['EventService', function (EventService) {
	// 	var token = {};

	// }])
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

		// var csrf = $cookieStore.get('XSRF-TOKEN');
		// console.log(csrf);



		function postData(sampleData) {
			$http({
			    method: 'post',
			    url: '/post/event',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: sampleData
			}).success(function(returnedData) {
				return returnedData;
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
				// CategoryService.categoriesObj.list = dataReceived.categories;
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

		function del(event) {
			$http({
			    method: 'DELETE',
			    url: '/delete/event',
			    headers: {
			        'Content-type': 'application/json',
			        'token': Auth.token
			    },
			    data: event
			}).success(function(status) {

			})
		};
		function mod(event) {
			$http({
			    method: 'PUT',
			    url: '/put/event',
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
				del(event);
				for (var i = 0; i < data.length; i++) {
					if (event.date === data[i].date) {
						data.splice(i, 1);
						break;
					};
				};

			},
			updateLifeEvent: function(event) { 
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
				postData(eventData);
			},
			postData: function(sampleData) {
				return postData(sampleData);
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
	.factory('CategoryService', ['EventService', '$rootScope', '$http', function (EventService, $rootScope, $http) {
		var categoriesObj = {};
		categoriesObj.list = [ {label:'Choose a category', value: 'noCategoryChosen'} ];

		$rootScope.$watch(EventService.categories, function() {
			setTimeout(function() {
				if (EventService.categories.list) {
					categoriesObj.list = EventService.categories.list;
				};
			},500);
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
						show: 'show.' + category.label
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
