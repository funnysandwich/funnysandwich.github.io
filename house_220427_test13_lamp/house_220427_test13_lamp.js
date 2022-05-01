/*
 -------------------
 test01
 
 把[21.01.23小房子]的 littleHouse_210125_test02 转成p5.js版本，变成nft拿去卖
 完美复刻
 
 
 -------------------
 test02
 
 加入鼠标移动更改房子的互动
 调整细节
 
 
 -------------------
 test03
 
 3d的扭扭房子！
 只是目前转不了Y轴，只有个普通的3d效果
 
 
 
 -------------------
 test04
 
 尝试加入 addScreenPositionFunction 库，来获取3d空间的平面坐标
 
 小奶盒主题
 
 
 
 -------------------
 test05
 
 扭扭房子
 
 
 
 
 -------------------
 test06
 
 爆炸房子
 
 
 
 -------------------
 test07
 
 重新写node的倾斜方法
 做一个宝塔
 
 
 
 
 -------------------
 test08
 
 爆炸房子，增加警示牌和粒子
 bird主题
 
 
 
 
 -------------------
 test09
 
 把 test07 的宝塔改成风车
 
 
 
 -------------------
 test10
 
 把 test09 的风车改成风车水泵
 
 
 
 -------------------
 test11
 
 把 test03 改成野营帐篷
 
 
 
 
 -------------------
 test12
 
 把 test03 改成地下室
 
 
 -------------------
 test13
 
 爆炸房子，改 test08
 彩带主题
 
 
 -------------------
 test14
 
 叠叠乐
 
 
 -------------------
 test11_fish
 
 把 test11 的野营帐篷变成钓鱼版本
 
 
 -------------------
 test12_train
 
 把 test12 的地下室改成地铁
 
 
 -------------------
 test12_blackHole
 
 把 test12 的地下室改成黑洞
 
 
 -------------------
 test14_dice
 
 把 test14 的叠叠乐改成骰子
 
 
 -------------------
 test12_mess
 
 把 test12 地下室加入混乱怪兽
 
 
 -------------------
 test11_balck
 
 把 test11 的野营帐篷变成黑夜
 
 
 -------------------
 test11_wigwam
 
 把 test11 的野营帐篷变成原住民帐篷
 
 
 
 -------------------
 test15
 
 把 test03 改成彩色加光影
 
 
 
 -------------------
 test15_2
 
 test15 的颜色阿乱说不行，于是做一个【精致】的山顶风景版本
 
 
 -------------------
 test02_color
 
 试试看把 test02 变成彩色，就是那个一开始的2d版本
 
 
 -------------------
 test11_circus
 
 把 test11 的野营帐篷变成马戏团
 
 
 -------------------
 test12_balckHole_night
 
 把 test12_balckHole 的黑洞改成黑夜精致版本
 
 
 
 -------------------
 test14_container
 
 把 test14 的叠叠乐改成集装箱
 
 
 
 -------------------
 test12_refuge
 
 把地下室改成地下桃源
 
 
 -------------------
 test11_swamp
 
 把tipi帐篷改成沼泽版本
 
 
 -------------------
 test17_balloon
 
 气球版的感谢款小房子
 
 
 
 -------------------
 test16_meisoul
 
 房子开箱！
 这个版本是美兽
 
 
 -------------------
 test17_baron
 
 房子开箱！
 这个版本是体操男爵
 
 
 -------------------
 test12_rabbit
 
 Tezos_CN中文社群搞的活动，干脆用这个兔子结合之前的地洞好了
 
 
 -------------------
 test13_lamp
 
 跟十方合作的路灯版本
 
 
 */
let canvas, PG, TV;
let img;
let scaleRate;

let time_tv;

let lamp;
let count_lamp;
let roY;

let sign_num;
let sign = [];
let SIGN;
let node_plane;


let open_info = false;
let open_info_wichFloor;
let c_info, c_info2;







