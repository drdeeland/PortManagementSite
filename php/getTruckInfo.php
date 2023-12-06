<?php
    $inData = getRequestInfo();

    $license = $inData["license"];

    $searchCount = 0;

    $conn = new mysqli("localhost","db","pass","portmanagement");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    else {
        $stmt = $conn->prepare("SELECT * FROM Trucks T, Container_Location CL, storageareas S WHERE T.license = (?) AND (T.truck_id = CL.dest_tid OR T.truck_id = CL.source_tid) AND (CL.storage_id = S.storage_id)");
        $stmt->bind_param("s", $inData["license"]);
        $stmt->execute();
        $result = $stmt->get_result();

        $searchResults = array();

        while ( $row = $result->fetch_assoc() ) {
            $searchResults[$searchCount] = array(
                "license" => $row["license"],
                "company" => $row["company"],
                "dest_tid" => $row["dest_tid"],
                "source_tid" => $row["source_tid"], 
                "location" => $row["location"],
                "storage_id" => $row["storage_id"],
                "address" => $row["address"]
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