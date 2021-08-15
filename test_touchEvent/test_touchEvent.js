
let y ;
let y2;
function setup() {
  createCanvas(500, 500);
  y = 0;
  y2 = 0;
}


function draw() {
  background(0);
  fill(255);
  text("movedY: "+movedY, 10, 10);
  text("y: "+y, 10, 25);
  text("mouseY: "+mouseY, 10, 40);
  text("pmouseY: "+pmouseY, 10, 55);
  text(mouseY - pmouseY, 10, 70);
  text("y2: "+y2, 10, 85);
}


function touchMoved() {
  y += movedY;
  y2 += mouseY - pmouseY;
}
