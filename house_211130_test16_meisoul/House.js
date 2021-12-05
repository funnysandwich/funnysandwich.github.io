function House() {
  //noiseSeed(random(-999, 999));
  this.ran = random(-999, 999);
  this.W = real(50);
  this.H = real(random(40, 50));
  this.roofH_rate = random(0.25, 0.75);
  this.is_door_face_left = random(2)<1;


  this.node = new Array(3);

  this.win_num = 0;
  this.have_win = Array.from(Array(this.node.length-1), () => new Array(4));
  for (let i=0; i<this.node.length-1; i++) {
    for (let j=0; j<4; j++) {
      if (this.is_door_face_left) {
        if (i==0 && j==0) {
          this.have_win[i][j] = 0;
        } else {
          this.have_win[i][j] = floor(random(0, 4));
        }
      } else {
        if (i==0 && j==1) {
          this.have_win[i][j] = 0;
        } else {
          this.have_win[i][j] = floor(random(0, 4));
        }
      }
      this.win_num += this.have_win[i][j];
    }
  }

  this.WALL = new Array(4);
  for (let i=0; i<this.WALL.length; i++) {
    this.WALL[i] = createGraphics(100, 100);
    this.WALL[i].background(255);
    this.WALL[i].rectMode(CENTER);
    if (i>0) {
      this.WALL[i].fill(0);
      this.WALL[i].noStroke();
      for (let j=1; j<i+1; j++) {
        this.WALL[i].rect(this.WALL[i].width/(i+1) * j, this.WALL[i].height/16*7, 6, this.WALL[i].height/8*3);
      }
    }
  }

  this.DOOR = createGraphics(100, 100);
  this.DOOR.background(255);
  this.DOOR.rectMode(CENTER);
  this.DOOR.fill(0);
  this.DOOR.noStroke();
  this.door_cutNum = floor(random(1, 4));
  this.door_x = floor(random(1, this.door_cutNum+1));
  for (let i=1; i<this.door_cutNum+1; i++) {
    if (i == this.door_x) {
      this.DOOR.rect(this.DOOR.width/( this.door_cutNum+1) * this.door_x, this.DOOR.height/8*5, 20, this.DOOR.height/8*6);
    } else {
      if (random(2)<1) {
        this.DOOR.rect(this.DOOR.width/( this.door_cutNum+1) * i, this.DOOR.height/16*7, 6, this.DOOR.height/8*3);
        this.win_num += 1;
      }
    }
  }







  this.node[0] = createVector(0, 0, 0);
  this.node[1] = createVector(map(noise(1*1+this.ran), 0, 1, real(-1), real(1)), -this.H, map(noise(1*1+this.ran+99), 0, 1, real(-1), real(1)));
  for (let i=2; i<this.node.length; i++) {
    let l = map(i, 2, this.node.length-1, real(1), real(5));
    let x = map(noise(i*1+this.ran), 0, 1, -l, l);
    let z = map(noise(i*1+this.ran+99), 0, 1, -l, l);
    this.node[i] = p5.Vector.sub(this.node[i-1], this.node[i-2]).add(this.node[i-1]);
    this.node[i].add(x, 0, z);
  }



  this.node_FM = new Array(this.node.length);
  this.node_FM[0] = createVector(0, 0, this.W/2);
  for (let i=1; i<this.node.length; i++) {
    let s = p5.Vector.sub(this.node[i], this.node[i-1]).setMag(this.W/2);
    let s_ = createVector(s.z, s.y);
    let angle = s_.heading() + HALF_PI;
    let n = createVector(this.W/2, 0);
    n.rotate(angle);
    this.node_FM[i] = createVector(0, n.y, n.x).add(this.node[i]);
  }

  this.node_RM = new Array(this.node.length);
  this.node_RM[0] = createVector(this.W/2, 0, 0);
  for (let i=1; i<this.node.length; i++) {
    let s = p5.Vector.sub(this.node[i], this.node[i-1]).setMag(this.W/2);
    let angle = -HALF_PI - s.heading();
    let n = createVector(this.W/2, 0);
    n.rotate(-angle);
    this.node_RM[i] = createVector(n.x, n.y, 0).add(this.node[i]);
  }

  this.node_BM = new Array(this.node.length);
  for (let i=0; i<this.node.length; i++) {
    this.node_BM[i] = p5.Vector.sub(this.node[i], this.node_FM[i]).add(this.node[i]);
  }
  this.node_LM = new Array(this.node.length);
  for (let i=0; i<this.node.length; i++) {
    this.node_LM[i] = p5.Vector.sub(this.node[i], this.node_RM[i]).add(this.node[i]);
  }


  this.node_FL = new Array(this.node.length);
  this.node_FR = new Array(this.node.length);
  this.node_BL = new Array(this.node.length);
  this.node_BR = new Array(this.node.length);
  for (let i=0; i<this.node.length; i++) {
    this.node_FL[i] = p5.Vector.sub(this.node_FM[i], this.node[i]).add(this.node_LM[i]);
    this.node_FR[i] = p5.Vector.sub(this.node_FM[i], this.node[i]).add(this.node_RM[i]);
    this.node_BL[i] = p5.Vector.sub(this.node_BM[i], this.node[i]).add(this.node_LM[i]);
    this.node_BR[i] = p5.Vector.sub(this.node_BM[i], this.node[i]).add(this.node_RM[i]);
  }


  this.node_roof = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).mult(this.roofH_rate).add(this.node[this.node.length-1]);
  this.node_roofF = p5.Vector.sub(this.node_FM[this.node.length-1], this.node[this.node.length-1]).add(this.node_roof);
  this.node_roofB = p5.Vector.sub(this.node_BM[this.node.length-1], this.node[this.node.length-1]).add(this.node_roof);

  this.eaves_FU = p5.Vector.sub(this.node_roofF, this.node_roof).mult(0.15).add(this.node_roofF);
  this.eaves_FL = p5.Vector.sub(this.node_FL[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
  this.eaves_FR = p5.Vector.sub(this.node_FR[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
  this.eaves_BU = p5.Vector.sub(this.node_roofB, this.node_roof).mult(0.15).add(this.node_roofB);
  this.eaves_BL = p5.Vector.sub(this.node_BL[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);
  this.eaves_BR = p5.Vector.sub(this.node_BR[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);



  this.road = Array.from(Array(4), () => new Array(2));
  if (!this.is_door_face_left) {
    this.road[0][0] = p5.Vector.sub(this.node_BR[0], this.node_FR[0]).mult(1.0/( this.door_cutNum+1)*this.door_x-0.1).add(this.node_FR[0]);
    this.road[0][1] =this.road[0][0].copy();
    for (let i=1; i<this.road.length; i++) {
      let road_w = this.W *0.2;
      let gap = real(10);
      this.road[i][0] = p5.Vector.sub(this.node_BR[0], this.node_BL[0]).setMag(gap).add(this.road[i-1][0]);
      this.road[i][1] = createVector(this.road[i][0].x, this.road[i][0].y, this.road[i][0].z-road_w);
    }
  } else {
    this.road[0][0] = p5.Vector.sub(this.node_FR[0], this.node_FL[0]).mult(1.0/( this.door_cutNum+1)*this.door_x-0.1).add(this.node_FL[0]);
    this.road[0][1] =this.road[0][0].copy();
    for (let i=1; i<this.road.length; i++) {
      let road_w = this.W *0.2;
      let gap = real(10);
      this.road[i][0] = p5.Vector.sub(this.node_FR[0], this.node_BR[0]).setMag(gap).add(this.road[i-1][0]);
      this.road[i][1] = createVector(this.road[i][0].x+road_w, this.road[i][0].y, this.road[i][0].z);
    }
  }







  this.wall_F = Array.from(Array(2), () => new Array(this.node.length));
  this.wall_L = Array.from(Array(2), () => new Array(this.node.length));
  this.wall_R = Array.from(Array(2), () => new Array(this.node.length));
  this.wall_B = Array.from(Array(2), () => new Array(this.node.length));

  for (let j=0; j<this.node.length; j++) {
    this.wall_F[0][j] = this.node_FL[j].copy();
    this.wall_F[1][j] = this.node_FR[j].copy();
    this.wall_L[0][j] = this.node_BL[j].copy();
    this.wall_L[1][j] = this.node_FL[j].copy();
    this.wall_R[0][j] = this.node_FR[j].copy();
    this.wall_R[1][j] = this.node_BR[j].copy();
    this.wall_B[0][j] = this.node_BR[j].copy();
    this.wall_B[1][j] = this.node_BL[j].copy();
  }

  this.wall_roof_F = this.node_roofF.copy();
  this.wall_roof_B = this.node_roofB.copy();




  /*this.pole_U = new Array(4);
   this.pole_D = new Array(4);
   this.pole_w = real(random(3, 6));
   this.pole_l = real(random(15, 20));
   this.pole_h = real(random(5, 12));
   
   this.pole_D[0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_h).add(this.wall_F[0][0]);
   this.pole_D[1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w).add(this.pole_D[0]);
   this.pole_D[2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w).add(this.pole_D[1]);
   this.pole_D[3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w).add(this.pole_D[0]);
   
   this.pole_U[0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_l).add(this.pole_D[0]);
   this.pole_U[1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w).add(this.pole_U[0]);
   this.pole_U[2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w).add(this.pole_U[1]);
   this.pole_U[3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w).add(this.pole_U[0]);
   */


  this.pole_num = floor(random(1, 3));
  this.pole_U = Array.from(Array(this.pole_num), () => new Array(4));
  this.pole_D = Array.from(Array(this.pole_num), () => new Array(4));
  this.pole_w = new Array(this.pole_num);
  this.pole_l = new Array(this.pole_num);
  this.pole_h = new Array(this.pole_num);
  for (let i=0; i<this.pole_num; i++) {
    this.pole_w[i] = real(random(3, 6));
    this.pole_l[i] = real(random(15, 20));
    this.pole_h[i] = real(random(5, 12));
  }

  if (this.is_door_face_left) {
    if (this.pole_num == 1) {
      this.pole_on_left = random(2)<1;
      if (this.pole_on_left) {
        this.pole_D[0][0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_h[0]).add(this.wall_F[0][0]);
        this.pole_D[0][1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);
        this.pole_D[0][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);

        this.pole_U[0][0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_l[0]).add(this.pole_D[0][0]);
        this.pole_U[0][1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
        this.pole_U[0][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
      } else {
        this.pole_D[0][1] = p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_h[0]).add(this.wall_F[1][0]);
        this.pole_D[0][0] = p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);

        this.pole_U[0][1] = p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_l[0]).add(this.pole_D[0][1]);
        this.pole_U[0][0] = p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
      }
    } else {
      for (let i=0; i<this.pole_num; i++) {
        if (i==0) {
          this.pole_D[i][0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_h[i]).add(this.wall_F[0][0]);
          this.pole_D[i][1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);
          this.pole_D[i][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);

          this.pole_U[i][0] = p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_l[i]).add(this.pole_D[i][0]);
          this.pole_U[i][1] = p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
          this.pole_U[i][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
        } else if (i==1) {
          this.pole_D[i][1] = p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_h[i]).add(this.wall_F[1][0]);
          this.pole_D[i][0] = p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);

          this.pole_U[i][1] = p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_l[i]).add(this.pole_D[i][1]);
          this.pole_U[i][0] = p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][2] = p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][3] = p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
        }
      }
    }
  } else {
    if (this.pole_num == 1) {
      this.pole_on_left = random(2)<1;
      if (this.pole_on_left) {
        this.pole_D[0][0] = p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_h[0]).add(this.wall_R[0][0]);
        this.pole_D[0][1] = p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);
        this.pole_D[0][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);

        this.pole_U[0][0] = p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_l[0]).add(this.pole_D[0][0]);
        this.pole_U[0][1] = p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
        this.pole_U[0][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
      } else {
        this.pole_D[0][1] = p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_h[0]).add(this.wall_R[1][0]);
        this.pole_D[0][0] = p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]);
        this.pole_D[0][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]);

        this.pole_U[0][1] = p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_l[0]).add(this.pole_D[0][1]);
        this.pole_U[0][0] = p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]);
        this.pole_U[0][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]);
      }
    } else {
      for (let i=0; i<this.pole_num; i++) {
        if (i==0) {
          this.pole_D[i][0] = p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_h[i]).add(this.wall_R[0][0]);
          this.pole_D[i][1] = p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);
          this.pole_D[i][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);

          this.pole_U[i][0] = p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_l[i]).add(this.pole_D[i][0]);
          this.pole_U[i][1] = p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
          this.pole_U[i][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
        } else if (i==1) {
          this.pole_D[i][1] = p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_h[i]).add(this.wall_R[1][0]);
          this.pole_D[i][0] = p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]);
          this.pole_D[i][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]);

          this.pole_U[i][1] = p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_l[i]).add(this.pole_D[i][1]);
          this.pole_U[i][0] = p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][2] = p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]);
          this.pole_U[i][3] = p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]);
        }
      }
    }
  }


  this.POLE = createGraphics(100, 100);
  this.POLE.background(255);
  this.POLE.noStroke();
  this.POLE.fill(0);
  this.POLE.rect(-1, -1, 102, 16);
  this.POLE.rect(-1, 85, 102, 16);
  let y = map(frameCount%60, 0, 60, -20, 120);
  this.POLE.rect(-1, y, 102, 16);









  this.change = function() {
    //noiseSeed(random(-999, 999)); 
    open_open = false;
    this.ran = random(-999, 999);
    this.W = real(random(45, 55));
    this.H = real(random(30, 50));
    this.roofH_rate = random(0.25, 0.75);




    this.node = new Array(floor(random(2, 4)));
    this.node_FM = new Array(this.node.length);
    this.node_RM = new Array(this.node.length);
    this.node_BM = new Array(this.node.length);
    this.node_LM = new Array(this.node.length);
    this.node_FL = new Array(this.node.length);
    this.node_FR = new Array(this.node.length);
    this.node_BL = new Array(this.node.length);
    this.node_BR = new Array(this.node.length);

    this.wall_F = Array.from(Array(2), () => new Array(this.node.length));
    this.wall_L = Array.from(Array(2), () => new Array(this.node.length));
    this.wall_R = Array.from(Array(2), () => new Array(this.node.length));
    this.wall_B = Array.from(Array(2), () => new Array(this.node.length));




    this.is_door_face_left = random(2)<1;

    this.win_num = 0;
    this.have_win = Array.from(Array(this.node.length-1), () => new Array(4));
    for (let i=0; i<this.node.length-1; i++) {
      for (let j=0; j<4; j++) {
        if (this.is_door_face_left) {
          if (i==0 && j==0) {
            this.have_win[i][j] = 0;
          } else {
            this.have_win[i][j] = floor(random(0, 4));
          }
        } else {
          if (i==0 && j==1) {
            this.have_win[i][j] = 0;
          } else {
            this.have_win[i][j] = floor(random(0, 4));
          }
        }
        this.win_num += this.have_win[i][j];
      }
    }

    this.DOOR.background(255);
    this.DOOR.rectMode(CENTER);
    this.DOOR.fill(0);
    this.DOOR.noStroke();
    this.door_cutNum = floor(random(1, 4));
    this.door_x = floor(random(1, this.door_cutNum+1));
    for (let i=1; i<this.door_cutNum+1; i++) {
      if (i == this.door_x) {
        this.DOOR.rect(this.DOOR.width/( this.door_cutNum+1) * this.door_x, this.DOOR.height/8*5, 20, this.DOOR.height/8*6);
      } else {
        if (random(2)<1) {
          this.DOOR.rect(this.DOOR.width/( this.door_cutNum+1) * i, this.DOOR.height/16*7, 7, this.DOOR.height/8*3);
          this.win_num += 1;
        }
      }
    }




    this.road = Array.from(Array(floor(random(2.5, 8))), () => new Array(2));
    if (this.road.length <= 2) {
      this.road = Array.from(Array(1), () => new Array(2));
    }
    for (let i=0; i<this.road.length; i++) {
      this.road[i][0] = createVector(0, 0);
      this.road[i][1] = createVector(0, 0);
    }



    this.pole_num = floor(random(1, 3));
    this.pole_U = Array.from(Array(this.pole_num), () => new Array(4));
    this.pole_D = Array.from(Array(this.pole_num), () => new Array(4));
    this.pole_w = new Array(this.pole_num);
    this.pole_l = new Array(this.pole_num);
    this.pole_h = new Array(this.pole_num);
    for (let i=0; i<this.pole_num; i++) {
      this.pole_w[i] = real(random(3, 6));
      this.pole_l[i] = real(random(15, 20));
      this.pole_h[i] = real(random(5, 12));
    }
    if (this.pole_num == 1) {
      this.pole_on_left = random(2)<1;
    }
    if (this.is_door_face_left) {
      if (this.pole_num == 1) {
        if (this.pole_on_left) {
          for (let j=0; j<4; j++) {
            this.pole_D[0][j] = createVector(-this.W/2, 0, this.W/2);
            this.pole_U[0][j] = createVector(-this.W/2, 0, this.W/2);
          }
        } else {
          for (let j=0; j<4; j++) {
            this.pole_D[0][j] = createVector(this.W/2, 0, this.W/2);
            this.pole_U[0][j] = createVector(this.W/2, 0, this.W/2);
          }
        }
      } else {
        for (let i=0; i<this.pole_num; i++) {
          if (i==0) {
            for (let j=0; j<4; j++) {
              this.pole_D[i][j] = createVector(-this.W/2, 0, this.W/2);
              this.pole_U[i][j] = createVector(-this.W/2, 0, this.W/2);
            }
          } else if (i==1) {
            for (let j=0; j<4; j++) {
              this.pole_D[i][j] = createVector(this.W/2, 0, this.W/2);
              this.pole_U[i][j] = createVector(this.W/2, 0, this.W/2);
            }
          }
        }
      }
    } else {
      if (this.pole_num == 1) {
        if (this.pole_on_left) {
          for (let j=0; j<4; j++) {
            this.pole_D[0][j] = createVector(this.W/2, 0, this.W/2);
            this.pole_U[0][j] = createVector(this.W/2, 0, this.W/2);
          }
        } else {
          for (let j=0; j<4; j++) {
            this.pole_D[0][j] = createVector(this.W/2, 0, -this.W/2);
            this.pole_U[0][j] = createVector(this.W/2, 0, -this.W/2);
          }
        }
      } else {
        for (let i=0; i<this.pole_num; i++) {
          if (i==0) {
            for (let j=0; j<4; j++) {
              this.pole_D[i][j] = createVector(this.W/2, 0, this.W/2);
              this.pole_U[i][j] = createVector(this.W/2, 0, this.W/2);
            }
          } else if (i==1) {
            for (let j=0; j<4; j++) {
              this.pole_D[i][j] = createVector(this.W/2, 0, -this.W/2);
              this.pole_U[i][j] = createVector(this.W/2, 0, -this.W/2);
            }
          }
        }
      }
    }
  };











  this.update = function() {
    this.node[0] = createVector(0, 0, 0);
    this.node[1] = easing_p(this.node[1], createVector(map(noise(1*1+this.ran), 0, 1, real(-1), real(1)), -this.H, map(noise(1*1+this.ran+99), 0, 1, real(-1), real(1))));
    for (let i=2; i<this.node.length; i++) {
      let l = map(i, 1, this.node.length-1, real(1), real(5));
      let x = map(noise(i*1+this.ran), 0, 1, -l, l);
      let z = map(noise(i*1+this.ran+99), 0, 1, -l, l);
      this.node[i] = easing_p(this.node[i], p5.Vector.sub(this.node[i-1], this.node[i-2]).add(this.node[i-1]).add(x, 0, z));
    }


    this.node_FM[0] = easing_p(this.node_FM[0], createVector(0, 0, this.W/2));
    for (let i=1; i<this.node.length; i++) {
      let s = p5.Vector.sub(this.node[i], this.node[i-1]).setMag(this.W/2);
      let s_ = createVector(s.z, s.y);
      let angle = s_.heading() + HALF_PI;
      let n = createVector(this.W/2, 0);
      n.rotate(angle);
      this.node_FM[i] = easing_p(this.node_FM[i], createVector(0, n.y, n.x).add(this.node[i]));
    }


    this.node_RM[0] = easing_p(this.node_RM[0], createVector(this.W/2, 0, 0));
    for (let i=1; i<this.node.length; i++) {
      let s = p5.Vector.sub(this.node[i], this.node[i-1]).setMag(this.W/2);
      let angle = -HALF_PI - s.heading();
      let n = createVector(this.W/2, 0);
      n.rotate(-angle);
      this.node_RM[i] = easing_p(this.node_RM[i], createVector(n.x, n.y, 0).add(this.node[i]));
    }

    this.node_BM = new Array(this.node.length);
    for (let i=0; i<this.node.length; i++) {
      this.node_BM[i] = p5.Vector.sub(this.node[i], this.node_FM[i]).add(this.node[i]);
    }
    this.node_LM = new Array(this.node.length);
    for (let i=0; i<this.node.length; i++) {
      this.node_LM[i] = p5.Vector.sub(this.node[i], this.node_RM[i]).add(this.node[i]);
    }


    for (let i=0; i<this.node.length; i++) {
      this.node_FL[i] = p5.Vector.sub(this.node_FM[i], this.node[i]).add(this.node_LM[i]);
      this.node_FR[i] = p5.Vector.sub(this.node_FM[i], this.node[i]).add(this.node_RM[i]);
      this.node_BL[i] = p5.Vector.sub(this.node_BM[i], this.node[i]).add(this.node_LM[i]);
      this.node_BR[i] = p5.Vector.sub(this.node_BM[i], this.node[i]).add(this.node_RM[i]);
    }


    this.node_roof = easing_p(this.node_roof, p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).mult(this.roofH_rate).add(this.node[this.node.length-1]));
    this.node_roofF = p5.Vector.sub(this.node_FM[this.node.length-1], this.node[this.node.length-1]).add(this.node_roof);
    this.node_roofB = p5.Vector.sub(this.node_BM[this.node.length-1], this.node[this.node.length-1]).add(this.node_roof);

    //this.eaves_FU = p5.Vector.sub(this.node_roofF, this.node_roof).mult(0.15).add(this.node_roofF);
    //this.eaves_FL = p5.Vector.sub(this.node_FL[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
    //this.eaves_FR = p5.Vector.sub(this.node_FR[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
    //this.eaves_BU = p5.Vector.sub(this.node_roofB, this.node_roof).mult(0.15).add(this.node_roofB);
    //this.eaves_BL = p5.Vector.sub(this.node_BL[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);
    //this.eaves_BR = p5.Vector.sub(this.node_BR[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);


    if (!this.is_door_face_left) {
      this.road[0][0] = p5.Vector.sub(this.node_BR[0], this.node_FR[0]).mult(1.0/( this.door_cutNum+1)*this.door_x-0.1).add(this.node_FR[0]);
      this.road[0][1] =this.road[0][0].copy();
      for (let i=1; i<this.road.length; i++) {
        let road_w = this.W *0.2;
        let gap = real(10);
        this.road[i][0] = easing_p2(this.road[i][0], p5.Vector.sub(this.node_BR[0], this.node_BL[0]).setMag(gap).add(this.road[i-1][0]));
        this.road[i][1] = easing_p2(this.road[i][1], createVector(this.road[i][0].x, this.road[i][0].y, this.road[i][0].z-road_w));
      }
    } else {
      this.road[0][0] = p5.Vector.sub(this.node_FR[0], this.node_FL[0]).mult(1.0/( this.door_cutNum+1)*this.door_x-0.1).add(this.node_FL[0]);
      this.road[0][1] =this.road[0][0].copy();
      for (let i=1; i<this.road.length; i++) {
        let road_w = this.W *0.2;
        let gap = real(10);
        this.road[i][0] = easing_p2(this.road[i][0], p5.Vector.sub(this.node_FR[0], this.node_BR[0]).setMag(gap).add(this.road[i-1][0]));
        this.road[i][1] = easing_p2(this.road[i][1], createVector(this.road[i][0].x+road_w, this.road[i][0].y, this.road[i][0].z));
      }
    }





    if (!open_open) {
      for (let j=0; j<this.node.length; j++) {
        this.wall_F[0][j] = this.node_FL[j].copy();
        this.wall_F[1][j] = this.node_FR[j].copy();
        this.wall_L[0][j] = this.node_BL[j].copy();
        this.wall_L[1][j] = this.node_FL[j].copy();
        this.wall_R[0][j] = this.node_FR[j].copy();
        this.wall_R[1][j] = this.node_BR[j].copy();
        this.wall_B[0][j] = this.node_BR[j].copy();
        this.wall_B[1][j] = this.node_BL[j].copy();
      }
      this.wall_roof_F = this.node_roofF.copy();
      this.wall_roof_B = this.node_roofB.copy();
      this.eaves_FU = p5.Vector.sub(this.node_roofF, this.node_roof).mult(0.15).add(this.node_roofF);
      this.eaves_FL = p5.Vector.sub(this.node_FL[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
      this.eaves_FR = p5.Vector.sub(this.node_FR[this.node.length-1], this.node_roofF).mult(1.15).add(this.eaves_FU);
      this.eaves_BU = p5.Vector.sub(this.node_roofB, this.node_roof).mult(0.15).add(this.node_roofB);
      this.eaves_BL = p5.Vector.sub(this.node_BL[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);
      this.eaves_BR = p5.Vector.sub(this.node_BR[this.node.length-1], this.node_roofB).mult(1.15).add(this.eaves_BU);
    } else {

      this.eaves_FU = easing_p5(this.eaves_FU, this.node[0]);
      this.eaves_FL = easing_p5(this.eaves_FL, this.node[0]);
      this.eaves_FR = easing_p5(this.eaves_FR, this.node[0]);
      this.eaves_BU = easing_p5(this.eaves_BU, this.node[0]);
      this.eaves_BL = easing_p5(this.eaves_BL, this.node[0]);
      this.eaves_BR = easing_p5(this.eaves_BR, this.node[0]);

      for (let j=0; j<this.node.length; j++) {
        this.wall_F[0][j] = easing_p2(this.wall_F[0][j], PRotateX(this.node_FL[j].copy().add(0, 0, -this.W/2), HALF_PI).add(0, 0, this.W/2));
        this.wall_F[1][j] = easing_p2(this.wall_F[1][j], PRotateX(this.node_FR[j].copy().add(0, 0, -this.W/2), HALF_PI).add(0, 0, this.W/2));
        this.wall_L[0][j] = easing_p2(this.wall_L[0][j], PRotateZ(this.node_BL[j].copy().add(this.W/2, 0, 0), -HALF_PI).add(-this.W/2, 0, 0));
        this.wall_L[1][j] = easing_p2(this.wall_L[1][j], PRotateZ(this.node_FL[j].copy().add(this.W/2, 0, 0), -HALF_PI).add(-this.W/2, 0, 0));
        this.wall_R[0][j] = easing_p2(this.wall_R[0][j], PRotateZ(this.node_FR[j].copy().add(-this.W/2, 0, 0), HALF_PI).add(this.W/2, 0, 0));
        this.wall_R[1][j] = easing_p2(this.wall_R[1][j], PRotateZ(this.node_BR[j].copy().add(-this.W/2, 0, 0), HALF_PI).add(this.W/2, 0, 0));
        this.wall_B[0][j] = easing_p2(this.wall_B[0][j], PRotateX(this.node_BR[j].copy().add(0, 0, this.W/2), -HALF_PI).add(0, 0, -this.W/2));
        this.wall_B[1][j] = easing_p2(this.wall_B[1][j], PRotateX(this.node_BL[j].copy().add(0, 0, this.W/2), -HALF_PI).add(0, 0, -this.W/2));
      }
      this.wall_roof_F = easing_p2(this.wall_roof_F, PRotateX(this.node_roofF.copy().add(0, 0, -this.W/2), HALF_PI).add(0, 0, this.W/2));
      this.wall_roof_B = easing_p2(this.wall_roof_B, PRotateX(this.node_roofB.copy().add(0, 0, this.W/2), -HALF_PI).add(0, 0, -this.W/2));

      this.eaves_FU = easing_p2(this.eaves_FU, PRotateZ(this.node_BL[0].copy().add(this.W/2, 0, 0), -HALF_PI).add(-this.W/2, 0, 0));
    }




    this.POLE.background(255);
    if (!open_info) {
      this.POLE.noStroke();
      this.POLE.fill(0);
    } else {
      this.POLE.stroke(200);
      this.POLE.strokeWeight(1.5);
      this.POLE.fill(245);
    }
    this.POLE.rect(-1, -1, 102, 11);
    this.POLE.rect(-1, 90, 102, 11);
    for (let i=0; i<5; i++) {
      let be = map(i, 0, 5, 0, 60);
      let y = map((frameCount+be)%60, 0, 60, 120, -20);
      this.POLE.beginShape();
      this.POLE.vertex(-1, y);
      this.POLE.vertex(102, y-40);
      this.POLE.vertex(102, y-40+16);
      this.POLE.vertex(-1, y+16);
      this.POLE.endShape(CLOSE);
    }



    if (this.is_door_face_left) {
      if (this.pole_num == 1) {
        if (this.pole_on_left) {
          this.pole_D[0][0] = easing_p3(this.pole_D[0][0], p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_h[0]).add(this.wall_F[0][0]));
          this.pole_D[0][1] = easing_p3(this.pole_D[0][1], p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));
          this.pole_D[0][2] = easing_p3(this.pole_D[0][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][3] = easing_p3(this.pole_D[0][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));

          this.pole_U[0][0] = easing_p3(this.pole_U[0][0], p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_l[0]).add(this.pole_D[0][0]));
          this.pole_U[0][1] = easing_p3(this.pole_U[0][1], p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
          this.pole_U[0][2] = easing_p3(this.pole_U[0][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][3] = easing_p3(this.pole_U[0][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
        } else {
          this.pole_D[0][1] = easing_p3(this.pole_D[0][1], p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_h[0]).add(this.wall_F[1][0]));
          this.pole_D[0][0] = easing_p3(this.pole_D[0][0], p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][2] = easing_p3(this.pole_D[0][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][3] = easing_p3(this.pole_D[0][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));

          this.pole_U[0][1] = easing_p3(this.pole_U[0][1], p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_l[0]).add(this.pole_D[0][1]));
          this.pole_U[0][0] = easing_p3(this.pole_U[0][0], p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][2] = easing_p3(this.pole_U[0][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][3] = easing_p3(this.pole_U[0][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
        }
      } else {
        for (let i=0; i<this.pole_num; i++) {
          if (i==0) {
            this.pole_D[i][0] = easing_p3(this.pole_D[i][0], p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_h[i]).add(this.wall_F[0][0]));
            this.pole_D[i][1] = easing_p3(this.pole_D[i][1], p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));
            this.pole_D[i][2] = easing_p3(this.pole_D[i][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][3] = easing_p3(this.pole_D[i][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));

            this.pole_U[i][0] = easing_p3(this.pole_U[i][0], p5.Vector.sub(this.wall_F[0][1], this.wall_F[0][0]).setMag(this.pole_l[i]).add(this.pole_D[i][0]));
            this.pole_U[i][1] = easing_p3(this.pole_U[i][1], p5.Vector.sub(this.wall_F[1][0], this.wall_F[0][0]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
            this.pole_U[i][2] = easing_p3(this.pole_U[i][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][3] = easing_p3(this.pole_U[i][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
          } else if (i==1) {
            this.pole_D[i][1] = easing_p3(this.pole_D[i][1], p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_h[i]).add(this.wall_F[1][0]));
            this.pole_D[i][0] = easing_p3(this.pole_D[i][0], p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][2] = easing_p3(this.pole_D[i][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][3] = easing_p3(this.pole_D[i][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));

            this.pole_U[i][1] = easing_p3(this.pole_U[i][1], p5.Vector.sub(this.wall_F[1][1], this.wall_F[1][0]).setMag(this.pole_l[i]).add(this.pole_D[i][1]));
            this.pole_U[i][0] = easing_p3(this.pole_U[i][0], p5.Vector.sub(this.wall_F[0][0], this.wall_F[1][0]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][2] = easing_p3(this.pole_U[i][2], p5.Vector.sub(this.wall_F[1][1], this.node_RM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][3] = easing_p3(this.pole_U[i][3], p5.Vector.sub(this.wall_F[0][1], this.node_LM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
          }
        }
      }
    } else {
      if (this.pole_num == 1) {
        if (this.pole_on_left) {
          this.pole_D[0][0] = easing_p3(this.pole_D[0][0], p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_h[0]).add(this.wall_R[0][0]));
          this.pole_D[0][1] = easing_p3(this.pole_D[0][1], p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));
          this.pole_D[0][2] = easing_p3(this.pole_D[0][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][3] = easing_p3(this.pole_D[0][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));

          this.pole_U[0][0] = easing_p3(this.pole_U[0][0], p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_l[0]).add(this.pole_D[0][0]));
          this.pole_U[0][1] = easing_p3(this.pole_U[0][1], p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
          this.pole_U[0][2] = easing_p3(this.pole_U[0][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][3] = easing_p3(this.pole_U[0][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
        } else {
          this.pole_D[0][1] = easing_p3(this.pole_D[0][1], p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_h[0]).add(this.wall_R[1][0]));
          this.pole_D[0][0] = easing_p3(this.pole_D[0][0], p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][2] = easing_p3(this.pole_D[0][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][1]));
          this.pole_D[0][3] = easing_p3(this.pole_D[0][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_D[0][0]));

          this.pole_U[0][1] = easing_p3(this.pole_U[0][1], p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_l[0]).add(this.pole_D[0][1]));
          this.pole_U[0][0] = easing_p3(this.pole_U[0][0], p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][2] = easing_p3(this.pole_U[0][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][1]));
          this.pole_U[0][3] = easing_p3(this.pole_U[0][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[0]).add(this.pole_U[0][0]));
        }
      } else {
        for (let i=0; i<this.pole_num; i++) {
          if (i==0) {
            this.pole_D[i][0] = easing_p3(this.pole_D[i][0], p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_h[i]).add(this.wall_R[0][0]));
            this.pole_D[i][1] = easing_p3(this.pole_D[i][1], p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));
            this.pole_D[i][2] = easing_p3(this.pole_D[i][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][3] = easing_p3(this.pole_D[i][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));

            this.pole_U[i][0] = easing_p3(this.pole_U[i][0], p5.Vector.sub(this.wall_R[0][1], this.wall_R[0][0]).setMag(this.pole_l[i]).add(this.pole_D[i][0]));
            this.pole_U[i][1] = easing_p3(this.pole_U[i][1], p5.Vector.sub(this.wall_R[1][0], this.wall_R[0][0]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
            this.pole_U[i][2] = easing_p3(this.pole_U[i][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][3] = easing_p3(this.pole_U[i][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
          } else if (i==1) {
            this.pole_D[i][1] = easing_p3(this.pole_D[i][1], p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_h[i]).add(this.wall_R[1][0]));
            this.pole_D[i][0] = easing_p3(this.pole_D[i][0], p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][2] = easing_p3(this.pole_D[i][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][1]));
            this.pole_D[i][3] = easing_p3(this.pole_D[i][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_D[i][0]));

            this.pole_U[i][1] = easing_p3(this.pole_U[i][1], p5.Vector.sub(this.wall_R[1][1], this.wall_R[1][0]).setMag(this.pole_l[i]).add(this.pole_D[i][1]));
            this.pole_U[i][0] = easing_p3(this.pole_U[i][0], p5.Vector.sub(this.wall_R[0][0], this.wall_R[1][0]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][2] = easing_p3(this.pole_U[i][2], p5.Vector.sub(this.wall_R[1][1], this.node_BM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][1]));
            this.pole_U[i][3] = easing_p3(this.pole_U[i][3], p5.Vector.sub(this.wall_R[0][1], this.node_FM[1]).setMag(this.pole_w[i]).add(this.pole_U[i][0]));
          }
        }
      }
    }
  };





  this.display = function() {

    //push();
    //fill(255);
    //noStroke();
    //for (let i=1; i<this.node.length; i++) {
    //  beginShape();
    //  if (i==1 && this.is_door_face_left) {
    //    texture(this.DOOR);
    //  } else {
    //    texture(this.WALL[this.have_win[i-1][0]]);
    //  }
    //  vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z, 0, 0);
    //  vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z, 1, 0);
    //  vertex(this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z, 1, 1);
    //  vertex(this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z, 0, 1);
    //  endShape(CLOSE);

    //  beginShape();
    //  if (i==1 && !this.is_door_face_left) {
    //    texture(this.DOOR);
    //  } else {
    //    texture(this.WALL[this.have_win[i-1][1]]);
    //  }
    //  vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z, 0, 0);
    //  vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z, 1, 0);
    //  vertex(this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z, 1, 1);
    //  vertex(this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z, 0, 1);
    //  endShape(CLOSE);

    //  beginShape();
    //  texture(this.WALL[this.have_win[i-1][2]]);
    //  vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z, 0, 0);
    //  vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z, 1, 0);
    //  vertex(this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z, 1, 1);
    //  vertex(this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z, 0, 1);
    //  endShape(CLOSE);

    //  beginShape();
    //  texture(this.WALL[this.have_win[i-1][3]]);
    //  vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z, 0, 0);
    //  vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z, 1, 0);
    //  vertex(this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z, 1, 1);
    //  vertex(this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z, 0, 1);
    //  endShape(CLOSE);
    //}
    //pop();

    fill(255);
    noStroke();
    for (let i=1; i<this.node.length; i++) {
      beginShape();
      if (i==1 && this.is_door_face_left) {
        texture(this.DOOR);
      } else {
        texture(this.WALL[this.have_win[i-1][0]]);
      }
      vertex(this.wall_F[0][i].x, this.wall_F[0][i].y, this.wall_F[0][i].z, 0, 0);
      vertex(this.wall_F[1][i].x, this.wall_F[1][i].y, this.wall_F[1][i].z, 1, 0);
      vertex(this.wall_F[1][i-1].x, this.wall_F[1][i-1].y, this.wall_F[1][i-1].z, 1, 1);
      vertex(this.wall_F[0][i-1].x, this.wall_F[0][i-1].y, this.wall_F[0][i-1].z, 0, 1);
      endShape(CLOSE);


      beginShape();
      if (i==1 && !this.is_door_face_left) {
        texture(this.DOOR);
      } else {
        texture(this.WALL[this.have_win[i-1][1]]);
      }
      vertex(this.wall_R[0][i].x, this.wall_R[0][i].y, this.wall_R[0][i].z, 0, 0);
      vertex(this.wall_R[1][i].x, this.wall_R[1][i].y, this.wall_R[1][i].z, 1, 0);
      vertex(this.wall_R[1][i-1].x, this.wall_R[1][i-1].y, this.wall_R[1][i-1].z, 1, 1);
      vertex(this.wall_R[0][i-1].x, this.wall_R[0][i-1].y, this.wall_R[0][i-1].z, 0, 1);
      endShape(CLOSE);


      beginShape();
      texture(this.WALL[this.have_win[i-1][2]]);
      vertex(this.wall_B[0][i].x, this.wall_B[0][i].y, this.wall_B[0][i].z, 0, 0);
      vertex(this.wall_B[1][i].x, this.wall_B[1][i].y, this.wall_B[1][i].z, 1, 0);
      vertex(this.wall_B[1][i-1].x, this.wall_B[1][i-1].y, this.wall_B[1][i-1].z, 1, 1);
      vertex(this.wall_B[0][i-1].x, this.wall_B[0][i-1].y, this.wall_B[0][i-1].z, 0, 1);
      endShape(CLOSE);


      beginShape();
      texture(this.WALL[this.have_win[i-1][3]]);
      vertex(this.wall_L[0][i].x, this.wall_L[0][i].y, this.wall_L[0][i].z, 0, 0);
      vertex(this.wall_L[1][i].x, this.wall_L[1][i].y, this.wall_L[1][i].z, 1, 0);
      vertex(this.wall_L[1][i-1].x, this.wall_L[1][i-1].y, this.wall_L[1][i-1].z, 1, 1);
      vertex(this.wall_L[0][i-1].x, this.wall_L[0][i-1].y, this.wall_L[0][i-1].z, 0, 1);
      endShape(CLOSE);
    }
    fill(255);

    beginShape();
    vertex(this.wall_F[0][this.wall_F[0].length-1].x, this.wall_F[0][this.wall_F[0].length-1].y, this.wall_F[0][this.wall_F[0].length-1].z);
    vertex(this.wall_roof_F.x, this.wall_roof_F.y, this.wall_roof_F.z);
    vertex(this.wall_F[1][this.wall_F[1].length-1].x, this.wall_F[1][this.wall_F[1].length-1].y, this.wall_F[1][this.wall_F[1].length-1].z);
    endShape(CLOSE);

    beginShape();
    vertex(this.wall_B[0][this.wall_B[0].length-1].x, this.wall_B[0][this.wall_B[0].length-1].y, this.wall_B[0][this.wall_B[0].length-1].z);
    vertex(this.wall_roof_B.x, this.wall_roof_B.y, this.wall_roof_B.z);
    vertex(this.wall_B[1][this.wall_B[1].length-1].x, this.wall_B[1][this.wall_B[1].length-1].y, this.wall_B[1][this.wall_B[1].length-1].z);
    endShape(CLOSE);


    noFill();
    stroke(0);
    strokeWeight(real(2));
    beginShape();
    for (let j=0; j<this.node.length; j++) {
      vertex(this.wall_F[0][j].x, this.wall_F[0][j].y, this.wall_F[0][j].z);
    }
    vertex(this.wall_roof_F.x, this.wall_roof_F.y, this.wall_roof_F.z);
    for (let j=this.node.length-1; j>=0; j--) {
      vertex(this.wall_F[1][j].x, this.wall_F[1][j].y, this.wall_F[1][j].z);
    }
    endShape(CLOSE);

    beginShape();
    for (let j=0; j<this.node.length; j++) {
      vertex(this.wall_B[0][j].x, this.wall_B[0][j].y, this.wall_B[0][j].z);
    }
    vertex(this.wall_roof_B.x, this.wall_roof_B.y, this.wall_roof_B.z);
    for (let j=this.node.length-1; j>=0; j--) {
      vertex(this.wall_B[1][j].x, this.wall_B[1][j].y, this.wall_B[1][j].z);
    }
    endShape(CLOSE);

    beginShape();
    for (let j=0; j<this.node.length; j++) {
      vertex(this.wall_L[0][j].x, this.wall_L[0][j].y, this.wall_L[0][j].z);
    }
    for (let j=this.node.length-1; j>=0; j--) {
      vertex(this.wall_L[1][j].x, this.wall_L[1][j].y, this.wall_L[1][j].z);
    }
    endShape(CLOSE);

    beginShape();
    for (let j=0; j<this.node.length; j++) {
      vertex(this.wall_R[0][j].x, this.wall_R[0][j].y, this.wall_R[0][j].z);
    }
    for (let j=this.node.length-1; j>=0; j--) {
      vertex(this.wall_R[1][j].x, this.wall_R[1][j].y, this.wall_R[1][j].z);
    }
    endShape(CLOSE);



    //fill(255);
    //noStroke();
    //beginShape();
    //vertex(this.node_roofF.x, this.node_roofF.y, this.node_roofF.z);
    //vertex(this.node_FR[this.node.length-1].x, this.node_FR[this.node.length-1].y, this.node_FR[this.node.length-1].z);
    //vertex(this.node_FL[this.node.length-1].x, this.node_FL[this.node.length-1].y, this.node_FL[this.node.length-1].z);
    //endShape(CLOSE);

    //beginShape();
    //vertex(this.node_roofB.x, this.node_roofB.y, this.node_roofB.z);
    //vertex(this.node_BR[this.node.length-1].x, this.node_BR[this.node.length-1].y, this.node_BR[this.node.length-1].z);
    //vertex(this.node_BL[this.node.length-1].x, this.node_BL[this.node.length-1].y, this.node_BL[this.node.length-1].z);
    //endShape(CLOSE);

    //stroke(0);
    //strokeWeight(real(2));
    //for (let i=1; i<this.node.length; i++) {
    //  line(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z, this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z);
    //  line(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z, this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z);
    //  line(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z, this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z);
    //  line(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z, this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z);
    //}

    //strokeWeight(real(2));
    //beginShape();
    //vertex(this.node_FL[0].x, this.node_FL[0].y, this.node_FL[0].z);
    //vertex(this.node_FR[0].x, this.node_FR[0].y, this.node_FR[0].z);
    //vertex(this.node_BR[0].x, this.node_BR[0].y, this.node_BR[0].z);
    //vertex(this.node_BL[0].x, this.node_BL[0].y, this.node_BL[0].z);
    //endShape(CLOSE);



    stroke(0);
    strokeWeight(real(2));
    fill(0);
    beginShape();
    vertex(this.eaves_FU.x, this.eaves_FU.y, this.eaves_FU.z);
    vertex(this.eaves_BU.x, this.eaves_BU.y, this.eaves_BU.z);
    vertex(this.eaves_BL.x, this.eaves_BL.y, this.eaves_BL.z);
    vertex(this.eaves_FL.x, this.eaves_FL.y, this.eaves_FL.z);
    endShape(CLOSE);
    beginShape();
    vertex(this.eaves_FU.x, this.eaves_FU.y, this.eaves_FU.z);
    vertex(this.eaves_BU.x, this.eaves_BU.y, this.eaves_BU.z);
    vertex(this.eaves_BR.x, this.eaves_BR.y, this.eaves_BR.z);
    vertex(this.eaves_FR.x, this.eaves_FR.y, this.eaves_FR.z);   
    endShape(CLOSE);


    if (open_open) {
      for (let i=0; i<this.road.length; i++) {
        this.road[i][0].y = easing_x(this.road[i][0].y, real(5));
        this.road[i][1].y = easing_x(this.road[i][1].y, real(5));
      }
    }
    stroke(0);
    strokeWeight(real(1));
    noFill();
    beginShape(LINES);
    for (let i=1; i<this.road.length; i++) {
      vertex(this.road[i][0].x, this.road[i][0].y, this.road[i][0].z);
      vertex(this.road[i][1].x, this.road[i][1].y, this.road[i][1].z);
    }
    endShape();





    for (let j=0; j<this.pole_num; j++) {
      noStroke();
      fill(0);
      beginShape();
      for (let i=0; i<4; i++) {
        vertex(this.pole_D[j][i].x, this.pole_D[j][i].y, this.pole_D[j][i].z);
      }
      endShape(CLOSE);
      beginShape();
      for (let i=0; i<4; i++) {
        vertex(this.pole_U[j][i].x, this.pole_U[j][i].y, this.pole_U[j][i].z);
      }
      endShape(CLOSE);

      fill(255);
      beginShape();
      texture(this.POLE);
      vertex(this.pole_U[j][0].x, this.pole_U[j][0].y, this.pole_U[j][0].z, 0, 0);
      vertex(this.pole_U[j][3].x, this.pole_U[j][3].y, this.pole_U[j][3].z, 0.333, 0);
      vertex(this.pole_D[j][3].x, this.pole_D[j][3].y, this.pole_D[j][3].z, 0.333, 1);
      vertex(this.pole_D[j][0].x, this.pole_D[j][0].y, this.pole_D[j][0].z, 0, 1);
      endShape(CLOSE);
      beginShape();
      texture(this.POLE);
      vertex(this.pole_U[j][3].x, this.pole_U[j][3].y, this.pole_U[j][3].z, 0.333, 0);
      vertex(this.pole_U[j][2].x, this.pole_U[j][2].y, this.pole_U[j][2].z, 0.666, 0);
      vertex(this.pole_D[j][2].x, this.pole_D[j][2].y, this.pole_D[j][2].z, 0.666, 1);
      vertex(this.pole_D[j][3].x, this.pole_D[j][3].y, this.pole_D[j][3].z, 0.333, 1);
      endShape(CLOSE);
      beginShape();
      texture(this.POLE);
      vertex(this.pole_U[j][2].x, this.pole_U[j][2].y, this.pole_U[j][2].z, 0.666, 0);
      vertex(this.pole_U[j][1].x, this.pole_U[j][1].y, this.pole_U[j][1].z, 1, 0);
      vertex(this.pole_D[j][1].x, this.pole_D[j][1].y, this.pole_D[j][1].z, 1, 1);
      vertex(this.pole_D[j][2].x, this.pole_D[j][2].y, this.pole_D[j][2].z, 0.666, 1);
      endShape(CLOSE);
      fill(255);

      noFill();
      stroke(0);
      strokeWeight(real(2));
      beginShape(LINES);
      vertex(this.pole_U[j][0].x, this.pole_U[j][0].y, this.pole_U[j][0].z);
      vertex(this.pole_D[j][0].x, this.pole_D[j][0].y, this.pole_D[j][0].z);
      vertex(this.pole_U[j][1].x, this.pole_U[j][1].y, this.pole_U[j][1].z);
      vertex(this.pole_D[j][1].x, this.pole_D[j][1].y, this.pole_D[j][1].z);
      endShape();

      strokeWeight(this.pole_w[j]*1.5);
      beginShape(POINTS);
      vertex((this.pole_U[j][0].x+this.pole_U[j][2].x)*0.5, this.pole_U[j][0].y, (this.pole_U[j][0].z+this.pole_U[j][2].z)*0.5);
      vertex((this.pole_D[j][0].x+this.pole_D[j][2].x)*0.5, this.pole_D[j][0].y, (this.pole_D[j][0].z+this.pole_D[j][2].z)*0.5);
      endShape();
    }
  };









  this.displayInfo = function() {
    if (!open_open) {
      noFill();
      stroke(160);
      strokeWeight(real(6));
      beginShape(POINTS);
      for (let i=0; i<this.node.length; i++) {
        vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      }
      vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
      endShape();

      strokeWeight(real(2));
      beginShape(LINES);
      for (let i=1; i<this.node.length; i++) {
        vertex(this.node[i].x, this.node[i].y, this.node[i].z);
        vertex(this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
      }
      vertex(this.node_roof.x, this.node_roof.y, this.node_roof.z);
      vertex(this.node[this.node.length-1].x, this.node[this.node.length-1].y, this.node[this.node.length-1].z);
      endShape();


      for (let i=0; i<this.node_FM.length; i++) {
        if (open_info_wichFloor[i]) {
          strokeWeight(real(6));
        } else {
          strokeWeight(real(3.5));
        }
        stroke(c_info2);
        point(this.node_FM[i].x, this.node_FM[i].y, this.node_FM[i].z);
        stroke(c_info);
        point(this.node_RM[i].x, this.node_RM[i].y, this.node_RM[i].z);
        stroke(200);
        beginShape(POINTS);
        vertex(this.node_BM[i].x, this.node_BM[i].y, this.node_BM[i].z);
        vertex(this.node_LM[i].x, this.node_LM[i].y, this.node_LM[i].z);
        endShape();

        if (open_info_wichFloor[i]) {
          strokeWeight(real(2));
        } else {
          strokeWeight(real(1));
        }
        stroke(c_info2);
        line(this.node_FM[i].x, this.node_FM[i].y, this.node_FM[i].z, this.node[i].x, this.node[i].y, this.node[i].z);
        stroke(c_info);
        line(this.node_RM[i].x, this.node_RM[i].y, this.node_RM[i].z, this.node[i].x, this.node[i].y, this.node[i].z);
        stroke(200);
        beginShape(LINES);
        vertex(this.node_BM[i].x, this.node_BM[i].y, this.node_BM[i].z);
        vertex(this.node[i].x, this.node[i].y, this.node[i].z);
        vertex(this.node_LM[i].x, this.node_LM[i].y, this.node_LM[i].z);
        vertex(this.node[i].x, this.node[i].y, this.node[i].z);
        endShape();


        if (open_info_wichFloor[i]) {
          strokeWeight(real(6));
        } else {
          strokeWeight(real(3.5));
        }
        stroke(200);
        beginShape(POINTS);
        vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z);
        vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z);
        vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z);
        vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z);
        endShape();
      }

      strokeWeight(real(3.5));
      stroke(c_info2);
      point(this.node_roofF.x, this.node_roofF.y, this.node_roofF.z);
      stroke(200);
      point(this.node_roofB.x, this.node_roofB.y, this.node_roofB.z);




      for (let i=1; i<this.node.length; i++) {
        if (open_info_wichFloor[i-1]) {
          stroke(128, 30, 30);
          strokeWeight(real(0.5));
          beginShape(LINES);
          vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z);
          vertex(this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z);
          vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z);
          vertex(this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z);
          vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z);
          vertex(this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z);
          vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z);
          vertex(this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z);
          endShape();
          strokeWeight(real(1.5));
        } else {
          noFill();
          stroke(200);
          strokeWeight(real(1.5));
        }
        beginShape();
        vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z);
        vertex(this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z);
        vertex(this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z);
        vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z);
        if (i==this.node.length-1) {
          endShape(CLOSE);
        } else {
          endShape();
        }

        beginShape();
        vertex(this.node_FR[i].x, this.node_FR[i].y, this.node_FR[i].z);
        vertex(this.node_FR[i-1].x, this.node_FR[i-1].y, this.node_FR[i-1].z);
        vertex(this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z);
        vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z);
        if (i==this.node.length-1) {
          endShape(CLOSE);
        } else {
          endShape();
        }
        beginShape();
        vertex(this.node_BR[i].x, this.node_BR[i].y, this.node_BR[i].z);
        vertex(this.node_BR[i-1].x, this.node_BR[i-1].y, this.node_BR[i-1].z);
        vertex(this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z);
        vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z);
        if (i==this.node.length-1) {
          endShape(CLOSE);
        } else {
          endShape();
        }
        beginShape();
        vertex(this.node_BL[i].x, this.node_BL[i].y, this.node_BL[i].z);
        vertex(this.node_BL[i-1].x, this.node_BL[i-1].y, this.node_BL[i-1].z);
        vertex(this.node_FL[i-1].x, this.node_FL[i-1].y, this.node_FL[i-1].z);
        vertex(this.node_FL[i].x, this.node_FL[i].y, this.node_FL[i].z);
        if (i==this.node.length-1) {
          endShape(CLOSE);
        } else {
          endShape();
        }
      }



      if (open_info_wichFloor[open_info_wichFloor.length-1]) {
        stroke(128, 30, 30);
      } else {
        stroke(200);
      }
      strokeWeight(real(1.5));
      beginShape();
      vertex(this.eaves_FU.x, this.eaves_FU.y, this.eaves_FU.z);
      vertex(this.eaves_BU.x, this.eaves_BU.y, this.eaves_BU.z);
      vertex(this.eaves_BL.x, this.eaves_BL.y, this.eaves_BL.z);
      vertex(this.eaves_FL.x, this.eaves_FL.y, this.eaves_FL.z);
      endShape(CLOSE);
      beginShape();
      vertex(this.eaves_FU.x, this.eaves_FU.y, this.eaves_FU.z);
      vertex(this.eaves_BU.x, this.eaves_BU.y, this.eaves_BU.z);
      vertex(this.eaves_BR.x, this.eaves_BR.y, this.eaves_BR.z);
      vertex(this.eaves_FR.x, this.eaves_FR.y, this.eaves_FR.z);   
      endShape(CLOSE);



      strokeWeight(real(3));
      beginShape(POINTS);
      vertex(this.eaves_FU.x, this.eaves_FU.y, this.eaves_FU.z);
      vertex(this.eaves_FL.x, this.eaves_FL.y, this.eaves_FL.z);
      vertex(this.eaves_FR.x, this.eaves_FR.y, this.eaves_FR.z);
      vertex(this.eaves_BU.x, this.eaves_BU.y, this.eaves_BU.z);
      vertex(this.eaves_BL.x, this.eaves_BL.y, this.eaves_BL.z);
      vertex(this.eaves_BR.x, this.eaves_BR.y, this.eaves_BR.z);
      endShape();
    } else {
      noFill();
      stroke(200);
      strokeWeight(real(1));
      for (let i=1; i<this.node.length; i++) {
        beginShape();
        vertex(this.wall_F[0][i].x, this.wall_F[0][i].y, this.wall_F[0][i].z);
        vertex(this.wall_F[1][i].x, this.wall_F[1][i].y, this.wall_F[1][i].z);
        vertex(this.wall_F[1][i-1].x, this.wall_F[1][i-1].y, this.wall_F[1][i-1].z);
        vertex(this.wall_F[0][i-1].x, this.wall_F[0][i-1].y, this.wall_F[0][i-1].z);
        endShape(CLOSE);
        beginShape();
        vertex(this.wall_R[0][i].x, this.wall_R[0][i].y, this.wall_R[0][i].z);
        vertex(this.wall_R[1][i].x, this.wall_R[1][i].y, this.wall_R[1][i].z);
        vertex(this.wall_R[1][i-1].x, this.wall_R[1][i-1].y, this.wall_R[1][i-1].z);
        vertex(this.wall_R[0][i-1].x, this.wall_R[0][i-1].y, this.wall_R[0][i-1].z);
        endShape(CLOSE);
        beginShape();
        vertex(this.wall_L[0][i].x, this.wall_L[0][i].y, this.wall_L[0][i].z);
        vertex(this.wall_L[1][i].x, this.wall_L[1][i].y, this.wall_L[1][i].z);
        vertex(this.wall_L[1][i-1].x, this.wall_L[1][i-1].y, this.wall_L[1][i-1].z);
        vertex(this.wall_L[0][i-1].x, this.wall_L[0][i-1].y, this.wall_L[0][i-1].z);
        endShape(CLOSE);
        beginShape();
        vertex(this.wall_B[0][i].x, this.wall_B[0][i].y, this.wall_B[0][i].z);
        vertex(this.wall_B[1][i].x, this.wall_B[1][i].y, this.wall_B[1][i].z);
        vertex(this.wall_B[1][i-1].x, this.wall_B[1][i-1].y, this.wall_B[1][i-1].z);
        vertex(this.wall_B[0][i-1].x, this.wall_B[0][i-1].y, this.wall_B[0][i-1].z);
        endShape(CLOSE);
      }
      beginShape();
      vertex(this.wall_F[0][this.wall_F[0].length-1].x, this.wall_F[0][this.wall_F[0].length-1].y, this.wall_F[0][this.wall_F[0].length-1].z);
      vertex(this.wall_roof_F.x, this.wall_roof_F.y, this.wall_roof_F.z);
      vertex(this.wall_F[1][this.wall_F[1].length-1].x, this.wall_F[1][this.wall_F[1].length-1].y, this.wall_F[1][this.wall_F[1].length-1].z);
      endShape(CLOSE);

      beginShape();
      vertex(this.wall_B[0][this.wall_B[0].length-1].x, this.wall_B[0][this.wall_B[0].length-1].y, this.wall_B[0][this.wall_B[0].length-1].z);
      vertex(this.wall_roof_B.x, this.wall_roof_B.y, this.wall_roof_B.z);
      vertex(this.wall_B[1][this.wall_B[1].length-1].x, this.wall_B[1][this.wall_B[1].length-1].y, this.wall_B[1][this.wall_B[1].length-1].z);
      endShape(CLOSE);
    }




    stroke(200);
    strokeWeight(real(2));
    for (let i=0; i<this.road.length; i++) {
      point(this.road[i][0].x, this.road[i][0].y, this.road[i][0].z);
      point(this.road[i][1].x, this.road[i][1].y, this.road[i][1].z);
    }
    strokeWeight(real(0.5));
    for (let i=1; i<this.road.length; i++) {
      line(this.road[i][0].x, this.road[i][0].y, this.road[i][0].z, this.road[i][1].x, this.road[i][1].y, this.road[i][1].z);
    }





    noFill();
    if (open_info_wichFloor[0] && !open_open) {
      stroke(128, 30, 30);
    } else {
      stroke(200);
    }
    for (let j=0; j<this.pole_num; j++) {
      strokeWeight(real(0.75));
      beginShape();
      for (let i=0; i<4; i++) {
        vertex(this.pole_D[j][i].x, this.pole_D[j][i].y, this.pole_D[j][i].z);
      }
      endShape(CLOSE);
      beginShape();
      for (let i=0; i<4; i++) {
        vertex(this.pole_U[j][i].x, this.pole_U[j][i].y, this.pole_U[j][i].z);
      }
      endShape(CLOSE);
      beginShape(LINES);
      for (let i=0; i<4; i++) {
        vertex(this.pole_D[j][i].x, this.pole_D[j][i].y, this.pole_D[j][i].z);
        vertex(this.pole_U[j][i].x, this.pole_U[j][i].y, this.pole_U[j][i].z);
      }
      endShape();

      strokeWeight(real(4));
      beginShape(POINTS);
      vertex((this.pole_U[j][0].x+this.pole_U[j][2].x)*0.5, this.pole_U[j][0].y, (this.pole_U[j][0].z+this.pole_U[j][2].z)*0.5);
      vertex((this.pole_D[j][0].x+this.pole_D[j][2].x)*0.5, this.pole_D[j][0].y, (this.pole_D[j][0].z+this.pole_D[j][2].z)*0.5);
      endShape();
    }
  };
}






function PRotateX(p, angle) {
  let p_new = createVector(p.z, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p.x, p_new.y, p_new.x);
  return p_final;
}
function PRotateY(p, angle) {
  let p_new = createVector(p.x, p.z);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p.y, p_new.y);
  return p_final;
}
function PRotateZ(p, angle) {
  let p_new = createVector(p.x, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p_new.y, p.z);
  return p_final;
}
//@funnysandwich
