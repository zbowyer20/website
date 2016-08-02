(function() {
	'use strict';
	
	var angular = require('angular');
	var angularMaterial = require('angular-material');
	var angularAnimate = require('angular-animate');
	var angularTouch = require('angular-touch');
	var angularRoute = require('angular-route');
	var angularSanitize = require('angular-sanitize');
	var angularCookies = require('angular-cookies');
	var jQuery = require('jquery');
	var angularUiBootstrap = require('angular-ui-bootstrap');
	var angularYoutubeEmbed = require('angular-youtube-embed');
	var angularAria = require('angular-aria');
	var angularFilter = require('angular-filter');
	var modules = require('./index.module.js');
	var routes = require('./index.route.js');
	var home = {
			controller: require('./../views/home/home.controller.js')
	};
	var viewStory = {
			controller: require('./../views/viewstory/viewstory.controller.js'),
			scroll: require('./../views/viewstory/viewstory.scroll.js'),
			story: require('./../views/viewstory/components/viewstory.directives.storyheader.js')
	};
	var credits = {
			controller: require('./../views/credits/credits.controller.js')
	};
})()