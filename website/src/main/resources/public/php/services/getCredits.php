<?php

error_reporting(E_ALL);

require '../classes/CreditRepository.php';

header('Content-type: application/json');

$credits = CreditRepository::getCredits();
echo json_encode($credits);

