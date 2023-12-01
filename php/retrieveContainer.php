<?php
$inData = getRequestInfo();

$company = $inData["company"];

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost","db","pass","portmanagement");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
else {
    $stmt = $conn->prepare("SELECT * FROM Container_Location CL WHERE CL.company = (?)");
    $stmt->bind_param("s", $company);
    $stmt->execute();
    $result = $stmt->get_result();

    while ( $row = $result->fetch_assoc())
    {
        if ( $searchCount > 0 )
        {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '{"container_id":'.$row["container_id"].', "company":"'.$company.'", "dest_sid":"'.$row["dest_sid"].'", "dest_tid":"'.$row["dest_tid"].'", 
        "source_sid":"'.$row["source_sid"].'", "source_tid":"'.$row["source_tid"].'", "storage_id":'.$row["storage_id"].', "location":"'.$row["location"].'"}';
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
    $retValue = '{"results":[' . $info . '],"error":""}';
    sendResultInfoAsJson( $retValue );
}
?>