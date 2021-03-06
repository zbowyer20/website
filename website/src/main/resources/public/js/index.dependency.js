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
	var modules = require('./index.module.js');
	var routes = require('./index.route.js');
	var viewStory = {
			controller: require('./../views/viewstory/viewstory.controller.js'),
			scroll: require('./../views/viewstory/viewstory.scroll.js')
	};
})()