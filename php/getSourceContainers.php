<?php
$inData = getRequestInfo();

$sourceID = $inData["sourceId"];
$isShip = $inData["isShip"];

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost","db","pass","portmanagement");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
else {
    if($isShip){
        $stmt = $conn->prepare("SELECT * FROM Container_Location CL ORDER BY CL.location WHERE (CL.location = 'Storage' AND CL.dest_sid = (?)) OR (CL.location = 'Source' OR CL.source_sid = (?)");
        $stmt->bind_param("ss", $sourceID, $sourceID);
    } else{
        $stmt = $conn->prepare("SELECT * FROM Container_Location CL ORDER BY CL.location WHERE (CL.location = 'Storage' AND CL.dest_tid = (?)) OR (CL.location = 'Source' OR CL.source_tid = (?)");
        $stmt->bind_param("ss", $sourceID, $sourceID);
    }
    
    $stmt->execute();
    $result = $stmt->get_result();

    while ( $row = $result->fetch_assoc())
    {
        if ( $searchCount > 0 )
        {
            $searchResults .= ",";
        }
        $searchCount++;
        $searchResults .= '{"container_id":'.$row["container_id"].', "company":"'.$row[$company].'", "dest_sid":"'.$row["dest_sid"].'", "dest_tid":"'.$row["dest_tid"].'", 
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