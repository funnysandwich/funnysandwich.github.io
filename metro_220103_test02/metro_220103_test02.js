/*
 ---------
 test01
 
 初次挑战fxhash，尝试把一直想做的捷运窗外风景做出来
 
 
 ---------
 test02
 
 增加房子节点，把房子变成扭曲的
 
 
 
 */




let canvas, PG;
let scaleRate;
let roY, roX;
let cameraY;


let skyline;
let beginLine, endLine;

let c_far, c_near, c_sky, c_sky_near, c_win, c_winFrame;
let c_info1, c_info2, c_infoRed, c_infoGreen, c_infoGreen2, c_infoYellow;


let blocks = [];
let count_blocks;
let gap_block;
let w_next_block;
let speed, mileage;
let udgStation;




let roadVer = [];
let roadHor = [];




let open_info = false;
let open_follow = false;
let open_stop = false;
let open_drive = false;


let str_info = [];



let open_crucifix;
let open_roof;
let open_handrail;
let open_ladder;
let open_billMc;
let open_billboard, open_billboardRoof;
let open_constrHouse, open_catHouse;
let open_river;
let open_mountain;
let open_lightRail;

let rate_crucifix;
let rate_roof;
let rate_handrail;
let rate_ladder;
let rate_billMc;
let rate_billboard, rate_billboardRoof;
let rate_constrHouse, rate_catHouse;
let rate_river;



let state_click;
let state_floor;
let stateVar_floor = [];
let H_floor;




const WH_winFrame = [
  [225, 125, 50, 1, 0, 0], 
  [125, 180, 50, 1, 0, 0], 
  [150, 150, 150, 1, 0, 0], 
  [150, 150, 50, 1, 0, 0], 
  [125, 170, 125, 1, 0, 0], 
  [225, 75, 75, 1, 0, 0], 
  [95, 150, 50, 2, 0, 30], 
  [35, 150, 12.5, 4, 0, 20]
];
let state_winFrame;



let state_color;
const c_all = [
  "#cdccd3", "#0d0b16", 
  "#b0ab8f", "#100c08", 
  "#505050", "#0c0c0c", 
  "#97a6a3", "#d1929e", "#12103e", "#03011c", 
  "#6b8f9b", "#8ca9b6", "#242f31", "#181e1f", 
  "#f7de95", "#8ca9b6", "#242f31", "#181e1f", 
  "#aeb3c3", "#f5c2b3", "#2b2d33", "#1a1617", 
  "#aeb3c3", "#f9d4d5", "#c2b3c3", "#2c3e4a", "#0e141c", 
  "#cfc7bd", "#45403c", "#211f1e", 
  "#e6e5d0", "#141a1d", 
  "#e6e5d0", "#3a4f4f", "#181e1f"
];
const state_c_all = [
  [0, 1, 1, 0, 0], 
  [2, 3, 3, 2, 2], 
  [4, 5, 5, 4, 4], 
  [7, 8, 9, 7, 6], 
  [11, 12, 13, 11, 10], 
  [15, 16, 17, 15, 14], 
  [19, 20, 21, 19, 18], 
  [24, 25, 26, 23, 22], 
  [27, 28, 29, 27, 27], 
  [30, 31, 31, 30, 30], 
  [32, 33, 34, 32, 32]
];








