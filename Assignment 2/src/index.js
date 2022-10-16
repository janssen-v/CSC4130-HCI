window.addEventListener('load', ()=>{
    document.addEventListener('click', click);    
    document.addEventListener('mousedown', startdrawormove);
    document.addEventListener('mouseup', stopdrawormove);
    document.addEventListener('mousemove', sketch);
});

var canvas = new fabric.Canvas("canvas");
var isDown, origX, origY;

var colorinput = document.getElementById("favcolor");
var slider = document.getElementById("opacity");
var output_o = document.getElementById("value");
var colorvalue = document.getElementById('colorVal');

output_o.innerHTML = slider.value;
colorvalue.innerHTML = colorinput.value;

var tooltype = "draw";


function click(event){ 
  // if users click reset, clear all shapes in the interface (10pts)

  /* your code is here */

}

function startdrawormove(event) {
  isDown = true;
    var pointer = canvas.getPointer(event); // get mouse position
    origX = pointer.x;
    origY = pointer.y;
    if (tooltype=="draw"){
      //Use fabric.Circle/Rect/Triangle to define a circle/rectangle/triangle, respectively. Each shape is for 9pts
     /* your code is here */

    // add the defined shape into canvas (3pts).
    /* your code is here */

    }
    else if (tooltype=="move"){
      // make all shapes selectable (4pts).
    /* your code is here */
    }
    
}

function stopdrawormove(event){
  isDown = false;
}

function sketch(event){
  if (tooltype=="draw"){
  if (!isDown) return;
    var pointer = canvas.getPointer(event); 
    if (shapetype == 'Circle'){
      // set the circle radius based on the mouse position (6pts)
      /* your code is here */
    }
    else if (shapetype == 'Rect') {
      // set the width and height of rectangle or triangle based on the mouse position (6pts)
      /* your code is here */
    }
    
  }
  else if (tooltype == "move"){
    var pointer = canvas.getPointer(event);

    // move the selected shape  hint: use getActiveObject() function(8pts)
    /* your code is here */
  }

  // get all shapes from canvas (6pts) and change the opacity of each shape (6pts)

  /* your code is here */
}

function select_shape(shape){
  shapetype = shape.value;
}

function use_tool(tool){
  tooltype = tool;
}

slider.oninput = function() {
  output_o.innerHTML = this.value;
}

colorinput.oninput = function() {
  colorvalue.innerHTML = this.value;
}


