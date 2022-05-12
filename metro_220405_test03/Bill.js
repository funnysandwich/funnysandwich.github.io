//------------------------------------------------------------------------
//------------------------------⬇ Bill_Mc ⬇---------------------------
//------------------------------------------------------------------------

function Bill_Mc(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(10));
    }




    t = constrain(map(this.node_rect[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_rect[0], this.node_rect[1], this.node_rect[2], this.node_rect[3]);




    t = constrain(map(this.node_rect[0].z-real(1000), skyline.z, 0, 1, 0), 0, 0.95);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_M_O.length; i++) {
      for (let j=0; j<this.node_M_O[i].length; j++) {
        if (j < this.node_M_O[i].length-1) {
          TRIANGLES_getRect(this.node_M_O[i][j], this.node_M_E[i][j], this.node_M_E[i][j+1], this.node_M_O[i][j+1]);
        } else if (i < this.node_M_O.length-1) {
          TRIANGLES_getRect(this.node_M_O[i][j], this.node_M_E[i][j], this.node_M_E[i+1][0], this.node_M_O[i+1][0]);
        }
      }
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<this.node_rect.length; i++) {
      LINES_getLine(this.node_rect[i], this.node_rect[(i+1)%this.node_rect.length]);
    }


    for (let i=0; i<this.node_M_E.length; i++) {
      for (let j=0; j<this.node_M_E[i].length; j++) {
        if (j < this.node_M_E[i].length-1) {
          LINES_getLine(this.node_M_E[i][j], this.node_M_E[i][j+1]);
        } else if (i < this.node_M_E.length-1) {
          LINES_getLine(this.node_M_E[i][j], this.node_M_E[i+1][0]);
        } else {
          LINES_getLine(this.node_M_E[i][j], this.node_M_O[i][j]);
        }
      }
    }
    for (let i=this.node_M_O.length-1; i>=0; i--) {
      for (let j=this.node_M_O[i].length-1; j>=0; j--) {
        if (j > 0) {
          LINES_getLine(this.node_M_O[i][j], this.node_M_O[i][j-1]);
        } else if (i > 0) {
          LINES_getLine(this.node_M_O[i][j], this.node_M_O[i-1][this.node_M_O[i-1].length-1]);
        } else {
          LINES_getLine(this.node_M_E[i][j], this.node_M_O[i][j]);
        }
      }
    }
  };
}


//------------------------------------------------------------------------
//------------------------------⬆ Bill_Mc ⬆------------------------------
//------------------------------------------------------------------------













//--------------------------------------------------------------------------
//------------------------------⬇ Bill_Youbetu ⬇---------------------------
//--------------------------------------------------------------------------

function Bill_Youbetu(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
  this.W_rect = real(random(75, 100));
  this.H_rect = this.W_rect * random(0.5, 0.75);
  this.W_fillet_rect = this.W_rect * random(0.05, 0.15);
  this.H_pillar_target = real(random(400, map(max(index_z, 1), 1, 5, 500, 1500)));
  this.H_pillar = 0;
  this.W_triangle = this.H_rect * random(0.5, 0.8);
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



  this.node_rect = new Array(8);
  this.node_rect[0] = createVector(-this.W_rect/2.0, -this.H_rect+this.W_fillet_rect, 0);
  this.node_rect[1] = createVector(-this.W_rect/2.0+this.W_fillet_rect, -this.H_rect, 0);
  this.node_rect[2] = createVector(this.W_rect/2.0-this.W_fillet_rect, -this.H_rect, 0);
  this.node_rect[3] = createVector(this.W_rect/2.0, -this.H_rect+this.W_fillet_rect, 0);
  this.node_rect[4] = createVector(this.W_rect/2.0, -this.W_fillet_rect, 0);
  this.node_rect[5] = createVector(this.W_rect/2.0-this.W_fillet_rect, 0, 0);
  this.node_rect[6] = createVector(-this.W_rect/2.0+this.W_fillet_rect, 0, 0);
  this.node_rect[7] = createVector(-this.W_rect/2.0, -this.W_fillet_rect, 0);
  for (let i=0; i<this.node_rect.length; i++) {
    this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
  }




  this.node_triangle = new Array(3);
  for (let i=0; i<this.node_triangle.length; i++) {
    const x = cos(map(i, 0, this.node_triangle.length, 0, TWO_PI) + PI) * this.W_triangle*0.5;
    const y = sin(map(i, 0, this.node_triangle.length, 0, TWO_PI) + PI) * this.W_triangle*0.5 * 0.8;
    this.node_triangle[i] = createVector(x, y, real(1)).add(p5.Vector.add(this.node_rect[0], this.node_rect[4]).mult(0.5));
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


    this.node_rect[0] = createVector(-this.W_rect/2.0, -this.H_rect+this.W_fillet_rect, 0);
    this.node_rect[1] = createVector(-this.W_rect/2.0+this.W_fillet_rect, -this.H_rect, 0);
    this.node_rect[2] = createVector(this.W_rect/2.0-this.W_fillet_rect, -this.H_rect, 0);
    this.node_rect[3] = createVector(this.W_rect/2.0, -this.H_rect+this.W_fillet_rect, 0);
    this.node_rect[4] = createVector(this.W_rect/2.0, -this.W_fillet_rect, 0);
    this.node_rect[5] = createVector(this.W_rect/2.0-this.W_fillet_rect, 0, 0);
    this.node_rect[6] = createVector(-this.W_rect/2.0+this.W_fillet_rect, 0, 0);
    this.node_rect[7] = createVector(-this.W_rect/2.0, -this.W_fillet_rect, 0);
    for (let i=0; i<this.node_rect.length; i++) {
      this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
    }




    for (let i=0; i<this.node_triangle.length; i++) {
      const x = cos(map(i, 0, this.node_triangle.length, 0, TWO_PI) + PI) * this.W_triangle*0.5;
      const y = sin(map(i, 0, this.node_triangle.length, 0, TWO_PI) + PI) * this.W_triangle*0.5 * 0.8;
      this.node_triangle[i] = createVector(x, y, real(1)).add(p5.Vector.add(this.node_rect[0], this.node_rect[4]).mult(0.5));
    }
  };



  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(10));
    }




    t = constrain(map(this.node_rect[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_rect[0], this.node_rect[1], this.node_rect[2], this.node_rect[3]);
    TRIANGLES_getRect(this.node_rect[0], this.node_rect[3], this.node_rect[4], this.node_rect[7]);
    TRIANGLES_getRect(this.node_rect[7], this.node_rect[4], this.node_rect[5], this.node_rect[6]);



    t = constrain(map(this.node_rect[0].z-real(2000), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getTriangle(this.node_triangle[0], this.node_triangle[1], this.node_triangle[2]);
  };




  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<this.node_rect.length; i++) {
      LINES_getLine(this.node_rect[i], this.node_rect[(i+1)%this.node_rect.length]);
    }
  };
}
//-----------------------------------------------------------------------------
//------------------------------⬆ Bill_Youbetu ⬆------------------------------
//-----------------------------------------------------------------------------











//------------------------------------------------------------------------
//------------------------------⬇ Bill_Tezos ⬇---------------------------
//------------------------------------------------------------------------


