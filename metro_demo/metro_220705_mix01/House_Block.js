function BlockHouse(begin, W, D, H, floor_num, index_z, index_block) {
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
  this.is_buildingBlock = true;
  this.is_dottedLine = false;
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








  this.state_block = new Array(this.floor_num);
  this.X_blockVer_l = new Array(this.floor_num);
  this.X_blockVer_r = new Array(this.floor_num);
  this.W_blockVer = new Array(this.floor_num);
  this.H_blockVer = new Array(this.floor_num);
  this.H_blockHor = new Array(this.floor_num);
  this.Z_block_move = new Array(this.floor_num);
  this.C_blockHor_move = new Array(this.floor_num);
  this.C_blockVer_l_move = new Array(this.floor_num);
  this.C_blockVer_r_move = new Array(this.floor_num);


  for (let i=0; i<this.floor_num; i++) {
    this.state_block[i] = max(floor(random(-2, 3)), 0);
    const w = p5.Vector.dist(this.node_wall[i][2], this.node_wall[i][3]);
    this.W_blockVer[i] = w * random(0.1, 0.2);
    this.H_blockHor[i] = H_floor * random(0.25, 0.33);
    this.H_blockVer[i] = this.H_ori - this.H_blockHor[i];
    if (this.state_block[i] == 0) {
      this.X_blockVer_l[i] = random(0, max(w/2.0-this.W_blockVer[i], real(0.1)));
      this.X_blockVer_r[i] = random(w/2.0, max(w-this.W_blockVer[i], w/2.0+real(0.1)));
    } else if (this.state_block[i] == 1) {
      this.X_blockVer_l[i] = 0;
      this.X_blockVer_r[i] = w-this.W_blockVer[i];
    } else if (this.state_block[i] == 2) {
      this.X_blockVer_l[i] = random(0, max(w/3.0-this.W_blockVer[i], real(0.1)));
      this.X_blockVer_r[i] = random(w/3.0*2, max(w-this.W_blockVer[i], w/3.0*2+real(0.1)));
    }

    if (i == 0) {
      this.Z_block_move[i] = random(-this.D*0.5, this.D*0.5);
    } else {
      this.Z_block_move[i] = this.Z_block_move[i-1] + random(-this.D*0.35, this.D*0.35);
    }
    this.C_blockHor_move[i] = real(random(-real(350), real(350)));
    this.C_blockVer_l_move[i] = real(random(-real(350), real(350)));
    this.C_blockVer_r_move[i] = real(random(-real(350), real(350)));
  }




  this.node_blockVer_l = new Array(this.floor_num);
  this.node_blockVer_r = new Array(this.floor_num);
  this.node_blockHor = new Array(this.floor_num);
  this.node_arch = new Array(this.floor_num);

  for (let i=0; i<this.floor_num; i++) {
    this.node_blockVer_l[i] = Array.from(Array(2), () => new Array(4));
    this.node_blockVer_r[i] = Array.from(Array(2), () => new Array(4));
    this.node_blockHor[i] = Array.from(Array(2), () => new Array(4));
    this.node_arch[i] = Array.from(Array(2), () => new Array(4));

    for (let j=0; j<4; j++) {
      this.node_blockHor[i][1][j] = this.node_wall[i+1][j].copy();
      this.node_blockHor[i][0][j] = p5.Vector.sub(this.node_wall[i][j], this.node_wall[i+1][j]).setMag(this.H_blockHor[i]).add(this.node_wall[i+1][j]);
    }

    this.node_blockVer_l[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][0]);
    this.node_blockVer_l[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
    this.node_blockVer_l[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
    this.node_blockVer_l[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][3]);
    this.node_blockVer_l[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][0]);
    this.node_blockVer_l[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
    this.node_blockVer_l[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
    this.node_blockVer_l[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][3]);

    this.node_blockVer_r[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][0]);
    this.node_blockVer_r[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
    this.node_blockVer_r[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
    this.node_blockVer_r[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][3]);
    this.node_blockVer_r[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][0]);
    this.node_blockVer_r[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
    this.node_blockVer_r[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
    this.node_blockVer_r[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][3]);



    //for (let j=0; j<2; j++) {
    //  for (let k=0; k<4; k++) {
    //    this.node_blockHor[i][j][k].add(0, 0, this.Z_block_move[i]);
    //    this.node_blockVer_l[i][j][k].add(0, 0, this.Z_block_move[i]);
    //    this.node_blockVer_r[i][j][k].add(0, 0, this.Z_block_move[i]);
    //  }
    //}


    for (let j=0; j<2; j++) {
      for (let k=0; k<this.node_arch[i][j].length; k++) {
        const x = cos(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * p5.Vector.dist(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3])/2.0;
        const y = sin(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * (p5.Vector.dist(this.node[i], this.node[i+1])-this.H_blockHor[i]);
        this.node_arch[i][j][k] = createVector(x, y, 0);
        this.node_arch[i][j][k] = PRotateZ(this.node_arch[i][j][k], this.node_rotate[i][0]);
        this.node_arch[i][j][k] = PRotateX(this.node_arch[i][j][k], this.node_rotate[i][1]);
        if (j == 0) {
          this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][0], this.node_blockVer_r[i][0][1]).mult(0.5));
        } else {
          this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3]).mult(0.5));
        }
      }
    }
  }





  this.W_roofTriangle = p5.Vector.dist(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]) * random(0.4, 0.75);
  this.H_roofTriangle = H_floor * random(0.4, 1.35);
  this.C_roofTriangle_move = real(random(-real(350), real(350)));

  this.node_roofTriangle = Array.from(Array(2), () => new Array(3));

  this.node_roofTriangle[0][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
  this.node_roofTriangle[0][1] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
  this.node_roofTriangle[0][2] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][0]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
  this.node_roofTriangle[1][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
  this.node_roofTriangle[1][1] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
  this.node_roofTriangle[1][2] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));


























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






    this.state_block = new Array(this.floor_num);
    this.X_blockVer_l = new Array(this.floor_num);
    this.X_blockVer_r = new Array(this.floor_num);
    this.W_blockVer = new Array(this.floor_num);
    this.H_blockVer = new Array(this.floor_num);
    this.H_blockHor = new Array(this.floor_num);
    this.Z_block_move = new Array(this.floor_num);
    this.C_blockHor_move = new Array(this.floor_num);
    this.C_blockVer_l_move = new Array(this.floor_num);
    this.C_blockVer_r_move = new Array(this.floor_num);

    for (let i=0; i<this.floor_num; i++) {
      this.state_block[i] = max(floor(random(-2, 3)), 0);
      const w = p5.Vector.dist(this.node_wall[i][2], this.node_wall[i][3]);
      this.W_blockVer[i] = w * random(0.1, 0.2);
      this.H_blockHor[i] = H_floor * random(0.25, 0.33);
      this.H_blockVer[i] = this.H_ori - this.H_blockHor[i];
      if (this.state_block[i] == 0) {
        this.X_blockVer_l[i] = random(0, max(w/2.0-this.W_blockVer[i], real(0.1)));
        this.X_blockVer_r[i] = random(w/2.0, max(w-this.W_blockVer[i], w/2.0+real(0.1)));
      } else if (this.state_block[i] == 1) {
        this.X_blockVer_l[i] = 0;
        this.X_blockVer_r[i] = w-this.W_blockVer[i];
      } else if (this.state_block[i] == 2) {
        this.X_blockVer_l[i] = random(0, max(w/3.0-this.W_blockVer[i], real(0.1)));
        this.X_blockVer_r[i] = random(w/3.0*2, max(w-this.W_blockVer[i], w/3.0*2+real(0.1)));
      }

      if (i == 0) {
        this.Z_block_move[i] = random(-this.D*0.5, this.D*0.5);
      } else {
        this.Z_block_move[i] = this.Z_block_move[i-1] + random(-this.D*0.35, this.D*0.35);
      }

      this.C_blockHor_move[i] = real(random(-real(350), real(350)));
      this.C_blockVer_l_move[i] = real(random(-real(350), real(350)));
      this.C_blockVer_r_move[i] = real(random(-real(350), real(350)));
    }




    this.node_blockVer_l = new Array(this.floor_num);
    this.node_blockVer_r = new Array(this.floor_num);
    this.node_blockHor = new Array(this.floor_num);
    this.node_arch = new Array(this.floor_num);

    for (let i=0; i<this.floor_num; i++) {
      this.node_blockVer_l[i] = Array.from(Array(2), () => new Array(4));
      this.node_blockVer_r[i] = Array.from(Array(2), () => new Array(4));
      this.node_blockHor[i] = Array.from(Array(2), () => new Array(4));
      this.node_arch[i] = Array.from(Array(2), () => new Array(4));

      for (let j=0; j<4; j++) {
        this.node_blockHor[i][1][j] = this.node_wall[i+1][j].copy();
        this.node_blockHor[i][0][j] = p5.Vector.sub(this.node_wall[i][j], this.node_wall[i+1][j]).setMag(this.H_blockHor[i]).add(this.node_wall[i+1][j]);
      }

      this.node_blockVer_l[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][0]);
      this.node_blockVer_l[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
      this.node_blockVer_l[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
      this.node_blockVer_l[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][3]);
      this.node_blockVer_l[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_l[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_l[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
      this.node_blockVer_l[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][3]);

      this.node_blockVer_r[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][0]);
      this.node_blockVer_r[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
      this.node_blockVer_r[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
      this.node_blockVer_r[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][3]);
      this.node_blockVer_r[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_r[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_r[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
      this.node_blockVer_r[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][3]);



      //for (let j=0; j<2; j++) {
      //  for (let k=0; k<4; k++) {
      //    this.node_blockHor[i][j][k].add(0, 0, this.Z_block_move[i]);
      //    this.node_blockVer_l[i][j][k].add(0, 0, this.Z_block_move[i]);
      //    this.node_blockVer_r[i][j][k].add(0, 0, this.Z_block_move[i]);
      //  }
      //}


      for (let j=0; j<2; j++) {
        for (let k=0; k<this.node_arch[i][j].length; k++) {
          const x = cos(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * p5.Vector.dist(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3])/2.0;
          const y = sin(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * (p5.Vector.dist(this.node[i], this.node[i+1])-this.H_blockHor[i]);
          this.node_arch[i][j][k] = createVector(x, y, 0);
          this.node_arch[i][j][k] = PRotateZ(this.node_arch[i][j][k], this.node_rotate[i][0]);
          this.node_arch[i][j][k] = PRotateX(this.node_arch[i][j][k], this.node_rotate[i][1]);
          if (j == 0) {
            this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][0], this.node_blockVer_r[i][0][1]).mult(0.5));
          } else {
            this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3]).mult(0.5));
          }
        }
      }
    }




    this.W_roofTriangle = p5.Vector.dist(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]) * random(0.4, 0.75);
    this.H_roofTriangle = H_floor * random(0.4, 1.35);
    this.C_roofTriangle_move = real(random(-real(350), real(350)));


    this.node_roofTriangle = Array.from(Array(2), () => new Array(3));

    this.node_roofTriangle[0][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[0][1] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[0][2] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][0]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[1][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
    this.node_roofTriangle[1][1] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
    this.node_roofTriangle[1][2] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
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








    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<4; j++) {
        this.node_blockHor[i][1][j] = this.node_wall[i+1][j].copy();
        this.node_blockHor[i][0][j] = p5.Vector.sub(this.node_wall[i][j], this.node_wall[i+1][j]).setMag(this.H_blockHor[i]).add(this.node_wall[i+1][j]);
      }

      this.node_blockVer_l[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][0]);
      this.node_blockVer_l[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
      this.node_blockVer_l[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
      this.node_blockVer_l[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_l[i]).add(this.node_wall[i][3]);
      this.node_blockVer_l[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_l[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_l[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
      this.node_blockVer_l[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_l[i]).add(this.node_blockHor[i][0][3]);
      //this.node_blockVer_l[i][0][0] = p5.Vector.sub(this.node_blockVer_l[i][0][0], this.node_blockVer_l[i][1][0]).setMag(this.H_blockVer[i]).add(this.node_blockVer_l[i][1][0]);
      //this.node_blockVer_l[i][0][1] = p5.Vector.sub(this.node_blockVer_l[i][0][1], this.node_blockVer_l[i][1][1]).setMag(this.H_blockVer[i]).add(this.node_blockVer_l[i][1][1]);
      //this.node_blockVer_l[i][0][2] = p5.Vector.sub(this.node_blockVer_l[i][0][2], this.node_blockVer_l[i][1][2]).setMag(this.H_blockVer[i]).add(this.node_blockVer_l[i][1][2]);
      //this.node_blockVer_l[i][0][3] = p5.Vector.sub(this.node_blockVer_l[i][0][3], this.node_blockVer_l[i][1][3]).setMag(this.H_blockVer[i]).add(this.node_blockVer_l[i][1][3]);

      this.node_blockVer_r[i][0][0] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][0]);
      this.node_blockVer_r[i][0][1] = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][0]);
      this.node_blockVer_r[i][0][2] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_wall[i][3]);
      this.node_blockVer_r[i][0][3] = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).setMag(this.X_blockVer_r[i]).add(this.node_wall[i][3]);
      this.node_blockVer_r[i][1][0] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_r[i][1][1] = p5.Vector.sub(this.node_blockHor[i][0][1], this.node_blockHor[i][0][0]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][0]);
      this.node_blockVer_r[i][1][2] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]+this.W_blockVer[i]).add(this.node_blockHor[i][0][3]);
      this.node_blockVer_r[i][1][3] = p5.Vector.sub(this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]).setMag(this.X_blockVer_r[i]).add(this.node_blockHor[i][0][3]);
      //this.node_blockVer_r[i][0][0] = p5.Vector.sub(this.node_blockVer_r[i][0][0], this.node_blockVer_r[i][1][0]).setMag(this.H_blockVer[i]).add(this.node_blockVer_r[i][1][0]);
      //this.node_blockVer_r[i][0][1] = p5.Vector.sub(this.node_blockVer_r[i][0][1], this.node_blockVer_r[i][1][1]).setMag(this.H_blockVer[i]).add(this.node_blockVer_r[i][1][1]);
      //this.node_blockVer_r[i][0][2] = p5.Vector.sub(this.node_blockVer_r[i][0][2], this.node_blockVer_r[i][1][2]).setMag(this.H_blockVer[i]).add(this.node_blockVer_r[i][1][2]);
      //this.node_blockVer_r[i][0][3] = p5.Vector.sub(this.node_blockVer_r[i][0][3], this.node_blockVer_r[i][1][3]).setMag(this.H_blockVer[i]).add(this.node_blockVer_r[i][1][3]);



      //for (let j=0; j<2; j++) {
      //  for (let k=0; k<4; k++) {
      //    this.node_blockHor[i][j][k].add(0, 0, this.Z_block_move[i]);
      //    this.node_blockVer_l[i][j][k].add(0, 0, this.Z_block_move[i]);
      //    this.node_blockVer_r[i][j][k].add(0, 0, this.Z_block_move[i]);
      //  }
      //}


      for (let j=0; j<2; j++) {
        for (let k=0; k<this.node_arch[i][j].length; k++) {
          const x = cos(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * p5.Vector.dist(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3])/2.0;
          const y = sin(map(k, -1, this.node_arch[i][j].length, PI, TWO_PI)) * (p5.Vector.dist(this.node[i], this.node[i+1])-this.H_blockHor[i]);
          this.node_arch[i][j][k] = createVector(x, y, 0);
          this.node_arch[i][j][k] = PRotateZ(this.node_arch[i][j][k], this.node_rotate[i][0]);
          this.node_arch[i][j][k] = PRotateX(this.node_arch[i][j][k], this.node_rotate[i][1]);
          if (j == 0) {
            this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][0], this.node_blockVer_r[i][0][1]).mult(0.5));
          } else {
            this.node_arch[i][j][k].add(p5.Vector.add(this.node_blockVer_l[i][0][2], this.node_blockVer_r[i][0][3]).mult(0.5));
          }
        }
      }
    }








    this.node_roofTriangle[0][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[0][1] = p5.Vector.sub(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[0][2] = p5.Vector.sub(this.node_wall[this.node.length-1][1], this.node_wall[this.node.length-1][0]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][0], this.node_wall[this.node.length-1][1]).mult(0.5));
    this.node_roofTriangle[1][0] = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.H_roofTriangle).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
    this.node_roofTriangle[1][1] = p5.Vector.sub(this.node_wall[this.node.length-1][3], this.node_wall[this.node.length-1][2]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
    this.node_roofTriangle[1][2] = p5.Vector.sub(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).setMag(this.W_roofTriangle/2.0).add(p5.Vector.add(this.node_wall[this.node.length-1][2], this.node_wall[this.node.length-1][3]).mult(0.5));
  };















  this.display = function() {
  };












  this.display_TRIANGLES = function() {
    let t, c1, c2;

    //noStroke();
    //beginShape(TRIANGLES);

    //------------- ⬇F⬇ -------------
    for (let i=0; i<this.floor_num; i++) {
      if (this.state_block[i] == 0) {
        t = constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_blockHor[i][1][3], this.node_blockHor[i][1][2], this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]);
        t = constrain(map(this.node_blockVer_l[i][1][3].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_blockVer_l[i][1][3], this.node_blockVer_l[i][1][2], this.node_blockVer_l[i][0][2], this.node_blockVer_l[i][0][3]);
        t = constrain(map(this.node_blockVer_r[i][1][3].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_blockVer_r[i][1][3], this.node_blockVer_r[i][1][2], this.node_blockVer_r[i][0][2], this.node_blockVer_r[i][0][3]);
      } else if (this.state_block[i] == 1) {
        t = constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getTriangle(this.node_blockHor[i][1][3], this.node_blockVer_l[i][0][3], this.node_blockVer_l[i][0][2]);
        TRIANGLES_getTriangle(this.node_blockHor[i][1][2], this.node_blockVer_r[i][0][2], this.node_blockVer_r[i][0][3]);
        for (let j=0; j<this.node_arch[i][1].length; j++) {
          if (j < floor(this.node_arch[i][1].length/2)) {
            if (j == 0) {
              TRIANGLES_getTriangle(this.node_blockHor[i][1][3], this.node_blockVer_l[i][0][2], this.node_arch[i][1][0]);
            }
            TRIANGLES_getTriangle(this.node_blockHor[i][1][3], this.node_arch[i][1][j], this.node_arch[i][1][j+1]);
          } else {
            if (j == this.node_arch[i][1].length-1) {
              TRIANGLES_getTriangle(this.node_blockHor[i][1][2], this.node_blockVer_r[i][0][3], this.node_arch[i][1][this.node_arch[i][1].length-1]);
            } else {
              TRIANGLES_getTriangle(this.node_blockHor[i][1][2], this.node_arch[i][1][j], this.node_arch[i][1][j+1]);
            }
          }
        }
        TRIANGLES_getTriangle(this.node_blockHor[i][1][3], this.node_blockHor[i][1][2], this.node_arch[i][1][floor(this.node_arch[i][1].length/2)]);
      } else if (this.state_block[i] == 2) {
        t = constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_blockHor[i][1][3], this.node_blockHor[i][1][2], this.node_blockHor[i][0][2], this.node_blockHor[i][0][3]);
        t = constrain(map(this.node_blockVer_l[i][1][2].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getRect(this.node_blockVer_l[i][1][2], this.node_blockVer_r[i][1][3], this.node_blockVer_r[i][0][3], this.node_blockVer_l[i][0][2]);
      }
    }
    //------------- ⬆F⬆ -------------


    //------------- ⬇L⬇ -------------
    for (let i=0; i<this.floor_num; i++) {
      if (this.state_block[i] == 0) {
        if (this.node_blockHor[i][1][3].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][0], this.node_blockHor[i][1][3], this.node_blockHor[i][0][3], this.node_blockHor[i][0][0], c1, c2, c2, c1);
        }      
        if (this.node_blockVer_l[i][1][3].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][0].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][3].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_l[i][1][0], this.node_blockVer_l[i][1][3], this.node_blockVer_l[i][0][3], this.node_blockVer_l[i][0][0], c1, c2, c2, c1);
        }
        if (this.node_blockVer_r[i][1][3].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][0].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][3].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_r[i][1][0], this.node_blockVer_r[i][1][3], this.node_blockVer_r[i][0][3], this.node_blockVer_r[i][0][0], c1, c2, c2, c1);
        }
      } else if (this.state_block[i] == 1) {
        if (this.node_blockHor[i][1][3].x > -real(400)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][0], this.node_blockHor[i][1][3], this.node_blockVer_l[i][0][3], this.node_blockVer_l[i][0][0], c1, c2, c2, c1);
        }
        if (this.node_blockVer_r[i][1][3].x > -real(400)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_arch[i][0][this.node_arch[i][0].length-1], this.node_arch[i][1][this.node_arch[i][1].length-1], this.node_blockVer_r[i][0][3], this.node_blockVer_r[i][0][0], c1, c2, c2, c1);
          TRIANGLES_getRect_fill4(this.node_arch[i][0][this.node_arch[i][0].length-2], this.node_arch[i][1][this.node_arch[i][1].length-2], this.node_arch[i][1][this.node_arch[i][1].length-1], this.node_arch[i][0][this.node_arch[i][0].length-1], c1, c2, c2, c1);
        }
      } else if (this.state_block[i] == 2) {
        if (this.node_blockHor[i][1][3].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][0], this.node_blockHor[i][1][3], this.node_blockHor[i][0][3], this.node_blockHor[i][0][0], c1, c2, c2, c1);
        }      
        if (this.node_blockVer_l[i][1][2].x > -real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][1].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][2].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_l[i][1][1], this.node_blockVer_l[i][1][2], this.node_blockVer_l[i][0][2], this.node_blockVer_l[i][0][1], c1, c2, c2, c1);
        }
      }
    }

    //------------- ⬆L⬆ -------------


    //------------- ⬇R⬇ -------------
    for (let i=0; i<this.floor_num; i++) {
      if (this.state_block[i] == 0) {
        if (this.node_blockHor[i][1][2].x < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][2].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][1].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][2], this.node_blockHor[i][1][1], this.node_blockHor[i][0][1], this.node_blockHor[i][0][2], c1, c2, c2, c1);
        }
        if (this.node_blockVer_l[i][1][2].x < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][2].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][1][1].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_l[i][1][2], this.node_blockVer_l[i][1][1], this.node_blockVer_l[i][0][1], this.node_blockVer_l[i][0][2], c1, c2, c2, c1);
        }
        if (this.node_blockVer_r[i][1][2].x < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][2].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][1].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_r[i][1][2], this.node_blockVer_r[i][1][1], this.node_blockVer_r[i][0][1], this.node_blockVer_r[i][0][2], c1, c2, c2, c1);
        }
      } else if (this.state_block[i] == 1) {
        if (this.node_blockHor[i][1][2].x < real(400)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][2].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][1].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][2], this.node_blockHor[i][1][1], this.node_blockVer_r[i][0][1], this.node_blockVer_r[i][0][2], c1, c2, c2, c1);
        }
        if (this.node_blockVer_l[i][1][2].x < real(400)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][2].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][1].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_arch[i][1][0], this.node_arch[i][0][0], this.node_blockVer_l[i][0][1], this.node_blockVer_l[i][0][2], c1, c2, c2, c1);
          TRIANGLES_getRect_fill4(this.node_arch[i][1][1], this.node_arch[i][0][1], this.node_arch[i][0][0], this.node_arch[i][1][0], c1, c2, c2, c1);
        }
      } else if (this.state_block[i] == 2) {
        if (this.node_blockHor[i][1][2].x < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][2].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][1].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][1][2], this.node_blockHor[i][1][1], this.node_blockHor[i][0][1], this.node_blockHor[i][0][2], c1, c2, c2, c1);
        }
        if (this.node_blockVer_r[i][1][3].x < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][3].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][1][0].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockVer_r[i][1][3], this.node_blockVer_r[i][1][0], this.node_blockVer_r[i][0][0], this.node_blockVer_r[i][0][3], c1, c2, c2, c1);
        }
      }
    }

    //------------- ⬆R⬆ -------------



    //------------- ⬇U⬇ -------------
    for (let i=0; i<this.floor_num; i++) {
      if (this.node_blockHor[i][1][0].y > -real(50)) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
        TRIANGLES_getRect_fill4(this.node_blockHor[i][1][0], this.node_blockHor[i][1][1], this.node_blockHor[i][1][2], this.node_blockHor[i][1][3], c1, c1, c2, c2);
      }
    }
    //------------- ⬆U⬆ -------------


    //------------- ⬇D⬇ -------------
    for (let i=0; i<this.floor_num; i++) {
      if (this.state_block[i] == 0  ||  this.state_block[i] == 2) {
        if (this.node_blockHor[i][0][3].y < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][0][0].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][0][3].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_blockHor[i][0][0], this.node_blockHor[i][0][1], this.node_blockHor[i][0][2], this.node_blockHor[i][0][3], c1, c1, c2, c2);
        }
      } else if (this.state_block[i] == 1) {
        if (this.node_arch[i][1][1].y < real(50)) {
          c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][2].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockHor[i][1][1].z+this.C_blockHor_move[i], skyline.z, 0, 1, 0), 0, 0.9));
          TRIANGLES_getRect_fill4(this.node_arch[i][1][1], this.node_arch[i][0][1], this.node_arch[i][0][2], this.node_arch[i][1][2], c1, c1, c2, c2);
        }
      }
      //if (this.state_block[i] == 0  ||  this.state_block[i] == 1) {
      //  if (this.Z_block_move[i] > 0) {
      //    if (this.node_blockVer_l[i][0][3].y < real(50)) {
      //      c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][0][0].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][0][3].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      TRIANGLES_getRect_fill4(this.node_blockVer_l[i][0][0], this.node_blockVer_l[i][0][1], this.node_blockVer_l[i][0][2], this.node_blockVer_l[i][0][3], c1, c1, c2, c2);
      //    }
      //    if (this.node_blockVer_r[i][0][3].y < real(50)) {
      //      c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][0][0].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_r[i][0][3].z+this.C_blockVer_r_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      TRIANGLES_getRect_fill4(this.node_blockVer_r[i][0][0], this.node_blockVer_r[i][0][1], this.node_blockVer_r[i][0][2], this.node_blockVer_r[i][0][3], c1, c1, c2, c2);
      //    }
      //  }
      //} else if (this.state_block[i] == 2) {
      //  if (this.Z_block_move[i] > 0) {
      //    if (this.node_blockVer_l[i][0][2].y < real(50)) {
      //      c1 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][0][1].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      c2 = lerpColor(c_near, c_far, constrain(map(this.node_blockVer_l[i][0][2].z+this.C_blockVer_l_move[i], skyline.z, 0, 1, 0), 0, 0.9));
      //      TRIANGLES_getRect_fill4(this.node_blockVer_l[i][0][1], this.node_blockVer_r[i][0][0], this.node_blockVer_r[i][0][3], this.node_blockVer_l[i][0][2], c1, c1, c2, c2);
      //    }
      //  }
      //}
    }
    //------------- ⬆D⬆ -------------







    //------------- ⬇F roof⬇ -------------
    t = constrain(map(this.node_roofTriangle[1][0].z+this.C_roofTriangle_move, skyline.z, 0, 1, 0), 0, 0.9);
    fill(lerpColor(c_near, c_far, t));
    TRIANGLES_getTriangle(this.node_roofTriangle[1][0], this.node_roofTriangle[1][1], this.node_roofTriangle[1][2]);
    //------------- ⬆F roof⬆ -------------


    //------------- ⬇L roof⬇ -------------
    if (this.node_roofTriangle[1][1].x > -real(50)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_roofTriangle[0][0].z+this.C_roofTriangle_move, skyline.z, 0, 1, 0), 0, 0.9));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_roofTriangle[1][0].z+this.C_roofTriangle_move, skyline.z, 0, 1, 0), 0, 0.9));
      TRIANGLES_getRect_fill4(this.node_roofTriangle[0][0], this.node_roofTriangle[1][0], this.node_roofTriangle[1][1], this.node_roofTriangle[0][1], c1, c2, c2, c1);
    }   
    //------------- ⬆L roof⬆ -------------

    //------------- ⬇R roof⬇ -------------
    if (this.node_roofTriangle[1][2].x < real(50)) {
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_roofTriangle[1][0].z+this.C_roofTriangle_move, skyline.z, 0, 1, 0), 0, 0.9));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_roofTriangle[0][0].z+this.C_roofTriangle_move, skyline.z, 0, 1, 0), 0, 0.9));
      TRIANGLES_getRect_fill4(this.node_roofTriangle[1][0], this.node_roofTriangle[0][0], this.node_roofTriangle[0][2], this.node_roofTriangle[1][2], c1, c2, c2, c1);
    }   
    //------------- ⬆R roof⬆ -------------




    //endShape();
  };


















  this.displayInfo = function() {
    //noFill();
    /*
    stroke(c_info1);
     strokeWeight(real(3));
     beginShape(POINTS);
     for (let i=0; i<this.node.length; i++) {
     vertex(this.node[i].x, this.node[i].y, this.node[i].z);
     }
     endShape();
     
     strokeWeight(real(2));
     beginShape(LINES);
     for (let i=1; i<this.node.length; i++) {
     vertex(this.node[i].x, this.node[i].y, this.node[i].z);
     vertex(this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
     }
     endShape();
     
     
     stroke(c_info2);
     strokeWeight(real(1.5));
     for (let i=0; i<this.node_wall.length; i++) {
     beginShape();
     for (let j=0; j<this.node_wall[i].length; j++) {
     vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
     }
     endShape(CLOSE);
     }
     beginShape(LINES);
     for (let j=0; j<this.node_wall[0].length; j++) {
     for (let i=0; i<this.node_wall.length-1; i++) {
     vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
     vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
     }
     }
     endShape();
     */

    //stroke(c_info2);
    //strokeWeight(real(2));
    //beginShape(LINES);
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<4; k++) {
          LINES_getLine(this.node_blockHor[i][j][k], this.node_blockHor[i][j][(k+1)%4]);
          LINES_getLine(this.node_blockVer_l[i][j][k], this.node_blockVer_l[i][j][(k+1)%4]);
          LINES_getLine(this.node_blockVer_r[i][j][k], this.node_blockVer_r[i][j][(k+1)%4]);
          if (j == 0) {
            LINES_getLine(this.node_blockHor[i][j][k], this.node_blockHor[i][j+1][k]);
            LINES_getLine(this.node_blockVer_l[i][j][k], this.node_blockVer_l[i][j+1][k]);
            LINES_getLine(this.node_blockVer_r[i][j][k], this.node_blockVer_r[i][j+1][k]);
          }
        }
      }
    }

    //endShape();



    //stroke(255, 0, 0);
    //beginShape(LINES);

    LINES_getLine(this.node_roofTriangle[1][0], this.node_roofTriangle[1][1]);
    LINES_getLine(this.node_roofTriangle[1][0], this.node_roofTriangle[1][2]);
    LINES_getLine(this.node_roofTriangle[1][2], this.node_roofTriangle[1][1]);

    //endShape();


    //stroke(0, 0, 255);
    //beginShape(LINES);
    for (let i=0; i<this.floor_num; i++) {
      for (let j=0; j<2; j++) {
        for (let k=0; k<this.node_arch[i][j].length; k++) {
          LINES_getLine(this.node_arch[i][j][k], this.node_arch[i][j][(k+1)%this.node_arch[i][j].length]);
        }
      }
    }
    //endShape();
  };
}