<?php

error_reporting(E_ALL);

require '../classes/Repository.php';

header('Content-type: application/json');

$type = $_GET["type"];
$results = Repository::getResults($type);
echo json_encode($results);

