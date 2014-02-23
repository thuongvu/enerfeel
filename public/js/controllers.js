angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', function ($scope, EventService, FilterService, $timeout, CategoryService) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';
		$scope.categoryService = CategoryService;
		console.log($scope.categoryService)


		// $scope.filterTime = function(time) {
		// 	$scope.lifeEventsInView = $scope.filterService.filterLifeEvents(time);
		// }

		// $scope.filterCategory = function(category) {
		// 	$scope.category.setTo = category;
		// }
		
		$scope.name = "Thuongvu";

		$scope.sayHello = function() {
			$scope.greeting = "Hello " + $scope.name;
		}

		$scope.calendar = {};
		$scope.calendar.firstDate = new Date();
		$scope.calendar.secondDate = new Date();

		$scope.cats = {};
		$scope.cats.list = ['month', 'week'];
	}])