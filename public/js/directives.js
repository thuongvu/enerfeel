angular.module('app.directives', [])
	.directive('add', ['EventService', 'FilterService', function (EventService, FilterService) {
		return {
			restrict: 'EA',
			// scope: {},
			controller: function ($scope) {
				$scope.showAdd = false;

				$scope.addTest = function() {
					console.log("addTest")
					if ($scope.showAdd === true) {
						$scope.showAdd = false; 
					} else {
						$scope.showAdd = true;
					}
				}

				$scope.addEvent = function(energyLevel, note, category) {
					var eventData = {
						energylevel : energyLevel,
						note			: note,
						date        : $scope.dateTimePicked,
						category 	: category,	
					};

					$scope.eventService.allLifeEvents.push(eventData);
					$scope.lifeEventsInView.push(eventData)
					// $scope.sortTime($scope.lifeEventsInView)
					$scope.filterService.sortTime($scope.lifeEventsInView);

					$scope.input.level = null;
					$scope.input.note = null; 
					$scope.input.category = null; 
					$scope.showAdd = false;
				}

			},
			link: function (scope, iElement, iAttrs) {

			},
			templateUrl: 'directiveTemplates/addTemplate.html'
			// template: '<button ng-click=' + "addTest()" + '>ADD</button><span ng-show=' + "showAdd" + '>This is sometimes hidden</span>'
		}
	}])