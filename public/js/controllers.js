angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', function ($scope, EventService, FilterService) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.dataContainerTwo = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};

		console.log("$scope.eventService on init");
		console.log($scope.eventService)

		$scope.addEvent = function(energyLevel, note) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : new Date()	
			};

			$scope.eventService.allLifeEvents.push(eventData);
			console.log("this is what $scope.eventService looks like now")
			console.log($scope.eventService)
			$scope.dataContainerTwo.push(eventData)

			$scope.input.level = null;
			$scope.input.note = null;
		}

		$scope.filter = function(time) {
			$scope.dataContainerTwo = $scope.filterService.filterLifeEvents(time);
		}


	}])