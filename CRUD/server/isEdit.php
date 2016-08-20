<?php
session_start();

if (isset($_SESSION['tableKey'])){	
	echo json_encode($_SESSION["table"][$_SESSION['tableKey']]);
	unset($_SESSION['tableKey']);
}
