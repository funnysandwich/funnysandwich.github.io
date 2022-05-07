/*
 --------
 test01
 
 我的破6s跑不出来PG
 
 
 
 --------
 test02
 
 用image去接PG
 
 
 
 */




let canvas, PG, M, M_info;
let scaleRate;
let roY;





let belt, mess;






let open_info = false;
let open_follow = false;
let open_roll = true;
let have_touch = false;




function setup() {
  let W, H;
  if (windowWidth <= windowHeight) {
    W = windowWidth;
    H = windowHeight;
  } else {
    H = windowHeight;
    W = round(H*0.75);
  }
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(W, H, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  canvas.mouseOver(over);
  canvas.mouseOut(out);
  document.bgColor = "black";

  scaleRate = 500.0/width;
  PG = createGraphics(500, round(500/width * height));
  //strokeJoin(ROUND);
  //strokeCap(ROUND);







  textureMode(NORMAL);
  frameRate(30);


  roY = 0;







  belt = new Belt();



  let MESS = createGraphics(375, (round(375/width * height)*2 + round(belt.W_fillet*PI))*2);
  M = createImage(MESS.width, MESS.height);
  M_info = createImage(MESS.width, MESS.height);

  MESS.background(124, 155, 199);



  mess = [];
  mess.push(new Mess(0));
  let H_all = mess[0].H_all;
  for (let i=0; i<100; i++) {
    if (H_all < MESS.height/2-41.5) {
      mess.push(new Mess(0));
      H_all += mess[mess.length-1].H_all;
    } else {
      H_all -= mess[mess.length-1].H_all;
      mess.pop();
      mess.push(new Mess(MESS.height/2-H_all));
      break;
    }
  }





  MESS.clear();
  let y = 0;
  for (let i=0; i<mess.length; i++) {
    mess[i].displayInfo(y, MESS);
    // MESS.strokeWeight(4);
    //const r = random(0, 255);
    //const g = random(0, 255);
    //MESS.fill(r, g, 0, 30);
    //MESS.stroke(r, g, 0, 60);
    //MESS.rect(0, y, MESS.width, mess[i].H_all);
    MESS.textSize(12);
    MESS.noStroke();
    MESS.fill(90);
    if (mess[i].is_I) {
      MESS.text(nf(i, 2), MESS.width-40, y+25);
    } else {
      MESS.text(nf(i, 2), 26, y+25);
    }
    y += mess[i].H_all;
  }
  y = MESS.height/2.0;
  for (let i=0; i<mess.length; i++) {
    mess[i].displayInfo(y, MESS);
    //MESS.strokeWeight(4);
    //const r = random(0, 255);
    //const g = random(0, 255);
    //MESS.fill(r, g, 0, 60);
    //MESS.stroke(r, g, 0);
    //MESS.rect(0, y, MESS.width, mess[i].H_all);
    MESS.textSize(12);
    MESS.noStroke();
    MESS.fill(90);
    if (mess[i].is_I) {
      MESS.text(nf(i, 2), MESS.width-40, y+25);
    } else {
      MESS.text(nf(i, 2), 26, y+25);
    }
    y += mess[i].H_all;
  }


  //M_info.loadPixels();
  //for (let j = 0; j < M_info.width; j++) {
  //  for (let k = 0; k < M_info.height; k++) {
  //    M_info.set(j, k, MESS.get(j, k));
  //  }
  //}
  //M_info.updatePixels();
  M_info.copy(MESS, 0, 0, MESS.width, MESS.height, 0, 0, MESS.width, MESS.height);





  MESS.background(124, 155, 199);
  y = 0;
  for (let i=0; i<mess.length; i++) {
    mess[i].display(y, MESS);
    y += mess[i].H_all;
  }
  y = MESS.height/2.0;
  for (let i=0; i<mess.length; i++) {
    mess[i].display(y, MESS);
    y += mess[i].H_all;
  }



  //M.loadPixels();
  //for (let j = 0; j < M.width; j++) {
  //  for (let k = 0; k < M.height; k++) {
  //    M.set(j, k, MESS.get(j, k));
  //  }
  //}
  //M.updatePixels();

  M.copy(MESS, 0, 0, MESS.width, MESS.height, 0, 0, MESS.width, MESS.height);
}

function over() {
  open_follow = true;
}

function out() {
  open_follow = false;
}












function draw() {

  if (touches.length == 1) {
    have_touch = true;
  }
  //background(255);
  background(0);
  //push();

  if (open_follow) {
    roY = easing_x(roY, map(mouseX, 0, width, -PI*0.75, PI*0.75), 0.1);
  } else {
    roY = easing_x(roY, 0, 0.2);
  }
  //rotateY(roY);

  //pop();





  belt.update();









  if (open_info) {
    //displayInfo_3d();
    belt.displayInfo();
  } else {
    belt.display();
  }



  if (open_info) {
    PG.clear();

    displayInfo();
    displayInfo_true();
    image(PG, -width/2, -height/2, width, height);
  }
}





function displayInfo_3d() {
  noFill();
  strokeWeight(real(1));
  stroke(255, 0, 0);
  line(200, 0, 0, 0, 0, 0);
  stroke(255, 200, 200);
  line(-200, 0, 0, 0, 0, 0);
  stroke(0, 255, 0);
  line(0, 200, 0, 0, 0, 0);
  stroke(200, 255, 200);
  line(0, -200, 0, 0, 0, 0);
  stroke(0, 0, 255);
  line(0, 0, 200, 0, 0, 0);
  stroke(200, 200, 255);
  line(0, 0, -200, 0, 0, 0);
}


function displayInfo() {
  PG.noStroke();
  if (mouseX*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.fill(255, 160);
    PG.textSize(10);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("LittleHouse_01_a", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(255, 160);
    PG.text("@funnysandwich 2021.09.13", PG.width/2, PG.height-8);
  } else if (mouseY*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(255, 160);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
function displayInfo_true() {
  PG.fill(0, 100);
  //PG.rect(5, 5, 200, 300);
  PG.fill(255, 0, 0);
  PG.noStroke();
  PG.textAlign(LEFT);
  PG.textSize(12);
  PG.text("W,H: "+width+", "+height, 10, 20);
  PG.text("P_W,H: "+PG.width+", "+PG.height, 10, 35);
  PG.text("M_W,H: "+M.width+", "+M.height, 10, 50);
  PG.text("scaleRate: "+scaleRate, 10, 65);
  PG.text("roY: "+roY, 10, 80);
  PG.text("mess.length: "+mess.length, 10, 95);
  PG.text("have_touch: "+have_touch, 10, 110);
  //PG.noStroke();
  //PG.image(MESS, PG.width-10-50, 20, 50, 50/MESS.width*MESS.height);
}


function easing_p(p, target, varlue) {
  if (p5.Vector.dist(p, target) > 0.0001) {
    return p5.Vector.add((p5.Vector.sub(target, p)).mult(varlue), p);
  } else {
    return target;
  }
}
function easing_x(x, target, varlue) {
  if (abs(x-target) > 0.0001) {
    return x + (target - x) * varlue;
  } else {
    return target;
  }
}
function real(x) {
  x = x/scaleRate;
  return x;
}
function PRotateX(p, angle) {
  let p_new = createVector(p.z, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p.x, p_new.y, p_new.x);
  return p_final;
}
function PRotateY(p, angle) {
  let p_new = createVector(p.x, p.z);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p.y, p_new.y);
  return p_final;
}
function PRotateZ(p, angle) {
  let p_new = createVector(p.x, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p_new.y, p.z);
  return p_final;
}
function TRIANGLES_getRect(UL, UR, DR, DL) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}
function TRIANGLES_getRect_uv(UL, UR, DR, DL, ul, ur, dr, dl) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z, ul.x, ul.y);
  vertex(UR.x, UR.y, UR.z, ur.x, ur.y);
  vertex(DR.x, DR.y, DR.z, dr.x, dr.y);
  vertex(DR.x, DR.y, DR.z, dr.x, dr.y);
  vertex(DL.x, DL.y, DL.z, dl.x, dl.y);
  vertex(UL.x, UL.y, UL.z, ul.x, ul.y);
}