function setup() {
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);
  addScreenPositionFunction();


  roY = -HALF_PI/2;
  scaleRate = 500.0/width;
  time_tv = 0;
  textureMode(NORMAL);

  frameRate(30);

  c_info = color(128, 30, 30);
  c_info2 = color(30, 30, 128);

  count_lamp = 0;
  lamp = new Lamp01(createVector(0, 0, 0));
  open_info_wichFloor = new Array(lamp.node.length-1);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }

  node_plane = new Array(20);




  PG = createGraphics(500, 500);




  TV = createGraphics(70, 100);
  TV.background(0);
  TV.rectMode(CENTER);
  TV.noFill();
  TV.stroke(255);
  TV.strokeWeight(3);
  for (let i=0; i<5; i++) {
    TV.rect(TV.width/2, TV.height/2, map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.width, 0), map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.height, 0));
  }
  TV.rectMode(CORNER);
  TV.noStroke();
  TV.fill(0);
  const w_TV = 10;
  TV.rect(0, 0, TV.width, w_TV);
  TV.rect(0, TV.height-w_TV, TV.width, w_TV);
  TV.rect(0, 0, w_TV, TV.height);
  TV.rect(TV.width-w_TV, 0, w_TV, TV.height);




  SIGN = createGraphics(50, 50);
  if (lamp.state == 1) {
    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    SIGN.beginShape();
    for (let i=0; i<10; i++) {
      let x = 0;
      let y = 0;
      if (i<5) {
        x = cos(map(i, 0, 5-1, PI, TWO_PI)) * 3.5 + 2.2;
        y = sin(map(i, 0, 5-1, PI, TWO_PI)) * 3.5;
        y -= 10;
      } else {
        x = cos(map(i, 5, 10-1, 0, PI)) * 1.5 + 1.2;
        y = sin(map(i, 5, 10-1, 0, PI)) * 1.5;
        y += 4;
      }
      SIGN.vertex(x+SIGN.width/2, y+SIGN.height/2);
    }
    SIGN.endShape(CLOSE);
    SIGN.ellipse(SIGN.width/2+0.8, 39, 6, 6);
  } else if (lamp.state == 2) {
    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    SIGN.beginShape();
    SIGN.vertex(24, 15);
    SIGN.vertex(31, 14);
    SIGN.vertex(25, 25);
    SIGN.vertex(34, 22);
    SIGN.vertex(28, 35);
    SIGN.vertex(34, 34);
    SIGN.vertex(25, 45);
    SIGN.vertex(20, 34);
    SIGN.vertex(25, 35);
    SIGN.vertex(27, 28);
    SIGN.vertex(18, 32);
    SIGN.endShape(CLOSE);
  } else if (lamp.state == 3) {
    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    if (node_plane[node_plane.length-1] != null) {
      SIGN.beginShape();
      for (let i=0; i<node_plane.length; i++) {
        SIGN.vertex(node_plane[i].x, node_plane[i].y);
      }
      SIGN.endShape(CLOSE);
    } else {
      loadStrings("node_plane.txt", planeLoaded);
    }
  }


  LED = createGraphics(50, 50);
  LED.background(0);
  LED.noStroke();
  LED.fill(255);
  LED.rect(5, 5, 17.5, 40);
  LED.rect(27.5, 5, 17.5, 40);
  LED.fill(0);
  for (let i=0; i<5; i++) {
    let y = map(i, 0, 5, 5, 37);
    if (i % 2 == 0) {
      LED.rect(0, y, 50, 8);
    }
  }
  LED.rect(13.75, 0, 2, 50);
  LED.rect(36.25, 0, 2, 50);















  sign_num = floor(random(0.5, 4.25));
  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      let angle = random(TWO_PI/sign_num * i, TWO_PI/sign_num * (i+1));
      let be = createVector(real(random(50, 100)), 0).rotate(angle);
      sign.push(new Sign(createVector(be.x, 0, be.y)));
    }
  }
}







