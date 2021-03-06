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
 test16_meisoul
 
 房子开箱！
 这个版本是美兽
 
 
 -------------------
 test17_baron
 
 房子开箱！
 这个版本是体操男爵
 
 
 
 
 */


let canvas, PG, SWIRL, FACE, EAR, SIGN;
let scaleRate;

let houses;
let baron;
let sign_num;
let sign = [];

let roY;


let open_info = false;
let open_info_wichFloor;
let open_open=false;
let c_info, c_info2;

let eye_moveX=0.0, eye_moveY=0.0, baron_eye_move_y=0.0;
let bez_baronEyeL, bez_baronEyeR;
let open_winkL=false, open_winkR=false;
let ready_open_winkL=true, ready_open_winkR=true;
let time_winkL=0, time_winkR=0, time_gap_wink=0;

let c_swirl;



let song, s_laser;
let ready_open_song=true;




let have_first_click=false;

function preload() {
  song = loadSound('data/baron2.wav');
  s_laser = loadSound('data/laser.wav');
}



function setup() {
  //song.playMode('restart'); Do NOT support safari!!!
  song.loop();
  song.pause();
  s_laser.play();
  s_laser.pause();

  canvas = createCanvas(500, 500, WEBGL);
  //canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);
  addScreenPositionFunction();
  //pixelDensity(1);
  smooth(8);

  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);


  textureMode(NORMAL);
  frameRate(30);

  c_info = color(128, 30, 30);
  c_info2 = color(30, 30, 128);
  roY = -HALF_PI/2;



 

  c_swirl = 255;
  SWIRL = createGraphics(200, 200);
  SWIRL.background(255);
  /*SWIRL.noStroke();
   SWIRL.fill(c_swirl);
   for (let i=0; i<20; i+=2) {
   SWIRL.beginShape();
   for (let j=0; j<20; j++) {
   let x = map(j, 0, 20, 0, SWIRL.width*0.75);
   let n = createVector(x, 0);
   n.rotate(map(j, 0, 20, 0, HALF_PI));
   n.rotate(map(i, 0, 20, 0, TWO_PI));
   n.add(SWIRL.width/2, SWIRL.height/2);
   SWIRL.vertex(n.x, n.y, n.z);
   }
   for (let j=19; j>=0; j--) {
   let x = map(j, 20, -1, SWIRL.width*0.75, 0);
   let n = createVector(x, 0);
   n.rotate(map(j, 20, -1, HALF_PI, 0));
   n.rotate(map(i+1, 0, 20, 0, TWO_PI));
   n.add(SWIRL.width/2, SWIRL.height/2);
   SWIRL.vertex(n.x, n.y, n.z);
   }
   SWIRL.endShape(CLOSE);
   }*/



  bez_baronEyeL = new Array(7);
  bez_baronEyeL[0] = createVector(44.103, 51.621);
  bez_baronEyeL[1] = createVector(42.59, 50);
  bez_baronEyeL[2] = createVector(38.765, 47.987);
  bez_baronEyeL[3] = createVector(35.933, 48.086);
  bez_baronEyeL[4] = createVector(33.1, 48.186);
  bez_baronEyeL[5] = createVector(29.798, 50);
  bez_baronEyeL[6] = createVector(27.844, 51.472);
  bez_baronEyeR = new Array(7);
  bez_baronEyeR[0] = createVector(54.99, 52.639);
  bez_baronEyeR[1] = createVector(56.944, 51.052);
  bez_baronEyeR[2] = createVector(59.901, 48.125);
  bez_baronEyeR[3] = createVector(63.572, 48.131);
  bez_baronEyeR[4] = createVector(66.407, 48.136);
  bez_baronEyeR[5] = createVector(70.641, 49.941);
  bez_baronEyeR[6] = createVector(72.155, 51.689);


  FACE = createGraphics(100, 100);
  FACE.background(255);




  EAR = createGraphics(10, 40);
  EAR.background(255);
  EAR.stroke(100);
  EAR.strokeWeight(0.5);
  EAR.fill(128);
  EAR.ellipse(3, 12, 3, 3);
  EAR.ellipse(3, 20, 3, 3);
  EAR.ellipse(3, 28, 3, 3);



  SIGN = createGraphics(50, 50);
  SIGN.background(0);
  SIGN.noStroke();
  SIGN.fill(255);
  SIGN.ellipse(SIGN.width/2, SIGN.height/2, 37, 37);
  SIGN.fill(0);
  SIGN.ellipse(SIGN.width/2, SIGN.height/2, 30, 30);
  SIGN.fill(255);
  SIGN.ellipse(SIGN.width/2, SIGN.height/2, 15, 15);
  SIGN.fill(0);
  SIGN.ellipse(SIGN.width/2, SIGN.height/2, 8, 8);






  houses = new House();
  baron = new Baron();
  open_info_wichFloor = new Array(houses.node.length);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }



  sign_num = floor(random(0.5, 3));
  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      let angle = random(0+HALF_PI*0.25, HALF_PI*0.5+HALF_PI*0.25) + HALF_PI*floor(random(0, 4));
      let be = createVector(real(random(75, 100)), 0).rotate(angle);
      sign.push(new Sign(createVector(be.x, 0, be.y)));
    }
  }
}







