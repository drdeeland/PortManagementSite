<?php
    $inData = getRequestInfo();

    $name = $inData["shipName"];

    $conn = new mysqli("localhost","db","pass","portmanagement");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        $stmt = $conn->prepare("INSERT INTO Ships (name) VALUES (?)");
        $stmt->bind_param("s", $name);

        $stmt->execute();

        $stmt->close();
        $conn->close();

        returnWithError("");
    }

    function getRequestInfo() {
        return json_decode(file_get_contents('php://input'), true);
    }
    
    // Function that sends an API response as a JSON object
    function sendResultInfoAsJson( $obj ) {
        header('Content-type: application/json');
        echo $obj;
    }
    
    // Function that returns with an error as a JSON object (Used just to send back a response)
    function returnWithError( $err ) {
        $retValue = '{"id":0,"error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $info ) {
        $retValue = '{"results":[' . $info . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>