function planeLoaded(str_plane) {
  SIGN.beginShape();
  for (let i=0; i<str_plane.length; i++) {
    let a = split(str_plane[i], ", ");
    node_plane[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
    node_plane[i].add(-25, -43.8);
    node_plane[i].mult(1.35);
    node_plane[i].add(25, 43.8);

    SIGN.vertex(node_plane[i].x, node_plane[i].y);
  }
  SIGN.endShape(CLOSE);
}















function draw() {
  background(255);
  if (lamp.state == 3) {

    TV.background(0);
    TV.rectMode(CENTER);
    TV.noFill();
    TV.stroke(255);
    TV.strokeWeight(3);


    for (let i=0; i<5; i++) {
      TV.rect(TV.width/2, TV.height/2, map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.width, 0), map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.height, 0));
    }

    TV.rectMode(CORNER);

    TV.noStroke();
    TV.fill(0);
    const w_TV = 10;
    TV.rect(0, 0, TV.width, w_TV);
    TV.rect(0, TV.height-w_TV, TV.width, w_TV);
    TV.rect(0, 0, w_TV, TV.height);
    TV.rect(TV.width-w_TV, 0, w_TV, TV.height);
  }


  const myMouse = createVector(mouseX-width/2.0, mouseY-height/2.0);


  push();
  translate(0, real(100));
  roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI, HALF_PI)-HALF_PI/2, 0.1);
  rotateY(roY);


  lamp.update();
  if (sign_num > 0) {
    for (let i=0; i<sign.length; i++) {
      sign[i].update();
    }
  }




  if (open_info) {
    for (let i=0; i<open_info_wichFloor.length; i++) {
      let ymax, ymin;
      if (lamp.state == 2 && i == open_info_wichFloor.length-1) {
        ymax = screenPosition(lamp.node_up[0]);
        ymin = screenPosition(lamp.node_up[1]);
      } else {
        ymax = screenPosition(lamp.node[i]);
        ymin = screenPosition(lamp.node[i+1]);
      }
      if (myMouse.y > ymin.y  &&  myMouse.y < ymax.y) {
        open_info_wichFloor[i] = true;
      } else {
        open_info_wichFloor[i] = false;
      }
    }






    noFill();
    stroke(200);
    strokeWeight(real(0.75));
    beginShape(LINES);
    displayInfo_3d();
    if (sign_num > 0) {
      for (let i=0; i<sign.length; i++) {
        sign[i].displayInfo();
      }
    }
    lamp.displayInfo_LINES();
    endShape();

    lamp.displayInfo();
    displayInfo_3d_red();

    noFill();
    stroke(128, 30, 30);
    strokeWeight(real(0.75));
    beginShape(LINES);
    lamp.displayInfo_LINES_red();
    endShape();
  } else {
    lamp.display();
    if (sign_num > 0) {
      for (let i=0; i<sign.length; i++) {
        sign[i].display();
      }
    }
  }


  pop();



  PG.clear();
  if (open_info) {
    displayInfo();
  }
  image(PG, -width/2, -height/2, width, height);
}

function displayInfo_3d() {
  const w = real(25);
  vertex(w, 0, real(-500));
  vertex(w, 0, real(500));
  vertex(-w, 0, real(-500));
  vertex(-w, 0, real(500));
  vertex(real(500), 0, w);
  vertex(real(-500), 0, w);
  vertex(real(500), 0, -w);
  vertex(real(-500), 0, -w);


  for (let i=0; i<10; i++) {
    const x = cos(map(i, 0, 10, 0, TWO_PI))*real(50);
    const z = sin(map(i, 0, 10, 0, TWO_PI))*real(50);
    const x2 = cos(map((i+1)%10, 0, 10, 0, TWO_PI))*real(50);
    const z2 = sin(map((i+1)%10, 0, 10, 0, TWO_PI))*real(50);
    vertex(x, 0, z);
    vertex(x2, 0, z2);
  }
  for (let i=0; i<20; i++) {
    const x = cos(map(i, 0, 20, 0, TWO_PI))*real(100);
    const z = sin(map(i, 0, 20, 0, TWO_PI))*real(100);
    const x2 = cos(map((i+1)%20, 0, 20, 0, TWO_PI))*real(100);
    const z2 = sin(map((i+1)%20, 0, 20, 0, TWO_PI))*real(100);
    vertex(x, 0, z);
    vertex(x2, 0, z2);
  }
}



