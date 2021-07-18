var walls = [];
var rays = [];


var PG;


var img_bowl00, img_bowl01;
var img_E, img_A, img_T;
var img_light = [];
var img_sideText00;

var sideW;
var scaleRate;

var node_walls_E=[];
var node_walls_A=[];
var node_walls_A2=[];
var node_walls_T=[];
var node_walls_E_ori=[];
var node_walls_A_ori=[];
var node_walls_A2_ori=[];
var node_walls_T_ori=[];


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
  scrollVar = 0;


  img_sideText00.resize(sideW, sideW*img_sideText00.height/img_sideText00.width);
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



  for (let i =0; i< 180; i++) {
    rays[i] = new Ray(0, i);
  }


  open_info = false;
}






function draw() {
  if (open_info)  background(60);
  else  background(0);

  image(img_sideText00, width-img_sideText00.width, height-img_sideText00.height);
  image(img_bowl00, 0, height-((min(scaleRate, 0.88)*img_bowl00.height)/3.0*2), width-sideW, scaleRate*img_bowl00.height);


  if (!open_info) {
    PG.background(255, 0);
    PG.push();
    PG.translate(-width/2, -height/2);
    for (let i=0; i<rays.length; i++) {
      let mouse = createVector(mouseX, mouseY);
      rays[i].update(mouse);
      rays[i].display();
    }
    PG.pop();
    image(PG, 0, 0);


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
  }





  image(img_E, (width-sideW)*0.236, height*0.115, min(scaleRate, 0.88)*img_E.width, min(scaleRate, 0.88)*img_E.height);
  image(img_A, (width-sideW)*0.442, height*0.352, min(scaleRate, 0.88)*img_A.width, min(scaleRate, 0.88)*img_A.height);
  image(img_T, (width-sideW)*0.693, height*0.212, min(scaleRate, 0.88)*img_T.width, min(scaleRate, 0.88)*img_T.height);
  image(img_bowl01, 0, height-((min(scaleRate, 0.88)*img_bowl01.height)/3.0*2), width-sideW, scaleRate*img_bowl01.height);


  if (open_info)  displayInfo();
  else {
    fill(255);
    noStroke();
    text("fps: " + nfc(frameRate(), 1), 10, 20);
  }
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
  text("scrollVar: "+scrollVar, 10, 155);


  for (let i=0; i<walls.length; i++) {
    walls[i].displayInfo();
  }

  for (let i=0; i<rays.length; i++) {
    let mouse = createVector(mouseX, mouseY);
    rays[i].update(mouse);
    rays[i].displayInfo();
  }
}





function keyPressed() {
  if (key === 'i' || key === 'I') {
    open_info = !open_info;
  }
}





function mouseWheel(event) {
  scrollVar = event.delta;
  //uncomment to block page scrolling
  //return false;
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




function Ray(index_wichone, index) {
  this.O = createVector(0, 0);
  this.P = createVector(0, 0);
  this.P2 = createVector(0, 0);
  this.angle = map(index, 0, 180, 0, TWO_PI);
  this.angle2 = map(index+1, 0, 180, 0, TWO_PI);
  this.wichone = index_wichone;


  this.update = function(newO) {
    this.O = newO;

    this.P = p5.Vector.fromAngle(this.angle);
    this.P.setMag(700);
    this.P = p5.Vector.add(this.P, this.O);
    for (let i=0; i<walls.length; i++) {
      this.P = intersection(walls[i].A, walls[i].B, this.O, this.P);
    }

    this.P2 = p5.Vector.fromAngle(this.angle2);
    this.P2.setMag(700);
    this.P2 = p5.Vector.add(this.P2, this.O);
    for (let i=0; i<walls.length; i++) {
      this.P2 = intersection(walls[i].A, walls[i].B, this.O, this.P2);
    }
  }


  this.display = function( ) {
    const uv_O = createVector(img_light[0].width/2, img_light[0].height/2);
    const uv_P = p5.Vector.sub(this.P, this.O).add(uv_O);
    const uv_P2 = p5.Vector.sub(this.P2, this.O).add(uv_O);

    PG.fill(255);
    PG.noStroke();
    PG.beginShape();
    for (let i=0; i<img_light; i++) {
      if (wichone == i) {
        PG.texture(img_light[i]); 
        break;
      }
    }
    PG.texture(img_light[0]); 
    PG.vertex(this.O.x, this.O.y, uv_O.x, uv_O.y);
    PG.vertex(this.P.x, this.P.y, uv_P.x, uv_P.y);
    PG.vertex(this.P2.x, this.P2.y, uv_P2.x, uv_P2.y);
    PG.endShape(CLOSE);
  }


  this.displayInfo = function() {
    stroke(255);
    strokeWeight(1);
    line(this.O.x, this.O.y, this.P.x, this.P.y);
  }
}
