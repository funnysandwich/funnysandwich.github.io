/*
 ------------
 test01:
 
 对天空不满意
 
 
 ------------
 test02:
 
 
 
 
 */




let cvWH = Math.min(window.innerWidth, window.innerHeight);
let scaleRate = 500.0/cvWH;
let canvas, PG;




let roX, tranZ, tranY;
let skyline;
let Z_beginLine;
let speed;
let open_sprint, time_sprint;


let rail;
let sky;




let c_info, c_far, c_near, c_sky;




let open_info = false;
let is_phone = false;
let time_touch = 0;
let open_follow = false;



// 0：默认  1：沙子  2：速度  3：草
let state_ground = Math.floor(FS_rand(0, 4));


// 0：无  1：栅栏  2：电线杆  3：隔板  4：庭廊
let state_pole_l = Math.floor(FS_rand(1, 5));
let state_pole_r = Math.floor(FS_rand(1, 5));


// 0：无  1：海  2：树  3：草丛
let state_landscape_l = Math.floor(FS_rand(1, 4));
let state_landscape_r = Math.floor(FS_rand(1, 4));


// 0：无  1：黑墙
let state_wall_l = 0;
let state_wall_r = 0;
if (state_wall_l == 1) {
  state_pole_l = 0;
}
if (state_wall_r == 1) {
  state_pole_r = 0;
}




function setup() {
  canvas = createCanvas(cvWH, cvWH, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);

  document.bgColor = "#ffffff";
  background(255);


  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(60);


  c_info = color(200);
  c_far = color(255);
  c_near = color(0);
  c_sky = color(255);




  roX = -0.5;
  tranZ = 0;
  tranY = 0;
  skyline = createVector(0, -real(1000), -real(3000));
  Z_beginLine = -real(150)*8;
  speed = real(250);
  open_sprint = false;
  time_sprint = 0;




  rail = new Rail(skyline.copy(), createVector(0, real(200), real(200)));
  //sky = new Sky(skyline.copy(), createVector(0, real(200), real(200)));



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




  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------


  if (open_follow) {
    roX = easing_x(roX, map(mouseY, 0, height, 0.65, 0), 0.1);
    tranZ = easing_x(tranZ, map(mouseY, 0, height, -real(400), 0), 0.1);
    tranY = easing_x(tranY, map(mouseY, 0, height, real(500), 0), 0.1);
  } else {
    roX = easing_x(roX, 0.65, 0.1);
    tranZ = easing_x(tranZ, -real(400), 0.1);
    tranY = easing_x(tranY, real(500), 0.1);
  }
  c_far = lerpColor(color(255), color(0), constrain(map(roX, 0.44, 0.65, 0, 0.8), 0, 1));



  if (open_sprint) {
    if (time_sprint < 2) {
      time_sprint ++;
    } else {
      open_sprint = false;
      time_sprint = 0;
    }
    speed = easing_x(speed, real(100), 0.5);
  } else {
    speed = easing_x(speed, real(10), 0.05);
  }


  rail.update();
  //sky.update();



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------




  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noStroke();

    beginShape(TRIANGLES);
    rail.display();
    //sky.display();
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
    //LINES_getLine(PRotateX(createVector(skyline.x-real(1000), skyline.y, skyline.z), roX), PRotateX(createVector(skyline.x+real(1000), skyline.y, skyline.z), roX));
    //LINES_getLine(PRotateX(createVector(skyline.x, skyline.y-real(1000), skyline.z), roX), PRotateX(createVector(skyline.x, skyline.y+real(1000), skyline.z), roX));
    //LINES_getLine(PRotateX(createVector(skyline.x, skyline.y, skyline.z-real(1000)), roX), PRotateX(createVector(skyline.x, skyline.y, skyline.z+real(1000)), roX));
    rail.displayInfo();
    //sky.displayInfo();
    endShape();










    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }
  PG.clear();
  displayInfo();
  image(PG, -width/2, -height/2, width, height);
  //print(frameRate());
}





function FS_rand(a, b) {
  const var_min = Math.min(a, b);
  const var_max = Math.max(a, b);
  //return fxrand()*(var_max-var_min) + var_min;
  return Math.random()*(var_max-var_min) + var_min;
}



function windowResized() {
  location.reload();
}

//@funnysandwich
