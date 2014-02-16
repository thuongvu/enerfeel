angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', function ($scope, EventService, FilterService) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.dataContainerTwo = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};

		$scope.addEvent = function(energyLevel, note) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : new Date()	
			};

			$scope.eventService.allLifeEvents.push(eventData);
			$scope.dataContainerTwo.push(eventData)

			$scope.input.level = null;
			$scope.input.note = null;
		}

		$scope.filter = function(time) {
			$scope.dataContainerTwo = $scope.filterService.filterLifeEvents(time);
		}


	}])