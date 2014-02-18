angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', 'EventService', 'FilterService', '$timeout', function ($scope, EventService, FilterService, $timeout) {
		console.log("in mainCtrl")
		$scope.eventService = EventService;
		$scope.filterService = FilterService;
		$scope.lifeEventsInView = $scope.filterService.filterLifeEvents("month");
		$scope.input = {};
		$scope.category = {};
		$scope.category.setTo = 'null';

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

		$scope.filterCategory = function(category) {
			$scope.category.setTo = category;
		}

		$scope.myDate = new Date();

		var timeIntervalFunction = function() {
			cancelRefresh = $timeout(function createNewDateObj() {
				$scope.myDate = new Date();
				console.log("the new time is " + $scope.myDate);
				cancelRefresh = $timeout(createNewDateObj, 60000);
			}, 60000);
		};

		function setTime() {
			var currentTime = new Date();
			var currentTimeSeconds = currentTime.getSeconds();
			var secsUntilNextMin = (60 - currentTimeSeconds) * 1000;
			console.log("currentTimeSeconds is " + currentTimeSeconds + " secsUntilNextMin " + secsUntilNextMin);
			$timeout(function() {
				$scope.myDate = new Date();
				timeIntervalFunction()
			}, secsUntilNextMin)
		}

		setTime()

		$scope.$on('destroy', function(e) {
			$timeout.cancel(cancelRefresh);
		});


	}])