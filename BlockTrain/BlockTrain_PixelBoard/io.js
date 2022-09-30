// include a comment about LICENSE.md in io.js
// Copyright 2022 funnysandwich.tez
function mousePressed() {
  if (dist(mouseX-width/2, mouseY-height/2, real(250-12), Y_magnifier) < real(12)) {
    follow_Y_magnifier = true;
  }





  if (is_phone) {
    is_mouse_on_canvas = true;
    return false;
  }
}






function mouseDragged() {
  if (is_phone) {
    time_touch = 0;
    return false;
  }
}




function mouseReleased() {
  follow_Y_magnifier = false;


  if (is_phone) {
    is_mouse_on_canvas = false;
    time_touch = 0;
    return false;
  }
}


function mouseWheel(event) {
  Y_magnifier += event.delta;
  Y_magnifier = constrain(Y_magnifier, -real(240), real(240));
  return false;
}









function keyPressed() {
  if (key == 'i'  ||  key == 'I') {
    state_mouse = 0;

    cursor(ARROW);

    open_info = !open_info;
  } else if (key == 's'  ||  key == 'S') {
    save("BlockTrain_PixelBoard_"+state_board+"_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".png");
  }
}
//@funnysandwich