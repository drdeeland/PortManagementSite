const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function setShipDeparture(){
    console.log("ship departs");
    // extra Credit:
        // Implement a queuing system. If berths are full and ships attempt to check in, the system should 
        // add them to a queue. This queue should automatically update when a berth becomes available. 

    let shipId = document.getElementById("shipid").value;
    // if (queue exists){
    //     let queuedship = "";
    // }

    let tmp = {"ship_id":shipId};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/leaveBerth' + extension;

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
        }
    };
    xhr.send(jsonPayload);
    }
        catch (err) 
    {
    console.log(err);
        return null;
    }
    document.getElementById("leaveBerthMessage").innerHTML = "Ship successfully left Berth.";

    return result;
}