function setup() {
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);

  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);
  //strokeJoin(ROUND);
  //strokeCap(ROUND);
  textureMode(NORMAL);
  frameRate(30);




  state_color = 8;



  roY = 0;
  roX = 0;
  cameraY = -real(800);
  speed = real(20);
  mileage = 0;
  beginLine = -real(2500);
  endLine = real(2000);
  gap_block = real(150);
  w_next_block = real(100)*5;
  isRiver_next = false;
  skyline = createVector(0, real(300), -(real(100)*5*6+gap_block*5));

  c_far = color(c_all[state_c_all[state_color][0]]);
  c_near = color(c_all[state_c_all[state_color][1]]);
  c_winFrame = color(c_all[state_c_all[state_color][2]]);
  c_sky = color(c_all[state_c_all[state_color][3]]);
  c_sky_near = color(c_all[state_c_all[state_color][4]]);
  c_win = c_far;

  c_info1 = lerpColor(c_far, c_winFrame, 0.627);
  c_info2 = lerpColor(c_far, c_near, 0.35);
  c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
  c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
  c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
  c_infoYellow = lerpColor(c_sky, color(128, 128, 30), 0.25);



  state_winFrame = 0;//floor(random(0, WH_winFrame.length));
  state_click = 0; //0:再生 1:闪 2:下降 3:弹簧 4:鼓球


  if (state_click == 1) {
    this.c_near_copy = c_near;
    this.open_light = false;
    this.time_light = 20;
  } else if (state_click == 2) {
    this.open_shake = false;
    this.time_shake = 0;
    this.time_max_shake = floor(random(10, 20));
  }








  stateVar_floor.push([0.5, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8]); //0:正常
  stateVar_floor.push([0.5, 2, 2, 1.5, 2, 3, 4, 6, 7, 8, 11, 14, 16]); //1:前面贫民 后面高楼
  stateVar_floor.push([1, 5, 7, 5, 8, 2, 4, 2, 3, 2, 2, 1, 2]); //2:前面高楼 后面贫民
  stateVar_floor.push([0.5, 5, 5, 5, 5, 8, 8, 10, 10, 12, 12, 10, 10]); //3:森林
  stateVar_floor.push([0.5, 1, 1.5, 1, 1.5, 1, 1.5, 1, 1.5, 1, 1.5, 1, 1.5]); //4:贫民

  state_floor = 0;









  H_floor = real(75);
  if (state_floor == 2) {
    if (state_click == 4) {
      state_click = 0;
    }
  } else if (state_floor == 3) {
    H_floor = real(200);
  } else if (state_floor == 4) {
    if (state_click == 4) {
      state_click = 0;
    }
  }






  rate_crucifix = max(floor(random(-5, 3.5))/10, 0);
  if (rate_crucifix == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_crucifix = 0;
    open_crucifix = false;
  } else {
    open_crucifix = true;
  }

  rate_roof = max(floor(random(-2, 9))/10, 0);  
  if (rate_roof == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_roof = 0;
    open_roof = false;
  } else {
    open_roof = true;
  }

  rate_handrail = max(floor(random(-2, 7.5))/10, 0);
  if (rate_handrail == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_handrail = 0;
    open_handrail = false;
  } else {
    open_handrail = true;
  }

  rate_billboard = max(floor(random(-2, 8.5))/10, 0);
  if (rate_billboard == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_billboard = 0;
    open_billboard = false;
  } else {
    open_billboard = true;
  }


  rate_billboardRoof = max(floor(random(-2, 8.5))/10, 0);
  if (rate_billboardRoof == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_billboardRoof = 0;
    open_billboardRoof = false;
  } else {
    open_billboardRoof = true;
  }




  this.BILL = new Array(5);
  for (let i=0; i<BILL.length; i++) {
    BILL[i] = createGraphics(floor(random(25, 100)), 25);
    BILL[i].background(addAlphaToColor(c_far, 160));
    BILL[i].noStroke();
    BILL[i].fill(addAlphaToColor(c_far, 60));
    for (let j=0; j<floor(random(6, 20)); j++) {
      let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
      let x = random(0, BILL[i].width-w);
      BILL[i].rect(x, 0, w, BILL[i].height);
    }
  }
  if (state_click == 1) {
    this.open_random_billboard = false;
    this.time_billboard = 0;
  }



  rate_billMc = 1;
  if (rate_billMc == 0) {
    rate_billMc = 0;
    open_billMc = false;
  } else {
    open_billMc = true;
  }





  rate_constrHouse = max(floor(random(-10, 6))/100, 0);
  if (rate_constrHouse == 0) {
    rate_constrHouse = 0;
    open_constrHouse = false;
  } else {
    open_constrHouse = true;

    this.open_crane = false;
    this.rate_crane = max(floor(random(0, 2))/10, 0);
    if (rate_crane == 0) {
      open_crane = false;
    } else {
      rate_crane = 0.5;
      open_crane = true;
    }
  }


  rate_catHouse = max(floor(random(-10, 6))/100, 0);
  //rate_catHouse = 1;
  if (rate_catHouse == 0) {
    rate_catHouse = 0;
    open_catHouse = false;
  } else {
    open_catHouse = true;
  }



  rate_ladder = max(floor(random(-8, 9))/10, 0);
  if (rate_ladder == 0  ||  state_floor == 4) {
    rate_ladder = 0;
    open_ladder = false;
  } else {
    rate_ladder = max(rate_ladder, 0.5);
    open_ladder = true;
    if (state_floor == 3) {
      this.floor_min_ladder = 2;
      this.floor_max_ladder = 3;
      this.floor_sub_ladder = 1;
    } else {
      this.floor_min_ladder = 5;
      this.floor_max_ladder = 12;
      this.floor_sub_ladder = 2;
    }
  }



  rate_river = max(floor(random(-4, 5))/10, 0);
  if (rate_river == 0) {
    rate_river = 0;
    open_river = false;
  } else {
    open_river = true;
    this.isRiver_next = false;

    this.open_bridge = false;
    this.rate_bridge = max(floor(random(-5, 20))/100, 0);
    if (rate_bridge == 0) {
      open_bridge = false;
    } else {
      open_bridge = true;
    }

    this.open_PTTower = false;
    this.rate_PTTower = max(floor(random(-8, 10))/10, 0);
    if (rate_PTTower == 0) {
      open_PTTower = false;
    } else {
      this.rate_PTTower = max(this.rate_PTTower, 0.5);
      open_PTTower = true;
    }
  }


  open_mountain = random(1) < 0;
  if (open_mountain) {
    this.H_mtn_max = real(300);
    this.H_mtn_min = real(100);
  }




  open_lightRail = random(1) < 0;//0.15;
  if (open_lightRail) {
    this.num_rail = 1;//max(floor(random(0, 7)), 1);
    this.H_pier_target = new Array(6);
    this.H_pier = new Array(6);
    this.lightRails = new Array(num_rail);

    for (let i=0; i<6; i++) {
      H_pier_target[i] = real(75) * 2;//floor(random(2, 4));
      H_pier[i] = H_pier_target[i];
    }

    let b = [0, 1, 2, 3, 4, 5];
    for (let i=0; i<num_rail; i++) {
      const index_z = floor(random(0, b.length));

      lightRails[i] = new LightRail(b[index_z]);

      b.splice(index_z, 1);
    }
  }










  udgStation = new UdgStation();



  count_blocks = 0;
  for (let i=0; i<6; i++) {
    let is_mountain = false;
    if (open_mountain && i==5) {
      is_mountain = true;
    } else {
      is_mountain = false;
    }
    let is_rail = false;
    if (open_lightRail) {
      for (let j=0; j<num_rail; j++) {
        if (i == lightRails[j].index_z) {
          is_rail = true;
          break;
        }
      }
    }
    let d = real(100)*5;
    let z = map(i, 0, 6-1, -d, -d*6) - gap_block*i;
    blocks.push(new Block(createVector(beginLine, skyline.y, z), real(100)*5, real(100)*5, i, blocks.length, false, is_mountain, is_rail));
    count_blocks += 1;
    if (i<5) {
      roadHor.push(new RoadHor(createVector(skyline.x, skyline.y, z), abs(beginLine - endLine), gap_block));
    }
  }
  roadVer.push(new RoadVer(createVector(beginLine-speed*0, skyline.y, 0), gap_block, -skyline.z, 0));




  str_info.push("ColorMode: "+state_color);
  str_info.push("Speed: "+speed);
  str_info.push("Mileage: "+mileage);

  if (state_click == 0) {
    str_info.push("ClickMode: REGENERATE");
  } else if (state_click == 1) {
    str_info.push("ClickMode: SHINE");
  } else if (state_click == 2) {
    str_info.push("ClickMode: SUBMERGE");
  } else if (state_click == 3) {
    str_info.push("ClickMode: SPRING");
  } else if (state_click == 4) {
    str_info.push("ClickMode: BULGE");
  }

  if (state_floor == 0) {
    str_info.push("FloorMode: NORMAL");
  } else if (state_floor == 1) {
    str_info.push("FloorMode: STAIR");
  } else if (state_floor == 2) {
    str_info.push("FloorMode: EMBANKMENT");
  } else if (state_floor == 3) {
    str_info.push("FloorMode: FOREST");
  } else if (state_floor == 4) {
    str_info.push("FloorMode: SUGARCUBE");
  }

  str_info.push("HouseFeature: ");
  if (open_crucifix) {
    str_info.push("  Crucifix  (prob. "+nfc(rate_crucifix*100, 0)+"%)");
  }
  if (open_roof) {
    str_info.push("  Overbuild  (prob. "+nfc(rate_roof*100, 0)+"%)");
  }
  if (open_handrail) {
    str_info.push("  Handrail  (prob. "+nfc(rate_handrail*100, 0)+"%)");
  }
  if (open_billboard) {
    str_info.push("  Billboard  (prob. "+nfc(rate_billboard*100, 0)+"%)");
  }
  if (open_billboardRoof) {
    str_info.push("  Billboard_Roof  (prob. "+nfc(rate_billboardRoof*100, 0)+"%)");
  }
  if (open_ladder) {
    str_info.push("  Ladder  (prob. "+nfc(rate_ladder*100, 0)+"%)");
  }

  if (open_billMc) {
    str_info.push("------");
    str_info.push("MmDonald's  (prob. "+nfc(rate_billMc*100, 0)+"%)");
  }

  if (open_constrHouse) {
    str_info.push("------");
    str_info.push("ConstructionHouse  (prob. "+nfc(rate_constrHouse*100, 0)+"%)");
    if (open_crane) {
      str_info.push("  Crane  (prob. "+nfc(rate_crane*100, 0)+"%)");
    }
  }

  if (open_catHouse) {
    str_info.push("------");
    str_info.push("CatHouse  (prob. "+nfc(rate_catHouse*100, 0)+"%)");
  }


  if (open_river) {
    str_info.push("------");
    str_info.push("River " + "  (prob. "+nfc(rate_river*100, 0)+"%)");
    if (open_bridge) {
      str_info.push("  Bridge  (prob. "+nfc(rate_bridge*100, 0)+"%)");
    }
    if (open_PTTower) {
      str_info.push("  PowerTower  (prob. "+nfc(rate_PTTower*100, 0)+"%)");
    }
  }
  if (open_lightRail) {
    str_info.push("------");
    let s = "";
    for (let i=0; i<num_rail; i++) {
      s += String(lightRails[i].index_z);
      s += ", ";
    }
    str_info.push("LightRail");
    str_info.push("Rail_Num: "+num_rail + " : "+s);
  }
  if (open_mountain) {
    str_info.push("------");
    str_info.push("Mountain");
  }







  canvas.mouseOver(over);
  canvas.mouseOut(out);
}