function displayInfo_3d_red() {
  const w = real(100);
  let h = lamp.node[lamp.node.length-1].y;
  if (lamp.state == 2) {
    for (let i=0; i<lamp.node_up.length; i++) {
      if (h > lamp.node_up[i].y) {
        h = lamp.node_up[i].y;
      }
    }
  } else if (lamp.state == 3) {
    for (let i=0; i<lamp.node_wing.length; i++) {
      for (let j=0; j<lamp.node_wing[i].length; j++) {
        if (h > lamp.node_wing[i][j].y) {
          h = lamp.node_wing[i][j].y;
        }
      }
    }
  }
  if (lamp.state == 2 || lamp.state == 3) {
    for (let i=0; i<lamp.node_horLine.length; i++) {
      if (h > lamp.node_horLine[i].y) {
        h = lamp.node_horLine[i].y;
      }
    }
  } else {
    for (let i=0; i<lamp.node.length-1; i++) {
      if (h > lamp.node[i].y) {
        h = lamp.node[i].y;
      }
    }
  }
  for (let i=0; i<lamp.node_head.length; i++) {
    for (let j=0; j<lamp.node_head[i].length; j++) {
      if (h > lamp.node_head[i][j].y) {
        h = lamp.node_head[i][j].y;
      }
    }
  }
  noFill();
  stroke(223, 198, 198);
  strokeWeight(real(1));
  beginShape(LINES);
  vertex(w, 0, w);
  vertex(w, h, w);
  vertex(-w, 0, w);
  vertex(-w, h, w);
  vertex(w, 0, -w);
  vertex(w, h, -w);
  vertex(-w, 0, -w);
  vertex(-w, h, -w);

  vertex(w, h, w);
  vertex(-w, h, -w);
  vertex(-w, h, w);
  vertex(w, h, -w);

  vertex(w, h, w);
  vertex(-w, h, w);
  vertex(w, h, w);
  vertex(w, h, -w);
  vertex(-w, h, -w);
  vertex(-w, h, w);
  vertex(-w, h, -w);
  vertex(w, h, -w);
  vertex(w, 0, w);
  vertex(-w, 0, w);
  vertex(w, 0, w);
  vertex(w, 0, -w);
  vertex(-w, 0, -w);
  vertex(-w, 0, w);
  vertex(-w, 0, -w);
  vertex(w, 0, -w);
  endShape();
}










