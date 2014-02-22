var AddController = function ($scope, $timeout) {
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
			if ($scope.input.category = 'exercise') {
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

	// ADD LOGIC
	$scope.addEvent = function(energyLevel, note, category) {
		
		console.log($scope.eventService.allLifeEvents);			

		if (category === 'meal') {
			addIfMeal();
		}

		if (category === 'sleep') {
			addIfSleep(energyLevel, note, category);
		}

		// console.log("$scope.input.opacity is " + $scope.input.opacity);
		// console.log("$scope.input.size is " + $scope.input.size);
		catchEmptyInputs();

		var eventData = {
			energylevel : energyLevel,
			note			: note,
			date        : $scope.dateTimePicked,
			category 	: category,	
			opacity		: $scope.input.opacity,
			size			: $scope.input.size
		};

		$scope.eventService.allLifeEvents.push(eventData);
		$scope.lifeEventsInView.push(eventData)
		$scope.filterService.sortTime($scope.lifeEventsInView);

		$scope.showAdd = false;

		for (prop in $scope.input) {
			$scope.input[prop] = null;
		}

		showHideCategories('all');

		console.log($scope.eventService.allLifeEvents);					

	};

	// DATEPICKER LOGIC
	$scope.dateTimePicked = new Date();
	// $scope.sleepTime = new Date();
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
		showHideCategories($scope.input.category);
	}

	$scope.$watch('input.category', watchCategory, true )

} 

