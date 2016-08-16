(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('CharactersController', CharactersController);
	
	
	/** @ngInject */
	function CharactersController($http, $scope, $cookieStore) {
		var viewedStories = $cookieStore.get("viewedStories");
		$scope.characters = [];
		$scope.selected = null;
		$scope.footer = [
		    {
		        href: "#/",
		        text: "HOME"
		    },
		    {
		     	href: "#/runningwater",
		     	text: "STORY"
		    }
		];
		
		// pick up all available stories
		$http.get('php/services/getResults.php?type=characters').then(function(response) {
			console.log(response);
			$scope.characters = response.data;
		});
		
		function isInCookie(name) {
			return viewedStories.indexOf(name) > -1;
		}
		
		$scope.displayCharacter = function(character) {
			return character.requiresBlackout == null || isInCookie(character.requiresBlackout);
		}
		
		$scope.getCharacterImage = function(character) {
			if (character.requiresFull == null || isInCookie(character.requiresFull)) {
				return character.img;
			}
			else if (character.requiresBlackout == null || isInCookie(character.requiresBlackout)) {
				return character.imgBlackout;
			}
		}
		
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
