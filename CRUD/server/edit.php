<?php

session_start();

if(!isset($_SESSION["table"])){
	$next = 0;
}else {
	end($_SESSION["table"]);
	$next = key($_SESSION["table"]) + 1;
}

if (!(isset($_POST['name']) && isset($_POST['quantity']) && isset($_POST['price'])) ||
		!($_POST['name'] && $_POST['quantity'] && $_POST['price'])) {
	die("All fields are mendatory");	
}

if($_POST['key']){
	$_SESSION["table"][$_POST['key']] = $_POST;
}else {
	$input = $_POST;
	$input['key'] = $next;
	$_SESSION["table"][$next] = $input;
}

// echo json_encode($_SESSION); //This is a row for debugging purposes only!
