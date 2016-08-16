<?php

class Repository {

	private static $results = array();
	
	protected static function init($type) {
		if (file_exists("../../_production.txt")) {
			$environment = "production";
		}
		else {
			$environment = "local";
		}
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
		$sql = "SELECT * FROM " . $type;
		$result = $conn->query($sql);
		$results = array();
		
		try {
			while ($row = $result->fetch_assoc()) {
				$results[] = $row;
			}
		}
		catch (Exception $e) {
			echo $e->getMessage();
		}
		
		self::$results = $results;
		
		mysqli_close($conn);
	}
	
	public static function getResults($type) {
		if (count(self::$results) === 0) {
			self::init($type);
		}
		return self::$results;
	}
		
}