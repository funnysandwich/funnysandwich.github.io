function drawF(index) {
  F[index].background(c_text);

  if (state_texture == 1) {
    F[index].noFill();
    F[index].stroke(changeBrightness(c_text, 10));
    F[index].strokeWeight(0.75);

    F[index].beginShape(LINES);
    for (let i=0; i<50; i++) {
      let x = map(i, 0, 50, -50, F[index].width);
      let y = F[index].height-H_car*scaleRate;
      let x_ = map(i, 0, 50, 0, F[index].width+50);
      let y_ = F[index].height;
      F[index].vertex(x, y);
      F[index].vertex(x_, y_);
    }
    F[index].endShape();
  } else if (state_texture == 2) {
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);

    F[index].beginShape(LINES);
    for (let i=0; i<100; i++) {
      let x = random(0, F[index].width);
      let y = random(F[index].height-H_car*scaleRate, F[index].height);
      F[index].vertex(x-2, y);
      F[index].vertex(x+2, y);
      F[index].vertex(x, y-2);
      F[index].vertex(x, y+2);
    }
    F[index].endShape();
  } else if (state_texture == 3) {
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(1.5);
    F[index].beginShape(POINTS);
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    for (let i=0; i<num_hor; i++) {
      for (let j=0; j<num_ver; j++) {
        F[index].vertex(map(i, 0, num_hor, 0, F[index].width), map(j, -1, num_ver, F[index].height-H_car*scaleRate, F[index].height)+map(noise(i*0.5+j*num_hor), 0, 1, -3, 3));
      }
    }
    F[index].endShape();
  } else if (state_texture == 4) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, F[index].width), map(i, 0, num_ver-1, F[index].height-H_car*scaleRate, F[index].height));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-2; j+=2) {
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        F[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
      }
    }
    F[index].endShape();
  } else if (state_texture == 5) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, F[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-2, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);        
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
      }
    }
    F[index].endShape();
  } else if (state_texture == 6) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-1, 0, F[index].width)+map(noise((j*0.05+i*num_hor*0.05)), 0, 1, -10, 10), map(i, 0, num_ver-1, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.05+999), 0, 1, -2, 2));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor; j++) {
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
      }
    }
    F[index].endShape();
  } else if (state_texture == 7) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, F[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -1, 1), map(i, 0, num_ver-2, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
      }
    }
    F[index].endShape();
  } else if (state_texture == 8) {
    let gap = 12;
    let num_hor = ceil(F[index].width/gap)+2;
    let num_ver = ceil((H_car*scaleRate) / (gap/2.0));
    let num_detail = 5;
    let n = Array.from(Array(num_ver), () => new Array(num_hor));
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i][j] = new Array(num_detail);
        for (let k=0; k<num_detail; k++) {
          let x = cos(map(k, 0, num_detail, PI, 0)) * gap/2.0;
          let y = sin(map(k, 0, num_detail, PI, 0)) * gap/2.0;
          n[i][j][k] = createVector(x, y);
          if (i%2 == 0) {
            n[i][j][k].add(j*gap, F[index].height-H_car*scaleRate + i*(gap/2.0));
          } else {
            n[i][j][k].add(j*gap-gap/2.0, F[index].height-H_car*scaleRate + i*(gap/2.0));
          }
        }
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        for (let k=0; k<num_detail-1; k++) {
          F[index].vertex(n[i][j][k].x, n[i][j][k].y);
          F[index].vertex(n[i][j][k+1].x, n[i][j][k+1].y);
        }
        if (j < num_hor-1) {
          F[index].vertex(n[i][j][num_detail-1].x, n[i][j][num_detail-1].y);
          F[index].vertex(n[i][j+1][0].x, n[i][j+1][0].y);
        }
      }
    }
    F[index].endShape();
  } else if (state_texture == 9) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-5, 0, F[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-1, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
        if (i%2 != 0) {
          n[i*num_hor+j].x += gap*2;
        }
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.75);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-5; j+=5) {
        if (i%2 == 0) {
          F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          F[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
          F[index].vertex(n[i*num_hor+j+3].x, n[i*num_hor+j+3].y);
          F[index].vertex(n[i*num_hor+j+4].x, n[i*num_hor+j+4].y);
        } else {
          F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
          F[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
          F[index].vertex(n[i*num_hor+j+4].x, n[i*num_hor+j+4].y);
        }
      }
    }
    F[index].endShape();
  } else if (state_texture == 10) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, F[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -1, 1), map(i, 0, num_ver-2, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-1; j+=2) {
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
      }
    }
    F[index].endShape();
  } else if (state_texture == 11) {
    let gap = 5;
    let num_hor = ceil(F[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, F[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-2, F[index].height-H_car*scaleRate, F[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    F[index].noFill();
    F[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    F[index].strokeWeight(0.5);
    F[index].beginShape(LINES);
    for (let i=0; i<num_ver-2; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        if (j%4<2) {
          F[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          F[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
          F[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
          F[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
        } else {
          F[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
          F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          F[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          F[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          F[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
          F[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
          F[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
        }
      }
    }
    F[index].endShape();
  }




  F[index].noStroke();
  F[index].fill(c_ticket);
  //if (WH_all[state_WH][3] == 5) {
  //  F[index].fill("#aaa7a7");
  //}
  F[index].rect(0, 0, F[index].width, F[index].height-H_car*scaleRate);




  if (state_dotted == 0  ||  state_dotted == 1) {
    let num_line = 10;
    if (state_dotted == 0) {
      num_line = 12;
    } else if (state_dotted == 1) {
      num_line = 40;
    }
    F[index].noFill();
    F[index].strokeWeight(2);
    F[index].stroke(c_text);
    F[index].strokeCap(SQUARE);
    F[index].beginShape(LINES);
    for (let i=0; i<num_line; i+=2) {
      let x = map(i, 0, num_line-1, 0, F[index].width);
      let x_ = map(i+1, 0, num_line-1, 0, F[index].width);
      F[index].vertex(x, F[index].height-H_car*scaleRate);
      F[index].vertex(x_, F[index].height-H_car*scaleRate);
    }
    F[index].endShape();
  } else if (state_dotted == 2) {
    F[index].noFill();
    F[index].strokeWeight(realF(2.5));
    F[index].stroke(c_text);
    F[index].beginShape(POINTS);
    for (let i=0; i<40; i++) {
      let x = map(i, 0, 40-1, 0, F[index].width);
      F[index].vertex(x, F[index].height-H_car*scaleRate);
    }
    F[index].endShape();
  } else if (state_dotted == 3) {
    F[index].fill(c_text);
    F[index].noStroke();
    F[index].beginShape(TRIANGLES);
    let num = ceil(F[index].width / realF(3.5));
    for (let i=0; i<num; i++) {
      let x = map(i, 0, num-1, 0, F[index].width);
      F[index].vertex(x-realF(1.75), F[index].height-H_car*scaleRate);
      F[index].vertex(x+realF(1.75), F[index].height-H_car*scaleRate);
      F[index].vertex(x, F[index].height-H_car*scaleRate-realF(1.75));
    }
    F[index].endShape();
  } else if (state_dotted == 4) {
    F[index].fill(c_text);
    F[index].noStroke();
    F[index].beginShape(TRIANGLES);
    let num = ceil(F[index].width / realF(15));
    for (let i=0; i<num; i++) {
      let x = map(i, 0, num-1, 0, F[index].width);
      F[index].vertex(x-realF(7.5), F[index].height-H_car*scaleRate);
      F[index].vertex(x+realF(7.5), F[index].height-H_car*scaleRate);
      F[index].vertex(x, F[index].height-H_car*scaleRate-realF(1.25));
    }
    F[index].endShape();
  }

  F[index].strokeCap(ROUND);
  F[index].strokeJoin(ROUND);





  center_eye_l = createVector(F[index].width*0.5-realF(50), (F[index].height-H_car*scaleRate)*0.47);
  center_eye_r = createVector(F[index].width*0.5+realF(50), (F[index].height-H_car*scaleRate)*0.47);
  let node_eye = Array.from(Array(2), () => new Array(5*2));
  let ran = random(-999, 999);
  w_eye = realF(30);
  node_eye_l_global[index] = new Array(node_eye[0].length);
  node_eye_r_global[index] = new Array(node_eye[1].length);

  for (let i=0; i<node_eye.length; i++) {
    for (let j=0; j<node_eye[i].length; j++) {
      let x=0.0, y=0.0;
      if (j < node_eye[i].length/2) {
        x = map(j, 0, node_eye[i].length/2-1, -w_eye/2.0, w_eye/2.0)  + realF(map(noise(i*33+j*22 + ran), 0, 1, -1, 1))*(min(F[index].width, F[index].height)*0.05);
        y = map(noise(i*100+j*1 + ran), 0, 1, w_eye*0.25, -w_eye*0.85) * sin(map(j, 0, node_eye[i].length/2-1, 0, PI));
      } else {
        x = map(j, node_eye[i].length/2, node_eye[i].length-1, w_eye/2.0, -w_eye/2.0)  + realF(map(noise(i*33+j*22 + ran), 0, 1, -1, 1))*(min(F[index].width, F[index].height)*0.005);
        y = map(noise(i*100+j*1 + ran), 0, 1, -w_eye*0.25, w_eye*0.85) * sin(map(j, node_eye[i].length/2, node_eye[i].length-1, 0, PI));//map(noise(i*100+j*1), 0, 1, 0.5, 1) * map(sin(map(j, node_eye[i].length/2, node_eye[i].length-1, 0, PI)), 0, 1, 0, w_eye*0.45);
      }
      node_eye[i][j] = createVector(x, y);
      if (i == 0) {
        node_eye_l_global[index][j] = node_eye[i][j].copy();

        node_eye[i][j].add(center_eye_l);
      } else {
        node_eye_r_global[index][j] = node_eye[i][j].copy();

        node_eye[i][j].add(center_eye_r);
      }
    }
  }







  let center_mouth = createVector(F[index].width*0.5, center_eye_l.y + realF(10));
  let node_mouth = new Array(5);
  if (state_mouth[index] == 13) {
    node_mouth = new Array(16);
  }
  for (let i=0; i<node_mouth.length; i++) {
    let x = realF(map(i, 0, node_mouth.length-1, -25, 25)) + F[index].width*0.5;//center_eye_l.x+w_eye*0.75, center_eye_r.x-w_eye*0.75);
    let y = 0.0;
    if (state_mouth[index] == 0) {
      y = 0;
    } else if (state_mouth[index] == 1) {
      y = sin(map(i, 0, node_mouth.length-1, 0, PI))*(w_eye*0.2);
    } else if (state_mouth[index] == 2) {
      y = -w_eye*0.1+sin(map(i, 0, node_mouth.length-1, 0, PI))*(-w_eye*0.2);
    } else if (state_mouth[index] == 3) {
      x = realF(map(i, 0, node_mouth.length-1, -20, 20)) + F[index].width*0.5;
      if (i <= node_mouth.length/2) {
        y = map(i, 0, floor(node_mouth.length/2), 0, w_eye*0.3);
      } else {
        y = map(i, floor(node_mouth.length/2), node_mouth.length-1, w_eye*0.3, 0);
      }
    } else if (state_mouth[index] == 4) {
      x = realF(map(i, 0, node_mouth.length-1, -20, 20))+F[index].width*0.5;
      y = -w_eye*0.15 + (i)%2 * w_eye*0.3;
    } else if (state_mouth[index] == 5) {
      y = sin(map(i, 0, node_mouth.length-1, 0, PI))*(w_eye*0.2);
    } else if (state_mouth[index] == 6) {
      if (i == node_mouth.length-1) {
        x = -realF(20)+F[index].width*0.5;
        y = -realF(5);
      } else if (i == node_mouth.length-2) {
        x = realF(20)+F[index].width*0.5;
        y = -realF(5);
      } else {
        x = cos(map(i, 0, node_mouth.length-2, PI-PI*0.25, 0))*realF(20)  +  F[index].width*0.5;
        y = sin(map(i, 0, node_mouth.length-2, PI-PI*0.25, 0))*realF(15)  -  realF(5);
      }
    } else if (state_mouth[index] == 7) {
      x = realF(map(i, 0, node_mouth.length-1, -20, 20)) + F[index].width*0.5;
      y = -realF(5);
    } else if (state_mouth[index] == 8) {
      y = 0;
    } else if (state_mouth[index] == 9) {
      y = 0;
    } else if (state_mouth[index] == 10) {
      y = 0;
    } else if (state_mouth[index] == 11) {
      y = 0;
    } else if (state_mouth[index] == 12) {
      if (i == node_mouth.length-1) {
        x = -realF(15)+F[index].width*0.5;
      } else if (i == node_mouth.length-2) {
        x = realF(20)+F[index].width*0.5;
      } else {
        x = cos(map(i, 0, node_mouth.length-2, PI+PI*0.25, TWO_PI))*realF(20)  +  F[index].width*0.5;
        y = sin(map(i, 0, node_mouth.length-2, PI+PI*0.5, TWO_PI))*realF(12);
      }
      y += realF(8);
    } else if (state_mouth[index] == 13) {
      x = cos(map(i, 0, node_mouth.length, 0, TWO_PI))*realF(20)  +  F[index].width*0.5;
      y = sin(map(i, 0, node_mouth.length, 0, TWO_PI))*realF(10);
    } else if (state_mouth[index] == 14) {
      if (i == 0) {
        x = realF(-17+5) + F[index].width*0.5;
        y = realF(4);
      } else if (i == 1) {
        x = realF(-5) + F[index].width*0.5;
        y = realF(15);
      } else {
        y = -realF(5);
        x = realF(map(i, 2, 4, 17, -17)) + F[index].width*0.5;
      }
    }

    node_mouth[i] = createVector(x, y+center_mouth.y);
  }
  F[index].noFill();
  F[index].stroke(c_text);
  F[index].strokeWeight(realF(3));
  F[index].beginShape(LINES);
  if (state_mouth[index] == 4) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x+realF(3), node_mouth[node_mouth.length-2].y-realF(8));
  } else if (state_mouth[index] == 5) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      let n = p5.Vector.sub(node_mouth[i+1], node_mouth[i]).mult(0.35).add(node_mouth[i]);
      if (i == node_mouth.length-2) {
        n = node_mouth[node_mouth.length-1].copy();
      }
      F[index].vertex(n.x, n.y);
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x+realF(3), node_mouth[node_mouth.length-2].y-realF(6));
  } else if (state_mouth[index] == 6) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-1].x+realF(10), node_mouth[node_mouth.length-1].y-realF(5));
  } else if (state_mouth[index] == 7) {
    F[index].vertex(node_mouth[0].x, node_mouth[0].y);
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[2].x-realF(7), node_mouth[2].y-realF(6));
    F[index].vertex(node_mouth[2].x+realF(7), node_mouth[2].y+realF(6));
    F[index].vertex(node_mouth[2].x+realF(7), node_mouth[2].y-realF(6));
    F[index].vertex(node_mouth[2].x-realF(7), node_mouth[2].y+realF(6));
  } else if (state_mouth[index] == 8) {
    for (let i=0; i<node_mouth.length-1; i++) {
      if (i == 1) {
        F[index].vertex(node_mouth[i].x, node_mouth[i].y);
        F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y-realF(8));
        F[index].vertex(node_mouth[i].x, node_mouth[i].y);
        F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y+realF(8));
      } else if (i == 2) {
        F[index].vertex(node_mouth[i].x, node_mouth[i].y-realF(8));
        F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
        F[index].vertex(node_mouth[i].x, node_mouth[i].y+realF(8));
        F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
      } else {
        F[index].vertex(node_mouth[i].x, node_mouth[i].y);
        F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
      }
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x+realF(4), node_mouth[node_mouth.length-2].y-realF(5));
  } else if (state_mouth[index] == 9) {
    F[index].vertex(node_mouth[0].x, node_mouth[0].y);
    F[index].vertex(node_mouth[1].x, node_mouth[1].y);
    F[index].vertex(node_mouth[1].x, node_mouth[1].y);
    F[index].vertex(node_mouth[1].x, node_mouth[1].y+realF(5));
    F[index].vertex(node_mouth[1].x, node_mouth[1].y+realF(5));
    F[index].vertex(node_mouth[1].x+realF(6), node_mouth[1].y+realF(5));
    F[index].vertex(node_mouth[1].x+realF(6), node_mouth[1].y+realF(5));
    F[index].vertex(node_mouth[1].x+realF(6), node_mouth[1].y);
    F[index].vertex(node_mouth[1].x+realF(6), node_mouth[1].y);
    F[index].vertex(node_mouth[3].x-realF(6), node_mouth[3].y);
    F[index].vertex(node_mouth[3].x-realF(6), node_mouth[3].y);
    F[index].vertex(node_mouth[3].x-realF(6), node_mouth[3].y+realF(5));
    F[index].vertex(node_mouth[3].x-realF(6), node_mouth[3].y+realF(5));
    F[index].vertex(node_mouth[3].x, node_mouth[3].y+realF(5));
    F[index].vertex(node_mouth[3].x, node_mouth[3].y+realF(5));
    F[index].vertex(node_mouth[3].x, node_mouth[3].y);
    F[index].vertex(node_mouth[3].x, node_mouth[3].y);
    F[index].vertex(node_mouth[4].x, node_mouth[4].y);

    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x+realF(2), node_mouth[node_mouth.length-2].y-realF(7));
  } else if (state_mouth[index] == 10) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[1].x, node_mouth[1].y-realF(4));
    F[index].vertex(node_mouth[1].x, node_mouth[1].y+realF(4));
    F[index].vertex(node_mouth[3].x-realF(8), node_mouth[3].y-realF(4));
    F[index].vertex(node_mouth[3].x-realF(8), node_mouth[3].y+realF(4));
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x, node_mouth[node_mouth.length-2].y-realF(5));
  } else if (state_mouth[index] == 11) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    let n_tongue = new Array(5);
    for (let i=0; i<n_tongue.length; i++) {
      let w = p5.Vector.dist(node_mouth[1], node_mouth[3]) * 0.55;
      let x = cos(map(i, 0, n_tongue.length-1, 0, PI))*w/2.0;
      let y = sin(map(i, 0, n_tongue.length-1, 0, PI))*w/2.0;
      n_tongue[i] = createVector(x-realF(2), y+realF(15)).add(node_mouth[2]);
    }
    F[index].vertex(n_tongue[0].x, node_mouth[2].y);
    F[index].vertex(n_tongue[0].x, n_tongue[0].y);
    for (let i=0; i<n_tongue.length-1; i++) {
      F[index].vertex(n_tongue[i].x, n_tongue[i].y);
      F[index].vertex(n_tongue[i+1].x, n_tongue[i+1].y);
    }
    F[index].vertex(n_tongue[n_tongue.length-1].x, n_tongue[n_tongue.length-1].y);
    F[index].vertex(n_tongue[n_tongue.length-1].x, node_mouth[2].y+realF(6));
    F[index].vertex(n_tongue[n_tongue.length-1].x, node_mouth[2].y+realF(6));
    F[index].vertex(n_tongue[n_tongue.length-1].x-realF(4), n_tongue[n_tongue.length-1].y-realF(4));


    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x, node_mouth[node_mouth.length-2].y-realF(5));
  } else if (state_mouth[index] == 12) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[0].x, node_mouth[0].y);
    F[index].vertex(node_mouth[0].x+realF(10), node_mouth[0].y-realF(4));
  } else if (state_mouth[index] == 13) {
    for (let i=0; i<node_mouth.length; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[(i+1)%node_mouth.length].x, node_mouth[(i+1)%node_mouth.length].y);
    }
    F[index].vertex(node_mouth[14].x, node_mouth[14].y);
    F[index].vertex(node_mouth[14].x-realF(6), node_mouth[14].y-realF(7));
    F[index].vertex(node_mouth[14].x, node_mouth[14].y);
    F[index].vertex(node_mouth[14].x-realF(9), node_mouth[14].y+realF(3));
  } else if (state_mouth[index] == 14) {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x-realF(5), node_mouth[node_mouth.length-2].y-realF(5));
  } else {
    for (let i=0; i<node_mouth.length-1; i++) {
      F[index].vertex(node_mouth[i].x, node_mouth[i].y);
      F[index].vertex(node_mouth[i+1].x, node_mouth[i+1].y);
    }
    F[index].vertex(node_mouth[node_mouth.length-1].x, node_mouth[node_mouth.length-1].y);
    F[index].vertex(node_mouth[node_mouth.length-2].x, node_mouth[node_mouth.length-2].y-realF(5));
  }

  F[index].endShape();











  let node_eyebrow_l = Array.from(Array(1), () => new Array(floor(random(4, 10))));
  let node_eyebrow_r = Array.from(Array(1), () => new Array(floor(random(4, 10))));
  if (state_cheek[index] == 4) {
    node_eyebrow_l = Array.from(Array(1), () => new Array(floor(random(8, 10))));
    node_eyebrow_r = Array.from(Array(1), () => new Array(floor(random(8, 10))));
    for (let i=0; i<node_eyebrow_l.length; i++) {
      for (let j=0; j<node_eyebrow_l[i].length; j++) {
        let x = center_eye_l.x-w_eye/2.0 + j*realF(4);
        let y = center_eye_l.y-w_eye*0.55 - sin(map(j, 0, node_eyebrow_l[i].length-1, 0, PI))*realF(4) + map(noise(j*0.25+134+index*55), 0, 1, -1, 1)*realF(2);
        node_eyebrow_l[i][j] = createVector(x, y);
      }
    }
    for (let i=0; i<node_eyebrow_r.length; i++) {
      for (let j=0; j<node_eyebrow_r[i].length; j++) {
        let x = center_eye_r.x+w_eye/2.0 - j*realF(4);
        let y = center_eye_r.y-w_eye*0.55 - sin(map(j, 0, node_eyebrow_r[i].length-1, 0, PI))*realF(4) + map(noise(j*0.25+555+index*55), 0, 1, -1, 1)*realF(2);
        node_eyebrow_r[i][j] = createVector(x, y);
      }
    }
  } else {
    for (let i=0; i<node_eyebrow_l.length; i++) {
      for (let j=0; j<node_eyebrow_l[i].length; j++) {
        let x = center_eye_l.x-w_eye/2.0 + j*realF(2);
        let y = center_eye_l.y-w_eye*0.75 + i*realF(3) + noise((j+999)*0.5+i*99+index*88)*realF(7.5);
        node_eyebrow_l[i][j] = createVector(x, y);
      }
    }
    for (let i=0; i<node_eyebrow_r.length; i++) {
      for (let j=0; j<node_eyebrow_r[i].length; j++) {
        let x = center_eye_r.x+w_eye*0.5 - j*realF(2);
        let y = center_eye_r.y-w_eye*0.75 + i*realF(3) + noise(j*0.5+i*99+index*88)*realF(7.5);
        node_eyebrow_r[i][j] = createVector(x, y);
      }
    }
  }



  F[index].noFill();
  F[index].stroke(c_text);
  F[index].strokeWeight(1.5);
  F[index].beginShape(LINES);

  for (let i=0; i<node_eyebrow_l.length; i++) {
    for (let j=0; j<node_eyebrow_l[i].length-1; j++) {
      F[index].vertex(node_eyebrow_l[i][j].x, node_eyebrow_l[i][j].y);
      F[index].vertex(node_eyebrow_l[i][j+1].x, node_eyebrow_l[i][j+1].y);
    }
    if (state_cheek[index] == 4) {
      F[index].vertex(realF(5-1) + center_eye_l.x-w_eye/2.0 + (node_eyebrow_l[i].length-1)*realF(4), realF(10-2) + center_eye_l.y-w_eye*0.55);
      F[index].vertex(realF(5) + center_eye_l.x-w_eye/2.0 + (node_eyebrow_l[i].length-1)*realF(4), realF(10) + center_eye_l.y-w_eye*0.55);
      F[index].vertex(realF(5) + center_eye_l.x-w_eye/2.0 + (node_eyebrow_l[i].length-1)*realF(4), realF(10) + center_eye_l.y-w_eye*0.55);
      F[index].vertex(realF(10) + center_eye_l.x-w_eye/2.0 + (node_eyebrow_l[i].length-1)*realF(4), realF(10) + center_eye_l.y-w_eye*0.55);
    }
  }

  for (let i=0; i<node_eyebrow_r.length; i++) {
    for (let j=0; j<node_eyebrow_r[i].length-1; j++) {
      F[index].vertex(node_eyebrow_r[i][j].x, node_eyebrow_r[i][j].y);
      F[index].vertex(node_eyebrow_r[i][j+1].x, node_eyebrow_r[i][j+1].y);
    }
    if (state_cheek[index] == 4) {
      F[index].vertex(-realF(5-1) + center_eye_r.x+w_eye/2.0 - (node_eyebrow_r[i].length-1)*realF(4), realF(10-2) + center_eye_r.y-w_eye*0.55);
      F[index].vertex(-realF(5) + center_eye_r.x+w_eye/2.0 - (node_eyebrow_r[i].length-1)*realF(4), realF(10) + center_eye_r.y-w_eye*0.55);
      F[index].vertex(-realF(5) + center_eye_r.x+w_eye/2.0 - (node_eyebrow_r[i].length-1)*realF(4), realF(10) + center_eye_r.y-w_eye*0.55);
      F[index].vertex(-realF(10) + center_eye_r.x+w_eye/2.0 - (node_eyebrow_r[i].length-1)*realF(4), realF(10) + center_eye_r.y-w_eye*0.55);
    }
  }
  F[index].endShape();









  let node_face_l = new Array(floor(random(3, 9))*2);
  let node_face_r = new Array(floor(random(3, 9))*2);

  if (state_cheek[index] == 0) {
    for (let i=0; i<node_face_l.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_l.length/2) {
        x = center_eye_l.x - w_eye/2.0 + i*realF(4);
        y = center_eye_l.y + w_eye*0.65 + realF(map(noise(i*0.5+789+index*99), 0, 1, -5, 5));
      } else {
        x = center_eye_l.x - w_eye/2.0 + (node_face_l.length-1-i)*realF(4);
        y = center_eye_l.y + w_eye*0.65 + realF(7) + realF(map(noise(i*0.5+111+index*99), 0, 1, -5, 5));
      }
      node_face_l[i] = createVector(x, y);
    }

    for (let i=0; i<node_face_r.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_r.length/2) {
        x = center_eye_r.x + w_eye/2.0 - i*realF(4);
        y = center_eye_r.y + w_eye*0.65 + realF(map(noise(i*0.5+234+index*99), 0, 1, -5, 5));
      } else {
        x = center_eye_r.x + w_eye/2.0 - (node_face_r.length-1-i)*realF(4);
        y = center_eye_r.y + w_eye*0.65 + realF(7) + realF(map(noise(i*0.5+345+index*99), 0, 1, -5, 5));
      }
      node_face_r[i] = createVector(x, y);
    }
  } else if (state_cheek[index] == 1) {
    node_face_l = new Array(floor(random(5, 9))*2);
    node_face_r = new Array(floor(random(5, 9))*2);

    for (let i=0; i<node_face_l.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_l.length/2) {
        x = center_eye_l.x - w_eye*0.1 + realF(map(noise(i*0.5+789+index*99), 0, 1, -5, 5));
        y = center_eye_l.y + i*realF(5);
      } else {
        x = center_eye_l.x - w_eye*0.1 + realF(7) + realF(map(noise(i*0.5+345+index*99), 0, 1, -5, 5));
        y = center_eye_l.y + (node_face_l.length-1-i)*realF(5);
      }
      node_face_l[i] = createVector(x, y);
    }
    for (let i=0; i<node_face_r.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_r.length/2) {
        x = center_eye_r.x + w_eye*0.1 + realF(map(noise(i*0.5+234+index*99), 0, 1, -5, 5));
        y = center_eye_r.y + i*realF(5);
      } else {
        x = center_eye_r.x + w_eye*0.1 + realF(7) + realF(map(noise(i*0.5+111+index*99), 0, 1, -5, 5));
        y = center_eye_r.y + (node_face_r.length-1-i)*realF(5);
      }
      node_face_r[i] = createVector(x, y);
    }
  } else if (state_cheek[index] == 2) {
    node_face_l = Array.from(Array(2), () => new Array(floor(random(3, 9))*2));
    node_face_r = Array.from(Array(2), () => new Array(floor(random(3, 9))*2));
    for (let i=0; i<node_face_l.length; i++) {
      for (let j=0; j<node_face_l[i].length; j++) {
        let x=0.0, y=0.0;
        if (j < node_face_l[i].length/2) {
          x = center_eye_l.x - j*realF(4) + realF(map(noise(j*0.5+444+i*23), 0, 1, -2, 2));
          y = center_eye_l.y + w_eye*0.65 + realF(map(noise(j*0.5+789+i*100), 0, 1, -2.5, 2.5)) + j*realF(1*(i));
        } else {
          x = center_eye_l.x - (node_face_l[i].length-1-j)*realF(4) + realF(map(noise(j*0.5+444+i*23+index*99), 0, 1, -2, 2));
          y = center_eye_l.y + w_eye*0.65 + realF(3) + realF(map(noise(j*0.5+111+i*100+index*99), 0, 1, -2.5, 2.5)) + (node_face_l[i].length-1-j)*realF(1*(i));
        }
        y += i*realF(7);
        node_face_l[i][j] = createVector(x, y);
      }
    }
    for (let i=0; i<node_face_r.length; i++) {
      for (let j=0; j<node_face_r[i].length; j++) {
        let x=0.0, y=0.0;
        if (j < node_face_r[i].length/2) {
          x = center_eye_r.x + j*realF(4) + realF(map(noise(j*0.5+112+i*23+index*99), 0, 1, -2, 2));
          y = center_eye_r.y + w_eye*0.65 + realF(map(noise(j*0.5+234+i*100+index*99), 0, 1, -2.5, 2.5)) + j*realF(1*(i));
        } else {
          x = center_eye_r.x + (node_face_r[i].length-1-j)*realF(4) + realF(map(noise(j*0.5+112+i*23+index*99), 0, 1, -2, 2));
          y = center_eye_r.y + w_eye*0.65 + realF(3) + realF(map(noise(j*0.5+345+i*100+index*99), 0, 1, -2.5, 2.5)) + (node_face_r[i].length-1-j)*realF(1*(i));
        }
        y += i*realF(7);
        node_face_r[i][j] = createVector(x, y);
      }
    }
  } else if (state_cheek[index] == 3) {
    for (let i=0; i<node_face_l.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_l.length/2) {
        x = cos(map(i, 0, node_face_l.length/2-1, PI, HALF_PI)) * w_eye*0.7;
        y = sin(map(i, 0, node_face_l.length/2-1, PI, HALF_PI)) * w_eye*0.4;
        x += center_eye_l.x + w_eye*0.05 + realF(map(noise(i*0.5+112+i*23+index*99), 0, 1, -3, 3));
        y += center_eye_l.y + w_eye*0.35 + realF(map(noise(i*0.5+222+i*55+index*99), 0, 1, -3, 3));
      } else {
        x = cos(map(i, node_face_l.length/2, node_face_l.length-1, HALF_PI, PI)) * (w_eye*0.7 + sin(map(i, node_face_l.length/2, node_face_l.length-1, 0, PI))*realF(5));
        y = sin(map(i, node_face_l.length/2, node_face_l.length-1, HALF_PI, PI)) * (w_eye*0.4 + sin(map(i, node_face_l.length/2, node_face_l.length-1, 0, PI))*realF(5));
        x += center_eye_l.x + w_eye*0.05 + realF(map(noise(i*0.5+112+i*23+index*99), 0, 1, -3, 3));
        y += center_eye_l.y + w_eye*0.35 + realF(map(noise(i*0.5+222+i*55+index*99), 0, 1, -3, 3));
      }
      node_face_l[i] = createVector(x, y);
    }

    for (let i=0; i<node_face_r.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_r.length/2) {
        x = cos(map(i, 0, node_face_r.length/2-1, HALF_PI, 0)) * w_eye*0.7;
        y = sin(map(i, 0, node_face_r.length/2-1, HALF_PI, 0)) * w_eye*0.4;
        x += center_eye_r.x - w_eye*0.05 + realF(map(noise(i*0.5+112+i*23+index*99), 0, 1, -3, 3));
        y += center_eye_r.y + w_eye*0.35 + realF(map(noise(i*0.5+222+i*55+index*99), 0, 1, -3, 3));
      } else {
        x = cos(map(i, node_face_r.length/2, node_face_r.length-1, 0, HALF_PI)) * (w_eye*0.7 + sin(map(i, node_face_r.length/2, node_face_r.length-1, 0, PI))*realF(5));
        y = sin(map(i, node_face_r.length/2, node_face_r.length-1, 0, HALF_PI)) * (w_eye*0.4 + sin(map(i, node_face_r.length/2, node_face_r.length-1, 0, PI))*realF(5));
        x += center_eye_r.x - w_eye*0.05 + realF(map(noise(i*0.5+112+i*23+index*99), 0, 1, -3, 3));
        y += center_eye_r.y + w_eye*0.35 + realF(map(noise(i*0.5+222+i*55+index*99), 0, 1, -3, 3));
      }
      node_face_r[i] = createVector(x, y);
    }
  } else if (state_cheek[index] == 4) {
    node_face_l = new Array(node_eyebrow_l[0].length * 2);
    node_face_r = new Array(node_eyebrow_r[0].length * 2);
    for (let i=0; i<node_face_l.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_l.length/2) {
        x = center_eye_l.x - w_eye/2.0 + i*realF(4);
        y = center_eye_l.y +  w_eye*0.55 + sin(map(i, 0, node_face_l.length/2-1, 0, PI))*realF(4) + realF(map(noise(i*0.25+111+index*99), 0, 1, -1, 1));
      } else {
        x = center_eye_l.x - w_eye/2.0 + (node_face_l.length-1-i)*realF(4);
        y = center_eye_l.y + w_eye*0.55 + realF(7) + realF(map(noise(i*0.5+111+index*99), 0, 1, -1, 1));
      }
      node_face_l[i] = createVector(x, y);
    }

    for (let i=0; i<node_face_r.length; i++) {
      let x=0.0, y=0.0;
      if (i < node_face_r.length/2) {
        x = center_eye_r.x + w_eye/2.0 - i*realF(4);
        y = center_eye_r.y +  w_eye*0.55 + sin(map(i, 0, node_face_r.length/2-1, 0, PI))*realF(4) + realF(map(noise(i*0.25+222+index*99), 0, 1, -1, 1));
      } else {
        x = center_eye_r.x + w_eye/2.0 - (node_face_r.length-1-i)*realF(4);
        y = center_eye_r.y + w_eye*0.55 + realF(7) + realF(map(noise(i*0.5+345+index*99), 0, 1, -1, 1));
      }
      node_face_r[i] = createVector(x, y);
    }
  } else if (state_cheek[index] == 5) {
    node_face_l = Array.from(Array(floor(random(4, 7))), () => new Array(3));
    node_face_r = Array.from(Array(floor(random(4, 7))), () => new Array(3));
    for (let i=0; i<node_face_l.length; i++) {
      let x=0.0, y=0.0;
      x = center_eye_l.x + random(-w_eye*0.65, w_eye*0.05);
      y = center_eye_l.y + random(w_eye*0.4, w_eye*0.8);
      for (let j=0; j<node_face_l[i].length; j++) {
        let x_j = cos(map(j, 0, node_face_l[i].length-1, PI*pow(-1, i), 0))*realF(2) + realF(random(-1, 1));
        let y_j = sin(map(j, 0, node_face_l[i].length-1, PI*pow(-1, i), 0))*realF(2) + realF(random(-1, 1));
        node_face_l[i][j] = createVector(x+x_j, y+y_j);
      }
    }
    for (let i=0; i<node_face_r.length; i++) {
      let x=0.0, y=0.0;
      x = center_eye_r.x - random(-w_eye*0.65, w_eye*0.05);
      y = center_eye_r.y + random(w_eye*0.4, w_eye*0.8);
      for (let j=0; j<node_face_r[i].length; j++) {
        let x_j = cos(map(j, 0, node_face_r[i].length-1, PI*pow(-1, i), 0))*realF(2) + realF(random(-1, 1));
        let y_j = sin(map(j, 0, node_face_r[i].length-1, PI*pow(-1, i), 0))*realF(2) + realF(random(-1, 1));
        node_face_r[i][j] = createVector(x+x_j, y+y_j);
      }
    }
  }






  F[index].noStroke();
  F[index].fill(c_text2);
  if (state_cheek[index] == 2  ||  state_cheek[index] == 5) {
    for (let i=0; i<node_face_l.length; i++) {
      F[index].beginShape();
      for (let j=0; j<node_face_l[i].length; j++) {
        F[index].vertex(node_face_l[i][j].x, node_face_l[i][j].y);
      }
      F[index].endShape(CLOSE);
    }
    for (let i=0; i<node_face_r.length; i++) {
      F[index].beginShape();
      for (let j=0; j<node_face_r[i].length; j++) {
        F[index].vertex(node_face_r[i][j].x, node_face_r[i][j].y);
      }
      F[index].endShape(CLOSE);
    }
  } else {
    F[index].beginShape();
    for (let i=0; i<node_face_l.length; i++) {
      F[index].vertex(node_face_l[i].x, node_face_l[i].y);
    }
    F[index].endShape(CLOSE);
    F[index].beginShape();
    for (let i=0; i<node_face_r.length; i++) {
      F[index].vertex(node_face_r[i].x, node_face_r[i].y);
    }
    F[index].endShape(CLOSE);
  }











  F[index].fill(c_text);
  F[index].stroke(c_text);
  F[index].strokeWeight(realF(1));
  //F[index].noStroke();
  for (let i=0; i<node_eye.length; i++) {
    F[index].beginShape();
    for (let j=0; j<node_eye[i].length; j++) {  
      F[index].vertex(node_eye[i][j].x, node_eye[i][j].y);
    }
    F[index].endShape(CLOSE);
  }
















  let node_text = new Array(floor(random(3, 6)));
  for (let i=0; i<node_text.length; i++) {
    let num_j = floor(random(1, 5));
    let gap_y = realF(5);
    if (num_j >= 3) {
      num_j = floor(random(3, 6));
      if (H_car < real(36)) {
        gap_y = abs((F[index].height-H_car*scaleRate+realF(5)) - (F[index].height-realF(5)))  /  4;
      }
    } else {
      if (H_car < real(42)) {
        num_j = 1;
      }
    }
    node_text[i] = new Array(num_j);
    for (let j=0; j<node_text[i].length; j++) {
      let num_k = floor(random(3, 9));
      if (num_j < 3) {
        num_k = floor(random(3, 6));
      } else if (num_j == 3) {
        num_k = 5;
      }
      node_text[i][j] = new Array(num_k);
    }

    for (let j=0; j<node_text[i].length; j++) {
      for (let k=0; k<node_text[i][j].length; k++) {
        let x = map(i, 0, node_text.length-1, F[index].width*0.1, F[index].width*0.9-realF(25)) + k*realF(3) + realF(random(-2.5, 2.5));
        let y = (F[index].height-H_car*scaleRate+realF(10)) + j*gap_y +realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -3, 3));
        if (H_car < real(36)) {
          y = (F[index].height-H_car*scaleRate+realF(5)) + j*gap_y + realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -1, 1));
        } else if (H_car > real(50)) {
          y = (F[index].height-H_car*scaleRate+realF(13)) + j*realF(8) + realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -3, 3));
        }
        if (num_j==3  &&  j==2) {
          y = (F[index].height-realF(10)) + realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -3, 3));
          if (H_car < real(36)) {
            y = (F[index].height-realF(5)) + realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -3, 3));
          } else if (H_car > real(50)) {
            y = (F[index].height-realF(15)) + realF(map(noise(k*0.5+j*99+i*44+index*66), 0, 1, -3, 3));
          }
        }
        node_text[i][j][k] = createVector(x, y);
      }
    }
  }


  F[index].noFill();
  F[index].stroke(c_text2);
  F[index].strokeWeight(realF(1.25));
  F[index].beginShape(LINES);
  for (let i=0; i<node_text.length; i++) {
    for (let j=0; j<node_text[i].length; j++) {
      //if (node_text[i][j][0].y <= F[index].height-realF(5)) {
      for (let k=0; k<node_text[i][j].length-1; k++) {
        F[index].vertex(node_text[i][j][k].x, node_text[i][j][k].y);
        F[index].vertex(node_text[i][j][k+1].x, node_text[i][j][k+1].y);
      }
      if (node_text[i].length == 3) {
        F[index].vertex(node_text[i][1][0].x, node_text[i][1][0].y);
        F[index].vertex(node_text[i][2][0].x, node_text[i][2][0].y);
        F[index].vertex(node_text[i][1][node_text[i][1].length-1].x, node_text[i][1][node_text[i][1].length-1].y);
        F[index].vertex(node_text[i][2][node_text[i][2].length-1].x, node_text[i][2][node_text[i][2].length-1].y);
        F[index].vertex(node_text[i][1][0].x, node_text[i][1][0].y);
        F[index].vertex(node_text[i][2][node_text[i][2].length-1].x, node_text[i][2][node_text[i][2].length-1].y);
        F[index].vertex(node_text[i][2][0].x, node_text[i][2][0].y);
        F[index].vertex(node_text[i][1][node_text[i][1].length-1].x, node_text[i][1][node_text[i][1].length-1].y);
      }
      //}
    }
  }
  F[index].endShape();






  let node_text2 = new Array(node_text.length);
  for (let i=0; i<node_text2.length; i++) {
    node_text2[i] = new Array(2*8);
    for (let j=0; j<node_text2[i].length; j++) {
      let x=0.0, y=0.0;
      if (j < node_text2[i].length/2) {
        x = node_text[i][node_text[i].length-1][0].x + j*realF(2) + realF(random(-3, 3));
        y = node_text[i][node_text[i].length-1][0].y + realF(5) + map(noise(j*0.5+i*55), 0, 1, -4, 12);
      } else {
        x = node_text[i][node_text[i].length-1][0].x + (node_text2[i].length-1-j)*realF(2) + realF(random(-3, 3));
        y = F[index].height-realF(10)  + map(noise(j*0.5+i*55), 0, 1, -12, 4);
      }
      node_text2[i][j] = createVector(x, y);
    }
  }

  F[index].fill(c_text2);
  F[index].stroke(c_text2);
  F[index].strokeWeight(1);
  //for (let i=0; i<node_text2.length; i++) {
  //  if (node_text[i].length < 3) {
  //    F[index].beginShape();
  //    for (let j=0; j<node_text2[i].length; j++) {
  //      F[index].vertex(node_text2[i][j].x, node_text2[i][j].y);
  //    }
  //  }
  //  F[index].endShape(CLOSE);
  //}




  let node_number = [
    [[18.487, 12.995], [86.632, 2.684], [83.013, 19.407], [83.088, 8.698], [62.283, 85.568], [84.428, 85.609], [77.12, 84.367], [18.908, 80.226], [15.677, 97.336], [18.063, 90.916], [16.553, 11.452], [37.731, 10.431]], 
    [[24.919, 3.899], [66.693, 13.095], [61.073, 87.343], [44.903, 22.285], [37.1, 97.336], [67.352, 97.336]], 
    [[17.278, 3.527], [72.862, 8.77], [89.336, 37.231], [74.026, 20.379], [87.657, 35.383], [4.145, 97.336], [8.404, 93.561], [32.677, 72.043], [97.638, 97.336]], 
    [[14.989, 2.004], [85.091, 7.132], [73.525, 21.669], [33.851, 41.544], [65.335, 39.878], [96.331, 72.06], [96.331, 72.06], [3.967, 80.902], [46.481, 97.336]], 
    [[24.95, 6.426], [5.276, 61.031], [29.425, 61.031], [17.35, 44.575], [20.835, 59.783], [96.593, 50.01], [64.24, 2.684], [45.782, 97.336], [70.372, 92.036]], 
    [[8.925, 4.849], [97.623, 2.976], [16.907, 29.734], [17.688, 26.835], [43.75, 11.837], [85.747, 61.865], [64.418, 45.988], [82.95, 59.783], [27.343, 97.336]], 
    [[74.899, 4.094], [3.955, 73.248], [34.34, 85.854], [22.848, 59.363], [81.014, 49.984], [95.212, 70.006], [11.568, 75.652], [55.37, 97.336], [95.212, 80.761]], 
    [[5.382, 5.513], [4.596, 26.942], [95.256, 7.377], [64.224, 11.286], [90.896, 7.926], [27.845, 95.675]], 
    [[68.95, 2.566], [29.892, 19.146], [48.168, 47.525], [66.053, 4.678], [93.471, 32.539], [45.271, 49.637], [63.13, 41.59], [5.905, 59.469], [45.328, 97.725], [61.9, 38.845], [94.889, 74.445], [45.339, 95.058]], 
    [[27.649, 4.745], [11.639, 27.158], [82.834, 13.617], [8.891, 33.952], [47.509, 48.351], [72.824, 32.529], [69.059, 6.106], [94.283, 9.593], [43.835, 95.058]]
  ];
  F[index].fill(c_text2);
  F[index].stroke(c_text2);
  F[index].strokeWeight(realF(1));
  F[index].beginShape(TRIANGLES);
  for (let i=0; i<node_text.length; i++) {
    if (node_text[i].length < 3) {
      let index_number = floor(random(0, node_number.length));

      let n_n = Array.from(Array(node_number[index_number].length), () => new Array(2));
      for (j=0; j<node_number[index_number].length; j++) {
        n_n[j][0] = node_number[index_number][j][0];
        n_n[j][1] = node_number[index_number][j][1];
        n_n[j][0] += random(-5, 5);
        n_n[j][1] += random(-5, 5);
      }

      for (j=0; j<node_number[index_number].length; j++) {
        n_n[j][0] *= realF(15)/100.0;
        if (H_car < real(36)) {
          n_n[j][1] *= abs((node_text[i][node_text[i].length-1][0].y + realF(4)) - (F[index].height-realF(5)))  /  100.0;
          n_n[j][1] += node_text[i][node_text[i].length-1][0].y + realF(4);
        } else if (H_car > real(50)) {
          n_n[j][1] *= abs((node_text[i][node_text[i].length-1][0].y + realF(10)) - (F[index].height-realF(15)))  /  100.0;
          n_n[j][1] += node_text[i][node_text[i].length-1][0].y + realF(10);
        } else {
          n_n[j][1] *= abs((node_text[i][node_text[i].length-1][0].y + realF(6)) - (F[index].height-realF(10)))  /  100.0;
          n_n[j][1] += node_text[i][node_text[i].length-1][0].y + realF(6);
        }
        n_n[j][0] += node_text[i][node_text[i].length-1][0].x;
      }

      for (j=0; j<node_number[index_number].length-2; j+=3) {
        F[index].vertex(n_n[j][0], n_n[j][1]);
        F[index].vertex(n_n[j+1][0], n_n[j+1][1]);
        F[index].vertex(n_n[j+2][0], n_n[j+2][1]);
      }
    }
  }
  F[index].endShape();









  F[index].fill(c_text);
  F[index].noStroke();
  let w_barcode = (F[index].width/2.0 - (center_eye_r.y + w_eye/2.0) - 10) * 0.3;
  w_barcode = constrain(w_barcode, realF(5), realF(15));
  let y = F[index].height*0.15;
  for (let i=0; i<100; i++) {
    let h = random(0.25, 2);
    if (random(1) < 0.2) {
      h = random(2, 7);
    }
    F[index].rect(F[index].width-realF(10), y, -w_barcode, h);
    y += h;
    y += random(0.5, 5);
    if (y > F[index].height-H_car*scaleRate-20) {
      break;
    }
  }
}



function realF(x) {
  if (WH_all[state_WH][0] < 170) {
    let scale = WH_all[state_WH][0] / 170;
    x = scale * x;
  }
  return x;
}
