/*
 --------------
 test01:
 
 车票
 
 
 
 
 --------------
 test02:
 
 换成正面、平面的车票
 
 
 --------------
 test03:
 
 把票整合进class
 
 
 */




let canvas, PG;
let scaleRate;

let roY, var_flash;
let open_follow;


let state_color, state_WH;

let c_all = [
  //["d5d4bf", "3a4f4f", "181e1f"], 
  //["bcbbc2", "353056", "0d0b16"], 
  //["beb6ac", "45403c", "211f1e"], 
  //["c8ae8b", "712c37", "0f0b0c"], 
  //["bfc9c9", "615d65", "0a1b30"], 
  //["879ead", "d4d4be", "1f3953"], 
  //["beb6ac", "16181a", "414751"], 
  //["414751", "8b948e", "16181a"], 
  //["8f2d2b", "dcbf87", "24150a"],
  //["7c9c92", "d2d2bc", "242f31"]
  ["d2d2bc", "3a4f50", "181e1f"], 
  ["bab9c0", "353056", "0d0b16"], 
  ["bcb4aa", "45403c", "211f1e"], 
  ["c6ac89", "712c37", "0f0b0c"], 
  ["b7c0c5", "1f3953", "101c29"], 
  ["aaa7a7", "615d65", "2b2d33"], 
  ["859cab", "d2d2bc", "1f3953"], 
  ["bcb4aa", "16181a", "414751"], 
  ["414751", "89928c", "16181a"], 
  ["8d2d2b", "dabd85", "24150a"], 
  ["7c9c92", "d2d2bc", "242f31"], 
  ["8c6b54", "c6ac89", "24150a"], 
  ["16181a", "b5a690", "454444"]
];

let WH_all = [
  [200, 150, -1, 0, 1], 
  [250, 150, -1, 0, 1], 
  [300, 150, -1, 0, 1], 
  [185, 250, -1, 0, 1], 
  [185, 190, -1, 0, 1], 
  [300, 110, 100, 2, 1], 
  [120, 175, 100, 3, 1], 
  [120, 200, 60, 4, 1], 
  [200, 125, -1, 1, 1], 
  [250, 125, -1, 1, 1], 
  [100, 150, 50, 0, 2], 
  [100, 90, 40, 0, 3], 
  [150, 300, 45, 5, 1]

];


let state_mouth;
let state_dotted;
let state_texture;
let state_click;
let state_pattern;
let state_cheek;


let ticket = [];


let W_ticket, H_ticket, H_car;

let W_fillet;

let W_wheel, H_wheel;
let time_wheel, speed_wheel;


let node_eye_l_global, node_eye_r_global;
let center_eye_l, center_eye_r;
let w_eye;

let F;
let B;

let Y_textBottom;





let c_info, c_info2, c_bkg, c_ticket, c_ticket_light, c_text, c_text2;





let open_info = false;
let is_phone = false;
let time_touch = 0;


let rate_pattern_Tez, rate_pattern_Btc, rate_pattern_like, rate_pattern_metro, rate_pattern_dino, rate_pattern_CNR, rate_pattern_Mc, rate_pattern_aka, rate_pattern_fileBroken, rate_pattern_fx;
let count_pattern_Tez, count_pattern_Btc, count_pattern_like, count_pattern_metro, count_pattern_dino, count_pattern_CNR, count_pattern_Mc, count_pattern_aka, count_pattern_fileBroken, count_pattern_fx;
let node_BT, node_Tez, node_Btc, node_like, node_dino, node_CNR, node_Mc, node_aka, node_fileBroken, node_fx;




function preload() {
  node_BT = loadStrings("node_bt.txt");
  node_Tez = loadStrings("node_billTezos.txt");
  node_Btc = loadStrings("node_billBitcoin.txt");
  node_like = loadStrings("node_billLike.txt");
  node_metro = loadStrings("node_billMetro.txt");
  node_dino = loadStrings("node_dino.txt");
  node_CNR = loadStrings("node_billCannotReturn.txt");
  node_Mc = loadStrings("node_mc.txt");
  node_aka = loadStrings("node_aka.txt");
  node_fileBroken = loadStrings("node_billFileBroken.txt");
  node_fx = loadStrings("node_fx.txt");
}





