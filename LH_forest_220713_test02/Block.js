function Block(begin, W, D, index_x) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.index_x = index_x;
  this.dead = false;
  this.var_easing = random(0.2, 0.7);





  this.is_empty = false;
  this.is_tree = false;
  this.is_house = false;
  this.is_houseConstr = false;
  this.is_fence = false;
  this.is_hole = false;




  let sum = rate_empty + rate_tree + rate_house + rate_houseConstr + rate_fence + rate_hole;
  const real_rate_empty = rate_empty / sum;
  const real_rate_tree = rate_tree / sum;
  const real_rate_house = rate_house / sum;
  const real_rate_houseConstr = rate_houseConstr / sum;
  const real_rate_fence = rate_fence / sum;
  const real_rate_hole = rate_hole / sum;

  const var_rate = random(1);


  if (var_rate < real_rate_empty) {
    this.is_empty = true;
  } else if (var_rate < real_rate_empty + real_rate_tree) {
    this.is_tree = true;
  } else if (var_rate < real_rate_empty + real_rate_tree + real_rate_house) {
    this.is_house = true;
  } else if (var_rate < real_rate_empty + real_rate_tree + real_rate_house + real_rate_houseConstr) {
    this.is_houseConstr = true;
  } else if (var_rate < real_rate_empty + real_rate_tree + real_rate_house + real_rate_houseConstr + real_rate_fence) {
    this.is_fence = true;
  } else if (var_rate < real_rate_empty + real_rate_tree + real_rate_house + real_rate_houseConstr + real_rate_fence + real_rate_hole) {
    this.is_hole = true;
  }






  this.node = new Array(4);
  this.node[0] = this.begin.copy();
  this.node[1] = this.begin.copy().add(W, 0, 0);
  this.node[2] = this.begin.copy().add(W, 0, D);
  this.node[3] = this.begin.copy().add(0, 0, D);









  if (this.is_tree) {
    this.num_tree = floor(random(1, 4));
    this.W_tree = new Array(this.num_tree);
    this.begin_tree = new Array(this.num_tree);
    this.tree = new Array(this.num_tree);

    for (let i=0; i<this.num_tree; i++) {
      this.W_tree[i] = real(random(15, 30));    
      this.begin_tree[i] = this.begin.copy().add(random(this.W_tree[i]/2.0, this.W-this.W_tree[i]/2.0), 0, random(this.W_tree[i]/2.0, this.D-this.W_tree[i]/2.0));
      this.tree[i] = new Tree(this.begin_tree[i], this.W_tree[i]);
    }
  } else if (this.is_house) {
    this.W_house = real(random(250, 300));
    this.begin_house = this.begin.copy().add(random(this.W_house/2.0, this.W-this.W_house/2.0), 0, random(this.W_house/2.0, this.D-this.W_house/2.0));

    this.house = new House(this.begin_house, this.W_house);
  } else if (this.is_houseConstr) {
    this.W_house = real(random(180, 225));    
    this.begin_house = this.begin.copy().add(random(this.W_house/2.0, this.W-this.W_house/2.0), 0, random(this.W_house/2.0, this.D-this.W_house/2.0));

    this.houseConstr = new House_Constr(this.begin_house, this.W_house);
  } else if (this.is_fence) {
    this.W_fence = max(this.W*random(0.5, 0.95), real(300));
    this.D_fence = max(this.D*random(0.5, 0.95), real(300));
    this.center_fence = this.begin.copy().add(random(this.W_fence/2.0, this.W-this.W_fence/2.0), 0, random(this.D_fence/2.0, this.D-this.D_fence/2.0));
    this.node_fence = Array.from(Array(4*4), () => new Array(2));
    this.H_fence = new Array(this.node_fence.length);
    this.H_fence_target = new Array(this.node_fence.length);
    this.rotate_fence = random(-HALF_PI/4.0, HALF_PI/4.0);

    for (let i=0; i<this.node_fence.length; i++) {
      this.H_fence_target[i] = real(random(40, 70));
      this.H_fence[i] = 0;
      for (let j=0; j<this.node_fence[i].length; j++) {
        let x, y, z;
        y = -this.H_fence[i] * j;
        if (i < this.node_fence.length/4) {
          x = map(i, 0, this.node_fence.length/4, -this.W_fence/2.0, this.W_fence/2.0);
          z = -this.D_fence/2.0;
        } else if (i < this.node_fence.length/4*2) {
          x = this.W_fence/2.0;
          z = map(i, this.node_fence.length/4, this.node_fence.length/4*2, -this.D_fence/2.0, this.D_fence/2.0);
        } else if (i < this.node_fence.length/4*3) {
          x = map(i, this.node_fence.length/4*2, this.node_fence.length/4*3, this.W_fence/2.0, -this.W_fence/2.0);
          z = this.W_fence/2.0;
        } else {
          x = -this.W_fence/2.0;
          z = map(i, this.node_fence.length/4*3, this.node_fence.length, this.D_fence/2.0, -this.D_fence/2.0);
        }

        this.node_fence[i][j] = createVector(x, y, z);
        this.node_fence[i][j] = PRotateY(this.node_fence[i][j], this.rotate_fence);
        this.node_fence[i][j].add(this.center_fence);
      }
    }
  } else if (this.is_hole) {
    this.W_hole = real(random(150, 300));
    this.center_hole = this.begin.copy().add(random(this.W_hole/2.0, this.W-this.W_hole/2.0), 0, random(this.W_hole/2.0, this.D-this.W_hole/2.0));

    this.node_hole = new Array(10);
    for (let i=0; i<this.node_hole.length; i++) {
      let x = cos(map(i, 0, this.node_hole.length, 0, TWO_PI)) * this.W_hole/2.0;
      let z = sin(map(i, 0, this.node_hole.length, 0, TWO_PI)) * this.W_hole/2.0;
      this.node_hole[i] = createVector(x, 0, z);
      this.node_hole[i].add(this.center_hole);
    }


    this.node_ladder = Array.from(Array(7), () => new Array(2));
    this.which_node_ladder = new Array(2);
    this.which_node_ladder[0] = floor(this.node_hole.length/4.0 * random(2.5, 3.5));
    this.which_node_ladder[1] = this.which_node_ladder[0] + 1;
    for (let i=0; i<this.node_ladder.length; i++) {
      for (let j=0; j<this.node_ladder[i].length; j++) {
        this.node_ladder[i][j] = p5.Vector.sub(this.node_hole[this.which_node_ladder[j]].copy().add(0, real(250), 0), this.node_hole[this.which_node_ladder[j]]).mult(i/this.node_ladder.length).add(this.node_hole[this.which_node_ladder[j]]);
        this.node_ladder[i][j] = p5.Vector.sub(this.center_hole.copy().add(0, this.node_ladder[i][j].y, 0), this.node_ladder[i][j]).setMag(real(10)).add(this.node_ladder[i][j]);
      }
    }
  }











  this.update = function() {
    this.begin.y = skyline.y+Y_shake;

    if (this.begin.z < endLine) {
      this.begin.z += speed;
    } else {
      this.dead = true;
    }
    /*
    if (this.index_x==2 || this.index_x==3) {
     if (this.begin.z < endLine) {
     this.begin.z += speed;
     } else {
     this.dead = true;
     }
     } else if (this.index_x==1 || this.index_x==4) {
     if (this.begin.z < 0) {
     this.begin.z += speed;
     } else {
     this.dead = true;
     }
     } else if (this.index_x==0 || this.index_x==5) {
     if (this.begin.z < -real(1000)) {
     this.begin.z += speed;
     } else {
     this.dead = true;
     }
     }
     */


    this.node[0] = this.begin.copy();
    this.node[1] = this.begin.copy().add(W, 0, 0);
    this.node[2] = this.begin.copy().add(W, 0, D);
    this.node[3] = this.begin.copy().add(0, 0, D);





    if (this.is_tree) {
      for (let i=0; i<this.num_tree; i++) {
        this.begin_tree[i].y = skyline.y+Y_shake;
        this.begin_tree[i].z += speed;
        this.tree[i].update(this.begin_tree[i]);
      }
    } else  if (this.is_house) {
      this.begin_house.y = skyline.y+Y_shake;
      this.begin_house.z += speed;
      this.house.update(this.begin_house);
    } else if (this.is_houseConstr) {
      this.begin_house.y = skyline.y+Y_shake;
      this.begin_house.z += speed;
      this.houseConstr.update(this.begin_house);
    } else if (this.is_fence) {
      this.center_fence.y = skyline.y+Y_shake;
      this.center_fence.z += speed;
      for (let i=0; i<this.node_fence.length; i++) {
        this.H_fence[i] = easing_x(this.H_fence[i], this.H_fence_target[i], this.var_easing*0.5);
        for (let j=0; j<this.node_fence[i].length; j++) {
          let x, y, z;
          y = -this.H_fence[i] * j;
          if (i < this.node_fence.length/4) {
            x = map(i, 0, this.node_fence.length/4, -this.W_fence/2.0, this.W_fence/2.0);
            z = -this.D_fence/2.0;
          } else if (i < this.node_fence.length/4*2) {
            x = this.W_fence/2.0;
            z = map(i, this.node_fence.length/4, this.node_fence.length/4*2, -this.D_fence/2.0, this.D_fence/2.0);
          } else if (i < this.node_fence.length/4*3) {
            x = map(i, this.node_fence.length/4*2, this.node_fence.length/4*3, this.W_fence/2.0, -this.W_fence/2.0);
            z = this.W_fence/2.0;
          } else {
            x = -this.W_fence/2.0;
            z = map(i, this.node_fence.length/4*3, this.node_fence.length, this.D_fence/2.0, -this.D_fence/2.0);
          }
          if (j == 1) {
            x += map(noise(this.ran+i*222), 0, 1, -real(20), real(20));
            z += map(noise(this.ran-i*222), 0, 1, -real(20), real(20));
          }
          this.node_fence[i][j] = createVector(x, y, z);
          this.node_fence[i][j] = PRotateY(this.node_fence[i][j], this.rotate_fence);
          this.node_fence[i][j].add(this.center_fence);
        }
      }
    } else if (this.is_hole) {
      this.center_hole.y = skyline.y+Y_shake;
      this.center_hole.z += speed;      
      for (let i=0; i<this.node_hole.length; i++) {
        let x = cos(map(i, 0, this.node_hole.length, 0, TWO_PI)) * this.W_hole/2.0;
        let z = sin(map(i, 0, this.node_hole.length, 0, TWO_PI)) * this.W_hole/2.0;
        this.node_hole[i] = createVector(x, 0, z);
        this.node_hole[i].add(this.center_hole);
      }


      for (let i=0; i<this.node_ladder.length; i++) {
        for (let j=0; j<this.node_ladder[i].length; j++) {
          this.node_ladder[i][j] = p5.Vector.sub(this.node_hole[this.which_node_ladder[j]].copy().add(0, real(250), 0), this.node_hole[this.which_node_ladder[j]]).mult(i/this.node_ladder.length).add(this.node_hole[this.which_node_ladder[j]]);
          this.node_ladder[i][j] = p5.Vector.sub(this.center_hole.copy().add(0, this.node_ladder[i][j].y, 0), this.node_ladder[i][j]).setMag(real(10)).add(this.node_ladder[i][j]);
        }
      }
    }
  };















  this.display = function() {
    if (this.is_tree) {
      for (let i=0; i<this.num_tree; i++) {
        this.tree[i].display();
      }
    } else if (this.is_house) {
      this.house.display();
    } else if (this.is_houseConstr) {
      this.houseConstr.display();
    } else if (this.is_fence) {
      for (let i=0; i<this.node_fence.length; i++) {
        let c1 = realColor(this.node_fence[i][0]);
        let c2 = realColor(this.node_fence[i][1]);
        TRIANGLES_getLine_weight_fill2(this.node_fence[i][0], this.node_fence[i][1], real(7.5), c1, c2);


        const m = p5.Vector.sub(this.node_fence[i][1], this.node_fence[i][0]).mult(0.75).add(this.node_fence[i][0]);
        const m_1 = p5.Vector.sub(this.node_fence[(i+1)%this.node_fence.length][1], this.node_fence[(i+1)%this.node_fence.length][0]).mult(0.75).add(this.node_fence[(i+1)%this.node_fence.length][0]);
        c1 = realColor(m);
        c2 = realColor(m_1);
        TRIANGLES_getLine_weight_Y_fill2(m, m_1, real(4.5), c1, c2);
      }
    } else if (this.is_hole) {
      fill(255);
      TRIANGLES_getRect(this.node[3], this.node[2], this.node[2].copy().add(0, real(1000), 0), this.node[3].copy().add(0, real(1000), 0));
      if (this.begin.x < 0) {
        TRIANGLES_getRect(this.node[2], this.node[1], this.node[1].copy().add(0, real(1000), 0), this.node[2].copy().add(0, real(1000), 0));
      } else {
        TRIANGLES_getRect(this.node[3], this.node[0], this.node[0].copy().add(0, real(1000), 0), this.node[3].copy().add(0, real(1000), 0));
      }

      for (let i=0; i<this.node_hole.length/2; i++) {
        if (i < this.node_hole.length/4) {
          TRIANGLES_getTriangle(this.node_hole[i], this.node_hole[i+1], this.node[2]);
        } else {
          TRIANGLES_getTriangle(this.node_hole[i], this.node_hole[i+1], this.node[3]);
        }
      }
      TRIANGLES_getTriangle(this.node_hole[ceil(this.node_hole.length/4)], this.node[2], this.node[3]);
      if (this.begin.x < 0) {
        TRIANGLES_getTriangle(this.node_hole[0], this.node[2], this.node[1]);
        TRIANGLES_getTriangle(this.node_hole[0], this.node_hole[this.node_hole.length-1], this.node[1]);
      } else {
        TRIANGLES_getTriangle(this.node_hole[this.node_hole.length/2], this.node[3], this.node[0]);
        TRIANGLES_getTriangle(this.node_hole[this.node_hole.length/2], this.node_hole[this.node_hole.length/2+1], this.node[0]);
      }



      for (let i=0; i<this.node_hole.length; i++) {
        let c1 = realColor(this.node_hole[i]);
        let c2 = realColor(this.node_hole[(i+1)%this.node_hole.length]);
        let c3 = realColor(this.node_hole[(i+1)%this.node_hole.length].copy().add(0, 0, real(-1500)));
        let c4 = realColor(this.node_hole[i].copy().add(0, 0, real(-1500)));
        TRIANGLES_getRect_fill4(this.node_hole[i], this.node_hole[(i+1)%this.node_hole.length], this.node_hole[(i+1)%this.node_hole.length].copy().add(0, real(250), 0), this.node_hole[i].copy().add(0, real(250), 0), c1, c2, c3, c4);
      }


      fill(255);
      for (let j=0; j<this.node_ladder[0].length; j++) {
        TRIANGLES_getLine_weight(this.node_ladder[0][j].copy().add(0, -real(25), 0), this.node_ladder[this.node_ladder.length-1][j], real(8));
      }
      for (let i=1; i<this.node_ladder.length-1; i++) {
        TRIANGLES_getLine_weight_Y(this.node_ladder[i][0], this.node_ladder[i][1], real(5.5));
      }
    }
  };

















  this.displayInfo_red = function() {
    LINES_getRect(this.node[0], this.node[1], this.node[2], this.node[3]);
  };



  this.displayInfo = function() {
    if (this.is_tree) {
      for (let i=0; i<this.num_tree; i++) {
        this.tree[i].displayInfo();
      }
    } else if (this.is_house) {
      this.house.displayInfo();
    } else if (this.is_houseConstr) {
      this.houseConstr.displayInfo();
    } else if (this.is_fence) {
      LINES_getLine(this.center_fence, this.center_fence.copy().add(0, -real(100), 0));
      //LINES_getLine(this.node_fence[0][1], this.node_fence[2*4][1]);
      for (let i=0; i<this.node_fence.length; i++) {
        LINES_getLine(this.node_fence[i][0], this.node_fence[i][1]);
      }
    } else if (this.is_hole) {
      LINES_getEllipse(this.node_hole);

      // for (let i=0; i<this.node_ladder.length; i++) {
      for (let j=0; j<this.node_ladder[0].length; j++) {
        LINES_getLine(this.node_ladder[0][j], this.node_ladder[0][j].copy().add(0, real(2000), 0));
      }
      //}
    }
  };
}
