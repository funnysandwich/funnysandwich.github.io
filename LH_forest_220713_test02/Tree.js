function Tree(begin, W) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.have_leaves = random(1) < rate_leaves;
  this.W = W;
  this.H_ori = 0;
  this.H_ori_target = map(this.W, real(15), real(30), real(250), real(450));
  this.H_att = map(this.W, real(15), real(30), 0.725, 0.8);
  this.var_easing = random(0.2, 0.7);

  if (this.have_leaves) {
    this.W = W * 1.5;
  }

  this.angle_face = 0;


  this.num_floor = floor(random(4, 6));


  this.node = new Array(this.num_floor + 1);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }




  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, 5, 0, 1);
    let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, 5, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = lx;
  }







  this.node_trunk = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_trunk.length; i++) {
    for (let j=0; j<this.node_trunk[i].length; j++) {
      let w = map(i, 0, this.node_trunk.length-1, this.W, real(1));
      if (i == 0) {
        this.node_trunk[0][j] = createVector(-w/2.0 * pow(-1, j), 0, 0);
      } else {
        this.node_trunk[i][j] = p5.Vector.sub(this.node[i-1], this.node[i]).setMag(w/2.0);
        if (j == 0) {
          this.node_trunk[i][0] = PRotateZ(this.node_trunk[i][0], HALF_PI);
        } else {
          this.node_trunk[i][1] = PRotateZ(this.node_trunk[i][1], -HALF_PI);
        }
        this.node_trunk[i][j] = PRotateX(this.node_trunk[i][j], this.node_rotate[i][1]);
      }
      this.node_trunk[i][j] = PRotateY(this.node_trunk[i][j], this.angle_face);
      this.node_trunk[i][j].add(this.node[i]);
    }
  }




  this.node_base = new Array(5);
  for (let i=0; i<this.node_base.length; i++) {
    let x = cos(map(i, 0, this.node_base.length-1, 0, PI)) * this.W/2.0;
    let z = sin(map(i, 0, this.node_base.length-1, 0, PI)) * this.W/2.0;
    this.node_base[i] = createVector(x, 0, z);

    this.node_base[i] = PRotateY(this.node_base[i], this.angle_face);
    this.node_base[i].add(this.begin);
  }





  if (!this.have_leaves) {
    this.node_branch = Array.from(Array(this.node.length-3), () => new Array(floor(random(2, 4))));
    this.W_branch = new Array(this.node_branch.length);
    for (let i=0; i<this.node_branch.length; i++) {
      this.W_branch[i] = map(i, 0, this.node_branch.length-1, real(random(150, 280)), real(random(50, 125)));
      for (let j=0; j<this.node_branch[i].length; j++) {
        let x = cos(map(j, 0, this.node_branch[i].length, 0, TWO_PI)) * this.W_branch[i]/2.0;
        let z = sin(map(j, 0, this.node_branch[i].length, 0, TWO_PI)) * this.W_branch[i]/2.0;
        let y = p5.Vector.dist(this.node[i+2], this.node[i+1])*0.5;
        this.node_branch[i][j] = createVector(x, y, z);
        this.node_branch[i][j] = PRotateZ(this.node_branch[i][j], this.node_rotate[i+2][0]);
        this.node_branch[i][j] = PRotateX(this.node_branch[i][j], this.node_rotate[i+2][1]);
        this.node_branch[i][j].add(this.node[i+2]);
      }
    }


    this.show_branch = Array.from(Array(this.node_branch.length), () => new Array(this.node_branch[0].length));
    for (let i=0; i<this.show_branch.length; i++) {
      for (let j=0; j<this.show_branch[i].length; j++) {
        this.show_branch[i][j] = random(1) < 0.5;
      }
    }
  } else {
    this.node_leaves = Array.from(Array(this.node.length-3), () => new Array(floor(random(5, 8))));
    this.W_leaves = new Array(this.node_leaves.length);

    for (let i=0; i<this.node_leaves.length; i++) {
      let w_bottom = map(this.node_leaves.length, 2, 3, real(225), real(300));
      this.W_leaves[i] = map(i, 0, 3, w_bottom, w_bottom*0.05);
      for (let j=0; j<this.node_leaves[i].length; j++) {
        let x = cos(map(j, 0, this.node_leaves[i].length, 0, TWO_PI)) * this.W_leaves[i]/2.0;
        let z = sin(map(j, 0, this.node_leaves[i].length, 0, TWO_PI)) * this.W_leaves[i]/2.0;
        let y = p5.Vector.dist(this.node[i+2], this.node[i+1])*0.5;
        this.node_leaves[i][j] = createVector(x, y, z);
        this.node_leaves[i][j] = PRotateZ(this.node_leaves[i][j], this.node_rotate[i+2][0]);
        this.node_leaves[i][j] = PRotateX(this.node_leaves[i][j], this.node_rotate[i+2][1]);
        this.node_leaves[i][j].add(this.node[i+3]);
      }
    }
  }









  this.update = function(begin) {
    this.begin = begin.copy();

    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing);


    this.angle_face = -HALF_PI+p5.Vector.sub(createVector(0, real(200)), createVector(this.node[0].x, this.node[0].z)).heading();



    this.node[0] = this.begin.copy();
    for (let i=1; i<this.node.length; i++) {
      this.node[i] = createVector(0, -this.H_ori * pow(this.H_att, i), 0);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i][0]);
      this.node[i] = PRotateX(this.node[i], this.node_rotate[i][1]);
      this.node[i].add(this.node[i-1]);
    }




    for (let i=0; i<this.node_trunk.length; i++) {
      for (let j=0; j<this.node_trunk[i].length; j++) {
        let w = map(i, 0, this.node_trunk.length-1, this.W, real(1));
        if (i == 0) {
          this.node_trunk[0][j] = createVector(-w/2.0 * pow(-1, j), 0, 0);
        } else {
          this.node_trunk[i][j] = p5.Vector.sub(this.node[i-1], this.node[i]).setMag(w/2.0);
          if (j == 0) {
            this.node_trunk[i][0] = PRotateZ(this.node_trunk[i][0], HALF_PI);
          } else {
            this.node_trunk[i][1] = PRotateZ(this.node_trunk[i][1], -HALF_PI);
          }
          this.node_trunk[i][j] = PRotateX(this.node_trunk[i][j], this.node_rotate[i][1]);
        }
        this.node_trunk[i][j] = PRotateY(this.node_trunk[i][j], this.angle_face);
        this.node_trunk[i][j].add(this.node[i]);
      }
    }



    for (let i=0; i<this.node_base.length; i++) {
      let x = cos(map(i, 0, this.node_base.length-1, 0, PI)) * this.W/2.0;
      let z = sin(map(i, 0, this.node_base.length-1, 0, PI)) * this.W/2.0;
      this.node_base[i] = createVector(x, 0, z);

      this.node_base[i] = PRotateY(this.node_base[i], this.angle_face);
      this.node_base[i].add(this.begin);
    }



    if (!this.have_leaves) {
      for (let i=0; i<this.node_branch.length; i++) {
        for (let j=0; j<this.node_branch[i].length; j++) {
          let x = cos(map(j, 0, this.node_branch[i].length, 0, TWO_PI)) * this.W_branch[i]/2.0;
          let z = sin(map(j, 0, this.node_branch[i].length, 0, TWO_PI)) * this.W_branch[i]/2.0;
          if (this.node_branch[i].length > 2) {
            x = cos(map(j, 0, this.node_branch[i].length, 0, TWO_PI)+noise(this.ran+77)) * this.W_branch[i]/2.0;
            z = sin(map(j, 0, this.node_branch[i].length, 0, TWO_PI)+noise(this.ran+77)) * this.W_branch[i]/2.0;
          }
          let y = p5.Vector.dist(this.node[i+2], this.node[i+1]) * map(i, 0, this.node_branch.length-1, map(noise(this.ran+j*10), 0, 1, 0.25, 0.45), 0.15);
          this.node_branch[i][j] = createVector(x, y, z);
          this.node_branch[i][j] = PRotateZ(this.node_branch[i][j], this.node_rotate[i+2][0]);
          this.node_branch[i][j] = PRotateX(this.node_branch[i][j], this.node_rotate[i+2][1]);
          this.node_branch[i][j].add(this.node[i+2]);
        }
      }
    } else {
      for (let i=0; i<this.node_leaves.length; i++) {
        for (let j=0; j<this.node_leaves[i].length; j++) {
          let x = cos(map(j, 0, this.node_leaves[i].length, 0, TWO_PI)) * this.W_leaves[i]/2.0;
          let z = sin(map(j, 0, this.node_leaves[i].length, 0, TWO_PI)) * this.W_leaves[i]/2.0;
          let y = p5.Vector.dist(this.node[i+2], this.node[i+1]) * map(i, 0, this.node_leaves.length-1, 1.5, 1.2);
          this.node_leaves[i][j] = createVector(x, y, z);
          this.node_leaves[i][j] = PRotateZ(this.node_leaves[i][j], this.node_rotate[i+3][0]);
          this.node_leaves[i][j] = PRotateX(this.node_leaves[i][j], this.node_rotate[i+3][1]);
          this.node_leaves[i][j].add(this.node[i+3]);
        }
      }
    }
  };














  this.display = function() {
    fill(realColor(this.node[0]));

    for (let i=0; i<this.node_trunk.length-1; i++) {
      TRIANGLES_getRect(this.node_trunk[i][0], this.node_trunk[i+1][0], this.node_trunk[i+1][1], this.node_trunk[i][1]);
    }

    for (let i=0; i<this.node_base.length-1; i++) {
      TRIANGLES_getTriangle(this.node_base[i], this.node_base[i+1], this.node[1]);
    }


    if (!this.have_leaves) {
      for (let i=0; i<this.node_branch.length; i++) {
        let w = map(i+2, 0, this.node.length-1, this.W, real(1));
        for (let j=0; j<this.node_branch[i].length; j++) {
          if (this.show_branch[i][j]) {
            TRIANGLES_getTriangle(this.node[i+2].copy().add(0, w, 0), this.node[i+2], this.node_branch[i][j]);
            TRIANGLES_getTriangle(this.node[i+2].copy().add(2, 0, 0), this.node[i+2], this.node_branch[i][j]);
          }
        }
      }
    } else {
      for (let i=0; i<this.node_leaves.length; i++) {
        for (let j=0; j<this.node_leaves[i].length; j++) {
          let c1 = realColor(this.node_leaves[i][j]);
          let c2 = realColor(this.node_leaves[i][(j+1)%this.node_leaves[i].length]);
          let c3 = realColor(this.node[i+3]);
          TRIANGLES_getTriangle_fill3(this.node_leaves[i][j], this.node_leaves[i][(j+1)%this.node_leaves[i].length], this.node[i+3], c1, c2, c3);
        }
      }
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }
    //for (let i=0; i<this.node.length; i++) {
    //  LINES_getLine(this.node[i].copy().add(-real(10), 0, 0), this.node[i].copy().add(real(10), 0, 0));
    //}



    //for (let i=0; i<this.node_trunk.length-1; i++) {
    //  for (let j=0; j<this.node_trunk[i].length; j++) {      
    //    LINES_getLine(this.node_trunk[i][j], this.node_trunk[i+1][j]);
    //  }
    //}

    for (let i=0; i<this.node_trunk.length; i++) {
      LINES_getLine(this.node_trunk[i][1], this.node_trunk[i][0]);
    }


    for (let i=0; i<this.node_base.length-1; i++) {
      LINES_getLine(this.node_base[i], this.node_base[i+1]);
    }


    if (!this.have_leaves) {
      for (let i=0; i<this.node_branch.length; i++) {
        for (let j=0; j<this.node_branch[i].length; j++) {
          if (this.show_branch[i][j]) {
            LINES_getLine(this.node_branch[i][j], this.node[i+2]);
          }
        }
      }
    } else {
      for (let i=0; i<this.node_leaves.length; i++) {
        for (let j=0; j<this.node_leaves[i].length; j++) {
          LINES_getLine(this.node_leaves[i][j], this.node[i+3]);
        }
      }
    }
  };
}