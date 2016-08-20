<?php
session_start();
unset($_SESSION['table'][$_POST['remove']]);