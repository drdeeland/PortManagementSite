const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

// Global Variable for checking
var tLicense = [];

function createTruck() {
    console.log("create func");

    let license = document.getElementById("license").value;
    let storageID = 1;

    let message = "";
    document.getElementById("message").innerHTML = message;

    let result;
    
    // Checks if the truck is registered already
    isTruckRegisted(license);
    console.log(tLicense[0]);
    if (tLicense[0]) {
        message = "<b>This truck is already registered.</b>"
        document.getElementById("message").innerHTML

        return result;
    }

    // Checks if there are none or only one input
    if (license == "") {
        message = "<b>Field is missing input.</b>";
        document.getElementById("message").innerHTML += message;

        return result
    }

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
            console.log(response);
    
            // message = "<b>Truck sucessfully registered. Enter through Row A</b>"
            // document.getElementById("message").innerHTML = message;
          }
      };
    
      xhr.send(jsonPayload);
      }
      catch(err) {
        document.getElementById("message").innerHTML = err.message;
      }

    return result;
}

function isTruckRegisted(license) {
    let message = "";

    let tmp = {"license":license};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/getTruckByLicense' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    console.log("request prepped:" + jsonPayload);

    try 
    {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let response = xhr.responseText;
                console.log(response);
                
                let jsonObject = JSON.parse( response );

                let truckLicense = jsonObject.results[0]["license"];

                if (license == truckLicense) {
                    tLicense.push(true);
                    message = "<b>This truck is already registered.</b>"
                    document.getElementById("message").innerHTML
                }
                else
                    tLicense.push(false);
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) 
    {
        console.log(err);
        return null;
    }

    console.log(tLicense);

    return tLicense;
}