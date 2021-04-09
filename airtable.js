console.log("Hello, Airtable");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({ apiKey: 'keyzsXmrpyYLITyeJ' }).base('appxVIsMuLMtIWJ4v');

base("lettered").select({}).eachPage(gotPageOfLetters, gotAllLetters);

var letters = [];

function gotPageOfLetters(records, fetchNextPage) {
    console.log("gotPageOfLetters()");
    letters.push(...records);
    fetchNextPage();
}

function gotAllLetters(err) {
    console.log("gotAllLetters()");
    if (err) {
        console.log("error loading data");
        console.error(err);
        return;
    }

    consoleLogLetters();
    showLetters();
}

function consoleLogLetters() {
    console.log("consoleLogLetteres()");
    letters.forEach((letter) => {
        console.log("Letter:", letter);
    });
}

function showLetters() {
    console.log("showLetters()");
    for(var i = 0; i < 100; i++){
       var letteredImg = document.createElement("img");
      letteredImg.classList.add("tattoo-image");
      letteredImg.classList.add("hvr-grow");
      letteredImg.classList.add("crop");
      
      letteredImg.src = letters[i].fields.Attachments[0].url;
      document.querySelector("#img-list").append(letteredImg);
      letters[i].showing = true;
      letteredImg.addEventListener("click",function(){
        // console.log(event);
        let filtered = letters.filter(a => a.showing!== true);
        
        var image = event.currentTarget;
        // console.log(image);
        let length = filtered.length;

        // console.log(length);
        let randomNumber = Math.round(Math.random()*length)
        console.log(randomNumber);

        let newImage = filtered[randomNumber];
        letters.find(a => a.fields.Attachments[0].url == image.src).showing = false;
        image.src = newImage.fields.Attachments[0].url;
        
        newImage.showing = true;
        
        
      })
    }
    
}

// interact('.draggable')
//   .draggable({
//     // enable inertial throwing
//     inertia: true,
//     // keep the element within the area of it's parent
   
//     // enable autoScroll
//     autoScroll: true,

//     listeners: {
//       // call this function on every dragmove event
//       move: dragMoveListener,

//       // call this function on every dragend event
//       end (event) {
//         var textEl = event.target.querySelector('p')

//         textEl && (textEl.textContent =
//           'moved a distance of ' +
//           (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
//                      Math.pow(event.pageY - event.y0, 2) | 0))
//             .toFixed(2) + 'px')
//       }
//     }
//   })

// function dragMoveListener (event) {
//   var target = event.target
//   // keep the dragged position in the data-x/data-y attributes
//   var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
//   var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

//   // translate the element
//   target.style.webkitTransform =
//     target.style.transform =
//       'translate(' + x + 'px, ' + y + 'px)'


//   // update the posiion attributes
//   target.setAttribute('data-x', x)
//   target.setAttribute('data-y', y)
  
  
// }
// // this function is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener


var elem = document.querySelector('.draggable');
var draggie = new Draggabilly( elem, {
        // containment: '#All'
});


function resetBody() {
    document.querySelector("#drag").style.top = 0
    document.querySelector("#drag").style.left = 0
}
//if the element's x or y position out of the canvas size, start alarm and refresh page buttom show up
