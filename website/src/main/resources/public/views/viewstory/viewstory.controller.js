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
				loading: {
					on: false,
					pending: false
				},
				interactedWithTimeline: false,
				latestDate: $scope.TIME_PERIODS[0].start,
				viewedStories: $cookieStore.get("viewedStories") || [],
				latestStoryViewed: $cookieStore.get("latestViewedStory"),
				cookieNextStory: $cookieStore.get("nextStory"),
				muted: $cookieStore.get("muted") || false
		}
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
		};
		
		/*
		 * Initialise stories
		 */
		function init() {
			refresh();
			// hide all roundels
			for (var i = 0; i < data.length; i++) {
				data[i].roundel = {
					x: null
				};
			}
			// add all previously seen cookies to the timeline
			for (var i = 0; i < data.length; i++) {
				if (storyIsInCookie(data[i])) {
					addStoryToTimeline(data[i]);
				}
			}
		}
		
		/*
		 * Clear up all content in text box
		 */
		function refresh() {
			$scope.content.text = "";
			for (var i = 0; i < data.length; i++) {
				data[i].scrollPositions = {};
			}
		}
		
		function loading() {
			$scope.settings.loading.pending = true;
			$timeout(function() {
				if ($scope.settings.loading.pending) {
					$scope.settings.loading.pending = false;
					$scope.settings.loading.on = true;
				}
			}, 300)
		}
		
		function stopLoading() {
			$scope.settings.loading.pending = false;
			$scope.settings.loading.on = false;
		}
		
		function getStoryByFileName(fileName) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].fileName == fileName) return data[i];
			}
		}
		
		/*
		 * Display new content
		 */
		function updateContent(story) {
			addStoryToTimeline(story);
			$scope.content.selected = story;
			displayContent(story);
			
			if (newStoryIsAvailable()) {
				addStoryToTimeline(getStoryByFileName(story.next));
			}
		}
		
		/*
		 * Load and show text, image and video relating to a story
		 */
		function displayContent(story) {
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
			updateLatestDate(story.timeSetting);
			updateImage(story.img);
			updateVideo(story.youtubeId);
		}

		function updateLatestDate(dateStr) {
			var date = new Date(dateStr);
			if (date > $scope.settings.latestDate) {
				$scope.settings.latestDate = date;
			}
		}
		
		function updateImage(image) {
			$scope.content.images.current = $scope.content.images.current ? 0 : 1;
			$scope.content.images.container[$scope.content.images.current] = image;
		}
		
		function updateVideo(id) {
			$scope.content.video.id = id || null;
			cleanVideo(0);
			cleanVideo(500);
		}
		
		function cleanVideo(timeout) {
			$timeout(function() {
				if (unexpectedVideoIsPlaying()) {
					$scope.youtube.stopVideo();
				}
			}, timeout);
		}
		
		function unexpectedVideoIsPlaying() {
			return $scope.youtube != null && $scope.content.video.id == null && $scope.youtube.currentState == "playing";
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
				setRoundelLocations(story);
			}
		}
		
		function storyIsInCookie(story) {
			return $scope.settings.viewedStories.indexOf(story.fileName) > -1;
		}
		
		function updateCookie(story) {
			if (!storyIsInCookie(story)) {
				$cookieStore.put("latestViewedStory", story.fileName);
				$scope.settings.viewedStories.push(story.fileName);
			}
			$cookieStore.put("viewedStories", $scope.settings.viewedStories);
		}
		
		function newStoryIsAvailable() {
			return $scope.settings.latestStoryViewed == $scope.content.selected.fileName && $scope.content.selected.next != "" && "" == $scope.settings.cookieNextStory;
		}
		
		function getRoundelLocation(dateStr) {
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
		function setRoundelLocations(story) {
			if (story.roundel.x == null) {
				story.roundel.x = getRoundelLocation(story.timeSetting);
			}
			reposition();
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
		
		function updateMute(muted) {
			$scope.settings.muted = muted;
			$cookieStore.put("muted", muted);
		}
		
		/*
		 * Refresh the story and jump to a piece of content
		 */
		$scope.goToContent = function(story) {
			console.log("Showing refreshed story: ");
			console.log(story);
			refresh();
			$(".article__content").scrollTop(0);
			$scope.settings.interactedWithTimeline = true;
			updateCookie(story);
			updateContent(story);
		}
		
		$scope.isSelected = function(title) {
			return $scope.content.selected.title == title;
		}
		
		$scope.roundelIsVisible = function(story) {
			return story.fileName == $scope.content.selected.fileName || storyIsInCookie(story) || 
					newStoryIsAvailable();
		}
		
		$scope.storyIsNew = function(story) {
			return (!storyIsInCookie(story) && $scope.roundelIsVisible(story));
		}
		
		$scope.isImageActive = function() {
			return $scope.content.images.container[$scope.content.images.current] != null;
		}
		
		// check if the currently selected story's date is past another
		$scope.isPassed = function(dateStr) {
			var date = new Date(dateStr);
			return new Date($scope.content.selected.timeSetting) > date;
		}
		
		$scope.dateIsLessThanLatestDate = function(dateStr) {
			var date = new Date(dateStr);
			return date <= $scope.settings.latestDate;
		}
		
		$scope.getTooltipText = function(story) {
			return story.hiddenDate ? story.title : story.timeSetting + ": " + story.title;
		}
		
		// show the next story, eg. after scrolling to end of current story
		$scope.getNext = function(refresh) {
			if ($scope.content.selected.next != "") {
				var story = $scope.content.selected.scrollNext == null ? getStoryByFileName($scope.content.selected.next) : $scope.content.selected.scrollNext;
				if (story != null) {
					story.scrollPrev = $scope.content.selected;
					updateCookie(story);
					refresh ? $scope.goToContent(story) : updateContent(story);
				}
			}
			else {
				$scope.content.teaser = $scope.content.selected.teaser;
			}
		}
		
		// get the previous story, eg. scrolling back to the top of current story
		$scope.getLast = function() {
			updateContent($scope.content.selected.scrollPrev);
			$scope.content.teaser = "";
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
		
		loading();

		// pick up all available stories
		$http.get('php/services/getStories.php').then(function(response) {
			data = response.data;
			init();
			// TODO implement first story
			updateContent(getStoryByFileName($scope.settings.latestStoryViewed || "albert-1"));
			updateCookie($scope.content.selected);
			$scope.content.selected.visible = true;
			stopLoading();
		});
					
	}
})();
