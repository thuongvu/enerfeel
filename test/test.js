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

describe('Directives', function() {
	beforeEach(module("app"));
	
	var element, scope;

	beforeEach(module('public/directiveTemplate/addTemplate.html'));

	beforeEach(inject(function($compile, $rootScope) {
		scope = $rootScope;
		element = angular.element('<button ng-click="' + showAddFunc() +'">Add Event</button>')
		$compile(element)(scope);
		scope.$apply();
	}))	

	it('should make showAdd true', function() {
		// scope.$apply(function() {
			// console.log(element)
		// 	scope.showAddFunc();
		// })
		// expect(scope.showAdd).toBeTruthy();
	})

})





















