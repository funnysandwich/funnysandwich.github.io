function Sign(begin) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.H_basic = real(random(10, 15));
  this.W_target = real(random(10, 15));
  this.W = 0;
  this.face = random(0, TWO_PI);

  this.center = createVector(0, 0, 0);
  this.detail = new Array(10);
  this.node = new Array(4);


  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }
  for (let i=0; i<this.detail.length; i++) {
    this.detail[i] = this.begin.copy();
  }











  this.update = function() {
    this.W = easing_x2(this.W, this.W_target);

    this.node[0] = createVector(this.begin.x, this.begin.y, this.begin.z);
    this.node[1] = easing_p(this.node[1], createVector(this.node[0].x+map(noise(1*1+this.ran), 0, 1, real(-1), real(1)), this.node[0].y-this.H_basic, this.node[0].z+map(noise(1*1+this.ran+99), 0, 1, real(-1), real(1))));
    for (let i=2; i<this.node.length; i++) {
      let l = map(i, 2, this.node.length-1, real(1), real(2.5));
      let x = map(noise(i*1+this.ran), 0, 1, -l, l);
      let z = map(noise(i*1+this.ran+99), 0, 1, -l, l);
      this.node[i] = easing_p(this.node[i], p5.Vector.sub(this.node[i-1], this.node[i-2]).mult(0.7).add(this.node[i-1]).add(x, 0, z));
    }

    this.center = createVector(this.node[this.node.length-1].x, this.node[this.node.length-1].y-this.W/2, this.node[this.node.length-1].z);


    for (let i=0; i<this.detail.length; i++) {
      let x = cos(map(i, 0, this.detail.length, 0, TWO_PI)) * (this.W/2);
      let y = sin(map(i, 0, this.detail.length, 0, TWO_PI)) * (this.W/2);
      this.detail[i] = createVector(x, y, 0);
      this.detail[i] = PRotateY(this.detail[i], this.face);
      this.detail[i].add(this.center);
    }
  };





  this.display = function() {
    stroke(0);
    for (let i=0; i<this.node.length-1; i++) {
      strokeWeight(real(map(i, 0, this.node.length-1, 2, 1.5)));
      line(this.node[i].x, this.node[i].y, this.node[i].z, this.node[i+1].x, this.node[i+1].y, this.node[i+1].z);
    }


    beginShape();
    texture(SIGN);
    for (let i=0; i<this.detail.length; i++) {
      let uv_x = map(cos(map(i, 0, this.detail.length, 0, TWO_PI)), -1, 1, 0, 1);
      let uv_y = map(sin(map(i, 0, this.detail.length, 0, TWO_PI)), -1, 1, 0, 1);
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z, uv_x, uv_y);
    }
    endShape(CLOSE);
    fill(255);

    noFill();
    strokeWeight(real(1));
    beginShape();
    for (let i=0; i<this.detail.length; i++) {
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z);
    }
    endShape(CLOSE);
  };









  this.displayInfo = function() {
    noFill();
    stroke(200);
    strokeWeight(real(2));
    beginShape(POINTS);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    vertex(this.center.x, this.center.y, this.center.z);
    endShape();

    strokeWeight(real(1.5));
    beginShape(POINTS);
    for (let i=0; i<this.detail.length; i++) {
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z);
    }
    endShape();

    strokeWeight(real(0.5));
    beginShape(LINES);
    for (let i=0; i<this.detail.length; i++) {
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z);
      vertex(this.detail[(i+1)%this.detail.length].x, this.detail[(i+1)%this.detail.length].y, this.detail[(i+1)%this.detail.length].z);
    }
    for (let i=1; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      vertex(this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
    }
    endShape();
  };
}
//@funnysandwich