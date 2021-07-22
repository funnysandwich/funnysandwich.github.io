/*
 --------------------------
 test01
 
 核心跨线算法直接用原来的方法，结果不行，4个光球就跑不动了，电脑chrome勉强达到30fps，Firefox只有十几
 
 
 --------------------------
 test02
 
 问题出在shape的贴图数量太多
 把光球的texture整合成一整个就没问题了
 注意第一个vertex要设立在光球原点，不然vertex变成内角的话，贴图会有bug
 
 
 
 */



var walls = [];
let lights = [];
var rayDetail;
var lightCount;


var PG;


var img_bowl00, img_bowl01;
var img_E, img_A, img_T;
var img_light = [];
var img_sideText00;

var sideW;
var scaleRate;
var wait_side;

var node_walls_E=[];
var node_walls_A=[];
var node_walls_A2=[];
var node_walls_T=[];
var node_walls_E_ori=[];
var node_walls_A_ori=[];
var node_walls_A2_ori=[];
var node_walls_T_ori=[];


var scrollVar, scrollFlash;


var is_pc;
var open_info;






function preload() {
  img_bowl00 = loadImage("data/img_bowl00.png");
  img_bowl01 = loadImage("data/img_bowl01.png");
  img_sideText00 = loadImage("data/img_sideText00.png");
  img_sideText01 = loadImage("data/img_sideText01.png");
  img_E = loadImage("data/img_E.png");
  img_A = loadImage("data/img_A.png");
  img_T = loadImage("data/img_T.png");
  img_light.push(loadImage("data/light_Y3.png"));
  img_light.push(loadImage("data/light_R3.png"));
  img_light.push(loadImage("data/light_Y1.png"));
  img_light.push(loadImage("data/light_Y2.png"));

  node_walls_E_ori = loadStrings('data/walls_E.txt');
  node_walls_A_ori = loadStrings('data/walls_A.txt');
  node_walls_A2_ori = loadStrings('data/walls_A2.txt');
  node_walls_T_ori = loadStrings('data/walls_T.txt');
}






function setup() {
  createCanvas(windowWidth, windowHeight);
  PG = createGraphics(width, height, WEBGL);
  PG.textureMode(IMAGE);


  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;


  sideW = 268.0;
  scaleRate = (width-sideW)/img_bowl00.width;
  scrollFlash = 0;
  scrollVar = 0;
  rayDetail = 360;
  lightCount = 0;
  wait_side = 0;


  img_sideText00.resize(sideW, sideW*img_sideText00.height/img_sideText00.width);
  img_sideText01.resize(sideW, sideW*img_sideText01.height/img_sideText01.width);
  img_E.resize(159.3, 209.85);
  img_A.resize(205.15, 209.85);
  img_T.resize(171.94, 209.85);
  for (let i=0; i<img_light.length; i++) {
    img_light[i].resize(500, 500);
  }


  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.236, height*0.115);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.442, height*0.352);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.442, height*0.352);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.693, height*0.212);
  }

  for (let i=0; i<node_walls_E.length; i++) {
    walls[i] = new Wall(node_walls_E[i%node_walls_E.length], node_walls_E[(i+1)%node_walls_E.length]);
  }
  for (let i=0; i<node_walls_A.length; i++) {
    walls[node_walls_E.length+i] = new Wall(node_walls_A[i%node_walls_A.length], node_walls_A[(i+1)%node_walls_A.length]);
  }
  for (let i=0; i<node_walls_A2.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+i] = new Wall(node_walls_A2[i%node_walls_A2.length], node_walls_A2[(i+1)%node_walls_A2.length]);
  }
  for (let i=0; i<node_walls_T.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+node_walls_A2.length+i] = new Wall(node_walls_T[i%node_walls_T.length], node_walls_T[(i+1)%node_walls_T.length]);
  }





  lights.push(new Light());





  open_info = false;
}






