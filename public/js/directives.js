angular.module('app.directives', [])
	.controller('AddController', ['$scope', '$timeout', 'CategoryService', function($scope, $timeout, CategoryService) {
		$scope.show = {};
		// $scope.input = {}; // i don't think i need this
		$scope.input.checkbox = {};
		$scope.input.checkbox.checked = 0;

		$scope.addIfSleep = function (energyLevel, note, category) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				category 	: category,	
				opacity		: $scope.input.opacity,
				size			: $scope.input.size,
				date        : new Date(new Date().getTime() - ($scope.input.size * 3600000))
			};
			$scope.pushDataIntoServices(eventData);
		};

		$scope.pushDataIntoServices = function(eventData) {
			function successFunc() {
				if ($scope.addTemplateAddError) {
					$scope.addTemplateAddError = false;
				}
				$scope.eventService.allLifeEvents.push(eventData);
				$scope.lifeEventsInView.push(eventData);
				$scope.filterService.sortTime($scope.lifeEventsInView);
				$scope.resetInputsCategories();
			};
			function errorFunc() {
				$scope.addTemplateAddError = true;
			};
			$scope.eventService.addLifeEvent(eventData, successFunc, errorFunc);
		}

		$scope.resetInputsCategories = function() {
			for (prop in $scope.input) {
				$scope.input[prop] = null;
			};
			$scope.showAdd = false;
			$scope.showHideCategories('all');
			$scope.categories.selected.category = $scope.categories.list[0];
			$scope.addForm.$setPristine();
		}

		$scope.createEventDataObj = function(energyLevel, note, category) {
			var eventData = {
				energylevel : energyLevel,
				note			: note,
				date        : $scope.dateTimePicked,
				category 	: category,	
				opacity		: $scope.input.opacity,
				size			: $scope.input.size
			};
			return eventData;
		};

		$scope.addEvent = function(energyLevel, note, category) {
			if (category === 'sleep') {
				$scope.addIfSleep(energyLevel, note, category);
			};
			var eventData = $scope.createEventDataObj(energyLevel, note, category);
			$scope.pushDataIntoServices(eventData);
		};

		$scope.$watch('input.checkbox', function() {
			if ($scope.input.checkbox == null) {
				$scope.input.checkbox = {};
			};
			$scope.input.checkbox.checked = 0; 

			for (food in $scope.input.checkbox) {
				if ($scope.input.checkbox[food] === true) {
					$scope.input.checkbox.checked++;
				};
			};
			if ($scope.input.checkbox.checked > 0) {
				$scope.input.opacity = $scope.input.checkbox.checked;
			};
		},true);

	}])
	.directive('add', [function () {		
		return {
			restrict: 'EA',
			controller: 'AddController',
			templateUrl: 'directiveTemplates/addTemplate.html'
		};
	}])

