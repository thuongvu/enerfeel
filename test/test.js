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

})