function TRIANGLES_getRect_fill(UL, UR, DR, DL, c) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  fill(c);
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}

function TRIANGLES_getRect_fill4(UL, UR, DR, DL, c1, c2, c3, c4) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
  fill(c2);
  vertex(UR.x, UR.y, UR.z);
  fill(c3);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  fill(c4);
  vertex(DL.x, DL.y, DL.z);
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
}


function TRIANGLES_getTriangle(p1, p2, p3) {
  if (p1==null || p2==null || p3==null) {
    return;
  }
  vertex(p1.x, p1.y, p1.z);
  vertex(p2.x, p2.y, p2.z);
  vertex(p3.x, p3.y, p3.z);
}


function TRIANGLES_getTriangle_fill3(p1, p2, p3, c1, c2, c3) {
  if (p1==null || p2==null || p3==null) {
    return;
  }
  fill(c1);
  vertex(p1.x, p1.y, p1.z);
  fill(c2);
  vertex(p2.x, p2.y, p2.z);
  fill(c3);
  vertex(p3.x, p3.y, p3.z);
}




function TRIANGLES_getLine_weight(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_fill2(P1, P2, w, c1, c2) {
  if (P1==null || P2==null) {
    return;
  }
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  fill(c2);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}

function TRIANGLES_getLine_weightToR(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P1.x + w, P1.y, P1.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P1.x, P1.y, P1.z);
}

