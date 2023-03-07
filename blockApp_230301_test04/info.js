function displayInfo() {
  let x = 38;
  let y = 45;
  let gap = 12;
  PG.noStroke();
  PG.fill(95);
  PG.textAlign(LEFT);
  PG.textSize(8);



  PG.text("test : ", x, y+gap*0);
  for (let i=0; i<str_info.length; i++) {
    PG.text(str_info[i], x, y+gap*(i+1));
  }






  PG.textAlign(CENTER);
  PG.fill(55);
  PG.textSize(10);
  PG.noStroke();

  if (mouseX*scaleRate<20  ||  is_phone) {

    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("xxxxxxxx", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-20  ||  is_phone) {
    PG.text("@funnysandwich 2022.00.00", PG.width/2, PG.height-10);
  } 
  if (mouseY*scaleRate<20  ||  is_phone) {
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
//@funnysandwich