function over() {
  open_follow = true;
}

function out() {
  open_follow = false;
}
















function draw() {

  if (state_click == 0) {
    if (open_lightRail) {
      for (let i=0; i<6; i++) {
        H_pier[i] = easing_x(H_pier[i], H_pier_target[i], 0.1);
      }
    }
  } else if (state_click == 1) {
    if (open_light) {
      if (time_light < 20) {
        time_light ++;
      } else {
        open_light = false;
      }
    }
    c_near = lerpColor(lerpColor(c_far, c_near, 0.85), c_near_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
  }







  if (open_stop) {
    speed = easing_x(speed, 0, 0.25);
  } else {
    speed = easing_x(speed, real(20), 0.01);
  }
  mileage += speed;






  background(c_sky);




  //------------------------------⬇ push Block ⬇------------------------------
  if (abs(blocks[blocks.length-1].begin.x-beginLine) > w_next_block+gap_block) {
    let x_error = abs(blocks[blocks.length-1].begin.x-beginLine) - (w_next_block+gap_block);
    for (let i=0; i<6; i++) {
      let is_mountain = false;
      if (open_mountain && i==5) {
        is_mountain = true;
      } else {
        is_mountain = false;
      }
      let is_rail = false;
      if (open_lightRail) {
        for (let j=0; j<num_rail; j++) {
          if (i == lightRails[j].index_z) {
            is_rail = true;
            break;
          }
        }
      }
      let d = real(100)*5;
      let z = map(i, 0, 6-1, -d, -d*6) - gap_block*i;
      blocks.push(new Block(createVector(beginLine + x_error, skyline.y, z), w_next_block, real(100)*5, i, blocks.length, isRiver_next, is_mountain, is_rail));
      count_blocks += 1;
    }
    roadVer.push(new RoadVer(createVector(beginLine + x_error, skyline.y, 0), gap_block, -skyline.z, roadVer.length-1));
    w_next_block = real(100) * floor(random(5, 12));
    if (isRiver_next) {
      isRiver_next = false;
    } else {
      if (count_blocks > 36) {
        isRiver_next = random(1) < rate_river;
      }
    }
  }
  //------------------------------⬆ push Block ⬆------------------------------



  //------------------------------⬇ shiny BILLBOARD ⬇------------------------------
  if (state_click == 1  &&  open_random_billboard) {
    if (time_billboard < 10) {
      time_billboard ++;
    } else {
      time_billboard = 0;
      open_random_billboard = false;
    }
    for (let i=0; i<BILL.length; i++) {
      BILL[i].clear();
      BILL[i].background(addAlphaToColor(c_far, 160));
      BILL[i].noStroke();
      BILL[i].fill(addAlphaToColor(c_far, 60));
      for (let j=0; j<floor(random(6, 20)); j++) {
        let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
        let x = random(0, BILL[i].width-w);
        BILL[i].rect(x, 0, w, BILL[i].height);
      }
    }
  }
  //------------------------------⬆ shiny BILLBOARD ⬆------------------------------















  //------------------------------⬇ update ⬇------------------------------
  if (blocks.length > 0) {
    for (let i=0; i<floor(blocks.length/6); i++) {
      if (blocks[i*6].dead) {
        for (let j=0; j<6; j++) {
          blocks.splice(i*6, 1);
        }
        roadVer.splice(i, 1);
      }
    }
  } 



  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {
      if (!blocks[i].isRiver  &&  !blocks[i].isMountain  &&  !blocks[i].isRail) {
        blocks[i].update(i);
      } else {
        if (blocks[i].isRiver) {
          blocks[i].update_river(i);
        }
        if (blocks[i].isMountain) {
          blocks[i].update_mountain(i);
        }
        if (blocks[i].isRail) {
          blocks[i].update_rail(i);
        }
      }
    }
  }
  if (roadVer.length > 0) {
    for (let i=0; i<roadVer.length; i++) {
      roadVer[i].update(i);
    }
  }
  if (roadHor.length > 0) {
    for (let i=0; i<roadHor.length; i++) {
      roadHor[i].update();
    }
  }


  if (open_lightRail) {
    for (let i=0; i<num_rail; i++) {
      lightRails[i].update();
    }
  }



  udgStation.update();
  //------------------------------⬆ update ⬆------------------------------











  //------------------------------⬇ camera ⬇------------------------------
  push();

  translate(0, 0, real(1000));
  if (open_follow) {
    if (!open_info) {
      roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.016, HALF_PI*0.016), 0.1);
      roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
    } else {
      roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.5, HALF_PI*0.5), 0.1);
      roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
    }
  } else {
    roY = easing_x(roY, 0, 0.1);
    roX = easing_x(roX, 0, 0.1);
  }
  rotateY(roY);
  rotateX(roX);
  translate(0, 0, -real(1000));


  if (mileage > 2000  &&  mileage < 7000) {
    cameraY = real(map(mileage, 2000, 7000, -800, 0));
  }
  //------------------------------⬆ camera ⬆------------------------------



  drawWinFrame(real(WH_winFrame[state_winFrame][0]), real(WH_winFrame[state_winFrame][1]), real(WH_winFrame[state_winFrame][2]), WH_winFrame[state_winFrame][3], WH_winFrame[state_winFrame][4], real(WH_winFrame[state_winFrame][5]));


  translate(0, cameraY, 0);




  if (state_click == 2  &&  open_shake) {
    if (time_shake < time_max_shake) {
      time_shake ++;
      translate(real(random(-15, 15)), real(random(-5, 5)), 0);
    } else {
      open_shake = false;
      time_max_shake = floor(random(10, 20));
    }
  }




  if (!open_info) {
    //------------------------------⬇ display ⬇------------------------------
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        if (!blocks[i].isRiver  &&  !blocks[i].isMountain  &&  !blocks[i].isRail) {
          blocks[i].display();
        } else {
          if (blocks[i].isRiver) {
            blocks[i].display_river();
          }
          if (blocks[i].isMountain) {
            blocks[i].display_mountain();
          }
          if (blocks[i].isRail) {
            blocks[i].display_rail();
          }
        }
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        if (roadVer[i].show) {
          roadVer[i].display();
        }
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        roadHor[i].display();
      }
    }


    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].display();
      }
    }



    if (state_click == 2) {
      noStroke();
      fill(c_far);
      beginShape();
      vertex(beginLine, skyline.y+real(1.1), skyline.z);
      vertex(endLine, skyline.y+real(1.1), skyline.z);
      vertex(endLine, skyline.y+real(1.1), 0);
      vertex(beginLine, skyline.y+real(1.1), 0);
      endShape(CLOSE);
    }




    udgStation.display();



    //------------------------------⬆ display ⬆------------------------------
  } else {
    //------------------------------⬇ displayInfo ⬇------------------------------

    displayInfo_3d();

    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        if (!blocks[i].isRiver  &&  !blocks[i].isMountain  &&  !blocks[i].isRail) {
          blocks[i].displayInfo();
        } else {
          if (blocks[i].isRiver) {
            blocks[i].displayInfo_river();
          }
          if (blocks[i].isMountain) {
            blocks[i].displayInfo_mountain();
          }
          if (blocks[i].isRail) {
            blocks[i].displayInfo_rail();
          }
        }
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        roadVer[i].displayInfo();
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        roadHor[i].displayInfo();
      }
    }


    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].displayInfo();
      }
    }


    if (open_handrail) {
      noFill();
      strokeWeight(real(2));
      stroke(c_info2);
      beginShape(LINES);
      for (let i=0; i<blocks.length; i++) {
        for (let ii=0; ii<blocks[i].houses.length; ii++) {
          if (blocks[i].houses[ii].is_normalHouse  &&  blocks[i].houses[ii].have_handrail) {
            for (let j=0; j<blocks[i].houses[ii].node_handrail.length; j++) {
              for (let k=0; k<blocks[i].houses[ii].node_handrail[j].length; k++) {
                vertex(blocks[i].houses[ii].node_handrail[j][k].x, blocks[i].houses[ii].node_handrail[j][k].y, blocks[i].houses[ii].node_handrail[j][k].z);
              }
              vertex(blocks[i].houses[ii].node_handrail[j][1].x, blocks[i].houses[ii].node_handrail[j][1].y, blocks[i].houses[ii].node_handrail[j][1].z);
              vertex(blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].x, blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].y, blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].z);
            }
          }
        }
      }
      endShape();
    }





    udgStation.displayInfo();



    //------------------------------⬆ displayInfo ⬆------------------------------
  }



  noStroke();
  beginShape();
  fill(c_sky);
  vertex(beginLine-real(100), skyline.y+real(0.1), skyline.z);
  vertex(endLine+real(600), skyline.y+real(0.1), skyline.z);
  fill(c_sky_near);
  vertex(endLine+real(600), skyline.y - real(2900), skyline.z);
  vertex(beginLine-real(100), skyline.y - real(2900), skyline.z);
  endShape(CLOSE);



  pop();







  PG.clear();
  if (open_info) {
    displayInfo();
    // displayInfo_true();
  }
  image(PG, -width/2, -height/2, width, height);
}



















