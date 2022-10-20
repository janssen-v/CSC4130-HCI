var canvas = new fabric.Canvas("canvas");
var isDown, origX, origY, circle, rectangle, triangle;

//var colorinput = document.getElementById("favcolor");
var slider = document.getElementById("opacity");
var output_o = document.getElementById("slidervalue");
var colorinput = document.getElementById("color-select");
var shape = document.getElementById("shape-select")

output_o.innerHTML = slider.value;
colorvalue.innerHTML = colorinput.value;

var tooltype = "draw"; // Set default to draw




canvas.on('mouse:down', function (o) {
  isDown = true;
  var pointer = canvas.getPointer(o.e);
  origX = pointer.x;
  origY = pointer.y;

  if (tooltype == 'draw') {

    // Universal properties
    var colorFill = colorinput.value;
    var colorStroke = '#e0e0e0';
    var widthStroke = 3;

    // Use fabric.Circle/Rect/Triangle to define a circle/rectangle/triangle, respectively. Each shape is for 9pt
    circle = new fabric.Circle({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      radius: pointer.x - origX,
      angle: 0,
      fill: colorFill,
      stroke: colorStroke,
      strokeWidth: widthStroke,
      opacity: slider.value
    });

    rectangle = new fabric.Rect({
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - origX,
      height: pointer.y - origY,
      fill: colorFill,
      stroke: colorStroke,
      strokeWidth: widthStroke,
      opacity: slider.value
    });

    triangle = new fabric.Triangle({
      width: pointer.x - origX,
      height: pointer.y - origY,
      fill: colorFill,
      left: origX,
      top: origY,
      originX: 'left',
      originY: 'top',
      stroke: colorStroke,
      strokeWidth: widthStroke,
      opacity: slider.value
    });

    // add the defined shape into canvas (3pts).
    switch (shape.value) {
      case 'circle':
        canvas.add(circle);
        break;
      case 'rectangle':
        canvas.add(rectangle);
        break;
      case 'triangle':
        canvas.add(triangle);
        break;
    }
  }
});

canvas.on('mouse:move', function (o) {
  if (tooltype == 'draw') {
    if (!isDown) return;
    var pointer = canvas.getPointer(o.e);

    // Circle handling
    if (shape.value == 'circle') {
      var radius = Math.max(Math.abs(origY - pointer.y), Math.abs(origX - pointer.x)) / 2;
      //if (radius > circle.strokeWidth) {radius -= circle.strokeWidth / 2;}
      circle.set({ radius: radius });

      if (origX > pointer.x) {
        circle.set({ originX: 'right' });
      } else {
        circle.set({ originX: 'left' });
      }
      if (origY > pointer.y) {
        circle.set({ originY: 'bottom' });
      } else {
        circle.set({ originY: 'top' });
      }
      circle.setCoords();
    }

    // Rectangle handling
    if (shape.value == 'rectangle') {
      var width = Math.abs(origX - pointer.x);
      var height = Math.abs(origY - pointer.y);
      rectangle.set({ width: width, height: height });

      if (origX > pointer.x) {
        rectangle.set({ originX: 'right' });
      } else {
        rectangle.set({ originX: 'left' });
      }
      if (origY > pointer.y) {
        rectangle.set({ originY: 'bottom' });
      } else {
        rectangle.set({ originY: 'top' });
      }
      rectangle.setCoords();
    }

    // Triangle handling
    if (shape.value == 'triangle') {
      var width = Math.abs(origX - pointer.x);
      var height = Math.abs(origY - pointer.y);
      triangle.set({ width: width, height: height });

      if (origY > pointer.y) {
        triangle.set({ originY: 'bottom', angle: 0 });
        if (origX > pointer.x) {
          triangle.set({ originX: 'right' });
        } else {
          triangle.set({ originX: 'left' });
        }
      } else {
        triangle.set({ originY: 'bottom', angle: 180 });
        if (origX > pointer.x) {
          triangle.set({ originX: 'left' });
        } else {
          triangle.set({ originX: 'right' });
        }
      }
      triangle.setCoords()
    }

    // Make all objects unselectable
    /* 
     * This has to be located at the end of the draw function as the last drawn item is automatically selected
     * To prevent that, disable selection after object is drawn.
     */
    canvas.selection = false;
    canvas.forEachObject(function (object) {
      object.selectable = false;
      object.hasBorders = false;
      object.hasControls = false;
    });
    canvas.requestRenderAll();

  }

});

canvas.on('mouse:up', function (o) {
  isDown = false;
});


// Helper functions
function use_tool(tool) {
  tooltype = tool;

  // Enable move -> Make all objects selectable
  if (tooltype == "move") {
    canvas.selection = true;
    canvas.forEachObject(function (object) {
      object.selectable = true;
      object.hasBorders = true;
      object.hasControls = true;
    });
    canvas.requestRenderAll();
  }
  // Unselect all selected during move, as a precaution for edge cases
  if (tooltype == "draw") {
    canvas.selection = false;
    canvas.forEachObject(function (object) {
      object.selectable = false;
      object.hasBorders = false;
      object.hasControls = false;
    });
    canvas.requestRenderAll();
  }
}

function reset() {
  // if users click reset, clear all shapes in the interface (10pts)
  canvas.clear();
}

// Input Handling
slider.oninput = function () {
  output_o.innerHTML = this.value;
  canvas.forEachObject(function (object) {
    object.set('opacity', slider.value)
    canvas.requestRenderAll();
  });
}

colorinput.oninput = function () {
  colorvalue.innerHTML = this.value; //cannot have hyphens in js variables
}
