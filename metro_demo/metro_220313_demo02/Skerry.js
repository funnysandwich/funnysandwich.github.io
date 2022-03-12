function Skerry(begin, W, D) {
  this.ran = random(-999, 999);
  this.var_easing1 = random(0.1, 0.3);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  const num_nodeHor = floor(map(this.W, real(150), real(400), 3, 6));
  this.H_max_target = real(random(20, 45)) * num_nodeHor;
  if (state_click == 0) {
    this.H_max = 0;
  } else {
    this.H_max = this.H_max_target;
  }  



  if (state_click == 2) {
    this.count_sub = 0;
    this.begin_target = this.begin.copy();
    this.begin_lastClick = this.begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(2, 5));
  } else if (state_click == 3) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(5, 15));
    //this.H_ori_target = this.H;
    this.H_ori_ori = this.H_max_target;
  }





  this.node = new Array(3);
  this.moveX = Array.from(Array(this.node.length), () => new Array(num_nodeHor));
  this.moveZ = Array.from(Array(this.node.length), () => new Array(num_nodeHor));

  for (let i=0; i<this.node.length; i++) {
    this.node[i] = new Array(num_nodeHor);
    for (let j=0; j<num_nodeHor; j++) {
      this.moveX[i][j] = random(-(this.W/ (this.node[i].length-1)) / 3.0, (this.W/ (this.node[i].length-1)) / 3.0);
      this.moveZ[i][j] = random(-(this.D/ (this.node.length-1)) / 3.0, (this.D/ (this.node.length-1)) / 3.0);
      if (i == 0) {
        this.moveZ[i][j] += this.D/ (this.node.length-1) *random(0.2, 1)* map(sin(map(j, 0, this.node[i].length-1, 0, PI)), 0, 1, 0, 1);
      }
    }
  }

  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      const x = map(j, 0, this.node[i].length-1, 0, this.W);
      const z = map(i, 0, this.node.length-1, this.D, 0);
      let y = -map(noise(j+this.ran+i*777), 0, 1, this.H_max*0.5, this.H_max) * sin(map(j, 0, this.node[i].length-1, 0, PI));
      if (i == 0) {
        y = 0;
      } else if (1 == 2) {
        y *= 0.5;
      }
      this.node[i][j] = createVector(x+this.moveX[i][j], y, z+this.moveZ[i][j]).add(this.begin);
    }
  }











  this.change = function() {
  };







  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < 3  &&  this.begin.x+this.W > -real(1500)) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      this.begin_target.y += this.H_max*0.25;
      this.is_falling = true;
      this.time_falling = 0;
      this.time_max_falling = floor(random(12, 18));
    }
  };











  this.changeH = function() {
    if (!this.open_spring) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(10, 15));
      this.H_max_target = this.H_max * random(1.2, 1.5);
      this.H_ori_ori = this.H_max;
      //if (state_floor == 3) {
      //  this.H_ori_target = real(10);
      //  this.H_ori_ori = real(200);
      //}
    }
  };














  this.update = function() {
    this.begin.x += speed;


    if (state_click == 0) {
      this.H_max = easing_x(this.H_max, this.H_max_target, this.var_easing1);
    } else if (state_click == 2  &&  this.is_falling) {
      if (this.time_falling < this.time_max_falling) {
        this.time_falling ++;
      } else {
        this.is_falling = false;
        this.begin_lastClick = this.begin_target.copy();
      }
      let l = map(sin(map(this.time_falling, 0, this.time_max_falling, HALF_PI, PI)), 1, 0, 0.001, 1);
      this.begin.y = (this.begin_target.y - this.begin_lastClick.y)*l + this.begin_lastClick.y;
    } else if (state_click == 3  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_max = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_max_target);
    }


    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        const x = map(j, 0, this.node[i].length-1, 0, this.W);
        const z = map(i, 0, this.node.length-1, this.D, 0);
        let y = -map(noise(j+this.ran+i*777), 0, 1, this.H_max*0.5, this.H_max) * sin(map(j, 0, this.node[i].length-1, 0, PI));
        if (i == 0) {
          y = 0;
        } else if (1 == 2) {
          y *= 0.5;
        }
        this.node[i][j] = createVector(x+this.moveX[i][j], y, z+this.moveZ[i][j]).add(this.begin);
      }
    }
  };






  this.display = function() {

    noStroke();
    beginShape(TRIANGLES);
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        const c1 = lerpColor(c_near, c_far, constrain(map(this.node[i+1][j].z, skyline.z, 0, 1, 0), 0, 1));
        const c2 = lerpColor(c_near, c_far, constrain(map(this.node[i+1][j+1].z, skyline.z, 0, 1, 0), 0, 1));
        const c3 = lerpColor(c_near, c_far, constrain(map(this.node[i][j+1].z, skyline.z, 0, 1, 0), 0, 1));
        const c4 = lerpColor(c_near, c_far, constrain(map(this.node[i][j].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node[i+1][j], this.node[i+1][j+1], this.node[i][j+1], this.node[i][j], c1, c2, c3, c4);
      }
    }
    endShape();
  };





  this.displayInfo = function() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        LINES_getLine(this.node[i][j], this.node[i][j+1]);
      }
    }
    for (let j=0; j<this.node[0].length; j++) {
      for (let i=0; i<this.node.length-1; i++) {
        LINES_getLine(this.node[i][j], this.node[i+1][j]);
      }
    }
    endShape();
  };
}