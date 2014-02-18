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
				date        : $scope.dateTimePicked,
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

		$scope.dateTimePicked = new Date();

		var timeIntervalFunction = function() {
			cancelRefresh = $timeout(function createNewDateObj() {
				$scope.dateTimePicked = new Date();
				console.log("the new time is " + $scope.dateTimePicked);
				cancelRefresh = $timeout(createNewDateObj, 60000);
			}, 60000);
		};

		function setTime() {
			var currentTime = new Date();
			var currentTimeSeconds = currentTime.getSeconds();
			var secsUntilNextMin = (60 - currentTimeSeconds) * 1000;
			console.log("currentTimeSeconds is " + currentTimeSeconds + " secsUntilNextMin " + secsUntilNextMin);
			$timeout(function() {
				$scope.dateTimePicked = new Date();
				timeIntervalFunction()
			}, secsUntilNextMin)
		}

		setTime()

		$scope.$on('destroy', function(e) {
			$timeout.cancel(cancelRefresh);
		});

		$scope.checkDateChosen = function() {
			console.log($scope.dateTimePicked)
		}

		$scope.sortTime = function(arr) {
			arr.sort(function(a,b) {
					return a.date - b.date	
				})
			// console.log(arr);
			for (var i = 0; i < arr.length; i++) {
				console.log(arr[i].date)
			}
		}

	}])