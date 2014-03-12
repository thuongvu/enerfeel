angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', 'CategoryService', '$rootScope', '$location', function ($scope, EventService, FilterService, $timeout, CategoryService, $rootScope, $location) {
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
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
		// if user is now logged in, invoke $scope.loadData to fill the view
		if (EventService.Auth.authLevel > 0) {
			$scope.loadData();
		}

		$scope.login = function() {
			EventService.login();
		}

		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("all");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';
		$scope.filters = {};

		$scope.$on('filterSomething', function(event, data) {
			$scope.lifeEventsInView = data;
		});

		// console.log($scope.testingFrontPageCtrl)
		// console.log("authLevel is " + EventService.Auth.authLevel);
	}])
	.controller('frontPageCtrl', ['$scope', 'EventService', function($scope, EventService) {
		$scope.trackChanges = {};

		console.log("frontPageCtrl")
		$scope.eventService = EventService;
		$scope.$watch('eventService.allLifeEvents', function(){
			console.log(EventService.allLifeEvents[EventService.allLifeEvents.length - 1].energylevel);
			if (EventService.allLifeEvents[EventService.allLifeEvents.length - 1].category === 'meal') {
				console.log("it's a meal")
				console.log(EventService.allLifeEvents[EventService.allLifeEvents.length - 1])
			}
			// console.log(EventService.allLifeEvents[EventService.allLifeEvents.length - 1].category);

		}, true);
		$scope.testingFrontPageCtrl = 'lol'

		// 1. add an event. choose an energy level. write a note, choose a category, and fill others before clicking add.
		// 2.  Woo!  You added your first event.  Let's try modifying that event now.  Click "Modify Events" button.
		// click the dot you just added, and it will appear in the inputs above.  Modify your event, and remember save it!  
		// 3. add a category.
		


	
	}])



