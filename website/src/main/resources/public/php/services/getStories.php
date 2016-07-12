<?php

error_reporting(E_ALL);

require '../classes/StoryRepository.php';

header('Content-type: application/json');

$stories = StoryRepository::getStories();
echo json_encode($stories);

