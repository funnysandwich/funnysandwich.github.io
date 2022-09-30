// include a comment about LICENSE.md in Bill1.js
// Copyright 2022 funnysandwich.tez
function Bill1(center, is_main) {
  this.W = real(500);
  this.H = this.W/3.0;
  this.center = center.copy();
  this.is_main = is_main;


  if (!this.is_main) {
    this.W *= random(0.65, 0.9);
    this.H = this.W/3.0;

    this.X_move = random(-(real(500)-this.W)/2.0, (real(500)-this.W)/2.0);
    this.Y_move = random(-real(50), real(50));
    this.angle = random(-HALF_PI*0.15, HALF_PI*0.15);

    this.center.add(this.X_move, this.Y_move, 0);
  }


  this.node = new Array(4);
  this.node[0] = this.center.copy().add(-this.W/2.0, -this.H/2.0, 0);
  this.node[1] = this.center.copy().add(this.W/2.0, -this.H/2.0, 0);
  this.node[2] = this.center.copy().add(this.W/2.0, this.H/2.0, 0);
  this.node[3] = this.center.copy().add(-this.W/2.0, this.H/2.0, 0);



  if (!this.is_main) {
    for (let i=0; i<this.node.length; i++) {
      this.node[i] = p5.Vector.sub(this.node[i], this.center);
      this.node[i] = PRotateZ(this.node[i], this.angle);
      this.node[i].add(this.center);
    }
  }






  this.update = function(center) {
    this.center = center.copy();
    if (!this.is_main) {
      this.center.add(this.X_move, this.Y_move, 0);
    }

    this.node[0] = this.center.copy().add(-this.W/2.0, -this.H/2.0, 0);
    this.node[1] = this.center.copy().add(this.W/2.0, -this.H/2.0, 0);
    this.node[2] = this.center.copy().add(this.W/2.0, this.H/2.0, 0);
    this.node[3] = this.center.copy().add(-this.W/2.0, this.H/2.0, 0);


    if (!this.is_main) {
      for (let i=0; i<this.node.length; i++) {
        this.node[i] = p5.Vector.sub(this.node[i], this.center);
        this.node[i] = PRotateZ(this.node[i], this.angle);
        this.node[i].add(this.center);
      }
    }
  };



  this.display = function() {
    vertex(this.node[0].x, this.node[0].y, this.node[0].z, 0, 0);
    vertex(this.node[1].x, this.node[1].y, this.node[1].z, 1, 0);
    vertex(this.node[2].x, this.node[2].y, this.node[2].z, 1, 1);
    vertex(this.node[2].x, this.node[2].y, this.node[2].z, 1, 1);
    vertex(this.node[3].x, this.node[3].y, this.node[3].z, 0, 1);
    vertex(this.node[0].x, this.node[0].y, this.node[0].z, 0, 0);
  };




  this.display_TRIANGLES = function() {
    fill(lerpColor(c_near, c_far, constrain(map(this.node[0].z+real(400), skyline.z, 0, 1, 0), 0, 1)));
    let w_line = real(7);
    TRIANGLES_getLine_weightToL(this.node[0].copy().add(0, -w_line, 0), this.node[3].copy().add(0, w_line, 0), w_line);
    TRIANGLES_getLine_weightToU_Y(this.node[0].copy().add(-w_line, 0, 0), this.node[1].copy().add(w_line, 0, 0), w_line);
    TRIANGLES_getLine_weightToR(this.node[1].copy().add(0, -w_line, 0), this.node[2].copy().add(0, w_line, 0), w_line);
    TRIANGLES_getLine_weightToD_Y(this.node[2].copy().add(w_line, 0, 0), this.node[3].copy().add(-w_line, 0, 0), w_line);
  };




  this.displayInfo = function() {
    LINES_getRect(this.node[0], this.node[1], this.node[2], this.node[3]);
  };
}
//@funnysandwich