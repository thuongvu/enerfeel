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

		// i'm going to make it a function now where i can control how many seconds until
		var myIntervalFunction = function() {
			cancelRefresh = $timeout(function myFunction() {
				// do something
				console.log("it is now the next minute now ")
				$scope.myDate = new Date();
				// did something
				cancelRefresh = $timeout(myFunction, 60000);
			}, 60000);
		};

		

		function setTime() {
			var currentTime = new Date();
			var currentTimeSeconds = currentTime.getSeconds();
			var secsUntilNextMin = 60 - currentTimeSeconds;
			console.log("currentTimeSeconds is " + currentTimeSeconds + " secsUntilNextMin " + secsUntilNextMin);
			$timeout(function() {
				$scope.myDate = new Date();
				myIntervalFunction()
			}, secsUntilNextMin)
		}

		setTime()

		$scope.$on('destroy', function(e) {
			$timeout.cancel(cancelRefresh);
		});




		$scope.checkDate = function() {
			console.log($scope.myDate)
		}

	}])