function draw() {

  background(255);
  push();
  translate(0, real(100));

  roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI, HALF_PI)-HALF_PI/2);
  rotateY(roY);



  let screen_node = new Array(houses.node.length);
  for (let i=0; i<screen_node.length; i++) {
    screen_node[i] = screenPosition(houses.node[i]);
  }
  screen_node.push(screenPosition(houses.node_roof));







  houses.update();
  if (open_open) {
    baron.update();
  }
  if (sign_num > 0) {
    for (let i=0; i<sign.length; i++) {
      sign[i].update();
    }
  }
  if (!open_info) {
    SWIRL.background(map(c_swirl, 220, 255, 200, 255));
    SWIRL.fill(c_swirl);
    SWIRL.noStroke();
  } else {
    SWIRL.background(255);
    SWIRL.stroke(map(c_swirl, 220, 255, 180, 255));
    SWIRL.strokeWeight(0.25);
    SWIRL.noFill();
  }
  for (let i=0; i<20; i+=2) {
    SWIRL.beginShape();
    for (let j=0; j<20; j++) {
      let x = map(j, 0, 20, 0, SWIRL.width*0.75);
      let n = createVector(x, 0);
      n.rotate(map(j, 0, 20, 0, HALF_PI));
      n.rotate(map(i, 0, 20, 0, TWO_PI)+frameCount*0.05);
      n.add(SWIRL.width/2, SWIRL.height/2);
      SWIRL.vertex(n.x, n.y, n.z);
    }
    for (let j=19; j>=0; j--) {
      let x = map(j, 20, -1, SWIRL.width*0.75, 0);
      let n = createVector(x, 0);
      n.rotate(map(j, 20, -1, HALF_PI, 0));
      n.rotate(map(i+1, 0, 20, 0, TWO_PI)+frameCount*0.05);
      n.add(SWIRL.width/2, SWIRL.height/2);
      SWIRL.vertex(n.x, n.y, n.z);
    }
    SWIRL.endShape(CLOSE);
  }





  if (open_info) {
    for (let i=0; i<open_info_wichFloor.length; i++) {
      if (mouseY < screen_node[i].y+height/2  &&  mouseY > screen_node[i+1].y+height/2) {
        open_info_wichFloor[i] = true;
      } else {
        open_info_wichFloor[i] = false;
      }
    }




    displayInfo_3d();
    houses.displayInfo();
    if (sign_num > 0) {
      for (let i=0; i<sign.length; i++) {
        sign[i].displayInfo();
      }
    }
  } else {
    houses.display();
    if (sign_num > 0) {
      for (let i=0; i<sign.length; i++) {
        sign[i].display();
      }
    }
  }



  rotateY(QUARTER_PI);
  let baron_maxH = screenPosition(baron.node_head[baron.node_head.length-1]);
  let baron_gunPos = screenPosition(baron.node_gun[baron.node_gun.length-1]);
  if (open_info) {
    baron.displayInfo();
  } else {
    baron.display();
  }
  rotateY(-QUARTER_PI);




  //if (!open_info) {
  rotateY(-roY);
  translate(-real(500), -real(525), -real(200));
  image(SWIRL, 0, 0, real(1000), real(1000));
  // }
  pop();




  if (mouseX<width/3.0 && mouseX>0 && mouseY>0 && mouseY<height) {
    baron.ready_open_shot = true;
  } else if (mouseX>width/3.0*2 && mouseX<width && mouseY>0 && mouseY<height) {
    baron.ready_open_shot = true;
  } else {
    baron.ready_open_shot = false;
  }

  if (open_info && open_open && baron.ready_open_shot) {
    noFill();
    stroke(200);
    strokeWeight(real(0.75));
    beginShape(LINES);
    vertex(mouseX-width/2-real(10), mouseY-height/2-real(10));
    vertex(mouseX-width/2+real(10), mouseY-height/2+real(10));
    vertex(mouseX-width/2-real(10), mouseY-height/2+real(10));
    vertex(mouseX-width/2+real(10), mouseY-height/2-real(10));
    vertex(mouseX-width/2, mouseY-height/2);
    vertex(baron_gunPos.x, baron_gunPos.y);
    endShape();
  }
  if (baron.open_shot) {
    s_laser.pause();
    s_laser.play();
    baron.shot_begin = baron_gunPos.copy();
    baron.shot_end = createVector(mouseX-width/2, mouseY-height/2, 0);
    baron.shot_end = p5.Vector.sub(baron.shot_end, baron.shot_begin).setMag(real(random(200, 2000))).add(baron.shot_begin);
  }
  if (baron.open_time_shot) {
    //let target_end = p5.Vector.sub(baron.shot_end, baron.shot_begin).setMag(real(500)).add(baron.shot_begin);
    let p_shot = p5.Vector.sub(baron.shot_end, baron.shot_begin).mult(map(baron.time_shot, 0, 10, 0.0, 1.0)).add(baron.shot_begin);
    let p_shot_ = p5.Vector.sub(baron.shot_end, baron.shot_begin).mult(map(baron.time_shot-1, 0, 10, 0.0, 1.0)).add(baron.shot_begin);

    strokeWeight(real(3));
    stroke(160);
    line(p_shot.x, p_shot.y, real(0), p_shot_.x, p_shot_.y, real(0));
    strokeWeight(real(1));
    stroke(255);
    line(p_shot.x, p_shot.y, real(1), p_shot_.x, p_shot_.y, real(1));

    if (baron.time_shot < 3) {
      strokeWeight(real((baron.time_shot+1)*3));
      stroke(200);
      point(baron_gunPos);
    }
  }










  if (mouseY > screen_node[screen_node.length-1].y+height/2  && 
    mouseY < screen_node[0].y+height/2  &&
    mouseX > width/2 - houses.W*0.75  &&
    mouseX < width/2 + houses.W*0.75) {

    open_open = true;
    if (ready_open_song) {
      //song.play();
    }

    if (!song.isPlaying() && have_first_click) {
      song.play();
    }
    ready_open_song = false;
  } else {
    //open_open = false;
  }



  if (open_open) {
    if (mouseY > baron_maxH.y+height/2  && 
      mouseY < screen_node[0].y+height/2  &&
      mouseX > width/2 - baron.W_body*0.8  &&
      mouseX < width/2 +baron.W_body*0.8) {
      baron.open_fast = true;
      c_swirl = easing_x3(c_swirl, 220);
    } else {
      baron.open_fast = false;
      c_swirl = easing_x2(c_swirl, 255);
    }

    //if (song.isPlaying()) {
    let volume = constrain(map((c_swirl), 255, 220, 0, 1), 0, 1);
    song.amp(volume);
    //}
  } else {
    baron.open_fast = false;
    c_swirl = easing_x2(c_swirl, 255);

    if (song.isPlaying()) {
      song.pause();
      ready_open_song = true;
    }
  }
  //print(song.isPlaying());










  if (frameCount%160 == time_gap_wink) {
    time_gap_wink = floor(random(30, 160));
    open_winkL = true;
    open_winkR = true;
  }




  if (open_info) {
    PG.clear();
    displayInfo(screen_node);
    //displayInfo_true();
    if (open_open) {
      //PG.image(EYE, 30, 282, 50, 25);
      //PG.image(EYE2, 30+50, 282, 50, 25);
      PG.image(FACE, 30, 282, 100, 100);
    }
    //PG.image(SWIRL, 30, 300, 100, 100);
    PG.noFill();
    PG.stroke(200);
    PG.strokeWeight(1);
    //PG.rect(30, 173, 44, 44);
    PG.rect(30, 282, 100, 100);

    if (!open_open) {
      PG.line(30, 282, 30+100, 282+100);
      PG.line(30, 282+100, 30+100, 282);
      EAR.background(255);
      EAR.stroke(100);
      EAR.strokeWeight(0.5);
      EAR.fill(128);
      EAR.ellipse(3, 12, 3, 3);
      EAR.ellipse(3, 20, 3, 3);
      EAR.ellipse(3, 28, 3, 3);
    }
    PG.image(EAR, 30, 174, 12, 44);
    PG.rect(30, 174, 12, 44);

    image(PG, -width/2, -height/2, width, height);
  }
}










