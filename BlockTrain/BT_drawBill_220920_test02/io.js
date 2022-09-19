// include a comment about LICENSE.md in io.js
// Copyright 2022 funnysandwich.tez
function mousePressed() {
  if (dist(mouseX-width/2, mouseY-height/2, real(250-12), Y_magnifier) < real(12)) {
    follow_Y_magnifier = true;
  }






  for (let i=0; i<3; i++) {
    if (mouseX-width/2 > real(-92 + (2+60)*i)        &&
      mouseX-width/2 < real(-92 + (2+60)*i + 60)     &&
      mouseY-height/2 < real(-250+20)
      ) {
      if (i == 0) {
        state_board = 0;
      } else if (i == 1) {
        state_board = 1;
      } else if (i == 2) {
        state_board = 2;
      }
    }
  }







  if (!open_info) {
    for (let i=0; i<8; i++) {
      if (mouseX-width/2 < real(-250+30)               &&
        mouseY-height/2 > real(-200 + (2+30)*i)        &&
        mouseY-height/2 < real(-200 + (2+30)*i + 30)
        ) {
        if (i == 0) {
          state_mouse = 0;
          inp.hide();
        } else if (i == 1) {
          state_mouse = 1;
          inp.show();
        } else if (i == 2) {
          state_mouse = 2;
          inp.show();
        } else if (i == 3) {
          state_mouse = 3;
          inp.hide();
        } else if (i == 4) {
          state_defult_bkg_px += 1;
          if (state_defult_bkg_px > 5) {
            state_defult_bkg_px = 0;
          }
          if (state_defult_bkg_px == 0) {
            for (let i = 0; i < BILL[state_board].width; i++) {
              for (let j = 0; j < BILL[state_board].height; j++) {
                var_px[state_board][floor(i/10)][floor(j/10)] = 225.0 / 255.0;
              }
            }
            updateBILL(BILL[state_board], state_board);
          } else if (state_defult_bkg_px == 1) {
            for (let i = 0; i < BILL[state_board].width; i++) {
              for (let j = 0; j < BILL[state_board].height; j++) {
                if (floor(i/10) % 2 != 0) {
                  var_px[state_board][floor(i/10)][floor(j/10)] = 195 / 255.0;
                  if (floor(j/10) % 2 != 0) {
                    var_px[state_board][floor(i/10)][floor(j/10)] = 155 / 255.0;
                  }
                } else {
                  var_px[state_board][floor(i/10)][floor(j/10)] = 225 / 255.0;
                  if (floor(j/10) % 2 != 0) {
                    var_px[state_board][floor(i/10)][floor(j/10)] = 210 / 255.0;
                  }
                }
              }
            }
            updateBILL(BILL[state_board], state_board);
          } else if (state_defult_bkg_px == 2) {
            for (let i = 0; i < BILL[state_board].width; i++) {
              for (let j = 0; j < BILL[state_board].height; j++) {
                if (dist(floor(i/10)*10, floor(j/10)*10, BILL[state_board].width/2, BILL[state_board].height/2)%20 < 10) {
                  var_px[state_board][floor(i/10)][floor(j/10)] = 225.0 / 255.0;//var_px[state_board][floor(i/10)][floor(j/10)] = constrain(map(dist(floor(i/10)*10, floor(j/10)*10, BILL[state_board].width/2, BILL[state_board].height/2), 0, BILL[state_board].height*0.75, 0, 1), 0, 1);
                } else {
                  var_px[state_board][floor(i/10)][floor(j/10)] = constrain(map(dist(floor(i/10)*10, floor(j/10)*10, BILL[state_board].width/2, BILL[state_board].height/2), 0, max(BILL[state_board].width, BILL[state_board].height)*0.75, 0.75, 0.85), 0, 1);
                }
              }
            }
            updateBILL(BILL[state_board], state_board);
          } else if (state_defult_bkg_px == 3) {
            for (let i = 0; i < BILL[state_board].width; i++) {
              for (let j = 0; j < BILL[state_board].height; j++) {
                var_px[state_board][floor(i/10)][floor(j/10)] = round(noise(floor(i/10.0)*0.1+frameCount, floor(j/10.0)*0.1) * 255) / 255.0;
              }
            }
            updateBILL(BILL[state_board], state_board);
          } else if (state_defult_bkg_px == 4) {
            for (let i=0; i<var_px[state_board].length; i++) {
              for (let j=0; j<var_px[state_board][i].length; j++) {
                var_px[state_board][i][j] = constrain(Math.floor(node_mash[state_board][0][11+(j*3)+0 + i*var_px[state_board][i].length*3] + node_mash[state_board][0][11+(j*3)+1 + i*var_px[state_board][i].length*3] + node_mash[state_board][0][11+(j*3)+2 + i*var_px[state_board][i].length*3]), 0, 255) / 255.0;
              }
            }
            updateBILL(BILL[state_board], state_board);
          } else if (state_defult_bkg_px == 5) {
            for (let i=0; i<var_px[state_board].length; i++) {
              for (let j=0; j<var_px[state_board][i].length; j++) {
                var_px[state_board][i][j] = constrain(Math.floor(node_info[state_board][0][11+(j*3)+0 + i*var_px[state_board][i].length*3] + node_info[state_board][0][11+(j*3)+1 + i*var_px[state_board][i].length*3] + node_info[state_board][0][11+(j*3)+2 + i*var_px[state_board][i].length*3]), 0, 255) / 255.0;
              }
            }
            updateBILL(BILL[state_board], state_board);
          }
        } else if (i == 5) {
          open_web = !open_web;
        } else if (i == 6) {
          if (document.getElementById('get_file').files.length>0) {
            input.remove();
            input = createFileInput(handleFile);
            input.position(canvas.x, canvas.y);
            input.style("visibility", "hidden");
            input.style('background', color(255, 0, 0, 100));
            input.style('color', color(0, 0, 255));
            input.id('get_file');
          }

          document.getElementById('get_file').click();
        } else if (i == 7) {
          let s = ["BTBB"+state_board+"_0000_"];
          for (let i=0; i<var_px[state_board].length; i++) {
            for (let j=0; j<var_px[state_board][i].length; j++) {
              s[0] += ("00" + round(var_px[state_board][i][j]*255)).slice(-3);
            }
          }
          saveStrings(s, "BlockTrainPB_"+state_board+"_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".txt");
        }
      }
    }



    if (mouseX-width/2 < real(-250+30)  &&
      mouseY-height/2 > real(-200)      &&
      mouseY-height/2 < real(-200 + (2+30)*2 + 30)
      ) {
    } else {
      if (state_mouse == 1) {
        if (mouseX-width/2 > screenPosition(house[0].node[0]).x     &&
          mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
          mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
          mouseY-height/2 < screenPosition(house[0].node[3]).y
          ) {


          BILL[state_board].loadPixels();

          let c = c_paint;
          let x = map(mouseX-width/2, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x, 0, BILL[state_board].width);
          let y = map(mouseY-height/2, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y, 0, BILL[state_board].height);
          for (let i=0; i<10; i++) {
            for (let j=0; j<10; j++) {
              var_px[state_board][floor(x/10)][floor(y/10)] = var_paint;
              BILL[state_board].set(floor(x/10)*10+i, floor(y/10)*10+j, c);
            }
          }

          BILL[state_board].updatePixels();
        }
      } else if (state_mouse == 2) {
        if (mouseY-height/2 < real(250-20-2)     &&
          mouseX-width/2 < real(250-15-2)        &&
          mouseX-width/2 > real(-250+30)) {
          open_select = true;
          node_select[0] = createVector(mouseX-width/2, mouseY-height/2, 0);
          node_select[1] = node_select[0].copy();
        }
      } else if (state_mouse == 3) {
        if (mouseX-width/2 > screenPosition(house[0].node[0]).x     &&
          mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
          mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
          mouseY-height/2 < screenPosition(house[0].node[3]).y
          ) {
          show_straw_c = true;
          time_show_straw_c = 0;
          let x = map(mouseX-width/2, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x, 0, BILL[state_board].width);
          let y = map(mouseY-height/2, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y, 0, BILL[state_board].height);

          var_paint = var_px[state_board][floor(x/10)][floor(y/10)];
          c_paint = lerpColor(c_near, c_far, var_paint);
          inp.value(var_paint*255);
        }
      }
    }
  }






  if (state_mouse == 1  ||  state_mouse == 2) {
    if (mouseY-height/2 > real(250-20)   &&
      mouseX-width/2 > real(-200)        &&
      mouseX-width/2 < real(250-15-2) 
      ) {
      var_paint = constrain(map(mouseX-width/2, real(-200), real(200), 0, 1), 0, 1);
      var_paint = round(var_paint*255);
      inp.value(var_paint);
      var_paint /= 255.0;
      c_paint = lerpColor(c_near, c_far, var_paint);
    }
  }


  if (is_phone) {
    is_mouse_on_canvas = true;
    return false;
  }
}






function mouseDragged() {
  if (state_mouse == 1) {
    if (mouseX-width/2 > screenPosition(house[0].node[0]).x     &&
      mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
      mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
      mouseY-height/2 < screenPosition(house[0].node[3]).y
      ) {
      BILL[state_board].loadPixels();
      let c = c_paint;
      let x = map(mouseX-width/2, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x, 0, BILL[state_board].width);
      let y = map(mouseY-height/2, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y, 0, BILL[state_board].height);
      for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
          var_px[state_board][floor(x/10)][floor(y/10)] = var_paint;
          BILL[state_board].set(floor(x/10)*10+i, floor(y/10)*10+j, c);
        }
      }
      BILL[state_board].updatePixels();
    }
  } else if (state_mouse == 3) {

    if (mouseX-width/2 > screenPosition(house[0].node[0]).x     &&
      mouseX-width/2 < screenPosition(house[0].node[1]).x       &&
      mouseY-height/2 > screenPosition(house[0].node[0]).y      &&
      mouseY-height/2 < screenPosition(house[0].node[3]).y
      ) {
      show_straw_c = true;
      time_show_straw_c = 0;
      let x = map(mouseX-width/2, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x, 0, BILL[state_board].width);
      let y = map(mouseY-height/2, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y, 0, BILL[state_board].height);

      var_paint = var_px[state_board][floor(x/10)][floor(y/10)];
      c_paint = lerpColor(c_near, c_far, var_paint);
      inp.value(var_paint*255);

      time_show_straw_c = 0;
    }
  }


  if (state_mouse == 1  ||  (state_mouse == 2  &&  !open_select)) {
    if (mouseY-height/2 > real(250-20)   &&
      mouseX-width/2 > real(-200)        &&
      mouseX-width/2 < real(250-15-2) 
      ) {
      var_paint = constrain(map(mouseX-width/2, real(-200), real(200), 0, 1), 0, 1);
      var_paint = round(var_paint*255);
      inp.value(var_paint);
      var_paint /= 255.0;
      c_paint = lerpColor(c_near, c_far, var_paint);
    }
  }
  if (is_phone) {
    time_touch = 0;
    return false;
  }
}




