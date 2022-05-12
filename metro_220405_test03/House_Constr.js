function ConstrHouse(begin, W, D, H, floor_num, index_z, index_block) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = H;
  this.floor_num = floor_num;
  if (floor_num < 2) {
    this.floor_num = 3;
  }
  this.index_z = index_z;


  this.is_constr = true;
  this.is_normalHouse = false;
  this.is_cat = false;
  this.is_CTower = false;
  this.is_firewatch = false;
  this.is_buildingBlock = false;
  this.is_dottedLine = false;
  this.is_underGround = false;


  this.state_structure = floor(random(0, 2));


  this.open_change = false;
  this.time_change = 0;
  this.time_change_max = floor(random(0, 3));


  this.var_easing1 = random(0.4, 0.6);



  if (state_click == 2) {
    this.count_sub = 0;
    this.begin_target = begin.copy();
    this.begin_lastClick = begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(2, 5));
  } else if (state_click == 3) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(3, 15));
    this.H_ori_target = this.H;
    this.H_ori_ori = this.H;
  } else if (state_click == 4) {
    this.open_bulge = false;
    this.time_bulge = new Array(this.floor_num+1);
    this.time_max_bulge = floor(random(3, 15));
    this.W_add_target = W;
    this.D_add_target = D;
    this.W_add = new Array(this.floor_num+1);
    this.D_add = new Array(this.floor_num+1);
    for (let i=0; i<this.time_bulge.length; i++) {
      this.time_bulge[i] = 0;
      this.W_add[i] = 0;
      this.D_add[i] = 0;
    }
  }



  this.node = new Array(this.floor_num+1);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy().add(this.W/2, 0, this.D/2);
  }


  this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.begin);
    }
  }


  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }





  this.have_ladder = false;
  if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
    this.have_ladder = true;
  }


  if (this.have_ladder) {
    this.which_floor = constrain(floor(random(floor_min_ladder, this.floor_num+0.5)), floor_min_ladder, floor_max_ladder)-1;
    this.which_floor_next = this.which_floor + floor(random(-floor_sub_ladder, floor_sub_ladder+1));

    this.begin_ladder = p5.Vector.add(this.node_wall[this.which_floor][1], this.node_wall[this.which_floor][2]).mult(0.5);
    this.end_ladder = this.begin_ladder.copy(); // wait for outside

    this.D_ladder = constrain(this.W * random(0.25, 0.5), real(50), real(150));
    this.H_ladder = real(random(10, 25));
    this.node_ladderF = Array.from(Array(5), () => new Array(2));
    this.node_ladderB = Array.from(Array(5), () => new Array(2));
    for (let i=0; i<this.node_ladderF.length; i++) {
      let rate = constrain(map(i, 0, this.node_ladderF.length-1, 0, 1), 0, 1);
      let y_sub = sin(map(i, 0, this.node_ladderF.length-1, 0, PI)) * real(25);
      for (let j=0; j<this.node_ladderF[i].length; j++) {
        this.node_ladderF[i][j] = p5.Vector.sub(this.end_ladder, this.begin_ladder).mult(rate).add(this.begin_ladder);
        this.node_ladderB[i][j] = p5.Vector.sub(this.end_ladder, this.begin_ladder).mult(rate).add(this.begin_ladder);
        this.node_ladderF[i][j].z += this.D_ladder/2.0;
        this.node_ladderB[i][j].z -= this.D_ladder/2.0;
        this.node_ladderF[i][j].y += y_sub;
        this.node_ladderB[i][j].y += y_sub;
      }
      this.node_ladderF[i][1].y -= this.H_ladder;
      this.node_ladderB[i][1].y -= this.H_ladder;
    }
  }









  this.have_crane = false;
  if (open_crane  &&  random(1)<rate_crane) {
    this.have_crane = true;
  }




  if (this.have_crane) {
    this.which_wall = floor(random(0, 4));
    this.H_crane = this.H_ori * random(0.25, 2);
    this.L_crane = p5.Vector.dist(this.node_wall[0][0], this.node_wall[0][2]) * random(0.5, 0.75);
    this.W_crane = real(random(10, 20));

    this.node_crane = new Array(4);
    this.node_crane[1] = this.node_wall[this.node_wall.length-1][this.which_wall].copy();
    this.node_crane[3] = p5.Vector.sub(this.node[this.node.length-1], this.node_crane[1]).setMag(this.L_crane).add(this.node_crane[1]);
    this.node_crane[3].y -= this.H_crane;
    this.node_crane[2] = p5.Vector.add(this.node_crane[1], this.node_crane[3]).mult(0.5);
    this.node_crane[0] = p5.Vector.sub(this.node_crane[1], this.node_crane[2]).add(this.node_crane[1]);

    this.node_craneDL = new Array(4);
    this.node_craneDR = new Array(4);
    for (let i=0; i<this.node_craneDL.length; i++) {      
      let l = this.node_wall[this.node_wall.length-1][(this.which_wall+1+4)%4].copy();
      let r = this.node_wall[this.node_wall.length-1][(this.which_wall-1+4)%4].copy();
      this.node_craneDL[i] = p5.Vector.sub(l, r).setMag(this.W_crane/2.0).add(this.node_crane[i]);
      this.node_craneDL[i].y += this.W_crane;
      this.node_craneDR[i] = p5.Vector.sub(r, l).setMag(this.W_crane/2.0).add(this.node_crane[i]);
      this.node_craneDR[i].y += this.W_crane;
    }
  }










  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = H;
    this.floor_num = floor_num;
    if (floor_num < 2) {
      this.floor_num = 3;
    }
    this.state_structure = floor(random(0, 2));

    this.open_change = false;
    this.time_change = 0;


    this.var_easing1 = random(0.4, 0.6);

    this.node = new Array(this.floor_num+1);
    for (let i=0; i<this.node.length; i++) {
      this.node[i] = this.begin.copy().add(this.W/2, 0, this.D/2);
    }

    this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.begin).add(this.W/2, 0, this.D/2);
      }
    }

    this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      this.node_rotate[i][0] = lz;
      this.node_rotate[i][1] = 0;
    }



    this.have_ladder = false;
    if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
      this.have_ladder = true;
    }



    if (this.have_ladder) {
      this.which_floor = constrain(floor(random(floor_min_ladder, this.floor_num+0.5)), floor_min_ladder, floor_max_ladder)-1;
      this.which_floor_next = this.which_floor + floor(random(-floor_sub_ladder, floor_sub_ladder+1));

      this.begin_ladder = p5.Vector.add(this.node_wall[this.which_floor][1], this.node_wall[this.which_floor][2]).mult(0.5);
      this.end_ladder = this.begin_ladder.copy(); // wait for outside

      this.D_ladder = constrain(this.W * random(0.25, 0.5), real(50), real(150));
      this.H_ladder = real(random(10, 25));
      this.node_ladderF = Array.from(Array(5), () => new Array(2));
      this.node_ladderB = Array.from(Array(5), () => new Array(2));
      for (let i=0; i<this.node_ladderF.length; i++) {
        for (let j=0; j<this.node_ladderF[i].length; j++) {
          this.node_ladderF[i][j] = this.begin_ladder.copy();
          this.node_ladderB[i][j] = this.begin_ladder.copy();
        }
      }
    }






    this.have_crane = false;
    if (open_crane  &&  random(1)<rate_crane) {
      this.have_crane = true;
    }


    if (this.have_crane) {
      this.which_wall = floor(random(0, 4));
      this.H_crane = this.H_ori * random(0.25, 2);
      this.L_crane = p5.Vector.dist(this.node_wall[0][0], this.node_wall[0][2]) * random(0.5, 0.75);
      this.W_crane = real(random(10, 20)); 

      this.node_crane = new Array(4);
      this.node_craneDL = new Array(4);
      this.node_craneDR = new Array(4);
      for (let i=0; i<this.node_crane.length; i++) {
        this.node_crane[i] = this.node_wall[this.node_wall.length-1][this.which_wall].copy();
        this.node_craneDL[i] = this.node_wall[this.node_wall.length-1][this.which_wall].copy();
        this.node_craneDR[i] = this.node_wall[this.node_wall.length-1][this.which_wall].copy();
      }
    }
  };











  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < this.floor_num  &&  random(1)<0.75) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == this.floor_num) {
        this.begin_target.y += this.H_ori*0.5;
      } else {
        this.begin_target.y += this.H_ori;
      }
      this.is_falling = true;
      this.time_falling = 0;
      this.time_max_falling = floor(random(2, 5));
    }
  };













  this.changeH = function() {
    if (!this.open_spring  &&  random(1) < 0.75) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(3, 15));
      this.H_ori_target = constrain(real(map(this.floor_num, 2, 8, 600, 200)), 200, 600);
      this.H_ori_ori = real(75);
      if (state_floor == 3) {
        this.H_ori_target = real(10);
        this.H_ori_ori = real(200);
      }
    }
  };









  this.changeW = function() {
    if (!this.open_bulge  &&  random(1) < 0.75) {
      this.open_bulge = true;
      this.time_max_bulge = floor(random(3, 20));
      this.W_add_target = constrain(real(map(this.floor_num, 2, 10, 50, 150)), 50, 200);
      this.D_add_target = constrain(real(map(this.floor_num, 2, 10, 50, 150)), 50, 200);
      for (let i=0; i<this.time_bulge.length; i++) {
        this.time_bulge[i] = -i;
        this.W_add[i] = 0;
        this.D_add[i] = 0;
      }
    }
  };












  this.update = function(index_block) {
    if (this.open_change) {
      if (this.time_change < this.time_change_max) {
        this.time_change ++;
      }
    }


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
    }




    if (state_click == 3  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_ori = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_ori_target);
    }






    if (state_click == 4  &&  this.open_bulge) {
      for (let i=0; i<this.time_bulge.length; i++) {
        if (this.time_bulge[i] < this.time_max_bulge) {
          this.time_bulge[i] ++;
        } else if (i == this.time_bulge.length-1) {
          this.open_bulge = false;
        }
        this.W_add[i] = map(sin(map(constrain(this.time_bulge[i], 0, this.time_max_bulge), 0, this.time_max_bulge, 0, PI)), 0, 1, 0, this.W_add_target);
        this.D_add[i] = map(sin(map(constrain(this.time_bulge[i], 0, this.time_max_bulge), 0, this.time_max_bulge, 0, PI)), 0, 1, 0, this.W_add_target);
      }
    }






    this.node[0] = easing_p(this.node[0], this.begin.copy().add(this.W/2 + speed*2, 0, this.D/2), this.var_easing1);
    for (let i=1; i<this.node.length; i++) {
      let n;
      //if (i == 1) {
      n = createVector(speed, -this.H_ori, 0);
      //} else {
      //  n = createVector(speed, -this.H, 0).setMag(p5.Vector.dist(this.node[i-1], this.node[i-2])).mult(0.88);
      //}
      n = PRotateZ(n, this.node_rotate[i][0]);
      n = PRotateX(n, this.node_rotate[i][1]);
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, this.var_easing1);
    }


    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        let n = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1));
        if (state_click == 4) {
          let l = sin(map(i, 0, this.node_wall.length-1, 0, HALF_PI*1.75));
          n = createVector((this.W/2.0+this.W_add[i]*l) * pow(-1, ceil(j%1.5)+1), 0, (this.D/2.0+this.D_add[i]*l) * pow(-1, floor(j/2)+1));
        }
        n = PRotateZ(n, this.node_rotate[i][0]);
        n = PRotateX(n, this.node_rotate[i][1]);
        n.add(this.node[i]);
        this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, 0.5);
      }
    }



    if (this.have_ladder) {
      this.begin_ladder = p5.Vector.add(this.node_wall[this.which_floor][1], this.node_wall[this.which_floor][2]).mult(0.5);
      this.end_ladder.x += speed;

      for (let i=0; i<this.node_ladderF.length; i++) {
        let rate = constrain(map(i, 0, this.node_ladderF.length-1, 0, 1), 0, 1);
        let y_sub = sin(map(i, 0, this.node_ladderF.length-1, 0, PI)) * real(25);
        for (let j=0; j<this.node_ladderF[i].length; j++) {
          this.node_ladderF[i][j] = p5.Vector.sub(this.end_ladder, this.begin_ladder).mult(rate).add(this.begin_ladder);
          this.node_ladderB[i][j] = p5.Vector.sub(this.end_ladder, this.begin_ladder).mult(rate).add(this.begin_ladder);
          this.node_ladderF[i][j].z += this.D_ladder/2.0;
          this.node_ladderB[i][j].z -= this.D_ladder/2.0;
          this.node_ladderF[i][j].y += y_sub;
          this.node_ladderB[i][j].y += y_sub;
        }
        this.node_ladderF[i][1].y -= this.H_ladder;
        this.node_ladderB[i][1].y -= this.H_ladder;
      }
    }






    if (this.have_crane) {
      this.node_crane[1] = this.node_wall[this.node_wall.length-1][this.which_wall].copy();
      this.node_crane[3] = p5.Vector.sub(this.node[this.node.length-1], this.node_crane[1]).setMag(this.L_crane).add(this.node_crane[1]);
      this.node_crane[3].y -= this.H_crane;
      this.node_crane[2] = p5.Vector.add(this.node_crane[1], this.node_crane[3]).mult(0.5);
      this.node_crane[0] = p5.Vector.sub(this.node_crane[1], this.node_crane[2]).add(this.node_crane[1]);

      for (let i=0; i<this.node_craneDL.length; i++) {
        let l = this.node_wall[this.node_wall.length-1][(this.which_wall+1+4)%4].copy();
        let r = this.node_wall[this.node_wall.length-1][(this.which_wall-1+4)%4].copy();
        this.node_craneDL[i] = p5.Vector.sub(l, r).setMag(this.W_crane/2.0).add(this.node_crane[i]);
        this.node_craneDL[i].y += this.W_crane;
        this.node_craneDR[i] = p5.Vector.sub(r, l).setMag(this.W_crane/2.0).add(this.node_crane[i]);
        this.node_craneDR[i].y += this.W_crane;
      }
    }
  };















  this.display = function() {
    //noFill();
    //strokeWeight(real(15));


    //------------- ⬇F⬇ -------------
    //let t_c = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    //stroke(lerpColor(c_near, c_far, t_c));
    //beginShape(LINES);
    //for (let i=0; i<this.node_wall.length-1; i++) {
    //  vertex(this.node_wall[i][2].x, this.node_wall[i][2].y, this.node_wall[i][2].z);
    //  vertex(this.node_wall[i+1][2].x, this.node_wall[i+1][2].y, this.node_wall[i+1][2].z);
    //  vertex(this.node_wall[i][3].x, this.node_wall[i][3].y, this.node_wall[i][3].z);
    //  vertex(this.node_wall[i+1][3].x, this.node_wall[i+1][3].y, this.node_wall[i+1][3].z);
    //  if (this.W > real(400)) {
    //    let m = p5.Vector.add(this.node_wall[i][2], this.node_wall[i][3]).mult(0.5);
    //    let m_ = p5.Vector.add(this.node_wall[i+1][2], this.node_wall[i+1][3]).mult(0.5);
    //    vertex(m.x, m.y, m.z);
    //    vertex(m_.x, m_.y, m_.z);
    //  }
    //}
    //endShape();
    //------------- ⬆F⬆ -------------

    //------------- ⬇B⬇ -------------
    //t_c = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //stroke(lerpColor(c_near, c_far, t_c));
    //beginShape(LINES);
    //for (let i=0; i<this.node_wall.length-1; i++) {
    //  vertex(this.node_wall[i][0].x, this.node_wall[i][0].y, this.node_wall[i][0].z);
    //  vertex(this.node_wall[i+1][0].x, this.node_wall[i+1][0].y, this.node_wall[i+1][0].z);
    //  vertex(this.node_wall[i][1].x, this.node_wall[i][1].y, this.node_wall[i][1].z);
    //  vertex(this.node_wall[i+1][1].x, this.node_wall[i+1][1].y, this.node_wall[i+1][1].z);
    //  if (this.W > real(400)) {
    //    let m = p5.Vector.add(this.node_wall[i][0], this.node_wall[i][1]).mult(0.5);
    //    let m_ = p5.Vector.add(this.node_wall[i+1][0], this.node_wall[i+1][1]).mult(0.5);
    //    vertex(m.x, m.y, m.z);
    //    vertex(m_.x, m_.y, m_.z);
    //  }
    //}
    //endShape();
    //------------- ⬆B⬆ -------------


    //if (this.state_structure == 0) {
    //  strokeWeight(real(8));
    //  t_c = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
    //  stroke(lerpColor(c_near, c_far, t_c));
    //  for (let i=1; i<this.node_wall.length-1; i++) {
    //    beginShape();
    //    for (let j=0; j<this.node_wall[i].length; j++) {
    //      if (j==0) {
    //        t_c = constrain(map(this.node_wall[i][0].z, skyline.z, 0, 1, 0), 0, 1);
    //        fill(lerpColor(c_near, c_far, t_c));
    //      } else if (j==2) {
    //        t_c = constrain(map(this.node_wall[i][2].z, skyline.z, 0, 1, 0), 0, 1);
    //        fill(lerpColor(c_near, c_far, t_c));
    //      }
    //      vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
    //    }
    //    endShape(CLOSE);
    //  }
    //} else if (this.state_structure == 1) {
    //  noFill();
    //  strokeWeight(real(8));
    //  t_c = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
    //  stroke(lerpColor(c_near, c_far, t_c));
    //  for (let i=1; i<this.node_wall.length-1; i++) {
    //    beginShape();
    //    for (let j=0; j<this.node_wall[i].length; j++) {
    //      vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
    //    }
    //    endShape(CLOSE);
    //  }

    //  strokeWeight(real(5));
    //  t_c = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    //  stroke(lerpColor(c_near, c_far, t_c));
    //  beginShape(LINES);
    //  for (let i=0; i<this.node_wall.length-2; i++) {
    //    vertex(this.node_wall[i][3].x, this.node_wall[i][3].y, this.node_wall[i][3].z);
    //    vertex(this.node_wall[i+1][2].x, this.node_wall[i+1][2].y, this.node_wall[i+1][2].z);
    //  }
    //  endShape();

    //  t_c = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //  stroke(lerpColor(c_near, c_far, t_c));
    //  beginShape(LINES);
    //  for (let i=0; i<this.node_wall.length-2; i++) {
    //    vertex(this.node_wall[i][1].x, this.node_wall[i][1].y, this.node_wall[i][1].z);
    //    vertex(this.node_wall[i+1][0].x, this.node_wall[i+1][0].y, this.node_wall[i+1][0].z);
    //  }
    //  endShape();
    //}






    //if (this.have_ladder) {
    //noFill();
    //strokeWeight(real(4));
    //t = constrain(map(this.node_ladderF[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //stroke(lerpColor(c_near, c_far, t));
    //beginShape(LINES);
    //for (let i=0; i<this.node_ladderF.length; i++) {
    //  vertex(this.node_ladderF[i][0].x, this.node_ladderF[i][0].y, this.node_ladderF[i][0].z);
    //  vertex(this.node_ladderF[i][1].x, this.node_ladderF[i][1].y, this.node_ladderF[i][1].z);
    //  if (i < this.node_ladderF.length-1) {
    //    for (let j=0; j<this.node_ladderF[i].length; j++) {
    //      vertex(this.node_ladderF[i][j].x, this.node_ladderF[i][j].y, this.node_ladderF[i][j].z);
    //      vertex(this.node_ladderF[i+1][j].x, this.node_ladderF[i+1][j].y, this.node_ladderF[i+1][j].z);
    //    }
    //  }
    //}
    //endShape();
    //---
    //t = constrain(map(this.node_ladderB[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //stroke(lerpColor(c_near, c_far, t));
    //beginShape(LINES);
    //for (let i=0; i<this.node_ladderB.length; i++) {
    //  vertex(this.node_ladderB[i][0].x, this.node_ladderB[i][0].y, this.node_ladderB[i][0].z);
    //  vertex(this.node_ladderB[i][1].x, this.node_ladderB[i][1].y, this.node_ladderB[i][1].z);
    //  if (i < this.node_ladderB.length-1) {
    //    vertex(this.node_ladderB[i][1].x, this.node_ladderB[i][1].y, this.node_ladderB[i][1].z);
    //    vertex(this.node_ladderB[i+1][1].x, this.node_ladderB[i+1][1].y, this.node_ladderB[i+1][1].z);
    //  }
    //}
    //endShape();


    //noStroke();
    //for (let i=0; i<this.node_ladderF.length-1; i++) {
    //  beginShape();
    //  t = constrain(map(this.node_ladderB[i][0].z, skyline.z, 0, 1, 0), 0, 1);
    //  fill(lerpColor(c_near, c_far, t));
    //  vertex(this.node_ladderB[i][0].x, this.node_ladderB[i][0].y, this.node_ladderB[i][0].z);
    //  vertex(this.node_ladderB[i+1][0].x, this.node_ladderB[i+1][0].y, this.node_ladderB[i+1][0].z);
    //  t = constrain(map(this.node_ladderF[i][0].z, skyline.z, 0, 1, 0), 0, 1);
    //  fill(lerpColor(c_near, c_far, t));
    //  vertex(this.node_ladderF[i+1][0].x, this.node_ladderF[i+1][0].y, this.node_ladderF[i+1][0].z);
    //  vertex(this.node_ladderF[i][0].x, this.node_ladderF[i][0].y, this.node_ladderF[i][0].z);
    //  endShape(CLOSE);
    //}
    //}







    //if (this.have_crane) {
    //  noFill();
    //  strokeWeight(real(4));
    //  t_c = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
    //  stroke(lerpColor(c_near, c_far, t_c));
    //  beginShape(LINES);
    //  vertex(this.node_crane[0].x, this.node_crane[0].y, this.node_crane[0].z);
    //  vertex(this.node_crane[3].x, this.node_crane[3].y, this.node_crane[3].z);
    //  vertex(this.node_craneDL[0].x, this.node_craneDL[0].y, this.node_craneDL[0].z);
    //  vertex(this.node_craneDL[3].x, this.node_craneDL[3].y, this.node_craneDL[3].z);
    //  vertex(this.node_craneDR[0].x, this.node_craneDR[0].y, this.node_craneDR[0].z);
    //  vertex(this.node_craneDR[3].x, this.node_craneDR[3].y, this.node_craneDR[3].z);
    //  for (let i=0; i<this.node_crane.length; i++) {
    //    vertex(this.node_crane[i].x, this.node_crane[i].y, this.node_crane[i].z);
    //    vertex(this.node_craneDL[i].x, this.node_craneDL[i].y, this.node_craneDL[i].z);
    //    vertex(this.node_craneDL[i].x, this.node_craneDL[i].y, this.node_craneDL[i].z);
    //    vertex(this.node_craneDR[i].x, this.node_craneDR[i].y, this.node_craneDR[i].z);
    //    vertex(this.node_craneDR[i].x, this.node_craneDR[i].y, this.node_craneDR[i].z);
    //    vertex(this.node_crane[i].x, this.node_crane[i].y, this.node_crane[i].z);
    //  }
    //  let m = p5.Vector.sub(this.node_crane[2], this.node_crane[3]).mult(0.25).add(this.node_crane[3]);
    //  vertex(m.x, m.y, m.z);
    //  vertex(m.x, m.y + this.H_crane*2, m.z);
    //  endShape();

    //  strokeWeight(real(2));
    //  beginShape(LINES);
    //  for (let i=0; i<this.node_crane.length-1; i++) {
    //    vertex(this.node_crane[i].x, this.node_crane[i].y, this.node_crane[i].z);
    //    vertex(this.node_craneDL[i+1].x, this.node_craneDL[i+1].y, this.node_craneDL[i+1].z);
    //    vertex(this.node_craneDL[i].x, this.node_craneDL[i].y, this.node_craneDL[i].z);
    //    vertex(this.node_craneDR[i+1].x, this.node_craneDR[i+1].y, this.node_craneDR[i+1].z);
    //    vertex(this.node_craneDR[i].x, this.node_craneDR[i].y, this.node_craneDR[i].z);
    //    vertex(this.node_crane[i+1].x, this.node_crane[i+1].y, this.node_crane[i+1].z);
    //  }

    //  endShape();
    //}
  };






  this.display_TRIANGLES = function() {
    let t, c1, c2;
    //strokeWeight(real(15));


    //------------- ⬇F⬇ -------------
    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_wall[i][2], this.node_wall[i+1][2], real(15));
      TRIANGLES_getLine_weight(this.node_wall[i][3], this.node_wall[i+1][3], real(15));
      if (this.W > real(400)) {
        let m = p5.Vector.add(this.node_wall[i][2], this.node_wall[i][3]).mult(0.5);
        let m_ = p5.Vector.add(this.node_wall[i+1][2], this.node_wall[i+1][3]).mult(0.5);
        TRIANGLES_getLine_weight(m, m_, real(15));
      }
    }
    //------------- ⬆F⬆ -------------

    //------------- ⬇B⬇ -------------
    t = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getLine_weight(this.node_wall[i][0], this.node_wall[i+1][0], real(15));
      TRIANGLES_getLine_weight(this.node_wall[i][1], this.node_wall[i+1][1], real(15));
      if (this.W > real(400)) {
        let m = p5.Vector.add(this.node_wall[i][0], this.node_wall[i][1]).mult(0.5);
        let m_ = p5.Vector.add(this.node_wall[i+1][0], this.node_wall[i+1][1]).mult(0.5);
        TRIANGLES_getLine_weight(m, m_, real(15));
      }
    }
    //------------- ⬆B⬆ -------------



    if (this.state_structure == 0) {
      for (let i=1; i<this.node_wall.length-1; i++) {
        t = constrain(map(this.node_wall[i][0].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_wall[i][2].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3], c1, c1, c2, c2);
      }
    } else if (this.state_structure == 1) {
      t = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=1; i<this.node_wall.length-1; i++) {
        for (let j=0; j<this.node_wall[i].length; j++) {
          TRIANGLES_getLine_weight_Y(this.node_wall[i][j], this.node_wall[i][(j+1)%4], real(8));
        }
      }

      t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.node_wall.length-2; i++) {
        TRIANGLES_getLine_weight_Y(this.node_wall[i][3], this.node_wall[i+1][2], real(5));
      }

      t = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.node_wall.length-2; i++) {
        TRIANGLES_getLine_weight_Y(this.node_wall[i][1], this.node_wall[i+1][0], real(5));
      }
    }







    if (this.have_ladder) {
      t = constrain(map(this.node_ladderF[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.node_ladderF.length; i++) {
        TRIANGLES_getLine_weight(this.node_ladderF[i][0], this.node_ladderF[i][1], real(4));
        if (i < this.node_ladderF.length-1) {
          for (let j=0; j<this.node_ladderF[i].length; j++) {
            TRIANGLES_getLine_weight_Y(this.node_ladderF[i][j], this.node_ladderF[i+1][j], real(4));
          }
        }
      }

      t = constrain(map(this.node_ladderB[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.node_ladderB.length; i++) {
        TRIANGLES_getLine_weight(this.node_ladderB[i][0], this.node_ladderB[i][1], real(4));
        if (i < this.node_ladderB.length-1) {
          TRIANGLES_getLine_weight_Y(this.node_ladderB[i][1], this.node_ladderB[i+1][1], real(4));
        }
      }


      for (let i=0; i<this.node_ladderF.length-1; i++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_ladderB[i][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_ladderF[i][0].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_ladderB[i][0], this.node_ladderB[i+1][0], this.node_ladderF[i+1][0], this.node_ladderF[i][0], c1, c1, c2, c2);
      }
    }








    if (this.have_crane) {
      t = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      TRIANGLES_getLine_weight_Y(this.node_crane[0], this.node_crane[3], real(4));
      TRIANGLES_getLine_weight_Y(this.node_craneDL[0], this.node_craneDL[3], real(4));
      TRIANGLES_getLine_weight_Y(this.node_craneDR[0], this.node_craneDR[3], real(4));

      for (let i=0; i<this.node_crane.length; i++) {
        TRIANGLES_getLine_weight(this.node_crane[i], this.node_craneDL[i], real(4));
        TRIANGLES_getLine_weight(this.node_craneDL[i], this.node_craneDR[i], real(4));
        TRIANGLES_getLine_weight(this.node_craneDR[i], this.node_crane[i], real(4));
      }
      let m = p5.Vector.sub(this.node_crane[2], this.node_crane[3]).mult(0.25).add(this.node_crane[3]);
      TRIANGLES_getLine_weight(m, m.copy().add(0, this.H_crane*2, 0), real(4));


      for (let i=0; i<this.node_crane.length-1; i++) {
        TRIANGLES_getLine_weight_Y(this.node_crane[i], this.node_craneDL[i+1], real(2));
        TRIANGLES_getLine_weight_Y(this.node_craneDL[i], this.node_craneDR[i+1], real(2));
        TRIANGLES_getLine_weight_Y(this.node_craneDR[i], this.node_crane[i+1], real(2));
      }
    }
  };




















  this.displayInfo = function() {
    //noFill();
    /*
    stroke(c_info1);
     strokeWeight(real(3));
     beginShape(POINTS);
     for (let i=0; i<this.node.length; i++) {
     vertex(this.node[i].x, this.node[i].y, this.node[i].z);
     }
     endShape();
     
     strokeWeight(real(2));
     beginShape(LINES);
     for (let i=1; i<this.node.length; i++) {
     vertex(this.node[i].x, this.node[i].y, this.node[i].z);
     vertex(this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
     }
     endShape();
     */

    //stroke(c_info2);
    //strokeWeight(real(2));
    //beginShape(LINES);

    for (let i=1; i<this.node_wall.length-1; i++) {
      //beginShape();
      for (let j=0; j<this.node_wall[i].length; j++) {
        //vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        LINES_getLine(this.node_wall[i][j], this.node_wall[i][(j+1)%this.node_wall[i].length]);
      }
      //endShape(CLOSE);
    }

    //beginShape(LINES);
    for (let j=0; j<this.node_wall[0].length; j++) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
      }
    }
    //endShape();






    if (this.have_ladder) {
      //stroke(c_info2);
      //strokeWeight(real(2));
      //beginShape(LINES);
      for (let i=0; i<this.node_ladderF.length-1; i++) {
        for (let j=0; j<this.node_ladderF[i].length; j++) {
          vertex(this.node_ladderF[i][j].x, this.node_ladderF[i][j].y, this.node_ladderF[i][j].z);
          vertex(this.node_ladderF[i+1][j].x, this.node_ladderF[i+1][j].y, this.node_ladderF[i+1][j].z);
          vertex(this.node_ladderB[i][j].x, this.node_ladderB[i][j].y, this.node_ladderB[i][j].z);
          vertex(this.node_ladderB[i+1][j].x, this.node_ladderB[i+1][j].y, this.node_ladderB[i+1][j].z);
        }
      }
      for (let i=0; i<this.node_ladderF.length; i++) {
        vertex(this.node_ladderF[i][0].x, this.node_ladderF[i][0].y, this.node_ladderF[i][0].z);
        vertex(this.node_ladderF[i][1].x, this.node_ladderF[i][1].y, this.node_ladderF[i][1].z);
        vertex(this.node_ladderB[i][0].x, this.node_ladderB[i][0].y, this.node_ladderB[i][0].z);
        vertex(this.node_ladderB[i][1].x, this.node_ladderB[i][1].y, this.node_ladderB[i][1].z);
        vertex(this.node_ladderF[i][0].x, this.node_ladderF[i][0].y, this.node_ladderF[i][0].z);
        vertex(this.node_ladderB[i][0].x, this.node_ladderB[i][0].y, this.node_ladderB[i][0].z);
      }
      //endShape();
    }








    if (this.have_crane) {
      //strokeWeight(real(2));
      //stroke(c_info2);
      //beginShape(LINES);
      vertex(this.node_crane[0].x, this.node_crane[0].y, this.node_crane[0].z);
      vertex(this.node_crane[3].x, this.node_crane[3].y, this.node_crane[3].z);
      vertex(this.node_craneDL[0].x, this.node_craneDL[0].y, this.node_craneDL[0].z);
      vertex(this.node_craneDL[3].x, this.node_craneDL[3].y, this.node_craneDL[3].z);
      vertex(this.node_craneDR[0].x, this.node_craneDR[0].y, this.node_craneDR[0].z);
      vertex(this.node_craneDR[3].x, this.node_craneDR[3].y, this.node_craneDR[3].z);
      for (let i=0; i<this.node_crane.length; i++) {
        vertex(this.node_crane[i].x, this.node_crane[i].y, this.node_crane[i].z);
        vertex(this.node_craneDL[i].x, this.node_craneDL[i].y, this.node_craneDL[i].z);
        vertex(this.node_craneDL[i].x, this.node_craneDL[i].y, this.node_craneDL[i].z);
        vertex(this.node_craneDR[i].x, this.node_craneDR[i].y, this.node_craneDR[i].z);
        vertex(this.node_craneDR[i].x, this.node_craneDR[i].y, this.node_craneDR[i].z);
        vertex(this.node_crane[i].x, this.node_crane[i].y, this.node_crane[i].z);
      }
      //endShape();
    }
    //endShape();
  };
}
