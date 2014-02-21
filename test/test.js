// describe("hello", function() {
// 	it("should work", function() {
// 		expect(true).toBe(true)
// 	})
// })

// describe("Midway: Testing Modules", function() {
// 	describe("App Module:", function() {
// 		// var module;
// 		// before(function() {
// 			// var module = module("app");
// 		// });

// 		beforeEach(module('app'));

// 		it("should be registered", function() {
// 			expect(module('app')).to.equal(null);
// 		});

// 	})
// })

describe("Unit: mainCtrl", function() {
	beforeEach(module("app"));

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

