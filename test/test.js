// describe('Testing Modules:', function() {
// 	describe("The 'app' module", function () {
// 		var myApp;
// 		beforeEach(function() {
// 			myApp = angular.module("app");
// 		})	
		
// 		it("should be registered", function() {
// 			expect(myApp).toBeDefined();
// 		});

// 		describe("Dependencies:", function() {
// 			var dependencies;
// 			beforeEach(function() {
// 				dependencies = myApp.value('app').requires;
// 			})

// 			var hasModule = function (m) {
// 				return dependencies.indexOf(m) >=0;
// 			};

// 			it("should have app.controllers as a dependency", function() {
// 				expect(hasModule('app.controllers')).toBeGreaterThan(0);
// 			})
// 		});

// 	})
// })

// ----------------------------------------------------------------------------

// describe("Unit: mainCtrl", function() {

// 	beforeEach(function() {
// 		module("app");
// 	})	
	
// 	var ctrl, scope;

// 	beforeEach(inject(function($controller, $rootScope) {
// 		scope = $rootScope.$new();

// 		ctrl = $controller('mainCtrl', {
// 			$scope: scope
// 		});
// 	}))

// 	it("should create $scope.greeting when calling sayHello", function() {
// 		expect(scope.greeting).toBeUndefined();
// 		scope.sayHello();
// 		expect(scope.greeting).toEqual("Hello Thuongvu");
// 	})



// })

// ----------------------------------------------------------------------------

// describe('Services:', function() {
// 	beforeEach(module('app'))

// 	describe('EventService', function() {
// 		var EventService;
// 		beforeEach(inject(function($injector) {
// 			EventService = $injector.get('EventService')
// 		}))

// 		it('should not be null', function() {
// 			expect(EventService).not.toBeNull()
// 		})
// 	})
	
// })

// ----------------------------------------------------------------------------

// describe('Directives', function() {
// 	beforeEach(module("app"));
	
// 	var element, scope, template;

// 	// beforeEach(module('public/directiveTemplates/addTemplate.html'));
// 	beforeEach(module('templates'));

// 	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {
// 		template = $templateCache.get('public/directiveTemplates/addTemplate.html');
// 		$templateCache.put('directiveTemplates/addTemplate.html', template);
// 		template2 = $templateCache.get('public/directiveTemplates/categoryTemplate.html');
// 		$templateCache.put('directiveTemplates/categoryTemplate.html', template2);
		
// 		$compile = _$compile_;
// 		$rootScope = _$rootScope_;
// 	}))	

// 	it('should make showAdd true', function() {
// 		var elementPreDigest = angular.element('<div add></div>');
// 		var element = $compile(elementPreDigest)($rootScope);
// 		$rootScope.$digest();
// 		console.log(element)
// 		// console.log(element.find('input'));
// 		// expect(scope.showAdd).toBeTruthy(); // this will fail, but i got the directive working
// 	})

// })

// ----------------------------------------------------------------------------


// describe('Directives', function() {
// 	beforeEach(module("app"));
	
// 	var element, scope, template;

// 	beforeEach(module('templates'));

// 	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {
// 		template = $templateCache.get('public/directiveTemplates/filterTemplate.html');
// 		$templateCache.put('directiveTemplates/filterTemplate.html', template);
		
// 		$compile = _$compile_;
// 		$rootScope = _$rootScope_;
// 	}))	

// 	it('should make showAdd true', function() {
// 		var elementPreDigest = angular.element('<div filterdir></div>');
// 		var element = $compile(elementPreDigest)($rootScope);
// 		$rootScope.$digest();
// 		console.log(element)
// 		// console.log(element.find('input'));
// 		// expect(scope.showAdd).toBeTruthy(); // this will fail, but i got the directive working
// 	})

// })


