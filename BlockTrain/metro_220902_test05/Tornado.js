function Tornado(begin) {
  this.ran = random(-999, 999);
  this.dead = false;
  this.begin = begin.copy();

  this.node = Array.from(Array(40), () => new Array(6));








  this.update = function() {
    this.begin.x += speed;
    if (this.begin.x > endLine) {
      this.dead = true;
    }

    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        let y = map(noise(frameCount*0.01+this.ran+i*100 -j*0.015), 0, 1, this.begin.y, this.begin.y-real(2500));
        let w = map(y, this.begin.y-real(2500), this.begin.y, real(800), real(200));
        let x = cos(frameCount*0.85+this.ran+99 -j*0.5 + i*100) * w/2.0;
        let z = sin(frameCount*0.85+this.ran+99 -j*0.5 + i*100) * w/2.0;
        x += map(noise(y*0.002 - frameCount*0.05 + this.ran-99), 0, 1, -real(500), real(500));
        this.node[i][j] = this.begin.copy().add(x, y, z);
      }
    }
  };





  this.display = function() {
    fill(lerpColor(c_winFrame, c_sky, 0.15));
    //fill(255, 0, 0);
    let w = real(6);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        let c1 = lerpColor(c_winFrame, c_sky, map(abs(sin(frameCount*0.85+this.ran+99 -j*0.5 + i*100)), 0, 1, 0.15, 0.85));
        let c2 = lerpColor(c_winFrame, c_sky, map(abs(sin(frameCount*0.85+this.ran+99 -(j+1)*0.5 + i*100)), 0, 1, 0.15, 0.85));
        if (open_darkCloud) {
          c1 = lerpColor(c_winFrame, c_sky, 0.15);
          c2 = lerpColor(c_winFrame, c_sky, 0.15);
        }
        //TRIANGLES_getLine_weight_T(this.node[i][j], this.node[i][j+1], w);
        TRIANGLES_getLine_weight_T_fill2(this.node[i][j], this.node[i][j+1], w, c1, c2);
      }
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i+=2) {
      for (let j=0; j<this.node[i].length-1; j++) {
        LINES_getLine(this.node[i][j], this.node[i][j+1]);
      }
    }
  };
}