function draw() {
  if (open_info)  background(60);
  else  background(0);



  scrollVar += scrollFlash;
  if (scrollVar<0)  scrollVar = 0;
  if (scrollVar > 0  &&  scrollVar < height/2) {
    if (scrollFlash == 0) {
      wait_side ++;
    } else {
      wait_side = 0;
    }
    if (wait_side > 30) {
      scrollVar += floor((0-scrollVar)*0.05);
    }
  }
  if (scrollVar > height/2  &&  scrollVar < height) {
    if (scrollFlash == 0) {
      wait_side ++;
    } else {
      wait_side = 0;
    }
    if (wait_side > 30) {
      scrollVar += ceil((height-scrollVar)*0.05);
    }
  }



  push();
  translate(0, -scrollVar);
  image(img_sideText00, width-sideW, height-img_sideText00.height);
  image(img_sideText01, width-sideW, height);
  if (open_info) {
    stroke(0, 255, 0);
    noFill();
    strokeWeight(1);
    rect(width-sideW, height-img_sideText00.height, sideW, img_sideText00.height);
    rect(width-sideW, height, sideW, img_sideText01.height);
    textSize(12);
    fill(0, 255, 0);
    text("w: "+sideW+"\nh: "+img_sideText00.height, width-sideW, height-img_sideText00.height/2);
    text("w: "+sideW+"\nh: "+img_sideText01.height, width-sideW, height+img_sideText01.height/2);
  }
  pop();




  push();
  if (scrollVar > img_sideText01.height) {
    translate(0, -min(scrollVar-img_sideText01.height, height));
  }

  push();
  if (scrollVar > img_sideText01.height) {
    translate((width-sideW)/2, height-ceil(((min(scaleRate, 0.88)*img_bowl01.height)*0.528)/2));
    rotate(min(map(scrollVar, img_sideText01.height, img_sideText01.height+height, 0, PI), PI));
    translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 0.88)*img_bowl01.height)*0.528)/2)));
  }
  image(img_bowl00, 0, height-((min(scaleRate, 0.88)*img_bowl00.height)*0.528), width-sideW, scaleRate*img_bowl00.height);
  pop();


  PG.background(255, 0);
  PG.push();
  PG.translate(-width/2, -height/2);
  //PG.blendMode(HARD_LIGHT);
  if (!open_info) {
    for (let i=0; i<lights.length; i++) {
      lights[i].display();
    }
  } else {
    for (let i=0; i<lights.length; i++) {
      lights[i].displayInfo();
    }
  }
  //PG.blendMode(BLEND);
  PG.pop();

  image(PG, 0, 0);



  if (lights.length > 4) {
    lights[0].dead = true;
  }
  for (let i=0; i<lights.length; i++) {
    if (lights[i].dead  &&  lights[i].life <= 0) {
      lights.shift();
    }
  }


  fill(0);
  stroke(0);
  strokeWeight(1);
  beginShape();
  for (let i=0; i<node_walls_E.length; i++) {
    vertex(node_walls_E[i].x, node_walls_E[i].y);
  }
  endShape(CLOSE);
  beginShape();
  for (let i=0; i<node_walls_A.length; i++) {
    vertex(node_walls_A[i].x, node_walls_A[i].y);
  }
  endShape(CLOSE);
  beginShape();
  for (let i=0; i<node_walls_A2.length; i++) {
    vertex(node_walls_A2[i].x, node_walls_A2[i].y);
  }
  endShape(CLOSE);
  beginShape();
  for (let i=0; i<node_walls_T.length; i++) {
    vertex(node_walls_T[i].x, node_walls_T[i].y);
  }
  endShape(CLOSE);


  image(img_E, (width-sideW)*0.236, height*0.115, min(scaleRate, 0.88)*img_E.width, min(scaleRate, 0.88)*img_E.height);
  image(img_A, (width-sideW)*0.442, height*0.352, min(scaleRate, 0.88)*img_A.width, min(scaleRate, 0.88)*img_A.height);
  image(img_T, (width-sideW)*0.693, height*0.212, min(scaleRate, 0.88)*img_T.width, min(scaleRate, 0.88)*img_T.height);
  if (open_info) {
    for (let i=0; i<walls.length; i++) {
      walls[i].displayInfo();
    }
  }





  push();
  if (scrollVar > img_sideText01.height) {
    translate((width-sideW)/2, height-ceil(((min(scaleRate, 0.88)*img_bowl01.height)*0.528)/2));
    rotate(min(map(scrollVar, img_sideText01.height, img_sideText01.height+height, 0, PI), PI));
    translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 0.88)*img_bowl01.height)*0.528)/2)));
  }
  image(img_bowl01, 0, height-((min(scaleRate, 0.88)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
  if (open_info) {
    noFill();
    stroke(255, 255, 128);
    strokeWeight(1);
    rect(0, height-((min(scaleRate, 0.88)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
    fill(255, 255, 128);
    text("w: "+(width-sideW)+"\nh: "+scaleRate*img_bowl01.height, 0, height-100);
    strokeWeight(30);
    point((width-sideW)/2, height-ceil(((min(scaleRate, 0.88)*img_bowl01.height)*0.528)/2));
  }
  pop();



  pop();




  if (open_info)  displayInfo();
  else {
    fill(255);
    noStroke();
    text("fps: " + nfc(frameRate(), 1), 10, 20);
  }

  scrollFlash = 0;
}





function displayInfo() {

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
  text("scrollVar: "+scrollVar+"   flash: "+scrollFlash, 10, 155);
  text("------------", 10, 170);
  text("lightCount: "+lightCount, 10, 185);
}





function keyPressed() {
  if (key === 'i' || key === 'I') {
    open_info = !open_info;
    PG = createGraphics(width, height, WEBGL);
  }
}





function mouseWheel(event) {
  scrollFlash = event.delta;
  //uncomment to block page scrolling
  //return false;
}





function mouseReleased() {

  //rays.push(new Array(rayDetail));
  //raysPos.push(createVector(mouseX, mouseY));
  //for (let j=0; j<rayDetail; j++) {
  //  rays[rays.length-1][j] = new Ray(raysCount, j, raysPos[rays.length-1]);
  //}
  //raysCount += 1;
  lights.push(new Light());
}






function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;


  scaleRate = (width-sideW)/img_bowl00.width;


  PG = createGraphics(width, height, WEBGL);


  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.236, height*0.115);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.442, height*0.352);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.442, height*0.352);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(min(scaleRate, 0.88)).add((width-sideW)*0.693, height*0.212);
  }

  for (let i=0; i<node_walls_E.length; i++) {
    walls[i] = new Wall(node_walls_E[i%node_walls_E.length], node_walls_E[(i+1)%node_walls_E.length]);
  }
  for (let i=0; i<node_walls_A.length; i++) {
    walls[node_walls_E.length+i] = new Wall(node_walls_A[i%node_walls_A.length], node_walls_A[(i+1)%node_walls_A.length]);
  }
  for (let i=0; i<node_walls_A2.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+i] = new Wall(node_walls_A2[i%node_walls_A2.length], node_walls_A2[(i+1)%node_walls_A2.length]);
  }
  for (let i=0; i<node_walls_T.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+node_walls_A2.length+i] = new Wall(node_walls_T[i%node_walls_T.length], node_walls_T[(i+1)%node_walls_T.length]);
  }
}






