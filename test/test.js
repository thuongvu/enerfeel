describe('Testing Modules:', function() {
	describe("The 'app' module", function () {
		var myApp;
		beforeEach(function() {
			myApp = angular.module("app");
		})	
		
		it("should be registered", function() {
			expect(myApp).toBeDefined();
		});

		describe("Dependencies:", function() {
			var dependencies;
			beforeEach(function() {
				dependencies = myApp.value('app').requires;
			})

			var hasModule = function (m) {
				return dependencies.indexOf(m) >=0;
			};

			it("should have app.controllers as a dependency", function() {
				expect(hasModule('app.controllers')).toBeGreaterThan(0);
			})

		})

		
	})
})


describe("Unit: mainCtrl", function() {

	beforeEach(function() {
		module("app");
	})	
	
	var ctrl, scope;

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		ctrl = $controller('mainCtrl', {
			$scope: scope
		});
	}))

	it("should create $scope.greeting when calling sayHello", function() {
		expect(scope.greeting).toBeUndefined();
		scope.sayHello();
		expect(scope.greeting).toEqual("Hello Thuongvu");
	})
})

