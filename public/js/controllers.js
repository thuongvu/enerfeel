angular.module('app.controllers', [])
	.controller('mainCtrl', ['$scope', function ($scope) {
		console.log("in mainCtrl")

		$scope.dataContainer = [{"date": new Date(2014, 1, 13, 15), "energylevel":2, "note":"hello"},{"date": new Date(2014, 1, 14, 18), "energylevel":4, "note": "world"}, {"date": new Date(2014, 1, 14, 19), "energylevel":3, "note":"this is cool stuff"}];
		console.log($scope.dataContainer)
		$scope.energy = {};
		var counter = 4;
		
		$scope.add = function(item, note) {
			var dataItem = {};

			dataItem.energylevel = item;
			dataItem.note = note;

			var currentTime = new Date;
			dataItem.date = currentTime;
			
			counter++;

			$scope.dataContainer.push(dataItem);

			console.log("dataItem is the data container");
			console.log($scope.dataContainer);

			$scope.energy.level = null;
			$scope.energy.note = null;
			// make sure currentfilter isnt null, that means we have to change it at first, currently
			$scope.filter($scope.currentFilter.time);
			console.log($scope.currentFilter.time)
		}

		$scope.dataContainerTwo = $scope.dataContainer;
		$scope.currentFilter = {};
		$scope.currentFilter.time = "month";
		$scope.filter = function(time) {
			console.log(time);
			$scope.currentFilter.time = time;
			$scope.dataContainerTwo = []; // empty out dataContainerTwo

			if (time === 'day') {
				var timeAmount = Date.now() - 86400000;
			} else if (time === 'week') {
				var timeAmount = Date.now() - 604800000;
			} else if (time === 'month') {
				var timeAmount = Date.now() - 2.62974e9;
			}

			for (prop in $scope.dataContainer) {
				var obj = $scope.dataContainer;
				var dateOfProp = obj[prop].date.valueOf();
				if (dateOfProp > timeAmount) {
					$scope.dataContainerTwo.push(obj[prop])
				}
			}
			console.log($scope.dataContainerTwo)

		}

		

		// console.log("ms right now " + Date.now())
		// var yesterdayInMs = Date.now() - 86400000;
		// for (prop in $scope.dataContainer) {
		// 	var obj = $scope.dataContainer;
		// 	var dateOfProp = obj[prop].date.valueOf();
		// 	if (dateOfProp < yesterdayInMs) {
		// 		$scope.dataContainerTwo.push(obj[prop])
		// 	}
		// }
		// console.log($scope.dataContainerTwo)
	}])