function intersection( wall_A, wall_B, ray_O, ray_P) {
  let den = (wall_A.x - wall_B.x) * (ray_O.y - ray_P.y) - (wall_A.y - wall_B.y) * (ray_O.x - ray_P.x);
  if (den != 0) {
    let t = ((wall_A.x - ray_O.x) * (ray_O.y - ray_P.y) - (wall_A.y - ray_O.y) * (ray_O.x - ray_P.x)) / den;
    let u = -((wall_A.x - wall_B.x) * (wall_A.y - ray_O.y) - (wall_A.y - wall_B.y) * (wall_A.x - ray_O.x)) / den;
    if (t>0 && t<1 && u>0 && u<1) {
      let new_P = createVector(wall_A.x+t*(wall_B.x-wall_A.x), wall_A.y+t*(wall_B.y-wall_A.y));
      return new_P;
    } else {
      return ray_P;
    }
  } else {
    return ray_P;
  }
}





//-----------------------------------------------------------------------
//----------------------------   class   --------------------------------
//-----------------------------------------------------------------------
function Wall(As, Bs) {
  this.A = createVector(As.x, As.y);
  this.B = createVector(Bs.x, Bs.y);


  this.displayInfo = function() {
    stroke(255, 0, 0);
    strokeWeight(2);
    line(this.A.x, this.A.y, this.B.x, this.B.y);
  }
}






