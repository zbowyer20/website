angular.module('app', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'ngSanitize'])
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
				fileName: $scope.story.fileName,
				character: $scope.story.character,
				title: $scope.story.title,
				//content: $scope.story.content,
				content: "",
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
		});
		
		$scope.deleteBlog = function(blog) {
			$http.delete('api/v1/' + blog.id).success(function(data, status) {
				console.log('done delete');
			})
		}

		$scope.blogpost = {};
		
	})
	.controller('viewstory', function($http, $scope) {
		var dates = {};
		$scope.selected = {};
		$scope.content = "";
		$scope.prev = {};
		$scope.images = {
				current: null,
				container: []
		}
		
		$http.get('api/story').then(function(response) {
			$scope.stories = response.data;
			$scope.init();
			$scope.showContent($scope.getStoryByFileName("victoria-1"));
		});
		
		function setDates() {
			dates.end = new Date($scope.stories[0].timeSetting);
			dates.start = new Date($scope.stories[$scope.stories.length - 1].timeSetting);
			dates.time = new Date(dates.end - dates.start);
		}
		
		$scope.init = function() {
			$scope.refresh();
			for (var i = 0; i < $scope.stories.length; i++) {
				$scope.stories[i].roundel = {};
			}
			setDates();
		}
		
		$scope.refresh = function() {
			$scope.content = "";
			for (var i = 0; i < $scope.stories.length; i++) {
				$scope.stories[i].scrollPositions = {};
			}
		}
		
		$scope.showContent = function(content, refresh) {
			if (refresh) {
				$scope.refresh();
				// TODO update angularly
				$(".article__content").scrollTop(0);
			}
			$scope.loadContent(content);
			$scope.selected = content;
			$scope.selected.x = $scope.setRoundelLocations(content);
			$scope.selected.visible = true;
			$scope.images.current = $scope.images.current === 0 ? 1 : 0;
			$scope.images.container[$scope.images.current] = content.img;
			$(".image__story").on("webkitAnimationEnd oanimationend msAnimationEnd animationend", function() {
				$scope.prev = $scope.selected;
			});
		}
		
		$scope.loadContent = function(story) {
			if (story.content == "") {
				$http.get('api/story/' + story.fileName).then(function(response) {
					story.content = response.data.story;
					$scope.content += story.content;
				})
			}
			else {
				$scope.content += story.content;
			}
		}
		
		$scope.isSelected = function(title) {
			return $scope.selected.title == title;
		}
				
		$scope.getDateProportion = function(dateStr) {
			if (dateStr === null) return 0;
			var date = new Date(dateStr);
			return (((date - dates.start) / dates.time) * 100);
		}
		
		$scope.getDateProportionPercentage = function(dateStr) {
			return $scope.getDateProportion(dateStr) + "%";
		}
		
		$scope.setRoundelLocations = function(story) {
			if (story.roundel.x == null) {
				story.roundel.x = $scope.getDateProportion(story.timeSetting);
			}
			reposition();
		}
		
		function reposition() {
			var stories = [];
			for (var i = 0; i < $scope.stories.length; i++) {
				if ($scope.stories[i].roundel.x != null) {
					if (stories.length == 0) {
						stories[0] = $scope.stories[i];
					}
					else {
						var inserted = false;
						var j = 0;
						while (!inserted && j < stories.length) {
							if (stories[j].roundel.x < $scope.stories[i].roundel.x) {
								stories.splice(j + 1, 0, $scope.stories[i]);
								inserted = true;
							}
							j++;
						}
						if (!inserted) {
							stories[j] = $scope.stories[i];
						}
					}
				}
			}
			repositionStories(stories);
		}
		
		function repositionStories(stories) {
			var repositioned = false;
			for (var i = 0; i < stories.length - 1; i++) {
				var distance = stories[i].roundel.x - stories[i+1].roundel.x;
				if (distance < 2) {
					stories[i].roundel.x += 2 - distance;
					repositioned = true;
				}
			}
			if (repositioned) repositionStories(stories);
		}
		
		$scope.isPassed = function(dateStr) {
			var date = new Date(dateStr);
			return new Date($scope.selected.timeSetting) > date;
		}
		
		$scope.getStoryByFileName = function(fileName) {
			for (var i = 0; i < $scope.stories.length; i++) {
				if ($scope.stories[i].fileName == fileName) return $scope.stories[i];
			}
		}
		
		$scope.getNext = function() {
			var story = $scope.selected.scrollNext == null ? $scope.getStoryByFileName($scope.selected.next) : $scope.selected.scrollNext;
			story.scrollPrev = $scope.selected;
			$scope.showContent(story);
		}
		
		$scope.getLast = function() {
			$scope.showContent($scope.selected.scrollPrev);
		}
		
	})
	.directive('scrolly', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var raw = element[0];
				scope.selected.scrollPositions = {
						start: 0
				};
				element.bind("scroll", function() {
					scope.selected.scrollPositions = {
							start: scope.selected.scrollPositions.start == null ? 0 : scope.selected.scrollPositions.start,
							end: scope.selected.scrollPositions.end == null ? raw.scrollHeight : scope.selected.scrollPositions.end
					}
					var currentPosition = raw.scrollTop + raw.offsetHeight;
					if (currentPosition < scope.selected.scrollPositions.start) {
						scope.$apply(attrs.last);
					}
					else if (currentPosition >= scope.selected.scrollPositions.end){
						scope.$apply(attrs.scrolly);
						scope.selected.scrollPositions = {
								start: currentPosition,
								end: raw.scrollEnd
						}
					}
				});
			}
		}
	});