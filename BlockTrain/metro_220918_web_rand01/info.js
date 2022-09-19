
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

  if (state_speed == 0) {
    str_info[0][str_info[0].length-1] = ("Speed: LAZY");
  } else if (state_speed == 1) {
    str_info[0][str_info[0].length-1] = ("Speed: SLOW");
  } else if (state_speed == 2) {
    str_info[0][str_info[0].length-1] = ("Speed: NORMAL");
  } else if (state_speed == 3) {
    str_info[0][str_info[0].length-1] = ("Speed: FAST");
  } else if (state_speed == 4) {
    str_info[0][str_info[0].length-1] = ("Speed: FAST+");
  } else if (state_speed == 5) {
    str_info[0][str_info[0].length-1] = ("Speed: HURRY");
  }
  str_info[0][str_info[0].length-1] += (" ("+nfc(speed*scaleRate, 2) + "), Mileage: "+nfc(mileage*scaleRate, 2));
  let count = 0;
  for (let i=0; i<str_info.length; i++) {
    if (str_info[i].length > 0) {
      for (let j=0; j<str_info[i].length; j++) {
        PG.text(str_info[i][j], x+150*floor(count/37), y+gap*floor(count%37));
        count ++;
      }
    } else {
      PG.text(str_info[i], x+150*floor(count/37), y+gap*floor(count%37));
      count ++;
    }
  }

  //PG.noFill();
  //PG.strokeWeight(1);
  //PG.stroke(c_info2);
  //PG.rect(x+55, y+gap*2, 12*5, -5);

  //PG.noStroke();
  //for (let i=0; i<5; i++) {
  //  const w_rect = 12;
  //  const h_rect = 5;
  //  const x_rect = x+55 + w_rect*i;
  //  if (i == 0) {
  //    PG.fill(c_all[state_color][state_c_all[state_color][4]]);
  //  } else if (i == 1) {
  //    PG.fill(c_all[state_color][state_c_all[state_color][3]]);
  //  } else {
  //    PG.fill(c_all[state_color][state_c_all[state_color][i-2]]);
  //  }

  //  PG.rect(x_rect, y+gap*2, w_rect, -h_rect);
  //}


  PG.textAlign(CENTER);
  PG.textSize(10);    

  if (!open_mode_line) {
    PG.fill(c_winFrame);
  } else {
    PG.fill(c_far);
  }


  if (mouseX*scaleRate<17  ||  is_phone) {
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("BlockTrain", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17  ||  is_phone) {
    PG.text("@funnysandwich 2022", PG.width/2, PG.height-8);
  }
  if (mouseY*scaleRate<17  ||  is_phone) {
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