describe('Directive: customTimeFilter', function() {
	beforeEach(module("app"));
	
	var element, scope, template, EventService, FilterService, ctrl, filterTemplate;

	beforeEach(module('templates'));

	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, $injector, $controller) {
		EventService = $injector.get('EventService');
		CategoryService = $injector.get('CategoryService');
		template = $templateCache.get('public/directiveTemplates/customTimeFilterTemplate.html');
		$templateCache.put('directiveTemplates/customTimeFilterTemplate.html', template);
		
		filterTemplate = $templateCache.get('public/directiveTemplates/filterTemplate.html');
		$templateCache.put('directiveTemplates/filterTemplate.html', filterTemplate);

		$compile = _$compile_;
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		ctrl = $controller('filterController', {
			$scope: scope
		});
	}));

	it("should render the element with the class, customTime ", function() {
		var elementPreDigest = angular.element('<div custom-time-filter></div>');
		var element = $compile(elementPreDigest)($rootScope);
		$rootScope.$digest();
		expect(element.find('span').hasClass("customTime")).toBeTruthy();
	});

	it("should show custom-time-filter when showCustomTime = true", function() {
		var elementPreDigest = angular.element('<div filterdir></div>');
		var element = $compile(elementPreDigest)(scope);
		scope.$apply();
		expect(element.find('.ng-hide').eq(0).length).toEqual(1);
		scope.showCustomTime = true;
		scope.$apply();
		expect(element.find('.ng-hide').eq(0).length).toEqual(0);
	})

});



// ----------------------------------------------------------------------------

describe("Unit: filterController", function() {

	beforeEach(function() {
		module("app");
	})	
	
	var ctrl, scope;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		ctrl = $controller('filterController', {
			$scope: scope
		});
	}))

	it("should change category to 'hello'", function() {
		expect(scope.category.setTo).toEqual('null')
		scope.filterCategory('hello');
		expect(scope.category.setTo).toEqual("hello");
	})

	it("should have a defined firstDate", function() {
		expect(scope.calendar.firstDate).toBeDefined()
	})

	it("should have a defined secondDate", function() {
		expect(scope.calendar.secondDate).toBeDefined()
	})

});





// ----------------------------------------------------------------------------

