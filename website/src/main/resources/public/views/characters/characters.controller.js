(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('CharactersController', CharactersController);
	
	
	/** @ngInject */
	function CharactersController($http, $scope) {
		$scope.characters = [];

		// pick up all available stories
		$http.get('php/services/getCharacters.php').then(function(response) {
			console.log(response);
			$scope.characters = response.data;
		});
					
	}
})();
