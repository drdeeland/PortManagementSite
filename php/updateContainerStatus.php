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
        $stmt = $conn->prepare("UPDATE Container_Location SET location='Destination' WHERE (location='Storage' AND dest_sid=(?))");
        $stmt->bind_param("i", $sourceID);
        $stmt->execute();
        $stmt = $conn->prepare("UPDATE Container_Location SET location='Storage' WHERE (location='Source' AND source_sid=(?))");
        $stmt->bind_param("i", $sourceID);
        $stmt->execute();
    } else{
        $stmt = $conn->prepare("UPDATE Container_Location SET location='Destination' WHERE (location='Storage' AND dest_tid=(?))");
        $stmt->bind_param("i", $sourceID);
        $stmt->execute();
        $stmt = $conn->prepare("UPDATE Container_Location SET location='Storage' WHERE (location='Source' AND source_tid=(?))");
        $stmt->bind_param("i", $sourceID);
        $stmt->execute();
    }
    
    // $stmt->execute();
    // $result = $stmt->get_result();

    
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
