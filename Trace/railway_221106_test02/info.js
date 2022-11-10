function displayInfo() {
  let x = 38;
  let y = 45;
  let gap = 18;
  PG.noStroke();
  PG.fill(95);
  PG.textAlign(LEFT);
  PG.textSize(12);



  PG.text("Num_LittleHouse (akaobj) : ", x, y+gap*0);
  PG.text("speed: "+speed*scaleRate, x, y+gap*1);
  PG.text("roX: "+roX, x, y+gap*2);
  PG.text("tranZ: "+tranZ, x, y+gap*3);




  PG.noStroke();
  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.fill(55);
    PG.textSize(15);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 20);
    PG.text("XXXXXXXX", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("@funnysandwich 2022.00.00", PG.width/2, PG.height-12);
  } 
  //if (mouseY*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 20);
 // }
}
//@funnysandwich