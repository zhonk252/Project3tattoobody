console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

//use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: 'keyzsXmrpyYLITyeJ' }).base('appxVIsMuLMtIWJ4v');

//get our collection base, select all records
//specify functions that will receive the data
base("lettered").select({}).eachPage(gotPageOfLetters, gotAllLetters);

// an empty array to hold our song data
var letters = [];

// callback function that receives our data
function gotPageOfLetters(records, fetchNextPage) {
    console.log("gotPageOfLetters()");
    // add the records from this page to our books array
    letters.push(...records);
    // request more pages
    fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllLetters(err) {
    console.log("gotAllLetters()");

    // report an error, you'd want to do something better than this in production
    if (err) {
        console.log("error loading data");
        console.error(err);
        return;
    }

    // call functions to log and show the songs
    consoleLogLetters();
    showLetters();
}

// just loop through the songs and console.log them
function consoleLogLetters() {
    console.log("consoleLogLetteres()");
    letters.forEach((letter) => {
        console.log("Letter:", letter);
    });
}

// loop through our airtable data, create elements
function showLetters() {
    console.log("showLetters()");
    letters.forEach((letter) => {

        var letteredImg = document.createElement("img");
        letteredImg.classList.add("tattoo-image");
        letteredImg.src = letter.fields.Attachments[0].url;
        document.querySelector("#img-list").append(letteredImg);

    });
}


interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
   
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener