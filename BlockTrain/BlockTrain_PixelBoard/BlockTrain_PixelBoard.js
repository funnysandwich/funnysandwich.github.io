// include a comment about LICENSE.md in BlockTrain_PixelBoard.js
// Copyright 2022 funnysandwich.tez

let cvWH = Math.min(window.innerWidth, window.innerHeight);
let scaleRate = 500.0/cvWH;

let canvas, PG;
let roY;
let beginLine, endLine, skyline, gap_block, w_next_block;











let c_far, c_near, c_sky, c_sky_near, c_win, c_winFrame;
let c_info1, c_info2, c_infoRed, c_infoGreen, c_infoGreen2, c_infoYellow;

let state_color;
const c_all = [
  ["#e6e5d0", "#141a1d"]
];
const state_c_all = [
  [0, 1, 1, 0, 0, 0]
];







let house = [];
let BILL;
let state_defult_bkg_px;



let Y_magnifier = 0.0;
let follow_Y_magnifier = false;


let state_mouse = 0;


let c_paint;
let var_paint;
let var_px;

let open_select = false;
let node_select;
let show_straw_c = false;
let time_show_straw_c = 0;




let open_web = false;







let state_board;
let Y_move_state_board, Y_move_state_board_target0, Y_move_state_board_target1, Y_move_state_board_target2;
let X_move_state_board;



let open_info = false;
let is_phone = false;
let time_touch = 0;

let open_viewRotate = true;
let is_mouse_on_canvas = false;

let done_load = false;













function setup() {
  canvas = createCanvas(cvWH, cvWH, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  addScreenPositionFunction();






  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);



  state_color = 0;
  c_far = color(c_all[state_color][state_c_all[state_color][0]]);
  c_near = color(c_all[state_color][state_c_all[state_color][1]]);
  c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
  c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
  c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
  c_win = color(c_all[state_color][state_c_all[state_color][5]]);





  c_info1 = lerpColor(c_far, c_winFrame, 0.627);
  c_info2 = lerpColor(c_far, c_near, 0.35);
  c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
  c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
  c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
  c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);


  background(c_sky);
  document.bgColor = c_all[state_color][state_c_all[state_color][2]];





  state_board = 0;
  Y_move_state_board_target0 = 0;
  Y_move_state_board_target1 = -real(2500);
  Y_move_state_board_target2 = -real(5000);
  if (state_board == 0) {
    Y_move_state_board = Y_move_state_board_target0;
  } else if (state_board == 1) {
    Y_move_state_board = Y_move_state_board_target1;
  } else if (state_board == 2) {
    Y_move_state_board = Y_move_state_board_target2;
  }
  X_move_state_board = 0;


  loadStrings("./data/px.txt", nodeLoaded);



  roY = 0;
  beginLine = -real(3500);
  endLine = real(2350);
  gap_block = real(150);
  w_next_block = real(100)*5;
  skyline = createVector(0, real(300), -(real(100)*5*6+gap_block*5));
  state_defult_bkg_px = 0;

  var_paint = 0;
  c_paint = lerpColor(c_near, c_far, var_paint);

  node_select = new Array(2);
  node_select[0] = createVector(0, 0, 0);
  node_select[1] = createVector(0, 0, 0);








  /*
  var x = document.createElement("button");
   x.setAttribute("style", "background:#000000;display:block;width:120px; height:"+real(30)+"px;");
   //x.setAttribute("type", "file");
   x.setAttribute("id", "getFile");
   x.setAttribute("onclick", "document.getElementById('get_file').click()");
   document.body.appendChild(x);
   */





  var_px = new Array(3);
  var_px[0] = Array.from(Array(23), () => new Array(23));
  var_px[1] = Array.from(Array(39), () => new Array(13));
  var_px[2] = Array.from(Array(13), () => new Array(39));


  BILL = new Array(3);
  BILL[0] = createImage(230, 230);
  BILL[1] = createImage(390, 130);
  BILL[2] = createImage(130, 390);
  for (let k=0; k<3; k++) {
    if (state_defult_bkg_px == 0) {
      for (let i = 0; i < BILL[k].width; i++) {
        for (let j = 0; j < BILL[k].height; j++) {
          var_px[k][floor(i/10)][floor(j/10)] = 225 / 255.0;
        }
      }
    }
    updateBILL(BILL[k], k);
  }










  for (let i=0; i<3; i++) {
    let z = -real(500) - i*(real(750)+gap_block);
    let is_main = false;
    if (i == 0) {
      is_main = true;
    }
    house.push(new House(createVector(0, skyline.y, z), is_main, i*3));
    house.push(new House(createVector(-real(750)-gap_block, skyline.y, z), false, i*3+1));
    house.push(new House(createVector(real(750)+gap_block, skyline.y, z), false, i*3+2));
  }









  if (state_board == 2) {
    X_move_state_board = house[0].W*0.6 + house[0].bill2[0].W*0.5 + house[0].bill2[0].W_bar;
  }



  canvas.mouseOver(over);
  canvas.mouseOut(out);
}

function over() {
  is_mouse_on_canvas = true;
}

function out() {
  is_mouse_on_canvas = false;
}


