// include a comment about LICENSE.md in Corridor.js
// Copyright 2022 funnysandwich.tez
function Corridor(count, index) {
  this.index_count = count;
  this.index = index;


  this.W = real(map(noise(count*0.15+99), 0, 1, 300, 800));
  this.H = real(map(noise(count*0.05), 0, 1, 400, 1000));
  this.X_move = real(map(noise(count*0.05+999), 0, 1, -this.W*0.35, this.W*0.35));
  this.D = real(500);
  this.dead = false;









  this.have_lamp = true;


  this.have_door_left = false;
  this.have_door_right = false;
  if (this.index_count % 2 == 0) {
    this.have_door_left = true;
  } else {
    this.have_door_right = true;
  }


  this.have_signExit = false;
  if (open_signExit  &&  random(1) < rate_signExit) {
    this.have_signExit = true;
    this.signExit_is_left = true;
    if (random(1)<0.5) {
      this.signExit_is_left = false;
    }
  }



  this.have_attic = false;
  if (random(1) < rate_attic) {
    this.have_attic = true;
    this.have_signExit = false;
    this.have_lamp = false;
  }




  this.have_shoebox_left = random(1) < rate_shoebox_left;
  this.have_shoebox_right = random(1) < rate_shoebox_right;
  if (this.have_door_left) {
    this.have_shoebox_left = false;
  }
  if (this.have_door_right) {
    this.have_shoebox_right = false;
  }



  this.have_doorplate_left = false;
  this.have_doorplate_right = false;
  if (this.have_door_left) {
    this.have_doorplate_left = random(1) < rate_doorplate_left;
    this.have_toiletMale_left = false;
    this.have_toiletFemale_left = false;
    this.have_power_left = false;
    const r = random(1);
    if (r < rate_toiletMale_left) {
      this.have_toiletMale_left = true;
    } else if (r < rate_toiletMale_left+rate_toiletFemale_left) {
      this.have_toiletFemale_left = true;
    } else if (r < rate_toiletMale_left+rate_toiletFemale_left+rate_power_left) {
      this.have_power_left = true;
    }
  }
  if (this.have_door_right) {
    this.have_doorplate_right = random(1)<rate_doorplate_right;
    this.have_toiletMale_right = false;
    this.have_toiletFemale_right = false;
    this.have_power_right = false;
    const r = random(1);
    if (r < rate_toiletMale_right) {
      this.have_toiletMale_right = true;
    } else if (r < rate_toiletMale_right+rate_toiletFemale_right) {
      this.have_toiletFemale_right = true;
    } else if (r < rate_toiletMale_right+rate_toiletFemale_right+rate_power_right) {
      this.have_power_right = true;
    }
  }




  this.have_stairs_left = random(1) < rate_stairs_left;
  this.have_stairs_right = random(1) < rate_stairs_right;
  if (this.have_stairs_left) {
    this.have_door_left = false;
    this.have_doorplate_left = false;
    this.have_shoebox_left = false;
  }
  if (this.have_stairs_right) {
    this.have_door_right = false;
    this.have_doorplate_right = false;
    this.have_shoebox_right = false;
  }











  this.H_door = min(real(500), this.H*0.85);

  if (this.have_door_left || this.have_door_right) {
  }




  if (this.have_signExit) {
    let W_signExit = this.W * random(0.22, 0.25);

    this.X_signExit = random(real(20), this.W*0.5 - W_signExit - real(20));
    if (!this.signExit_is_left) {
      this.X_signExit = random(this.W*0.5+real(20), this.W - W_signExit - real(20));
    }
    this.node_signExit = new Array(node_ori_signExit.length);
    for (let i=0; i<this.node_signExit.length; i++) {
      if (this.signExit_is_left) {
        this.node_signExit[i] = createVector(node_ori_signExit[i][0], node_ori_signExit[i][1], 0);
      } else {
        this.node_signExit[i] = createVector(node_ori_signExit[this.node_signExit.length-1-i][0], node_ori_signExit[this.node_signExit.length-1-i][1], 0);
        this.node_signExit[i].x *= -1;
        this.node_signExit[i].x += 100;
      }
      this.node_signExit[i].mult((W_signExit*scaleRate) / 100.0);
      this.node_signExit[i].x = real(this.node_signExit[i].x);
      this.node_signExit[i].y = real(this.node_signExit[i].y);
    }
  }







  if (this.have_attic) {
    this.W_attic = this.W * random(0.3, 0.35);
    this.X_attic = random(real(50), this.W-this.W_attic-real(50));
    this.node_attic_door = new Array(4);
    this.node_attic_door[0] = createVector(this.X_attic, 0, 0);
    this.node_attic_door[1] = createVector(this.X_attic+this.W_attic, 0, 0);
    this.node_attic_door[2] = createVector(this.X_attic+this.W_attic, 0, this.W_attic);
    this.node_attic_door[3] = createVector(this.X_attic, 0, this.W_attic);
    this.node_attic_ladder = Array.from(Array(7), () => new Array(2));
    for (let i=0; i<this.node_attic_ladder.length; i++) {
      for (let j=0; j<2; j++) {
        let y = map(i, 0, this.node_attic_ladder.length-1, 0, this.H*0.9);
        let x = this.X_attic + this.W_attic*0.15 + this.W_attic*0.7*j;
        this.node_attic_ladder[i][j] = createVector(x, y, 0);
      }
    }
  }




  if (this.have_shoebox_left || this.have_shoebox_right) {
    let W_shoebox = real(random(35, 60));
    let D_shoebox = real(random(75, 100));
    let H_shoebox = real(random(25, 200));
    let Z_shoebox = -this.D*0.5;//random(-real(10), -this.D*0.5+D_shoebox+real(10));
    let X_shoebox = 0;
    if (this.have_shoebox_right) {
      Z_shoebox = -D_shoebox;
      X_shoebox = -W_shoebox;
    }
    this.node_shoebox = Array.from(Array(4), () => new Array(2));
    for (let i=0; i<2; i++) {
      let y = -H_shoebox * i;
      this.node_shoebox[0][i] = createVector(X_shoebox, y, Z_shoebox);
      this.node_shoebox[1][i] = createVector(X_shoebox+W_shoebox, y, Z_shoebox);
      this.node_shoebox[2][i] = createVector(X_shoebox+W_shoebox, y, Z_shoebox+D_shoebox);
      this.node_shoebox[3][i] = createVector(X_shoebox, y, Z_shoebox+D_shoebox);
    }
  }






  if (this.have_doorplate_left || this.have_doorplate_right) {
    this.W_doorplate = real(100)*random(0.65, 0.8);
    this.H_doorplate = real(40)*(this.W_doorplate/real(100));

    if (this.have_toiletMale_left || this.have_toiletMale_right || this.have_toiletFemale_left || this.have_toiletFemale_right || this.have_power_left || this.have_power_right) {
      this.W_doorplate = real(100)*random(0.45, 0.7);
      this.H_doorplate = this.W_doorplate;
    }
    if (this.have_toiletMale_left || this.have_toiletMale_right) {
      this.node_male = new Array(node_ori_male.length);
      for (let i=0; i<this.node_male.length; i++) {
        this.node_male[i] = createVector(node_ori_male[i][0], node_ori_male[i][1], 0);
        this.node_male[i].mult((this.W_doorplate*scaleRate) / 100.0);
        this.node_male[i].x = real(this.node_male[i].x);
        this.node_male[i].y = real(this.node_male[i].y);
      }
    }
    if (this.have_toiletFemale_left || this.have_toiletFemale_right) {
      this.node_female = new Array(node_ori_female.length);
      for (let i=0; i<this.node_female.length; i++) {
        this.node_female[i] = createVector(node_ori_female[i][0], node_ori_female[i][1], 0);
        this.node_female[i].mult((this.W_doorplate*scaleRate) / 100.0);
        this.node_female[i].x = real(this.node_female[i].x);
        this.node_female[i].y = real(this.node_female[i].y);
      }
    }
    if (this.have_power_left || this.have_power_right) {
      this.node_power = new Array(node_ori_power.length);
      for (let i=0; i<this.node_power.length; i++) {
        this.node_power[i] = createVector(node_ori_power[i][0], node_ori_power[i][1], 0);
        this.node_power[i].mult((this.W_doorplate*scaleRate) / 100.0);
        this.node_power[i].x = real(this.node_power[i].x);
        this.node_power[i].y = real(this.node_power[i].y);
      }
    }

    this.node_doorplate = new Array(4);
    this.node_doorplate[0] = createVector(0, 0, 0);
    this.node_doorplate[1] = createVector(this.W_doorplate, 0, 0);
    this.node_doorplate[2] = createVector(this.W_doorplate, this.H_doorplate, 0);
    this.node_doorplate[3] = createVector(0, this.H_doorplate, 0);
    if (this.have_doorplate_right) {
      for (let i=0; i<4; i++) {
        this.node_doorplate[i].x *= -1;
      }
    }
  }






  if (this.have_stairs_left) {
    this.node_stairs_left = Array.from(Array(floor(random(3, 7))*2+1), () => new Array(2));
    let w = real(random(45, 65));
    let d = this.D*0.5 * random(0.55, 0.85);
    let z = -(this.D*0.5 - d) / 2.0;
    let x_move = 0;
    if (random(1)<0.5) {
      x_move = -real(random(100, 300));
    }
    for (let i=0; i<this.node_stairs_left.length; i++) {
      let x = 0;
      if (i > 0) {
        x = map(ceil(i/2.0)*2-1, 1, this.node_stairs_left.length-2, -w, -floor((this.node_stairs_left.length-1)/2.0)*w);
      }
      let y = map(floor(i/2.0)*2, 0, this.node_stairs_left.length-3, 0, -(floor((this.node_stairs_left.length-1)/2.0)-1)*w);
      if (i == this.node_stairs_left.length-1) {
        y -= this.H_door*0.85;
      }
      for (let j=0; j<2; j++) {
        z = -(this.D*0.5 - d) / 2.0  -  j*(d);
        this.node_stairs_left[i][j] = createVector(x, y, z);
        if (i!=0) {
          this.node_stairs_left[i][j].x += x_move;
        }
      }
    }
  }

  if (this.have_stairs_right) {
    this.node_stairs_right = Array.from(Array(floor(random(3, 7))*2+1), () => new Array(2));
    let w = real(random(45, 65));
    let d = this.D*0.5 * random(0.55, 0.85);
    let z = -(this.D*0.5 - d) / 2.0;
    let x_move = 0;
    if (random(1)<0.5) {
      x_move = real(random(100, 300));
    }
    for (let i=0; i<this.node_stairs_right.length; i++) {
      let x = 0;
      if (i > 0) {
        x = map(ceil(i/2.0)*2-1, 1, this.node_stairs_right.length-2, w, floor((this.node_stairs_right.length-1)/2.0)*w);
      }
      let y = map(floor(i/2.0)*2, 0, this.node_stairs_right.length-3, 0, -(floor((this.node_stairs_right.length-1)/2.0)-1)*w);
      if (i == this.node_stairs_right.length-1) {
        y -= this.H_door*0.85;
      }
      for (let j=0; j<2; j++) {
        z = -(this.D*0.5 - d) / 2.0  -  j*(d);
        this.node_stairs_right[i][j] = createVector(x, y, z);
        if (i!=0) {
          this.node_stairs_right[i][j].x += x_move;
        }
      }
    }
  }











  this.node = [];
  this.state_display = [];

  if (index != 0) {
    //this.node.push(corridor[index-1].node[corridor[index-1].node.length-1].copy());
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, corridor[index-1].node[corridor[index-1].node.length-1].z));
    this.Z_ori = this.node[0].z;
  } else {
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, endLine));
    this.Z_ori = endLine;
  }
  this.state_display.push(1);




  //this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori));
  //this.state_display.push(1);








  if (this.have_stairs_left) {
    let n = this.node[0].copy();
    for (let i=0; i<this.node_stairs_left.length; i++) {
      this.node.push(p5.Vector.add(n, this.node_stairs_left[i][0]));
      if (i != this.node_stairs_left.length-1) {
        this.state_display.push(0);
      } else {
        this.state_display.push(1);
      }
    }
    for (let i=this.node_stairs_left.length-1; i>=0; i--) {
      this.node.push(p5.Vector.add(n, this.node_stairs_left[i][1]));
      if (i != 0) {
        this.state_display.push(0);
      } else {
        this.state_display.push(1);
      }
    }
  }




  if (this.have_door_left) {
    let m = 0;
    if (random(1) < rate_openDoor_left) {
      m = real(random(125, 200));
    }
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5*0.25));
    this.state_display.push(0);
    //this.node.push(createVector(-this.W/2.0+this.X_move-m, skyline.y, this.Z_ori-this.D*0.5*0.25));
    //this.state_display.push(2);
    //let door_bottom = p5.Vector.sub(createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5*0.75),createVector(-this.W/2.0+this.X_move-m, skyline.y, this.Z_ori-this.D*0.5*0.25)).mult(0.8).add(createVector(-this.W/2.0+this.X_move-m, skyline.y, this.Z_ori-this.D*0.5*0.25));
    //this.node.push(door_bottom);
    //this.state_display.push(0);
    //this.node.push(door_bottom.copy().add(0,-real(10),0));
    //this.state_display.push(2);
    this.node.push(createVector(-this.W/2.0+this.X_move-m, skyline.y-real(10), this.Z_ori-this.D*0.5*0.25));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move-m, skyline.y-this.H_door, this.Z_ori-this.D*0.5*0.25));
    this.state_display.push(2);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door, this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.75-real(15), this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(1);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.75-real(15), this.Z_ori-this.D*0.5*0.75-real(7)));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.75+real(15), this.Z_ori-this.D*0.5*0.75-real(7)));
    this.state_display.push(1);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.75+real(15), this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.25-real(15), this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(1);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.25-real(15), this.Z_ori-this.D*0.5*0.75-real(7)));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.25+real(15), this.Z_ori-this.D*0.5*0.75-real(7)));
    this.state_display.push(1);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H_door*0.25+real(15), this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(0);
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5*0.75));
    this.state_display.push(1);
  }



  if (this.have_shoebox_left) {
    let n = this.node[0].copy();
    this.node.push(p5.Vector.add(n, this.node_shoebox[3][0]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[3][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[2][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[2][0]));
    this.state_display.push(1);
    this.node.push(p5.Vector.add(n, this.node_shoebox[1][0]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[1][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[0][1]));
    this.state_display.push(0);
  }



  //--- 中间左下角 ---
  if (!this.have_shoebox_left) {
    this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5));
    this.state_display.push(0);
  }


  if (this.have_doorplate_left) {
    let n = createVector(-this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5);
    n.y -= this.H_door*0.9;
    this.node.push(p5.Vector.add(n, this.node_doorplate[3]));
    this.state_display.push(2);
    if (this.have_toiletMale_left) {
      for (let i=0; i<this.node_male.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_male[i]));
        this.state_display.push(0);
      }
    }
    if (this.have_toiletFemale_left) {
      for (let i=0; i<this.node_female.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_female[i]));
        this.state_display.push(0);
      }
    }
    if (this.have_power_left) {
      for (let i=0; i<this.node_power.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_power[i]));
        this.state_display.push(0);
      }
    }
    this.node.push(p5.Vector.add(n, this.node_doorplate[2]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_doorplate[1]));
    this.state_display.push(2);
    this.node.push(p5.Vector.add(n, this.node_doorplate[0]));
    this.state_display.push(0);
  }



  //--- 中间左上角 ---
  this.node.push(createVector(-this.W/2.0+this.X_move, skyline.y-this.H, this.Z_ori-this.D*0.5));
  this.state_display.push(0);

  if (this.have_signExit  &&  this.signExit_is_left) {
    for (let i=0; i<this.node_signExit.length; i++) {
      let n = createVector(-this.W/2.0+this.X_move, skyline.y-this.H, this.Z_ori-this.D*0.5);
      n.x += this.X_signExit;
      n.add(this.node_signExit[i]);
      this.node.push(n);
      this.state_display.push(0);
    }
  }

  if (this.have_lamp) {
    this.node.push(createVector(this.X_move-real(10), skyline.y-this.H, this.Z_ori-this.D*0.5));
    this.state_display.push(1);
    this.node.push(createVector(this.X_move-real(10), skyline.y-this.H, this.Z_ori-this.D*0.5 - this.D*0.35));
    this.state_display.push(0);
    this.node.push(createVector(this.X_move+real(10), skyline.y-this.H, this.Z_ori-this.D*0.5 - this.D*0.35));
    this.state_display.push(1);
    this.node.push(createVector(this.X_move+real(10), skyline.y-this.H, this.Z_ori-this.D*0.5));
    this.state_display.push(0);
  }


  if (this.have_signExit  &&  !this.signExit_is_left) {
    for (let i=0; i<this.node_signExit.length; i++) {
      let n = createVector(-this.W/2.0+this.X_move, skyline.y-this.H, this.Z_ori-this.D*0.5);
      n.x += this.X_signExit;
      n.add(this.node_signExit[i]);
      this.node.push(n);
      this.state_display.push(0);
    }
  }



  if (this.have_attic) {
    let n = createVector(-this.W/2.0+this.X_move, skyline.y-this.H, this.Z_ori-this.D*0.5);
    this.node.push(p5.Vector.add(n, this.node_attic_door[0]));
    this.state_display.push(0);
    let w_ladder = real(13);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[0][0]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-1][0]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-1][0]).add(w_ladder, 0, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-2][0]).add(w_ladder, w_ladder/2.0, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-2][1]).add(-w_ladder, w_ladder/2.0, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-1][1]).add(-w_ladder, 0, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-1][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[0][1]).add(0, -w_ladder, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[0][1]).add(-w_ladder, -w_ladder, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-2][1]).add(-w_ladder, -w_ladder/2.0, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[this.node_attic_ladder.length-2][0]).add(w_ladder, -w_ladder/2.0, 0));
    this.state_display.push(0);
    for (let i=this.node_attic_ladder.length-3; i>=0; i--) {
      this.node.push(p5.Vector.add(n, this.node_attic_ladder[i][0]).add(w_ladder, w_ladder/2.0, 0));
      this.state_display.push(0);
      this.node.push(p5.Vector.add(n, this.node_attic_ladder[i][1]).add(-w_ladder*2.5, w_ladder/2.0, 0));
      this.state_display.push(0);
      this.node.push(p5.Vector.add(n, this.node_attic_ladder[i][1]).add(-w_ladder*2.5, -w_ladder/2.0, 0));
      this.state_display.push(0);
      this.node.push(p5.Vector.add(n, this.node_attic_ladder[i][0]).add(w_ladder, -w_ladder/2.0, 0));
      this.state_display.push(0);
    }
    this.node.push(p5.Vector.add(n, this.node_attic_ladder[0][0]).add(w_ladder, -w_ladder, 0));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_door[0]).add(0, -w_ladder, 0));
    this.state_display.push(1);
    //this.node.push(p5.Vector.add(n, this.node_attic_door[0]).add(0, 0, w_ladder));
    //this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_door[3]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_attic_door[2]));
    this.state_display.push(1);
    this.node.push(p5.Vector.add(n, this.node_attic_door[1]));
    this.state_display.push(0);
  }


  //--- 中间右上角 ---
  this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H, this.Z_ori-this.D*0.5));
  this.state_display.push(0);






  if (this.have_doorplate_right) {
    let n = createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5);
    n.y -= this.H_door*0.9;
    this.node.push(p5.Vector.add(n, this.node_doorplate[0]));
    this.state_display.push(2);
    this.node.push(p5.Vector.add(n, this.node_doorplate[1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_doorplate[2]));
    this.state_display.push(2);
    if (this.have_toiletMale_right) {
      for (let i=0; i<this.node_male.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_male[i]));
        this.state_display.push(0);
      }
    }
    if (this.have_toiletFemale_right) {
      for (let i=0; i<this.node_female.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_female[i]));
        this.state_display.push(0);
      }
    }
    if (this.have_power_right) {
      for (let i=0; i<this.node_power.length; i++) {
        this.node.push(p5.Vector.add(p5.Vector.add(n, this.node_doorplate[3]), p5.Vector.add(n, this.node_doorplate[2])).mult(0.5).add(this.node_power[i]));
        this.state_display.push(0);
      }
    }
    this.node.push(p5.Vector.add(n, this.node_doorplate[3]));
    this.state_display.push(0);
  }


  if (this.have_shoebox_right) {
    let n = createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5);
    this.node.push(p5.Vector.add(n, this.node_shoebox[2][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[3][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[3][0]));
    this.state_display.push(1);
    this.node.push(p5.Vector.add(n, this.node_shoebox[0][0]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[0][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[1][1]));
    this.state_display.push(0);
    this.node.push(p5.Vector.add(n, this.node_shoebox[1][0]));
    this.state_display.push(1);
  }


  //--- 中间右下角 ---
  if (!this.have_shoebox_right) {
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5));
    this.state_display.push(1);
  }



  if (this.have_stairs_right) {
    let n = createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5);
    for (let i=0; i<this.node_stairs_right.length; i++) {
      this.node.push(p5.Vector.add(n, this.node_stairs_right[i][0]));
      if (i != this.node_stairs_right.length-1) {
        this.state_display.push(0);
      } else {
        this.state_display.push(1);
      }
    }
    for (let i=this.node_stairs_right.length-1; i>=0; i--) {
      this.node.push(p5.Vector.add(n, this.node_stairs_right[i][1]));
      if (i != 0) {
        this.state_display.push(0);
      } else {
        this.state_display.push(1);
      }
    }
  }




  if (this.have_door_right) {
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.25+real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(1);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.25+real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25+real(7)));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.25-real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25+real(7)));
    this.state_display.push(1);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.25-real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.75+real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(1);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.75+real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25+real(7)));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.75-real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25+real(7)));
    this.state_display.push(1);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door*0.75-real(15), this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y-this.H_door, this.Z_ori-this.D*0.5-this.D*0.5*0.25));
    this.state_display.push(2);
    let m = 0;
    if (random(1) < rate_openDoor_right) {
      m = real(random(125, 200));
    }
    this.node.push(createVector(this.W/2.0+this.X_move+m, skyline.y-this.H_door, this.Z_ori-this.D*0.5-this.D*0.5*0.75));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move+m, skyline.y, this.Z_ori-this.D*0.5-this.D*0.5*0.75));
    this.state_display.push(0);
    this.node.push(createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5-this.D*0.5*0.75));
    this.state_display.push(1);
  }
  //--- 后面右下角 ---
  this.node.push(createVector(this.W/2.0+this.X_move, skyline.y, this.Z_ori-this.D*0.5-this.D*0.5));
  this.state_display.push(0);
  //--- 后面左下角 ---
  this.node.push(this.node[this.node.length-1].copy().add(-this.W, 0, 0));




  this.P_move_done = false;
  this.P = this.node[0].copy();



  this.node_show = new Array(this.node.length);
  for (let i=0; i<this.node_show.length; i++) {
    this.node_show[i] = this.node[i].copy();
  }








  this.update = function(index) {
    this.index = index;


    if (this.index != corridor.length-1) {
      this.node[this.node.length-1] = corridor[this.index+1].node[0].copy();
    }

    for (let i=0; i<this.node.length; i++) {
      this.node[i].z += speed;
    }
    if (this.node[this.node.length-1].z > endLine) {
      this.dead = true;
    }




    if (this.node[0].z - this.Z_ori  >  this.D) {
      this.P_move_done = true;
    }


    if (!this.P_move_done) {
      let sum = 0;
      for (let i=0; i<this.node.length-1; i++) {
        sum += p5.Vector.dist(this.node[i], this.node[i+1]);
      }

      let v = constrain(map(this.node[0].z, this.Z_ori, this.Z_ori+this.D, 0, 1), 0, 1);


      let P_mlg = 0;
      for (let i=0; i<this.node.length-1; i++) {
        let vvv_last = P_mlg / sum;
        P_mlg += p5.Vector.dist(this.node[i], this.node[i+1]);
        let vvv = P_mlg / sum;


        this.node_show[i] = this.node[i].copy().add(0, Y_shake, 0);
        if (v > vvv_last  &&  
          v < vvv
          ) {
          this.P = lerpVector(this.node[i], this.node[i+1], map(v, vvv_last, vvv, 0, 1));
          for (let j=i; j<this.node.length-1; j++) {
            this.node_show[j+1] = this.P.copy().add(0, Y_shake, 0);
          }
          break;
        }
      }
    } else {
      for (let i=0; i<this.node_show.length; i++) {
        this.node_show[i] = this.node[i].copy().add(0, Y_shake, 0);
      }
    }
  };











  this.display = function() {
    for (let i=0; i<this.node_show.length-1; i++) {
      let c1 = realColor(this.node_show[i]);
      let c2 = realColor(this.node_show[i+1]);
      if (this.state_display[i] == 1) {
        TRIANGLES_getLine_weight_fill2(this.node_show[i], this.node_show[i+1], real(4), c1, c2);
      } else if (this.state_display[i] == 2) {
        TRIANGLES_getLine_weight_Y_fill2(this.node_show[i], this.node_show[i+1], real(4), c1, c2);
      } else {
        TRIANGLES_getLine_weight_T_fill2(this.node_show[i], this.node_show[i+1], real(4), c1, c2);
      }
    }


  };







  this.displayInfo = function() {
    for (let i=0; i<this.node_show.length-1; i++) {
      LINES_getLine(this.node_show[i], this.node_show[i+1]);
    }
  };
}
//@funnysandwich