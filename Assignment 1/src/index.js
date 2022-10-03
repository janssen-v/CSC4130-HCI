window.addEventListener('load', () => {
   /* use document.addEventListener to add additional two functions for interactivity
 "mouseup" for stopPainting and "mousedown" for startPainting (10pts)
 */
   document.addEventListener('mousemove', sketch); // when mouse move, we draw the lines
   document.addEventListener('mousedown', startPainting);
   document.addEventListener('mouseup', stopPainting);
});

const canvas = document.querySelector('#canvas'); // remove # if canvas id not canvas

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

// use document.getElementById to get the slider and the corresponding value

var slider = document.getElementById("lineWidth");
var output_v = document.getElementById("curWidth");
output_v.innerHTML = slider.value;

//use document.getElementByName to get the line color
/* Not used in this implementation, instead we use QuerySelector 
   to find the checked element. */
var radio = document.getElementsByName("color");

// define the current mode : draw or earse
var tooltype = 'draw';

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to 
// trigger drawing
let paint = false; // shouldn't this be var paint since true and false set by function?

// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event) {
   coord.x = event.clientX - canvas.offsetLeft;
   coord.y = event.clientY - canvas.offsetTop;
}

// The following function trigeer the flag to start draw (10pts)
function startPainting(event) {
   paint = true;
}

// The following function trigeer the flag to stop draw (10pts)
function stopPainting() {
   paint = false;
}

function sketch(event) {
   // if !paint is true, this function does nothing. (3pts)

   if (!paint) {
      return;
   }

   // Prepare drawing calss (ctx.beginPath function) (3pts)
   ctx.beginPath();

   // assign the value of linewidth to ctx.lineWidth (3pts)
   ctx.lineWidth = slider.value;

   // Sets the end of the lines drawn
   // to a round shape.
   ctx.lineCap = 'round';

   getPosition(event) //confirm with professor if this is intended behaviour

   // judge whether you aim to draw or earse
   if (tooltype == 'erase') {
      // (2pts)
      // Set stroke colour to transparent black, and fills area with transparent black
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      ctx.clearRect(coord.x, coord.y, ctx.lineWidth, ctx.lineWidth);
   } else {
      // (5pts)
      /* check every element in radio and change the style to the selected color */

      // [Old Implementation]
      
      /*
      for (let i = 0; i < radio.length; i++) {
         if(radio[i].checked) {
            ctx.strokeStyle = radio[i].value;
         }
      }
      */

      // [New Implementation] Checks which radio element is checked, and gets its value 
      let radio_element = document.querySelector('input[name="color"]:checked');
      ctx.strokeStyle = radio_element.value;
   }

   // The cursor to start drawing
   // moves to this coordinate (ctx.moveTo function) (3pts)

   ctx.moveTo(coord.x, coord.y);

   // The position of the cursor
   // gets updated as we move the
   // mouse around. 

   // This command should be placed before moveTo to avoid connecting to previous line
   // getPosition(event);

   // A line is traced from start
   // coordinate to this coordinate (ctx.lineTo function) (3pts)

   ctx.lineTo(coord.x, coord.y);

   // call ctx.stroke to draw the line. (3pts)
   ctx.stroke();
}

/* define a fucntion that can change the draw or erase mode 
when user clicks the corresponding button on HTML (5pts)
*/
const drawButton = document.getElementById("draw");
const eraseButton = document.getElementById("erase");
drawButton.onclick = function() {switchMode(drawButton)};
eraseButton.onclick = function() {switchMode(eraseButton)};

function switchMode(button) {
   tooltype = button.value;
}


slider.oninput = function () {
   output_v.innerHTML = this.value;
}

