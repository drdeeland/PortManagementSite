
<?php
    $hostname="localhost";
    $db="portmanagement"
    $username="root";
    $password="D4t4b4s3S3rv3rP0g";

    $dsn="mysql:host=$hostname;dbname=$db;charset=UTF8"

    try {
        $pdo = new PDO($dsn, $username, $password);

        if ($pdo) {
            echo 'Connected to database';
        }
    }
    catch (PDOException $e) {
        echo $e->getMessage();
    }
?>