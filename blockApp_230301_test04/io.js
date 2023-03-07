function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == 's'  ||  key == 'S') {
      save("Test_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    } else if (key == 'p'  ||  key == 'P') {
      perspective();
    } else if (key == 'o'  ||  key == 'O') {
      ortho(-width/2, width/2, -height/2, height/2, -floor(real(500)), floor(real(2000)));
    }
  }
}






function mousePressed() {


  if (is_phone) {
    return false;
  }
}

//@funnysandwich