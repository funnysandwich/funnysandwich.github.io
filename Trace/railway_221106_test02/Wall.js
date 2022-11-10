function Wall(begin, end, is_left, count_railBar, count) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;
  this.count = count;
  this.index_railBar = 0;




  this.node_wall_e = Array.from(Array(2), () => new Array(2));
  for (let i=0; i<this.node_wall_e.length; i++) {
    for (let j=0; j<this.node_wall_e[i].length; j++) {
      this.node_wall_e[i][j] = this.begin.copy();
    }
  }
  this.node_wall_o = Array.from(Array(2), () => new Array(2));
  for (let i=0; i<this.node_wall_o.length; i++) {
    for (let j=0; j<this.node_wall_o[i].length; j++) {
      this.node_wall_o[i][j] = this.begin.copy();
    }
  }

  this.H_wall = real(500);
  this.W_wall = real(35);




  this.is_window = false;
  if (this.count % 2 == 0) {
    this.is_window = true;
  }

  if (this.is_window) {
    this.node_win_e = new Array(4);
    for (let i=0; i<this.node_win_e.length; i++) {
      this.node_win_e[i] = this.begin.copy();
    }
  }









  this.update = function(begin, end, index_railBar) {
    this.begin = begin.copy();
    this.end = end.copy();
    this.index_railBar = index_railBar;


    for (let i=0; i<this.node_wall_e.length; i++) {
      for (let j=0; j<this.node_wall_e[i].length; j++) {
        if (i == 0) {
          this.node_wall_e[i][j] = this.begin.copy();
        } else if (i == this.node_wall_e.length-1) {
          this.node_wall_e[i][j] = this.end.copy();
        }
        this.node_wall_e[i][j].y += -this.H_wall*j;

        this.node_wall_o[i][j] = this.node_wall_e[i][j].copy();
        if (this.is_left) {
          this.node_wall_o[i][j].x -= this.W_wall;
        } else {
          this.node_wall_o[i][j].x += this.W_wall;
        }
      }
    }




    if (this.is_window) {
      let wall_md_b = p5.Vector.sub(this.node_wall_e[0][1], this.node_wall_e[0][0]).mult(0.25).add(this.node_wall_e[0][0]);
      let wall_md_f = p5.Vector.sub(this.node_wall_e[1][1], this.node_wall_e[1][0]).mult(0.25).add(this.node_wall_e[1][0]);
      let win_md = p5.Vector.add(wall_md_b, wall_md_f).mult(0.5);
      let wall_mu_b = p5.Vector.sub(this.node_wall_e[0][1], this.node_wall_e[0][0]).mult(0.75).add(this.node_wall_e[0][0]);
      let wall_mu_f = p5.Vector.sub(this.node_wall_e[1][1], this.node_wall_e[1][0]).mult(0.75).add(this.node_wall_e[1][0]);
      let win_mu = p5.Vector.add(wall_mu_b, wall_mu_f).mult(0.5);

      this.node_win_e[0] = p5.Vector.sub(wall_md_b, win_md).setMag(real(100)).add(win_md);
      this.node_win_e[1] = p5.Vector.sub(wall_mu_b, win_mu).setMag(real(100)).add(win_mu);
      this.node_win_e[2] = p5.Vector.sub(wall_mu_f, win_mu).setMag(real(100)).add(win_mu);
      this.node_win_e[3] = p5.Vector.sub(wall_md_f, win_md).setMag(real(100)).add(win_md);
    }






    for (let i=0; i<this.node_wall_e.length; i++) {
      for (let j=0; j<this.node_wall_e[i].length; j++) {
        this.node_wall_e[i][j] = PRotateX(this.node_wall_e[i][j], roX);
        this.node_wall_e[i][j].add(0, tranY, tranZ);
        this.node_wall_o[i][j] = PRotateX(this.node_wall_o[i][j], roX);
        this.node_wall_o[i][j].add(0, tranY, tranZ);
      }
    }
    if (this.is_window) {
      for (let i=0; i<this.node_win_e.length; i++) {
        this.node_win_e[i] = PRotateX(this.node_win_e[i], roX);
        this.node_win_e[i].add(0, tranY, tranZ);
      }
    }
  };








  this.display = function() {
    let c1, c2, c3, c4;
    c1 = lerpColor(c_far, c_near, constrain(map(this.node_wall_e[0][0].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
    c2 = lerpColor(c_far, c1, 0.5);
    c4 = lerpColor(c_far, c_near, constrain(map(this.node_wall_e[1][0].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
    c3 = lerpColor(c_far, c4, 0.5);
    if (!this.is_window) {
      TRIANGLES_getRect_fill4(this.node_wall_e[0][0], this.node_wall_e[0][1], this.node_wall_e[1][1], this.node_wall_e[1][0], c1, c2, c3, c4);
    } else {
      let c5 = lerpColor(c_far, c_near, constrain(map(this.node_win_e[0].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
      c5 = lerpColor(c5, c_far, constrain(map(this.node_win_e[0].y, this.node_wall_e[0][0].y, this.node_wall_e[0][1].y, 0, 0.5), 0, 0.5));
      let c6 = lerpColor(c_far, c_near, constrain(map(this.node_win_e[1].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
      c6 = lerpColor(c6, c_far, constrain(map(this.node_win_e[1].y, this.node_wall_e[0][0].y, this.node_wall_e[0][1].y, 0, 0.5), 0, 0.5));
      let c7 = lerpColor(c_far, c_near, constrain(map(this.node_win_e[2].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
      c7 = lerpColor(c7, c_far, constrain(map(this.node_win_e[2].y, this.node_wall_e[1][0].y, this.node_wall_e[1][1].y, 0, 0.5), 0, 0.5));
      let c8 = lerpColor(c_far, c_near, constrain(map(this.node_win_e[3].z, rail.begin.z, rail.end.z, 0, 1), 0, 1));
      c8 = lerpColor(c8, c_far, constrain(map(this.node_win_e[3].y, this.node_wall_e[1][0].y, this.node_wall_e[1][1].y, 0, 0.5), 0, 0.5));
      TRIANGLES_getRect_fill4(this.node_wall_e[0][0], this.node_win_e[0], this.node_win_e[3], this.node_wall_e[1][0], c1, c5, c8, c4);
      TRIANGLES_getRect_fill4(this.node_wall_e[1][0], this.node_win_e[3], this.node_win_e[2], this.node_wall_e[1][1], c4, c8, c7, c3);
      TRIANGLES_getRect_fill4(this.node_wall_e[1][1], this.node_win_e[2], this.node_win_e[1], this.node_wall_e[0][1], c3, c7, c6, c2);
      TRIANGLES_getRect_fill4(this.node_wall_e[0][1], this.node_win_e[1], this.node_win_e[0], this.node_wall_e[0][0], c2, c6, c5, c1);
    }
  };








  this.displayInfo = function() {
    for (let i=0; i<this.node_wall_e.length; i++) {
      for (let j=0; j<this.node_wall_e[i].length-1; j++) {
        LINES_getLine(this.node_wall_e[i][j], this.node_wall_e[i][j+1]);
        LINES_getLine(this.node_wall_o[i][j], this.node_wall_o[i][j+1]);
      }
    }
    for (let i=0; i<this.node_wall_e.length-1; i++) {
      for (let j=0; j<this.node_wall_e[i].length; j++) {
        LINES_getLine(this.node_wall_e[i][j], this.node_wall_e[i+1][j]);
        LINES_getLine(this.node_wall_o[i][j], this.node_wall_o[i+1][j]);
      }
    }
    for (let i=0; i<this.node_wall_e.length; i++) {
      for (let j=0; j<this.node_wall_e[i].length; j++) {
        LINES_getLine(this.node_wall_e[i][j], this.node_wall_o[i][j]);
        LINES_getLine(this.node_wall_e[i][j], this.node_wall_o[i][j]);
      }
    }

    if (this.is_window) {
      LINES_getEllipse(this.node_win_e);
    }
  };
}
