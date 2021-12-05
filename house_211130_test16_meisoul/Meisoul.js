function Meisoul() {
  this.ran = random(-999, 999);
  this.begin = createVector(0, -real(3), 0);
  this.H = real(random(60, 90));
  this.W = this.H * random(0.5, 0.7);


  this.node_E = Array.from(Array(8), () => new Array(8));
  for (let i=0; i<this.node_E.length; i++) {
    for (let j=0; j<this.node_E[i].length; j++) {    
      this.node_E[i][j] = this.begin.copy();
    }
  }





  this.node_hand = Array.from(Array(this.node_E[0].length), () => new Array(7));
  this.ran_hand = Array(this.node_hand.length);
  this.node_E_hand = new Array(this.node_hand.length);
  this.hand_len = new Array(this.node_hand.length);
  this.hand_W = this.H * random(0.075, 0.083);
  for (let i=0; i<this.node_E_hand.length; i++) {
    //this.node_E_hand[i] = Array.from(Array(this.node_hand[i].length), () => new Array(6));
    this.node_E_hand[i] = new Array(this.node_hand[i].length);
    this.hand_len[i] = this.H * random(0.15, 0.23);
    for (let j=0; j<this.node_E_hand[i].length; j++) {
      this.node_E_hand[i][j] = new Array(6);
    }
  }




  for (let i=0; i<this.node_hand.length; i++) {
    this.ran_hand[i] = random(-999, 999);
    for (let j=0; j<this.node_hand[i].length; j++) {
      this.node_hand[i][j] = this.begin.copy();
    }
  }




  for (let i=0; i<this.node_E_hand.length; i++) {
    for (let j=0; j<this.node_E_hand[i].length; j++) {
      for (let k=0; k<this.node_E_hand[i][j].length; k++) {
        this.node_E_hand[i][j][k] = this.begin.copy();
      }
    }
  }




  let open_fast = false;








  this.change = function() {
    this.ran = random(-999, 999);
    this.H = real(random(60, 90));
    this.W = this.H * random(0.5, 0.7);

    for (let i=0; i<this.node_E.length; i++) {
      for (let j=0; j<this.node_E[i].length; j++) {    
        this.node_E[i][j] = this.begin.copy();
      }
    }

    this.node_hand = Array.from(Array(this.node_E[0].length), () => new Array(7));
    this.ran_hand = Array(this.node_hand.length);
    this.node_E_hand = new Array(this.node_hand.length);
    this.hand_W = this.H * random(0.075, 0.083);

    for (let i=0; i<this.node_E_hand.length; i++) {
      this.node_E_hand[i] = new Array(this.node_hand[i].length);
      this.hand_len[i] = this.H * random(0.15, 0.23);
      for (let j=0; j<this.node_E_hand[i].length; j++) {
        this.node_E_hand[i][j] = new Array(6);
      }
    }

    for (let i=0; i<this.node_hand.length; i++) {
      this.ran_hand[i] = random(-999, 999);
      for (let j=0; j<this.node_hand[i].length; j++) {
        this.node_hand[i][j] = this.begin.copy();
      }
    }

    for (let i=0; i<this.node_E_hand.length; i++) {
      for (let j=0; j<this.node_E_hand[i].length; j++) {
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          this.node_E_hand[i][j][k] = this.begin.copy();
        }
      }
    }
  };









  this.update = function() {

    for (let i=0; i<this.node_E.length; i++) {
      //let w = map(cos(map(i, 0, this.node_E.length-1, 0, PI)), 1, -1, 0, 1) * this.W;
      let w = map(acos(map(i, 0, this.node_E.length-1, 0, -1.05)), HALF_PI, PI, 1, 0) * this.W;
      let y = map(cos(map(i, 0, this.node_E.length-1, HALF_PI, PI)), 0, -1, 0, 1) * -this.H;
      //let y = map(i, 0, this.node_E.length-1, 0, -this.H);
      for (let j=0; j<this.node_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_E[i].length, 0, TWO_PI)) * w;
        let z = sin(map(j, 0, this.node_E[i].length, 0, TWO_PI)) * w;

        this.node_E[i][j] = easing_p3(this.node_E[i][j], createVector(x, y, z).add(this.begin));
      }
    }





    let s_node_hand = Array.from(Array(this.node_E[0].length), () => new Array(7));
    let s_node_E_hand = new Array(s_node_hand.length);
    for (let i=0; i<s_node_E_hand.length; i++) {
      s_node_E_hand[i] = new Array(s_node_hand[i].length);
      for (let j=0; j<s_node_E_hand[i].length; j++) {
        s_node_E_hand[i][j] = new Array(6);
      }
    }

    for (let i=0; i<s_node_hand.length; i++) {
      if (!this.open_fast) {
        this.hand_len[i] = this.H * map(noise(frameCount*0.02 + this.ran_hand[i]), 0, 1, 0.1, 0.3);
      } else {
        this.hand_len[i] = this.H * map(noise((frameCount+i)*1 + this.ran_hand[i]), 0, 1, 0.1, 0.3);
      }
      for (let j=0; j<s_node_hand[i].length; j++) {
        let x = 0.0;
        let angle = 0;

        if (!this.open_fast) {         
          angle = map(noise(j*0.1 + frameCount*0.02 + this.ran_hand[i]), 0, 1, -real(0.5), real(0.25));
          angle *= map(j, 0, s_node_hand[i].length, 0.5, 1);
        } else {
          angle = map(sin(j*1 + (frameCount+i)*1 + this.ran_hand[i]), -1, 1, -real(0.5), real(0.25));
          angle *= map(j, 0, s_node_hand[i].length, 0.5, 1);
        }
        if (j==0) {
          s_node_hand[i][j] = createVector(0, 0, 0);
        } else if (j==1) {
          x = s_node_hand[i][j-1].x  +  this.hand_len[i] * pow(0.7, (j-1));
          s_node_hand[i][j] = createVector(x, 0, 0);

          s_node_hand[i][j].rotate(angle);
        } else {
          s_node_hand[i][j] = p5.Vector.sub(s_node_hand[i][j-1], s_node_hand[i][j-2]).mult(0.7);

          s_node_hand[i][j].rotate(angle);          
          s_node_hand[i][j].add(s_node_hand[i][j-1]);
        }
      }
    }


    for (let i=0; i<s_node_E_hand.length; i++) {
      for (let j=0; j<s_node_E_hand[i].length; j++) {
        let w = map(asin(map(j, 0, s_node_E_hand[i].length-1, 0, 1)), 0, HALF_PI, this.hand_W, real(1));
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          let z = cos(map(k, 0, s_node_E_hand[i][j].length, 0, TWO_PI)) * w;
          let y = sin(map(k, 0, s_node_E_hand[i][j].length, 0, TWO_PI)) * w;
          if (j==0) {
            s_node_E_hand[i][j][k] = createVector(0, y, z);
          } else {
            let angle = p5.Vector.sub(s_node_hand[i][j], s_node_hand[i][j-1]).heading();
            s_node_E_hand[i][j][k] = createVector(0, y, z);
            s_node_E_hand[i][j][k] = PRotateZ(s_node_E_hand[i][j][k], angle);
          }
        }
      }
    }


    for (let i=0; i<this.node_hand.length; i++) {
      for (let j=0; j<this.node_hand[i].length; j++) {
        let angle = map(i, 0, s_node_hand.length, 0, TWO_PI) + TWO_PI/s_node_hand.length/2;
        s_node_hand[i][j] = PRotateY(s_node_hand[i][j], angle);
        s_node_hand[i][j].add(p5.Vector.add(this.node_E[0][i], this.node_E[0][(i+1)%s_node_hand.length]).mult(0.5));
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          s_node_E_hand[i][j][k] = PRotateY(s_node_E_hand[i][j][k], angle);
          s_node_E_hand[i][j][k].add(s_node_hand[i][j]);
        }
        if (j==0) {
          s_node_E_hand[i][j][0] = p5.Vector.sub(s_node_E_hand[i][j][0], this.node_E[0][(i+1)%this.node_E[0].length]).mult(0.5).add(this.node_E[0][(i+1)%this.node_E[0].length]);
          s_node_E_hand[i][j][3] = p5.Vector.sub(s_node_E_hand[i][j][3], this.node_E[0][i]).mult(0.5).add(this.node_E[0][i]);
          s_node_E_hand[i][j][4] = p5.Vector.sub(s_node_E_hand[i][j][4], this.node_E[1][i]).mult(0.5).add(this.node_E[1][i]);
          s_node_E_hand[i][j][5] = p5.Vector.sub(s_node_E_hand[i][j][5], this.node_E[1][(i+1)%this.node_E[0].length]).mult(0.5).add(this.node_E[1][(i+1)%this.node_E[0].length]);
          this.node_E_hand[i][j][1].y = 0;
          this.node_E_hand[i][j][2].y = 0;
        }

        this.node_hand[i][j] = easing_p4(this.node_hand[i][j], s_node_hand[i][j]);
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          this.node_E_hand[i][j][k] = easing_p4(this.node_E_hand[i][j][k], s_node_E_hand[i][j][k]);
        }
      }
    }








    if (open_winkL) {
      if (time_winkL < 10) {
        time_winkL ++;
      } else {
        time_winkL = 0;
        open_winkL = false;
      }
    }
    if (open_winkR) {
      if (time_winkR < 10) {
        time_winkR ++;
      } else {
        time_winkR = 0;
        open_winkR = false;
      }
    }
    let tl = constrain(sin(map(time_winkL, 0, 10, 0, PI)), 0, 1);
    let tr = constrain(sin(map(time_winkR, 0, 10, 0, PI)), 0, 1);

    bez_eyeL[1].x = lerp(75.886, 72.955, tl);
    bez_eyeL[1].y = lerp(32.512, 44.937, tl);
    bez_eyeL[2].x = lerp(63.826, 57.213, tl);
    bez_eyeL[2].y = lerp(25.979, 47.478, tl);
    bez_eyeL[3].x = lerp(48.251, 47.626, tl);
    bez_eyeL[3].y = lerp(25.979, 47.915, tl);
    bez_eyeL[4].x = lerp(29.841, 30.55, tl);
    bez_eyeL[4].y = lerp(25.979, 48.692, tl);
    bez_eyeL[5].x = lerp(25.641, 21.69, tl);
    bez_eyeL[5].y = lerp(35.94, 36.251, tl);


    bez_eyeR[1].x = lerp(24.39, 29.7, tr);
    bez_eyeR[1].y = lerp(33.638, 45.86, tr);
    bez_eyeR[2].x = lerp(39.692, 41.49, tr);
    bez_eyeR[2].y = lerp(25.732, 49.017, tr);
    bez_eyeR[3].x = lerp(55.265, 55.265, tr);
    bez_eyeR[3].y = lerp(26.01, 49.32, tr);
    bez_eyeR[4].x = lerp(79.632, 74.557, tr);
    bez_eyeR[4].y = lerp(26.444, 49.745, tr);
    bez_eyeR[5].x = lerp(79.857, 82.817, tr);
    bez_eyeR[5].y = lerp(39.214, 37.416, tr);



    if (!open_info) {
      EYE.background(0);
      //EYE.translate(-5, -20);
      EYE.fill(250);
      EYE.noStroke();
    } else {
      EYE.background(255);
      EYE.noFill();
      EYE.stroke(200);
      EYE.strokeWeight(2);
    }
    EYE.beginShape();
    EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
    EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
    EYE.bezierVertex(bez_eyeL[7].x, bez_eyeL[7].y, bez_eyeL[8].x, bez_eyeL[8].y, bez_eyeL[9].x, bez_eyeL[9].y);
    EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
    EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
    EYE.endShape();

    eye_moveX = easing_x2(eye_moveX, constrain(map(mouseX, width*0.15, width*0.85, 5, -5), -5, 5));
    eye_moveY = easing_x2(eye_moveY, constrain(map(mouseY, height*0.3, height*0.75, -7, 7), -7, 7));
    if (!open_info) {
      EYE.stroke(60);
      EYE.strokeWeight(3);
      EYE.fill(200);
    } else {
      EYE.noFill();
      EYE.stroke(200);
      EYE.strokeWeight(2);
    }
    EYE.ellipse(48.251+eye_moveX, 38.578+eye_moveY, 22.851, 22.851);
    if (!open_info) {
      EYE.noStroke();
      EYE.fill(30);
    } else {
      EYE.noFill();
      EYE.stroke(200);
      EYE.strokeWeight(2);
    }
    EYE.ellipse(48.251+eye_moveX, 38.578+eye_moveY, 9.433, 9.433);
    if (!open_info) {
      EYE.stroke(60);
      EYE.fill(250);
      EYE.strokeWeight(1.5);
    } else {
      EYE.noFill();
      EYE.stroke(200);
      EYE.strokeWeight(2);
    }
    EYE.ellipse(42.734+eye_moveX, 32.882+eye_moveY, 6.739, 6.739);

    if (!open_info) {
      EYE.fill(225);
      EYE.strokeWeight(1.75);
    } else {
      EYE.noFill();
      EYE.stroke(200);
      EYE.strokeWeight(2);
    }
    EYE.beginShape();
    EYE.vertex(83.266, 41.242);
    EYE.bezierVertex(81.713, 39.368, 79.476, 37.239, 77.209, 35.481);
    EYE.bezierVertex(74.593, 39.127, 74.982, 42.744, 76.646, 44.937);
    EYE.bezierVertex(79.116, 43.85, 80.93, 42.992, 83.266, 41.242);
    EYE.endShape();

    if (!open_info) {
      EYE.fill(0);
      EYE.noStroke();
      EYE.beginShape(TESS);
      EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
      EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
      EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
      EYE.vertex(0, 0);
      EYE.vertex(EYE.width, 0);
      EYE.endShape(CLOSE);
      EYE.beginShape(TESS);
      EYE.vertex(bez_eyeL[9].x, bez_eyeL[9].y);
      EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
      EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
      EYE.vertex(EYE.width, EYE.height*2);
      EYE.vertex(0, EYE.height*2);
      EYE.endShape(CLOSE);

      EYE.stroke(60);
      EYE.noFill();
      EYE.strokeWeight(3);
      EYE.beginShape();
      EYE.vertex(bez_eyeL[0].x, bez_eyeL[0].y);
      EYE.bezierVertex(bez_eyeL[1].x, bez_eyeL[1].y, bez_eyeL[2].x, bez_eyeL[2].y, bez_eyeL[3].x, bez_eyeL[3].y);
      EYE.bezierVertex(bez_eyeL[4].x, bez_eyeL[4].y, bez_eyeL[5].x, bez_eyeL[5].y, bez_eyeL[6].x, bez_eyeL[6].y);
      EYE.bezierVertex(bez_eyeL[7].x, bez_eyeL[7].y, bez_eyeL[8].x, bez_eyeL[8].y, bez_eyeL[9].x, bez_eyeL[9].y);
      EYE.bezierVertex(bez_eyeL[10].x, bez_eyeL[10].y, bez_eyeL[11].x, bez_eyeL[11].y, bez_eyeL[12].x, bez_eyeL[12].y);
      EYE.bezierVertex(bez_eyeL[13].x, bez_eyeL[13].y, bez_eyeL[14].x, bez_eyeL[14].y, bez_eyeL[0].x, bez_eyeL[0].y);
      EYE.endShape();
    }





    if (!open_info) {
      EYE2.background(0);
      //EYE.translate(-5, -20);
      EYE2.fill(250);
      EYE2.noStroke();
    } else {
      EYE2.background(255);
      EYE2.noFill();
      EYE2.stroke(200);
      EYE2.strokeWeight(2);
    }
    EYE2.beginShape();
    EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
    EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
    EYE2.bezierVertex(bez_eyeR[7].x, bez_eyeR[7].y, bez_eyeR[8].x, bez_eyeR[8].y, bez_eyeR[9].x, bez_eyeR[9].y);
    EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
    EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
    EYE2.endShape();

    if (!open_info) {
      EYE2.stroke(60);
      EYE2.strokeWeight(3);
      EYE2.fill(200);
    } else {
      EYE2.noFill();
      EYE2.stroke(200);
      EYE2.strokeWeight(2);
    }
    EYE2.ellipse(54.922+eye_moveX, 39.491+eye_moveY, 22.408, 22.408);
    if (!open_info) {
      EYE2.noStroke();
      EYE2.fill(30);
    } else {
      EYE2.noFill();
      EYE2.stroke(200);
      EYE2.strokeWeight(2);
    }
    EYE2.ellipse(54.922+eye_moveX, 39.491+eye_moveY, 8.738, 8.738);
    if (!open_info) {
      EYE2.stroke(60);
      EYE2.fill(250);
      EYE2.strokeWeight(1.5);
    } else {
      EYE2.noFill();
      EYE2.stroke(200);
      EYE2.strokeWeight(2);
    }
    EYE2.ellipse(49.574+eye_moveX, 33.864+eye_moveY, 6.022, 6.022);

    if (!open_info) {
      EYE2.fill(225);
      EYE2.strokeWeight(1.75);
    } else {
      EYE2.noFill();
      EYE2.stroke(200);
      EYE2.strokeWeight(2);
    }
    EYE2.beginShape();
    EYE2.vertex(16.102, 40.318);
    EYE2.bezierVertex(18.046, 38.729, 20.306, 37.188, 22.627, 35.765);
    EYE2.bezierVertex(25.243, 39.411, 24.847, 42.841, 23.183, 45.033);
    EYE2.bezierVertex(20.945, 43.931, 18.265, 42.29, 16.102, 40.318);
    EYE2.endShape();

    if (!open_info) {
      EYE2.fill(0);
      EYE2.noStroke();
      EYE2.beginShape(TESS);
      EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
      EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
      EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
      EYE2.vertex(EYE2.width, 0);
      EYE2.vertex(0, 0);
      EYE2.endShape(CLOSE);
      EYE2.beginShape(TESS);
      EYE2.vertex(bez_eyeR[9].x, bez_eyeR[9].y);
      EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
      EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
      EYE2.vertex(0, EYE2.height*2);
      EYE2.vertex(EYE2.width, EYE2.height*2);
      EYE2.endShape(CLOSE);

      EYE2.stroke(60);
      EYE2.noFill();
      EYE2.strokeWeight(3);
      EYE2.beginShape();
      EYE2.vertex(bez_eyeR[0].x, bez_eyeR[0].y);
      EYE2.bezierVertex(bez_eyeR[1].x, bez_eyeR[1].y, bez_eyeR[2].x, bez_eyeR[2].y, bez_eyeR[3].x, bez_eyeR[3].y);
      EYE2.bezierVertex(bez_eyeR[4].x, bez_eyeR[4].y, bez_eyeR[5].x, bez_eyeR[5].y, bez_eyeR[6].x, bez_eyeR[6].y);
      EYE2.bezierVertex(bez_eyeR[7].x, bez_eyeR[7].y, bez_eyeR[8].x, bez_eyeR[8].y, bez_eyeR[9].x, bez_eyeR[9].y);
      EYE2.bezierVertex(bez_eyeR[10].x, bez_eyeR[10].y, bez_eyeR[11].x, bez_eyeR[11].y, bez_eyeR[12].x, bez_eyeR[12].y);
      EYE2.bezierVertex(bez_eyeR[13].x, bez_eyeR[13].y, bez_eyeR[14].x, bez_eyeR[14].y, bez_eyeR[0].x, bez_eyeR[0].y);
      EYE2.endShape();
    }





    SWIRL.background(255);
    if (!open_info) {
      SWIRL.fill(c_swirl);
      SWIRL.noStroke();
    } else {
      SWIRL.stroke(map(c_swirl, 220, 255, 180, 255));
      SWIRL.strokeWeight(0.25);
      SWIRL.noFill();
    }
    for (let i=0; i<20; i+=2) {
      SWIRL.beginShape();
      for (let j=0; j<20; j++) {
        let x = map(j, 0, 20, 0, SWIRL.width*0.75);
        let n = createVector(x, 0);
        n.rotate(map(j, 0, 20, 0, HALF_PI));
        n.rotate(map(i, 0, 20, 0, TWO_PI)+frameCount*0.05);
        n.add(SWIRL.width/2, SWIRL.height/2);
        SWIRL.vertex(n.x, n.y, n.z);
      }
      for (let j=19; j>=0; j--) {
        let x = map(j, 20, -1, SWIRL.width*0.75, 0);
        let n = createVector(x, 0);
        n.rotate(map(j, 20, -1, HALF_PI, 0));
        n.rotate(map(i+1, 0, 20, 0, TWO_PI)+frameCount*0.05);
        n.add(SWIRL.width/2, SWIRL.height/2);
        SWIRL.vertex(n.x, n.y, n.z);
      }
      SWIRL.endShape(CLOSE);
    }
  };







  this.display = function() {





    noStroke();
    fill(0);
    //noFill();
    //stroke(200);
    //strokeWeight(real(0.5));
    for (let i=0; i<this.node_E.length-1; i++) {
      for (let j=0; j<this.node_E[i].length; j++) {
        if (i==3 && j==0) {
          beginShape();
          texture(EYE2);
          vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z, 1, 1);
          vertex(this.node_E[i+1][j].x, this.node_E[i+1][j].y, this.node_E[i+1][j].z, 1, 0);
          vertex(this.node_E[i+1][(j+1)%this.node_E[i].length].x, this.node_E[i+1][(j+1)%this.node_E[i].length].y, this.node_E[i+1][(j+1)%this.node_E[i].length].z, 0, 0);
          vertex(this.node_E[i][(j+1)%this.node_E[i].length].x, this.node_E[i][(j+1)%this.node_E[i].length].y, this.node_E[i][(j+1)%this.node_E[i].length].z, 0, 1);
          endShape(CLOSE);
          fill(255);
        } else if (i==3 && j==1) {
          beginShape();
          texture(EYE);
          vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z, 1, 1);
          vertex(this.node_E[i+1][j].x, this.node_E[i+1][j].y, this.node_E[i+1][j].z, 1, 0);
          vertex(this.node_E[i+1][(j+1)%this.node_E[i].length].x, this.node_E[i+1][(j+1)%this.node_E[i].length].y, this.node_E[i+1][(j+1)%this.node_E[i].length].z, 0, 0);
          vertex(this.node_E[i][(j+1)%this.node_E[i].length].x, this.node_E[i][(j+1)%this.node_E[i].length].y, this.node_E[i][(j+1)%this.node_E[i].length].z, 0, 1);
          endShape(CLOSE);
          fill(255);
        } else {
          fill(0);
          beginShape();
          vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z);
          vertex(this.node_E[i+1][j].x, this.node_E[i+1][j].y, this.node_E[i+1][j].z);
          vertex(this.node_E[i+1][(j+1)%this.node_E[i].length].x, this.node_E[i+1][(j+1)%this.node_E[i].length].y, this.node_E[i+1][(j+1)%this.node_E[i].length].z);
          vertex(this.node_E[i][(j+1)%this.node_E[i].length].x, this.node_E[i][(j+1)%this.node_E[i].length].y, this.node_E[i][(j+1)%this.node_E[i].length].z);
          endShape(CLOSE);
        }
      }
    }


    for (let i=0; i<this.node_E_hand.length; i++) {
      for (let j=0; j<this.node_E_hand[i].length-1; j++) {
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          beginShape();
          vertex(this.node_E_hand[i][j][k].x, this.node_E_hand[i][j][k].y, this.node_E_hand[i][j][k].z);
          vertex(this.node_E_hand[i][j][(k+1)%this.node_E_hand[i][j].length].x, this.node_E_hand[i][j][(k+1)%this.node_E_hand[i][j].length].y, this.node_E_hand[i][j][(k+1)%this.node_E_hand[i][j].length].z);
          vertex(this.node_E_hand[i][j+1][(k+1)%this.node_E_hand[i][j].length].x, this.node_E_hand[i][j+1][(k+1)%this.node_E_hand[i][j].length].y, this.node_E_hand[i][j+1][(k+1)%this.node_E_hand[i][j].length].z);
          vertex(this.node_E_hand[i][j+1][k].x, this.node_E_hand[i][j+1][k].y, this.node_E_hand[i][j+1][k].z);
          endShape(CLOSE);
        }
        if (j == this.node_E_hand[i].length-1-1) {
          beginShape();
          for (let k=0; k<this.node_E_hand[i][j].length; k++) {
            vertex(this.node_E_hand[i][j+1][k].x, this.node_E_hand[i][j+1][k].y, this.node_E_hand[i][j+1][k].z);
          }
          endShape(CLOSE);
        }
      }
    }
  };



  this.displayInfo = function() {
    noFill();
    stroke(160);
    strokeWeight(real(3));
    beginShape(POINTS);
    for (let i=0; i<this.node_E.length; i++) {
      vertex(this.begin.x, this.node_E[i][0].y, this.begin.z);
    }
    endShape();
    //beginShape(POINTS);
    //for (let i=0; i<this.node_hand.length; i++) {
    //  for (let j=0; j<this.node_hand[i].length; j++) {
    //    vertex(this.node_hand[i][j].x, this.node_hand[i][j].y, this.node_hand[i][j].z);
    //  }
    //}
    //endShape();

    strokeWeight(real(1.5));
    beginShape();
    vertex(this.begin.x, this.begin.y, this.begin.z);
    vertex(this.begin.x, this.node_E[this.node_E.length-1][0].y, this.begin.z);
    endShape();
    strokeWeight(real(1.25));
    beginShape(LINES);
    for (let i=0; i<this.node_hand.length; i++) {
      for (let j=0; j<this.node_hand[i].length-1; j++) {
        vertex(this.node_hand[i][j].x, this.node_hand[i][j].y, this.node_hand[i][j].z);
        vertex(this.node_hand[i][j+1].x, this.node_hand[i][j+1].y, this.node_hand[i][j+1].z);
      }
      vertex(this.node_hand[i][0].x, this.node_hand[i][0].y, this.node_hand[i][0].z);
      vertex(this.begin.x, this.begin.y, this.begin.z);
    }
    endShape();


    if (this.open_fast) {
      stroke(128, 30, 30);
    } else {
      stroke(200);
    }
    strokeWeight(real(2.5));
    beginShape(POINTS);
    for (let i=0; i<this.node_E.length; i++) {
      for (let j=0; j<this.node_E[i].length; j++) {
        vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z);
      }
    }
    endShape();



    if (this.open_fast) {
      strokeWeight(real(1));
    } else {
      strokeWeight(real(0.5));
    }
    for (let i=0; i<this.node_E.length; i++) {
      beginShape();
      for (let j=0; j<this.node_E[i].length; j++) {
        vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z);
      }
      endShape(CLOSE);
    }
    beginShape(LINES);
    for (let i=0; i<this.node_E.length-1; i++) {
      for (let j=0; j<this.node_E[i].length; j++) {
        vertex(this.node_E[i][j].x, this.node_E[i][j].y, this.node_E[i][j].z);
        vertex(this.node_E[i+1][j].x, this.node_E[i+1][j].y, this.node_E[i+1][j].z);
      }
    }
    endShape();





    /*stroke(200);
     strokeWeight(real(2.5));
     beginShape(POINTS);
     for (let i=0; i<this.node_hand.length; i++) {
     for (let j=0; j<this.node_hand[i].length; j++) {
     vertex(this.node_hand[i][j].x, this.node_hand[i][j].y, this.node_hand[i][j].z);
     }
     }
     endShape();
     
     strokeWeight(real(0.5));
     beginShape(LINES);
     for (let i=0; i<this.node_hand.length; i++) {
     for (let j=0; j<this.node_hand[i].length-1; j++) {
     vertex(this.node_hand[i][j].x, this.node_hand[i][j].y, this.node_hand[i][j].z);
     vertex(this.node_hand[i][j+1].x, this.node_hand[i][j+1].y, this.node_hand[i][j+1].z);
     }
     }
     endShape();
     */



    //stroke(200);
    strokeWeight(real(1.75));
    beginShape(POINTS);
    for (let i=0; i<this.node_E_hand.length; i++) {
      for (let j=0; j<this.node_E_hand[i].length; j++) {
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          vertex(this.node_E_hand[i][j][k].x, this.node_E_hand[i][j][k].y, this.node_E_hand[i][j][k].z);
        }
      }
    }
    endShape();

    if (this.open_fast) {
      strokeWeight(real(0.75));
    } else {
      strokeWeight(real(0.35));
    }
    beginShape(LINES);
    for (let i=0; i<this.node_E_hand.length; i++) {
      for (let j=0; j<this.node_E_hand[i].length-1; j++) {
        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          vertex(this.node_E_hand[i][j][k].x, this.node_E_hand[i][j][k].y, this.node_E_hand[i][j][k].z);
          vertex(this.node_E_hand[i][j+1][k].x, this.node_E_hand[i][j+1][k].y, this.node_E_hand[i][j+1][k].z);
        }
      }
    }
    endShape();


    for (let i=0; i<this.node_E_hand.length; i++) {
      for (let j=0; j<this.node_E_hand[i].length; j++) {
        beginShape();

        for (let k=0; k<this.node_E_hand[i][j].length; k++) {
          vertex(this.node_E_hand[i][j][k].x, this.node_E_hand[i][j][k].y, this.node_E_hand[i][j][k].z);
        }
        endShape(CLOSE);
      }
    }





    

  };
}
