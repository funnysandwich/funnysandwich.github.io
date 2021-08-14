/*
 --------------------------
 test01
 
 核心跨线算法直接用原来的方法，结果不行，4个光球就跑不动了，电脑chrome勉强达到30fps，Firefox只有十几
 
 
 --------------------------
 test02
 
 问题出在shape的贴图数量太多
 把光球的texture整合成一整个就没问题了
 注意第一个vertex要设立在光球原点，不然vertex变成内角的话，贴图会有bug
 
 注意！要自动播放的声音不要用 sound 库，用 DOM，详见官网 Reference
 ⬆后来 DOM 也不能自动播放声音，被浏览器禁止了
 ⬆所以只能加一个开头载入的画面，然后让用户一定要点击再进入
 
 现在在 Chrome 浏览器下能顺畅跑，但是 Safari 首页不到10帧，尾页也只有30帧，中间能流畅
 
 适配 1920
 
 
 --------------------------
 test03
 
 在 test02 基础上做测试
 把主页面和 SP 融合，变成一个WEBGL, 但是 Safari 上吃不消这么大 size 的 WEBGL
 
 
 
 --------------------------
 test04
 
 在 test02 的基础上优化
 把 SP 和 PG 缩小
 
 声音全改为 sound 库播放，因为 Safari 用 DOM 播放好像有点问题
 
 
 
 --------------------------
 test05
 
 在 test04 的基础上增加移动端的模式
 
 
 */


let canvas;


let walls = [];
let lights = [];
let rayDetail;
let lightCount;


let spoon;
let spoon_rotateY_var;


let PG;
let SP;


let img_loading00, img_loading01, img_loading02, img_loading_hand;
let img_bowl00, img_bowl01;
let img_E, img_A, img_T;
let img_light = [];
let img_bar = [];
let img_kdlaf;
let img_sideText00, img_sideText01;
let img_page01, img_page02, img_page03;
let img_kdlaf2016, img_kdlaf2017, img_kdlaf2018, img_kdlaf2019, img_kdlaf2020;
let link_kdlaf2016, link_kdlaf2017, link_kdlaf2018, link_kdlaf2019, link_kdlaf2020;
let open_mask2016, open_mask2017, open_mask2018, open_mask2019, open_mask2020;

let sideW;
let scaleRate, scaleWH, scalePG;
let wait_side;
let beginY01, beginY02, beginY03, beginY04, beginY05;
let lightW;


let node_walls_E=[];
let node_walls_A=[];
let node_walls_A2=[];
let node_walls_T=[];
let node_walls_E_ori=[];
let node_walls_A_ori=[];
let node_walls_A2_ori=[];
let node_walls_T_ori=[];


let sound_0, sound_bkg, sound_glitch;
let open_climax, time_climax;


let scrollVar, scrollFlash;



let time_loading, v_loading, y01_loading, y02_loading;
let str_loading;



let open_scrollToTarget=[];
let is_pc, open_homepage;
let open_info, count_open_info;








function preload() {
  str_loading = createDiv("loading...");
  str_loading.style('font-size', '16px');
  str_loading.style('color', '#ffffff');
  str_loading.position(windowWidth/2 - 28, windowHeight/2 + 94/2 +20);

  img_loading00 = loadImage("data/img_loading00.png");
  img_loading01 = loadImage("data/img_loading01.png");
  img_loading02 = loadImage("data/img_loading02.png");
  img_loading_hand = loadImage("data/img_loading_hand.png");
  img_bowl00 = loadImage("data/img_bowl00.png");
  img_bowl01 = loadImage("data/img_bowl01.png");
  img_kdlaf = loadImage("data/img_kdlaf.png");
  img_sideText00 = loadImage("data/img_sideText00.png");
  img_sideText01 = loadImage("data/img_sideText01.png");
  img_E = loadImage("data/img_E.png");
  img_A = loadImage("data/img_A.png");
  img_T = loadImage("data/img_T.png");
  img_light.push(loadImage("data/light_Y3.png"));
  img_light.push(loadImage("data/light_R3.png"));
  img_light.push(loadImage("data/light_Y1.png"));
  img_light.push(loadImage("data/light_Y2.png"));
  img_bar.push(loadImage("data/img_bar0.jpg"));
  img_bar.push(loadImage("data/img_bar1.jpg"));
  img_bar.push(loadImage("data/img_bar2.jpg"));
  img_bar.push(loadImage("data/img_bar3.jpg"));
  img_page01 = loadImage("data/img_page01.jpg");
  img_page02 = loadImage("data/img_page02.jpg");
  img_page03 = loadImage("data/img_page03.jpg");


  node_walls_E_ori = loadStrings('data/walls_E.txt');
  node_walls_A_ori = loadStrings('data/walls_A.txt');
  node_walls_A2_ori = loadStrings('data/walls_A2.txt');
  node_walls_T_ori = loadStrings('data/walls_T.txt');


  sound_0 = loadSound('data/sound_3.mp3');
  sound_bkg = loadSound('data/sound_bkg.mp3');
  sound_glitch = loadSound('data/sound_glitch.mp3');
}












