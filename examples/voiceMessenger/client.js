// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

let channel = "canvas";
let userList = ["Bär", "Ameise", "Hund", "Krokodil", "schneemann", "Marienkäfer", "Schlange", "Schildkröte", "Hai", "Robbe", "Giraffe"];
let user = "bananenbär";

let lastMessage;
let lastUser;
let lastTimestamp;
let lastPitch;
let lastRate;
let lastSpeaker;
// let newVoices = [1, 4, 9, 15, 38, 42];
let newVoices;

//////////////////////////// Web speech stuff
let synth = window.speechSynthesis;
let pitchVoice;
//pitchVoice = 1;
let rateVoice;
//rateVoice = 1;
//let selectedVoice = 4;
let rateMouse;
let pitchMouse;

//////////////////////////// p5 stuff
let cursorColorX;
let cursorColorY;

//let pTyping;
let chatMessages = [];
// let pMessageFix;
let chat = [];




function setup() {
  //user = userList[random(0, userList.length)];
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-999")

  //pTyping = createInput("...typing");
}

function draw() {
  background(255);
  pitchMouse = Math.floor(map(mouseY, 0, height, 2, 0.5) * 100) / 100;
  rateMouse = Math.floor(map(mouseX, width, 0, 1.2, 0.8) * 100) / 100;

  cursorColorX = map(mouseX, 0, width, 0, 255);
  cursorColorY = map(mouseY, 0, height, 0, 255);

  noStroke();
  fill(cursorColorX, cursorColorY - cursorColorX, cursorColorY, 95);
  circle(mouseX, mouseY, width / 7, width / 7);

  let xPos = mouseX;
  let yPos = mouseY;

  let inputBox = document.getElementById('message');
  inputBox.style.position = "absolute";
  inputBox.style.left = xPos - 75 + 'px';
  inputBox.style.top = yPos - 10 + 'px';
  //pTyping.position(mouseX, mouseY);

  // for (let i = 0; i < chat.length; i++) {
  //   chatColorX = map(chat[i].x, 0, width, 0, 255);
  //   chatColorY = map(chat[i].y, 0, width, 0, 255);
  //   noStroke();
  //   fill(chatColorX, chatColorY - chatColorX, chatColorY);
  //   ellipse(chat[i].x, chat[i].y, height/4, height/4);
  // }

  for (let i = 0; i < chat.length; i++) {
    chatColorX = map(chat[i].x, 0, width, 0, 255);
    chatColorY = map(chat[i].y, 0, width, 0, 255);
    noStroke();
    fill(chatColorX, chatColorY - chatColorX, chatColorY, 95);
    ellipse(chat[i].x, chat[i].y, height / 4, height / 4);
  }


  // console.log("pitchMouse: " + pitchMouse);
  // console.log("rateMouse: " + rateMouse);
  newVoicesSelector();
}








function newVoicesSelector() {
  // console.log("mouseX: " +
  //   mouseX + " mouseY: " +
  //   mouseY);
  if (mouseX < width / 6) {
    newVoices = 7;
  } else if (mouseX > width / 6 && mouseX < width / 6 * 2) {
    newVoices = 10;
  } else if (mouseX > width / 6 * 2 && mouseX < width / 6 * 3) {
    newVoices = 11;
  } else if (mouseX > width / 6 * 3 && mouseX < width / 6 * 4) {
    newVoices = 37;
  } else if (mouseX > width / 6 * 4 && mouseX < width / 6 * 5) {
    newVoices = 40;
  } else if (mouseX > width / 6 * 5) {
    newVoices = 41;
  };
}

function mouseClicked() {


  // for (let i = 0; i < chat.length; i++) {
  //   chatMessages = createP(chat[i].message);
  //   chatMessages.position(chat[i].x, chat[i].y)
  // }

}


// call loadMessages() on starting of the app to see what's in the database
setInterval(() => {
  loadMessages();
  // chatMessages.remove();

  for (let i = 0; i < chatMessages.length; i++) {
    chatMessages[i].remove();
  }

  chatMessages = [];

  for (let i = 0; i < chat.length; i++) {
    let chatMessage = createP(chat[i].message);
    chatMessage.position(chat[i].x, chat[i].y);
    chatMessage.class("chat-message");
    // console.log(chatMessage)
    chatMessage.elt.addEventListener("mouseover", function(event) {
      console.log("Trying to speak...");
      speak(chat[i].message);
    });


    chatMessages.push(chatMessage);
  };
  // console.log(chat);
  // console.log(chatMessages);
}, 1000);

