function TelePole(begin, end, is_left, count_railBar, gap_railBar) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;
  this.index_railBar = 0;
  this.gap_railBar = gap_railBar;



  //this.num = floor(random(1, 4.25)) + 1;
  this.num = 2;

  this.node = Array.from(Array(this.num), () => new Array(2));
  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      this.node[i][j] = new Array(3);
      for (let k=0; k<this.node[i][j].length; k++) {
        this.node[i][j][k] = this.begin.copy();
      }
    }
  }

  this.H = new Array(this.num);
  for (let i=0; i<this.H.length; i++) {
    this.H[i] = real(600 + lerp(-40, 40, noise(this.count_railBar*99)));
    if (i == this.H.length-1) {
      this.H[i] = real(600 + lerp(-40, 40, noise((this.count_railBar-8)*99)));
    }
  }




  this.node_hor = Array.from(Array(this.num), () => new Array(2));
  for (let i=0; i<this.node_hor.length; i++) {
    for (let j=0; j<this.node_hor[i].length; j++) {
      this.node_hor[i][j] = new Array(3);
      for (let k=0; k<this.node_hor[i][j].length; k++) {
        this.node_hor[i][j][k] = this.begin.copy();
      }
    }
  }




  this.node_line = Array.from(Array(2), () => new Array(5));
  for (let i=0; i<this.node_line.length; i++) {
    for (let j=0; j<this.node_line[i].length; j++) {
      this.node_line[i][j] = this.begin.copy();
    }
  }




  this.diff = 999;
  if (this.is_left) {
    this.diff = -999;
  }









  this.update = function(begin, end, index_railBar) {
    this.begin = begin.copy();
    this.end = end.copy();
    this.index_railBar = index_railBar;



    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        for (let k=0; k<this.node[i][j].length; k++) {
          if (i == 0) {
            this.node[i][j][k] = this.begin.copy();
            this.node[i][j][k].x += real(lerp(-50, 50, noise(this.count_railBar+222+j*94+this.diff)));
            this.node[i][j][k].z += real(lerp(-100, 800, noise(this.count_railBar+22+this.diff)));
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar+222+j*94+k*37+this.diff))) * map(j, 0, 1, 1, 0.5);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar+222+j*12+k*84+this.diff))) * map(j, 0, 1, 1, 0.5);
          } else if (i == this.node.length-1) {
            this.node[i][j][k] = this.end.copy();
            this.node[i][j][k].x += real(lerp(-50, 50, noise(this.count_railBar-this.gap_railBar+222+j*94+this.diff)));
            this.node[i][j][k].z += real(lerp(-100, 800, noise(this.count_railBar-this.gap_railBar+22+this.diff)));
            this.node[i][j][k].x += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+222+j*94+k*37+this.diff))) * map(j, 0, 1, 1, 0.5);
            this.node[i][j][k].z += real(lerp(-30, 30, noise(this.count_railBar-this.gap_railBar+222+j*12+k*84+this.diff))) * map(j, 0, 1, 1, 0.5);
          } else {
            this.node[i][j][k] = p5.Vector.sub(this.end, this.begin).mult(i/this.node.length + real(lerp(-0.2, 0.2, noise(this.count_railBar+i*551+j*25+this.diff)))).add(this.begin);
            this.node[i][j][k].x += real(lerp(-20, 20, noise(this.count_railBar+i*53+j*81+this.diff)));
          }
          //this.node_wall[i][0] = p5.Vector.sub(this.end, this.begin).mult(i/this.node_wall.length).add(this.begin);
          this.node[i][j][k].y = map(this.node[i][j][k].z, rail.begin.z, rail.end.z, rail.begin.y, rail.end.y) -this.H[i]*j;
        }
      }
    }



    for (let i=0; i<this.node_hor.length; i++) {
      for (let j=0; j<this.node_hor[i].length; j++) {
        for (let k=0; k<this.node_hor[i][j].length; k++) {
          this.node_hor[i][j][k] = this.node[i][1][k].copy().add(-real(100) * pow(-1, j), 0, 0);
          if (i < this.node_hor.length-1) {
            this.node_hor[i][j][k].y += real(lerp(0, 50, noise((this.count_railBar)+i*4+j*49+k*92+this.diff)));
          } else {
            this.node_hor[i][j][k].y += real(lerp(0, 50, noise((this.count_railBar-this.gap_railBar)+0*4+j*49+k*92+this.diff)));
          }
        }
      }
    }





    for (let i=0; i<this.node_line.length; i++) {
      for (let j=0; j<this.node_line[i].length; j++) {
        if (j == 0) {
          this.node_line[i][j] = this.node_hor[0][i][0].copy();
        } else if (j == this.node_line[i].length-1) {
          this.node_line[i][j] = this.node_hor[this.node_hor.length-1][i][0].copy();
        } else {
          this.node_line[i][j] = lerpVector(this.node_line[i][0], this.node_line[i][this.node_line[i].length-1], map(j, 0, this.node_line[i].length-1, 0, 1));
          this.node_line[i][j].y = map(this.node_line[i][j].z, rail.begin.z, rail.end.z, rail.begin.y, rail.end.y) - this.H[i]*map(sin(map(j, 0, this.node_line[i].length-1, 0, PI)), 0, 1, 1, 0.8);
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
    for (let i=0; i<this.node_hor.length; i++) {
      for (let j=0; j<this.node_hor[i].length; j++) {
        for (let k=0; k<this.node_hor[i][j].length; k++) {
          this.node_hor[i][j][k] = PRotateX(this.node_hor[i][j][k], roX);
          this.node_hor[i][j][k].add(0, tranY, tranZ);
        }
      }
    }

    for (let i=0; i<this.node_line.length; i++) {
      for (let j=0; j<this.node_line[i].length; j++) {
        this.node_line[i][j] = PRotateX(this.node_line[i][j], roX);
        this.node_line[i][j].add(0, tranY, tranZ);
      }
    }
  };





  this.display = function() {
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        const c1 = lerpColor(c_far, c_near, constrain(map(this.node[i][0][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        const c2 = lerpColor(c_far, c_near, constrain(map(this.node[i][1][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        TRIANGLES_getLine_weight_T_fill2(this.node[i][0][j], this.node[i][1][j], real(4), c1, c2);
      }

      for (let j=0; j<this.node_hor[i][0].length; j++) {
        const c1 = lerpColor(c_far, c_near, constrain(map(this.node_hor[i][0][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        const c2 = lerpColor(c_far, c_near, constrain(map(this.node_hor[i][1][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        TRIANGLES_getLine_weight_T_fill2(this.node_hor[i][0][j], this.node_hor[i][1][j], real(4), c1, c2);
      }
    }


    if (this.count_railBar != 0) {
      for (let i=0; i<this.node_line.length; i++) {
        for (let j=0; j<this.node_line[i].length-1; j++) {
          const c1 = lerpColor(c_far, c_near, constrain(map(this.node_line[i][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          const c2 = lerpColor(c_far, c_near, constrain(map(this.node_line[i][j+1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
          TRIANGLES_getLine_weight_fill2(this.node_line[i][j], this.node_line[i][j+1], real(3), c1, c2);
          TRIANGLES_getLine_weight_Y_fill2(this.node_line[i][j], this.node_line[i][j+1], real(3), c1, c2);
        }
      }
    }
  };







  this.displayInfo = function() {
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<this.node[i][0].length; j++) {
        LINES_getLine(this.node[i][0][j], this.node[i][1][j]);
      }
      for (let j=0; j<this.node_hor[i][0].length; j++) {
        LINES_getLine(this.node_hor[i][0][j], this.node_hor[i][1][j]);
      }
    }

    for (let i=0; i<this.node_line.length; i++) {
      for (let j=0; j<this.node_line[i].length-1; j++) {
        LINES_getLine(this.node_line[i][j], this.node_line[i][j+1]);
      }
    }
  };
}
