function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == 's'  ||  key == 'S') {
      save("Test_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    }else if (key == ' ') {
      noLoop();
    }
  }
}






function mousePressed() {
  open_sprint = true;
    

  if (is_phone) {
    return false;
  }
}