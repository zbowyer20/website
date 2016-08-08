<?php

error_reporting(E_ALL);

require '../classes/CharacterRepository.php';

header('Content-type: application/json');

$characters = CharacterRepository::getCharacters();
echo json_encode($characters);

