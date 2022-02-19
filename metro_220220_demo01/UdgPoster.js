function UdgPoster(W, center) {
  this.W = W;
  this.H = real(270);
  this.center = center.copy();
  this.node = new Array(4);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = createVector(this.W/2.0 * pow(-1, ceil(i%1.5)+1), this.H/2.0 * pow(-1, floor(i/2)+1), 0).add(this.center);
  }
  this.index_BILL = floor(random(0, BILL.length));

  this.dead = false;








  this.change = function() {
  };











  this.update = function() {
    this.center.x += speed;
    if (this.center.x > real(700)) {
      this.dead = true;
    }

    for (let i=0; i<this.node.length; i++) {
      this.node[i] = createVector(this.W/2.0 * pow(-1, ceil(i%1.5)+1), this.H/2.0 * pow(-1, floor(i/2)+1), 0).add(this.center);
    }
  };


  this.display = function() {
    noStroke();
    beginShape();
    texture(BILL[this.index_BILL]);
    vertex(this.node[0].x, this.node[0].y, this.node[0].z, 0, 0);
    vertex(this.node[1].x, this.node[1].y, this.node[1].z, 1, 0);
    vertex(this.node[2].x, this.node[2].y, this.node[2].z, 1, 1);
    vertex(this.node[3].x, this.node[3].y, this.node[3].z, 0, 1);
    endShape(CLOSE);
    fill(255);
  };


  this.displayInfo = function() {
    noFill();
    stroke(c_info2);
    strokeWeight(real(1));
    beginShape();
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    endShape(CLOSE);
  };
}