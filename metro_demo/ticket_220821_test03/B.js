function drawB(index) {
  B[index].background(c_text);



  if (state_texture == 1) {
    B[index].noFill();
    B[index].stroke(changeBrightness(c_text, 10));
    B[index].strokeWeight(0.75);

    B[index].beginShape(LINES);
    for (let i=0; i<50; i++) {
      let x = map(i, 0, 50, 0, B[index].width+50);
      let y = B[index].height-H_car*scaleRate;
      let x_ = map(i, 0, 50, -50, B[index].width);
      let y_ = B[index].height;
      B[index].vertex(x, y);
      B[index].vertex(x_, y_);
    }
    B[index].endShape();
  } else if (state_texture == 2) {
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);

    B[index].beginShape(LINES);
    for (let i=0; i<100; i++) {
      let x = random(0, B[index].width);
      let y = random(B[index].height-H_car*scaleRate, B[index].height);
      B[index].vertex(x-2, y);
      B[index].vertex(x+2, y);
      B[index].vertex(x, y-2);
      B[index].vertex(x, y+2);
    }
    B[index].endShape();
  } else if (state_texture == 3) {
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(1.5);
    B[index].beginShape(POINTS);
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    for (let i=0; i<num_hor; i++) {
      for (let j=0; j<num_ver; j++) {
        B[index].vertex(map(i, 0, num_hor, 0, B[index].width), map(j, -1, num_ver, B[index].height-H_car*scaleRate, B[index].height)+map(noise(i*0.5+j*num_hor), 0, 1, -3, 3));
      }
    }
    B[index].endShape();
  } else if (state_texture == 4) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, B[index].width), map(i, 0, num_ver-1, B[index].height-H_car*scaleRate, B[index].height));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-2; j+=2) {
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        B[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
      }
    }
    B[index].endShape();
  } else if (state_texture == 5) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, B[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-2, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);        
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
      }
    }
    B[index].endShape();
  } else if (state_texture == 6) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-1, 0, B[index].width)+map(noise((j*0.05+i*num_hor*0.05)), 0, 1, -10, 10), map(i, 0, num_ver-1, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.05+999), 0, 1, -2, 2));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor; j++) {
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
      }
    }
    B[index].endShape();
  } else if (state_texture == 7) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, B[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -1, 1), map(i, 0, num_ver-2, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
      }
    }
    B[index].endShape();
  } else if (state_texture == 8) {
    let gap = 12;
    let num_hor = ceil(B[index].width/gap)+2;
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
            n[i][j][k].add(j*gap, B[index].height-H_car*scaleRate + i*(gap/2.0));
          } else {
            n[i][j][k].add(j*gap-gap/2.0, B[index].height-H_car*scaleRate + i*(gap/2.0));
          }
        }
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        for (let k=0; k<num_detail-1; k++) {
          B[index].vertex(n[i][j][k].x, n[i][j][k].y);
          B[index].vertex(n[i][j][k+1].x, n[i][j][k+1].y);
        }
        if (j < num_hor-1) {
          B[index].vertex(n[i][j][num_detail-1].x, n[i][j][num_detail-1].y);
          B[index].vertex(n[i][j+1][0].x, n[i][j+1][0].y);
        }
      }
    }
    B[index].endShape();
  } else if (state_texture == 9) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-5, 0, B[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-1, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
        if (i%2 != 0) {
          n[i*num_hor+j].x += gap*2;
        }
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.75);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-5; j+=5) {
        if (i%2 == 0) {
          B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          B[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
          B[index].vertex(n[i*num_hor+j+3].x, n[i*num_hor+j+3].y);
          B[index].vertex(n[i*num_hor+j+4].x, n[i*num_hor+j+4].y);
        } else {
          B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
          B[index].vertex(n[i*num_hor+j+2].x, n[i*num_hor+j+2].y);
          B[index].vertex(n[i*num_hor+j+4].x, n[i*num_hor+j+4].y);
        }
      }
    }
    B[index].endShape();
  } else if (state_texture == 10) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, B[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -1, 1), map(i, 0, num_ver-2, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-1; i++) {
      for (let j=0; j<num_hor-1; j+=2) {
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
        B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
        B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
      }
    }
    B[index].endShape();
  } else if (state_texture == 11) {
    let gap = 5;
    let num_hor = ceil(B[index].width/gap);
    let num_ver = ceil((H_car*scaleRate) / gap);
    let n = new Array(num_hor * num_ver);
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        n[i*num_hor+j] = createVector(map(j, 0, num_hor-2, 0, B[index].width)+map(noise((j+i*num_hor)*0.5), 0, 1, -2, 2), map(i, 0, num_ver-2, B[index].height-H_car*scaleRate, B[index].height)+map(noise((j+i*num_hor)*0.5+999), 0, 1, -2, 2));
      }
    }
    B[index].noFill();
    B[index].stroke(lerpColor(c_ticket, c_text, 0.7));
    B[index].strokeWeight(0.5);
    B[index].beginShape(LINES);
    for (let i=0; i<num_ver-2; i+=2) {
      for (let j=0; j<num_hor-1; j+=2) {
        if (j%4<2) {
          B[index].vertex(n[i*num_hor+j].x, n[i*num_hor+j].y);
          B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          B[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
          B[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
          B[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
        } else {
          B[index].vertex(n[i*num_hor+j+1].x, n[i*num_hor+j+1].y);
          B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          B[index].vertex(n[(i+1)*num_hor+j+1].x, n[(i+1)*num_hor+j+1].y);
          B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          B[index].vertex(n[(i+1)*num_hor+j].x, n[(i+1)*num_hor+j].y);
          B[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
          B[index].vertex(n[(i+2)*num_hor+j].x, n[(i+2)*num_hor+j].y);
          B[index].vertex(n[(i+2)*num_hor+j+1].x, n[(i+2)*num_hor+j+1].y);
        }
      }
    }
    B[index].endShape();
  }





  B[index].noStroke();
  B[index].fill(c_ticket);
  B[index].rect(0, 0, B[index].width, B[index].height-H_car*scaleRate);




  if (state_pattern == 1) {


    B[index].noStroke();
    B[index].fill(lerpColor(c_ticket, c_text, 0.15));
    B[index].beginShape(TRIANGLES);

    let w = realB(35);
    let num_pattern_ver = ceil((B[index].height-H_car*scaleRate)/w);
    w = (B[index].height-H_car*scaleRate) / num_pattern_ver;
    let num_pattern_hor = ceil(B[index].width/w);


    let scale = w / 100.0;
    let angle = -HALF_PI/4;


    let sum = 1 + rate_pattern_Tez + rate_pattern_Btc + rate_pattern_like + rate_pattern_metro + rate_pattern_dino + rate_pattern_CNR + rate_pattern_Mc + rate_pattern_aka + rate_pattern_fileBroken + rate_pattern_fx;
    const real_rate_empty = 1.0 / sum;
    const real_rate_pattern_Tez = rate_pattern_Tez / sum;
    const real_rate_pattern_Btc = rate_pattern_Btc / sum;
    const real_rate_pattern_like = rate_pattern_like / sum;
    const real_rate_pattern_metro = rate_pattern_metro / sum;
    const real_rate_pattern_dino = rate_pattern_dino / sum;
    const real_rate_pattern_CNR = rate_pattern_CNR / sum;
    const real_rate_pattern_Mc = rate_pattern_Mc / sum;
    const real_rate_pattern_aka = rate_pattern_aka / sum;
    const real_rate_pattern_fileBroken = rate_pattern_fileBroken / sum;
    const real_rate_pattern_fx = rate_pattern_fx / sum;

    for (let i=0; i<num_pattern_ver; i++) {
      for (let k=0; k<num_pattern_hor; k++) {
        let x = map(k, 0, num_pattern_hor-1, -w/2, B[index].width-w);
        let y = map(i, 0, num_pattern_ver-1, 0, (B[index].height-H_car*scaleRate)-w);

        if (i != num_pattern_ver-1  ||  (x+w < (B[index].width-realF(100))/2.0  ||  x > (B[index].width-realF(100))/2.0+realF(100))) {
          const rate = random(1);

          if (rate < real_rate_empty) {
          } else if (rate < real_rate_empty + real_rate_pattern_Tez) {
            count_pattern_Tez += 1;
            let index_TRIANGLES_Tez = [
              [0, 1, 7], [1, 2, 7], [2, 5, 6], [2, 6, 7], [3, 4, 5], 
              [8, 9, 25], [9, 24, 25], [9, 23, 24], [10, 11, 23], [11, 21, 22], [11, 20, 21], [11, 12, 20], [12, 13, 14], [12, 19, 20], [14, 15, 19], [15, 17, 18], [15, 16, 17]
            ];
            let n_Tez = new Array(node_Tez.length);
            for (let j=0; j<n_Tez.length; j++) {
              n_Tez[j] = node_Tez[j].copy().mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Tez.length; j++) {
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][0]].x, n_Tez[index_TRIANGLES_Tez[j][0]].y);
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][1]].x, n_Tez[index_TRIANGLES_Tez[j][1]].y);
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][2]].x, n_Tez[index_TRIANGLES_Tez[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc) {
            count_pattern_Btc += 1;
            let index_TRIANGLES_Btc = [[0, 1, 25], [0, 25, 26], [1, 2, 3], [3, 25, 36], [4, 5, 27], [5, 6, 7], [7, 27, 28], [8, 9, 11], [9, 10, 11], [8, 28, 29], [11, 29, 30], [11, 30, 34], [11, 12, 13], [13, 14, 34], [14, 15, 16], [16, 17, 37], [17, 22, 23], [18, 19, 20], [18, 20, 21], [23, 35, 37], [24, 25, 36], [31, 32, 33], [30, 31, 34]];
            let n_Btc = new Array(node_Btc.length);
            for (let j=0; j<n_Btc.length; j++) {
              n_Btc[j] = node_Btc[j].copy().mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Btc.length; j++) {
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][0]].x, n_Btc[index_TRIANGLES_Btc[j][0]].y);
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][1]].x, n_Btc[index_TRIANGLES_Btc[j][1]].y);
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][2]].x, n_Btc[index_TRIANGLES_Btc[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like) {
            count_pattern_like += 1;
            let index_TRIANGLES_like = [[0, 1, 8], [1, 8, 9], [1, 2, 9], [2, 9, 10], [2, 3, 10], [3, 10, 11], [3, 4, 11], [4, 11, 12], [4, 5, 12], [5, 12, 13], [5, 6, 13], [6, 13, 14], [6, 7, 14], [7, 14, 15], [7, 0, 15], [0, 8, 15]];
            let n_like = new Array(node_like.length);
            for (let j=0; j<n_like.length; j++) {
              n_like[j] = node_like[j].copy().mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_like.length; j++) {
              B[index].vertex(n_like[index_TRIANGLES_like[j][0]].x, n_like[index_TRIANGLES_like[j][0]].y);
              B[index].vertex(n_like[index_TRIANGLES_like[j][1]].x, n_like[index_TRIANGLES_like[j][1]].y);
              B[index].vertex(n_like[index_TRIANGLES_like[j][2]].x, n_like[index_TRIANGLES_like[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro) {
            count_pattern_metro += 1;
            let index_TRIANGLES_metro = [
              [0, 12, 13], [0, 12, 7], [1, 2, 5], [1, 6, 5], [2, 3, 5], [3, 4, 5], [7, 8, 9], [9, 10, 11], [7, 11, 12], 
              [14, 15, 27], [15, 16, 25], [16, 18, 25], [16, 17, 18], [25, 26, 27], [20, 21, 23], [21, 22, 23], [19, 20, 23], [19, 23, 24]
            ];
            let n_metro = new Array(node_metro.length);
            for (let j=0; j<n_metro.length; j++) {
              n_metro[j] = node_metro[j].copy();
              n_metro[j].add(-50, -50);
              n_metro[j].mult(1.25);
              n_metro[j].add(50, 50);
              n_metro[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_metro.length; j++) {
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][0]].x, n_metro[index_TRIANGLES_metro[j][0]].y);
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][1]].x, n_metro[index_TRIANGLES_metro[j][1]].y);
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][2]].x, n_metro[index_TRIANGLES_metro[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino) {
            count_pattern_dino += 1;
            let index_TRIANGLES_dino = [[0, 1, 30], [1, 31, 32], [1, 2, 4], [2, 3, 4], [4, 32, 33], [4, 33, 34], [4, 30, 34], [4, 8, 30], [5, 6, 7], [5, 7, 8], [8, 9, 30], [9, 10, 11], [12, 13, 30], [13, 14, 15], [13, 15, 20], [13, 20, 28], [13, 29, 30], [15, 16, 20], [17, 18, 19], [20, 21, 26], [20, 26, 27], [21, 24, 25], [22, 23, 24], [30, 31, 34]];
            let n_dino = new Array(node_dino.length);
            for (let j=0; j<n_dino.length; j++) {
              n_dino[j] = node_dino[j].copy();
              n_dino[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_dino.length; j++) {
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][0]].x, n_dino[index_TRIANGLES_dino[j][0]].y);
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][1]].x, n_dino[index_TRIANGLES_dino[j][1]].y);
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][2]].x, n_dino[index_TRIANGLES_dino[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR) {
            count_pattern_CNR += 1;
            let index_TRIANGLES_CNR = [
              [0, 1, 2], [0, 3, 19], [3, 16, 17], [4, 15, 16], [5, 14, 15], [6, 10, 14], [7, 8, 10], [8, 9, 10], [10, 11, 12], [10, 12, 13], [17, 18, 19], 
              [20, 21, 33], [20, 33, 32], [21, 22, 34], [21, 34, 33], [22, 28, 35], [22, 35, 34], [28, 29, 36], [28, 36, 35], [29, 30, 37], [29, 37, 36], [30, 31, 38], [30, 38, 37], [25, 31, 38], [25, 38, 39], [20, 25, 39], [20, 39, 32], [23, 24, 26], [23, 26, 27]
            ];
            let n_CNR = new Array(node_CNR.length);
            for (let j=0; j<n_CNR.length; j++) {
              n_CNR[j] = node_CNR[j].copy();
              n_CNR[j].add(-50, -50);
              n_CNR[j].mult(0.8);
              n_CNR[j].add(50, 50);
              n_CNR[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_CNR.length; j++) {
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][0]].x, n_CNR[index_TRIANGLES_CNR[j][0]].y);
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][1]].x, n_CNR[index_TRIANGLES_CNR[j][1]].y);
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][2]].x, n_CNR[index_TRIANGLES_CNR[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc) {
            count_pattern_Mc += 1;
            let index_TRIANGLES_Mc = [[0, 1, 35], [1, 2, 35], [2, 3, 34], [3, 32, 33], [3, 32, 31], [3, 4, 30], [4, 5, 29], [5, 29, 28], [5, 6, 28], [6, 7, 27], [7, 25, 26], [7, 25, 24], [7, 8, 23], [8, 9, 22], [9, 22, 21], [9, 10, 21], [10, 11, 20], [11, 18, 19], [11, 18, 17], [11, 12, 16], [12, 13, 15], [13, 14, 15]];
            let n_Mc = new Array(node_Mc.length);
            for (let j=0; j<n_Mc.length; j++) {
              n_Mc[j] = node_Mc[j].copy();
              n_Mc[j].add(-50, -50);
              n_Mc[j].mult(0.9);
              n_Mc[j].add(50, 50);
              n_Mc[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Mc.length; j++) {
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][0]].x, n_Mc[index_TRIANGLES_Mc[j][0]].y);
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][1]].x, n_Mc[index_TRIANGLES_Mc[j][1]].y);
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][2]].x, n_Mc[index_TRIANGLES_Mc[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka) {
            count_pattern_aka += 1;
            let index_TRIANGLES_aka = [[0, 1, 6], [1, 5, 6], [1, 2, 5], [2, 4, 5], [2, 3, 4]];
            let n_aka = new Array(node_aka.length);
            for (let j=0; j<n_aka.length; j++) {
              n_aka[j] = node_aka[j].copy();
              n_aka[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_aka.length; j++) {
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][0]].x, n_aka[index_TRIANGLES_aka[j][0]].y);
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][1]].x, n_aka[index_TRIANGLES_aka[j][1]].y);
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][2]].x, n_aka[index_TRIANGLES_aka[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka + real_rate_pattern_fileBroken) {
            count_pattern_fileBroken += 1;
            let index_TRIANGLES_fileBroken = [
              [0, 1, 5], [1, 5, 6], [1, 6, 15], [1, 2, 15], [2, 15, 16], [2, 8, 16], [2, 3, 8], [3, 8, 9], [3, 4, 9], [4, 9, 10], [0, 4, 10], [0, 5, 10], [6, 7, 15], [7, 15, 17], [7, 8, 17], [8, 16, 17], 
              [11, 12, 14], [12, 13, 14], [18, 19, 25], [19, 20, 22], [19, 22, 23], [20, 21, 22], [23, 24, 25]
            ];
            let n_fileBroken = new Array(node_fileBroken.length);
            for (let j=0; j<n_fileBroken.length; j++) {
              n_fileBroken[j] = node_fileBroken[j].copy();
              n_fileBroken[j].add(-50, -50);
              n_fileBroken[j].mult(1.5);
              n_fileBroken[j].add(50, 50);
              n_fileBroken[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_fileBroken.length; j++) {
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][0]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][0]].y);
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][1]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][1]].y);
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][2]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka + real_rate_pattern_fileBroken + real_rate_pattern_fx) {
            count_pattern_fx += 1;
            let index_TRIANGLES_fx = [
              [0, 1, 16], [1, 15, 16], [2, 11, 15], [2, 8, 9], [2, 8, 7], [2, 3, 5], [3, 4, 5], [5, 6, 7], [9, 10, 11], [12, 13, 14], [12, 14, 15], 
              [17, 22, 28], [17, 18, 19], [19, 20, 21], [19, 21, 22], [22, 27, 28], [22, 23, 25], [23, 24, 25], [25, 26, 27]
            ];
            let n_fx = new Array(node_fx.length);
            for (let j=0; j<n_fx.length; j++) {
              n_fx[j] = node_fx[j].copy();
              n_fx[j].mult(scale).rotate(angle).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_fx.length; j++) {
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][0]].x, n_fx[index_TRIANGLES_fx[j][0]].y);
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][1]].x, n_fx[index_TRIANGLES_fx[j][1]].y);
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][2]].x, n_fx[index_TRIANGLES_fx[j][2]].y);
            }
          }
        }
      }
    }
    B[index].endShape();
  }








  if (state_dotted == 0  ||  state_dotted == 1) {
    let num_line = 10;
    if (state_dotted == 0) {
      num_line = 12;
    } else if (state_dotted == 1) {
      num_line = 40;
    }
    B[index].noFill();
    B[index].strokeWeight(2);
    B[index].stroke(c_text);
    B[index].strokeCap(SQUARE);
    B[index].beginShape(LINES);
    for (let i=0; i<num_line; i+=2) {
      let x = map(i, 0, num_line-1, 0, B[index].width);
      let x_ = map(i+1, 0, num_line-1, 0, B[index].width);
      B[index].vertex(x, B[index].height-H_car*scaleRate);
      B[index].vertex(x_, B[index].height-H_car*scaleRate);
    }
    B[index].endShape();
  } else if (state_dotted == 2) {
    B[index].noFill();
    B[index].strokeWeight(realF(2.5));
    B[index].stroke(c_text);
    B[index].beginShape(POINTS);
    for (let i=0; i<40; i++) {
      let x = map(i, 0, 40-1, 0, B[index].width);
      B[index].vertex(x, B[index].height-H_car*scaleRate);
    }
    B[index].endShape();
  } else if (state_dotted == 3) {
    B[index].fill(c_text);
    B[index].noStroke();
    B[index].beginShape(TRIANGLES);
    let num = ceil(B[index].width / realF(3.5));
    for (let i=0; i<num; i++) {
      let x = map(i, 0, num-1, 0, B[index].width);
      B[index].vertex(x-realF(1.75), B[index].height-H_car*scaleRate);
      B[index].vertex(x+realF(1.75), B[index].height-H_car*scaleRate);
      B[index].vertex(x, B[index].height-H_car*scaleRate-realF(1.75));
    }
    B[index].endShape();
  } else if (state_dotted == 4) {
    B[index].fill(c_text);
    B[index].noStroke();
    B[index].beginShape(TRIANGLES);
    let num = ceil(B[index].width / realF(15));
    for (let i=0; i<num; i++) {
      let x = map(i, 0, num-1, 0, B[index].width);
      B[index].vertex(x-realF(7.5), B[index].height-H_car*scaleRate);
      B[index].vertex(x+realF(7.5), B[index].height-H_car*scaleRate);
      B[index].vertex(x, B[index].height-H_car*scaleRate-realF(1.25));
    }
    B[index].endShape();
  }




  B[index].strokeCap(ROUND);
  B[index].strokeJoin(ROUND);











  let index_TRIANGLES = [
    [0, 1, 7], [1, 7, 8], [1, 2, 8], [2, 3, 8], [4, 8, 9], [4, 9, 12], [9, 10, 11], [9, 11, 12], [4, 12, 13], [4, 5, 14], [5, 6, 14], [6, 7, 14], [6, 7, 0], 
    [15, 16, 17], [17, 18, 15], 
    [19, 20, 21], [21, 22, 19], [23, 24, 35], [24, 31, 32], [24, 25, 27], [25, 26, 27], [27, 33, 34], [27, 28, 29], [29, 30, 27], [30, 35, 23], 
    [36, 37, 39], [37, 38, 39], [39, 40, 41], [41, 51, 36], [42, 50, 51], [42, 43, 50], [43, 47, 49], [44, 45, 46], [46, 47, 44], [47, 48, 49], [49, 50, 43], [36, 41, 51], 
    [52, 53, 54], [54, 55, 56], [54, 56, 62], [57, 58, 60], [58, 59, 60], [60, 61, 62], [54, 62, 52], 
    [63, 64, 65], [65, 70, 63], [66, 67, 69], [67, 68, 69], 
    [71, 72, 77], [73, 74, 75], [73, 75, 76], [71, 77, 78], 
    [79, 80, 81], [81, 82, 83], [79, 83, 84], [84, 85, 86], [84, 93, 86], [87, 88, 94], [88, 89, 94], [89, 95, 96], [89, 90, 91], [79, 90, 92], 
    [97, 98, 99], [99, 100, 101], [97, 99, 101], [102, 103, 104], [102, 104, 105], 
    [106, 107, 116], [108, 109, 115], [109, 110, 114], [110, 113, 114], [110, 111, 113], [111, 112, 113], [106, 116, 117]
  ];


  let w_logo = realF(100);
  let scale_logo = w_logo / 100.0;
  let n_BT = new Array(node_BT.length);
  for (let i=0; i<node_BT.length; i++) {
    n_BT[i] = node_BT[i].copy().mult(scale_logo).add((B[index].width-w_logo)/2.0, B[index].height-H_car*scaleRate - 30*scale_logo);
  }


  B[index].noStroke();
  B[index].fill(c_text2);
  B[index].beginShape(TRIANGLES);
  for (let i=0; i<index_TRIANGLES.length; i++) {
    B[index].vertex(n_BT[index_TRIANGLES[i][0]].x, n_BT[index_TRIANGLES[i][0]].y);
    B[index].vertex(n_BT[index_TRIANGLES[i][1]].x, n_BT[index_TRIANGLES[i][1]].y);
    B[index].vertex(n_BT[index_TRIANGLES[i][2]].x, n_BT[index_TRIANGLES[i][2]].y);
  }
  B[index].endShape();
}





