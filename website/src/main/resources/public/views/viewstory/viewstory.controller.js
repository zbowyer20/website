(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('ViewStoryController', ViewStoryController)
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
						else if (currentPosition >= scope.selected.scrollPositions.end) {
							var nextStartPosition = scope.selected.scrollPositions.end;
							scope.$apply(attrs.scrolly);
							if (scope.selected.scrollPositions.start == null) {
								scope.selected.scrollPositions = {
									start: nextStartPosition,
									end: raw.scrollEnd
								}
							}
						}
					});
				}
			}
		});
	
	
	/** @ngInject */
	function ViewStoryController($http, $scope) {
		var dates = {};
		var icons = {
			volume: "volume_up",
			mute: "volume_off"
		}
		$scope.interactedWithTimeline = false;
		$scope.selected = {}; // currently selected story
		$scope.content = ""; // full text in story text box
		$scope.images = {
			current: null, // current active image index in container
			container: [] // contains 2 images for crossfade
		}
		$scope.video = {
			icon: icons.volume,
			player: {
				controls: 0,
				autoplay: 1
			}
		}
			
		// pick up all available stories
		$http.get('api/story').then(function(response) {
			$scope.stories = response.data;
			$scope.init();
			// TODO implement first story
			$scope.showContent($scope.getStoryByFileName("victoria-1"));
		});
			
		// set the start and end date of the timeline
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
			
		// clear up all content in text box
		$scope.refresh = function() {
			$scope.content = "";
			for (var i = 0; i < $scope.stories.length; i++) {
				$scope.stories[i].scrollPositions = {};
			}
		}
			
		// display new content
		$scope.showContent = function(content, refresh) {
			// if content is to be cleared
			if (refresh) {
				$scope.refresh();
				// TODO update angularly
				$(".article__content").scrollTop(0);
				$scope.interactedWithTimeline = true;
			}
			$scope.loadContent(content);
			$scope.selected = content;
			$scope.selected.x = $scope.setRoundelLocations(content);
			$scope.selected.visible = true;
			
			// update the visible image
			$scope.images.current = $scope.images.current === 0 ? 1 : 0;
			$scope.images.container[$scope.images.current] = content.img;
			
			// update playing video, if necessary
			$scope.video.id = content.youtubeId;
			if ($scope.youtube != null && $scope.video.id == null) {
				$scope.youtube.stopVideo();
			}
		}
		
		// display story content, loading it from backend if necessary
		$scope.loadContent = function(story) {
			// only load from backend if it hasn't already been loaded
			if (story.content == "") {
				$http.get('api/story/' + story.fileName).then(function(response) {
					story.content = response.data.story;
					$scope.content += story.content;
				})
			}
			else if (story.scrollPositions.start == null) {
				$scope.content += story.content;
			}
		}
		
		$scope.isSelected = function(title) {
			return $scope.selected.title == title;
		}
		
		// get the proportion of time between a start and end date for a given date
		$scope.getDateProportion = function(dateStr) {
			if (dateStr === null) return 0;
			var date = new Date(dateStr);
			return (((date - dates.start) / dates.time) * 100);
		}
		
		$scope.getDateProportionPercentage = function(dateStr) {
			return $scope.getDateProportion(dateStr) + "%";
		}
		
		// set the timeline location for a story
		$scope.setRoundelLocations = function(story) {
			if (story.roundel.x == null) {
				story.roundel.x = $scope.getDateProportion(story.timeSetting);
			}
			reposition();
		}
		
		// gather and sort visible roundels, then reposition them on timeline
		// TODO refactor
		function reposition() {
			var stories = [];
			// pick up all roundels on the timeline and sort them by timeline location
			for (var i = 0; i < $scope.stories.length; i++) {
				if ($scope.stories[i].roundel.x != null) {
					if (stories.length == 0) {
						stories[0] = $scope.stories[i];
					}
					else {
						var inserted = false;
						var j = 0;
						// sorting by time
						// TODO cleaner sorting algorithm
						while (!inserted && j < stories.length) {
							if (stories[j].roundel.x < $scope.stories[i].roundel.x) {
								stories.splice(j + 1, 0, $scope.stories[i]);
								inserted = true;
							}
							j++;
						}
						// if not inserted, this is the most recent time
						if (!inserted) {
							stories[j] = $scope.stories[i];
						}
					}
				}
			}
			repositionStories(stories);
		}
		
		// reposition timeline roundels, to avoid them getting too close together
		function repositionStories(stories) {
			var repositioned = false;
			for (var i = 0; i < stories.length - 1; i++) {
				var distance = stories[i].roundel.x - stories[i+1].roundel.x;
				// if distance is too low between two roundels, move them further apart
				if (distance < 2) {
					stories[i].roundel.x += 2 - distance;
					repositioned = true;
				}
			}
			// reposition until all roundels are far enough apart
			// TODO danger of too many roundels
			if (repositioned) repositionStories(stories);
		}
		
		$scope.isImageActive = function() {
			return $scope.images.container[$scope.images.current] != "";
		}
		
		// check if the currently selected story's date is past another
		$scope.isPassed = function(dateStr) {
			var date = new Date(dateStr);
			return new Date($scope.selected.timeSetting) > date;
		}
		
		$scope.getStoryByFileName = function(fileName) {
			for (var i = 0; i < $scope.stories.length; i++) {
				if ($scope.stories[i].fileName == fileName) return $scope.stories[i];
			}
		}
		
		// show the next story, eg. after scrolling to end of current story
		$scope.getNext = function() {
			if ($scope.selected.next != "") {
				var story = $scope.selected.scrollNext == null ? $scope.getStoryByFileName($scope.selected.next) : $scope.selected.scrollNext;
				if (story != null) {
					story.scrollPrev = $scope.selected;
					$scope.showContent(story);
				}
			}
		}
		
		// get the previous story, eg. scrolling back to the top of current story
		$scope.getLast = function() {
			$scope.showContent($scope.selected.scrollPrev);
		}
		
		// toggle between mute and volume for currently playing youtube video
		$scope.toggleYoutube = function() {
			if ($scope.video.icon === icons.volume) {
				$scope.youtube.pauseVideo();
				$scope.video.icon = icons.mute;
			} else {
				$scope.youtube.playVideo();
				$scope.video.icon = icons.volume;
			}
		}
		
		// loop youtube video forever
		$scope.$on('youtube.player.ended', function($event, player) {
			player.playVideo();
		})
					
	}
})();
