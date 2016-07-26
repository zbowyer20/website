(function() {
	'use strict';
	
	angular
		.module('bowyerville')
		.controller('ViewStoryController', ViewStoryController);
	
	
	/** @ngInject */
	function ViewStoryController($http, $scope, $cookieStore, $timeout) {
		var icons = {
			volume: "volume_up",
			mute: "volume_off"
		}
		var data = {};
		$scope.TIME_PERIODS = [
		    {
		    	start: new Date("01/01/1970 00:00"),
		    	end: new Date("01/02/1970 00:00"),
		    	timeline: 20,
		    	visible: false
		    },
		    {
		    	start: new Date("08/15/2020 03:00"),
		    	end: new Date("08/15/2020 12:00"),
		    	timeline: 97,
		    	visible: true,
		    },
		    {
		    	start: new Date("08/16/2020 01:00"),
		    	end: new Date("08/16/2020 03:00"),
		    	timeline: 100,
		    	visible: false
		    }
		];
		$scope.settings = {
				interactedWithTimeline: false,
				latestDate: $scope.TIME_PERIODS[0].start,
				latestStoryViewed: $cookieStore.get("latestViewedStory"),
				cookieNextStory: $cookieStore.get("nextStory"),
				muted: $cookieStore.get("muted") || false
		}
		$scope.selected = {}; // currently selected story
		$scope.content = {
			stories: [],
			selected: {},
			teaser: "",
			text: "",
			images: {
				current: null,
				container: []
			},
			video: {
				icon: $scope.settings.muted ? icons.mute : icons.volume,
				player: {
					controls: 0,
					autoplay: $scope.settings.muted ? 0 : 1
				}
			}
		}; // full text in story text box
		$scope.viewedStories = $cookieStore.get("viewedStories") || [];
		$scope.loading = {
			on: false,
			pending: false
		};
		
		loading();

		// pick up all available stories
		$http.get('php/services/getStories.php').then(function(response) {
			data = response.data;
			$scope.init();
			// TODO implement first story
			$scope.showContent($scope.getStoryByFileName($scope.settings.latestStoryViewed || "albert-1"));
			updateCookie($scope.content.selected);
			$scope.content.selected.visible = true;
			stopLoading();
		});
		
		$scope.init = function() {
			$scope.refresh();
			for (var i = 0; i < data.length; i++) {
				data[i].roundel = {
					x: null
				};
			}
			for (var i = 0; i < data.length; i++) {
				if (storyIsInCookie(data[i])) {
					addStoryToTimeline(data[i]);
				}
			}
		}
		
		function storyIsInTimeline(story) {
			return $scope.content.stories.indexOf(story) > -1;
		}
		
		function addStoryToTimeline(story) {
			if (!storyIsInTimeline(story)) {
				$scope.content.stories.push(story);
				$scope.content.stories.sort(function(a, b) {
					return new Date(a.timeSetting) - new Date(b.timeSetting);
				});
				$scope.setRoundelLocations(story);
			}
		}
			
		// clear up all content in text box
		$scope.refresh = function() {
			$scope.content.text = "";
			for (var i = 0; i < data.length; i++) {
				data[i].scrollPositions = {};
			}
		}
			
		// display new content
		$scope.showContent = function(content, refresh) {
			// if content is to be cleared
			if (refresh) {
				$scope.refresh();
				// TODO update angularly
				$(".article__content").scrollTop(0);
				$scope.settings.interactedWithTimeline = true;
				updateCookie(content);
			}
			addStoryToTimeline(content);
			$scope.loadContent(content);
			$scope.content.selected = content;
			updateLatestDate(content.timeSetting);
			
			// update the visible image
			$scope.content.images.current = $scope.content.images.current === 0 ? 1 : 0;
			$scope.content.images.container[$scope.content.images.current] = content.img;
			
			// update playing video, if necessary
			$scope.content.video.id = content.youtubeId || null;
			if ($scope.youtube != null && $scope.content.video.id == null && $scope.youtube.currentState == "playing") {
				$scope.youtube.stopVideo();
			}
			
			if (newStoryIsAvailable()) {
				addStoryToTimeline($scope.getStoryByFileName($scope.content.selected.next));
			}
		}
		
		// display story content, loading it from backend if necessary
		$scope.loadContent = function(story) {
			// only load from backend if it hasn't already been loaded
			if (typeof story.content == 'undefined' && story.type != 'video') {
				loading();
				$http.get('html/' + story.fileName + '.html').then(function(response) {
					stopLoading();
					story.content = response.data;
					$scope.content.text += story.content;
					$cookieStore.put("nextStory", story.next);
				})
			}
			else if (story.scrollPositions.start == null) {
				$scope.content.text += story.content;
			}
		}
		
		function loading() {
			$scope.loading.pending = true;
			$timeout(function() {
				if ($scope.loading.pending) {
					$scope.loading.pending = false;
					$scope.loading.on = true;
				}
			}, 300)
		}
		
		function stopLoading() {
			$scope.loading.pending = false;
			$scope.loading.on = false;
		}
		
		$scope.isSelected = function(title) {
			return $scope.content.selected.title == title;
		}
				
		$scope.getRoundelLocation = function(dateStr) {
			var currentProportion = 0;
			var date = new Date(dateStr);
			for (var i = 0; i < $scope.TIME_PERIODS.length; i++) {
				if (date > $scope.TIME_PERIODS[i].start && date < $scope.TIME_PERIODS[i].end) {
					var timeIntoPeriod = date - $scope.TIME_PERIODS[i].start;
					var periodTotal = $scope.TIME_PERIODS[i].end - $scope.TIME_PERIODS[i].start;
					var timeProportion = (timeIntoPeriod / periodTotal) * 100;
					var totalTimePeriodProportion = ($scope.TIME_PERIODS[i].timeline - currentProportion) / 100;
					var storyDate = (timeProportion * totalTimePeriodProportion) + currentProportion;
					return storyDate;
				}
				currentProportion = $scope.TIME_PERIODS[i].timeline;
			}
		}
		
		// set the timeline location for a story
		$scope.setRoundelLocations = function(story) {
			if (story.roundel.x == null) {
				story.roundel.x = $scope.getRoundelLocation(story.timeSetting);
			}
			reposition();
		}
		
		$scope.roundelIsVisible = function(story) {
			return story.fileName == $scope.selected.fileName || storyIsInCookie(story) || 
					newStoryIsAvailable();
		}
		
		$scope.storyIsNew = function(story) {
			return (!storyIsInCookie(story) && $scope.roundelIsVisible(story));
		}
		
		// gather and sort visible roundels, then reposition them on timeline
		function reposition() {
			for (var i = 0; i < $scope.content.stories.length - 1; i++) {
				var distance = $scope.content.stories[i + 1].roundel.x - $scope.content.stories[i].roundel.x;
				if (distance < 2) {
					$scope.content.stories[i + 1].roundel.x += 2 - distance;
				}
			}
		}
		
		function updateLatestDate(dateStr) {
			var date = new Date(dateStr);
			if (date > $scope.settings.latestDate) {
				$scope.settings.latestDate = date;
			}
		}
		
		function storyIsInCookie(story) {
			return $scope.viewedStories.indexOf(story.fileName) > -1;
		}
		
		function updateCookie(story) {
			if (!storyIsInCookie(story)) {
				$cookieStore.put("latestViewedStory", story.fileName);
				$scope.viewedStories.push(story.fileName);
			}
			$cookieStore.put("viewedStories", $scope.viewedStories);
		}
		
		function newStoryIsAvailable() {
			return $scope.settings.latestStoryViewed == $scope.content.selected.fileName && $scope.content.selected.next != "" && "" == $scope.settings.cookieNextStory;
		}
		
		$scope.isImageActive = function() {
			return $scope.content.images.container[$scope.content.images.current] != null;
		}
		
		// check if the currently selected story's date is past another
		$scope.isPassed = function(dateStr) {
			var date = new Date(dateStr);
			return new Date($scope.content.selected.timeSetting) > date;
		}
		
		$scope.hasPassed = function(dateStr) {
			var date = new Date(dateStr);
			return date <= $scope.settings.latestDate;
		}
		
		$scope.getStoryByFileName = function(fileName) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].fileName == fileName) return data[i];
			}
		}
		
		$scope.getTooltipText = function(story) {
			return story.hiddenDate ? story.title : story.timeSetting + ": " + story.title;
		}
		
		// show the next story, eg. after scrolling to end of current story
		$scope.getNext = function(refresh) {
			if ($scope.content.selected.next != "") {
				var story = $scope.content.selected.scrollNext == null ? $scope.getStoryByFileName($scope.content.selected.next) : $scope.content.selected.scrollNext;
				if (story != null) {
					story.scrollPrev = $scope.content.selected;
					updateCookie(story);
					$scope.showContent(story, refresh);
				}
			}
			else {
				$scope.content.teaser = $scope.content.selected.teaser;
			}
		}
		
		// get the previous story, eg. scrolling back to the top of current story
		$scope.getLast = function() {
			$scope.showContent($scope.content.selected.scrollPrev);
			$scope.content.teaser = "";
		}
		
		function updateMute(muted) {
			$scope.settings.muted = muted;
			$cookieStore.put("muted", muted);
		}
		
		// toggle between mute and volume for currently playing youtube video
		$scope.toggleYoutube = function() {
			if (!$scope.settings.muted) {
				$scope.youtube.pauseVideo();
				$scope.content.video.icon = icons.mute;
				updateMute(true);
			} else {
				$scope.youtube.playVideo();
				$scope.content.video.icon = icons.volume;
				updateMute(false);
			}
		}
		
		// loop youtube video forever
		$scope.$on('youtube.player.ended', function($event, player) {
			if ($scope.content.selected.type == 'video') {
				$scope.getNext(true);
			}
			else {
				player.playVideo();
			}
		})
					
	}
})();