function Ray(index, beignPos) {
  this.O = createVector(beignPos.x, beignPos.y);
  this.P = createVector(0, 0);
  this.angle = map(index, 0, rayDetail, 0, TWO_PI);
  this.uv_O = createVector(img_light[0].width/2, img_light[0].height/2);
  this.uv_P = createVector(0, 0);


  this.update = function(newO) {
    this.O = newO;

    this.P = p5.Vector.fromAngle(this.angle);
    this.P.setMag(500);
    this.P = p5.Vector.add(this.P, this.O);
    for (let i=0; i<walls.length; i++) {
      this.P = intersection(walls[i].A, walls[i].B, this.O, this.P);
    }

    this.uv_P = p5.Vector.sub(this.P, this.O).add(this.uv_O);
  }
}





function Light() {
  this.rays_ = [];
  this.pos = createVector(mouseX, mouseY);
  for (let i=0; i<rayDetail; i++) {
    this.rays_[i] = new Ray(i, this.pos);
  }
  this.ran = floor(random(-100, 100));
  lightCount += 1;
  //this.wichone = lightCount % img_light.length;
  this.wichone = floor(random(0, img_light.length));
  this.time = 0;
  this.life = 0.0;
  this.dead = false;


  this.update = function() {
    if (!this.dead  &&  this.life < 10) {
      this.life ++;
    }
    if (this.dead  &&  this.life > 0) {
      this.life --;
    }

    this.time ++;
    let pos_noise = createVector(map(noise(frameCount/100.0+this.ran), 0, 1, -2, 2), map(noise(frameCount/100.0+this.ran+999), 0, 1, -2, 2));
    let pos_end = p5.Vector.sub(createVector((width-sideW)/2, height), this.pos).setMag(1);
    let pos_final = createVector();
    pos_final.x = lerp(pos_noise.x, pos_end.x, min(0.75, map(this.time, 0, 500, 0.0, 1.0)));
    pos_final.y = lerp(pos_noise.y, pos_end.y, min(0.75, map(this.time, 0, 500, 0.0, 1.0)));

    this.pos.add(pos_final);
    for (let i=0; i<rayDetail; i++) {
      this.rays_[i].update(this.pos);
    }
  }


  this.display = function() {
    this.update();


    PG.fill(255);
    PG.noStroke();
    PG.push();
    PG.tint(255, map(this.life, 0, 10, 0, 255));
    PG.beginShape();
    PG.texture(img_light[0]);
    for (let i=0; i<img_light.length; i++) {
      if (this.wichone == i) {
        PG.texture(img_light[i]);
        break;
      }
    }
    PG.vertex(this.rays_[0].O.x, this.rays_[0].O.y, this.rays_[0].uv_O.x, this.rays_[0].uv_O.y);
    for (let i=0; i<rayDetail; i++) {
      PG.vertex(this.rays_[i].P.x, this.rays_[i].P.y, this.rays_[i].uv_P.x, this.rays_[i].uv_P.y);
    }
    PG.vertex(this.rays_[0].P.x, this.rays_[0].P.y, this.rays_[0].uv_P.x, this.rays_[0].uv_P.y);
    PG.endShape(CLOSE);
    PG.pop();
    PG.noTint();
  }


  this.displayInfo = function() {
    this.update();

    PG.noFill();
    PG.stroke(160, 60, 0);
    PG.strokeWeight(1);
    PG.beginShape();
    for (let i=1; i<rayDetail; i++) {
      PG.vertex(this.rays_[i].P.x, this.rays_[i].P.y);
    }
    PG.vertex(this.rays_[0].P.x, this.rays_[0].P.y);
    PG.endShape(CLOSE);

    for (let i=0; i<rayDetail; i+=10) {
      PG.line(this.rays_[i].P.x, this.rays_[i].P.y, this.rays_[i].O.x, this.rays_[i].O.y);
    }
  }
}
