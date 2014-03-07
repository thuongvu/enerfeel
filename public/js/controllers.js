angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', '$rootScope', function ($scope, EventService, FilterService, $timeout, CategoryService, $rootScope) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.loadData = function() {
			// if user is not logged in, log them in
			if (EventService.Auth.authLevel === 0) {
				console.log(EventService.Auth.authLevel);
				console.log("EventService.Auth.authLevel");
				$scope.login();
			} else {
				// if user is logged in, $http.get, put it into the view
				EventService.getData(function(data) {
					console.log(data)
					for (var i = 0; i < data.length; i++) {
						$scope.lifeEventsInView.push(data[i]);
					};
					$scope.filterService.sortTime($scope.lifeEventsInView);
					console.log($scope.lifeEventsInView.length)
				});

			};
		};
		// if user is now logged in, invoke $scope.loadData to fill the view
		if (EventService.Auth.authLevel > 0) {
			$scope.loadData();
		}

		// $scope.eventService.allLifeEvents = $scope.eventService.getData(); // LETS HOPE THIS WORKS
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';

		$scope.login = function() {
			EventService.login();
		}

		$scope.showInNav = function(item) {
			// console.log("showinNav")
			// $scope.showAddCategories = true;
			// $scope.$broadcast("showNav", {
			// 	'showAddCategories': 'true',
			// })
			console.log(item);
			$rootScope.$broadcast('showInNav', item);		
		};

		// $scope.$watch('showModify', function() {
		// 	console.log("$scope.showModify");
		// 	console.log($scope.showModify);
		// }, true)


	}])