angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', function ($scope) {
		console.log("in mainCtrl")

		$scope.dataContainer = [{"counter":1, "energylevel":2},{"counter":2, "energylevel":4}];


		$scope.energy = {};
		var counter = 3;
		
		$scope.add = function(item) {
			var dataItem = {};
			dataItem.energylevel = item;
			// var currentTime = new Date;
			// dataItem.time = currentTime;
			dataItem.counter = counter;
			counter++;
			$scope.dataContainer.push(dataItem);
			console.log("dataItem is the data container");
			console.log($scope.dataContainer);
		}
	}])