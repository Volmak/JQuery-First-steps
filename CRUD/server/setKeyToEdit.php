<?php
session_start();
if(isset($_POST["key"])){
	$_SESSION['tableKey'] = $_POST["key"];
}