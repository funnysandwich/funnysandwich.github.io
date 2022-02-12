function Bill_Mc(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(50, 75));
  this.W_rect = real(random(75, 100));
  this.H_rect = this.W_rect * random(0.25, 0.45);
  this.W_M = this.W_rect * random(0.65, 0.75);
  this.H_M = this.W_M * random(1.5, 2.0);
  this.thick_M = real(random(7, 9));
  this.H_pillar_target = real(random(400, map(max(index_z, 1), 1, 5, 500, 1500)));
  this.H_pillar = 0;
  this.var_easing1 = random(0.075, 0.125)*2;



  this.node_base = new Array(4);
  for (let i=0; i<this.node_base.length; i++) {
    this.node_base[i] = begin.copy();
  }


  this.node_pillar = new Array(3);

  this.node_rotate = new Array(this.node_pillar.length);
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, this.node_rotate.length-1, 0, 1);
    this.node_rotate[i] = lz;
  }


  this.node_pillar[0] = this.begin.copy().add(this.W_base/2.0, 0, this.W_base/2.0);
  for (let i=1; i<this.node_pillar.length; i++) {
    this.node_pillar[i] = createVector(0, -this.H_pillar/this.node_pillar.length, 0);
    this.node_pillar[i] = PRotateZ(this.node_pillar[i], this.node_rotate[i]);
    this.node_pillar[i].add(this.node_pillar[i-1]);
  }



  this.node_rect = new Array(4);
  this.node_rect[0] = createVector(-this.W_rect/2.0, -this.H_rect, 0);
  this.node_rect[1] = createVector(this.W_rect/2.0, -this.H_rect, 0);
  this.node_rect[2] = createVector(this.W_rect/2.0*0.8, 0, 0);
  this.node_rect[3] = createVector(-this.W_rect/2.0*0.8, 0, 0);
  for (let i=0; i<this.node_rect.length; i++) {
    this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
  }



  this.node_M_O = Array.from(Array(3), () => new Array(8));
  this.node_M_E = Array.from(Array(3), () => new Array(8));


  for (let i=0; i<this.node_M_E.length; i++) {
    const w = ((this.W_M - this.thick_M*4) / 3.0);
    const x_move = -this.W_M/2.0 + this.thick_M + w/2.0 + i*(w+this.thick_M);
    for (let j=0; j<this.node_M_E[i].length; j++) {
      const x = cos(map(j, 0, this.node_M_E[i].length-1, PI, TWO_PI)) * (w/2.0);
      const y = sin(map(j, 0, this.node_M_E[i].length-1, PI, TWO_PI)) * ((this.H_M-this.thick_M)/2.0);
      this.node_M_E[i][j] = createVector(x_move + x, y - this.H_rect*0.7, real(1));
    }
  }
  for (let i=0; i<this.node_M_O.length; i++) {
    const w = ((this.W_M + this.thick_M*2) / 3.0);
    const x_move = -this.W_M/2.0 + w/2.0 + i*(w-this.thick_M);
    for (let j=0; j<this.node_M_O[i].length; j++) {
      let x, y;
      if (i == 0) {
        x = cos(map(j, 0, this.node_M_O[i].length-1, PI, TWO_PI-HALF_PI*0.25)) * (w/2.0);
        y = sin(map(j, 0, this.node_M_O[i].length-1, PI, TWO_PI-HALF_PI*0.25)) * ((this.H_M)/2.0);
      } else if (i == 1) {
        x = cos(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*0.25, TWO_PI-HALF_PI*0.25)) * (w/2.0);
        y = sin(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*0.25, TWO_PI-HALF_PI*0.25)) * ((this.H_M)/2.0);
      } else {
        x = cos(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*0.25, TWO_PI)) * (w/2.0);
        y = sin(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*0.25, TWO_PI)) * ((this.H_M)/2.0);
      }
      this.node_M_O[i][j] = createVector(x_move + x, y - this.H_rect*0.7, real(1));
    }
  }














  this.change = function() {
  };















  this.update = function() {
    this.begin.x += speed;

    this.H_pillar = easing_x(this.H_pillar, this.H_pillar_target, this.var_easing1);

    this.node_base[0] = this.begin.copy();
    this.node_base[1] = this.begin.copy().add(this.W_base, 0, 0);
    this.node_base[2] = this.begin.copy().add(this.W_base, 0, this.W_base);
    this.node_base[3] = this.begin.copy().add(0, 0, this.W_base);


    this.node_pillar[0] = this.begin.copy().add(this.W_base/2.0, 0, this.W_base/2.0);
    for (let i=1; i<this.node_pillar.length; i++) {
      this.node_pillar[i] = createVector(0, -this.H_pillar/this.node_pillar.length, 0);
      this.node_pillar[i] = PRotateZ(this.node_pillar[i], this.node_rotate[i]);
      this.node_pillar[i].add(this.node_pillar[i-1]);
    }


    this.node_rect[0] = createVector(-this.W_rect/2.0, -this.H_rect, 0);
    this.node_rect[1] = createVector(this.W_rect/2.0, -this.H_rect, 0);
    this.node_rect[2] = createVector(this.W_rect/2.0*0.95, 0, 0);
    this.node_rect[3] = createVector(-this.W_rect/2.0*0.95, 0, 0);
    for (let i=0; i<this.node_rect.length; i++) {
      this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
    }




    for (let i=0; i<this.node_M_E.length; i++) {
      const w = ((this.W_M - this.thick_M*4) / 3.0);
      const x_move = -this.W_M/2.0 + this.thick_M + w/2.0 + i*(w+this.thick_M);
      for (let j=0; j<this.node_M_E[i].length; j++) {
        const x = cos(map(j, 0, this.node_M_E[i].length-1, PI, TWO_PI)) * (w/2.0);
        const y = sin(map(j, 0, this.node_M_E[i].length-1, PI, TWO_PI)) * ((this.H_M-this.thick_M*1.5)/2.0);
        this.node_M_E[i][j] = createVector(x_move + x, y - this.H_rect*0.7, real(1));
        this.node_M_E[i][j] = PRotateZ(this.node_M_E[i][j], this.node_rotate[this.node_rotate.length-1]);
        this.node_M_E[i][j].add(this.node_pillar[this.node_pillar.length-1]);
      }
    }

    for (let i=0; i<this.node_M_O.length; i++) {
      const w = ((this.W_M + this.thick_M*2) / 3.0);
      const x_move = -this.W_M/2.0 + w/2.0 + i*(w-this.thick_M);
      for (let j=0; j<this.node_M_O[i].length; j++) {
        let x, y;
        const rate = 0.55;
        if (i == 0) {
          x = cos(map(j, 0, this.node_M_O[i].length-1, PI, TWO_PI-HALF_PI*rate)) * (w/2.0);
          y = sin(map(j, 0, this.node_M_O[i].length-1, PI, TWO_PI-HALF_PI*rate)) * ((this.H_M)/2.0);
        } else if (i == 1) {
          x = cos(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*rate, TWO_PI-HALF_PI*rate)) * (w/2.0);
          y = sin(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*rate, TWO_PI-HALF_PI*rate)) * ((this.H_M)/2.0);
        } else {
          x = cos(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*rate, TWO_PI)) * (w/2.0);
          y = sin(map(j, 0, this.node_M_O[i].length-1, PI+HALF_PI*rate, TWO_PI)) * ((this.H_M)/2.0);
        }
        this.node_M_O[i][j] = createVector(x_move + x, y - this.H_rect*0.7, real(1));
        this.node_M_O[i][j] = PRotateZ(this.node_M_O[i][j], this.node_rotate[this.node_rotate.length-1]);
        this.node_M_O[i][j].add(this.node_pillar[this.node_pillar.length-1]);
      }
    }
  };











  this.display = function() {
    let t;
    noStroke();
    beginShape();
    for (let i=0; i<this.node_base.length; i++) {
      if (i == 0) {
        t = constrain(map(this.node_base[i].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
      } else if (i == 2) {
        t = constrain(map(this.node_base[i].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
      }
      vertex(this.node_base[i].x, this.node_base[i].y, this.node_base[i].z);
    }
    endShape();

    noFill();
    strokeWeight(real(10));
    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    stroke(lerpColor(c_near, c_far, t));
    beginShape();
    for (let i=0; i<this.node_pillar.length; i++) {
      vertex(this.node_pillar[i].x, this.node_pillar[i].y, this.node_pillar[i].z);
    }
    endShape();



    noStroke();
    t = constrain(map(this.node_rect[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    beginShape();
    for (let i=0; i<this.node_rect.length; i++) {
      vertex(this.node_rect[i].x, this.node_rect[i].y, this.node_rect[i].z);
    }
    endShape();




    t = constrain(map(this.node_rect[0].z-real(1000), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    //strokeWeight(real(2));
    //t = constrain(map(this.node_rect[0].z, skyline.z, 0, 1, 0), 0, 1);
    //stroke(lerpColor(c_near, c_far, t));
    noStroke();
    beginShape(TRIANGLE_STRIP);
    for (let i=0; i<this.node_M_O.length; i++) {
      for (let j=0; j<this.node_M_O[i].length; j++) {
        vertex(this.node_M_O[i][j].x, this.node_M_O[i][j].y, this.node_M_O[i][j].z);
        vertex(this.node_M_E[i][j].x, this.node_M_E[i][j].y, this.node_M_E[i][j].z);
      }
    }
    endShape();
  };












  this.displayInfo = function() {
    noFill();
    strokeWeight(real(2));
    stroke(c_info2);
    beginShape(LINES);
    for (let i=0; i<this.node_base.length; i++) {
      vertex(this.node_base[i].x, this.node_base[i].y, this.node_base[i].z);
      vertex(this.node_base[(i+1)%this.node_base.length].x, this.node_base[(i+1)%this.node_base.length].y, this.node_base[(i+1)%this.node_base.length].z);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      vertex(this.node_pillar[i].x, this.node_pillar[i].y, this.node_pillar[i].z);
      vertex(this.node_pillar[i+1].x, this.node_pillar[i+1].y, this.node_pillar[i+1].z);
    }
    endShape();

    beginShape();
    for (let i=0; i<this.node_rect.length; i++) {
      vertex(this.node_rect[i].x, this.node_rect[i].y, this.node_rect[i].z);
    }
    endShape(CLOSE);


    beginShape();
    for (let i=0; i<this.node_M_E.length; i++) {
      for (let j=0; j<this.node_M_E[i].length; j++) {
        vertex(this.node_M_E[i][j].x, this.node_M_E[i][j].y, this.node_M_E[i][j].z);
      }
    }
    for (let i=this.node_M_O.length-1; i>=0; i--) {
      for (let j=this.node_M_O[i].length-1; j>=0; j--) {
        vertex(this.node_M_O[i][j].x, this.node_M_O[i][j].y, this.node_M_O[i][j].z);
      }
    }
    endShape(CLOSE);
  };
}
