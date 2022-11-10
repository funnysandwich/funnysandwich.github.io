function Partition(begin, end, is_left, count_railBar, gap_railBar) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;
  this.gap_railBar = gap_railBar;







  this.node = Array.from(Array(2), () => new Array(2));
  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      this.node[i][j] = new Array(3);
      for (let k=0; k<this.node[i][j].length; k++) {
        this.node[i][j][k] = this.begin.copy();
      }
    }
  }


  this.H = real(400);


  this.diff = 635;
  if (this.is_left) {
    this.diff *= -1;
  }


  this.open_show = random(1) < 0.8;








  this.update = function(begin, end, index_railBar) {
    this.begin = begin.copy();
    this.end = end.copy();



    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        for (let k=0; k<this.node[i][j].length; k++) {
          if (i == 0) {
            this.node[i][j][k] = this.begin.copy();
            this.node[i][j][k].x += real(lerp(-40, 40, noise(this.count_railBar+645+j*16+this.diff)));
            this.node[i][j][k].z += real(lerp(-100, 400, noise(this.count_railBar+63+this.diff)));
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar+777+j*38+k*72+this.diff))) * map(j, 0, 1, 1, 0.85);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar+444+j*95+k*48+this.diff))) * map(j, 0, 1, 1, 0.85);
          } else if (i == this.node.length-1) {
            this.node[i][j][k] = this.end.copy();
            this.node[i][j][k].x += real(lerp(-40, 40, noise(this.count_railBar-this.gap_railBar+645+j*16+this.diff)));
            this.node[i][j][k].z += real(lerp(-100, 400, noise(this.count_railBar-this.gap_railBar+63+this.diff)));
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+777+j*38+k*72+this.diff))) * map(j, 0, 1, 1, 0.85);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+444+j*95+k*48+this.diff))) * map(j, 0, 1, 1, 0.85);
          }

          this.node[i][j][k].y = map(this.node[i][j][k].z, rail.begin.z, rail.end.z, rail.begin.y, rail.end.y) -this.H*j;

          if (j == 1) {
            if (i == 0) {
              this.node[i][j][k].y += real(lerp(-15, 15, noise(this.count_railBar+123+k*35+this.diff)));
            } else if (i == this.node.length-1) {
              this.node[i][j][k].y += real(lerp(-15, 15, noise(this.count_railBar-this.gap_railBar+123+k*35+this.diff)));
            }
          }
        }
      }
    }
  };






  this.update_rotate = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        for (let k=0; k<this.node[i][j].length; k++) {
          this.node[i][j][k] = PRotateX(this.node[i][j][k], roX);
          this.node[i][j][k].add(0, tranY, tranZ);
        }
      }
    }
  };













  this.display = function() {
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        const c1 = lerpColor(c_far, c_near, constrain(map(this.node[i][0][j].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
        const c2 = lerpColor(c_far, c_near, constrain(map(this.node[i][1][j].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
        TRIANGLES_getLine_weight_T_fill2(this.node[i][0][j], this.node[i][1][j], real(4), c1, c2);
      }
    }


    if (this.open_show) {


      fill(255);
      let n = p5.Vector.sub(this.node[0][1][0], this.node[0][0][0]).mult(0.25).add(this.node[0][0][0]);
      let n_ = p5.Vector.sub(this.node[1][1][0], this.node[1][0][0]).mult(0.25).add(this.node[1][0][0]);
      TRIANGLES_getRect(this.node[0][1][0], this.node[1][1][0], n_, n);




      for (let k=0; k<this.node[0][0].length-1; k++) {
        n = p5.Vector.sub(this.node[0][1][k], this.node[0][0][k]).mult(0.25).add(this.node[0][0][k]);
        n_ = p5.Vector.sub(this.node[1][1][k], this.node[1][0][k]).mult(0.25).add(this.node[1][0][k]);
        const c1 = lerpColor(c_far, c_near, constrain(map(n.z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
        const c2 = lerpColor(c_far, c_near, constrain(map(n_.z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
        let weight_line = map(roX, 0, 0.65, real(4), real(12));
        TRIANGLES_getLine_weight_Y_fill2(n, n_, weight_line, c1, c2);
        weight_line = map(roX, 0, 0.65, real(4), real(6));
        TRIANGLES_getLine_weight_Y_fill2(this.node[0][1][k], this.node[1][1][k], weight_line, c1, c2);
      }
    }
  };













  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        LINES_getLine(this.node[i][0][j], this.node[i][1][j]);
      }
    }
  };
}
