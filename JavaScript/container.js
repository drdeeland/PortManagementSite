const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

function createContainer() {
  console.log("create func");

  // Gets company name, destID, sourceID, storageID, and dest and source types from HTML file
  let company = document.getElementById("company").value;
  let destID = document.getElementById("destinationid").value;
  let sourceID = document.getElementById("sourceid").value;
  let storageID = document.getElementById("storageid").value;
  let destIsShip;
  let sourceIsShip;

  if (document.getElementById('destination1').checked) {
    destIsShip = true;
  } else if (document.getElementById('destination2').checked) {
    destIsShip = false;
  }

  if (document.getElementById('source1').checked) {
    sourceIsShip = true;
  } else if (document.getElementById('source2').checked) {
    sourceIsShip = false;
  }

  let tmp = {};

  if (sourceIsShip) {
    if (destIsShip) {
      tmp = {company, dest_sid:Number(destID), dest_tid:null, source_sid:Number(sourceID), source_tid:null, storage_id:Number(storageID), sourceIsShip, destIsShip};
    } else {
      tmp = {company, dest_sid:null, dest_tid:Number(destID), source_sid:Number(sourceID), source_tid:null, storage_id:Number(storageID), sourceIsShip, destIsShip};
    }
  }
  else {
    if (destIsShip) {
      tmp = {company, dest_sid:Number(destID), dest_tid:null, source_sid:null, source_tid:Number(sourceID), storage_id:Number(storageID), sourceIsShip, destIsShip};
    } else {
      tmp = {company, dest_sid:null, dest_tid:Number(destID), source_sid:null, source_tid:Number(sourceID), storage_id:Number(storageID), sourceIsShip, destIsShip};
    }
  }

  let jsonPayload = JSON.stringify(tmp);

  console.log(jsonPayload);

  let url = urlBase + '/createContainer' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let result;

  try {
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let response = xhr.responseText;
        console.log(response);

        document.getElementById("createStatus").innerHTML = "Container successfully created";
      }
  };

  xhr.send(jsonPayload);
  }
  catch(err) {
    document.getElementById("createStatus").innerHTML = err.message;
  }

  return result;
}

function deleteContainer() {
  console.log("delete func");

  let id = document.getElementById("containeridDelete").value;

  console.log("container_id: " + id);

  let tmp = {"container_id":id};
  let jsonPayload = JSON.stringify( tmp );
  
  let url = urlBase + '/deleteContainer' + extension;

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
  document.getElementById("deleteStatus").innerHTML = "Container successfully deleted";

  return result;
}

function getContainer() {
  console.log("retrieve func");

  let company = document.getElementById("companyName").value;

  console.log("company: " + company);

  let containerList = "";
  let containerTable = "<tr><th>Container ID</th><th>Source ID</th><th>Storage ID</th><th>Destination ID</th><th>Status</th></tr>";

  let tmp = {"company":company};
  let jsonPayload = JSON.stringify( tmp );
  
  let url = urlBase + '/retrieveContainer' + extension;

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

function updateContainer() {
  console.log("update func");

  // Gets company name, destID, sourceID, storageID, and dest and source types from HTML file
  let destID = document.getElementById("destinationidUpdate").value;
  let sourceID = document.getElementById("sourceidUpdate").value;
  let storageID = document.getElementById("storageidUpdate").value;
  let destIsShip;
  let sourceIsShip;
  let container_id = document.getElementById("containerid").value;

  if (document.getElementById('destination1Update').checked) {
    destIsShip = true;
  } else if (document.getElementById('destination2Update').checked) {
    destIsShip = false;
  }

  if (document.getElementById('source1Update').checked) {
    sourceIsShip = true;
  } else if (document.getElementById('source2Update').checked) {
    sourceIsShip = false;
  }

  let tmp = {};

  if (sourceIsShip) {
    if (destIsShip) {
      tmp = {dest_sid:Number(destID), dest_tid:null, source_sid:Number(sourceID), source_tid:null, storage_id:Number(storageID), sourceIsShip, destIsShip, container_id};
    } else {
      tmp = {dest_sid:null, dest_tid:Number(destID), source_sid:Number(sourceID), source_tid:null, storage_id:Number(storageID), sourceIsShip, destIsShip, container_id};
    }
  }
  else {
    if (destIsShip) {
      tmp = {dest_sid:Number(destID), dest_tid:null, source_sid:null, source_tid:Number(sourceID), storage_id:Number(storageID), sourceIsShip, destIsShip, container_id};
    } else {
      tmp = {dest_sid:null, dest_tid:Number(destID), source_sid:null, source_tid:Number(sourceID), storage_id:Number(storageID), sourceIsShip, destIsShip, container_id};
    }
  }

  let jsonPayload = JSON.stringify(tmp);

  console.log(jsonPayload);

  let url = urlBase + '/updateContainer' + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  let result;

  try {
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let response = xhr.responseText;
        console.log(response);

        document.getElementById("updateStatus").innerHTML = "Container successfully updated";
      }
  };

  xhr.send(jsonPayload);
}
catch(err) {
  document.getElementById("updateStatus").innerHTML = err.message;
}

return result;
}