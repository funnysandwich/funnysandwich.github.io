// include a comment about LICENSE.md in BT_drawBill_220904_test01.js
// Copyright 2022 funnysandwich.tez

let cvWH = Math.min(window.innerWidth, window.innerHeight);
let scaleRate = 500.0/cvWH;

let canvas, PG;
let roY;
let beginLine, endLine, skyline, gap_block, w_next_block;




let input;






let c_far, c_near, c_sky, c_sky_near, c_win, c_winFrame;
let c_info1, c_info2, c_infoRed, c_infoGreen, c_infoGreen2, c_infoYellow;

let state_color;
const c_all = [
  ["#cdccd3", "#0d0b16"], 
  ["#b0ab8f", "#100c08"], 
  ["#505050", "#000000"], 
  ["#cfc7bd", "#45403c", "#211f1e"], 
  ["#e6e5d0", "#141a1d"], 
  ["#86ad9b", "#1a2f30", "#181e1f"], 
  ["#a6cbd9", "#92a79e", "#181e1f"], 
  ["#d9bf9c", "#e39239", "#431d01", "#0f0b0c"], 
  ["#9fb6bc", "#fffbd4", "#3a4f4f", "#181e1f"], 
  ["#f3c79b", "#c08ca3", "#1d0f11", "#1a1617"], 
  ["#a8a390", "#723d31", "#380303", "#09040c"], 
  ["#fee4a2", "#959a8b", "#293538", "#111517"], 
  ["#712c37", "#80979e", "#222d2f"], 
  ["#4c6363", "#0d2d3c", "#1f4a53", "#031217", "#000002"], 
  ["#beb6ac", "#92a79e", "#45403c", "#181e1f"], 
  ["#9fb6bc", "#cfc7bd", "#3a4f4f", "#211f1e"], 
  ["#712c37", "#d28139", "#380303", "#09040c"]
];
const state_c_all = [
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 2, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 2, 0, 0, 0], 
  [1, 2, 2, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 2, 1, 0, 1], 
  [2, 3, 4, 2, 1, 0], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1]
];







let house = [];
let BILL;
let state_defult_bkg_px;
let node_mash = new Array(3);
let node_info = new Array(3);

let Y_magnifier = 0.0;
let follow_Y_magnifier = false;


let state_mouse = 0;
let node_mouse0, index_node_mouse0;
let node_mouse1, index_node_mouse1;
let node_mouse3, index_node_mouse3;
let node_refresh, index_node_refresh;
let node_upload, index_node_upload;
let node_download, index_node_download;

let c_paint;
let var_paint;
let var_px;
let inp;
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

let open_viewRotate = false;
let is_mouse_on_canvas = false;



function preload() {
  node_mouse0 = loadStrings("node_cursor_arrow.txt");
  node_mouse1 = loadStrings("node_cursor_paint.txt");
  node_mouse3 = loadStrings("node_cursor_straw.txt");
  node_refresh = loadStrings("node_refresh.txt");
  node_upload = loadStrings("node_upload.txt");
  node_download = loadStrings("node_download.txt");
  node_mash[0] = loadStrings("BlockTrainPixelBoard_20220905_205445_11209.txt");
  node_mash[1] = loadStrings("BlockTrainPixelBoard_20220906_021617_06324.txt");
  node_mash[2] = loadStrings("BlockTrainPixelBoard_20220906_033542_03081.txt");
  node_info[0] = loadStrings("BlockTrainPB_0_20220906_042840_06682.txt");
  node_info[1] = loadStrings("BlockTrainPB_1_20220906_043118_11419.txt");
  node_info[2] = loadStrings("BlockTrainPB_2_20220906_043320_15072.txt");
}









