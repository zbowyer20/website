<?php
class Character {
	public $id;
	public $displayName;
	public $img;
	public $fileName;
	public $main;
	public $imgBlackout;
	public $requiresBlackout;
	public $requiresFull;

	public function __construct($id, $displayName, $img, $fileName, $main, $imgBlackout, $requiresBlackout, $requiresFull) {
		$this->id = $id;
		$this->displayName = $displayName;
		$this->img = $img;
		$this->fileName = $fileName;
		$this->main = $main;
		$this->imgBlackout = $imgBlackout;
		$this->requiresBlackout = $requiresBlackout;
		$this->requiresFull = $requiresFull;
	}
}