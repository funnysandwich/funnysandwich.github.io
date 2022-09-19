function SunBeam(X_begin) {
  this.ran = random(-999, 999);
  this.begin = createVector(X_begin+real(random(-100, 100)), skyline.y-real(random(2500, 2700)), skyline.z+real(random(2.5, 5)));
  this.W_begin = 0;
  this.W_target_begin = real(random(50, 100));
  this.W_end_rate = random(2.5, 5);
  this.X_bottom = real(-800 + random(-200, 200));
  this.Y_end = skyline.y - real(random(250, 990));
  this.begin.z = map(this.Y_end, skyline.y-real(990), skyline.y-real(250), skyline.z+real(2.5), skyline.z+real(5));

  this.dead = false;

  this.Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));


  this.node = new Array(9);
  this.node[0] = this.begin.copy().add(-this.W_begin/2.0, 0, 0);
  this.node[1] = this.begin.copy().add(this.W_begin/2.0, 0, 0);
  this.node[2] = this.begin.copy();

  this.node[6] = createVector(this.begin.x-this.W_begin*this.W_end_rate/2.0+this.X_bottom, this.Y_end, this.begin.z);
  this.node[7] = createVector(this.begin.x+this.X_bottom, this.Y_end, this.begin.z);
  this.node[8] = createVector(this.begin.x+this.W_begin*this.W_end_rate/2.0+this.X_bottom, this.Y_end, this.begin.z);

  this.node[3] = TPFxz(this.Y_darkCloud, this.node[0], this.node[6]);
  this.node[4] = TPFxz(this.Y_darkCloud, this.node[1], this.node[7]);
  this.node[5] = TPFxz(this.Y_darkCloud, this.node[2], this.node[8]);







  this.update = function() {
    this.Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));


    let w_limit = map(this.Y_end, skyline.y-real(990), skyline.y-real(250), real(250), real(100));
    this.W_begin = constrain(map(noise(frameCount/500.0+this.ran), 0.45, 0.75, 0, w_limit), 0, w_limit);
    if (open_typhoon) {
      this.W_begin = constrain(map(noise(frameCount/100.0+this.ran), 0.45, 0.75, 0, w_limit), 0, w_limit);
    }
    //this.W_target_begin = constrain(map(noise(frameCount/200.0+this.ran), 0.45, 0.75, 0, real(70)), 0, real(70));

    this.X_bottom = map(this.begin.x, beginLine, endLine, -real(800), real(500)) + map(noise(frameCount/500.0+this.ran+999), 0, 1, -real(500), real(500));
    if (open_typhoon) {
      this.X_bottom = map(this.begin.x, beginLine, endLine, -real(800), real(500)) + map(noise(frameCount/250.0+this.ran+999), 0, 1, -real(500), real(500));
    }

    this.begin.x += speed*0.5;
    if (min(this.begin.x, this.X_bottom) > endLine) {
      this.dead = true;
    }

    this.node[0] = this.begin.copy().add(-this.W_begin/2.0, 0, 0);
    this.node[1] = this.begin.copy();
    this.node[2] = this.begin.copy().add(this.W_begin/2.0, 0, 0);

    this.node[6] = createVector(this.begin.x-this.W_begin*this.W_end_rate/2.0+this.X_bottom, this.Y_end, this.begin.z);
    this.node[7] = createVector(this.begin.x+this.X_bottom, this.Y_end, this.begin.z);
    this.node[8] = createVector(this.begin.x+this.W_begin*this.W_end_rate/2.0+this.X_bottom, this.Y_end, this.begin.z);

    this.node[3] = TPFxz(this.Y_darkCloud, this.node[0], this.node[6]);
    this.node[4] = TPFxz(this.Y_darkCloud, this.node[1], this.node[7]);
    this.node[5] = TPFxz(this.Y_darkCloud, this.node[2], this.node[8]);
  };





  this.display = function() {


    let c_dc_m = lerpColor(c_winFrame, c_sky, 0.15);
    let c_dc_end = lerpColor(c_dc_m, c_sky, map(this.Y_end, this.Y_darkCloud, skyline.y, 0, 1));
    let c_dc_begin = lerpColor(c_dc_m, c_winFrame, map(this.begin.y, this.Y_darkCloud, skyline.y-real(3000), 0, 1));

    //TRIANGLES_getRect_fill4(this.node[0], this.node[1], this.node[4], this.node[5], 
    //  //addAlphaToColor(lerpColor(c_sky, c_sky_near, 0.1), 0), addAlphaToColor(lerpColor(c_sky, c_sky_near, 0.1), 255), addAlphaToColor(c_sky, 255), addAlphaToColor(lerpColor(c_sky, c_sky_near, 0), 255)
    //  addAlphaToColor(c_dc_begin, 255), addAlphaToColor(c_dc_begin, 255), c_dc_end, c_dc_end
    //  );

    //TRIANGLES_getRect_fill4(this.node[1], this.node[2], this.node[3], this.node[4], 
    //  //  addAlphaToColor(lerpColor(c_sky, c_sky_near, 0.1), 255), addAlphaToColor(lerpColor(c_sky, c_sky_near, 0.1), 0), addAlphaToColor(lerpColor(c_sky, c_sky_near, 0), 255), addAlphaToColor(c_sky, 255)
    //  addAlphaToColor(c_dc_begin, 255), addAlphaToColor(c_dc_begin, 255), c_dc_end, c_dc_end
    //  );
    let c_dc_m_m = lerpColor(c_dc_end, c_dc_m, map(this.Y_end, skyline.y-real(990), skyline.y-real(250), 0.65, 0.85));

    TRIANGLES_getRect_fill4(this.node[0], this.node[1], this.node[4], this.node[3], 
      c_dc_begin, c_dc_begin, c_dc_m_m, c_dc_m
      );
    TRIANGLES_getRect_fill4(this.node[2], this.node[1], this.node[4], this.node[5], 
      c_dc_begin, c_dc_begin, c_dc_m_m, c_dc_m
      );
    TRIANGLES_getRect_fill4(this.node[4], this.node[3], this.node[6], this.node[7], 
      c_dc_m_m, c_dc_m, c_dc_end, c_dc_end
      );
    TRIANGLES_getRect_fill4(this.node[4], this.node[5], this.node[8], this.node[7], 
      c_dc_m_m, c_dc_m, c_dc_end, c_dc_end
      );
  };



  this.displayInfo = function() {
    LINES_getLine(this.node[0], this.node[6]);
    LINES_getLine(this.node[2], this.node[8]);
  };
}