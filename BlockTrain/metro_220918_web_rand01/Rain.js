function Rain(rangeX_L, rangeX_R, rangeZ_B, rangeZ_F) {
  this.ran = random(-999, 999);
  this.L = real(random(20, 60));
  this.gravity = real(random(30, 40));
  if (open_snow) {
    this.gravity = real(random(7, 15));
    this.L = real(random(2, 5));
  }
  this.dead = false;

  this.node = new Array(2);



  this.node[0] = createVector(random(min(rangeX_L, rangeX_R), max(rangeX_L, rangeX_R)), -real(1000), random(min(rangeZ_F, rangeZ_B), max(rangeZ_F, rangeZ_B)));
  let Y_begin = map(this.node[0].z, skyline.z, real(100), -real(1500), -real(400));
  if (open_typhoon) {
    Y_begin = random(-real(750), -real(10));
  }
  this.node[0].y = Y_begin;
  this.node[1] = this.node[0].copy().add(0, -this.L, 0);












  this.update = function() {
    this.node[0].y += this.gravity;
    this.node[1].y += this.gravity;

    if (open_rain) {
      this.node[1].x = this.node[0].x+speed*0.75;
      this.node[0].x += speed;
    } else if (open_typhoon) {
      this.node[1].x = this.node[0].x+max(speed, real(15))*0.05;
      this.node[0].x += max(speed, real(15))*10;
    } else if (open_snow) {
      this.node[1].x += speed*1 + map(noise(frameCount*0.05+this.ran+0.005), 0, 1, -real(25), real(25));
      this.node[0].x += speed*1 + map(noise(frameCount*0.05+this.ran), 0, 1, -real(25), real(25));
    }

    this.node[0].y = min(skyline.y, this.node[0].y);



    if (have_button_submerge  &&  open_shake  &&  time_shake < time_max_shake) {
      this.node[0].add(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
      this.node[1].add(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
    }


    if (this.node[1].y >= skyline.y  ||  this.node[1].x > endLine) {
      this.dead = true;
    }
  };







  this.display = function() {
    //let t = constrain(map(this.node[0].z-real(1000), skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    fill(lerpColor(c_near, c_far, 0.75));
    let w = map(this.node[0].z, skyline.z, real(100), real(2), real(0.5));
    if (open_rain) {
      TRIANGLES_getLine_weight(this.node[0], this.node[1], w);
    } else if (open_typhoon) {
      fill(lerpColor(c_near, c_far, 0.5));
      w = real(random(0.25, 1));
      TRIANGLES_getLine_weight_T(this.node[0], this.node[1], w);
    } else if (open_snow) {
      fill(lerpColor(c_near, c_far, 0.85));
      if (have_button_invert  &&  open_invert) {
        fill(lerpColor(c_sky_copy, c_far, 0.5));
      }
      w = real(random(3, 6));
      TRIANGLES_getLine_weight_T(this.node[0], this.node[1], w);
    }
  };





  this.displayInfo = function() {
    //fill(lerpColor(c_near, c_far, 0.75));
    //const w = map(this.node[0].z, skyline.z, real(100), real(2), real(0.5));
    //TRIANGLES_getLine_weight(this.node[0], this.node[1], w); 
    LINES_getLine(this.node[0], this.node[1]);
  };
}