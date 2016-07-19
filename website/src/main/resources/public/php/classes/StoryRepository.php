<?php

require 'Story.php';

class StoryRepository {

	private static $stories = array();
	
	protected static function init() {
		$environment = "local";
		$servername = "localhost";
		$usernames = array(
			"production" => "zakbvnkr_zb",
			"local" => "root"
		);
		$passwords = array(
			"production" => "zb123",
			"local" => "root"
		);
		$dbNames = array(
			"production" => "zakbvnkr_bowyerville",
			"local" => "stories"
		);
		
		$conn = new mysqli($servername, $usernames[$environment], $passwords[$environment], $dbNames[$environment]);
		
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}
		
		$sql = "SELECT * FROM stories";
		$result = $conn->query($sql);
		$stories = array();
		try {
			while ($row = $result->fetch_assoc()) {
				$stories[] = $row;
			}
		}
		catch (Exception $e) {
			echo $e->getMessage();
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