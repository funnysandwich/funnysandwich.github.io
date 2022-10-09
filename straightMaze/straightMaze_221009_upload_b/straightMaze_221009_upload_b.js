// include a comment about LICENSE.md in straightMaze_221009_upload_b.js
// Copyright 2022 funnysandwich.tez
let cvWH = Math.min(window.innerWidth, window.innerHeight);
let scaleRate = 500.0/cvWH;

let canvas, PG;


let skyline, endLine;
let speed, Y_shake;
let gap_block;
let W_road;
let mileage;
let gap_node;



let corridor = [];
let count_corridor;




let open_signExit;

let node_ori_signExit, node_ori_female, node_ori_male, node_ori_power;










let c_far, c_near, c_sky, c_info, c_infoRed;

let open_info = false;
let is_phone = false;
let time_touch = 0;





let rate_signExit;
let rate_attic;
let rate_shoebox_left, rate_shoebox_right;
//let rate_door_left, rate_door_right;
let rate_openDoor_left, rate_openDoor_right;
let rate_doorplate_left, rate_doorplate_right;
let rate_toiletMale_left, rate_toiletMale_right;
let rate_toiletFemale_left, rate_toiletFemale_right;
let rate_power_left, rate_power_right;
let rate_stairs_left, rate_stairs_right;




function preload() {
  node_ori_signExit = loadStrings("node_exit.txt");
  node_ori_male = loadStrings("node_male.txt");
  node_ori_female = loadStrings("node_female.txt");
  node_ori_power = loadStrings("node_power.txt");
}





function setup() {
  canvas = createCanvas(cvWH, cvWH, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);



  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);








  speed = real(10);
  Y_shake = 0;
  gap_block = real(10);
  W_road = real(100);
  skyline = createVector(0, real(300), -real(3500));
  endLine = real(500);
  mileage = 0;
  gap_node = real(50);
  count_corridor = 0;





  c_far = color(160,200,160);
  c_near = color(0);
  c_sky = color(0);
  c_info = color(100);
  c_infoRed = lerpColor(c_info, color(255, 0, 0), 0.25);



  document.bgColor = "#000000";
  background(c_sky);


  rate_signExit = 0.9;
  rate_attic = 0.0;
  rate_shoebox_left = 0.5;
  rate_shoebox_right = 0.5;
  //rate_door_left;
  //rate_door_right;
  rate_openDoor_left = 0.25;
  rate_openDoor_right = 0.25;
  rate_doorplate_left = 1; 
  rate_doorplate_right = 1;
  rate_toiletMale_left = 0.05;
  rate_toiletMale_right = 0.05;
  rate_toiletFemale_left = 0.05;
  rate_toiletFemale_right = 0.05;
  rate_power_left = 0.05;
  rate_power_right = 0.05;
  rate_stairs_left = 0.05;
  rate_stairs_right = 0.05;




  open_signExit = true;
  if (open_signExit) {
  }


  let str_signExit = node_ori_signExit;
  node_ori_signExit = Array.from(Array(str_signExit.length), () => new Array(2));
  for (let i=0; i<str_signExit.length; i++) {
    let a = split(str_signExit[i], ", ");
    for (let j=0; j<2; j++) {
      node_ori_signExit[i][j] = parseFloat(a[j]);
    }
  }

  let str_male = node_ori_male;
  node_ori_male = Array.from(Array(str_male.length), () => new Array(2));
  for (let i=0; i<str_male.length; i++) {
    let a = split(str_male[i], ", ");
    for (let j=0; j<2; j++) {
      node_ori_male[i][j] = parseFloat(a[j]);
    }
  }

  let str_female = node_ori_female;
  node_ori_female = Array.from(Array(str_female.length), () => new Array(2));
  for (let i=0; i<str_female.length; i++) {
    let a = split(str_female[i], ", ");
    for (let j=0; j<2; j++) {
      node_ori_female[i][j] = parseFloat(a[j]);
    }
  }


  let str_power = node_ori_power;
  node_ori_power = Array.from(Array(str_power.length), () => new Array(2));
  for (let i=0; i<str_power.length; i++) {
    let a = split(str_power[i], ", ");
    for (let j=0; j<2; j++) {
      node_ori_power[i][j] = parseFloat(a[j]);
    }
  }





  for (let i=0; i<8; i++) {
    corridor.push(new Corridor(count_corridor, i));
    count_corridor ++;
  }
}














function draw() {
  background(c_sky);


  if (touches.length == 1) {
    is_phone = true;
    time_touch ++;
  } else {
    time_touch = 0;
  }

  if (time_touch == 30) {
    open_info = !open_info;
  }










  mileage += speed;



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ push Block ⬇----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  if (corridor.length > 0) {
    if (corridor[corridor.length-1].P_move_done) {
      let i = corridor.length;
      corridor.push(new Corridor(count_corridor, i));
      count_corridor ++;
    }
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ push Block ⬆----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------








  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  Y_shake = map(sin(frameCount*0.5 * map(speed, 0, real(20), 0, 1)), -1, 1, -real(4), real(4));

  if (corridor.length > 0) {
    for (let i=0; i<corridor.length; i++) {
      if (corridor[i].dead) {
        corridor.splice(i, 1);
      }
    }
  }

  if (corridor.length > 0) {
    for (let i=0; i<corridor.length; i++) {
      corridor[i].update(i);
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------






  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noStroke();
    beginShape(TRIANGLES);
    if (corridor.length > 0) {
      for (let i=0; i<corridor.length; i++) {
        corridor[i].display();
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
    strokeWeight(real(2.5));
    beginShape(LINES);

    if (corridor.length > 0) {
      for (let i=0; i<corridor.length; i++) {
        if (corridor[i].index_count%2 != 0) {
          corridor[i].displayInfo();
        }
      }
    }


    endShape();





    stroke(c_infoRed);
    strokeWeight(real(2.5));
    beginShape(LINES);
    if (corridor.length > 0) {
      for (let i=0; i<corridor.length; i++) {
        if (corridor[i].index_count%2 == 0) {
          corridor[i].displayInfo();
        }
      }
      let center = corridor[corridor.length-1].node_show[corridor[corridor.length-1].node_show.length-1].copy();
      LINES_getLine(createVector(-real(50), -real(50), skyline.z), center);
      LINES_getLine(createVector(real(50), -real(50), skyline.z), center);
      LINES_getLine(createVector(real(50), real(50), skyline.z), center);
      LINES_getLine(createVector(-real(50), real(50), skyline.z), center);
    }
    endShape();


    if (open_info) {
      PG.clear();
      displayInfo();
      image(PG, -width/2, -height/2, width, height);
    }


    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }
}








function windowResized() {
  location.reload();
}


function realColor(n) {
  return lerpColor(c_far, c_near, constrain(map(sin(map(n.z, skyline.z, endLine-real(300), HALF_PI, PI)), 1, 0, 0, 1), 0, 1));
}


function TRIANGLES_getRect_fill4_realColor(p1, p2, p3, p4) {
  const c1 = realColor(p1);
  const c2 = realColor(p2);
  const c3 = realColor(p3);
  const c4 = realColor(p4);
  TRIANGLES_getRect_fill4(p1, p2, p3, p4, c1, c2, c3, c4);
}




//@funnysandwich