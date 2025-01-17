let channel = "tutorial";

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