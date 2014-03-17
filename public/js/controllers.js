angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', 'CategoryService', 'MockData', '$timeout', function ($scope, EventService, FilterService, CategoryService, MockData, $timeout) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		// used to be lower
		$scope.lifeEventsInView = FilterService.filterLifeEvents("all");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';
		$scope.filters = {};
		// used to be lower
		$scope.login = function() {
			EventService.login();
		};
		$scope.logout = function() {
			function successFunc() {
				EventService.allLifeEvents = [];
				EventService.allLifeEvents = MockData;
			};
			EventService.logout(successFunc);
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
					FilterService.sortTime($scope.lifeEventsInView);
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


		$scope.$on('filterSomething', function(event, data) {
			$scope.lifeEventsInView = data;
		});

		$timeout(function() {
			$scope.hideSampleDataHeader = true;
		}, 30000);
		
	}]);