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
			if (character.fileName != "" && typeof (character.content) == "undefined") {
				$http.get(character.fileName).then(function(response) {
					$scope.selected.content = response.data;
				});
			}
		}
		
		$scope.closeCharacter = function() {
			$scope.selected = null;
		}
		
		$scope.stripGroup = function(str) {
			return str.replace(/[\s:]/g, "");
		}
		
		$scope.getLeft = function(index, group) {
			return "calc(" + (50 - (group.length / 8) * 50) + "% + " + (75 * index) + "px)";
		}
					
	}
})();
