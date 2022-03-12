function CatHouse(begin, W, D, H, floor_num, index_z, index_block) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = H;
  this.floor_num = floor_num;
  this.index_z = index_z;
  this.index_block = index_block;
  this.is_constr = false;
  this.is_normalHouse = false;
  this.is_cat = true;
  this.is_CTower = false;
  this.is_firewatch = false;
  this.is_buildingBlock = false;


  if (state_floor == 3) {
    if (this.index_z == 0) {
      this.floor_num = 2;
    } else if (this.index_z == 1) {
      this.floor_num = 3;
    } else if (this.index_z == 2) {
      this.floor_num = 5;
    } else if (this.index_z == 3) {
      this.floor_num = 6;
    } else if (this.index_z == 4) {
      this.floor_num = 7;
    } else {
      this.floor_num = 7;
    }
  }


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
    let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, 8, 0, 1);
    let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, 8, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }










  this.W_win = real(random(10, 20));
  this.H_win = this.H_ori * 0.5;
  let gap_win = real(random(50, 80));


  this.num_winF_eachFloor = 2;
  this.num_winL_eachFloor = round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));
  this.num_winR_eachFloor = round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));


  this.node_winF = new Array(this.floor_num);
  this.node_winL = new Array(this.floor_num);
  this.node_winR = new Array(this.floor_num);
  for (let i=0; i<this.node_winF.length; i++) {
    this.node_winF[i] = Array.from(Array(this.num_winF_eachFloor), () => new Array(4));
    this.node_winL[i] = Array.from(Array(this.num_winL_eachFloor), () => new Array(4));
    this.node_winR[i] = Array.from(Array(this.num_winR_eachFloor), () => new Array(4));
    for (let j=0; j<this.node_winF[i].length; j++) {
      for (let k=0; k<this.node_winF[i][j].length; k++) {
        this.node_winF[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
      }
    }
    for (let j=0; j<this.node_winL[i].length; j++) {
      for (let k=0; k<this.node_winL[i][j].length; k++) {
        this.node_winL[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
      }
    }
    for (let j=0; j<this.node_winR[i].length; j++) {
      for (let k=0; k<this.node_winR[i][j].length; k++) {
        this.node_winR[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
      }
    }
  }



  this.have_winF = Array.from(Array(this.floor_num), () => new Array(this.num_winF_eachFloor));
  this.have_winL = Array.from(Array(this.floor_num), () => new Array(this.num_winL_eachFloor));
  this.have_winR = Array.from(Array(this.floor_num), () => new Array(this.num_winR_eachFloor));
  for (let i=0; i<this.floor_num; i++) {
    for (let j=0; j<this.have_winF[i].length; j++) {
      this.have_winF[i][j] = false;
      if (this.floor_num <= 3) {
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = true;
        }
      } else if (this.floor_num <= 8 ) {
        if (i == this.floor_num-2) {
          this.have_winF[i][j] = true;
        }
      } else {
        if (i == this.floor_num-2) {
          this.have_winF[i][j] = true;
        }
      }
    }
    for (let j=0; j<this.have_winL[i].length; j++) {
      this.have_winL[i][j] = false;
    }
    for (let j=0; j<this.have_winR[i].length; j++) {
      this.have_winR[i][j] = false;
    }
  }


  if (state_click == 1) {
    this.have_winF_copy = Array.from(Array(this.floor_num), () => new Array(this.num_winF_eachFloor));
    this.have_winL_copy = Array.from(Array(this.floor_num), () => new Array(this.num_winL_eachFloor));
    this.have_winR_copy = Array.from(Array(this.floor_num), () => new Array(this.num_winR_eachFloor));
    this.time_winF = Array.from(Array(this.floor_num), () => new Array(this.num_winF_eachFloor));
    this.time_winL = Array.from(Array(this.floor_num), () => new Array(this.num_winL_eachFloor));
    this.time_winR = Array.from(Array(this.floor_num), () => new Array(this.num_winR_eachFloor));
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<this.num_winF_eachFloor; j++) {
        this.have_winF_copy[i][j] = this.have_winF[i][j];
        this.time_winF[i][j] = floor(random(-10, 1));
      }
      for (let j=0; j<this.num_winL_eachFloor; j++) {
        this.have_winL_copy[i][j] = this.have_winL[i][j];
        this.time_winL[i][j] = 0;
      }
      for (let j=0; j<this.num_winR_eachFloor; j++) {
        this.have_winR_copy[i][j] = this.have_winR[i][j];
        this.time_winR[i][j] = 0;
      }
    }
  }











  this.have_ladder = false;
  if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
    this.have_ladder = true;
  }














  if (this.have_ladder) {
    this.which_floor = constrain(floor(random(floor_min_ladder, this.floor_num+0.5)), floor_min_ladder, floor_max_ladder);
    this.which_floor_next = this.which_floor + floor(random(-floor_sub_ladder, floor_sub_ladder+1));

    this.begin_ladder = p5.Vector.add(this.node_wall[this.which_floor][1], this.node_wall[this.which_floor][2]).mult(0.5);
    this.end_ladder = this.begin_ladder.copy(); // wait for outside

    this.D_ladder = constrain(this.W * random(0.25, 0.5), real(50), real(150));
    this.H_ladder = real(random(10, 25));
    this.node_ladderF = Array.from(Array(5), () => new Array(2));
    this.node_ladderB = Array.from(Array(5), () => new Array(2));
    for (let i=0; i<this.node_ladderF.length; i++) {
      const rate = constrain(map(i, 0, this.node_ladderF.length-1, 0, 1), 0, 1);
      const y_sub = sin(map(i, 0, this.node_ladderF.length-1, 0, PI)) * real(25);
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









  this.wait_wink = 0;
  this.wait_max_wink = floor(random(15, 120));
  this.open_wink = false;
  this.time_wink = 0;
  this.time_max_wink = floor(random(5, 12));








  this.node_earL = Array.from(Array(3), () => new Array(2));
  this.node_earR = Array.from(Array(3), () => new Array(2));
  this.W_ear = this.W * random(0.3, 0.4);
  this.H_ear = this.H_ori * random(0.75, 1.25);
  this.node_earL[0][0] = this.node_wall[this.node_wall.length-1][0].copy();
  this.node_earL[0][1] = this.node_wall[this.node_wall.length-1][3].copy();
  this.node_earL[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][0]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][0]);
  this.node_earL[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][3]);
  this.node_earL[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][0]);
  this.node_earL[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][3]);
  this.node_earR[0][0] = this.node_wall[this.node_wall.length-1][1].copy();
  this.node_earR[0][1] = this.node_wall[this.node_wall.length-1][2].copy();
  this.node_earR[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][1]);
  this.node_earR[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][2]);
  this.node_earR[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-2][1]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][1]);
  this.node_earR[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-2][2]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][2]);








  this.num_whisker = floor(random(1.5, 4));
  if (this.num_whisker == 1  ||  this.floor_num <= 1) {
    this.num_whisker = 0;
  }
  if (this.num_whisker > 0) {
    this.W_whisker = this.W * random(0.6, 0.7);
    this.angle_min_whisker = HALF_PI * random(0, 0.1);
    this.angle_max_whisker = this.angle_min_whisker +  HALF_PI * random(0.1, 0.25);
    this.which_node_whisker = this.node_wall.length-2;
    if (this.floor_num > 3) {
      this.which_node_whisker = this.node_wall.length-3;
    }
    this.center_whisker = p5.Vector.add(this.node_wall[this.which_node_whisker][3], this.node_wall[this.which_node_whisker-1][2]).mult(0.5).add(0, 0, real(0.1));
    this.node_whiskerL = new Array(this.num_whisker);
    this.node_whiskerR = new Array(this.num_whisker);
    for (let i=0; i<this.num_whisker; i++) {
      const angleL = map(i, 0, this.num_whisker-1, -this.angle_min_whisker, -this.angle_max_whisker);
      const angleR = map(i, 0, this.num_whisker-1, this.angle_min_whisker, this.angle_max_whisker);
      this.node_whiskerL[i] = p5.Vector.sub(this.node_wall[this.which_node_whisker][3], this.node_wall[this.which_node_whisker][2]).setMag(this.W_whisker);
      this.node_whiskerL[i] = PRotateZ(this.node_whiskerL[i], angleL);
      this.node_whiskerL[i].add(this.center_whisker);
      this.node_whiskerR[i] = p5.Vector.sub(this.node_wall[this.which_node_whisker][2], this.node_wall[this.which_node_whisker][3]).setMag(this.W_whisker);
      this.node_whiskerR[i] = PRotateZ(this.node_whiskerR[i], angleR);
      this.node_whiskerR[i].add(this.center_whisker);
    }
  }






















  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = H;
    this.floor_num = floor_num;
    this.index_block = index_block;
    this.open_change = false;
    this.time_change = 0;

    if (state_floor == 3) {
      if (this.index_z == 0) {
        this.floor_num = 2;
      } else if (this.index_z == 1) {
        this.floor_num = 3;
      } else if (this.index_z == 2) {
        this.floor_num = 5;
      } else if (this.index_z == 3) {
        this.floor_num = 6;
      } else if (this.index_z == 4) {
        this.floor_num = 7;
      } else {
        this.floor_num = 7;
      }
    }


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
      let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, 8, 0, 1);
      let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, 8, 0, 1);
      this.node_rotate[i][0] = lz;
      this.node_rotate[i][1] = 0;
    }






    this.W_win = real(random(10, 20));
    this.H_win = this.H_ori * 0.5;
    let gap_win = real(random(50, 80));


    this.num_winF_eachFloor = 2;
    this.num_winL_eachFloor = round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));
    this.num_winR_eachFloor = round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));



    this.node_winF = new Array(this.floor_num);
    this.node_winL = new Array(this.floor_num);
    this.node_winR = new Array(this.floor_num);
    for (let i=0; i<this.node_winF.length; i++) {
      this.node_winF[i] = Array.from(Array(this.num_winF_eachFloor), () => new Array(4));
      this.node_winL[i] = Array.from(Array(this.num_winL_eachFloor), () => new Array(4));
      this.node_winR[i] = Array.from(Array(this.num_winR_eachFloor), () => new Array(4));
      for (let j=0; j<this.node_winF[i].length; j++) {
        for (let k=0; k<this.node_winF[i][j].length; k++) {
          this.node_winF[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
        }
      }
      for (let j=0; j<this.node_winL[i].length; j++) {
        for (let k=0; k<this.node_winL[i][j].length; k++) {
          this.node_winL[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
        }
      }
      for (let j=0; j<this.node_winR[i].length; j++) {
        for (let k=0; k<this.node_winR[i][j].length; k++) {
          this.node_winR[i][j][k] = this.begin.copy().add(this.W/2, 0, this.D/2);
        }
      }
    }



    this.have_winF = Array.from(Array(this.floor_num), () => new Array(this.num_winF_eachFloor));
    this.have_winL = Array.from(Array(this.floor_num), () => new Array(this.num_winL_eachFloor));
    this.have_winR = Array.from(Array(this.floor_num), () => new Array(this.num_winR_eachFloor));
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = false;
        if (this.floor_num <= 3) {
          if (i == this.floor_num-1) {
            this.have_winF[i][j] = true;
          }
        } else if (this.floor_num <= 8 ) {
          if (i == this.floor_num-2) {
            this.have_winF[i][j] = true;
          }
        } else {
          if (i == this.floor_num-2) {
            this.have_winF[i][j] = true;
          }
        }
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = false;
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = false;
      }
    }







    this.have_ladder = false;
    if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
      this.have_ladder = true;
    }








    if (this.have_ladder) {
      this.which_floor = constrain(floor(random(floor_min_ladder, this.floor_num+0.5)), floor_min_ladder, floor_max_ladder);
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







    this.wait_wink = 0;
    this.wait_max_wink = floor(random(15, 120));
    this.open_wink = false;
    this.time_wink = 0;
    this.time_max_wink = floor(random(5, 12));






    this.W_ear = this.W * random(0.3, 0.4);
    this.H_ear = this.H_ori * random(0.75, 1.25);
    this.node_earL[0][0] = this.node_wall[this.node_wall.length-1][0].copy();
    this.node_earL[0][1] = this.node_wall[this.node_wall.length-1][3].copy();
    this.node_earL[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][0]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][0]);
    this.node_earL[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][3]);
    this.node_earL[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][0]);
    this.node_earL[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][3]);
    this.node_earR[0][0] = this.node_wall[this.node_wall.length-1][1].copy();
    this.node_earR[0][1] = this.node_wall[this.node_wall.length-1][2].copy();
    this.node_earR[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][1]);
    this.node_earR[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][2]);
    this.node_earR[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-2][1]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][1]);
    this.node_earR[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-2][2]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][2]);












    this.num_whisker = floor(random(1.5, 4));
    if (this.num_whisker == 1  ||  this.floor_num <= 1) {
      this.num_whisker = 0;
    }
    if (this.num_whisker > 0) {
      this.W_whisker = this.W * random(0.6, 0.7);
      this.angle_min_whisker = HALF_PI * random(0, 0.1);
      this.angle_max_whisker = this.angle_min_whisker +  HALF_PI * random(0.1, 0.25);
      this.which_node_whisker = this.node_wall.length-2;
      if (this.floor_num > 3) {
        this.which_node_whisker = this.node_wall.length-3;
      }
      this.center_whisker = p5.Vector.add(this.node_wall[this.which_node_whisker][3], this.node_wall[this.which_node_whisker-1][2]).mult(0.5);
      this.node_whiskerL = new Array(this.num_whisker);
      this.node_whiskerR = new Array(this.num_whisker);
      for (let i=0; i<this.num_whisker; i++) {
        this.node_whiskerL[i] = this.center_whisker.copy();
        this.node_whiskerR[i] = this.center_whisker.copy();
      }
    }
  };









  this.lightUpAllWin = function() {
    this.wait_wink = this.wait_max_wink;
    this.time_wink = 0;
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
    this.index_block = index_block;


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





    if (this.wait_wink < this.wait_max_wink) {
      this.wait_wink ++;
    } else {
      this.open_wink = true;
    }

    if (this.open_wink) {
      if (this.time_wink < this.time_max_wink) {
        this.time_wink ++;
      } else {
        this.open_wink = false;
        this.wait_wink = 0;
        this.wait_max_wink = floor(random(15, 120));
        this.time_wink = 0;
        this.time_max_wink = floor(random(5, 12));
      }
    }


    let eye_rate_U = map(sin(map(this.time_wink, 0, this.time_max_wink, 0, PI)), 0, 1, 0.8, 0.51);
    let eye_rate_D = map(sin(map(this.time_wink, 0, this.time_max_wink, 0, PI)), 0, 1, 0.3, 0.49);





    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        let winU_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(eye_rate_U).add(this.node_wall[i][3]);
        let winU_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(eye_rate_U).add(this.node_wall[i][2]);
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(eye_rate_D).add(this.node_wall[i][3]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(eye_rate_D).add(this.node_wall[i][2]);
        let center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winF_eachFloor+1) * (j+1)).add(winU_wallL);
        let center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winF_eachFloor+1) * (j+1)).add(winD_wallL);

        this.node_winF[i][j][0] = p5.Vector.sub(winU_wallL, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winF[i][j][1] = p5.Vector.sub(winU_wallR, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winF[i][j][2] = p5.Vector.sub(winD_wallR, center_winD).setMag(this.W_win/2.0).add(center_winD);
        this.node_winF[i][j][3] = p5.Vector.sub(winD_wallL, center_winD).setMag(this.W_win/2.0).add(center_winD);

        for (let k=0; k<this.node_winF[i][j].length; k++) {
          this.node_winF[i][j][k].add(0, 0, real(0.5));
        }
      }
    }


    for (let i=0; i<this.node_winL.length; i++) {
      for (let j=0; j<this.node_winL[i].length; j++) {
        let winU_wallL = p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i][0]).mult(0.8).add(this.node_wall[i][0]);
        let winU_wallR = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.8).add(this.node_wall[i][3]);
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i][0]).mult(0.4).add(this.node_wall[i][0]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.4).add(this.node_wall[i][3]);
        let center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winL_eachFloor+1) * (j+1)).add(winU_wallL);
        let center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winL_eachFloor+1) * (j+1)).add(winD_wallL);

        this.node_winL[i][j][0] = p5.Vector.sub(winU_wallL, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winL[i][j][1] = p5.Vector.sub(winU_wallR, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winL[i][j][2] = p5.Vector.sub(winD_wallR, center_winD).setMag(this.W_win/2.0).add(center_winD);
        this.node_winL[i][j][3] = p5.Vector.sub(winD_wallL, center_winD).setMag(this.W_win/2.0).add(center_winD);

        for (let k=0; k<this.node_winL[i][j].length; k++) {
          this.node_winL[i][j][k].add(-real(0.5), 0, 0);
        }
      }
    }


    for (let i=0; i<this.node_winR.length; i++) {
      for (let j=0; j<this.node_winR[i].length; j++) {
        let winU_wallL = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.8).add(this.node_wall[i][2]);
        let winU_wallR = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i][1]).mult(0.8).add(this.node_wall[i][1]);
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.4).add(this.node_wall[i][2]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i][1]).mult(0.4).add(this.node_wall[i][1]);
        let center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winR_eachFloor+1) * (j+1)).add(winU_wallL);
        let center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winR_eachFloor+1) * (j+1)).add(winD_wallL);

        this.node_winR[i][j][0] = p5.Vector.sub(winU_wallL, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winR[i][j][1] = p5.Vector.sub(winU_wallR, center_winU).setMag(this.W_win/2.0).add(center_winU);
        this.node_winR[i][j][2] = p5.Vector.sub(winD_wallR, center_winD).setMag(this.W_win/2.0).add(center_winD);
        this.node_winR[i][j][3] = p5.Vector.sub(winD_wallL, center_winD).setMag(this.W_win/2.0).add(center_winD);

        for (let k=0; k<this.node_winR[i][j].length; k++) {
          this.node_winR[i][j][k].add(real(0.5), 0, 0);
        }
      }
    }




    if (state_click == 1) {


      for (let i=0; i<this.floor_num; i++) {
        for (let j=0; j<this.have_winF[i].length; j++) {
          if (this.have_winF[i][j] && !this.have_winF_copy[i][j]) {
            if (this.time_winF[i][j] < 10) {
              this.time_winF[i][j] ++;
            } else {
              this.have_winF[i][j] = false;
            }
          } else if (!this.have_winF[i][j]) {
            this.time_winF[i][j] = 10;
          } else if (this.have_winF_copy[i][j]) {
            this.time_winF[i][j] = 0;
          }
        }
        for (let j=0; j<this.have_winL[i].length; j++) {
          if (this.have_winL[i][j] && !this.have_winL_copy[i][j]) {
            if (this.time_winL[i][j] < 10) {
              this.time_winL[i][j] ++;
            } else {
              this.have_winL[i][j] = false;
            }
          } else if (!this.have_winL[i][j]) {
            this.time_winL[i][j] = 10;
          } else if (this.have_winL_copy[i][j]) {
            this.time_winL[i][j] = 0;
          }
        }
        for (let j=0; j<this.have_winR[i].length; j++) {
          if (this.have_winR[i][j] && !this.have_winR_copy[i][j]) {
            if (this.time_winR[i][j] < 10) {
              this.time_winR[i][j] ++;
            } else {
              this.have_winR[i][j] = false;
            }
          } else if (!this.have_winR[i][j]) {
            this.time_winR[i][j] = 10;
          } else if (this.have_winR_copy[i][j]) {
            this.time_winR[i][j] = 0;
          }
        }
      }
    }








    if (this.have_ladder) {
      this.begin_ladder = p5.Vector.add(this.node_wall[this.which_floor][1], this.node_wall[this.which_floor][2]).mult(0.5);
      this.end_ladder.x += speed;

      for (let i=0; i<this.node_ladderF.length; i++) {
        const rate = constrain(map(i, 0, this.node_ladderF.length-1, 0, 1), 0, 1);
        const y_sub = sin(map(i, 0, this.node_ladderF.length-1, 0, PI)) * real(25);
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









    this.node_earL[0][0] = this.node_wall[this.node_wall.length-1][0].copy();
    this.node_earL[0][1] = this.node_wall[this.node_wall.length-1][3].copy();
    this.node_earL[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][0]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][0]);
    this.node_earL[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][3]);
    this.node_earL[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][0]);
    this.node_earL[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][3]);
    this.node_earR[0][0] = this.node_wall[this.node_wall.length-1][1].copy();
    this.node_earR[0][1] = this.node_wall[this.node_wall.length-1][2].copy();
    this.node_earR[1][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][1]);
    this.node_earR[1][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).setMag(this.W_ear).add(this.node_wall[this.node_wall.length-1][2]);
    this.node_earR[2][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-2][1]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][1]);
    this.node_earR[2][1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-2][2]).setMag(this.H_ear).add(this.node_wall[this.node_wall.length-1][2]);

    this.node_earL[2][0] = this.node_earL[2][1].copy();
    this.node_earR[2][0] = this.node_earR[2][1].copy();
    this.node_earL[0][0] = p5.Vector.sub(this.node_earL[0][0], this.node_earL[0][1]).mult(0.5).add(this.node_earL[0][1]);
    this.node_earR[0][0] = p5.Vector.sub(this.node_earR[0][0], this.node_earR[0][1]).mult(0.5).add(this.node_earR[0][1]);
    this.node_earL[1][0] = p5.Vector.sub(this.node_earL[1][0], this.node_earL[1][1]).mult(0.5).add(this.node_earL[1][1]);
    this.node_earR[1][0] = p5.Vector.sub(this.node_earR[1][0], this.node_earR[1][1]).mult(0.5).add(this.node_earR[1][1]);












    if (this.num_whisker > 0) {
      this.center_whisker = p5.Vector.add(this.node_wall[this.which_node_whisker][3], this.node_wall[this.which_node_whisker-1][2]).mult(0.5);
      for (let i=0; i<this.num_whisker; i++) {
        const angleL = map(i, 0, this.num_whisker-1, -this.angle_min_whisker, -this.angle_max_whisker);
        const angleR = map(i, 0, this.num_whisker-1, this.angle_min_whisker, this.angle_max_whisker);
        this.node_whiskerL[i] = p5.Vector.sub(this.node_wall[this.which_node_whisker][3], this.node_wall[this.which_node_whisker][2]).setMag(this.W_whisker);
        this.node_whiskerL[i] = PRotateZ(this.node_whiskerL[i], angleL);
        this.node_whiskerL[i].add(0, 0, real(1)).add(this.center_whisker);
        this.node_whiskerR[i] = p5.Vector.sub(this.node_wall[this.which_node_whisker][2], this.node_wall[this.which_node_whisker][3]).setMag(this.W_whisker);
        this.node_whiskerR[i] = PRotateZ(this.node_whiskerR[i], angleR);
        this.node_whiskerR[i].add(0, 0, real(1)).add(this.center_whisker);
      }
    }
  };















  this.display = function() {
    let t;


    //this.display_TRIANGLES();
  };









  this.display_TRIANGLES = function() {
    let t, c1, c2;
    //noStroke();
    //beginShape(TRIANGLES);


    //------------- ⬇F⬇ -------------
    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getRect(this.node_wall[i+1][3], this.node_wall[i+1][2], this.node_wall[i][2], this.node_wall[i][3]);
    }


    c1 = c_win;
    c2 = c_win;    
    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        if (this.have_winF[i][j]) {
          if (state_click == 1) {
            t = constrain(map(this.time_winF[i][j], 0, 10, 0, 1), 0, 1);
            c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1)), t);
          }
          TRIANGLES_getRect_fill(this.node_winF[i][j][0], this.node_winF[i][j][1], this.node_winF[i][j][2], this.node_winF[i][j][3], c1);
        }
      }
    }
    //------------- ⬆F⬆ -------------


    //------------- ⬇L⬇ -------------
    if (this.begin.x > -real(100)) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[i+1][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[i+1][3].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_wall[i+1][0], this.node_wall[i+1][3], this.node_wall[i][3], this.node_wall[i][0], c1, c2, c2, c1);
      }
    }
    //------------- ⬆L⬆ -------------


    //------------- ⬇R⬇ -------------
    if (this.begin.x+this.W < real(100)) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[i+1][2].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[i+1][1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_wall[i+1][2], this.node_wall[i+1][1], this.node_wall[i][1], this.node_wall[i][2], c1, c2, c2, c1);
      }
    }
    //------------- ⬆R⬆ -------------


    //------------- ⬇U⬇ -------------
    c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3], c1, c1, c2, c2);

    //------------- ⬆U⬆ -------------



    t = constrain(map(this.node_earL[0][1].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_earL[0][1].x, this.node_earL[0][1].y, this.node_earL[0][1].z);
    vertex(this.node_earL[1][1].x, this.node_earL[1][1].y, this.node_earL[1][1].z);
    vertex(this.node_earL[2][1].x, this.node_earL[2][1].y, this.node_earL[2][1].z);


    if (this.node_earL[0][1].x > -real(100)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_earL[0][0].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_earL[0][1].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node_earL[2][0], this.node_earL[0][0], this.node_earL[0][1], this.node_earL[2][1], c1, c1, c2, c2);
    }


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_earL[2][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_earL[2][1].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_earL[2][0], this.node_earL[1][0], this.node_earL[1][1], this.node_earL[2][1], c1, c1, c2, c2);





    t = constrain(map(this.node_earR[0][1].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_earR[0][1].x, this.node_earR[0][1].y, this.node_earR[0][1].z);
    vertex(this.node_earR[1][1].x, this.node_earR[1][1].y, this.node_earR[1][1].z);
    vertex(this.node_earR[2][1].x, this.node_earR[2][1].y, this.node_earR[2][1].z);


    if (this.node_earR[0][1].x < real(100)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_earR[2][0].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_earR[0][1].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node_earR[2][0], this.node_earR[0][0], this.node_earR[0][1], this.node_earR[2][1], c1, c1, c2, c2);
    }


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_earR[2][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_earR[1][1].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_earR[2][0], this.node_earR[1][0], this.node_earR[1][1], this.node_earR[2][1], c1, c1, c2, c2);






    if (this.num_whisker > 0) {
      t = constrain(map(this.center_whisker.z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.num_whisker; i++) {
        TRIANGLES_getLine_weight_Y(this.center_whisker, this.node_whiskerL[i], real(5));
        TRIANGLES_getLine_weight_Y(this.center_whisker, this.node_whiskerR[i], real(5));
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



    //endShape();
  };
















  this.displayInfo = function() {
    noFill();
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

    stroke(c_info2);
    strokeWeight(real(2));
    for (let i=0; i<this.node_wall.length; i++) {
      beginShape();
      for (let j=0; j<this.node_wall[i].length; j++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
      }
      endShape(CLOSE);
    }
    beginShape(LINES);
    for (let j=0; j<this.node_wall[0].length; j++) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
      }
    }
    endShape();




    /*
    stroke(255, 128, 128);
     strokeWeight(real(1));
     beginShape(LINES);
     for (let i=0; i<this.node_winF.length; i++) {
     for (let j=0; j<this.node_winF[i].length; j++) {
     vertex(this.node_winF[i][j][0].x, this.node_winF[i][j][0].y, this.node_winF[i][j][0].z);
     vertex(this.node_winF[i][j][2].x, this.node_winF[i][j][2].y, this.node_winF[i][j][2].z);
     vertex(this.node_winF[i][j][1].x, this.node_winF[i][j][1].y, this.node_winF[i][j][1].z);
     vertex(this.node_winF[i][j][3].x, this.node_winF[i][j][3].y, this.node_winF[i][j][3].z);
     }
     }
     for (let i=0; i<this.node_winL.length; i++) {
     for (let j=0; j<this.node_winL[i].length; j++) {
     vertex(this.node_winL[i][j][0].x, this.node_winL[i][j][0].y, this.node_winL[i][j][0].z);
     vertex(this.node_winL[i][j][2].x, this.node_winL[i][j][2].y, this.node_winL[i][j][2].z);
     vertex(this.node_winL[i][j][1].x, this.node_winL[i][j][1].y, this.node_winL[i][j][1].z);
     vertex(this.node_winL[i][j][3].x, this.node_winL[i][j][3].y, this.node_winL[i][j][3].z);
     }
     }
     for (let i=0; i<this.node_winR.length; i++) {
     for (let j=0; j<this.node_winR[i].length; j++) {
     vertex(this.node_winR[i][j][0].x, this.node_winR[i][j][0].y, this.node_winR[i][j][0].z);
     vertex(this.node_winR[i][j][2].x, this.node_winR[i][j][2].y, this.node_winR[i][j][2].z);
     vertex(this.node_winR[i][j][1].x, this.node_winR[i][j][1].y, this.node_winR[i][j][1].z);
     vertex(this.node_winR[i][j][3].x, this.node_winR[i][j][3].y, this.node_winR[i][j][3].z);
     }
     }
     endShape();
     */









    if (this.have_ladder) {
      stroke(c_info2);
      strokeWeight(real(2));
      beginShape(LINES);
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
      endShape();
    }




    noFill();
    strokeWeight(real(2));
    stroke(c_info2);
    beginShape(LINES);
    vertex(this.node_earR[2][1].x, this.node_earR[2][1].y, this.node_earR[2][1].z);
    vertex(this.node_earR[1][1].x, this.node_earR[1][1].y, this.node_earR[1][1].z);
    vertex(this.node_earR[2][1].x, this.node_earR[2][1].y, this.node_earR[2][1].z);
    vertex(this.node_earR[0][1].x, this.node_earR[0][1].y, this.node_earR[0][1].z);
    vertex(this.node_earL[2][1].x, this.node_earL[2][1].y, this.node_earL[2][1].z);
    vertex(this.node_earL[1][1].x, this.node_earL[1][1].y, this.node_earL[1][1].z);
    vertex(this.node_earL[2][1].x, this.node_earL[2][1].y, this.node_earL[2][1].z);
    vertex(this.node_earL[0][1].x, this.node_earL[0][1].y, this.node_earL[0][1].z);
    endShape();




    if (this.num_whisker > 0) {
      noFill();
      strokeWeight(real(2));
      stroke(c_info2);
      beginShape(LINES);
      for (let i=0; i<this.num_whisker; i++) {
        vertex(this.center_whisker.x, this.center_whisker.y, this.center_whisker.z);
        vertex(this.node_whiskerL[i].x, this.node_whiskerL[i].y, this.node_whiskerL[i].z);
        vertex(this.center_whisker.x, this.center_whisker.y, this.center_whisker.z);
        vertex(this.node_whiskerR[i].x, this.node_whiskerR[i].y, this.node_whiskerR[i].z);
      }
      endShape();
    }
  };
}