angular.module('app.directives', [])
	.directive('add', ['EventService', 'FilterService', '$timeout', function (EventService, FilterService, $timeout) {
			
		return {
			restrict: 'EA',
			// scope: {},
			// controller: function ($scope) {
			// 	$scope.showAdd = false;
			// 	$scope.show = {};
			// 	$scope.input.checkbox = {};
			// 	$scope.input.checkbox.checked = 0;

			// 	// show the ADD div or not
			// 	$scope.showAddFunc = function() {
			// 		if ($scope.showAdd === true) {
			// 			$scope.showAdd = false; 
			// 		} else {
			// 			$scope.showAdd = true;
			// 		}
			// 	};

			// 	function addIfMeal() {
			// 		if ($scope.input.checkbox == null) {
			// 			$scope.input.checkbox = {};
			// 		}
			// 		$scope.input.checkbox.checked = 0; 

			// 		for (food in $scope.input.checkbox) {
			// 			if ($scope.input.checkbox[food] === true) {
			// 				$scope.input.checkbox.checked++;
			// 			}
			// 		};
			// 		$scope.input.opacity = $scope.input.checkbox.checked;
			// 	}

			

			// 	function catchEmptyInputs() {
			// 		if (($scope.input.opacity == undefined) || ($scope.input.opacity == 0)) {
			// 			$scope.input.opacity = 3;
			// 		}
			// 		if (($scope.input.size == undefined) || ($scope.input.size == 0)) {
			// 			if ($scope.input.category = 'exercise') {
			// 				$scope.input.size = 30;
			// 			} else {
			// 				$scope.input.size = 3;
			// 			}
			// 		}					
			// 	}

			// 	function addIfSleep(energyLevel, note, category) {
			// 		var eventData = {
			// 			energylevel : energyLevel,
			// 			note			: note,
			// 			date        : $scope.wakeTime,
			// 			category 	: category,	
			// 			opacity		: $scope.input.opacity,
			// 			size			: $scope.input.size
			// 		};

			// 		$scope.eventService.allLifeEvents.push(eventData);
			// 		$scope.lifeEventsInView.push(eventData)

			// 	}

			// 	// ADD LOGIC
			// 	$scope.addEvent = function(energyLevel, note, category) {
					
			// 		console.log($scope.eventService.allLifeEvents);			

			// 		if (category === 'meal') {
			// 			addIfMeal();
			// 		}

			// 		if (category === 'sleep') {
			// 			addIfSleep(energyLevel, note, category);
			// 		}

			// 		// console.log("$scope.input.opacity is " + $scope.input.opacity);
			// 		// console.log("$scope.input.size is " + $scope.input.size);
			// 		catchEmptyInputs();

			// 		var eventData = {
			// 			energylevel : energyLevel,
			// 			note			: note,
			// 			date        : $scope.dateTimePicked,
			// 			category 	: category,	
			// 			opacity		: $scope.input.opacity,
			// 			size			: $scope.input.size
			// 		};

			// 		$scope.eventService.allLifeEvents.push(eventData);
			// 		$scope.lifeEventsInView.push(eventData)
			// 		$scope.filterService.sortTime($scope.lifeEventsInView);

			// 		$scope.showAdd = false;

			// 		for (prop in $scope.input) {
			// 			$scope.input[prop] = null;
			// 		}

			// 		showHideCategories('all');

			// 		console.log($scope.eventService.allLifeEvents);					

			// 	};

			// 	// DATEPICKER LOGIC
			// 	$scope.dateTimePicked = new Date();
			// 	// $scope.sleepTime = new Date();
			// 	$scope.wakeTime = new Date();
			// 	setTime();

			// 	var timeIntervalFunction = function() {
			// 		cancelRefresh = $timeout(function createNewDateObj() {
			// 			$scope.dateTimePicked = new Date();
			// 			// console.log("the new time is " + $scope.dateTimePicked);
			// 			cancelRefresh = $timeout(createNewDateObj, 60000);
			// 		}, 60000);
			// 	};

			// 	function setTime() {
			// 		var currentTime = new Date();
			// 		var currentTimeSeconds = currentTime.getSeconds();
			// 		var secsUntilNextMin = (60 - currentTimeSeconds) * 1000;
			// 		// console.log("currentTimeSeconds is " + currentTimeSeconds + " secsUntilNextMin " + secsUntilNextMin);
			// 		$timeout(function() {
			// 			$scope.dateTimePicked = new Date();
			// 			timeIntervalFunction()
			// 		}, secsUntilNextMin)
			// 	};

			// 	$scope.$on('destroy', function(e) {
			// 		$timeout.cancel(cancelRefresh);
			// 	});

			// 	// CATEGORIES SHOW/HIDE + LOGIC
			// 	function showHideCategories(cat) {
			// 		for (category in $scope.show) {
			// 			if (category !== cat) {
			// 				$scope.show[category] = false;
			// 			} else {
			// 				$scope.show[category] = true;
			// 			}
			// 		}
			// 		// console.log($scope.show)
			// 	}

			// 	$scope.show.meal = false;
			// 	$scope.show.exercise = false;
			// 	$scope.show.work = false;
			// 	$scope.show.sleep = false;

			// 	function watchCategory() {
			// 		showHideCategories($scope.input.category);
			// 	}

			// 	$scope.$watch('input.category', watchCategory, true )

			// },
			controller: AddController,
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
			},
			link: function (scope, iElement, iAttrs) {

			},
			templateUrl: 'directiveTemplates/modifyTemplate.html'
		}
	}])
	.directive('albums', function() {
		return {
			restrict: 'EA',
			templateUrl: 'directiveTemplates/albums.html',
			scope: {}
		}
	})
	.directive('tabs', function() {
	  return {
	    restrict: 'E',
	    transclude: true,
	    scope: {},
	    controller: function ($scope, $element) {
	    	var panes = $scope.panes = [];

	    	$scope.select = function(pane) {
	    	  angular.forEach(panes, function(pane) {
	    	    pane.selected = false;
	    	  });
	    	  pane.selected = true;
	    	};

	    	this.addPane = function(pane) {
	    	  if (!panes.length) $scope.select(pane);
	    	  panes.push(pane);
	    	};
	    },
	    templateUrl: 'directiveTemplates/tabs.html',
	    replace: true
	  };
	});







