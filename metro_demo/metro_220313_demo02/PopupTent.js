function PopupTent(begin_room, W_room) {
  this.ran = random(-999, 999);
  this.begin_room = begin_room.copy();
  this.W_room = W_room;
  this.W = real(random(75, 150));
  this.begin = begin_room.copy().add(random(0, (W_room-this.W)), 0, random(0, (W_room-this.W)));
  this.H = real(random(35, 75));
  this.H_roof = real(random(25, 50));
  this.var_easing1 = random(0.4, 0.6);


  if (state_click == 2) {
    this.count_sub = 0;
    this.begin_target = this.begin.copy();
    this.begin_lastClick = this.begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(10, 20));
  } else if (state_click == 3) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(5, 15));
    this.H_ori_target = this.H;
    this.H_ori_ori = this.H;
  } 




  this.node_wall = Array.from(Array(2), () => new Array(4));
  this.node_rotate = Array.from(Array(this.node_wall.length + 1), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-1, 0, 1);
    let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-1, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = lx;
  }

  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = this.begin.copy().add(this.W/2.0, 0, this.W/2.0);
    }
  }

  this.node_roof = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][2]).mult(0.5);







  this.change = function() {
    this.ran = random(-999, 999);
    this.W = real(random(75, 150));
    this.begin = this.begin_room.copy().add(random(0, (this.W_room-this.W)), 0, random(0, (this.W_room-this.W)));
    this.H = real(random(35, 75));
    this.H_roof = real(random(25, 50));
    this.var_easing1 = random(0.4, 0.6);


    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-1, 0, 1);
      let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-1, 0, 1);
      this.node_rotate[i][0] = lz;
      this.node_rotate[i][1] = lx;
    }


    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = this.begin.copy().add(this.W/2.0, 0, this.W/2.0);
      }
    }

    this.node_roof = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][2]).mult(0.5);
  };







  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < 1  &&  random(1)<0.85  &&  this.begin.x > -real(1000)) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == 1) {
        this.begin_target.y += this.H;
      } else {
        this.begin_target.y += this.H;
      }
      this.is_falling = true;
      this.time_falling = 0;
      this.time_max_falling = floor(random(10, 20));
    }
  };







  this.changeH = function() {
    if (!this.open_spring  &&  random(1) < 0.85) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(9, 17));
      this.H_ori_target = real(random(90, 200));
      this.H_ori_ori = this.H;
      //if (state_floor == 3) {
      //  this.H_ori_target = real(10);
      //  this.H_ori_ori = this.H_ori;
      //}
    }
  };












  this.update = function() {
    this.begin_room.x += speed;
    this.begin.x += speed;




    if (state_click == 2  &&  this.is_falling) {
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
      this.H = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_ori_target);
    }





    for (let i=0; i<this.node_wall.length; i++) {
      let y = -i * this.H;
      for (let j=0; j<this.node_wall[i].length; j++) {
        let n = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), y, this.W/2.0 * pow(-1, floor(j/2)+1));
        n = PRotateZ(n, this.node_rotate[i][0]);
        n = PRotateX(n, this.node_rotate[i][1]);
        n.add(this.begin.copy().add(this.W/2.0, 0, this.W/2.0));
        this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, this.var_easing1);
      }
    }

    let n_r = createVector(0, -this.H_roof, 0);
    n_r = PRotateZ(n_r, this.node_rotate[this.node_rotate.length-1][0]);
    n_r = PRotateX(n_r, this.node_rotate[this.node_rotate.length-1][1]);
    n_r.add(p5.Vector.add(this.node_wall[1][0], this.node_wall[1][2]).mult(0.5));
    this.node_roof = easing_p(this.node_roof, n_r, this.var_easing1);
  };



  this.display = function() {
    let t;
    const weight = real(4);
    const move_x = real(4);
    noStroke();
    beginShape(TRIANGLES);
    //--- F ---
    t = constrain(map(this.node_roof.z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
    t = constrain(map(this.node_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][3].x, this.node_wall[1][3].y, this.node_wall[1][3].z);
    vertex(this.node_wall[1][2].x, this.node_wall[1][2].y, this.node_wall[1][2].z);
    //--- L ---
    t = constrain(map(this.node_roof.z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
    t = constrain(map(this.node_wall[1][0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][0].x, this.node_wall[1][0].y, this.node_wall[1][0].z);
    t = constrain(map(this.node_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][3].x, this.node_wall[1][3].y, this.node_wall[1][3].z);

    //--- R ---
    t = constrain(map(this.node_roof.z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
    t = constrain(map(this.node_wall[1][2].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][2].x, this.node_wall[1][2].y, this.node_wall[1][2].z);
    t = constrain(map(this.node_wall[1][1].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][1].x, this.node_wall[1][1].y, this.node_wall[1][1].z);

    t = constrain(map(this.node_wall[0][3].z-real(2), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    //--- FL base ---
    vertex(this.node_wall[0][3].x+move_x, this.node_wall[0][3].y, this.node_wall[0][3].z-move_x);
    vertex(this.node_wall[0][3].x+move_x+weight, this.node_wall[0][3].y, this.node_wall[0][3].z-move_x);
    vertex(this.node_wall[1][3].x+move_x+weight, this.node_wall[1][3].y, this.node_wall[1][3].z-move_x);
    vertex(this.node_wall[1][3].x+move_x+weight, this.node_wall[1][3].y, this.node_wall[1][3].z-move_x);
    vertex(this.node_wall[1][3].x+move_x, this.node_wall[1][3].y, this.node_wall[1][3].z-move_x);
    vertex(this.node_wall[0][3].x+move_x, this.node_wall[0][3].y, this.node_wall[0][3].z-move_x);
    //--- FR base ---
    vertex(this.node_wall[0][2].x-move_x, this.node_wall[0][2].y, this.node_wall[0][2].z-move_x);
    vertex(this.node_wall[0][2].x-move_x-weight, this.node_wall[0][2].y, this.node_wall[0][2].z-move_x);
    vertex(this.node_wall[1][2].x-move_x-weight, this.node_wall[1][2].y, this.node_wall[1][2].z-move_x);
    vertex(this.node_wall[1][2].x-move_x-weight, this.node_wall[1][2].y, this.node_wall[1][2].z-move_x);
    vertex(this.node_wall[1][2].x-move_x, this.node_wall[1][2].y, this.node_wall[1][2].z-move_x);
    vertex(this.node_wall[0][2].x-move_x, this.node_wall[0][2].y, this.node_wall[0][2].z-move_x);

    t = constrain(map(this.node_wall[0][0].z-real(2), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    //--- BL base ---
    vertex(this.node_wall[0][0].x+move_x, this.node_wall[0][0].y, this.node_wall[0][0].z+move_x);
    vertex(this.node_wall[0][0].x+move_x+weight, this.node_wall[0][0].y, this.node_wall[0][0].z+move_x);
    vertex(this.node_wall[1][0].x+move_x+weight, this.node_wall[1][0].y, this.node_wall[1][0].z+move_x);
    vertex(this.node_wall[1][0].x+move_x+weight, this.node_wall[1][0].y, this.node_wall[1][0].z+move_x);
    vertex(this.node_wall[1][0].x+move_x, this.node_wall[1][0].y, this.node_wall[1][0].z+move_x);
    vertex(this.node_wall[0][0].x+move_x, this.node_wall[0][0].y, this.node_wall[0][0].z+move_x);
    //--- BR base ---
    vertex(this.node_wall[0][1].x-move_x, this.node_wall[0][1].y, this.node_wall[0][1].z+move_x);
    vertex(this.node_wall[0][1].x-move_x-weight, this.node_wall[0][1].y, this.node_wall[0][1].z+move_x);
    vertex(this.node_wall[1][1].x-move_x-weight, this.node_wall[1][1].y, this.node_wall[1][1].z+move_x);
    vertex(this.node_wall[1][1].x-move_x-weight, this.node_wall[1][1].y, this.node_wall[1][1].z+move_x);
    vertex(this.node_wall[1][1].x-move_x, this.node_wall[1][1].y, this.node_wall[1][1].z+move_x);
    vertex(this.node_wall[0][1].x-move_x, this.node_wall[0][1].y, this.node_wall[0][1].z+move_x);

    endShape();
  };



  this.displayInfo = function() {
    noFill();
    strokeWeight(real(1.5));
    stroke(c_info2);
    beginShape(LINES);
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i][(j+1)%4].x, this.node_wall[i][(j+1)%4].y, this.node_wall[i][(j+1)%4].z);
      }
    }
    for (let j=0; j<4; j++) {
      vertex(this.node_wall[0][j].x, this.node_wall[0][j].y, this.node_wall[0][j].z);
      vertex(this.node_wall[1][j].x, this.node_wall[1][j].y, this.node_wall[1][j].z);
      vertex(this.node_wall[1][j].x, this.node_wall[1][j].y, this.node_wall[1][j].z);
      vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
    }
    endShape();
  };
}