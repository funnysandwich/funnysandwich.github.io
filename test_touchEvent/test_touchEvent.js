
let y ;
let y2, y2_flash;
let img;

function preload() {
  img = loadImage("data/img_sideText01.png");
}


function setup() {
  createCanvas(windowWidth, 500);
  y = 0;
  y2 = 0;
  y2_flash = 0.0;
}


function draw() {
  background(0);
  fill(255);
  text("movedY: "+movedY, 10, 10);
  text("y: "+y, 10, 25);
  text("mouseY: "+mouseY, 10, 40);
  text("pmouseY: "+pmouseY, 10, 55);
  text("y2_flash: "+y2_flash, 10, 70);
  text("y2: "+y2, 10, 85);


  image(img, 0, y2, windowWidth, windowWidth*(img.height/img.width));
  y2_flash += (0 - y2_flash) * 0.05;
   y2 += y2_flash;
}


function touchMoved() {
  y += movedY;

  y2_flash = mouseY - pmouseY;

 
}
