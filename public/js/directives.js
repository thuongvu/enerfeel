angular.module('app.directives', [])
	.directive('add', ['EventService', 'FilterService', '$timeout', function (EventService, FilterService, $timeout) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: function ($scope) {
				$scope.showAdd = false;

				$scope.showModifyFunc = function() {
					console.log("addTest")
					if ($scope.showAdd === true) {
						$scope.showAdd = false; 
					} else {
						$scope.showAdd = true;
					}
				};

				$scope.addEvent = function(energyLevel, note, category) {
					var eventData = {
						energylevel : energyLevel,
						note			: note,
						date        : $scope.dateTimePicked,
						category 	: category,	
					};

					$scope.eventService.allLifeEvents.push(eventData);
					$scope.lifeEventsInView.push(eventData)
					$scope.filterService.sortTime($scope.lifeEventsInView);

					$scope.input.level = null;
					$scope.input.note = null; 
					$scope.input.category = null; 
					$scope.showAdd = false;
				};

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
				};

				setTime();

			},
			link: function (scope, iElement, iAttrs) {

			},
			templateUrl: 'directiveTemplates/addTemplate.html'
		}
	}])

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------

	.directive('modify', ['EventService', 'FilterService', function (EventService, FilterService) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: function ($scope) {

				$scope.showModify = false;

				$scope.showModifyFunc = function () {
					if ($scope.showModify === true) {
						$scope.showModify = false;
					} else {
						$scope.showModify = true;
					}
				};

				$scope.deleteEvent = function (event) {
					$scope.eventService.deleteLifeEvent(event.selected);
					console.log($scope.filterService.currentFilterObj.time);
					$scope.lifeEventsInView = $scope.filterService.filterLifeEvents($scope.filterService.currentFilterObj.time);
				};

				$scope.updateEvent = function (event) {
					if (event) {
						console.log(event.selected)
						$scope.eventService.updateLifeEvent(event.selected);
						$scope.lifeEventsInView = $scope.filterService.filterLifeEvents($scope.filterService.currentFilterObj.time);
					}
				};
			},
			link: function (scope, iElement, iAttrs) {

			},
			templateUrl: 'directiveTemplates/modifyTemplate.html'
		}
	}])







