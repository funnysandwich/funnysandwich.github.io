function RoadVer(begin, W, L, index) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.L = L;
  this.W_road = min(W_road_basic * random(0.4, 0.8), this.W-real(25));
  this.index = index;
  this.rate_show_lamp = 0.5;
  if (state_gap_block == 3) {
    this.rate_show_lamp = 0.4;
  } else if (state_gap_block == 2) {
    this.rate_show_lamp = 0.4;
  }



  this.node_center = this.begin.copy().add(-this.W/2.0, 0, -this.L/2.0);

  this.node = new Array(4);
  this.node[0] = this.node_center.copy().add(-(this.W_road)/2.0, 0, -this.L/2.0);
  this.node[1] = this.node_center.copy().add((this.W_road)/2.0, 0, -this.L/2.0);
  this.node[2] = this.node_center.copy().add((this.W_road)/2.0, 0, this.L/2.0);
  this.node[3] = this.node_center.copy().add(-(this.W_road)/2.0, 0, this.L/2.0);



  this.var_easing1 = random(0.075, 0.125);

  this.dead = false;




  this.node_road = Array.from(Array(6), () => new Array(4));
  for (let i=0; i<this.node_road.length; i++) {
    let z_near = -(blocks[this.index*6].D+gap_block_ver) * i;
    if (i != 0) {
      z_near += roadHor[this.index][i].W - (roadHor[this.index][i].W - roadHor[this.index][i].W_road)/2.0;
    } else {
      z_near -= real(5);
    }

    let z_far = -(blocks[this.index*6].D+gap_block_ver) * (i+1) + (roadHor[this.index][i].W - roadHor[this.index][i].W_road)/2.0;
    if (z_near > this.node[3].z) {
      z_near = max(this.node[3].z, z_far);
    }
    if (z_far < this.node[0].z) {
      z_far = min(this.node[0].z, z_near);
    }
    this.node_road[i][0] = createVector(this.node_center.x - (this.W_road)/2.0, this.node_center.y, z_far);
    this.node_road[i][1] = createVector(this.node_center.x + (this.W_road)/2.0, this.node_center.y, z_far);
    this.node_road[i][2] = createVector(this.node_center.x + (this.W_road)/2.0, this.node_center.y, z_near);
    this.node_road[i][3] = createVector(this.node_center.x - (this.W_road)/2.0, this.node_center.y, z_near);
  }





  this.show_road = new Array(this.node_road.length);
  for (let i=0; i<this.show_road.length; i++) {
    this.show_road[i] = random(1) < 0.5;

    if (blocks[this.index*6 + i].isMountain    ||  blocks[this.index*6 + i].isSea) {
      this.show_road[i] = false;
    }
  }






  this.node_lampL = Array.from(Array(2*6), () => new Array(2+1));
  this.H_lampL = new Array(this.node_lampL.length);
  this.H_lampL_target = new Array(this.node_lampL.length);
  this.W_lampL_fillet = new Array(this.node_lampL.length);
  this.X_lampL_tilt = new Array(this.node_lampL.length);
  this.show_lampL = new Array(this.node_lampL.length);

  this.node_lampR = Array.from(Array(this.node_lampL.length), () => new Array(this.node_lampL[0].length));
  this.H_lampR = new Array(this.node_lampR.length);
  this.H_lampR_target = new Array(this.node_lampL.length);
  this.W_lampR_fillet = new Array(this.node_lampR.length);
  this.X_lampR_tilt = new Array(this.node_lampR.length);
  this.show_lampR = new Array(this.node_lampR.length);


  for (let i=0; i<this.node_lampL.length; i++) {
    this.H_lampL_target[i] = real(random(65, 100));
    this.H_lampL[i] = this.H_lampL_target[i];
    this.W_lampL_fillet[i] = this.H_lampL_target[i] * random(0.1, 0.25);
    this.X_lampL_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));
    this.H_lampR_target[i] = real(random(65, 100));
    this.H_lampR[i] = this.H_lampR_target[i];
    this.W_lampR_fillet[i] = this.H_lampR_target[i] * random(0.1, 0.25);
    this.X_lampR_tilt[i] = real(map(noise(i*10+this.ran+999), 0, 1, -30, 20));

    let z = -((i%2+1)*((real(100)*5)/3.0)  +  floor(i/2)*(gap_block_ver+real(100)*5));
    this.node_lampL[i][0] = createVector(this.node_center.x-this.W_road/2.0-real(10), this.node_center.y, z);
    this.node_lampL[i][1] = createVector(this.node_center.x-this.W_road/2.0-real(10) +  this.X_lampL_tilt[i], this.node_center.y-this.H_lampL[i], z);
    this.node_lampR[i][0] = createVector(this.node_center.x+this.W_road/2.0+real(10), this.node_center.y, z);
    this.node_lampR[i][1] = createVector(this.node_center.x+this.W_road/2.0+real(10)  +  this.X_lampR_tilt[i], this.node_center.y-this.H_lampL[i], z);

    for (let j=2; j<this.node_lampL[i].length; j++) {
      let x_filletL = cos(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) + (this.W_lampL_fillet[i]/2.0);
      let y_filletL = sin(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
      this.node_lampL[i][j] = createVector(x_filletL, y_filletL, 0).add(this.node_lampL[i][1]);
      let x_filletR = cos(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) - (this.W_lampL_fillet[i]/2.0);
      let y_filletR = sin(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
      this.node_lampR[i][j] = createVector(x_filletR, y_filletR, 0).add(this.node_lampR[i][1]);
    }

    this.show_lampL[i] = noise(this.ran+i*10) < this.rate_show_lamp;
    this.show_lampR[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;
    if (!this.show_road[floor(i/2)]) {
      this.show_lampL[i] = false;
      this.show_lampR[i] = false;
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
    this.ran = random(-999, 999);
    this.W_road = W_road_basic * random(0.4, 0.8);
    this.var_easing1 = random(0.05, 0.125);

    for (let i=0; i<this.node.length; i++) {
      this.node[i] = this.node_center.copy();
    }


    for (let i=0; i<this.show_road.length; i++) {
      this.show_road[i] = random(1) < 0.5;
      if (blocks[this.index*6 + i].isMountain    ||  blocks[this.index*6 + i].isSea) {
        this.show_road[i] = false;
      }
    }


    for (let i=0; i<this.node_lampL.length; i++) {
      this.H_lampL_target[i] = real(random(65, 100));
      this.H_lampL[i] = 0;
      this.W_lampL_fillet[i] = this.H_lampL_target[i] * random(0.1, 0.25);
      this.X_lampL_tilt[i] = real(map(noise(i*10+this.ran), 0, 1, -20, 30));

      this.H_lampR_target[i] = real(random(65, 100));
      this.H_lampR[i] = 0;
      this.W_lampR_fillet[i] = this.H_lampR_target[i] * random(0.1, 0.25);
      this.X_lampR_tilt[i] = real(map(noise(i*10+this.ran+999), 0, 1, -30, 20));

      this.show_lampL[i] = noise(this.ran+i*10) < this.rate_show_lamp;
      this.show_lampR[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;
      if (!this.show_road[floor(i/2)]) {
        this.show_lampL[i] = false;
        this.show_lampR[i] = false;
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
    //this.begin.x += speed;

    this.node_center.x += speed;
    if (this.node_center.x-this.W/2.0 > endLine) {
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




    this.node[0].x = this.node_center.x - this.W_road/2.0;
    this.node[1].x = this.node_center.x + this.W_road/2.0;
    this.node[2].x = this.node_center.x + this.W_road/2.0;
    this.node[3].x = this.node_center.x - this.W_road/2.0;


    this.node[0].z = easing_x(this.node[0].z, this.node_center.z-this.L/2.0, this.var_easing1);
    this.node[1].z = easing_x(this.node[1].z, this.node_center.z-this.L/2.0, this.var_easing1);
    this.node[2].z = easing_x(this.node[2].z, this.node_center.z+this.L/2.0, this.var_easing1);
    this.node[3].z = easing_x(this.node[3].z, this.node_center.z+this.L/2.0, this.var_easing1);






    for (let i=0; i<this.show_road.length; i++) {
      if (this.show_road[i]) {
        if (this.index > 0                          &&
          roadHor.length > 2                        &&
          this.index < roadVer.length-1             &&
          !roadHor[this.index][i].show_road         &&
          !roadHor[this.index+1][i].show_road       &&
          ((!this.show_road[i+1] && i<this.show_road.length-1)  ||  (i==this.show_road.length-1 && !this.show_road[i-1]))
          ) {
          this.show_road[i] = false;
        }
      } else {
        if (this.index > 0                                     &&
          roadHor.length > 2                                   &&
          this.index < roadVer.length-1                        &&
          !roadHor[this.index][i].show_road                    &&  
          !roadHor[this.index+1][i].show_road                  &&  
          (this.show_road[i+1] && i<this.show_road.length-1)
          ) {
          this.show_road[i] = true;
        }
        if (this.index > 0                                     &&
          roadHor.length > 2                                   &&
          this.index < roadVer.length-1                        &&
          roadHor[this.index][i].show_road                     &&  
          !roadHor[this.index+1][i].show_road                  &&  
          ((!this.show_road[i+1] && i<this.show_road.length-1)  ||  i==this.show_road.length-1)
          ) {
          this.show_road[i] = true;
        }
        if (this.index > 0                                     &&
          roadHor.length > 2                                   &&
          this.index < roadVer.length-1                        &&
          !roadHor[this.index][i].show_road                    &&  
          roadHor[this.index+1][i].show_road                   &&  
          ((!this.show_road[i+1] && i<this.show_road.length-1)  ||  i==this.show_road.length-1)
          ) {
          this.show_road[i] = true;
        }
      }
      if (blocks[this.index*6 + i].isMountain    ||  blocks[this.index*6 + i].isSea) {
        this.show_road[i] = false;
      }
    }

    for (let i=0; i<this.node_lampL.length; i++) {
      this.show_lampL[i] = noise(this.ran+i*10) < this.rate_show_lamp;
      this.show_lampR[i] = noise(this.ran+i*10+999) < this.rate_show_lamp;
      if (!this.show_road[floor(i/2)]) {
        this.show_lampL[i] = false;
        this.show_lampR[i] = false;
      }
    }




    for (let i=0; i<this.node_road.length; i++) {
      let z_near = -(blocks[this.index*6].D+gap_block_ver) * i;
      if (i != 0) {
        z_near += roadHor[this.index][i].W - (roadHor[this.index][i].W - roadHor[this.index][i].W_road)/2.0;
      } else {
        z_near -= real(5);
      }

      let z_far = -(blocks[this.index*6].D+gap_block_ver) * (i+1) + (roadHor[this.index][i].W - roadHor[this.index][i].W_road)/2.0;
      if (z_near > this.node[3].z) {
        z_near = max(this.node[3].z, z_far);
      }
      if (z_far < this.node[0].z) {
        z_far = min(this.node[0].z, z_near);
      }
      this.node_road[i][0] = createVector(this.node_center.x - (this.W_road)/2.0, this.node_center.y, z_far);
      this.node_road[i][1] = createVector(this.node_center.x + (this.W_road)/2.0, this.node_center.y, z_far);
      this.node_road[i][2] = createVector(this.node_center.x + (this.W_road)/2.0, this.node_center.y, z_near);
      this.node_road[i][3] = createVector(this.node_center.x - (this.W_road)/2.0, this.node_center.y, z_near);
    }








    for (let i=0; i<this.node_lampL.length; i++) {
      this.H_lampL[i] = easing_x(this.H_lampL[i], this.H_lampL_target[i], this.var_easing1*(this.H_lampL_target[i]*0.01));
      this.H_lampR[i] = easing_x(this.H_lampR[i], this.H_lampR_target[i], this.var_easing1*(this.H_lampR_target[i]*0.01));
      if (have_button_spring) {
        this.H_lampL[i] += this.H_add;
        this.H_lampR[i] += this.H_add;
      }

      let z = -((i%2+1)*((real(100)*5)/3.0)  +  floor(i/2)*(gap_block_ver+real(100)*5));
      this.node_lampL[i][0] = createVector(this.node_center.x-this.W_road/2.0-real(10), this.node_center.y, z);
      this.node_lampL[i][1] = createVector(this.node_center.x-this.W_road/2.0-real(10)  +  this.X_lampL_tilt[i], this.node_center.y-this.H_lampL[i], z);
      this.node_lampR[i][0] = createVector(this.node_center.x+this.W_road/2.0+real(10), this.node_center.y, z);
      this.node_lampR[i][1] = createVector(this.node_center.x+this.W_road/2.0+real(10)  +  this.X_lampR_tilt[i], this.node_center.y-this.H_lampL[i], z);
      for (let j=2; j<this.node_lampL[i].length; j++) {
        let x_filletL = cos(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) + (this.W_lampL_fillet[i]/2.0);
        let y_filletL = sin(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
        this.node_lampL[i][j] = createVector(x_filletL, y_filletL, 0).add(this.node_lampL[i][1]);
        let x_filletR = cos(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) - (this.W_lampL_fillet[i]/2.0);
        let y_filletR = sin(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
        this.node_lampR[i][j] = createVector(x_filletR, y_filletR, 0).add(this.node_lampR[i][1]);
      }
    }
  };









  this.display = function() {

    if (!open_desert) {
      for (let i=0; i<this.node_road.length; i++) {
        if (this.show_road[i]) {
          let c1 = lerpColor(c_near, c_sky, constrain(map(this.node_road[i][0].z, skyline.z, 0, 1, 0), 0, 1));
          let c2 = lerpColor(c_near, c_sky, constrain(map(this.node_road[i][3].z, skyline.z, 0, 1, 0), 0, 1));
          TRIANGLES_getRect_fill4(this.node_road[i][0], this.node_road[i][1], this.node_road[i][2], this.node_road[i][3], c1, c1, c2, c2);
        }
      }
    }
  };






  this.display_lamp = function() {
    for (let i=0; i<this.node_lampL.length; i++) {
      fill(lerpColor(c_near, c_far, constrain(map(this.node_lampL[i][0].z, skyline.z, 0, 1, 0), 0, 1)));
      if (this.show_lampL[i]) {
        for (let j=0; j<this.node_lampL[i].length-1; j++) {
          TRIANGLES_getLine_weight(this.node_lampL[i][j], this.node_lampL[i][j+1], real(5));
        }
      }
      if (this.show_lampR[i]) {
        for (let j=0; j<this.node_lampR[i].length-1; j++) {
          TRIANGLES_getLine_weight(this.node_lampR[i][j], this.node_lampR[i][j+1], real(5));
        }
      }
    }
  };









  this.displayInfo = function() {

    for (let i=0; i<this.node_road.length; i++) {
      if (this.show_road[i]) {
        LINES_getRect(this.node_road[i][0], this.node_road[i][1], this.node_road[i][2], this.node_road[i][3]);
      }
    }


    for (let i=0; i<this.node_lampL.length; i++) {
      if (this.show_lampL[i]) {
        for (let j=0; j<this.node_lampL[i].length-1; j++) {
          LINES_getLine(this.node_lampL[i][j], this.node_lampL[i][j+1]);
        }
      }
      if (this.show_lampR[i]) {
        for (let j=0; j<this.node_lampR[i].length-1; j++) {
          LINES_getLine(this.node_lampR[i][j], this.node_lampR[i][j+1]);
        }
      }
    }
  };
}
