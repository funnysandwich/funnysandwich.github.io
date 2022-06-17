function Rain(rangeX_L, rangeX_R, rangeZ_B, rangeZ_F) {
  this.L = real(random(20, 60));
  this.gravity = real(random(30, 40));
  this.dead = false;

  this.node = new Array(2);



  this.node[0] = createVector(random(min(rangeX_L, rangeX_R), max(rangeX_L, rangeX_R)), -real(1000), random(min(rangeZ_F, rangeZ_B), max(rangeZ_F, rangeZ_B)));
  const Y_begin = map(this.node[0].z, skyline.z, real(100), -real(1500), -real(400));
  this.node[0].y = Y_begin;
  this.node[1] = this.node[0].copy().add(0, -this.L, 0);












  this.update = function() {
    this.node[0].y += this.gravity;
    this.node[1].y += this.gravity;

    this.node[1].x = this.node[0].x+speed*0.75;
    this.node[0].x += speed;

    this.node[0].y = min(skyline.y, this.node[0].y);
    if (this.node[1].y >= skyline.y) {
      this.dead = true;
    }
  };







  this.display = function() {
    //let t = constrain(map(this.node[0].z-real(1000), skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    fill(lerpColor(c_near, c_far, 0.75));
    const w = map(this.node[0].z, skyline.z, real(100), real(2), real(0.5));
    TRIANGLES_getLine_weight(this.node[0], this.node[1], w);
  };





  this.displayInfo = function() {
    //fill(lerpColor(c_near, c_far, 0.75));
    //const w = map(this.node[0].z, skyline.z, real(100), real(2), real(0.5));
    //TRIANGLES_getLine_weight(this.node[0], this.node[1], w); 
    LINES_getLine(this.node[0], this.node[1]);
  };
}