function TRIANGLES_getLine_weightToL(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x - w, P1.y, P1.z);
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x - w, P2.y, P2.z);
  vertex(P1.x - w, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y - w/2.0, P1.z);
  vertex(P2.x, P2.y - w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P1.x, P1.y + w/2.0, P1.z);
  vertex(P1.x, P1.y - w/2.0, P1.z);
}


function TRIANGLES_getLine_weightToU_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y - w, P1.z);
  vertex(P2.x, P2.y - w, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P1.x, P1.y, P1.z);
  vertex(P1.x, P1.y - w, P1.z);
}

function TRIANGLES_getLine_weightToD_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y + w, P2.z);
  vertex(P2.x, P2.y + w, P2.z);
  vertex(P1.x, P1.y + w, P1.z);
  vertex(P1.x, P1.y, P1.z);
}


function LINES_getLine(P1, P2) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
}


function LINES_getRect(UL, UR, DR, DL) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}


function windowResized() {
  location.reload();
}

document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
    //let MESS = createGraphics(375, (round(375/width * height)*2 + round(belt.W_fillet*PI))*2);
    //MESS.clear();
    //if (open_info) {

    //  MESS.background(0, 0);
    //  let y = 0;
    //  for (let i=0; i<mess.length; i++) {
    //    mess[i].displayInfo(y, MESS);
    //    MESS.textSize(12);
    //    MESS.noStroke();
    //    MESS.fill(90);
    //    if (mess[i].is_I) {
    //      MESS.text(nf(i, 2), MESS.width-40, y+25);
    //    } else {
    //      MESS.text(nf(i, 2), 26, y+25);
    //    }
    //    y += mess[i].H_all;
    //  }


    //  y = MESS.height/2.0;
    //  for (let i=0; i<mess.length; i++) {
    //    mess[i].displayInfo(y, MESS);
    //    MESS.textSize(12);
    //    MESS.noStroke();
    //    MESS.fill(90);
    //    if (mess[i].is_I) {
    //      MESS.text(nf(i, 2), MESS.width-40, y+25);
    //    } else {
    //      MESS.text(nf(i, 2), 26, y+25);
    //    }
    //    y += mess[i].H_all;
    //  }
    //} else {
    //  MESS.background(124, 155, 199);
    //  let y = 0;
    //  for (let i=0; i<mess.length; i++) {
    //    mess[i].display(y, MESS);
    //    y += mess[i].H_all;
    //  }
    //  y = MESS.height/2.0;
    //  for (let i=0; i<mess.length; i++) {
    //    mess[i].display(y, MESS);
    //    y += mess[i].H_all;
    //  }
    //}
    //M.loadPixels();
    //for (let j = 0; j < M.width; j++) {
    //  for (let k = 0; k < M.height; k++) {
    //    M.set(j, k, MESS.get(j, k));
    //  }
    //}
    //M.updatePixels();
  }
};
document.onclick = function (event) {
  let e = event || window.event;
  belt.count = 3;
};



function touchEnded() {
  if (have_touch) {
    open_follow = false;
  }
}
function touchStarted() {
  if (have_touch) {
    open_follow = true;
  }
}

function keyPressed() {
  if (key == ' ') {
    //noLoop();
    open_roll = !open_roll;
  }
}
