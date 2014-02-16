angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', function ($scope, EventService, FilterService) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.dataContainerTwo = $scope.filterService.filterLifeEvents("week");
		$scope.input = {};

		console.log($scope.eventService.allLifeEvents)
		

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

			// $scope.filter($scope.filterService.currentFilterObj.time);
			// console.log($scope.filterService.currentFilterObj.time)
		}

		$scope.filter = function(time) {
			$scope.dataContainerTwo = $scope.filterService.filterLifeEvents(time);
		}


	}])