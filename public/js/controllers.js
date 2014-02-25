angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', function ($scope, EventService, FilterService, $timeout, CategoryService) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';

		$scope.name = "Thuongvu";
		$scope.sayHello = function() {
			$scope.greeting = "Hello " + $scope.name;
		}

	}])