// ----------------------------------------------------------------------------
.controller('timeController', ['$scope', '$timeout', function($scope, $timeout) {
	$scope.dateTimePicked = new Date();
	setTime();

	var timeIntervalFunction = function() {
		cancelRefresh = $timeout(function createNewDateObj() {
			$scope.dateTimePicked = new Date();
			cancelRefresh = $timeout(createNewDateObj, 60000);
		}, 60000);
	};

	function setTime() {
		var currentTime = new Date();
		var currentTimeSeconds = currentTime.getSeconds();
		var secsUntilNextMin = (60 - currentTimeSeconds) * 1000;
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
		controller: 'timeController',
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
	function categoryChange() {
		$scope.showHideCategories($scope.categories.selected.category.value);
	};

	$scope.$watch('categories.selected.category', categoryChange, true);

	$scope.categories.add = function(newCategory) {
		function successFunc() {
			if ($scope.addCategoryTemplateAddCategoryError) {
				$scope.addCategoryTemplateAddCategoryError = false;
			}
			$scope.categories.list = CategoryService.categoriesObj.list;
			$scope.show[newCategory.label] = false;
			$scope.categories.newCategory = {};
		};
		function errorFunc() {
			$scope.addCategoryTemplateAddCategoryError = true;
		};
		$scope.categories.categoryService.addCategory(newCategory, successFunc, errorFunc);
	};

	$scope.categories.newCategory = {};


	$scope.categories.selected.categoryToDelete = $scope.categories.list[0];
	
	$scope.categories.delete = function(category) {
		function successFunc() {
			if ($scope.addCategoryTemplateDeleteCategoryError) {
				$scope.addCategoryTemplateDeleteCategoryError = false;
			};
			$scope.categories.selected.categoryToDelete = $scope.categories.list[0];
		};
		function errorFunc() {
			$scope.addCategoryTemplateDeleteCategoryError = true;
		};
		$scope.categories.categoryService.deleteCategory(category, successFunc, errorFunc);
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
	.controller('modifyController', ['$scope', 'FilterService', 'EventService', function ($scope, FilterService, EventService) {
		$scope.event = {};
		$scope.event.selected;

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
			};
		};
		$scope.deleteEvent = function (event) {
			function successFunc() {
				if ($scope.modifyTemplateAddError) {
					$scope.modifyTemplateAddError = false;
				};
				$scope.lifeEventsInView = $scope.filterService.filterLifeEvents($scope.filterService.currentFilterObj.time);
			};
			function errorFunc() {
				$scope.modifyTemplateAddError = true;
			};
			$scope.eventService.deleteLifeEvent(event.selected, successFunc, errorFunc);
			
		};
		$scope.updateEvent = function (event) {
			function successFunc() {
				if ($scope.modifyTemplateAddError) {
					$scope.modifyTemplateAddError = false;
				};
				$scope.lifeEventsInView = $scope.filterService.filterLifeEvents(FilterService.currentFilterObj.time);
			};
			function errorFunc() {
				$scope.modifyTemplateAddError = true;
			};
			if (event) {
				$scope.eventService.updateLifeEvent(event.selected, successFunc, errorFunc); 
			};
		};

		$scope.modifyDate = new Date();

	}])
	.directive('modify', [function() {
		return {
			restrict: 'EA',
			controller: 'modifyController',
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
		$scope.lifeEventsInView = FilterService.filterLifeEvents(time);
		emitFilterChange();
	}

	$scope.filterCategory = function(category) {
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
	$scope.filterOpacity = function(opacity) {
		$scope.lifeEventsInView = FilterService.filterOpacity(opacity);
		emitFilterChange();
	};

	// filter by size
	$scope.filterSize = function(size) {
		$scope.lifeEventsInView = FilterService.filterSize(size);
		emitFilterChange();
	};


	$scope.resetFilters = function() {
		$scope.lifeEventsInView = FilterService.sortTime(EventService.allLifeEvents);
		emitFilterChange();
	};

	$scope.calendar = {};
	$scope.calendar.firstDate = new Date();
	$scope.calendar.secondDate = new Date();

	$scope.customLengthTime = function(first, second) {
		$scope.lifeEventsInView = $scope.filterService.customFilterLifeEvents(first, second);
	};
}])
.directive('filterdir', [function () {
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
.directive('logsmall', [ '$window', function ($window) {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/logsmall_component.html',
		link: function (scope, iElement, iAttrs) {			
			angular.element($window).bind('resize', function() {
				angular.element(iElement[0]).children()[0].style.height = Math.round($window.innerWidth / 3.45) + "px"
			});
			angular.element(iElement[0]).children()[0].style.height = Math.round($window.innerWidth / 3.45) + "px"
		}
	};
}])
.directive('loglarge', [function () {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/loglarge_component.html'
	};
}])
.directive('instructions', ['$window', function ($window) {
	return {
		restrict: 'EA',
		templateUrl: 'directiveTemplates/larger_components/instructions_component.html',
		link: function (scope, iElement, iAttrs) {
			scope.showInstructions = false;
			angular.element($window).bind('resize', function() {
				angular.element(iElement[0])[0].style.height = Math.round($window.innerWidth / 3.45) + "px"
			});
			angular.element(iElement[0])[0].style.height = Math.round($window.innerWidth / 3.45) + "px"
		}
	};
}]);