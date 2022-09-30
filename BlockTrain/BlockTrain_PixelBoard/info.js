// include a comment about LICENSE.md in info.js
// Copyright 2022 funnysandwich.tez
function displayInfo() {
  let x = 50;
  let y = 50+8;
  let gap = 15;
  PG.noStroke();
  PG.fill(0, 200);
  PG.textAlign(LEFT);
  PG.textSize(10);



  PG.text("Y_magnifier : "+nfc(Y_magnifier, 3), x, y+gap*0);
  PG.text("state_board : "+state_board, x, y+gap*1);
  PG.text("Y_move_state_board : "+nfc(Y_move_state_board, 3), x, y+gap*2);
  PG.text("X_move_state_board : "+nfc(X_move_state_board, 3), x, y+gap*3);
  PG.text("state_mouse : "+state_mouse, x, y+gap*4);
  PG.text("var_paint : "+nfc(var_paint, 3)+" / 1   ( "+round(var_paint*255)+" / 255 )", x, y+gap*5);
  PG.text("c_paint (RGB) : "+nfc(red(c_paint),3)+", "+nfc(green(c_paint),3)+", "+nfc(blue(c_paint),3), x, y+gap*6);




  PG.noStroke();
  PG.fill(0, 128);
  PG.textSize(12);
  PG.textAlign(CENTER);


  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("BlockTrain_PixelBoard_"+state_board, 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.text("@funnysandwich 2022.09.20", PG.width/2, PG.height-9);
  } 
  if (mouseY*scaleRate<25  ||  is_phone) {
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
//@funnysandwich