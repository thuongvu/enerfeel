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
					} else if ($window.innerWidth <= 970) {
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

					// sleep scale for exercise!
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
					.ticks(10)

					// y axis
				 yAxis = d3.svg.axis()
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
					// 	.attr("transform", "translate(" + x + "," + y + ")" + "rotate(-90)")

				svg.selectAll(".x.axis").selectAll("text")
					.attr("transform", "rotate(-45)translate(-20, 0)")

					// y axis
				svg.append("g")
					.attr("class", "y axis")
					.attr("transform", "translate(" + padding + ",-10)")                  
					.call(yAxis)
				 .append("text")
				 	.text("Energy Level")
				 	.attr("x", width / 2)
				 	.attr("y", height / 2)
				 	// .attr("transform", "rotate(-90 "+ (width / 3.69) + "," + (width / 1.7) + ")")
				 	.attr("transform", function() {
				 		if (width > 500) {
				 			return "rotate(-90 "+ (width / 3.69) + "," + (width / 1.7) + ")"
				 		} else if (width > 340){
				 			return "rotate(-90 "+ (width / 3.9) + "," + (width / 1.7) + ")"
				 		} else {
				 			return "rotate(-90 "+ (width / 4.2) + "," + (width / 1.7) + ")"
				 		}
				 	})
				 	console.log(width);
				 	// .attr("transform", "rotate(-90 "+ (width / 3.49) +"," + (width / 1.66) + ")")
				 	// .attr("transform", "rotate(-90 172,380)")
				// LINE

				 line = d3.svg.line()
					.x(function (d) {
						return x(d.date);
					})
					.y(function (d) {
						return y(d.energylevel) 
					})
						
				// PATH

				 path = svg.append("g")
					.attr("class", "linepath")
					.append("path");

				path
					// .attr("class", "linepath")
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

				 path2 = svg.append("g")
					.attr("class", "line-category")
					.append("path");

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
					// console.log(graphData);
					// console.log(category);

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
							if (d.category !== 'exercise') {
								return sizeScale(d.size);
							} else {
								return exerciseScale(d.size);
							}
						})
						.attr("fill", function(d,i) {
							return colorScale(d.category);
						})
						.attr("opacity", function(d) {
							return opacityScale(d.opacity)
						})
						// .style("cursor", "pointer");

					var formatHoverDate = d3.time.format("%a %b %e %I:%M:%S %p");
					var showToolTipOnClick = false;

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

							if (!showToolTipOnClick) {
								div.transition()
									.duration(250)
									.style("opacity", 0)
							}

						})
						.on("click", function(d) {
							scope.select = d;
							showToolTipOnClick = !showToolTipOnClick;
							if (showToolTipOnClick) {
								div.transition()
									.duration(250)
									.style("opacity", 1)
								div .html(formatHoverDate(d.date) + "<br>" + d.note + "<br>" + d.category)
									.style("left", (d3.event.pageX) + "px")
									.style("top", (d3.event.pageY - 28) + "px")
							} else {
								div.transition()
									.duration(250)
									.style("opacity", 0)
							}
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

						// circle exit (not needed now, but maybe in the future)
					circles.exit().remove();


				}

			}
		}
	}])