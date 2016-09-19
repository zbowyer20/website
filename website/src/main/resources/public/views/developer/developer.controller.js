(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('DeveloperController', DeveloperController);
	
	
	/** @ngInject */
	function DeveloperController($scope, $timeout, $http) {
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
			dob: new Date("03-01-1993"),
			comment: "// Junior developer looking for extra experience"
		};
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
		    	fileName: "mns.html",
		    	initial: true
		    }
		];
		$scope.future = [
		    {
		    	name: "NodeJS",
		    	img: "images/developer/nodejs.png"
		    },
		    {
		    	name: "MongoDB",
		    	img: "images/developer/mongodb.png"
		    },
		    {
		    	name: "ReactJS",
		    	img: "images/developer/react.png"
		    },
		    {
		    	name: "Spring Security",
		    	img: "images/developer/springsecurity.png"
		    },
		    {
		    	name: "Docker",
		    	img: "images/developer/docker.svg"
		    },
		    {
		    	name: "Angular 2.0",
		    	img: "images/developer/angular.png"
		    },
		    {
		    	name: "Scala",
		    	img: "images/developer/scala.png"
		    }
		];
		$scope.content = "";
		$scope.active = {
			history: {}
		};
		
		$scope.getSkillWidth = function(level) {
			return loaded ? level + '%' : 0;
		}
		
		$scope.getHistoryPosition = function(date, right) {
			return (((date - $scope.me.dob) / (new Date() - $scope.me.dob)) * 100) + "%";
		}
		
		function populateHistory(fileName) {
			$http.get('html/experience/' + fileName).then(function(response) {
				$scope.content = response.data;
			});
		}
		
		$scope.setActiveHistory = function(tag) {
			var history = $scope.history.filter(function(obj) {
				return obj.tag == tag;
			});
			$scope.active.history = history[0];
			populateHistory($scope.active.history.fileName);
		}
		
		function init() {
			$timeout( function() {
				loaded = true;
			}, 600)
			$scope.setActiveHistory("Marks & Spencer")
		}
		
		init();
	}
})();
