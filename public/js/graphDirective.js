angular.module('app.graphDirective', [])
	.directive('graph', ['d3', function (d3) {
		return {
			restrict: 'EA',
			scope: {
				data: '=',
				category: '=',
				select: '='
			},
			controller: function ($scope) {
			},
			link: function (scope, iElement, iAttrs) {
				// set graphData to be the data linked on the 'data' attr of the directive
				var graphData = scope.data;
				var category = scope.category;
				// var select = scope.select;
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

				// APPENDING + CALLING AXES

					// x axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height - padding - 10) + ")")
					.call(xAxis)
				 // .append("text") 
					// 	.text("Date")
					// 	.attr("x", width / 2)
					// 	.attr("y", 50)
						// .attr("transform", "translate(" + x + "," + y + ")" + "rotate(-90)")

				svg.selectAll(".x.axis").selectAll("text")
					.attr("transform", "rotate(-45)translate(-20, 0)")

					// y axis
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + padding + ",-10)")                  
					.call(yAxis)

				// LINE

				var line = d3.svg.line()
					.x(function (d) {
						return x(d.date);
					})
					.y(function (d) {
						return y(d.energylevel) 
					})
						
				// PATH

				var path = svg.append("g")
					.attr("class", "linepath") //path needs to be a global var
					.append("path");

				path
					.datum(graphData)
					.attr("d", line)
					.attr("class", "line")
					.on("mouseover", function(d) {
						d3.select(this)
							.attr("class", "line_hover")
					})
					.on("mouseout", function(d) {
						d3.select(this)
							.attr("class", "line")
					})


				// PATH 2 TEST

					// declaring path2 outside like this might cause problems
					// but i need to do it, otherwise if i put it inside the function, every time $watch is invoked
					// it makes a new one. but i'm trying to use a enter/update/exit pattern.

				var path2 = svg.append("g")
					// .attr("class", "linepath") //path needs to be a global var
					.attr("class", "line-category")
					.append("path");

				// TOOLTIP	

				var div = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0);

				// COLORSCALE

				var colorScale = d3.scale.category10()

			scope.$watch('data', updateGraph, true);
			scope.$watch('category', updateGraph, true);

				function updateGraph() {
					var graphData = scope.data;
					var category = scope.category;
					console.log(graphData);
					// console.log(category);

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
						.ticks(10)

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
						.duration(500)
						.call(xAxis)

					svg.selectAll(".x.axis").selectAll("text")
						.attr("transform", "rotate(-45)translate(-20, 0)")	


						// y axis + calling			
					svg.select(".y.axis").transition()
						.duration(500)
						.call(yAxis)

					//PATH TRANSITION
					
					path
						.datum(graphData)
						 .transition()
							.duration(750)
							.ease("linear")
						 .attr("d", line)
						 .attr("transform", null)
			

					// PATH2 TRANSITON
					if (category != 'null') {
							if (path2 == null) {
								path2 = svg.append("g")
									.attr("class", "linepath") //path needs to be a global var
									.append("path");
							}
							
						var nestedData = d3.nest()
							.key(function(d) {
								return d.category;
							})
							.entries(graphData);

						for (var i = 0; i < nestedData.length; i++) {
							if (nestedData[i].key === category) {
								var categoryData = nestedData[i];
								break;
							} 
						}

						path2
							.datum(categoryData.values)
							 .transition()
							 	// .delay(250)
								.duration(750)
								.ease("linear")
							.attr("d", line)
							.attr("class", "line-category")
							.attr("transform", null)
					} 
					else if (category === 'null'){
						console.log("remove")
						svg.selectAll(".line-category").data([]).exit().remove()
						path2 = null;
					}
					




					// CIRCLE

			// ************
			// SPECIAL NOTE:
			// CANNOT USE G GROUP FOR CIRCLES otherwise stuff breaks.
			// ************

						// define circles
					var circles = svg.selectAll(".circles").data(graphData)

						// enter circle + tooltips
					circles.enter().append("svg:circle")
						.attr("class", "circles")
						.attr("cx", function(d) {
							return x(d.date);
						})
						.attr("cy", function(d) {
							return y(d.energylevel)
						})
						.attr("r", 10)
						.attr("fill", function(d,i) {
							return colorScale(d.category);
						})
						.attr("opacity", 0.5)
						.on("mouseover", function(d) {
							div.transition()
								.duration(250)
								.style("opacity", 1)
							div .html(d.note + "<br>" + d.date)
								.style("left", (d3.event.pageX) + "px")
								.style("top", (d3.event.pageY - 28) + "px")
						})
						.on("mouseleave", function(d) {
							div.transition()
								.duration(250)
								.style("opacity", 0)
						})
						.on("click", function(d) {
							scope.select = d;
						})

						// update circle (locations)
					circles
						 .transition()
							.duration(750)
							.ease("linear")
						.attr("cx", function(d) {
							return x(d.date);
						})
						.attr("cy", function(d) {
							return y(d.energylevel)
						})
						.attr("fill", function(d,i) {
							return colorScale(d.category);
						})

						// circle exit (not needed now, but maybe in the future)
					circles.exit().remove();



				// // NESTED DATA CATEGORIES	
				// 	var nestedData = d3.nest()
				// 		.key(function(d) {
				// 			return d.category;
				// 		})
				// 		.entries(graphData);

				// 	console.log(nestedData)

				// 	var category = svg.selectAll(".category")
				// 		.data(nestedData)
				// 		.enter()
				// 		.append("g")
				// 		.attr("class", "category")

				// 	category.append("path")
				// 		.attr("class", "categoryLine")
				// 		.attr("d", function(d) {
				// 			return line(d.values)
				// 		})
				// 		.style("stroke", "#000");

				// 	category.append("text")
				// 		.datum(function(d) {
				// 			return {
				// 				key: d.key,
				// 				value: d.values[d.values.length - 1]
				// 			}
				// 		})
				// 		.attr("transform", function(d) {
				// 			return "translate(" + x(d.value.date) + "," + y(d.value.energylevel) + ")";
				// 		})
				// 		.attr("x", 3)
				// 		.attr("dy", ".35em")
				// 		.text(function(d) {
				// 			return d.key;
				// 		})

				}

			}
		}
	}])