function displayInfo_3d() {
  noFill();
  stroke(200);
  strokeWeight(real(0.5));
  beginShape(LINES);
  vertex(houses.W/2, real(1), real(-500));
  vertex(houses.W/2, real(1), real(500));
  vertex(-houses.W/2, real(1), real(-500));
  vertex(-houses.W/2, real(1), real(500));
  vertex(real(500), real(1), houses.W/2);
  vertex(real(-500), real(1), houses.W/2);
  vertex(real(500), real(1), -houses.W/2);
  vertex(real(-500), real(1), -houses.W/2);
  endShape();


  stroke(200);
  strokeWeight(real(0.5));
  beginShape();
  for (let i=0; i<10; i++) {
    let x = cos(map(i, 0, 10, 0, TWO_PI))*real(75);
    let z = sin(map(i, 0, 10, 0, TWO_PI))*real(75);
    vertex(x, 0, z);
  }
  endShape(CLOSE);
  beginShape();
  for (let i=0; i<20; i++) {
    let x = cos(map(i, 0, 20, 0, TWO_PI))*real(120);
    let z = sin(map(i, 0, 20, 0, TWO_PI))*real(120);
    vertex(x, 0, z);
  }
  endShape(CLOSE);


  //stroke(191, 144, 144);
  stroke(223, 198, 198);
  strokeWeight(real(1));
  let w = real(120);
  let h = houses.node_roof.y*2;
  if (open_open) {
    h = baron.node_head[baron.node_head.length-1].y*2;
  }
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


function displayInfo(screen_node) {
  let x = 30;
  let y = 36;
  let gap = 12;
  PG.noStroke();
  PG.fill(0, 128);
  PG.textAlign(LEFT);
  PG.textSize(8);
  PG.text("State: SURPRISE", x, y+gap*0);
  PG.text("Theme: BARON", x, y+gap*1);
  PG.text("FloorNum: "+String(houses.node.length-1), x, y+gap*2);
  PG.text("NoiseSeed: "+nfc(houses.ran, 2), x, y+gap*3);
  PG.text("FloorWidth: "+nfc(houses.W, 2), x, y+gap*4);
  PG.text("FloorHeight: "+nfc(houses.H, 2), x, y+gap*5);
  PG.text("RoofHeight: "+nfc(houses.roofH_rate*houses.H, 2), x, y+gap*6);
  PG.text("AllHeight: "+nfc(abs(houses.node_roof.y), 2), x, y+gap*7);
  if (houses.is_door_face_left) {
    PG.text("DoorFace: LEFT", x, y+gap*8);
  } else {
    PG.text("DoorFace: RIGHT", x, y+gap*8);
  }
  PG.text("RoadNum: "+String(houses.road.length-1), x, y+gap*9);
  PG.text("SignNum: "+String(sign_num), x, y+gap*10);
  PG.text("Open: "+String(open_open), x, y+gap*11);
  PG.text("BaronWidth: "+nfc(baron.W_body, 2), x, y+gap*16);
  PG.text("BaronlHeight: "+nfc(baron.H_body + baron.H_head + baron.H_shoe + baron.H_leg, 2), x, y+gap*17);
  if (baron.ready_open_shot && open_open) {
    PG.text("ReadyShoot: TRUE", x, y+gap*18);
  } else {
    PG.text("ReadyShoot: FALSE", x, y+gap*18);
  }
  PG.text("ShootTime: "+String(baron.time_shot), x, y+gap*19);
  PG.text("WinkL: "+String(time_winkL), x, y+gap*20);
  PG.text("WinkR: "+String(time_winkR), x+58, y+gap*20);




  PG.noStroke();
  PG.fill(128, 30, 30);
  PG.textAlign(LEFT);
  PG.textSize(8);


  if (!open_open) {
    for (let i=0; i<open_info_wichFloor.length; i++) {
      if (open_info_wichFloor[i]) {
        let nodey = (screen_node[i].y + screen_node[i+1].y)/2*scaleRate + PG.height/2;
        if (i < open_info_wichFloor.length-1) {
          PG.text("node_up ("+nfc(houses.node[i+1].x, 2)+", "+nfc(houses.node[i+1].y, 2)+", "+nfc(houses.node[i+1].z, 2)+")", 310, nodey);
          PG.text("node_down ("+nfc(houses.node[i].x, 2)+", "+nfc(houses.node[i].y, 2)+", "+nfc(houses.node[i].z, 2)+")", 310, nodey+12);
        } else {
          PG.text("node_up ("+nfc(houses.node_roof.x, 2)+", "+nfc(houses.node_roof.y, 2)+", "+nfc(houses.node_roof.z, 2)+")", 310, nodey);
          PG.text("node_down ("+nfc(houses.node[i].x, 2)+", "+nfc(houses.node[i].y, 2)+", "+nfc(houses.node[i].z, 2)+")", 310, nodey+12);
        }
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
    PG.text("LittleHouse_11_b", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(0, 160);
    PG.text("@funnysandwich @ChangYuChia 2021.12.20", PG.width/2, PG.height-8);
  } else if (mouseY*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(0, 160);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
function displayInfo_true() {
  PG.fill(0, 100);
  PG.rect(5, 5, 200, 300);
  PG.fill(255);
  PG.noStroke();
  PG.textAlign(LEFT);
  PG.textSize(12);
  PG.text("W,H: "+width+", "+height, 10, 20);
  PG.text("P_W,H: "+PG.width+", "+PG.height, 10, 35);
  PG.text("scaleRate: "+scaleRate, 10, 50);
  PG.text("mouse: "+mouseX+", "+mouseY, 10, 65);
  PG.text("mouse_real: "+nfc(mouseX*scaleRate, 2)+", "+nfc(mouseY*scaleRate, 2), 10, 80);
  PG.text("houses_H: "+houses.H, 10, 95);
}



function easing_p(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.65), p);
}
function easing_p2(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.35), p);
}
function easing_p3(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.45), p);
}
function easing_p4(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.25), p);
}
function easing_p5(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.1), p);
}
function easing_p6(p, target) {
  return p5.Vector.add((p5.Vector.sub(target, p)).mult(0.8), p);
}

