angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', function ($scope, EventService, FilterService, $timeout) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};

		$scope.addEvent = function(energyLevel, note, category) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : new Date(),
				category 	: category,	
			};

			$scope.eventService.allLifeEvents.push(eventData);
			$scope.lifeEventsInView.push(eventData)

			$scope.input.level = null;
			$scope.input.note = null; 
			$scope.input.category = null; 
		}

		$scope.filterTime = function(time) {
			$scope.lifeEventsInView = $scope.filterService.filterLifeEvents(time);
		}

		$scope.category = {};
		$scope.category.setTo = 'null';

		$scope.filterCategory = function(category) {
			$scope.category.setTo = category;
		}

		function log() {
			console.log("Hello")
		}

		$scope.myDate = new Date();

		// $timeout(function() {
		// 	$scope.myDate = new Date();
		// }, 60000)

		// $timeout(function() {
		// 	console.log()
		// })
		// $scope.$watch('$scope.myDate', log, true)

		var myIntervalFunction = function() {
			cancelRefresh = $timeout(function myFunction() {
				// do something
				console.log("hello")
				$scope.myDate = new Date();
				// did something
				cancelRefresh = $timeout(myFunction, 3000);
			}, 3000);
		};
		myIntervalFunction()

		$scope.$on('destroy', function(e) {
			$timeout.cancel(cancelRefresh);
		});



		$scope.checkDate = function() {
			console.log($scope.myDate)
		}

	}])