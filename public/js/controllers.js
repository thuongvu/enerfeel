angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', function ($scope) {
		console.log("in mainCtrl")

		$scope.dataContainer = [{"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"hello"},{"date": new Date(2014, 1, 13, 18), "energylevel":4, "note": "world"}, {"date": new Date(2014, 1, 13, 19), "energylevel":3, "note":"this is cool stuff"}];

		$scope.energy = {};
		var counter = 4;
		
		$scope.add = function(item) {
			var dataItem = {};
			dataItem.energylevel = item;
			var currentTime = new Date;
			dataItem.date = currentTime;
			// dataItem.time = currentTime;
			// dataItem.date = counter;
			counter++;
			$scope.dataContainer.push(dataItem);
			console.log("dataItem is the data container");
			console.log($scope.dataContainer);
		}
	}])