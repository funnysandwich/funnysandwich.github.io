function Bridge(begin, W) {
  this.begin = begin.copy();
  this.W_river = W;
  this.W_target = W*1.15;
  this.W = this.W_target;
  this.D = real(random(100, 200));
  this.H_target = real(random(200, 400));
  this.H = this.H_target;
  this.var_easing1 = random(0.3, 0.5);
  this.var_easing2 = random(0.075, 0.175);


  this.node_F = new Array(floor(random(2, 4.1))*2);
  for (let i=0; i<this.node_F.length; i++) {
    let x = cos(map(i, 0, this.node_F.length-1, PI+HALF_PI*0.5, PI+HALF_PI*1.5));
    let y = sin(map(i, 0, this.node_F.length-1, PI+HALF_PI*0.5, PI+HALF_PI*1.5));
    this.node_F[i] = createVector(x, y, 0);
  }
  let w_normalize = p5.Vector.dist(this.node_F[0], this.node_F[this.node_F.length-1]);
  let h_normalize = p5.Vector.dist(this.node_F[0], this.node_F[floor(this.node_F.length/2)]);
  for (let i=0; i<this.node_F.length; i++) {
    this.node_F[i].x *= (1.0/w_normalize) * this.W;
    this.node_F[i].y *= (1.0/h_normalize) * this.H;
  }
  let y_normalize = this.node_F[0].y;
  for (let i=0; i<this.node_F.length; i++) {
    this.node_F[i].x += this.begin.x + this.W_river/2.0;
    this.node_F[i].y += -y_normalize + this.begin.y;
    this.node_F[i].z = this.begin.z;
  }


  this.node_B = new Array(this.node_F.length);
  for (let i=0; i<this.node_B.length; i++) {
    this.node_B[i] = this.node_F[i].copy();
    this.node_B[i].z -= this.D;
  }


  this.node_bdgPier = Array.from(Array(this.node_F.length-2), () => new Array(2));
  this.H_bdgPier_target = new Array(this.node_bdgPier.length);
  this.H_bdgPier = new Array(this.node_bdgPier.length);
  for (let i=0; i<this.node_bdgPier.length; i++) {
    this.H_bdgPier_target[i] = abs(this.begin.y - this.node_F[i+1].y);
    this.H_bdgPier[i] = this.H_bdgPier_target[i];
    this.node_bdgPier[i][0] = p5.Vector.add(this.node_F[i+1], this.node_B[i+1]).mult(0.5);
    this.node_bdgPier[i][1] =  this.node_bdgPier[i][0].copy();
    this.node_bdgPier[i][1].y += this.H_bdgPier[i];
  }







  this.change = function() {
    this.H_target = real(random(200, 400));
    this.H = 0;
    this.W = 0;
    this.var_easing1 = random(0.3, 0.5);
    this.var_easing2 = random(0.075, 0.175);

    this.node_F = new Array(floor(random(2, 4.1))*2);
    this.node_B = new Array(this.node_F.length);
    for (let i=0; i<this.node_F.length; i++) {
      this.node_F[i] = this.begin.copy();
      this.node_B[i] = this.begin.copy();
    }


    this.node_bdgPier = Array.from(Array(this.node_F.length-2), () => new Array(2));
    this.H_bdgPier_target = new Array(this.node_bdgPier.length);
    this.H_bdgPier = new Array(this.node_bdgPier.length);
    for (let i=0; i<this.node_bdgPier.length; i++) {
      this.H_bdgPier_target[i] = abs(this.begin.y - this.node_F[i+1].y);
      this.H_bdgPier[i] = 0;
      this.node_bdgPier[i][0] = p5.Vector.add(this.node_F[i+1], this.node_B[i+1]).mult(0.5);
      this.node_bdgPier[i][1] = this.node_bdgPier[i][0].copy();
    }
  };







  this.update = function() {
    this.begin.x += speed;
    this.H = easing_x(this.H, this.H_target, this.var_easing2);
    this.W = easing_x(this.W, this.W_target, this.var_easing1);

    for (let i=0; i<this.node_F.length; i++) {
      let x = cos(map(i, 0, this.node_F.length-1, PI+HALF_PI*0.5, PI+HALF_PI*1.5));
      let y = sin(map(i, 0, this.node_F.length-1, PI+HALF_PI*0.5, PI+HALF_PI*1.5));
      this.node_F[i] = createVector(x, y, 0);
    }
    let w_normalize = p5.Vector.dist(this.node_F[0], this.node_F[this.node_F.length-1]);
    let h_normalize = p5.Vector.dist(this.node_F[0], this.node_F[floor(this.node_F.length/2)]);
    for (let i=0; i<this.node_F.length; i++) {
      this.node_F[i].x *= (1.0/w_normalize) * this.W;
      this.node_F[i].y *= (1.0/h_normalize) * this.H;
    }
    let y_normalize = this.node_F[0].y;
    for (let i=0; i<this.node_F.length; i++) {
      this.node_F[i].x += this.begin.x + this.W_river/2.0;
      this.node_F[i].y += -y_normalize + this.begin.y;
      this.node_F[i].z = this.begin.z;
    }


    for (let i=0; i<this.node_B.length; i++) {
      this.node_B[i] = this.node_F[i].copy();
      this.node_B[i].z -= this.D;
    }



    for (let i=0; i<this.node_bdgPier.length; i++) {
      this.H_bdgPier_target[i] = abs(this.begin.y - this.node_F[i+1].y);
      this.H_bdgPier[i] = easing_x(this.H_bdgPier[i], this.H_bdgPier_target[i], this.var_easing2);
      this.node_bdgPier[i][0] = p5.Vector.add(this.node_F[i+1], this.node_B[i+1]).mult(0.5);
      this.node_bdgPier[i][1] =  this.node_bdgPier[i][0].copy();
      this.node_bdgPier[i][1].y += this.H_bdgPier[i];
    }
  };







  this.display = function() {
    let c1, c2;
    //noStroke();
    //beginShape(TRIANGLES);
    for (let i=0; i<this.node_F.length-1; i++) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_B[i].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_F[i].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node_B[i], this.node_B[i+1], this.node_F[i+1], this.node_F[i], c1, c1, c2, c2);
    }

    for (let i=0; i<this.node_F.length-1; i++) {
      fill(lerpColor(c_near, c_far, constrain(map(this.node_F[i].z, skyline.z, 0, 1, 0), 0, 1)));
      TRIANGLES_getLine_weightToU_Y(this.node_F[i], this.node_F[i+1], real(10));
    }
    for (let i=0; i<this.node_B.length-1; i++) {
      fill(lerpColor(c_near, c_far, constrain(map(this.node_B[i].z, skyline.z, 0, 1, 0), 0, 1)));
      TRIANGLES_getLine_weightToU_Y(this.node_B[i], this.node_B[i+1], real(10));
    }


    for (let i=0; i<this.node_bdgPier.length; i++) {
      TRIANGLES_getLine_weight(this.node_bdgPier[i][0], this.node_bdgPier[i][1], real(10));
    }

    //endShape();
  };






  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoGreen);
    //strokeWeight(real(2));
    //beginShape();
    for (let i=0; i<this.node_F.length; i++) {
      //vertex(this.node_F[i].x, this.node_F[i].y, this.node_F[i].z);
      if (i < this.node_F.length-1) {
        LINES_getLine(this.node_F[i], this.node_F[i+1]);
        LINES_getLine(this.node_B[i], this.node_B[i+1]);
      }
      LINES_getLine(this.node_F[i], this.node_B[i]);
    }
    //for (let i=this.node_B.length-1; i>=0; i--) {
    //  vertex(this.node_B[i].x, this.node_B[i].y, this.node_B[i].z);
    //}
    //endShape(CLOSE);

    //beginShape(LINES);
    for (let i=0; i<this.node_bdgPier.length; i++) {
      LINES_getLine(this.node_bdgPier[i][0], this.node_bdgPier[i][1]);
    }
    // endShape();
  };
}
