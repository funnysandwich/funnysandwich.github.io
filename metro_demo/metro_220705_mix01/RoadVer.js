function RoadVer(begin, W, L, index) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.L = L;
  this.W_road = this.W * random(0.4, 0.8);
  this.index = index;



  this.node_center = this.begin.copy().add(-this.W/2.0, 0, -this.L/2.0);

  this.node_road = new Array(4);
  this.node_road[0] = this.node_center.copy().add(-(this.W_road)/2.0, 0, -this.L/2.0);
  this.node_road[1] = this.node_center.copy().add((this.W_road)/2.0, 0, -this.L/2.0);
  this.node_road[2] = this.node_center.copy().add((this.W_road)/2.0, 0, this.L/2.0);
  this.node_road[3] = this.node_center.copy().add(-(this.W_road)/2.0, 0, this.L/2.0);



  this.var_easing1 = random(0.075, 0.125);

  this.dead = false;





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

    let z = -((i%2+1)*((real(100)*5)/3.0)  +  floor(i/2)*(gap_block+real(100)*5));
    this.node_lampL[i][0] = createVector(this.node_center.x-this.W/2.0+(this.W-this.W_road)/2.0/2.0, this.node_center.y, z);
    this.node_lampL[i][1] = createVector(this.node_center.x-this.W/2.0+(this.W-this.W_road)/2.0/2.0  +  this.X_lampL_tilt[i], this.node_center.y-this.H_lampL[i], z);
    this.node_lampR[i][0] = createVector(this.node_center.x+this.W/2.0-(this.W-this.W_road)/2.0/2.0, this.node_center.y, z);
    this.node_lampR[i][1] = createVector(this.node_center.x+this.W/2.0-(this.W-this.W_road)/2.0/2.0  +  this.X_lampR_tilt[i], this.node_center.y-this.H_lampL[i], z);

    for (let j=2; j<this.node_lampL[i].length; j++) {
      let x_filletL = cos(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) + (this.W_lampL_fillet[i]/2.0);
      let y_filletL = sin(map(j, 2-1, this.node_lampL[i].length-1, PI, TWO_PI-QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
      this.node_lampL[i][j] = createVector(x_filletL, y_filletL, 0).add(this.node_lampL[i][1]);
      let x_filletR = cos(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0) - (this.W_lampL_fillet[i]/2.0);
      let y_filletR = sin(map(j, 2-1, this.node_lampR[i].length-1, 0, -PI+QUARTER_PI)) * (this.W_lampL_fillet[i]/2.0);
      this.node_lampR[i][j] = createVector(x_filletR, y_filletR, 0).add(this.node_lampR[i][1]);
    }

    this.show_lampL[i] = random(1) < 0.5;
    this.show_lampR[i] = random(1) < 0.5;
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
    this.W_road = this.W * random(0.4, 0.8);
    this.var_easing1 = random(0.05, 0.125);

    for (let i=0; i<this.node_road.length; i++) {
      this.node_road[i] = this.node_center.copy();
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

      this.show_lampL[i] = random(1) < 0.5;
      this.show_lampR[i] = random(1) < 0.5;
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
    if (this.node_center.x > endLine) {
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




    this.node_road[0].x = this.node_center.x - this.W_road/2.0;
    this.node_road[1].x = this.node_center.x + this.W_road/2.0;
    this.node_road[2].x = this.node_center.x + this.W_road/2.0;
    this.node_road[3].x = this.node_center.x - this.W_road/2.0;


    this.node_road[0].z = easing_x(this.node_road[0].z, this.node_center.z-this.L/2.0, this.var_easing1);
    this.node_road[1].z = easing_x(this.node_road[1].z, this.node_center.z-this.L/2.0, this.var_easing1);
    this.node_road[2].z = easing_x(this.node_road[2].z, this.node_center.z+this.L/2.0, this.var_easing1);
    this.node_road[3].z = easing_x(this.node_road[3].z, this.node_center.z+this.L/2.0, this.var_easing1);





    for (let i=0; i<this.node_lampL.length; i++) {
      this.H_lampL[i] = easing_x(this.H_lampL[i], this.H_lampL_target[i], this.var_easing1*(this.H_lampL_target[i]*0.01));
      this.H_lampR[i] = easing_x(this.H_lampR[i], this.H_lampR_target[i], this.var_easing1*(this.H_lampR_target[i]*0.01));
      if (have_button_spring) {
        this.H_lampL[i] += this.H_add;
        this.H_lampR[i] += this.H_add;
      }

      let z = -((i%2+1)*((real(100)*5)/3.0)  +  floor(i/2)*(gap_block+real(100)*5));
      this.node_lampL[i][0] = createVector(this.node_center.x-this.W/2.0+(this.W-this.W_road)/2.0/2.0, this.node_center.y, z);
      this.node_lampL[i][1] = createVector(this.node_center.x-this.W/2.0+(this.W-this.W_road)/2.0/2.0  +  this.X_lampL_tilt[i], this.node_center.y-this.H_lampL[i], z);
      this.node_lampR[i][0] = createVector(this.node_center.x+this.W/2.0-(this.W-this.W_road)/2.0/2.0, this.node_center.y, z);
      this.node_lampR[i][1] = createVector(this.node_center.x+this.W/2.0-(this.W-this.W_road)/2.0/2.0  +  this.X_lampR_tilt[i], this.node_center.y-this.H_lampL[i], z);
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

    //if (!open_desert) {
    //  noStroke();
    //  fill(255);
    //  beginShape();
    //  for (let i=0; i<this.node_road.length; i++) {
    //    if (i==0) {
    //      let t_c = constrain(map(this.node_road[0].z, skyline.z, 0, 1, 0), 0, 1);
    //      fill(lerpColor(c_near, c_sky, t_c));
    //    } else if (i==2) {
    //      let t_c = constrain(map(this.node_road[3].z, skyline.z, 0, 1, 0), 0, 1);
    //      fill(lerpColor(c_near, c_sky, t_c));
    //    }
    //    vertex(this.node_road[i].x, this.node_road[i].y, this.node_road[i].z);
    //  }
    //  endShape(CLOSE);
    //}
  };



  this.display_lamp = function() {
    //noFill();
    //strokeWeight(real(5));

    //for (let i=0; i<this.node_lampL.length; i++) {
    //  if (!blocks[this.index*6 + floor(i/2)].is_coverRoadVer) {
    //    beginShape(LINES);
    //    let t_c = constrain(map(this.node_lampL[i][0].z, skyline.z, 0, 1, 0), 0, 1);
    //    stroke(lerpColor(c_near, c_far, t_c));
    //    if (this.show_lampL[i]) {
    //      for (let j=0; j<this.node_lampL[i].length-1; j++) {
    //        vertex(this.node_lampL[i][j].x, this.node_lampL[i][j].y, this.node_lampL[i][j].z);
    //        vertex(this.node_lampL[i][j+1].x, this.node_lampL[i][j+1].y, this.node_lampL[i][j+1].z);
    //      }
    //    }
    //    if (this.show_lampR[i]) {
    //      for (let j=0; j<this.node_lampR[i].length-1; j++) {
    //        vertex(this.node_lampR[i][j].x, this.node_lampR[i][j].y, this.node_lampR[i][j].z);
    //        vertex(this.node_lampR[i][j+1].x, this.node_lampR[i][j+1].y, this.node_lampR[i][j+1].z);
    //      }
    //    }
    //    endShape();
    //  }
    //}



    for (let i=0; i<this.node_lampL.length; i++) {
      if (!blocks[this.index*6 + floor(i/2)].is_coverRoadVer) {
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
    }
  };









  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoGreen);
    //strokeWeight(real(5));
    //beginShape();
    //vertex(this.node_center.x, this.node_center.y, this.node_center.z+this.L/2.0);
    //vertex(this.node_center.x, this.node_center.y, this.node_center.z-this.L/2.0);
    //endShape();


    //strokeWeight(real(2));
    //beginShape();
    for (let i=0; i<this.node_road.length; i++) {
      LINES_getLine(this.node_road[i], this.node_road[(i+1)%this.node_road.length]);
      //vertex(this.node_road[i].x, this.node_road[i].y, this.node_road[i].z);
    }
    //endShape(CLOSE);


    //stroke(c_infoGreen);
    //beginShape(LINES);
    for (let i=0; i<this.node_lampL.length; i++) {
      if (!blocks[this.index*6 + floor(i/2)].is_coverRoadVer) {
        if (this.show_lampL[i]) {
          for (let j=0; j<this.node_lampL[i].length-1; j++) {
            LINES_getLine(this.node_lampL[i][j], this.node_lampL[i][j+1]);
            //vertex(this.node_lampL[i][j].x, this.node_lampL[i][j].y, this.node_lampL[i][j].z);
            //vertex(this.node_lampL[i][j+1].x, this.node_lampL[i][j+1].y, this.node_lampL[i][j+1].z);
          }
        }
        if (this.show_lampR[i]) {
          for (let j=0; j<this.node_lampR[i].length-1; j++) {
            LINES_getLine(this.node_lampR[i][j], this.node_lampR[i][j+1]);
            //vertex(this.node_lampR[i][j].x, this.node_lampR[i][j].y, this.node_lampR[i][j].z);
            //vertex(this.node_lampR[i][j+1].x, this.node_lampR[i][j+1].y, this.node_lampR[i][j+1].z);
          }
        }
      }
    }
    //endShape();
  };
}