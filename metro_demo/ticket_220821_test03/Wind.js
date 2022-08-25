function Wind(s_begin, s_end) {
  this.life = 0;
  this.lifeSpan = floor(random(15, 20));
  this.dead = false;

  //this.begin = createVector(random(-width*0.75, -width*0.25), random(-height*0.333, height*0.333));
  //this.end = createVector(random(width*0.25, width*0.5), this.begin.y);
  this.begin = s_begin.copy();
  this.end = s_end.copy();


  this.node = new Array(2);
  this.node[0] = this.begin.copy();
  this.node[1] = this.begin.copy();



  this.update = function() {
    if (this.life < this.lifeSpan) {
      this.life ++;
    } else {
      this.dead = true;
    }

    this.node[0] = this.begin.copy();
    this.node[1] = this.begin.copy();
    this.node[0].x = constrain(map(this.life, 0, this.lifeSpan-3, this.begin.x, this.end.x), min(this.begin.x, this.end.x), max(this.begin.x, this.end.x));
    this.node[1].x = constrain(map(this.life, 0+3, this.lifeSpan, this.begin.x, this.end.x), min(this.begin.x, this.end.x), max(this.begin.x, this.end.x));
    this.node[0].y = constrain(map(this.life, 0, this.lifeSpan-3, this.begin.y, this.end.y), min(this.begin.y, this.end.y), max(this.begin.y, this.end.y));
    this.node[1].y = constrain(map(this.life, 0+3, this.lifeSpan, this.begin.y, this.end.y), min(this.begin.y, this.end.y), max(this.begin.y, this.end.y));
    this.node[0].z = constrain(map(this.life, 0, this.lifeSpan-3, this.begin.z, this.end.z), min(this.begin.z, this.end.z), max(this.begin.z, this.end.z));
    this.node[1].z = constrain(map(this.life, 0+3, this.lifeSpan, this.begin.z, this.end.z), min(this.begin.z, this.end.z), max(this.begin.z, this.end.z));



    this.node[0] = PRotateY(this.node[0], roY);
    this.node[1] = PRotateY(this.node[1], roY);
  };



  this.display = function() {
    let w  = sin(constrain(map(this.life, 3, this.lifeSpan-3, 0, PI), 0, PI)) * real(1);
    fill(lerpColor(c_bkg, c_ticket, sin(constrain(map(this.life, 3, this.lifeSpan-3, 0, PI), 0, PI))));
    TRIANGLES_getLine_weight_T(this.node[0], this.node[1], w);
  };


  this.displayInfo = function() {
    LINES_getLine(this.node[0], this.node[1]);
  };
}
