(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('DeveloperController', DeveloperController);
	
	
	/** @ngInject */
	function DeveloperController($scope, $timeout, $http) {
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
			email: "zak@zakbowyer.com",
			level: {
				current: $scope.getDifferenceIn($scope.TIME_PERIODS.YEARS, new Date(), $scope.DATE_OF_BIRTH),
			},
			comment: "// Junior developer looking for extra experience"
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
		    	date: new Date("03-01-1993"),
		    	fileName: "birth.html"
		    },
		    {
		    	tag: "Secondary school",
		    	date: new Date("09-07-2004"),
		    	fileName: "shsb.html"
		    },
		    {
		    	tag: "University of Kent",
		    	date: new Date("09-07-2011"),
		    	fileName: "uni.html"
		    },
		    {
		    	tag: "Likely",
		    	date: new Date("09-07-2012"),
		    	fileName: "likely.html"
		    },
		    {
		    	tag: "RELEASE",
		    	date: new Date("09-07-2013"),
		    	fileName: "release.html"
		    },
		    {
		    	tag: "Marks & Spencer",
		    	date: new Date("09-07-2014"),
		    	fileName: "mns.html"
		    }
		];
		$scope.content = "";
		
		$scope.getSkillWidth = function(level) {
			return loaded ? level + '%' : 0;
		}
		
		$scope.getHistoryPosition = function(date, right) {
			return (((date - $scope.DATE_OF_BIRTH) / (new Date() - $scope.DATE_OF_BIRTH)) * 100) + "%";
		}
		
		$scope.populateHistory = function(period) {
			$http.get('html/experience/' + period.fileName).then(function(response) {
				$scope.content = response.data;
			});
		}
		
		$scope.clearHistory = function() {
			$scope.content = "";
		}
		
		function init() {
			$scope.me.level.progress = $scope.getDifferenceIn($scope.TIME_PERIODS.DAYS, new Date(), new Date("03-01-" + ($scope.me.level.current + 1993))) / 3.65;
			$timeout( function() {
				loaded = true;
			}, 600)
		}
		
		init();
	}
})();
