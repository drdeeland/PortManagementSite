<?php
    $inData = getRequestInfo();

    $truck_id = $inData["truck_id"];

    $searchCount = 0;

    $conn = new mysqli("localhost","db","pass","portmanagement");

    // Need to add query SELECT S.address FROM storeageareas S WHERE S.storage_id=storage_id
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        $stmt = $conn->prepare("SELECT * FROM Container_Location CL WHERE CL.dest_tid = (?) OR CL.source_tid = (?)");
        $stmt->bind_param("ii", $truck_id,  $inData["truck_id"]);
        $stmt->execute();
        $result = $stmt->get_result();

        $searchResults = array();

        while ( $row = $result->fetch_assoc() ) {
            $searchResults[$searchCount] = array(
                "company" => $row["company"],
                "dest_sid" => $row["dest_sid"],
                "dest_tid" => $row["dest_tid"],
                "source_sid" => $row["source_sid"],
                "source_tid" => $row["source_tid"],
                "storage_id" => $row["storage_id"],
                "location" => $row["location"]
            );
            
            $searchCount++;
        }

        if ( $searchCount == 0 )
        {
            returnWithError("No Containers Found");
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
        $json = json_encode($info, JSON_PRETTY_PRINT);
        $retValue = '{"results":' . $json . ',"id":1,"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>