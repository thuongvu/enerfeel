angular.module('app', ['ngRoute', 'ui.bootstrap.dropdown', 'ngCookies', 'ngRoute', 'd3', 'ngQuickDate', 'app.services', 'app.graphDirective', 'app.directives', 'app.controllers' ])
	.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/notLoggedIn.html',
				controller: 'mainCtrl'
			})
			.when('/view/main', {
				templateUrl: 'partials/main.html',
				controller: 'mainCtrl'
			})
			.when('/view/graph', {
				templateUrl: 'partials/graph.html',
				controller: 'mainCtrl'
			})
			.when('/view/log', {
				templateUrl: 'partials/log.html',
				controller: 'mainCtrl'
			})
	});