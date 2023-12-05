const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

async function createTruck() {
    console.log("create func");

    let license = document.getElementById("license").value;
    let storageID = 1;

    let message = "";
    document.getElementById("message").innerHTML = message;

    let result;
    
    if (license == "") {
        message = "<b>Field is missing input.</b>";
        document.getElementById("message").innerHTML += message;
        return result
    }
    // Checks if the truck is registered already
    await isTruckRegistered(license);


    let tmp = {license, storage_id:Number(storageID)};

    let jsonPayload = JSON.stringify(tmp);

    console.log(jsonPayload);

    let url = urlBase + '/createTruck' + extension;

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

function isTruckRegistered(license) {
    let message = "";

    let tmp = {"license":license};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getTruckByLicense' + extension;

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
                console.log("License check:", response);
                
                let jsonObject = JSON.parse( response );

                if (jsonObject["error"] == "No Trucks Found") {
                    message = "<b>Truck sucessfully registered. Enter through Row A</b>";
                    document.getElementById("message").innerHTML = message;
                }
                else {
                    message = "<b>This truck is already registered.</b>";
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