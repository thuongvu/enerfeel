angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', '$rootScope', '$location', function ($scope, EventService, FilterService, $timeout, CategoryService, $rootScope, $location) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.loadData = function() {
			// if user is not logged in, log them in
			if (EventService.Auth.authLevel === 0) {
				$scope.login();
			} else {
				// if user is logged in, $http.get, put it into the view
				EventService.getData(function(data) {
					for (var i = 0; i < data.length; i++) {
						$scope.lifeEventsInView.push(data[i]);
					};
					$scope.filterService.sortTime($scope.lifeEventsInView);
				});
			};
		};
		// if user is now logged in, invoke $scope.loadData to fill the view
		if (EventService.Auth.authLevel > 0) {
			$scope.loadData();
		}

		$scope.login = function() {
			EventService.login();
		}

		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';
		$scope.filters = {};

		$scope.$on('filterSomething', function(event, data) {
			$scope.lifeEventsInView = data;
		})


	}])