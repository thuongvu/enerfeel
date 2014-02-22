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


// STILL NOT WORKING

// describe('Directives', function() {
// 	beforeEach(module("app"));
	
// 	var element, scope, controller;

// 	beforeEach(module('public/directiveTemplates/addTemplate.html'));

	// beforeEach(inject(function($compile, $rootScope) {
	// 	scope = $rootScope;
	// 	// ,$controller
	// 	// ctrl = $controller('mainCtrl', {
	// 	// 	$scope: scope
	// 	// });

	// 	// element = angular.element('<button ng-click="showAddFunc()">Add Event</button>')
	// 	element = angular.element('<div add></div>')
	// 	$compile(element)(scope);
	// 	controller = element.controller()
	// 	scope.$apply();
		
	// }))	

	// it('should make showAdd true', function() {
	// 	scope.$apply(function() {
	// 		// console.log(element.controller('add'))
	// 		// console.log(scope)
	// 		// console.log(element.controller)
	// 		console.log(controller)
	// 		scope.showAddFunc();
	// 	})
	// 	expect(scope.showAdd).toBeTruthy();
	// })

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
			console.log(ctrl)
		})
	})

})

// JUS THE CONTROLLER????

// describe('just the controller', function() {
// 	var scope, ctrl;
// 	beforeEach(inject(function($controller, $rootScope) {
// 		scope = $rootScope;

// 		ctl = $controller(AddController, {$scope: scope, $element: null});
// 	}))
// })



// describe('Directive: albums', function() {
//   beforeEach(module('app'));
 
// 	var element, scope;
 
// 	beforeEach(module('directiveTemplates/albums.html'));
 
// 	beforeEach(inject(function($rootScope, $compile) {
// 		element = angular.element('<div class="well span6">' +
// 			'<h3>Busdriver Albums:</h3>' +
// 			'<albums ng-repeat="album in albums" title="{{album.title}}">' +
// 			'</albums></div>');
 
// 		scope = $rootScope;
 
// 		scope.albums = [{
// 			'title': 'Memoirs of the Elephant Man'
// 		}, {
// 			'title': 'Temporary Forever'
// 		}, {
// 			'title': 'Cosmic Cleavage'
// 		}, {
// 			'title': 'Fear of a Black Tangent'
// 		}, {
// 			'title': 'RoadKillOvercoat'
// 		}, {
// 			'title': 'Jhelli Beam'
// 		}, {
// 			'title': 'Beaus$Eros'
// 		}];
 
// 		$compile(element)(scope);
// 		scope.$digest();
// 	}));
 
// 	it("should have the correct amount of albums in the list", function() {
// 		var list = element.find('li');
// 		expect(list.length).toBe(7);
// 	});
// });

// describe('tabs', function() {
//   var elm, scope;

//   // load the tabs code
//   beforeEach(module('app'));

//   // load the templates
//   beforeEach(module('public/directiveTemplates/tabs.html'));

//   beforeEach(inject(function($rootScope, $compile) {
//     // we might move this tpl into an html file as well...
//     elm = angular.element(
//       '<div>' +
//         '<tabs>' +
//           '<pane title="First Tab">' +
//             'first content is {{first}}' +
//           '</pane>' +
//           '<pane title="Second Tab">' +
//             'second content is {{second}}' +
//           '</pane>' +
//         '</tabs>' +
//       '</div>');

//     scope = $rootScope;
//     $compile(elm)(scope);
//     scope.$digest();
//   }));


//   it('should create clickable titles', inject(function($compile, $rootScope) {
//   	console.log(elm)
//     var titles = elm.find('ul.nav-tabs li a');

//     expect(titles.length).toBe(2);
//     expect(titles.eq(0).text()).toBe('First Tab');
//     expect(titles.eq(1).text()).toBe('Second Tab');
//   }));

// });

















