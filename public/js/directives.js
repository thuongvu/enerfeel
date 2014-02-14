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
				var width = 800,
					 height = 400,
					 padding = 50;

				var svg = d3.select(iElement[0])
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("class", "chart")

				// SCALES

				// x scale
				var x = d3.time.scale()
					.domain(d3.extent(graphData, function (d) {
						return d.date;
					}))
					.range([padding, width - padding])

				// y scale
				var y = d3.scale.linear()
					.domain([0, d3.max(graphData, function (d) {
						return d.energylevel;
					})])
					.range([height - padding - 10, padding - 10]) 

				// INITIALIZING AXES

				// x axis
				var xAxis = d3.svg.axis()
					.scale(x)
				   .orient("bottom")
					.ticks(10)
				// y axis
				var yAxis = d3.svg.axis()
					.scale(y)
				   .orient("left")
					.ticks(10)

				// LINE
				var line = d3.svg.line()
					.x(function (d) {
						return x(d.date);
					})
					.y(function (d) {
						return y(d.energylevel) 
					})

				// SVG INNER DIMENSION
				var svg = d3.select("body").append("svg") //svg needs to be a global var
					.attr("width", width)
					.attr("height", height)
				  		// .append("g") // unneeded g?

					// APPENDING + CALLING AXES

					// x axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height - padding - 10) + ")")
					.call(xAxis)
				 .append("text") 
						.text("Date")
						.attr("x", width / 2)
						.attr("y", 50)

					// y axis
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + padding + ",-10)")                  
					.call(yAxis)
						
				// PATH
				var path = svg.append("g") //path needs to be a global var
					.append("path")
					.datum(graphData)
					.attr("d", line)
					.attr("class", "line")

				path.on("mouseover", function(d) {
					console.log("mouseover!")
					d3.select(this)
						.attr("class", "line_hover")
				})

				path.on("mouseout", function(d) {
					console.log("mouseout!")
					d3.select(this)
						.attr("class", "line")
				})

			scope.$watch('data', updateGraph, true);

				function updateGraph() {
					var graphData = scope.data;
					console.log(graphData);

					// REDEFINING SCALES

					// x scale
					var x = d3.time.scale()
						.domain(d3.extent(graphData, function (d) {
							return d.date;
						}))
						.range([padding, width - padding])

					 // y scale
				 	var y = d3.scale.linear()
						.domain([0, d3.max(graphData, function (d) {
					 		return d.energylevel;
					 	})])
					 	.range([height - padding - 10, padding - 10]) 

					// REDEFINING AXES

						// x axis
					var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom")
						.ticks(5)

						 // y axis
					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left")
						.ticks(5)

					// REDEFINING LINE
					var line = d3.svg.line()
						.x(function (d) {
							return x(d.date);
						})
						.y(function (d) {
							return y(d.energylevel) 
						})

					// AXES TRANSITION

						// x axis + calling
					svg.select(".x.axis").transition()
						.duration(150)
						.call(xAxis)

						// y axis + calling			
					svg.select(".y.axis").transition()
						.duration(150)
						.call(yAxis)

					// PATH TRANSITION
					
					path.attr("d", line)
						 .attr("transform", null)
					 .transition()
						.duration(750)
						.ease("linear")
				}

			}
		}
	}])