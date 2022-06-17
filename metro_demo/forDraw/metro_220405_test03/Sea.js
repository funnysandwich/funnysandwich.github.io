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
      const z = skyline.z + real(250) + (this.haveBlocksNum-1)*(gap_block+real(500)) + map(noise((count_noise+i)*0.1, frameCount*0.0025), 0, 1, -real(600), real(300));
      this.node[i] = createVector(x, this.begin.y-real(1), z);
    }
  };



  this.display = function() {
    //let t;
    //noStroke();
    //fill(255);
    //beginShape(TRIANGLE_STRIP);
    //for (let i=0; i<this.node.length; i++) {
    //  fill(c_sky);
    //  vertex(this.node[i].x, this.node[i].y, skyline.z);
    //  t = constrain(map(this.node[i].z, skyline.z, 0, 1, 0), 0, 1);
    //  fill(lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, t));
    //  vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    //}
    //endShape();


    for (let i=0; i<this.node.length-1; i++) {
      const node_far = createVector(this.node[i].x, this.node[i].y, skyline.z);
      const node_far_next = createVector(this.node[i+1].x, this.node[i+1].y, skyline.z);
      const c1 = c_sky;
      const c2 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i].z, skyline.z, 0, 1, 0), 0, 1));
      const c3 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i+1].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node[i], this.node[i+1], node_far_next, node_far, c2, c3, c1, c1);
    }
  };



  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoYellow);
    //strokeWeight(real(2));
    //beginShape(TRIANGLE_STRIP);
    for (let i=0; i<this.node.length-1; i++) {
      //vertex(this.node[i].x, this.node[i].y, skyline.z);
      //vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      const node_far = createVector(this.node[i].x, this.node[i].y, skyline.z);
      const node_far_next = createVector(this.node[i+1].x, this.node[i+1].y, skyline.z);
      LINES_getLine(this.node[i], this.node[i+1]);
      LINES_getLine(node_far, node_far_next);
      LINES_getLine(this.node[i], node_far);
      LINES_getLine(this.node[i], node_far_next);
    }
    // endShape();
  };
}
