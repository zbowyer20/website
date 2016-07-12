<?php

require 'Story.php';

class StoryRepository {

	private static $stories = array();
	
	protected static function init() {
		$stories = array();
		array_push($stories, 
			new Story("12345", "fileName", "grace", "Grace-1", "Content", "Img", "Time", "Grace-2", "yotuube", "hiddenDate", "$teaser", "$type"));
		self::$stories = $stories;
	}
	
	public static function getStories() {
		if (count(self::$stories) === 0) {
			self::init();
		}
		return self::$stories;
	}
		
}