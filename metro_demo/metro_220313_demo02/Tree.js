function Tree(begin_room, W_room, index_z) {
  this.ran = random(-999, 999);
  this.index_z = index_z;
  this.var_easing1 = random(0.1, 0.6);
  this.begin_room = begin_room.copy();
  this.W_room = W_room;

  this.node = new Array(floor(random(4, 7)));


  this.H_ori_target = H_floor * random(map(stateVar_floor[state_floor][this.index_z*2+1], 2, 14, 0.55, 2.0), map(stateVar_floor[state_floor][this.index_z*2+2]+1, 2, 14, 0.75, 2.5));

  if (state_floor == 3) {
    this.H_ori_target = H_floor * random(1.75, 2.5);
  }
  this.H_ori = this.H_ori_target;

  this.W = real(random(15, 30)) * map(this.H_ori_target, H_floor*0.55, H_floor*2.5, 0.35, 1.5);
  if (state_floor == 3) {
    this.W = real(random(45, 90)) * map(this.node.length, 4, 7, 0.75, 1);
  }
  this.begin = this.begin_room.copy().add(random(this.W/2.0, (this.W_room-this.W/2.0)), 0, random(this.W/2.0, (this.W_room-this.W/2.0)));




  if (state_click == 2) {
    this.count_sub = 0;
    this.begin_target = this.begin.copy();
    this.begin_lastClick = this.begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(2, 5));
  } else if (state_click == 3) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(5, 15));
    //this.H_ori_target = this.H;
    this.H_ori_ori = this.H_ori;
  } 






  this.node_rotate = new Array(this.node.length);
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, this.node.length-1, 0.5, 1);
    if (state_floor == 3) {
      if (i==1) {
        lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25);
      } else if (i==2) {
        lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.1, HALF_PI*0.1);
      } else {
        lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.35, HALF_PI*0.35) * map(i, 0, this.node.length-1, 0.5, 1);
      }
    }
    this.node_rotate[i] = lz;
  }


  this.node[0] = this.begin.copy();
  this.node[1] = createVector(0, -this.H_ori, 0);
  this.node[1] = PRotateZ(this.node[1], this.node_rotate[1]);
  this.node[1].add(this.node[0]);
  for (let i=2; i<this.node.length; i++) {
    this.node[i] = p5.Vector.sub(this.node[i-1], this.node[i-2]).mult(0.8);
    this.node[i] = PRotateZ(this.node[i], this.node_rotate[i]);
    this.node[i].add(this.node[i-1]);
  }


  this.node_E_trunk = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_E_trunk.length; i++) {
    if (i==0) {
      this.node_E_trunk[i][0] = this.node[0].copy().add(-this.W/2.0, 0, 0);
      this.node_E_trunk[i][1] = this.node[0].copy().add(this.W/2.0, 0, 0);
    } else {
      const w = constrain(map(i, 0, this.node_E_trunk.length-1, this.W, 0), 0, this.W);
      const n = p5.Vector.sub(this.node[i-1], this.node[i]).setMag(w/2.0);
      this.node_E_trunk[i][0] = PRotateZ(n, HALF_PI).add(this.node[i]);
      this.node_E_trunk[i][1] = PRotateZ(n, -HALF_PI).add(this.node[i]);
    }
  }




  this.node_branch = new Array(this.node.length-2);
  this.node_branch_rotate = new Array(this.node_branch.length);
  this.node_E_branch = new Array(this.node_branch.length);
  this.W_branch = new Array(this.node.length-2);
  this.show_branch = new Array(this.node.length-2);

  for (let i=0; i<this.node_branch.length; i++) {
    this.node_branch[i] = Array.from(Array(2), () => new Array(floor(random(2.5, max(this.node.length-(i+1)+1, 2.1)+0.7))));
    this.node_branch_rotate[i] = Array.from(Array(2), () => new Array(this.node_branch[i][0].length));
    this.node_E_branch[i] = Array.from(Array(2), () => new Array(this.node_branch[i][0].length));
    this.W_branch[i] = new Array(2);
    this.show_branch[i] = new Array(2);

    for (let j=0; j<this.node_branch[i].length; j++) {

      for (let k=0; k<this.node_branch[i][j].length; k++) {
        this.node_E_branch[i][j][k] = new Array(2);
        this.node_branch[i][j][k] = this.node[i+1].copy();
        if (k == 1) {
          if (j == 0) {
            this.node_branch_rotate[i][0][1] = random(-HALF_PI*0.75, -HALF_PI*0.15);
          } else {
            this.node_branch_rotate[i][1][1] = random(HALF_PI*0.15, HALF_PI*0.75);
          }
        } else {
          if (j == 0) {
            this.node_branch_rotate[i][0][k] = map(noise(i*100+k*5+this.ran+999), 0, 1, -HALF_PI*0.5, HALF_PI*0.5);
          } else {
            this.node_branch_rotate[i][1][k] = map(noise(i*100+k*5+this.ran-999), 0, 1, -HALF_PI*0.5, HALF_PI*0.5);
          }
        }
      }


      this.W_branch[i][j] = map(i, 0, this.node_E_trunk.length-1, this.W, 0) * random(0.25, 0.5);

      this.show_branch[i][j] = random(1) < 0.25;
      if (i==0) {
        this.show_branch[i][j] = random(1) < 0.05;
      }
    }
  }



  for (let i=0; i<this.node_branch.length; i++) {
    for (let j=0; j<this.node_branch[i].length; j++) {
      for (let k=0; k<this.node_branch[i][j].length; k++) {
        if (k == 0) {
          this.node_branch[i][j][0] = this.node[i+1].copy();
        } else if (k == 1) {
          const n = p5.Vector.sub(this.node[i+2], this.node[i+1]).mult(0.8);
          this.node_branch[i][j][k] = PRotateZ(n, this.node_branch_rotate[i][j][k]).add(this.node[i+1]);
        } else {
          const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k-2]).mult(0.8);
          this.node_branch[i][j][k] = PRotateZ(n, this.node_branch_rotate[i][j][k]).add(this.node_branch[i][j][k-1]);
        }



        if (j == 0) {
          if (k == 0) {

            const n = p5.Vector.sub(this.node_branch[i][j][1], this.node_branch[i][j][0]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
            this.node_E_branch[i][j][k][0] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
            this.node_E_branch[i][j][k][1] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
          } else {
            const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
            this.node_E_branch[i][j][k][0] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
            this.node_E_branch[i][j][k][1] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
          }
        } else {
          if (k == 0) {
            const n = p5.Vector.sub(this.node_branch[i][j][1], this.node_branch[i][j][0]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
            this.node_E_branch[i][j][k][0] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
            this.node_E_branch[i][j][k][1] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
          } else {
            const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
            this.node_E_branch[i][j][k][0] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
            this.node_E_branch[i][j][k][1] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
          }
        }
      }
    }
  }






  this.node_base = new Array(6);
  for (let i=0; i<this.node_base.length; i++) {
    const x = cos(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
    const z = sin(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
    this.node_base[i] = this.begin.copy().add(x, 0, z);
  }












  this.have_foliage = false;
  if (random(1) < rate_foliage) {
    this.have_foliage = true;
  }



  if (this.have_foliage) {
    this.W_foliage_target = max(this.H_ori_target * 2, real(50));
    this.W_foliage = this.W_foliage_target;

    this.node_foliage = new Array(10);
    for (let i=0; i<this.node_foliage.length; i++) {
      let x = cos(map(i, 0, this.node_foliage.length, 0, TWO_PI));
      let y = sin(map(i, 0, this.node_foliage.length, 0, TWO_PI));
      let w = map(noise(x+this.ran, y+this.ran), 0, 1, this.W_foliage/2.0*0.5, this.W_foliage/2.0*1.5);
      x *= w;
      y *= w;
      this.node_foliage[i] = createVector(x, y, -real(1)).add(this.node[this.node.length-2]);
    }
  }















  this.change = function() {
    this.ran = random(-999, 999);
    this.var_easing1 = random(0.1, 0.6);

    this.node = new Array(floor(random(4, 7)));


    this.H_ori_target = H_floor * random(map(stateVar_floor[state_floor][this.index_z*2+1], 2, 14, 0.55, 2.0), map(stateVar_floor[state_floor][this.index_z*2+2]+1, 2, 14, 0.75, 2.5));
    if (state_floor == 3) {
      this.H_ori_target = H_floor * random(1.75, 2.5);
    }
    this.H_ori = 0;

    this.W = real(random(15, 30)) * map(this.H_ori_target, H_floor*0.55, H_floor*2.5, 0.35, 1.5);
    if (state_floor == 3) {
      this.W = real(random(45, 90)) * map(this.node.length, 4, 7, 0.75, 1);
    }
    this.begin = this.begin_room.copy().add(random(this.W/2.0, (this.W_room-this.W/2.0)), 0, random(this.W/2.0, (this.W_room-this.W/2.0)));






    for (let i=0; i<this.node.length; i++) {
      this.node[i] = this.begin.copy();
    }


    this.node_rotate = new Array(this.node.length);
    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, this.node.length-1, 0.5, 1);
      if (state_floor == 3) {
        if (i==1) {
          lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25);
        } else if (i==2) {
          lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.1, HALF_PI*0.1);
        } else {
          lz = map(noise(i+this.ran), 0, 1, -HALF_PI*0.35, HALF_PI*0.35) * map(i, 0, this.node.length-1, 0.5, 1);
        }
      }
      this.node_rotate[i] = lz;
    }


    this.node_E_trunk = Array.from(Array(this.node.length), () => new Array(2));
    for (let i=0; i<this.node_E_trunk.length; i++) {
      for (let j=0; j<this.node_E_trunk[i].length; j++) {
        this.node_E_trunk[i][j] = this.begin.copy();
      }
    }



    this.node_branch = new Array(this.node.length-2);
    this.node_branch_rotate = new Array(this.node_branch.length);
    this.node_E_branch = new Array(this.node_branch.length);
    this.W_branch = new Array(this.node.length-2);
    this.show_branch = new Array(this.node.length-2);

    for (let i=0; i<this.node_branch.length; i++) {
      this.node_branch[i] = Array.from(Array(2), () => new Array(floor(random(2.5, max(this.node.length-(i+1)+1, 2.1)+0.7))));
      this.node_branch_rotate[i] = Array.from(Array(2), () => new Array(this.node_branch[i][0].length));
      this.node_E_branch[i] = Array.from(Array(2), () => new Array(this.node_branch[i][0].length));
      this.W_branch[i] = new Array(2);
      this.show_branch[i] = new Array(2);

      for (let j=0; j<this.node_branch[i].length; j++) {

        for (let k=0; k<this.node_branch[i][j].length; k++) {
          this.node_E_branch[i][j][k] = new Array(2);
          this.node_branch[i][j][k] = this.node[i+1].copy();
          if (k == 1) {
            if (j == 0) {
              this.node_branch_rotate[i][0][1] = random(-HALF_PI*0.75, -HALF_PI*0.15);
            } else {
              this.node_branch_rotate[i][1][1] = random(HALF_PI*0.15, HALF_PI*0.75);
            }
          } else {
            if (j == 0) {
              this.node_branch_rotate[i][0][k] = map(noise(i*100+k*5+this.ran+999), 0, 1, -HALF_PI*0.5, HALF_PI*0.5);
            } else {
              this.node_branch_rotate[i][1][k] = map(noise(i*100+k*5+this.ran-999), 0, 1, -HALF_PI*0.5, HALF_PI*0.5);
            }
          }
        }


        this.W_branch[i][j] = map(i, 0, this.node_E_trunk.length-1, this.W, 0) * random(0.25, 0.5);

        this.show_branch[i][j] = random(1) < 0.25;
        if (i==0) {
          this.show_branch[i][j] = random(1) < 0.05;
        }
      }
    }

    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        for (let k=0; k<this.node_branch[i][j].length; k++) {
          for (let l=0; l<this.node_branch[i][j][k].length; l++) {
            this.node_branch[i][j][k][l] = this.begin.copy();
          }
        }
      }
    }






    if (this.have_foliage) {
      if (state_floor != 3) {
        this.W_foliage_target = max(this.H_ori_target * 2, real(50));
      } else {
        this.W_foliage_target = max(this.H_ori_target * 1, real(50));
      }
      this.W_foliage = 0;

      for (let i=0; i<this.node_foliage.length; i++) {
        this.node_foliage[i] = this.node[this.node.length-2].copy();
      }
    }
  };











  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < this.node.length-2  &&  random(1)<0.85  &&  this.begin.x>-real(1500)) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == this.node.length-2) {
        this.begin_target.y += this.H_ori * pow(0.8, this.count_sub-1);
      } else {
        this.begin_target.y += this.H_ori * pow(0.8, this.count_sub-1);
      }
      this.is_falling = true;
      this.time_falling = 0;
      this.time_max_falling = floor(random(5, 10));
      if (state_floor == 3) {
        this.time_max_falling *= 2;
      }
    }

    if (this.have_foliage) {
      this.W_foliage_target -= real(250);
      this.W_foliage_target = max(0, this.W_foliage_target);
    }
  };









  this.changeH = function() {
    if (!this.open_spring  &&  random(1) < 0.85) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(9, 17));
      if (state_floor != 3) {
        this.H_ori_target = constrain(real(map(this.W, real(15)*0.35, real(30)*1.5, 75, 250)), real(75), real(250));
        this.H_ori_ori = this.H_ori;
      } else {
        if (!this.have_foliage) {
          this.H_ori_target = real(10);
        } else {
          this.H_ori_target = real(350);
        }
        this.H_ori_ori = this.H_ori;
      }
    }
  };

























  this.update = function() {
    this.begin_room.x += speed;
    this.begin.x += speed;




    if (state_click == 0) {
      this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing1);
    } else if (state_click == 2  &&  this.is_falling) {
      if (this.time_falling < this.time_max_falling) {
        this.time_falling ++;
      } else {
        this.is_falling = false;
        this.begin_lastClick = this.begin_target.copy();
      }
      let l = map(sin(map(this.time_falling, 0, this.time_max_falling, HALF_PI, PI)), 1, 0, 0.001, 1);
      this.begin.y = (this.begin_target.y - this.begin_lastClick.y)*l + this.begin_lastClick.y;
    } else if (state_click == 3  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_ori = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_ori_target);
    }






    this.node[0] = this.begin.copy();
    this.node[1] = createVector(0, -this.H_ori, 0);
    this.node[1] = PRotateZ(this.node[1], this.node_rotate[1]);
    this.node[1].add(this.node[0]);
    for (let i=2; i<this.node.length; i++) {
      this.node[i]= p5.Vector.sub(this.node[i-1], this.node[i-2]).mult(0.8);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i]);
      this.node[i].add(this.node[i-1]);
    }



    for (let i=0; i<this.node_E_trunk.length; i++) {
      if (i==0) {
        this.node_E_trunk[i][0] = this.node[0].copy().add(-this.W/2.0, 0, 0);
        this.node_E_trunk[i][1] = this.node[0].copy().add(this.W/2.0, 0, 0);
      } else {
        const w = constrain(map(i, 0, this.node_E_trunk.length-1, this.W, 0), 0, this.W);
        const n = p5.Vector.sub(this.node[i-1], this.node[i]).setMag(w/2.0);
        this.node_E_trunk[i][0] =PRotateZ(n, HALF_PI).add(this.node[i]);
        this.node_E_trunk[i][1] = PRotateZ(n, -HALF_PI).add(this.node[i]);
      }
    }




    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        if (this.show_branch[i][j]) {
          for (let k=0; k<this.node_branch[i][j].length; k++) {
            if (k == 0) {
              this.node_branch[i][j][0] = this.node[i+1].copy();
            } else if (k == 1) {
              let rate = 0.8;
              if (state_floor == 3) {
                rate = 0.3;
              }
              const n = p5.Vector.sub(this.node[i+2], this.node[i+1]).mult(rate);
              this.node_branch[i][j][k] = PRotateZ(n, this.node_branch_rotate[i][j][k]).add(this.node[i+1]);
            } else {
              let rate = 0.7;
              if (state_floor == 3) {
                rate = 0.7;
              }
              const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k-2]).mult(rate);
              this.node_branch[i][j][k] = PRotateZ(n, this.node_branch_rotate[i][j][k]).add(this.node_branch[i][j][k-1]);
            }



            if (j == 0) {
              if (k == 0) {
                const n = p5.Vector.sub(this.node_branch[i][j][1], this.node_branch[i][j][0]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
                this.node_E_branch[i][j][k][0] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
                this.node_E_branch[i][j][k][1] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
              } else {
                const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
                this.node_E_branch[i][j][k][0] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
                this.node_E_branch[i][j][k][1] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
              }
            } else {
              if (k == 0) {
                const n = p5.Vector.sub(this.node_branch[i][j][1], this.node_branch[i][j][0]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
                this.node_E_branch[i][j][k][0] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
                this.node_E_branch[i][j][k][1] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
              } else {
                const n = p5.Vector.sub(this.node_branch[i][j][k-1], this.node_branch[i][j][k]).setMag(map(k, 0, this.node_branch[i][j].length-1, this.W_branch[i][j]/2.0, 0));
                this.node_E_branch[i][j][k][0] = PRotateZ(n, HALF_PI).add(this.node_branch[i][j][k]);
                this.node_E_branch[i][j][k][1] = PRotateZ(n, -HALF_PI).add(this.node_branch[i][j][k]);
              }
            }
          }
        }
      }
    }






    if (state_click == 2) {
      const w = constrain(map(this.count_sub, 0, this.node_E_trunk.length-1, this.W, 0), 0, this.W);
      for (let i=0; i<this.node_base.length; i++) {
        const x = cos(map(i, 0, this.node_base.length, 0, TWO_PI)) * w/2.0;
        const z = sin(map(i, 0, this.node_base.length, 0, TWO_PI)) * w/2.0;
        this.node_base[i] = this.node[this.count_sub].copy().add(x, 0, z);
      }

      for (let i=0; i<this.node_branch_rotate.length; i++) {
        if ( i <= this.count_sub-1) {
          for (let j=0; j<this.node_branch_rotate[i].length; j++) {
            for (let k=0; k<this.node_branch_rotate[i][j].length; k++) {
              this.node_branch_rotate[i][j][k] = easing_x(this.node_branch_rotate[i][j][k], this.node_rotate[i+1], 0.2);
            }
          }
        }
      }
    } else {
      for (let i=0; i<this.node_base.length; i++) {
        const x = cos(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
        const z = sin(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
        this.node_base[i] = this.begin.copy().add(x, 0, z);
      }
    }







    if (this.have_foliage) {
      this.W_foliage = easing_x(this.W_foliage, this.W_foliage_target, this.var_easing1*0.75);


      for (let i=0; i<this.node_foliage.length; i++) {
        let x = cos(map(i, 0, this.node_foliage.length, 0, TWO_PI));
        let y = sin(map(i, 0, this.node_foliage.length, 0, TWO_PI));
        let w = map(noise(x+this.ran, y+this.ran), 0, 1, this.W_foliage/2.0*0.5, this.W_foliage/2.0*1.5);
        x *= w;
        y *= w;
        this.node_foliage[i] = createVector(x, y, -real(1));
        if (state_floor != 3) {
          this.node_foliage[i].add(this.node[this.node.length-2]);
        } else {
          this.node_foliage[i].add(this.node[this.node.length-1]);
        }
      }
    }
  };


















  this.display = function() {
    //noStroke();
    //beginShape(TRIANGLES);

    let t = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    for (let i=0; i<this.node_E_trunk.length-1; i++) {
      TRIANGLES_getRect(this.node_E_trunk[i+1][0], this.node_E_trunk[i+1][1], this.node_E_trunk[i][1], this.node_E_trunk[i][0]);
    }


    for (let i=0; i<this.node_branch.length; i++) {
      //if (state_click != 2  ||  i >= this.count_sub) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        if (this.show_branch[i][j]) {
          for (let k=0; k<this.node_branch[i][j].length-1; k++) {
            TRIANGLES_getRect(this.node_E_branch[i][j][k+1][0], this.node_E_branch[i][j][k+1][1], this.node_E_branch[i][j][k][1], this.node_E_branch[i][j][k][0]);
          }
        }
      }
      //}
    }



    for (let i=0; i<3; i++) {
      vertex(this.node_base[i].x, this.node_base[i].y, this.node_base[i].z);
      if (state_click == 2) {
        vertex(this.node[this.count_sub+1].x, this.node[this.count_sub+1].y, this.node[this.count_sub+1].z);
      } else {
        vertex(this.node[1].x, this.node[1].y, this.node[1].z);
      }
      vertex(this.node_base[(i+1)%this.node_base.length].x, this.node_base[(i+1)%this.node_base.length].y, this.node_base[(i+1)%this.node_base.length].z);
    }








    if (this.have_foliage) {

      for (let i=0; i<this.node_foliage.length; i++) {
        let c1 = lerpColor(c_near, c_sky, constrain(map(this.node[0].z-real(0), skyline.z, 0, 1, 0), 0, 1));
        let c2 = lerpColor(c_near, c_sky, constrain(map(this.node[0].z-real(700), skyline.z, 0, 1, 0), 0, 1));
        let c3 = lerpColor(c_near, c_sky, constrain(map(this.node[0].z-real(700), skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c1, c2, map(cos(map(i, 0, this.node_foliage.length, HALF_PI, TWO_PI+HALF_PI)), 1, -1, 1, 0));
        c3 = lerpColor(c1, c3, map(cos(map((i+1)%this.node_foliage.length, 0, this.node_foliage.length, HALF_PI, TWO_PI+HALF_PI)), 1, -1, 1, 0));

        TRIANGLES_getTriangle_fill3(this.node[3], this.node_foliage[i], this.node_foliage[(i+1)%this.node_foliage.length], c1, c2, c3);
      }
    }

    //endShape();
  };













  this.displayInfo = function() {

    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }
    for (let i=0; i<this.node_branch.length; i++) {
      for (let j=0; j<this.node_branch[i].length; j++) {
        if (this.show_branch[i][j]) {
          for (let k=0; k<this.node_branch[i][j].length-1; k++) {
            LINES_getLine(this.node_branch[i][j][k], this.node_branch[i][j][k+1]);
          }
        }
      }
    }



    if (this.have_foliage) {

      for (let i=0; i<this.node_foliage.length; i++) {
        LINES_getLine(this.node_foliage[i], this.node_foliage[(i+1)%this.node_foliage.length]);
      }
    }


    /*
    noFill();
     stroke(0, 0, 255);
     strokeWeight(real(2));
     beginShape(LINES);
     for (let i=0; i<this.node.length-1; i++) {
     LINES_getLine(this.node[i], this.node[i+1]);
     LINES_getLine(this.node_E_trunk[i][0], this.node_E_trunk[i+1][0]);
     LINES_getLine(this.node_E_trunk[i][1], this.node_E_trunk[i+1][1]);
     }
     endShape();
     
     strokeWeight(real(5));
     beginShape(POINTS);
     for (let i=0; i<this.node.length; i++) {
     vertex(this.node[i].x, this.node[i].y, this.node[i].z);
     }
     endShape();
     
     
     
     stroke(0, 255, 255);
     strokeWeight(real(1));
     beginShape(LINES);
     for (let i=0; i<this.node_branch.length; i++) {
     for (let j=0; j<this.node_branch[i].length; j++) {
     if (this.show_branch[i][j]) {
     for (let k=0; k<this.node_branch[i][j].length-1; k++) {
     LINES_getLine(this.node_branch[i][j][k], this.node_branch[i][j][k+1]);
     LINES_getLine(this.node_E_branch[i][j][k][0], this.node_E_branch[i][j][k+1][0]);
     LINES_getLine(this.node_E_branch[i][j][k][1], this.node_E_branch[i][j][k+1][1]);
     }
     }
     }
     }
     endShape();
     
     strokeWeight(real(3));
     beginShape(POINTS);
     for (let i=0; i<this.node_branch.length; i++) {
     for (let j=0; j<this.node_branch[i].length; j++) {
     if (this.show_branch[i][j]) {
     for (let k=0; k<this.node_branch[i][j].length; k++) {
     vertex(this.node_branch[i][j][k].x, this.node_branch[i][j][k].y, this.node_branch[i][j][k].z);
     }
     }
     }
     }
     endShape();
     */
  };
}