function mouseReleased() {
  follow_Y_magnifier = false;
  if (state_mouse == 2  &&  open_select) {
    BILL[state_board].loadPixels();
    for (let i = 0; i < BILL[state_board].width; i+=10) {
      for (let j = 0; j < BILL[state_board].height; j+=10) {
        let x = map(i, 0, BILL[state_board].width, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x);
        let y = map(j, 0, BILL[state_board].height, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y);
        if (
          (
          x > min(node_select[0].x, node_select[1].x)      ||    (map(i+10, 0, BILL[state_board].width, screenPosition(house[0].node[0]).x, screenPosition(house[0].node[1]).x) > min(node_select[0].x, node_select[1].x))
          )                                                &&  
          x < max(node_select[0].x, node_select[1].x)      &&
          (
          y > min(node_select[0].y, node_select[1].y)      ||     (map(j+10, 0, BILL[state_board].height, screenPosition(house[0].node[0]).y, screenPosition(house[0].node[3]).y) > min(node_select[0].y, node_select[1].y))
          )                                                &&
          y < max(node_select[0].y, node_select[1].y)
          ) {
          for (let ii=0; ii<10; ii++) {
            for (let jj=0; jj<10; jj++) {
              var_px[state_board][floor(i/10)][floor(j/10)] = var_paint;
              BILL[state_board].set(i+ii, j+jj, c_paint);
            }
          }
        }
      }
    }
    BILL[state_board].updatePixels();
  }
  open_select = false;
  show_straw_c = false;


  if (is_phone) {
    is_mouse_on_canvas = false;
    time_touch = 0;
    return false;
  }
}


function mouseWheel(event) {
  Y_magnifier += event.delta;
  Y_magnifier = constrain(Y_magnifier, -real(240), real(240));
}




function myInputEvent() {
  var_paint = map(constrain(this.value(), 0, 255), 0, 255, 0, 1);
  var_paint = round(var_paint*255);
  inp.value(var_paint);
  var_paint /= 255.0;
  c_paint = lerpColor(c_near, c_far, var_paint);
}




function keyPressed() {
  if (key == 'i'  ||  key == 'I') {
    state_mouse = 0;
    inp.hide();
    cursor(ARROW);

    open_info = !open_info;
  }
}
//@funnysandwich