function setup() {
  canvas = createCanvas(cvWH, cvWH, WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  addScreenPositionFunction();






  changeCursor(1);
  changeCursor(3);
  changeCursor(0);





  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);





  for (let i=0; i<node_mouse0.length; i++) {
    let a = split(node_mouse0[i], ", ");
    node_mouse0[i] = createVector(a[0], a[1]);
    node_mouse0[i].mult(real(30.0) / 100.0);
    node_mouse0[i].add(real(-250), real(-200), real(0.2));
  }
  index_node_mouse0 = [[0, 1, 2], [2, 3, 0]];

  for (let i=0; i<node_mouse1.length; i++) {
    let a = split(node_mouse1[i], ", ");
    node_mouse1[i] = createVector(a[0], a[1]);
    node_mouse1[i].mult(real(30.0) / 100.0);
    node_mouse1[i].add(real(-250), real(-200 + (2+30)*1), real(0.2));
  }
  index_node_mouse1 = [[0, 1, 6], [1, 4, 5], [1, 2, 4], [2, 3, 4], [7, 8, 12], [8, 11, 12], [8, 9, 11], [9, 10, 11]];


  for (let i=0; i<node_mouse3.length; i++) {
    let a = split(node_mouse3[i], ", ");
    node_mouse3[i] = createVector(a[0], a[1]);
    node_mouse3[i].mult(real(30.0) / 100.0);
    node_mouse3[i].add(real(-250), real(-200 + (2+30)*3), real(0.2));
  }
  index_node_mouse3 = [[0, 1, 2], [0, 2, 3], [0, 3, 15], [4, 5, 14], [5, 13, 14], [6, 7, 16], [7, 17, 16], [7, 8, 17], [8, 18, 17], [8, 9, 18], [9, 18, 19], [9, 19, 10], [10, 20, 19], [10, 11, 20], [11, 21, 20], [11, 21, 12], [12, 22, 21]];


  for (let i=0; i<node_refresh.length; i++) {
    let a = split(node_refresh[i], ", ");
    node_refresh[i] = createVector(a[0], a[1]);
    node_refresh[i].mult(real(30.0) / 100.0);
    node_refresh[i].add(real(-250), real(-200 + (2+30)*4), real(0.2));
  }
  index_node_refresh = [[0, 6, 7], [1, 4, 5], [1, 2, 3], [8, 9, 10], [11, 14, 15], [11, 12, 13]];


  for (let i=0; i<node_upload.length; i++) {
    let a = split(node_upload[i], ", ");
    node_upload[i] = createVector(a[0], a[1]);
    node_upload[i].mult(real(30.0) / 100.0);
    node_upload[i].add(real(-250), real(-200 + (2+30)*6), real(0.2));
  }
  index_node_upload = [[0, 1, 2], [3, 4, 6], [4, 5, 6], [7, 8, 9], [7, 9, 14], [9, 10, 13], [9, 13, 14], [10, 12, 13], [10, 11, 12]];


  for (let i=0; i<node_download.length; i++) {
    let a = split(node_download[i], ", ");
    node_download[i] = createVector(a[0], a[1]);
    node_download[i].mult(real(30.0) / 100.0);
    node_download[i].add(real(-250), real(-200 + (2+30)*7), real(0.2));
  }
  index_node_download = [[0, 5, 6], [1, 2, 4], [2, 3, 4], [7, 8, 9], [7, 9, 14], [9, 10, 13], [9, 13, 14], [10, 12, 13], [10, 11, 12]];






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
  Y_move_state_board = 0;
  Y_move_state_board_target0 = 0;
  Y_move_state_board_target1 = -real(2500);
  Y_move_state_board_target2 = -real(5000);
  X_move_state_board = 0;

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




  inp = createInput(var_paint*255);
  inp.position(canvas.x, canvas.y+height-real(20));
  inp.size(real(45), real(20));
  inp.input(myInputEvent);
  inp.hide();




  input = createFileInput(handleFile);
  input.position(canvas.x, canvas.y);
  //input.size(real(300), real(300));
  //input.hide();
  input.style("visibility", "hidden");
  input.style('background', color(255, 0, 0, 100));
  input.style('color', color(0, 0, 255));
  input.id('get_file');



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



  canvas.mouseOver(over);
  canvas.mouseOut(out);
}

function over() {
  is_mouse_on_canvas = true;
}

