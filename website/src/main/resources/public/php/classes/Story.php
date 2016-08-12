<?php
class Story {
	public $id;
	public $fileName;
	public $character;
	public $title;
	public $content;
	public $img;
	public $timeSetting;
	public $next;
	public $youtubeId;
	public $hiddenDate;
	public $teaser;
	public $type;
	public $book;

	public function __construct($id, $fileName, $character, $title, $content, $img, $timeSetting, $next, $youtubeId, $hiddenDate, $teaser, $type, $book) {
		$this->id = $id;
		$this->fileName = $fileName;
		$this->character = $character;
		$this->title = $title;
		$this->content = $content;
		$this->img = $img;
		$this->timeSetting = $timeSetting;
		$this->next = $next;
		$this->youtubeId = $youtubeId;
		$this->hiddenDate = $hiddenDate;
		$this->teaser = $teaser;
		$this->type = $type;
		$this->book = $book;
	}

}