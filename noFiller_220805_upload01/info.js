function displayInfo() {
  let x = 38;
  let y = 45;
  let gap = 18;
  PG.noStroke();
  PG.fill(95);
  PG.textAlign(LEFT);
  PG.textSize(12);



  PG.text("Num_LittleHouse (akaobj) : ", x, y+gap*0);
  PG.text("CanvasSize: "+nfc(width, 1)+", "+nfc(height, 1), x, y+gap*1);
  PG.text("Num_Hor: "+num_hor, x, y+gap*2);
  PG.text("Num_Ver: "+num_ver, x, y+gap*3);
  PG.text("Num_All: "+(num_ver*num_hor), x, y+gap*4);
  if (state_change == 0) {
    PG.text("State_Floor: up", x, y+gap*5);
  } else if (state_change == 1) {
    PG.text("State_Floor: right", x, y+gap*5);
  } else if (state_change == 2) {
    PG.text("State_Floor: down", x, y+gap*5);
  } else if (state_change == 3) {
    PG.text("State_Floor: left", x, y+gap*5);
  }
  if (!open_poster) {
    PG.text("MouseOver: true", x, y+gap*6);
  } else {
    PG.text("MouseOver: false", x, y+gap*6);
  }
  PG.text("Y_Poster: "+nfc(Y_poster, 1), x, y+gap*7);
  PG.text("Time_Wave: "+time_released+" / "+time_max_released, x, y+gap*8);



  if (!open_poster) {
    x = PG.width/2+screenPosition(blocks[index].node[3]).x*(PG.height/height) + 10;
    y = PG.height/2+screenPosition(blocks[index].node[3]).y*(PG.height/height);
    let gap = 13;
    PG.textSize(9);
    PG.fill(60);
    PG.text("Index: "+index+" ("+blocks[index].index_x+", "+blocks[index].index_y+")", x, y-gap*4);
    PG.text("Num_Floor: "+blocks[index].num_floor, x, y-gap*3);
    PG.text("H: "+nfc(blocks[index].H_house_floor*blocks[index].num_floor + blocks[index].H_roof, 1), x, y-gap*2);
    PG.text("W_Left: "+nfc(blocks[index].L_house_l, 1), x, y-gap*1);
    PG.text("W_Right: "+nfc(blocks[index].L_house_r, 1), x, y-gap*0);
  }





  PG.noStroke();
  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.fill(55);
    PG.textSize(15);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 20);
    PG.text("LittleHouse_NoFiller", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("@funnysandwich 2022.08.13", PG.width/2, PG.height-12);
  } 
  if (mouseY*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(15);
    PG.fill(55);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 20);
  }
}
//@funnysandwich