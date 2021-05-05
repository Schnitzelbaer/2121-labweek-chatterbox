// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// You need to create the file 'base-url.js' in this folder       //
// with the content (replace some.server.url with your server):   //
// const baseURL="https://some.server.url"                        //   
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

// call loadMessages() on starting of the app to see what's in the database
// setInterval(() => {
//   loadMessages();
// }, 1000);


// button to clear one channel
$('#clear-button').click(() => {
  let channel = $('input#channel').val();
  let submitURL = baseURL + channel + "/clear";
  $.get(submitURL);
});

// document.querySelector("form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   var fullWidth = window.innerWidth;
//   var fullHeight = window.innerHeight;

//   var text = this.querySelector("input[type='text']").value;

//   var elem = document.createElement("div");
//   elem.textContent = text;
//   elem.style.color = "black";
//   elem.style.position = "absolute";
//   elem.style.left = Math.round(Math.random() * fullWidth) + "px";
//   elem.style.top = Math.round(Math.random() * fullHeight) + "px";
//   document.body.appendChild(elem);

// });


// attach an event handler for pressing the submit button
$('form').submit(function (event) {
  event.preventDefault();

  // get values from the input fields
  let channel = $('input#channel').val();
  let user = $('input#user').val();
  let message = $('input#message').val();

  // prepare values for sending it to the server. '.param' creates a serialized string representation from an object.
  let submitURL = baseURL + channel + '?' + $.param({ user: user, message: message });
  console.log(submitURL);

  // send the data to the server. 
  $.post(submitURL, function () {
    // this function will be called on success

    // clear form fields
    $('input#message').val('');
    $('input').focus();

    // update list of entries
    loadMessages();
  });
});


var mouseX = 0, mouseY = 0;
var xp = 0, yp = 0;
var n= 0;
var counterValue= document.getElementById("counter");
var fullWidth = window.innerWidth;
var fullHeight = window.innerHeight;
// loads all entries from the database and creates list items in the html document
function loadMessages() {
  let channel = $('input#channel').val();
  $.get(baseURL + channel, function (messages) {
    n = messages.length;
    counterValue.innerHTML=n
    $( "counter" ).append( "There are " + n + " secrets" +
     "Click to add more.");
  console.log(n);

    // clear list when the data is loaded from the server
    //$('ul#messages li').remove();

    //create a list item for each entry in the json object
    messages.forEach(function (message) {

      var elem = document.createElement("div");
      elem.textContent = message.message;
      elem.style.position = "absolute";
      elem.style.color = "#111"
      elem.style.left = Math.round(Math.random() * fullWidth) + "px";
      elem.style.top = Math.round(Math.random() * fullHeight) + "px";
      document.body.appendChild(elem);
   
      //$('<li></li>').text(JSON.stringify(message.message)).appendTo('ul#messages');
     
   
      
      })

    
      
    });
  };
  jQuery(document).ready(function () {

    $(document).mousemove(function (e) {
      mouseX = e.pageX - 30;
      mouseY = e.pageY - 30;
    });

    setInterval(function () {
      xp += ((mouseX - xp) / 6);
      yp += ((mouseY - yp) / 6);
      $("#circle").css({ left: xp + 'px', top: yp + 'px' });
    }, 20);

  });

