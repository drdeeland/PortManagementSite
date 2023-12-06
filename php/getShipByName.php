<?php
    $inData = getRequestInfo();

    $name = $inData["name"];

    $searchResults = "";
    $searchCount = 0;

    $conn = new mysqli("localhost","db","pass","portmanagement");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        $stmt = $conn->prepare("SELECT * FROM Ships S WHERE S.name = (?)");
        $stmt->bind_param("n", $name);
        $stmt->execute();
        $result = $stmt->get_result();

        if ( $row = $result->fetch_assoc() ) {
            $searchCount++;
            $searchResults .= '{"name":"'.$row["name"].'"';
        }

        if ( $searchCount == 0 )
        {
            returnWithError("No Trucks Found");
        }
        else
        {
            returnWithInfo( $searchResults );
        }
    
        $stmt->close();
        $conn->close();
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