function Bill_Tezos(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
  this.W_rect = real(random(75, 100));
  this.H_rect = this.W_rect * random(0.25, 0.45);
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




  this.var_scale = random(0.7, 1.35);

  this.node_xtz = new Array(node_tezos.length);
  for (let i=0; i<this.node_xtz.length; i++) {
    this.node_xtz[i] = createVector(real(node_tezos[i][0]), real(node_tezos[i][1]), 0);
    this.node_xtz[i].add(-real(50+10), -real(90), 0);
    this.node_xtz[i].mult(this.var_scale);
    this.node_xtz[i] = PRotateZ(this.node_xtz[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_xtz[i].add(this.node_pillar[this.node_pillar.length-1]);
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




    for (let i=0; i<this.node_xtz.length; i++) {
      this.node_xtz[i] = createVector(real(node_tezos[i][0]), real(node_tezos[i][1]), 0);
      this.node_xtz[i].add(-real(50+10), -real(90), 0);
      this.node_xtz[i].mult(this.var_scale);
      this.node_xtz[i] = PRotateZ(this.node_xtz[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_xtz[i].add(this.node_pillar[this.node_pillar.length-1]);
    }
  };





  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(7));
    }






    TRIANGLES_getRect(this.node_xtz[0], this.node_xtz[1], this.node_xtz[2], this.node_xtz[7]);
    TRIANGLES_getRect(this.node_xtz[2], this.node_xtz[5], this.node_xtz[6], this.node_xtz[7]);
    TRIANGLES_getTriangle(this.node_xtz[3], this.node_xtz[4], this.node_xtz[5]);

    TRIANGLES_getRect(this.node_xtz[8], this.node_xtz[9], this.node_xtz[24], this.node_xtz[25]);
    TRIANGLES_getTriangle(this.node_xtz[24], this.node_xtz[9], this.node_xtz[23]);
    TRIANGLES_getTriangle(this.node_xtz[23], this.node_xtz[10], this.node_xtz[11]);
    TRIANGLES_getTriangle(this.node_xtz[22], this.node_xtz[11], this.node_xtz[21]);
    TRIANGLES_getRect(this.node_xtz[21], this.node_xtz[11], this.node_xtz[12], this.node_xtz[20]);
    TRIANGLES_getTriangle(this.node_xtz[19], this.node_xtz[20], this.node_xtz[12]);
    TRIANGLES_getTriangle(this.node_xtz[14], this.node_xtz[12], this.node_xtz[13]);
    TRIANGLES_getTriangle(this.node_xtz[15], this.node_xtz[19], this.node_xtz[14]);
    TRIANGLES_getRect(this.node_xtz[16], this.node_xtz[17], this.node_xtz[18], this.node_xtz[15]);
  };




  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }


    for (let i=0; i<8; i++) {
      LINES_getLine(this.node_xtz[i], this.node_xtz[(i+1)%8]);
    }
    for (let i=8; i<26-1; i++) {
      LINES_getLine(this.node_xtz[i], this.node_xtz[i+1]);
    }
  };
}


//------------------------------------------------------------------------
//------------------------------⬆ Bill_Tezos ⬆---------------------------
//------------------------------------------------------------------------















//------------------------------------------------------------------------
//------------------------------⬇ Bill_Message ⬇---------------------------
//------------------------------------------------------------------------

