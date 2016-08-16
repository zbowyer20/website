<?php

require 'Character.php';

class CharacterRepository {

	private static $characters = array();
	
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
		
		$sql = "SELECT * FROM characters";
		$result = $conn->query($sql);
		$stories = array();
		try {
			while ($row = $result->fetch_assoc()) {
				$characters[] = $row;
			}
		}
		catch (Exception $e) {
			echo $e->getMessage();
		}

		self::$characters = $characters;
		
		mysqli_close($conn);
	}
	
	public static function getCharacters() {
		if (count(self::$characters) === 0) {
			self::init();
		}
		return self::$characters;
	}
		
}