const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

// Global Variable for checking
async function createTruck() {
    console.log("create func");

    let shipName = document.getElementById("shipName").value;

    let message = "";
    document.getElementById("message").innerHTML = message;

    let result;
    
    // Checks if the truck is registered already
    await isTruckRegistered(shipName);

    let tmp = {license};

    let jsonPayload = JSON.stringify(tmp);

    console.log(jsonPayload);

    let url = urlBase + '/createShip' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            let response = xhr.responseText;
            console.log("Insertion:", response);
          }
      };
    
      xhr.send(jsonPayload);
      }
      catch(err) {
        document.getElementById("message").innerHTML = err.message;
      }

    return result;
}

function isTruckRegistered(shipName) {
    let message = "";

    let tmp = {"name":shipName};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getShip' + extension;

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
                console.log("Ship check:", response);
                
                let jsonObject = JSON.parse( response );

                if (jsonObject["error"] == "No Trucks Found") {
                    message = "<b>Truck sucessfully registered. Enter through Row A</b>"
                } else {
                    message = "<b>This truck is already registered.</b>"
                }

                document.getElementById("message").innerHTML = message;
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