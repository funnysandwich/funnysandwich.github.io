function River(begin, W_block) {
  this.begin = begin.copy();
  this.ran = random(-999, 999);
  this.W_block = W_block;
  this.W_target = max(random(this.W_block*0.2, this.W_block*0.75), real(150));
  this.W = this.W_target;
  this.var_easing1 = random(0.075, 0.175);


  this.node = new Array(20*2);
  for (let i=0; i<this.node.length/2; i++) {
    let z = map(i, 0, this.node.length/2-1, 0, skyline.z);
    let x = this.begin.x + (this.W_block-this.W)/2.0;
    x += map(noise(this.ran+i*0.1), 0, 1, -real(50), real(50));
    this.node[i] = createVector(x, this.begin.y, z);
  }
  for (let i=this.node.length/2; i<this.node.length; i++) {
    let z = map(i, this.node.length/2, this.node.length-1, 0, skyline.z);
    let x = this.begin.x + this.W_block - (this.W_block-this.W)/2.0;
    x += map(noise(this.ran+(i-this.node.length/2)*0.1), 0, 1, -real(100), real(100));
    this.node[i] = createVector(x, this.begin.y, z);
  }




  if (open_bridge) {
    this.have_bridge = new Array(5);
    this.bridges = [];
    for (let i=0; i<this.have_bridge.length; i++) {
      this.have_bridge[i] = random(1) < rate_bridge;
      if (open_sea  &&  i > 1) {
        this.have_bridge[i] = false;
      }
      if (this.have_bridge[i]) {
        let d = real(100)*5;
        let z = map(i, 0, 5, -d, -d*6) - gap_block*i;
        this.bridges.push(new Bridge(createVector(this.begin.x, this.begin.y, z), this.W_block));
      }
    }
  }



  this.have_PTTower = false;
  if (open_PTTower  &&  random(1) < rate_PTTower) {
    this.have_PTTower = true;
  }




  if (this.have_PTTower) {
    this.num_PTTower = floor(random(3, 5));
    if (open_sea) {
      this.num_PTTower = 3;
    }
    this.pTTower = new Array(this.num_PTTower);
    for (let i=0; i<this.num_PTTower; i++) {
      let w = max((this.W_block-this.W_target)/2.0 * random(0.25, 0.55), real(60));
      let x = this.begin.x + w/2.0;
      if ((this.W_block-this.W_target)/2.0*0.75 - w/2.0  >  w/2.0) {
        x = this.begin.x + random(w/2.0, (this.W_block-this.W_target)/2.0*0.75 - w/2.0);
      }
      if (random(1)<0.5) {
        x = this.begin.x+this.W_block - w/2.0;
        if ((this.W_block-this.W_target)/2.0*0.75 - w/2.0  >  w/2.0) {
          x = this.begin.x+this.W_block - random(w/2.0, (this.W_block-this.W_target)/2.0*0.75 - w/2.0);
        }
      }
      let z = -floor(map(i, 0, this.num_PTTower-1, 0, 7)) * (real(100)*5+gap_block);
      if (i!=0 && i!=this.num_PTTower-1) {
        if (random(1) < 0.5) {
          z += real(100)*2.5 + w/2.0;
        } else {
          z -= (real(100)*2.5 + gap_block + w/2.0);
        }
        if (open_sea) {
          z = -2 * (real(100)*5+gap_block)  +  real(100)*2.5 + w/2.0;
        }
      } else {
        z += real(100)*2.5 + w/2.0;
      }
      let h = real(random(300, 400));
      if (i == 0) {
        h = real(500);
      }
      this.pTTower[i] = new PTTower(createVector(x, skyline.y, z), w, h, i, this.num_PTTower, false);
    }

    for (let i=0; i<this.num_PTTower; i++) {
      if (i < this.num_PTTower-1) {
        this.pTTower[i].node_lineL_end = this.pTTower[i+1].node_earL[1].copy();
        this.pTTower[i].node_lineR_end = this.pTTower[i+1].node_earR[1].copy();
      }
    }
  }

















  this.change = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.075, 0.175);
    this.W_target = max(random(this.W_block*0.2, this.W_block*0.75), real(150));
    this.W = 0;


    if (open_bridge) {
      this.bridges = [];
      for (let i=0; i<this.have_bridge.length; i++) {
        this.have_bridge[i] = random(1) < rate_bridge;
        if (open_sea  &&  i > 1) {
          this.have_bridge[i] = false;
        }
        if (this.have_bridge[i]) {
          let d = real(100)*5;
          let z = map(i, 0, 5, -d, -d*6) - gap_block*i;
          this.bridges.push(new Bridge(createVector(this.begin.x, this.begin.y, z), this.W_block));
        }
      }

      if (this.bridges.length > 0) {
        for (let i=0; i<this.bridges.length; i++) {
          this.bridges[i].change();
        }
      }
    }


    this.have_PTTower = false;
    if (open_PTTower  &&  random(1) < rate_PTTower) {
      this.have_PTTower = true;
    }


    if (this.have_PTTower) {
      this.num_PTTower = floor(random(3, 5));
      if (open_sea) {
        this.num_PTTower = 3;
      }
      this.pTTower = new Array(this.num_PTTower);
      for (let i=0; i<this.num_PTTower; i++) {
        let w = max((this.W_block-this.W_target)/2.0 * random(0.25, 0.55), real(60));
        let x = this.begin.x + w/2.0;
        if ((this.W_block-this.W_target)/2.0*0.75 - w/2.0  >  w/2.0) {
          x = this.begin.x + random(w/2.0, (this.W_block-this.W_target)/2.0*0.75 - w/2.0);
        }
        if (random(1)<0.5) {
          x = this.begin.x+this.W_block - w/2.0;
          if ((this.W_block-this.W_target)/2.0*0.75 - w/2.0  >  w/2.0) {
            x = this.begin.x+this.W_block - random(w/2.0, (this.W_block-this.W_target)/2.0*0.75 - w/2.0);
          }
        }
        let z = -floor(map(i, 0, this.num_PTTower-1, 0, 7)) * (real(100)*5+gap_block);
        if (i!=0 && i!=this.num_PTTower-1) {
          if (random(1) < 0.5) {
            z += real(100)*2.5 + w/2.0;
          } else {
            z -= (real(100)*2.5 + gap_block + w/2.0);
          }
          if (open_sea) {
            z = -2 * (real(100)*5+gap_block)  +  real(100)*2.5 + w/2.0;
          }
        } else {
          z += real(100)*2.5 + gap_block  + w/2.0;
        }
        let h = real(random(300, 400));
        if (i == 0) {
          h = real(500);
        }
        this.pTTower[i] = new PTTower(createVector(x, skyline.y, z), w, h, i, this.num_PTTower, false);
      }

      for (let i=0; i<this.num_PTTower; i++) {
        if (i < this.num_PTTower-1) {
          this.pTTower[i].node_lineL_end = this.pTTower[i+1].node_earL[1].copy();
          this.pTTower[i].node_lineR_end = this.pTTower[i+1].node_earR[1].copy();
        }
      }
    }
  };













  this.update = function() {
    this.begin.x += speed;
    this.W = easing_x(this.W, this.W_target, this.var_easing1);

    for (let i=0; i<this.node.length/2; i++) {
      let z = map(i, 0, this.node.length/2-1, 0, skyline.z);
      let x = this.begin.x + (this.W_block-this.W)/2.0;
      x += map(noise(this.ran+i*0.1), 0, 1, -real(50), real(50));
      this.node[i] = createVector(x, this.begin.y, z);
    }
    for (let i=this.node.length/2; i<this.node.length; i++) {
      let z = map(i, this.node.length/2, this.node.length-1, 0, skyline.z);
      let x = this.begin.x + this.W_block - (this.W_block-this.W)/2.0;
      x += map(noise(this.ran+(i-this.node.length/2)*0.1), 0, 1, -real(100), real(100));
      this.node[i] = createVector(x, this.begin.y, z);
    }


    if (open_bridge) {
      if (this.bridges.length > 0) {
        for (let i=0; i<this.bridges.length; i++) {
          this.bridges[i].update();
        }
      }
    }



    if (this.have_PTTower) {
      for (let i=0; i<this.num_PTTower; i++) {

        if (i < this.num_PTTower-1) {
          this.pTTower[i].node_lineL_end = this.pTTower[i+1].node_earL[1].copy();
          this.pTTower[i].node_lineR_end = this.pTTower[i+1].node_earR[1].copy();
        }
        this.pTTower[i].update();
      }
    }
  };




  this.display = function() {
    //noStroke();
    //beginShape(TRIANGLES);


    for (let i=0; i<this.node.length/2-1; i++) {
      const c1 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i].z, skyline.z, 0, 1, 0), 0, 1));
      const c2 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i+1].z, skyline.z, 0, 1, 0), 0, 1));
      const c3 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i+this.node.length/2+1].z, skyline.z, 0, 1, 0), 0, 1));
      const c4 = lerpColor(lerpColor(c_near, c_sky, 0.25), c_sky, constrain(map(this.node[i+this.node.length/2].z, skyline.z, 0, 1, 0), 0, 1));
      TRIANGLES_getRect_fill4(this.node[i], this.node[i+1], this.node[i+this.node.length/2+1], this.node[i+this.node.length/2], c1, c2, c3, c4);
    }




    if (open_bridge) {
      if (this.bridges.length > 0) {
        for (let i=0; i<this.bridges.length; i++) {
          this.bridges[i].display();
        }
      }
    }


    if (this.have_PTTower) {

      for (let i=0; i<this.num_PTTower; i++) {
        this.pTTower[i].display();
      }
    }
    //endShape();
  };





  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoYellow);
    //strokeWeight(real(2));
    //beginShape(TRIANGLE_STRIP);
    for (let i=0; i<this.node.length/2-1; i++) {
      //vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      //vertex(this.node[i+this.node.length/2].x, this.node[i+this.node.length/2].y, this.node[i+this.node.length/2].z);
      LINES_getLine(this.node[i], this.node[i+1]);
      LINES_getLine(this.node[i+this.node.length/2], this.node[i+this.node.length/2+1]);
      LINES_getLine(this.node[i], this.node[i+this.node.length/2]);
      LINES_getLine(this.node[i], this.node[i+this.node.length/2+1]);
    }
    // endShape();



    if (open_bridge) {
      if (this.bridges.length > 0) {
        for (let i=0; i<this.bridges.length; i++) {
          this.bridges[i].displayInfo();
        }
      }
    }



    if (this.have_PTTower) {
      //stroke(c_info2);
      //noFill();
      //strokeWeight(real(2));
      //beginShape(LINES);
      for (let i=0; i<this.num_PTTower; i++) {
        this.pTTower[i].displayInfo();
      }
      //endShape();
    }
  };
}
