let canvas, PG;
let scaleRate;


let img;
let open_poster = true;
let time_mouseReleased = 0;
let Y_poster = 0.0;


let W_block, H_block;
let num_hor, num_ver;
let blocks = [];


let count_change = 0;
let state_change;
let index;
let time_released, time_max_released, time_wave;






let open_info = false;

let is_phone = false;
let time_touch = 0;









function preload() {
  img = loadImage("poster.png");
}


function setup() {
  let s = min(windowWidth, windowHeight);
  s = min(s, displayHeight);
  s = min(s, displayWidth);
  canvas = createCanvas(s, s, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  addScreenPositionFunction();
  document.bgColor = "#ffffff";
  background(255);

  scaleRate = 750.0/width;
  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);









  W_block = real(150);
  H_block = ((W_block/2.0)/sin((HALF_PI/4.0)*3.0)) * (sin(HALF_PI/4.0)) * 2;
  state_change = 0;
  index = 0;
  time_released = 0;
  time_max_released = floor(random(50, 200));
  time_wave = 0;





  num_hor = ceil(width/W_block) + 1;
  num_ver = floor(height/(H_block/2.0)) + 1;
  for (let i=0; i<num_ver; i++) {
    for (let j=0; j<num_hor; j++) {
      let x = W_block*j + W_block/2.0 - W_block*0.3333 - width/2.0;
      if (i%2!=0) {
        x += W_block/2.0;
      }
      let y = (H_block/2.0)*i - height/2.0 + H_block*0.3333;

      blocks.push(new Block(createVector(x, y, real(-5)), i, j));
    }
  }

  canvas.mouseOver(over);
  canvas.mouseOut(out);
}



function over() {
  open_poster = false;
}

function out() {
  open_poster = true;
}















function draw() {
  background(255);



  if (touches.length == 1) {
    is_phone = true;
    time_touch ++;
  } else {
    time_touch = 0;
  }

  if (time_touch == 30) {
    open_info = !open_info;
  }


  if (is_phone) {
    if (time_mouseReleased < 150) {
      time_mouseReleased ++;
    } else {
      open_poster = true;
    }
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  if (time_released < time_max_released) {
    time_released ++;
    if (time_released == time_max_released) {
      state_change = (state_change+4+2)%4;
    }
  } else {
    if (state_change == 0 || state_change == 2) {
      if (time_wave < num_ver) {
        time_wave ++;
      }
    } else {
      if (time_wave < num_hor*4) {
        time_wave ++;
      }
    }
  }


  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {

      if (time_released == time_max_released) {
        if (state_change == 0 || state_change == 2) {
          if (time_wave == blocks[i].index_y) {
            blocks[i].change();
            if (i == blocks.length-1) {
              time_wave = 0;
              time_released = 0;
              time_max_released = floor(random(50, 200));
            }
          }
        } else {
          if (blocks[i].index_y%2==0  &&  time_wave == blocks[i].index_x*4) {
            blocks[i].change();
          } else if (blocks[i].index_y%2!=0  &&  time_wave == blocks[i].index_x*4+2) {
            blocks[i].change();
            if ((num_ver%2!=0  &&  blocks[i].index_y == num_ver-1-1  &&  blocks[i].index_x == num_hor-1)  ||  
              (num_ver%2==0  &&  i == blocks.length-1)
              ) {
              time_wave = 0;
              time_released = 0;
              time_max_released = floor(random(50, 200));
            }
          }
        }
      }


      if (blocks[i].is_cursor  &&  blocks[i].ready_change) {
        blocks[i].change();
        blocks[i].ready_change = false;
        time_released = 0;
        time_wave = 0;
      }

      blocks[i].update();
    }
  }



  if (open_poster) {
    Y_poster = easing_x(Y_poster, 0, 0.1);
  } else {
    Y_poster = easing_x(Y_poster, -height*1.1, 0.15);
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------





  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noStroke();
    beginShape(TRIANGLES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].display();
      }
    }

    endShape();



    noFill();
    stroke(0);
    strokeWeight(real(1));
    beginShape(LINES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].display_LINES();
      }
    }
    endShape();



    beginShape();
    texture(img);
    vertex(-width/2, -height/2+Y_poster, 0, 0, 0);
    vertex(width/2, -height/2+Y_poster, 0, 1, 0);
    vertex(width/2, height/2+Y_poster, 0, 1, 1);
    vertex(-width/2, height/2+Y_poster, 0, 0, 1);
    endShape(CLOSE);

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ display ⬆-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  } else {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ displayInfo ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noFill();
    stroke(180);
    strokeWeight(real(0.5));
    beginShape(LINES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        if (!blocks[i].is_cursor) {
          blocks[i].displayInfo();
        }
      }
    }
    endShape();





    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        if (blocks[i].is_cursor) {
          index = blocks[i].index_y*num_hor + blocks[i].index_x;
          noFill();
          stroke(128);
          strokeWeight(real(1.75));
          beginShape(LINES);
          blocks[i].displayInfo();
          endShape();
        }
      }
    }




    noStroke();
    beginShape(TRIANGLES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].displayInfo_TRIANGLES();
      }
    }
    endShape();


    PG.clear();
    displayInfo();
    image(PG, -width/2, -height/2, width, height);



    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }
}










function windowResized() {
  location.reload();
}

//@funnysandwich
