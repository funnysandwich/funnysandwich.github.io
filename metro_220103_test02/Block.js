function Block(begin, W, D, index_z, index, isRiver, isMountain, isRail) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.index_z = index_z;
  this.index = index;
  this.isRiver = isRiver;
  this.isMountain = isMountain;
  this.isRail = isRail;
  this.dead = false;
  this.var_easing1 = random(0.075, 0.125);





  this.num_house = floor(random(1, 3));
  if (this.index_z == 0 && stateVar_floor[state_floor][0] < 0.5) {
    this.num_house = 1;
  }


  this.houses = [];
  this.W_houses = new Array(this.num_house);
  this.is_constrHouse = new Array(this.num_house);
  if (open_constrHouse) {
    this.constrHouse = [];
  }
  this.is_catHouse = new Array(this.num_house);
  if (open_catHouse) {
    this.catHouse = [];
  }


  if (this.index_z != 0  ||  random(1) < stateVar_floor[state_floor][0]) {
    for (let i=0; i<this.num_house; i++) {
      this.is_constrHouse[i] = random(1) < rate_constrHouse;
      this.is_catHouse[i] = random(1) < rate_catHouse;
      if (this.num_house == 1) {
        this.W_houses[0] = random(min(this.W, real(500))*0.35, min(this.W, real(500)));
        let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
        let d = random(this.D*0.5, this.D*0.99);
        let be = createVector(this.begin.x + random(0, this.W-this.W_houses[0]), this.begin.y, this.begin.z + random(0, this.D-d));
        if (this.index_z == 5) {
          d = this.D * 0.5;
          be.z = this.begin.z + this.D*0.5;
        }
        if (this.is_constrHouse[i]) {
          this.houses.push(new ConstrHouse(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
        } else if (this.is_catHouse[i]) {
          this.houses.push(new CatHouse(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
        } else {
          this.houses.push(new House(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
        }
      } else {
        if (i == 0) {
          this.W_houses[0] = min(random(min(this.W, real(500))*0.25, min(this.W, real(500))*0.55), real(500));
          let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
          let d = random(this.D*0.5, this.D*0.99);
          let be = createVector(this.begin.x + random(0, max(this.W/2.0-this.W_houses[0], 0)), this.begin.y, this.begin.z + random(0, this.D - d));
          if (this.index_z == 5) {
            d = this.D*0.5;
            be.z = this.begin.z + this.D*0.5;
          }
          if (this.is_constrHouse[i]) {
            this.houses.push(new ConstrHouse(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
          } else if (this.is_catHouse[i]) {
            this.houses.push(new CatHouse(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
          } else {
            this.houses.push(new House(be, this.W_houses[0], d, H_floor, floorNum, this.index_z, this.index));
          }
        } else {
          this.W_houses[i] = max(random(min(this.W-this.W_houses[0]-real(10), real(500))*0.5, min(this.W-this.W_houses[0]-real(10), real(500))), real(100));
          let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
          let d = random(this.D*0.5, this.D*0.99);
          let be = createVector(this.begin.x+this.W-this.W_houses[i]-random(0, max(this.W/2.0-this.W_houses[i], 0)), this.begin.y, this.begin.z + random(0, this.D - d));
          if (this.index_z == 5) {
            d = this.D*0.5;
            be.z = this.begin.z + this.D*0.5;
          }
          if (this.is_constrHouse[i]) {
            this.houses.push(new ConstrHouse(be, this.W_houses[i], d, H_floor, floorNum, this.index_z, this.index));
          } else if (this.is_catHouse[i]) {
            this.houses.push(new CatHouse(be, this.W_houses[i], d, H_floor, floorNum, this.index_z, this.index));
          } else {
            this.houses.push(new House(be, this.W_houses[i], d, H_floor, floorNum, this.index_z, this.index));
          }
        }
      }
    }
  }





  this.is_coverRoadHor = random(0, 1) < 0.5;
  if (this.isRiver || this.isMountain) {
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
  } else {
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
  }





  if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
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
  }






  this.is_coverRoadVer = random(0, 1) < 0.5;



  this.node_coverRoadVer = new Array(4);
  this.node_coverRoadVer[0] = this.begin.copy().add(-gap_block, -real(0.05), 0);
  this.node_coverRoadVer[1] = this.begin.copy().add(0, -real(0.05), 0);
  this.node_coverRoadVer[2] = this.begin.copy().add(0, -real(0.05), this.D);
  this.node_coverRoadVer[3] = this.begin.copy().add(-gap_block, -real(0.05), this.D);







  if (this.isRiver && this.index_z == 0) {
    this.river = new River(this.begin, this.W);
  }



  if (this.isMountain) {
    this.mountain = new Mountain(this.begin, this.W, H_mtn_max, H_mtn_min, floor(count_blocks/6)*10*0.2, this.ran, this.var_easing1, this.isRiver);
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





  this.have_billMc = false;
  this.count_houseChange_to_open_billMc = 0;

  if (open_billMc  &&  !this.isRiver  &&  !this.isRail) {
    if (this.houses.length > 0) {
      if ((this.houses[0].begin.x-this.begin.x) > real(150)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
        this.have_billMc = true;
        let x = random(this.begin.x, this.houses[0].begin.x-real(75));
        let z = random(this.begin.z, this.begin.z+this.D-real(75));
        this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
      }
      if (((this.begin.x+this.W)-(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W)) > real(150)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
        this.have_billMc = true;
        let x = random(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W+real(75), (this.begin.x+this.W)-real(75));
        let z = random(this.begin.z, this.begin.z+this.D-real(75));
        this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
      }
      if (this.houses.length == 2) {
        if ((this.houses[1].begin.x-(this.houses[0].begin.x+this.houses[0].W)) > real(225)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
          this.have_billMc = true;
          let x = random(this.houses[0].begin.x+this.houses[0].W+real(75), this.houses[1].begin.x-real(150));
          let z = random(this.begin.z, this.begin.z+this.D-real(75));
          this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
        }
      }
    }
  }








  //-----------------------------------------------------------------------
  //------------------------------⬇ change ⬇------------------------------
  //-----------------------------------------------------------------------


  this.change = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.075, 0.125);

    if (state_click == 0) {
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          //this.houses[i].change(random(this.W*0.25, this.W), random(this.D*0.5, this.D), real(100), floor(random(2, 9)));
          this.houses[i].open_change = true;
        }
      }


      this.is_coverRoadHor = random(0, 1) < 0.5;
      this.is_coverRoadVer = random(0, 1) < 0.5;

      if (this.isRiver) {
        this.is_coverRoadHor = true;
      }


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
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].is_normalHouse || this.houses[i].isCat) {
            this.houses[i].lightUpAllWin();
          }
        }
      }
    } else if (state_click == 2) {
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].is_normalHouse  ||  this.houses[i].isConstr || this.houses[i].isCat) {
            this.houses[i].changeBeginY();
          }
        }
      }
    } else if (state_click == 3) {
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].is_normalHouse  ||  this.houses[i].isConstr || this.houses[i].isCat) {
            this.houses[i].changeH();
          }
        }
      }
    } else if (state_click == 4) {
      if (this.houses.length > 0) {
        for (let i=0; i<this.houses.length; i++) {
          if (this.houses[i].is_normalHouse  ||  this.houses[i].isConstr || this.houses[i].isCat) {
            this.houses[i].changeW();
          }
        }
      }
    }
  };



  this.change_billMac = function() {

    this.have_billMc = false;

    if (open_billMc  &&  !this.isRiver  &&  !this.isRail) {
      if (this.houses.length > 0) {
        if ((this.houses[0].begin.x-this.begin.x) > real(150)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
          this.have_billMc = true;
          let x = random(this.begin.x, this.houses[0].begin.x-real(75));
          let z = random(this.begin.z, this.begin.z+this.D-real(75));
          this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
        }
        if (((this.begin.x+this.W)-(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W)) > real(150)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
          this.have_billMc = true;
          let x = random(this.houses[this.houses.length-1].begin.x+this.houses[this.houses.length-1].W+real(75), (this.begin.x+this.W)-real(75));
          let z = random(this.begin.z, this.begin.z+this.D-real(75));
          this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
        }
        if (this.houses.length == 2) {
          if ((this.houses[1].begin.x-(this.houses[0].begin.x+this.houses[0].W)) > real(225)  &&  !this.have_billMc  &&  random(1) < rate_billMc) {
            this.have_billMc = true;
            let x = random(this.houses[0].begin.x+this.houses[0].W+real(75), this.houses[1].begin.x-real(150));
            let z = random(this.begin.z, this.begin.z+this.D-real(75));
            this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
          }
        }
      }
    }
  };






  this.change_river = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.075, 0.125);

    if (this.index_z == 0) {
      this.river.change();
    }
  };



  this.change_mountain = function() {
    if (!this.isRiver) {
      this.ran = random(-999, 999);
      this.var_easing1 = random(0.075, 0.125);
    }

    this.H_mtn_max = real(100);
    this.H_mtn_min = real(0);

    this.mountain.change(H_mtn_max, H_mtn_min, this.ran, this.var_easing1);
  };




  this.change_rail = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.075, 0.125);




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
  };



  //-----------------------------------------------------------------------
  //------------------------------⬆ change ⬆------------------------------
  //-----------------------------------------------------------------------







  //-----------------------------------------------------------------------
  //------------------------------⬇ update ⬇------------------------------
  //-----------------------------------------------------------------------

  this.update = function(index) {
    this.begin.x += speed;
    this.index = index;

    if (this.begin.x > endLine) {
      this.dead = true;
    }



    if (this.houses.length > 0) {
      for (let i=0; i<this.houses.length; i++) {
        if (!this.isRiver  &&  (this.houses[i].is_normalHouse || this.houses[i].isConstr || this.houses[i].isCat)  &&  this.houses[i].have_ladder) {
          if (this.houses.length==1  ||  i==1) {
            if (this.index > 5                               &&
              !blocks[this.index-6].isRiver                  &&
              blocks[this.index-6].houses.length > 0         &&
              (blocks[this.index-6].houses[0].is_normalHouse ||  
              blocks[this.index-6].houses[0].isConstr        ||
              blocks[this.index-6].houses[0].isCat)          &&
              blocks[this.index-6].houses[0].floor_num >= floor_min_ladder  ) {
              let floor_next = min(blocks[this.index-6].houses[0].floor_num, this.houses[i].which_floor_next);
              if (blocks[this.index-6].houses[0].isConstr) {
                floor_next -= 1;
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
            if ((this.houses[i+1].is_normalHouse                || 
              this.houses[i+1].isConstr                         ||
              this.houses[i+1].isCat)                           &&
              this.houses[i+1].floor_num >= floor_min_ladder    ) {
              let floor_next = min(this.houses[i+1].floor_num, this.houses[i].which_floor_next);
              if (this.houses[i+1].isConstr) {
                floor_next -= 1;
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




      for (let i=0; i<this.houses.length; i++) {
        if (this.houses[i].time_change >= this.houses[i].time_change_max && this.houses[i].open_change) {
          if (this.houses.length == 1) {
            this.W_houses[0] = random(min(this.W, real(500))*0.35, min(this.W, real(500)));
            let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
            let d = random(this.D*0.5, this.D*0.99);
            let be = createVector(this.begin.x + random(0, this.W-this.W_houses[0]), this.begin.y, this.begin.z + random(0, this.D-d));
            if (this.index_z == 5) {
              d = this.D * 0.5;
              be.z = this.begin.z + this.D*0.5;
            }
            this.houses[i].change(be, this.W_houses[0], d, H_floor, floorNum, this.index);
            this.count_houseChange_to_open_billMc += 1;
          } else {
            if (i == 0) {
              this.W_houses[0] = min(random(min(this.W, real(500))*0.25, min(this.W, real(500))*0.55), real(500));
              let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
              let d = random(this.D*0.5, this.D*0.99);
              let be = createVector(this.begin.x + random(0, max(this.W/2.0-this.W_houses[0], 0)), this.begin.y, this.begin.z + random(0, this.D - d));
              if (this.index_z == 5) {
                d = this.D*0.5;
                be.z = this.begin.z + this.D*0.5;
              }
              this.houses[i].change(be, this.W_houses[0], d, H_floor, floorNum, this.index);
              this.count_houseChange_to_open_billMc += 1;
            } else {
              this.W_houses[i] = max(random(min(this.W-this.W_houses[0]-real(10), real(500))*0.5, min(this.W-this.W_houses[0]-real(10), real(500))), real(100));
              let floorNum = floor(random(stateVar_floor[state_floor][this.index_z*2+1], stateVar_floor[state_floor][this.index_z*2+2]+1));
              let d = random(this.D*0.5, this.D*0.99);
              let be = createVector(this.begin.x+this.W-this.W_houses[i]-random(0, max(this.W/2.0-this.W_houses[i], 0)), this.begin.y, this.begin.z + random(0, this.D - d));
              if (this.index_z == 5) {
                d = this.D*0.5;
                be.z = this.begin.z + this.D*0.5;
              }
              this.houses[i].change(be, this.W_houses[i], d, H_floor, floorNum, this.index);
              this.count_houseChange_to_open_billMc += 1;
            }
          }
        }





        this.houses[i].update(this.index);
      }
    }


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






    if (this.count_houseChange_to_open_billMc  ==  this.houses.length) {
      this.change_billMac();
      this.count_houseChange_to_open_billMc = 0;
    }




    if (this.have_billMc) {
      this.billMc.update();
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









  this.update_river = function(index) {
    this.begin.x += speed;
    this.index = index;

    if (this.begin.x > endLine) {
      this.dead = true;
    }


    this.update_coverRoad();


    if (this.index_z == 0) {
      this.river.update();
    }
  };





  this.update_mountain = function(index) {
    if (!this.isRiver) {
      this.begin.x += speed;
      this.index = index;
      this.update_coverRoad();

      if (this.begin.x > endLine) {
        this.dead = true;
      }
    }





    if (this.index < blocks.length-6) {
      this.mountain.end = blocks[this.index+6].begin.copy().add(blocks[this.index+6].W, 0, 0);
      this.mountain.update(true);
    } else {
      this.mountain.end = this.begin.copy().add(-gap_block, 0);
      this.mountain.update(false);
    }
  };





  this.update_rail = function(index) {
    if (!this.isRiver) {
      this.begin.x += speed;
      this.index = index;
      this.update_coverRoad();


      if (this.begin.x > endLine) {
        this.dead = true;
      }
    }



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
  };




  //-----------------------------------------------------------------------
  //------------------------------⬆ update ⬆------------------------------
  //-----------------------------------------------------------------------









  //-----------------------------------------------------------------------
  //------------------------------⬇ display ⬇------------------------------
  //-----------------------------------------------------------------------


  this.display = function() {
    if (this.houses.length > 0) {
      for (let i=0; i<this.houses.length; i++) {
        this.houses[i].display();
      }
    }

    //fill(0);
    //beginShape();
    //fill(lerpColor(c_near, c_far, constrain(map(this.begin.z, skyline.z, 0, 1, 0), 0, 1)));
    //vertex(this.begin.x, this.begin.y, this.begin.z);
    //vertex(this.begin.x+this.W, this.begin.y, this.begin.z);
    //fill(lerpColor(c_near, c_far, constrain(map(this.begin.z+this.D, skyline.z, 0, 1, 0), 0, 1)));
    //vertex(this.begin.x+this.W, this.begin.y, this.begin.z+this.D);
    //vertex(this.begin.x, this.begin.y, this.begin.z+this.D);
    //endShape(CLOSE);




    this.display_coverRoad();



    if (!this.is_coverRoadHor) {
      noFill();
      strokeWeight(real(5));

      let t_c = constrain(map(this.node_lampB[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      stroke(lerpColor(c_near, c_far, t_c));
      beginShape(LINES);
      for (let i=0; i<this.node_lampB.length; i++) {
        if (this.show_lampB[i]) {
          for (let j=0; j<this.node_lampB[i].length-1; j++) {
            vertex(this.node_lampB[i][j].x, this.node_lampB[i][j].y, this.node_lampB[i][j].z);
            vertex(this.node_lampB[i][j+1].x, this.node_lampB[i][j+1].y, this.node_lampB[i][j+1].z);
          }
        }
      }
      endShape();
    }



    if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
      noFill();
      strokeWeight(real(5));

      t_c = constrain(map(this.node_lampF[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      stroke(lerpColor(c_near, c_far, t_c));
      beginShape(LINES);
      for (let i=0; i<this.node_lampF.length; i++) {
        if (this.show_lampF[i]) {
          for (let j=0; j<this.node_lampF[i].length-1; j++) {
            vertex(this.node_lampF[i][j].x, this.node_lampF[i][j].y, this.node_lampF[i][j].z);
            vertex(this.node_lampF[i][j+1].x, this.node_lampF[i][j+1].y, this.node_lampF[i][j+1].z);
          }
        }
      }
      endShape();
    }




    if (this.have_billMc) {
      this.billMc.display();
    }
  };



  this.display_coverRoad = function() {
    if (this.is_coverRoadHor) {
      noStroke();
      fill(c_sky);
      beginShape();
      for (let i=0; i<this.node_coverRoadHor.length; i++) {
        vertex(this.node_coverRoadHor[i].x, this.node_coverRoadHor[i].y, this.node_coverRoadHor[i].z);
      }
      endShape();
    }

    if (this.is_coverRoadVer) {
      noStroke();
      fill(c_sky);
      beginShape();
      for (let i=0; i<this.node_coverRoadVer.length; i++) {
        vertex(this.node_coverRoadVer[i].x, this.node_coverRoadVer[i].y, this.node_coverRoadVer[i].z);
      }
      endShape();
    }
  };







  this.display_river = function() {
    this.display_coverRoad();


    if (this.index_z == 0) {
      this.river.display();
    }
  };





  this.display_mountain = function() {
    if (!this.isRiver) {
      this.display_coverRoad();
    }

    this.mountain.display();
  };






  this.display_rail = function() {
    if (!this.isRiver) {
      this.display_coverRoad();


      let t;
      noStroke();
      for (let i=0; i<this.node_pier.length; i++) {
        //---f---
        t = constrain(map(this.node_pier[i][0][2].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));    
        beginShape();
        vertex(this.node_pier[i][1][2].x, this.node_pier[i][1][2].y, this.node_pier[i][1][2].z);
        vertex(this.node_pier[i][1][1].x, this.node_pier[i][1][1].y, this.node_pier[i][1][1].z);
        vertex(this.node_pier[i][0][1].x, this.node_pier[i][0][1].y, this.node_pier[i][0][1].z);
        vertex(this.node_pier[i][0][2].x, this.node_pier[i][0][2].y, this.node_pier[i][0][2].z);
        endShape();

        //---l---
        beginShape();
        t = constrain(map(this.node_pier[i][0][3].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));    
        vertex(this.node_pier[i][1][3].x, this.node_pier[i][1][3].y, this.node_pier[i][1][3].z);
        vertex(this.node_pier[i][1][2].x, this.node_pier[i][1][2].y, this.node_pier[i][1][2].z);
        t = constrain(map(this.node_pier[i][0][2].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));    
        vertex(this.node_pier[i][0][2].x, this.node_pier[i][0][2].y, this.node_pier[i][0][2].z);
        vertex(this.node_pier[i][0][3].x, this.node_pier[i][0][3].y, this.node_pier[i][0][3].z);
        endShape();

        //---r---
        beginShape();
        t = constrain(map(this.node_pier[i][0][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));    
        vertex(this.node_pier[i][1][0].x, this.node_pier[i][1][0].y, this.node_pier[i][1][0].z);
        vertex(this.node_pier[i][1][1].x, this.node_pier[i][1][1].y, this.node_pier[i][1][1].z);
        t = constrain(map(this.node_pier[i][0][1].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));    
        vertex(this.node_pier[i][0][1].x, this.node_pier[i][0][1].y, this.node_pier[i][0][1].z);
        vertex(this.node_pier[i][0][0].x, this.node_pier[i][0][0].y, this.node_pier[i][0][0].z);
        endShape();
      }
    }
  };


  //-----------------------------------------------------------------------
  //------------------------------⬆ display ⬆------------------------------
  //-----------------------------------------------------------------------








  this.displayInfo = function() {
    noFill();
    stroke(c_infoRed);
    strokeWeight(real(2));
    beginShape();
    vertex(this.begin.x, this.begin.y, this.begin.z);
    vertex(this.begin.x+this.W, this.begin.y, this.begin.z);
    vertex(this.begin.x+this.W, this.begin.y, this.begin.z+this.D);
    vertex(this.begin.x, this.begin.y, this.begin.z+this.D);
    endShape(CLOSE);


    //stroke(c_infoRed);
    //strokeWeight(real(5));
    //point(this.begin);


    if (this.houses.length > 0) {
      for (let i=0; i<this.houses.length; i++) {
        this.houses[i].displayInfo();
      }
    }


    //this.displayInfo_coverRoad();


    if (!this.is_coverRoadHor) {
      noFill();
      stroke(c_infoGreen);
      strokeWeight(real(2));
      beginShape(LINES);
      for (let i=0; i<this.node_lampB.length; i++) {
        if (this.show_lampB[i]) {
          for (let j=0; j<this.node_lampB[i].length-1; j++) {
            vertex(this.node_lampB[i][j].x, this.node_lampB[i][j].y, this.node_lampB[i][j].z);
            vertex(this.node_lampB[i][j+1].x, this.node_lampB[i][j+1].y, this.node_lampB[i][j+1].z);
          }
        }
      }
      endShape();
    }


    if (index_z != 0  &&  this.index%6!=0  &&  !blocks[this.index-1].is_coverRoadHor) {
      noFill();
      stroke(c_infoGreen);
      strokeWeight(real(2));
      beginShape(LINES);
      for (let i=0; i<this.node_lampF.length; i++) {
        if (this.show_lampF[i]) {
          for (let j=0; j<this.node_lampF[i].length-1; j++) {
            vertex(this.node_lampF[i][j].x, this.node_lampF[i][j].y, this.node_lampF[i][j].z);
            vertex(this.node_lampF[i][j+1].x, this.node_lampF[i][j+1].y, this.node_lampF[i][j+1].z);
          }
        }
      }
      endShape();
    }




    if (this.have_billMc) {
      this.billMc.displayInfo();
    }
  };




  this.displayInfo_coverRoad = function() {
    if (this.is_coverRoadHor) {
      noStroke();
      fill(c_sky);
      beginShape();
      for (let i=0; i<this.node_coverRoadHor.length; i++) {
        vertex(this.node_coverRoadHor[i].x, this.node_coverRoadHor[i].y, this.node_coverRoadHor[i].z);
      }
      endShape();
    }
    if (this.is_coverRoadVer) {
      noStroke();
      fill(c_sky);
      beginShape();
      for (let i=0; i<this.node_coverRoadVer.length; i++) {
        vertex(this.node_coverRoadVer[i].x, this.node_coverRoadVer[i].y, this.node_coverRoadVer[i].z);
      }
      endShape();
    }
  };



  this.displayInfo_river = function() {
    //this.displayInfo_coverRoad();

    if (this.index_z == 0) {
      noFill();
      stroke(c_infoRed);
      strokeWeight(real(2));
      beginShape();
      vertex(this.begin.x, this.begin.y, skyline.z);
      vertex(this.begin.x+this.W, this.begin.y, skyline.z);
      vertex(this.begin.x+this.W, this.begin.y, this.begin.z+this.D);
      vertex(this.begin.x, this.begin.y, this.begin.z+this.D);
      endShape(CLOSE);


      //stroke(160, 60, 0);
      //strokeWeight(real(5));
      //point(this.begin);


      this.river.displayInfo();
    }
  };



  this.displayInfo_mountain = function() {
    if (!this.isRiver) {
      //this.displayInfo_coverRoad();
    }
    this.mountain.displayInfo();
  };





  this.displayInfo_rail = function() {
    if (!this.isRiver) {
      //this.displayInfo_coverRoad();

      noFill();
      stroke(c_infoGreen2);
      strokeWeight(real(1.25));
      beginShape(LINES);
      for (let i=0; i<this.node_pier.length; i++) {
        for (let j=0; j<this.node_pier[i].length; j++) {
          for (let k=0; k<this.node_pier[i][j].length; k++) {
            vertex(this.node_pier[i][j][k].x, this.node_pier[i][j][k].y, this.node_pier[i][j][k].z);
            vertex(this.node_pier[i][j][(k+1)%this.node_pier[i][j].length].x, this.node_pier[i][j][(k+1)%this.node_pier[i][j].length].y, this.node_pier[i][j][(k+1)%this.node_pier[i][j].length].z);
          }
        }

        for (let k=0; k<this.node_pier[i][0].length; k++) {
          vertex(this.node_pier[i][0][k].x, this.node_pier[i][0][k].y, this.node_pier[i][0][k].z);
          vertex(this.node_pier[i][1][k].x, this.node_pier[i][1][k].y, this.node_pier[i][1][k].z);
        }
      }
      endShape();
    }
  };
}
