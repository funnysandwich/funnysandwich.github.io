function House(begin, W) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = this.W;
  this.H_ori = 0;
  this.H_ori_target = real(random(250, 350));
  this.var_easing = random(0.2, 0.7);



  this.num_floor = floor(random(2, 7));


  this.node = new Array(this.num_floor + 1);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }




  this.rotate_Y = random(0, HALF_PI/3.0);
  if (this.begin.x > 0) {
    this.rotate_Y = random(-HALF_PI/3.0, 0);
  }


  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.25+this.ran), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, 5, 0, 1);
    let lx = map(noise(i*0.25+this.ran+999), 0, 1, -HALF_PI*0.125, HALF_PI*0.125) * map(i, 0, 5, 0, 1);
    if (this.begin.x>0) {
      lz *= -1;
    }
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }





  this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.node[i]);
    }
  }






  this.H_rate_roof = random(0.25, 0.75);
  this.is_roof_face_font = random(1) < 0.5;
  this.node_roof = new Array(2);
  this.W_eaves = this.W * 0.1;  // 宽
  this.L_eaves = this.W * 0.1;  // 斜的突出去的
  this.node_eaves = new Array(6);


  // 0: B, 1: F
  this.node_roof[0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
  this.node_roof[1] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).mult(0.5));
  if (!this.is_roof_face_font) { // 0: L, 1: R
    this.node_roof[0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][0]).mult(0.5));
    this.node_roof[1] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][2]).mult(0.5));
  }


  this.node_eaves[1] = p5.Vector.sub(this.node_roof[0], this.node_roof[1]).setMag(this.W_eaves).add(this.node_roof[0]);
  this.node_eaves[4] = p5.Vector.sub(this.node_roof[1], this.node_roof[0]).setMag(this.W_eaves).add(this.node_roof[1]);

  this.node_eaves[0] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][3]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][0]);
  this.node_eaves[0] = p5.Vector.sub(this.node_eaves[0], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[0]);
  this.node_eaves[5] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][0]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][3]);
  this.node_eaves[5] = p5.Vector.sub(this.node_eaves[5], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[5]);
  this.node_eaves[2] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][2]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][1]);
  this.node_eaves[2] = p5.Vector.sub(this.node_eaves[2], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[2]);
  this.node_eaves[3] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][1]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][2]);
  this.node_eaves[3] = p5.Vector.sub(this.node_eaves[3], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[3]);
  if (!this.is_roof_face_font) {
    this.node_eaves[0] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][0]);
    this.node_eaves[0] = p5.Vector.sub(this.node_eaves[0], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[0]);
    this.node_eaves[5] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][0]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][1]);
    this.node_eaves[5] = p5.Vector.sub(this.node_eaves[5], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[5]);
    this.node_eaves[2] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][3]);
    this.node_eaves[2] = p5.Vector.sub(this.node_eaves[2], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[2]);
    this.node_eaves[3] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][2]);
    this.node_eaves[3] = p5.Vector.sub(this.node_eaves[3], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[3]);
  }









  //------ win ------
  this.W_win = this.W * 0.065;
  this.node_win_F = Array.from(Array(this.num_floor), () => new Array(floor(random(2, 4))));
  for (let i=0; i<this.node_win_F.length; i++) {
    for (let j=0; j<this.node_win_F[i].length; j++) {
      this.node_win_F[i][j] = new Array(4);
    }
  }
  this.node_win_side = Array.from(Array(this.num_floor), () => new Array(floor(random(2, 4))));
  for (let i=0; i<this.node_win_side.length; i++) {
    for (let j=0; j<this.node_win_side[i].length; j++) {
      this.node_win_side[i][j] = new Array(4);
    }
  }


  for (let i=0; i<this.node_win_F.length; i++) {
    for (let j=0; j<this.node_win_F[i].length; j++) {
      let um = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][3]).mult(1.0/(1+this.node_win_F[i].length) * (j+1)).add(this.node_wall[i+1][3]);
      um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
      let dm = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).mult(1.0/(1+this.node_win_F[i].length) * (j+1)).add(this.node_wall[i][3]);
      dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

      this.node_win_F[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][2]).setMag(this.W_win/2.0));
      this.node_win_F[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][3]).setMag(this.W_win/2.0));
      this.node_win_F[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.W_win/2.0));
      this.node_win_F[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][2]).setMag(this.W_win/2.0));

      for (let k=0; k<this.node_win_F[i][j].length; k++) {
        if (i<2) {
          this.node_win_F[i][j][k] = p5.Vector.sub(this.node_win_F[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_F[i][j][k]);
        } else {
          this.node_win_F[i][j][k] = p5.Vector.sub(this.node_win_F[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_F[i][j][k]);
        }
      }
    }
  }


  for (let i=0; i<this.node_win_side.length; i++) {
    for (let j=0; j<this.node_win_side[i].length; j++) {
      if (this.begin.x < 0) {
        let um = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i+1][2]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i+1][2]);
        um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
        let dm = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i][2]);
        dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

        this.node_win_side[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][1]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i+1][2]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][1]).setMag(this.W_win/2.0));

        for (let k=0; k<this.node_win_side[i][j].length; k++) {
          if (i<2) {
            this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_side[i][j][k]);
          } else {
            this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_side[i][j][k]);
          }
        }
      } else {
        let um = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][0]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i+1][0]);
        um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
        let dm = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i][0]);
        dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

        this.node_win_side[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i+1][3]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][0]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).setMag(this.W_win/2.0));
        this.node_win_side[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][0], this.node_wall[i][3]).setMag(this.W_win/2.0));

        for (let k=0; k<this.node_win_side[i][j].length; k++) {
          if (i<2) {
            this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_side[i][j][k]);
          } else {
            this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_side[i][j][k]);
          }
        }
      }
    }
  }




  this.show_win_F = new Array(this.node_win_F.length);
  for (let i=0; i<this.show_win_F.length; i++) {
    this.show_win_F[i] = new Array(this.node_win_F[i].length);
    for (let j=0; j<this.show_win_F[i].length; j++) {
      this.show_win_F[i][j] = random(1) < 0.45;
    }
  }
  this.show_win_side = new Array(this.node_win_side.length);
  for (let i=0; i<this.show_win_side.length; i++) {
    this.show_win_side[i] = new Array(this.node_win_side[i].length);
    for (let j=0; j<this.show_win_side[i].length; j++) {
      this.show_win_side[i][j] = random(1) < 0.45;
    }
  }




  this.have_rope = false;
  this.index_rope_i = 0;
  this.index_rope_j = 0;
  this.index_ropeOther_i = 0;
  this.index_ropeOther_j = 0;
  //this.node_rope = new Array(5);













  this.update = function(begin) {
    this.begin = begin.copy();
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing);


    this.node[0] = this.begin.copy();
    for (let i=1; i<this.node.length; i++) {
      this.node[i] = createVector(0, -this.H_ori, 0);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i][0]);
      this.node[i] = PRotateX(this.node[i], this.node_rotate[i][1]);
      this.node[i].add(this.node[i-1]);
    }



    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1));
        this.node_wall[i][j] = PRotateY(this.node_wall[i][j], this.rotate_Y);
        this.node_wall[i][j] = PRotateZ(this.node_wall[i][j], this.node_rotate[i][0]);
        this.node_wall[i][j] = PRotateX(this.node_wall[i][j], this.node_rotate[i][1]);
        this.node_wall[i][j].add(this.node[i]);
      }
    }


    // 0: B, 1: F
    this.node_roof[0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roof[1] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).mult(0.5));
    if (!this.is_roof_face_font) { // 0: L, 1: R
      this.node_roof[0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][0]).mult(0.5));
      this.node_roof[1] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_ori * this.H_rate_roof).add(p5.Vector.add(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][2]).mult(0.5));
    }

    this.node_eaves[1] = p5.Vector.sub(this.node_roof[0], this.node_roof[1]).setMag(this.W_eaves).add(this.node_roof[0]);
    this.node_eaves[4] = p5.Vector.sub(this.node_roof[1], this.node_roof[0]).setMag(this.W_eaves).add(this.node_roof[1]);

    this.node_eaves[0] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][3]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][0]);
    this.node_eaves[0] = p5.Vector.sub(this.node_eaves[0], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[0]);
    this.node_eaves[5] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][0]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][3]);
    this.node_eaves[5] = p5.Vector.sub(this.node_eaves[5], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[5]);
    this.node_eaves[2] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][2]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][1]);
    this.node_eaves[2] = p5.Vector.sub(this.node_eaves[2], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[2]);
    this.node_eaves[3] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][1]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][2]);
    this.node_eaves[3] = p5.Vector.sub(this.node_eaves[3], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[3]);
    if (!this.is_roof_face_font) {
      this.node_eaves[0] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][0]);
      this.node_eaves[0] = p5.Vector.sub(this.node_eaves[0], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[0]);
      this.node_eaves[5] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][0]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][1]);
      this.node_eaves[5] = p5.Vector.sub(this.node_eaves[5], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[5]);
      this.node_eaves[2] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][3]);
      this.node_eaves[2] = p5.Vector.sub(this.node_eaves[2], this.node_eaves[1]).setMag(this.L_eaves).add(this.node_eaves[2]);
      this.node_eaves[3] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).setMag(this.W_eaves).add(this.node_wall[this.node.length-1][2]);
      this.node_eaves[3] = p5.Vector.sub(this.node_eaves[3], this.node_eaves[4]).setMag(this.L_eaves).add(this.node_eaves[3]);
    }







    //------ win ------

    for (let i=0; i<this.node_win_F.length; i++) {
      for (let j=0; j<this.node_win_F[i].length; j++) {
        let um = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][3]).mult(1.0/(1+this.node_win_F[i].length) * (j+1)).add(this.node_wall[i+1][3]);
        um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
        let dm = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).mult(1.0/(1+this.node_win_F[i].length) * (j+1)).add(this.node_wall[i][3]);
        dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

        this.node_win_F[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][2]).setMag(this.W_win/2.0));
        this.node_win_F[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][3]).setMag(this.W_win/2.0));
        this.node_win_F[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.W_win/2.0));
        this.node_win_F[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][2]).setMag(this.W_win/2.0));

        for (let k=0; k<this.node_win_F[i][j].length; k++) {
          if (i<2) {
            this.node_win_F[i][j][k] = p5.Vector.sub(this.node_win_F[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_F[i][j][k]);
          } else {
            this.node_win_F[i][j][k] = p5.Vector.sub(this.node_win_F[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_F[i][j][k]);
          }
        }
      }
    }


    for (let i=0; i<this.node_win_side.length; i++) {
      for (let j=0; j<this.node_win_side[i].length; j++) {
        if (this.begin.x < 0) {
          let um = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i+1][2]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i+1][2]);
          um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
          let dm = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i][2]);
          dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

          this.node_win_side[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][1]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i+1][2]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][1]).setMag(this.W_win/2.0));

          for (let k=0; k<this.node_win_side[i][j].length; k++) {
            if (i<2) {
              this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_side[i][j][k]);
            } else {
              this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_side[i][j][k]);
            }
          }
        } else {
          let um = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][0]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i+1][0]);
          um.add(p5.Vector.sub(this.node[i], this.node[i+1]).mult(0.2));
          let dm = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).mult(1.0/(1+this.node_win_side[i].length) * (j+1)).add(this.node_wall[i][0]);
          dm.add(p5.Vector.sub(this.node[i+1], this.node[i]).mult(0.5));

          this.node_win_side[i][j][0] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i+1][3]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][1] = um.copy().add(p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][0]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][2] = dm.copy().add(p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).setMag(this.W_win/2.0));
          this.node_win_side[i][j][3] = dm.copy().add(p5.Vector.sub(this.node_wall[i][0], this.node_wall[i][3]).setMag(this.W_win/2.0));

          for (let k=0; k<this.node_win_side[i][j].length; k++) {
            if (i<2) {
              this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i+1]).setMag(real(2)).add(this.node_win_side[i][j][k]);
            } else {
              this.node_win_side[i][j][k] = p5.Vector.sub(this.node_win_side[i][j][k], this.node[i]).setMag(real(2)).add(this.node_win_side[i][j][k]);
            }
          }
        }
      }
    }
  };












  this.display = function() {
    let c1, c2, c3, c4;



    fill(255);


    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getRect(this.node_wall[i][3], this.node_wall[i][2], this.node_wall[i+1][2], this.node_wall[i+1][3]);

      if (this.node[0].x < 0) {
        TRIANGLES_getRect(this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i+1][2], this.node_wall[i+1][1]);
      } else {
        TRIANGLES_getRect(this.node_wall[i][3], this.node_wall[i][0], this.node_wall[i+1][0], this.node_wall[i+1][3]);
      }
    }

    if (this.is_roof_face_font) {
      TRIANGLES_getTriangle(this.node_roof[0], this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]);
      TRIANGLES_getTriangle(this.node_roof[1], this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]);
    } else {
      TRIANGLES_getTriangle(this.node_roof[0], this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][3]);
      TRIANGLES_getTriangle(this.node_roof[1], this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][1]);
    }







    fill(lerpColor(c_far, c_near, map(sin(map(this.node[0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1)));

    let w_line = real(16);
    let line_move = real(1);


    for (let i=0; i<this.node_wall.length-1; i++) {
      // [i]_[j]
      let wall_3to2 = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(w_line).add(this.node_wall[i][3]);
      wall_3to2 = p5.Vector.sub(wall_3to2, this.node[i]).setMag(line_move).add(wall_3to2);
      let wallU_3to2 = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][3]).setMag(w_line).add(this.node_wall[i+1][3]);
      wallU_3to2 = p5.Vector.sub(wallU_3to2, this.node[i+1]).setMag(line_move).add(wallU_3to2);
      let wall_2to3 = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][2]).setMag(w_line).add(this.node_wall[i][2]);
      wall_2to3 = p5.Vector.sub(wall_2to3, this.node[i]).setMag(line_move).add(wall_2to3);
      let wallU_2to3 = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][2]).setMag(w_line).add(this.node_wall[i+1][2]);
      wallU_2to3 = p5.Vector.sub(wallU_2to3, this.node[i+1]).setMag(line_move).add(wallU_2to3);

      if (this.is_roof_face_font  &&  i == this.node_wall.length-1-1) {
        wallU_3to2 = p5.Vector.sub(this.node_roof[1], this.node_wall[i+1][3]).setMag(w_line).add(this.node_wall[i+1][3]);
        wallU_3to2 = p5.Vector.sub(wallU_3to2, this.node[i+1]).setMag(line_move).add(wallU_3to2);
        wallU_2to3 = p5.Vector.sub(this.node_roof[1], this.node_wall[i+1][2]).setMag(w_line).add(this.node_wall[i+1][2]);
        wallU_2to3 = p5.Vector.sub(wallU_2to3, this.node[i+1]).setMag(line_move).add(wallU_2to3);
      }

      c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c2 = lerpColor(c_far, c_near, map(sin(map(wall_3to2.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c3 = lerpColor(c_far, c_near, map(sin(map(wallU_3to2.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

      TRIANGLES_getRect_fill4(this.node_wall[i][3], wall_3to2, wallU_3to2, this.node_wall[i+1][3], c1, c2, c3, c4);

      c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c2 = lerpColor(c_far, c_near, map(sin(map(wall_2to3.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c3 = lerpColor(c_far, c_near, map(sin(map(wallU_2to3.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
      c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

      TRIANGLES_getRect_fill4(this.node_wall[i][2], wall_2to3, wallU_2to3, this.node_wall[i+1][2], c1, c2, c3, c4);


      //--- 前面下边的线 ---
      if (i == 0) {
        let wall0to1_L = p5.Vector.sub(wallU_3to2, wall_3to2).setMag(w_line).add(wall_3to2);
        let wall0to1_R = p5.Vector.sub(wallU_2to3, wall_2to3).setMag(w_line).add(wall_2to3);

        c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c2 = lerpColor(c_far, c_near, map(sin(map(wall0to1_L.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c3 = lerpColor(c_far, c_near, map(sin(map(wall0to1_R.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

        TRIANGLES_getRect_fill4(this.node_wall[0][3], wall0to1_L, wall0to1_R, this.node_wall[0][2], c1, c2, c3, c4);
      }







      if (this.begin.x < 0) { //--- 右面的线 ---
        let wall_2to1 = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).setMag(w_line).add(this.node_wall[i][2]);
        wall_2to1 = p5.Vector.sub(wall_2to1, this.node[i]).setMag(line_move).add(wall_2to1);
        let wallU_2to1 = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i+1][2]).setMag(w_line).add(this.node_wall[i+1][2]);
        wallU_2to1 = p5.Vector.sub(wallU_2to1, this.node[i+1]).setMag(line_move).add(wallU_2to1);
        let wall_1to2 = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][1]).setMag(w_line).add(this.node_wall[i][1]);
        wall_1to2 = p5.Vector.sub(wall_1to2, this.node[i]).setMag(line_move).add(wall_1to2);
        let wallU_1to2 = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i+1][1]).setMag(w_line).add(this.node_wall[i+1][1]);
        wallU_1to2 = p5.Vector.sub(wallU_1to2, this.node[i+1]).setMag(line_move).add(wallU_1to2);

        if (!this.is_roof_face_font  &&  i == this.node_wall.length-1-1) {
          wallU_2to1 = p5.Vector.sub(this.node_roof[1], this.node_wall[i+1][2]).setMag(w_line).add(this.node_wall[i+1][2]);
          wallU_2to1 = p5.Vector.sub(wallU_2to1, this.node[i+1]).setMag(line_move).add(wallU_2to1);
          wallU_1to2 = p5.Vector.sub(this.node_roof[1], this.node_wall[i+1][1]).setMag(w_line).add(this.node_wall[i+1][1]);
          wallU_1to2 = p5.Vector.sub(wallU_1to2, this.node[i+1]).setMag(line_move).add(wallU_1to2);
        }

        c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c2 = lerpColor(c_far, c_near, map(sin(map(wall_2to1.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c3 = lerpColor(c_far, c_near, map(sin(map(wallU_2to1.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

        TRIANGLES_getRect_fill4(this.node_wall[i][2], wall_2to1, wallU_2to1, this.node_wall[i+1][2], c1, c2, c3, c4);

        c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][1].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c2 = lerpColor(c_far, c_near, map(sin(map(wall_1to2.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c3 = lerpColor(c_far, c_near, map(sin(map(wallU_1to2.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][1].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

        TRIANGLES_getRect_fill4(this.node_wall[i][1], wall_1to2, wallU_1to2, this.node_wall[i+1][1], c1, c2, c3, c4);


        //--- 右面下边的线 ---
        if (i == 0) {
          let wall0to1_F = p5.Vector.sub(wallU_2to1, wall_2to1).setMag(w_line).add(wall_2to1);
          let wall0to1_B = p5.Vector.sub(wallU_1to2, wall_1to2).setMag(w_line).add(wall_1to2);

          c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c2 = lerpColor(c_far, c_near, map(sin(map(wall0to1_F.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c3 = lerpColor(c_far, c_near, map(sin(map(wall0to1_B.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][1].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

          TRIANGLES_getRect_fill4(this.node_wall[0][2], wall0to1_F, wall0to1_B, this.node_wall[0][1], c1, c2, c3, c4);
        }
      } else { //--- 左面的线 ---
        let wall_3to0 = p5.Vector.sub(this.node_wall[i][0], this.node_wall[i][3]).setMag(w_line).add(this.node_wall[i][3]);
        wall_3to0 = p5.Vector.sub(wall_3to0, this.node[i]).setMag(line_move).add(wall_3to0);
        let wallU_3to0 = p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i+1][3]).setMag(w_line).add(this.node_wall[i+1][3]);
        wallU_3to0 = p5.Vector.sub(wallU_3to0, this.node[i+1]).setMag(line_move).add(wallU_3to0);
        let wall_0to3 = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).setMag(w_line).add(this.node_wall[i][0]);
        wall_0to3 = p5.Vector.sub(wall_0to3, this.node[i]).setMag(line_move).add(wall_0to3);
        let wallU_0to3 = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i+1][0]).setMag(w_line).add(this.node_wall[i+1][0]);
        wallU_0to3 = p5.Vector.sub(wallU_0to3, this.node[i+1]).setMag(line_move).add(wallU_0to3);

        if (!this.is_roof_face_font  &&  i == this.node_wall.length-1-1) {
          wallU_3to0 = p5.Vector.sub(this.node_roof[0], this.node_wall[i+1][3]).setMag(w_line).add(this.node_wall[i+1][3]);
          wallU_3to0 = p5.Vector.sub(wallU_3to0, this.node[i+1]).setMag(line_move).add(wallU_3to0);
          wallU_0to3 = p5.Vector.sub(this.node_roof[0], this.node_wall[i+1][0]).setMag(w_line).add(this.node_wall[i+1][0]);
          wallU_0to3 = p5.Vector.sub(wallU_0to3, this.node[i+1]).setMag(line_move).add(wallU_0to3);
        }

        c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c2 = lerpColor(c_far, c_near, map(sin(map(wall_3to0.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c3 = lerpColor(c_far, c_near, map(sin(map(wallU_3to0.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

        TRIANGLES_getRect_fill4(this.node_wall[i][3], wall_3to0, wallU_3to0, this.node_wall[i+1][3], c1, c2, c3, c4);

        c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i][0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c2 = lerpColor(c_far, c_near, map(sin(map(wall_0to3.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c3 = lerpColor(c_far, c_near, map(sin(map(wallU_0to3.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
        c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[i+1][0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

        TRIANGLES_getRect_fill4(this.node_wall[i][0], wall_0to3, wallU_0to3, this.node_wall[i+1][0], c1, c2, c3, c4);


        //--- 左面下边的线 ---
        if (i == 0) {
          let wall0to1_F = p5.Vector.sub(wallU_3to0, wall_3to0).setMag(w_line).add(wall_3to0);
          let wall0to1_B = p5.Vector.sub(wallU_0to3, wall_0to3).setMag(w_line).add(wall_0to3);

          c1 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c2 = lerpColor(c_far, c_near, map(sin(map(wall0to1_F.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c3 = lerpColor(c_far, c_near, map(sin(map(wall0to1_B.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
          c4 = lerpColor(c_far, c_near, map(sin(map(this.node_wall[0][0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));

          TRIANGLES_getRect_fill4(this.node_wall[0][3], wall0to1_F, wall0to1_B, this.node_wall[0][0], c1, c2, c3, c4);
        }
      }
    }



    //--- 屋顶两片 ---
    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[1].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[4].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[5].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[1], this.node_eaves[4], this.node_eaves[5], this.node_eaves[0], c1, c2, c3, c4);

    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[1], this.node_eaves[4], this.node_eaves[3], this.node_eaves[2], c1, c2, c3, c4);



    //--- 屋顶两片 下面厚度的线 ---
    w_line = w_line*0.5;

    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[0].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[1].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[1].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[0], this.node_eaves[0].copy().add(0, w_line, 0), this.node_eaves[1].copy().add(0, w_line, 0), this.node_eaves[1], c1, c2, c3, c4);
    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[2].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[2], this.node_eaves[2].copy().add(0, w_line, 0), this.node_eaves[1].copy().add(0, w_line, 0), this.node_eaves[1], c1, c2, c3, c4);

    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[5].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[5].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[4].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[4].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[5], this.node_eaves[5].copy().add(0, w_line, 0), this.node_eaves[4].copy().add(0, w_line, 0), this.node_eaves[4], c1, c2, c3, c4);
    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[3].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[3], this.node_eaves[3].copy().add(0, w_line, 0), this.node_eaves[4].copy().add(0, w_line, 0), this.node_eaves[4], c1, c2, c3, c4);

    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[2].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[2].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[3].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[3].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[2], this.node_eaves[2].copy().add(0, w_line, 0), this.node_eaves[3].copy().add(0, w_line, 0), this.node_eaves[3], c1, c2, c3, c4);

    c1 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c2 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[0].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c3 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[5].copy().add(0, w_line, 0).z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    c4 = lerpColor(c_far, c_near, map(sin(map(this.node_eaves[5].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1));
    TRIANGLES_getRect_fill4(this.node_eaves[0], this.node_eaves[0].copy().add(0, w_line, 0), this.node_eaves[5].copy().add(0, w_line, 0), this.node_eaves[5], c1, c2, c3, c4);







    //------ win ------

    for (let i=0; i<this.node_win_F.length; i++) {
      for (let j=0; j<this.node_win_F[i].length; j++) {
        if (this.show_win_F[i][j]) {
          c1 = realColor(this.node_win_F[i][j][0]);
          c2 = realColor(this.node_win_F[i][j][1]);
          c3 = realColor(this.node_win_F[i][j][2]);
          c4 = realColor(this.node_win_F[i][j][3]);
          TRIANGLES_getRect_fill4(this.node_win_F[i][j][0], this.node_win_F[i][j][1], this.node_win_F[i][j][2], this.node_win_F[i][j][3], c1, c2, c3, c4);
        }
      }
    }

    for (let i=0; i<this.node_win_side.length; i++) {
      for (let j=0; j<this.node_win_side[i].length; j++) {
        if (this.show_win_side[i][j]) {
          c1 = realColor(this.node_win_side[i][j][0]);
          c2 = realColor(this.node_win_side[i][j][1]);
          c3 = realColor(this.node_win_side[i][j][2]);
          c4 = realColor(this.node_win_side[i][j][3]);
          TRIANGLES_getRect_fill4(this.node_win_side[i][j][0], this.node_win_side[i][j][1], this.node_win_side[i][j][2], this.node_win_side[i][j][3], c1, c2, c3, c4);
        }
      }
    }
  };













  this.displayInfo = function() {
    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }
    for (let i=0; i<this.node.length; i++) {
      LINES_getLine(this.node[i].copy().add(-real(10), 0, 0), this.node[i].copy().add(real(10), 0, 0));
    }


    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3]);
      if (i < this.node_wall.length-1) {
        for (let j=0; j<this.node_wall[i].length; j++) {
          //LINES_getLine(this.node_wall[i][j], this.node_wall[i+1][j]);
        }
      }
    }


    LINES_getLine(this.node_roof[0], this.node_roof[1]);

    LINES_getEllipse(this.node_eaves);
  };
}
