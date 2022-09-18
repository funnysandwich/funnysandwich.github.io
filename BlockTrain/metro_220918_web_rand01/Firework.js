function Firework(begin, index_song) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  if (open_mountain) {
    this.begin.z = skyline.z + real(450);
  }
  this.end = this.begin.copy().add(real(random(-500, 500)), -real(random(600, 1200)), 0);
  if (open_mountain) {
    this.end.y = this.begin.y - real(random(1000, 1500));
  }
  this.dead = false;
  this.is_boom = false;
  this.speed_firework = floor(random(30, 50));
  this.life = 0;
  this.lifespan = floor(random(30, 40));
  this.W = real(random(350, 500));


  this.time_delay = 0;
  this.time_max_delay = floor(random(0, 60));


  this.var_b = 10;
  if (state_color == 4) {
    this.var_b = 20;
  } else if (state_color == 8) {
    this.var_b = 40;
  }



  this.node = new Array(2);
  this.node[0] = this.begin.copy();
  this.node[1] = this.begin.copy();




  this.node_boom = Array.from(Array(floor(random(5, 9))), () => new Array(2));
  for (let i=0; i<this.node_boom.length; i++) {
    for (let j=0; j<this.node_boom[i].length; j++) {
      this.node_boom[i][j] = this.end.copy();
    }
  }









  this.update = function() {
    if (this.time_delay < this.time_max_delay) {
      this.time_delay ++;
      this.begin.x += speed*0.85;
      this.end.x += speed*0.85;
      this.node[0].x += speed*0.85;
      this.node[1].x += speed*0.85;
    } else {


      this.begin.x += speed*0.85;
      this.end.x += speed*0.85;

      this.node[0].x += speed*0.85;
      this.node[1].x += speed*0.85;


      if (p5.Vector.dist(this.node[0], this.end) > real(this.speed_firework+1)) {
        this.node[0] = p5.Vector.sub(this.end, this.node[0]).setMag(real(this.speed_firework)).add(this.node[0]);
      } else {
        if (!this.is_boom) {
          for (let i=0; i<this.node_boom.length; i++) {
            for (let j=0; j<this.node_boom[i].length; j++) {
              this.node_boom[i][j] = this.node[0].copy();
            }
          }
          if(is_onTheGround){
          song_boom[index_song].play();
          }
        }
        this.is_boom = true;
      }

      if (p5.Vector.dist(this.node[1], this.end) > real(this.speed_firework*0.8+1)) {
        if (p5.Vector.dist(this.node[0], this.begin) > real(this.speed_firework*10)) {

          this.node[1] = p5.Vector.sub(this.end, this.node[1]).setMag(real(this.speed_firework*0.8)).add(this.node[1]);
        }
      }
    }



    if (this.is_boom) {
      if (this.life < this.lifespan) {
        this.life ++;
      } else {
        this.dead = true;
      }



      for (let i=0; i<this.node_boom.length; i++) {
        //let w = max(0, map(this.life - j*20, 0, this.lifespan, 0, this.W));
        let x = cos(map(i, 0, this.node_boom.length, 0, TWO_PI)+noise(this.ran+i*10)) * this.W/2.0;
        let y = sin(map(i, 0, this.node_boom.length, 0, TWO_PI)+noise(this.ran+i*10)) * this.W/2.0;
        x += this.node[0].x;
        y += this.node[0].y + max(map(this.life, 0, this.lifespan, 0, real(50)), 0);
        this.node_boom[i][0].x = map(this.life, 0, this.lifespan, this.node[0].x, x);
        this.node_boom[i][0].y = map(this.life, 0, this.lifespan, this.node[0].y, y) + max(map(this.life, 0, this.lifespan, 0, real(50)), 0);
        this.node_boom[i][0].z = this.node[0].z;

        y = sin(map(i, 0, this.node_boom.length, 0, TWO_PI)+noise(this.ran+i*10)) * this.W/2.0;
        y += this.node[0].y + max(map(this.life-20, 0, this.lifespan, 0, real(10)), 0);
        this.node_boom[i][1].x = map(max(this.life-20, 0), 0, this.lifespan, this.node[0].x, x);
        this.node_boom[i][1].y = map(max(this.life-20, 0), 0, this.lifespan, this.node[0].y, y);
        this.node_boom[i][1].z = this.node[0].z;

        //for (let j=0; j<this.node_boom[i].length; j++) {

        //if (j == 0) {
        //  y += max(0, map(this.life - j*80, 0, this.lifespan, 0, real(100)));
        //}
        //this.node_boom[i][j] = this.node[0].copy().add(x, y, 0);
        //}
      }
    }





    if (state_color == 4) {
      if (have_button_invert  &&  open_invert) {
        this.var_b = easing_x(this.var_b, 35, 0.1);
      } else {
        this.var_b = easing_x(this.var_b, 20, 0.1);
      }
    } else if (state_color == 8) {
      if (have_button_invert  &&  open_invert) {
        this.var_b = easing_x(this.var_b, 35, 0.1);
      } else {
        this.var_b = easing_x(this.var_b, 40, 0.1);
      }
    } else {
      if (have_button_invert  &&  open_invert) {
        this.var_b = easing_x(this.var_b, 25, 0.1);
      } else {
        this.var_b = easing_x(this.var_b, 10, 0.1);
      }
    }
  };






  this.display = function() {



    let c1 = lerpColor(changeBrightness(c_sky, this.var_b), changeBrightness(c_sky_near, this.var_b), map(this.node[0].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
    let c2 = lerpColor(c_sky, c_sky_near, map(this.node[1].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));

    if (open_darkCloud) {
      let Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));
      c1 = lerpColor(changeBrightness(c_sky, this.var_b), changeBrightness(lerpColor(c_winFrame, c_sky, 0.15), this.var_b), map(this.node[0].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
      c2 = lerpColor(c_sky, lerpColor(c_winFrame, c_sky, 0.15), map(this.node[1].y, skyline.y, Y_darkCloud, 0, 1));
    }

    if (p5.Vector.dist(this.node[1], this.end) > real(40)) {
      TRIANGLES_getLine_weight_T_fill2(this.node[0], this.node[1], real(10), c1, c2);
    }


    if (this.is_boom) {
      let w = map(this.life, 0, this.lifespan, real(20), 0);
      for (let i=0; i<this.node_boom.length; i++) {
        c1 = lerpColor(changeBrightness(c_sky, this.var_b), changeBrightness(c_sky_near, this.var_b), map(this.node_boom[i][0].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
        c2 = lerpColor(c_sky, c_sky_near, map(this.node_boom[i][1].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
        if (open_darkCloud) {
          let Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));
          c1 = lerpColor(changeBrightness(c_sky, this.var_b), changeBrightness(lerpColor(c_winFrame, c_sky, 0.15), this.var_b), map(this.node_boom[i][0].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
          c2 = lerpColor(c_sky, lerpColor(c_winFrame, c_sky, 0.15), map(this.node_boom[i][1].y, skyline.y, Y_darkCloud, 0, 1));
          if (have_button_invert  &&  open_invert) {
            c1 = lerpColor(changeBrightness(c_sky, this.var_b+20), changeBrightness(lerpColor(c_winFrame, c_sky, 0.15), this.var_b+20), map(this.node_boom[i][0].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
          }
        }

        TRIANGLES_getLine_weight_T_fill2(this.node_boom[i][0], this.node_boom[i][1], w, c1, c2);
      }
    }
  };




  this.displayInfo = function() {
    if (p5.Vector.dist(this.node[1], this.end) > real(40)) {
      LINES_getLine(this.node[0], this.node[1]);
    }
    if (this.is_boom) {
      for (let i=0; i<this.node_boom.length; i++) {
        LINES_getLine(this.node_boom[i][0], this.node_boom[i][1]);
      }
    }
  };
}