function out() {
  is_mouse_on_canvas = false;
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
      if (state_mouse == 1  ||  state_mouse == 3) {
        if (mouseX-width/2 > screenPosition(house[0].node[0]).x     &&
          mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
          mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
          mouseY-height/2 < screenPosition(house[0].node[3]).y
          ) {
          changeCursor(state_mouse);
        } else {
          changeCursor(0);
        }
      } else {
        changeCursor(state_mouse);
      }
    }






    //ui



    noStroke();
    beginShape(TRIANGLES);



    //----------------------⬇ ui_select ⬇----------------------

    if (state_mouse == 2  &&  open_select == true) {
      node_select[1] = createVector(mouseX-width/2, mouseY-height/2, 0);



      for (let i=0; i<10; i++) {
        let n = lerpVector(node_select[0], createVector(node_select[0].x, node_select[1].y, 0), map(i, 0, 10, 0, 1));
        let n_ = lerpVector(node_select[0], createVector(node_select[0].x, node_select[1].y, 0), map(i+1, 0, 10, 0, 1));
        if (i%2==0) {
          fill(c_near);
        } else {
          fill(c_far);
        }
        TRIANGLES_getLine_weight(n, n_, real(1));
      }

      for (let i=0; i<10; i++) {
        let n = lerpVector(createVector(node_select[1].x, node_select[0].y, 0), node_select[1], map(i, 0, 10, 0, 1));
        let n_ = lerpVector(createVector(node_select[1].x, node_select[0].y, 0), node_select[1], map(i+1, 0, 10, 0, 1));
        if (i%2==0) {
          fill(c_far);
        } else {
          fill(c_near);
        }
        TRIANGLES_getLine_weight(n, n_, real(1));
      }

      for (let i=0; i<10; i++) {
        let n = lerpVector(node_select[0], createVector(node_select[1].x, node_select[0].y, 0), map(i, 0, 10, 0, 1));
        let n_ = lerpVector(node_select[0], createVector(node_select[1].x, node_select[0].y, 0), map(i+1, 0, 10, 0, 1));
        if (i%2==0) {
          fill(c_near);
        } else {
          fill(c_far);
        }
        TRIANGLES_getLine_weight_Y(n, n_, real(1));
      }
      for (let i=0; i<10; i++) {
        let n = lerpVector(createVector(node_select[0].x, node_select[1].y, 0), node_select[1], map(i, 0, 10, 0, 1));
        let n_ = lerpVector(createVector(node_select[0].x, node_select[1].y, 0), node_select[1], map(i+1, 0, 10, 0, 1));
        if (i%2==0) {
          fill(c_far);
        } else {
          fill(c_near);
        }
        TRIANGLES_getLine_weight_Y(n, n_, real(1));
      }
    }
    //----------------------⬆ ui_select ⬆----------------------




    //----------------------⬇ ui_straw ⬇----------------------

    if (state_mouse == 3  &&  !show_straw_c) {
      if (time_show_straw_c < 3) {
        time_show_straw_c ++;
      }
    }
    if (state_mouse == 3  &&  time_show_straw_c < 3  &&
      mouseX-width/2 > screenPosition(house[0].node[0]).x       &&
      mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
      mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
      mouseY-height/2 < screenPosition(house[0].node[3]).y
      ) {


      if (var_paint < 0.5) {
        fill(lerpColor(c_near, c_far, 0.75));
      } else {
        fill(lerpColor(c_near, c_far, 0.25));
      }    
      TRIANGLES_getTriangle(
        createVector(mouseX-width/2, mouseY-height/2, real(0)), 
        createVector(mouseX-width/2-real(15), mouseY-height/2-real(15), real(0)), 
        createVector(mouseX-width/2+real(15), mouseY-height/2-real(15), real(0)) 
        );

      TRIANGLES_getRect(
        createVector(mouseX-width/2-real(15), mouseY-height/2-real(15+30), real(0)), 
        createVector(mouseX-width/2+real(15), mouseY-height/2-real(15+30), real(0)), 
        createVector(mouseX-width/2+real(15), mouseY-height/2-real(15), real(0)), 
        createVector(mouseX-width/2-real(15), mouseY-height/2-real(15), real(0))
        );
      fill(c_paint);
      TRIANGLES_getRect(
        createVector(mouseX-width/2-real(15-4), mouseY-height/2-real(15+30-4), real(0)), 
        createVector(mouseX-width/2+real(15-4), mouseY-height/2-real(15+30-4), real(0)), 
        createVector(mouseX-width/2+real(15-4), mouseY-height/2-real(15+4), real(0)), 
        createVector(mouseX-width/2-real(15-4), mouseY-height/2-real(15+4), real(0))
        );
    }

    //----------------------⬆ ui_straw ⬆----------------------






    //----------------------⬇ ui_state_up ⬇----------------------
    fill(c_near);
    TRIANGLES_getRect(
      createVector(real(-92 - 2), real(-250), real(-0.2)), 
      createVector(real(-92 + (2+60)*2 + 60+2), real(-250), real(-0.2)), 
      createVector(real(-92 + (2+60)*2 + 60+2), real(-250+20+2), real(-0.2)), 
      createVector(real(-92 - 2), real(-250+20+2), real(-0.2))
      );
    TRIANGLES_getRect(
      createVector(real(-92 + 30-5), real(-250 + 10-5), real(0.2)), 
      createVector(real(-92 + 30+5), real(-250 + 10-5), real(0.2)), 
      createVector(real(-92 + 30+5), real(-250 + 10+5), real(0.2)), 
      createVector(real(-92 + 30-5), real(-250 + 10+5), real(0.2))
      );
    TRIANGLES_getRect(
      createVector(real(-92+(2+60) + 30-10), real(-250 + 10-3.5), real(0.2)), 
      createVector(real(-92+(2+60) + 30+10), real(-250 + 10-3.5), real(0.2)), 
      createVector(real(-92+(2+60) + 30+10), real(-250 + 10+3.5), real(0.2)), 
      createVector(real(-92+(2+60) + 30-10), real(-250 + 10+3.5), real(0.2))
      );
    TRIANGLES_getRect(
      createVector(real(-92+(2+60)*2 + 30-3), real(-250 + 10-7), real(0.2)), 
      createVector(real(-92+(2+60)*2 + 30+3), real(-250 + 10-7), real(0.2)), 
      createVector(real(-92+(2+60)*2 + 30+3), real(-250 + 10+7), real(0.2)), 
      createVector(real(-92+(2+60)*2 + 30-3), real(-250 + 10+7), real(0.2))
      );



    for (let i=0; i<3; i++) {
      if (mouseX-width/2 > real(-92 + (2+60)*i)        &&
        mouseX-width/2 < real(-92 + (2+60)*i + 60)     &&
        mouseY-height/2 < real(-250+20)
        ) {
        fill(lerpColor(c_far, c_near, 0.25));
      } else {
        fill(c_far);
      }

      if (state_board == i) {
        fill(lerpColor(c_far, c_near, 0.4));
      }

      let x = map(i, 0, 3, real(-100), real(100));
      let x_ = map(i+1, 0, 3, real(-100), real(100));
      TRIANGLES_getRect(
        createVector(real(-92 + (2+60)*i), real(-250), real(0)), 
        createVector(real(-92 + (2+60)*i + 60), real(-250), real(0)), 
        createVector(real(-92 + (2+60)*i + 60), real(-250+20), real(0)), 
        createVector(real(-92 + (2+60)*i), real(-250+20), real(0))
        );
    }






    //----------------------⬆ ui_state_up ⬆----------------------








    //----------------------⬇ ui_tool_left ⬇----------------------

    fill(c_near);
    TRIANGLES_getRect(
      createVector(real(-250), real(-200-2), real(-0.2)), 
      createVector(real(-250+30+2), real(-200-2), real(-0.2)), 
      createVector(real(-250+30+2), real(-200+(2+30)*8), real(-0.2)), 
      createVector(real(-250), real(-200+(2+30)*8), real(-0.2))
      );

    for (let i=0; i<index_node_mouse0.length; i++) {
      TRIANGLES_getTriangle(node_mouse0[index_node_mouse0[i][0]], node_mouse0[index_node_mouse0[i][1]], node_mouse0[index_node_mouse0[i][2]]);
    }
    for (let i=0; i<index_node_mouse1.length; i++) {
      TRIANGLES_getTriangle(node_mouse1[index_node_mouse1[i][0]], node_mouse1[index_node_mouse1[i][1]], node_mouse1[index_node_mouse1[i][2]]);
    }
    for (let i=0; i<4; i++) {
      let x = lerp(real(-250+4), real(-250+30-4), map(i, 0, 4, 0, 1));
      let x_ = lerp(real(-250+4), real(-250+30-4), map(i+1, 0, 4, 0, 1));
      let y = lerp(real(-200 + (2+30)*2 +4), real(-200 + (2+30)*2+30 - 4), map(i, 0, 4, 0, 1));
      let y_ = lerp(real(-200 + (2+30)*2 +4), real(-200 + (2+30)*2+30 - 4), map(i+1, 0, 4, 0, 1));
      if (i % 2 == 0) {
        TRIANGLES_getLine_weight_Y(createVector(x, real(-200 + (2+30)*2 +4), real(0.2)), createVector(x_, real(-200 + (2+30)*2 + 4), real(0.2)), real(1));
        TRIANGLES_getLine_weight(createVector(real(-250+30-4), y, real(0.2)), createVector(real(-250+30-4), y_, real(0.2)), real(1));
      } else {
        TRIANGLES_getLine_weight_Y(createVector(x, real(-200 + (2+30)*2+30 - 4), real(0.2)), createVector(x_, real(-200 + (2+30)*2+30 - 4), real(0.2)), real(1));
        TRIANGLES_getLine_weight(createVector(real(-250+4), y, real(0.2)), createVector(real(-250+4), y_, real(0.2)), real(1));
      }
    }
    for (let i=0; i<index_node_mouse3.length; i++) {
      TRIANGLES_getTriangle(node_mouse3[index_node_mouse3[i][0]], node_mouse3[index_node_mouse3[i][1]], node_mouse3[index_node_mouse3[i][2]]);
    }
    for (let i=0; i<index_node_refresh.length; i++) {
      TRIANGLES_getTriangle(node_refresh[index_node_refresh[i][0]], node_refresh[index_node_refresh[i][1]], node_refresh[index_node_refresh[i][2]]);
    }
    for (let i=0; i<2; i++) {
      let x = lerp(real(-250+4), real(-250+30-4), map(i, -1, 2, 0, 1));
      let y = lerp(real(-200 + (2+30)*5 +4), real(-200 + (2+30)*5+30 - 4), map(i, -1, 2, 0, 1));
      TRIANGLES_getLine_weight(createVector(x, real(-200 + (2+30)*5 +4), real(0.2)), createVector(x, real(-200 + (2+30)*5+30 - 4), real(0.2)), real(1));
      TRIANGLES_getLine_weight_Y(createVector(real(-250+4), y, real(0.2)), createVector(real(-250+30-4), y, real(0.2)), real(1));
    }
    for (let i=0; i<index_node_upload.length; i++) {
      TRIANGLES_getTriangle(node_upload[index_node_upload[i][0]], node_upload[index_node_upload[i][1]], node_upload[index_node_upload[i][2]]);
    }
    for (let i=0; i<index_node_download.length; i++) {
      TRIANGLES_getTriangle(node_download[index_node_download[i][0]], node_download[index_node_download[i][1]], node_download[index_node_download[i][2]]);
    }




    for (let i=0; i<8; i++) {
      if (mouseX-width/2 < real(-250+30)               &&
        mouseY-height/2 > real(-200 + (2+30)*i)        &&
        mouseY-height/2 < real(-200 + (2+30)*i + 30)
        ) {
        fill(lerpColor(c_far, c_near, 0.25));
      } else {
        fill(c_far);
      }
      if (state_mouse == i  ||  (i == 5  &&  open_web)) {
        fill(lerpColor(c_far, c_near, 0.4));
      }



      TRIANGLES_getRect(
        createVector(real(-250), real(-200 + (2+30)*i), real(0)), 
        createVector(real(-250+30), real(-200 + (2+30)*i), real(0)), 
        createVector(real(-250+30), real(-200 + (2+30)*i + 30), real(0)), 
        createVector(real(-250), real(-200 + (2+30)*i + 30), real(0))
        );
    }


    //----------------------⬆ ui_tool_left ⬆----------------------









    //----------------------⬇ ui_color ⬇----------------------

    if (state_mouse == 1  ||  state_mouse == 2) {
      fill(c_near);
      TRIANGLES_getRect(
        createVector(-real(255), real(250-20-2), real(-0.3)), 
        createVector(real(250-15), real(250-20-2), real(-0.3)), 
        createVector(real(250-15), real(250), real(-0.3)), 
        createVector(-real(255), real(250), real(-0.3))
        );

      for (let i=0; i<10-1; i++) {
        let x = map(i, 0, 10-1, -real(200), real(200));
        let x_ = map(i+1, 0, 10-1, -real(200), real(200));
        let c = lerpColor(c_near, c_far, map(i, 0, 10-1, 0, 1));
        let c_ = lerpColor(c_near, c_far, map(i+1, 0, 10-1, 0, 1));
        fill(c);
        TRIANGLES_getRect_fill4(
          createVector(x, real(250-20), real(0)), 
          createVector(x_, real(250-20), real(0)), 
          createVector(x_, real(250), real(0)), 
          createVector(x, real(250), real(0)), 
          c, c_, c_, c
          );
      }
      fill(c_far);
      TRIANGLES_getRect(
        createVector(real(200), real(250-20), real(0)), 
        createVector(real(250-15), real(250-20), real(0)), 
        createVector(real(250-15), real(250), real(0)), 
        createVector(real(200), real(250), real(0))
        );




      if (mouseY-height/2 > real(250-20)   &&
        mouseX-width/2 > real(-200)        &&
        mouseX-width/2 < real(250-15-2) 
        ) {
        let x = map(var_paint, 0, 1, -real(200), real(200));
        if (var_paint < 0.5) {
          fill(lerpColor(c_near, c_far, 0.75));
        } else {
          fill(lerpColor(c_near, c_far, 0.25));
        }
        TRIANGLES_getTriangle(
          createVector(x, real(250-15), real(0.2)), 
          createVector(x-real(15), real(250-32), real(0.2)), 
          createVector(x+real(15), real(250-32), real(0.2))
          );
        TRIANGLES_getRect(
          createVector(x-real(15), real(250-32-30), real(0.2)), 
          createVector(x+real(15), real(250-32-30), real(0.2)), 
          createVector(x+real(15), real(250-32), real(0.2)), 
          createVector(x-real(15), real(250-32), real(0.2))
          );
        fill(c_paint);
        TRIANGLES_getRect(
          createVector(x-real(15-4), real(250-32-30+4), real(0.2)), 
          createVector(x+real(15-4), real(250-32-30+4), real(0.2)), 
          createVector(x+real(15-4), real(250-32-4), real(0.2)), 
          createVector(x-real(15-4), real(250-32-4), real(0.2))
          );
      } else {

        let x = map(var_paint, 0, 1, -real(200), real(200));
        fill(lerpColor(c_near, c_far, 1-var_paint*0.5));
        TRIANGLES_getTriangle(
          createVector(x, real(250-15), real(0.2)), 
          createVector(x-real(5), real(250-23), real(0.2)), 
          createVector(x+real(5), real(250-23), real(0.2))
          );
      }
    }
    //----------------------⬆ ui_color ⬆----------------------



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


    noStroke();
    beginShape(TRIANGLES);
    for (let i=0; i<house.length; i++) {
      house[i].display_TRIANGLES();
    }

    endShape();
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






