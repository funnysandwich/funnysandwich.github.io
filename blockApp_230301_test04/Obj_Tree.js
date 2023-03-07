function Tree(center_d, W_room, D_room, H_room) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();


  this.node_trunk = Array.from(Array(floor(FS_rand(3, 6))), () => new Array(8));
  for (let i=0; i<this.node_trunk.length; i++) {
    for (let j=0; j<this.node_trunk[i].length; j++) {
      this.node_trunk[i][j] = this.center_d.copy();
    }
  }

  this.W_trunk = map(this.node_trunk.length, 3, 5, real(2), real(3));
  this.H_trunk_base = real(40);


  this.node_branch = new Array(this.node_trunk.length-2);
  for (let i=0; i<this.node_branch.length; i++) {
    this.node_branch[i] = new Array(floor(FS_rand(3, 7)));
    for (let j=0; j<this.node_branch[i].length; j++) {
      this.node_branch[i][j] = Array.from(Array(floor(map(i, this.node_trunk.length-2, 0, 2, 4)+FS_rand(0, 2))), () => new Array(6));
      for (let k=0; k<this.node_branch[i][j].length; k++) {
        for (let l=0; l<this.node_branch[i][j][k].length; l++) {
          this.node_branch[i][j][k][l] = this.center_d.copy();
        }
      }
    }
  }




  this.update = function() {
    for (let i=0; i<this.node_trunk.length; i++) {
      let w = map(i, 0, this.node_trunk.length-1, this.W_trunk, real(1));
      let y = 0;
      if (i > 0) {
        y = -this.H_trunk_base * pow(0.5, i);
      }
      for (let j=0; j<this.node_trunk[i].length; j++) {
        let x = cos(map(j, 0, this.node_trunk[i].length, 0, TWO_PI)) * w/2;
        let z = sin(map(j, 0, this.node_trunk[i].length, 0, TWO_PI)) * w/2;
        this.node_trunk[i][j] = createVector(x, y, z);
        this.node_trunk[i][j] = PRotateX(this.node_trunk[i][j], lerp(-HALF_PI*0.25, HALF_PI*0.25, noise(this.ran+242+i*0.25))*map(i, 0, this.node_trunk.length-1, 0, 1));
        this.node_trunk[i][j] = PRotateZ(this.node_trunk[i][j], lerp(-HALF_PI*0.25, HALF_PI*0.25, noise(this.ran+6666+i*0.25))*map(i, 0, this.node_trunk.length-1, 0, 1));
        if (i == 0) {
          this.node_trunk[i][j].add(this.center_d);
        } else {
          this.node_trunk[i][j].add(p5.Vector.add(this.node_trunk[i-1][0], this.node_trunk[i-1][floor(this.node_trunk[i].length/2)]).mult(0.5));
        }
      }
    }




    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        for (let k=0; k<this.node_branch[i][j].length; k++) {
          let w = map(i, -1, this.node_branch.length-1, real(2), real(1));
          w *= map(this.node_branch[i][j].length, 2, 4, 0.6, 1);
          w *= map(k, 0, this.node_branch[i][j].length-1, 1, 0.1);
          let y = 0;
          if (k > 0) {
            y = -map(i, 0, 4, real(10), real(6)) * pow(0.7, k);
          }
          for (let l=0; l<this.node_branch[i][j][k].length; l++) {
            let x = cos(map(l, 0, this.node_branch[i][j][k].length, 0, TWO_PI)) * w/2;
            let z = sin(map(l, 0, this.node_branch[i][j][k].length, 0, TWO_PI)) * w/2;
            this.node_branch[i][j][k][l] = createVector(x, y, z);
            if (k == 0) {
              this.node_branch[i][j][k][l] = PRotateZ(this.node_branch[i][j][k][l], HALF_PI);
            } else {
              this.node_branch[i][j][k][l] = PRotateX(this.node_branch[i][j][k][l], lerp(-HALF_PI*0.25, HALF_PI*0.25, noise(this.ran*42+1678+i*0.5))*map(k, 0, this.node_branch[i][j].length-1, 0, 1));
              this.node_branch[i][j][k][l] = PRotateZ(this.node_branch[i][j][k][l], HALF_PI*1.25 + lerp(-HALF_PI*0.25, HALF_PI*0.25, noise(this.ran*13+626+i*0.5))*map(k, 0, this.node_branch[i][j].length-1, 0, 1));
            }
            this.node_branch[i][j][k][l] = PRotateY(this.node_branch[i][j][k][l], lerp(TWO_PI/this.node_branch[i].length, TWO_PI/this.node_branch[i].length, noise(this.ran*34+134+i*35+j*45)) + (TWO_PI/this.node_branch[i].length)*j);

            if (k == 0) {
              this.node_branch[i][j][k][l].add(p5.Vector.add(this.node_trunk[i+1][0], this.node_trunk[i+1][floor(this.node_trunk[i].length/2)]).mult(0.5));
            } else {
              this.node_branch[i][j][k][l].add(p5.Vector.add(this.node_branch[i][j][k-1][0], this.node_branch[i][j][k-1][floor(this.node_branch[i][j][k-1].length/2)]).mult(0.5));
            }
          }
        }
      }
    }
  };









  this.display = function(_state_noise, _var_noise) {
    fill(c_dark);
    noStroke();
    drawCylinder_TRIANGLES(this.node_trunk);
    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        drawCylinder_TRIANGLES(this.node_branch[i][j]);
      }
    }

    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(0.25));
    //drawCylinder_LINES(this.node_trunk, 0);
    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        //drawCylinder_info(this.node_branch[i][j]);
      }
    }
  };
}