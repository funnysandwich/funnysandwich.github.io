function FirewatchHouse(begin, W, D, H, floor_num, index_z, index_block) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = H;
  this.floor_num = max(floor_num, 2);
  if (this.floor_num % 2 !=0) {
    this.floor_num -= 1;
  }
  this.index_z = index_z;
  this.index_block = index_block;


  this.is_constr = false;
  this.is_normalHouse = false;
  this.is_cat = false;
  this.is_CTower = false;
  this.is_firewatch = true;
  this.is_buildingBlock = false;
  this.is_dottedLine = false;
  this.is_underGround = false;


  if (state_floor == 3) {
    if (this.index_z == 0) {
      this.floor_num = 2;
    } else if (this.index_z == 1) {
      this.floor_num = 4;
    } else if (this.index_z == 2) {
      this.floor_num = 4;
    } else {
      this.floor_num = 6;
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
    let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }




  this.node_top_copy = new Array(4);
  for (let i=0; i<4; i++) {
    this.node_top_copy[i] = this.node_wall[this.node_wall.length-1][i].copy();
  }




  this.W_house = this.W * random(0.55, 0.95);
  this.H_house = this.H_ori * random(0.5, 1.2);
  this.node_house = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_house.length; i++) {
    const h = this.H_house * i;
    for (let j=0; j<this.node_house[i].length; j++) {
      this.node_house[i][j] = createVector(this.W_house/2.0 * pow(-1, ceil(j%1.5)+1), -h, this.W_house/2.0 * pow(-1, floor(j/2)+1));
      this.node_house[i][j] = PRotateZ(this.node_house[i][j], this.node_rotate[this.node_rotate.length-1][0]);
      this.node_house[i][j].add(this.node[this.node.length-1]);
    }
  }


  this.H_roof = this.H_house * random(0.25, 0.5);
  this.node_roof = new Array(2);
  this.node_roof[0] = p5.Vector.sub(this.node_house[1][3], this.node_house[0][3]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][3], this.node_house[1][2]).mult(0.5));
  this.node_roof[1] = p5.Vector.sub(this.node_house[1][0], this.node_house[0][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][0], this.node_house[1][1]).mult(0.5));


  this.node_eavesL = new Array(2);
  this.node_eavesR = new Array(2);
  this.node_eavesL[0] = p5.Vector.sub(this.node_house[1][3], this.node_roof[0]).mult(1.15).add(this.node_roof[0]);
  this.node_eavesL[1] = p5.Vector.sub(this.node_house[1][0], this.node_roof[1]).mult(1.15).add(this.node_roof[1]);
  this.node_eavesR[0] = p5.Vector.sub(this.node_house[1][2], this.node_roof[0]).mult(1.15).add(this.node_roof[0]);
  this.node_eavesR[1] = p5.Vector.sub(this.node_house[1][1], this.node_roof[1]).mult(1.15).add(this.node_roof[1]);










  this.W_win = real(random(5, 10));
  this.H_win = this.H_ori * 0.5;
  let gap_win = real(random(30, 40));


  this.num_winF_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));
  this.num_winL_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));
  this.num_winR_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));


  this.node_winF = new Array(this.node_house.length-1);
  this.node_winL = new Array(this.node_house.length-1);
  this.node_winR = new Array(this.node_house.length-1);
  for (let i=0; i<this.node_winF.length; i++) {
    this.node_winF[i] = Array.from(Array(this.num_winF_eachFloor), () => new Array(4));
    this.node_winL[i] = Array.from(Array(this.num_winL_eachFloor), () => new Array(4));
    this.node_winR[i] = Array.from(Array(this.num_winR_eachFloor), () => new Array(4));
    for (let j=0; j<this.node_winF[i].length; j++) {
      for (let k=0; k<this.node_winF[i][j].length; k++) {
        this.node_winF[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
      }
    }
    for (let j=0; j<this.node_winL[i].length; j++) {
      for (let k=0; k<this.node_winL[i][j].length; k++) {
        this.node_winL[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
      }
    }
    for (let j=0; j<this.node_winR[i].length; j++) {
      for (let k=0; k<this.node_winR[i][j].length; k++) {
        this.node_winR[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
      }
    }
  }



  this.have_winF = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winF_eachFloor));
  this.have_winL = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winL_eachFloor));
  this.have_winR = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winR_eachFloor));
  for (let i=0; i<this.have_winF.length; i++) {
    for (let j=0; j<this.have_winF[i].length; j++) {
      this.have_winF[i][j] = random(1) < 0.25;
    }
    for (let j=0; j<this.have_winL[i].length; j++) {
      this.have_winL[i][j] = random(1) < 0.25;
    }
    for (let j=0; j<this.have_winR[i].length; j++) {
      this.have_winR[i][j] = random(1) < 0.25;
    }
  }


  if (state_click == 1) {
    this.have_winF_copy = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winF_eachFloor));
    this.have_winL_copy = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winL_eachFloor));
    this.have_winR_copy = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winR_eachFloor));
    this.time_winF = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winF_eachFloor));
    this.time_winL = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winL_eachFloor));
    this.time_winR = Array.from(Array(this.node_house.length-1), () => new Array(this.num_winR_eachFloor));
    for (let i=0; i<this.have_winF_copy.length; i++) {
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






  this.have_handrail = false;
  if (open_handrail  &&  random(1)<rate_handrail) {
    this.have_handrail = true;
  }



  this.have_ladder = false;
  if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
    this.have_ladder = true;
  }






  if (this.have_handrail) {
    this.num_handrailL = constrain(round(map(this.D, real(100), real(500), 2, 5)), 1, 5);
    this.num_handrailF = constrain(round(map(this.W, real(100), real(500), 2, 5)), 1, 5);
    this.H_handrail_target = random(this.H_ori*0.15, this.H_ori*0.5);
    this.H_handrail = this.H_handrail_target;
    this.node_handrail = Array.from(Array(this.num_handrailL*2+this.num_handrailF*2), () => new Array(2));
    //--- L ---
    for (let i=0; i<this.num_handrailL; i++) {
      let rate = map(i, 0, this.num_handrailL, 0, 1);
      for (let j=0; j<this.node_handrail[i].length; j++) {
        let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
        this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][0]).mult(rate).add(this.node_wall[this.node_wall.length-1][0]).add(h);
      }
    }
    //--- F ---
    for (let i=this.num_handrailL; i<this.num_handrailL+this.num_handrailF; i++) {
      let rate = map(i, this.num_handrailL, this.num_handrailL+this.num_handrailF, 0, 1);
      for (let j=0; j<this.node_handrail[i].length; j++) {
        let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
        this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).mult(rate).add(this.node_wall[this.node_wall.length-1][3]).add(h);
      }
    }
    //--- R ---
    for (let i=this.num_handrailL+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF; i++) {
      let rate = map(i, this.num_handrailL+this.num_handrailF, this.num_handrailL*2+this.num_handrailF, 0, 1);
      for (let j=0; j<this.node_handrail[i].length; j++) {
        let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
        this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2]).mult(rate).add(this.node_wall[this.node_wall.length-1][2]).add(h);
      }
    }
    //--- B ---
    for (let i=this.num_handrailL*2+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF*2; i++) {
      let rate = map(i, this.num_handrailL*2+this.num_handrailF, this.num_handrailL*2+this.num_handrailF*2, 0, 1);
      for (let j=0; j<this.node_handrail[i].length; j++) {
        let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
        this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).mult(rate).add(this.node_wall[this.node_wall.length-1][1]).add(h);
      }
    }
  }





  if (this.have_ladder) {
    this.which_floor = this.floor_num;
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





















  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = H;
    this.floor_num = max(floor_num, 2);
    if (this.floor_num % 2 !=0) {
      this.floor_num -= 1;
    }
    if (state_floor == 3) {
      if (this.index_z == 0) {
        this.floor_num = 2;
      } else if (this.index_z == 1) {
        this.floor_num = 4;
      } else if (this.index_z == 2) {
        this.floor_num = 4;
      } else {
        this.floor_num = 6;
      }
    }
    this.index_block = index_block;
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





    for (let i=0; i<4; i++) {
      this.node_top_copy[i] = this.node_wall[this.node_wall.length-1][i].copy();
    }








    this.W_house = this.W * random(0.55, 0.95);
    this.H_house = this.H_ori * random(0.5, 1.2);

    for (let i=0; i<this.node_house.length; i++) {
      const h = this.H_house * i;
      for (let j=0; j<this.node_house[i].length; j++) {
        this.node_house[i][j] = createVector(this.W_house/2.0 * pow(-1, ceil(j%1.5)+1), -h, this.W_house/2.0 * pow(-1, floor(j/2)+1));
        this.node_house[i][j] = PRotateZ(this.node_house[i][j], this.node_rotate[this.node_rotate.length-1][0]);
        this.node_house[i][j].add(this.node[this.node.length-1]);
      }
    }


    this.H_roof = this.H_house * random(0.25, 0.5);

    this.node_roof[0] = p5.Vector.sub(this.node_house[1][3], this.node_house[0][3]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][3], this.node_house[1][2]).mult(0.5));
    this.node_roof[1] = p5.Vector.sub(this.node_house[1][0], this.node_house[0][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][0], this.node_house[1][1]).mult(0.5));


    this.node_eavesL[0] = p5.Vector.sub(this.node_house[1][3], this.node_roof[0]).mult(1.15).add(this.node_roof[0]);
    this.node_eavesL[1] = p5.Vector.sub(this.node_house[1][0], this.node_roof[1]).mult(1.15).add(this.node_roof[1]);
    this.node_eavesR[0] = p5.Vector.sub(this.node_house[1][2], this.node_roof[0]).mult(1.15).add(this.node_roof[0]);
    this.node_eavesR[1] = p5.Vector.sub(this.node_house[1][1], this.node_roof[1]).mult(1.15).add(this.node_roof[1]);







    this.W_win = real(random(5, 10));
    this.H_win = this.H_ori * 0.5;
    let gap_win = real(random(30, 40));


    this.num_winF_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));
    this.num_winL_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));
    this.num_winR_eachFloor = round(random((this.W_house-gap_win) / (this.W_win+gap_win) *0.5, (this.W_house-gap_win) / (this.W_win+gap_win)));



    this.node_winF = new Array(this.node_house.length-1);
    this.node_winL = new Array(this.node_house.length-1);
    this.node_winR = new Array(this.node_house.length-1);
    for (let i=0; i<this.node_winF.length; i++) {
      this.node_winF[i] = Array.from(Array(this.num_winF_eachFloor), () => new Array(4));
      this.node_winL[i] = Array.from(Array(this.num_winL_eachFloor), () => new Array(4));
      this.node_winR[i] = Array.from(Array(this.num_winR_eachFloor), () => new Array(4));
      for (let j=0; j<this.node_winF[i].length; j++) {
        for (let k=0; k<this.node_winF[i][j].length; k++) {
          this.node_winF[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
        }
      }
      for (let j=0; j<this.node_winL[i].length; j++) {
        for (let k=0; k<this.node_winL[i][j].length; k++) {
          this.node_winL[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
        }
      }
      for (let j=0; j<this.node_winR[i].length; j++) {
        for (let k=0; k<this.node_winR[i][j].length; k++) {
          this.node_winR[i][j][k] = this.node_house[0][0].copy().add(this.W_house/2, 0, this.W_house/2);
        }
      }
    }



    this.have_winF = Array.from(Array(this.node_winF.length), () => new Array(this.num_winF_eachFloor));
    this.have_winL = Array.from(Array(this.node_winL.length), () => new Array(this.num_winL_eachFloor));
    this.have_winR = Array.from(Array(this.node_winR.length), () => new Array(this.num_winR_eachFloor));
    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = random(1) < 0.25;
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.25;
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.25;
      }
    }







    this.have_ladder = false;
    if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
      this.have_ladder = true;
    }


    this.have_handrail = false;
    if (open_handrail  &&  random(1)<rate_handrail) {
      this.have_handrail = true;
    }




    if (this.have_handrail) {
      this.num_handrailL = constrain(round(map(this.D, real(100), real(500), 2, 5)), 1, 5);
      this.num_handrailF = constrain(round(map(this.W, real(100), real(500), 2, 5)), 1, 5);
      this.H_handrail_target = random(this.H_ori*0.15, this.H_ori*0.5);
      this.H_handrail = 0;
      this.node_handrail = Array.from(Array(this.num_handrailL*2+this.num_handrailF*2), () => new Array(2));
      for (let i=0; i<this.node_handrail.length; i++) {
        for (let j=0; j<this.node_handrail[i].length; j++) {
          this.node_handrail[i][j] = this.node[this.node.length-1].copy();
        }
      }
    }



    if (this.have_ladder) {
      this.which_floor = this.floor_num;
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
  };









  this.lightUpAllWin = function() {
    for (let i=0; i<this.have_winF.length; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = random(1) < 0.99;
        this.have_winF_copy[i][j] = random(1) < 0.2;
        this.time_winF[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.99;
        this.have_winL_copy[i][j] = random(1) < 0.2;
        this.time_winL[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.99;
        this.have_winR_copy[i][j] = random(1) < 0.2;
        this.time_winR[i][j] = floor(random(-20, 5));
      }
    }
  };








  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < this.floor_num  &&  random(1)<0.75) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == this.floor_num) {
        this.begin_target.y += this.H_ori*0.75;
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
      let w = this.W * pow(constrain(map(this.node_wall.length, 3, 10, 0.85, 0.95), 0.8, 0.95), i);

      if (i == this.node_wall.length-1) {
        for (let j=0; j<this.node_wall[i].length; j++) {
          this.node_top_copy[j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), 0, w/2.0 * pow(-1, floor(j/2)+1));
          this.node_top_copy[j] = PRotateZ(this.node_top_copy[j], this.node_rotate[i][0]);
          this.node_top_copy[j] = PRotateX(this.node_top_copy[j], this.node_rotate[i][1]);
          this.node_top_copy[j].add(this.node[i]);
        }
        w = this.W;
      }

      for (let j=0; j<this.node_wall[i].length; j++) {
        let n = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), 0, w/2.0 * pow(-1, floor(j/2)+1));
        if (state_click == 4) {
          let l = sin(map(i, 0, this.node_wall.length-1, 0, HALF_PI*1.75));
          n = createVector((w/2.0+this.W_add[i]*l) * pow(-1, ceil(j%1.5)+1), 0, (w/2.0+this.D_add[i]*l) * pow(-1, floor(j/2)+1));
        }
        n = PRotateZ(n, this.node_rotate[i][0]);
        n = PRotateX(n, this.node_rotate[i][1]);
        n.add(this.node[i]);
        this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, 0.5);
      }
    }








    for (let i=0; i<this.node_house.length; i++) {
      const h = this.H_house * i;
      for (let j=0; j<this.node_house[i].length; j++) {
        this.node_house[i][j] = createVector(this.W_house/2.0 * pow(-1, ceil(j%1.5)+1), -h, this.W_house/2.0 * pow(-1, floor(j/2)+1));
        this.node_house[i][j] = PRotateZ(this.node_house[i][j], this.node_rotate[this.node_rotate.length-1][0]);
        this.node_house[i][j].add(this.node[this.node.length-1]).add(-speed, 0, 0);
      }
    }




    this.node_roof[0] = p5.Vector.sub(this.node_house[1][3], this.node_house[0][3]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][3], this.node_house[1][2]).mult(0.5));
    this.node_roof[1] = p5.Vector.sub(this.node_house[1][0], this.node_house[0][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_house[1][0], this.node_house[1][1]).mult(0.5));


    this.node_eavesL[0] = p5.Vector.sub(this.node_house[1][3], this.node_roof[0]).mult(1.25).add(this.node_roof[0]);
    this.node_eavesL[1] = p5.Vector.sub(this.node_house[1][0], this.node_roof[1]).mult(1.25).add(this.node_roof[1]);
    this.node_eavesR[0] = p5.Vector.sub(this.node_house[1][2], this.node_roof[0]).mult(1.25).add(this.node_roof[0]);
    this.node_eavesR[1] = p5.Vector.sub(this.node_house[1][1], this.node_roof[1]).mult(1.25).add(this.node_roof[1]);






    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        const winU_wallL = p5.Vector.sub(this.node_house[i+1][3], this.node_house[i][3]).mult(0.8).add(this.node_house[i][3]);
        const winU_wallR = p5.Vector.sub(this.node_house[i+1][2], this.node_house[i][2]).mult(0.8).add(this.node_house[i][2]);
        const winD_wallL = p5.Vector.sub(this.node_house[i+1][3], this.node_house[i][3]).mult(0.4).add(this.node_house[i][3]);
        const winD_wallR = p5.Vector.sub(this.node_house[i+1][2], this.node_house[i][2]).mult(0.4).add(this.node_house[i][2]);
        const center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winF_eachFloor+1) * (j+1)).add(winU_wallL);
        const center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winF_eachFloor+1) * (j+1)).add(winD_wallL);

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
        const winU_wallL = p5.Vector.sub(this.node_house[i+1][0], this.node_house[i][0]).mult(0.8).add(this.node_house[i][0]);
        const winU_wallR = p5.Vector.sub(this.node_house[i+1][3], this.node_house[i][3]).mult(0.8).add(this.node_house[i][3]);
        const winD_wallL = p5.Vector.sub(this.node_house[i+1][0], this.node_house[i][0]).mult(0.4).add(this.node_house[i][0]);
        const winD_wallR = p5.Vector.sub(this.node_house[i+1][3], this.node_house[i][3]).mult(0.4).add(this.node_house[i][3]);
        const center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winL_eachFloor+1) * (j+1)).add(winU_wallL);
        const center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winL_eachFloor+1) * (j+1)).add(winD_wallL);

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
        const winU_wallL = p5.Vector.sub(this.node_house[i+1][2], this.node_house[i][2]).mult(0.8).add(this.node_house[i][2]);
        const winU_wallR = p5.Vector.sub(this.node_house[i+1][1], this.node_house[i][1]).mult(0.8).add(this.node_house[i][1]);
        const winD_wallL = p5.Vector.sub(this.node_house[i+1][2], this.node_house[i][2]).mult(0.4).add(this.node_house[i][2]);
        const winD_wallR = p5.Vector.sub(this.node_house[i+1][1], this.node_house[i][1]).mult(0.4).add(this.node_house[i][1]);
        const center_winU = p5.Vector.sub(winU_wallR, winU_wallL).mult(1.0/ (this.num_winR_eachFloor+1) * (j+1)).add(winU_wallL);
        const center_winD = p5.Vector.sub(winD_wallR, winD_wallL).mult(1.0/ (this.num_winR_eachFloor+1) * (j+1)).add(winD_wallL);

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


      for (let i=0; i<this.have_winF.length; i++) {
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








    if (this.have_handrail) {
      this.H_handrail = easing_x(this.H_handrail, this.H_handrail_target, this.var_easing1*0.2);
      //--- L ---
      for (let i=0; i<this.num_handrailL; i++) {
        let rate = map(i, 0, this.num_handrailL, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][0]).mult(rate).add(this.node_wall[this.node_wall.length-1][0]).add(h);
        }
      }
      //--- F ---
      for (let i=this.num_handrailL; i<this.num_handrailL+this.num_handrailF; i++) {
        let rate = map(i, this.num_handrailL, this.num_handrailL+this.num_handrailF, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).mult(rate).add(this.node_wall[this.node_wall.length-1][3]).add(h);
        }
      }
      //--- R ---
      for (let i=this.num_handrailL+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF; i++) {
        let rate = map(i, this.num_handrailL+this.num_handrailF, this.num_handrailL*2+this.num_handrailF, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2]).mult(rate).add(this.node_wall[this.node_wall.length-1][2]).add(h);
        }
      }
      //--- B ---
      for (let i=this.num_handrailL*2+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF*2; i++) {
        let rate = map(i, this.num_handrailL*2+this.num_handrailF, this.num_handrailL*2+this.num_handrailF*2, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).mult(rate).add(this.node_wall[this.node_wall.length-1][1]).add(h);
        }
      }

      for (let i=0; i<this.node_handrail.length; i++) {
        for (let j=0; j<this.node_handrail[i].length; j++) {
          this.node_handrail[i][j] = p5.Vector.sub(this.node_handrail[i][j], this.node[this.node.length-1]).mult(0.95).add(this.node[this.node.length-1]);
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
  };















  this.display = function() {
  };












  this.display_TRIANGLES = function() {
    let t, c1, c2;
    const w_line = real(8);

    //noStroke();
    //beginShape(TRIANGLES);

    //------------- ⬇F⬇ -------------
    for (let i=0; i<this.node_wall.length-1; i++) {
      //------ F ------
      t = constrain(map(this.node_wall[i][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      if (i < this.node_wall.length-1-1) {
        TRIANGLES_getLine_weight(this.node_wall[i][3], this.node_wall[i+1][3], w_line);
        TRIANGLES_getLine_weight(this.node_wall[i][2], this.node_wall[i+1][2], w_line);
      } else {
        TRIANGLES_getLine_weight(this.node_wall[i][3], this.node_top_copy[3], w_line);
        TRIANGLES_getLine_weight(this.node_wall[i][2], this.node_top_copy[2], w_line);
      }

      //------ B ------
      t = constrain(map(this.node_wall[i][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      if (i < this.node_wall.length-1-1) {
        TRIANGLES_getLine_weight(this.node_wall[i][0], this.node_wall[i+1][0], w_line);
        TRIANGLES_getLine_weight(this.node_wall[i][1], this.node_wall[i+1][1], w_line);
      } else {
        TRIANGLES_getLine_weight(this.node_wall[i][0], this.node_top_copy[0], w_line);
        TRIANGLES_getLine_weight(this.node_wall[i][1], this.node_top_copy[1], w_line);
      }
    }

    for (let i=0; i<this.node_wall.length; i+=2) {
      if (i > 0) {
        for (let j=0; j<4; j++) {
          t = constrain(map(this.node_wall[i][j].z, skyline.z, 0, 1, 0), 0, 1);
          fill(lerpColor(c_near, c_far, t));
          TRIANGLES_getLine_weight_Y(this.node_wall[i][j], this.node_wall[i][(j+1)%4], w_line);
        }


        //------ B/ ------
        t = constrain(map(this.node_wall[i][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        if (i < this.node_wall.length-1) {
          TRIANGLES_getLine_weight(this.node_wall[i-2][1], this.node_wall[i][0], w_line);
        } else {
          TRIANGLES_getLine_weight(this.node_wall[i-2][1], this.node_top_copy[0], w_line);
        }
        //------ F/ ------
        t = constrain(map(this.node_wall[i][2].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        if (i < this.node_wall.length-1) {
          TRIANGLES_getLine_weight(this.node_wall[i-2][3], this.node_wall[i][2], w_line);
        } else {
          TRIANGLES_getLine_weight(this.node_wall[i-2][3], this.node_top_copy[2], w_line);
        }
      }
    }


    //------------- ⬆F⬆ -------------






    //------------- ⬇U⬇ -------------
    c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3], c1, c1, c2, c2);
    //------------- ⬆U⬆ -------------





    //-------- F house --------
    t = constrain(map(this.node_house[1][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_house.length-1; i++) {
      TRIANGLES_getRect(this.node_house[i+1][3], this.node_house[i+1][2], this.node_house[i][2], this.node_house[i][3]);
    }

    TRIANGLES_getTriangle(this.node_house[1][3], this.node_house[1][2], this.node_roof[0]);

    c1 = c_win;
    c2 = c_win;
    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        if (this.have_winF[i][j]) {
          if (state_click == 1) {
            t = constrain(map(this.time_winF[i][j], 0, 10, 0, 1), 0, 1);
            c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_house[0][3].z, skyline.z, 0, 1, 0), 0, 1)), t);
          }
          TRIANGLES_getRect_fill(this.node_winF[i][j][0], this.node_winF[i][j][1], this.node_winF[i][j][2], this.node_winF[i][j][3], c1);
        }
      }
    }




    //-------- L house --------
    if (this.node_house[1][3].x > -real(100)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_house[1][0].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_house[1][3].z, skyline.z, 0, 1, 0), 0, 1));
      for (let i=0; i<this.node_house.length-1; i++) {
        TRIANGLES_getRect_fill4(this.node_house[i+1][0], this.node_house[i+1][3], this.node_house[i][3], this.node_house[i][0], c1, c2, c2, c1);
      }



      c1 = c_win;
      c2 = c_win;
      for (let i=0; i<this.node_winL.length; i++) {
        for (let j=0; j<this.node_winL[i].length; j++) {
          if (this.have_winL[i][j]) {
            if (state_click == 1) {
              t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
              c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_house[0][0].z, skyline.z, 0, 1, 0), 0, 1)), t);
              t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
              c2 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_house[0][3].z, skyline.z, 0, 1, 0), 0, 1)), t);
            }
            TRIANGLES_getRect_fill4(this.node_winL[i][j][0], this.node_winL[i][j][1], this.node_winL[i][j][2], this.node_winL[i][j][3], c1, c2, c2, c1);
          }
        }
      }
    }




    //-------- R house --------
    if (this.node_house[1][2].x < real(100)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_house[1][2].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_house[1][1].z, skyline.z, 0, 1, 0), 0, 1));
      for (let i=0; i<this.node_house.length-1; i++) {
        TRIANGLES_getRect_fill4(this.node_house[i+1][2], this.node_house[i+1][1], this.node_house[i][1], this.node_house[i][2], c1, c2, c2, c1);
      }


      c1 = c_win;
      c2 = c_win;
      for (let i=0; i<this.node_winR.length; i++) {
        for (let j=0; j<this.node_winR[i].length; j++) {
          if (this.have_winR[i][j]) {
            if (state_click == 1) {
              t = constrain(map(this.time_winR[i][j], 0, 10, 0, 1), 0, 1);
              c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_house[0][2].z, skyline.z, 0, 1, 0), 0, 1)), t);
              t = constrain(map(this.time_winR[i][j], 0, 10, 0, 1), 0, 1);
              c2 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_house[0][1].z, skyline.z, 0, 1, 0), 0, 1)), t);
            }
            TRIANGLES_getRect_fill4(this.node_winR[i][j][0], this.node_winR[i][j][1], this.node_winR[i][j][2], this.node_winR[i][j][3], c1, c2, c2, c1);
          }
        }
      }
    }







    //-------- eaves house --------
    c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof[0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_roof[1].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_roof[1], this.node_roof[0], this.node_eavesL[0], this.node_eavesL[1], c2, c1, c1, c2);
    TRIANGLES_getRect_fill4(this.node_roof[0], this.node_roof[1], this.node_eavesR[1], this.node_eavesR[0], c1, c2, c2, c1);







    if (this.have_handrail) {
      for (let i=0; i<this.node_handrail.length; i++) {
        t = constrain(map(this.node_handrail[i][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getLine_weight(this.node_handrail[i][0], this.node_handrail[i][1], real(4));
        TRIANGLES_getLine_weight_Y(this.node_handrail[i][1], this.node_handrail[(i+1)%this.node_handrail.length][1], real(4));
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
    //noFill();
    //stroke(c_info2);
    //strokeWeight(real(1.5));
    //beginShape(LINES);
    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3]);
    }
    for (let i=0; i<this.node_wall.length-1; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        LINES_getLine(this.node_wall[i][j], this.node_wall[i+1][j]);
      }
    }



    //endShape();





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



    for (let i=0; i<this.node_house.length; i++) {
      LINES_getRect(this.node_house[i][0], this.node_house[i][1], this.node_house[i][2], this.node_house[i][3]);
    }
    for (let i=0; i<this.node_house.length-1; i++) {
      for (let j=0; j<this.node_house[i].length; j++) {
        LINES_getLine(this.node_house[i][j], this.node_house[i+1][j]);
      }
    }
    LINES_getRect(this.node_roof[1], this.node_roof[0], this.node_eavesL[0], this.node_eavesL[1]);

    LINES_getRect(this.node_roof[0], this.node_roof[1], this.node_eavesR[1], this.node_eavesR[0]);



    if (this.have_handrail) {
      for (let i=0; i<this.node_handrail.length; i++) {
        LINES_getLine(this.node_handrail[i][0], this.node_handrail[i][1]);
        LINES_getLine(this.node_handrail[i][1], this.node_handrail[(i+1)%this.node_handrail.length][1]);
      }
    }


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

    //endShape();
  };
}