describe('Services:', function() {
	beforeEach(module('app'));

	describe('FilterService:', function() {
		var FilterService;
		beforeEach(inject(function($injector) {
			FilterService = $injector.get('FilterService');
		}))

		it('should not be null', function() {
			FilterService.test();
			expect(FilterService).not.toBeNull();
		});

		it('"test" function should return "blah', function() {
			expect(FilterService.test()).toMatch("blah");
		});

		it('sortTime should sort time', function() {
			var data = [
			 {"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
			 {"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 5}, 
			 {"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 15},
			 {"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
			 {"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size":10},
			 {"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
			 ];
			var filteredData = FilterService.sortTime(data);
			expect(filteredData[0].note).toMatch("last month, ate food");
		});

		it('customFilterLifeEvents should take two dates and check if fitting', function() {
			// var currentFilterObj = {};
			// currentFilterObj.lifeEvents = [];
			EventService = {};
			EventService.allLifeEvents = [
				{"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
				{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 5}, 
				{"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 15},
				{"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
				{"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size":10},
				{"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
			];
			 var date1 = new Date(2014, 1, 14, 18);
			 var date2 = new Date(2014, 1, 16, 15);

			 expect((FilterService.customFilterLifeEvents(date1, date2).length)).toEqual(4);
		})

		// it("filterLifeEvents should take one time input, return anything within that time", function() {
		// 	EventService = {};
		// 	EventService.allLifeEvents = [
		// 		{"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"ate more food", "category": "meal", "opacity": 2, "size": 2},
		// 		{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "ran", "category": "exercise", "opacity": 3, "size": 5}, 
		// 		{"date": new Date(2014, 1, 15, 19), "energylevel":3, "note":"swam", "category": "exercise", "opacity": 4, "size": 15},
		// 		{"date": new Date(2014, 0, 13, 15), "energylevel":3, "note":"last month, ate food", "category": "meal", "opacity": 1, "size": 1},
		// 		{"date": new Date(2014, 1, 16, 4), "energylevel":1, "note":"ate snack", "category": "exercise", "opacity": 5, "size":10},
		// 		{"date": new Date(2014, 1, 16, 15), "energylevel":4, "note":"ate snack", "category": "meal", "opacity": 1, "size": 5},
		// 	];
		// 	expect((FilterService.filterLifeEvents('week').length)).toEqual(2);
		// 	// this test may fail by next week -_-, gotta write a better one
		// })

	});
	
	describe('CategoryService', function() {
		var CategoryService;
		beforeEach(inject(function($injector) {
			CategoryService = $injector.get('CategoryService')
		}));

		it('should not be null', function() {
			expect(CategoryService).not.toBeNull()
		});

		it('should contain an categoriesObj that has a list of items', function() {
			expect(CategoryService.categoriesObj.list[0].label).toMatch('Choose a category');
		});

		it('addCategory should add an item to the categoriesObj.list', function() {
			expect(CategoryService.categoriesObj.list[5]).toBeUndefined();
			var obj = {label: 'blue', size: 'intensity', opacity:'hue'};
			CategoryService.addCategory(obj);
			expect(CategoryService.categoriesObj.list[5]).toMatch({label: 'blue', size: 'intensity', opacity:'hue'});
		});

		it('deleteCategory should delete specified item from categoriesObj.list', function() {
			expect(CategoryService.categoriesObj.list[1].label).toContain('meal');
			CategoryService.deleteCategory('meal');
			expect(CategoryService.categoriesObj.list[1].label).not.toMatch('meal');
		});

		describe("On the mainCtrl,", function() {
			var ctrl, scope;

			beforeEach(inject(function($controller, $rootScope) {
				scope = $rootScope.$new();

				ctrl = $controller('mainCtrl', {
					$scope: scope
				});
			}));

			it("categoryService should be injected within", function() {
				expect(scope.categoryService).not.toBeNull();
			});
		});
	});

});


// ----------------------------------------------------------------------------


describe('Directive: moreCategoryInputs', function() {
	beforeEach(module("app"));
	
	var element, scope, template, CategoryService;

	beforeEach(module('templates'));

	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, $injector) {
		CategoryService = $injector.get('CategoryService')
		template = $templateCache.get('public/directiveTemplates/categoryOptionsListTemplate.html');
		$templateCache.put('directiveTemplates/categoryOptionsListTemplate.html', template);
		
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}))	

	it('should do an ng-options', function() {
		var pre = angular.element('<div category-options-list></div>');
		var elementPreDigest = angular.element('<div category-options-list></div>');
		var element = $compile(elementPreDigest)($rootScope);
		$rootScope.$digest();
		expect(pre.find('select').length).toEqual(0);
		expect(element.find('select').length).toBeGreaterThan(0);
	});

})



// ==========
describe("On the moreCategoryInputsController (of moreCategoryInputs),", function() {
	var ctrl, scope;

	beforeEach(module('app'))
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		ctrl = $controller('moreCategoryInputsController', {
			$scope: scope
		});
	}));

	it("should receive a list of 5 items from CategoryService", function() {
		expect(scope.categories.list.length).toEqual(5);
	});

	it("$scope.categories.selected.category input should start w/ a obj message saying 'Choose a category'", function() {
		expect(scope.categories.selected.category).toMatch(scope.categories.list[0]);
	});

	it('scope.show should not be null', function() {
		expect(scope.show).not.toBeNull();
	});

	it("scope.show should have categories.show all be false", function() {
		for (prop in scope.show) {
			expect(scope.show[prop]).toBeFalsy();
		}
	});

	it("should have a working $scope.showHideCategories", function() {
		expect(scope.show.exercise).toBeFalsy();
		scope.showHideCategories('exercise');
		expect(scope.show.exercise).toBeTruthy();
		scope.showHideCategories('meal');
		expect(scope.show.exercise).toBeFalsy();
		expect(scope.show.meal).toBeTruthy();
	})

	it("scope.watch should invoke categoryChange, which invokes showHideCategories", function() {
		expect(scope.show.exercise).toBeFalsy();
		scope.categories.selected.category = scope.categories.list[2];
		scope.$apply();
		expect(scope.show.exercise).toBeTruthy();
	});	

	// ADD DELETE CATEGORY FUNCTION

});




describe('Directive: moreCategoryInputs', function() {
	beforeEach(module("app"));
	
	var element, scope, template, CategoryService, ctrl;

	beforeEach(module('templates'));

	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, $injector, $controller) {
		CategoryService = $injector.get('CategoryService')
		template = $templateCache.get('public/directiveTemplates/moreCategoryInputsTemplate.html');
		$templateCache.put('directiveTemplates/moreCategoryInputsTemplate.html', template);
		
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		ctrl = $controller('moreCategoryInputsController', {
			$scope: scope
		});
	}))	

	it('should render 5 ng-repeat ".cat"s', function() {
		var pre = angular.element('<div more-category-inputs></div>');
		var elementPreDigest = angular.element('<div more-category-inputs></div>');
		var element = $compile(elementPreDigest)($rootScope);
		$rootScope.$digest();
		expect(pre).not.toEqual(element);
		expect(element.find('div.cat').length).toEqual(5);
	})

	it('there will be one ng-repeated div that has class "meal"', function() {
		var elementPreDigest = angular.element('<div more-category-inputs></div>');
		var element = $compile(elementPreDigest)($rootScope);
		$rootScope.$digest();
		var category = element.find('.meal');
		expect(category.eq(0)).not.toBeNull();
	})

	it("should ng-show the right thing after you change categories.selected.category, invoking categoryChange, showHideCategories", function() {
		
		// A. on scope instead of rootscope this time
		// $compile compiles an html string into a template
		// produces a template function
		// then it can link the scope and template together

		var elementPreDigest = angular.element('<div more-category-inputs></div>');
		var element = $compile(elementPreDigest)(scope); //A 

		// 1. i need at least 1 $apply, because it calls $rootScope.$digest
		// ng-repeat needs to do that, because it creates child scopes for each iteration
		
		// 2. change some vars that will change the dom!

		// 3. scope.$digest runs watchers on the current scope // might want to change it to scope.apply if any problems
		// no need to go up all the way the tree like scope.apply did.
		// i know my changes are only on this scope, w/ show.exercise = true

		//1
		scope.$apply();  
		// 2
		scope.show.exercise = true;
		//3
		scope.$digest();
		
		expect(element.find('.exercise').eq(0).hasClass('ng-hide')).toBeFalsy();
		expect(element.find('.meal').eq(0).hasClass('ng-hide')).toBeTruthy();

	});

	
});



