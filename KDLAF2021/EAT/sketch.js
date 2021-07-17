var img_poster_bowl00, img_poster_bowl01;
var img_poster_sideText00;


var is_pc;
var open_info;






function preload() {
    img_poster_bowl00 = loadImage("data/img_poster_bowl00.png");
    img_poster_bowl01 = loadImage("data/img_poster_bowl01.png");
    img_poster_sideText00 = loadImage("data/img_poster_sideText00.png");
}






function setup() {
    createCanvas(windowWidth, windowHeight);
    
    if(windowWidth > windowHeight)  is_pc = true;
    else  id_pc = false;
  
    open_info = true;
}






function draw() {
    background(255, 128, 128);
    
    iamge(img_poster_sideText00, mouseX, -100);
    
    
    if(open_info){
        fill(0, 150);
        noStroke();
        rect(0, 0, 200, 300);
        fill(255);
        textSize(12);
        text("fps:" + nfc(frameRate(), 1), 10, 20);
        text("screenWidth:" + screen.width, 10, 35);
        text("screenHeight:" + screen.height, 10, 50);
        text("windowWidth:" + windowWidth, 10, 65);
        text("windowHeight:" + windowHeight, 10, 80);
        text("width:" + width, 10, 95);
        text("height:" + height, 10, 110);
    }
    
    
    textSize(20);
    fill(0);
    text("你好呀繁體字", 500, 500);
  



}





function keyPressed() {
    if (key === 'i' || key === 'I') {
        open_info = !open_info;
    }
}






function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(windowWidth > windowHeight)  is_pc = true;
    else  id_pc = false;
}


