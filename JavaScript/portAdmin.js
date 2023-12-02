const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function retrieveBerths() {
    console.log("retrieve func");

    let berthTable = "<tr><th>Berth ID</th><th>Docked Ship</th></tr>";

    let jsonPayload = JSON.stringify();

    let url = urlBase + '/retrieveBerth' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let result;

    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let response = xhr.responseText;
                console.log(response);
                let jsonObject = JSON.parse( response );
                
                /*
                if (jsonObject.error != null) {
                    console.log(jsonObject.error);
                }
                */

                for (let i = 0; i < jsonObject.results.length; i++) {
                    berthTable += "<tr><td>Berth #" + jsonObject.results[i]["berth_id"] + "</td>";
                    
                    if (jsonObject.results[i]["ship_id"] == null || jsonObject.results[i]["ship_id"] == "") {
                        berthTable += "<td>No ship docked</td></tr>";
                    }
                    else {
                        berthTable += "<td>Ship #" + jsonObject.results[i]["ship_id"] + " is docked.</td></tr>";
                    }
                }

                console.log(berthTable);

                document.getElementById("berthInfo").innerHTML = berthTable;
            }
        }
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        console.log(err);
        return null;
    }

    return result;
}

function getContainerId() {
    console.log("retrieve func");

    let containerID = document.getElementById("containerID").value;

    console.log("Container: " + containerID)

    let containerTable = "<tr><th>Company</th><th>Source ID</th><th>Storage ID</th><th>Destination ID</th><th>Status</th></tr>";

    let tmp = {"container_id":containerID};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getContainer' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let result;

    try 
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                let response = xhr.responseText;
                console.log(response);
                let jsonObject = JSON.parse( response );
                
                containerTable += "<td>" + jsonObject.results[0]["company"] + "</td>";

                if (jsonObject.results[0]["source_sid"] == "") {
                    containerTable += "<td>Truck: " + jsonObject.results[0]["source_tid"] + "</td>";
                }
                else {
                    containerTable += "<td>Ship: " + jsonObject.results[0]["source_sid"] + "</td>";
                }

                containerTable += "<td>Storage: " + jsonObject.results[0]["storage_id"] + "</td>";
                
                if (jsonObject.results[0]["dest_sid"] == "") {
                    containerTable += "<td>Truck: " + jsonObject.results[0]["dest_tid"] + "</td>";
                }
                else {
                    containerTable += "<td>Ship: " + jsonObject.results[0]["dest_sid"] + "</td>";
                }

                containerTable += "<td>" + jsonObject.results[0]["location"] + "</td></tr>";
            }

            document.getElementById("containerInfo").innerHTML = containerTable;
        }
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        console.log(err);
        return null;
    }

    return result;
}

function getShipId() {
    console.log("retrieve func");

    let ship = document.getElementById("shipID").value;

    console.log("ship_id: " + ship);

    let shipTable = "<tr><th>Ship Name</th><th>Docked</th></tr>";

    let tmp = {"ship_id":ship};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getShip' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("request prepped:" + jsonPayload);

    let result;

    try 
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) {
                let response = xhr.responseText;
                console.log(response);
                let jsonObject = JSON.parse( response );
                
                shipTable += "<tr><td>" + jsonObject.results[0]["name"] + "</td>";

                if (jsonObject.results[0]["berth_id"] == null) {
                    shipTable += "<td>Not Docked</td>";
                }
                else {
                    shipTable += "<td>Docked at Berth #" + jsonObject.results[0]["berth_id"] + "</td></tr>";
                }

                document.getElementById("shipInfo").innerHTML = shipTable;
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

function getTruckId() {
    console.log("retrieve func");

    let truck = document.getElementById("truckID").value;

    console.log("truck_id: " + truck);

    let truckTable = "<tr><th>License Plate</th><th>Storage ID</th><th>Address</th></tr>";

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

                truckTable += "<tr><td>" + jsonObject.results[0]["license"] + "</td>";

                truckTable += "<td>Storage: " + jsonObject.results[0]["storage_id"] + "</td>";
                
                truckTable += "<td>" + jsonObject.results[0]["address"] + "</td></tr>";

                document.getElementById("truckInfo").innerHTML = truckTable;
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
