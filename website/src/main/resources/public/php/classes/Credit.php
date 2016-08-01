<?php
class Credit {
	public $id;
	public $source;
	public $source2;
	public $name;
	public $desc;
	public $credit;

	public function __construct($id, $source, $source2, $name, $desc, $credit) {
		$this->id = $id;
		$this->source = $source;
		$this->source2 = $source2;
		$this->name = $name;
		$this->desc = $desc;
		$this->credit = $credit;
	}
}