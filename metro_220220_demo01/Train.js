function Train(center, W, D, is_faceRight) {
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
    this.node_win[i] =Array.from(Array(3), () => new Array(5*4));
    for (let j=0; j<3; j++) {
      const center_win =  p5.Vector.sub(this.node[i][0][2], this.node[i][0][3]).mult(1/6.0 * (j*2+1)).add(this.node[i][0][3]).add(0, -this.H*0.6, real(0.1));
      for (let k=0; k<this.node_win[i][j].length; k++) {
        const w = WH_winFrame[state_winFrame][0] / (225/(this.W/3.0*0.75));
        const h = WH_winFrame[state_winFrame][1] / (225/(this.W/3.0*0.75));
        const w_fillet = WH_winFrame[state_winFrame][2] / (225/(this.W/3.0*0.75));
        const x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
        const y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
        if (k < floor(this.node_win[i][j].length/4)) {
          this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
        } else if (k < floor(this.node_win[i][j].length/4)*2) {
          this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
        } else if (k < floor(this.node_win[i][j].length/4)*3) {
          this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
        } else {
          this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
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
      this.node1_center.x += speed *2;
      if ((this.node1_center.x+this.W/2.0 - (this.W+this.gap)*this.num) > endLine) {
        this.dead = true;
      }
    } else {
      this.node1_center.x -= speed *2;
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
          const w = WH_winFrame[state_winFrame][0] / (225/(this.W/3.0*0.75));
          const h = WH_winFrame[state_winFrame][1] / (225/(this.W/3.0*0.75));
          const w_fillet = WH_winFrame[state_winFrame][2] / (225/(this.W/3.0*0.75));
          const x = cos(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
          const y = sin(map(k, 0, this.node_win[i][j].length-1, -PI, PI)) * (w_fillet*0.5);
          if (k < floor(this.node_win[i][j].length/4)) {
            this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*2) {
            this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, 0);
          } else if (k < floor(this.node_win[i][j].length/4)*3) {
            this.node_win[i][j][k] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
          } else {
            this.node_win[i][j][k] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, 0);
          }
          this.node_win[i][j][k].add(center_win);
        }
      }
    }
  };











  this.display = function() {
    let t;

    noStroke();
    for (let i=0; i<this.node.length; i++) {
      //---F---
      t = constrain(map(this.node[i][0][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      beginShape();
      vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
      vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
      vertex(this.node[i][0][2].x, this.node[i][0][2].y, this.node[i][0][2].z);
      vertex(this.node[i][0][3].x, this.node[i][0][3].y, this.node[i][0][3].z);
      endShape(CLOSE);


      //---U---
      beginShape();
      t = constrain(map(this.node[i][1][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node[i][1][0].x, this.node[i][1][0].y, this.node[i][1][0].z);
      vertex(this.node[i][1][1].x, this.node[i][1][1].y, this.node[i][1][1].z);
      t = constrain(map(this.node[i][1][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
      vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
      endShape(CLOSE);


      if (this.node[i][0][3].x > -real(100)) {
        beginShape();
        t = constrain(map(this.node[i][0][0].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        vertex(this.node[i][0][0].x, this.node[i][0][0].y, this.node[i][0][0].z);
        vertex(this.node[i][1][0].x, this.node[i][1][0].y, this.node[i][1][0].z);
        t = constrain(map(this.node[i][0][3].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        vertex(this.node[i][1][3].x, this.node[i][1][3].y, this.node[i][1][3].z);
        vertex(this.node[i][0][3].x, this.node[i][0][3].y, this.node[i][0][3].z);
        endShape(CLOSE);
      }



      if (this.node[i][0][2].x < real(100)) {
        beginShape();
        t = constrain(map(this.node[i][0][1].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        vertex(this.node[i][0][1].x, this.node[i][0][1].y, this.node[i][0][1].z);
        vertex(this.node[i][1][1].x, this.node[i][1][1].y, this.node[i][1][1].z);
        t = constrain(map(this.node[i][0][2].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        vertex(this.node[i][1][2].x, this.node[i][1][2].y, this.node[i][1][2].z);
        vertex(this.node[i][0][2].x, this.node[i][0][2].y, this.node[i][0][2].z);
        endShape(CLOSE);
      }
    }




    //--- win ---
    noStroke();
    for (let i=0; i<this.node_win.length; i++) {
      //t = constrain(map(this.node_win[i][0][0].z-real(2000), skyline.z, 0, 1, 0), 0, 1);
      //fill(lerpColor(c_near, c_far, 1));
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
    noFill();
    stroke(c_infoGreen2);
    strokeWeight(real(2));

    beginShape(LINES);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<4; k++) {
          vertex(this.node[i][j][k].x, this.node[i][j][k].y, this.node[i][j][k].z);
          vertex(this.node[i][j][(k+1)%4].x, this.node[i][j][(k+1)%4].y, this.node[i][j][(k+1)%4].z);
        }
      }

      for (let k=0; k<4; k++) {
        vertex(this.node[i][0][k].x, this.node[i][0][k].y, this.node[i][0][k].z);
        vertex(this.node[i][1][k].x, this.node[i][1][k].y, this.node[i][1][k].z);
      }
    }
    endShape();



    for (let i=0; i<this.node_win.length; i++) {
      for (let j=0; j<3; j++) {
        beginShape();
        for (let k=0; k<this.node_win[i][j].length; k++) {
          vertex(this.node_win[i][j][k].x, this.node_win[i][j][k].y, this.node_win[i][j][k].z);
        }
        endShape(CLOSE);
      }
    }
  };
}