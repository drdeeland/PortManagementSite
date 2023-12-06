const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function getTruckInfo() {
    let license = document.getElementById("license").value;

    console.log("license: " + license);

    let directionTable = "<tr><th>Read Directions</th><th>Address</th></tr>";

    let tmp = {"license":license};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getTruckInfo' + extension;

    // Contacts the api to retrieve data from the database
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("request prepped:" + jsonPayload);

    let result;

    // Request is sent and checks if it was successful
    try 
    {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = xhr.responseText;
                console.log(response);

                // The retrieved data sent as a JSON
                let jsonObject = JSON.parse( response );

                let containers;

                // Checks if any containers are found
                if (jsonObject.id != 0) {
                    containers = jsonObject.results;
    
                    let address;
                    for (let i = 0; i < containers.length; i++) {
                        address = containers[i].address
                        // Drivers to unload
                        if (containers[i].location == "Storage") {
                            console.log("Truck " + license + " drops off.");
                            
                            directionTable += "<tr><td>Truck " + license + " has to unload container</td>";
                            directionTable += "<td>" + address + "</td></tr>"

                            document.getElementById("location").innerHTML = directionTable;
                        }
                        // Drivers to load
                        else if (containers[i].location == "Source") {
                            console.log("Truck " + license + " picks up.");

                            directionTable += "<tr><td>Truck " + license + " has to load container</td>";

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
    catch (err) 
    {
        console.log(err);
        return null;
    }

    return result;
}

function getDirection() {
    console.log("retrieve func");
    getTruckInfo();
}