function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);


  SP = createGraphics(300, 380, WEBGL);


  spoon = new Spoon();


  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;


  img_bowl00.resize(920, 920*img_bowl00.height/img_bowl00.width);
  img_bowl01.resize(920, 920*img_bowl01.height/img_bowl01.width);



  if (width < 1274) {
    sideW = 268.0;
  } else {
    sideW = floor(width*0.21);
  }
  scaleRate = (width-sideW)/img_bowl00.width;
  scaleWH = float(width)/height;
  scrollFlash = 0;
  scrollVar = 0;
  rayDetail = 360;
  lightCount = 0;
  wait_side = 0;
  open_climax = false;
  time_climax = 0;
  spoon_rotateY_var = 0.0;
  open_mask2016 = false;
  open_mask2017 = false;
  open_mask2018 = false;
  open_mask2019 = false;
  open_mask2020 = false;
  open_homepage = false;
  time_loading = 28;
  v_loading = random(50, 250);
  y01_loading = (height-img_loading01.height)/2 -img_loading00.height;
  y02_loading = (height-img_loading02.height)/2 -img_loading00.height -img_loading01.height*1.35;
  count_open_info = 0;



  PG = createGraphics(600, floor(600.0/scaleWH)+150, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  lightW = max(floor(500*scaleRate), 500) * (1.0/scalePG);



  //img_kdlaf.resize(150, 150);
  //img_sideText00.resize(sideW, sideW*img_sideText00.height/img_sideText00.width);
  //img_sideText01.resize(sideW, sideW*img_sideText01.height/img_sideText01.width);
  //img_E.resize(159.3, 209.85);
  //img_A.resize(205.15, 209.85);
  //img_T.resize(171.94, 209.85);
  for (let i=0; i<img_light.length; i++) {
    //img_light[i].resize(500, 500);
  }
  for (let i=0; i<img_bar.length; i++) {
    //img_bar[i].resize(sideW, sideW*img_bar[i].height/img_bar[i].width);
    open_scrollToTarget.push(false);
  }
  img_page01.resize(920, 920*img_page01.height/img_page01.width);
  img_page02.resize(920, 920*img_page02.height/img_page02.width);
  img_page03.resize(920, 920*img_page03.height/img_page03.width);


  link_kdlaf2016 = createA("http://kdlaf.tnua.edu.tw/2016/", "2018", "_blank");
  link_kdlaf2017 = createA("http://kdlaf.tnua.edu.tw/2017/", "2017", "_blank");
  link_kdlaf2018 = createA("http://kdlaf.tnua.edu.tw/2018/", "2018", "_blank");
  link_kdlaf2019 = createA("http://kdlaf.tnua.edu.tw/2019/", "2019", "_blank");
  link_kdlaf2020 = createA("http://kdlaf.tnua.edu.tw/", "2020", "_blank");
  link_kdlaf2016.position(0, 0);
  link_kdlaf2017.position(0, 0);
  link_kdlaf2018.position(0, 0);
  link_kdlaf2019.position(0, 0);
  link_kdlaf2020.position(0, 0);
  img_kdlaf2016 = createImg("data/2016kdlaf.jpg");
  img_kdlaf2017 = createImg("data/2017kdlaf.jpg");
  img_kdlaf2018 = createImg("data/2018kdlaf.jpg");
  img_kdlaf2019 = createImg("data/2019kdlaf.jpg");
  img_kdlaf2020 = createImg("data/2020kdlaf.jpg");
  img_kdlaf2016.position(0, 0);
  img_kdlaf2017.position(0, 0);
  img_kdlaf2018.position(0, 0);
  img_kdlaf2019.position(0, 0);
  img_kdlaf2020.position(0, 0);
  img_kdlaf2016.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2017.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2018.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2019.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2020.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2016.parent(link_kdlaf2016);
  img_kdlaf2017.parent(link_kdlaf2017);
  img_kdlaf2018.parent(link_kdlaf2018);
  img_kdlaf2019.parent(link_kdlaf2019);
  img_kdlaf2020.parent(link_kdlaf2020);
  link_kdlaf2016.hide();
  link_kdlaf2017.hide();
  link_kdlaf2018.hide();
  link_kdlaf2019.hide();
  link_kdlaf2020.hide();
  link_kdlaf2016.mouseOver(mouseOver2016);
  link_kdlaf2017.mouseOver(mouseOver2016);
  link_kdlaf2018.mouseOver(mouseOver2016);
  link_kdlaf2019.mouseOver(mouseOver2016);
  link_kdlaf2020.mouseOver(mouseOver2016);
  link_kdlaf2016.mouseOut(mouseOut2016);
  link_kdlaf2017.mouseOut(mouseOut2017);
  link_kdlaf2018.mouseOut(mouseOut2018);
  link_kdlaf2019.mouseOut(mouseOut2019);
  link_kdlaf2020.mouseOut(mouseOut2020);


  str_loading = createDiv("loading...");
  str_loading.style('font-size', '16px');
  str_loading.style('color', '#ffffff');
  str_loading.position(width/2 - 28, height/2 + img_loading00.height/2 +20);




  beginY01 = floor(sideW*(img_sideText01.height/img_sideText01.width));
  beginY02 = floor(beginY01 +height +(img_page01.height*scaleRate-height));
  beginY03 = floor(beginY02 +height +(img_page02.height*scaleRate-height));
  beginY04 = floor(beginY03 +height +(img_page03.height*scaleRate-height));
  beginY05 = beginY04 + 600;



  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.236, height*0.115).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.693, height*0.212).mult(1.0/scalePG);
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





  //lights.push(new Light());




  //sound_0.autoplay(true);
  open_info = true;
}






function mouseOver2016() {
  open_mask2016 = true;
}
function mouseOver2017() {
  open_mask2016 = true;
}
function mouseOver2018() {
  open_mask2016 = true;
}
function mouseOver2019() {
  open_mask2016 = true;
}
function mouseOver2020() {
  open_mask2016 = true;
}
function mouseOut2016() {
  open_mask2016 = false;
}
function mouseOut2017() {
  open_mask2016 = false;
}
function mouseOut2018() {
  open_mask2016 = false;
}
function mouseOut2019() {
  open_mask2016 = false;
}
function mouseOut2020() {
  open_mask2016 = false;
}






