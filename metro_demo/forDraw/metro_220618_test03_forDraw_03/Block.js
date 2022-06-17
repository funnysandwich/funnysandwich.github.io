function Block(begin, W, D, index_z, index, isHouse, isRiver, isMountain, isSea, isRail, isNightMarket) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.index_z = index_z;
  this.index = index;
  this.isHouse = isHouse;
  this.isRiver = isRiver;
  this.isMountain = isMountain;
  this.isSea = isSea;
  this.isRail = isRail;
  this.isNightMarket = isNightMarket;
  if (this.isSea || this.isMountain) {
    this.isNightMarket = false;
  }
  this.dead = false;
  this.var_easing1 = random(0.075, 0.125);


  this.W_road_hor = gap_block * 0.5;
  this.W_road_ver = gap_block * map(noise(floor(index/6)*10), 0, 1, 0.3, 0.9);





  //if (this.index_z == 0  &&  random(1) >= stateVar_floor[state_floor][0]) {
  //  this.isHouse = false;
  //}


  if (this.isHouse) {
    this.num_house = floor(random(1, 3));
    //if (this.index_z == 0 && stateVar_floor[state_floor][0] < 0.5) {
    //  this.num_house = 1;
    //}


    this.houses = [];
    this.W_houses = new Array(this.num_house);


    this.is_normalHouse = new Array(this.num_house);
    this.is_constrHouse = new Array(this.num_house);
    this.is_catHouse = new Array(this.num_house);
    this.is_CTowerHouse = new Array(this.num_house);
    this.is_firewatchHouse = new Array(this.num_house);
    this.is_blockHouse = new Array(this.num_house);
    this.is_dottedHouse = new Array(this.num_house);
    this.is_UGHouse = new Array(this.num_house);




    if (this.index_z != 0  ||  random(1) < stateVar_floor[state_floor][0]) {

      let be = new Array(this.num_house);
      let floorNum = new Array(this.num_house);
      let d = new Array(this.num_house);
      for (let i=0; i<this.num_house; i++) {
        this.is_constrHouse[i] = false;
        this.is_catHouse[i] = false;
        this.is_CTowerHouse[i] = false;
        this.is_firewatchHouse[i] = false;
        this.is_blockHouse[i] = false;
        this.is_dottedHouse[i] = false;
        this.is_UGHouse[i] = false;


        let sum = rate_normalHouse + rate_constrHouse + rate_catHouse + rate_CTowerHouse + rate_firewatchHouse + rate_blockHouse + rate_dottedHouse + rate_UGHouse;
        sum = max(sum, 1);
        const real_rate_normalHouse = rate_normalHouse / sum;
        const real_rate_constrHouse = rate_constrHouse / sum;
        const real_rate_catHouse = rate_catHouse / sum;
        const real_rate_CTowerHouse = rate_CTowerHouse / sum;
        const real_rate_firewatchHouse = rate_firewatchHouse / sum;
        const real_rate_blockHouse = rate_blockHouse / sum;
        const real_rate_dottedHouse = rate_dottedHouse / sum;
        const real_rate_UGHouse = rate_UGHouse / sum;

        const var_rate = random(1);


        if (var_rate < real_rate_normalHouse) {
          this.is_normalHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse) {
          this.is_constrHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse) {
          this.is_catHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse + real_rate_CTowerHouse) {
          this.is_CTowerHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse + real_rate_CTowerHouse + real_rate_firewatchHouse) {
          this.is_firewatchHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse + real_rate_CTowerHouse + real_rate_firewatchHouse + real_rate_blockHouse) {
          this.is_blockHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse + real_rate_CTowerHouse + real_rate_firewatchHouse + real_rate_blockHouse + real_rate_dottedHouse) {
          this.is_dottedHouse[i] = true;
        } else if (var_rate < real_rate_normalHouse + real_rate_constrHouse + real_rate_catHouse + real_rate_CTowerHouse + real_rate_firewatchHouse + real_rate_blockHouse + real_rate_dottedHouse + real_rate_UGHouse) {
          this.is_UGHouse[i] = true;
        }



        //this.is_constrHouse[i] = random(1) < rate_constrHouse;
        //this.is_catHouse[i] = random(1) < rate_catHouse;
        //this.is_CTowerHouse[i] = random(1) < rate_CTowerHouse;
        //this.is_firewatchHouse[i] = random(1) < rate_firewatchHouse;
        //this.is_blockHouse[i] = random(1) < rate_blockHouse;

        if (this.num_house == 1) {
          this.W_houses[0] = random(min(this.W, real(500))*0.35, min(this.W, real(500)));
          d[i] = random(this.D*0.5, this.D*0.99);
          if (this.is_CTowerHouse[i]) {
            this.W_houses[i] = real(random(100, 200));
            d[i] = this.W_houses[i];
          } else if (this.is_firewatchHouse[i]) {
            this.W_houses[i] = constrain(random(this.W*0.35, this.W), real(200), real(300));
            d[i] = this.W_houses[i];
          } else if (this.is_blockHouse[i]) {
            this.W_houses[i] = real(random(150, 300));
            d[i] = real(random(30, 75));
          } else if (this.is_UGHouse[i]) {
            this.W_houses[i] *= 0.5;
            d[i] *= 0.5;
          }
          floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
          be[i] = createVector(this.begin.x + random(0, this.W-this.W_houses[0]), this.begin.y, this.begin.z + random(0, this.D-d[i]));
          if (this.index_z == 5) {
            if (!this.is_blockHouse[i]) {
              d[i] = this.D * 0.5;
            }
            be[i].z = this.begin.z + this.D - d[i];
          }
        } else {
          if (i == 0) {
            this.W_houses[0] = min(random(min(this.W, real(500))*0.25, min(this.W, real(500))*0.55), real(500));
            d[i] = random(this.D*0.5, this.D*0.99);
            if (this.is_CTowerHouse[i]) {
              this.W_houses[i] = real(random(100, 200));
              d[i] = this.W_houses[i];
            } else if (this.is_firewatchHouse[i]) {
              this.W_houses[i] = real(random(200, 250));
              d[i] = this.W_houses[i];
            } else if (this.is_blockHouse[i]) {
              this.W_houses[i] = real(random(150, 300));
              d[i] = real(random(30, 75));
            } else if (this.is_UGHouse[i]) {
              this.W_houses[i] *= 0.5;
              d[i] *= 0.5;
            }
            floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
            be[i] = createVector(this.begin.x + random(0, max(this.W/2.0-this.W_houses[0], 0)), this.begin.y, this.begin.z + random(0, this.D - d[i]));
            if (this.index_z == 5) {
              if (!this.is_blockHouse[i]) {
                d[i] = this.D * 0.5;
              }
              be[i].z = this.begin.z + this.D - d[i];
            }
          } else {
            this.W_houses[1] = max(random(min(this.W-this.W_houses[0]-real(10), real(500))*0.5, min(this.W-this.W_houses[0]-real(10), real(500))), real(100));
            d[i] = random(this.D*0.5, this.D*0.99);
            if (this.is_CTowerHouse[i]) {
              this.W_houses[i] = real(random(100, 200));
              d[i] = this.W_houses[i];
            } else if (this.is_firewatchHouse[i]) {
              this.W_houses[i] = real(random(200, 250));
              d[i] = this.W_houses[i];
            } else if (this.is_blockHouse[i]) {
              this.W_houses[i] = real(random(150, 300));
              d[i] = real(random(30, 75));
            } else if (this.is_UGHouse[i]) {
              this.W_houses[i] *= 0.5;
              d[i] *= 0.5;
            }
            floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
            be[i] = createVector(this.begin.x+this.W-this.W_houses[i]-random(0, max(this.W/2.0-this.W_houses[i], 0)), this.begin.y, this.begin.z + random(0, this.D - d[i]));
            if (this.index_z == 5) {
              if (!this.is_blockHouse[i]) {
                d[i] = this.D * 0.5;
              }
              be[i].z = this.begin.z + this.D - d[i];
            }
          }
        }
      }





      for (let i=0; i<this.num_house; i++) {
        if (this.num_house == 1) {
          let have_CWall = false;
          if (open_CTowerHouse                         &&//城墙蔓延
            open_CWall                                 &&
            this.index > 5                             &&
            blocks[this.index-6].isHouse               &&
            blocks[this.index-6].houses.length > 0     &&
            blocks[this.index-6].houses[0].is_CTower   &&
            blocks[this.index-6].houses[0].begin.x - (be[i].x+this.W_houses[i])  >  real(100)  &&
            random(1) < rate_CWall                     ) {
            this.is_constrHouse[i] = false;
            this.is_catHouse[i] = false;
            this.is_CTowerHouse[i] = true;
            this.is_firewatchHouse[i] = false;
            this.is_blockHouse[i] = false;
            this.is_dottedHouse[i] = false;
            this.is_UGHouse[i] = false;
            have_CWall = true;
            this.W_houses[i] = real(random(100, 200));
            d[i] = this.W_houses[i];
          }

          if (this.is_constrHouse[i]) {
            this.houses.push(new ConstrHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else if (this.is_catHouse[i]) {
            this.houses.push(new CatHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else if (this.is_CTowerHouse[i]) {
            let lastCTHouse_floorNum = 0;
            let lastCTHouse_node0 = createVector(0, 0, 0);
            if (have_CWall) {
              lastCTHouse_floorNum = blocks[this.index-6].houses[0].floor_num;
              lastCTHouse_node0 = blocks[this.index-6].houses[0].node[0].copy();
            }
            this.houses.push(new CastleTowerHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index, have_CWall, lastCTHouse_floorNum, lastCTHouse_node0));
          } else if (this.is_firewatchHouse[i]) {
            this.houses.push(new FirewatchHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else if (this.is_blockHouse[i]) {
            this.houses.push(new BlockHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else if (this.is_dottedHouse[i]) {
            this.houses.push(new DottedHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else if (this.is_UGHouse[i]) {
            this.houses.push(new UnderGroundHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          } else {
            this.houses.push(new House(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
          }
        } else {
          if (i == 0) {
            let have_CWall = false;
            if (!this.is_constrHouse[i +1]               &&//城墙蔓延
              !this.is_catHouse[i +1]                    &&
              this.is_CTowerHouse[i +1]                  &&
              be[i +1].x - (be[i].x+this.W_houses[0])  >  real(100)  &&
              random(1) < rate_CWall                     ) {
              this.is_constrHouse[i] = false;
              this.is_catHouse[i] = false;
              this.is_CTowerHouse[i] = true;
              this.is_firewatchHouse[i] = false;
              this.is_blockHouse[i] = false;
              this.is_UGHouse[i] = false;
              have_CWall = true;
              this.W_houses[i] = real(random(100, 200));
              d[i] = this.W_houses[i];
            }

            if (this.is_constrHouse[i]) {
              this.houses.push(new ConstrHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_catHouse[i]) {
              this.houses.push(new CatHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_CTowerHouse[i]) {
              let lastCTHouse_floorNum = 0;
              let lastCTHouse_node0 = createVector(0, 0, 0);
              if (have_CWall) {
                lastCTHouse_floorNum = floorNum[i +1];
                lastCTHouse_node0 = be[i +1].copy().add(this.W_houses[i +1]/2.0, 0, this.W_houses[i +1]/2.0);
              }
              this.houses.push(new CastleTowerHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index, have_CWall, lastCTHouse_floorNum, lastCTHouse_node0));
            } else if (this.is_firewatchHouse[i]) {
              this.houses.push(new FirewatchHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_blockHouse[i]) {
              this.houses.push(new BlockHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_dottedHouse[i]) {
              this.houses.push(new DottedHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_UGHouse[i]) {
              this.houses.push(new UnderGroundHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else {
              this.houses.push(new House(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            }
          } else {
            let have_CWall = false;
            if (open_CTowerHouse                         &&//城墙蔓延
              open_CWall                                 &&
              this.index > 5                             &&
              blocks[this.index-6].isHouse               &&
              blocks[this.index-6].houses.length > 0     &&
              blocks[this.index-6].houses[0].is_CTower   &&
              blocks[this.index-6].houses[0].begin.x - (be[i].x+this.W_houses[i])  >  real(100)  &&
              random(1) < rate_CWall                     ) {
              this.is_constrHouse[i] = false;
              this.is_catHouse[i] = false;
              this.is_CTowerHouse[i] = true;
              this.is_firewatchHouse[i] = false;
              this.is_blockHouse[i] = false;
              this.is_dottedHouse[i] = false;
              this.is_UGHouse[i] = false;
              have_CWall = true;
              this.W_houses[i] = real(random(100, 200));
              d[i] = this.W_houses[i];
            }

            if (this.is_constrHouse[i]) {
              this.houses.push(new ConstrHouse(be[i], this.W_houses[i], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_catHouse[i]) {
              this.houses.push(new CatHouse(be[i], this.W_houses[i], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_CTowerHouse[i]) {
              let lastCTHouse_floorNum = 0;
              let lastCTHouse_node0 = createVector(0, 0, 0);
              if (have_CWall) {
                lastCTHouse_floorNum = blocks[this.index-6].houses[0].floor_num;
                lastCTHouse_node0 = blocks[this.index-6].houses[0].node[0].copy();
              }
              this.houses.push(new CastleTowerHouse(be[i], this.W_houses[i], d[i], H_floor, floorNum[i], this.index_z, this.index, have_CWall, lastCTHouse_floorNum, lastCTHouse_node0));
            } else if (this.is_firewatchHouse[i]) {
              this.houses.push(new FirewatchHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_blockHouse[i]) {
              this.houses.push(new BlockHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_dottedHouse[i]) {
              this.houses.push(new DottedHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else if (this.is_UGHouse[i]) {
              this.houses.push(new UnderGroundHouse(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index_z, this.index));
            } else {
              this.houses.push(new House(be[i], this.W_houses[i], d[i], H_floor, floorNum[i], this.index_z, this.index));
            }
          }
        }
      }
    }
  }




  this.is_coverRoadHor = random(0, 1) < 0.5;
  if (this.isRiver  ||  this.isMountain    ||  this.isSea  ||  this.isNightMarket) {
    this.is_coverRoadHor = true;
  }

  this.node_coverRoadHor = new Array(4);

  this.node_lampB = Array.from(Array(floor(map(this.W, real(100)*5, real(100)*12, 2, 6))), () => new Array(2+1));
  this.H_lampB = new Array(this.node_lampB.length);
  this.H_lampB_target = new Array(this.node_lampB.length);
  this.W_lampB_fillet = new Array(this.node_lampB.length);
  this.Z_lampB_tilt = new Array(this.node_lampB.length);
  this.show_lampB = new Array(this.node_lampB.length);

  this.node_lampF = Array.from(Array(this.node_lampB.length), () => new Array(2+1));
  this.H_lampF = new Array(this.node_lampF.length);
  this.H_lampF_target = new Array(this.node_lampF.length);
  this.W_lampF_fillet = new Array(this.node_lampF.length);
  this.Z_lampF_tilt = new Array(this.node_lampF.length);
  this.show_lampF = new Array(this.node_lampB.length);



  if (this.is_coverRoadHor) {
    this.node_coverRoadHor[0] = this.begin.copy().add(-gap_block*0.5, real(0.05), -gap_block);
    this.node_coverRoadHor[1] = this.begin.copy().add(this.W+gap_block*0.5, real(0.05), -gap_block);
    this.node_coverRoadHor[2] = this.begin.copy().add(this.W+gap_block*0.5, real(0.05), 0);
    this.node_coverRoadHor[3] = this.begin.copy().add(-gap_block*0.5, real(0.05), 0);
  } 
  //else {
  for (let i=0; i<this.node_lampB.length; i++) {
    this.H_lampB_target[i] = real(random(65, 100));
    this.H_lampB[i] = this.H_lampB_target[i];
    this.W_lampB_fillet[i] = this.H_lampB_target[i] * random(0.1, 0.25);
    this.Z_lampB_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -30, 20));

    let x = map(i, 0-1, this.node_lampB.length, this.begin.x, this.begin.x+this.W);
    this.node_lampB[i][0] = createVector(x, this.begin.y, this.begin.z-gap_block*0);
    this.node_lampB[i][1] = createVector(x, this.begin.y-this.H_lampB[i], this.begin.z-gap_block*0 +this.Z_lampB_tilt[i]);

    for (let j=2; j<this.node_lampB[i].length; j++) {
      let z_filletB = cos(map(j, 2-1, this.node_lampB[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0) - (this.W_lampB_fillet[i]/2.0);
      let y_filletB = sin(map(j, 2-1, this.node_lampB[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0);
      this.node_lampB[i][j] = createVector(0, y_filletB, z_filletB).add(this.node_lampB[i][1]);
    }

    this.show_lampB[i] = random(1) < 0.5;
    if (index_z == 5) {
      this.show_lampB[i] = false;
    }
  }
  //}





  //if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
  for (let i=0; i<this.node_lampF.length; i++) {
    this.H_lampF_target[i] = real(random(65, 100));
    this.H_lampF[i] = this.H_lampF_target[i];
    this.W_lampF_fillet[i] = this.H_lampF_target[i] * random(0.1, 0.25);
    this.Z_lampF_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));

    let x = map(i, 0-1, this.node_lampF.length, this.begin.x, this.begin.x+this.W);
    this.node_lampF[i][0] = createVector(x, this.begin.y, this.begin.z+this.D-gap_block*0);
    this.node_lampF[i][1] = this.node_lampF[i][0].copy().add(0, -this.H_lampF[i], this.Z_lampF_tilt[i]);

    for (let j=2; j<this.node_lampF[i].length; j++) {
      let z_filletF = cos(map(j, 2-1, this.node_lampF[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0) + (this.W_lampF_fillet[i]/2.0);
      let y_filletF = sin(map(j, 2-1, this.node_lampF[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0);
      this.node_lampF[i][j] = createVector(0, y_filletF, z_filletF).add(this.node_lampF[i][1]);
    }

    this.show_lampF[i] = random(1) < 0.5;
  }
  //}






  this.is_coverRoadVer = random(0, 1) < 0.5;
  if (this.isSea  ||  this.isMountain) {
    this.is_coverRoadVer = true;
  }



  this.node_coverRoadVer = new Array(4);
  this.node_coverRoadVer[0] = this.begin.copy().add(-gap_block, -real(0.05), 0);
  this.node_coverRoadVer[1] = this.begin.copy().add(0, -real(0.05), 0);
  this.node_coverRoadVer[2] = this.begin.copy().add(0, -real(0.05), this.D);
  this.node_coverRoadVer[3] = this.begin.copy().add(-gap_block, -real(0.05), this.D);











  if (this.isRiver  &&  this.index_z == 0) {
    this.river = new River(this.begin, this.W);
  }



  if (this.isMountain) {
    //this.mountain = new Mountain();
  }



  if (this.isSea) {
    this.isSkerry = false;
    if (this.index_z >= 4) {
      if (random(1) < rate_skerry) {
        this.isSkerry = true;
      }
    } else if (this.index_z == 3) {
      if (random(1) < rate_skerry*0.5) {
        this.isSkerry = true;
      }
    } else {
      this.isSkerry = false;
    }
    if (this.isRail) {
      this.isSkerry = false;
    }
    if (this.isSkerry) {
      const w = random(real(150), max(this.W*1.25, real(151)));
      const d = random(real(150), max(this.D*0.5, real(151)));
      this.skerry = new Skerry(createVector(this.begin.x+random(-gap_block, this.W-w), this.begin.y, this.begin.z+random(0, this.D-d*1.2)), w, d);
    }

    if (this.index_z == 5) {
      const detail = 5;
      this.sea = new Sea(createVector(this.begin.x+this.W, this.begin.y, this.begin.z), this.W, detail, floor(count_blocks/6) * (detail-1));
    }
  }




  if (this.isRail) {
    this.num_pier = 1;
    if (this.W > real(600)) {
      this.num_pier = floor(random(1.5, 3));
    }
    this.W_pier = real(random(100, 150));
    this.node_pier = new Array(this.num_pier);
    for (let i=0; i<this.node_pier.length; i++) {
      const gap = (this.W-(this.W_pier*this.num_pier)) / (1+this.num_pier);
      const centerX_pier = (i+1)*gap  +  (this.W_pier/2.0)  +  (this.W_pier*i);      
      this.node_pier[i] = Array.from(Array(2), () => new Array(6));
      for (let j=0; j<this.node_pier[i].length; j++) {
        const y = -(j*H_pier[this.index_z]);
        for (let k=0; k<this.node_pier[i][j].length; k++) {
          const x = cos(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
          const z = sin(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
          this.node_pier[i][j][k] = this.begin.copy().add(centerX_pier+x, y, this.D/2.0 + z);
        }
      }
    }
  }




  if (this.isNightMarket) {

    this.stall = [];
    this.popupTent = [];
    for (let i=0; i<3; i++) {
      const w = real(75);
      const z = map(i, 0, 3, this.begin.z-gap_block, this.begin.z+this.D);
      const d = abs((this.begin.z-gap_block) - (this.begin.z+this.D)) / 3.0;
      if (random(1)<0.75) {
        this.stall.push(new Stall(createVector(this.begin.x+real(50), this.begin.y, z), w, d, true));
      } else {
        if (random(1)<0.5) {
          this.popupTent.push(new PopupTent(createVector(this.begin.x+real(25), this.begin.y, z), real(150)));
        }
      }
      if (random(1)<0.75) {
        this.stall.push(new Stall(createVector(this.begin.x+this.W-real(50)-w, this.begin.y, z), w, d, false));
      } else {
        if (random(1)<0.5) {
          this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W-real(25)-real(150), this.begin.y, z), real(150)));
        }
      }

      if (!this.isRail) {
        if (this.W < real(700)) {
          if (random(1)<0.75) {
            this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0-w/2.0, this.begin.y, z), w, d, true));
          } else {
            if (random(1)<0.5) {
              this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0-real(150)/2.0, this.begin.y, z), real(150)));
            }
          }
        } else {
          if (random(1)<0.75) {
            this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0-w-real(15), this.begin.y, z), w, d, false));
          } else {
            if (random(1)<0.5) {
              this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0-real(150), this.begin.y, z), real(150)));
            }
          }
          if (random(1)<0.75) {
            this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0+real(15), this.begin.y, z), w, d, true));
          } else {
            if (random(1)<0.5) {
              this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0, this.begin.y, z), real(150)));
            }
          }
        }
      }
    }

    let num_gate = 1;
    if (this.W >= real(700)) {
      num_gate = 2;
    }
    this.show_gate = new Array(num_gate);
    this.X_move_gate = Array.from(Array(num_gate), () => new Array(2));
    this.H_gate_target = Array.from(Array(num_gate), () => new Array(2));
    this.H_gate = Array.from(Array(num_gate), () => new Array(2));
    this.node_gate = Array.from(Array(num_gate), () => new Array(4));//0:LD 1:LU 2:RD 3:RU
    for (let i=0; i<this.node_gate.length; i++) {
      this.show_gate[i] = random(1) < map(this.index_z, 0, 5, 0.25, 0.9);
      this.H_gate_target[i][0] = real(random(125, 200));
      this.H_gate_target[i][1] = this.H_gate_target[i][0] + real(random(-50, 50));
      this.H_gate[i][0] = 0;
      this.H_gate[i][1] = 0;
      this.X_move_gate[i][0] = real(random(-20, 20));
      this.X_move_gate[i][1] = real(random(-20, 20));
      this.node_gate[i][0] = createVector(this.begin.x+real(50) + (this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
      this.node_gate[i][1] = this.node_gate[i][0].copy().add(this.X_move_gate[i][0], -this.H_gate[i][0], 0);
      this.node_gate[i][2] = createVector(this.begin.x+(this.W/this.node_gate.length)-real(50) +(this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
      this.node_gate[i][3] = this.node_gate[i][2].copy().add(this.X_move_gate[i][1], -this.H_gate[i][1], 0);
    }
    this.Y_add_rope = new Array(num_gate);
    this.node_gate_rope = Array.from(Array(num_gate), () => new Array(5));
    for (let i=0; i<this.node_gate_rope.length; i++) {
      this.Y_add_rope[i] = real(random(15, 40));
      for (let j=0; j<this.node_gate_rope[i].length; j++) {
        const be = this.node_gate[i][1].copy();
        const en = this.node_gate[i][3].copy();
        const x = lerp(be.x, en.x, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
        let y = lerp(be.y, en.y, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
        const z = lerp(be.z, en.z, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
        y += sin(map(j, 0, this.node_gate_rope[i].length-1, 0, PI))*this.Y_add_rope[i];
        this.node_gate_rope[i][j] = createVector(x, y, z);
      }
    }



    if (open_paifang) {
      this.NM_paifang = [];
      for (let i=0; i<this.node_gate.length; i++) {
        if (!this.show_gate[i]) {
          if (random(1) < map(this.index_z, 0, 5, 0.5, 0.001)/(1+this.NM_paifang.length*2)) {
            const w = min(this.W / this.node_gate.length * 0.9, real(350));
            this.NM_paifang.push(new Paifang(createVector(this.begin.x  + (this.W/this.node_gate.length-w)/2.0  +  i*(this.W/this.node_gate.length), this.begin.y, this.begin.z -gap_block), w));
          }
        }
      }
    }
  }






  this.count_houseChange_to_open_billMc = 0;

  this.blockMiniVer = [];

  if (!this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  !this.isRail  &&  !this.isNightMarket) {
    if (this.houses.length > 0) {

      let be_BMV = this.begin.copy();
      let w_BMV = this.houses[0].begin.x - be_BMV.x;
      if (w_BMV > real(75)) {
        this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 0, this.index_z));
      }


      if (this.houses.length == 2) {
        be_BMV = createVector(this.houses[0].begin.x+this.houses[0].W, this.begin.y, this.begin.z);
        w_BMV = this.houses[1].begin.x - be_BMV.x;
        if (w_BMV > real(75)) {
          this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 1, this.index_z));
        }
      }

      be_BMV = createVector(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W, this.begin.y, this.begin.z);
      w_BMV = this.begin.x+this.W - be_BMV.x;
      if (w_BMV > real(75)) {
        this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 2, this.index_z));
      }
    }
  } 
  if (!this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  this.isRail  &&  !this.isNightMarket) {
    let be_BMV = this.begin.copy();
    let w_BMV = this.W;
    let d_BMV = real(50);
    if (random(1) < 0.5) {
      this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, d_BMV, 1, this.index_z));
    }


    if (random(1) < 0.5) {
      be_BMV = this.begin.copy().add(0, 0, this.D-real(50));
      w_BMV = this.W;
      d_BMV = real(50);
      this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, d_BMV, 1, this.index_z));
    }
  }










  /*this.isFair = false;
   if (open_fair  &&  !this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  !this.isRail  &&  !this.isNightMarket) {
   if (this.index_z == 0) {
   this.isFair = false;
   } else if (this.index_z == 1) {
   this.isFair = random(1) < rate_fair *1.5;
   } else if (this.index_z == 2) {
   this.isFair = random(1) < rate_fair;
   } else if (this.index_z == 3) {
   this.isFair = random(1) < rate_fair *0.5;
   } else {
   this.isFair = false;
   }
   }
   
   
   if (this.isFair) {
   this.isHouse = false;
   const num_hor = floor(this.W / real(200));
   const num_ver = floor(this.D / real(200));
   this.popupTent = [];
   for (let i=0; i<num_ver; i++) {
   for (let j=0; j<num_hor; j++) {
   const x = map(j, 0, num_hor, 0, this.W);
   const z = map(i, 0, num_ver, 0, this.D);
   this.popupTent.push(new PopupTent(this.begin.copy().add(x, 0, z), real(200)));
   }
   }
   }
   */
   
   
   
  /*
   this.isTree = false;
   if (open_tree  &&  !this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  !this.isRail  &&  !this.isNightMarket  &&  !this.isFair  &&
   random(1) < rate_tree) {
   // if (this.index_z != 0  ||   random(1) < stateVar_floor[state_floor][0]) {
   this.isTree = true;
   // }
   }
   
   
   if (this.isTree) {
   this.isHouse = false;
   const num_hor = floor(this.W / real(200));
   const num_ver = floor(this.D / real(200));
   this.tree = [];
   for (let i=0; i<num_ver; i++) {
   for (let j=0; j<num_hor; j++) {
   const x = map(j, 0, num_hor, 0, this.W);
   const z = map(i, 0, num_ver, 0, this.D);
   this.tree.push(new Tree(this.begin.copy().add(x, 0, z), real(200), index_z));
   }
   }
   }
   */







  //-----------------------------------------------------------------------
  //------------------------------⬇ change ⬇------------------------------
  //-----------------------------------------------------------------------


  this.change = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.075, 0.125);

    if (state_click == 0) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            this.houses[i].open_change = true;
          }
        }
      }


      this.is_coverRoadHor = random(0, 1) < 0.5;
      this.is_coverRoadVer = random(0, 1) < 0.5;


      if (this.isRiver) {
        this.is_coverRoadHor = true;
        if (this.index_z == 0) {
          this.river.change();
        }
      }




      if (this.isMountain) {
        this.is_coverRoadHor = true;
        this.is_coverRoadVer = true;
        //this.mountain.change();
      }



      if (this.isSea) {
        this.is_coverRoadHor = true;
        this.is_coverRoadVer = true;

        this.isSkerry = false;
        if (this.index_z >= 4) {
          if (random(1) < rate_skerry) {
            this.isSkerry = true;
          }
        } else if (this.index_z == 3) {
          if (random(1) < rate_skerry*0.5) {
            this.isSkerry = true;
          }
        } else {
          this.isSkerry = false;
        }
        if (this.isRail) {
          this.isSkerry = false;
        }
        if (this.isSkerry) {
          const w = random(real(150), max(this.W*1.25, real(151)));
          const d = random(real(150), max(this.D*0.5, real(151)));
          this.skerry = new Skerry(createVector(this.begin.x+random(-gap_block, this.W-w), this.begin.y, this.begin.z+random(0, this.D-d*1.2)), w, d);
        }
        if (this.index_z == 5) {
          this.sea.change();
        }
      }




      if (this.isRail) {
        this.num_pier = 1;
        if (this.W > real(600)) {
          this.num_pier = floor(random(1.5, 3));
        }
        this.W_pier = real(random(100, 150));
        this.node_pier = new Array(this.num_pier);
        for (let i=0; i<this.node_pier.length; i++) {
          const gap = (this.W-(this.W_pier*this.num_pier)) / (1+this.num_pier);
          const centerX_pier = (i+1)*gap  +  (this.W_pier/2.0)  +  (this.W_pier*i);      
          this.node_pier[i] = Array.from(Array(2), () => new Array(6));
          for (let j=0; j<this.node_pier[i].length; j++) {
            const y = -(j*H_pier[this.index_z]);
            for (let k=0; k<this.node_pier[i][j].length; k++) {
              const x = cos(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
              const z = sin(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
              this.node_pier[i][j][k] = this.begin.copy().add(centerX_pier+x, y, this.D/2.0 + z);
            }
          }
        }


        this.change_blockMiniVer();
      }




      if (this.isNightMarket) {
        this.is_coverRoadHor = true;

        this.stall = [];
        this.popupTent = [];
        for (let i=0; i<3; i++) {
          const w = real(75);
          const z = map(i, 0, 3, this.begin.z-gap_block, this.begin.z+this.D);
          const d = abs((this.begin.z-gap_block) - (this.begin.z+this.D)) / 3.0;
          if (random(1)<0.75) {
            this.stall.push(new Stall(createVector(this.begin.x+real(50), this.begin.y, z), w, d, true));
          } else {
            if (random(1)<0.5) {
              this.popupTent.push(new PopupTent(createVector(this.begin.x+real(25), this.begin.y, z), real(150)));
            }
          }
          if (random(1)<0.75) {
            this.stall.push(new Stall(createVector(this.begin.x+this.W-real(50)-w, this.begin.y, z), w, d, false));
          } else {
            if (random(1)<0.5) {
              this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W-real(25)-real(150), this.begin.y, z), real(150)));
            }
          }

          if (!this.isRail) {
            if (this.W < real(700)) {
              if (random(1)<0.75) {
                this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0-w/2.0, this.begin.y, z), w, d, true));
              } else {
                if (random(1)<0.5) {
                  this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0-real(150)/2.0, this.begin.y, z), real(150)));
                }
              }
            } else {
              if (random(1)<0.75) {
                this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0-w-real(15), this.begin.y, z), w, d, false));
              } else {
                if (random(1)<0.5) {
                  this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0-real(150), this.begin.y, z), real(150)));
                }
              }
              if (random(1)<0.75) {
                this.stall.push(new Stall(createVector(this.begin.x+this.W/2.0+real(15), this.begin.y, z), w, d, true));
              } else {
                if (random(1)<0.5) {
                  this.popupTent.push(new PopupTent(createVector(this.begin.x+this.W/2.0, this.begin.y, z), real(150)));
                }
              }
            }
          }
        }



        for (let i=0; i<this.node_gate.length; i++) {
          this.show_gate[i] = random(1) < map(this.index_z, 0, 5, 0.25, 0.9);
          this.H_gate_target[i][0] = real(random(125, 200));
          this.H_gate_target[i][1] = this.H_gate_target[i][0] + real(random(-50, 50));
          this.H_gate[i][0] = 0;
          this.H_gate[i][1] = 0;
          this.X_move_gate[i][0] = real(random(-20, 20));
          this.X_move_gate[i][1] = real(random(-20, 20));
          this.node_gate[i][0] = createVector(this.begin.x+real(50) + (this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
          this.node_gate[i][1] = this.node_gate[i][0].copy();
          this.node_gate[i][2] = createVector(this.begin.x+(this.W/this.node_gate.length)-real(50) +(this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
          this.node_gate[i][3] = this.node_gate[i][2].copy();
        }
        for (let i=0; i<this.node_gate_rope.length; i++) {
          this.Y_add_rope[i] = real(random(15, 40));
          for (let j=0; j<this.node_gate_rope[i].length; j++) {
            const be = this.node_gate[i][1].copy();
            const en = this.node_gate[i][3].copy();
            const x = lerp(be.x, en.x, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
            let y = lerp(be.y, en.y, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
            const z = lerp(be.z, en.z, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
            y += sin(map(j, 0, this.node_gate_rope[i].length-1, 0, PI))*this.Y_add_rope[i];
            this.node_gate_rope[i][j] = createVector(x, y, z);
          }
        }




        if (open_paifang) {
          this.NM_paifang = [];

          for (let i=0; i<this.node_gate.length; i++) {
            if (!this.show_gate[i]) {
              if (random(1) < map(this.index_z, 0, 5, 0.5, 0.001)/(1+this.NM_paifang.length*2)) {
                const w = min(this.W / this.node_gate.length * 0.9, real(350));
                this.NM_paifang.push(new Paifang(createVector(this.begin.x  + (this.W/this.node_gate.length-w)/2.0  +  i*(this.W/this.node_gate.length), this.begin.y, this.begin.z -gap_block), w));
              }
            }
          }
        }
      }




      /*if (this.isFair) {
       for (let i=0; i<this.popupTent.length; i++) {
       this.popupTent[i].change();
       }
       }*/




      /*if (this.isTree) {
       for (let i=0; i<this.tree.length; i++) {
       this.tree[i].change();
       }
       }*/




      if (!this.is_coverRoadHor) {
        for (let i=0; i<this.node_lampB.length; i++) {
          this.H_lampB_target[i] = real(random(65, 100));
          this.H_lampB[i] = 0;
          this.W_lampB_fillet[i] = this.H_lampB_target[i] * random(0.1, 0.25);
          this.Z_lampB_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -30, 20));

          this.show_lampB[i] = random(1) < 0.5;
          if (index_z == 5) {
            this.show_lampB[i] = false;
          }
        }
      }

      if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
        for (let i=0; i<this.node_lampF.length; i++) {
          this.H_lampF_target[i] = real(random(65, 100));
          this.H_lampF[i] = 0;
          this.W_lampF_fillet[i] = this.H_lampF_target[i] * random(0.1, 0.25);
          this.Z_lampF_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));

          this.show_lampF[i] = random(1) < 0.5;
        }
      }
    } else if (state_click == 1) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            if (this.houses[i].is_normalHouse || this.houses[i].is_cat || this.houses[i].is_CTower || this.houses[i].is_firewatch) {
              this.houses[i].lightUpAllWin();
            }
          }
        }
      }
    } else if (state_click == 2) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            if (this.houses[i].is_normalHouse  ||  this.houses[i].is_constr || this.houses[i].is_cat || this.houses[i].is_CTower || this.houses[i].is_firewatch || this.houses[i].is_buildingBlock || this.houses[i].is_dottedLine) {
              this.houses[i].changeBeginY();
            }
          }
        }
      }
      /*if (this.isTree) {
       for (let i=0; i<this.tree.length; i++) {
       this.tree[i].changeBeginY();
       }
       }*/
      /*if (this.isFair) {
       for (let i=0; i<this.popupTent.length; i++) {
       this.popupTent[i].changeBeginY();
       }
       }*/
      if (this.blockMiniVer.length > 0) {
        for (let i=0; i<this.blockMiniVer.length; i++) {
          if (this.blockMiniVer[i].have_tree) {
            for (let j=0; j<this.blockMiniVer[i].tree.length; j++) {
              this.blockMiniVer[i].tree[j].changeBeginY();
            }
          } else if (this.blockMiniVer[i].have_fair) {
            for (let j=0; j<this.blockMiniVer[i].popupTent.length; j++) {
              this.blockMiniVer[i].popupTent[j].changeBeginY();
            }
          }
        }
      }

      if (this.isSea  &&  this.isSkerry) {
        this.skerry.changeBeginY();
      }
    } else if (state_click == 3) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            if (this.houses[i].is_normalHouse  ||  this.houses[i].is_constr || this.houses[i].is_cat || this.houses[i].is_CTower || this.houses[i].is_firewatch || this.houses[i].is_buildingBlock || this.houses[i].is_dottedLine || this.houses[i].is_underGround) {
              this.houses[i].changeH();
            }
          }
        }
      }
      /*if (this.isTree) {
       for (let i=0; i<this.tree.length; i++) {
       this.tree[i].changeH();
       }
       }*/
      /*     if (this.isFair) {
       for (let i=0; i<this.popupTent.length; i++) {
       this.popupTent[i].changeH();
       }
       }*/
      if (this.blockMiniVer.length > 0) {
        for (let i=0; i<this.blockMiniVer.length; i++) {
          if (this.blockMiniVer[i].have_tree) {
            for (let j=0; j<this.blockMiniVer[i].tree.length; j++) {
              this.blockMiniVer[i].tree[j].changeH();
            }
          } else if (this.blockMiniVer[i].have_fair) {
            for (let j=0; j<this.blockMiniVer[i].popupTent.length; j++) {
              this.blockMiniVer[i].popupTent[j].changeH();
            }
          }
        }
      }
      if (this.isNightMarket) {
        if (this.stall.length > 0) {
          for (let i=0; i<this.stall.length; i++) {
            this.stall[i].changeH();
          }
        }
        if (this.popupTent.length > 0) {
          for (let i=0; i<this.popupTent.length; i++) {
            this.popupTent[i].changeH();
          }
        }
      }

      if (this.isSea  &&  this.isSkerry) {
        this.skerry.changeH();
      }
    } else if (state_click == 4) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            if (this.houses[i].is_normalHouse  ||  this.houses[i].is_constr || this.houses[i].is_cat) {
              this.houses[i].changeW();
            }
          }
        }
      }
    }
  };








  this.change_blockMiniVer = function() {
    this.blockMiniVer = [];

    if (!this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  !this.isRail  &&  !this.isNightMarket) {
      if (this.houses.length > 0) {

        let be_BMV = this.begin.copy();
        let w_BMV = this.houses[0].begin.x - be_BMV.x;
        if (w_BMV > real(75)) {
          this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 0, this.index_z));
        }


        if (this.houses.length == 2) {
          be_BMV = createVector(this.houses[0].begin.x+this.houses[0].W, this.begin.y, this.begin.z);
          w_BMV = this.houses[1].begin.x - be_BMV.x;
          if (w_BMV > real(75)) {
            this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 1, this.index_z));
          }
        }

        be_BMV = createVector(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W, this.begin.y, this.begin.z);
        w_BMV = this.begin.x+this.W - be_BMV.x;
        if (w_BMV > real(75)) {
          this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, this.D, 2, this.index_z));
        }
      }
    } 
    if (!this.isRiver  &&  !this.isMountain  &&  !this.isSea  &&  this.isRail  &&  !this.isNightMarket) {
      let be_BMV = this.begin.copy();
      let w_BMV = this.W;
      let d_BMV = real(50);
      if (random(1) < 0.5) {
        this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, d_BMV, 1, this.index_z));
      }


      if (random(1) < 0.5) {
        be_BMV = this.begin.copy().add(0, 0, this.D-real(50));
        w_BMV = this.W;
        d_BMV = real(50);
        this.blockMiniVer.push(new BlockMiniVer(be_BMV, w_BMV, d_BMV, 1, this.index_z));
      }
    }
  };
  //-----------------------------------------------------------------------
  //------------------------------⬆ change ⬆------------------------------
  //-----------------------------------------------------------------------






















  //-----------------------------------------------------------------------
  //------------------------------⬇ update ⬇------------------------------
  //-----------------------------------------------------------------------

  this.update = function(index) {
    this.begin.x += speed;
    this.begin.y = skyline.y;
    this.index = index;

    if (this.begin.x > endLine) {
      this.dead = true;
    }


    if (this.isHouse) {
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          if (!this.isRiver  &&  (this.houses[i].is_normalHouse || this.houses[i].is_constr || this.houses[i].is_cat || this.houses[i].is_firewatch)  &&  this.houses[i].have_ladder) {
            if (this.houses.length==1  ||  i==1) {
              if (this.index > 5                                &&
                blocks[this.index-6].isHouse                    &&
                !blocks[this.index-6].isRiver                   &&
                blocks[this.index-6].houses.length > 0          &&
                (blocks[this.index-6].houses[0].is_normalHouse  ||  
                blocks[this.index-6].houses[0].is_constr        ||
                blocks[this.index-6].houses[0].is_cat           ||
                blocks[this.index-6].houses[0].is_firewatch)    &&
                blocks[this.index-6].houses[0].floor_num >= floor_min_ladder  ) {
                let floor_next = max(min(blocks[this.index-6].houses[0].floor_num, this.houses[i].which_floor_next), 0);
                if (blocks[this.index-6].houses[0].is_constr) {
                  floor_next = min(floor_next, blocks[this.index-6].houses[0].node_wall.length-2);
                } else if (blocks[this.index-6].houses[0].is_firewatch) {
                  floor_next = blocks[this.index-6].houses[0].node_wall.length-1;
                }
                let end_ladder = p5.Vector.add(blocks[this.index-6].houses[0].node_wall[floor_next][0], blocks[this.index-6].houses[0].node_wall[floor_next][3]).mult(0.5);
                let d = p5.Vector.dist(end_ladder, this.houses[i].begin_ladder);
                if (d > real(50)  &&  d < real(800)) {
                  this.houses[i].end_ladder = end_ladder.copy();
                } else {
                  this.houses[i].have_ladder = false;
                }
              } else {
                this.houses[i].have_ladder = false;
              }
            } else if (this.houses.length==2  &&  i==0) {
              if ((this.houses[i+1].is_normalHouse                 || 
                this.houses[i+1].is_constr                         ||
                this.houses[i+1].is_cat                            ||
                this.houses[i+1].is_firewatch)                     &&
                this.houses[i+1].floor_num >= floor_min_ladder    ) {
                let floor_next = max(min(this.houses[i+1].floor_num, this.houses[i].which_floor_next), 0);
                if (this.houses[i+1].is_constr) {
                  floor_next = min(floor_next, this.houses[i+1].node_wall.length-2);
                } else if (this.houses[i+1].is_firewatch) {
                  floor_next = this.houses[i+1].node_wall.length-1;
                }
                let end_ladder = p5.Vector.add(this.houses[i+1].node_wall[floor_next][0], this.houses[i+1].node_wall[floor_next][3]).mult(0.5);
                let d = p5.Vector.dist(end_ladder, this.houses[i].begin_ladder);
                if (d > real(50)  &&  d < real(800)) {
                  this.houses[i].end_ladder = end_ladder.copy();
                } else {
                  this.houses[i].have_ladder = false;
                }
              } else {
                this.houses[i].have_ladder = false;
              }
            }
          } else {
            this.houses[i].have_ladder = false;
          }
        }
















        let be = new Array(this.num_house);
        let floorNum = new Array(this.num_house);
        let d = new Array(this.num_house);
        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].time_change >= this.houses[i].time_change_max && this.houses[i].open_change) {
            if (this.num_house == 1) {
              this.W_houses[0] = random(min(this.W, real(500))*0.35, min(this.W, real(500)));
              floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
              d[i] = random(this.D*0.5, this.D*0.99);
              if (this.houses[i].is_CTower) {
                this.W_houses[i] = real(random(100, 200));
                d[i] = this.W_houses[i];
              } else if (this.houses[i].is_firewatch) {
                this.W_houses[i] = constrain(random(this.W*0.35, this.W), real(200), real(300));
                d[i] = this.W_houses[i];
              } else if (this.is_blockHouse[i]) {
                this.W_houses[i] = real(random(150, 300));
                d[i] = real(random(30, 75));
              } else if (this.is_UGHouse[i]) {
                this.W_houses[i] *= 0.5;
                d[i] *= 0.5;
              }
              be[i] = createVector(this.begin.x + random(0, this.W-this.W_houses[0]), this.begin.y, this.begin.z + random(0, this.D-d[i]));
              if (this.index_z == 5) {
                if (!this.is_blockHouse[i]) {
                  d[i] = this.D * 0.5;
                }
                be[i].z = this.begin.z + this.D - d[i];
              }
            } else {
              if (i == 0) {
                this.W_houses[0] = min(random(min(this.W, real(500))*0.25, min(this.W, real(500))*0.55), real(500));
                floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
                d[i] = random(this.D*0.5, this.D*0.99);
                if (this.houses[i].is_CTower) {
                  this.W_houses[i] = real(random(100, 200));
                  d[i] = this.W_houses[i];
                } else if (this.houses[i].is_firewatch) {
                  this.W_houses[i] = real(random(200, 250));
                  d[i] = this.W_houses[i];
                } else if (this.is_blockHouse[i]) {
                  this.W_houses[i] = real(random(150, 300));
                  d[i] = real(random(30, 75));
                } else if (this.is_UGHouse[i]) {
                  this.W_houses[i] *= 0.5;
                  d[i] *= 0.5;
                }
                be[i] = createVector(this.begin.x + random(0, max(this.W/2.0-this.W_houses[0], 0)), this.begin.y, this.begin.z + random(0, this.D - d[i]));
                if (this.index_z == 5) {
                  if (!this.is_blockHouse[i]) {
                    d[i] = this.D * 0.5;
                  }
                  be[i].z = this.begin.z + this.D - d[i];
                }
              } else {
                this.W_houses[1] = max(random(min(this.W-this.W_houses[0]-real(10), real(500))*0.5, min(this.W-this.W_houses[0]-real(10), real(500))), real(100));
                floorNum[i] = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
                d[i] = random(this.D*0.5, this.D*0.99);
                if (this.houses[i].is_CTower) {
                  this.W_houses[i] = real(random(100, 200));
                  d[i] = this.W_houses[i];
                } else if (this.houses[i].is_firewatch) {
                  this.W_houses[i] = real(random(200, 250));
                  d[i] = this.W_houses[i];
                } else if (this.is_blockHouse[i]) {
                  this.W_houses[i] = real(random(150, 300));
                  d[i] = real(random(30, 75));
                } else if (this.is_UGHouse[i]) {
                  this.W_houses[i] *= 0.5;
                  d[i] *= 0.5;
                }
                be[i] = createVector(this.begin.x+this.W-this.W_houses[i]-random(0, max(this.W/2.0-this.W_houses[i], 0)), this.begin.y, this.begin.z + random(0, this.D - d[i]));
                if (this.index_z == 5) {
                  if (!this.is_blockHouse[i]) {
                    d[i] = this.D * 0.5;
                  }
                  be[i].z = this.begin.z + this.D - d[i];
                }
              }
            }
          }
        }



        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].time_change >= this.houses[i].time_change_max && this.houses[i].open_change) {
            if (this.houses.length == 1) {
              this.houses[i].change(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index);
              this.count_houseChange_to_open_billMc += 1;
            } else {
              if (i == 0) {
                this.houses[i].change(be[i], this.W_houses[0], d[i], H_floor, floorNum[i], this.index);
                this.count_houseChange_to_open_billMc += 1;
              } else {
                this.houses[i].change(be[i], this.W_houses[i], d[i], H_floor, floorNum[i], this.index);
                this.count_houseChange_to_open_billMc += 1;
              }
            }
          }





          this.houses[i].update(this.index);




          //------------ update last CastleWall node ------------
          if (this.houses[i].is_CTower  &&  this.houses[i].have_CWall) {
            if (this.houses.length==1  ||  i==1) {
              if (this.index > 5) {
                this.houses[i].lastCTHouse_floorNum = blocks[this.index-6].houses[0].floor_num;
                this.houses[i].node_CW[2] = easing_p(this.houses[i].node_CW[2], blocks[this.index-6].houses[0].node[0].copy(), 0.5);
                if ((this.index_z == 0  &&  this.begin.x+this.W > real(-550))      ||  
                  (this.index_z == 1  &&  this.begin.x+this.W > real(-1000))       ||
                  (this.index_z == 2  &&  this.begin.x+this.W > real(-1350))       ||
                  (this.index_z == 3  &&  this.begin.x+this.W > real(-1700))       ||
                  (this.index_z == 4  &&  this.begin.x+this.W > real(-2050))       ||
                  (this.index_z == 5  &&  this.begin.x+this.W > real(-2350))) {
                  this.houses[i].node_CW[1] = easing_p(this.houses[i].node_CW[1], blocks[this.index-6].houses[0].node[max(min(this.houses[i].whichFloor_CWall+1, blocks[this.index-6].houses[0].node.length-1), 1)].copy(), 0.5);
                } else {
                  this.houses[i].node_CW[1] = this.houses[i].node_CW[2].copy();
                }

                if (!blocks[this.index-6].is_coverRoadVer) {
                  this.houses[i].have_CW_door = true;
                  this.houses[i].center_CW_door = TPFyz(this.begin.x+this.W+gap_block/2.0, this.houses[i].node_CWall_wall[0][3], this.houses[i].node_CWall_wall[0][2]);
                } else {
                  this.houses[i].have_CW_door = false;
                }
              } else {
                this.houses[i].node_CW[2].x += speed;
                this.houses[i].node_CW[1].x += speed;
              }
            } else if (this.houses.length==2  &&  i==0) {
              this.houses[i].lastCTHouse_floorNum = this.houses[i +1].floor_num;
              this.houses[i].node_CW[2] = easing_p(this.houses[i].node_CW[2], this.houses[i +1].node[0].copy(), 0.5);
              if ((this.index_z == 0  &&  this.begin.x+this.W > real(-550))      ||  
                (this.index_z == 1  &&  this.begin.x+this.W > real(-1000))       ||
                (this.index_z == 2  &&  this.begin.x+this.W > real(-1350))       ||
                (this.index_z == 3  &&  this.begin.x+this.W > real(-1700))       ||
                (this.index_z == 4  &&  this.begin.x+this.W > real(-2050))       ||
                (this.index_z == 5  &&  this.begin.x+this.W > real(-2350))) {
                this.houses[i].node_CW[1] = easing_p(this.houses[i].node_CW[1], this.houses[i +1].node[max(min(this.houses[i].whichFloor_CWall+1, this.houses[i+1].node.length-1), 1)].copy(), 0.5);
              } else {
                this.houses[i].node_CW[1] = this.houses[i].node_CW[2].copy();
              }
            }
          }
        }
      }




      if (this.count_houseChange_to_open_billMc  ==  this.houses.length) {
        this.change_blockMiniVer();
        this.count_houseChange_to_open_billMc = 0;
      }
    }






    if (this.isRiver) {
      if (this.index_z == 0) {
        this.river.update();
      }
    }





    if (this.isMountain) {
      //this.mountain.update();
    }





    if (this.isSea) {
      if (this.isSkerry) {
        this.skerry.update();
      }
      if (this.index_z == 5) {
        this.sea.update();
      }
    }





    if (this.isNightMarket) {
      if (this.stall.length > 0) {
        for (let i=0; i<this.stall.length; i++) {
          this.stall[i].update();
        }
      }
      if (this.popupTent.length > 0) {
        for (let i=0; i<this.popupTent.length; i++) {
          this.popupTent[i].update();
        }
      }

      for (let i=0; i<this.node_gate.length; i++) {
        this.H_gate[i][0] = easing_x(this.H_gate[i][0], this.H_gate_target[i][0], 0.25);
        this.H_gate[i][1] = easing_x(this.H_gate[i][1], this.H_gate_target[i][1], 0.25);
        this.node_gate[i][0] = createVector(this.begin.x+real(50) + (this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
        this.node_gate[i][1] = this.node_gate[i][0].copy().add(this.X_move_gate[i][0], -this.H_gate[i][0], 0);
        this.node_gate[i][2] = createVector(this.begin.x+(this.W/this.node_gate.length)-real(50) +(this.W/2.0*i), this.begin.y, this.begin.z -gap_block);
        this.node_gate[i][3] = this.node_gate[i][2].copy().add(this.X_move_gate[i][1], -this.H_gate[i][1], 0);
        for (let j=0; j<this.node_gate_rope[i].length; j++) {
          const be = this.node_gate[i][1].copy();
          const en = this.node_gate[i][3].copy();
          const x = lerp(be.x, en.x, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
          let y = lerp(be.y, en.y, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
          const z = lerp(be.z, en.z, map(j, 0, this.node_gate_rope[i].length-1, 0, 1));
          y += sin(map(j, 0, this.node_gate_rope[i].length-1, 0, PI))*this.Y_add_rope[i];
          this.node_gate_rope[i][j] = createVector(x, y, z);
        }
      }



      if (open_paifang  &&  this.NM_paifang.length > 0) {
        for (let i=0; i<this.NM_paifang.length; i++) {
          this.NM_paifang[i].update();
        }
      }
    }





    if (this.isRail) {
      for (let i=0; i<this.node_pier.length; i++) {
        const gap = (this.W-(this.W_pier*this.num_pier)) / (1+this.num_pier);
        const centerX_pier = (i+1)*gap  +  (this.W_pier/2.0)  +  (this.W_pier*i);      
        for (let j=0; j<this.node_pier[i].length; j++) {
          const y = -(j*H_pier[this.index_z]);
          for (let k=0; k<this.node_pier[i][j].length; k++) {
            const x = cos(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
            const z = sin(map(k, 0, this.node_pier[i][j].length, 0, TWO_PI)) * this.W_pier/2.0;
            this.node_pier[i][j][k] = this.begin.copy().add(centerX_pier+x, y, this.D/2.0 + z);
          }
        }
      }
    }





    if (this.blockMiniVer.length > 0) {
      for (let i=0; i<this.blockMiniVer.length; i++) {
        this.blockMiniVer[i].update();
      }
    }




    /*if (this.isFair) {
     for (let i=0; i<this.popupTent.length; i++) {
     this.popupTent[i].update();
     }
     }*/





    /*if (this.isTree) {
     for (let i=0; i<this.tree.length; i++) {
     this.tree[i].update();
     }
     }*/







    this.update_coverRoad();


    if (!this.is_coverRoadHor) {
      for (let i=0; i<this.node_lampB.length; i++) {
        this.H_lampB[i] = easing_x(this.H_lampB[i], this.H_lampB_target[i], this.var_easing1*(this.H_lampB_target[i]*0.01));

        let x = map(i, 0-1, this.node_lampB.length, this.begin.x, this.begin.x+this.W);
        this.node_lampB[i][0] = createVector(x, this.begin.y, this.begin.z-gap_block*0);
        this.node_lampB[i][1] = createVector(x, this.begin.y-this.H_lampB[i], this.begin.z-gap_block*0 +this.Z_lampB_tilt[i]);

        for (let j=2; j<this.node_lampB[i].length; j++) {
          let z_filletB = cos(map(j, 2-1, this.node_lampB[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0) - (this.W_lampB_fillet[i]/2.0);
          let y_filletB = sin(map(j, 2-1, this.node_lampB[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0);
          this.node_lampB[i][j] = createVector(0, y_filletB, z_filletB).add(this.node_lampB[i][1]);
        }
      }
    }




    if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
      for (let i=0; i<this.node_lampF.length; i++) {
        this.H_lampF[i] = easing_x(this.H_lampF[i], this.H_lampF_target[i], this.var_easing1*(this.H_lampF_target[i]*0.01));

        let x = map(i, 0-1, this.node_lampF.length, this.begin.x, this.begin.x+this.W);
        this.node_lampF[i][0] = createVector(x, this.begin.y, this.begin.z+this.D-gap_block*0);
        this.node_lampF[i][1] = this.node_lampF[i][0].copy().add(0, -this.H_lampF[i], this.Z_lampF_tilt[i]);

        for (let j=2; j<this.node_lampF[i].length; j++) {
          let z_filletF = cos(map(j, 2-1, this.node_lampF[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0) + (this.W_lampF_fillet[i]/2.0);
          let y_filletF = sin(map(j, 2-1, this.node_lampF[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0);
          this.node_lampF[i][j] = createVector(0, y_filletF, z_filletF).add(this.node_lampF[i][1]);
        }
      }
    }
  };






  this.update_coverRoad = function() {
    if (this.is_coverRoadHor) {
      this.node_coverRoadHor[0] = this.begin.copy().add(-gap_block*0.5, real(0.05), -gap_block);
      this.node_coverRoadHor[1] = this.begin.copy().add(this.W+gap_block*0.5, real(0.05), -gap_block);
      this.node_coverRoadHor[2] = this.begin.copy().add(this.W+gap_block*0.5, real(0.05), 0);
      this.node_coverRoadHor[3] = this.begin.copy().add(-gap_block*0.5, real(0.05), 0);
    }



    let fix_error = false;
    if (this.index < blocks.length-6) {
      if (this.is_coverRoadHor  &&  blocks[this.index+6].is_coverRoadHor) {
        if (this.index_z < 5) {
          if (blocks[this.index+1].is_coverRoadVer) {
            this.is_coverRoadVer = true;
            fix_error = true;
          } else {
            this.is_coverRoadVer = false;
          }
        }
      } else if (!this.is_coverRoadHor  &&  blocks[this.index+6].is_coverRoadHor) {
        if (this.index_z < 5) {
          if (blocks[this.index+1].is_coverRoadVer) {
            this.is_coverRoadVer = false;
          }
        }
      } else if (this.is_coverRoadHor  &&  !blocks[this.index+6].is_coverRoadHor) {
        if (this.index_z < 5) {
          if (blocks[this.index+1].is_coverRoadVer) {
            this.is_coverRoadVer = false;
          }
        }
      }
    }

    if (this.is_coverRoadVer) {
      this.node_coverRoadVer[0] = this.begin.copy().add(-gap_block, -real(0.05), 0);
      this.node_coverRoadVer[1] = this.begin.copy().add(0, -real(0.05), 0);
      this.node_coverRoadVer[2] = this.begin.copy().add(0, -real(0.05), this.D);
      this.node_coverRoadVer[3] = this.begin.copy().add(-gap_block, -real(0.05), this.D);

      if (this.index_z < 5) {
        if (fix_error) {
          this.node_coverRoadVer[0].z -= roadHor[this.index_z].W;
          this.node_coverRoadVer[1].z -= roadHor[this.index_z].W;
        } else {
          this.node_coverRoadVer[0].z -= (roadHor[this.index_z].W-roadHor[this.index_z].W_road)/2.0 - real(4);
          this.node_coverRoadVer[1].z -= (roadHor[this.index_z].W-roadHor[this.index_z].W_road)/2.0 - real(4);
        }
      }
      if (this.index_z > 0) {
        this.node_coverRoadVer[2].z += (roadHor[this.index_z-1].W-roadHor[this.index_z-1].W_road)/2.0 + real(4);
        this.node_coverRoadVer[3].z += (roadHor[this.index_z-1].W-roadHor[this.index_z-1].W_road)/2.0 + real(4);
      }
    }
  };




  //-----------------------------------------------------------------------
  //------------------------------⬆ update ⬆------------------------------
  //-----------------------------------------------------------------------









  //------------------------------------------------------------------------
  //------------------------------⬇ display ⬇------------------------------
  //------------------------------------------------------------------------


  this.display = function() {
    if ((this.index_z == 0  &&  this.begin.x < real(1000)  &&  this.begin.x+this.W > real(-1000))       ||  
      (this.index_z == 1  &&  this.begin.x < real(1000)  &&  this.begin.x+this.W > real(-1000))       ||
      (this.index_z == 2  &&  this.begin.x < real(1350)  &&  this.begin.x+this.W > real(-1350))       ||
      (this.index_z == 3  &&  this.begin.x < real(1700)  &&  this.begin.x+this.W > real(-1700))       ||
      (this.index_z == 4  &&  this.begin.x < real(2050)  &&  this.begin.x+this.W > real(-2050))       ||
      (this.index_z == 5  &&  this.begin.x < real(2350)  &&  this.begin.x+this.W > real(-2350))) {
      if (this.isHouse) {
        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            this.houses[i].display();
          }
        }
      }
    }
  };












  this.display_TRIANGLES = function() {
    let t, c1, c2;




    if (this.isHouse  &&  this.houses.length > 0 ) {
      for (let j=0; j<this.houses.length; j++) {
        this.houses[j].display_TRIANGLES();
      }
    }





    if (this.blockMiniVer.length > 0) {
      for (let j=0; j<this.blockMiniVer.length; j++) {
        this.blockMiniVer[j].display();
      }
    }





    if (this.isNightMarket) {
      if (this.popupTent.length > 0) {
        for (let i=0; i<this.popupTent.length; i++) {
          this.popupTent[i].display();
        }
      }


      if (this.stall.length > 0) {
        for (let i=0; i<this.stall.length; i++) {
          this.stall[i].display();
        }
      }


      t = constrain(map(this.node_gate[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));   
      for (let i=0; i<this.node_gate.length; i++) {
        if (this.show_gate[i]) {

          TRIANGLES_getLine_weight(this.node_gate[i][1], this.node_gate[i][0], real(4));
          TRIANGLES_getLine_weight(this.node_gate[i][3], this.node_gate[i][2], real(4));


          for (let j=0; j<this.node_gate_rope[i].length-1; j++) {
            TRIANGLES_getLine_weightToD_Y(this.node_gate_rope[i][j], this.node_gate_rope[i][j+1], real(3));

            const m = p5.Vector.add(this.node_gate_rope[i][j], this.node_gate_rope[i][j+1]).mult(0.5);
            const m_m_l = p5.Vector.add(this.node_gate_rope[i][j], m).mult(0.5);
            const m_m_r = p5.Vector.add(this.node_gate_rope[i][j+1], m).mult(0.5);
            TRIANGLES_getTriangle(this.node_gate_rope[i][j], m, createVector(m_m_l.x, m_m_l.y+real(20), m_m_l.z));
            TRIANGLES_getTriangle(this.node_gate_rope[i][j+1], m, createVector(m_m_r.x, m_m_r.y+real(20), m_m_r.z));
          }
        }
      }

      if (open_paifang  &&  this.NM_paifang.length > 0) {
        for (let i=0; i<this.NM_paifang.length; i++) {
          this.NM_paifang[i].display();
        }
      }
    }






    if (this.isRail) {
      if (!this.isRiver) {
        for (let i=0; i<this.node_pier.length; i++) {
          //---f---
          t = constrain(map(this.node_pier[i][0][2].z, skyline.z, 0, 1, 0), 0, 1);
          fill(lerpColor(c_near, c_far, t));    
          TRIANGLES_getRect(this.node_pier[i][1][2], this.node_pier[i][1][1], this.node_pier[i][0][1], this.node_pier[i][0][2]);

          //---l---
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_pier[i][0][3].z, skyline.z, 0, 1, 0), 0, 1));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_pier[i][0][2].z, skyline.z, 0, 1, 0), 0, 1));
          TRIANGLES_getRect_fill4(this.node_pier[i][1][3], this.node_pier[i][1][2], this.node_pier[i][0][2], this.node_pier[i][0][3], c1, c1, c2, c2);


          //---r---
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_pier[i][0][0].z, skyline.z, 0, 1, 0), 0, 1));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_pier[i][0][1].z, skyline.z, 0, 1, 0), 0, 1));
          TRIANGLES_getRect_fill4(this.node_pier[i][1][0], this.node_pier[i][1][1], this.node_pier[i][0][1], this.node_pier[i][0][0], c1, c1, c2, c2);
        }
      }
    }
  };





  this.display_river = function() {
    if (this.index_z == 0) {
      this.river.display();
    }
  };




  this.display_coverRoad = function() {
    if (!this.is_coverRoadHor) {
      let c1 = lerpColor(c_near, c_sky, constrain(map(this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor), skyline.z, 0, 1, 0), 0, 1));
      let c2 = lerpColor(c_near, c_sky, constrain(map(this.begin.z-((gap_block-this.W_road_hor)/2.0), skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(
        createVector(this.begin.x-gap_block*0.5, this.begin.y, this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        createVector(this.begin.x+this.W+gap_block*0.5, this.begin.y, this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        createVector(this.begin.x+this.W+gap_block*0.5, this.begin.y, begin.z-((gap_block-this.W_road_hor)/2.0)), 
        createVector(this.begin.x-gap_block*0.5, this.begin.y, this.begin.z-((gap_block-this.W_road_hor)/2.0)), 
        c1, c1, c2, c2);
    }


    if (!this.is_coverRoadVer) {
      let c1 = lerpColor(c_near, c_sky, constrain(map(this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor), skyline.z, 0, 1, 0), 0, 1));
      let c2 = lerpColor(c_near, c_sky, constrain(map(this.begin.z+this.D+((gap_block-this.W_road_hor)/2.0+this.W_road_hor), skyline.z, 0, 1, 0), 0, 1));

      TRIANGLES_getRect_fill4(
        createVector(this.begin.x-((gap_block-this.W_road_ver)/2.0+this.W_road_ver), this.begin.y, this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        createVector(this.begin.x-((gap_block-this.W_road_ver)/2.0), this.begin.y, this.begin.z-((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        createVector(this.begin.x-((gap_block-this.W_road_ver)/2.0), this.begin.y, this.begin.z+this.D+((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        createVector(this.begin.x-((gap_block-this.W_road_ver)/2.0+this.W_road_ver), this.begin.y, this.begin.z+this.D+((gap_block-this.W_road_hor)/2.0+this.W_road_hor)), 
        c1, c1, c2, c2
        );
    }
  };




  this.display_lamp_hor = function() {
    if (!this.is_coverRoadHor) {
      fill(lerpColor(c_near, c_far, constrain(map(this.node_lampB[0][0].z, skyline.z, 0, 1, 0), 0, 1)));
      for (let i=0; i<this.node_lampB.length; i++) {
        if (this.show_lampB[i]) {
          for (let j=0; j<this.node_lampB[i].length-1; j++) {
            TRIANGLES_getLine_weight(this.node_lampB[i][j], this.node_lampB[i][j+1], real(5));
          }
        }
      }
    }

    if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
      fill(lerpColor(c_near, c_far, constrain(map(this.node_lampF[0][0].z, skyline.z, 0, 1, 0), 0, 1)));
      for (let i=0; i<this.node_lampF.length; i++) {
        if (this.show_lampF[i]) {
          for (let j=0; j<this.node_lampF[i].length-1; j++) {
            TRIANGLES_getLine_weight(this.node_lampF[i][j], this.node_lampF[i][j+1], real(5));
          }
        }
      }
    }
  };

  //------------------------------------------------------------------------
  //------------------------------⬆ display ⬆------------------------------
  //------------------------------------------------------------------------


















  //----------------------------------------------------------------------------
  //------------------------------⬇ displayInfo ⬇------------------------------
  //----------------------------------------------------------------------------


  this.displayInfo_red = function() {
    if ((this.index_z == 0  &&  this.begin.x < real(550)  &&  this.begin.x+this.W > real(-550))       ||  
      (this.index_z == 1  &&  this.begin.x < real(1000)  &&  this.begin.x+this.W > real(-1000))       ||
      (this.index_z == 2  &&  this.begin.x < real(1350)  &&  this.begin.x+this.W > real(-1350))       ||
      (this.index_z == 3  &&  this.begin.x < real(1700)  &&  this.begin.x+this.W > real(-1700))       ||
      (this.index_z == 4  &&  this.begin.x < real(2050)  &&  this.begin.x+this.W > real(-2050))       ||
      (this.index_z == 5  &&  this.begin.x < real(2350)  &&  this.begin.x+this.W > real(-2350))) {
      LINES_getRect(this.begin, 
        createVector(this.begin.x+this.W, this.begin.y, this.begin.z), 
        createVector(this.begin.x+this.W, this.begin.y, this.begin.z+this.D), 
        createVector(this.begin.x, this.begin.y, this.begin.z+this.D));
    }
  };





  this.displayInfo = function() {
    if ((this.index_z == 0  &&  this.begin.x < real(550)  &&  this.begin.x+this.W > real(-550))       ||  
      (this.index_z == 1  &&  this.begin.x < real(1000)  &&  this.begin.x+this.W > real(-1000))       ||
      (this.index_z == 2  &&  this.begin.x < real(1350)  &&  this.begin.x+this.W > real(-1350))       ||
      (this.index_z == 3  &&  this.begin.x < real(1700)  &&  this.begin.x+this.W > real(-1700))       ||
      (this.index_z == 4  &&  this.begin.x < real(2050)  &&  this.begin.x+this.W > real(-2050))       ||
      (this.index_z == 5  &&  this.begin.x < real(2350)  &&  this.begin.x+this.W > real(-2350))) {
      //noFill();
      //stroke(c_info2);
      //strokeWeight(real(2));
      //beginShape(LINES);
      if (this.isHouse) {

        if (this.houses.length > 0) {
          for (let i=0; i<this.houses.length; i++) {
            this.houses[i].displayInfo();
          }
        }
      }




      if (this.blockMiniVer.length > 0) {
        for (let i=0; i<this.blockMiniVer.length; i++) {
          this.blockMiniVer[i].displayInfo();
        }
      }



      if (this.isNightMarket) {
        if (this.stall.length > 0) {
          for (let i=0; i<this.stall.length; i++) {
            this.stall[i].displayInfo();
          }
        }

        if (this.popupTent.length > 0) {
          for (let i=0; i<this.popupTent.length; i++) {
            this.popupTent[i].displayInfo();
          }
        }

        for (let i=0; i<this.node_gate.length; i++) {
          if (this.show_gate[i]) {
            LINES_getLine(this.node_gate[i][0], this.node_gate[i][1]);
            LINES_getLine(this.node_gate[i][2], this.node_gate[i][3]);
            for (let j=0; j<this.node_gate_rope[i].length-1; j++) {
              LINES_getLine(this.node_gate_rope[i][j], this.node_gate_rope[i][j+1]);
            }
          }
        }

        if (open_paifang  &&  this.NM_paifang.length > 0) {
          for (let i=0; i<this.NM_paifang.length; i++) {
            this.NM_paifang[i].displayInfo();
          }
        }
      }


      //endShape();
    }
  };






  this.displayInfo_lamp = function() {
    if (!this.is_coverRoadHor) {
      for (let i=0; i<this.node_lampB.length; i++) {
        if (this.show_lampB[i]) {
          for (let j=0; j<this.node_lampB[i].length-1; j++) {
            vertex(this.node_lampB[i][j].x, this.node_lampB[i][j].y, this.node_lampB[i][j].z);
            vertex(this.node_lampB[i][j+1].x, this.node_lampB[i][j+1].y, this.node_lampB[i][j+1].z);
          }
        }
      }
    }


    if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
      for (let i=0; i<this.node_lampF.length; i++) {
        if (this.show_lampF[i]) {
          for (let j=0; j<this.node_lampF[i].length-1; j++) {
            vertex(this.node_lampF[i][j].x, this.node_lampF[i][j].y, this.node_lampF[i][j].z);
            vertex(this.node_lampF[i][j+1].x, this.node_lampF[i][j+1].y, this.node_lampF[i][j+1].z);
          }
        }
      }
    }
  };

  //----------------------------------------------------------------------------
  //------------------------------⬆ displayInfo ⬆------------------------------
  //----------------------------------------------------------------------------
}