function easing_x(x, target) {
  return x + (target - x) * 0.1;
}
function easing_x2(x, target) {
  return x + (target - x) * 0.2;
}
function easing_x3(x, target) {
  return x + (target - x) * 0.005;
}
function easing_x4(x, target) {
  return x + (target - x) * 0.35;
}

function real(x) {
  x = x/scaleRate;
  return x;
}
function realZ(x, z) {
  x = x*map(z, 0, -500, 1, 2);
  return x;
}

function TPFxz(y, p1, p2) {  //Two-point Form    get x、z
  x = 0;
  z = 0;
  if (p2.y-p1.y == 0) {
    x = ((y - p1.y)*(p2.x-p1.x))/0.01 + p1.x;
    z = ((y - p1.y)*(p2.z-p1.z))/0.01 + p1.z;
    return createVector(x, y, z);
  } else {
    x = ((y - p1.y)*(p2.x-p1.x))/(p2.y-p1.y) + p1.x;
    z = ((y - p1.y)*(p2.z-p1.z))/(p2.y-p1.y) + p1.z;
    return createVector(x, y, z);
  }
}

function windowResized() {
  location.reload();
}

function colorWithAlpha(c, alpha) {
  let c_new = color(red(c), green(c), blue(c), alpha);
  return c_new;
}

document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
  }
};



document.onclick = function (event) {
  let e = event || window.event;

  //song.stop();
  if (!have_first_click) {//版本答案
    song.play();
    // song.pause();
  }// else {
  //  song.pause();
  //}
  //print(song.isPlaying()+" | "+ready_open_song);

  have_first_click = true;

  houses.change();
  baron.change();
  open_info_wichFloor = new Array(houses.node.length);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }

  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      sign.shift();
    }
  }
  sign_num = floor(random(0.5, 3));
  if (sign_num > 0) {
    for (let i=0; i<sign_num; i++) {
      let angle = random(0+HALF_PI*0.25, HALF_PI*0.5+HALF_PI*0.25) + HALF_PI*floor(random(0, 4));
      let be = createVector(real(random(75, 100)), 0).rotate(angle);
      sign.push(new Sign(createVector(be.x, 0, be.y)));
    }
  }
};



//@funnysandwich
