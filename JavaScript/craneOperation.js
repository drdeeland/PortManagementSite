const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function setContainerStatus(){
    let id = document.getElementById("sourceid").value;
    let isShip;
  
    if (document.getElementById('source1').checked) {
      isShip = true;
    } else if (document.getElementById('source2').checked) {
      isShip = false;
    }
  
    // let containerList = "";
    // let containerTable = "<tr><th>Container ID</th><th>Company</th><th>Source ID</th><th>Storage ID</th><th>Destination ID</th><th>Status</th></tr>";
  
    tmp = {sourceId:id, isShip};
    let jsonPayload = JSON.stringify( tmp );

    console.log(jsonPayload);
    
    let url = urlBase + '/updateContainerStatus' + extension;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    let result;

    try {
        xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = xhr.responseText;
            console.log(response);

            //document.getElementById("updateContainerStatus").innerHTML = "Containers successfully updated";
        }
    };

    xhr.send(jsonPayload);
    }
    catch(err) {
    document.getElementById("updateStatus").innerHTML = err.message;
    }

    return result;
}

function getSourceContainers() {
    // console.log("retrieve func");

    let id = document.getElementById("sourceid");
    let isShip;
  
    if (document.getElementById('source1').checked) {
      isShip = true;
    } else if (document.getElementById('source2').checked) {
      isShip = false;
    }
  
    let containerList = "";
    let containerTable = "<tr><th>Container ID</th><th>Company</th><th>Source ID</th><th>Storage ID</th><th>Destination ID</th><th>Status</th></tr>";
  
      tmp = {sourceId:id, isShip:isShip};
    let jsonPayload = JSON.stringify( tmp );
    
    let url = urlBase + '/getSourceContainers' + extension;
  
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
  
          if (jsonObject.error != null) {
            console.log(jsonObject.error);
          }
  
          for (let i = 0; i < jsonObject.results.length; i++) 
          {
            containerList += jsonObject.results[i];
  
            containerTable += "<tr><td>Container: " + jsonObject.results[i]["container_id"] + "</td>"

            containerTable += "<td>Company: " + jsonObject.results[i]["company"] + "</td>"
            
            if (jsonObject.results[i]["source_sid"] == "") {
              containerTable += "<td>Truck: " + jsonObject.results[i]["source_tid"] + "</td>"
            }
            else {
              containerTable += "<td>Ship: " + jsonObject.results[i]["source_sid"] + "</td>"
            }
  
            containerTable += "<td>Storage: " + jsonObject.results[i]["storage_id"] + "</td>"
            
            if (jsonObject.results[i]["dest_sid"] == "") {
              containerTable += "<td>Truck: " + jsonObject.results[i]["dest_tid"] + "</td>"
            }
            else {
              containerTable += "<td>Ship: " + jsonObject.results[i]["dest_sid"] + "</td>"
            }
  
            containerTable += "<td>" + jsonObject.results[i]["location"] + "</td></tr>"
          }
  
          document.getElementById("containers").innerHTML = containerTable;
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
  