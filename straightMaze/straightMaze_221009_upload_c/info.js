// include a comment about LICENSE.md in info.js
// Copyright 2022 funnysandwich.tez
function displayInfo() {
  let x = 38;
  let y = 50;
  let gap = 18;


  PG.noStroke();
  PG.fill(c_far);
  PG.rect(x+45, y+gap*0, 30, -8);
  PG.fill(c_near);
  PG.rect(x+45+30, y+gap*0, 30, -8);
  PG.noFill();
  PG.stroke(c_info);
  PG.strokeWeight(1);
  PG.rect(x+45, y+gap*0, 60, -8);
  
  
  
  PG.noStroke();
  PG.fill(255-95);
  PG.textAlign(LEFT);
  PG.textSize(12);


  PG.text("Color: ", x, y+gap*0);
  PG.text("Speed: "+nfc(speed*scaleRate, 1), x, y+gap*1);
  PG.text("Count: "+count_corridor, x, y+gap*2);
  PG.text("Num: 3 * "+corridor.length, x, y+gap*3);
  PG.text("Prob: ", x, y+gap*4);
  PG.text("  Exit: "+rate_signExit*100+"%", x, y+gap*5);
  PG.text("  Ladder: "+rate_attic*100+"%", x, y+gap*6);
  PG.text("  Shoebox: "+rate_shoebox_left*100+"%", x, y+gap*7);
  PG.text("  OpenDoor: "+rate_openDoor_left*100+"%", x, y+gap*8);
  PG.text("  Doorplate: "+rate_doorplate_left*100+"%", x, y+gap*9);
  PG.text("  Doorplate_ToiletMale: "+rate_doorplate_left*100+"% * "+rate_toiletMale_left*100+"%", x, y+gap*10);
  PG.text("  Doorplate_ToiletFemale: "+rate_doorplate_left*100+"% * "+rate_toiletFemale_left*100+"%", x, y+gap*11);
  PG.text("  Doorplate_Power: "+rate_doorplate_left*100+"% * "+rate_power_left*100+"%", x, y+gap*12);
  PG.text("  Stairs: "+rate_stairs_left*100+"%", x, y+gap*13);




  PG.noStroke();
  PG.fill(255-55);
  PG.textSize(15);

  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 20);
    PG.text("StraightMaze_Corridor_c", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.text("@funnysandwich 2022.10.09", PG.width/2, PG.height-12);
  } 
  if (mouseY*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 20);
  }
}
//@funnysandwich