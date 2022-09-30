// include a comment about LICENSE.md in Bill0.js
// Copyright 2022 funnysandwich.tez
function Bill0(center) {
  this.W = real(500);
  this.H = real(500+100);
  this.D = real(150);
  this.center = center.copy();

  this.node = Array.from(Array(2), () => new Array(4));
  this.node[0][1] = this.center.copy().add(-this.W/2.0, 0, 0);
  this.node[0][0] = this.node[0][1].copy().add(0, 0, -this.D);
  this.node[0][3] = this.node[0][1].copy().add(0, -this.H, 0);
  this.node[0][2] = this.node[0][1].copy().add(0, -real(100), 0);

  this.node[1][1] = this.center.copy().add(this.W/2.0, 0, 0);
  this.node[1][0] = this.node[1][1].copy().add(0, 0, -this.D);
  this.node[1][3] = this.node[1][1].copy().add(0, -this.H, 0);
  this.node[1][2] = this.node[1][1].copy().add(0, -real(100), 0);





  this.update = function(center) {
    this.center = center.copy();

    this.node[0][1] = this.center.copy().add(-this.W/2.0, 0, 0);
    this.node[0][0] = this.node[0][1].copy().add(0, 0, -this.D);
    this.node[0][3] = this.node[0][1].copy().add(0, -this.H, 0);
    this.node[0][2] = this.node[0][1].copy().add(0, -real(100), 0);

    this.node[1][1] = this.center.copy().add(this.W/2.0, 0, 0);
    this.node[1][0] = this.node[1][1].copy().add(0, 0, -this.D);
    this.node[1][3] = this.node[1][1].copy().add(0, -this.H, 0);
    this.node[1][2] = this.node[1][1].copy().add(0, -real(100), 0);
  };







  this.display = function() {
    vertex(this.node[0][3].x, this.node[0][3].y, this.node[0][3].z, 0, 0);
    vertex(this.node[1][3].x, this.node[1][3].y, this.node[1][3].z, 1, 0);
    vertex(this.node[1][2].x, this.node[1][2].y, this.node[1][2].z, 1, 1);
    vertex(this.node[1][2].x, this.node[1][2].y, this.node[1][2].z, 1, 1);
    vertex(this.node[0][2].x, this.node[0][2].y, this.node[0][2].z, 0, 1);
    vertex(this.node[0][3].x, this.node[0][3].y, this.node[0][3].z, 0, 0);
  };




  this.display_TRIANGLES = function() {
    fill(lerpColor(c_near, c_far, constrain(map(this.node[0][1].z, skyline.z, 0, 1, 0), 0, 1)));

    const w_line = real(8);
    TRIANGLES_getLine_weightToL(this.node[0][0], this.node[0][1], w_line);
    TRIANGLES_getLine_weightToL(this.node[0][1], this.node[0][3], w_line);
    TRIANGLES_getLine_weightToL(this.node[0][0], this.node[0][2], w_line);

    TRIANGLES_getLine_weightToR(this.node[1][0], this.node[1][1], w_line);
    TRIANGLES_getLine_weightToR(this.node[1][1], this.node[1][3], w_line);
    TRIANGLES_getLine_weightToR(this.node[1][0], this.node[1][2], w_line);

    TRIANGLES_getLine_weightToU_Y(this.node[0][3].copy().add(-w_line, 0, 0), this.node[1][3].copy().add(w_line, 0, 0), w_line);
    TRIANGLES_getLine_weightToD_Y(this.node[0][2], this.node[1][2], w_line);
  };




  this.displayInfo = function() {
    LINES_getRect(this.node[0][3], this.node[1][3], this.node[1][2], this.node[0][2]);
    LINES_getLine(this.node[0][2], this.node[0][1]);
    LINES_getLine(this.node[0][1], this.node[0][0]);
    LINES_getLine(this.node[0][2], this.node[0][0]);
    LINES_getLine(this.node[1][2], this.node[1][1]);
    LINES_getLine(this.node[1][1], this.node[1][0]);
    LINES_getLine(this.node[1][2], this.node[1][0]);
  };
}
//@funnysandwich