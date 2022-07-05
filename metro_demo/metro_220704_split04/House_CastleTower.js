function CastleTowerHouse(begin, W, D, H, floor_num, index_z, index_block, have_CWall, lastCTHouse_floorNum, lastCTHouse_node0) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = H;
  this.floor_num = max(floor_num, 3);
  this.index_z = index_z;
  this.index_block = index_block;


  this.is_constr = false;
  this.is_normalHouse = false;
  this.is_cat = false;
  this.is_CTower = true;
  this.is_firewatch = false;
  this.is_buildingBlock = false;
  this.is_dottedLine = false;
  this.is_underGround = false;
  this.is_orient = false;




  this.open_change = false;
  this.time_change = 0;
  this.time_change_max = floor(random(0, 3));


  this.var_easing1 = random(0.4, 0.6);


  if (have_button_submerge) {
    this.count_sub = 0;
    this.begin_target = begin.copy();
    this.begin_lastClick = begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(2, 5));
  }  
  if (have_button_spring) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(3, 15));
    this.H_ori_target = this.H;
    this.H_ori_ori = this.H;
  }  
  if (state_click == 4) {
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
    let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }





  this.node_rampart = new Array(4);
  this.W_rampart = this.W;
  this.H_rampart = this.H_ori * 0.3;
  for (let i=0; i<this.node_rampart.length; i++) {
    this.node_rampart[i] = createVector(this.W_rampart/2.0 * pow(-1, ceil(i%1.5)+1), -this.H_rampart, this.W_rampart/2.0 * pow(-1, floor(i/2)+1));
    this.node_rampart[i] = PRotateZ(this.node_rampart[i], this.node_rotate[this.node_rotate.length-1][0]);
    this.node_rampart[i].add(this.node[this.node.length-1]);
  }



  let num_teeth = constrain(floor(map(this.W_rampart, real(100), real(200), 3, 5)), 3, 4);
  this.H_teeth = this.H_ori * 0.15;
  this.node_teeth = new Array(this.node_rampart.length);
  for (let i=0; i<this.node_teeth.length; i++) {
    this.node_teeth[i] = Array.from(Array(2), () => new Array(num_teeth * 2));
    const U0 = p5.Vector.sub(this.node_rampart[i], this.node_wall[this.node_wall.length-1][i]).setMag(this.H_teeth).add(this.node_rampart[i]);
    const U1 = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_wall[this.node_wall.length-1][(i+1)%this.node_rampart.length]).setMag(this.H_teeth).add(this.node_rampart[(i+1)%this.node_rampart.length]);
    for (let j=0; j<this.node_teeth[i].length; j++) {
      for (let k=0; k<this.node_teeth[i][j].length; k++) {
        const each = 1.0 / ((this.node_teeth[i][j].length-1)*2 -2);
        let rate = map(k, 0, this.node_teeth[i][j].length-1, -each, 1+each);
        if (k == 0) {
          rate = 0;
        } else if (k == this.node_teeth[i][j].length-1) {
          rate = 1;
        }

        if (j==0) {
          this.node_teeth[i][j][k] = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_rampart[i]).mult(rate).add(this.node_rampart[i]);
        } else {
          this.node_teeth[i][j][k] = p5.Vector.sub(U1, U0).mult(rate).add(U0);
        }
      }
    }
  }














  this.W_win = real(random(4, 7));
  let gap_win = real(random(50, 80));


  this.num_winF_eachFloor = 1;//round(random((this.W-gap_win) / (this.W_win+gap_win) *0.5, (this.W-gap_win) / (this.W_win+gap_win)));
  this.num_winL_eachFloor = 1;//round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));
  this.num_winR_eachFloor = 1;//round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));


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
      this.have_winF[i][j] = random(1) < 0.25;
      if (i == this.floor_num-1) {
        this.have_winF[i][j] = 0;
      }
    }
    for (let j=0; j<this.have_winL[i].length; j++) {
      this.have_winL[i][j] = random(1) < 0.25;
      if (i == this.floor_num-1) {
        this.have_winL[i][j] = 0;
      }
    }
    for (let j=0; j<this.have_winR[i].length; j++) {
      this.have_winR[i][j] = random(1) < 0.25;
      if (i == this.floor_num-1) {
        this.have_winR[i][j] = 0;
      }
    }
  }


  if (have_button_shine) {
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













  this.have_CWall = have_CWall;
  if (this.have_CWall) {
    this.lastCTHouse_floorNum = lastCTHouse_floorNum;
    this.whichFloor_CWall = floor(random(0, min(this.floor_num-2, this.lastCTHouse_floorNum-2)));
    this.D_CWall = this.D * random(0.5, 0.8);

    this.node_CW = new Array(4);
    this.node_CW[0] = this.node[this.whichFloor_CWall+1].copy();
    this.node_CW[1] = this.node_CW[0].copy();
    this.node_CW[3] =  this.node[0].copy();
    this.node_CW[2] = this.node_CW[3].copy();

    this.node_CWall_wall = Array.from(Array(2), () => new Array(4));//i:[0]:F [1]:B
    for (let i=0; i<this.node_CWall_wall.length; i++) {
      let d = this.D_CWall/2.0;
      if (i == 1) {
        d = -this.D_CWall/2.0;
      }
      for (let j=0; j<this.node_CWall_wall[i].length; j++) {
        this.node_CWall_wall[i][j] = this.node_CW[j].copy().add(0, 0, d);
      }
    }


    //let num_CWall_teeth = floor(map(p5.Vector.dist(lastCTHouse_node0, this.node[0]), real(100), real(200), 3, 5));
    //this.node_CWall_teeth = new Array(2);
    //for (let i=0; i<this.node_CWall_teeth.length; i++) {
    //  this.node_CWall_teeth[i] = Array.from(Array(2), () => new Array(num_CWall_teeth * 2));
    //  for (let j=0; j<this.node_CWall_teeth[i].length; j++) {
    //    let h = j * this.H_teeth;
    //    for (let k=0; k<this.node_CWall_teeth[i][j].length; k++) {
    //      let rate = map(k, 0, this.node_CWall_teeth[i][j].length-1, 0, 1);
    //      this.node_CWall_teeth[i][j][k] = p5.Vector.sub(this.node_CWall_wall[i][1], this.node_CWall_wall[i][0]).mult(rate).add(this.node_CWall_wall[i][0]).add(0, -h, 0);
    //    }
    //  }
    //}




    this.have_CW_door = false;
    this.center_CW_door = this.node[0].copy();
    this.node_CW_door = new Array(6);
    let W_CW_door = gap_block * 0.8;
    let H_CW_door = max(real(65), (this.node_CW[3].y - this.node_CW[0].y) * 0.25);

    this.node_CW_door[0] = p5.Vector.sub(this.node_CW[3], this.center_CW_door).setMag(W_CW_door/2.0).add(this.center_CW_door);
    this.node_CW_door[5] = p5.Vector.sub(this.node_CW[2], this.center_CW_door).setMag(W_CW_door/2.0).add(this.center_CW_door);
    this.node_CW_door[1] = this.node_CW_door[0].copy().add(0, -H_CW_door*0.7, 0);
    this.node_CW_door[4] = this.node_CW_door[5].copy().add(0, -H_CW_door*0.7, 0);
    this.node_CW_door[2] = p5.Vector.sub(this.node_CW_door[0], this.center_CW_door).mult(0.8).add(this.center_CW_door).add(0, -H_CW_door, 0);
    this.node_CW_door[3] = p5.Vector.sub(this.node_CW_door[5], this.center_CW_door).mult(0.8).add(this.center_CW_door).add(0, -H_CW_door, 0);
  }







  this.have_roof = false;
  if (open_CTRoof  &&  random(1)<rate_CTRoof) {
    this.have_roof = true;
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









  if (this.have_roof) {
    this.state_roof = floor(random(0, 1.5));
    this.W_roof = this.W_rampart * random(0.9, 0.5);
    this.H_roof_wall = this.H_ori * random(0.25, 0.75);
    this.H_roof = this.H_ori * random(0.5, 2.0);
    this.node_roof_wall =  Array.from(Array(2), () => new Array(4));

    const center_roof = p5.Vector.add(this.node_rampart[2], this.node_rampart[0]).mult(0.5);
    for (let i=0; i<this.node_roof_wall.length; i++) {
      const h = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof_wall*i).add(center_roof);
      for (let j=0; j<this.node_roof_wall[i].length; j++) {
        this.node_roof_wall[i][j] = p5.Vector.sub(this.node_rampart[j], center_roof).setMag(sqrt(sq(this.W_roof)/2.0)).add(h);
      }
    }

    this.node_roof = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof+this.H_roof_wall).add(center_roof);
  }







  if (this.have_billboardRoof) {
    this.state_billboardRoof = floor(random(0, 1.5));
    this.D_billboardRoof = constrain(this.D * random(0.25, 0.75), real(20), real(55));
    this.H_billboardRoof = real(random(55, 120));
    this.H_rate_billboardRoof_node1 = random(0.1, 0.65);
    this.W_billboardRoof = max(this.W*0.8 * random(0.15, 1), real(70));
    this.which_BILL_roof = floor(random(0, BILL.length));
    this.node_billboardRoof = Array.from(Array(max(floor(map(this.W_billboardRoof, real(70), real(500), 2, 8)), 2)), () => new Array(4));

    this.X_billboardRoof = random(this.W*0.1, this.W*0.8 - this.W_billboardRoof);

    for (let i=0; i<this.node_billboardRoof.length; i++) {
      const be = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.X_billboardRoof).add(this.node_wall[this.node_wall.length-1][3]);

      this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
      this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
      this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
      this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
    }
  }




























  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = H;
    this.floor_num = max(floor_num, 3);
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
      let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      this.node_rotate[i][0] = lz;
      this.node_rotate[i][1] = 0;
    }





    this.W_rampart = this.W;
    this.H_rampart = this.H_ori * 0.3;
    for (let i=0; i<this.node_rampart.length; i++) {
      this.node_rampart[i] = createVector(this.W_rampart/2.0 * pow(-1, ceil(i%1.5)+1), -this.H_rampart, this.W_rampart/2.0 * pow(-1, floor(i/2)+1));
      this.node_rampart[i] = PRotateZ(this.node_rampart[i], this.node_rotate[this.node_rotate.length-1][0]);
      this.node_rampart[i].add(this.node[this.node.length-1]);
    }





    let num_teeth = constrain(floor(map(this.W_rampart, real(100), real(200), 3, 5)), 3, 4);
    this.H_teeth = this.H_ori * 0.15;

    for (let i=0; i<this.node_teeth.length; i++) {
      const U0 = p5.Vector.sub(this.node_rampart[i], this.node_wall[this.node_wall.length-1][i]).setMag(this.H_teeth).add(this.node_rampart[i]);
      const U1 = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_wall[this.node_wall.length-1][(i+1)%this.node_rampart.length]).setMag(this.H_teeth).add(this.node_rampart[(i+1)%this.node_rampart.length]);
      for (let j=0; j<this.node_teeth[i].length; j++) {
        for (let k=0; k<this.node_teeth[i][j].length; k++) {
          const each = 1.0 / ((this.node_teeth[i][j].length-1)*2 -2);
          let rate = map(k, 0, this.node_teeth[i][j].length-1, -each, 1+each);
          if (k == 0) {
            rate = 0;
          } else if (k == this.node_teeth[i][j].length-1) {
            rate = 1;
          }

          if (j==0) {
            this.node_teeth[i][j][k] = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_rampart[i]).mult(rate).add(this.node_rampart[i]);
          } else {
            this.node_teeth[i][j][k] = p5.Vector.sub(U1, U0).mult(rate).add(U0);
          }
        }
      }
    }












    this.W_win = real(random(4, 7));
    let gap_win = real(random(50, 80));


    this.num_winF_eachFloor = 1;//round(random((this.W-gap_win) / (this.W_win+gap_win) *0.5, (this.W-gap_win) / (this.W_win+gap_win)));
    this.num_winL_eachFloor = 1;//round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));
    this.num_winR_eachFloor = 1;//round(random((this.D-gap_win) / (this.W_win+gap_win) *0.5, (this.D-gap_win) / (this.W_win+gap_win)));



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
        this.have_winF[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = 0;
        }
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winL[i][j] = 0;
        }
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winR[i][j] = 0;
        }
      }
    }
    
    
    
    
    
     if (have_button_shine) {
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










    if (this.have_CWall) {
      this.whichFloor_CWall = floor(random(0, this.floor_num-2));
      this.D_CWall = this.D * random(0.5, 0.8);

      //this.node_CW = new Array(4);
      this.node_CW[0] = this.node[this.whichFloor_CWall+1].copy();
      //this.node_CW[1] = createVector(0, 0, 0);
      //this.node_CW[2] = createVector(0, 0, 0);
      this.node_CW[3] =  this.node[0].copy();

      // this.node_CWall_wall = Array.from(Array(2), () => new Array(4));//i:[0]:F [1]:B
      for (let i=0; i<this.node_CWall_wall.length; i++) {
        let d = this.D_CWall/2.0;
        if (i == 1) {
          d = -this.D_CWall/2.0;
        }
        for (let j=0; j<this.node_CWall_wall[i].length; j++) {
          this.node_CWall_wall[i][j] = this.node_CW[j].copy().add(0, 0, d);
        }
      }


      //for (let i=0; i<this.node_CWall_teeth.length; i++) {
      //  for (let j=0; j<this.node_CWall_teeth[i].length; j++) {
      //    let h = j * this.H_teeth;
      //    for (let k=0; k<this.node_CWall_teeth[i][j].length; k++) {
      //      let rate = map(k, 0, this.node_CWall_teeth[i][j].length-1, 0, 1);
      //      this.node_CWall_teeth[i][j][k] = p5.Vector.sub(this.node_CWall_wall[i][1], this.node_CWall_wall[i][0]).mult(rate).add(this.node_CWall_wall[i][0]);
      //    }
      //  }
      //}
    }








    this.have_roof = false;
    if (open_CTRoof  &&  random(1)<rate_CTRoof) {
      this.have_roof = true;
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









    if (this.have_billboardRoof) {
      this.state_billboardRoof = floor(random(0, 1.5));
      this.D_billboardRoof = constrain(this.D * random(0.25, 0.75), real(20), real(55));
      this.H_billboardRoof = real(random(55, 120));
      this.H_rate_billboardRoof_node1 = random(0.1, 0.65);
      this.W_billboardRoof = max(this.W*0.8 * random(0.15, 1), real(70));
      this.which_BILL_roof = floor(random(0, BILL.length));
      this.node_billboardRoof = Array.from(Array(max(floor(map(this.W_billboardRoof, real(70), real(500), 2, 8)), 2)), () => new Array(4));

      this.X_billboardRoof = random(this.W*0.1, this.W*0.8 - this.W_billboardRoof);

      for (let i=0; i<this.node_billboardRoof.length; i++) {
        const be = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.X_billboardRoof).add(this.node_wall[this.node_wall.length-1][3]);

        this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
        this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-2][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
      }
    }




    if (this.have_roof) {
      this.state_roof = floor(random(0, 1.5));
      this.W_roof = this.W_rampart * random(0.9, 0.5);
      this.H_roof_wall = this.H_ori * random(0.25, 0.75);
      this.H_roof = this.H_ori * random(0.5, 2.0);
      this.node_roof_wall =  Array.from(Array(2), () => new Array(4));

      const center_roof = p5.Vector.add(this.node_rampart[2], this.node_rampart[0]).mult(0.5);
      for (let i=0; i<this.node_roof_wall.length; i++) {
        const h = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof_wall*i).add(center_roof);
        for (let j=0; j<this.node_roof_wall[i].length; j++) {
          this.node_roof_wall[i][j] = p5.Vector.sub(this.node_rampart[j], center_roof).setMag(sqrt(sq(this.W_roof)/2.0)).add(h);
        }
      }

      this.node_roof = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof+this.H_roof_wall).add(center_roof);
    }
  };









  this.lightUpAllWin = function() {
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = random(1) < 0.75;
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = 0;
        }
        this.have_winF_copy[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winF_copy[i][j] = 0;
        }
        this.time_winF[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.75;
        if (i == this.floor_num-1) {
          this.have_winL[i][j] = 0;
        }
        this.have_winL_copy[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winL_copy[i][j] = 0;
        }
        this.time_winL[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.75;
        if (i == this.floor_num-1) {
          this.have_winR[i][j] = 0;
        }
        this.have_winR_copy[i][j] = random(1) < 0.25;
        if (i == this.floor_num-1) {
          this.have_winR_copy[i][j] = 0;
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
        this.begin_target.y += this.H_ori*0.1;
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






    if (have_button_submerge  &&  this.is_falling) {
      if (this.time_falling < this.time_max_falling) {
        this.time_falling ++;
      } else {
        this.is_falling = false;
        this.begin_lastClick = this.begin_target.copy();
      }
      let l = map(sin(map(this.time_falling, 0, this.time_max_falling, HALF_PI, PI)), 1, 0, 0.001, 1);
      this.begin.y = (this.begin_target.y - this.begin_lastClick.y)*l + this.begin_lastClick.y;
    }




    if (have_button_spring  &&  this.open_spring) {
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
      if (i == this.node.length-1) {
        n = createVector(speed, -this.H_ori*0.25, 0);
      } else {
        n = createVector(speed, -this.H_ori, 0);
      }
      n = PRotateZ(n, this.node_rotate[i][0]);
      n = PRotateX(n, this.node_rotate[i][1]);
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, this.var_easing1);
    }


    for (let i=0; i<this.node_wall.length; i++) {
      //let w = this.W * pow(0.95, i);
      let w = map(i, 0, this.node_wall.length-1, this.W, this.W*0.8);
      if (i == this.node_wall.length-1) {
        w = this.W_rampart;
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







    for (let i=0; i<this.node_rampart.length; i++) {
      let n = createVector(this.W_rampart/2.0 * pow(-1, ceil(i%1.5)+1), -this.H_rampart, this.W_rampart/2.0 * pow(-1, floor(i/2)+1));
      n = PRotateZ(n, this.node_rotate[this.node_rotate.length-1][0]);
      this.node_rampart[i] = easing_p(this.node_rampart[i], n.add(this.node[this.node.length-1]), 0.5);
    }





    for (let i=0; i<this.node_teeth.length; i++) {
      const U0 = p5.Vector.sub(this.node_rampart[i], this.node_wall[this.node_wall.length-1][i]).setMag(this.H_teeth).add(this.node_rampart[i]);
      const U1 = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_wall[this.node_wall.length-1][(i+1)%this.node_rampart.length]).setMag(this.H_teeth).add(this.node_rampart[(i+1)%this.node_rampart.length]);
      for (let j=0; j<this.node_teeth[i].length; j++) {
        for (let k=0; k<this.node_teeth[i][j].length; k++) {
          const each = 1.0 / ((this.node_teeth[i][j].length-1)*2 -2);
          let rate = map(k, 0, this.node_teeth[i][j].length-1, -each, 1+each);
          if (k == 0) {
            rate = 0;
          } else if (k == this.node_teeth[i][j].length-1) {
            rate = 1;
          }

          if (j==0) {
            this.node_teeth[i][j][k] = p5.Vector.sub(this.node_rampart[(i+1)%this.node_rampart.length], this.node_rampart[i]).mult(rate).add(this.node_rampart[i]);
          } else {
            this.node_teeth[i][j][k] = p5.Vector.sub(U1, U0).mult(rate).add(U0);
          }
        }
      }
    }










    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        let winU_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.8).add(this.node_wall[i][3]);
        let winU_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.8).add(this.node_wall[i][2]);
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.5).add(this.node_wall[i][3]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.5).add(this.node_wall[i][2]);
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
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][0], this.node_wall[i][0]).mult(0.5).add(this.node_wall[i][0]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.5).add(this.node_wall[i][3]);
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
        let winD_wallL = p5.Vector.sub(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.5).add(this.node_wall[i][2]);
        let winD_wallR = p5.Vector.sub(this.node_wall[i+1][1], this.node_wall[i][1]).mult(0.5).add(this.node_wall[i][1]);
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




    if (have_button_shine) {


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









    if (this.have_CWall) {
      this.whichFloor_CWall = max(min(this.whichFloor_CWall, this.lastCTHouse_floorNum-2), 0);



      this.node_CW[0] = this.node[this.whichFloor_CWall+1].copy();
      this.node_CW[3] =  this.node[0].copy();

      for (let i=0; i<this.node_CWall_wall.length; i++) {
        let d = this.D_CWall/2.0;
        if (i == 1) {
          d = -this.D_CWall/2.0;
        }
        for (let j=0; j<this.node_CWall_wall[i].length; j++) {
          this.node_CWall_wall[i][j] = this.node_CW[j].copy().add(0, 0, d);
        }
      }



      //for (let i=0; i<this.node_CWall_teeth.length; i++) {
      //  for (let j=0; j<this.node_CWall_teeth[i].length; j++) {
      //    let h = j * this.H_teeth;
      //    for (let k=0; k<this.node_CWall_teeth[i][j].length; k++) {
      //      let rate = map(k, 0, this.node_CWall_teeth[i][j].length-1, 0, 1);
      //      this.node_CWall_teeth[i][j][k] = p5.Vector.sub(this.node_CWall_wall[i][1], this.node_CWall_wall[i][0]).mult(rate).add(this.node_CWall_wall[i][0]).add(0, -h, 0);
      //    }
      //  }
      //}




      if (this.have_CW_door) {
        let W_CW_door = gap_block * 0.8;
        let H_CW_door = max(real(55), (this.node_CWall_wall[0][3].y - this.node_CWall_wall[0][0].y) * 0.5);

        this.node_CW_door[0] = p5.Vector.sub(this.node_CWall_wall[0][3], this.center_CW_door).setMag(W_CW_door/2.0).add(this.center_CW_door).add(speed, 0, 0);
        this.node_CW_door[5] = p5.Vector.sub(this.node_CWall_wall[0][2], this.center_CW_door).setMag(W_CW_door/2.0).add(this.center_CW_door).add(speed, 0, 0);
        this.node_CW_door[1] = this.node_CW_door[0].copy().add(0, -H_CW_door*0.55, 0);
        this.node_CW_door[4] = this.node_CW_door[5].copy().add(0, -H_CW_door*0.55, 0);
        this.node_CW_door[2] = p5.Vector.sub(this.node_CWall_wall[0][3], this.center_CW_door).setMag(W_CW_door/2.0*0.6).add(this.center_CW_door).add(speed, -H_CW_door, 0);
        this.node_CW_door[3] = p5.Vector.sub(this.node_CWall_wall[0][2], this.center_CW_door).setMag(W_CW_door/2.0*0.6).add(this.center_CW_door).add(speed, -H_CW_door, 0);
      }
    }







    if (this.have_roof) {
      const center_roof = p5.Vector.add(this.node_rampart[2], this.node_rampart[0]).mult(0.5);
      for (let i=0; i<this.node_roof_wall.length; i++) {
        const h = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof_wall*i).add(center_roof);
        for (let j=0; j<this.node_roof_wall[i].length; j++) {
          this.node_roof_wall[i][j] = p5.Vector.sub(this.node_rampart[j], center_roof).setMag(sqrt(sq(this.W_roof)/2.0)).add(h);
        }
      }

      this.node_roof = p5.Vector.sub(this.node_rampart[3], this.node_wall[this.node_wall.length-1][3]).setMag(this.H_roof+this.H_roof_wall).add(center_roof);
    }






    if (this.have_billboardRoof) {
      for (let i=0; i<this.node_billboardRoof.length; i++) {
        const be = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(this.X_billboardRoof).add(this.node_wall[this.node_wall.length-1][3]);
        this.node_billboardRoof[i][0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], be).setMag(map(i, 0, this.node_billboardRoof.length-1, 0, this.W_billboardRoof)).add(be);
        this.node_billboardRoof[i][2] = p5.Vector.sub(this.node_wall[this.node_wall.length-2][3], this.node_wall[this.node_wall.length-3][3]).setMag(this.H_billboardRoof).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][1] = p5.Vector.sub(this.node_billboardRoof[i][2], this.node_billboardRoof[i][0]).mult(this.H_rate_billboardRoof_node1).add(this.node_billboardRoof[i][0]);
        this.node_billboardRoof[i][3] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(this.D_billboardRoof).add(this.node_billboardRoof[i][0]);
      }
    }
  };















  this.display = function() {
    let t, c1, c2;

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

    //noStroke();
    //beginShape(TRIANGLES);


    let t, c1, c2;



    //------------- ⬇F⬇ -------------
    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getRect(this.node_wall[i+1][3], this.node_wall[i+1][2], this.node_wall[i][2], this.node_wall[i][3]);
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
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3], c1, c1, c2, c2);
    //------------- ⬆U⬆ -------------



    for (let i=0; i<this.node_rampart.length; i++) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_rampart[i].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_rampart[(i+1)%this.node_rampart.length].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node_rampart[i], this.node_rampart[(i+1)%this.node_rampart.length], this.node_wall[this.node_wall.length-1][(i+1)%this.node_rampart.length], this.node_wall[this.node_wall.length-1][i], c1, c2, c2, c1);
    }


    for (let i=0; i<this.node_teeth.length; i++) {
      for (let k=0; k<this.node_teeth[i][0].length; k+=2) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_teeth[i][1][k].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_teeth[i][1][k+1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_teeth[i][1][k], this.node_teeth[i][1][k+1], this.node_teeth[i][0][k+1], this.node_teeth[i][0][k], c1, c2, c2, c1);
      }
    }




    //------------- F win -------------
    //fill(c_win);
    c1 = c_win;
    c2 = c_win;
    for (let i=0; i<this.node_winF.length; i++) {
      for (let j=0; j<this.node_winF[i].length; j++) {
        if (this.have_winF[i][j]) {
          if (have_button_shine) {
            t = constrain(map(this.time_winF[i][j], 0, 10, 0, 1), 0, 1);
            c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1)), t);
          }
          TRIANGLES_getRect_fill(this.node_winF[i][j][0], this.node_winF[i][j][1], this.node_winF[i][j][2], this.node_winF[i][j][3], c1);
        }
      }
    }
    //------------- L win -------------
    if (this.begin.x > -real(100)) {
      for (let i=0; i<this.node_winL.length; i++) {
        for (let j=0; j<this.node_winL[i].length; j++) {
          if (this.have_winL[i][j]) {
            if (have_button_shine) {
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
    //------------- R win -------------
    if (this.begin.x+this.W < real(100)) {
      for (let i=0; i<this.node_winR.length; i++) {
        for (let j=0; j<this.node_winR[i].length; j++) {
          if (this.have_winR[i][j]) {
            if (have_button_shine) {
              t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
              c1 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1)), t);
              t = constrain(map(this.time_winL[i][j], 0, 10, 0, 1), 0, 1);
              c2 = lerpColor(c_win, lerpColor(c_near, c_far, constrain(map(this.node_wall[0][1].z, skyline.z, 0, 1, 0), 0, 1)), t);
            }
            TRIANGLES_getRect_fill4(this.node_winR[i][j][0], this.node_winR[i][j][1], this.node_winR[i][j][2], this.node_winR[i][j][3], c1, c2, c2, c1);
          }
        }
      }
    }




    //------------- wall -------------
    if (this.have_CWall) {
      if (this.have_CW_door) {
        t = constrain(map(this.center_CW_door.z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));

        vertex(this.node_CWall_wall[0][3].x, this.node_CWall_wall[0][3].y, this.node_CWall_wall[0][3].z);
        vertex(this.node_CW_door[0].x, this.node_CW_door[0].y, this.node_CW_door[0].z);
        vertex(this.node_CWall_wall[0][0].x, this.node_CWall_wall[0][0].y, this.node_CWall_wall[0][0].z);

        vertex(this.node_CWall_wall[0][0].x, this.node_CWall_wall[0][0].y, this.node_CWall_wall[0][0].z);
        vertex(this.node_CW_door[0].x, this.node_CW_door[0].y, this.node_CW_door[0].z);
        vertex(this.node_CW_door[1].x, this.node_CW_door[1].y, this.node_CW_door[1].z);

        vertex(this.node_CWall_wall[0][0].x, this.node_CWall_wall[0][0].y, this.node_CWall_wall[0][0].z);
        vertex(this.node_CW_door[1].x, this.node_CW_door[1].y, this.node_CW_door[1].z);
        vertex(this.node_CW_door[2].x, this.node_CW_door[2].y, this.node_CW_door[2].z);

        vertex(this.node_CWall_wall[0][0].x, this.node_CWall_wall[0][0].y, this.node_CWall_wall[0][0].z);
        vertex(this.node_CW_door[2].x, this.node_CW_door[2].y, this.node_CW_door[2].z);
        vertex(this.node_CW_door[3].x, this.node_CW_door[3].y, this.node_CW_door[3].z);

        vertex(this.node_CW_door[3].x, this.node_CW_door[3].y, this.node_CW_door[3].z);
        vertex(this.node_CWall_wall[0][0].x, this.node_CWall_wall[0][0].y, this.node_CWall_wall[0][0].z);
        vertex(this.node_CWall_wall[0][1].x, this.node_CWall_wall[0][1].y, this.node_CWall_wall[0][1].z);

        vertex(this.node_CWall_wall[0][1].x, this.node_CWall_wall[0][1].y, this.node_CWall_wall[0][1].z);
        vertex(this.node_CW_door[3].x, this.node_CW_door[3].y, this.node_CW_door[3].z);
        vertex(this.node_CW_door[4].x, this.node_CW_door[4].y, this.node_CW_door[4].z);

        vertex(this.node_CWall_wall[0][1].x, this.node_CWall_wall[0][1].y, this.node_CWall_wall[0][1].z);
        vertex(this.node_CW_door[4].x, this.node_CW_door[4].y, this.node_CW_door[4].z);
        vertex(this.node_CW_door[5].x, this.node_CW_door[5].y, this.node_CW_door[5].z);

        vertex(this.node_CWall_wall[0][1].x, this.node_CWall_wall[0][1].y, this.node_CWall_wall[0][1].z);
        vertex(this.node_CW_door[5].x, this.node_CW_door[5].y, this.node_CW_door[5].z);
        vertex(this.node_CWall_wall[0][2].x, this.node_CWall_wall[0][2].y, this.node_CWall_wall[0][2].z);
      } else {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_CWall_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_CWall_wall[0][1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_CWall_wall[0][0], this.node_CWall_wall[0][1], this.node_CWall_wall[0][2], this.node_CWall_wall[0][3], c1, c2, c2, c1);
      }
      //for (let k=0; k<this.node_CWall_teeth[0][0].length; k+=2) {
      //  c1 = lerpColor(c_near, c_far, constrain(map(this.node_CWall_teeth[0][1][k].z, skyline.z, 0, 1, 0), 0, 1));
      //  c2 = lerpColor(c_near, c_far, constrain(map(this.node_CWall_teeth[0][1][k+1].z, skyline.z, 0, 1, 0), 0, 1));
      //  TRIANGLES_getRect_fill4(this.node_CWall_teeth[0][1][k], this.node_CWall_teeth[0][1][k+1], this.node_CWall_teeth[0][0][k+1], this.node_CWall_teeth[0][0][k], c1, c2, c2, c1);
      //}



      const num_CWall_teeth = floor(map(p5.Vector.dist(this.node_CW[2], this.node[0]), real(100), real(200), 3, 5));
      let node_CWall_teeth = new Array(2);
      for (let i=0; i<node_CWall_teeth.length; i++) {
        node_CWall_teeth[i] = Array.from(Array(2), () => new Array(num_CWall_teeth * 2));
        for (let j=0; j<node_CWall_teeth[i].length; j++) {
          let h = j * this.H_teeth;
          for (let k=0; k<node_CWall_teeth[i][j].length; k++) {
            let rate = map(k, 0, node_CWall_teeth[i][j].length-1, 0, 1);
            node_CWall_teeth[i][j][k] = p5.Vector.sub(this.node_CWall_wall[i][1], this.node_CWall_wall[i][0]).mult(rate).add(this.node_CWall_wall[i][0]).add(0, -h, 0);
          }
        }
      }
      for (let k=0; k<node_CWall_teeth[0][0].length; k+=2) {
        c1 = lerpColor(c_near, c_far, constrain(map(node_CWall_teeth[0][1][k].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(node_CWall_teeth[0][1][k+1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(node_CWall_teeth[0][1][k], node_CWall_teeth[0][1][k+1], node_CWall_teeth[0][0][k+1], node_CWall_teeth[0][0][k], c1, c2, c2, c1);
      }
    }



    if (this.have_roof) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1));
      if (this.state_roof == 0) {
        TRIANGLES_getRect_fill(this.node_roof_wall[1][3], this.node_roof_wall[1][2], this.node_roof_wall[0][2], this.node_roof_wall[0][3], c1);
      } else if (this.state_roof == 1) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1));
        fill(c1);
        TRIANGLES_getLine_weightToR(this.node_roof_wall[1][3], this.node_roof_wall[0][3], real(5));
        TRIANGLES_getLine_weightToL(this.node_roof_wall[1][2], this.node_roof_wall[0][2], real(5));
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][0].z, skyline.z, 0, 1, 0), 0, 1));
        fill(c1);
        TRIANGLES_getLine_weightToR(this.node_roof_wall[1][0], this.node_roof_wall[0][0], real(5));
        TRIANGLES_getLine_weightToL(this.node_roof_wall[1][1], this.node_roof_wall[0][1], real(5));


        TRIANGLES_getTriangle_fill3(this.node_roof_wall[1][0], this.node_roof_wall[1][1], this.node_roof, c1, c1, c1);
      }
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1));
      const c3 = lerpColor(c_near, c_far, constrain(map(this.node_roof.z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getTriangle_fill3(this.node_roof_wall[1][3], this.node_roof_wall[1][2], this.node_roof, c1, c1, c3);


      if (this.node_roof_wall[1][3].x > -real(100)  ||  this.state_roof == 1) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][3].z, skyline.z, 0, 1, 0), 0, 1));
        if (this.state_roof == 0) {
          TRIANGLES_getRect_fill4(this.node_roof_wall[1][0], this.node_roof_wall[1][3], this.node_roof_wall[0][3], this.node_roof_wall[0][0], c1, c2, c2, c1);
        } 
        TRIANGLES_getTriangle_fill3(this.node_roof_wall[1][0], this.node_roof_wall[1][3], this.node_roof, c1, c2, c3);
      }
      if (this.node_roof_wall[1][2].x < real(100)  ||  this.state_roof == 1) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][2].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_roof_wall[1][1].z, skyline.z, 0, 1, 0), 0, 1));
        if (this.state_roof == 0) {
          TRIANGLES_getRect_fill4(this.node_roof_wall[1][2], this.node_roof_wall[1][1], this.node_roof_wall[0][1], this.node_roof_wall[0][2], c1, c2, c2, c1);
        }
        TRIANGLES_getTriangle_fill3(this.node_roof_wall[1][2], this.node_roof_wall[1][1], this.node_roof, c1, c2, c3);
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

    /*stroke(c_info2);
     strokeWeight(real(1.25));
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
     */
    //noFill();
    //stroke(c_info2);
    //strokeWeight(real(2));
    //beginShape(LINES);
    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3]);
    }
    for (let i=0; i<this.node_wall.length-1; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        LINES_getLine(this.node_wall[i][j], this.node_wall[i+1][j]);
      }
    }


    LINES_getRect(this.node_rampart[0], this.node_rampart[1], this.node_rampart[2], this.node_rampart[3]);
    if (this.have_CWall) {
      LINES_getRect(this.node_CWall_wall[0][0], this.node_CWall_wall[0][1], this.node_CWall_wall[0][2], this.node_CWall_wall[0][3]);
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
    //endShape();
  };
}
