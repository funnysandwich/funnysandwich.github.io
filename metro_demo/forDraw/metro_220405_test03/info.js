
function displayInfo_3d() {
  noFill();
  //strokeWeight(real(1));
  //stroke(255, 0, 0);
  //line(200, 0, 0, 0, 0, 0);
  //stroke(255, 200, 200);
  //line(-200, 0, 0, 0, 0, 0);
  //stroke(0, 255, 0);
  //line(0, 200, 0, 0, 0, 0);
  //stroke(200, 255, 200);
  //line(0, -200, 0, 0, 0, 0);
  //stroke(0, 0, 255);
  //line(0, 0, 200, 0, 0, 0);
  //stroke(200, 200, 255);
  //line(0, 0, -200, 0, 0, 0);




  noFill();
  stroke(c_info2);
  strokeWeight(real(10));
  point(skyline);
  strokeWeight(real(1));
  //line(skyline.x-real(100), skyline.y, skyline.z, skyline.x+real(100), skyline.y, skyline.z);
  beginShape(LINES);
  for (let i=0; i<20; i++) {
    let x = map(i, 0, 20-1, -real(1000), real(1000));
    vertex(x, skyline.y, skyline.z);
    vertex(x, skyline.y, real(200));
  }
  for (let i=0; i<20; i++) {
    let z = map(i, 0, 20-1, 0, skyline.z);
    vertex(-real(1000), skyline.y, z);
    vertex(real(1000), skyline.y, z);
  }
  endShape();


  strokeWeight(real(10));
  stroke(0, 255, 0);
  fill(200, 255, 200);
  beginShape();
  vertex(beginLine, skyline.y, 0);
  vertex(beginLine, skyline.y, skyline.z);
  vertex(beginLine, 0, skyline.z);
  vertex(beginLine, 0, 0);
  endShape(CLOSE);
  stroke(255, 0, 0);
  fill(255, 200, 200);
  beginShape();
  vertex(endLine, skyline.y, 0);
  vertex(endLine, skyline.y, skyline.z);
  vertex(endLine, 0, skyline.z);
  vertex(endLine, 0, 0);
  endShape(CLOSE);
}


function displayInfo() {
  PG.noStroke();
  let x = 30;
  let y = 36;
  let gap = 12;
  PG.fill(c_info1);
  PG.textAlign(LEFT);
  PG.textSize(8);
  str_info[1] = ("Speed: " + nfc(speed*scaleRate, 2));
  str_info[2] = ("Mileage: "+nfc(mileage*scaleRate, 2));
  for (let i=0; i<str_info.length; i++) {
    PG.text(str_info[i], x+150*floor(i/37), y+gap*floor(i%37));
  }

  PG.noFill();
  PG.strokeWeight(1);
  PG.stroke(c_info2);
  PG.rect(x+55, y, 12*5, -5);

  PG.noStroke();
  for (let i=0; i<5; i++) {
    const w_rect = 12;
    const h_rect = 5;
    const x_rect = x+55 + w_rect*i;
    if (i == 0) {
      PG.fill(c_all[state_color][state_c_all[state_color][4]]);
    } else if (i == 1) {
      PG.fill(c_all[state_color][state_c_all[state_color][3]]);
    } else {
      PG.fill(c_all[state_color][state_c_all[state_color][i-2]]);
    }

    PG.rect(x_rect, y, w_rect, -h_rect);
  }
  //PG.text("Have_Crucifix: "+open_crucifix + "  ("+nfc(rate_crucifix*100, 0)+"%)", x, y+gap*0);
  //PG.text("Have_Roof: "+open_roof + "  ("+nfc(rate_roof*100, 0)+"%)", x, y+gap*1);
  //PG.text("Have_Handrail: "+open_handrail + "  ("+nfc(rate_handrail*100, 0)+"%)", x, y+gap*2);
  //PG.text("Have_Billboard: "+open_billboard + "  ("+nfc(rate_billboard*100, 0)+"%)", x, y+gap*3);
  //PG.text("Have_River: "+open_river + "  ("+nfc(rate_river*100, 0)+"%)", x, y+gap*4);
  //PG.text("Have_Mountain: "+open_mountain, x, y+gap*5);
  //PG.text("BlockCount: "+count_blocks, x, y+gap*6);


  if (mouseX*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.fill(c_winFrame);
    PG.textSize(10);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("Tamsui", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(c_winFrame);
    PG.text("@funnysandwich 2021.09.13", PG.width/2, PG.height-8);
  } else if (mouseY*scaleRate<17) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(c_winFrame);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
function displayInfo_true() {
  PG.fill(0, 100);
  //PG.rect(5, 5, 200, 300);
  PG.fill(0, 128);
  PG.noStroke();
  PG.textAlign(LEFT);
  PG.textSize(12);
  PG.text("W,H: "+width+", "+height, 10, 20);
  PG.text("P_W,H: "+PG.width+", "+PG.height, 10, 35);
  PG.text("scaleRate: "+scaleRate, 10, 50);
  PG.text("blocks: "+String(blocks.length), 10, 65);
}