function realB(x) {
  if (WH_all[state_WH][0] < 170) {
    let scale = (170-(170-WH_all[state_WH][0])*0.5) / 170;
    x = scale * x;
  }
  return x;
}







function drawB_phone(index) {
  B[index].background(c_phone3);
  
  
  
  
  
  
  
  
  if (state_pattern == 1) {


    B[index].noStroke();
    B[index].fill(c_bkg);
    B[index].beginShape(TRIANGLES);

    let w = realB(35);
    let num_pattern_ver = 1;
    w = B[index].height*0.125;
    let num_pattern_hor = 1;


    let scale = w / 100.0;
    let angle = -HALF_PI/4;


    let sum = 0 + rate_pattern_Tez + rate_pattern_Btc + rate_pattern_like + rate_pattern_metro + rate_pattern_dino + rate_pattern_CNR + rate_pattern_Mc + rate_pattern_aka + rate_pattern_fileBroken + rate_pattern_fx;
    const real_rate_empty = 0.0 / sum;
    const real_rate_pattern_Tez = rate_pattern_Tez / sum;
    const real_rate_pattern_Btc = rate_pattern_Btc / sum;
    const real_rate_pattern_like = rate_pattern_like / sum;
    const real_rate_pattern_metro = rate_pattern_metro / sum;
    const real_rate_pattern_dino = rate_pattern_dino / sum;
    const real_rate_pattern_CNR = rate_pattern_CNR / sum;
    const real_rate_pattern_Mc = rate_pattern_Mc / sum;
    const real_rate_pattern_aka = rate_pattern_aka / sum;
    const real_rate_pattern_fileBroken = rate_pattern_fileBroken / sum;
    const real_rate_pattern_fx = rate_pattern_fx / sum;

    for (let i=0; i<num_pattern_ver; i++) {
      for (let k=0; k<num_pattern_hor; k++) {
        let x = (B[index].width-w) / 2.0;
        let y = (B[index].height*0.45) - w*0.5;

          const rate = random(0, min(sum, 1));

          if (rate < real_rate_empty) {
          } else if (rate < real_rate_empty + real_rate_pattern_Tez) {
            count_pattern_Tez += 1;
            let index_TRIANGLES_Tez = [
              [0, 1, 7], [1, 2, 7], [2, 5, 6], [2, 6, 7], [3, 4, 5], 
              [8, 9, 25], [9, 24, 25], [9, 23, 24], [10, 11, 23], [11, 21, 22], [11, 20, 21], [11, 12, 20], [12, 13, 14], [12, 19, 20], [14, 15, 19], [15, 17, 18], [15, 16, 17]
            ];
            let n_Tez = new Array(node_Tez.length);
            for (let j=0; j<n_Tez.length; j++) {
              n_Tez[j] = node_Tez[j].copy().mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Tez.length; j++) {
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][0]].x, n_Tez[index_TRIANGLES_Tez[j][0]].y);
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][1]].x, n_Tez[index_TRIANGLES_Tez[j][1]].y);
              B[index].vertex(n_Tez[index_TRIANGLES_Tez[j][2]].x, n_Tez[index_TRIANGLES_Tez[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc) {
            count_pattern_Btc += 1;
            let index_TRIANGLES_Btc = [[0, 1, 25], [0, 25, 26], [1, 2, 3], [3, 25, 36], [4, 5, 27], [5, 6, 7], [7, 27, 28], [8, 9, 11], [9, 10, 11], [8, 28, 29], [11, 29, 30], [11, 30, 34], [11, 12, 13], [13, 14, 34], [14, 15, 16], [16, 17, 37], [17, 22, 23], [18, 19, 20], [18, 20, 21], [23, 35, 37], [24, 25, 36], [31, 32, 33], [30, 31, 34]];
            let n_Btc = new Array(node_Btc.length);
            for (let j=0; j<n_Btc.length; j++) {
              n_Btc[j] = node_Btc[j].copy().mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Btc.length; j++) {
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][0]].x, n_Btc[index_TRIANGLES_Btc[j][0]].y);
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][1]].x, n_Btc[index_TRIANGLES_Btc[j][1]].y);
              B[index].vertex(n_Btc[index_TRIANGLES_Btc[j][2]].x, n_Btc[index_TRIANGLES_Btc[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like) {
            count_pattern_like += 1;
            let index_TRIANGLES_like = [[0, 1, 8], [1, 8, 9], [1, 2, 9], [2, 9, 10], [2, 3, 10], [3, 10, 11], [3, 4, 11], [4, 11, 12], [4, 5, 12], [5, 12, 13], [5, 6, 13], [6, 13, 14], [6, 7, 14], [7, 14, 15], [7, 0, 15], [0, 8, 15]];
            let n_like = new Array(node_like.length);
            for (let j=0; j<n_like.length; j++) {
              n_like[j] = node_like[j].copy().mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_like.length; j++) {
              B[index].vertex(n_like[index_TRIANGLES_like[j][0]].x, n_like[index_TRIANGLES_like[j][0]].y);
              B[index].vertex(n_like[index_TRIANGLES_like[j][1]].x, n_like[index_TRIANGLES_like[j][1]].y);
              B[index].vertex(n_like[index_TRIANGLES_like[j][2]].x, n_like[index_TRIANGLES_like[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro) {
            count_pattern_metro += 1;
            let index_TRIANGLES_metro = [
              [0, 12, 13], [0, 12, 7], [1, 2, 5], [1, 6, 5], [2, 3, 5], [3, 4, 5], [7, 8, 9], [9, 10, 11], [7, 11, 12], 
              [14, 15, 27], [15, 16, 25], [16, 18, 25], [16, 17, 18], [25, 26, 27], [20, 21, 23], [21, 22, 23], [19, 20, 23], [19, 23, 24]
            ];
            let n_metro = new Array(node_metro.length);
            for (let j=0; j<n_metro.length; j++) {
              n_metro[j] = node_metro[j].copy();
              n_metro[j].add(-50, -50);
              n_metro[j].mult(1.25);
              n_metro[j].add(50, 50);
              n_metro[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_metro.length; j++) {
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][0]].x, n_metro[index_TRIANGLES_metro[j][0]].y);
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][1]].x, n_metro[index_TRIANGLES_metro[j][1]].y);
              B[index].vertex(n_metro[index_TRIANGLES_metro[j][2]].x, n_metro[index_TRIANGLES_metro[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino) {
            count_pattern_dino += 1;
            let index_TRIANGLES_dino = [[0, 1, 30], [1, 31, 32], [1, 2, 4], [2, 3, 4], [4, 32, 33], [4, 33, 34], [4, 30, 34], [4, 8, 30], [5, 6, 7], [5, 7, 8], [8, 9, 30], [9, 10, 11], [12, 13, 30], [13, 14, 15], [13, 15, 20], [13, 20, 28], [13, 29, 30], [15, 16, 20], [17, 18, 19], [20, 21, 26], [20, 26, 27], [21, 24, 25], [22, 23, 24], [30, 31, 34]];
            let n_dino = new Array(node_dino.length);
            for (let j=0; j<n_dino.length; j++) {
              n_dino[j] = node_dino[j].copy();
              n_dino[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_dino.length; j++) {
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][0]].x, n_dino[index_TRIANGLES_dino[j][0]].y);
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][1]].x, n_dino[index_TRIANGLES_dino[j][1]].y);
              B[index].vertex(n_dino[index_TRIANGLES_dino[j][2]].x, n_dino[index_TRIANGLES_dino[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR) {
            count_pattern_CNR += 1;
            let index_TRIANGLES_CNR = [
              [0, 1, 2], [0, 3, 19], [3, 16, 17], [4, 15, 16], [5, 14, 15], [6, 10, 14], [7, 8, 10], [8, 9, 10], [10, 11, 12], [10, 12, 13], [17, 18, 19], 
              [20, 21, 33], [20, 33, 32], [21, 22, 34], [21, 34, 33], [22, 28, 35], [22, 35, 34], [28, 29, 36], [28, 36, 35], [29, 30, 37], [29, 37, 36], [30, 31, 38], [30, 38, 37], [25, 31, 38], [25, 38, 39], [20, 25, 39], [20, 39, 32], [23, 24, 26], [23, 26, 27]
            ];
            let n_CNR = new Array(node_CNR.length);
            for (let j=0; j<n_CNR.length; j++) {
              n_CNR[j] = node_CNR[j].copy();
              n_CNR[j].add(-50, -50);
              n_CNR[j].mult(0.8);
              n_CNR[j].add(50, 50);
              n_CNR[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_CNR.length; j++) {
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][0]].x, n_CNR[index_TRIANGLES_CNR[j][0]].y);
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][1]].x, n_CNR[index_TRIANGLES_CNR[j][1]].y);
              B[index].vertex(n_CNR[index_TRIANGLES_CNR[j][2]].x, n_CNR[index_TRIANGLES_CNR[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc) {
            count_pattern_Mc += 1;
            let index_TRIANGLES_Mc = [[0, 1, 35], [1, 2, 35], [2, 3, 34], [3, 32, 33], [3, 32, 31], [3, 4, 30], [4, 5, 29], [5, 29, 28], [5, 6, 28], [6, 7, 27], [7, 25, 26], [7, 25, 24], [7, 8, 23], [8, 9, 22], [9, 22, 21], [9, 10, 21], [10, 11, 20], [11, 18, 19], [11, 18, 17], [11, 12, 16], [12, 13, 15], [13, 14, 15]];
            let n_Mc = new Array(node_Mc.length);
            for (let j=0; j<n_Mc.length; j++) {
              n_Mc[j] = node_Mc[j].copy();
              n_Mc[j].add(-50, -50);
              n_Mc[j].mult(0.9);
              n_Mc[j].add(50, 50);
              n_Mc[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_Mc.length; j++) {
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][0]].x, n_Mc[index_TRIANGLES_Mc[j][0]].y);
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][1]].x, n_Mc[index_TRIANGLES_Mc[j][1]].y);
              B[index].vertex(n_Mc[index_TRIANGLES_Mc[j][2]].x, n_Mc[index_TRIANGLES_Mc[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka) {
            count_pattern_aka += 1;
            let index_TRIANGLES_aka = [[0, 1, 6], [1, 5, 6], [1, 2, 5], [2, 4, 5], [2, 3, 4]];
            let n_aka = new Array(node_aka.length);
            for (let j=0; j<n_aka.length; j++) {
              n_aka[j] = node_aka[j].copy();
              n_aka[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_aka.length; j++) {
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][0]].x, n_aka[index_TRIANGLES_aka[j][0]].y);
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][1]].x, n_aka[index_TRIANGLES_aka[j][1]].y);
              B[index].vertex(n_aka[index_TRIANGLES_aka[j][2]].x, n_aka[index_TRIANGLES_aka[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka + real_rate_pattern_fileBroken) {
            count_pattern_fileBroken += 1;
            let index_TRIANGLES_fileBroken = [
              [0, 1, 5], [1, 5, 6], [1, 6, 15], [1, 2, 15], [2, 15, 16], [2, 8, 16], [2, 3, 8], [3, 8, 9], [3, 4, 9], [4, 9, 10], [0, 4, 10], [0, 5, 10], [6, 7, 15], [7, 15, 17], [7, 8, 17], [8, 16, 17], 
              [11, 12, 14], [12, 13, 14], [18, 19, 25], [19, 20, 22], [19, 22, 23], [20, 21, 22], [23, 24, 25]
            ];
            let n_fileBroken = new Array(node_fileBroken.length);
            for (let j=0; j<n_fileBroken.length; j++) {
              n_fileBroken[j] = node_fileBroken[j].copy();
              n_fileBroken[j].add(-50, -50);
              n_fileBroken[j].mult(1.5);
              n_fileBroken[j].add(50, 50);
              n_fileBroken[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_fileBroken.length; j++) {
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][0]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][0]].y);
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][1]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][1]].y);
              B[index].vertex(n_fileBroken[index_TRIANGLES_fileBroken[j][2]].x, n_fileBroken[index_TRIANGLES_fileBroken[j][2]].y);
            }
          } else if (rate < real_rate_empty + real_rate_pattern_Tez + real_rate_pattern_Btc + rate_pattern_like + real_rate_pattern_metro + real_rate_pattern_dino + real_rate_pattern_CNR + real_rate_pattern_Mc + real_rate_pattern_aka + real_rate_pattern_fileBroken + real_rate_pattern_fx) {
            count_pattern_fx += 1;
            let index_TRIANGLES_fx = [
              [0, 1, 16], [1, 15, 16], [2, 11, 15], [2, 8, 9], [2, 8, 7], [2, 3, 5], [3, 4, 5], [5, 6, 7], [9, 10, 11], [12, 13, 14], [12, 14, 15], 
              [17, 22, 28], [17, 18, 19], [19, 20, 21], [19, 21, 22], [22, 27, 28], [22, 23, 25], [23, 24, 25], [25, 26, 27]
            ];
            let n_fx = new Array(node_fx.length);
            for (let j=0; j<n_fx.length; j++) {
              n_fx[j] = node_fx[j].copy();
              n_fx[j].mult(scale).add(x, y);
            }
            for (let j=0; j<index_TRIANGLES_fx.length; j++) {
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][0]].x, n_fx[index_TRIANGLES_fx[j][0]].y);
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][1]].x, n_fx[index_TRIANGLES_fx[j][1]].y);
              B[index].vertex(n_fx[index_TRIANGLES_fx[j][2]].x, n_fx[index_TRIANGLES_fx[j][2]].y);
            }
          }
        
      }
    }
    B[index].endShape();
  }







  let index_TRIANGLES = [
    [0, 1, 7], [1, 7, 8], [1, 2, 8], [2, 3, 8], [4, 8, 9], [4, 9, 12], [9, 10, 11], [9, 11, 12], [4, 12, 13], [4, 5, 14], [5, 6, 14], [6, 7, 14], [6, 7, 0], 
    [15, 16, 17], [17, 18, 15], 
    [19, 20, 21], [21, 22, 19], [23, 24, 35], [24, 31, 32], [24, 25, 27], [25, 26, 27], [27, 33, 34], [27, 28, 29], [29, 30, 27], [30, 35, 23], 
    [36, 37, 39], [37, 38, 39], [39, 40, 41], [41, 51, 36], [42, 50, 51], [42, 43, 50], [43, 47, 49], [44, 45, 46], [46, 47, 44], [47, 48, 49], [49, 50, 43], [36, 41, 51], 
    [52, 53, 54], [54, 55, 56], [54, 56, 62], [57, 58, 60], [58, 59, 60], [60, 61, 62], [54, 62, 52], 
    [63, 64, 65], [65, 70, 63], [66, 67, 69], [67, 68, 69], 
    [71, 72, 77], [73, 74, 75], [73, 75, 76], [71, 77, 78], 
    [79, 80, 81], [81, 82, 83], [79, 83, 84], [84, 85, 86], [84, 93, 86], [87, 88, 94], [88, 89, 94], [89, 95, 96], [89, 90, 91], [79, 90, 92], 
    [97, 98, 99], [99, 100, 101], [97, 99, 101], [102, 103, 104], [102, 104, 105], 
    [106, 107, 116], [108, 109, 115], [109, 110, 114], [110, 113, 114], [110, 111, 113], [111, 112, 113], [106, 116, 117]
  ];


  let w_logo = realF(100);
  let scale_logo = w_logo / 100.0;
  let n_BT = new Array(node_BT.length);
  for (let i=0; i<node_BT.length; i++) {
    n_BT[i] = node_BT[i].copy().mult(scale_logo).add((B[index].width-w_logo)/2.0, B[index].height-H_car*scaleRate - 30*scale_logo);
  }


  B[index].noStroke();
  B[index].fill(c_phone2);
  B[index].beginShape(TRIANGLES);
  for (let i=0; i<index_TRIANGLES.length; i++) {
    B[index].vertex(n_BT[index_TRIANGLES[i][0]].x, n_BT[index_TRIANGLES[i][0]].y);
    B[index].vertex(n_BT[index_TRIANGLES[i][1]].x, n_BT[index_TRIANGLES[i][1]].y);
    B[index].vertex(n_BT[index_TRIANGLES[i][2]].x, n_BT[index_TRIANGLES[i][2]].y);
  }
  B[index].endShape();
}
