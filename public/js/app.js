angular.module('app', ['ui.slider', 'ngRoute', 'ui.bootstrap.dropdown', 'ngCookies', 'ngRoute', 'd3', 'ngQuickDate', 'app.services', 'app.graphDirective', 'app.directives', 'app.controllers' ])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/notLoggedIn.ejs'
				// , controller: 'mainCtrl'
			})
			.when('/view/main', {
				templateUrl: 'partials/main.ejs'
				// , controller: 'mainCtrl'
			})
			.when('/view/graph', {
				templateUrl: 'partials/graph.ejs'
				// , controller: 'mainCtrl'
			})
			.when('/view/log', {
				templateUrl: 'partials/log.ejs'
				// , controller: 'mainCtrl'
			})
	});