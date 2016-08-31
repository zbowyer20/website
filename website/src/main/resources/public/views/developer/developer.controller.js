(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('DeveloperController', DeveloperController);
	
	
	/** @ngInject */
	function DeveloperController($scope, $timeout) {
		$scope.DATE_OF_BIRTH = new Date("03-01-1993");
		$scope.TIME_PERIODS = {
			DAYS: 0,
			YEARS: 1
		}
		var loaded = false;
		
		$scope.getDifferenceIn = function(period, date1, date2) {
			var difference = date1 - date2;
			var days = difference / (1000 * 3600 * 24);
			if (period === $scope.TIME_PERIODS.DAYS) return Math.floor(days);
			if (period === $scope.TIME_PERIODS.YEARS) return Math.floor(days / 365.25);
		}
		
		$scope.me = {
			name: "Zak Bowyer",
			img: "images/developer/zak.png",
			location: "London, UK",
			level: $scope.getDifferenceIn($scope.TIME_PERIODS.YEARS, new Date(), $scope.DATE_OF_BIRTH),
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
		];
		$scope.history = [
		    {
		    	tag: "General crawling around",
		    	start: new Date("03-01-1993"),
		    	end: new Date("09-07-1998"),
		    	colour: "#123456"
		    },
		    {
		    	tag: "Primary school",
		    	start: new Date("09-07-1998"),
		    	end: new Date("09-07-2004"),
		    	colour: "#A56141"
		    },
		    {
		    	tag: "Secondary school",
		    	start: new Date("09-07-2004"),
		    	end: new Date("09-07-2011"),
		    	colour: "#005349"
		    },
		    {
		    	tag: "University of Kent",
		    	start: new Date("09-07-2011"),
		    	end: new Date("09-07-2014"),
		    	colour: "#013986"
		    },
		    {
		    	tag: "Marks & Spencer",
		    	start: new Date("09-07-2014"),
		    	end: new Date(),
		    	colour: "#C5D654"
		    }
		];
		$scope.selected = {
			tag: "Marks & Spencer",
			text: "views/developer/history/marks.html"
		}
		
		$scope.getSkillWidth = function(level) {
			return loaded ? level + '%' : 0;
		}
		
		$scope.getHistoryPosition = function(date, right) {
			var pos = (((date - $scope.DATE_OF_BIRTH) / (new Date() - $scope.DATE_OF_BIRTH)) * 100);
			return right ? 100 - pos + "%" : pos + "%";
		}
		
		$timeout( function() {
			loaded = true;
		}, 600)
		
	}
})();
