angular.module('app.directives', [])
	.directive('add', ['EventService', 'FilterService', function (EventService, FilterService) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: function ($scope) {
				$scope.addTest = function() {
					console.log("addTest")
					if ($scope.showAdd === true) {
						$scope.showAdd = false; 
					} else {
						$scope.showAdd = true;
					}
				}
				$scope.showAdd = false;
			},
			link: function (scope, iElement, iAttrs) {

			},
			template: '<button ng-click=' + "addTest()" + '>ADD</button><span ng-show=' + "showAdd" + '>This is sometimes hidden</span>'
		}
	}])