function windowResized() {
  location.reload();
}


function addAlphaToColor(c, alpha) {
  return color(red(c), green(c), blue(c), alpha);
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

document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
  }
};
document.onclick = function (event) {
  let e = event || window.event;
  if (open_mountain) {
    H_mtn_max = real(150);
    H_mtn_min = real(50);
  }

  if (state_click == 0) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        if (!blocks[i].isRiver  &&  !blocks[i].isMountain  &&  !blocks[i].isRail) {
          blocks[i].change();
        } else {
          if (blocks[i].isRiver) {
            blocks[i].change_river();
          }
          if (blocks[i].isMountain) {
            blocks[i].change_mountain();
          }
          if (blocks[i].isRail) {
            blocks[i].change_rail();
          }
        }
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        roadVer[i].change();
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        roadHor[i].change();
      }
    }
    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].change();
      }
    }

    if (open_lightRail) {
      for (let i=0; i<6; i++) {
        H_pier_target[i] = real(75) * (2 + floor(random(0, map(i, 0, 6, 0.5, 16))));

        H_pier[i] = 0;
      }
    }
  } else if (state_click == 1) {
    open_light = true;
    time_light = 0;

    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change();
      }
    }

    open_random_billboard = true;
    time_billboard = 0;
  } else if (state_click == 2) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change();
      }
    }
  } else if (state_click == 3) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change();
      }
    }
  } else if (state_click == 4) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change();
      }
    }
  }
};


