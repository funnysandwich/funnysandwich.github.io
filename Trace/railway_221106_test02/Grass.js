function Grass(begin, range_H_ori) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();

  this.num = floor(random(2, 5.5));


  this.node = Array.from(Array(this.num), () => new Array(floor(random(3, 5))));
  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      this.node[i][j] = this.begin.copy();
    }
  }


  this.H_ori = new Array(this.num);
  for (let i=0; i<this.H_ori.length; i++) {
    this.H_ori[i] = real(random(range_H_ori.x, range_H_ori.y));
  }


  this.rotate_Z = new Array(this.num);
  for (let i=0; i<this.rotate_Z.length; i++) {
    if (i < this.rotate_Z.length/2) {
      this.rotate_Z[i] = random(-PI*0.125, -PI*0.025);
    } else {
      this.rotate_Z[i] = random(PI*0.025, PI*0.125);
    }
  }





  this.update = function(begin) {
    this.begin = begin.copy();



    for (let i=0; i<this.node.length; i++) {
      if (i == 0) {
        this.node[i][0] = this.begin.copy();
      } else {
        this.node[i][0] = this.node[i-1][0].copy();
        this.node[i][0].x += lerp(real(5), real(15), noise(this.ran+i*88));
        this.node[i][0].z = this.begin.z + lerp(-real(20), real(20), noise(this.ran+i*124));
      }
      this.node[i][1] = createVector(0, -this.H_ori[i], 0);
      this.node[i][1] = PRotateZ(this.node[i][1], this.rotate_Z[i]).add(this.node[i][0]);
      if (this.node[i].length > 2) {
        for (let j=2; j<this.node[i].length; j++) {
          this.node[i][j] = p5.Vector.sub(this.node[i][j-1], this.node[i][j-2]).mult(pow(0.8, (j-1)));
          this.node[i][j] = PRotateZ(this.node[i][j], this.rotate_Z[i]).add(this.node[i][j-1]);
        }
      }
    }



    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        this.node[i][j] = PRotateX(this.node[i][j], roX);
        this.node[i][j].add(0, tranY, tranZ);
      }
    }
  };











  this.display = function() {
    const c1 = lerpColor(c_far, c_near, constrain(map(this.begin.z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
    fill(c1);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        TRIANGLES_getLine_weight_T(this.node[i][j], this.node[i][j+1], real(1.5));
      }
    }
  };











  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        LINES_getLine(this.node[i][j], this.node[i][j+1]);
      }
    }
  };
}