function displayInfo() {
  const x = 30;
  const y = 36;
  const gap = 12;
  PG.noStroke();
  PG.fill(0, 128);
  PG.textAlign(LEFT);
  PG.textSize(8);
  if (lamp.state == 1) {
    PG.text("Lamp: 1. Mercury", x, y+gap*0);
  } else if (lamp.state == 2) {
    PG.text("Lamp: 2. LED", x, y+gap*0);
  } else if (lamp.state == 3) {
    PG.text("Lamp: 3. Smart", x, y+gap*0);
  }
  if (lamp.state == 2) {
    PG.text("FloorNum: "+String(lamp.node.length), x, y+gap*1);
  } else {
    PG.text("FloorNum: "+String(lamp.node.length-1), x, y+gap*1);
  }
  PG.text("NoiseSeed: "+nfc(lamp.ran, 2), x, y+gap*2);
  PG.text("PoleDiameter_max: "+nfc(lamp.W_pole_begin, 2), x, y+gap*3);
  PG.text("PoleDiameter_min: "+nfc(lamp.W_pole_end, 2), x, y+gap*4);
  if (lamp.is_face_left) {
    PG.text("LampFace: left", x, y+gap*5);
  } else {
    PG.text("LampFace: right", x, y+gap*5);
  }
  PG.text("HeadWidth: "+nfc(lamp.W_head, 2), x, y+gap*6);
  PG.text("HeadHeight: "+nfc(lamp.H_head, 2), x, y+gap*7);
  PG.text("HeadThickness: "+nfc(lamp.W_connection_head, 2), x, y+gap*8);
  PG.text("HeadAngle: "+nfc(lamp.angle_z_horLine, 2), x, y+gap*9);
  if (lamp.open_shine) {
    PG.fill(128, 30, 30);
  }
  PG.text("Shine: "+lamp.open_shine, x, y+gap*10);
  PG.text("SignNum: "+sign_num, x, y+gap*11);

  if (lamp.open_shine) {
    PG.fill(0, 128);
  }


  PG.noStroke();
  PG.fill(128, 30, 30);
  PG.textAlign(LEFT);
  PG.textSize(8);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    if (open_info_wichFloor[i]) {
      if (lamp.state == 2  &&  i == open_info_wichFloor.length-1) {
        let nodey = (screenPosition(lamp.node_up[0]).y + screenPosition(lamp.node_up[1]).y)/2.0 + height/2.0 + 100*scaleRate;
        PG.text("node_up ("+nfc(lamp.node_up[1].x, 2)+", "+nfc(lamp.node_up[1].y, 2)+", "+nfc(lamp.node_up[1].z, 2)+")", 310, nodey);
        PG.text("node_down ("+nfc(lamp.node_up[0].x, 2)+", "+nfc(lamp.node_up[0].y, 2)+", "+nfc(lamp.node_up[0].z, 2)+")", 310, nodey+12);
      } else {
        let nodey = (screenPosition(lamp.node[i]).y + screenPosition(lamp.node[i+1]).y)/2.0 + height/2.0 + 100*scaleRate;
        PG.text("node_up ("+nfc(lamp.node[i+1].x, 2)+", "+nfc(lamp.node[i+1].y, 2)+", "+nfc(lamp.node[i+1].z, 2)+")", 310, nodey);
        PG.text("node_down ("+nfc(lamp.node[i].x, 2)+", "+nfc(lamp.node[i].y, 2)+", "+nfc(lamp.node[i].z, 2)+")", 310, nodey+12);
      }
    }
  }




  PG.noStroke();
  if (mouseX*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.fill(0, 160);
    PG.textSize(10);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("LittleHouse_12_a", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(0, 160);
    PG.text("@funnysandwich 2022.05.01", PG.width/2, PG.height-8);
  } else if (mouseY*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(0, 160);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}


function easing_p(p, target, a) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(a), p);
}

function easing_p1(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.65), p);
}
function easing_p2(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.35), p);
}
function easing_p3(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.45), p);
}

