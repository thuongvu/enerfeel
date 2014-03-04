angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', function ($scope, EventService, FilterService, $timeout, CategoryService) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.loadData = function() {
			EventService.getData();
			// EventService.getData(function(newData) {
			// 	for (var i = 0; i < newData.length; i++) {
			// 		$scope.lifeEventsInView.push(newData[i]);
			// 	};
			// 	$scope.filterService.sortTime($scope.lifeEventsInView);
			// 	console.log($scope.lifeEventsInView);
			// });

		}

		// $scope.eventService.allLifeEvents = $scope.eventService.getData(); // LETS HOPE THIS WORKS
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';


		$scope.name = "Thuongvu";
		$scope.sayHello = function() {
			$scope.greeting = "Hello " + $scope.name;
		}

		$scope.login = function() {
			EventService.login();
		}

	}])