function keyPressed() {
  if (key == ' ') {
    open_stop = !open_stop;
  } else if (key == 'w' || key == 'W') {
    state_winFrame += 1;
    if (state_winFrame >= WH_winFrame.length) {
      state_winFrame = 0;
    }
  } else if (key == 'c' || key == 'C') {
    state_color += 1;
    if (state_color >= state_c_all.length) {
      state_color = 0;
    }
    str_info[0] = "ColorMode: "+state_color;

    c_far = color(c_all[state_c_all[state_color][0]]);
    c_near = color(c_all[state_c_all[state_color][1]]);
    c_winFrame = color(c_all[state_c_all[state_color][2]]);
    c_sky = color(c_all[state_c_all[state_color][3]]);
    c_sky_near = color(c_all[state_c_all[state_color][4]]);
    c_win = c_far;

    c_info1 = lerpColor(c_far, c_winFrame, 0.627);
    c_info2 = lerpColor(c_far, c_near, 0.35);
    c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
    c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
    c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
    c_infoYellow = lerpColor(c_sky, color(128, 128, 30), 0.25);
    if (state_click == 1) {
      this.c_near_copy = c_near;
    }


    for (let i=0; i<BILL.length; i++) {
      BILL[i] = createGraphics(floor(random(25, 100)), 25);
      BILL[i].background(addAlphaToColor(c_far, 160));
      BILL[i].noStroke();
      BILL[i].fill(addAlphaToColor(c_far, 60));
      for (let j=0; j<floor(random(6, 20)); j++) {
        let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
        let x = random(0, BILL[i].width-w);
        BILL[i].rect(x, 0, w, BILL[i].height);
      }
    }
    if (state_click == 1) {
      this.open_random_billboard = false;
      this.time_billboard = 0;
    }
  } else if (key == 's' || key == 'S') {
    save("Tamsui_"+nf(frameCount, 5)+".jpg");
  }
}
