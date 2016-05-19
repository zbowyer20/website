angular.module('app', ['ngRoute'])
	.config(function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'home',
			controllerAs: 'controller'
		}).when('/blog', {
			templateUrl: 'blog.html',
			controller: 'blog',
			controllerAs: 'controller'
		}).otherwise('/');
		
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	})
	.controller('home', function($http) {
		var self = this;
		$http.get('/resource/').then(function(response) {
			console.log(response);
			self.greeting = response.data;
		})
	})
	.controller('blog', function($location) {
		$location.path("/blog");
	});