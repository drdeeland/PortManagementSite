<?php
$inData = getRequestInfo();

$shipName = $inData["shipName"];

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost","db","pass","portmanagement");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
else {
    $stmt = $conn->prepare("SELECT * FROM Ships S WHERE S.name = (?)");
    $stmt->bind_param("s", $shipName);
    $stmt->execute();
    $result = $stmt->get_result();

    if ( $row = $result->fetch_assoc() ) {
        $searchCount++;
        $searchResults .= '{"ship_id":"'.$row["ship_id"].'", "name":"'.$row["name"].'"';
    }

    $stmt = $conn->prepare("SELECT * FROM Berths B WHERE B.ship_id = (?)");
    $stmt->bind_param("i", $ship_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ( $row = $result->fetch_assoc() ) {
        $searchCount++;
        $searchResults .= ', "berth_id":"'.$row["berth_id"].'"';
    }

    $searchResults .= '}';

    if ( $searchCount == 0 )
    {
        returnWithError("No Ships Found");
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