function Pillar(begin, end, is_left, count_railBar, gap_railBar) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;
  this.gap_railBar = gap_railBar;







  this.node = Array.from(Array(2), () => new Array(2));
  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      this.node[i][j] = new Array(5);
      for (let k=0; k<this.node[i][j].length; k++) {
        this.node[i][j][k] = this.begin.copy();
      }
    }
  }



  this.node_hor = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_hor.length; i++) {
    for (let j=0; j<this.node_hor[i].length; j++) {
      this.node_hor[i][j] = new Array(2);
      for (let k=0; k<this.node_hor[i][j].length; k++) {
        this.node_hor[i][j][k] = this.begin.copy();
      }
    }
  }


  this.node_roof = new Array(this.node.length);
  for (let i=0; i<this.node_roof.length; i++) {
    this.node_roof[i] = new Array(2); 
    for (let j=0; j<this.node_roof[i].length; j++) {
      this.node_roof[i][j] = this.begin.copy();
    }
  }




  this.node_line_l = Array.from(Array(40), () => new Array(2));
  this.node_line_r = Array.from(Array(40), () => new Array(2));
  for (let i=0; i<this.node_line_l.length; i++) {
    for (let j=0; j<this.node_line_l[i].length; j++) {
      this.node_line_l[i][j] = this.begin.copy();
    }
  }
  for (let i=0; i<this.node_line_r.length; i++) {
    for (let j=0; j<this.node_line_r[i].length; j++) {
      this.node_line_r[i][j] = this.begin.copy();
    }
  }





  this.H = real(425);


  this.diff = 635;
  if (this.is_left) {
    this.diff *= -1;
  }



  this.open_show = true;
  if (this.count_railBar == 0) {
    this.open_show = false;
  }










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
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar+777+j*38+k*72+this.diff))) * map(j, 0, 1, 1, 0.5);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar+444+j*95+k*48+this.diff))) * map(j, 0, 1, 1, 0.5);
          } else if (i == this.node.length-1) {
            this.node[i][j][k] = this.end.copy();
            this.node[i][j][k].x += real(lerp(-40, 40, noise(this.count_railBar-this.gap_railBar+645+j*16+this.diff)));
            this.node[i][j][k].z += real(lerp(-100, 400, noise(this.count_railBar-this.gap_railBar+63+this.diff)));
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+777+j*38+k*72+this.diff))) * map(j, 0, 1, 1, 0.5);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+444+j*95+k*48+this.diff))) * map(j, 0, 1, 1, 0.5);
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





    for (let i=0; i<this.node_hor.length; i++) {
      for (let j=0; j<this.node_hor[i].length; j++) {
        for (let k=0; k<this.node_hor[i][j].length; k++) {
          //this.node_hor[i][j] = this.node[i][1][0].copy().add(-real(100) * pow(-1, j), 0, 0);
          this.node_hor[i][j][k] = p5.Vector.sub(this.node[i][0][k], this.node[i][1][k]).setMag(real(50)).add(this.node[i][1][k]).add(-real(100) * pow(-1, j), 0, 0);
        }
      }
    }



    for (let i=0; i<this.node_roof.length; i++) {
      for (let j=0; j<this.node_roof[i].length; j++) {
        //this.node_roof[i] = p5.Vector.sub(this.node[i][1][0], this.node[i][0][0]).setMag(this.H).add(this.node[i][0][0]);
        this.node_roof[i][j] = this.node[i][1][j].copy();
      }
    }




    for (let i=0; i<this.node_line_l.length; i++) {
      this.node_line_l[i][0] = p5.Vector.sub(this.node_roof[1][0], this.node_roof[0][0]).mult(i/this.node_line_l.length + (1/this.node_line_l.length)*lerp(-1, 1, noise(this.count_railBar+92+i*92+this.diff))).add(this.node_roof[0][0]);
      this.node_line_l[i][1] = p5.Vector.sub(this.node_hor[1][0][0], this.node_hor[0][0][0]).mult(i/this.node_line_l.length + (1/this.node_line_l.length)*lerp(-1, 1, noise(this.count_railBar+46+i*26+this.diff))).add(this.node_hor[0][0][0]);
      //for (let j=0; j<this.node_line_l[i].length; j++) {
      this.node_line_l[i][0].add(p5.Vector.sub(this.node[0][1][0], this.node[0][0][0]).setMag(real(2)));
      //}
    }
    for (let i=0; i<this.node_line_r.length; i++) {
      this.node_line_r[i][0] = p5.Vector.sub(this.node_roof[1][0], this.node_roof[0][0]).mult(i/this.node_line_r.length + (1/this.node_line_r.length)*lerp(-1, 1, noise(this.count_railBar+9+i*35+this.diff))).add(this.node_roof[0][0]);
      this.node_line_r[i][1] = p5.Vector.sub(this.node_hor[1][1][0], this.node_hor[0][1][0]).mult(i/this.node_line_r.length + (1/this.node_line_r.length)*lerp(-1, 1, noise(this.count_railBar+91+i*63+this.diff))).add(this.node_hor[0][1][0]);
      //for (let j=0; j<this.node_line_r[i].length; j++) {
      this.node_line_r[i][0].add(p5.Vector.sub(this.node[0][1][0], this.node[0][0][0]).setMag(real(2)));
      //}
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
    for (let i=0; i<this.node_hor.length; i++) {
      for (let j=0; j<this.node_hor[i].length; j++) {
        for (let k=0; k<this.node_hor[i][j].length; k++) {
          this.node_hor[i][j][k] = PRotateX(this.node_hor[i][j][k], roX);
          this.node_hor[i][j][k].add(0, tranY, tranZ);
        }
      }
    }
    for (let i=0; i<this.node_roof.length; i++) {
      for (let j=0; j<this.node_roof[i].length; j++) {
        this.node_roof[i][j] = PRotateX(this.node_roof[i][j], roX);
        this.node_roof[i][j].add(0, tranY, tranZ);
      }
    }
    for (let i=0; i<this.node_line_l.length; i++) {
      for (let j=0; j<this.node_line_l[i].length; j++) {
        this.node_line_l[i][j] = PRotateX(this.node_line_l[i][j], roX);
        this.node_line_l[i][j].add(0, tranY, tranZ);
      }
    }
    for (let i=0; i<this.node_line_r.length; i++) {
      for (let j=0; j<this.node_line_r[i].length; j++) {
        this.node_line_r[i][j] = PRotateX(this.node_line_r[i][j], roX);
        this.node_line_r[i][j].add(0, tranY, tranZ);
      }
    }
  };













  this.display = function() {
    let c1, c2;
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        c1 = lerpColor(c_far, c_near, constrain(map(this.node[i][0][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        c2 = lerpColor(c_far, c_near, constrain(map(this.node[i][1][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        TRIANGLES_getLine_weight_T_fill2(this.node[i][0][j], this.node[i][1][j], real(4), c1, c2);
      }
    }

    if (this.open_show) {
      let weight_line = map(roX, 0, 0.65, real(3), real(8));
      for (let k=0; k<this.node_hor[0][0].length; k++) {
        c1 = lerpColor(c_far, c_near, constrain(map(this.node_roof[0][k].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        c2 = lerpColor(c_far, c_near, constrain(map(this.node_roof[1][k].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        TRIANGLES_getLine_weight_Y_fill2(this.node_hor[0][0][k], this.node_hor[1][0][k], weight_line, c1, c2); // l
        TRIANGLES_getLine_weight_Y_fill2(this.node_hor[0][1][k], this.node_hor[1][1][k], weight_line, c1, c2); // r
        TRIANGLES_getLine_weight_Y_fill2(this.node_roof[0][k], this.node_roof[1][k], weight_line, c1, c2); // U
      }

      if (this.is_left) {
        if (roX > 0.08) {
          c1 = color(255);
          c2 = color(255);
        } else {
          c1 = lerpColor(c_far, c_near, constrain(map(this.node_roof[0][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          c2 = lerpColor(c_far, c_near, constrain(map(this.node_roof[1][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        }
        TRIANGLES_getRect_fill4(this.node_hor[0][0][0], this.node_roof[0][0], this.node_roof[1][0], this.node_hor[1][0][0], c1, c1, c2, c2); // l
        c1 = color(255);
        c2 = color(255);
        TRIANGLES_getRect_fill4(this.node_hor[0][1][0], this.node_roof[0][0], this.node_roof[1][0], this.node_hor[1][1][0], c1, c1, c2, c2); // r
      } else {
        if (roX > 0.08) {
          c1 = color(255);
          c2 = color(255);
        } else {
          c1 = lerpColor(c_far, c_near, constrain(map(this.node_roof[0][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          c2 = lerpColor(c_far, c_near, constrain(map(this.node_roof[1][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        }
        TRIANGLES_getRect_fill4(this.node_hor[0][1][0], this.node_roof[0][0], this.node_roof[1][0], this.node_hor[1][1][0], c1, c1, c2, c2); // r
        c1 = color(255);
        c2 = color(255);
        TRIANGLES_getRect_fill4(this.node_hor[0][0][0], this.node_roof[0][0], this.node_roof[1][0], this.node_hor[1][0][0], c1, c1, c2, c2); // l
      }


      //weight_line = map(roX, 0, 0.65, real(3), real(8));
      weight_line = real(3);
      if (!this.is_left  ||  roX > 0.15) {
        for (let i=0; i<this.node_line_l.length; i++) {
          c1 = lerpColor(c_far, c_near, constrain(map(this.node_line_l[i][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          c2 = lerpColor(c_far, c_near, constrain(map(this.node_line_l[i][1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          TRIANGLES_getLine_weight_T_fill2(this.node_line_l[i][0], this.node_line_l[i][1], weight_line, c1, c2);
        }
      }
      if (this.is_left  ||  roX > 0.15) {
        for (let i=0; i<this.node_line_r.length; i++) {
          c1 = lerpColor(c_far, c_near, constrain(map(this.node_line_r[i][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          c2 = lerpColor(c_far, c_near, constrain(map(this.node_line_r[i][1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          TRIANGLES_getLine_weight_T_fill2(this.node_line_r[i][0], this.node_line_r[i][1], weight_line, c1, c2);
        }
      }
    }
  };













  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        LINES_getLine(this.node[i][0][j], this.node[i][1][j]);
      }
    }
    for (let k=0; k<this.node_hor[0][0].length; k++) {
      for (let i=0; i<this.node_hor.length; i++) {
        LINES_getLine(this.node_hor[i][0][k], this.node_hor[i][1][k]);
        for (let j=0; j<this.node_hor[i].length; j++) {
          if (i < this.node_hor.length-1) {
            LINES_getLine(this.node_hor[i][j][k], this.node_hor[i+1][j][k]);
          }
          LINES_getLine(this.node_hor[i][j][k], this.node_roof[i][k]);
        }
      }
      LINES_getLine(this.node_roof[0][k], this.node_roof[1][k]);
      for (let i=0; i<this.node_roof.length; i++) {
        LINES_getLine(this.node_roof[i][k], this.node[i][1][k]);
      }
    }
    for (let i=0; i<this.node_line_l.length; i++) {
      LINES_getLine(this.node_line_l[i][0], this.node_line_l[i][1]);
    }
    for (let i=0; i<this.node_line_r.length; i++) {
      LINES_getLine(this.node_line_r[i][0], this.node_line_r[i][1]);
    }
  };
}
