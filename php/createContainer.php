<?php
$inData = getRequestInfo();

$company = $inData["company"];
$dest_sid = $inData["dest_sid"];
$dest_tid = $inData["dest_tid"];
$source_sid = $inData["source_sid"];
$source_tid = $inData["source_tid"];
$storage_id = $inData["storage_id"];
$destIsShip = $inData["destIsShip"];
$sourceIsShip = $inData["sourceIsShip"];
$location = "Source";

$conn = new mysqli("localhost","db","pass","portmanagement");

if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
else {
    if ($destIsShip) {
        if ($sourceIsShip) {
            $stmt = $conn->prepare("INSERT INTO Container_Location (company, dest_sid, source_sid, storage_id, location) VALUES (?,?,?,?,?)");
            $stmt->bind_param("siiis", $company, $dest_sid, $source_sid, $storage_id, $location);
        }
        else {
            $stmt = $conn->prepare("INSERT INTO Container_Location (company, dest_sid, source_tid, storage_id, location) VALUES (?,?,?,?,?)");
            $stmt->bind_param("siiis", $company, $dest_sid, $source_tid, $storage_id, $location);
        }
    }
    else {
        if($sourceIsShip) {
            $stmt = $conn->prepare("INSERT INTO Container_Location (company, dest_tid, source_sid, storage_id, location) VALUES (?,?,?,?,?)");
            $stmt->bind_param("siiis", $company, $dest_tid, $source_sid, $storage_id, $location);
        }
        else {
            $stmt = $conn->prepare("INSERT INTO Container_Location (company, dest_tid, source_tid, storage_id, location) VALUES (?,?,?,?,?)");
            $stmt->bind_param("siiis", $company, $dest_tid, $source_tid, $storage_id, $location);
        }
    }

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
