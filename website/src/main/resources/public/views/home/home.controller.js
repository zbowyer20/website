(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('HomeController', HomeController);
	
	
	/** @ngInject */
	function HomeController($http, $scope, $cookieStore) {
		$scope.subheaders = [
		    {
		    	href: "#/developer",
		    	todo: false,
		    	text: "DEVELOPER"
		    },
		    {
		    	href: "#/writer",
		    	todo: false,
		    	text: "WRITER"
		    }
		];
		$scope.todo = "";
		var todoSubheaders = ["OLYMPIAN", "ADVENTURER", "SPACEMAN", "WIZARD", "HUNK"];
		
		function setTodo() {
			var rand = Math.floor(Math.random() * todoSubheaders.length);
			$scope.todo = todoSubheaders[rand];
		}
		
		setTodo();
	}
})();
