<?php

require 'Story.php';

class StoryRepository {

	private static $stories = array();
	
	protected static function init() {
		$servername = "localhost";
		$username = "username";
		$password = "password";
		
		$conn = new mysqli($servername, $username, $password, $zakbvnkr_bowyerville);
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		
		$sql = "SELECT * FROM stories";
		$result = $conn->query($sql);
		$stories = array();
		
		while ($row = $result->fetch_assoc()) {
			$stories[] = $row;
		}
		
		self::$stories = $stories;
		
		mysqli_close($conn);
	}
	
	public static function getStories() {
		if (count(self::$stories) === 0) {
			self::init();
		}
		return self::$stories;
	}
		
}