// include a comment about LICENSE.md in Bill2.js
// Copyright 2022 funnysandwich.tez
function Bill2(center, is_main, index_house) {
  this.H = real(500);
  this.W = this.H/3.0;
  this.center = center.copy();
  this.is_main = is_main;
  this.index_house = index_house;

  this.W_bar = real(40);

  this.node = new Array(4);
  if (this.index_house % 3 == 0) {
    this.node[0] = this.center.copy().add(-this.W-this.W_bar, -this.H/2.0, 0);
    this.node[1] = this.center.copy().add(-this.W_bar, -this.H/2.0, 0);
    this.node[2] = this.center.copy().add(-this.W_bar, this.H/2.0, 0);
    this.node[3] = this.center.copy().add(-this.W-this.W_bar, this.H/2.0, 0);
  } else {
    this.node[0] = this.center.copy().add(this.W_bar, -this.H/2.0, 0);
    this.node[1] = this.center.copy().add(this.W_bar+this.W, -this.H/2.0, 0);
    this.node[2] = this.center.copy().add(this.W_bar+this.W, this.H/2.0, 0);
    this.node[3] = this.center.copy().add(this.W_bar, this.H/2.0, 0);
  }


  if (!this.is_main) {
    this.Y_move = real(random(-300, 1500));
    for (let i=0; i<4; i++) {
      this.node[i].y += this.Y_move;
    }
  }





  this.update = function(center) {
    this.center = center.copy();

    if (this.index_house % 3 == 0) {
      this.node[0] = this.center.copy().add(-this.W-this.W_bar, -this.H/2.0, 0);
      this.node[1] = this.center.copy().add(-this.W_bar, -this.H/2.0, 0);
      this.node[2] = this.center.copy().add(-this.W_bar, this.H/2.0, 0);
      this.node[3] = this.center.copy().add(-this.W-this.W_bar, this.H/2.0, 0);
    } else {
      this.node[0] = this.center.copy().add(this.W_bar, -this.H/2.0, 0);
      this.node[1] = this.center.copy().add(this.W_bar+this.W, -this.H/2.0, 0);
      this.node[2] = this.center.copy().add(this.W_bar+this.W, this.H/2.0, 0);
      this.node[3] = this.center.copy().add(this.W_bar, this.H/2.0, 0);
    }

    if (!this.is_main) {
      for (let i=0; i<4; i++) {
        this.node[i].y += this.Y_move;
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
    fill(lerpColor(c_near, c_far, constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1)));
    const w_line = real(8);
    TRIANGLES_getLine_weightToU_Y(this.node[0], this.node[1], w_line);
    TRIANGLES_getLine_weightToD_Y(this.node[2], this.node[3], w_line);

    TRIANGLES_getLine_weightToL(this.node[0].copy().add(0, -w_line, 0), this.node[3].copy().add(0, w_line, 0), w_line);
    TRIANGLES_getLine_weightToR(this.node[1].copy().add(0, -w_line, 0), this.node[2].copy().add(0, w_line, 0), w_line);

    if (this.index_house % 3 == 0) {
      TRIANGLES_getLine_weight_Y(p5.Vector.sub(this.node[2], this.node[1]).mult(0.15).add(this.node[1]), p5.Vector.sub(this.node[2], this.node[1]).mult(0.15).add(this.node[1]).add(this.W_bar*1.15, 0, 0), w_line*2);
      TRIANGLES_getLine_weight_Y(p5.Vector.sub(this.node[1], this.node[2]).mult(0.15).add(this.node[2]), p5.Vector.sub(this.node[1], this.node[2]).mult(0.15).add(this.node[2]).add(this.W_bar*1.15, 0, 0), w_line*2);
    } else {    
      TRIANGLES_getLine_weight_Y(p5.Vector.sub(this.node[3], this.node[0]).mult(0.15).add(this.node[0]), p5.Vector.sub(this.node[3], this.node[0]).mult(0.15).add(this.node[0]).add(-this.W_bar*1.15, 0, 0), w_line*2);
      TRIANGLES_getLine_weight_Y(p5.Vector.sub(this.node[0], this.node[3]).mult(0.15).add(this.node[3]), p5.Vector.sub(this.node[0], this.node[3]).mult(0.15).add(this.node[3]).add(-this.W_bar*1.15, 0, 0), w_line*2);
    }
  };



  this.displayInfo = function() {
    LINES_getRect(this.node[0], this.node[1], this.node[2], this.node[3]);
  };
}
//@funnysandwich