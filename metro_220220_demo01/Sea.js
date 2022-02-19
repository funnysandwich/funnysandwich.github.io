function Sea(begin, W_block, detail, count_noise) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W_block + gap_block;
  this.count_noise = count_noise;


  this.haveBlocksNum = index_sea.length;



  this.node = new Array(detail);
  for (let i=0; i<this.node.length; i++) {
    const x = map(i, 0, this.node.length-1, this.begin.x, this.begin.x-this.W);
    const z = skyline.z + real(250) + (this.haveBlocksNum-1)*(gap_block+real(500)) + map(noise(count_noise + i), 0, 1, -real(2500), real(300));
    this.node[i] = createVector(x, this.begin.y-real(1), z);
  }






  this.change = function() {
  };



  this.update = function() {
    this.begin.x += speed;

    for (let i=0; i<this.node.length; i++) {
      const x = map(i, 0, this.node.length-1, this.begin.x, this.begin.x-this.W);
      const z = skyline.z + real(250) + (this.haveBlocksNum-1)*(gap_block+real(500)) + map(noise((count_noise+i)*0.05, frameCount*0.0025), 0, 1, -real(300)*this.haveBlocksNum, real(300));
      this.node[i] = createVector(x, this.begin.y-real(1), z);
    }
  };



  this.display = function() {
    let t;
    noStroke();
    fill(255);
    beginShape(TRIANGLE_STRIP);
    for (let i=0; i<this.node.length; i++) {
      fill(c_sky);
      vertex(this.node[i].x, this.node[i].y, skyline.z);
      t = constrain(map(this.node[i].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, t));
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    endShape();
  };



  this.displayInfo = function() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(real(3));
    beginShape(TRIANGLE_STRIP);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, skyline.z);
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    endShape();
  };
}
