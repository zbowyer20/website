(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('DeveloperController', DeveloperController);
	
	
	/** @ngInject */
	function DeveloperController($scope, $timeout) {
		var DATE_OF_BIRTH = new Date("03-01-1993");
		var TIME_PERIODS = {
			DAYS: 0,
			YEARS: 1
		}
		var loaded = false;
		
		$scope.me = {
			name: "Zak Bowyer",
			img: "images/developer/zak.png",
			location: "London, UK",
			level: getDifferenceIn(TIME_PERIODS.YEARS, new Date(), DATE_OF_BIRTH),
			hp: {
				current: 250,
				max: 250
			},
			mp: {
				current: 10,
				max: 10
			}
		}
		$scope.skills = [
		    {
		    	name: "HTML5",
		    	level: 80
		    },
		    {
		    	name: "SCSS",
		    	level: 75
		    },
		    {
		    	name: "AngularJS",
		    	level: 45
		    },
		    {
		    	name: "JavaScript",
		    	level: 60
		    },
		    {
		    	name: "Java",
		    	level: 75
		    },
		    {
		    	name: "Spring",
		    	level: 50
		    },
		    {
		    	name: "Git",
		    	level: 75
		    },
		    {
		    	name: "Humour",
		    	level: 5
		    }
		]
		
		function getDifferenceIn(period, date1, date2) {
			var difference = date1 - date2;
			var days = difference / (1000 * 3600 * 24);
			if (period === TIME_PERIODS.DAYS) return Math.floor(days);
			if (period === TIME_PERIODS.YEARS) return Math.floor(days / 365.25);
		}
		
		$scope.getSkillWidth = function(level) {
			return loaded ? level + '%' : 0;
		}
		
		$timeout( function() {
			loaded = true;
		}, 600)
		
	}
})();