// --------------------------
describe('Directive: addCategory', function() {
	beforeEach(module("app"));
	
	var element, scope, template, CategoryService, ctrl;

	beforeEach(module('templates'));

	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, $injector, $controller) {
		CategoryService = $injector.get('CategoryService')
		template = $templateCache.get('public/directiveTemplates/addCategoryTemplate.html');
		$templateCache.put('directiveTemplates/addCategoryTemplate.html', template);
		
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		ctrl = $controller('moreCategoryInputsController', {
			$scope: scope
		});
	}));

	it('should render a bunch of inputs', function() {
		var elementPreDigest = angular.element('<div add-category></div>');
		var element = $compile(elementPreDigest)($rootScope);
		$rootScope.$digest();
		expect(element.find('input').length).toBeGreaterThan(0)
	})

	it("should have addCategory add a new category with a service, clear newCategory obj after", function() {
		expect(scope.categories.list.length).toEqual(5);
		scope.categories.newCategory = {label: 'blue', size: 'intensity', opacity:'hue'};
		scope.categories.add(scope.categories.newCategory);
		expect(scope.categories.list.length).toEqual(6);
		expect(scope.categories.list[5]).toEqual({label: 'blue', value: 'blue', size:'intensity', opacity:'hue', show: 'show.blue'});
		expect(scope.categories.newCategory).toEqual({});
	});

	it("should have $scope.show[newCategory] = false, on addCategory", function() {	
		for (prop in scope.show) {
			expect(scope.show[prop]).toBeFalsy();
		};
		var obj = {label: 'blue', size: 'intensity', opacity:'hue'};
		scope.categories.add(obj);
		for (prop in scope.show) {
			expect(scope.show[prop]).toBeFalsy();
		};
	});

	it('when clicking showAddCategories button, it should make a span show and hide', function() {
		var elementPreDigest = angular.element('<div add-category></div>');
		var element = $compile(elementPreDigest)(scope);
		scope.$digest();
		expect(element.find('span').eq(0).hasClass('ng-hide')).toBeTruthy();
		scope.showAddCategories = true;
		scope.$digest();
		expect(element.find('span').eq(0).hasClass('ng-hide')).toBeFalsy();
	})



});


