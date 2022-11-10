function Sea(begin, end, is_left, count_railBar) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;
  this.count_railBar = count_railBar;




  this.node_sea = Array.from(Array(5), () => new Array(3));
  for (let i=0; i<this.node_sea.length; i++) {
    for (let j=0; j<this.node_sea[i].length; j++) {
      this.node_sea[i][j] = createVector(0, 0, 0);
    }
  }







  this.update = function(begin, end) {
    this.begin = begin.copy();
    this.end = end.copy();



    for (let i=0; i<this.node_sea.length; i++) {
      for (let j=0; j<this.node_sea[i].length; j++) {
        this.node_sea[i][j] = p5.Vector.sub(this.end, this.begin).mult(j/(this.node_sea[i].length-1)).add(this.begin);
        if (this.is_left) {
          this.node_sea[i][j].add(lerp(-real(250), real(150), noise((this.count_railBar*(this.node_sea[i].length-1) + (this.node_sea[i].length-j))*0.05  +  i*0.5  +  frameCount*0.01)), 0, 0);
          this.node_sea[i][j].add(i * -real(50), 0, 0);
        } else {
          this.node_sea[i][j].add(lerp(-real(150), real(250), noise((9999 + this.count_railBar*(this.node_sea[i].length-1) + (this.node_sea[i].length-j))*0.05  +  i*0.5  +  frameCount*0.01)), 0, 0);
          this.node_sea[i][j].add(i * real(50), 0, 0);
        }
      }
    }



    for (let i=0; i<this.node_sea.length; i++) {
      for (let j=0; j<this.node_sea[i].length; j++) {
        this.node_sea[i][j] = PRotateX(this.node_sea[i][j], roX);
        this.node_sea[i][j].add(0, tranY, tranZ);
      }
    }
  };








  this.display = function() {
    for (let i=0; i<this.node_sea[0].length-1; i++) {
      const c1 = lerpColor(c_far, c_near, constrain(map(this.node_sea[0][i].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      const c2 = lerpColor(c_far, c_near, constrain(map(this.node_sea[0][i+1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
      if (this.is_left) {
        TRIANGLES_getRect_fill4(this.node_sea[0][i], this.node_sea[0][i+1], createVector(map(this.node_sea[0][i+1].z, rail.begin.z, rail.end.z, -real(2000), -real(1000)), this.node_sea[0][i+1].y, this.node_sea[0][i+1].z), createVector(map(this.node_sea[0][i].z, rail.begin.z, rail.end.z, -real(2000), -real(1000)), this.node_sea[0][i].y, this.node_sea[0][i].z), c_sky, c_sky, c2, c1);
      } else {
        TRIANGLES_getRect_fill4(this.node_sea[0][i], this.node_sea[0][i+1], createVector(map(this.node_sea[0][i+1].z, rail.begin.z, rail.end.z, real(2000), real(1000)), this.node_sea[0][i+1].y, this.node_sea[0][i+1].z), createVector(map(this.node_sea[0][i].z, rail.begin.z, rail.end.z, real(2000), real(1000)), this.node_sea[0][i].y, this.node_sea[0][i].z), c_sky, c_sky, c2, c1);
      }
    }


    for (let i=0; i<this.node_sea.length; i++) {
      for (let j=0; j<this.node_sea[i].length-1; j++) {
        const c1 = lerpColor(c_far, c_near, constrain(map(this.node_sea[i][j].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        const c2 = lerpColor(c_far, c_near, constrain(map(this.node_sea[i][j+1].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
        TRIANGLES_getLine_weight_fill2(this.node_sea[i][j], this.node_sea[i][j+1], real(2), c1, c2);
      }
    }
  };




  this.displayInfo = function() {
    for (let i=0; i<this.node_sea.length; i++) {
      for (let j=0; j<this.node_sea[i].length-1; j++) {
        LINES_getLine(this.node_sea[i][j], this.node_sea[i][j+1]);
      }
    }
  };
}
