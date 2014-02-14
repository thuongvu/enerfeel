angular.module('app.directives', [])
	.directive('graph', ['d3', function (d3) {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			controller: function ($scope) {
			},
			link: function (scope, iElement, iAttrs) {
				// set graphData to be the data linked on the 'data' attr of the directive
				var graphData = scope.data
				// dimensions of svg
				var width = 500,
					 height = 500,
					 padding = 20;

				var svg = d3.select(iElement[0])
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("class", "chart")
				// scales for chart
				var x = d3.scale.ordinal()
					.domain(graphData.map(function (d) {
						return d.counter;
					}))
					.rangeRoundBands([0, width], .1);

				 var y = d3.scale.linear()
					.range([height, 0])
					.domain([0, d3.max(graphData, function (d) {
						return d.energylevel;
					})])
				// chart
				var chart = d3.select(".chart")
					.attr("width", width - padding)
					.attr("height", height - padding)
					.append("g")

				chart.selectAll("rect")
					.data(graphData)
					.enter().append("rect")
						.attr("x", function (d, i) {
							return i * 25
						})
						.attr("y", function (d) {
							return y(d.energylevel);
						})
						.attr("height", function (d) {
							return height - y(d.energylevel)
						})
						.attr("width", 25)
						.attr("fill", '#'+(Math.random()*0xFFFFFF<<0).toString(16)) // http://stackoverflow.com/a/5092846
				// $watch on data attr of this directive, on change, invoke updateGraph
				scope.$watch('data', updateGraph, true);

				function updateGraph() {
					// assign data to updated graphData
					var graphData = scope.data
					console.log(graphData)
					// update y domain
					// y.domain([0, d3.max(graphData, function (d) {
					// 	return d.energylevel
					// })])
					
						x.domain(graphData.map(function (d) {
							return d.counter;
						}))
						// .rangeRo	undBands([0, width], .1);
					
						y.range([height, 0])
						.domain([0, d3.max(graphData, function (d) {
							// console.log(d.energylevel)
							return d.energylevel;
						})])
		

					chart.selectAll("rect")
						.data(graphData)
						.enter().append("rect")
							.attr("x", function (d, i) {
								return i * 25
							})
							.attr("y", function (d) {
								return y(d.energylevel);
							})
							.attr("height", function (d) {
								return height - y(d.energylevel)
							})
							.attr("width", 25)
							.attr("fill", '#'+(Math.random()*0xFFFFFF<<0).toString(16)) // http://stackoverflow.com/a/5092846

					// update rect
					var rect = chart.selectAll("rect")
						.data(graphData);

					rect.transition()
						.duration(500)
						.attr("x", function (d, i) {
							return i * 25
						})
						.attr("y", function (d) {
							return y(d.energylevel);
						})
						.attr("height", function (d) {
							return height - y(d.energylevel)
						})
						.attr("width", 25)
						.attr("fill", '#'+(Math.random()*0xFFFFFF<<0).toString(16)) // http://stackoverflow.com/a/5092846
				}

			}
		}
	}])