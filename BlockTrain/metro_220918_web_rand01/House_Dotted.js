function DottedHouse(begin, W, D, H, floor_num, index_z, index_block) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.H_ori = H;
  this.floor_num = floor_num;
  this.index_z = index_z;
  this.index_block = index_block;


  this.is_constr = false;
  this.is_normalHouse = false;
  this.is_cat = false;
  this.is_CTower = false;
  this.is_firewatch = false;
  this.is_buildingBlock = false;
  this.is_dottedLine = true;
  this.is_underGround = false;
  this.is_orient = false;


  this.open_change = false;
  this.time_change = 0;
  this.time_change_max = floor(random(0, 3));


  this.var_easing1 = random(0.4, 0.6);


  if (have_button_submerge) {
    this.count_sub = 0;
    this.begin_target = begin.copy();
    this.begin_lastClick = begin.copy();
    this.is_falling = false;
    this.time_falling = 0;
    this.time_max_falling = floor(random(2, 5));
  }  
  if (have_button_spring) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(3, 15));
    this.H_ori_target = this.H;
    this.H_ori_ori = this.H;
  }  
  if (state_click == 4) {
    this.open_bulge = false;
    this.time_bulge = new Array(this.floor_num+1);
    this.time_max_bulge = floor(random(3, 15));
    this.W_add_target = W;
    this.D_add_target = D;
    this.W_add = new Array(this.floor_num+1);
    this.D_add = new Array(this.floor_num+1);
    for (let i=0; i<this.time_bulge.length; i++) {
      this.time_bulge[i] = 0;
      this.W_add[i] = 0;
      this.D_add[i] = 0;
    }
  }


  //this.node = Array.from(Array(this.floor_num+1), () => new Array(4));
  //for (let i=0; i<this.node.length; i++) {
  //  const y = i * -this.H;
  //  for (let j=0; j<this.node[i].length; j++) {
  //    this.node[i][j] = createVector(this.W * ceil(j%1.5), y, this.D * floor(j/2)).add(this.begin);
  //  }
  //}

  this.node = new Array(this.floor_num+1);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy().add(this.W/2, 0, this.D/2);
  }


  this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.begin);
    }
  }


  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }


  this.have_crucifix = false;
  this.have_roof = false;
  this.have_handrail = false;
  this.have_billboard = false;
  this.have_billboardRoof = false;
  this.have_ladder = false;



  this.open_broken = false;
  this.var_scale_404 = max((min(this.W, H*this.floor_num) * 0.55), real(80)) / real(38);

  this.node_404 = new Array(node_fileBroken.length);
  for (let i=0; i<this.node_404.length; i++) {
    this.node_404[i] = createVector(real(node_fileBroken[i][0]), real(node_fileBroken[i][1]), 0);
    this.node_404[i].add(-real(50), -real(50), 0);
    if (i > 4) {
      this.node_404[i].add(0, 0, real(1));
    }
    if (i > 10) {
      this.node_404[i].add(0, 0, real(1));
    }
    this.node_404[i].mult(this.var_scale_404);
    //this.node_404[i] = PRotateZ(this.node_404[i], this.node_rotate[this.node_rotate.length-1]);
    this.node_404[i].add(p5.Vector.add(this.node_wall[this.node_wall.length-1][3], this.node_wall[0][2]).mult(0.5));
  }



  this.num_laoding = floor(random(7, 9));
  this.W_loading = min(min(random(this.W*0.25, this.W*0.5), real(75)), (H*this.floor_num)*0.85);
  this.W_point = real(7);

  this.node_loading = Array.from(Array(this.num_laoding), () => new Array(5));

  for (let i=0; i<this.node_loading.length; i++) {
    const x = cos(map(i, 0, this.node_loading.length, 0, TWO_PI)) * this.W_loading/2.0;
    const y = sin(map(i, 0, this.node_loading.length, 0, TWO_PI)) * this.W_loading/2.0;
    const center = createVector(x, y, 0).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][3], this.node_wall[0][2]).mult(0.5));
    for (let j=0; j<this.node_loading[i].length; j++) {
      const xx = cos(map(j, 0, this.node_loading[i].length, 0, TWO_PI)) * this.W_point/2.0;
      const yy = sin(map(j, 0, this.node_loading[i].length, 0, TWO_PI)) * this.W_point/2.0;
      this.node_loading[i][j] = createVector(xx, yy, 0).add(center);
    }
  }






  this.have_dino = false;
  if (open_dino  &&  random(1) < rate_dino) {
    this.have_dino = true;
  }


  if (this.have_dino) {
    this.var_scale_dino_Y = this.H_ori*this.floor_num / real(73);//max((max(this.W, H*this.floor_num)), real(80)) / real(68);
    this.var_scale_dino_X = constrain(this.W / real(68), this.var_scale_dino_Y*0.5, this.var_scale_dino_Y*2.0);//constrain(this.W / (H*this.floor_num), 0.6, 1.8);


    this.node_dinosaur = new Array(node_dino.length);
    for (let i=0; i<this.node_dinosaur.length; i++) {
      this.node_dinosaur[i] = createVector(real(node_dino[i][0]), real(node_dino[i][1]), 0);
      this.node_dinosaur[i].add(-real(50), -real(87.84), 0);
      this.node_dinosaur[i].x *= this.var_scale_dino_X;
      this.node_dinosaur[i].y *= this.var_scale_dino_Y;
      //this.node_dinosaur[i] = PRotateZ(this.node_dinosaur[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_dinosaur[i].add(p5.Vector.add(this.node_wall[0][3], this.node_wall[0][2]).mult(0.5));
    }
  }



























  this.change = function(begin1, W, D, H, floor_num, index_block) {
    this.begin = begin1.copy();
    this.ran = random(-999, 999);
    this.W = W;
    this.D = D;
    this.H_ori = H;
    this.floor_num = floor_num;
    this.index_block = index_block;
    this.open_change = false;
    this.time_change = 0;


    this.var_easing1 = random(0.4, 0.6);

    this.node = new Array(this.floor_num+1);
    for (let i=0; i<this.node.length; i++) {
      this.node[i] = this.begin.copy().add(this.W/2, 0, this.D/2);
    }

    this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.begin).add(this.W/2, 0, this.D/2);
      }
    }

    this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, 8, 0, 1);
      this.node_rotate[i][0] = lz;
      this.node_rotate[i][1] = 0;
    }




    this.var_scale_404 = max((min(this.W, H*this.floor_num) * 0.55), real(80)) / real(38);

    this.num_laoding = floor(random(7, 9));
    this.W_loading = min(min(random(this.W*0.25, this.W*0.5), real(75)), (H*this.floor_num)*0.85);
  };









  this.lightUpAllWin = function() {
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<this.have_winF[i].length; j++) {
        this.have_winF[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winF[i][j] = random(1) < 0.2;
        }
        this.have_winF_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winF_copy[i][j] = random(1) < 0.1;
        }
        this.time_winF[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winL[i].length; j++) {
        this.have_winL[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winL[i][j] = random(1) < 0.2;
        }
        this.have_winL_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winL_copy[i][j] = random(1) < 0.1;
        }
        this.time_winL[i][j] = floor(random(-20, 5));
      }
      for (let j=0; j<this.have_winR[i].length; j++) {
        this.have_winR[i][j] = random(1) < 0.99;
        if (i == this.floor_num-1) {
          this.have_winR[i][j] = random(1) < 0.2;
        }
        this.have_winR_copy[i][j] = random(1) < 0.2;
        if (i == this.floor_num-1) {
          this.have_winR_copy[i][j] = random(1) < 0.1;
        }
        this.time_winR[i][j] = floor(random(-20, 5));
      }
    }
  };








  this.changeBeginY = function() {
    if (!this.is_falling  &&  this.count_sub < this.floor_num  &&  random(1)<0.75) {
      this.count_sub += 1;
      this.begin_lastClick = this.begin.copy();
      if (this.count_sub == this.floor_num) {
        this.begin_target.y += this.H_ori*0.5;
      } else {
        this.begin_target.y += this.H_ori;
      }
      this.is_falling = true;
      this.time_falling = 0;
      this.time_max_falling = floor(random(2, 5));
    }
  };













  this.changeH = function() {
    if (!this.open_spring  &&  random(1) < 0.75) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(3, 15));
      this.H_ori_target = constrain(real(map(this.floor_num, 2, 8, 600, 200)), 200, 600);
      this.H_ori_ori = real(75);
      if (state_floor == 3) {
        this.H_ori_target = real(10);
        this.H_ori_ori = real(200);
      }
    }
  };









  this.changeW = function() {
    if (!this.open_bulge  &&  random(1) < 0.75) {
      this.open_bulge = true;
      this.time_max_bulge = floor(random(3, 20));
      this.W_add_target = constrain(real(map(this.floor_num, 2, 10, 50, 150)), 50, 200);
      this.D_add_target = constrain(real(map(this.floor_num, 2, 10, 50, 150)), 50, 200);
      for (let i=0; i<this.time_bulge.length; i++) {
        this.time_bulge[i] = -i;
        this.W_add[i] = 0;
        this.D_add[i] = 0;
      }
    }
  };

















  this.update = function(index_block) {
    this.index_block = index_block;


    if (this.open_change) {
      if (this.time_change < this.time_change_max) {
        this.time_change ++;
      }
    }


    this.begin.x += speed;
    //this.begin.y = skyline.y;





    if (have_button_submerge  &&  this.is_falling) {
      if (this.time_falling < this.time_max_falling) {
        this.time_falling ++;
      } else {
        this.is_falling = false;
        this.begin_lastClick = this.begin_target.copy();
      }
      let l = map(sin(map(this.time_falling, 0, this.time_max_falling, HALF_PI, PI)), 1, 0, 0.001, 1);
      this.begin.y = (this.begin_target.y - this.begin_lastClick.y)*l + this.begin_lastClick.y;
    }




    if (have_button_spring  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_ori = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_ori_target);
    }






    if (state_click == 4  &&  this.open_bulge) {
      for (let i=0; i<this.time_bulge.length; i++) {
        if (this.time_bulge[i] < this.time_max_bulge) {
          this.time_bulge[i] ++;
        } else if (i == this.time_bulge.length-1) {
          this.open_bulge = false;
        }
        this.W_add[i] = map(sin(map(constrain(this.time_bulge[i], 0, this.time_max_bulge), 0, this.time_max_bulge, 0, PI)), 0, 1, 0, this.W_add_target);
        this.D_add[i] = map(sin(map(constrain(this.time_bulge[i], 0, this.time_max_bulge), 0, this.time_max_bulge, 0, PI)), 0, 1, 0, this.W_add_target);
      }
    }





    this.node[0] = easing_p(this.node[0], this.begin.copy().add(this.W/2 + speed*2, 0, this.D/2), this.var_easing1);
    for (let i=1; i<this.node.length; i++) {
      let n;
      //if (i == 1) {
      n = createVector(speed, -this.H_ori, 0);
      //} else {
      //  n = createVector(speed, -this.H, 0).setMag(p5.Vector.dist(this.node[i-1], this.node[i-2])).mult(0.88);
      //}
      n = PRotateZ(n, this.node_rotate[i][0]);
      n = PRotateX(n, this.node_rotate[i][1]);
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, this.var_easing1);
    }


    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        let n = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1));
        if (state_click == 4) {
          let l = sin(map(i, 0, this.node_wall.length-1, 0, HALF_PI*1.75));
          n = createVector((this.W/2.0+this.W_add[i]*l) * pow(-1, ceil(j%1.5)+1), 0, (this.D/2.0+this.D_add[i]*l) * pow(-1, floor(j/2)+1));
        }
        n = PRotateZ(n, this.node_rotate[i][0]);
        n = PRotateX(n, this.node_rotate[i][1]);
        n.add(this.node[i]);
        this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, 0.5);
      }
    }











    for (let i=0; i<this.node_404.length; i++) {
      this.node_404[i] = createVector(real(node_fileBroken[i][0]), real(node_fileBroken[i][1]), 0);
      this.node_404[i].add(-real(50), -real(50), 0);
      if (i > 4) {
        this.node_404[i].add(0, 0, real(1));
      }
      if (i > 10) {
        this.node_404[i].add(0, 0, real(1));
      }
      this.node_404[i].mult(this.var_scale_404);
      //this.node_404[i] = PRotateZ(this.node_404[i], this.node_rotate[this.node_rotate.length-1]);
      this.node_404[i].add(p5.Vector.add(this.node_wall[this.node_wall.length-1][3], this.node_wall[0][2]).mult(0.5));
    }




    for (let i=0; i<this.node_loading.length; i++) {
      const x = cos(map(i, 0, this.node_loading.length, 0, TWO_PI)) * this.W_loading/2.0;
      const y = sin(map(i, 0, this.node_loading.length, 0, TWO_PI)) * this.W_loading/2.0;
      const center = createVector(x, y, 0).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][3], this.node_wall[0][2]).mult(0.5));
      const w = this.W_point+map(sin(-frameCount*0.15+this.ran+map(i, 0, this.node_loading.length, 0, TWO_PI)), -1, 1, 0, real(10));
      for (let j=0; j<this.node_loading[i].length; j++) {
        const xx = cos(map(j, 0, this.node_loading[i].length, 0, TWO_PI)) * w/2.0;
        const yy = sin(map(j, 0, this.node_loading[i].length, 0, TWO_PI)) * w/2.0;
        this.node_loading[i][j] = createVector(xx, yy, 0).add(center);
      }
    }





    if (this.have_dino) {
      this.var_scale_dino_Y = p5.Vector.dist(this.node_wall[0][0], this.node_wall[1][0])*this.floor_num / real(73);//max((max(this.W, H*this.floor_num)), real(80)) / real(68);
      this.var_scale_dino_X = constrain(this.W / real(68), this.var_scale_dino_Y*0.5, this.var_scale_dino_Y*2.0);//constrain(this.W / (H*this.floor_num), 0.6, 1.8);

      for (let i=0; i<this.node_dinosaur.length; i++) {
        this.node_dinosaur[i] = createVector(real(node_dino[i][0]), real(node_dino[i][1]), 0);
        this.node_dinosaur[i].add(-real(50), -real(87.84), 0);
        this.node_dinosaur[i].x *= this.var_scale_dino_X;
        this.node_dinosaur[i].y *= this.var_scale_dino_Y;
        //this.node_dinosaur[i] = PRotateZ(this.node_dinosaur[i], this.node_rotate[this.node_rotate.length-1]);
        this.node_dinosaur[i].add(p5.Vector.add(this.node_wall[0][3], this.node_wall[0][2]).mult(0.5));
      }
    }







    if (!this.open_broken) {
      const screen_LU = screenPosition(this.node_wall[this.node_wall.length-1][3]);
      const screen_RD = screenPosition(this.node_wall[0][2]);

      if (mouseX > screen_LU.x + width/2.0  &&  mouseX < screen_RD.x + width/2.0  &&
        mouseY > screen_LU.y + height/2.0  &&  mouseY < screen_RD.y + height/2.0) {
        this.open_broken = true;
      }
    }
  };















  this.display = function() {
  };












  this.display_TRIANGLES = function() {
    let t, c1, c2;

    //noStroke();
    //beginShape(TRIANGLES);

    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));

    if (!this.have_dino  ||  !this.open_broken) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        TRIANGLES_getLine_weightToR(this.node_wall[i+1][3], p5.Vector.add(this.node_wall[i+1][3], this.node_wall[i][3]).mult(0.5), real(15));
        TRIANGLES_getLine_weightToL(this.node_wall[i][2], p5.Vector.add(this.node_wall[i+1][2], this.node_wall[i][2]).mult(0.5), real(15));
      }


      let num_dotted = 4;
      if (this.W < real(200)) {
        num_dotted = 3;
      }
      for (let i=0; i<num_dotted; i++) {
        const a = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).mult(1.0/num_dotted * i).add(this.node_wall[this.node_wall.length-1][2]);
        const b = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).mult(1.0/(num_dotted*2) * (i*2+1)).add(this.node_wall[this.node_wall.length-1][2]);
        TRIANGLES_getLine_weightToD_Y(a, b, real(15));
      }
      for (let i=0; i<num_dotted; i++) {
        const a = p5.Vector.sub(this.node_wall[0][2], this.node_wall[0][3]).mult(1.0/num_dotted * i).add(this.node_wall[0][3]);
        const b = p5.Vector.sub(this.node_wall[0][2], this.node_wall[0][3]).mult(1.0/(num_dotted*2) * (i*2+1)).add(this.node_wall[0][3]);
        TRIANGLES_getLine_weightToU_Y(a, b, real(15));
      }
    }




    if (!this.open_broken) {
      for (let i=0; i<this.node_loading.length; i++) {
        TRIANGLES_getTriangle(this.node_loading[i][0], this.node_loading[i][1], this.node_loading[i][2]);
        TRIANGLES_getTriangle(this.node_loading[i][0], this.node_loading[i][2], this.node_loading[i][3]);
        TRIANGLES_getTriangle(this.node_loading[i][0], this.node_loading[i][3], this.node_loading[i][4]);
      }
    } else {
      if (!this.have_dino) {
        TRIANGLES_getRect(this.node_404[0], this.node_404[1], this.node_404[3], this.node_404[4]);
        TRIANGLES_getTriangle(this.node_404[1], this.node_404[2], this.node_404[3]);

        TRIANGLES_getRect(this.node_404[11], this.node_404[12], this.node_404[13], this.node_404[14]);

        TRIANGLES_getTriangle(this.node_404[25], this.node_404[18], this.node_404[19]);
        TRIANGLES_getTriangle(this.node_404[25], this.node_404[23], this.node_404[24]);
        TRIANGLES_getTriangle(this.node_404[23], this.node_404[19], this.node_404[22]);
        TRIANGLES_getRect(this.node_404[19], this.node_404[20], this.node_404[21], this.node_404[22]);


        t = constrain(map(this.node_wall[0][3].z-real(1000), skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_404[5], this.node_404[6], this.node_404[7], this.node_404[10]);
        TRIANGLES_getRect(this.node_404[7], this.node_404[8], this.node_404[9], this.node_404[10]);
        TRIANGLES_getTriangle(this.node_404[15], this.node_404[16], this.node_404[17]);
      } else {
        t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        //TRIANGLES_getRect(this.node_wall[0], this.node_wall[1], this.node_wall[2], this.node_wall[3]);

        TRIANGLES_getTriangle(this.node_dinosaur[0], this.node_dinosaur[1], this.node_dinosaur[30]);
        TRIANGLES_getTriangle(this.node_dinosaur[31], this.node_dinosaur[1], this.node_dinosaur[32]);
        TRIANGLES_getRect(this.node_dinosaur[1], this.node_dinosaur[2], this.node_dinosaur[3], this.node_dinosaur[4]);
        TRIANGLES_getTriangle(this.node_dinosaur[32], this.node_dinosaur[4], this.node_dinosaur[33]);
        TRIANGLES_getTriangle(this.node_dinosaur[34], this.node_dinosaur[4], this.node_dinosaur[33]);
        TRIANGLES_getTriangle(this.node_dinosaur[30], this.node_dinosaur[31], this.node_dinosaur[34]);
        TRIANGLES_getRect(this.node_dinosaur[34], this.node_dinosaur[4], this.node_dinosaur[8], this.node_dinosaur[30]);
        TRIANGLES_getRect(this.node_dinosaur[5], this.node_dinosaur[6], this.node_dinosaur[7], this.node_dinosaur[8]);
        TRIANGLES_getTriangle(this.node_dinosaur[30], this.node_dinosaur[4], this.node_dinosaur[8]);
        TRIANGLES_getTriangle(this.node_dinosaur[30], this.node_dinosaur[8], this.node_dinosaur[9]);
        TRIANGLES_getTriangle(this.node_dinosaur[30], this.node_dinosaur[13], this.node_dinosaur[12]);
        TRIANGLES_getTriangle(this.node_dinosaur[9], this.node_dinosaur[10], this.node_dinosaur[11]);
        TRIANGLES_getTriangle(this.node_dinosaur[29], this.node_dinosaur[30], this.node_dinosaur[13]);
        TRIANGLES_getRect(this.node_dinosaur[20], this.node_dinosaur[13], this.node_dinosaur[14], this.node_dinosaur[15]);
        TRIANGLES_getTriangle(this.node_dinosaur[28], this.node_dinosaur[13], this.node_dinosaur[20]);
        TRIANGLES_getTriangle(this.node_dinosaur[20], this.node_dinosaur[15], this.node_dinosaur[16]);
        TRIANGLES_getTriangle(this.node_dinosaur[19], this.node_dinosaur[18], this.node_dinosaur[17]);
        TRIANGLES_getRect(this.node_dinosaur[27], this.node_dinosaur[20], this.node_dinosaur[21], this.node_dinosaur[26]);
        TRIANGLES_getTriangle(this.node_dinosaur[25], this.node_dinosaur[21], this.node_dinosaur[24]);
        TRIANGLES_getTriangle(this.node_dinosaur[24], this.node_dinosaur[22], this.node_dinosaur[23]);
      }
    }




    //endShape();
  };


















  this.displayInfo = function() {
    //noFill();
    //stroke(c_info2);
    //strokeWeight(real(2));


    //beginShape(LINES);
    if (!this.have_dino  ||  !this.open_broken) {
      for (let i=0; i<this.node_wall.length; i++) {
        LINES_getLine(this.node_wall[i][3], this.node_wall[i][2]);
        if (i < this.node_wall.length-1) {
          LINES_getLine(this.node_wall[i][3], this.node_wall[i+1][3]);
          LINES_getLine(this.node_wall[i][2], this.node_wall[i+1][2]);
        }
      }
    } else {
      for (let i=0; i<30; i++) {
        LINES_getLine(this.node_dinosaur[i], this.node_dinosaur[i+1]);
      }
      LINES_getLine(this.node_dinosaur[30], this.node_dinosaur[0]);
    }


    //endShape();
  };
}