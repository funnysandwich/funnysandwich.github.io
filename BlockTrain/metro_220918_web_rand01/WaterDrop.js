function WaterDrop() {
  this.ran = random(-999, 999);
  this.begin = createVector(real(random(-100, 100)), real(random(-100, 100)), real(196));
  this.center = this.begin.copy();
  this.W = real(random(1, 3));//random(real(20, 40));
  if (random(1) < 0.01) {
    this.W = real(random(3, 4.5));//random(real(20, 40));
  }
  if (open_typhoon) {
    if (random(1) < 0.1) {
      this.W = real(random(3, 4.5));//random(real(20, 40));
    }
  }
  this.gravity = map(this.W, real(1), real(3), real(0.05), real(0.1));
  this.windRate = map(this.W, real(1), real(3), real(0.05), real(0.01));
  this.open_drop = false;

  if (this.W > real(3)) {
    this.open_drop = true;
    this.gravity = map(this.W, real(3), real(4.5), real(1), real(4));
    this.windRate = map(this.W, real(3), real(4.5), real(0.02), real(0.005));
  }


  this.dead = false;



  this.node = new Array(5);
  for (let i=0; i<this.node.length; i++) {
    const x_move = map(cos(map(i, 0, this.node.length, 0, TWO_PI)), -1, 1, 0, 1);
    const y_move = map(sin(map(i, 0, this.node.length, 0, TWO_PI)), -1, 1, 0, 1);
    const w_move = map(noise(x_move, y_move), 0, 1, this.W*0.8, this.W);
    const x = cos(map(i, 0, this.node.length, 0, TWO_PI)) * w_move/2.0;
    const y = sin(map(i, 0, this.node.length, 0, TWO_PI)) * w_move/2.0;
    this.node[i] = createVector(x, y, 0).add(this.center);
  }





  this.change = function() {
  };



  this.update = function() {
    //this.center = createVector(real(random(-100, 100)), real(random(-100, 100)), real(198));

    if (!this.open_drop) {
      this.gravity = map(this.W, real(1), real(3), real(0.05), real(0.1));
      this.windRate = map(this.W, real(1), real(3), real(0.02), real(0.005));
    }

    if (!open_typhoon) {
      this.ran += 0.01;
      if (random(1)<0.2 && !this.open_drop) {
        this.center.x += speed * this.windRate;
      }
      if (this.open_drop) {
        this.center.x += speed * this.windRate;
        this.center.x += map(noise(frameCount/5.0), 0, 1, -real(1), real(1));
      }
    } else {
      this.ran += 0.05;
      if (!this.open_drop) {
        this.center.x += max(speed,real(15)) * this.windRate * 1.5;
      }
      if (this.open_drop) {
        this.center.x += max(speed,real(15)) * max(this.windRate, real(0.05)) * 2.5;
        this.center.x += map(noise(frameCount/5.0), 0, 1, -real(1), real(1));
      }
    }

    this.center.y += this.gravity;








    //this.W = map(p5.Vector.dist(this.begin,this.center),0,real(50),);
    if (!open_stop) {
      this.W -= real(0.02);
    }
    if (this.W <= 0  ||  this.center.x > real(300)  ||  this.center.y > real(300)) {
      this.dead = true;
    }


    for (let i=0; i<this.node.length; i++) {
      const x_move = map(cos(map(i+this.ran, 0, this.node.length, 0, TWO_PI)), -1, 1, 0, 10);
      const y_move = map(sin(map(i+this.ran, 0, this.node.length, 0, TWO_PI)), -1, 1, 0, 10);
      const w_move = map(noise(x_move, y_move), 0, 1, this.W*0.25, this.W*1.25);
      const x = cos(map(i, 0, this.node.length, 0, TWO_PI)) * w_move/2.0;
      const y = sin(map(i, 0, this.node.length, 0, TWO_PI)) * w_move/2.0;
      this.node[i] = createVector(x, y+Y_shake-cameraY, 0).add(this.center);

      if (have_button_submerge  &&  open_shake  &&  time_shake < time_max_shake) {
        this.node[i].add(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
      }
      if (have_button_jump  &&  open_jump) {
        this.node[i].add(0, -map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
      }
    }
  };


  this.display = function() {
    //noStroke();
    //fill(lerpColor(c_near, c_far, 0.75));
    //beginShape();
    //for (let i=0; i<this.node.length; i++) {
    //  vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    //}
    //endShape(CLOSE);
    TRIANGLES_getTriangle(this.node[1], this.node[2], this.node[0]);
    TRIANGLES_getTriangle(this.node[2], this.node[3], this.node[0]);
    TRIANGLES_getTriangle(this.node[3], this.node[4], this.node[0]);
  };



  this.displayInfo = function() {

    for (let i=0; i<this.node.length; i++) {
      //vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      //TRIANGLES_getLine_weight_Y(this.node[i], this.node[i+1], real(0.5));
      LINES_getLine(this.node[i], this.node[(i+1)%this.node.length]);
    }
  };
}