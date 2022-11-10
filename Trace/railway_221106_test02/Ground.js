function Ground(begin) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();


  if (state_ground == 0) {
    this.node = new Array(floor(random(2, 4)));
  } else if (state_ground == 1) {
    this.node = new Array(2);
  } else if (state_ground == 2) {
    this.node = new Array(2);
    this.railBar_node_l_ver_begin = createVector(0, 0, 0);
    this.railBar_node_l_ver_end = createVector(0, 0, 0);    
    this.railBar_node_r_ver_begin = createVector(0, 0, 0);
    this.railBar_node_r_ver_end = createVector(0, 0, 0);
  }


  for (let i=0; i<this.node.length; i++) {
    this.node[i] = createVector(0, 0, 0);
  }








  this.update = function(begin) {
    this.begin = begin.copy();


    if (state_ground == 0) {
      this.node[0] = this.begin.copy();
      for (let i=1; i<this.node.length; i++) {
        this.node[i] = this.node[i-1].copy().add(real(lerp(5, 30, noise(this.ran-i*99))), real(lerp(-5, 5, noise(this.ran+i*88))), real(lerp(-10, 10, noise(this.ran+i*31))));
      }
    } else if (state_ground == 1) {
      this.node[0] = this.begin.copy();
      for (let i=1; i<this.node.length; i++) {
        this.node[i] = this.node[i-1].copy().add(real(lerp(2, 15, noise(this.ran-i*99))), real(lerp(-5, 5, noise(this.ran+i*88))), real(lerp(-10, 10, noise(this.ran+i*31))));
      }
    } else if (state_ground == 2) {
      this.node[0] = this.begin.copy();
      for (let i=1; i<this.node.length; i++) {
        let x_error = (this.railBar_node_l_ver_end.x+this.railBar_node_r_ver_end.x)/2.0 - (this.railBar_node_l_ver_begin.x+this.railBar_node_r_ver_begin.x)/2.0;
        x_error *= 0.25;
        this.node[i] = this.node[i-1].copy().add(lerp(rail.end.x-rail.begin.x+x_error-real(0), rail.end.x-rail.begin.x+x_error+real(1), noise(this.ran-i*99)), 0, real(lerp(15, 25, noise(this.ran+i*31))) * map(abs(this.node[0].x-(this.railBar_node_l_ver_end.x+this.railBar_node_r_ver_end.x)/2.0), 0, abs(this.railBar_node_l_ver_end.x-this.railBar_node_r_ver_end.x), 2, 5));
        this.node[i].y = map(this.node[i].z, rail.begin.z, rail.end.z, rail.begin.y, rail.end.y);
      }
    }








    for (let i=0; i<this.node.length; i++) {
      this.node[i] = PRotateX(this.node[i], roX);
      this.node[i].add(0, tranY, tranZ);
    }
  };









  this.display = function() {
    if (state_ground == 0  ||  state_ground == 1  ||  state_ground == 2) {
      for (let i=0; i<this.node.length-1; i++) {
        const c1 = lerpColor(c_far, c_near, map(this.node[i].z, rail.begin.z, rail.end.z, 0, 1));
        const c2 = lerpColor(c_far, c_near, map(this.node[i].z, rail.begin.z, rail.end.z, 0, 1));
        if (state_ground == 0  ||  state_ground == 1) {
          TRIANGLES_getLine_weight_Y_fill2(this.node[i], this.node[i+1], real(1), c1, c2);
        } else if (state_ground == 2) {
          TRIANGLES_getLine_weight_fill2(this.node[i], this.node[i+1], real(0.75), c1, c2);
        }
      }
    }
  };









  this.displayInfo = function() {
    if (state_ground == 0  ||  state_ground == 1  ||  state_ground == 2) {
      for (let i=0; i<this.node.length; i++) {
          LINES_getLine(this.node[i], this.node[i+1]);
        }
      
    }
  };
}