function easing_x(x, target, a) {
  return x + (target - x) * a;
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

function real(x) {
  x = x/scaleRate;
  return x;
}
function realZ(x, z) {
  x = x*map(z, 0, -500, 1, 2);
  return x;
}

function windowResized() {
  location.reload();
}

function colorWithAlpha(c, alpha) {
  let c_new = color(red(c), green(c), blue(c), alpha);
  return c_new;
}


function vectorFixZ(p, z) {
  return createVector(p.x, p.y, p.z + z);
}
function vectorFixX(p, x) {
  return createVector(p.x + x, p.y, p.z);
}
function vectorFixY(p, y) {
  return createVector(p.x, p.y + y, p.z);
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


function TRIANGLES_getTriangle(p1, p2, p3) {
  if (p1==null || p2==null || p3==null) {
    return;
  }
  vertex(p1.x, p1.y, p1.z);
  vertex(p2.x, p2.y, p2.z);
  vertex(p3.x, p3.y, p3.z);
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



function isIntersection(wall_A, wall_B, ray_O, ray_P) {
  let den = (wall_A.x - wall_B.x) * (ray_O.y - ray_P.y) - (wall_A.y - wall_B.y) * (ray_O.x - ray_P.x);
  if (den != 0) {
    let t = ((wall_A.x - ray_O.x) * (ray_O.y - ray_P.y) - (wall_A.y - ray_O.y) * (ray_O.x - ray_P.x)) / den;
    let u = -((wall_A.x - wall_B.x) * (wall_A.y - ray_O.y) - (wall_A.y - wall_B.y) * (wall_A.x - ray_O.x)) / den;
    if (t>0 && t<1 && u>0 && u<1) {
      let new_P = createVector(wall_A.x+t*(wall_B.x-wall_A.x), wall_A.y+t*(wall_B.y-wall_A.y));
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
function intersection(wall_A, wall_B, ray_O, ray_P) {
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








document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
  }
};
document.onclick = function (event) {
  let e = event || window.event;



  count_lamp += 1;
  if (count_lamp > 2) {
    count_lamp = 0;
  }

  if (count_lamp == 0) {
    lamp = new Lamp01(createVector(0, 0, 0));
  } else if (count_lamp == 1) {
    lamp = new Lamp02(createVector(0, 0, 0));
  } else if (count_lamp == 2) {
    lamp = new Lamp03(createVector(0, 0, 0));
  }  

  //const r = random(1);
  //if (r < 0.333) {
  //  lamp = new Lamp01(createVector(0, 0, 0));
  //} else if (r < 0.666) {
  //  lamp = new Lamp02(createVector(0, 0, 0));
  //} else {
  //  lamp = new Lamp03(createVector(0, 0, 0));
  //}


  open_info_wichFloor = new Array(lamp.node.length-1);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }

  if (lamp.state == 1) {
    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    SIGN.beginShape();
    for (let i=0; i<10; i++) {
      let x = 0;
      let y = 0;
      if (i<5) {
        x = cos(map(i, 0, 5-1, PI, TWO_PI)) * 3.5 + 2.2;
        y = sin(map(i, 0, 5-1, PI, TWO_PI)) * 3.5;
        y -= 10;
      } else {
        x = cos(map(i, 5, 10-1, 0, PI)) * 1.5 + 1.2;
        y = sin(map(i, 5, 10-1, 0, PI)) * 1.5;
        y += 4;
      }
      SIGN.vertex(x+SIGN.width/2, y+SIGN.height/2);
    }
    SIGN.endShape(CLOSE);
    SIGN.ellipse(SIGN.width/2+0.8, 39, 6, 6);
  } else if (lamp.state == 2) {
    open_info_wichFloor.push(false);

    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    SIGN.beginShape();
    SIGN.vertex(24, 15);
    SIGN.vertex(31, 14);
    SIGN.vertex(25, 25);
    SIGN.vertex(34, 22);
    SIGN.vertex(28, 35);
    SIGN.vertex(34, 34);
    SIGN.vertex(25, 45);
    SIGN.vertex(20, 34);
    SIGN.vertex(25, 35);
    SIGN.vertex(27, 28);
    SIGN.vertex(18, 32);
    SIGN.endShape(CLOSE);
  } else if (lamp.state == 3) {
    SIGN.background(255);
    SIGN.noStroke();
    SIGN.fill(0);
    if (node_plane[node_plane.length-1] != null) {
      SIGN.beginShape();
      for (let i=0; i<node_plane.length; i++) {
        SIGN.vertex(node_plane[i].x, node_plane[i].y);
      }
      SIGN.endShape(CLOSE);
    } else {
      loadStrings("node_plane.txt", planeLoaded);
    }
  }












  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      sign.shift();
    }
  }
  sign_num = floor(random(0.5, 4.25));
  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      let angle = random(TWO_PI/sign_num * i, TWO_PI/sign_num * (i+1));
      let be = createVector(real(random(50, 100)), 0).rotate(angle);
      sign.push(new Sign(createVector(be.x, 0, be.y)));
    }
  }
};
//@funnysandwich
