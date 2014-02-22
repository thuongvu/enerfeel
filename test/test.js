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

// 	beforeEach(module('public/directiveTemplates/addTemplate.html'));

// 	beforeEach(inject(function($templateCache, _$compile_, _$rootScope_) {
// 		template = $templateCache.get('public/directiveTemplates/addTemplate.html');
// 		$templateCache.put('directiveTemplates/addTemplate.html', template);
		
// 		$compile = _$compile_;
// 		$rootScope = _$rootScope_;
// 	}))	

// 	it('should make showAdd true', function() {
// 		var elementPreDigest = angular.element('<div add></div>');
// 		var element = $compile(elementPreDigest)($rootScope);
// 		$rootScope.$digest();

// 		console.log(element.find('input'));
// 		expect(scope.showAdd).toBeTruthy(); // this will fail, but i got the directive working
// 	})

// })


describe('Directives', function() {
	beforeEach(module("app"));
	
	var element, scope, controller;

	beforeEach(module('public/directiveTemplates/addTemplate.html'));

	describe('just the controller', function() {
		var scope, ctrl;
		beforeEach(inject(function($controller, $rootScope) {
			scope = $rootScope;

			ctrl = $controller(AddController, {$scope: scope});
		}))

		it('should show me the controller', function() {
			// console.log(scope.input.checkbox.checked)
			expect(scope.input.checkbox.checked).toEqual(0)
		})
	})

})














