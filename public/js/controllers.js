angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', function ($scope, EventService, FilterService, $timeout, CategoryService) {
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

		// $scope.eventService.allLifeEvents = $scope.eventService.getData(); // LETS HOPE THIS WORKS
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';

		$scope.login = function() {
			EventService.login();
		}

		$scope.oneAtATime = true;

		 $scope.groups = [
		   {
		     title: "Dynamic Group Header - 1",
		     content: "Dynamic Group Body - 1"
		   },
		   {
		     title: "Dynamic Group Header - 2",
		     content: "Dynamic Group Body - 2"
		   }
		 ];

		 $scope.items = ['Item 1', 'Item 2', 'Item 3'];

		 $scope.addItem = function() {
		   var newItemNo = $scope.items.length + 1;
		   $scope.items.push('Item ' + newItemNo);
		 };

	}])