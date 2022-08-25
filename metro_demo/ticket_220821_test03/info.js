function displayInfo() {
  let x = 50;
  let y = 50+8;
  let gap = 15;
  let count_text = 0;
  PG.noStroke();
  PG.fill(255, 150);
  PG.textAlign(LEFT);
  PG.textSize(10);


  if (num_ticket == 2) {
    PG.text("State : DOUBLE", x, y+gap*0);
  } else if (num_ticket == 3) {
    PG.text("State : TRIPLE", x, y+gap*0);
  } else {
    PG.text("State : NORMAL", x, y+gap*0);
  }
  PG.text("Color : "+String.fromCharCode(65+state_color), x, y+gap*1);
  PG.text("  #"+c_all[state_color][0], x, y+gap*2);
  PG.text("  #"+c_all[state_color][1], x, y+gap*3);
  PG.text("  #"+c_all[state_color][2], x, y+gap*4);

  PG.text("Width, Height : "+WH_all[state_WH][0]+", "+WH_all[state_WH][1], x, y+gap*5);
  PG.text("Width_Fillet : "+round(W_fillet*scaleRate*0.5), x, y+gap*6);
  PG.text("Height_Bottom : "+round(H_car*scaleRate), x, y+gap*7);
  PG.text("State_Click : "+String.fromCharCode(65+state_click), x, y+gap*8);
  let s_mouth = "";
  for (let i=0; i<num_ticket; i++) {
    if (i != 0) {
      s_mouth += ", ";
    }
    s_mouth += String.fromCharCode(65+state_mouth[i]);
  }
  PG.text("State_Arrow (Mouth) : "+s_mouth, x, y+gap*9);
  s_mouth = "";
  for (let i=0; i<num_ticket; i++) {
    if (i != 0) {
      s_mouth += ", ";
    }
    s_mouth += String.fromCharCode(65+state_cheek[i]);
  }
  PG.text("State_Note (Cheek) : "+s_mouth, x, y+gap*10);
  PG.text("State_Texture : "+String.fromCharCode(65+state_texture), x, y+gap*11);
  count_text = 12;
  if (count_pattern_Tez==0  &&  count_pattern_Btc==0  &&  count_pattern_like==0  &&  count_pattern_metro==0  &&  count_pattern_dino==0  &&  count_pattern_CNR==0  &&  count_pattern_Mc==0  &&  count_pattern_aka==0  &&  count_pattern_fileBroken==0  &&  count_pattern_fx==0) {
    PG.text("Pattern : null", x, y+gap*count_text);
  } else {
    PG.text("Pattern :", x, y+gap*count_text);
    if (count_pattern_Tez != 0) {
      count_text += 1;
      PG.text("  XTZ : "+count_pattern_Tez, x, y+gap*count_text);
    }
    if (count_pattern_Btc != 0) {
      count_text += 1;
      PG.text("  BTC : "+count_pattern_Btc, x, y+gap*count_text);
    }
    if (count_pattern_aka != 0) {
      count_text += 1;
      PG.text("  akaSwap : "+count_pattern_aka, x, y+gap*count_text);
    }
    if (count_pattern_fx != 0) {
      count_text += 1;
      PG.text("  fxhash : "+count_pattern_fx, x, y+gap*count_text);
    }
    if (count_pattern_metro != 0) {
      count_text += 1;
      PG.text("  Metro : "+count_pattern_metro, x, y+gap*count_text);
    }
    if (count_pattern_like != 0) {
      count_text += 1;
      PG.text("  Like : "+count_pattern_like, x, y+gap*count_text);
    }
    if (count_pattern_dino != 0) {
      count_text += 1;
      PG.text("  Dino : "+count_pattern_dino, x, y+gap*count_text);
    }
    if (count_pattern_Mc != 0) {
      count_text += 1;
      PG.text("  Mmc : "+count_pattern_Mc, x, y+gap*count_text);
    }
    if (count_pattern_CNR != 0) {
      count_text += 1;
      PG.text("  CanNotReturn : "+count_pattern_CNR, x, y+gap*count_text);
    }
    if (count_pattern_fileBroken != 0) {
      count_text += 1;
      PG.text("  FileBroken : "+count_pattern_fileBroken, x, y+gap*count_text);
    }
  }
  Y_textBottom = real(y+gap*count_text)-height/2.0;


  PG.fill(255, 200);
  PG.textSize(9);
  PG.textAlign(CENTER);
  let pos = screenPosition(p5.Vector.add(ticket[num_ticket-1].node_ticket[0], ticket[num_ticket-1].node_ticket[1]).mult(0.5).add(0, -real(30+7), 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(scaleRate * p5.Vector.dist(ticket[num_ticket-1].node_ticket[0], ticket[num_ticket-1].node_ticket[1]), 1), pos.x, pos.y);

  pos = screenPosition(p5.Vector.add(ticket[num_ticket-1].node_fillet[1][0], createVector(ticket[num_ticket-1].node_fillet[1][ticket[num_ticket-1].node_fillet[1].length-1].x, ticket[num_ticket-1].node_fillet[1][0].y, ticket[num_ticket-1].node_fillet[1][0].z)).mult(0.5).add(0, -real(5+7), 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(round(scaleRate * p5.Vector.dist(ticket[num_ticket-1].node_fillet[1][0], createVector(ticket[num_ticket-1].node_fillet[1][ticket[num_ticket-1].node_fillet[1].length-1].x, ticket[num_ticket-1].node_fillet[1][0].y, ticket[num_ticket-1].node_fillet[1][ticket[num_ticket-1].node_fillet[1].length-1].z))), pos.x, pos.y);

  pos = screenPosition(p5.Vector.add(ticket[0].node_fillet[3][0], createVector(ticket[0].node_fillet[3][ticket[0].node_fillet[3].length-1].x, ticket[0].node_fillet[3][0].y, ticket[0].node_fillet[3][0].z)).mult(0.5).add(0, real(5+7+8), 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(round(scaleRate * p5.Vector.dist(ticket[0].node_fillet[3][0], createVector(ticket[0].node_fillet[3][ticket[0].node_fillet[3].length-1].x, ticket[0].node_fillet[3][0].y, ticket[0].node_fillet[3][ticket[0].node_fillet[3].length-1].z))), pos.x, pos.y);

  PG.text("0", 250, (450+5+13));
  pos = screenPosition(createVector(ticket[0].node_ticket[4].x, 0, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(pos.x-250, 1), pos.x, 450+5+13);
  pos = screenPosition(createVector(ticket[num_ticket-1].node_ticket[3].x, 0, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(pos.x-250, 1), pos.x, 450+5+13);

  PG.textAlign(LEFT);
  pos = screenPosition(p5.Vector.add(ticket[num_ticket-1].node_ticket[1], ticket[num_ticket-1].node_ticket[3]).mult(0.5).add(real(15+5), 0, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(scaleRate * p5.Vector.dist(ticket[num_ticket-1].node_ticket[1], ticket[num_ticket-1].node_ticket[3]), 1), pos.x, pos.y+2.5);

  pos = screenPosition(p5.Vector.add(ticket[num_ticket-1].node_ticket[2], ticket[num_ticket-1].node_ticket[3]).mult(0.5).add(real(30+5), 0, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(round(scaleRate * p5.Vector.dist(ticket[num_ticket-1].node_ticket[2], ticket[num_ticket-1].node_ticket[3])), pos.x, pos.y+2.5);

  pos = screenPosition(createVector(real(200+5+7), 0, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text("0", pos.x, pos.y+2.5);

  pos = screenPosition(createVector(real(200+5+7), ticket[num_ticket-1].node_ticket[1].y, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(pos.y-250, 1), 450+5+7, pos.y+2.5);
  pos = screenPosition(createVector(real(200+5+7), ticket[num_ticket-1].node_ticket[3].y, 0)).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(pos.y-250, 1), 450+5+7, pos.y+2.5);


  let arrow = createVector(0, H_ticket/2.0+W_wheel, real(100));
  arrow = PRotateY(arrow, roY);
  pos = screenPosition(arrow).mult(scaleRate).add(PG.width/2, PG.height/2);
  PG.text(nfc(roY, 2) + " ("+nfc(degrees(roY), 1)+")", pos.x+3, pos.y+13);


  PG.stroke(c_ticket);
  PG.strokeWeight(0.75);
  PG.fill(c_bkg);
  PG.rect(x+52, y+gap*2, 40, -6);
  PG.noStroke();
  PG.fill(c_ticket);
  PG.rect(x+52, y+gap*3, 40, -6);  
  PG.fill(c_text);
  PG.rect(x+52, y+gap*4, 40, -6);



  PG.noStroke();
  if (mouseX*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.fill(255, 160);
    PG.textSize(12);
    PG.push();
    PG.rotate(-HALF_PI);
    PG.translate(-PG.height/2, 16);
    PG.text("BlockTrain_Pass", 0, 0);
    PG.pop();
    PG.noStroke();
  }
  if (mouseY*scaleRate>height*scaleRate-25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(12);
    PG.fill(255, 160);
    PG.text("@funnysandwich 2022.08.31", PG.width/2, PG.height-9);
  } 
  if (mouseY*scaleRate<25  ||  is_phone) {
    PG.textAlign(CENTER);
    PG.textSize(12);
    PG.fill(255, 160);
    PG.text("fps: "+nfc(frameRate(), 1)+"/30", PG.width/2, 16);
  }
}
//@funnysandwich
