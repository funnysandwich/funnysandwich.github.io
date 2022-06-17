function UnderGroundHouse(begin, W, D, H, floor_num, index_z, index_block) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = -H;
  this.floor_num = floor_num;
  this.index_z = index_z;
  this.index_block = index_block;


  this.is_constr = false;
  this.is_normalHouse = false;
  this.is_cat = false;
  this.is_CTower = false;
  this.is_firewatch = false;
  this.is_buildingBlock = false;
  this.is_dottedLine = false;
  this.is_underGround = true;


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
    this.H_ori_target = -H;
    this.H_ori_ori = -H;
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


  //this.node = Array.from(Array(this.floor_num+1), () => new Array(4));
  //for (let i=0; i<this.node.length; i++) {
  //  const y = i * -this.H;
  //  for (let j=0; j<this.node[i].length; j++) {
  //    this.node[i][j] = createVector(this.W * ceil(j%1.5), y, this.D * floor(j/2)).add(this.begin);
  //  }
  //}

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










  this.W_win = real(random(6, 15));
  this.H_win = this.H_ori * 0.5;
  let gap_win = real(random(50, 80));


  this.num_winF_eachFloor = round(random((this.W-gap_win) / (this.W_win+gap_win) *0.5, (this.W-gap_win) / (this.W_win+gap_win)));
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
      this.have_winF[i][j] = random(1) < 0.2;
      if (i == this.floor_num-1) {
        this.have_winF[i][j] = random(1) < 0.1;
      }
    }
    for (let j=0; j<this.have_winL[i].length; j++) {
      this.have_winL[i][j] = random(1) < 0.2;
      if (i == this.floor_num-1) {
        this.have_winL[i][j] = random(1) < 0.1;
      }
    }
    for (let j=0; j<this.have_winR[i].length; j++) {
      this.have_winR[i][j] = random(1) < 0.2;
      if (i == this.floor_num-1) {
        this.have_winR[i][j] = random(1) < 0.1;
      }
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










  this.have_crucifix = false;
  if (open_crucifix  &&  random(1)<rate_crucifix) {
    this.have_crucifix = true;
  }

  this.have_roof = false;
  if (open_roof  &&  random(1)<rate_roof) {
    this.have_roof = true;
    this.have_crucifix = false;
  }

  this.have_handrail = false;
  if (open_handrail  &&  random(1)<rate_handrail) {
    this.have_handrail = true;
  }

  this.have_billboard = false;
  if (open_billboard  &&  random(1)<rate_billboard  &&  this.floor_num>1) {
    if (index_z == 0) {
      this.have_billboard = true;
    } else if (index_z == 1) {
      this.have_billboard = true;
    } else if (index_z == 5) {
      this.have_billboard = false;
    } else if (random(1)<map(index_z, 2, 6, rate_billboard*0.7, 0.01)) {
      this.have_billboard = true;
    }
  }

  this.have_billboardRoof = false;
  if (open_billboardRoof  &&  random(1)<rate_billboardRoof  &&  this.floor_num>1) {
    this.have_billboardRoof = true;
    if (this.have_roof) {
      if (random(1) < 0.5) {
        this.have_roof = true;
        this.have_billboardRoof = false;
      } else {
        this.have_roof = false;
        this.have_billboardRoof = true;
      }
    }
    if (this.have_billboardRoof) {
      this.have_billboardRoof = false;
      if (index_z == 1) {
        this.have_billboardRoof = true;
      } else if (index_z == 0) {
        if (this.floor_num < 7) {
          this.have_billboardRoof = true;
        } else {
          this.have_billboardRoof = false;
        }
      } else if (index_z == 5) {
        this.have_billboardRoof = false;
      } else if (random(1)<map(index_z, 1, 6, rate_billboardRoof, 0.1)) {
        this.have_billboardRoof = true;
      }
    }
  }

  this.have_ladder = false;
  if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
    this.have_ladder = true;
  }







  if (this.have_crucifix) {
    this.node_cfxVer = new Array(2);
    this.node_cfxHor = new Array(2);
    this.H_cfx_target = real(random(45, 90));
    this.H_cfx = this.H_cfx_target;
    this.W_cfx = this.H_cfx_target * random(0.5, 0.75);

    this.begin_cfx = createVector(random(-this.W/2.0+this.W_cfx/2.0, this.W/2.0-this.W_cfx/2.0), 0, random(0, this.D/2.0));

    this.node_cfxVer[0] = this.begin_cfx.copy().add(0, -this.H_ori, 0);
    this.node_cfxVer[1] = this.node_cfxVer[0].copy().add(0, -this.H_cfx, 0);
    let node_cfxVer_m = p5.Vector.sub(this.node_cfxVer[1], this.node_cfxVer[0]).mult(0.666).add(this.node_cfxVer[0]);
    this.node_cfxHor[0] = node_cfxVer_m.copy().add(-this.W_cfx/2.0, 0, 0);
    this.node_cfxHor[1] = node_cfxVer_m.copy().add(this.W_cfx/2.0, 0, 0);
    for (let i=0; i<2; i++) {
      this.node_cfxVer[i] = PRotateZ(this.node_cfxVer[i], this.node_rotate[this.node_rotate.length-1][0]);
      this.node_cfxVer[i].add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][2]).mult(0.5));
      this.node_cfxHor[i] = PRotateZ(this.node_cfxHor[i], this.node_rotate[this.node_rotate.length-1][0]);
      this.node_cfxHor[i].add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][2]).mult(0.5));
    }
  }




  if (this.have_roof) {
    this.state_roofWall = random(1) < 0.7;
    this.H_overbuild_target = -random(this.H_ori*0.75, this.H_ori*1.25);
    this.H_overbuild = this.H_overbuild_target;
    this.H_rate_roof = random(0.25, 0.8);
    this.X_rate_roofU = random(0, 1);
    this.W_overbuild = min(random(this.W*0.35, this.W*1.5), this.W*0.95);
    this.D_overbuild = min(random(this.D*0.5, this.D*1.5), this.D*0.95);
    if (this.X_rate_roofU <= 0.3) {
      this.X_rate_roofU = 0;
    } else if (this.X_rate_roofU >= 0.8) {
      this.X_rate_roofU = 1;
    }
    this.begin_overbuild = createVector(random(this.W_overbuild/2, this.W-this.W_overbuild/2), real(1), random(this.D_overbuild/2, this.D-this.D_overbuild/2));

    this.node_overbuild = new Array(3);
    this.node_overbuild[0] = this.begin_overbuild.copy();
    this.node_overbuild[1] = this.node_overbuild[0].copy().add(0, -this.H_overbuild*(1-this.H_rate_roof), 0);
    this.node_overbuild[2] = this.node_overbuild[0].copy().add(0, -this.H_overbuild, 0);
    for (let i=0; i<this.node_overbuild.length; i++) {
      this.node_overbuild[i] = PRotateZ(this.node_overbuild[i], this.node_rotate[this.node_rotate.length-1][0]);
      this.node_overbuild[i].add(this.node_wall[this.node_wall.length-1][0]);
    }

    this.node_wall_overbuild = Array.from(Array(this.node_overbuild.length-1), () => new Array(4));
    for (let i=0; i<this.node_wall_overbuild.length; i++) {
      for (let j=0; j<this.node_wall_overbuild[i].length; j++) {
        this.node_wall_overbuild[i][j] = createVector(this.W_overbuild/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D_overbuild/2.0 * pow(-1, floor(j/2)+1));
        this.node_wall_overbuild[i][j] = PRotateZ(this.node_wall_overbuild[i][j], this.node_rotate[this.node_rotate.length-1][0]);
        this.node_wall_overbuild[i][j].add(this.node_overbuild[i]);
      }
    }

    let luf = p5.Vector.sub(this.node_wall_overbuild[1][3], this.node_wall_overbuild[0][3]).setMag(this.H_overbuild*this.H_rate_roof).add(this.node_wall_overbuild[1][3]);
    let lub = p5.Vector.sub(this.node_wall_overbuild[1][0], this.node_wall_overbuild[0][0]).setMag(this.H_overbuild*this.H_rate_roof).add(this.node_wall_overbuild[1][0]);
    this.node_roofUF = p5.Vector.sub(this.node_wall_overbuild[1][2], this.node_wall_overbuild[1][3]).mult(this.X_rate_roofU).add(luf);
    this.node_roofUB = p5.Vector.sub(this.node_wall_overbuild[1][1], this.node_wall_overbuild[1][0]).mult(this.X_rate_roofU).add(lub);
  }




  if (this.have_handrail) {
    this.num_handrailL = constrain(round(map(this.D, real(100), real(500), 2, 5)), 1, 5);
    this.num_handrailF = constrain(round(map(this.W, real(100), real(500), 2, 5)), 1, 5);
    this.H_handrail_target = -random(this.H_ori*0.15, this.H_ori*0.5);
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



  if (this.have_billboard) {
    this.num_billboard = min(floor(random(1, this.floor_num-1)), 6);
    let count_floor = [];
    for (let i=1; i<this.floor_num; i++) {
      count_floor.push(i);
    }

    this.whichFloor_billboard = new Array(this.num_billboard);
    this.W_billboard = new Array(this.num_billboard);
    this.H_billboard = new Array(this.num_billboard);
    this.X_billboard = new Array(this.num_billboard);
    this.Z_billboard = new Array(this.num_billboard);
    this.which_BILL = new Array(this.num_billboard);
    for (let i=0; i<this.num_billboard; i++) {
      const index = floor(random(count_floor.length));
      this.whichFloor_billboard[i] = count_floor[index];
      count_floor.splice(index, 1);

      this.W_billboard[i] = max(random(this.W*0.1, this.W*0.95), real(100));
      this.H_billboard[i] = random(this.H_ori*0.35, this.H_ori*0.9);
      this.X_billboard[i] = random(0, this.W-this.W_billboard[i]);
      this.Z_billboard[i] = real(random(2.5, 10));
      this.which_BILL[i] = floor(random(0, BILL.length));
    }

    this.node_billboard = Array.from(Array(this.num_billboard), () => new Array(4));
    for (let i=0; i<this.node_billboard.length; i++) {
      this.node_billboard[i][0] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.X_billboard[i]);
      this.node_billboard[i][0].add(p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]+1][3], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.H_billboard[i]).add(this.node_wall[this.whichFloor_billboard[i]][3]));
      this.node_billboard[i][1] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.W_billboard[i]).add(this.node_billboard[i][0]);
      this.node_billboard[i][3] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.X_billboard[i]).add(this.node_wall[this.whichFloor_billboard[i]][3]);
      this.node_billboard[i][2] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.W_billboard[i]).add(this.node_billboard[i][3]);
      for (let j=0; j<this.node_billboard[i].length; j++) {
        this.node_billboard[i][j].z += this.Z_billboard[i];
      }
    }
  }




  if (this.have_billboardRoof) {
    this.state_billboardRoof = floor(random(0, 1.5));
    this.D_billboardRoof = constrain(this.D * random(0.25, 0.75), real(20), real(55));
    this.H_billboardRoof = real(random(55, 120));
    this.H_rate_billboardRoof_node1 = random(0.1, 0.65);
    this.W_billboardRoof = max(this.W * random(0.15, 1), real(70));
    this.which_BILL_roof = floor(random(0, BILL.length));
    this.node_billboardRoof = Array.from(Array(max(floor(map(this.W_billboardRoof, real(70), real(500), 2, 8)), 2)), () => new Array(4));

    this.X_billboardRoof = random(0, this.W - this.W_billboardRoof);

    for (let i=0; i<this.node_billboardRoof.length; i++) {
      const be = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.X_billboardRoof).add(this.node_wall[this.node_wall.length-1][3]);

      this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
      this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
      this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
      this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
    }
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





















  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = -H;
    this.floor_num = floor_num;
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






    this.W_win = real(random(6, 15));
    this.H_win = this.H_ori * 0.5;
    let gap_win = real(random(50, 80));


    this.num_winF_eachFloor = round(random((this.W-gap_win) / (this.W_win+gap_win) *0.5, (this.W-gap_win) / (this.W_win+gap_win)));
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
        this.have_winF[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = random(1) < 0.1;
        }
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winL[i][j] = random(1) < 0.1;
        }
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winR[i][j] = random(1) < 0.1;
        }
      }
    }





    this.have_crucifix = false;
    if (open_crucifix  &&  random(1)<rate_crucifix) {
      this.have_crucifix = true;
    }

    this.have_roof = false;
    if (open_roof  &&  random(1)<rate_roof) {
      this.have_roof = true;
      this.have_crucifix = false;
    }

    this.have_handrail = false;
    if (open_handrail  &&  random(1)<rate_handrail) {
      this.have_handrail = true;
    }

    this.have_billboard = false;
    if (open_billboard  &&  random(1)<rate_billboard  &&  this.floor_num>1) {
      if (index_z == 0) {
        this.have_billboard = true;
      } else if (index_z == 1) {
        this.have_billboard = true;
      } else if (index_z == 5) {
        this.have_billboard = false;
      } else if (random(1)<map(index_z, 2, 6, rate_billboard*0.7, 0.1)) {
        this.have_billboard = true;
      }
    }

    this.have_billboardRoof = false;
    if (open_billboardRoof  &&  random(1)<rate_billboardRoof  &&  this.floor_num>1) {
      this.have_billboardRoof = true;
      if (this.have_roof) {
        if (random(1) < 0.5) {
          this.have_roof = true;
          this.have_billboardRoof = false;
        } else {
          this.have_roof = false;
          this.have_billboardRoof = true;
        }
      }
      if (this.have_billboardRoof) {
        this.have_billboardRoof = false;
        if (index_z == 1) {
          this.have_billboardRoof = true;
        } else if (index_z == 0) {
          if (this.floor_num < 7) {
            this.have_billboardRoof = true;
          } else {
            this.have_billboardRoof = false;
          }
        } else if (index_z == 5) {
          this.have_billboardRoof = false;
        } else if (random(1)<map(index_z, 1, 6, rate_billboardRoof, 0.1)) {
          this.have_billboardRoof = true;
        }
      }
    }

    this.have_ladder = false;
    if (open_ladder  &&  random(1)<rate_ladder  &&  this.floor_num >= floor_min_ladder) {
      this.have_ladder = true;
    }




    if (this.have_crucifix) {
      this.node_cfxVer = new Array(2);
      this.node_cfxHor = new Array(2);
      this.H_cfx_target = real(random(45, 90));
      this.H_cfx = -real(100);
      this.W_cfx = this.H_cfx_target * random(0.5, 0.75);

      this.begin_cfx = createVector(random(-this.W/2.0+this.W_cfx/2.0, this.W/2.0-this.W_cfx/2.0), 0, random(0, this.D/2.0));

      for (let i=0; i<2; i++) {
        this.node_cfxVer[i] = this.node[this.node.length-1].copy();
        this.node_cfxHor[i] = this.node[this.node.length-1].copy();
      }
    }







    if (this.have_roof) {
      this.state_roofWall = random(1) < 0.7;
      this.H_overbuild_target = -random(this.H_ori*0.75, this.H_ori*1.25);
      this.H_overbuild = 0;
      this.H_rate_roof = random(0.25, 0.8);
      this.X_rate_roofU = random(0, 1);
      this.W_overbuild = min(random(this.W*0.35, this.W*1.5), this.W*0.95);
      this.D_overbuild = min(random(this.D*0.5, this.D*1.5), this.D*0.95);
      if (this.X_rate_roofU <= 0.3) {
        this.X_rate_roofU = 0;
      } else if (this.X_rate_roofU >= 0.8) {
        this.X_rate_roofU = 1;
      }
      this.begin_overbuild = createVector(random(this.W_overbuild/2, this.W-this.W_overbuild/2), real(1), random(this.D_overbuild/2, this.D-this.D_overbuild/2));

      this.node_overbuild = new Array(3);
      for (let i=0; i<this.node_overbuild.length; i++) {
        this.node_overbuild[i] = this.begin_overbuild.copy();
      }

      this.node_wall_overbuild = Array.from(Array(this.node_overbuild.length-1), () => new Array(4));
      for (let i=0; i<this.node_wall_overbuild.length; i++) {
        for (let j=0; j<this.node_wall_overbuild[i].length; j++) {
          this.node_wall_overbuild[i][j] = this.node_overbuild[i].copy();
        }
      }

      this.node_roofUF = this.begin_overbuild.copy();
      this.node_roofUB = this.begin_overbuild.copy();
    }



    if (this.have_handrail) {
      this.num_handrailL = constrain(round(map(this.D, real(100), real(500), 2, 5)), 1, 5);
      this.num_handrailF = constrain(round(map(this.W, real(100), real(500), 2, 5)), 1, 5);
      this.H_handrail_target = -random(this.H_ori*0.15, this.H_ori*0.5);
      this.H_handrail = 0;
      this.node_handrail = Array.from(Array(this.num_handrailL*2+this.num_handrailF*2), () => new Array(2));
      for (let i=0; i<this.node_handrail.length; i++) {
        for (let j=0; j<this.node_handrail[i].length; j++) {
          this.node_handrail[i][j] = this.node[this.node.length-1].copy();
        }
      }
    }



    if (this.have_billboard) {
      this.num_billboard = min(floor(random(1, this.floor_num-1)), 6);
      let count_floor = [];
      for (let i=1; i<this.floor_num; i++) {
        count_floor.push(i);
      }

      this.whichFloor_billboard = new Array(this.num_billboard);
      this.W_billboard = new Array(this.num_billboard);
      this.H_billboard = new Array(this.num_billboard);
      this.X_billboard = new Array(this.num_billboard);
      this.Z_billboard = new Array(this.num_billboard);
      this.which_BILL = new Array(this.num_billboard);
      for (let i=0; i<this.num_billboard; i++) {
        const index = floor(random(count_floor.length));
        this.whichFloor_billboard[i] = count_floor[index];
        count_floor.splice(index, 1);

        this.W_billboard[i] = max(random(this.W*0.1, this.W*0.95), real(100));
        this.H_billboard[i] = random(this.H_ori*0.3, this.H_ori*0.9);
        this.X_billboard[i] = random(0, this.W-this.W_billboard[i]);
        this.Z_billboard[i] = real(random(2.5, 10));
        this.which_BILL[i] = floor(random(0, BILL.length));
      }

      this.node_billboard = Array.from(Array(this.num_billboard), () => new Array(4));
      for (let i=0; i<this.node_billboard.length; i++) {
        for (let j=0; j<this.node_billboard[i].length; j++) {
          this.node_billboard[i][j] = this.node[this.whichFloor_billboard[i]].copy();
        }
      }
    }



    if (this.have_billboardRoof) {
      this.state_billboardRoof = floor(random(0, 1.5));
      this.D_billboardRoof = constrain(this.D * random(0.25, 0.75), real(20), real(55));
      this.H_billboardRoof = real(random(55, 120));
      this.H_rate_billboardRoof_node1 = random(0.1, 0.65);
      this.W_billboardRoof = max(this.W * random(0.15, 1), real(70));
      this.which_BILL_roof = floor(random(0, BILL.length));
      this.node_billboardRoof = Array.from(Array(max(floor(map(this.W_billboardRoof, real(70), real(500), 2, 8)), 2)), () => new Array(4));

      this.X_billboardRoof = random(0, this.W - this.W_billboardRoof);

      for (let i=0; i<this.node_billboardRoof.length; i++) {
        const be = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.X_billboardRoof).add(this.node_wall[this.node_wall.length-1][3]);

        this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
        this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
      }
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
  };









  this.lightUpAllWin = function() {
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = random(1) < 0.2;
        }
        this.have_winF_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winF_copy[i][j] = random(1) < 0.1;
        }
        this.time_winF[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winL[i][j] = random(1) < 0.2;
        }
        this.have_winL_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winL_copy[i][j] = random(1) < 0.1;
        }
        this.time_winL[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winR[i][j] = random(1) < 0.2;
        }
        this.have_winR_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winR_copy[i][j] = random(1) < 0.1;
        }
        this.time_winR[i][j] = floor(random(-20, 5));
      }
    }
  };








  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < this.floor_num  &&  random(1)<0.75) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == this.floor_num) {
        this.begin_target.y += -this.H_ori*0.5;
      } else {
        this.begin_target.y += -this.H_ori;
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
      this.H_ori_target = -constrain(real(map(this.floor_num, 2, 8, 600, 200)), 200, 600);
      this.H_ori_ori = -real(75);
      if (state_floor == 3) {
        this.H_ori_target = -real(10);
        this.H_ori_ori = -real(200);
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
    //this.begin.y = skyline.y;





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





    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        let winU_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.8).add(this.node_wall[i][3]);
        let winU_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.8).add(this.node_wall[i][2]);
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.4).add(this.node_wall[i][3]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.4).add(this.node_wall[i][2]);
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




    if (this.have_crucifix) {
      this.H_cfx = easing_x(this.H_cfx, this.H_cfx_target, this.var_easing1*0.2);
      // this.begin_cfx.x += speed;

      this.node_cfxVer[0] = this.begin_cfx.copy();
      this.node_cfxVer[1] = this.node_cfxVer[0].copy().add(0, -this.H_cfx, 0);
      let node_cfxVer_m = p5.Vector.sub(this.node_cfxVer[1], this.node_cfxVer[0]).mult(0.666).add(this.node_cfxVer[0]);
      this.node_cfxHor[0] = node_cfxVer_m.copy().add(-this.W_cfx/2.0, 0, 0);
      this.node_cfxHor[1] = node_cfxVer_m.copy().add(this.W_cfx/2.0, 0, 0);

      for (let i=0; i<2; i++) {
        this.node_cfxVer[i] = PRotateZ(this.node_cfxVer[i], this.node_rotate[1][0]);
        this.node_cfxVer[i].add(p5.Vector.add(this.node_wall[0][0], this.node_wall[0][2]).mult(0.5));
        this.node_cfxHor[i] = PRotateZ(this.node_cfxHor[i], this.node_rotate[0][0]);
        this.node_cfxHor[i].add(p5.Vector.add(this.node_wall[0][0], this.node_wall[0][2]).mult(0.5));
      }
    }




    if (this.have_roof) {
      this.H_overbuild = easing_x(this.H_overbuild, this.H_overbuild_target, this.var_easing1*0.15);

      this.node_overbuild[0] = this.begin_overbuild.copy();
      this.node_overbuild[1] = this.node_overbuild[0].copy().add(0, -this.H_overbuild*(1-this.H_rate_roof), 0);
      this.node_overbuild[2] = this.node_overbuild[0].copy().add(0, -this.H_overbuild, 0);
      for (let i=0; i<this.node_overbuild.length; i++) {
        this.node_overbuild[i] = PRotateZ(this.node_overbuild[i], this.node_rotate[1][0]);
        this.node_overbuild[i].add(this.node_wall[0][0]);
      }

      for (let i=0; i<this.node_wall_overbuild.length; i++) {
        for (let j=0; j<this.node_wall_overbuild[i].length; j++) {
          this.node_wall_overbuild[i][j] = createVector(this.W_overbuild/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D_overbuild/2.0 * pow(-1, floor(j/2)+1));
          this.node_wall_overbuild[i][j] = PRotateZ(this.node_wall_overbuild[i][j], this.node_rotate[1][0]);
          this.node_wall_overbuild[i][j].add(this.node_overbuild[i]);
        }
      }

      let luf = p5.Vector.sub(this.node_wall_overbuild[1][3], this.node_wall_overbuild[0][3]).setMag(this.H_overbuild*this.H_rate_roof).add(this.node_wall_overbuild[1][3]);
      let lub = p5.Vector.sub(this.node_wall_overbuild[1][0], this.node_wall_overbuild[0][0]).setMag(this.H_overbuild*this.H_rate_roof).add(this.node_wall_overbuild[1][0]);
      this.node_roofUF = p5.Vector.sub(this.node_wall_overbuild[1][2], this.node_wall_overbuild[1][3]).mult(this.X_rate_roofU).add(luf);
      this.node_roofUB = p5.Vector.sub(this.node_wall_overbuild[1][1], this.node_wall_overbuild[1][0]).mult(this.X_rate_roofU).add(lub);
    }




    if (this.have_handrail) {
      this.H_handrail = easing_x(this.H_handrail, this.H_handrail_target, this.var_easing1*0.2);
      //--- L ---
      for (let i=0; i<this.num_handrailL; i++) {
        let rate = map(i, 0, this.num_handrailL, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[0], this.node[1]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[0][3], this.node_wall[0][0]).mult(rate).add(this.node_wall[0][0]).add(h);
        }
      }
      //--- F ---
      for (let i=this.num_handrailL; i<this.num_handrailL+this.num_handrailF; i++) {
        let rate = map(i, this.num_handrailL, this.num_handrailL+this.num_handrailF, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[0], this.node[1]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[0][2], this.node_wall[0][3]).mult(rate).add(this.node_wall[0][3]).add(h);
        }
      }
      //--- R ---
      for (let i=this.num_handrailL+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF; i++) {
        let rate = map(i, this.num_handrailL+this.num_handrailF, this.num_handrailL*2+this.num_handrailF, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[0], this.node[1]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[0][1], this.node_wall[0][2]).mult(rate).add(this.node_wall[0][2]).add(h);
        }
      }
      //--- B ---
      for (let i=this.num_handrailL*2+this.num_handrailF; i<this.num_handrailL*2+this.num_handrailF*2; i++) {
        let rate = map(i, this.num_handrailL*2+this.num_handrailF, this.num_handrailL*2+this.num_handrailF*2, 0, 1);
        for (let j=0; j<this.node_handrail[i].length; j++) {
          let h = p5.Vector.sub(this.node[0], this.node[1]).setMag(this.H_handrail).mult(j);
          this.node_handrail[i][j] = p5.Vector.sub(this.node_wall[0][0], this.node_wall[0][1]).mult(rate).add(this.node_wall[0][1]).add(h);
        }
      }

      for (let i=0; i<this.node_handrail.length; i++) {
        for (let j=0; j<this.node_handrail[i].length; j++) {
          this.node_handrail[i][j] = p5.Vector.sub(this.node_handrail[i][j], this.node[0]).mult(0.95).add(this.node[0]);
        }
      }
    }




    if (this.have_billboard) {
      for (let i=0; i<this.node_billboard.length; i++) {
        this.node_billboard[i][0] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.X_billboard[i]);
        this.node_billboard[i][0].add(p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]+1][3], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.H_billboard[i]).add(this.node_wall[this.whichFloor_billboard[i]][3]));
        this.node_billboard[i][1] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.W_billboard[i]).add(this.node_billboard[i][0]);
        this.node_billboard[i][3] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.X_billboard[i]).add(this.node_wall[this.whichFloor_billboard[i]][3]);
        this.node_billboard[i][2] = p5.Vector.sub(this.node_wall[this.whichFloor_billboard[i]][2], this.node_wall[this.whichFloor_billboard[i]][3]).setMag(this.W_billboard[i]).add(this.node_billboard[i][3]);
        for (let j=0; j<this.node_billboard[i].length; j++) {
          this.node_billboard[i][j].z += this.Z_billboard[i];
        }
      }
    }




    if (this.have_billboardRoof) {
      for (let i=0; i<this.node_billboardRoof.length; i++) {
        const be = p5.Vector.sub(this.node_wall[0][2], this.node_wall[0][3]).setMag(this.X_billboardRoof).add(this.node_wall[0][3]);
        this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[0][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
        this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[0][3], this.node_wall[1][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[0][0], this.node_wall[0][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
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
    //this.display_TRIANGLES();


    if (open_flood) {
      if (this.have_billboard) {
        fill(255);
        noStroke();
        for (let i=0; i<this.node_billboard.length; i++) {
          beginShape();
          texture(BILL[this.which_BILL[i]]);
          vertex(this.node_billboard[i][0].x, this.node_billboard[i][0].y, this.node_billboard[i][0].z, 0, 0);
          vertex(this.node_billboard[i][1].x, this.node_billboard[i][1].y, this.node_billboard[i][1].z, 1, 0);
          vertex(this.node_billboard[i][2].x, this.node_billboard[i][2].y, this.node_billboard[i][2].z, 1, 1);
          vertex(this.node_billboard[i][3].x, this.node_billboard[i][3].y, this.node_billboard[i][3].z, 0, 1);
          endShape(CLOSE);
        }
      }
    }



    if (this.have_billboardRoof) {
      if (this.state_billboardRoof == 0) {
        noStroke();
        fill(255);
        beginShape();
        texture(BILL[this.which_BILL_roof]);
        vertex(this.node_billboardRoof[0][2].x, this.node_billboardRoof[0][2].y, this.node_billboardRoof[0][2].z, 0, 0);
        vertex(this.node_billboardRoof[this.node_billboardRoof.length-1][2].x, this.node_billboardRoof[this.node_billboardRoof.length-1][2].y, this.node_billboardRoof[this.node_billboardRoof.length-1][2].z, 1, 0);
        vertex(this.node_billboardRoof[this.node_billboardRoof.length-1][1].x, this.node_billboardRoof[this.node_billboardRoof.length-1][1].y, this.node_billboardRoof[this.node_billboardRoof.length-1][1].z, 1, 1);
        vertex(this.node_billboardRoof[0][1].x, this.node_billboardRoof[0][1].y, this.node_billboardRoof[0][1].z, 0, 1);
        endShape(CLOSE);
        fill(255);
      }
    }
  };












  this.display_TRIANGLES = function() {
    let t, c1, c2;

    //noStroke();
    //beginShape(TRIANGLES);

    if (open_flood) {
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


        c1 = c_win;
        c2 = c_win;
        for (let i=0; i<this.node_winL.length; i++) {
          for (let j=0; j<this.node_winL[i].length; j++) {
            if (this.have_winL[i][j]) {
              if (state_click == 1) {
                t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
                c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1)), t);
                t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
                c2 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1)), t);
              }
              TRIANGLES_getRect_fill4(this.node_winL[i][j][0], this.node_winL[i][j][1], this.node_winL[i][j][2], this.node_winL[i][j][3], c1, c2, c2, c1);
            }
          }
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


        c1 = c_win;
        c2 = c_win;
        for (let i=0; i<this.node_winR.length; i++) {
          for (let j=0; j<this.node_winR[i].length; j++) {
            if (this.have_winR[i][j]) {
              if (state_click == 1) {
                t = constrain(map(this.time_winR[i][j], 0, 10, 0, 1), 0, 1);
                c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1)), t);
                t = constrain(map(this.time_winR[i][j], 0, 10, 0, 1), 0, 1);
                c2 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][1].z, skyline.z, 0, 1, 0), 0, 1)), t);
              }
              TRIANGLES_getRect_fill4(this.node_winR[i][j][0], this.node_winR[i][j][1], this.node_winR[i][j][2], this.node_winR[i][j][3], c1, c2, c2, c1);
            }
          }
        }
      }
      //------------- ⬆R⬆ -------------



      //------------- ⬇U⬇ -------------
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node_wall[0][0], this.node_wall[0][1], this.node_wall[0][2], this.node_wall[0][3], c1, c1, c2, c2);
      //------------- ⬆U⬆ -------------
    }



    if (this.have_crucifix) {
      t = constrain(map(this.node_cfxVer[0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      TRIANGLES_getLine_weight(this.node_cfxVer[0], this.node_cfxVer[1], real(13));
      TRIANGLES_getLine_weight_Y(this.node_cfxHor[0], this.node_cfxHor[1], real(13));
    }



    if (this.have_roof) {
      if (this.state_roofWall) {
        //--- F_roof_wall ---
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][3].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill(this.node_wall_overbuild[1][3], this.node_wall_overbuild[1][2], this.node_wall_overbuild[0][2], this.node_wall_overbuild[0][3], c1);
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_roofUF.z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getTriangle_fill3(this.node_wall_overbuild[1][3], this.node_wall_overbuild[1][2], this.node_roofUF, c1, c1, c2);

        //--- L_roof_wall ---
        if (this.node_wall_overbuild[0][3].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][0].z, skyline.z, 0, 1, 0), 0, 1));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][3].z, skyline.z, 0, 1, 0), 0, 1));
          TRIANGLES_getRect_fill4(this.node_wall_overbuild[1][0], this.node_wall_overbuild[1][3], this.node_wall_overbuild[0][3], this.node_wall_overbuild[0][0], c1, c2, c2, c1);
        }
        //--- R_roof_wall ---
        if (this.node_wall_overbuild[0][2].x < real(50)) {
          c1 = (lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][2].z, skyline.z, 0, 1, 0), 0, 1)));
          c2 = (lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][1].z, skyline.z, 0, 1, 0), 0, 1)));
          TRIANGLES_getRect_fill4(this.node_wall_overbuild[1][2], this.node_wall_overbuild[1][1], this.node_wall_overbuild[0][1], this.node_wall_overbuild[0][2], c1, c2, c2, c1);
        }
      } else {
        //--- F_roof_wall ---
        t = constrain(map(this.node_wall_overbuild[0][3].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[0][3], this.node_wall_overbuild[1][3], real(6));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[0][2], this.node_wall_overbuild[1][2], real(6));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[1][3], this.node_roofUF, real(6));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[1][2], this.node_roofUF, real(6));
        //--- B_roof_wall ---
        t = constrain(map(this.node_wall_overbuild[0][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[0][0], this.node_wall_overbuild[1][0], real(6));
        TRIANGLES_getLine_weight(this.node_wall_overbuild[0][1], this.node_wall_overbuild[1][1], real(6));
        if (this.X_rate_roofU == 0) {
          TRIANGLES_getLine_weight(this.node_wall_overbuild[1][0], this.node_roofUB, real(6));
        } else if (this.X_rate_roofU == 1) {
          TRIANGLES_getLine_weight(this.node_wall_overbuild[1][1], this.node_roofUB, real(6));
        }
      }

      //--- L_roof ---
      if (this.X_rate_roofU > 0 || this.state_roofWall) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][3].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_roofUB, this.node_roofUF, this.node_wall_overbuild[1][3], this.node_wall_overbuild[1][0], c1, c2, c2, c1);
      }
      //--- R_roof ---
      if (this.X_rate_roofU < 1 || this.state_roofWall) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][2].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_overbuild[1][1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_roofUF, this.node_roofUB, this.node_wall_overbuild[1][1], this.node_wall_overbuild[1][2], c1, c2, c2, c1);
      }
    }










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




    if (open_flood) {
      if (this.have_billboard) {
        t = constrain(map(this.node_billboard[0][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        for (let i=0; i<this.node_billboard.length; i++) {
          TRIANGLES_getLine_weightToL(this.node_billboard[i][3], this.node_billboard[i][0], real(8));
          TRIANGLES_getLine_weightToU_Y(this.node_billboard[i][0].copy().add(-real(8), 0, 0), this.node_billboard[i][1].copy().add(real(8), 0, 0), real(8));
          TRIANGLES_getLine_weightToR(this.node_billboard[i][1], this.node_billboard[i][2], real(8));
          TRIANGLES_getLine_weightToD_Y(this.node_billboard[i][2].copy().add(real(8), 0, 0), this.node_billboard[i][3].copy().add(-real(8), 0, 0), real(8));
        }
      }
    }





    if (this.have_billboardRoof) {
      t = constrain(map(this.node_billboardRoof[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));      
      for (let i=0; i<this.node_billboardRoof.length; i++) {
        if (i == 0) {
          TRIANGLES_getLine_weightToL(this.node_billboardRoof[i][0], this.node_billboardRoof[i][2], real(4));
          TRIANGLES_getLine_weightToL(this.node_billboardRoof[i][1], this.node_billboardRoof[i][3], real(4));
        } else if (i == this.node_billboardRoof.length-1) {
          TRIANGLES_getLine_weightToR(this.node_billboardRoof[i][0], this.node_billboardRoof[i][2], real(4));
          TRIANGLES_getLine_weightToR(this.node_billboardRoof[i][1], this.node_billboardRoof[i][3], real(4));
        } else {
          TRIANGLES_getLine_weight(this.node_billboardRoof[i][0].copy().add(0, 0, -real(2)), this.node_billboardRoof[i][2].copy().add(0, 0, -real(2)), real(4));
          TRIANGLES_getLine_weight(this.node_billboardRoof[i][1], this.node_billboardRoof[i][3], real(4));
        }
      }
      for (let i=0; i<this.node_billboardRoof.length-1; i++) {
        TRIANGLES_getLine_weightToU_Y(this.node_billboardRoof[i][2].copy().add(-real(4), 0, 0), this.node_billboardRoof[i+1][2].copy().add(real(4), 0, 0), real(4));
        TRIANGLES_getLine_weightToD_Y(this.node_billboardRoof[i][1].copy().add(-real(4), 0, 0), this.node_billboardRoof[i+1][1].copy().add(real(4), 0, 0), real(4));
        if (this.state_billboardRoof == 1) {
          TRIANGLES_getLine_weight(this.node_billboardRoof[i][1], this.node_billboardRoof[i+1][2], real(6));
        }
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

    //    stroke(c_info2);
    //    strokeWeight(real(2));
    //    beginShape(LINES);
    for (let i=0; i<this.node_wall.length; i++) {
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




    if (this.have_crucifix) {
      //noFill();
      //stroke(c_info2);
      //strokeWeight(real(3.5));
      //beginShape(LINES);
      vertex(this.node_cfxVer[0].x, this.node_cfxVer[0].y, this.node_cfxVer[0].z);
      vertex(this.node_cfxVer[1].x, this.node_cfxVer[1].y, this.node_cfxVer[1].z);
      vertex(this.node_cfxHor[0].x, this.node_cfxHor[0].y, this.node_cfxHor[0].z);
      vertex(this.node_cfxHor[1].x, this.node_cfxHor[1].y, this.node_cfxHor[1].z);
      //endShape();
    }




    if (this.have_roof) {
      //noFill();
      //stroke(c_info2);
      //strokeWeight(real(2));
      //beginShape(LINES);
      for (let i=0; i<this.node_overbuild.length-1; i++) {
        vertex(this.node_overbuild[i].x, this.node_overbuild[i].y, this.node_overbuild[i].z);
        vertex(this.node_overbuild[i+1].x, this.node_overbuild[i+1].y, this.node_overbuild[i+1].z);
      }
      for (let i=0; i<this.node_wall_overbuild.length-1; i++) {
        for (let j=0; j<this.node_wall_overbuild[i].length; j++) {
          vertex(this.node_wall_overbuild[i][j].x, this.node_wall_overbuild[i][j].y, this.node_wall_overbuild[i][j].z);
          vertex(this.node_wall_overbuild[i+1][j].x, this.node_wall_overbuild[i+1][j].y, this.node_wall_overbuild[i+1][j].z);
        }
      }
      for (let i=0; i<this.node_wall_overbuild.length; i++) {
        for (let j=0; j<this.node_wall_overbuild[i].length; j++) {
          vertex(this.node_wall_overbuild[i][j].x, this.node_wall_overbuild[i][j].y, this.node_wall_overbuild[i][j].z);
          vertex(this.node_wall_overbuild[i][(j+1)%this.node_wall_overbuild[i].length].x, this.node_wall_overbuild[i][(j+1)%this.node_wall_overbuild[i].length].y, this.node_wall_overbuild[i][(j+1)%this.node_wall_overbuild[i].length].z);
        }
      }
      vertex(this.node_roofUF.x, this.node_roofUF.y, this.node_roofUF.z);
      vertex(this.node_roofUB.x, this.node_roofUB.y, this.node_roofUB.z);
      vertex(this.node_roofUF.x, this.node_roofUF.y, this.node_roofUF.z);
      vertex(this.node_wall_overbuild[1][3].x, this.node_wall_overbuild[1][3].y, this.node_wall_overbuild[1][3].z);
      vertex(this.node_roofUF.x, this.node_roofUF.y, this.node_roofUF.z);
      vertex(this.node_wall_overbuild[1][2].x, this.node_wall_overbuild[1][2].y, this.node_wall_overbuild[1][2].z);
      vertex(this.node_roofUB.x, this.node_roofUB.y, this.node_roofUB.z);
      vertex(this.node_wall_overbuild[1][0].x, this.node_wall_overbuild[1][0].y, this.node_wall_overbuild[1][0].z);
      vertex(this.node_roofUB.x, this.node_roofUB.y, this.node_roofUB.z);
      vertex(this.node_wall_overbuild[1][1].x, this.node_wall_overbuild[1][1].y, this.node_wall_overbuild[1][1].z);

      //endShape();
    }



    //if (this.have_handrail) {
    //  noFill();
    //  stroke(200, 0, 0);
    //  strokeWeight(real(4));
    //  beginShape(LINES);
    //  for (let i=0; i<this.node_handrail.length; i++) {
    //    for (let j=0; j<this.node_handrail[i].length; j++) {
    //      vertex(this.node_handrail[i][j].x, this.node_handrail[i][j].y, this.node_handrail[i][j].z);
    //    }
    //  }
    //  endShape();
    //}


    if (this.have_billboard) {
      //noFill();
      //stroke(c_info2);
      //strokeWeight(real(2));
      //beginShape(LINES);
      for (let i=0; i<this.node_billboard.length; i++) {
        for (let j=0; j<this.node_billboard[i].length; j++) {
          vertex(this.node_billboard[i][j].x, this.node_billboard[i][j].y, this.node_billboard[i][j].z);
          vertex(this.node_billboard[i][(j+1)%this.node_billboard[i].length].x, this.node_billboard[i][(j+1)%this.node_billboard[i].length].y, this.node_billboard[i][(j+1)%this.node_billboard[i].length].z);
        }
      }
      //endShape();
    }


    if (this.have_billboardRoof) {
      //noFill();
      //stroke(c_info2);
      //strokeWeight(real(2));
      //beginShape(LINES);
      for (let i=0; i<this.node_billboardRoof.length; i++) {
        vertex(this.node_billboardRoof[i][0].x, this.node_billboardRoof[i][0].y, this.node_billboardRoof[i][0].z);
        vertex(this.node_billboardRoof[i][2].x, this.node_billboardRoof[i][2].y, this.node_billboardRoof[i][2].z);
        vertex(this.node_billboardRoof[i][1].x, this.node_billboardRoof[i][1].y, this.node_billboardRoof[i][1].z);
        vertex(this.node_billboardRoof[i][3].x, this.node_billboardRoof[i][3].y, this.node_billboardRoof[i][3].z);
      }
      for (let i=0; i<this.node_billboardRoof.length-1; i++) {
        vertex(this.node_billboardRoof[i][2].x, this.node_billboardRoof[i][2].y, this.node_billboardRoof[i][2].z);
        vertex(this.node_billboardRoof[i+1][2].x, this.node_billboardRoof[i+1][2].y, this.node_billboardRoof[i+1][2].z);
        vertex(this.node_billboardRoof[i][1].x, this.node_billboardRoof[i][1].y, this.node_billboardRoof[i][1].z);
        vertex(this.node_billboardRoof[i+1][1].x, this.node_billboardRoof[i+1][1].y, this.node_billboardRoof[i+1][1].z);
      }
      //endShape();
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