// -------------------

describe('Directive: Add', function() {
	beforeEach(module("app"));
	
	var element, scope, template, CategoryService, ctrl, addCategoryTemplate, categoryOptionsListTemplate,
	moreCategoryInputsTemplate;

	beforeEach(module('templates'));

	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_, $injector, $controller) {
		CategoryService = $injector.get('CategoryService')
		template = $templateCache.get('public/directiveTemplates/addTemplate.html');
		$templateCache.put('directiveTemplates/addTemplate.html', template);

		addCategoryTemplate = $templateCache.get('public/directiveTemplates/addCategoryTemplate.html');
		$templateCache.put('directiveTemplates/addCategoryTemplate.html', addCategoryTemplate);

		categoryOptionsListTemplate = $templateCache.get('public/directiveTemplates/categoryOptionsListTemplate.html');
		$templateCache.put('directiveTemplates/categoryOptionsListTemplate.html', categoryOptionsListTemplate);

		moreCategoryInputsTemplate = $templateCache.get('public/directiveTemplates/moreCategoryInputsTemplate.html');
		$templateCache.put('directiveTemplates/moreCategoryInputsTemplate.html', moreCategoryInputsTemplate);
		
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		ctrl = $controller('AddController', {
			$scope: scope
		});
	}));

	it(" has Add Event button that !showAdd, renders a div w/ class 'showAdd'", function() {
		var elementPreDigest = angular.element('<div add></div>');
		var element = $compile(elementPreDigest)(scope);
		scope.$digest();
		expect(element.find('.ng-hide.showAdd').eq(0).length).toEqual(1);
		scope.showAdd = true;
		scope.$digest();
		expect(element.find('.ng-hide.showAdd').eq(0).length).toEqual(0);
	});

	// it("can use createEventDataObj", function() {
	// 	// console.log(scope.addEvent);
	// 	scope.addEvent(3, 'hello', 'meal');

	// })

});

describe("AddController ", function() {
	var ctrl, scope, EventService, FilterService;

	beforeEach(module('app'))
	beforeEach(inject(function($controller, $rootScope, $injector) {
		scope = $rootScope.$new();

		ctrl = $controller('AddController', {
			$scope: scope
		});
		EventService = $injector.get('EventService');
		FilterService = $injector.get('FilterService');
	}));

	it("addEvent adds an event to the eventService", function() {
		scope.eventService = EventService;
		scope.filterService = FilterService;
		scope.lifeEventsInView = scope.filterService.filterLifeEvents("month");
		scope.showHideCategories = function(cat) {
				for (category in scope.show) {
					if (category !== cat) {
						scope.show[category] = false;
					} else {
						scope.show[category] = true;
					}
				}
			};
		scope.categories = {};
		scope.categories.selected = {};
		scope.categories.list = [];
		scope.categories.list[0] = {label:'Choose a category', value: 'noCategoryChosen'};

		scope.dateTimePicked = new Date();
		scope.addEvent(3, 'hello', 'meal');
		expect(scope.eventService.allLifeEvents[scope.eventService.allLifeEvents.length - 1])
		.toMatch({energylevel: 3, note: 'hello', date: scope.dateTimePicked, category: 'meal', opacity: 3, size: 3})
	});

});

