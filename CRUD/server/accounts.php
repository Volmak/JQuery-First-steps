<?php
// session_start();
$name = isset($_POST["username"]) ? $_POST["username"]: false;
$pass = isset($_POST["password"]) ? $_POST["password"]: false;
$mail = isset($_POST["email"]) ? $_POST["email"]: false;

if(!$name || !($pass || $mail)) {
 	die('All fields are mandatory!');
}

require_once 'accountsArray.php';

if ($pass) {
	foreach ($accounts as $info){
		if (in_array($name, $info)){
			if($info['password'] == $pass){
// 				setcookie('LoggedAs', $name, time() + 86400, "/");
				die ('All set and ready to go');
			}	
		}
	}
	echo 'Invalid username/password combination';
}

if($mail) {
	foreach ($accounts as $info){
		if (in_array($name, $info)){
			if($info['mail'] == $mail){
				$link 	 = 'http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
				$link 	 = str_replace("server/accounts.php", 'change-password.html', $link);
				$link 	 = $link . "?code=\"" . $info['safecode'] . "\"";
				$to      = $info['mail'];
				$subject = 'Forgotten password';
				$message = "A request to change your password was made on our website(" . $_SERVER['HTTP_HOST'] .
			"). If it's really you who made that request click the link below to change your password: <br>" . $link;
// 				mail($to, $subject, $message);
				echo 'In actual conditions this would send an e-mail to the mail address asociated with that username ('
						. $to . ') containing this message: <br>';
				die ($message);
			}
		}
	}
	echo "This e-mail doesn't match the given username";
}
