angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', function ($scope) {
		console.log("in mainCtrl")

		$scope.dataContainer = [{"date": new Date(), "energylevel":2},{"date": new Date(), "energylevel":4}, {"date": new Date(), "energylevel":3}];


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