const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function getTruckId() {
    let truck = document.getElementById("tid").value;

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

    // try 
    // {
    //     xhr.onreadystatechange = function() {
    //         if (this.readyState == 4 && this.status == 200) {
    //             let response = xhr.responseText;
    //             console.log(response);
    //             let jsonObject = JSON.parse( response );

    //             truckTable += "<tr><td>" + jsonObject.results[0]["license"] + "</td>";

    //             truckTable += "<td>Storage: " + jsonObject.results[0]["storage_id"] + "</td>";
                
    //             truckTable += "<td>" + jsonObject.results[0]["address"] + "</td></tr>";

    //             document.getElementById("truckInfo").innerHTML = truckTable;
    //         }
    //     };
    //     xhr.send(jsonPayload);
    // }
    // catch (err) 
    // {
    //     console.log(err);
    //     return null;
    // }

    // return result;
}

function getDirection() {
    console.log("retrieve func");
    getTruckId();
}
