<?php

require 'Credit.php';

class CreditRepository {

	private static $credits = array();
	
	protected static function init() {
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
		
		$sql = "SELECT * FROM credits";
		$result = $conn->query($sql);
		$stories = array();
		try {
			while ($row = $result->fetch_assoc()) {
				$credits[] = $row;
			}
		}
		catch (Exception $e) {
			echo $e->getMessage();
		}

		self::$credits = $credits;
		
		mysqli_close($conn);
	}
	
	public static function getCredits() {
		if (count(self::$credits) === 0) {
			self::init();
		}
		return self::$credits;
	}
		
}