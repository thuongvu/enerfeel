angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', function ($scope, EventService, FilterService) {
		console.log("in mainCtrl")

		// $scope.allLifeEvents = [{"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month"}, {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"hello"},{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "world"}, {"date": new Date(2014, 1, 14, 19), "energylevel":3, "note":"this is cool stuff"}];
		$scope.input = {};

		$scope.eventService = EventService;

		console.log($scope.eventService.allLifeEvents)

		$scope.filterService = FilterService;
		$scope.filterService.filterLifeEvents("week");


		// console.log($scope.filterService.currentFilterObj)
		// console.log($scope.filterService.filteredLifeEvents)
		// console.log($scope.filterService)

		$scope.addEvent = function(energyLevel, note) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : new Date()	
			};

			$scope.eventService.allLifeEvents.push(eventData);

			$scope.input.level = null;
			$scope.input.note = null;
			// make sure currentfilter isnt null, that means we have to change it at first, currently
			// $scope.filter($scope.currentFilter.time);
			// console.log($scope.currentFilter.time)

			$scope.filter($scope.filterService.currentFilterObj.time);
			console.log($scope.filterService.currentFilterObj.time)
		}

		$scope.dataContainerTwo = $scope.eventService.allLifeEvents;
		// $scope.currentFilter = {};
		// $scope.currentFilter.time = "month";
		// $scope.filter = function(time) {
		// 	console.log(time);
		// 	$scope.currentFilter.time = time;
		// 	$scope.dataContainerTwo = []; // empty out dataContainerTwo

		// 	if (time === 'day') {
		// 		var timeAmount = Date.now() - 86400000;
		// 	} else if (time === 'week') {
		// 		var timeAmount = Date.now() - 604800000;
		// 	} else if (time === 'month') {
		// 		var timeAmount = Date.now() - 262974000000000;
		// 	}

		// 	for (prop in $scope.eventService.allLifeEvents) {
		// 		var obj = $scope.eventService.allLifeEvents;
		// 		var dateOfProp = obj[prop].date.valueOf();
		// 		if (dateOfProp > timeAmount) {
		// 			$scope.dataContainerTwo.push(obj[prop])
		// 		}
		// 	}
		// 	console.log($scope.dataContainerTwo)

		// }

		$scope.filter = function(time) {
			$scope.dataContainerTwo = $scope.filterService.filterLifeEvents(time);
		}

		// console.log("ms right now " + Date.now())
		// var yesterdayInMs = Date.now() - 86400000;
		// for (prop in $scope.dataContainer) {
		// 	var obj = $scope.dataContainer;
		// 	var dateOfProp = obj[prop].date.valueOf();
		// 	if (dateOfProp < yesterdayInMs) {
		// 		$scope.dataContainerTwo.push(obj[prop])
		// 	}
		// }
		// console.log($scope.dataContainerTwo)
	}])