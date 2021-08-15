
let y ;
let y2, y2_flash;
let y3;
let img;
let open_y2_flash_easing = true;

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
  text("y2_flash:"+y2_flash, 10, 70);
  text("y2: "+y2, 10, 85);
  text("open_y2_flash_easing: "+open_y2_flash_easing, 10, 100);
  text("y3: "+y3, 10, 115);


  image(img, 0, y2, windowWidth, windowWidth*(img.height/img.width));
  if (open_y2_flash_easing) {
    y2_flash += (0 - y2_flash) * 0.05;
    if (abs(y2_flash) < 0.1) y2_flash = 0;
  } else {
    y2_flash = mouseY - pmouseY;
  }
  y2 += y2_flash;
}


function touchMoved(event) {
  y += movedY;
  y3 = event.delta;

  y2_flash = mouseY - pmouseY;
}

function touchStarted() {
  open_y2_flash_easing = false;
}

function touchEnded() {
  open_y2_flash_easing = true;
}