function nodeLoaded(str_node) {
  if (str_node[0][4] == '0') {
    state_board = 0;
    Y_move_state_board = Y_move_state_board_target0;
    X_move_state_board = 0;
  } else if (str_node[0][4] == '1') {
    state_board = 1;
    Y_move_state_board = Y_move_state_board_target1;
    X_move_state_board = 0;
  } else if (str_node[0][4] == '2') {
    state_board = 2;
    Y_move_state_board = Y_move_state_board_target2;
    X_move_state_board = house[0].W*0.6 + house[0].bill2[0].W*0.5 + house[0].bill2[0].W_bar;
  }


  for (let i=0; i<var_px[state_board].length; i++) {
    for (let j=0; j<var_px[state_board][i].length; j++) {
      var_px[state_board][i][j] = constrain(Math.floor(str_node[0][11+(j*3)+0 + i*var_px[state_board][i].length*3] + str_node[0][11+(j*3)+1 + i*var_px[state_board][i].length*3] + str_node[0][11+(j*3)+2 + i*var_px[state_board][i].length*3]), 0, 255) / 255.0;
    }
  }
  updateBILL(BILL[state_board], state_board);
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


  if (done_load) {
  }







  if (state_board == 0) {
    Y_move_state_board = easing_x(Y_move_state_board, Y_move_state_board_target0, 0.1);
    X_move_state_board = easing_x(X_move_state_board, 0, 0.2);
  } else if (state_board == 1) {
    Y_move_state_board = easing_x(Y_move_state_board, Y_move_state_board_target1, 0.1);
    X_move_state_board = easing_x(X_move_state_board, 0, 0.2);
  } else if (state_board == 2) {
    Y_move_state_board = easing_x(Y_move_state_board, Y_move_state_board_target2, 0.1);
    X_move_state_board = easing_x(X_move_state_board, house[0].W*0.6 + house[0].bill2[0].W*0.5 + house[0].bill2[0].W_bar, 0.085);
  }



  if (open_viewRotate) {
    if (is_mouse_on_canvas) {
      X_move_state_board  = easing_x(X_move_state_board, map(constrain(mouseX, 0, width), 0, width, X_move_state_board+real(40), X_move_state_board-real(40)), 0.3);
      Y_move_state_board  = easing_x(Y_move_state_board, map(constrain(mouseY, 0, height), 0, height, Y_move_state_board+real(40), Y_move_state_board-real(40)), 0.3);
    }
  }



  for (let i=0; i<house.length; i++) {
    house[i].update();
  }
  if (follow_Y_magnifier) {
    Y_magnifier = constrain(map(mouseY, 0, height, -real(250), real(250)), -real(240), real(240));
  }






  if (!open_info) {

    if (dist(mouseX-width/2, mouseY-height/2, real(250-12), Y_magnifier) < real(12)  ||  follow_Y_magnifier) {
      cursor('row-resize');
    } else {
      cursor(ARROW);
    }






    //ui



    noStroke();
    beginShape(TRIANGLES);



    if (mouseX > width - real(50)  &&  mouseX < width  &&  is_mouse_on_canvas) {
      //----------------------⬇ ui_zoom ⬇----------------------
      fill(c_far);
      TRIANGLES_getRect(
        createVector(real(250-15), real(-250), real(0)), 
        createVector(real(250), real(-250), real(0)), 
        createVector(real(250), real(250), real(0)), 
        createVector(real(250-15), real(250), real(0))
        );
      fill(c_near);
      TRIANGLES_getRect(
        createVector(real(250-15-2), real(-250), real(0)), 
        createVector(real(250-15), real(-250), real(0)), 
        createVector(real(250-15), real(250), real(0)), 
        createVector(real(250-15-2), real(250), real(0))
        );

      for (let i=0; i<7; i++) {
        let y = map(i, -1, 7, -real(250), real(250));
        TRIANGLES_getLine_weight_Y(
          createVector(real(250), y, real(0.2)), 
          createVector(real(250-8), y, real(0.2)), 
          real(2));
      }


      if (dist(mouseX-width/2, mouseY-height/2, real(250-12), Y_magnifier) < real(12)  ||  follow_Y_magnifier) {
        fill(lerpColor(c_far, c_near, 0.5));
      } else {
        fill(c_near);
      }
      TRIANGLES_getTriangle(
        createVector(real(250-1), Y_magnifier, real(0.4)), 
        createVector(real(250-18), Y_magnifier-real(10), real(0.4)), 
        createVector(real(250-18), Y_magnifier+real(10), real(0.4))
        );
      //----------------------⬆ ui_zoom ⬆----------------------
    }

    for (let i=0; i<house.length; i++) {
      house[i].display_TRIANGLES();
    }
    endShape();











    fill(255);
    noStroke();
    beginShape(TRIANGLES);
    texture(BILL[0]);
    for (let i=0; i<house.length; i++) {
      house[i].display_0();
    }
    endShape();
    beginShape(TRIANGLES);
    texture(BILL[1]);
    for (let i=0; i<house.length; i++) {
      house[i].display_1();
    }
    endShape();
    beginShape(TRIANGLES);
    texture(BILL[2]);
    for (let i=0; i<house.length; i++) {
      house[i].display_2();
    }
    endShape();
    fill(255);
  } else {


    noFill();
    stroke(c_info2);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<house.length; i++) {
      house[i].displayInfo();
    }
    endShape();


    PG.clear();
    displayInfo();
    image(PG, -width/2, -height/2, width, height);
  }
}







function windowResized() {
  location.reload();
}







function updateBILL(pg, s_b) {
  pg.loadPixels();    
  for (let i = 0; i < pg.width; i++) {
    for (let j = 0; j < pg.height; j++) {
      let c = color(lerpColor(c_near, c_far, var_px[s_b][floor(i/10)][floor(j/10)]));
      pg.set(i, j, c);
    }
  }
  pg.updatePixels();
}
//@funnysandwich
