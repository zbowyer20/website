(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('WriterController', WriterController);
	
	
	/** @ngInject */
	function WriterController($http, $scope) {
		$scope.title = "Writer";
		
		$scope.footer = [
		    {
		     	href: "#/",
		       	text: "HOME"
		    },
		    {
		       	href: "#/developer",
		       	text: "DEVELOPER"
		    }
		];
	}
})();
