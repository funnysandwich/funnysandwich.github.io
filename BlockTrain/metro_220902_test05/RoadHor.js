function RoadHor(begin, W, L, index, index_z) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.L_target = L+gap_block;
  this.L = 0.0;
  this.W = W;
  this.W_road = real(150) * 0.5;
  this.index = index;
  this.index_z = index_z;

  this.rate_show_lamp = 0.5;
  if (state_gap_block == 3) {
    this.rate_show_lamp = 0.3;
  } else if (state_gap_block == 2) {
    this.rate_show_lamp = 0.4;
  }


  this.node_center = this.begin.copy().add(this.L_target/2.0 - gap_block/2.0, 0, this.W/2.0);

  this.node = new Array(4);
  this.node[0] = this.node_center.copy().add(-this.L/2.0, 0, -this.W_road/2.0);
  this.node[1] = this.node_center.copy().add(this.L/2.0, 0, -this.W_road/2.0);
  this.node[2] = this.node_center.copy().add(this.L/2.0, 0, this.W_road/2.0);
  this.node[3] = this.node_center.copy().add(-this.L/2.0, 0, this.W_road/2.0);


  this.var_easing1 = random(0.075, 0.125);
  this.var_easing2 = random(0.015, 0.035);


  this.show_road = random(1) < 0.5;
  if (blocks[this.index*6 + this.index_z].isRiver  ||  blocks[this.index*6 + this.index_z].isMountain    ||  blocks[this.index*6 + this.index_z].isSea  ||  blocks[this.index*6 + this.index_z].isNightMarket) {
    this.show_road = false;
  }







  this.node_lampB = Array.from(Array(floor(map(this.L_target, real(100)*5, real(100)*12, 2, 6))), () => new Array(2+1));
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




  for (let i=0; i<this.node_lampB.length; i++) {
    this.H_lampB_target[i] = real(random(65, 100));
    this.H_lampB[i] = this.H_lampB_target[i];
    this.W_lampB_fillet[i] = this.H_lampB_target[i] * random(0.1, 0.25);
    this.Z_lampB_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));

    let x = map(i, 0-1, this.node_lampB.length, this.node_center.x-this.L_target/2.0, this.node_center.x+this.L_target/2.0);




    this.node_lampB[i][0] = createVector(x, this.node_center.y, this.node_center.z-this.W_road/2.0-real(10));
    this.node_lampB[i][1] = createVector(x, this.node_center.y-this.H_lampB[i], this.node_center.z-this.W_road/2.0-real(10) +this.Z_lampB_tilt[i]);

    for (let j=2; j<this.node_lampB[i].length; j++) {
      let z_filletB = cos(map(j, 2-1, this.node_lampB[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0) - (this.W_lampB_fillet[i]/2.0);
      let y_filletB = sin(map(j, 2-1, this.node_lampB[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0);
      this.node_lampB[i][j] = createVector(0, y_filletB, z_filletB).add(this.node_lampB[i][1]);
    }




    this.H_lampF_target[i] = real(random(65, 100));
    this.H_lampF[i] = this.H_lampF_target[i];
    this.W_lampF_fillet[i] = this.H_lampF_target[i] * random(0.1, 0.25);
    this.Z_lampF_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -30, 20));

    this.node_lampF[i][0] = createVector(x, this.node_center.y, this.node_center.z+this.W_road/2.0+real(10));
    this.node_lampF[i][1] = this.node_lampF[i][0].copy().add(0, -this.H_lampF[i], this.Z_lampF_tilt[i]);

    for (let j=2; j<this.node_lampF[i].length; j++) {
      let z_filletF = cos(map(j, 2-1, this.node_lampF[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0) + (this.W_lampF_fillet[i]/2.0);
      let y_filletF = sin(map(j, 2-1, this.node_lampF[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0);
      this.node_lampF[i][j] = createVector(0, y_filletF, z_filletF).add(this.node_lampF[i][1]);
    }





    this.show_lampB[i] = noise(this.ran+i*10) < this.rate_show_lamp;
    this.show_lampF[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;

    if (index_z == 5  ||  !this.show_road) {
      this.show_lampB[i] = false;
      this.show_lampF[i] = false;
    }
  }


  if (have_button_spring) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(5, 8));
    this.H_add = 0;
    this.H_add_target = real(random(20, 30));
  }











  this.change = function() {
    this.W_road = W_road_basic * 0.5;
    this.L = 0;
    this.var_easing1 = random(0.075, 0.125);
    this.var_easing2 = random(0.015, 0.035);


    for (let i=0; i<this.node.length; i++) {
      this.node[i].x = this.node_center.x;
    }


    this.show_road = random(1) < 0.5;
    if (blocks[this.index*6 + this.index_z].isRiver  ||  blocks[this.index*6 + this.index_z].isMountain    ||  blocks[this.index*6 + this.index_z].isSea  ||  blocks[this.index*6 + this.index_z].isNightMarket) {
      this.show_road = false;
    }


    for (let i=0; i<this.node_lampB.length; i++) {
      this.H_lampB_target[i] = real(random(65, 100));
      this.H_lampB[i] = 0;
      this.W_lampB_fillet[i] = this.H_lampB_target[i] * random(0.1, 0.25);
      this.Z_lampB_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));


      this.H_lampF_target[i] = real(random(65, 100));
      this.H_lampF[i] = 0;
      this.W_lampF_fillet[i] = this.H_lampF_target[i] * random(0.1, 0.25);
      this.Z_lampF_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -30, 20));


      this.show_lampB[i] = noise(this.ran+i*10) < this.rate_show_lamp;
      this.show_lampF[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;

      if (index_z == 5  ||  !this.show_road) {
        this.show_lampB[i] = false;
        this.show_lampF[i] = false;
      }
    }
  };




  this.changeH = function() {
    if (!this.open_spring ) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(3, 8));
      this.H_add = 0;
      this.H_add_target = real(random(15, 20));
      if (state_floor == 3) {
        this.H_add_target = real(random(40, 60));
      }
    }
  };








  this.update = function(index) {
    this.index = index;

    this.L = easing_x(this.L, this.L_target, this.var_easing1);

    this.node_center.x += speed;
    if (this.node_center.x-this.L_target/2.0 > endLine) {
      this.dead = true;
    }


    if (have_button_spring  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_add = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, 0, this.H_add_target);
    }








    this.node[0] = this.node_center.copy().add(-this.L/2.0, 0, -this.W_road/2.0);
    this.node[1] = this.node_center.copy().add(this.L/2.0, 0, -this.W_road/2.0);
    this.node[2] = this.node_center.copy().add(this.L/2.0, 0, this.W_road/2.0);
    this.node[3] = this.node_center.copy().add(-this.L/2.0, 0, this.W_road/2.0);







    for (let i=0; i<this.node_lampB.length; i++) {
      this.H_lampB[i] = easing_x(this.H_lampB[i], this.H_lampB_target[i], this.var_easing1*(this.H_lampB_target[i]*0.01));
      this.H_lampF[i] = easing_x(this.H_lampF[i], this.H_lampF_target[i], this.var_easing1*(this.H_lampF_target[i]*0.01));
      if (have_button_spring) {
        this.H_lampB[i] += this.H_add;
        this.H_lampF[i] += this.H_add;
      }


      let x = map(i, 0-1, this.node_lampB.length, this.node_center.x-this.L_target/2.0, this.node_center.x+this.L_target/2.0);
      this.node_lampB[i][0] = createVector(x, this.node_center.y, this.node_center.z-this.W_road/2.0-real(10));
      this.node_lampB[i][1] = createVector(x, this.node_center.y-this.H_lampB[i], this.node_center.z-this.W_road/2.0-real(10) +this.Z_lampB_tilt[i]);

      for (let j=2; j<this.node_lampB[i].length; j++) {
        let z_filletB = cos(map(j, 2-1, this.node_lampB[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0) - (this.W_lampB_fillet[i]/2.0);
        let y_filletB = sin(map(j, 2-1, this.node_lampB[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampB_fillet[i]/2.0);
        this.node_lampB[i][j] = createVector(0, y_filletB, z_filletB).add(this.node_lampB[i][1]);
      }


      this.node_lampF[i][0] = createVector(x, this.node_center.y, this.node_center.z+this.W_road/2.0+real(10));
      this.node_lampF[i][1] = this.node_lampF[i][0].copy().add(0, -this.H_lampF[i], this.Z_lampF_tilt[i]);

      for (let j=2; j<this.node_lampF[i].length; j++) {
        let z_filletF = cos(map(j, 2-1, this.node_lampF[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0) + (this.W_lampF_fillet[i]/2.0);
        let y_filletF = sin(map(j, 2-1, this.node_lampF[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampF_fillet[i]/2.0);
        this.node_lampF[i][j] = createVector(0, y_filletF, z_filletF).add(this.node_lampF[i][1]);
      }





      this.show_lampB[i] = noise(this.ran+i*10) < this.rate_show_lamp;
      this.show_lampF[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;

      if (index_z == 5  ||  !this.show_road) {
        this.show_lampB[i] = false;
        this.show_lampF[i] = false;
      }
    }
  };










  this.display = function() {
    if (!open_desert  &&  this.show_road) {
      let c1 = lerpColor(c_near, c_sky, constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1));
      let c2 = lerpColor(c_near, c_sky, constrain(map(this.node[3].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node[0], this.node[1], this.node[2], this.node[3], c1, c1, c2, c2);
    }
  };




  this.display_lamp = function() {
    for (let i=0; i<this.node_lampB.length; i++) {
      if (this.show_lampB[i]) {
        fill(lerpColor(c_near, c_far, constrain(map(this.node_lampB[i][0].z, skyline.z, 0, 1, 0), 0, 1)));
        for (let j=0; j<this.node_lampB[i].length-1; j++) {
          TRIANGLES_getLine_weight(this.node_lampB[i][j], this.node_lampB[i][j+1], real(5));
        }
      }
      if (this.show_lampF[i]) {
        fill(lerpColor(c_near, c_far, constrain(map(this.node_lampF[i][0].z, skyline.z, 0, 1, 0), 0, 1)));
        for (let j=0; j<this.node_lampF[i].length-1; j++) {
          TRIANGLES_getLine_weight(this.node_lampF[i][j], this.node_lampF[i][j+1], real(5));
        }
      }
    }
  };






  this.displayInfo = function() {
    if (this.show_road) {
      for (let i=0; i<this.node.length; i++) {
        LINES_getLine(this.node[i], this.node[(i+1)%this.node.length]);
      }
    }

    for (let i=0; i<this.node_lampB.length; i++) {
      if (this.show_lampB[i]) {
        for (let j=0; j<this.node_lampB[i].length-1; j++) {
          LINES_getLine(this.node_lampB[i][j], this.node_lampB[i][j+1]);
        }
      }
      if (this.show_lampF[i]) {
        for (let j=0; j<this.node_lampF[i].length-1; j++) {
          LINES_getLine(this.node_lampF[i][j], this.node_lampF[i][j+1]);
        }
      }
    }
  };
}
