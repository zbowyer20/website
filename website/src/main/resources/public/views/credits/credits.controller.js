(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('CreditsController', CreditsController);
	
	
	/** @ngInject */
	function CreditsController($http, $scope) {
		$scope.credits = [];

		// pick up all available stories
		$http.get('php/services/getCredits.php').then(function(response) {
			$scope.credits = response.data;
		});
					
	}
})();
