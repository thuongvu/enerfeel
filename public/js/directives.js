angular.module('app.directives', [])
	.directive('add', ['EventService', 'FilterService', '$timeout', function (EventService, FilterService, $timeout) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: function ($scope) {
				$scope.showAdd = true;
				$scope.show = {};
				$scope.input.checkbox = {};
				$scope.input.checkbox.checked = 0;

				// show the ADD div or not
				$scope.showModifyFunc = function() {
					if ($scope.showAdd === true) {
						$scope.showAdd = false; 
					} else {
						$scope.showAdd = true;
					}
				};

				function addIfMeal() {
					console.log("checked" + $scope.input.checkbox.checked)
					for (food in $scope.input.checkbox) {
						if ($scope.input.checkbox[food] === true) {
							$scope.input.checkbox.checked++;
						}
					};
					console.log($scope.input.checkbox.checked);
					$scope.input.size = $scope.input.checkbox.checked;

					$scope.input.checkbox = {};
					// $scope.input.checkbox.checked = 0;
				}

				// ADD LOGIC
				$scope.addEvent = function(energyLevel, note, category, opacity) {
					
					if (category === 'meal') {
						addIfMeal();
					}

					var eventData = {
						energylevel : energyLevel,
						note			: note,
						date        : $scope.dateTimePicked,
						category 	: category,	
						opacity		: opacity,
						size			: $scope.input.size
						// size			: $scope.input.checkbox.checked
										// we need a scope.input.size... and only when in the case of category meal, we make it equal to that.  other wise its a direct input. put it another function before this
					};

					$scope.eventService.allLifeEvents.push(eventData);
					$scope.lifeEventsInView.push(eventData)
					$scope.filterService.sortTime($scope.lifeEventsInView);

					$scope.showAdd = false;

					for (prop in $scope.input) {
						$scope.input[prop] = null;
					}

					showHideCategories('all');

					// $scope.input.checkbox = {}; // make checkbox again so it's not null, total hack
					// $scope.input.checkbox.checked = 0;
				};

				// DATEPICKER LOGIC
				$scope.dateTimePicked = new Date();
				setTime();

				var timeIntervalFunction = function() {
					cancelRefresh = $timeout(function createNewDateObj() {
						$scope.dateTimePicked = new Date();
						// console.log("the new time is " + $scope.dateTimePicked);
						cancelRefresh = $timeout(createNewDateObj, 60000);
					}, 60000);
				};

				function setTime() {
					var currentTime = new Date();
					var currentTimeSeconds = currentTime.getSeconds();
					var secsUntilNextMin = (60 - currentTimeSeconds) * 1000;
					// console.log("currentTimeSeconds is " + currentTimeSeconds + " secsUntilNextMin " + secsUntilNextMin);
					$timeout(function() {
						$scope.dateTimePicked = new Date();
						timeIntervalFunction()
					}, secsUntilNextMin)
				};

				// CATEGORIES SHOW/HIDE + LOGIC
				function showHideCategories(cat) {
					for (category in $scope.show) {
						if (category !== cat) {
							$scope.show[category] = false;
						} else {
							$scope.show[category] = true;
						}
					}
					// console.log($scope.show)
				}

				$scope.show.meal = false;
				$scope.show.exercise = false;
				$scope.show.work = false;
				$scope.show.sleep = false;

				function watchCategory() {
					// showHide based on category
					// set both options to 3, JUST IN CASE user won't
					showHideCategories($scope.input.category);
					$scope.input.opacity = 3;
					if ($scope.input.checkbox == null) {
						$scope.input.checkbox = {};
					}
					$scope.input.checkbox.checked = 3;
				}

				$scope.$watch('input.category', watchCategory, true )

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







