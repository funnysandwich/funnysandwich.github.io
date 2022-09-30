function Train(center, W, D, is_faceRight, index_song, index_z) {
  this.W = W;
  this.D = D*0.75;
  this.H_target = real(random(250, 300));
  this.H = this.H_target;
  this.is_faceRight = is_faceRight;
  this.gap = real(20);
  this.dead = false;
  this.num = floor(random(3, 6));
  this.node1_center = center.copy();
  this.var_easing1 = random(0.2, 0.4);


  this.node = new Array(this.num);

  for (let i=0; i<this.node.length; i++) {
    this.node[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<2; j++) {
      for (let k=0; k<4; k++) {
        this.node[i][j][k] = createVector(this.W/2.0 * pow(-1, ceil(k%1.5)+1), -this.H*j, this.D/2.0 * pow(-1, floor(k/2)+1));
        this.node[i][j][k].add(this.node1_center);
        if (this.is_faceRight) {
          this.node[i][j][k].add(-(this.W+this.gap)*i, 0, 0);
        } else {
          this.node[i][j][k].add((this.W+this.gap)*i, 0, 0);
        }
      }
    }
  }





  this.node_win = new Array(this.num);
  for (let i=0; i<this.node_win.length; i++) {
    this.node_win[i] =Array.from(Array(3), () => new Array(3*4));
    for (let j=0; j<3; j++) {
      const center_win =  p5.Vector.sub(this.node[i][0][2], this.node[i][0][3]).mult(1/6.0 * (j*2+1)).add(this.node[i][0][3]).add(0, -this.H*0.6, real(0.1));
      for (let k=0; k<this.node_win[i][j].length; k++) {
        let w = WH_winFrame[state_winFrame][0] / (225/(this.W/3.0*0.75));
        let h = WH_winFrame[state_winFrame][1] / (225/(this.W/3.0*0.75));
        let w_fillet = WH_winFrame[state_winFrame][2] / (225/(this.W/3.0*0.75));
        let x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
        let y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
        let state = WH_winFrame[state_winFrame][4];
        if (state > 0  &&  state < 5) {
          state = 0;
        }

        if (state == 0) {

          if (k < floor(this.node_win[i][j].length/4)) {
            this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*2) {
            this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*3) {
            this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
          } else {
            this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
          }
        } else if (state == 5  ||  state == 6  ||  state == 8) {
          let s_w_fillet = w_fillet;
          if (state == 5) {
            s_w_fillet = 5 / (225/(this.W/3.0*0.75));
            if (k < this.node_win[i][j].length/2) {
              s_w_fillet = w_fillet;
            }
          } else if (state == 6) {
            s_w_fillet = 5 / (225/(this.W/3.0*0.75));
            if (k >= this.node_win[i][j].length/4  &&  k < this.node_win[i][j].length/4*3) {
              s_w_fillet = w_fillet;
            }
          } else if (state == 8) {
            s_w_fillet = 2.5 / (225/(this.W/3.0*0.75));
            if (k < this.node_win[i][j].length/4  ||  k >= this.node_win[i][j].length/4*2  &&  k < this.node_win[i][j].length/4*3) {
              s_w_fillet = w_fillet;
            }
          }
          x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (s_w_fillet*0.5);
          y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (s_w_fillet*0.5);
          if (k < floor(this.node_win[i][j].length/4)) {
            this.node_win[i][j][k] = createVector(x-(w-s_w_fillet)*0.5, y-(h-s_w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*2) {
            this.node_win[i][j][k] = createVector(x+(w-s_w_fillet)*0.5, y-(h-s_w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*3) {
            this.node_win[i][j][k] = createVector(x+(w-s_w_fillet)*0.5, y+(h-s_w_fillet)*0.5, 0);
          } else {
            this.node_win[i][j][k] = createVector(x-(w-s_w_fillet)*0.5, y+(h-s_w_fillet)*0.5, 0);
          }
        } else if (state == 7) {
          if (k < floor(this.node_win[i][j].length/4)) {
            x = cos(map(k, 0, this.node_win[i][j].length/4-1, HALF_PI, 0)) * (w_fillet*0.5);
            y = sin(map(k, 0, this.node_win[i][j].length/4-1, HALF_PI, 0)) * (w_fillet*0.5);
            this.node_win[i][j][k] = createVector(x-w/2.0, y-h/2.0, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*2) {
            x = cos(map(k, this.node_win[i][j].length/4, this.node_win[i][j].length/4*2-1, PI, HALF_PI)) * (w_fillet*0.5);
            y = sin(map(k, this.node_win[i][j].length/4, this.node_win[i][j].length/4*2-1, PI, HALF_PI)) * (w_fillet*0.5);
            this.node_win[i][j][k] = createVector(x+w/2.0, y-h/2.0, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*3) {
            x = cos(map(k, this.node_win[i][j].length/4*2, this.node_win[i][j].length/4*3-1, PI+HALF_PI, PI)) * (w_fillet*0.5);
            y = sin(map(k, this.node_win[i][j].length/4*2, this.node_win[i][j].length/4*3-1, PI+HALF_PI, PI)) * (w_fillet*0.5);
            this.node_win[i][j][k] = createVector(x+w/2.0, y+h/2.0, 0);
          } else {
            x = cos(map(k, this.node_win[i][j].length/4*3, this.node_win[i][j].length-1, 0, -HALF_PI)) * (w_fillet*0.5);
            y = sin(map(k, this.node_win[i][j].length/4*3, this.node_win[i][j].length-1, 0, -HALF_PI)) * (w_fillet*0.5);
            this.node_win[i][j][k] = createVector(x-w/2.0, y+h/2.0, 0);
          }
        }







        this.node_win[i][j][k].add(center_win);
      }
    }
  }







  this.change = function() {
    this.H_target = real(random(250, 300));
    this.H = 0;
    this.var_easing1 = random(0.2, 0.4);
    //this.num = floor(random(3, 6));

    //this.node = new Array(this.num);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<4; k++) {
          this.node[i][j][k] = this.node1_center.copy();
        }
      }
    }
  };












  this.update = function(center) {
    this.node1_center.y = center.y;

    if (this.is_faceRight) {
      this.node1_center.x += max(ori_speed, speed) *2;
      if ((this.node1_center.x+this.W/2.0 - (this.W+this.gap)*this.num) > endLine) {
        this.dead = true;
      }

      if (this.node1_center.x > -real(2500)-this.W/2.0  &&  this.node1_center.x < real(2500)-this.W/2.0+(this.W+this.gap)*this.num) {
        if (!song_trainPass[index_song].isPlaying()) {
          song_trainPass[index_song].loop();
        }
        let volume_max = constrain(map(index_z, 0, 3, 0.65, 0.25), 0, 0.65);
        let volume = sin(map(this.node1_center.x, -real(2500)-this.W/2.0, real(2500)-this.W/2.0+(this.W+this.gap)*this.num, 0, PI)) * volume_max;
        if (!is_onTheGround) {
          volume = map(constrain(cameraY, -real(300), 0), -real(300), 0, 0, volume_max);
        }
        song_trainPass[index_song].setVolume(volume);
        let p = constrain(map(this.node1_center.x, -real(2500)-this.W/2.0+real(500), real(2500)-this.W/2.0+(this.W+this.gap)*this.num-real(500), -1, 1), -1, 1);
        song_trainPass[index_song].pan(p);
      }
    } else {
      this.node1_center.x -= max(ori_speed, speed) *2;
      if ((this.node1_center.x-this.W/2.0) < beginLine) {
        this.dead = true;
      }
    }


    this.H = easing_x(this.H, this.H_target, this.var_easing1);




    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<4; k++) {
          this.node[i][j][k] = createVector(this.W/2.0 * pow(-1, ceil(k%1.5)+1), -this.H*j, this.D/2.0 * pow(-1, floor(k/2)+1));
          this.node[i][j][k].add(this.node1_center);
          if (this.is_faceRight) {
            this.node[i][j][k].add(-(this.W+this.gap)*i, 0, 0);
          } else {
            this.node[i][j][k].add((this.W+this.gap)*i, 0, 0);
          }
        }
      }
    }





    for (let i=0; i<this.node_win.length; i++) {
      for (let j=0; j<3; j++) {
        const center_win =  p5.Vector.sub(this.node[i][0][2], this.node[i][0][3]).mult(1/6.0 * (j*2+1)).add(this.node[i][0][3]).add(0, -this.H*0.6, real(0.1));
        for (let k=0; k<this.node_win[i][j].length; k++) {
          let w = WH_winFrame[state_winFrame][0] / (225/(this.W/3.0*0.75));
          let h = WH_winFrame[state_winFrame][1] / (225/(this.W/3.0*0.75));
          let w_fillet = WH_winFrame[state_winFrame][2] / (225/(this.W/3.0*0.75));
          let x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
          let y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
          let state = WH_winFrame[state_winFrame][4];
          if (state > 0  &&  state < 5) {
            state = 0;
          }

          if (state == 0) {

            if (k < floor(this.node_win[i][j].length/4)) {
              this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*2) {
              this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*3) {
              this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
            } else {
              this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
            }
          } else if (state == 5  ||  state == 6  ||  state == 8) {
            let s_w_fillet = w_fillet;
            if (state == 5) {
              s_w_fillet = 5 / (225/(this.W/3.0*0.75));
              if (k < this.node_win[i][j].length/2) {
                s_w_fillet = w_fillet;
              }
            } else if (state == 6) {
              s_w_fillet = 5 / (225/(this.W/3.0*0.75));
              if (k >= this.node_win[i][j].length/4  &&  k < this.node_win[i][j].length/4*3) {
                s_w_fillet = w_fillet;
              }
            } else if (state == 8) {
              s_w_fillet = 2.5 / (225/(this.W/3.0*0.75));
              if (k < this.node_win[i][j].length/4  ||  k >= this.node_win[i][j].length/4*2  &&  k < this.node_win[i][j].length/4*3) {
                s_w_fillet = w_fillet;
              }
            }
            x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (s_w_fillet*0.5);
            y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (s_w_fillet*0.5);
            if (k < floor(this.node_win[i][j].length/4)) {
              this.node_win[i][j][k] = createVector(x-(w-s_w_fillet)*0.5, y-(h-s_w_fillet)*0.5, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*2) {
              this.node_win[i][j][k] = createVector(x+(w-s_w_fillet)*0.5, y-(h-s_w_fillet)*0.5, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*3) {
              this.node_win[i][j][k] = createVector(x+(w-s_w_fillet)*0.5, y+(h-s_w_fillet)*0.5, 0);
            } else {
              this.node_win[i][j][k] = createVector(x-(w-s_w_fillet)*0.5, y+(h-s_w_fillet)*0.5, 0);
            }
          } else if (state == 7) {
            if (k < floor(this.node_win[i][j].length/4)) {
              x = cos(map(k, 0, this.node_win[i][j].length/4-1, HALF_PI, 0)) * (w_fillet*0.5);
              y = sin(map(k, 0, this.node_win[i][j].length/4-1, HALF_PI, 0)) * (w_fillet*0.5);
              this.node_win[i][j][k] = createVector(x-w/2.0, y-h/2.0, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*2) {
              x = cos(map(k, this.node_win[i][j].length/4, this.node_win[i][j].length/4*2-1, PI, HALF_PI)) * (w_fillet*0.5);
              y = sin(map(k, this.node_win[i][j].length/4, this.node_win[i][j].length/4*2-1, PI, HALF_PI)) * (w_fillet*0.5);
              this.node_win[i][j][k] = createVector(x+w/2.0, y-h/2.0, 0);
            } else if (k < floor(this.node_win[i][j].length/4)*3) {
              x = cos(map(k, this.node_win[i][j].length/4*2, this.node_win[i][j].length/4*3-1, PI+HALF_PI, PI)) * (w_fillet*0.5);
              y = sin(map(k, this.node_win[i][j].length/4*2, this.node_win[i][j].length/4*3-1, PI+HALF_PI, PI)) * (w_fillet*0.5);
              this.node_win[i][j][k] = createVector(x+w/2.0, y+h/2.0, 0);
            } else {
              x = cos(map(k, this.node_win[i][j].length/4*3, this.node_win[i][j].length-1, 0, -HALF_PI)) * (w_fillet*0.5);
              y = sin(map(k, this.node_win[i][j].length/4*3, this.node_win[i][j].length-1, 0, -HALF_PI)) * (w_fillet*0.5);
              this.node_win[i][j][k] = createVector(x-w/2.0, y+h/2.0, 0);
            }
          }







          this.node_win[i][j][k].add(center_win);
        }
      }
    }
  };











  this.display = function() {
    let c1, c2;

    //noStroke();
    for (let i=0; i<this.node.length; i++) {
      //---F---
      fill(lerpColor(c_near, c_far, constrain(map(this.node[i][0][3].z, skyline.z, 0, 1, 0), 0, 1)));
      //beginShape();
      //vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
      //vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
      //vertex(this.node[i][0][2].x, this.node[i][0][2].y, this.node[i][0][2].z);
      //vertex(this.node[i][0][3].x, this.node[i][0][3].y, this.node[i][0][3].z);
      //endShape(CLOSE);
      TRIANGLES_getRect(this.node[i][1][3], this.node[i][1][2], this.node[i][0][2], this.node[i][0][3]);


      //---U---
      //beginShape();
      //t = constrain(map(this.node[i][1][0].z, skyline.z, 0, 1, 0), 0, 1);
      //fill(lerpColor(c_near, c_far, t));
      //vertex(this.node[i][1][0].x, this.node[i][1][0].y, this.node[i][1][0].z);
      //vertex(this.node[i][1][1].x, this.node[i][1][1].y, this.node[i][1][1].z);
      //t = constrain(map(this.node[i][1][3].z, skyline.z, 0, 1, 0), 0, 1);
      //fill(lerpColor(c_near, c_far, t));
      //vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
      //vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
      //endShape(CLOSE);
      c1 = lerpColor(c_near, c_far, constrain(map(this.node[i][1][0].z, skyline.z, 0, 1, 0), 0, 1));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node[i][1][3].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node[i][1][0], this.node[i][1][1], this.node[i][1][2], this.node[i][1][3], c1, c1, c2, c2);


      if (this.node[i][0][3].x > -real(100)) {
        //beginShape();
        //t = constrain(map(this.node[i][0][0].z, skyline.z, 0, 1, 0), 0, 1);
        //fill(lerpColor(c_near, c_far, t));
        //vertex(this.node[i][0][0].x, this.node[i][0][0].y, this.node[i][0][0].z);
        //vertex(this.node[i][1][0].x, this.node[i][1][0].y, this.node[i][1][0].z);
        //t = constrain(map(this.node[i][0][3].z, skyline.z, 0, 1, 0), 0, 1);
        //fill(lerpColor(c_near, c_far, t));
        //vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
        //vertex(this.node[i][0][3].x, this.node[i][0][3].y, this.node[i][0][3].z);
        //endShape(CLOSE);
        c1 = lerpColor(c_near, c_far, constrain(map(this.node[i][0][0].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node[i][0][3].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node[i][0][0], this.node[i][1][0], this.node[i][1][3], this.node[i][0][3], c1, c1, c2, c2);
      }



      if (this.node[i][0][2].x < real(100)) {
        //beginShape();
        //t = constrain(map(this.node[i][0][1].z, skyline.z, 0, 1, 0), 0, 1);
        //fill(lerpColor(c_near, c_far, t));
        //vertex(this.node[i][0][1].x, this.node[i][0][1].y, this.node[i][0][1].z);
        //vertex(this.node[i][1][1].x, this.node[i][1][1].y, this.node[i][1][1].z);
        //t = constrain(map(this.node[i][0][2].z, skyline.z, 0, 1, 0), 0, 1);
        //fill(lerpColor(c_near, c_far, t));
        //vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
        //vertex(this.node[i][0][2].x, this.node[i][0][2].y, this.node[i][0][2].z);
        //endShape(CLOSE);
        c1 = lerpColor(c_near, c_far, constrain(map(this.node[i][0][1].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node[i][0][2].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node[i][0][1], this.node[i][1][1], this.node[i][1][2], this.node[i][0][2], c1, c1, c2, c2);
      }
    }
  };





  this.display_win = function() {
    //--- win ---
    noStroke();
    for (let i=0; i<this.node_win.length; i++) {
      for (let j=0; j<3; j++) {
        beginShape();
        for (let k=0; k<this.node_win[i][j].length; k++) {
          if (k == 0) {
            fill(lerpColor(c_sky, c_sky_near, 0.5));
          } else if (k == this.node_win[i][j].length/4*2) {
            fill(c_sky);
          }
          vertex(this.node_win[i][j][k].x, this.node_win[i][j][k].y, this.node_win[i][j][k].z);
        }
        endShape(CLOSE);
      }
    }
  };













  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoGreen2);
    //strokeWeight(real(2));

    //beginShape(LINES);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<4; k++) {
          LINES_getLine(this.node[i][j][k], this.node[i][j][(k+1)%4]);
        }
      }

      for (let k=0; k<4; k++) {
        LINES_getLine(this.node[i][0][k], this.node[i][1][k]);
      }
    }
    //endShape();



    for (let i=0; i<this.node_win.length; i++) {
      for (let j=0; j<3; j++) {
        //beginShape();
        for (let k=0; k<this.node_win[i][j].length; k++) {
          LINES_getLine(this.node_win[i][j][k], this.node_win[i][j][(k+1)%this.node_win[i][j].length]);
          //vertex(this.node_win[i][j][k].x, this.node_win[i][j][k].y, this.node_win[i][j][k].z);
        }
        //endShape(CLOSE);
      }
    }
  };
}