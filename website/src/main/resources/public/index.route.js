(function() {
	'use strict';
	
	angular
			.module('bowyerville')
			.config(routerConfig);
	
	/** @ngInject */
	function routerConfig($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'home',
			controllerAs: 'controller'
		}).when('/addstory', {
			templateUrl: 'views/addStory.html',
			controller: 'addstory',
			controllerAs: 'controller'
		}).when('/viewstory', {
			templateUrl: 'views/viewstory/viewStory.html',
			controller: 'ViewStoryController',
			controllerAs: 'controller'
		}).otherwise('/');
			
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	}
})();