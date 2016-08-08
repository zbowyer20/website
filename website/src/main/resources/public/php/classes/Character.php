<?php
class Character {
	public $id;
	public $displayName;
	public $img;
	public $fileName;

	public function __construct($id, $displayName, $img, $fileName) {
		$this->id = $id;
		$this->displayName = $displayName;
		$this->img = $img;
		$this->fileName = $fileName;
	}
}