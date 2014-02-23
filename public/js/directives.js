angular.module('app.directives', [])
	.controller('AddController', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.showAdd = false;
		$scope.show = {};
		$scope.input = {};
		$scope.input.checkbox = {};
		$scope.input.checkbox.checked = 0;

		// show the ADD div or not
		$scope.showAddFunc = function() {
			if ($scope.showAdd === true) {
				$scope.showAdd = false; 
			} else {
				$scope.showAdd = true;
			}
		};

		// ADDING LOGIC
		function addIfMeal() {
			if ($scope.input.checkbox == null) {
				$scope.input.checkbox = {};
			}
			$scope.input.checkbox.checked = 0; 

			for (food in $scope.input.checkbox) {
				if ($scope.input.checkbox[food] === true) {
					$scope.input.checkbox.checked++;
				}
			};
			$scope.input.opacity = $scope.input.checkbox.checked;
		}

		function catchEmptyInputs() {
			if (($scope.input.opacity == undefined) || ($scope.input.opacity == 0)) {
				$scope.input.opacity = 3;
			}
			if (($scope.input.size == undefined) || ($scope.input.size == 0)) {
				if ($scope.input.category === 'exercise') {
					// console.log($scope.input.category)
					$scope.input.size = 30;
				} else {
					$scope.input.size = 3;
				}
			}					
		}

		function addIfSleep(energyLevel, note, category) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : $scope.wakeTime,
				category 	: category,	
				opacity		: $scope.input.opacity,
				size			: $scope.input.size
			};

			$scope.eventService.allLifeEvents.push(eventData);
			$scope.lifeEventsInView.push(eventData)

		}

		function pushDataIntoServices(eventData) {
			$scope.eventService.allLifeEvents.push(eventData);
			$scope.lifeEventsInView.push(eventData)
			$scope.filterService.sortTime($scope.lifeEventsInView);
		}

		function clearInputs() {
			for (prop in $scope.input) {
				$scope.input[prop] = null;
			}
		}

		function createEventDataObj(energyLevel, note, category) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : $scope.dateTimePicked,
				category 	: category,	
				opacity		: $scope.input.opacity,
				size			: $scope.input.size
			};
			return eventData;
		}

		// WHERE ALL THESE ADD FUNCTIONS COME TOGETHER
		$scope.addEvent = function(energyLevel, note, category) {
			
			if (category === 'meal') {
				addIfMeal();
			} else if (category === 'sleep') {
				addIfSleep(energyLevel, note, category);
			}

			catchEmptyInputs();
			var eventData = createEventDataObj(energyLevel, note, category);
			pushDataIntoServices(eventData);
			$scope.showAddFunc();
			clearInputs();
			$scope.showHideCategories('all');
		};

	}])
	.directive('add', ['EventService', 'FilterService', '$timeout', function (EventService, FilterService, $timeout) {		
		return {
			restrict: 'EA',
			controller: 'AddController',
			link: function (scope, iElement, iAttrs) {
			},
			templateUrl: 'directiveTemplates/addTemplate.html'
		};
	}])

// ----------------------------------------------------------------------------
.controller('timeController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.dateTimePicked = new Date();
	$scope.wakeTime = new Date();
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

	$scope.$on('destroy', function(e) {
		$timeout.cancel(cancelRefresh);
	});
}])	
.directive('time', ['$timeout', function ($timeout) {
	
	return {
		restrict: 'EA',
		// scope: {},
		controller: 'timeController',
		link: function (scope, iElement, iAttrs) {
		},
		template: '<datepicker ng-model="dateTimePicked"></datepicker>'
	};
}])
// ----------------------------------------------------------------------------
.controller('categoryController', ['$scope', function ($scope) {
	console.log("show me once")
	// CATEGORIES SHOW/HIDE + LOGIC
	 $scope.showHideCategories = function(cat) {
		for (category in $scope.show) {
			if (category !== cat) {
				$scope.show[category] = false;
			} else {
				$scope.show[category] = true;
			}
		}
	}
	// $scope.show = {};
	$scope.show.meal = false;
	$scope.show.exercise = false;
	$scope.show.work = false;
	$scope.show.sleep = false;

	function watchCategory() {
		$scope.showHideCategories($scope.input.category);
	}

	$scope.$watch('input.category', watchCategory, true)
}])
.directive('categorydir', [function () {
	return {
		restrict: 'EA',
		controller: 'categoryController',
		templateUrl: 'directiveTemplates/categoryTemplate.html'
	};
}])

// ----------------------------------------------------------------------------
	.controller('modifyController', ['$scope', function ($scope) {
		$scope.event = {};
		$scope.event.selected;
		$scope.showModify = false;

		$scope.showModifyFunc = function () {

			if ($scope.showModify === true) {
				$scope.showModify = false;
				$scope.event = {};
				$scope.event.selected;
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
	}])
	.directive('modify', ['EventService', 'FilterService', function (EventService, FilterService) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: 'modifyController',
			link: function (scope, iElement, iAttrs) {
			},
			templateUrl: 'directiveTemplates/modifyTemplate.html'
		}
	}])





