const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

// source_tid -> truck driver has to go to storage area storage_id to unload
// dest_tid -> truck driver has to go to storage area storage_id to receive truck

// Need to rework code to add appropiate storage locations
function getContainers() {
    let truck = document.getElementById("tid").value;

    console.log("Container func - truck_id: " + truck);

    let directionTable = "<tr><th>Read Directions</th><th>Address</th></tr>";

    let tmp = {"truck_id":truck};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getAllContainers' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("request prepped:" + jsonPayload);

    let result;

    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = this.responseText;
                console.log(response);
                let jsonObject = JSON.parse( response );

                let containers;

                if (jsonObject.id != 0) {
                    containers = jsonObject.results;
    
                    let address;
                    for (let i = 0; i < containers.length; i++) {
                        // Drivers to unload
                        if (containers[i].source_tid == truck) {
                            console.log("Truck " + truck + " drops off.");
                            
                            directionTable += "<tr><td>Truck " + truck + " has to unload container</td>";

                            getTruckInfo();
                            address = document.getElementById("address").value;

                            directionTable += "<td>" + address + "</td></tr>";

                            document.getElementById("location").innerHTML = directionTable;
                        }
                        // Drivers to load
                        else if(containers[i].dest_tid == truck) {
                            console.log("Truck " + truck + " picks up.");

                            directionTable += "<tr><td>Truck " + truck + " has to load container</td>";

                            getTruckInfo();
                            address = document.getElementById("address").value;

                            console.log(document.getElementById("address").value);

                            directionTable += "<td>" + address + "</td></tr>";

                            document.getElementById("location").innerHTML = directionTable;
                        }
                    }   
                }
                else {
                    directionTable += "<tr><td>" + jsonObject.error + " For This Truck"+ "</td>";

                    directionTable += "<td>Not applicable</td></tr>";

                    document.getElementById("location").innerHTML = directionTable;
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        console.log(err);
        return null;
    }

    return result;
}

function getTruckInfo() {
    let truck = document.getElementById("tid").value;

    console.log("Truck func - truck_id: " + truck);

    let tmp = {"truck_id":truck};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getTruck' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("request prepped:" + jsonPayload);

    let result;

    try 
    {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = xhr.responseText;
                console.log(response);
                
                let jsonObject = JSON.parse( response );

                let address = jsonObject.results[0]["address"];

                document.getElementById("address").value = address;
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        console.log(err);
        return null;
    }

    return result;
}

function getDirection() {
    console.log("retrieve func");
    getContainers();
}