function changeCursor(s) {
  if (s == 0) {
    cursor(ARROW);
  } else if (s == 1) {
    cursor("https://funnysandwich.github.io/BlockTrain/data/cursor_paint_16.png", 1, 15);
  } else if (s == 2) {
    cursor(CROSS);
  } else if (s == 3) {
    cursor("https://funnysandwich.github.io/BlockTrain/data/cursor_straw_16.png", 1, 15);
  }
}



function handleFile(file) {
  //print(file.data);

  if (file.type === 'image') {
    //inputImg = createImg(file.data, '');
    //inputImg.hide();
    let myInputImg = loadImage(file.data, load_myInputImg);
  } else if (file.type === 'text') {
    let a = createP(file.data);
    a.hide();
    let myInputText = "";
    for (let i=0; i<file.data.length; i++) {
      myInputText += file.data[i];
    }
    if (myInputText[0]=='B' && myInputText[1]=='T' && myInputText[2]=='B' && myInputText[3]=='B') {
      const index = Math.floor(myInputText[4]);
      for (let i=0; i<var_px[index].length; i++) {
        for (let j=0; j<var_px[index][i].length; j++) {
          var_px[index][i][j] = constrain(Math.floor(myInputText[11+(j*3)+0 + i*var_px[index][i].length*3] + myInputText[11+(j*3)+1 + i*var_px[index][i].length*3] + myInputText[11+(j*3)+2 + i*var_px[index][i].length*3]), 0, 255) / 255.0;
        }
      }

      updateBILL(BILL[index], index);
    }
  } else {
  }
}




function load_myInputImg(data) {
  //myInputImg = data;
  data.resize(BILL[state_board].width, BILL[state_board].height);

  for (let i = 0; i < BILL[state_board].width; i++) {
    for (let j = 0; j < BILL[state_board].height; j++) {
      var_px[state_board][floor(i/10)][floor(j/10)] = round(lightness(data.get(floor(i/10)*10, floor(j/10)*10))) / 100.0;
    }
  }
  updateBILL(BILL[state_board], state_board);
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
