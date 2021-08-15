
let y ;
let y2;
let img;

function preload() {
  img = loadImage("data/img_sideText01.png");
}


function setup() {
  createCanvas(windowWidth, 500);
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


  image(img, 0, y2, windowWidth, windowWidth*(img.height/img.width));
}


function touchMoved() {
  y += movedY;
  y2 += mouseY - pmouseY;
}
