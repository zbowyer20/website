(function() {
	'use strict';
	
	angular
			.module('bowyerville')
			.config(routerConfig);
	
	/** @ngInject */
	function routerConfig($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/home/home.html',
			controller: 'HomeController',
			controllerAs: 'controller'
		}).when('/addstory', {
			templateUrl: 'views/addStory.html',
			controller: 'addstory',
			controllerAs: 'controller'
		}).when('/viewstory', {
			templateUrl: 'views/viewstory/viewStory.html',
			controller: 'ViewStoryController',
			controllerAs: 'controller'
		}).when('/characters', {
			templateUrl: 'views/characters/characters.html',
			controller: 'CharactersController',
			controllerAs: 'controller'
		}).when('/credits', {
			templateUrl: 'views/credits/credits.html',
			controller: 'CreditsController',
			controllerAs: 'controller'
		}).otherwise('/');
			
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	}
})();