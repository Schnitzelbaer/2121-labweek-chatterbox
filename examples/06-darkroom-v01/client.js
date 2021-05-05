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

  console.log("clientX: " + posX + " clientY: " + posY)

  if (i < 1) {
    i++
    let box = document.createElement('input'); // creates the element

    box.style.position = 'absolute';  // position it
    box.style.marginLeft = posX + "px";
    box.style.marginTop = posY + "px";  

    box.setAttribute("id", "textbox");

    document.body.appendChild(box); // add it as last child of body elemnt  

    // $(".textbox").focus("");
    document.getElementById("textbox").focus();
  }


}