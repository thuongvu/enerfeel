angular.module('app.graphDirective', [])
	.directive('graph', ['d3', '$window', function (d3, $window) {
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
				var graphData = scope.data;
				var category = scope.category;

			// scale graph based on $window dimensions
				var width, height, padding;

				var paddingScale = d3.scale.linear()
					.domain([320, 2000])
					.range([30, 80]);

				var widthScale = d3.scale.linear()
					.domain([320, 3000])
					.range([300, 1920]);

				function defineGraphDimensions() {
					width = Math.round($window.innerWidth / 1.7756232687);
					height = Math.round($window.innerWidth / 3.205);

					if ($window.innerWidth <= 400) {
						width = Math.round($window.innerWidth / 1.1);
						height = Math.round($window.innerWidth / 2);
					} else if ($window.innerWidth <= 992) {
						width = Math.round($window.innerWidth / 1.05);
						height = Math.round($window.innerWidth / 1.9);
					}
					padding = paddingScale($window.innerWidth);

				};
				defineGraphDimensions();
				
				angular.element($window).bind('resize', function() {
					defineGraphDimensions();
					removeSvgMakeNew();
				});

				function removeSvgMakeNew() {
					if (svg) {
							d3.select("svg").remove();
						svg = d3.select(iElement[0])
     						.append("svg")
     						.attr("width", width)
     						.attr("height", height)
     						.attr("class", "chart");
     					createGraph();
     					updateGraph();
					};
				};

			// define svg and add it to the DOM
				var svg = d3.select(iElement[0])
					.append("svg")
					.attr("width", width)
					.attr("height", height)
					.attr("class", "chart")

		var x, y, opacityScale, exerciseScale, sleepScale, xAxis, yAxis, line, path, div, colorScale;
		function createGraph() {
				// SCALES

					// x scale
				x = d3.time.scale()
					.domain(d3.extent(graphData, function (d) {
						return d.date;
					}))
					.range([padding, width - padding]);

					// y scale
				y = d3.scale.linear()
					.domain([0, d3.max(graphData, function (d) {
						return d.energylevel;
					})])
					.range([height - padding - 10, padding - 10]);

					// opacity scale
				opacityScale = d3.scale.linear()
					.domain([0,5])
					.range([.1,.9]);

					// size scale
				sizeScale = d3.scale.linear()
					.domain([0,5])
					.range([6,13]);

					// size scale for exercise!
				exerciseScale = d3.scale.linear()
					.domain([0, d3.max(graphData, function (d) {
						if (d.category === 'exercise') {
							return d.size;
						}
					})])
					.range([6,13]);

					// sleep scale for sleep!
				sleepScale = d3.scale.linear()
					.domain([0, d3.max(graphData, function (d) {
						if (d.category === 'sleep') {
							return d.size;
						}
					})])
					.range([6,13]);

				// INITIALIZING AXES

					// x axis
				xAxis = d3.svg.axis()
					.scale(x)
				   .orient("bottom")
					.ticks(10);

					// y axis
				yAxis = d3.svg.axis()
					.scale(y)
				   .orient("left")
					.ticks(10);

				// APPENDING + CALLING AXES

					// x axis
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + (height - padding - 10) + ")")
					.call(xAxis);

				svg.selectAll(".x.axis").selectAll("text")
					.attr("transform", "rotate(-45)translate(-20, 0)");

					// y axis
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + padding + ",-10)")                  
					.call(yAxis)
				 .append("text")
				 	.text("Energy Level")
				 	.attr("x", width / 2)
				 	.attr("y", height / 2)
				 	.attr("transform", function() {
				 		if (width > 500) {
				 			return "rotate(-90 "+ (width / 3.69) + "," + (width / 1.7) + ")"
				 		} else if (width > 340){
				 			return "rotate(-90 "+ (width / 3.9) + "," + (width / 1.7) + ")"
				 		} else {
				 			return "rotate(-90 "+ (width / 4.2) + "," + (width / 1.7) + ")"
				 		}
				 	});

				// LINE

				line = d3.svg.line()
					.x(function (d) {
						return x(d.date);
					})
					.y(function (d) {
						return y(d.energylevel) 
					});
						
				// PATH

				path = svg.append("g")
					.attr("class", "linepath")
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
					});

				// TOOLTIP	

				div = d3.select("body").append("div")
					.attr("class", "tooltip")
					.style("opacity", 0);

				// COLORSCALE

				colorScale = d3.scale.category10()

		};

		createGraph();

		scope.$watch('data', updateGraph, true);
		scope.$watch('category', updateGraph, true);

// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------
				function updateGraph() {
					var graphData = scope.data;
					var category = scope.category;

					// REDEFINING SCALES

						// x scale
					var x = d3.time.scale()
						.domain(d3.extent(graphData, function (d) {
							return d.date;
						}))
						.range([padding, width - padding]);

						 // y scale
				 	var y = d3.scale.linear()
						.domain([0, d3.max(graphData, function (d) {
					 		return d.energylevel;
					 	})])
					 	.range([height - padding - 10, padding - 10]);

					 var sizeScale = d3.scale.linear()
					 	.domain([0,5])
					 	.range([6,13]);

					 	// size scale for exercise!
					 var exerciseScale = d3.scale.linear()
					 	.domain([0, d3.max(graphData, function (d) {
					 		if (d.category === 'exercise') {
					 			return d.size;
					 		}
					 	})])
					 	.range([6,13]);

					 var sleepScale = d3.scale.linear()
					 	.domain([0, d3.max(graphData, function (d) {
					 		if (d.category === 'sleep') {
					 			return d.size;
					 		}
					 	})])
					 	.range([6,13]);

					// REDEFINING AXES

						// x axis
					var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom")
						.ticks(10);

						 // y axis
					var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left")
						.ticks(5);

					// REDEFINING LINE
					var line = d3.svg.line()
						.x(function (d) {
							return x(d.date);
						})
						.y(function (d) {
							return y(d.energylevel) 
						});

					// AXES TRANSITION

						// x axis + calling
					svg.select(".x.axis").transition()
						.duration(500)
						.call(xAxis);

					svg.selectAll(".x.axis").selectAll("text")
						.attr("transform", "rotate(-45)translate(-20, 0)");


						// y axis + calling			
					svg.select(".y.axis").transition()
						.duration(500)
						.call(yAxis);

					//PATH TRANSITION
					
					path
						.datum(graphData)
						 .transition()
							.duration(750)
							.ease("linear")
						 .attr("d", line)
						 .attr("transform", null);			

					// CIRCLE

															// ************
															// SPECIAL NOTE:
															// CANNOT USE G GROUP FOR CIRCLES otherwise stuff breaks.
															// ************
						// define circles
					var circles = svg.selectAll(".circles").data(graphData);

						// enter circle + tooltips
					circles.enter().append("svg:circle")
						.attr("class", "circles")
						 .transition()
							.duration(750)
							.ease("linear")
						.attr("cx", function(d) {
							return x(d.date);
						})
						.attr("cy", function(d) {
							return y(d.energylevel)
						})
						.attr("r", function(d) {
							// if (d.category !== 'exercise') {
							// 	return sizeScale(d.size);
							// } else {
							// 	return exerciseScale(d.size);
							// }
							if (d.category == 'exercise') {
								return exerciseScale(d.size);
							} else if (d.category == 'sleep') {
								return sleepScale(d.size);
							} else {
								return sizeScale(d.size);
							}
						})
						.attr("fill", function(d,i) {
							return colorScale(d.category);
						})
						.attr("opacity", function(d) {
							return opacityScale(d.opacity)
						});

					var formatHoverDate = d3.time.format("%a %b %e %I:%M:%S %p");

					circles
						.on("mouseover", function(d) {
							d3.select(this)
								.attr("opacity", 1);

							showToolTipOnClick = false;
							div.transition()
								.duration(250)
								.style("opacity", 1)
							div .html(formatHoverDate(d.date) + "<br>" + d.note + "<br>" + d.category)
								.style("left", (d3.event.pageX) + "px")
								.style("top", (d3.event.pageY - 28) + "px")
						})
						.on("mouseleave", function(d) {
							d3.select(this)
								.attr("opacity", function(d) {
									return opacityScale(d.opacity);
								});
							div.transition()
								.duration(250)
								.style("opacity", 0);
						})
						.on("click", function(d) {
							scope.select = d;
						});


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
						.attr("r", function(d) {
							if (d.category === 'exercise') {
								return exerciseScale(d.size);
							} else if (d.category === 'sleep') {
								return sleepScale(d.size);
							} else {
								return sizeScale(d.size);
							}
						})
						.attr("opacity", function(d) {
							return opacityScale(d.opacity)
						})
						.style("cursor", "pointer");

					circles.exit().remove();


				}

			}
		}
	}]);