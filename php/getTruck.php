<?php
$inData = getRequestInfo();

$truck_id = $inData["truck_id"];

$searchResults = "";
$searchCount = 0;

$conn = new mysqli("localhost","db","pass","portmanagement");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
else {
    $stmt = $conn->prepare("SELECT * FROM Trucks T WHERE T.truck_id = (?)");
    $stmt->bind_param("i", $truck_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ( $row = $result->fetch_assoc() ) {
        $searchCount++;
        $searchResults .= '{"license":"'.$row["license"].'", "storage_id":"'.$row["storage_id"].'"';
    }

    $stmt = $conn->prepare("SELECT S.address FROM Storageareas S WHERE S.storage_id = (?)");
    $stmt->bind_param("i", $row["storage_id"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if ( $row = $result->fetch_assoc() ) {
        $searchCount++;
        $searchResults .= ', "address":"'.$row["address"].'"}';
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