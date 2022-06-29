function Mess(begin, index) {
  this.index = index;
  this.begin = begin.copy();
  this.ran = random(-999, 999);



  this.W = real(random(45, 245));
  this.Hor = 1;
  if (random(0, 1) < 0.25) {
    this.Hor = floor(random(2, 6));
  }
  this.H = real(45) + (this.Hor-1)*real(25);
  if (this.Hor > 1) {
    this.W = real(245);
  }


  this.is_I = random(0, 1) < 0.5;



  this.dead = false;
  this.open_dead = false;
  this.ready_open_dead = false;
  this.time_dead = 0;


  this.var_easing = random(0.2, 0.5);






  this.is_crowd = false;
  this.time_shake = 0;













  const num_detail = 5;
  this.node = new Array(num_detail * 4);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }

  this.node_copy = new Array(this.node.length);









  const num_fireLine = floor(map(this.Hor, 1, 5, 5, 10));
  this.node_fireLine = new Array(num_fireLine);
  for (let i=0; i<this.node_fireLine.length; i++) {
    this.node_fireLine[i] = new Array(2);
    this.node_fireLine[i][0] = this.begin.copy();
    this.node_fireLine[i][1] = this.begin.copy();
  }

  this.W_fireLine = map(this.Hor, 1, 5, real(45)*1.5, real(45)*3.5);









  this.node_corner = new Array(5);

  for (let i=0; i<this.node_corner.length; i++) {
    this.node_corner[i] = this.begin.copy();
  }















  this.update = function() {





    if (!this.open_dead) {
      if (!this.ready_open_dead) {
        if (mouseX-width/2.0 < this.begin.x-this.W/2.0      ||
          mouseX-width/2.0 > this.begin.x+this.W/2.0        ||
          mouseY-height/2.0 < this.begin.y-this.H/2.0       ||
          mouseY-height/2.0 > this.begin.y+this.H/2.0) {
          this.ready_open_dead = true;
        }
      } else {
        if (mouseX-width/2.0 > this.begin.x-this.W/2.0      &&
          mouseX-width/2.0 < this.begin.x+this.W/2.0        &&
          mouseY-height/2.0 > this.begin.y-this.H/2.0       &&
          mouseY-height/2.0 < this.begin.y+this.H/2.0) {
          this.open_dead = true;
        }
      }


      for (let i=0; i<this.node.length; i++) {
        let n;
        if (i < floor(this.node.length/4)) {
          const x = cos(map(i, 0, floor(this.node.length/4)-1, 0, HALF_PI)) * real(45*0.5);
          const y = sin(map(i, 0, floor(this.node.length/4)-1, 0, HALF_PI)) * real(45*0.5);
          n = this.begin.copy().add(x +this.W*0.5 -real(45*0.5), y +this.H*0.5 -real(45*0.5), 0);
        } else if (i < floor(this.node.length/4)*2) {
          const x = cos(map(i, floor(this.node.length/4), floor(this.node.length/4)*2-1, HALF_PI, PI)) * real(45*0.5);
          const y = sin(map(i, floor(this.node.length/4), floor(this.node.length/4)*2-1, HALF_PI, PI)) * real(45*0.5);
          n = this.begin.copy().add(x -this.W*0.5 +real(45*0.5), y +this.H*0.5 -real(45*0.5), 0);
        } else if (i < floor(this.node.length/4)*3) {
          const x = cos(map(i, floor(this.node.length/4)*2, floor(this.node.length/4)*3-1, PI, PI+HALF_PI)) * real(45*0.5);
          const y = sin(map(i, floor(this.node.length/4)*2, floor(this.node.length/4)*3-1, PI, PI+HALF_PI)) * real(45*0.5);
          n = this.begin.copy().add(x -this.W*0.5 +real(45*0.5), y -this.H*0.5 +real(45*0.5), 0);
        } else {
          const x = cos(map(i, floor(this.node.length/4)*3, this.node.length-1, PI+HALF_PI, TWO_PI)) * real(45*0.5);
          const y = sin(map(i, floor(this.node.length/4)*3, this.node.length-1, PI+HALF_PI, TWO_PI)) * real(45*0.5);
          n = this.begin.copy().add(x +this.W*0.5 -real(45*0.5), y -this.H*0.5 +real(45*0.5), 0);
        }
        this.node[i] = easing_p(this.node[i], n, this.var_easing);
      }





      let n_corner = new Array(5);
      n_corner[0] = createVector(real(7.717), 0);
      n_corner[1] = createVector(real(5.142), real(9.311));
      n_corner[2] = createVector(-real(2.841), real(16.895));
      n_corner[3] = createVector(-real(12.438), real(5.221));
      n_corner[4] = createVector(-real(1.364), real(5.331));
      for (let i=0; i<this.node_corner.length; i++) {
        if (this.is_I) {
          n_corner[i].add(this.begin).add(this.W/2.0, -this.H/2.0);
        } else {
          n_corner[i].x *= -1;
          n_corner[i].add(this.begin).add(-this.W/2.0, -this.H/2.0);
        }
        this.node_corner[i] = easing_p(this.node_corner[i], n_corner[i], this.var_easing);
      }




      this.is_crowd = false;



      if (this.begin.x-this.W/2.0 < -width/2.0) {
        this.is_crowd = true;
        // this.begin.x = easing_x(this.begin.x, -width/2+this.W/2.0, 0.1);
        this.begin.x += real(10);
      } else if (this.begin.x+this.W/2.0 > width/2.0) {
        this.is_crowd = true;
        this.begin.x -= real(10);
      }



      if (this.begin.y-this.H/2.0 < -height/2.0) {
        this.is_crowd = true;
        this.begin.y += real(10);
      } else if (this.begin.y+this.H/2.0 > height/2.0-real(65.3)-real(1.68)/2.0) {
        this.is_crowd = true;
        this.begin.y -= real(10);
      } 



      if (mess.length > 1) {
        for (let i=0; i<mess.length; i++) {
          if (this.index != mess[i].index) {
            if (this.begin.x-this.W/2.0 < mess[i].begin.x+mess[i].W/2.0    &&
              this.begin.x+this.W/2.0 > mess[i].begin.x-mess[i].W/2.0      &&
              this.begin.y-this.H/2.0 < mess[i].begin.y+mess[i].H/2.0      &&
              this.begin.y+this.H/2.0 > mess[i].begin.y-mess[i].H/2.0 ) {
              this.is_crowd = true;
              this.begin = p5.Vector.sub(this.begin, mess[i].begin).setMag(real(15)).add(this.begin);
            }
            if (this.begin.x == mess[i].begin.x  &&  this.begin.y == mess[i].begin.y) {
              this.begin.add(real(random(-1, 1)), real(random(-1, 1)), 0);
            }
          }
        }
      }













      if (this.is_crowd) {
        this.time_shake ++;
        if (this.time_shake >= 60) {
          this.open_dead = true;
        }
      } else {
        this.time_shake = 0;
      }
    } else {
      this.time_dead ++;

      if (this.time_dead < 10) {
        let PV_ran = createVector(real(random(-1, 1)*map(this.time_dead, 0, 10, 1, 5)), real(random(-1, 1))*map(this.time_dead, 0, 10, 1, 5), 0);
        this.begin.add(PV_ran);
        for (let i=0; i<this.node.length; i++) {
          this.node[i].add(PV_ran);
        }
        for (let i=0; i<this.node_corner.length; i++) {
          this.node_corner[i].add(PV_ran);
        }
      } else if (this.time_dead < 14) {
        if (this.time_dead == 10) {
          for (let i=0; i<this.node.length; i++) {
            this.node_copy[i] = this.node[i].copy();
          }
        }

        for (let i=0; i<this.node.length; i++) {
          this.node[i].x = lerp(this.node_copy[i].x, this.begin.x, map(this.time_dead, 10, 14-1, 0, 1));
          this.node[i].y = lerp(this.node_copy[i].y, this.begin.y, map(this.time_dead, 10, 14-1, 0, 1));
        }

        this.node_corner[0] = createVector(real(7.717), 0);
        this.node_corner[1] = createVector(real(5.142), real(9.311));
        this.node_corner[2] = createVector(-real(2.841), real(16.895));
        this.node_corner[3] = createVector(-real(12.438), real(5.221));
        this.node_corner[4] = createVector(-real(1.364), real(5.331));
        for (let i=0; i<this.node_corner.length; i++) {

          if (this.is_I) {
            this.node_corner[i].add(this.W/2.0, -this.H/2.0);
          } else {
            this.node_corner[i].x *= -1;
            this.node_corner[i].add(-this.W/2.0, -this.H/2.0);
          }
          this.node_corner[i].mult(max(0, map(this.time_dead, 10, 14-2, 1, 0)));
          this.node_corner[i].add(this.begin);
        }
      } else if (this.time_dead < 30) {
        for (let i=0; i<this.node_fireLine.length; i++) {
          let x = cos(map(i, 0, this.node_fireLine.length, 0, TWO_PI)+noise(this.ran+i*100)) * this.W_fireLine/2.0;
          let y = sin(map(i, 0, this.node_fireLine.length, 0, TWO_PI)+noise(this.ran+i*100)) * this.W_fireLine/2.0;
          x += this.begin.x;
          y += this.begin.y + max(map(this.time_dead, 20, 30, 0, real(10)), 0);
          this.node_fireLine[i][0].x = map(this.time_dead, 14, 30, this.begin.x, x);
          this.node_fireLine[i][0].y = map(this.time_dead, 14, 30, this.begin.y, y) + max(map(this.time_dead, 20, 30, 0, real(10)), 0);
          y = sin(map(i, 0, this.node_fireLine.length, 0, TWO_PI)+noise(this.ran+i*100)) * this.W_fireLine/2.0;
          y += this.begin.y + max(map(this.time_dead-1, 20, 30, 0, real(10)), 0);
          this.node_fireLine[i][1].x = map(this.time_dead-1, 14, 30, this.begin.x, x);
          this.node_fireLine[i][1].y = map(this.time_dead-1, 14, 30, this.begin.y, y) + max(map(this.time_dead-1, 20, 30, 0, real(10)), 0);
        }
      } else {
        this.dead = true;
      }
    }
  };










  this.display = function() {
    if (this.is_I) {
      fill(129, 227, 59);
    } else {
      fill(255);
    }
    noStroke();

    if (this.time_dead < 14) {
      TRIANGLES_getShape(this.node);
      TRIANGLES_getTriangle(this.node_corner[0], this.node_corner[1], this.node_corner[4]);
      TRIANGLES_getTriangle(this.node_corner[1], this.node_corner[2], this.node_corner[3]);
      TRIANGLES_getTriangle(this.node_corner[3], this.node_corner[4], this.node_corner[1]);
    } else {
      let w = real(map(sin(map(this.time_dead, 14, 30, 0, HALF_PI)), 0, 1, 7.5, 0.5));  
      for (let i=0; i<this.node_fireLine.length; i++) {
        TRIANGLES_getLine_weight_T(this.node_fireLine[i][0], this.node_fireLine[i][1], w);
      }
    }
  };






  this.displayInfo = function() {
    noFill();
    strokeWeight(real(1));
    stroke(200);
    if (this.time_dead < 14) {
      LINES_getEllipse(this.node);
      LINES_getLine(this.node_corner[0], this.node_corner[1]);
      LINES_getLine(this.node_corner[1], this.node_corner[2]);
      LINES_getLine(this.node_corner[3], this.node_corner[4]);
      LINES_getLine(this.node_corner[0], this.node_corner[4]);
      LINES_getLine(this.begin.copy().add(-real(5), 0), this.begin.copy().add(real(5), 0));
      LINES_getLine(this.begin.copy().add(0, -real(5)), this.begin.copy().add(0, real(5)));
    LINES_getLine(this.begin, p5.Vector.add(this.node[0], this.node[this.node.length/4*2]).mult(0.5));
  } else {
      for (let i=0; i<this.node_fireLine.length; i++) {
        LINES_getLine(this.node_fireLine[i][0], this.node_fireLine[i][1]);
      }
    }
  };
}