function Bill_Message(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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







  this.num_message = floor(random(1.5, map(index_z, 0, 5, 4, 7)));
  this.node_message = Array.from(Array(this.num_message), () => new Array(8));
  this.node_corner = new Array(this.num_message);
  this.W_message = new Array(this.num_message);
  this.H_message = new Array(this.num_message);
  this.Y_message = new Array(this.num_message);
  this.X_message = new Array(this.num_message);
  this.W_fillet_message = new Array(this.num_message);

  for (let i=0; i<this.node_message.length; i++) {
    this.W_message[i] = real(random(75, 120));
    this.H_message[i] = this.W_message[i] * random(0.2, 0.8);
    this.W_fillet_message[i] = min(this.W_message[i], this.H_message[i]) * random(0.15, 0.2);
    if (i == 0) {
      this.Y_message[i] = 0;
    } else {
      this.Y_message[i] = this.Y_message[i-1] + this.H_message[i-1]/2.0 + this.H_message[i]/2.0 + real(12);
    }
    if (random(1) < 0.5) {
      this.X_message[i] = real(random(15, 20));
    } else {
      this.X_message[i] = -real(random(15, 20));
    }

    this.node_message[i][0] = createVector(-this.W_message[i]/2.0, -this.H_message[i]/2.0+this.W_fillet_message[i], 0);
    this.node_message[i][1] = createVector(-this.W_message[i]/2.0+this.W_fillet_message[i], -this.H_message[i]/2.0, 0);
    this.node_message[i][2] = createVector(this.W_message[i]/2.0-this.W_fillet_message[i], -this.H_message[i]/2.0, 0);
    this.node_message[i][3] = createVector(this.W_message[i]/2.0, -this.H_message[i]/2.0+this.W_fillet_message[i], 0);
    this.node_message[i][4] = createVector(this.W_message[i]/2.0, this.H_message[i]/2.0-this.W_fillet_message[i], 0);
    this.node_message[i][5] = createVector(this.W_message[i]/2.0-this.W_fillet_message[i], this.H_message[i]/2.0, 0);
    this.node_message[i][6] = createVector(-this.W_message[i]/2.0+this.W_fillet_message[i], this.H_message[i]/2.0, 0);
    this.node_message[i][7] = createVector(-this.W_message[i]/2.0, this.H_message[i]/2.0-this.W_fillet_message[i], 0);
  }

  for (let i=0; i<this.node_message.length; i++) {
    for (let j=0; j<8; j++) {
      this.node_message[i][j].add(this.X_message[i], 0, 0);
      this.node_message[i][j] = PRotateZ(this.node_message[i][j], this.node_rotate[this.node_rotate.length-1]);
      this.node_message[i][j].add(this.node_pillar[this.node_pillar.length-1]);
      this.node_message[i][j].add(0, this.Y_message[i], real(1));
    }
    if (this.X_message[i] > 0) {
      this.node_corner[i] = p5.Vector.sub(this.node_message[i][5], this.node_message[i][1]).mult(0.2).add(this.node_message[i][5]);
    } else {
      this.node_corner[i] = p5.Vector.sub(this.node_message[i][6], this.node_message[i][2]).mult(0.2).add(this.node_message[i][6]);
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





    for (let i=0; i<this.node_message.length; i++) {
      this.node_message[i][0] = createVector(-this.W_message[i]/2.0, -this.H_message[i]/2.0+this.W_fillet_message[i], 0);
      this.node_message[i][1] = createVector(-this.W_message[i]/2.0+this.W_fillet_message[i], -this.H_message[i]/2.0, 0);
      this.node_message[i][2] = createVector(this.W_message[i]/2.0-this.W_fillet_message[i], -this.H_message[i]/2.0, 0);
      this.node_message[i][3] = createVector(this.W_message[i]/2.0, -this.H_message[i]/2.0+this.W_fillet_message[i], 0);
      this.node_message[i][4] = createVector(this.W_message[i]/2.0, this.H_message[i]/2.0-this.W_fillet_message[i], 0);
      this.node_message[i][5] = createVector(this.W_message[i]/2.0-this.W_fillet_message[i], this.H_message[i]/2.0, 0);
      this.node_message[i][6] = createVector(-this.W_message[i]/2.0+this.W_fillet_message[i], this.H_message[i]/2.0, 0);
      this.node_message[i][7] = createVector(-this.W_message[i]/2.0, this.H_message[i]/2.0-this.W_fillet_message[i], 0);

      for (let j=0; j<8; j++) {
        this.node_message[i][j].add(this.X_message[i], 0, 0);
        this.node_message[i][j] = PRotateZ(this.node_message[i][j], this.node_rotate[this.node_rotate.length-1]);
        this.node_message[i][j].add(this.node_pillar[this.node_pillar.length-1]);
        this.node_message[i][j].add(0, this.Y_message[i], real(1));
      }

      if (this.X_message[i] > 0) {
        this.node_corner[i] = p5.Vector.sub(this.node_message[i][4], this.node_message[i][0]).mult(0.15).add(this.node_message[i][5]);
      } else {
        this.node_corner[i] = p5.Vector.sub(this.node_message[i][7], this.node_message[i][3]).mult(0.15).add(this.node_message[i][6]);
      }
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }





    for (let i=0; i<this.node_message.length; i++) {
      if (this.X_message[i] > 0) {
        t = constrain(map(this.node_message[0][0].z+real(500), skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getTriangle(this.node_message[i][4], this.node_message[i][5], this.node_corner[i]);
      } else {
        t = constrain(map(this.node_message[0][0].z-real(500), skyline.z, 0, 1, 0), 0, 0.95);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getTriangle(this.node_message[i][7], this.node_message[i][6], this.node_corner[i]);
      }
      TRIANGLES_getRect(this.node_message[i][0], this.node_message[i][1], this.node_message[i][2], this.node_message[i][3]);
      TRIANGLES_getRect(this.node_message[i][0], this.node_message[i][3], this.node_message[i][4], this.node_message[i][7]);
      TRIANGLES_getRect(this.node_message[i][7], this.node_message[i][4], this.node_message[i][5], this.node_message[i][6]);
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<this.node_message.length; i++) {
      for (let j=0; j<8; j++) {
        if (this.X_message[i] > 0) {
          if (j == 4) {
            LINES_getLine(this.node_message[i][4], this.node_corner[i]);
            LINES_getLine(this.node_message[i][5], this.node_corner[i]);
          } else {
            LINES_getLine(this.node_message[i][j], this.node_message[i][(j+1)%8]);
          }
        } else {
          if (j == 6) {
            LINES_getLine(this.node_message[i][6], this.node_corner[i]);
            LINES_getLine(this.node_message[i][7], this.node_corner[i]);
          } else {
            LINES_getLine(this.node_message[i][j], this.node_message[i][(j+1)%8]);
          }
        }
      }
    }
  };
}


//--------------------------------------------------------------------------
//------------------------------⬆ Bill_Message ⬆---------------------------
//--------------------------------------------------------------------------














//------------------------------------------------------------------------
//------------------------------⬇ Bill_Like ⬇---------------------------
//------------------------------------------------------------------------

function Bill_Like(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
  this.H_pillar_target = real(random(400, map(max(index_z, 1), 1, 5, 500, 1500)));
  this.H_pillar = 0;
  this.var_scale = random(0.7, 1.35);
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








  this.node_like_O = new Array(8);
  this.node_like_E = new Array(8);
  for (let i=0; i<this.node_like_O.length; i++) {
    this.node_like_O[i] = createVector(real(node_like[i][0]), real(node_like[i][1]), 0);
    this.node_like_E[i] = createVector(real(node_like[i+this.node_like_O.length][0]), real(node_like[i+this.node_like_O.length][1]), 0);

    this.node_like_O[i].add(-real(50), -real(100-19.5), 0);
    this.node_like_E[i].add(-real(50), -real(100-19.5), 0);
    this.node_like_O[i].mult(this.var_scale);
    this.node_like_E[i].mult(this.var_scale);
    this.node_like_O[i] = PRotateZ(this.node_like_O[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_like_E[i] = PRotateZ(this.node_like_E[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_like_O[i].add(this.node_pillar[this.node_pillar.length-1]);
    this.node_like_E[i].add(this.node_pillar[this.node_pillar.length-1]);
  }



  this.open_like = false;
  this.time_like = 0;





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





    for (let i=0; i<this.node_like_O.length; i++) {
      this.node_like_O[i] = createVector(real(node_like[i][0]), real(node_like[i][1]), 0);
      this.node_like_E[i] = createVector(real(node_like[i+this.node_like_O.length][0]), real(node_like[i+this.node_like_O.length][1]), 0);

      this.node_like_O[i].add(-real(50), -real(100-19.5), 0);
      this.node_like_E[i].add(-real(50), -real(100-19.5), 0);
      this.node_like_O[i].mult(this.var_scale * map(sin(map(this.time_like, 0, 7, 0, PI)), 0, 1, 1.0, 1.5));
      this.node_like_E[i].mult(this.var_scale);
      this.node_like_O[i] = PRotateZ(this.node_like_O[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_like_E[i] = PRotateZ(this.node_like_E[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_like_O[i].add(this.node_pillar[this.node_pillar.length-1]);
      this.node_like_E[i].add(this.node_pillar[this.node_pillar.length-1]);
    }




    let screen_center = screenPosition(p5.Vector.add(this.node_like_O[5], this.node_like_O[7]).mult(0.5));
    let screen_w = p5.Vector.dist(screen_center, screenPosition(this.node_like_O[0]));

    if (dist(mouseX, mouseY, screen_center.x+width/2, screen_center.y+height/2) < screen_w*2) {
      this.open_like = true;
    } else {
      this.open_like = false;
      this.time_like = 0;
    }

    if (this.open_like) {
      if (this.time_like < 7) {
        this.time_like ++;
      }
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }


    for (let i=0; i<this.node_like_O.length; i++) {
      TRIANGLES_getRect(this.node_like_O[i], this.node_like_E[i], this.node_like_E[(i+1)%this.node_like_E.length], this.node_like_O[(i+1)%this.node_like_O.length]);
    }


    if (this.open_like) {
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[3], this.node_like_E[4]);
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[4], this.node_like_E[5]);
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[5], this.node_like_E[6]);
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[1], this.node_like_E[0]);
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[0], this.node_like_E[7]);
      TRIANGLES_getTriangle(this.node_like_E[2], this.node_like_E[7], this.node_like_E[6]);
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }


    for (let i=0; i<this.node_like_O.length; i++) {
      LINES_getLine(this.node_like_O[i], this.node_like_O[(i+1)%this.node_like_O.length]);
      LINES_getLine(this.node_like_E[i], this.node_like_E[(i+1)%this.node_like_E.length]);
    }
  };
}

//--------------------------------------------------------------------------
//------------------------------⬆ Bill_Like ⬆-----------------------------
//--------------------------------------------------------------------------





















//-------------------------------------------------------------------------------
//------------------------------⬇ Bill_CannotReturn ⬇--------------------------
//-------------------------------------------------------------------------------

function Bill_CannotReturn(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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




  this.var_scale = random(0.65, 1.35);

  this.node_sign = new Array(node_CTReturn.length);
  for (let i=0; i<this.node_sign.length; i++) {
    this.node_sign[i] = createVector(real(node_CTReturn[i][0]), real(node_CTReturn[i][1]), 0);
    this.node_sign[i].add(-real(50), -real(100-20), real(1));
    if (i < 32) {
      this.node_sign[i].z += real(1);
    }
    if (i < 20) {
      this.node_sign[i].z += real(1);
    }
    this.node_sign[i].mult(this.var_scale);
    this.node_sign[i] = PRotateZ(this.node_sign[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_sign[i].add(this.node_pillar[this.node_pillar.length-1]);
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


    for (let i=0; i<this.node_sign.length; i++) {
      this.node_sign[i] = createVector(real(node_CTReturn[i][0]), real(node_CTReturn[i][1]), 0);
      this.node_sign[i].add(-real(50), -real(100-20), real(1));
      if (i < 32) {
        this.node_sign[i].z += real(1);
      }
      if (i < 20) {
        this.node_sign[i].z += real(1);
      }
      this.node_sign[i].mult(this.var_scale);
      this.node_sign[i] = PRotateZ(this.node_sign[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_sign[i].add(this.node_pillar[this.node_pillar.length-1]);
    }
  };




  this.display = function() {
    let t, c1, c2;
    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);


    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }


    TRIANGLES_getRect(this.node_sign[33], this.node_sign[34], this.node_sign[35], this.node_sign[32]);
    TRIANGLES_getRect(this.node_sign[32], this.node_sign[35], this.node_sign[36], this.node_sign[39]);
    TRIANGLES_getRect(this.node_sign[39], this.node_sign[36], this.node_sign[37], this.node_sign[38]);

    TRIANGLES_getTriangle(this.node_sign[0], this.node_sign[1], this.node_sign[2]);
    TRIANGLES_getTriangle(this.node_sign[0], this.node_sign[3], this.node_sign[19]);
    TRIANGLES_getTriangle(this.node_sign[19], this.node_sign[17], this.node_sign[18]);
    TRIANGLES_getTriangle(this.node_sign[3], this.node_sign[16], this.node_sign[17]);
    TRIANGLES_getTriangle(this.node_sign[4], this.node_sign[15], this.node_sign[16]);
    TRIANGLES_getTriangle(this.node_sign[5], this.node_sign[14], this.node_sign[15]);
    TRIANGLES_getTriangle(this.node_sign[6], this.node_sign[10], this.node_sign[14]);
    TRIANGLES_getRect(this.node_sign[8], this.node_sign[9], this.node_sign[10], this.node_sign[7]);
    TRIANGLES_getRect(this.node_sign[10], this.node_sign[11], this.node_sign[12], this.node_sign[13]);

    t = constrain(map(this.node_sign[0].z, skyline.z+real(2000), 0, 1, 0), 0.35, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_sign[20], this.node_sign[21], this.node_sign[22], this.node_sign[25]);
    TRIANGLES_getRect(this.node_sign[25], this.node_sign[22], this.node_sign[23], this.node_sign[24]);
    TRIANGLES_getRect(this.node_sign[26], this.node_sign[27], this.node_sign[28], this.node_sign[31]);
    TRIANGLES_getRect(this.node_sign[31], this.node_sign[28], this.node_sign[29], this.node_sign[30]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }
    for (let i=0; i<19; i++) {
      LINES_getLine(this.node_sign[i], this.node_sign[i+1]);
    }
    LINES_getLine(this.node_sign[19], this.node_sign[0]);
    for (let i=32; i<39; i++) {
      LINES_getLine(this.node_sign[i], this.node_sign[i+1]);
    }
    LINES_getLine(this.node_sign[39], this.node_sign[32]);
  };
}


//----------------------------------------------------------------------------------
//------------------------------⬆ Bill_CannotReturn ⬆-----------------------------
//----------------------------------------------------------------------------------
















//------------------------------------------------------------------------
//------------------------------⬇ Bill_Call ⬇---------------------------
//------------------------------------------------------------------------

function Bill_Call(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.W_ellipse = real(random(90, 125)) * map(index_z, 0, 5, 1.0, 1.25);
  this.node_ellipse = new Array(8);
  for (let i=0; i<this.node_ellipse.length; i++) {
    const x = cos(map(i, 0, this.node_ellipse.length, 0, TWO_PI)) * this.W_ellipse/2.0;
    const y = sin(map(i, 0, this.node_ellipse.length, 0, TWO_PI)) * this.W_ellipse/2.0;
    this.node_ellipse[i] = createVector(x, y, real(1));
    this.node_ellipse[i] = PRotateZ(this.node_ellipse[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_ellipse[i].add(this.node_pillar[this.node_pillar.length-1]);
  }


  this.node_phone = new Array(node_call.length);
  for (let i=0; i<this.node_phone.length; i++) {
    this.node_phone[i] = createVector(real(node_call[i][0]), real(node_call[i][1]), 0);
    this.node_phone[i].add(-real(50), -real(50), real(2));
    this.node_phone[i].mult(this.W_ellipse/real(100.0));
    this.node_phone[i] = PRotateZ(this.node_phone[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_phone[i].add(this.node_pillar[this.node_pillar.length-1]);
  }



  this.open_call = true;
  this.var_rotate = sin(this.ran + frameCount*1.0)*0.15;






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

    for (let i=0; i<this.node_ellipse.length; i++) {
      const x = cos(map(i, 0, this.node_ellipse.length, 0, TWO_PI)) * this.W_ellipse/2.0;
      const y = sin(map(i, 0, this.node_ellipse.length, 0, TWO_PI)) * this.W_ellipse/2.0;
      this.node_ellipse[i] = createVector(x, y, real(1));
      this.node_ellipse[i] = PRotateZ(this.node_ellipse[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_ellipse[i].add(this.node_pillar[this.node_pillar.length-1]);
    }



    if (this.open_call) {
      this.var_rotate = sin(this.ran + frameCount*1.0)*0.15;
    } else {
      this.var_rotate = easing_x(this.var_rotate, HALF_PI/2.0*3.0, 0.2);
    }



    for (let i=0; i<this.node_phone.length; i++) {
      this.node_phone[i] = createVector(real(node_call[i][0]), real(node_call[i][1]), 0);
      this.node_phone[i].add(-real(50), -real(50), real(2));
      this.node_phone[i].mult(this.W_ellipse/real(100.0));
      this.node_phone[i] = PRotateZ(this.node_phone[i], this.node_rotate[this.node_rotate.length-1] + this.var_rotate);
      this.node_phone[i].add(this.node_pillar[this.node_pillar.length-1]);
    }




    let screen_center = screenPosition(p5.Vector.add(this.node_ellipse[0], this.node_ellipse[4]).mult(0.5));
    let screen_w = p5.Vector.dist(screen_center, screenPosition(this.node_ellipse[0]));

    if (dist(mouseX, mouseY, screen_center.x+width/2, screen_center.y+height/2) < screen_w*2.0) {
      this.open_call = false;
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(10));
    }



    t = constrain(map(this.node_ellipse[0].z-real(1000), skyline.z, 0, 1, 0), 0, 0.92);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_ellipse[5], this.node_ellipse[6], this.node_ellipse[7], this.node_ellipse[4]);
    TRIANGLES_getRect(this.node_ellipse[4], this.node_ellipse[7], this.node_ellipse[0], this.node_ellipse[3]);
    TRIANGLES_getRect(this.node_ellipse[3], this.node_ellipse[0], this.node_ellipse[1], this.node_ellipse[2]);



    t = constrain(map(this.node_phone[0].z-real(2000), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_sky, c_sky_near, 0.25));
    TRIANGLES_getRect(this.node_phone[0], this.node_phone[1], this.node_phone[2], this.node_phone[3]);
    TRIANGLES_getRect(this.node_phone[0], this.node_phone[7], this.node_phone[8], this.node_phone[9]);
    TRIANGLES_getRect(this.node_phone[4], this.node_phone[5], this.node_phone[6], this.node_phone[7]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<this.node_ellipse.length; i++) {
      LINES_getLine(this.node_ellipse[i], this.node_ellipse[(i+1)%this.node_ellipse.length]);
    }

    for (let i=0; i<this.node_phone.length; i++) {
      LINES_getLine(this.node_phone[i], this.node_phone[(i+1)%this.node_phone.length]);
    }
  };
}


//--------------------------------------------------------------------------
//------------------------------⬆ Bill_Call ⬆------------------------------
//--------------------------------------------------------------------------
















//------------------------------------------------------------------------
//------------------------------⬇ Bill_Power ⬇---------------------------
//------------------------------------------------------------------------

function Bill_Power(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.node_battery = new Array(node_power.length);
  for (let i=0; i<this.node_battery.length; i++) {
    this.node_battery[i] = createVector(real(node_power[i][0]), real(node_power[i][1]), 0);
    this.node_battery[i].add(-real(50), -real(100-32), real(1));
    this.node_battery[i] = PRotateZ(this.node_battery[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_battery[i].add(this.node_pillar[this.node_pillar.length-1]);
  }


  this.node_electricity = new Array(4);
  this.node_electricity[0] = p5.Vector.sub(this.node_battery[9], this.node_battery[0]).mult(0.5).add(this.node_battery[9]);
  this.node_electricity[3] = p5.Vector.sub(this.node_battery[8], this.node_battery[7]).mult(0.5).add(this.node_battery[8]);
  this.var_electricity = random(1, 5);
  this.node_electricity[1] = p5.Vector.add(this.node_electricity[0], p5.Vector.sub(this.node_battery[3], this.node_battery[2]).mult(this.var_electricity));
  this.node_electricity[2] = p5.Vector.add(this.node_electricity[3], p5.Vector.sub(this.node_battery[3], this.node_battery[2]).mult(this.var_electricity));





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


    for (let i=0; i<this.node_battery.length; i++) {
      this.node_battery[i] = createVector(real(node_power[i][0]), real(node_power[i][1]), 0);
      this.node_battery[i].add(-real(50), -real(100-32), real(1));
      this.node_battery[i] = PRotateZ(this.node_battery[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_battery[i].add(this.node_pillar[this.node_pillar.length-1]);
    }


    this.node_electricity[0] = p5.Vector.sub(this.node_battery[9], this.node_battery[0]).mult(0.5).add(this.node_battery[9]);
    this.node_electricity[3] = p5.Vector.sub(this.node_battery[8], this.node_battery[7]).mult(0.5).add(this.node_battery[8]);
    this.node_electricity[1] = p5.Vector.add(this.node_electricity[0], p5.Vector.sub(this.node_battery[3], this.node_battery[2]).mult(this.var_electricity));
    this.node_electricity[2] = p5.Vector.add(this.node_electricity[3], p5.Vector.sub(this.node_battery[3], this.node_battery[2]).mult(this.var_electricity));
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }


    TRIANGLES_getRect(this.node_battery[0], this.node_battery[1], this.node_battery[10], this.node_battery[9]);
    TRIANGLES_getRect(this.node_battery[10], this.node_battery[1], this.node_battery[6], this.node_battery[11]);
    TRIANGLES_getRect(this.node_battery[2], this.node_battery[3], this.node_battery[4], this.node_battery[5]);
    TRIANGLES_getRect(this.node_battery[8], this.node_battery[11], this.node_battery[6], this.node_battery[7]);
    TRIANGLES_getRect(this.node_battery[0], this.node_battery[9], this.node_battery[8], this.node_battery[7]);


    t = constrain(map(this.node_electricity[0].z+real(1000), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_winFrame, c_far, t));
    TRIANGLES_getRect(this.node_electricity[0], this.node_electricity[1], this.node_electricity[2], this.node_electricity[3]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }
    for (let i=0; i<8-1; i++) {
      LINES_getLine(this.node_battery[i], this.node_battery[i+1]);
    }
    LINES_getLine(this.node_battery[7], this.node_battery[0]);
  };
}


//---------------------------------------------------------------------------
//------------------------------⬆ Bill_Power ⬆------------------------------
//---------------------------------------------------------------------------






















//--------------------------------------------------------------------------
//------------------------------⬇ Bill_Bitcoin ⬇---------------------------
//--------------------------------------------------------------------------

function Bill_Bitcoin(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.var_scale = random(0.8, 1.35);

  this.node_BTC = new Array(node_bitcoin.length);
  for (let i=0; i<this.node_BTC.length; i++) {
    this.node_BTC[i] = createVector(real(node_bitcoin[i][0]), real(node_bitcoin[i][1]), 0);
    this.node_BTC[i].add(-real(54.072), -real(100-5), 0);
    this.node_BTC[i].mult(this.var_scale);
    this.node_BTC[i] = PRotateZ(this.node_BTC[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_BTC[i].add(this.node_pillar[this.node_pillar.length-1]);
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


    for (let i=0; i<this.node_BTC.length; i++) {
      this.node_BTC[i] = createVector(real(node_bitcoin[i][0]), real(node_bitcoin[i][1]), 0);
      this.node_BTC[i].add(-real(54.072), -real(100-5), 0);
      this.node_BTC[i].mult(this.var_scale);
      this.node_BTC[i] = PRotateZ(this.node_BTC[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_BTC[i].add(this.node_pillar[this.node_pillar.length-1]);
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(7));
    }


    TRIANGLES_getRect(this.node_BTC[0], this.node_BTC[1], this.node_BTC[25], this.node_BTC[26]);
    TRIANGLES_getTriangle(this.node_BTC[1], this.node_BTC[2], this.node_BTC[3]);
    TRIANGLES_getRect(this.node_BTC[25], this.node_BTC[3], this.node_BTC[36], this.node_BTC[24]);
    TRIANGLES_getTriangle(this.node_BTC[4], this.node_BTC[5], this.node_BTC[27]);
    TRIANGLES_getTriangle(this.node_BTC[6], this.node_BTC[7], this.node_BTC[5]);
    TRIANGLES_getTriangle(this.node_BTC[27], this.node_BTC[7], this.node_BTC[28]);
    TRIANGLES_getTriangle(this.node_BTC[28], this.node_BTC[8], this.node_BTC[29]);
    TRIANGLES_getTriangle(this.node_BTC[30], this.node_BTC[29], this.node_BTC[11]);
    TRIANGLES_getRect(this.node_BTC[8], this.node_BTC[9], this.node_BTC[10], this.node_BTC[11]);
    TRIANGLES_getRect(this.node_BTC[31], this.node_BTC[30], this.node_BTC[11], this.node_BTC[34]);
    TRIANGLES_getTriangle(this.node_BTC[31], this.node_BTC[33], this.node_BTC[32]);
    TRIANGLES_getTriangle(this.node_BTC[11], this.node_BTC[12], this.node_BTC[13]);
    TRIANGLES_getTriangle(this.node_BTC[34], this.node_BTC[13], this.node_BTC[14]);
    TRIANGLES_getTriangle(this.node_BTC[14], this.node_BTC[15], this.node_BTC[16]);
    TRIANGLES_getTriangle(this.node_BTC[17], this.node_BTC[37], this.node_BTC[16]);
    TRIANGLES_getTriangle(this.node_BTC[23], this.node_BTC[35], this.node_BTC[37]);
    TRIANGLES_getTriangle(this.node_BTC[23], this.node_BTC[17], this.node_BTC[22]);
    TRIANGLES_getRect(this.node_BTC[21], this.node_BTC[18], this.node_BTC[19], this.node_BTC[20]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<27-1; i++) {
      LINES_getLine(this.node_BTC[i], this.node_BTC[i+1]);
    }
    LINES_getLine(this.node_BTC[26], this.node_BTC[0]);
  };
}


//-----------------------------------------------------------------------------
//------------------------------⬆ Bill_Bitcoin ⬆------------------------------
//-----------------------------------------------------------------------------





















//---------------------------------------------------------------------------
//------------------------------⬇ Bill_Ethereum ⬇---------------------------
//---------------------------------------------------------------------------

function Bill_Ethereum(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.var_scale = random(0.8, 1.35);

  this.node_ETH = new Array(node_ethereum.length);
  for (let i=0; i<this.node_ETH.length; i++) {
    this.node_ETH[i] = createVector(real(node_ethereum[i][0]), real(node_ethereum[i][1]), 0);
    this.node_ETH[i].add(-real(50), -real(100-18), real(1));
    this.node_ETH[i].mult(this.var_scale);
    this.node_ETH[i] = PRotateZ(this.node_ETH[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_ETH[i].add(this.node_pillar[this.node_pillar.length-1]);
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


    for (let i=0; i<this.node_ETH.length; i++) {
      this.node_ETH[i] = createVector(real(node_ethereum[i][0]), real(node_ethereum[i][1]), 0);
      this.node_ETH[i].add(-real(50), -real(100-18), real(1));
      this.node_ETH[i].mult(this.var_scale);
      this.node_ETH[i] = PRotateZ(this.node_ETH[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_ETH[i].add(this.node_pillar[this.node_pillar.length-1]);
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }



    TRIANGLES_getTriangle(this.node_ETH[4], this.node_ETH[1], this.node_ETH[2]);
    TRIANGLES_getTriangle(this.node_ETH[4], this.node_ETH[0], this.node_ETH[3]);
    TRIANGLES_getTriangle(this.node_ETH[6], this.node_ETH[7], this.node_ETH[8]);
    t = constrain(map(this.node_ETH[0].z-real(500), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getTriangle(this.node_ETH[0], this.node_ETH[1], this.node_ETH[4]);
    TRIANGLES_getTriangle(this.node_ETH[5], this.node_ETH[6], this.node_ETH[8]);
    t = constrain(map(this.node_ETH[0].z+real(500), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getTriangle(this.node_ETH[2], this.node_ETH[3], this.node_ETH[4]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }
    for (let i=0; i<4; i++) {
      LINES_getLine(this.node_ETH[i], this.node_ETH[(i+1)%4]);
    }
    for (let i=5; i<8; i++) {
      LINES_getLine(this.node_ETH[i], this.node_ETH[i+1]);
    }
    LINES_getLine(this.node_ETH[8], this.node_ETH[5]);
  };
}


//------------------------------------------------------------------------------
//------------------------------⬆ Bill_Ethereum ⬆------------------------------
//------------------------------------------------------------------------------
















//---------------------------------------------------------------------------
//------------------------------⬇ Bill_Telegram ⬇---------------------------
//---------------------------------------------------------------------------

function Bill_Telegram(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.var_scale = random(0.65, 1.0);

  this.node_circle = new Array(8);
  for (let i=0; i<this.node_circle.length; i++) {
    const x = cos(map(i, 0, this.node_circle.length, 0, TWO_PI)) * real(100*this.var_scale/2.0);
    const y = sin(map(i, 0, this.node_circle.length, 0, TWO_PI)) * real(100*this.var_scale/2.0);
    this.node_circle[i] = createVector(x, y, 0);
    this.node_circle[i].add(0, -real(40), real(1));
    this.node_circle[i] = PRotateZ(this.node_circle[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_circle[i].add(this.node_pillar[this.node_pillar.length-1]);
  }

  this.center_plane = p5.Vector.add(this.node_circle[0], this.node_circle[4]).mult(0.5);


  this.node_plane = new Array(node_telegram.length);
  for (let i=0; i<this.node_plane.length; i++) {
    this.node_plane[i] = createVector(real(node_telegram[i][0]), real(node_telegram[i][1]), 0);
    this.node_plane[i].add(-real(50), -real(50), real(1));
    this.node_plane[i].mult(this.var_scale);
    this.node_plane[i] = PRotateZ(this.node_plane[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_plane[i].add(this.center_plane);
  }


  this.open_fly = false;
  this.time_fly = 0;
  this.var_c_plane = -real(2000);








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



    for (let i=0; i<this.node_circle.length; i++) {
      const x = cos(map(i, 0, this.node_circle.length, 0, TWO_PI)) * real(100*this.var_scale/2.0);
      const y = sin(map(i, 0, this.node_circle.length, 0, TWO_PI)) * real(100*this.var_scale/2.0);
      this.node_circle[i] = createVector(x, y, real(1));
      this.node_circle[i] = PRotateZ(this.node_circle[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_circle[i].add(this.node_pillar[this.node_pillar.length-1]);
    }

    this.center_plane = p5.Vector.add(this.node_circle[0], this.node_circle[4]).mult(0.5);

    if (this.open_fly) {
      this.time_fly ++;
      this.center_plane.x -= real(this.time_fly)*constrain(map(this.time_fly, 0, 30, 1, 10), 1, 50)*noise(this.ran);
      this.center_plane.y -= real(this.time_fly)*constrain(map(this.time_fly, 0, 30, 1, 10), 1, 50)*noise(this.ran);

      this.var_c_plane = easing_x(this.var_c_plane, 0, 0.1);
    }

    for (let i=0; i<this.node_plane.length; i++) {
      this.node_plane[i] = createVector(real(node_telegram[i][0]), real(node_telegram[i][1]), 0);
      this.node_plane[i].add(-real(50), -real(50), real(1));
      this.node_plane[i].mult(this.var_scale);
      this.node_plane[i] = PRotateZ(this.node_plane[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_plane[i].add(this.center_plane);
    }





    let screen_center = screenPosition(p5.Vector.add(this.node_circle[0], this.node_circle[4]).mult(0.5));
    let screen_w = p5.Vector.dist(screen_center, screenPosition(this.node_circle[0]));

    if (dist(mouseX, mouseY, screen_center.x+width/2, screen_center.y+height/2) < screen_w*2.0) {
      this.open_fly = true;
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(6));
    }



    TRIANGLES_getRect(this.node_circle[5], this.node_circle[6], this.node_circle[7], this.node_circle[4]);
    TRIANGLES_getRect(this.node_circle[4], this.node_circle[7], this.node_circle[0], this.node_circle[3]);
    TRIANGLES_getRect(this.node_circle[3], this.node_circle[0], this.node_circle[1], this.node_circle[2]);


    t = constrain(map(this.node_plane[0].z+this.var_c_plane, skyline.z, 0, 1, 0), 0.5, 1);
    fill(lerpColor(c_near, c_far, t));

    TRIANGLES_getRect(this.node_plane[0], this.node_plane[1], this.node_plane[2], this.node_plane[4]);
    TRIANGLES_getTriangle(this.node_plane[2], this.node_plane[3], this.node_plane[4]);
    TRIANGLES_getTriangle(this.node_plane[0], this.node_plane[5], this.node_plane[6]);
    TRIANGLES_getRect(this.node_plane[0], this.node_plane[6], this.node_plane[8], this.node_plane[9]);
    TRIANGLES_getTriangle(this.node_plane[6], this.node_plane[7], this.node_plane[8]);
    TRIANGLES_getTriangle(this.node_plane[0], this.node_plane[9], this.node_plane[10]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }
    for (let i=0; i<this.node_circle.length; i++) {
      LINES_getLine(this.node_circle[i], this.node_circle[(i+1)%this.node_circle.length]);
    }
    for (let i=0; i<this.node_plane.length; i++) {
      LINES_getLine(this.node_plane[i], this.node_plane[(i+1)%this.node_plane.length]);
    }
  };
}


//------------------------------------------------------------------------------
//------------------------------⬆ Bill_Telegram ⬆------------------------------
//------------------------------------------------------------------------------



















//---------------------------------------------------------------------------
//------------------------------⬇ Bill_Metro ⬇------------------------------
//---------------------------------------------------------------------------

function Bill_Metro(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.W_base = real(random(35, 50));
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



  this.var_scale = random(0.6, 1.0);

  this.node_logo = new Array(node_metro.length);
  for (let i=0; i<this.node_logo.length; i++) {
    this.node_logo[i] = createVector(real(node_metro[i][0]), real(node_metro[i][1]), 0);
    this.node_logo[i].add(-real(50), -real(50), real(2));
    this.node_logo[i].mult(this.var_scale);
    this.node_logo[i] = PRotateZ(this.node_logo[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_logo[i].add(this.node_pillar[this.node_pillar.length-1]);
  }

  this.W_rect = real(100) * this.var_scale;
  this.H_rect = this.W_rect * random(0.6, 0.8);
  this.node_rect = new Array(4);
  for (let i=0; i<4; i++) {
    this.node_rect[i] = createVector(this.W_rect/2.0 * pow(-1, ceil(i%1.5)+1), this.H_rect/2.0 * pow(-1, floor(i/2)+1), real(1));
    this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
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


    for (let i=0; i<this.node_logo.length; i++) {
      this.node_logo[i] = createVector(real(node_metro[i][0]), real(node_metro[i][1]), 0);
      this.node_logo[i].add(-real(50), -real(50), real(2));
      this.node_logo[i].mult(this.var_scale);
      this.node_logo[i] = PRotateZ(this.node_logo[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_logo[i].add(this.node_pillar[this.node_pillar.length-1]);
    }

    for (let i=0; i<4; i++) {
      this.node_rect[i] = createVector(this.W_rect/2.0 * pow(-1, ceil(i%1.5)+1), this.H_rect/2.0 * pow(-1, floor(i/2)+1), real(1));
      this.node_rect[i] = PRotateZ(this.node_rect[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_rect[i].add(this.node_pillar[this.node_pillar.length-1]);
    }
  };




  this.display = function() {
    let t, c1, c2;


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3], c1, c1, c2, c2);




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(8));
    }


    t = constrain(map(this.node_rect[0].z-real(1000), skyline.z, 0, 1, 0), 0, 0.95);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_rect[0], this.node_rect[1], this.node_rect[2], this.node_rect[3]);


    t = constrain(map(this.node_logo[0].z-real(250), skyline.z, 0, 1, 0), 0, 0.95);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_logo[0], this.node_logo[7], this.node_logo[12], this.node_logo[13]);
    TRIANGLES_getRect(this.node_logo[2], this.node_logo[5], this.node_logo[6], this.node_logo[1]);
    TRIANGLES_getRect(this.node_logo[2], this.node_logo[3], this.node_logo[4], this.node_logo[5]);
    TRIANGLES_getTriangle(this.node_logo[12], this.node_logo[7], this.node_logo[11]);
    TRIANGLES_getTriangle(this.node_logo[7], this.node_logo[8], this.node_logo[9]);
    TRIANGLES_getTriangle(this.node_logo[9], this.node_logo[10], this.node_logo[11]);

    t = constrain(map(this.node_logo[0].z+real(500), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getRect(this.node_logo[16], this.node_logo[17], this.node_logo[18], this.node_logo[25]);
    TRIANGLES_getRect(this.node_logo[24], this.node_logo[19], this.node_logo[20], this.node_logo[23]);
    TRIANGLES_getRect(this.node_logo[22], this.node_logo[23], this.node_logo[20], this.node_logo[21]);
    TRIANGLES_getTriangle(this.node_logo[15], this.node_logo[16], this.node_logo[25]);
    TRIANGLES_getTriangle(this.node_logo[27], this.node_logo[25], this.node_logo[26]);
    TRIANGLES_getTriangle(this.node_logo[14], this.node_logo[15], this.node_logo[27]);
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i], this.node_base[(i+1)%this.node_base.length]);
    }
    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }
    for (let i=0; i<13; i++) {
      LINES_getLine(this.node_logo[i], this.node_logo[i+1]);
    }
    LINES_getLine(this.node_logo[13], this.node_logo[0]);
    for (let i=14; i<27; i++) {
      LINES_getLine(this.node_logo[i], this.node_logo[i+1]);
    }
    LINES_getLine(this.node_logo[27], this.node_logo[14]);
  };
}


//------------------------------------------------------------------------------
//------------------------------⬆ Bill_Metro⬆---------------------------------
//------------------------------------------------------------------------------














//------------------------------------------------------------------------
//------------------------------⬇ Bill_File ⬇---------------------------
//------------------------------------------------------------------------

function Bill_File(begin, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.index_z = index_z;
  this.H_pillar_target = real(random(400, map(max(index_z, 1), 1, 5, 500, 1500)));
  this.H_pillar = 0;
  this.var_easing1 = random(0.075, 0.125)*2;









  this.node_pillar = new Array(2);

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




  this.num = floor(map(this.H_pillar_target, real(400), real(1500), 3, 7));
  this.node_files = Array.from(Array(this.num), () => new Array(11));
  this.var_scale = new Array(this.num);
  this.rotate_files = new Array(this.num);

  for (let i=0; i<this.num; i++) {
    this.var_scale[i] = random(0.85, 1.5);
    this.rotate_files[i] = random(-HALF_PI*0.35, HALF_PI*0.35);

    for (let j=0; j<this.node_files[i].length; j++) {
      this.node_files[i][j] = createVector(real(node_file[j][0]), real(node_file[j][1]), 0);
      this.node_files[i][j].add(-real(50), -real(50), real(1));
      if (j > 4) {
        this.node_files[i][j].add(0, 0, real(1));
      }
      this.node_files[i][j].mult(this.var_scale[i]);
      this.node_files[i][j] = PRotateZ(this.node_files[i][j], this.rotate_files[i]);
      if (i == 0) {
        this.node_files[i][j].add(this.node_pillar[1]);
      } else {
        this.node_files[i][j].add(p5.Vector.sub(this.node_pillar[0], p5.Vector.add(this.node_files[i-1][0], this.node_files[i-1][3]).mult(0.5)).setMag(p5.Vector.dist(this.node_files[i-1][0], this.node_files[i-1][3])+real(2)).add(p5.Vector.add(this.node_files[i-1][0], this.node_files[i-1][3]).mult(0.5)));
      }
    }
  }


  this.var_scale_folder = random(1.0, 1.75);


  this.node_folderF = new Array(4);
  this.roX_folderF = random(HALF_PI*0.2, HALF_PI*0.35);
  for (let i=0; i<4; i++) {
    this.node_folderF[i] = createVector(real(node_file[i+14][0]), real(node_file[i+14][1]), 0);
    this.node_folderF[i].add(-real(50), -real(75.73), real(1));
    this.node_folderF[i].mult(this.var_scale_folder);
    this.node_folderF[i] = PRotateX(this.node_folderF[i], this.roX_folderF);
    this.node_folderF[i].add(this.node_pillar[0]);
  }


  this.node_folderB = new Array(6);
  this.roX_folderB = -random(HALF_PI*0.2, HALF_PI*0.35);
  for (let i=0; i<6; i++) {
    this.node_folderB[i] = createVector(real(node_file[i+11][0]), real(node_file[i+11][1]), 0);
    this.node_folderB[i].add(-real(50), -real(75.73), -real(1));
    this.node_folderB[i].mult(this.var_scale_folder);
    this.node_folderB[i] = PRotateX(this.node_folderB[i], this.roX_folderB);
    this.node_folderB[i].add(this.node_pillar[0]);
  }





  this.change = function() {
  };




  this.update = function() {
    this.begin.x += speed;

    this.H_pillar = easing_x(this.H_pillar, this.H_pillar_target, this.var_easing1);



    this.node_pillar[0] = this.begin.copy().add(this.W_base/2.0, 0, this.W_base/2.0);
    for (let i=1; i<this.node_pillar.length; i++) {
      this.node_pillar[i] = createVector(0, -this.H_pillar/this.node_pillar.length, 0);
      this.node_pillar[i] = PRotateZ(this.node_pillar[i], this.node_rotate[i]);
      this.node_pillar[i].add(this.node_pillar[i-1]);
    }


    for (let i=0; i<this.num; i++) {
      for (let j=0; j<this.node_files[i].length; j++) {
        this.node_files[i][j] = createVector(real(node_file[j][0]), real(node_file[j][1]), 0);
        this.node_files[i][j].add(-real(50), -real(50), real(1));
        if (j > 4) {
          this.node_files[i][j].add(0, 0, real(1));
        }
        this.node_files[i][j].mult(this.var_scale[i]);
        this.node_files[i][j] = PRotateZ(this.node_files[i][j], this.rotate_files[i]);
        if (i == 0) {
          this.node_files[i][j].add(this.node_pillar[1]);
        } else {
          this.node_files[i][j].add(p5.Vector.sub(this.node_pillar[0], p5.Vector.add(this.node_files[i-1][0], this.node_files[i-1][3]).mult(0.5)).setMag(p5.Vector.dist(this.node_files[i-1][0], this.node_files[i-1][3])+real(2)).add(p5.Vector.add(this.node_files[i-1][0], this.node_files[i-1][3]).mult(0.5)));
        }
      }
    }



    for (let i=0; i<4; i++) {
      this.node_folderF[i] = createVector(real(node_file[i+14][0]), real(node_file[i+14][1]), 0);
      this.node_folderF[i].add(-real(50), -real(75.73), real(1));
      this.node_folderF[i].mult(this.var_scale_folder);
      this.node_folderF[i] = PRotateX(this.node_folderF[i], this.roX_folderF);
      this.node_folderF[i].add(this.node_pillar[0]);
    }


    for (let i=0; i<6; i++) {
      this.node_folderB[i] = createVector(real(node_file[i+11][0]), real(node_file[i+11][1]), 0);
      this.node_folderB[i].add(-real(50), -real(75.73), -real(1));
      this.node_folderB[i].mult(this.var_scale_folder);
      this.node_folderB[i] = PRotateX(this.node_folderB[i], this.roX_folderB);
      this.node_folderB[i].add(this.node_pillar[0]);
    }
  };




  this.display = function() {
    let t, c1, c2;




    t = constrain(map(this.node_pillar[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_pillar.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_pillar[i], this.node_pillar[i+1], real(3));
    }


    for (let i=0; i<this.num; i++) {
      t = constrain(map(this.node_files[i][0].z, skyline.z, 0, 1, 0), 0, 0.95);
      fill(lerpColor(c_near, c_far, t));
      TRIANGLES_getRect(this.node_files[i][0], this.node_files[i][1], this.node_files[i][3], this.node_files[i][4]);
      TRIANGLES_getTriangle(this.node_files[i][1], this.node_files[i][2], this.node_files[i][3]);
      t = constrain(map(this.node_files[i][5].z-real(1000), skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      TRIANGLES_getRect(this.node_files[i][5], this.node_files[i][7], this.node_files[i][9], this.node_files[i][10]);
      TRIANGLES_getTriangle(this.node_files[i][5], this.node_files[i][6], this.node_files[i][7]);
      TRIANGLES_getTriangle(this.node_files[i][7], this.node_files[i][8], this.node_files[i][9]);
    }



    c1 = lerpColor(c_near, c_far, constrain(map(this.node_folderF[0].z-real(450), skyline.z, 0, 1, 0), 0, 0.9));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_folderF[1].z-real(450), skyline.z, 0, 1, 0), 0, 0.9));
    TRIANGLES_getRect_fill4(this.node_folderF[0], this.node_folderF[1], this.node_folderF[2], this.node_folderF[3], c1, c2, c2, c1);


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_folderB[0].z+real(250), skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_folderB[5].z+real(250), skyline.z, 0, 1, 0), 0, 1));
    let c3 = lerpColor(c_near, c_far, constrain(map(this.node_folderB[2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_folderB[0], this.node_folderB[1], this.node_folderB[4], this.node_folderB[5], c1, c1, c2, c2);
    TRIANGLES_getTriangle_fill3(this.node_folderB[2], this.node_folderB[3], this.node_folderB[4], c3, c3, c2);
  };





  this.displayInfo = function() {

    for (let i=0; i<this.node_pillar.length-1; i++) {
      LINES_getLine(this.node_pillar[i], this.node_pillar[i+1]);
    }

    for (let i=0; i<this.num; i++) {
      for (let j=0; j<4; j++) {
        LINES_getLine(this.node_files[i][j], this.node_files[i][j+1]);
      }
      LINES_getLine(this.node_files[i][4], this.node_files[i][0]);
    }

    LINES_getRect(this.node_folderF[0], this.node_folderF[1], this.node_folderF[2], this.node_folderF[3]);
    for (let i=0; i<6; i++) {
      LINES_getLine(this.node_folderB[i], this.node_folderB[(i+1)%6]);
    }
  };
}


//--------------------------------------------------------------------------
//------------------------------⬆ Bill_File ⬆---------------------------
//--------------------------------------------------------------------------
