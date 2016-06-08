angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate'])
	.config(function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'home',
			controllerAs: 'controller'
		}).when('/viewblog', {
			templateUrl: 'viewblog.html',
			controller: 'viewblog',
			controllerAs: 'controller'
		}).when('/addblog', {
			templateUrl: 'addblog.html',
			controller: 'addblog',
			controllerAs: 'controller'
		}).when('/addstory', {
			templateUrl: 'addStory.html',
			controller: 'addstory',
			controllerAs: 'controller'
		}).when('/viewstory', {
			templateUrl: 'viewStory.html',
			controller: 'viewstory',
			controllerAs: 'controller'
		}).otherwise('/');
		
		$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
	})
	.controller('home', function($http) {
		var self = this;
		$http.get('/resource/').then(function(response) {
			self.greeting = response.data;
		})
	})
	.controller('addblog', function($http,$scope) {		
		$scope.addBlogPost = function() {
			var data = {
				id: "testtitle",
				title: $scope.blogpost.title,
				description: $scope.blogpost.description,
				dateCreated: new Date().getTime()
			};
			$http.post("api/v1/blogs", data).success(function(data, status) {
				console.log('done this');
			})
		}
	})
	.controller('addstory', function($http,$scope) {		
		$scope.addStory = function() {
			var data = {
				id: "testtitle",
				character: $scope.story.character,
				title: $scope.story.title,
				content: $scope.story.content,
				img: $scope.story.img,
				timeSetting: $scope.story.timeSetting
			};
			$http.post("api/story/", data).success(function(data, status) {
				console.log('done this');
			})
		}
	})
	.controller('viewblog', function($http, $scope) {
		$http.get('api/v1').then(function(response) {
			$scope.blogs = response.data;
			console.log('show content');
		});
		
		$scope.deleteBlog = function(blog) {
			$http.delete('api/v1/' + blog.id).success(function(data, status) {
				console.log('done delete');
			})
		}

		$scope.blogpost = {};
		
	})
	.controller('viewstory', function($http, $scope) {
		var startDate = new Date(2014, 0, 1);
		var endDate = new Date(2014, 2, 1);
		var totalTime = endDate - startDate;
		$scope.selected = {};
		$scope.prev = {};
		$scope.images = [];
		$scope.currentImage = null;
		
		$http.get('api/story').then(function(response) {
			$scope.stories = response.data;
		});
		
		$scope.showContent = function(content) {
			$scope.selected = content;
			$scope.currentImage = $scope.currentImage === 0 ? 1 : 0;
			$scope.images[$scope.currentImage] = content.img;
			$(".image__story").on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
				$scope.prev = $scope.selected;
			});
		}
		
		$scope.isSelected = function(title) {
			return $scope.selected.title == title;
		}
				
		$scope.getDateProportion = function(dateStr) {
			if (dateStr === null) return 0;
			var date = new Date(dateStr);
			return (((date - startDate) / totalTime) * 100) + "%";
		}
		
		$scope.isPassed = function(dateStr) {
			if ($scope.selected === null) return false;
			var date = new Date(dateStr);
			return new Date($scope.selected.timeSetting) > date;
		}
	});