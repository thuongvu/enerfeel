angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', 'CategoryService', function ($scope, EventService, FilterService, CategoryService) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.login = function() {
			EventService.login();
		};
		$scope.logout = function() {
			EventService.logout();
		};

		$scope.loadData = function() {
			if (EventService.Auth.authLevel === 0) {
				$scope.login();
			} else if (EventService.Auth.authLevel > 0){
				function successFunc() {
					if ($scope.optionsAreaLoadDataError) {
						$scope.optionsAreaLoadDataError = false;
					};
					for (var i = 0; i < EventService.allLifeEvents.length; i++) {
						$scope.lifeEventsInView.push(EventService.allLifeEvents[i]);
					};
					$scope.filterService.sortTime($scope.lifeEventsInView);
				};
				function errorFunc() {
					$scope.optionsAreaLoadDataError = true;
				};
				EventService.getData(successFunc, errorFunc);
			};
		};

		if (EventService.Auth.authLevel > 0) {
			$scope.loadData();
		};

		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("all");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';
		$scope.filters = {};

		$scope.$on('filterSomething', function(event, data) {
			$scope.lifeEventsInView = data;
		});

	}])