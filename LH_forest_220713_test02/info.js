function displayInfo() {
  let x = 30;
  let y = 56;
  let gap = 18;
  PG.noStroke();
  PG.fill(95);
  PG.textAlign(LEFT);
  PG.textSize(12);

  if (viewer == null) {
    PG.text("/ Sync Your Wallet /", x, y+gap*0);
  } else {
    PG.text("/"+viewer+"/", x, y+gap*0);
  }
  if (viewer_count_house == 0) {
    PG.text("+ - - - - -", x, y+gap*2);
  } else if (viewer_count_house == 1) {
    PG.text("- + - - - -", x, y+gap*2);
  } else if (viewer_count_house == 2) {
    PG.text("- - + - - -", x, y+gap*2);
  } else if (viewer_count_house == 3) {
    PG.text("- - - + - -", x, y+gap*2);
  } else if (viewer_count_house == 4) {
    PG.text("- - - - + -", x, y+gap*2);
  } else {
    PG.text("- - - - - +", x, y+gap*2);
  }
  PG.text("Num_LittleHouse (akaobj) : " + viewer_count_house, x, y+gap*3);

  PG.text("Speed: "+nfc(speed*scaleRate, 1), x, y+gap*4);
  PG.text("Theme: NORMAL", x, y+gap*5);
  PG.text("Click: NULL", x, y+gap*6);
  let sum = rate_empty + rate_tree + rate_house + rate_houseConstr + rate_fence + rate_hole;
  const real_rate_empty = rate_empty / sum;
  const real_rate_tree = rate_tree / sum;
  const real_rate_house = rate_house / sum;
  const real_rate_houseConstr = rate_houseConstr / sum;
  const real_rate_fence = rate_fence / sum;
  const real_rate_hole = rate_hole / sum;

  PG.text("Block:", x, y+gap*7);
  PG.text("  Empty: "+nfc(real_rate_empty*100, 2)+"%", x, y+gap*8);
  PG.text("  Tree: "+nfc(real_rate_tree*100, 2)+"% (Leaves: "+nfc(rate_leaves*100, 0)+"%)", x, y+gap*9);
  PG.text("  ConstructionHouse: "+nfc(real_rate_houseConstr*100, 2)+"%", x, y+gap*10);
  PG.text("  Fence: "+nfc(real_rate_fence*100, 2)+"%", x, y+gap*11);
  PG.text("  Hole: "+nfc(real_rate_hole*100, 2)+"%", x, y+gap*12);
  PG.text("  House: "+nfc(real_rate_house*100, 2)+"%", x, y+gap*13);


  PG.noFill();
  PG.stroke(95);
  PG.strokeWeight(0.75);
  PG.beginShape(LINES);
  PG.vertex(33.769, 69.576);
  PG.vertex(29.189, 79.905);
  PG.vertex(29.189, 79.905);
  PG.vertex(32.65, 79.905);
  PG.vertex(32.65, 79.905);
  PG.vertex(32.65, 82.858);
  PG.vertex(32.65, 82.858);
  PG.vertex(34.887, 82.858);
  PG.vertex(34.887, 82.858);
  PG.vertex(34.887, 79.905);
  PG.vertex(34.887, 79.905);
  PG.vertex(38.349, 79.905);
  PG.vertex(38.349, 79.905);
  PG.vertex(33.769, 69.576);

  PG.vertex(89.938, 69.576);
  PG.vertex(84.468, 76.617);
  PG.vertex(84.468, 76.617);
  PG.vertex(86.772, 76.617);
  PG.vertex(86.772, 76.617);
  PG.vertex(86.772, 82.858);
  PG.vertex(86.772, 82.858);
  PG.vertex(93.105, 82.858);
  PG.vertex(93.105, 82.858);
  PG.vertex(93.105, 76.617);
  PG.vertex(93.105, 76.617);
  PG.vertex(95.409, 76.617);
  PG.vertex(95.409, 76.617);
  PG.vertex(89.938, 69.576);
  PG.endShape();






  PG.noStroke();
  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.fill(55);
    PG.textSize(15);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 20);
    PG.text("LittleHouse_Forest", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("@funnysandwich 2022.07.13", PG.width/2, PG.height-12);
  } 
  if (mouseY*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 20);
  }
}
