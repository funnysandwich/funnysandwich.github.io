var img_bowl00, img_bowl01;
var img_E, img_A, img_T;
var img_sideText00;


var sideW;
var scaleRate;

var scrollVar;


var is_pc;
var open_info;






function preload() {
  img_bowl00 = loadImage("data/img_bowl00.png");
  img_bowl01 = loadImage("data/img_bowl01.png");
  img_sideText00 = loadImage("data/img_sideText00.png");
  img_E = loadImage("data/img_E.png");
  img_A = loadImage("data/img_A.png");
  img_T = loadImage("data/img_T.png");
}






function setup() {
  createCanvas(windowWidth, windowHeight);



  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;


  sideW = 268.0;
  scaleRate = (width-sideW)/img_bowl00.width;


  img_sideText00.resize(sideW, sideW*img_sideText00.height/img_sideText00.width);
  img_E.resize(159.3, 209.85);
  img_A.resize(205.15, 209.85);
  img_T.resize(171.94, 209.85);


  open_info = true;
}






function draw() {
  if (open_info)  background(60);
  else  background(0);

  image(img_sideText00, width-img_sideText00.width, height-img_sideText00.height);
  image(img_bowl00, 0, height-((min(scaleRate, 0.88)*img_bowl00.height)/3.0*2), width-sideW, scaleRate*img_bowl00.height);



  if (open_info) {
    fill(0, 150);
    noStroke();
    rect(0, 0, 200, 300);
    fill(255);
    textSize(12);
    text("fps: " + nfc(frameRate(), 1), 10, 20);
    text("screenWidth: " + screen.width, 10, 35);
    text("screenHeight: " + screen.height, 10, 50);
    text("windowWidth: " + windowWidth, 10, 65);
    text("windowHeight: " + windowHeight, 10, 80);
    text("width: " + width, 10, 95);
    text("height: " + height, 10, 110);
    text("------------", 10, 125);
    text("scaleRate: "+nfc(scaleRate, 6), 10, 140);
    text("scrollVar: "+scrollVar,10,155);
  }






  image(img_E, (width-sideW)*0.236, height*0.115, min(scaleRate, 0.88)*img_E.width, min(scaleRate, 0.88)*img_E.height);
  image(img_A, (width-sideW)*0.442, height*0.352, min(scaleRate, 0.88)*img_A.width, min(scaleRate, 0.88)*img_A.height);
  image(img_T, (width-sideW)*0.693, height*0.212, min(scaleRate, 0.88)*img_T.width, min(scaleRate, 0.88)*img_T.height);
  image(img_bowl01, 0, height-((min(scaleRate, 0.88)*img_bowl01.height)/3.0*2), width-sideW, scaleRate*img_bowl01.height);
}





function keyPressed() {
  if (key === 'i' || key === 'I') {
    open_info = !open_info;
  }
}





function mouseWheel(event) {
  //move the square according to the vertical scroll amount
  scrollVar = event.delta;
  //uncomment to block page scrolling
  //return false;
}






function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;

  scaleRate = (width-sideW)/img_bowl00.width;
}


