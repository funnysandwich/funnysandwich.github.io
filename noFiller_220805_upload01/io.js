function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == 's'  ||  key == 'S') {
      save("NoFiller_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    }
  }
}


function mousePressed() {
  time_released = 0;
  time_wave = 0;
  if (is_phone) {
    time_mouseReleased = 0;
    open_poster = false;
  }

  if (mouseY<height/2  &&  mouseX>map(mouseY, 0, height/2, 0, width/2)  &&  mouseX<map(mouseY, 0, height/2, width, width/2)) {
    state_change = 0;
  } else if (mouseY>height/2  &&  mouseX>map(mouseY, height, height/2, 0, width/2)  &&  mouseX<map(mouseY, height, height/2, width, width/2)) {
    state_change = 2;
  } else if (mouseX>width/2  &&  mouseY>map(mouseX, width, width/2, 0, height/2)  &&  mouseY<map(mouseX, width, width/2, height, height/2)) {
    state_change = 1;
  } else if (mouseX<width/2  &&  mouseY>map(mouseX, 0, width/2, 0, height/2)  &&  mouseY<map(mouseX, 0, width/2, height, height/2)) {
    state_change = 3;
  }




  count_change += 1;
  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {
      blocks[i].change();
    }
  }




  if (is_phone) {
    return false;
  }
}


function touchMoved() {
  if (is_phone) {
    time_touch = 0;
    time_mouseReleased = 0;
    open_poster = false;
    return false;
  }
}

//@funnysandwich
