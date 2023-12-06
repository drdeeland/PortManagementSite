const urlBase = CONSTANT.urlBase;
const extension = CONSTANT.extension;

// Global Variable for checking
async function createPortEntry() {
    console.log("create func");

    let shipId = document.getElementById("shipId").value;
    let berthId = document.getElementById("berthID").value;

    let message = "";
    document.getElementById("message").innerHTML = message;

    let result;
    
    // Checks if the truck is registered already

    let tmp = {"shipId":shipId, "berthId":berthId};

    let jsonPayload = JSON.stringify(tmp);

    console.log(jsonPayload);

    let url = urlBase + '/createPortEntry' + extension;

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