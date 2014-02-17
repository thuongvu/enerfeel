angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', function ($scope, EventService, FilterService) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};

		$scope.addEvent = function(energyLevel, note) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : new Date()	
			};

			$scope.eventService.allLifeEvents.push(eventData);
			$scope.lifeEventsInView.push(eventData)

			$scope.input.level = null;
			$scope.input.note = null; 
		}

		$scope.filterTime = function(time) {
			$scope.lifeEventsInView = $scope.filterService.filterLifeEvents(time);
		}

		$scope.category = {};
		$scope.category.setTo = 'null';

		$scope.filterCategory = function(category) {
			$scope.category.setTo = category;
		}

	}])