function setup() {
  let s = min(windowWidth, windowHeight);
  s = min(s, displayHeight);
  s = min(s, displayWidth);
  //s = 500;
  canvas = createCanvas(s, s, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  addScreenPositionFunction();







  state_color = floor(random(0, c_all.length));


  c_bkg = c_all[state_color][2];
  document.bgColor = c_all[state_color][2];
  c_bkg = convertToRGB(c_bkg);
  background(c_bkg);

  c_info = color(200);
  c_ticket = c_all[state_color][0];
  c_ticket = convertToRGB(c_ticket);
  c_ticket_light = changeBrightness(c_bkg, -15);
  c_text = c_all[state_color][1];
  c_text = convertToRGB(c_text);
  c_text2 = lerpColor(c_ticket, c_text, 0.5);
  c_info = lerpColor(color(200), c_bkg, 0.75);
  c_info2 = lerpColor(color(200), c_bkg, 0.5);



  state_WH = floor(random(0, WH_all.length-1));
  //state_WH = WH_all.length-1;
  num_ticket = WH_all[state_WH][4];
  state_mouth = new Array(num_ticket);
  for (let i=0; i<num_ticket; i++) {
    state_mouth[i] = floor(random(0, 15)); //0:- 1:微笑 2:悲伤 3:v 4:w 5:--- 6:张嘴笑 7:x 8:菱形 9:俩牙 10:++ 11:吐舌 12:张嘴撇嘴 13:O 14:倒三角笑
  }
  state_dotted = floor(random(0, 5));  //0:疏 1:密 2:点 3:三角 4:大三角
  state_texture = floor(random(0, 12));//state_texture=11; //0：无  1：斜线  2：十字  3：点点  4：折线  5：方块  6：竖纹  7：aka  8：鱼鳞  9：横线  10:铁轨  11：拉链
  state_click = floor(random(1, 7)); 
  //state_click = 7;//0：无  1：分裂  2：奔跑  3：刷卡  4；跳  5：拉扯  6:光影
  if (WH_all[state_WH][4] > 1  &&  state_click==5) {
    state_click = floor(random(0, 5));
  }
  state_cheek = new Array(num_ticket);
  for (let i=0; i<num_ticket; i++) {
    state_cheek[i] = floor(random(0, 6)); //state_cheek[i] = 5; //0:脸颊 1；泪 2:猫须 3:黑眼圈 4:眼镜 5:雀斑
  }

  state_pattern = 1; //0：无  1：
  rate_pattern_Tez = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_Btc = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_like = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_metro = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_dino = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_CNR = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_Mc = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_aka = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_fileBroken = max(floor(random(-5, 11))/10.0, 0);
  rate_pattern_fx = max(floor(random(-5, 11))/10.0, 0);

  count_pattern_Tez = 0;
  count_pattern_Btc = 0;
  count_pattern_like = 0;
  count_pattern_metro = 0;
  count_pattern_dino = 0;
  count_pattern_CNR = 0;
  count_pattern_Mc = 0;
  count_pattern_aka = 0;
  count_pattern_fileBroken = 0;
  count_pattern_fx = 0;





  scaleRate = 500.0/width;
  open_follow = false;
  roY = 0.0;
  var_flash = mouseX;
  time_wheel = 0.0;
  speed_wheel = 0.2;
  Y_textBottom = 0.0;

  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);
  //noiseSeed(0);









  //state_WH = WH_all.length-1;
  if (num_ticket != 1) {
    WH_all[state_WH][1] = floor(random(0, 4))*30 + 90;
  }

  W_ticket = floor(real(WH_all[state_WH][0]));
  H_ticket = floor(real(WH_all[state_WH][1]));

  H_car = H_ticket * random(0.2, 0.35);
  W_fillet = WH_all[state_WH][2];
  if (W_fillet == -1) {
    W_fillet = real(random(10, 60));
    if (WH_all[state_WH][3] == 1) {
      W_fillet = real(random(25, 45));
    }
  } else {
    W_fillet = real(W_fillet);
  }

  W_fillet = min(W_fillet, H_car*2);

  W_wheel = min(W_ticket * 0.1, real(8));
  H_wheel = W_wheel * 1.5;




  if (WH_all[state_WH][3] == 5) {
    H_car = H_ticket * 0.15;
    this.c_phone = changeBrightness(c_bkg, -5);
    this.c_phone2 = changeBrightness(c_bkg, 5);
    this.c_phone3 = changeSB(c_bkg, -5, 10);
  }








  for (let i=0; i<node_BT.length; i++) {
    let a = split(node_BT[i], ", ");
    node_BT[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_Tez.length; i++) {
    let a = split(node_Tez[i], ", ");
    node_Tez[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_like.length; i++) {
    let a = split(node_like[i], ", ");
    node_like[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_metro.length; i++) {
    let a = split(node_metro[i], ", ");
    node_metro[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_Btc.length; i++) {
    let a = split(node_Btc[i], ", ");
    node_Btc[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_dino.length; i++) {
    let a = split(node_dino[i], ", ");
    node_dino[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_CNR.length; i++) {
    let a = split(node_CNR[i], ", ");
    node_CNR[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_Mc.length; i++) {
    let a = split(node_Mc[i], ", ");
    node_Mc[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_aka.length; i++) {
    let a = split(node_aka[i], ", ");
    node_aka[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_fileBroken.length; i++) {
    let a = split(node_fileBroken[i], ", ");
    node_fileBroken[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }
  for (let i=0; i<node_fx.length; i++) {
    let a = split(node_fx[i], ", ");
    node_fx[i] = createVector(parseFloat(a[0]), parseFloat(a[1]));
  }


















  for (let i=0; i<num_ticket; i++) {
    let x = -(W_ticket*num_ticket)/2.0 + W_ticket/2.0 + i*W_ticket;
    ticket.push(new Ticket(createVector(x, 0, 0), i));
  }



  node_eye_l_global = new Array(num_ticket);
  node_eye_r_global = new Array(num_ticket);

  F = new Array(num_ticket);
  B = new Array(num_ticket);
  for (let i=0; i<num_ticket; i++) {
    F[i] = createGraphics(floor(W_ticket*scaleRate), floor(H_ticket*scaleRate));
    drawF(i);
    B[i] = createGraphics(F[i].width, F[i].height);
    if (WH_all[state_WH][3] != 5) {
      drawB(i);
    } else {
      drawB_phone(i);
    }
  }















  this.Y_split = 0.0;
  if (state_click == 1) {
    this.open_split = false;
    this.time_split = 0;
  } else if (state_click == 2) {
    this.open_sprint = false;
    this.time_sprint = 0;
    this.wind = [];
  } else if (state_click == 3) {
    this.X_swipe = 0.0;
    this.time_swipe = 0;
    this.open_swipe = false;
    this.open_light_shine = false;
    this.is_light_green = true;
  } else if (state_click == 4) {
    this.time_jump = 0;
    this.open_jump = false;
    this.Y_jump = 0.0;
    this.Y_jump_max = -real(random(75, 150));
    this.wind = [];
  } else if (state_click == 5) {
    this.time_spring = 0;
    this.open_spring = false;
    this.W_spring = 0.0;
    this.H_spring = 0.0;
    this.count_click_spring = 0;
  } else if (state_click == 6) {
    this.time_win = 0;
    this.time_max_win = floor(random(30, 60));
    this.open_win = false;
    this.win = [];
  } else if (state_click == 7) {
    this.time_max_light = 15;
    this.time_light = 0;
    this.open_light = false;
  }














  canvas.mouseOver(over);
  canvas.mouseOut(out);
}


function over() {
  //open_follow = true;
}

function out() {
  open_follow = false;
}










function draw() {
  background(c_bkg);



  if (touches.length == 1) {
    is_phone = true;
    time_touch ++;
  } else {
    time_touch = 0;
  }

  if (time_touch == 30) {
    open_info = !open_info;
  }





  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  if (open_follow) {
    //roY = easing_x(roY, map(mouseX, 0, width, PI*1, -PI*1), 0.1);
    roY += (-(mouseX - var_flash)*scaleRate*0.01);

    if (roY > PI) {
      roY -= TWO_PI;
    }
    if (roY < -PI) {
      roY += TWO_PI;
    }
  } else {
    roY = easing_x(roY, 0, 0.05);
  }
  var_flash = mouseX;



  if (state_click == 1) {
    if (open_split) {
      if (time_split < 10) {
        time_split ++;
      } else {
        time_split = 0;
        open_split = false;
      }
      Y_split = sin(map(time_split, 0, 10, 0, PI)) * real(-10);
    }
  } else if (state_click == 2) {
    if (open_sprint) {
      if (time_sprint < 30) {
        time_sprint ++;
      } else {
        time_sprint = 0;
        open_sprint = false;
      }
      if (frameCount%2==0) {
        let be = createVector(random(-width*0.75, -width*0.25), random(-height*0.333, height*0.333), real(random(-20, 20)));
        let en = createVector(random(width*0.25, width*0.5), be.y, be.z);
        wind.push(new Wind(be, en));
      }
      speed_wheel = easing_x(speed_wheel, 1.0, 0.25);//map(sin(map(time_sprint, 0, 60, 0, PI)), 0, 1, 0.2, 0.8);
    } else {
      speed_wheel = easing_x(speed_wheel, 0.2, 0.05);
    }
  } else if (state_click == 3) {
    if (open_swipe) {
      let time_max = 30;
      if (time_swipe < time_max) {
        time_swipe ++;
      } else {
        is_light_green = random(1)<0.5;
        time_swipe = 0;
        open_swipe = false;
      }
      if (time_swipe < floor(time_max/4.0)) {
        X_swipe = map(time_swipe, 0, floor(time_max/4.0), 0, real(35));
        open_light_shine = false;
      } else if (time_swipe < floor(time_max/4.0*3)) {
        X_swipe = real(35);
        open_light_shine = true;
      } else {
        X_swipe = map(time_swipe, floor(time_max/4.0*3), time_max, real(35), 0);
        open_light_shine = false;
      }
    }
  } else if (state_click == 4) {
    let time_max = 15;

    if (open_jump) {
      if (time_jump < time_max) {
        time_jump ++;
      } else {
        Y_jump_max = -real(random(75, 150));
        time_jump = 0;
        open_jump = false;
      }
      if (time_jump < floor(time_max/3.0)) {
        Y_jump = sin(map(time_jump, 0, floor(time_max/3.0), 0, HALF_PI)) * Y_jump_max;
      } else if (time_jump < floor(time_max/3.0*2)) {
        Y_jump = Y_jump_max;
      } else if (time_jump < time_max-3) {
        Y_jump = sin(map(time_jump, floor(time_max/3.0*2), time_max-3, HALF_PI, PI)) * Y_jump_max;
      } else {
        Y_jump = sin(map(time_jump, time_max-3, time_max, PI, TWO_PI)) * Y_jump_max*0.1;
      }
    }

    if (time_jump == time_max-5) {
      let num_wind = floor(random(7, 17))*num_ticket;
      for (let i=0; i<num_wind; i++) {
        let x = cos(map(i, 0, num_wind, 0, TWO_PI)+random(-TWO_PI/num_wind/2.0, TWO_PI/num_wind/2.0));
        let z = sin(map(i, 0, num_wind, 0, TWO_PI)+random(-TWO_PI/num_wind/2.0, TWO_PI/num_wind/2.0));
        let be = createVector(x*W_ticket*0.5*num_ticket, H_ticket/2.0, z*W_ticket*0.5*num_ticket);
        let en = createVector(x*(W_ticket*0.5*num_ticket+real(100)), H_ticket/2.0, z*(W_ticket*0.5*num_ticket+real(100)));
        wind.push(new Wind(be, en));
      }
    }
  } else if (state_click == 5) {


    if (count_click_spring == 1) {
      W_spring = easing_x(W_spring, real(15), 0.35);
      H_spring = easing_x(H_spring, real(5), 0.35);
    } else if (count_click_spring == 2) {
      W_spring = easing_x(W_spring, real(30), 0.35);
      H_spring = easing_x(H_spring, real(10), 0.35);
    } else if (count_click_spring == 3) {
      W_spring = easing_x(W_spring, real(45), 0.35);
      H_spring = easing_x(H_spring, real(15), 0.35);
    } else if (count_click_spring == 4) {

      let time_max = 6;
      if (open_spring) {
        if (time_spring < time_max) {
          time_spring ++;
          if (time_spring < floor(time_max/2.0)) {
            W_spring = sin(map(time_spring, 0, floor(time_max/2.0), HALF_PI, PI)) * real(45);
            H_spring = sin(map(time_spring, 0, floor(time_max/2.0), HALF_PI, PI)) * real(15);
          } else {
            W_spring = sin(map(time_spring, floor(time_max/2.0), time_max, PI, TWO_PI)) * real(15);
            H_spring = sin(map(time_spring, floor(time_max/2.0), time_max, PI, TWO_PI)) * real(7.5);
          }
        } else {
          count_click_spring = 0;
          time_spring = 0;
          open_spring = false;
        }
      }
    }
  } else if (state_click == 6) {
    if (open_win) {
      if (time_win == 0) {
        win.push(new Win());
      }
      if (time_win < time_max_win) {
        time_win ++;
      } else {
        time_max_win = floor(random(30, 60));
        time_win = 0;
        open_win = false;
      }
    } else {
      if (win.length > 0) {
        win.splice(0, win.length);
      }
    }
  } else if (state_click == 7) {
    if (open_light) {
      if (time_light < time_max_light) {
        time_light ++;
      } else {
        time_light = 0;
        open_light = false;
      }
    }
  }





  if (state_click == 2  ||  state_click == 4) {
    if (wind.length>0) {
      for (let i=0; i<wind.length; i++) {
        wind[i].update();
      }
    }
    if (wind.length>0) {
      for (let i=0; i<wind.length; i++) {
        if (wind[i].dead) {
          wind.splice(i, 1);
        }
      }
    }
  }




  time_wheel += speed_wheel;
  if (time_wheel > TWO_PI) {
    time_wheel -= TWO_PI;
  }










  if (ticket.length > 0) {
    for (let i=0; i<ticket.length; i++) {
      ticket[i].update();
    }
  }







  if (ticket.length > 0) {
    for (let i=0; i<ticket.length; i++) {
      for (let j=0; j<ticket[i].node_ticket.length; j++) {
        ticket[i].node_ticket[j] = PRotateY(ticket[i].node_ticket[j], roY);
      }
    }
  }






  if (state_click == 6  &&  open_win) {
    if (win.length > 0) {
      for (let i=0; i<win.length; i++) {
        win[i].update();
      }
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------









  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    if (ticket.length > 0) {
      for (let i=0; i<ticket.length; i++) {
        ticket[i].display();
      }
    }



    noStroke();
    beginShape(TRIANGLES);
    if (ticket.length > 0) {
      for (let i=0; i<ticket.length; i++) {
        ticket[i].display_TRIANGLES();
      }
    }

    if (state_click == 2  ||  state_click == 4) {
      if (wind.length>0) {
        fill(c_ticket);
        for (let i=0; i<wind.length; i++) {
          wind[i].display();
        }
      }
    }


    //if (state_click == 6) {
    //  if (open_win) {
    //    let w = real(400);
    //    let h = real(200);
    //    let x = map(time_win, 0, time_max_win, real(700)+w/2.0, -real(700)-w/2.0);
    //    let y = -real(350);
    //    let z = -real(250);

    //    let c1 = c_bkg;
    //    let c2 = lerpColor(c_bkg, lerpColor(c_bkg, color(255, 255, 220), 0.1), sin(map(time_win, 0, time_max_win, 0, PI)));//changeBrightness(c_bkg,10)

    //    TRIANGLES_getRect_fill(createVector(x-w/2.0, y-h/2.0, z), createVector(x+w/2.0, y-h/2.0, z), createVector(x+w/2.0, y+h/2.0, z), createVector(x-w/2.0, y+h/2.0, z), c2);

    //    let shadow_dl = p5.Vector.sub(ticket[0].node_ticket[4], createVector(x+w/2.0, y, z)).setMag(real(100)).add(ticket[0].node_ticket[4]);
    //    let shadow_dr = p5.Vector.sub(ticket[num_ticket-1].node_ticket[3], createVector(x-w/2.0, y, z)).setMag(real(100)).add(ticket[num_ticket-1].node_ticket[3]);

    //    TRIANGLES_getRect_fill4(ticket[0].node_ticket[4], ticket[num_ticket-1].node_ticket[3], shadow_dr, shadow_dl, c1, c1, c2, c2);
    //    TRIANGLES_getRect_fill4(createVector(x-real(1500), real(0), z), createVector(x+real(1500), real(0), z), createVector(x+real(1500), real(100), z), createVector(x-real(1500), real(100), z), c1, c1, c2, c2);
    //    TRIANGLES_getRect_fill(createVector(x-real(1500), real(100), z), createVector(x+real(1500), real(100), z), createVector(x+real(1500), real(500), z), createVector(x-real(1500), real(500), z), c2);
    //  }
    //}
    if (state_click == 6  &&  open_win) {
      if (win.length > 0) {
        for (let i=0; i<win.length; i++) {
          win[i].display();
        }
      }
    }




    endShape();








    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ display ⬆-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  } else {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ displayInfo ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noFill();
    stroke(c_info);
    strokeWeight(real(1));
    beginShape(LINES);
    if (ticket.length > 0) {
      for (let i=0; i<ticket.length; i++) {
        ticket[i].displayInfo();
      }
    }

    if (state_click == 2  ||  state_click == 4) {
      if (wind.length>0) {
        for (let i=0; i<wind.length; i++) {
          wind[i].displayInfo();
        }
      }
    }

    if (state_click == 6  &&  open_win) {
      if (win.length > 0) {
        for (let i=0; i<win.length; i++) {
          win[i].displayInfo();
        }
      }
    }
    endShape();


    noFill();
    stroke(c_info2);
    strokeWeight(real(1));
    beginShape(LINES);
    if (ticket.length > 0) {
      for (let i=0; i<ticket.length; i++) {
        ticket[i].displayInfo2();
      }
    }

    let arrow = createVector(0, H_ticket/2.0+W_wheel, real(100));
    let arrow_B = createVector(0, H_ticket/2.0+W_wheel, -real(100));
    arrow = PRotateY(arrow, roY);
    arrow_B = PRotateY(arrow_B, roY);
    LINES_getLine(arrow, arrow_B);

    LINES_getLine(createVector(-real(200), real(200), 0), createVector(real(200+10), real(200), 0));
    LINES_getLine(createVector(real(200), -real(200), 0), createVector(real(200), real(200+10), 0));
    LINES_getLine(createVector(-real(200), Y_textBottom+real(40), 0), createVector(-real(200), real(200+10), 0));
    LINES_getLine(createVector(0, -real(200), 0), createVector(real(200+10), -real(200), 0));

    LINES_getLine(createVector(0, H_ticket/2.0+W_wheel, 0), createVector(0, real(200), 0));
    LINES_getLine(createVector(real(200), 0, 0), createVector(real(200+5), 0, 0));
    LINES_getLine(createVector(real(200), ticket[num_ticket-1].node_ticket[1].y, 0), createVector(real(200+5), ticket[num_ticket-1].node_ticket[1].y, 0));
    LINES_getLine(createVector(real(200), ticket[num_ticket-1].node_ticket[3].y, 0), createVector(real(200+5), ticket[num_ticket-1].node_ticket[3].y, 0));

    LINES_getLine(createVector(0, real(200), 0), createVector(0, real(200+5), 0));
    LINES_getLine(createVector(ticket[0].node_ticket[4].x, real(200), 0), createVector(ticket[0].node_ticket[4].x, real(200+5), 0));
    LINES_getLine(createVector(ticket[num_ticket-1].node_ticket[3].x, real(200), 0), createVector(ticket[num_ticket-1].node_ticket[3].x, real(200+5), 0));

    endShape();




    //    noFill();
    //    stroke(255, 0, 0);
    //    strokeWeight(real(2));
    //    beginShape(POINTS);
    //    for (let i=0; i<node_fillet.length; i++) {
    //      for (let j=0; j<node_fillet[i].length; j++) {
    //        vertex(node_fillet[i][j].x, node_fillet[i][j].y, node_fillet[i][j].z);
    //      }
    //    }
    //    endShape();


    //    stroke(0, 0, 255);
    //    strokeWeight(real(1.5));
    //    beginShape(POINTS);
    //    for (let i=0; i<node_wheel.length; i++) {
    //      for (let j=0; j<node_wheel[i].length; j++) {
    //        vertex(node_wheel[i][j].x, node_wheel[i][j].y, node_wheel[i][j].z);
    //      }
    //    }
    //    endShape();



    //    stroke(100);
    //    strokeWeight(real(2.5));
    //    beginShape(POINTS);
    //    for (let i=0; i<node_ticket.length; i++) {
    //      vertex(node_ticket[i].x, node_ticket[i].y, node_ticket[i].z);
    //    }
    //    endShape();





    PG.clear();
    displayInfo();
    image(PG, -width/2, -height/2, width, height);

    //image(F, -width/2+35, -20);



    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }
}











function windowResized() {
  location.reload();
}

//@funnysandwich