// setInterval(() => {
//   speak();
// }, 1000);


// button to clear one channel
$('#clear-button').click(() => {
  let channel = $('input#channel').val();
  let submitURL = baseURL + channel + "/clear";
  $.get(submitURL);
});


$('#speak-button').click(() => {
  speak();
});


// attach an event handler for pressing the submit button
$('form').submit(function(event) {
  event.preventDefault();
  // get values from the input fields
  // let channel = $('input#channel').val();
  //let user = $('input#user').val();
  let message = $('input#message').val();
  // prepare values for sending it to the server. '.param' creates a serialized string representation from an object.
  let submitURL = baseURL + channel + '?' + $.param({
    user: user,
    message: message,
    pitchVoice: pitchMouse,
    rateVoice: rateMouse,
    speaker: newVoices,
    x: mouseX,
    y: mouseY,
  });
  console.log(submitURL);
  // send the data to the server.
  $.post(submitURL, function() {
    // this function will be called on success
    // clear form fields
    $('input#message').val('');
    $('input').focus();
    // update list of entries
    loadMessages();
  });
});


$(document).on('keypress', function(e) {
  if (e.which == 13) {
    event.preventDefault();
    // get values from the input fields
    //let channel = $('input#channel').val();
    //let user = $('input#user').val();
    let message = $('input#message').val();
    // prepare values for sending it to the server. '.param' creates a serialized string representation from an object.
    let submitURL = baseURL + channel + '?' + $.param({
      user: user,
      message: message,
      pitchVoice: pitchMouse,
      rateVoice: rateMouse,
      speaker: newVoices,
      x: mouseX,
      y: mouseY,
    });
    console.log(submitURL);
    // send the data to the server.
    $.post(submitURL, function() {
      // this function will be called on success
      // clear form fields
      $('input#message').val('');
      $('input').focus();
      // update list of entries
      loadMessages();
    });
  }
});


// loads all entries from the database and creates list items in the html document
function loadMessages() {
  //let channel = $('input#channel').val();
  $.get(baseURL + channel, function(messages) {
    lastMessage = messages[messages.length - 1]["message"];
    lastUser = messages[messages.length - 1]["user"];
    lastTimestamp = messages[messages.length - 1]["timestamp"];
    lastPitch = messages[messages.length - 1]["pitchVoice"];
    lastRate = messages[messages.length - 1]["rateVoice"];
    lastSpeaker = messages[messages.length - 1]["speaker"];
    // clear list when the data is loaded from the server
    $('ul#messages li').remove();
    // create a list item for each entry in the json object
    messages.forEach(function(message) {
      // chat.push(message);
      $('<li></li>').text(JSON.stringify(message)).appendTo('ul#messages');
    });

    for (let i = 0; i < messages.length; i++) {
      chat[i] = messages[i];
    }
  });
  // console.log(messages[messages.length]);
  // console.log(messages[messages.length - 1]["message"]);
}


$(document).click(function() {
  read();
});


function read() {
  console.log("trying to read ------------");
  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  console.log(message.value);
  if (message.value !== '') {
    console.log(newVoices, pitchMouse, rateMouse);

    var utterThis = new SpeechSynthesisUtterance(message.value);
    utterThis.voice = synth.getVoices()[newVoices];
    // utterThis.voice = synth.getVoices()[9];
    // lastPitch = 1;
    // lastRate = 1;
    utterThis.pitch = pitchMouse;
    utterThis.rate = rateMouse;
    synth.speak(utterThis);
  }
}


//let textMessage = document.getElementById("chatmessage");




function speak(msg) {
  msg = msg || lastMessage;

  if (synth.speaking) {
    console.error('speechSynthesis.speaking');
    return;
  }
  if (lastMessage !== '') {
    var utterThis = new SpeechSynthesisUtterance(msg);
    utterThis.voice = synth.getVoices()[lastSpeaker];
    // utterThis.voice = synth.getVoices()[9];
    // lastPitch = 1;
    // lastRate = 1;
    utterThis.pitch = lastPitch;
    utterThis.rate = lastRate;
    synth.speak(utterThis);
  }
}


inputForm.onsubmit = function(event) {
  event.preventDefault();

  speak();

  inputTxt.blur();
}