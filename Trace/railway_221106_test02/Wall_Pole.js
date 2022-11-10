function Pole(begin, end, is_left, count_railBar, gap_railBar) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;
  this.gap_railBar = gap_railBar;


  this.num = floor(random(1, 4.25)) + 1;
  //this.num = 2;

  this.node = Array.from(Array(this.num), () => new Array(2));
  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      this.node[i][j] = this.begin.copy();
    }
  }

  this.H = new Array(this.num);
  for (let i=0; i<this.H.length; i++) {
    this.H[i] = real(random(230, 270));
  }


  this.diff = 999;
  if (this.is_left) {
    this.diff = -999;
  }









  this.update = function(begin, end, index_railBar) {
    this.begin = begin.copy();
    this.end = end.copy();



    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        if (i == 0) {
          this.node[i][j] = this.begin.copy();
          this.node[i][j].x += real(lerp(-20, 20, noise(this.count_railBar+222+j*94+this.diff)));
          this.node[i][j].z += real(lerp(-15, 15, noise(this.count_railBar+22+j*49+this.diff)));
        } else if (i == this.node.length-1) {
          this.node[i][j] = this.end.copy();
          this.node[i][j].x += real(lerp(-20, 20, noise(this.count_railBar-this.gap_railBar+222+j*94+this.diff)));
          this.node[i][j].z += real(lerp(-15, 15, noise(this.count_railBar-this.gap_railBar+22+j*49+this.diff)));
        } else {
          this.node[i][j] = p5.Vector.sub(this.end, this.begin).mult(i/this.node.length + real(lerp(-0.2, 0.2, noise(this.count_railBar+i*551+j*25+this.diff)))).add(this.begin);
          this.node[i][j].x += real(lerp(-20, 20, noise(this.count_railBar+i*53+j*81+this.diff)));
        }
        //this.node_wall[i][0] = p5.Vector.sub(this.end, this.begin).mult(i/this.node_wall.length).add(this.begin);
        this.node[i][j].y = map(this.node[i][j].z, rail.begin.z, rail.end.z, rail.begin.y, rail.end.y) -this.H[i]*j;
      }
    }
  };








  this.update_rotate = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        this.node[i][j] = PRotateX(this.node[i][j], roX);
        this.node[i][j].add(0, tranY, tranZ);
      }
    }
  };








  this.display = function() {
    for (let i=0; i<this.node.length-1; i++) {
      const c1 = lerpColor(c_far, c_near, constrain(map(this.node[i][0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      const c2 = lerpColor(c_far, c_near, constrain(map(this.node[i][1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      TRIANGLES_getLine_weight_T_fill2(this.node[i][0], this.node[i][1], real(4), c1, c2);
    }


    for (let i=0; i<this.node.length-1; i++) {
      let n0 = p5.Vector.sub(this.node[i][1], this.node[i][0]).setMag(real(175)).add(this.node[i][0]);
      let n1 = p5.Vector.sub(this.node[i+1][1], this.node[i+1][0]).setMag(real(175)).add(this.node[i+1][0]);
      const c1 = lerpColor(c_far, c_near, constrain(map(n0.z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      const c2 = lerpColor(c_far, c_near, constrain(map(n1.z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      TRIANGLES_getLine_weight_T_fill2(n0, n1, real(3), c1, c2);
      TRIANGLES_getLine_weight_Y_fill2(n0, n1, real(3), c1, c2);
    }
  };







  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i++) {
      LINES_getLine(this.node[i][0], this.node[i][1]);
    }
  };
}
