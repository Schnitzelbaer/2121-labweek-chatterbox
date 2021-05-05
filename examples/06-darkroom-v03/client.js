let channel = "livewriting";
let path = baseURL + channel;
let posY = "";
let posX = "";
let indexNumber = 0;
let activeTextField = "";

// $(document).click(sendButtonHandler);
// // $("#request-button").click(requestButtonHandler);

// function sendButtonHandler () {
//   let text = $("#textarea").val();
//   let url = baseURL + channel + "?" + $.param({text: text, user: "Simon"});
//   console.log(url);
//   $.post(url);

//   // // Löscht Textfeld nach senden
//   // $("#textarea").val("");
//   // // steuert Textfeld wieder an
//   // $("#textarea").focus("");
// }

// function requestButtonHandler () {
//   // get messages from the server
//   $.get(baseURL + channel, function (messages) {
//     // messages is an array of all the messages in that channel
//     console.log(messages);

//     for (let i = 0; i < messages.length; i++) {
//       console.log(messages[i].text);
//     }
//   });

// }


// Object auf Server leeren
$("#clear-object").click(clearObjects);

function clearObjects () {
  $.get("https://labweek.ava.hfg.design/" + channel + "/clear")
  location.reload();
}



// Nach reload alle Nachrichten laden
setInterval(() => {
  loadUnreadMessages();
  console.log("Messages fetched...")
}, 1000);

// remember the time of the latest message received
let lastMessageTime = 0;

// loads all entries since the last timestamp from the database 
function loadUnreadMessages() {
  let submitURL = path + "?" + $.param({ since: lastMessageTime });

  $.get(submitURL, function (messages) {
    if (messages.length > 0) console.log(messages);

    messages.forEach(function (message) {
      lastMessageTime = Math.max(lastMessageTime, message.timestamp);
      // console.log(lastMessageTime);

      // if (message.key === " ") message.key = "&nbsp;";

      // draw objects
      if ($('#container' + message.index).length === 0) {
        $('<div id="container' + message.index + '"></div>')
          .css('position', "absolute")
          .css('margin-left', message.posX+"px")
          .css('margin-top', message.posY+"px")
        // .html(message.text)
        .appendTo('body');
      }
      else {
      }

      if ($('#containerheader' + message.index).length === 0) {
      $('<div id="containerheader' + message.index + '"></div>')
        .css('width', "100%")
        .css('height', "30px")
        .css('background-color', "burlywood")
        // .html(message.text)
        .appendTo("#container" + message.index);
      }
      else {
      }

      if ($('#textbox' + message.index).length === 0) {
        $('<input id="textbox' + message.index + '">')
          .css('font-size', "18px")
          .css('font-family', "Inter-Medium, sans-serif")
          .css('width', ((message.text.length + 1) * 8) + "px")
          .html(message.text)
          .appendTo("#container" + message.index);
      }
      else {
      }

    });
  });
}





// Detect which text field is active
$(document).click(function(event) {
  let specificTextField = $(event.target).attr('id');
  activeTextField = specificTextField;
  console.log("active Text Field: " + activeTextField);
});

// Detect keypress and adjust textfield-size of active text-field according to text
$(document).on('input', function() {
  let inputTextLength = "";

  console.log("Taste gedrückt");
  if (activeTextField == undefined) {
  }
  else {
    inputTextLength = $('#' + activeTextField).val();
    console.log("inputTextLength: " + inputTextLength)
    $('#' + activeTextField).css('width', ((inputTextLength.length + 1) * 8) + "px");
  }

  // Update text & width of text field on server
  $.get(baseURL + channel, function (messages) {
    // messages is an array of all the messages in that channel
    console.log(messages);

      console.log(messages[0]);

      // An den Server senden
      let text = $("textbox"+indexNumber).val();
      console.log("Text: " + text);
      let url = baseURL + channel + "?" + $.param({index: indexNumber, text: text, user: "Simon", posX: posX, posY: posY});
      $.post(url);
  });
});

