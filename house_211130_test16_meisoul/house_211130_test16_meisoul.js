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
 
 
 
 
 */


let canvas, PG, EYE, EYE2, SWIRL;
let scaleRate;

let houses;
let meisoul;
let tree_num;
let tree = [];

let roY;


let open_info = false;
let open_info_wichFloor;
let open_open=false;
let c_info, c_info2;

let eye_moveX=0.0, eye_moveY=0.0;
let bez_eyeL, bez_eyeR;
let open_winkL=false, open_winkR=false;
let ready_open_winkL=true, ready_open_winkR=true;
let time_winkL=0, time_winkR=0, time_gap_wink=0;

let c_swirl;



function setup() {
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
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
  roY = 0;



  bez_eyeL = new Array(15);
  bez_eyeL[0] = createVector(83.266, 41.242);
  bez_eyeL[1] = createVector(75.886, 32.512);
  bez_eyeL[2] = createVector(63.826, 25.979);
  bez_eyeL[3] = createVector(48.251, 25.979);
  bez_eyeL[4] = createVector(29.841, 25.979);
  bez_eyeL[5] = createVector(25.641, 35.94);
  bez_eyeL[6] = createVector(11.986, 39.545);
  bez_eyeL[7] = createVector(14.121, 38.941);
  bez_eyeL[8] = createVector(14.322, 38.878);
  bez_eyeL[9] = createVector(16.402, 38.049);
  bez_eyeL[10] = createVector(19.32, 42.268);
  bez_eyeL[11] = createVector(27.848, 51.302);
  bez_eyeL[12] = createVector(48.322, 51.302);
  bez_eyeL[13] = createVector(57.845, 51.302);
  bez_eyeL[14] = createVector(76.417, 46.666);


  EYE = createGraphics(100, 50);
  EYE.translate(-5, -20);
  if (!open_info) {
    EYE.background(0);
    //EYE.translate(-5, -20);
    EYE.fill(250);
    EYE.noStroke();
  } else {
    EYE.background(255);
    EYE.noFill();
    EYE.stroke(200);
    EYE.strokeWeight(2);
  }
  EYE.beginShape();
  EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
  EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
  EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
  EYE.bezierVertex(bez_eyeL[7].x, bez_eyeL[7].y, bez_eyeL[8].x, bez_eyeL[8].y, bez_eyeL[9].x, bez_eyeL[9].y);
  EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
  EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
  EYE.endShape();

  eye_moveX = easing_x2(eye_moveX, constrain(map(mouseX, width*0.15, width*0.85, 5, -5), -5, 5));
  eye_moveY = easing_x2(eye_moveY, constrain(map(mouseY, height*0.3, height*0.75, -7, 7), -7, 7));
  if (!open_info) {
    EYE.stroke(60);
    EYE.strokeWeight(3);
    EYE.fill(200);
  } else {
    EYE.noFill();
    EYE.stroke(200);
    EYE.strokeWeight(2);
  }
  EYE.ellipse(48.251+eye_moveX, 38.578+eye_moveY, 22.851, 22.851);
  if (!open_info) {
    EYE.noStroke();
    EYE.fill(30);
  } else {
    EYE.noFill();
    EYE.stroke(200);
    EYE.strokeWeight(2);
  }
  EYE.ellipse(48.251+eye_moveX, 38.578+eye_moveY, 9.433, 9.433);
  if (!open_info) {
    EYE.stroke(60);
    EYE.fill(250);
    EYE.strokeWeight(1.5);
  } else {
    EYE.noFill();
    EYE.stroke(200);
    EYE.strokeWeight(2);
  }
  EYE.ellipse(42.734+eye_moveX, 32.882+eye_moveY, 6.739, 6.739);

  if (!open_info) {
    EYE.fill(225);
    EYE.strokeWeight(1.75);
  } else {
    EYE.noFill();
    EYE.stroke(200);
    EYE.strokeWeight(2);
  }
  EYE.beginShape();
  EYE.vertex(83.266, 41.242);
  EYE.bezierVertex(81.713, 39.368, 79.476, 37.239, 77.209, 35.481);
  EYE.bezierVertex(74.593, 39.127, 74.982, 42.744, 76.646, 44.937);
  EYE.bezierVertex(79.116, 43.85, 80.93, 42.992, 83.266, 41.242);
  EYE.endShape();

  if (!open_info) {
    EYE.fill(0);
    EYE.noStroke();
    EYE.beginShape(TESS);
    EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
    EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
    EYE.vertex(0, 0);
    EYE.vertex(EYE.width, 0);
    EYE.endShape(CLOSE);
    EYE.beginShape(TESS);
    EYE.vertex(bez_eyeL[9].x, bez_eyeL[9].y);
    EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
    EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.vertex(EYE.width, EYE.height*2);
    EYE.vertex(0, EYE.height*2);
    EYE.endShape(CLOSE);

    EYE.stroke(60);
    EYE.noFill();
    EYE.strokeWeight(3);
    EYE.beginShape();
    EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
    EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
    EYE.bezierVertex(bez_eyeL[7].x, bez_eyeL[7].y, bez_eyeL[8].x, bez_eyeL[8].y, bez_eyeL[9].x, bez_eyeL[9].y);
    EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
    EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.endShape();
  }

  bez_eyeR = new Array(15);
  bez_eyeR[0] = createVector(16.102, 40.318);
  bez_eyeR[1] = createVector(24.39, 33.638);
  bez_eyeR[2] = createVector(39.692, 25.732);
  bez_eyeR[3] = createVector(55.265, 26.01);
  bez_eyeR[4] = createVector(79.632, 26.444);
  bez_eyeR[5] = createVector(79.857, 39.214);
  bez_eyeR[6] = createVector(92.521, 40.71);
  bez_eyeR[7] = createVector(90.62, 40.433);
  bez_eyeR[8] = createVector(89.949, 40.312);
  bez_eyeR[9] = createVector(87.905, 39.491);
  bez_eyeR[10] = createVector(81.239, 47.127);
  bez_eyeR[11] = createVector(75.372, 51.191);
  bez_eyeR[12] = createVector(54.922, 52.186);
  bez_eyeR[13] = createVector(43.734, 52.73);
  bez_eyeR[14] = createVector(24.523, 48.045);

  EYE2 = createGraphics(100, 50);
  EYE2.translate(5, -20);
  if (!open_info) {
    EYE2.background(0);
    //EYE.translate(-5, -20);
    EYE2.fill(250);
    EYE2.noStroke();
  } else {
    EYE2.background(255);
    EYE2.noFill();
    EYE2.stroke(200);
    EYE2.strokeWeight(2);
  }
  EYE2.beginShape();
  EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
  EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
  EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
  EYE2.bezierVertex(bez_eyeR[7].x, bez_eyeR[7].y, bez_eyeR[8].x, bez_eyeR[8].y, bez_eyeR[9].x, bez_eyeR[9].y);
  EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
  EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
  EYE2.endShape();

  if (!open_info) {
    EYE2.stroke(60);
    EYE2.strokeWeight(3);
    EYE2.fill(200);
  } else {
    EYE2.noFill();
    EYE2.stroke(200);
    EYE2.strokeWeight(2);
  }
  EYE2.ellipse(54.922+eye_moveX, 39.491+eye_moveY, 22.408, 22.408);
  if (!open_info) {
    EYE2.noStroke();
    EYE2.fill(30);
  } else {
    EYE2.noFill();
    EYE2.stroke(200);
    EYE2.strokeWeight(2);
  }
  EYE2.ellipse(54.922+eye_moveX, 39.491+eye_moveY, 8.738, 8.738);
  if (!open_info) {
    EYE2.stroke(60);
    EYE2.fill(250);
    EYE2.strokeWeight(1.5);
  } else {
    EYE2.noFill();
    EYE2.stroke(200);
    EYE2.strokeWeight(2);
  }
  EYE2.ellipse(49.574+eye_moveX, 33.864+eye_moveY, 6.022, 6.022);

  if (!open_info) {
    EYE2.fill(225);
    EYE2.strokeWeight(1.75);
  } else {
    EYE2.noFill();
    EYE2.stroke(200);
    EYE2.strokeWeight(2);
  }
  EYE2.beginShape();
  EYE2.vertex(16.102, 40.318);
  EYE2.bezierVertex(18.046, 38.729, 20.306, 37.188, 22.627, 35.765);
  EYE2.bezierVertex(25.243, 39.411, 24.847, 42.841, 23.183, 45.033);
  EYE2.bezierVertex(20.945, 43.931, 18.265, 42.29, 16.102, 40.318);
  EYE2.endShape();

  if (!open_info) {
    EYE2.fill(0);
    EYE2.noStroke();
    EYE2.beginShape(TESS);
    EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
    EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
    EYE2.vertex(EYE2.width, 0);
    EYE2.vertex(0, 0);
    EYE2.endShape(CLOSE);
    EYE2.beginShape(TESS);
    EYE2.vertex(bez_eyeR[9].x, bez_eyeR[9].y);
    EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
    EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.vertex(0, EYE2.height*2);
    EYE2.vertex(EYE2.width, EYE2.height*2);
    EYE2.endShape(CLOSE);

    EYE2.stroke(60);
    EYE2.noFill();
    EYE2.strokeWeight(3);
    EYE2.beginShape();
    EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
    EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
    EYE2.bezierVertex(bez_eyeR[7].x, bez_eyeR[7].y, bez_eyeR[8].x, bez_eyeR[8].y, bez_eyeR[9].x, bez_eyeR[9].y);
    EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
    EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.endShape();
  }

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


  houses = new House();
  meisoul = new Meisoul();
  open_info_wichFloor = new Array(houses.node.length);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }

  tree_num = floor(random(0.5, 1));
  if (tree_num > 0) {
    for (let i=0; i<tree_num; i++) {
      let angle = random(TWO_PI/tree_num * i, TWO_PI/tree_num * (i+1));
      let be = createVector(real(random(75, 120)), 0).rotate(angle);
      tree.push(new Tree(createVector(be.x, 0, be.y)));
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

  let meisoul_maxH = screenPosition(meisoul.node_E[meisoul.node_E.length-1][0]);
  let meisoul_eyeL = screenPosition(p5.Vector.add(meisoul.node_E[4][2], meisoul.node_E[3][1]).mult(0.5));
  let meisoul_eyeR = screenPosition(p5.Vector.add(meisoul.node_E[4][1], meisoul.node_E[3][0]).mult(0.5));




  houses.update();
  if (open_open) {
    meisoul.update();
  }
  if (tree_num > 0) {
    for (let i=0; i<tree.length; i++) {
      tree[i].update();
    }
  }
  SWIRL.background(255);
  if (!open_info) {
    SWIRL.fill(c_swirl);
    SWIRL.noStroke();
  } else {
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
    meisoul.displayInfo();
    if (tree_num > 0) {
      for (let i=0; i<tree.length; i++) {
        tree[i].displayInfo();
      }
    }
  } else {
    houses.display();
    meisoul.display();
    if (tree_num > 0) {
      for (let i=0; i<tree.length; i++) {
        tree[i].display();
      }
    }
  }


  //if (!open_info) {
  rotateY(-roY);
  translate(-real(500), -real(525), -real(200));
  image(SWIRL, 0, 0, real(1000), real(1000));
  // }
  pop();





  if (open_info && open_open) {
    noFill();
    //stroke(200);
    //strokeWeight(real(3));
    //point(meisoul_eyeL);
    //point(meisoul_eyeR);
    strokeWeight(real(1.25));
    if (!ready_open_winkL) {
      stroke(30, 30, 128);
    } else {
      stroke(200);
    }
    ellipse(meisoul_eyeL.x, meisoul_eyeL.y, real(14), real(14));
    if (!ready_open_winkR) {
      stroke(30, 30, 128);
    } else {
      stroke(200);
    }
    ellipse(meisoul_eyeR.x, meisoul_eyeR.y, real(14), real(14));
  }



  if (mouseY > screen_node[screen_node.length-1].y+height/2  && 
    mouseY < screen_node[0].y+height/2  &&
    mouseX > width/2 - houses.W*0.75  &&
    mouseX < width/2 + houses.W*0.75) {

    open_open = true;
  } else {
    //open_open = false;
  }

  if (open_open) {
    if (mouseY > meisoul_maxH.y+height/2  && 
      mouseY < screen_node[0].y+height/2  &&
      mouseX > width/2 - meisoul.W*0.8  &&
      mouseX < width/2 + meisoul.W*0.8) {
      meisoul.open_fast = true;
      c_swirl = easing_x3(c_swirl, 220);
    } else {
      meisoul.open_fast = false;
      c_swirl = easing_x2(c_swirl, 255);
    }
  } else {
    meisoul.open_fast = false;
    c_swirl = easing_x2(c_swirl, 255);
  }


  if (dist(mouseX-width/2, mouseY-height/2, meisoul_eyeL.x, meisoul_eyeL.y) < real(7)) {
    if (ready_open_winkL) {
      open_winkL = true;
      ready_open_winkL = false;
    }
  } else {
    ready_open_winkL = true;
  }

  if (dist(mouseX-width/2, mouseY-height/2, meisoul_eyeR.x, meisoul_eyeR.y) < real(7)) {
    if (ready_open_winkR) {
      open_winkR = true;
      ready_open_winkR = false;
    }
  } else {
    ready_open_winkR = true;
  }










  if (frameCount%180 == time_gap_wink) {
    time_gap_wink = floor(random(30, 180));
    open_winkL = true;
    open_winkR = true;
  }


  if (open_info) {
    PG.clear();
    displayInfo(screen_node);
    //displayInfo_true();
    PG.image(houses.POLE, 30, 173, 44, 44);
    if (open_open) {
      PG.image(EYE, 30, 282, 50, 25);
      PG.image(EYE2, 30+50, 282, 50, 25);
    }
    //PG.image(SWIRL, 30, 300, 100, 100);
    PG.noFill();
    PG.stroke(200);
    PG.strokeWeight(1);
    PG.rect(30, 173, 44, 44);
    PG.rect(30, 282, 100, 25);
    if (!open_open) {
      PG.line(30, 282, 30+100, 282+25);
      PG.line(30, 282+25, 30+100, 282);
    }
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
    h = meisoul.node_E[meisoul.node_E.length-1][0].y*2;
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
  PG.text("Theme: MEISOUL", x, y+gap*1);
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
  PG.text("PoleNum: "+String(houses.pole_num), x, y+gap*10);
  PG.text("Open: "+String(open_open), x, y+gap*11);
  PG.text("MeisoulWidth: "+nfc(meisoul.W, 2), x, y+gap*16);
  PG.text("MeisoulHeight: "+nfc(meisoul.H, 2), x, y+gap*17);
  PG.text("TentacleLenMin: "+nfc(meisoul.H*0.15, 2), x, y+gap*18);
  PG.text("TentacleLenMax: "+nfc(meisoul.H*0.23, 2), x, y+gap*19);
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
    PG.text("LittleHouse_10_a", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(0, 160);
    PG.text("@funnysandwich @ChangYuChia 2021.12.05", PG.width/2, PG.height-8);
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

function easing_x(x, target) {
  return x + (target - x) * 0.1;
}
function easing_x2(x, target) {
  return x + (target - x) * 0.2;
}
function easing_x3(x, target) {
  return x + (target - x) * 0.005;
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
  houses.change();
  meisoul.change();
  open_info_wichFloor = new Array(houses.node.length);
  for (let i=0; i<open_info_wichFloor.length; i++) {
    open_info_wichFloor[i] = false;
  }
  if (tree_num > 0) {
    for (let i=0; i<tree_num; i++) {
      tree.shift();
    }
  }
  tree_num = floor(random(0.5, 1));
  //tree_num = 400;
  if (tree_num > 0) {
    for (let i=0; i<tree_num; i++) {
      let angle = random(TWO_PI/tree_num * i, TWO_PI/tree_num * (i+1));
      let be = createVector(real(random(75, 220)), 0).rotate(angle);
      tree.push(new Tree(createVector(be.x, 0, be.y)));
    }
  }
};
function keyPressed() {
  if (key == ' ') {
    open_winkL = true;
  }
}
//@funnysandwich
