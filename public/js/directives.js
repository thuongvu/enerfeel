angular.module('app.directives', [])
	.controller('AddController', ['$scope', '$timeout', 'CategoryService', function($scope, $timeout, CategoryService) {
		// $scope.showAdd = false;
		$scope.show = {};
		$scope.input = {};
		$scope.input.checkbox = {};
		$scope.input.checkbox.checked = 0;

		// show the ADD div or not
		// $scope.showAddFunc = function() {
		// 	if ($scope.showAdd === true) {
		// 		$scope.showAdd = false; 
		// 	} else {
		// 		$scope.showAdd = true;
		// 	}
		// };


		// ADDING LOGIC
		// function addIfMeal() {
		// 	if ($scope.input.checkbox == null) {
		// 		$scope.input.checkbox = {};
		// 	}
		// 	$scope.input.checkbox.checked = 0; 

		// 	for (food in $scope.input.checkbox) {
		// 		if ($scope.input.checkbox[food] === true) {
		// 			$scope.input.checkbox.checked++;
		// 		}
		// 	};
		// 	$scope.input.opacity = $scope.input.checkbox.checked;
		// }

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
				category 	: category,	
				opacity		: $scope.input.opacity,
				size			: $scope.input.size,
				date        : new Date(new Date().getTime() - ($scope.input.size * 3600000))
			};

			$scope.eventService.allLifeEvents.push(eventData);
			$scope.lifeEventsInView.push(eventData)

		};

		function pushDataIntoServices(eventData) {
			// $scope.eventService.allLifeEvents.push(eventData);
			$scope.eventService.addLifeEvent(eventData);
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

			// if (category === 'meal') {
			// 	addIfMeal();
			// } 
			// else 
				if (category === 'sleep') {
				addIfSleep(energyLevel, note, category);
			}

			catchEmptyInputs();
			var eventData = createEventDataObj(energyLevel, note, category);
// console.log(eventData);
			pushDataIntoServices(eventData);
			// $scope.showAddFunc();
			$scope.showAdd = false;
			clearInputs();
			$scope.showHideCategories('all');
			$scope.categories.selected.category = $scope.categories.list[0];
			$scope.addForm.$setPristine();

		};

		$scope.$watch('input.checkbox', function() {
			if ($scope.input.checkbox == null) {
				$scope.input.checkbox = {};
			}
			$scope.input.checkbox.checked = 0; 

				for (food in $scope.input.checkbox) {
					if ($scope.input.checkbox[food] === true) {
						$scope.input.checkbox.checked++;
					}
				};
				if ($scope.input.checkbox.checked > 0) {
					$scope.input.opacity = $scope.input.checkbox.checked;
				} 
				
		},true)

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
	// $scope.wakeTime = new Date();
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
.controller('moreCategoryInputsController', ['$scope', 'CategoryService', function ($scope, CategoryService) {
	$scope.categories = {};
	$scope.categories.categoryService = CategoryService;
	$scope.categories.list = $scope.categories.categoryService.categoriesObj.list;
	$scope.show = {};
	for (var i = 0; i < $scope.categories.list.length; i++) {
		if ($scope.show[$scope.categories.list[i].label] == null) {
			$scope.show[$scope.categories.list[i].label] = false;
		}
	}
	$scope.categories.selected = {};
	$scope.categories.selected.category = $scope.categories.list[0];

	 $scope.showHideCategories = function(cat) {
		for (category in $scope.show) {
			if (category !== cat) {
				$scope.show[category] = false;
			} else {
				$scope.show[category] = true;
			}
		}
	}
	// $scope.input = {}; // using this to make a local copy so i
	function categoryChange() {
		// console.log($scope.show);
		// console.log($scope.categories.list[0])
		// $scope.input.category = $scope.categories.selected.category.value;
		$scope.showHideCategories($scope.categories.selected.category.value);
	};

	$scope.$watch('categories.selected.category', categoryChange, true);

	$scope.categories.add = function(newCategory) {
		$scope.categories.list = $scope.categories.categoryService.addCategory(newCategory);
		$scope.show[newCategory.label] = false;
		$scope.categories.newCategory = {};
	};

	$scope.categories.newCategory = {};


	$scope.categories.selected.categoryToDelete = $scope.categories.list[0];

	$scope.categories.delete = function(category) {
		CategoryService.deleteCategory(category, function() {
			$scope.categories.selected.categoryToDelete = $scope.categories.list[0];
		});
	};

	$scope.showInNav = function(data) {
		if (data === 'showModify') {
			$scope.showModify = !$scope.showModify;
			$scope.showAddCategories = false;
			$scope.showFilterdir = false;
			$scope.showAdd = false;
		} else if (data === 'showAddCategories') {
			$scope.showAddCategories = !$scope.showAddCategories;
			$scope.showModify = false;
			$scope.showFilterdir = false;
			$scope.showAdd = false;
		} else if (data === 'showFilterdir') {
			$scope.showAddCategories = false;
			$scope.showModify = false;
			$scope.showFilterdir = !$scope.showFilterdir;
			$scope.showAdd = false;
		} else if (data === 'showAdd') {
			$scope.showAddCategories = false;
			$scope.showModify = false;
			$scope.showFilterdir = false;
			$scope.showAdd = !$scope.showAdd;
		};
	};

}])
.directive('moreCategoryInputs', [function () {
	return {
		restrict: 'EA',
		controller: 'moreCategoryInputsController',
		templateUrl: 'directiveTemplates/moreCategoryInputsTemplate.html'
	};
}])
.directive('addCategory', [function() {
	return {
		restrict: 'EA',
		controller: 'moreCategoryInputsController',
		templateUrl: 'directiveTemplates/addCategoryTemplate.html'
	};
}])

// ----------------------------------------------------------------------------
	.controller('modifyController', ['$scope', 'FilterService', function ($scope, FilterService) {
		$scope.event = {};
		$scope.event.selected;
		// $scope.showModify = false; // if we disable this, we're golden

		function showModifyWatch() {
			if ($scope.showModify === true) {
				$scope.event = {};
				$scope.event.selected;
			};
		}
		$scope.$watch('showModify', showModifyWatch, true)

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
			// console.log($scope.filterService.currentFilterObj.time);
			$scope.lifeEventsInView = $scope.filterService.filterLifeEvents($scope.filterService.currentFilterObj.time);
		};

		$scope.updateEvent = function (event) {
			if (event) {
				// console.log(event.selected)
				$scope.eventService.updateLifeEvent(event.selected); // might need to disable that
				// $scope.lifeEventsInView = $scope.filterService.filterLifeEvents($scope.filterService.currentFilterObj.time);
				$scope.lifeEventsInView = $scope.filterService.filterLifeEvents(FilterService.currentFilterObj.time);
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
// ----------------------------------------------------------------------------
.controller('filterController', ['EventService', 'FilterService', '$scope', function (EventService, FilterService, $scope) {
	$scope.category = {};
	$scope.category.setTo = 'null';

	function emitFilterChange() {
		$scope.$emit('filterSomething', $scope.lifeEventsInView)
	}

	$scope.filterTime = function(time) {
		// console.log(time)
		// $scope.lifeEventsInView = $scope.filterService.filterLifeEvents(time);
		$scope.lifeEventsInView = FilterService.filterLifeEvents(time);
		console.log($scope.lifeEventsInView);
		emitFilterChange();
	}

	$scope.filterCategory = function(category) {
		// $scope.category.setTo = category;
		$scope.lifeEventsInView = FilterService.filterActivity(category);
		emitFilterChange();
	};

	$scope.filterHour = function(date) {
		$scope.lifeEventsInView = FilterService.filterHour(date);
		emitFilterChange();
	};

	$scope.filterDate = function(date) {
		$scope.lifeEventsInView = FilterService.filterDate(date);
		emitFilterChange();
	};

	// filter energy
	$scope.filterEnergy = function(energy) {
		$scope.lifeEventsInView = FilterService.filterEnergy(energy);
		emitFilterChange();
	};

	// filter opacity
	$scope.filterOpacity= function(opacity) {
		$scope.lifeEventsInView = FilterService.filterOpacity(opacity);
		emitFilterChange();
	};

	// filter by size
	$scope.filterSize= function(size) {
		$scope.lifeEventsInView = FilterService.filterSize(size);
		emitFilterChange();
	};


	$scope.resetFilters = function() {
		console.log("resetFilters")
		// $scope.lifeEventsInView = $scope.filterService.sortTime(EventService.allLifeEvents);
		$scope.lifeEventsInView = FilterService.sortTime(EventService.allLifeEvents);
		console.log($scope.lifeEventsInView);
		emitFilterChange();
	};

	
	$scope.calendar = {};
	$scope.calendar.firstDate = new Date();
	$scope.calendar.secondDate = new Date();

	$scope.customLengthTime = function(first, second) {
		$scope.lifeEventsInView = $scope.filterService.customFilterLifeEvents(first, second);
	};
}])
.directive('filterdir', ['EventService', 'FilterService', function (EventService, FilterService) {
	return {
		restrict: 'EA',
		controller: 'filterController',
		templateUrl: 'directiveTemplates/filterTemplate.html'
	};
}])
.directive('customTimeFilter', [function() {
	return {
		restrict: 'EA',
		controller: 'filterController',
		templateUrl: 'directiveTemplates/customTimeFilterTemplate.html'
	};
}])
// ----------------------------------------------------------------------------
.controller('categoryOptionsListController', ['CategoryService', '$scope', function (CategoryService, $scope) {
	$scope.categories = {};
	$scope.categories.categoryService = CategoryService;
	$scope.categories.list = $scope.categories.categoryService.categoriesObj.list;
	$scope.categories.selected = {};
	$scope.categories.selected.category = $scope.categories.list[0];
	function onCategoryChange() {
		// console.log($scope.categories.selected.category);
	};
	$scope.$watch('categories.selected.category', onCategoryChange, true);

}])
.directive('categoryOptionsList', [function () {
	return {
		restrict: 'EA',
		controller: 'categoryOptionsListController',
		templateUrl: 'directiveTemplates/categoryOptionsListTemplate.html'
	};
}])
.directive('navbarnotloggedin', [function () {
	return {
		restrict: 'EA',
		controller: 'mainCtrl',
		templateUrl: 'directiveTemplates/larger_components/navbarnotLoggedIncomponent.html'
	};
}])
.directive('navbarloggedin', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/navbar-loggedIn_component.html'
	};
}])
.directive('navbarlower', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/navbar-lower_component.html'
	};
}])
.directive('optionsarea', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/options-area_component.html'
	};
}])
.directive('graphlargercomponents', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/graph_component.html'
	};
}])
.directive('logsmall', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/logsmall_component.html'
	};
}])
.directive('loglarge', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/loglarge_component.html'
	};
}])