document.addEventListener("contextmenu", createNewTextBox);

function createNewTextBox(event) {
  // Context Menu unterbinden
  event.preventDefault();
  
  // indexNumber Variable zurücksetzen
  indexNumber = 0;
  // get messages from the server
  $.get(baseURL + channel, function (messages) {
    // messages is an array of all the messages in that channel
    console.log(messages);

    // Herausfinden was die höchste Index-Nummer auf dem Server ist und 
    // welche Index-Nummer die neue Textbox dementsprechend bekommen soll
    for (let i = 0; i < messages.length; i++) {
      let indexCache = messages[i].index;
      console.log("index Cache: " + indexCache);
      if (indexCache > indexNumber) {
        indexNumber = indexCache;
      }

      indexNumber++
      console.log("LOOP COMPLETED - index Number: " + indexNumber);
    }
    
    


      loadUnreadMessages();
      
    
      // Neues textfeld erstellen und an den Server senden
      posY = event.clientY;
      posX = event.clientX;
    
    
      let container = document.createElement('div'); // Umschliessender Div
      let span = document.createElement('SPAN'); // Textfeld umschliessender Span
      let textbox = document.createElement('input'); // Textfeld
      let containerheader = document.createElement('div'); // Draggeable Header
    
      container.style.position = 'absolute';  // position it
      container.style.marginLeft = posX + "px";
      container.style.marginTop = posY + "px";
      textbox.style.fontSize = "21px";
      textbox.style.fontFamily = "Roboto-Bold, sans-serif";
      containerheader.style.width = "100%";
      containerheader.style.height = "30px";
      containerheader.style.backgroundColor = "burlywood";
    
      // Das Textfeld der Breite des eingetippten Textes anpassen
      textbox.style.width = ((textbox.value.length + 1) * 8) + 'px';
    
      container.setAttribute("id", "container"+indexNumber);
      span.setAttribute("id", "size"+indexNumber);
      textbox.setAttribute("id", "textbox"+indexNumber);
      containerheader.setAttribute("id", "containerheader"+indexNumber);
    
      document.body.appendChild(container); // add it as last child of body element 
    
      document.getElementById("container"+indexNumber).appendChild(containerheader) // Header dem umschliessenden Div hinzufügen
      document.getElementById("container"+indexNumber).appendChild(span) // Textbox dem umschliessenden Div hinzufügen
      document.getElementById("size"+indexNumber).appendChild(textbox) // Textbox dem umschliessenden Div hinzufügen
    
      document.getElementById("textbox"+indexNumber).focus();
    
      // An den Server senden
      let text = $("textbox"+indexNumber).val();
      let url = baseURL + channel + "?" + $.param({index: indexNumber, text: text, user: "Simon", posX: posX, posY: posY});
      console.log(url);
      $.post(url);
    
      console.log("Object Added...");
    
      // indexNumber++
    
  });
}







// // Make the DIV element draggable:
// dragElement(document.getElementById("container"));

// function dragElement(elmnt) {
//   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
//   if (document.getElementById(elmnt.id + "header")) {
//     // if present, the header is where you move the DIV from:
//     document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

//   function dragMouseDown(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // get the mouse cursor position at startup:
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     document.onmouseup = closeDragElement;
//     // call a function whenever the cursor moves:
//     document.onmousemove = elementDrag;
//   }

//   function elementDrag(e) {
//     e = e || window.event;
//     e.preventDefault();
//     // calculate the new cursor position:
//     pos1 = pos3 - e.clientX;
//     pos2 = pos4 - e.clientY;
//     pos3 = e.clientX;
//     pos4 = e.clientY;
//     // set the element's new position:
//     elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
//     elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
//   }

//   function closeDragElement() {
//     // stop moving when mouse button is released:
//     document.onmouseup = null;
//     document.onmousemove = null;
//   }
// }