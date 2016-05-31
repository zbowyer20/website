angular.module('app', ['ngRoute'])
	.config(function($routeProvider, $httpProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'home',
			controllerAs: 'controller'
		}).when('/viewblog', {
			templateUrl: 'viewblog.html',
			controller: 'viewblog',
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
	.controller('viewblog', function($http, $scope) {
		$http.get('api/v1').then(function(response) {
			$scope.blogs = response.data;
		});
		
		$scope.deleteBlog = function(blog) {
			$http.delete('api/v1/' + blog.id).success(function(data, status) {
				console.log('done delete');
			})
		}
		
		$scope.blogpost = {};
		
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
	});