function displayInfo() {
  let x = 30;
  let y = 36;
  let gap = 12;
  PG.noStroke();
  PG.fill(255, 160);
  PG.textAlign(LEFT);
  PG.textSize(8);

  PG.text("OVO_SadMouth: "+constrain(map(mess.length, 10, 20, 0, 1), 0, 1), x, y+gap*0);
  PG.text("OVO_Blink: "+open_wink, x, y+gap*1);
  PG.text("OVO_BlinkGap: "+timeGap_wink, x, y+gap*2);

  PG.text("Num_Mess: "+mess.length, x, y+gap*3);
  let num_i = 0;
  let num_y = 0;
  if (mess.length > 0) {
    for (let i=0; i<mess.length; i++) {
      if (mess[i].is_I) {
        num_i += 1;
      } else {
        num_y  += 1;
      }
    }
  }
  PG.text("Num_Mess_i: "+num_i, x, y+gap*4);
  PG.text("Num_Mess_you: "+num_y, x, y+gap*5);
  if (mess.length > 0) {
    for (let i=0; i<mess.length; i++) {
      PG.text("["+i+"] w: "+nfc(mess[i].W, 1)+", h: "+nfc(mess[i].H, 1), x, y+gap*(6+i));
    }
  }



  PG.fill(95, 136, 198);
  PG.rect(PG.width - 28, 44, -165, -18);


  x = PG.width - 30;
  y = 40;
  gap = 22;
  PG.noStroke();
  PG.fill(255, 200);
  PG.textAlign(RIGHT);
  PG.textSize(16);
  PG.text("Possessing Response", x, y+gap*0);
  PG.text("Funnysandwich Solo", x, y+gap*1);
  PG.text("Exhibition", x, y+gap*2);
  PG.text("2022", x, y+gap*8);
  PG.text("06.15 - 07.02", x, y+gap*9);
  PG.text("GALERIE OVO", x, y+gap*17);





  PG.noStroke();
  if (mouseX*scaleRate<17  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.fill(255, 200);
    PG.textSize(10);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("Bridge_Possessing", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-17  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(255, 200);
    PG.text("@funnysandwich 2022.06.29", PG.width/2, PG.height-14);
  } 
  if (mouseY*scaleRate<17  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(10);
    PG.fill(255, 200);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}