(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('CharactersController', CharactersController);
	
	
	/** @ngInject */
	function CharactersController($http, $scope) {
		$scope.characters = [];
		$scope.selected = null;
		
		// pick up all available stories
		$http.get('php/services/getCharacters.php').then(function(response) {
			console.log(response);
			$scope.characters = response.data;
		});
		
		$scope.showCharacter = function(character) {
			$scope.selected = character;
			console.log("Show character");
			if (typeof (character.content) == "undefined") {
				console.log("undefined");
				$http.get(character.fileName).then(function(response) {
					console.log(response);
					$scope.selected.content = response.data;
				});
			}
		}
					
	}
})();
