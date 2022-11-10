function ALine(p0_begin, p1_begin, p0_end, p1_end, life) {
  this.ran = random(-9999, 9999);
  this.p0 = p0_begin.copy();
  this.p1 = p1_begin.copy();

  this.lifeSpan = 960*2;
  this.life = life * this.lifeSpan;
  this.dead = false;


  this.update = function(p0_begin, p1_begin, p0_end, p1_end) {
    if (this.life < this.lifeSpan) {
      this.life += 1 * (speed/real(10)*0.5);
    } else {
      this.dead = true;
    }


    this.p0 = p5.Vector.sub(p0_end, p0_begin).mult(this.life/this.lifeSpan).add(p0_begin);
    this.p1 = p5.Vector.sub(p1_end, p1_begin).mult(this.life/this.lifeSpan).add(p1_begin);
    this.p0.add(lerp(-real(50), real(50), noise(this.ran*35+84)), lerp(-real(50), real(50), noise(this.ran*94+49)), 0);  
    this.p1.add(lerp(-real(50), real(50), noise(this.ran*74+50)), lerp(-real(50), real(50), noise(this.ran*71+92)), 0);

    let _p0 = p5.Vector.sub(this.p0, this.p1).mult(map(this.life, 0, this.lifeSpan, 0.04, 0.07)).add(this.p0);
    let _p1 = p5.Vector.sub(this.p1, this.p0).mult(map(this.life, 0, this.lifeSpan, 0.04, 0.07)).add(this.p1);
    this.p0 = _p0.copy();
    this.p1 = _p1.copy();
  };



  this.display = function() {
    fill(lerpColor(c_far, c_near, constrain(map(this.life, this.lifeSpan*0.25, this.lifeSpan*0.5, 0, 1), 0, 1)));
    TRIANGLES_getLine_weight_T(this.p0, this.p1, real(constrain(map(this.life, this.lifeSpan*0.5, this.lifeSpan, 2, 10), 2, 10)));
  };



  this.displayInfo = function() {
    LINES_getLine(this.p0, this.p1);
  };
}
