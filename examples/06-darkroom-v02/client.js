let channel = "tutorial";
let posY = "";
let posX = "";
i = 0;

$("#send-button").click(sendButtonHandler);
$("#request-button").click(requestButtonHandler);

function sendButtonHandler () {
  let text = $("#textarea").val();
  let url = baseURL + channel + "?" + $.param({text: text, user: "Simon"});
  console.log(url);
  $.post(url);

  // Löscht Textfeld nach senden
  $("#textarea").val("");
  // steuert Textfeld wieder an
  $("#textarea").focus("");
}

function requestButtonHandler () {
  // get messages from the server
  $.get(baseURL + channel, function (messages) {
    // messages is an array of all the messages in that channel
    console.log(messages);

    for (let i = 0; i < messages.length; i++) {
      console.log(messages[i].text);
    }
  });

}



document.addEventListener("click", printMousePos);

function printMousePos(event) {

  posY = event.clientY;
  posX = event.clientX;

  // if (i < 1) {
    i++
    let container = document.createElement('div'); // Umschliessender Div
    let textbox = document.createElement('input'); // Textfeld
    let containerheader = document.createElement('div'); // Draggeable Header

    container.style.position = 'absolute';  // position it
    container.style.marginLeft = posX + "px";
    container.style.marginTop = posY + "px";
    textbox.style.fontSize = "18px";
    textbox.style.fontFamily = "Inter-Medium, sans-serif";
    containerheader.style.width = "100%";
    containerheader.style.height = "30px";
    containerheader.style.backgroundColor = "burlywood";

    textbox.style.width = ((textbox.value.length + 1) * 8) + 'px';

    container.setAttribute("id", "container"+i);
    textbox.setAttribute("id", "textbox"+i);
    containerheader.setAttribute("id", "containerheader"+i);

    document.body.appendChild(container); // add it as last child of body element 

    document.getElementById("container"+i).appendChild(containerheader) // Header dem umschliessenden Div hinzufügen
    document.getElementById("container"+i).appendChild(textbox) // Textbox dem umschliessenden Div hinzufügen

    document.getElementById("textbox"+i).focus();
  }

  console.log("clientX: " + posX + " clientY: " + posY)
// }


// Make the DIV element draggable:
dragElement(document.getElementById("container"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}