function draw() {
  if (!open_homepage) {
    if (v_loading > 1)  v_loading -= 1 ;
    else {
      v_loading = 1;
    }
    let s_y02_loading = constrain(map(y02_loading/(v_loading*0.25), 0, y02_loading, y02_loading, (height-img_loading00.height)/2), y02_loading, (height-img_loading00.height)/2);
    let s_y01_loading = constrain(map(y01_loading/(v_loading*0.25), 0, y01_loading, y01_loading, (height-img_loading00.height)/2), y01_loading, (height-img_loading00.height)/2);
    if (open_info)  background(60);
    else  background(0);

    push();
    if (v_loading == 1  &&  time_loading > 180) {
      translate(width/2, height/2);
      scale(map(sin(map(min(time_loading % 180, 30), 0, 30, 0, PI)), 0, 1, 1, 0.85));
      translate(-width/2, -height/2);
    }
    image(img_loading02, (width-img_loading02.width)/2, s_y02_loading);
    image(img_loading01, (width-img_loading01.width)/2, s_y01_loading);
    image(img_loading00, (width-img_loading00.width)/2, (height-img_loading00.height)/2);

    if (time_loading > 180  &&  time_loading % 180 <= 45) {
      tint(255, map(sin(map(min(time_loading % 180, 45), 0, 45, 0, PI)), 0, 1, 0, 255));
      image(img_loading_hand, (width-img_loading_hand.width)/2, (height-img_loading_hand.height)/2);
      noTint();
    }
    pop();


    if (v_loading == 1) {
      str_loading.hide();
      time_loading ++;
      noFill();
      stroke(255, min(map(min(time_loading % 180, 60), 30, 60, 255, 0), 255));
      strokeWeight(1);
      let d = map(min(time_loading % 180, 60), 0, 60, 0, 200);
      ellipse(width/2, height/2, d, d);
    }

    if (open_info) {
      displayInfo();
    }
  } else {

    if (open_info)  background(60);
    else  background(0);





    if (open_climax) {
      time_climax ++;
      if (time_climax == 1) {
        sound_glitch.play();
        scrollVar = height*0.25;
        wait_side = 31;
      } else if (time_climax > 15) {
        open_climax = false;
        time_climax = 0;
      }
    } else {
      time_climax = 0;
      if (scrollVar ==0 && frameCount % 480 == 0)  open_climax = true;
    }




    scrollVar += scrollFlash;
    if (scrollVar<0)  scrollVar = 0;
    if (!open_scrollToTarget[0] && !open_scrollToTarget[1] && !open_scrollToTarget[2] && !open_scrollToTarget[3]) {
      if (scrollVar > 0  &&  scrollVar < height/2) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((0-scrollVar)*0.05);
        }
      } else if (scrollVar > height/2  &&  scrollVar < height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY01+height-height*0.25  &&  scrollVar < beginY01+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY01+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY02  &&  scrollVar < beginY02+height*0.5) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((beginY02-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY02+height*0.5  &&  scrollVar < beginY02+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY02+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY03  &&  scrollVar < beginY03+height*0.5) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((beginY03-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY03+height*0.5  &&  scrollVar < beginY03+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY03+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY05) {
        scrollVar = beginY05;
      }
    }


    if (open_scrollToTarget[0]) {
      open_scrollToTarget[1] = false;
      open_scrollToTarget[2] = false;
      open_scrollToTarget[3] = false;
      scrollVar += floor((0-scrollVar)*0.05);
      if (scrollVar == 0 )  open_scrollToTarget[0] = false;
    } else if (open_scrollToTarget[1]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[2] = false;
      open_scrollToTarget[3] = false;
      scrollVar += floor((beginY01+height-scrollVar)*0.05);
      if (scrollVar == beginY01+height)  open_scrollToTarget[1] = false;
    } else if (open_scrollToTarget[2]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[1] = false;
      open_scrollToTarget[3] = false;
      if (beginY02+height-scrollVar > 0) {
        scrollVar += ceil((beginY02+height-scrollVar)*0.05);
      } else {
        scrollVar += floor((beginY02+height-scrollVar)*0.05);
      }
      if (scrollVar == beginY02+height)  open_scrollToTarget[2] = false;
    } else if (open_scrollToTarget[3]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[1] = false;
      open_scrollToTarget[2] = false;
      if (beginY03+height-scrollVar > 0) {
        scrollVar += ceil((beginY03+height-scrollVar)*0.05);
      } else {
        scrollVar += floor((beginY03+height-scrollVar)*0.05);
      }
      if (scrollVar == beginY03+height)  open_scrollToTarget[3] = false;
    }








    //-------------------------------- ⬇首页侧边⬇ --------------------------------
    push();
    translate(0, -scrollVar);
    image(img_sideText00, width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
    image(img_sideText01, width-sideW, height, sideW, sideW*(img_sideText01.height/img_sideText01.width));
    if (open_info) {
      stroke(0, 255, 0);
      noFill();
      strokeWeight(1);
      rect(width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
      rect(width-sideW, height, sideW, sideW*(img_sideText01.height/img_sideText01.width));
      textSize(12);
      fill(0, 255, 0);
      text("w: "+sideW+"\nh: "+sideW*(img_sideText00.height/img_sideText00.width), width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width)*0.5);
      text("w: "+sideW+"\nh: "+sideW*(img_sideText01.height/img_sideText00.width), width-sideW, height+sideW*(img_sideText01.height/img_sideText01.width)*0.5);
    }
    pop();
    //-------------------------------- ⬆首页侧边⬆ --------------------------------



    //-------------------------------- ⬇侧边导航栏⬇ --------------------------------
    if (scrollVar > beginY01) {
      if (scrollVar  <  beginY01 + sideW*(img_bar[0].height/img_bar[0].width)) {
        image(img_bar[0], width-sideW, map(scrollVar, beginY01, beginY01+img_bar[0].height, -img_bar[0].height, 0), sideW, sideW*(img_bar[0].height/img_bar[0].width));
      } else {
        image(img_bar[0], width-sideW, 0, sideW, sideW*(img_bar[0].height/img_bar[0].width));
      }
    }

    if (scrollVar > beginY01+height - sideW*(img_bar[0].height/img_bar[0].width)) {
      if (scrollVar  <  beginY01+height) {
        image(img_bar[1], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height, sideW*(img_bar[0].height/img_bar[0].width)), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height +sideW*(img_bar[0].height/img_bar[0].width), height -sideW*(img_bar[0].height/img_bar[0].width)*2 ), sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height +sideW*(img_bar[0].height/img_bar[0].width)*2, height -sideW*(img_bar[0].height/img_bar[0].width) ), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else if (scrollVar < beginY02+height) {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, map(max(scrollVar, beginY02), beginY02, beginY02 +height, height -sideW*(img_bar[0].height/img_bar[0].width)*2, sideW*(img_bar[0].height/img_bar[0].width)*2), sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, height -sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else if (scrollVar < beginY03+height) {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*2, sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, map(max(scrollVar, beginY03), beginY03, beginY03 +height, height -sideW*(img_bar[0].height/img_bar[0].width), sideW*(img_bar[0].height/img_bar[0].width)*3), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*2, sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*3, sideW, sideW*(img_bar[3].height/img_bar[3].width));
      }
    }
    //-------------------------------- ⬆侧边导航栏⬆ --------------------------------


    //-------------------------------- ⬇页面01⬇ --------------------------------
    if (scrollVar > beginY01  &&  scrollVar < beginY02 +height) {
      image(img_page01, 0, map(scrollVar, beginY01, beginY01 +height, height, 0), img_page01.width*scaleRate, img_page01.height*scaleRate);
      if (open_info) {
        fill(128, 128, 255, 60);
        strokeWeight(3);
        stroke(128, 128, 255);
        rect(0, map(scrollVar, beginY01, beginY01 +height, height, 0), img_page01.width*scaleRate, img_page01.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0));
        strokeWeight(1);
        fill(128, 128, 255);
        textSize(15);
        text("w: "+nfc(img_page01.width*scaleRate, 3)+"\nh: "+nfc(img_page01.height*scaleRate, 3), 5, map(scrollVar, beginY01, beginY01 +height, height, 0) +img_page01.height*scaleRate*0.5);
        textSize(30);
        text("beginY01: "+beginY01, (width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0)+30);
      }
    }
    //-------------------------------- ⬆页面01⬆ --------------------------------


    //-------------------------------- ⬇页面02⬇ --------------------------------
    if (scrollVar > beginY02  &&  scrollVar < beginY03 +height) {
      image(img_page02, 0, map(scrollVar, beginY02, beginY02 +height, height, 0), img_page02.width*scaleRate, img_page02.height*scaleRate);
      if (open_info) {
        fill(60, 128, 128, 60);
        strokeWeight(3);
        stroke(60, 128, 128);
        rect(0, map(scrollVar, beginY02, beginY02 +height, height, 0), img_page02.width*scaleRate, img_page02.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0));
        strokeWeight(1);
        fill(60, 128, 128);
        textSize(15);
        text("w: "+nfc(img_page02.width*scaleRate, 3)+"\nh: "+nfc(img_page02.height*scaleRate, 3), 5, map(scrollVar, beginY02, beginY02 +height, height, 0) +img_page02.height*scaleRate*0.5);
        textSize(30);
        text("beginY02: "+beginY02, (width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0)+30);
      }
    }
    //-------------------------------- ⬆页面02⬆ --------------------------------


    //-------------------------------- ⬇页面03⬇ --------------------------------
    if (scrollVar > beginY03) {
      image(img_page03, 0, map(scrollVar, beginY03, beginY03 +height, height, 0), img_page03.width*scaleRate, img_page03.height*scaleRate);
      link_kdlaf2016.show();
      link_kdlaf2017.show();
      link_kdlaf2018.show();
      link_kdlaf2019.show();
      link_kdlaf2020.show();
      link_kdlaf2020.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +146.639*scaleRate);
      link_kdlaf2019.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +451.676*scaleRate);
      link_kdlaf2018.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +756.549*scaleRate);
      link_kdlaf2017.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +1061.5*scaleRate);
      link_kdlaf2016.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +1366.374*scaleRate);


      if (open_info) {
        fill(128, 60, 128, 60);
        strokeWeight(3);
        stroke(128, 60, 128);
        rect(0, map(scrollVar, beginY03, beginY03 +height, height, 0), img_page03.width*scaleRate, img_page03.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY03, beginY03 +height, height, 0));
        strokeWeight(1);
        fill(128, 60, 128);
        textSize(15);
        text("w: "+nfc(img_page03.width*scaleRate, 3)+"\nh: "+nfc(img_page03.height*scaleRate, 3), 5, map(scrollVar, beginY03, beginY03 +height, height, 0) +img_page03.height*scaleRate*0.5);
        textSize(30);
        text("beginY03: "+beginY03, (width-sideW)/2, map(scrollVar, beginY03, beginY03 +height, height, 0)+30);
      }
    } else {
      link_kdlaf2016.hide();
      link_kdlaf2017.hide();
      link_kdlaf2018.hide();
      link_kdlaf2019.hide();
      link_kdlaf2020.hide();
    }
    //-------------------------------- ⬆页面03⬆ --------------------------------


    if (scrollVar > beginY04) {
      if (open_info) {
        stroke(128, 128, 60);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)));
        fill(128, 128, 60);
        strokeWeight(1);
        textSize(30);
        text("beginY04: "+beginY04, (width-sideW)/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04))+30);
      }
    }





    if (scrollVar < beginY01+height) {
      push();
      if (scrollVar > beginY01) {
        translate(0, -min(scrollVar-beginY01, height));
      }

      //-------------------------------- ⬇后面半个碗⬇ --------------------------------
      push();
      if (scrollVar > beginY01) {
        translate((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(min(map(scrollVar, beginY01, beginY01+height, 0, PI), PI));
        translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));
      }
      image(img_bowl00, 0, height-((min(scaleRate, 1.00)*img_bowl00.height)*0.528), width-sideW, scaleRate*img_bowl00.height);
      pop();
      //-------------------------------- ⬆后面半个碗⬆ --------------------------------



      image(img_kdlaf, 0, 0, max((150.0/1274)*width, 150), max((150.0/1274)*width, 150));



      PG.background(255, 0);
      //PG.clear();
      PG.push();
      PG.translate(-PG.width/2, -PG.height/2);

      //PG.blendMode(EXCLUSION);
      if (!open_info) {
        for (let i=0; i<lights.length; i++) {
          lights[i].display();
        }
      } else {
        for (let i=0; i<lights.length; i++) {
          lights[i].displayInfo();
        }
      }
      PG.blendMode(BLEND);

      PG.pop();



      //SP.background(255, 0);
      SP.clear();
      SP.push();
      //SP.translate(-SP.width/2, -SP.height/2);
      //SP.translate((width-sideW)*0.5,  height*0.9);

      //if (scrollVar > img_sideText01.height+height*0.25) {
      //  let s_spoon_rotateY_var  =  map(min(scrollVar,img_sideText01.height+height*0.5), img_sideText01.height+height*0.25, img_sideText01.height+height*0.5, spoon_rotateY_var%TWO_PI, 0);
      //  SP.rotateY(s_spoon_rotateY_var % TWO_PI);
      //} else {
      if (open_climax)  spoon_rotateY_var += -0.025;
      else  spoon_rotateY_var += -0.001;
      SP.rotateY(spoon_rotateY_var % TWO_PI);
      //}
      SP.rotateZ(-0.25);

      //SP.translate(img_bowl01.width*0.913*0.05, 0);
      SP.translate(SP.width/9.0, SP.height*0.28);

      if (!open_info) {
        spoon.display();
      } else {
        spoon.displayInfo();
      }
      SP.pop();




      if (spoon_rotateY_var % TWO_PI  <=  -PI) {
        push();
        translate(0, constrain(map(scrollVar, beginY01+height*0.75, beginY01+height, 0, height*2), 0, height*2));
        translate(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(constrain(map(scrollVar, beginY01, beginY01+height, 0, PI), 0, PI));
        translate(-SP.width*scaleRate*0.5*3-((width-sideW)-SP.width*scaleRate*3)/2.0, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));      
        image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);     
        if (open_info) {
          noFill();
          stroke(255, 128, 128);
          strokeWeight(3);
          rect(((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);
          strokeWeight(35);
          point(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        }
        pop();
      }
      image(PG, 0, constrain(map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, 0, -300), -300, 0), width, ceil(width*(float(PG.height)/PG.width)));






      if (!open_info) {
        fill(0);
        stroke(0);
        strokeWeight(1);
        beginShape();
        for (let i=0; i<node_walls_E.length; i++) {
          vertex(node_walls_E[i].x *scalePG, node_walls_E[i].y *scalePG);
        }
        endShape(CLOSE);
        beginShape();
        for (let i=0; i<node_walls_A.length; i++) {
          vertex(node_walls_A[i].x *scalePG, node_walls_A[i].y *scalePG);
        }
        endShape(CLOSE);
        beginShape();
        for (let i=0; i<node_walls_A2.length; i++) {
          vertex(node_walls_A2[i].x *scalePG, node_walls_A2[i].y *scalePG);
        }
        endShape(CLOSE);
        beginShape();
        for (let i=0; i<node_walls_T.length; i++) {
          vertex(node_walls_T[i].x *scalePG, node_walls_T[i].y *scalePG);
        }
        endShape(CLOSE);

        if (!open_climax) {
          image(img_E, (width-sideW)*0.236, height*0.115, min(scaleRate, 1.47)*159.3, min(scaleRate, 1.47)*159.3*(img_E.height/img_E.width));
          image(img_A, (width-sideW)*0.442, height*0.352, min(scaleRate, 1.47)*205.15, min(scaleRate, 1.47)*205.15*(img_A.height/img_A.width));
          image(img_T, (width-sideW)*0.693, height*0.212, min(scaleRate, 1.47)*171.94, min(scaleRate, 1.47)*171.94*(img_T.height/img_T.width));
        } else {
          image(img_E, (width-sideW)*0.236, height*0.115 + random(height*0.01, height*0.025), min(scaleRate, 1.47)*159.3, min(scaleRate, 1.47)*159.3*(img_E.height/img_E.width));
          image(img_A, (width-sideW)*0.442, height*0.352+ random(height*0.01, height*0.025), min(scaleRate, 1.47)*205.15, min(scaleRate, 1.47)*205.15*(img_A.height/img_A.width));
          image(img_T, (width-sideW)*0.693, height*0.212+ random(height*0.01, height*0.025), min(scaleRate, 1.47)*171.94, min(scaleRate, 1.47)*171.94*(img_T.height/img_T.width));
        }
      } else {
        for (let i=0; i<walls.length; i++) {
          walls[i].displayInfo();
        }
      }


      if (spoon_rotateY_var % TWO_PI  >  -PI) {
        push();
        translate(0, constrain(map(scrollVar, beginY01+height*0.75, beginY01+height, 0, height*2), 0, height*2));
        translate(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(constrain(map(scrollVar, beginY01, beginY01+height, 0, PI), 0, PI));
        translate(-SP.width*scaleRate*0.5*3-((width-sideW)-SP.width*scaleRate*3)/2.0, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));      
        image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);     
        if (open_info) {
          noFill();
          stroke(255, 128, 128);
          strokeWeight(3);
          rect(((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);
          strokeWeight(35);
          point(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        }
        pop();
      }






      //-------------------------------- ⬇前面半个碗⬇ --------------------------------
      push();
      if (scrollVar > beginY01) {
        translate((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(min(map(scrollVar, beginY01, beginY01+height, 0, PI), PI));
        translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));
      }
      image(img_bowl01, 0, height-((min(scaleRate, 1.00)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
      if (open_info) {
        noFill();
        stroke(255, 255, 128);
        strokeWeight(1);
        rect(0, height-((min(scaleRate, 1.00)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
        fill(255, 255, 128);
        text("w: "+(width-sideW)+"\nh: "+scaleRate*img_bowl01.height, 0, height-100);
        strokeWeight(30);
        point((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
      }
      pop();
      //-------------------------------- ⬆前面半个碗⬆ --------------------------------



      pop();
    }



    if (scrollVar > beginY04) {
      SP.clear();
      SP.push();

      SP.rotateY(spoon_rotateY_var % TWO_PI);
      SP.rotateZ(0);
      SP.translate(0, SP.height*0.28);

      if (!open_info) {
        spoon.display();
      } else {
        spoon.displayInfo();
      } 
      SP.pop();

      image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*min(scaleRate, 1.47)*0.45*3, SP.width*scaleRate*3, SP.height*min(scaleRate, 1.47)*3);     
      if (open_info) {
        noFill();
        stroke(255, 128, 128);
        strokeWeight(3);
        rect(((width-sideW)-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*min(scaleRate, 1.47)*0.45*3, SP.width*scaleRate*3, SP.height*min(scaleRate, 1.47)*3);
      }
    }








    if (lights.length > 4) {
      lights[0].dead = true;
    }
    for (let i=0; i<lights.length; i++) {
      if (lights[i].dead  &&  lights[i].life <= 0) {
        lights.shift();
      }
    }



    if (open_info)  displayInfo();
    else {
      fill(100);
      noStroke();
      text("fps: " + nfc(frameRate(), 1), 10, 20);
    }

    scrollFlash = 0;

    if (mouseX > width-sideW) {
      if (scrollVar >= beginY01+sideW*(img_bar[0].height/img_bar[0].width)  &&  scrollVar < beginY01+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY01+height  &&  scrollVar < beginY02) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else if (mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY02  &&  scrollVar < beginY02+height) {
        if ( mouseY < sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else if ( mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY02+height  &&  scrollVar < beginY03) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*3) {
          cursor(HAND);
        } else if (mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY03  &&  scrollVar < beginY03+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*3) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY03+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*4) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else  cursor(ARROW);
    } else  cursor(ARROW);
  }
}





















function displayInfo() {

  fill(0, 128);
  noStroke();
  rect(0, 0, 350, 360);
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
  text("scaleWH: "+nfc(scaleWH, 6), 10, 155);
  text("W : H:  1 : "+nfc(1.0/scaleWH, 6), 10, 170);
  text("scrollVar: "+scrollVar+"   flash: "+scrollFlash, 10, 185);
  text("beginY01: "+beginY01+"   + height= "+(beginY01+height), 10, 200);
  text("[1] "+open_scrollToTarget[1]+"   "+floor((beginY01+height-scrollVar)*0.05), 10, 215);
  text("beginY02: "+beginY02+"   + height= "+(beginY02+height), 10, 230);
  text("[2] "+open_scrollToTarget[2]+"   "+floor((beginY02+height-scrollVar)*0.05), 10, 245);
  text("beginY03: "+beginY03+"   + height= "+(beginY03+height), 10, 260);
  text("[3] "+open_scrollToTarget[3]+"   "+floor((beginY03+height-scrollVar)*0.05), 10, 275);
  text("------------", 10, 290);
  text("open_climax: "+open_climax, 10, 305);
  text("time_climax: "+time_climax, 10, 320);

  text("lightCount: "+lightCount, 220, 35);
  text("lightNum: "+lights.length, 220, 50);
  text("rayDetail: "+rayDetail, 220, 65);
  text("lightW: "+lightW, 220, 80);
  text("------------", 220, 95);
  text("PG.width: "+PG.width, 220, 110);
  text("PG.height: "+PG.height, 220, 125);
  text("scalePG: "+scalePG, 220, 140);
  text("------------", 220, 155);
  text("spoon_rotateY_var: "+spoon_rotateY_var, 220, 170);
}










function keyPressed() {
  if (key === 'i' || key === 'I') {
    open_info = !open_info;
    PG = createGraphics(600, floor(600.0/scaleWH)+150, WEBGL);
    PG.textureMode(NORMAL);
    scalePG = float(width) / PG.width;
  }
}










function mouseWheel(event) {
  if (open_homepage) {
    scrollFlash = event.delta;
    //uncomment to block page scrolling
    //return false;
    time_climax = 0;
    for (let i=0; i<open_scrollToTarget.length; i++) {
      open_scrollToTarget[i] = false;
    }
  }
}






function mouseClicked() {
}






function mouseReleased() {
}



function touchStarted() 
{
  if (count_open_info==0 && mouseX<100 && mouseY<100) {
    count_open_info = 1;
  } else if (count_open_info==1 && mouseX<100 && mouseY<100) {
    count_open_info = 2;
  } else if (count_open_info==2 && mouseX>width-100 && mouseY<100) {
    count_open_info = 3;
  } else if (count_open_info==3 && mouseX>width-100 && mouseY<100) {
    count_open_info = 4;
  } else if (count_open_info==4 && mouseX<100 && mouseY>height-100) {
    count_open_info = 5;
  } else if (count_open_info==5 && mouseX<100 && mouseY>height-100) {
    count_open_info = 6;
  } else if (count_open_info==6 && mouseX>width-100 && mouseY>height-100) {
    count_open_info = 7;
  } else if (count_open_info==7 && mouseX>width-100 && mouseY>height-100) {
    count_open_info = 0;
    open_info = !open_info;
    PG = createGraphics(600, floor(600.0/scaleWH)+150, WEBGL);
    PG.textureMode(NORMAL);
    scalePG = float(width) / PG.width;
  } else {
    count_open_info = 0;
  }


  if (!open_homepage) {
    if (v_loading == 1) {
      open_homepage = true;
      lights.push(new Light());
      let speed = map(mouseY, 0.1, height, 2, 0.75);
      speed = constrain(speed, 0.75, 4);
      sound_0.rate(speed);
      sound_0.play();

      sound_bkg.loop();
    }
  } else {
    if (scrollVar < beginY01 + height*0.25) {
      lights.push(new Light());

      let speed = map(mouseY, 0.1, height, 2, 0.75);
      speed = constrain(speed, 0.75, 4);
      sound_0.rate(speed);
      sound_0.play();
    }




    if (scrollVar >= beginY01 + sideW*(img_bar[0].height/img_bar[0].width)) {
      if (mouseX > width-sideW  &&  mouseY < sideW*(img_bar[0].height/img_bar[0].width)) {
        open_scrollToTarget[0] = true;
      }
    }
    if (scrollVar >= beginY01 + height) {
      if (mouseX > width-sideW   &&  mouseY > sideW*(img_bar[0].height/img_bar[0].width)  &&  mouseY < sideW*(img_bar[0].height/img_bar[0].width)*2) {
        open_scrollToTarget[1] = true;
      }
    }
    if (scrollVar >= beginY01 + height  &&  scrollVar <= beginY02) {
      if (mouseX > width-sideW   &&  mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)*2  &&  mouseY < height-sideW*(img_bar[0].height/img_bar[0].width)) {
        open_scrollToTarget[2] = true;
      }
    } else if (scrollVar >= beginY02 + height) {
      if (mouseX > width-sideW   &&  mouseY > sideW*(img_bar[0].height/img_bar[0].width)*2  &&  mouseY < sideW*(img_bar[0].height/img_bar[0].width)*3) {
        open_scrollToTarget[2] = true;
      }
    }
    if (scrollVar >= beginY01 + height  &&  scrollVar <= beginY03) {
      if (mouseX > width-sideW   &&  mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)  &&  mouseY < height) {
        open_scrollToTarget[3] = true;
      }
    } else if (scrollVar >= beginY03 + height) {
      if (mouseX > width-sideW   &&  mouseY > sideW*(img_bar[0].height/img_bar[0].width)*3  &&  mouseY < sideW*(img_bar[0].height/img_bar[0].width)*4) {
        open_scrollToTarget[3] = true;
      }
    }
  }
}






function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > windowHeight)  is_pc = true;
  else  id_pc = false;


  if (width < 1274) {
    sideW = 268.0;
  } else {
    sideW = floor(width*0.21);
  }
  scaleRate = (width-sideW)/img_bowl00.width;
  scaleWH = float(width)/height;


  PG = createGraphics(600, floor(600.0/scaleWH)+150, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  //SP = createGraphics(width, height, WEBGL);
  lightW = max(floor(500*scaleRate), 500) * (1.0/scalePG);



  img_kdlaf2016.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2017.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2018.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2019.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2020.size(720*scaleRate, 165.197*scaleRate);


  beginY01 = floor(sideW*(img_sideText01.height/img_sideText01.width));
  beginY02 = floor(beginY01 +height +(img_page01.height*scaleRate-height));
  beginY03 = floor(beginY02 +height +(img_page02.height*scaleRate-height));
  beginY04 = floor(beginY03 +height +(img_page03.height*scaleRate-height));
  beginY05 = beginY04 + 600;


  if (lights.length > 0) {
    for (let i=0; i<lights.length; i++) {
      lights.shift();
    }
  }



  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.236, height*0.115).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.693, height*0.212).mult(1.0/scalePG);
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

function PRotateX( p, angle) {
  let p_new = createVector(p.z, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p.x, p_new.y, p_new.x);
  return p_final;
}

function PRotateY( p, angle) {
  let p_new = createVector(p.x, p.z);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p.y, p_new.y);
  return p_final;
}

function PRotateZ( p, angle) {
  let p_new = createVector(p.x, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p_new.y, p.z);
  return p_final;
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
    line(this.A.x *scalePG, this.A.y *scalePG, this.B.x *scalePG, this.B.y *scalePG);
  }
}










function Ray(index, beignPos) {
  this.O = createVector(beignPos.x, beignPos.y);
  this.P = createVector(0, 0);
  this.angle = map(index, 0, rayDetail, 0, TWO_PI);
  this.uv_O = createVector(lightW/2, lightW/2);
  this.uv_P = createVector(0, 0);


  this.update = function(newO) {
    this.O = newO;

    this.P = p5.Vector.fromAngle(this.angle);
    this.P.setMag(lightW);
    this.P = p5.Vector.add(this.P, this.O);
    for (let i=0; i<walls.length; i++) {
      this.P = intersection(walls[i].A, walls[i].B, this.O, this.P);
    }

    this.uv_P = p5.Vector.sub(this.P, this.O).add(this.uv_O);
    this.uv_P.x = map(this.uv_P.x, 0, lightW, 0, 1);
    this.uv_P.y = map(this.uv_P.y, 0, lightW, 0, 1);
  }
}









function Light() {
  lightCount += 1;
  this.rays_ = [];
  this.pos = createVector(mouseX*(1.0/scalePG), mouseY*(1.0/scalePG));
  //if (lightCount == 1) {
  //  this.pos.x = ((width-sideW)*0.236 + (width-sideW)*0.8) * min(scaleRate, 1.47) * 0.5;
  //  this.pos.y = (height*0.115 + height*0.352) * min(scaleRate, 1.47) * 0.5;
  //}
  for (let i=0; i<rayDetail; i++) {
    this.rays_[i] = new Ray(i, this.pos);
  }
  this.ran = floor(random(-100, 100));
  //this.wichone = lightCount % img_light.length;
  this.wichone = floor(random(0, img_light.length));
  this.time = 0;
  this.life = 0.0;
  this.dead = false;
  //sound_0.play();


  this.update = function() {
    if (!this.dead  &&  this.life < 10) {
      this.life ++;
    }
    if (this.dead  &&  this.life > 0) {
      this.life --;
    }

    this.time ++;
    let pos_noise = createVector(map(noise(frameCount/100.0+this.ran), 0, 1, -2, 2), map(noise(frameCount/100.0+this.ran+999), 0, 1, -2, 2));
    let pos_end = p5.Vector.sub(createVector((width-sideW)/2 *(1.0/scalePG), height *(1.0/scalePG)), this.pos).setMag(1);
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

    PG.push();
    PG.fill(255);
    PG.noStroke();
    PG.tint(255, map(this.life, 0, 10, 0, 255));
    PG.beginShape();
    PG.texture(img_light[0]);
    for (let i=0; i<img_light.length; i++) {
      if (this.wichone == i) {
        PG.texture(img_light[i]);
        break;
      }
    }
    PG.vertex(this.rays_[0].O.x, this.rays_[0].O.y, 0.5, 0.5);
    for (let i=0; i<rayDetail; i++) {
      PG.vertex(this.rays_[i].P.x, this.rays_[i].P.y, this.rays_[i].uv_P.x, this.rays_[i].uv_P.y);
    }
    PG.vertex(this.rays_[0].P.x, this.rays_[0].P.y, this.rays_[0].uv_P.x, this.rays_[0].uv_P.y);
    PG.endShape(CLOSE);
    PG.noTint();
    PG.pop();
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







function Spoon() {
  this.bottom = Array.from(Array(2), () => new Array(10));
  this.handle = new Array(5);
  this.handleL = new Array(5);
  this.handleR = new Array(5);
  this.handle_head = new Array(5);
  this.handle_h = (img_bowl01.width*0.5*0.913)/400.0 * 75.0;
  this.handle_w = (img_bowl01.width*0.5*0.913)/400.0 * 11.6;
  this.c_spoon_light = color(255);
  this.c_spoon_dark = color(200);



  for (let i=0; i<this.bottom.length; i++) {
    for (let j=0; j<this.bottom[i].length; j++) {
      let x = cos(map(j, 0, this.bottom[i].length, 0, TWO_PI)) * ((img_bowl01.width*0.5*0.913)*0.18 *0.33)  *  ((i*0.3)+1);
      let z = sin(map(j, 0, this.bottom[i].length, 0, TWO_PI)) * ((img_bowl01.width*0.5*0.913)*0.18 *0.7 *0.33)  *  ((i*0.3)+1);
      let y = i*-((img_bowl01.width*0.5*0.913)/400.0 * 10);
      this.bottom[i][j] = createVector(x, y, z);
    }
  }


  this.handle[0] = createVector(this.bottom[1][0].x, this.bottom[1][0].y, this.bottom[1][0].z);
  this.handle[1] = p5.Vector.sub(this.handle[0], this.bottom[0][0]).setMag(this.handle_h/(this.handle.length-1)).add(this.handle[0]);
  for (let i=2; i<this.handle.length; i++) {
    this.handle[i] = p5.Vector.sub(this.handle[i-1], this.handle[i-2]).setMag(this.handle_h/(this.handle.length-1)).add(this.handle[i-1]);
  }
  this.handleR[0] = p5.Vector.sub(this.bottom[1][1], this.bottom[1][0]).setMag(this.handle_w*0.5).add(this.handle[0]);
  this.handleL[0] = p5.Vector.sub(this.bottom[1][this.bottom[1].length-1], this.bottom[1][0]).setMag(this.handle_w*0.5).add(this.handle[0]);
  for (let i=1; i<this.handle.length; i++) {
    let w = map(i, 0, this.handle.length, this.handle_w*0.5, this.handle_w*0.75);
    this.handleR[i] = p5.Vector.sub(this.handleR[0], this.handle[0]).setMag(w).add(this.handle[i]);
    this.handleL[i] = p5.Vector.sub(this.handleL[0], this.handle[0]).setMag(w).add(this.handle[i]);
  }


  for (let i=0; i<this.handle_head.length; i++) {
    let s;
    if (i<3)  s = p5.Vector.sub(this.handleL[this.handle.length-1], this.handle[this.handle.length-1]);
    else  s = p5.Vector.sub(this.handleR[this.handle.length-1], this.handle[this.handle.length-1]);
    let angleY = createVector(s.x, s.z, s.y).heading();
    let angleZ = p5.Vector.sub(this.handle[this.handle.length-1], this.handle[this.handle.length-2]).heading();

    this.handle_head[i] = createVector(cos(map(i+1, 0, 6, PI, TWO_PI)), sin(map(i+1, 0, 6, PI, TWO_PI)), 0).setMag(s.mag());
    /*//方法一
     this.handle_head[i] = createVector(this.handle_head[i].x, this.handle_head[i].z, this.handle_head[i].y);
     if (i<3)  this.handle_head[i].rotate(PI);
     else  this.handle_head[i].rotate(PI);
     this.handle_head[i].rotate(HALF_PI);
     this.handle_head[i] = createVector(this.handle_head[i].x, this.handle_head[i].z, this.handle_head[i].y).rotate(HALF_PI+angleZ);
     */
    /*//方法二
     let s_handle_head = createVector(this.handle_head[i].x, this.handle_head[i].z);
     if (i<3)  s_handle_head.rotate(PI+angleY+HALF_PI);
     else  s_handle_head.rotate(angleY+HALF_PI);
     this.handle_head[i] = createVector(s_handle_head.x, s_handle_head.y, this.handle_head[i].y);//.rotate(HALF_PI+angleZ);
     this.handle_head[i] = createVector(this.handle_head[i].y, this.handle_head[i].z, -this.handle_head[i].x);
     let ss_handle_head = createVector(this.handle_head[i].x, this.handle_head[i].y);
     ss_handle_head.rotate(angleZ+HALF_PI);
     this.handle_head[i] = createVector(ss_handle_head.x, ss_handle_head.y, this.handle_head[i].z);
     */
    //方法三
    this.handle_head[i] = PRotateY(this.handle_head[i], HALF_PI);
    this.handle_head[i] = PRotateZ(this.handle_head[i], (HALF_PI + angleZ));
    if (i<3)  this.handle_head[i] = PRotateY(this.handle_head[i], angleY + HALF_PI);
    else  this.handle_head[i] = PRotateY(this.handle_head[i], angleY - HALF_PI);

    this.handle_head[i].add(this.handle[this.handle.length-1]);
  }







  this.display = function() {
    SP.push();




    SP.noStroke();
    for (let j=0; j<this.bottom[0].length; j++) {
      SP.beginShape();
      SP.fill(this.c_spoon_dark);
      SP.vertex(this.bottom[0][(j+1)%this.bottom[0].length].x, this.bottom[0][(j+1)%this.bottom[0].length].y, this.bottom[0][(j+1)%this.bottom[0].length].z);
      SP.vertex(this.bottom[0][j%this.bottom[0].length].x, this.bottom[0][j%this.bottom[0].length].y, this.bottom[0][j%this.bottom[0].length].z);
      if (j == 0)  SP.fill(this.c_spoon_dark);
      else  SP.fill(this.c_spoon_light);
      SP.vertex(this.bottom[1][j%this.bottom[0].length].x, this.bottom[1][j%this.bottom[0].length].y, this.bottom[1][j%this.bottom[0].length].z);
      if (j == this.bottom[0].length-1)  SP.fill(this.c_spoon_dark);
      else  SP.fill(this.c_spoon_light);
      SP.vertex(this.bottom[1][(j+1)%this.bottom[0].length].x, this.bottom[1][(j+1)%this.bottom[0].length].y, this.bottom[1][(j+1)%this.bottom[0].length].z);
      SP.endShape(CLOSE);
    }
    SP.fill(this.c_spoon_dark);
    SP.beginShape();
    for (let j=0; j<this.bottom[0].length; j++) {
      SP.vertex(this.bottom[0][j].x, this.bottom[0][j].y, this.bottom[0][j].z);
    }
    SP.endShape(CLOSE);



    for (let i=0; i<this.handle.length -1; i++) {
      SP.beginShape();
      SP.fill(this.c_spoon_dark);
      SP.vertex(this.handle[i+1].x, this.handle[i+1].y, this.handle[i+1].z);
      SP.vertex(this.handle[i].x, this.handle[i].y, this.handle[i].z);
      SP.fill(this.c_spoon_light);
      SP.vertex(this.handleL[i].x, this.handleL[i].y, this.handleL[i].z);
      SP.vertex(this.handleL[i+1].x, this.handleL[i+1].y, this.handleL[i+1].z);
      SP.endShape(CLOSE);

      SP.beginShape();
      SP.fill(this.c_spoon_dark);
      SP.vertex(this.handle[i+1].x, this.handle[i+1].y, this.handle[i+1].z);
      SP.vertex(this.handle[i].x, this.handle[i].y, this.handle[i].z);
      SP.fill(this.c_spoon_light);
      SP.vertex(this.handleR[i].x, this.handleR[i].y, this.handleR[i].z);
      SP.vertex(this.handleR[i+1].x, this.handleR[i+1].y, this.handleR[i+1].z);
      SP.endShape(CLOSE);
    }



    for (let i=0; i<this.handle_head.length -1; i++) {
      SP.beginShape();
      SP.fill(this.c_spoon_light);
      SP.vertex(this.handle_head[i].x, this.handle_head[i].y, this.handle_head[i].z);
      SP.vertex(this.handle_head[i+1].x, this.handle_head[i+1].y, this.handle_head[i+1].z);
      SP.fill(this.c_spoon_dark);
      SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
      SP.endShape(CLOSE);
    }
    SP.beginShape();
    SP.fill(this.c_spoon_light);
    SP.vertex(this.handleL[this.handleL.length-1].x, this.handleL[this.handleL.length-1].y, this.handleL[this.handleL.length-1].z);
    SP.vertex(this.handle_head[0].x, this.handle_head[0].y, this.handle_head[0].z);
    SP.fill(this.c_spoon_dark);
    SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
    SP.endShape(CLOSE);
    SP.beginShape();
    SP.fill(this.c_spoon_light);
    SP.vertex(this.handle_head[this.handle_head.length-1].x, this.handle_head[this.handle_head.length-1].y, this.handle_head[this.handle_head.length-1].z);
    SP.vertex(this.handleR[this.handleR.length-1].x, this.handleR[this.handleR.length-1].y, this.handleR[this.handleR.length-1].z);
    SP.fill(this.c_spoon_dark);
    SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
    SP.endShape(CLOSE);




    SP.pop();
  }





  this.displayInfo = function() {
    SP.push();


    SP.noFill();
    SP.stroke(255, 128, 128);
    SP.strokeWeight(40);
    SP.point(0, 0, 0);
    SP.strokeWeight(2);
    SP.line(0, 0, 0, 500, 0, 0);
    SP.stroke(128, 255, 128);
    SP.line(0, 0, 0, 0, 500, 0);
    SP.stroke(128, 128, 255);
    SP.line(0, 0, 0, 0, 0, 500);



    SP.stroke(255, 128, 128);
    SP.strokeWeight(10);
    for (let i=0; i<this.bottom.length; i++) {
      for (let j=0; j<this.bottom[i].length; j++) {
        SP.point(this.bottom[i][j].x, this.bottom[i][j].y, this.bottom[i][j].z);
      }
    }

    SP.strokeWeight(1);
    for (let j=0; j<this.bottom[0].length; j++) {
      SP.beginShape();
      SP.vertex(this.bottom[0][j%this.bottom[0].length].x, this.bottom[0][j%this.bottom[0].length].y, this.bottom[0][j%this.bottom[0].length].z);
      SP.vertex(this.bottom[1][j%this.bottom[0].length].x, this.bottom[1][j%this.bottom[0].length].y, this.bottom[1][j%this.bottom[0].length].z);
      SP.vertex(this.bottom[1][(j+1)%this.bottom[0].length].x, this.bottom[1][(j+1)%this.bottom[0].length].y, this.bottom[1][(j+1)%this.bottom[0].length].z);
      SP.vertex(this.bottom[0][(j+1)%this.bottom[0].length].x, this.bottom[0][(j+1)%this.bottom[0].length].y, this.bottom[0][(j+1)%this.bottom[0].length].z);
      SP.endShape(CLOSE);
    }



    SP.strokeWeight(10);
    for (let i=0; i<this.handle.length; i++) {
      SP.point(this.handle[i].x, this.handle[i].y, this.handle[i].z);
      SP.point(this.handleL[i].x, this.handleL[i].y, this.handleL[i].z);
      SP.point(this.handleR[i].x, this.handleR[i].y, this.handleR[i].z);
    }

    SP.strokeWeight(1);
    for (let i=0; i<this.handle.length -1; i++) {
      SP.beginShape();
      SP.vertex(this.handle[i].x, this.handle[i].y, this.handle[i].z);
      SP.vertex(this.handleL[i].x, this.handleL[i].y, this.handleL[i].z);
      SP.vertex(this.handleL[i+1].x, this.handleL[i+1].y, this.handleL[i+1].z);
      SP.vertex(this.handle[i+1].x, this.handle[i+1].y, this.handle[i+1].z);
      SP.endShape(CLOSE);

      SP.beginShape();
      SP.vertex(this.handle[i].x, this.handle[i].y, this.handle[i].z);
      SP.vertex(this.handleR[i].x, this.handleR[i].y, this.handleR[i].z);
      SP.vertex(this.handleR[i+1].x, this.handleR[i+1].y, this.handleR[i+1].z);
      SP.vertex(this.handle[i+1].x, this. handle[i+1].y, this.handle[i+1].z);
      SP.endShape(CLOSE);
    }



    SP.strokeWeight(10);
    for (let i=0; i<this.handle_head.length; i++) {
      SP.point(this.handle_head[i].x, this.handle_head[i].y, this.handle_head[i].z);
    }

    SP.strokeWeight(1);
    for (let i=0; i<this.handle_head.length -1; i++) {
      SP.beginShape();
      SP.vertex(this.handle_head[i].x, this.handle_head[i].y, this.handle_head[i].z);
      SP.vertex(this.handle_head[i+1].x, this.handle_head[i+1].y, this.handle_head[i+1].z);
      SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
      SP.endShape(CLOSE);
    }
    SP.beginShape();
    SP.vertex(this.handleL[this.handleL.length-1].x, this.handleL[this.handleL.length-1].y, this.handleL[this.handleL.length-1].z);
    SP.vertex(this.handle_head[0].x, this.handle_head[0].y, this.handle_head[0].z);
    SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
    SP.endShape(CLOSE);
    SP.beginShape();
    SP.vertex(this.handle_head[this.handle_head.length-1].x, this.handle_head[this.handle_head.length-1].y, this.handle_head[this.handle_head.length-1].z);
    SP.vertex(this.handleR[this.handleR.length-1].x, this.handleR[this.handleR.length-1].y, this.handleR[this.handleR.length-1].z);
    SP.vertex(this.handle[this.handle.length-1].x, this.handle[this.handle.length-1].y, this.handle[this.handle.length-1].z);
    SP.endShape(CLOSE);




    SP.pop();
  }
}
