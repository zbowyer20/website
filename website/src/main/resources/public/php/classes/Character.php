<?php
class Character {
	public $id;
	public $displayName;
	public $img;
	public $fileName;
	public $main;

	public function __construct($id, $displayName, $img, $fileName, $main) {
		$this->id = $id;
		$this->displayName = $displayName;
		$this->img = $img;
		$this->fileName = $fileName;
		$this->main = $main;
	}
}