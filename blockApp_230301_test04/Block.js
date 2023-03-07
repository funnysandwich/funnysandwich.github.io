function Block(center_d, W, D, is_closeUp) {

  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();
  this.W_frame = W;
  this.D_frame = D;
  this.H_frame = this.W_frame;
  this.H_base = this.H_frame * 0.085;

  this.W_room = this.W_frame - real(5);
  this.D_room = this.D_frame - real(5);
  this.H_room = this.H_frame-this.H_base*2;
  this.R_fillet_cover = this.W_room * 0.25;
  this.num_fillet_cover = 7;

  this.have_baseTower = false;


  this.num_floor = 1;//countProb([0, 1, 0.125, 0.05]);
  if (state_arrange == 0) {
    this.num_floor = countProb([0, 1, 1, 1]);
  } else if (state_arrange == 2) {
    if (is_closeUp) {
      this.num_floor = 5;//
    }
  } else if (state_arrange == 3) {
    this.num_floor = 5;//countProb([0, 1, 1, 1]);

    this.have_baseTower = true;
  }

  this.H_frame = this.H_frame*this.num_floor - this.H_base*(this.num_floor-1);
  //if (state_arrange != 3) {
  if (this.num_floor > 1) {
    this.center_d.y += (this.H_room + this.H_base)  *  (this.num_floor-1);
  }
  //}

  this.show_floor = new Array(this.num_floor);
  for (let i=0; i<this.show_floor.length; i++) {
    this.show_floor[i] = true;
  }


  this.R_sign = real(15);
  this.num_num_sign = countProb([0, 2, 1.5, 0.3, 0.15, 0.075]);//floor(FS_rand(1, 9));
  this.W_sign = this.R_sign*2 + this.R_sign*0.85 * (this.num_num_sign-1);
  this.H_sign_pillar = this.H_frame + real(18);
  this.W_sign_pillar = this.W_frame * 0.01;







  this.node_frame = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_frame.length; i++) {
    for (let j=0; j<this.node_frame[i].length; j++) {
      this.node_frame[i][j] = this.center_d.copy();
    }
  }

  this.node_base = new Array(this.num_floor);
  this.node_room = new Array(this.num_floor);
  this.node_cover = new Array(this.num_floor);
  for (let ii=0; ii<this.num_floor; ii++) {
    this.node_base[ii] = Array.from(Array(2), () => new Array(this.num_fillet_cover * 4));
    for (let i=0; i<this.node_base[ii].length; i++) {
      for (let j=0; j<this.node_base[ii][i].length; j++) {
        this.node_base[ii][i][j] = this.center_d.copy();
      }
    }
    this.node_room[ii] = Array.from(Array(2), () => new Array(4));
    for (let i=0; i<this.node_room[ii].length; i++) {
      for (let j=0; j<this.node_room[ii][i].length; j++) {
        this.node_room[ii][i][j] = this.center_d.copy();
      }
    }
    this.node_cover[ii] = Array.from(Array(2), () => new Array(this.num_fillet_cover * 4));
    for (let i=0; i<this.node_cover[ii].length; i++) {
      for (let j=0; j<this.node_cover[ii][i].length; j++) {
        this.node_cover[ii][i][j] = this.center_d.copy();
      }
    }
  }


  this.node_cover_u = Array.from(Array(2), () => new Array(this.num_fillet_cover * 4));
  for (let i=0; i<this.node_cover_u.length; i++) {
    for (let j=0; j<this.node_cover_u[i].length; j++) {
      this.node_cover_u[i][j] = this.center_d.copy();
    }
  }


  this.node_sign_pillar = new Array(this.num_floor + 1);
  for (let i=0; i<this.node_sign_pillar.length; i++) {
    if (i < this.node_sign_pillar.length-1) {
      this.node_sign_pillar[i] = Array.from(Array(10), () => new Array(8));
    } else {
      this.node_sign_pillar[i] = Array.from(Array(2), () => new Array(8));
    }
    for (let j=0; j<this.node_sign_pillar[i].length; j++) {
      for (let k=0; k<this.node_sign_pillar[i][j].length; k++) {
        this.node_sign_pillar[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_sign = new Array(1);
  for (let i=0; i<this.node_sign.length; i++) {
    this.node_sign[i] = new Array(24);
    for (let j=0; j<this.node_sign[i].length; j++) {
      this.node_sign[i][j] = this.center_d.copy();
    }
  }
  this.node_sign_hole = Array.from(Array(this.num_floor+1), () => new Array(8));
  for (let i=0; i<this.node_sign_hole.length; i++) {
    for (let j=0; j<this.node_sign_hole[i].length; j++) {
      this.node_sign_hole[i][j] = this.center_d.copy();
    }
  }

  this.SIGN = new Array(this.node_sign.length);
  for (let i=0; i<this.SIGN.length; i++) {
    this.SIGN[i] = createGraphics(this.W_sign/(this.R_sign*2) * 100, 100);
    this.SIGN[i].pixelDensity(px);
  }












  this.state_object = new Array(this.num_floor);
  for (let i=0; i<this.num_floor; i++) {
    //0：无  1：人  2：分层地面  3：书柜  4：森林  5：旋转楼梯  6：电话  7：电影院  8：红绿灯  9：上下铺  10：表情  11：怪物眼
    this.state_object[i] = countProb([0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0.25]);
  }






  this.object = new Array(this.num_floor);

  for (let ii=0; ii<this.num_floor; ii++) {
    this.object[ii] = [];
    let y = -this.H_base-real(0.5)  - (this.H_room+this.H_base)*ii;


    if (this.state_object[ii] == 1) {
      let w_room = this.W_frame - real(5);
      let d_room = this.D_frame - real(5);
      let w_room_object = real(20);
      let d_room_object = real(15);
      let num_hor = 0;
      let num_ver = 0;
      for (let i=0; i<w_room; i+=w_room_object) {
        num_hor ++;
      }
      for (let i=0; i<d_room; i+=d_room_object) {
        num_ver ++;
      }
      for (let i=0; i<num_hor; i++) {
        for (let j=0; j<num_ver; j++) {
          if ((i!=0 || j!=0)  &&  (i!=0 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=0)) {
            this.object[ii].push(new Person(this.center_d.copy().add(map(i, 0, num_hor-1, -w_room/2+w_room_object/2, w_room/2-w_room_object/2), y, map(j, 0, num_ver-1, -d_room/2+d_room_object/2, d_room/2-d_room_object/2)), w_room_object, d_room_object, real(10)));
          }
        }
      }
      //for (let i=0; i<50; i++) {
      //  this.object.push(new Person(this.center_d.copy().add(FS_rand(-w_room/2+w_room_object/2, w_room/2-w_room_object/2), y, FS_rand(-d_room/2+d_room_object/2, d_room/2-d_room_object/2)), w_room_object, d_room_object, real(FS_rand(10,15))));
      //}
    } else if (this.state_object[ii] == 2) {
      this.object[ii].push(new Ground(this.center_d.copy().add(0, y, 0), this.W_room*0.925, this.D_room*0.925, this.H_room, this.R_fillet_cover/this.W_room));
    } else if (this.state_object[ii] == 3) {
      for (let i=0; i<3; i++) {
        let d = real(13);
        let z = map(i, 0, 3-1, -1, 1) * ((this.D_room-this.R_fillet_cover*0.65-d)/2);
        this.object[ii].push(new Bookcase(this.center_d.copy().add(0, y, z), this.W_room-this.R_fillet_cover, d, this.H_room*0.825));
      }
    } else if (this.state_object[ii] == 4) {
      let w = real(10);
      let num_hor = 3;
      let num_ver = 3;
      for (let i=0; i<num_hor; i++) {
        for (let j=0; j<num_ver; j++) {
          let x = map(i, 0, num_hor-1, -1, 1) * (this.W_room-this.R_fillet_cover*1.5)/2;
          let z = map(j, 0, num_ver-1, -1, 1) * (this.D_room-this.R_fillet_cover*1.5)/2;
          this.object[ii].push(new Tree(this.center_d.copy().add(x, y, z), w, w, this.H_room*0.825));
        }
      }
    } else if (this.state_object[ii] == 5) {
      this.object[ii].push(new Stairs(this.center_d.copy().add(0, y, 0), this.W_room, this.D_room, this.H_room));
    } else if (this.state_object[ii] == 6) {
      let num_hor = 3;
      let num_ver = 3;
      for (let i=0; i<num_hor; i++) {
        for (let j=0; j<num_ver; j++) {
          let x = map(i, 0, num_hor-1, -1, 1) * (this.W_room-this.R_fillet_cover*1.5)/2 + real(FS_rand(-5*floor(i!=0), 5*floor(i!=num_hor-1)));
          let z = map(j, 0, num_ver-1, -1, 1) * (this.D_room-this.R_fillet_cover*1.5)/2 + real(FS_rand(-5*floor(j!=0), 5*floor(j!=num_ver-1)));
          this.object[ii].push(new Phone(this.center_d.copy().add(x, y, z), this.W_room, this.D_room, this.H_room));
        }
      }
    } else if (this.state_object[ii] == 7) {
      this.object[ii].push(new Cinema(this.center_d.copy().add(0, y, 0), this.W_room-this.R_fillet_cover*1.15, this.D_room, this.H_room));
    } else if (this.state_object[ii] == 8) {
      let num_hor = 4;
      let num_ver = 4;
      for (let i=0; i<num_hor; i++) {
        for (let j=0; j<num_ver; j++) {
          if ((i!=0 || j!=0)  &&  (i!=0 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=0)) {
            let x = map(i, 0, num_hor-1, -1, 1) * (this.W_room/2-(this.W_room/num_hor)/2)  + real(FS_rand(-5*floor(i!=0), 5*floor(i!=num_hor-1)));
            let z = map(j, 0, num_ver-1, -1, 1) * (this.D_room/2-(this.D_room/num_ver)/2)  + real(FS_rand(-5*floor(j!=0), 5*floor(j!=num_ver-1)));
            this.object[ii].push(new TrafficLight(this.center_d.copy().add(x, y, z), this.W_room/num_hor, this.D_room/num_ver, this.H_room));
          }
        }
      }
    } else if (this.state_object[ii] == 9) {
      this.object[ii].push(new Bed(this.center_d.copy().add(0, y, this.D_room*0.25), this.W_room-this.R_fillet_cover*1.7, (this.D_room-this.R_fillet_cover*2)*0.6, this.H_room, false));
      this.object[ii].push(new Bed(this.center_d.copy().add(0, y, -this.D_room*0.25), this.W_room-this.R_fillet_cover*1.7, (this.D_room-this.R_fillet_cover*2)*0.6, this.H_room, true));
    } else if (this.state_object[ii] == 10) {
      let num_hor = 5;
      let num_ver = 5;
      let num_floor_object = 5;
      let w = (this.W_room*0.865) / num_hor;
      for (let i=0; i<num_hor; i++) {
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_floor_object; k++) {
            if ((i!=0 || j!=0)  &&  (i!=0 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=num_ver-1)  &&  (i!=num_hor-1 || j!=0)) {
              let x = map(i, 0, num_hor-1, -1, 1) * (this.W_room*0.9/2 - w/2);
              let z = map(j, 0, num_ver-1, -1, 1) * (this.D_room*0.9/2 - w/2);
              let _y = y - k*w;
              this.object[ii].push(new FaceBall(this.center_d.copy().add(x, _y, z), this.W_room*0.9, this.D_room*0.9, this.H_room, w));
            }
          }
        }
      }
    } else if (this.state_object[ii] == 11) {
      this.object[ii].push(new Monster(this.center_d.copy().add(0, y, 0), this.W_room*1, this.D_room*1, this.H_room*1, this.R_fillet_cover/this.W_room));
    }
  }









  this.state_ground = state_ground;//countProb([0, 1, 1]);


  if (this.state_ground == 1) {
    this.node_grass = new Array(floor(FS_rand(25, 50)*4));
    for (let i=0; i<this.node_grass.length; i++) {
      this.node_grass[i] = new Array(countProb([0, 1, 1, 0.25, 0.2]));
      for (let j=0; j<this.node_grass[i].length; j++) {
        this.node_grass[i][j] = new Array(floor(FS_rand(3, 6)));
        for (let k=0; k<this.node_grass[i][j].length; k++) {
          this.node_grass[i][j][k] = this.center_d.copy();
        }
      }
    }
  } else if (this.state_ground == 2) {
    let num_ver = 15;
    let num_hor = 15;
    this.node_web = Array.from(Array(num_ver), () => new Array(num_hor));
    for (let i=0; i<this.node_web.length; i++) {
      for (let j=0; j<this.node_web[i].length; j++) {
        this.node_web[i][j] = this.center_d.copy();
      }
    }
  }












  if (this.have_baseTower) {
    this.num_floor_tower = floor(map(sin(FS_rand(0, HALF_PI)), 0, 1, 1, this.num_floor));
    for (let i=0; i<this.num_floor_tower; i++) {
      this.show_floor[i] = false;
    }


    if (state_baseTower == 1) {
      this.node_baseTower_pillar = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_pillar.length; i++) {
        this.node_baseTower_pillar[i] = new Array(4);
        for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
          this.node_baseTower_pillar[i][j] = Array.from(Array(2), () => new Array(8));
          for (let k=0; k<this.node_baseTower_pillar[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_pillar[i][j][k].length; l++) {
              this.node_baseTower_pillar[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }

      this.node_baseTower_pillar_hor = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_pillar_hor.length; i++) {
        this.node_baseTower_pillar_hor[i] = new Array(4);      
        for (let j=0; j<this.node_baseTower_pillar_hor[i].length; j++) {
          this.node_baseTower_pillar_hor[i][j] = Array.from(Array(2), () => new Array(4));
          for (let k=0; k<this.node_baseTower_pillar_hor[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_pillar_hor[i][j][k].length; l++) {
              this.node_baseTower_pillar_hor[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }

      this.node_baseTower_pillar_slash = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_pillar_slash.length; i++) {
        this.node_baseTower_pillar_slash[i] = new Array(4);      
        for (let j=0; j<this.node_baseTower_pillar_slash[i].length; j++) {
          this.node_baseTower_pillar_slash[i][j] = Array.from(Array(2), () => new Array(4*2));
          for (let k=0; k<this.node_baseTower_pillar_slash[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_pillar_slash[i][j][k].length; l++) {
              this.node_baseTower_pillar_slash[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }

      this.node_baseTower_base = Array.from(Array(4), () => new Array(12));
      for (let i=0; i<this.node_baseTower_base.length; i++) {
        for (let j=0; j<this.node_baseTower_base[i].length; j++) {
          this.node_baseTower_base[i][j] = this.center_d.copy();
        }
      }
    } else if (state_baseTower == 2) {
      this.W_baseTower_leg = this.W_frame * 0.1;
      this.detail_baseTower_leg = 10;
      this.W_baseTower_shoes = this.W_frame * 0.2;
      this.center_baseTower_leg = Array.from(Array(2), () => new Array(this.num_floor_tower*this.detail_baseTower_leg+1));
      for (let i=0; i<this.center_baseTower_leg.length; i++) {
        for (let j=0; j<this.center_baseTower_leg[i].length; j++) {
          this.center_baseTower_leg[i][j] = this.center_d.copy();
        }
      }
      this.node_baseTower_leg = Array.from(Array(2), () => new Array(this.center_baseTower_leg[0].length));
      for (let i=0; i<this.node_baseTower_leg.length; i++) {
        for (let j=0; j<this.node_baseTower_leg[i].length; j++) {
          this.node_baseTower_leg[i][j] = new Array(8);
          for (let k=0; k<this.node_baseTower_leg[i][j].length; k++) {
            this.node_baseTower_leg[i][j][k] = this.center_d.copy();
          }
        }
      }
      this.node_baseTower_pants = new Array(2);
      for (let i=0; i<this.node_baseTower_pants.length; i++) {
        this.node_baseTower_pants[i] = Array.from(Array(6), () => new Array(24));
        for (let j=0; j<this.node_baseTower_pants[i].length; j++) {
          for (let k=0; k<this.node_baseTower_pants[i][j].length; k++) {
            this.node_baseTower_pants[i][j][k] = this.center_d.copy();
          }
        }
      }
      this.node_baseTower_shoes = new Array(2);
      for (let i=0; i<this.node_baseTower_shoes.length; i++) {
        this.node_baseTower_shoes[i] = Array.from(Array(6), () => new Array(7*2));
        for (let j=0; j<this.node_baseTower_shoes[i].length; j++) {
          for (let k=0; k<this.node_baseTower_shoes[i][j].length; k++) {
            this.node_baseTower_shoes[i][j][k] = this.center_d.copy();
          }
        }
      }
    } else if (state_baseTower == 3) {
      this.W_baseTower = this.W_frame;
      this.center_baseTower = new Array(this.num_floor_tower + 1);
      for (let i=0; i<this.center_baseTower.length; i++) {
        this.center_baseTower[i] = this.center_d;
      }
      this.node_baseTower = Array.from(Array(this.center_baseTower.length), () => new Array(24));
      for (let i=0; i<this.node_baseTower.length; i++) {
        for (let j=0; j<this.node_baseTower[i].length; j++) {
          this.node_baseTower[i][j] = this.center_d.copy();
        }
      }
      this.TOWER = createGraphics(round(200 * (this.W_baseTower/this.W_frame)*PI), round(200 * ((this.H_room+this.H_base)*this.num_floor)/this.W_frame));
      this.TOWER.pixelDensity(px);
      this.TOWER.background(c_bkg);
      let _n = Array.from(Array(200), () => new Array(100));
      for (let i=0; i<_n.length; i++) {
        for (let j=0; j<_n[i].length; j++) {
          _n[i][j] = createVector(map(j, 0, _n[i].length-1, 0, this.TOWER.width), map(i, 0, _n.length-1, 0, this.TOWER.height));
        }
      }
      this.TOWER.noFill();
      this.TOWER.stroke(c_dark);
      this.TOWER.strokeWeight(1);
      this.TOWER.beginShape(LINES);
      for (let i=0; i<_n.length; i++) {
        for (let j=0; j<_n[i].length-1; j++) {
          this.TOWER.vertex(_n[i][j].x, _n[i][j].y);
          this.TOWER.vertex(_n[i][j+1].x, _n[i][j+1].y);
        }
      }
      for (let i=0; i<_n.length-1; i++) {
        for (let j=0; j<_n[i].length; j++) {
          if ((i%2 == 0 && j%2 == 0)  ||  (i%2 != 0 && j%2 != 0)) {
            this.TOWER.vertex(_n[i][j].x, _n[i][j].y);
            this.TOWER.vertex(_n[i+1][j].x, _n[i+1][j].y);
          }
        }
      }
      this.TOWER.endShape();
    } else if (state_baseTower == 4) {
      this.W_baseTower = this.W_frame * 0.5;
      this.center_baseTower = new Array(this.num_floor_tower + 1);
      for (let i=0; i<this.center_baseTower.length; i++) {
        this.center_baseTower[i] = this.center_d;
      }

      this.node_baseTower = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower.length; i++) {
        this.node_baseTower[i] = Array.from(Array(2), () => new Array(4));
        for (let j=0; j<this.node_baseTower[i].length; j++) {
          for (let k=0; k<this.node_baseTower[i][j].length; k++) {
            this.node_baseTower[i][j][k] = this.center_d.copy();
          }
        }
      }

      this.node_baseTower_floor = new Array(this.center_baseTower.length-2);
      for (let i=0; i<this.node_baseTower_floor.length; i++) {
        this.node_baseTower_floor[i] = new Array(4);
        for (let j=0; j<this.node_baseTower_floor[i].length; j++) {
          this.node_baseTower_floor[i][j] = Array.from(Array(2), () => new Array(4));
          for (let k=0; k<this.node_baseTower_floor[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_floor[i][j][k].length; l++) {
              this.node_baseTower_floor[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }

      this.node_baseTower_wall = new Array(this.node_baseTower_floor.length);
      for (let i=0; i<this.node_baseTower_wall.length; i++) {
        this.node_baseTower_wall[i] = new Array(4);
        for (let j=0; j<this.node_baseTower_wall[i].length; j++) {
          this.node_baseTower_wall[i][j] = Array.from(Array(2), () => new Array(4));
          for (let k=0; k<this.node_baseTower_wall[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_wall[i][j][k].length; l++) {
              this.node_baseTower_wall[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }
      this.node_baseTower_tooth = new Array(this.node_baseTower_floor.length);
      for (let i=0; i<this.node_baseTower_tooth.length; i++) {
        this.node_baseTower_tooth[i] = new Array(4);
        for (let j=0; j<this.node_baseTower_tooth[i].length; j++) {
          this.node_baseTower_tooth[i][j] = new Array(6);
          for (let k=0; k<this.node_baseTower_tooth[i][j].length; k++) {
            this.node_baseTower_tooth[i][j][k] = Array.from(Array(2), () => new Array(4));
            for (let l=0; l<this.node_baseTower_tooth[i][j][k].length; l++) {
              for (let n=0; n<this.node_baseTower_tooth[i][j][k][l].length; n++) {
                this.node_baseTower_tooth[i][j][k][l][n] = this.center_d.copy();
              }
            }
          }
        }
      }
      this.angle_begin_baseTower_stairs = floor(FS_rand(0, 4)) * HALF_PI;
      this.node_baseTower_stairs = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_stairs.length; i++) {
        this.node_baseTower_stairs[i] = new Array(2);
        for (let j=0; j<this.node_baseTower_stairs[i].length; j++) {
          this.node_baseTower_stairs[i][j] = new Array(20);
          for (let k=0; k<this.node_baseTower_stairs[i][j].length; k++) {
            this.node_baseTower_stairs[i][j][k] = new Array(4);
            for (let l=0; l<this.node_baseTower_stairs[i][j][k].length; l++) {
              this.node_baseTower_stairs[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }
      this.node_baseTower_stairs_d = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_stairs_d.length; i++) {
        this.node_baseTower_stairs_d[i] = new Array(2);
        for (let j=0; j<this.node_baseTower_stairs_d[i].length; j++) {
          this.node_baseTower_stairs_d[i][j] = Array.from(Array(this.node_baseTower_stairs[0][0].length), () => new Array(2));
          for (let k=0; k<this.node_baseTower_stairs_d[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_stairs_d[i][j][k].length; l++) {
              this.node_baseTower_stairs_d[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }
    } else if (state_baseTower == 5) {
      this.W_baseTower = this.W_frame * 0.8;
      this.num_face_baseTower = 6;
      this.center_baseTower = new Array(this.num_floor_tower + 1);
      for (let i=0; i<this.center_baseTower.length; i++) {
        this.center_baseTower[i] = this.center_d;
      }

      this.node_baseTower = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower.length; i++) {
        this.node_baseTower[i] = Array.from(Array(2), () => new Array(this.num_face_baseTower));
        for (let j=0; j<this.node_baseTower[i].length; j++) {
          for (let k=0; k<this.node_baseTower[i][j].length; k++) {
            this.node_baseTower[i][j][k] = this.center_d.copy();
          }
        }
      }

      this.node_baseTower_eaves = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_eaves.length; i++) {
        this.node_baseTower_eaves[i] = Array.from(Array(6), () => new Array(this.num_face_baseTower));
        for (let j=0; j<this.node_baseTower_eaves[i].length; j++) {
          for (let k=0; k<this.node_baseTower_eaves[i][j].length; k++) {
            this.node_baseTower_eaves[i][j][k] = this.center_d.copy();
          }
        }
      }

      this.node_baseTower_pillar = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_pillar.length; i++) {
        this.node_baseTower_pillar[i] = new Array(this.num_face_baseTower);
        for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
          this.node_baseTower_pillar[i][j] = Array.from(Array(2), () => new Array(8));
          for (let k=0; k<this.node_baseTower_pillar[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_pillar[i][j][k].length; l++) {
              this.node_baseTower_pillar[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }

      this.node_baseTower_fence_pillar = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_fence_pillar.length; i++) {
        this.node_baseTower_fence_pillar[i] = new Array(this.num_face_baseTower);
        for (let j=0; j<this.node_baseTower_fence_pillar[i].length; j++) {
          this.node_baseTower_fence_pillar[i][j] = Array.from(Array(2), () => new Array(6));
          for (let k=0; k<this.node_baseTower_fence_pillar[i][j].length; k++) {
            for (let l=0; l<this.node_baseTower_fence_pillar[i][j][k].length; l++) {
              this.node_baseTower_fence_pillar[i][j][k][l] = this.center_d.copy();
            }
          }
        }
      }
      this.node_baseTower_fence = new Array(this.num_floor_tower);
      for (let i=0; i<this.node_baseTower_fence.length; i++) {
        this.node_baseTower_fence[i] = new Array(this.num_face_baseTower);
        for (let j=0; j<this.node_baseTower_fence[i].length; j++) {
          this.node_baseTower_fence[i][j] = new Array(2);
          for (let k=0; k<this.node_baseTower_fence[i][j].length; k++) {
            this.node_baseTower_fence[i][j][k] = Array.from(Array(2), () => new Array(4*2));
            for (let l=0; l<this.node_baseTower_fence[i][j][k].length; l++) {
              for (let n=0; n<this.node_baseTower_fence[i][j][k][l].length; n++) {
                this.node_baseTower_fence[i][j][k][l][n] = this.center_d.copy();
              }
            }
          }
        }
      }
      this.EAVES = createGraphics(200, 100);
      this.EAVES.pixelDensity(px);
      //let _n = Array.from(Array(10), () => new Array(20));
      //for (let i=0; i<_n.length; i++) {
      //  for (let j=0; j<_n[i].length; j++) {
      //    let x = map(j, 0, _n[i].length-1, 0, this.EAVES.width);
      //    let y = map(i, 0, _n.length-1, 0, this.EAVES.height);
      //    _n[i][j] = createVector(x, y);
      //  }
      //}
      //this.EAVES.background(c_bkg);
      //this.EAVES.noFill();
      //this.EAVES.stroke(c_dark);
      //this.EAVES.strokeWeight(2);
      //this.EAVES.beginShape(LINES);
      //for (let i=0; i<_n.length-1; i++) {
      //  for (let j=0; j<_n[i].length; j++) {
      //    this.EAVES.vertex(_n[i][j].x, _n[i][j].y);
      //    this.EAVES.vertex(_n[i+1][j].x, _n[i+1][j].y);
      //  }
      //}
      //this.EAVES.endShape();
      let _n = Array.from(Array(30), () => new Array(20*5));
      for (let i=0; i<_n.length; i++) {
        for (let j=0; j<_n[i].length; j++) {
          let x = map(j, 0, _n[i].length-1, 0, this.EAVES.width);
          let y = map(i, 0, _n.length-1, 0, this.EAVES.height);
          y -= sin(map(j%5, 0, 5, 0, PI)) * 2;
          _n[i][j] = createVector(x, y);
        }
      }
      this.EAVES.background(c_bkg);
      this.EAVES.noFill();
      this.EAVES.stroke(c_dark);
      this.EAVES.strokeWeight(2);
      this.EAVES.beginShape(LINES);
      for (let i=0; i<_n.length-1; i++) {
        for (let j=0; j<_n[i].length; j+=5) {
          this.EAVES.vertex(_n[i][j].x, _n[i][j].y);
          this.EAVES.vertex(_n[i+1][j].x, _n[i+1][j].y);
        }
      }
      this.EAVES.endShape();

      this.EAVES.strokeWeight(0.5);
      this.EAVES.beginShape(LINES);
      for (let i=0; i<_n.length; i++) {
        for (let j=0; j<_n[i].length-1; j++) {
          if ((i%2 == 0  &&  j%10 < 5)  ||  (i%2 != 0  &&  j%10 >= 5)) {
            this.EAVES.vertex(_n[i][j].x, _n[i][j].y);
            this.EAVES.vertex(_n[i][j+1].x, _n[i][j+1].y);
          }
        }
      }
      this.EAVES.endShape();
    }
  }










































  this.update = function() {
    for (let i=0; i<this.node_frame.length; i++) {
      let y = -this.H_frame * i;
      for (let j=0; j<this.node_frame[i].length; j++) {
        this.node_frame[i][j] = createVector(this.W_frame/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D_frame/2.0 * pow(-1, floor(j/2)+1));
        this.node_frame[i][j].add(this.center_d);
      }
    }


    for (let ii=0; ii<this.num_floor; ii++) {
      for (let i=0; i<this.node_base[ii].length; i++) {
        this.node_base[ii][i] = getNode_rect_fillet(0, 0, 0, this.W_frame, this.D_frame, this.W_frame*0.25, this.num_fillet_cover);
        for (let j=0; j<this.node_base[ii][i].length; j++) {
          this.node_base[ii][i][j] = PRotateX(this.node_base[ii][i][j], -HALF_PI);
          this.node_base[ii][i][j].y = -this.H_base * i  -  (this.H_room+this.H_base)*ii;
          this.node_base[ii][i][j].add(this.center_d);
        }
      }
      for (let i=0; i<this.node_room[ii].length; i++) {
        let y = -this.H_base - this.H_room * i  -  (this.H_room+this.H_base)*ii;
        for (let j=0; j<this.node_room[ii][i].length; j++) {
          this.node_room[ii][i][j] = createVector(this.W_room/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D_room/2.0 * pow(-1, floor(j/2)+1));
          this.node_room[ii][i][j].add(this.center_d);
        }
      }

      for (let i=0; i<this.node_cover[ii].length; i++) {
        this.node_cover[ii][i] = getNode_rect_fillet(0, 0, 0, this.W_room, this.D_room, this.R_fillet_cover, this.num_fillet_cover);
        for (let j=0; j<this.node_cover[ii][i].length; j++) {
          this.node_cover[ii][i][j] = PRotateX(this.node_cover[ii][i][j], -HALF_PI);
          this.node_cover[ii][i][j].y = -this.H_base-real(0.5) - this.H_room * i  -  (this.H_room+this.H_base)*ii;
          this.node_cover[ii][i][j].add(this.center_d);
        }
      }
    }

    for (let i=0; i<this.node_cover_u.length; i++) {
      this.node_cover_u[i] = getNode_rect_fillet(0, 0, 0, this.W_frame, this.D_frame, this.W_frame*0.25, this.num_fillet_cover);
      for (let j=0; j<this.node_cover_u[i].length; j++) {
        this.node_cover_u[i][j] = PRotateX(this.node_cover_u[i][j], -HALF_PI);
        this.node_cover_u[i][j].y = -this.H_base-this.H_room - this.H_base*i  -  (this.H_room+this.H_base)*(this.num_floor-1);
        this.node_cover_u[i][j].add(this.center_d);
      }
    }






    for (let i=0; i<this.node_sign_pillar.length; i++) {
      for (let j=0; j<this.node_sign_pillar[i].length; j++) {
        let y = map(j, 0, this.node_sign_pillar[i].length-1, 0, -this.H_room);
        if (i == this.node_sign_pillar.length-1) {
          y = map(j, 0, this.node_sign_pillar[i].length-1, 0, -(this.H_sign_pillar-this.H_frame));
        }
        for (let k=0; k<this.node_sign_pillar[i][j].length; k++) {
          let x = cos(map(k, 0, this.node_sign_pillar[i][j].length, 0, TWO_PI)) * this.W_sign_pillar/2;
          let z = sin(map(k, 0, this.node_sign_pillar[i][j].length, 0, TWO_PI)) * this.W_sign_pillar/2;
          this.node_sign_pillar[i][j][k] = createVector(x+lerp(-this.W_sign_pillar*0.5, this.W_sign_pillar*0.5, noise(this.ran*34+525+i*4+j*0.5)), y, z+lerp(-this.W_sign_pillar*0.5, this.W_sign_pillar*0.5, noise(this.ran*55+62+i*4+j*0.5)));
          this.node_sign_pillar[i][j][k].add(this.W_frame*0.4, 0, -this.D_frame*0.325);
          this.node_sign_pillar[i][j][k].y += -this.H_base - (this.H_room+this.H_base)*i;
          this.node_sign_pillar[i][j][k].add(this.center_d);
        }
      }
    }

    for (let i=0; i<this.node_sign.length; i++) {
      let w = this.W_sign - this.R_sign*2;
      for (let j=0; j<this.node_sign[i].length; j++) {
        let x = cos(map(j, 0, this.node_sign[i].length, 0, TWO_PI)) * this.R_sign;
        let y = sin(map(j, 0, this.node_sign[i].length, 0, TWO_PI)) * this.R_sign;
        x += w*0.5*pow(-1, floor(j>floor(this.node_sign[i].length/4) && j<floor(this.node_sign[i].length/4)*3));
        this.node_sign[i][j] = createVector(x, y, 0);
        this.node_sign[i][j] = PRotateX(this.node_sign[i][j], -HALF_PI);
        this.node_sign[i][j].add(p5.Vector.add(this.node_sign_pillar[this.node_sign_pillar.length-1][1][0], this.node_sign_pillar[this.node_sign_pillar.length-1][1][floor(this.node_sign_pillar[0][0].length/2)]).mult(0.5));
        if (state_arrange == 2  &&  !is_closeUp) {
          this.node_sign[i][j].add(this.W_frame*0.05, -real(1), -this.D_frame*0.125);
        } else {
          this.node_sign[i][j].add(0, -real(1), this.W_sign_pillar*0.5+real(2));
        }
      }
    }
    for (let i=0; i<this.node_sign_hole.length; i++) {
      y = -real(0.5);
      for (let j=0; j<this.node_sign_hole[i].length; j++) {
        let x = cos(map(j, 0, this.node_sign_hole[i].length, 0, TWO_PI)) * this.W_sign_pillar*3/2;
        let z = sin(map(j, 0, this.node_sign_hole[i].length, 0, TWO_PI)) * this.W_sign_pillar*3/2;
        this.node_sign_hole[i][j] = createVector(x, y, z).add(p5.Vector.add(this.node_sign_pillar[i][0][0], this.node_sign_pillar[i][0][floor(this.node_sign_pillar[0][0].length/2)]).mult(0.5));
      }
    }

    for (let i=0; i<this.SIGN.length; i++) {
      //this.SIGN[i].background(lerpColor(color(220, 90, 60), c_bkg, 0.25));
      this.SIGN[i].background(230, 90, 90);
      this.SIGN[i].textAlign(CENTER, CENTER);
      this.SIGN[i].textStyle(BOLD);
      this.SIGN[i].textSize(this.SIGN[i].height*0.8);
      this.SIGN[i].fill(255, 20);
      //this.SIGN[i].blendMode(ADD);
      this.SIGN[i].noStroke();
      for (let j=0; j<this.num_num_sign; j++) {
        for (let k=0; k<15; k++) {
          this.SIGN[i].text(floor(FS_rand(0, 10)), (this.SIGN[i].width/(this.num_num_sign+1))*(j+1)  +  FS_rand(-(this.SIGN[i].width/(this.num_num_sign+1))*0.2, (this.SIGN[i].width/(this.num_num_sign+1))*0.2), this.SIGN[i].height/2);
          //
        }
      }
    }










    for (let ii=0; ii<this.object.length; ii++) {
      for (let i=0; i<this.object[ii].length; i++) {
        this.object[ii][i].update();
      }
    }











    if (this.state_ground == 1) {
      for (let i=0; i<this.node_grass.length; i++) {
        let _center = createVector(map(abs(map(noise(this.ran*53+865+i*435), 0, 1, -1, 1)), 0, 1, this.W_frame*0.5, this.W_frame*2), 0, 0);
        _center = PRotateY(_center, map(i, 0, this.node_grass.length, 0, TWO_PI) + FS_rand(0, TWO_PI/this.node_grass.length));
        _center.add(this.center_d);
        for (let j=0; j<this.node_grass[i].length; j++) {
          for (let k=0; k<this.node_grass[i][j].length; k++) {
            if (k == 0) {
              this.node_grass[i][j][k] = createVector(FS_rand(0, 1)*real(2), 0, 0);
            } else {
              this.node_grass[i][j][k] = createVector(0, -real(1) * pow(0.8, k), 0);
              this.node_grass[i][j][k] = PRotateZ(this.node_grass[i][j][k], map(k, 0, 5, HALF_PI*0.25, HALF_PI*0.75) + lerp(-HALF_PI*0.25, HALF_PI*0.25, noise(this.ran*23+345+i*23+j*453+k*0.5)));
              this.node_grass[i][j][k].add(this.node_grass[i][j][k-1]).add(0, 0, 0);
            }
          }
        }
        for (let j=0; j<this.node_grass[i].length; j++) {
          let _angleY = map(j, 0, this.node_grass[i].length, 0, TWO_PI) + FS_rand(0, TWO_PI/this.node_grass[i].length);

          for (let k=0; k<this.node_grass[i][j].length; k++) {
            this.node_grass[i][j][k] = PRotateY(this.node_grass[i][j][k], _angleY);
            this.node_grass[i][j][k].add(_center);
          }
        }
      }
    } else if (this.state_ground == 2) {
      for (let i=0; i<this.node_web.length; i++) {
        for (let j=0; j<this.node_web[i].length; j++) {
          this.node_web[i][j] = createVector(map(j, 0, this.node_web[i].length-1, -1, 1)*(this.W_frame*1+gap_block), 0, map(i, 0, this.node_web.length-1, -1, 1)*(this.D_frame*1+gap_block));
          this.node_web[i][j].add(this.center_d);
        }
      }
    }








    if (this.have_baseTower) {
      if (state_baseTower == 1) {

        for (let i=0; i<this.node_baseTower_pillar.length; i++) {
          for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
            for (let k=0; k<this.node_baseTower_pillar[i][j].length; k++) {
              let wei = real(4);
              for (let l=0; l<this.node_baseTower_pillar[i][j][k].length; l++) {
                let x = cos(map(l, 0, this.node_baseTower_pillar[i][j][k].length, 0, TWO_PI)) * wei/2;
                let z = sin(map(l, 0, this.node_baseTower_pillar[i][j][k].length, 0, TWO_PI)) * wei/2;
                let y = -(this.H_room+this.H_base) * i - (this.H_room+this.H_base)*k;
                x += this.W_frame*0.31*pow(-1, floor(j==0 || j==3));
                z += this.D_frame*0.31*pow(-1, floor(j==0 || j==1));
                this.node_baseTower_pillar[i][j][k][l] = createVector(x, y, z);
                this.node_baseTower_pillar[i][j][k][l].add(this.center_d);
              }
            }
          }
        }


        for (let i=0; i<this.node_baseTower_pillar_hor.length; i++) {
          for (let j=0; j<this.node_baseTower_pillar_hor[i].length; j++) {
            for (let k=0; k<this.node_baseTower_pillar_hor[i][j].length; k++) {
              let wei = real(3);
              let x = this.W_frame*0.31*pow(-1, k+1);
              for (let l=0; l<this.node_baseTower_pillar_hor[i][j][k].length; l++) {
                let z = cos(map(l, 0, this.node_baseTower_pillar_hor[i][j][k].length, 0, TWO_PI)) * wei/2;
                let y = sin(map(l, 0, this.node_baseTower_pillar_hor[i][j][k].length, 0, TWO_PI)) * wei/2;
                z -= this.D_frame*0.31;
                y += -(this.H_room+this.H_base) * (i+1);
                this.node_baseTower_pillar_hor[i][j][k][l] = createVector(x, y, z);
                this.node_baseTower_pillar_hor[i][j][k][l] = PRotateY(this.node_baseTower_pillar_hor[i][j][k][l], HALF_PI*j);
                this.node_baseTower_pillar_hor[i][j][k][l].add(this.center_d);
              }
            }
          }
        }


        for (let i=0; i<this.node_baseTower_pillar_slash.length; i++) {
          for (let j=0; j<this.node_baseTower_pillar_slash[i].length; j++) {
            for (let k=0; k<this.node_baseTower_pillar_slash[i][j].length; k++) {
              let wei = real(2);
              let x = this.W_frame*0.31*pow(-1, k+1);
              for (let l=0; l<this.node_baseTower_pillar_slash[i][j][k].length; l++) {
                let z = cos(map(l, 0, this.node_baseTower_pillar_slash[i][j][k].length, 0, TWO_PI)) * wei/2;
                let y = sin(map(l, 0, this.node_baseTower_pillar_slash[i][j][k].length, 0, TWO_PI)) * wei/2;

                this.node_baseTower_pillar_slash[i][j][k][l] = createVector(0, y, z);
                this.node_baseTower_pillar_slash[i][j][k][l] = PRotateZ(this.node_baseTower_pillar_slash[i][j][k][l], HALF_PI*0.5);
                this.node_baseTower_pillar_slash[i][j][k][l].x += x;
                this.node_baseTower_pillar_slash[i][j][k][l].z -= this.D_frame*0.31;
                this.node_baseTower_pillar_slash[i][j][k][l].y += -(this.H_room+this.H_base)*(i+1) + (this.H_room+this.H_base)*k;
                this.node_baseTower_pillar_slash[i][j][k][l] = PRotateY(this.node_baseTower_pillar_slash[i][j][k][l], HALF_PI*j);
                this.node_baseTower_pillar_slash[i][j][k][l].add(this.center_d);
              }
            }
          }
        }


        for (let i=0; i<this.node_baseTower_base.length; i++) {
          let wei = real(8);
          for (let j=0; j<this.node_baseTower_base[i].length; j++) {
            let x = cos(map(j, 0, this.node_baseTower_base[i].length, 0, TWO_PI)) * wei/2;
            let z = sin(map(j, 0, this.node_baseTower_base[i].length, 0, TWO_PI)) * wei/2;
            this.node_baseTower_base[i][j] = createVector(x, 0, z);
            this.node_baseTower_base[i][j].add(p5.Vector.add(this.node_baseTower_pillar[0][i][0][0], this.node_baseTower_pillar[0][i][0][floor(this.node_baseTower_pillar[0][i][0].length/2)]).mult(0.5));
          }
        }
      } else if (state_baseTower == 2) {
        let _rate_leg_w = FS_rand(0.2, 0.3);
        let _a_min = FS_rand(0.01, 0.1);
        //let _a_max = 0.5;//FS_rand(0.5, 0.7);
        for (let i=0; i<this.center_baseTower_leg.length; i++) {
          for (let j=0; j<this.center_baseTower_leg[i].length; j++) {
            let y = map(j, 0, this.center_baseTower_leg[i].length-1, -this.W_baseTower_shoes*0.5, -(this.H_base+this.H_room)*this.num_floor_tower);
            let x = (this.W_frame*_rate_leg_w) * pow(-1, i+1);
            this.center_baseTower_leg[i][j] = createVector(x, y, 0);
            this.center_baseTower_leg[i][j].x += sin(map(j, 0, this.center_baseTower_leg[i].length-1, 0, PI))  *  (this.W_frame*constrain(map(this.num_floor_tower, 1, 4, 0.2, _a_min), _a_min, 0.2))  *  pow(-1, i+1);
          }
        }
        for (let i=0; i<this.center_baseTower_leg.length; i++) {
          for (let j=0; j<this.center_baseTower_leg[i].length; j++) {
            this.center_baseTower_leg[i][j] = PRotateY(this.center_baseTower_leg[i][j], -var_view[state_view][1] * HALF_PI);
            this.center_baseTower_leg[i][j].add(this.center_d);
          }
        }


        for (let i=0; i<this.node_baseTower_leg.length; i++) {
          for (let j=0; j<this.node_baseTower_leg[i].length; j++) {
            for (let k=0; k<this.node_baseTower_leg[i][j].length; k++) {
              let x = cos(map(k, 0, this.node_baseTower_leg[i][j].length, 0, TWO_PI)) * this.W_baseTower_leg/2;
              let z = sin(map(k, 0, this.node_baseTower_leg[i][j].length, 0, TWO_PI)) * this.W_baseTower_leg/2;
              this.node_baseTower_leg[i][j][k] = createVector(x, 0, z);
              this.node_baseTower_leg[i][j][k] = PRotateZ(this.node_baseTower_leg[i][j][k], sin(map(j, 0, this.node_baseTower_leg[i].length-1, 0, TWO_PI))  *  HALF_PI*map(this.num_floor_tower, 1, 4, 0.5, 0.05)   *   pow(-1, i+1));
              this.node_baseTower_leg[i][j][k] = PRotateY(this.node_baseTower_leg[i][j][k], -var_view[state_view][1] * HALF_PI);
              this.node_baseTower_leg[i][j][k].add(this.center_baseTower_leg[i][j].copy());
            }
          }
        }


        for (let i=0; i<this.node_baseTower_pants.length; i++) {
          for (let j=0; j<this.node_baseTower_pants[i].length; j++) {
            let w = this.W_baseTower_leg * 5;
            if (this.num_floor_tower == 1) {
              w = this.W_baseTower_leg * 4.5;
            }
            for (let k=0; k<this.node_baseTower_pants[i][j].length; k++) {
              let x = cos(map(k, 0, this.node_baseTower_pants[i][j].length, 0, TWO_PI)) * w/2;
              let z = sin(map(k, 0, this.node_baseTower_pants[i][j].length, 0, TWO_PI)) * w/2;
              this.node_baseTower_pants[i][j][k] = createVector(x, 0, z);
              this.node_baseTower_pants[i][j][k] = PRotateZ(this.node_baseTower_pants[i][j][k], HALF_PI*map(this.num_floor_tower, 1, 4, 0.2, 0.1)  *  map(j, 0, this.node_baseTower_pants[i].length-1, 0, 1) * pow(-1, i));
              let y = map(j, 0, this.node_baseTower_pants[i].length-1, 0, this.H_room) - (this.H_room+this.H_base)*this.num_floor_tower;
              if (this.num_floor_tower == 1) {
                y = map(j, 0, this.node_baseTower_pants[i].length-1, 0, this.H_room*0.4) - (this.H_room+this.H_base)*this.num_floor_tower;
              }
              let _x = map(j, 0, this.node_baseTower_pants[i].length-1, w*map(this.num_floor_tower, 1, 4, 0.2, 0.33), w*map(this.num_floor_tower, 1, 4, 0.8, 0.6)) * pow(-1, i+1);
              if (this.num_floor_tower == 1) {
                _x = map(j, 0, this.node_baseTower_pants[i].length-1, w*0.65, w*0.85) * pow(-1, i+1);
              }
              this.node_baseTower_pants[i][j][k].add(_x, y, 0);
              this.node_baseTower_pants[i][j][k] = PRotateY(this.node_baseTower_pants[i][j][k], -var_view[state_view][1] * HALF_PI);
              this.node_baseTower_pants[i][j][k].add(this.center_d);
            }
          }
        }


        for (let i=0; i<this.node_baseTower_shoes.length; i++) {
          for (let j=0; j<this.node_baseTower_shoes[i].length; j++) {
            let w = this.W_baseTower_shoes * map(cos(map(j, 0, this.node_baseTower_shoes[i].length-1, 0, HALF_PI)), 1, 0, 1, 0);
            let y = -this.W_baseTower_shoes*0.5 * map(sin(map(j, 0, this.node_baseTower_shoes[i].length-1, 0, HALF_PI)), 0, 1, 0, 1);
            for (let k=0; k<this.node_baseTower_shoes[i][j].length; k++) {
              let x=0, z=0;
              if (k < floor(this.node_baseTower_shoes[i][j].length/2)) {
                x = cos(map(k, 0, floor(this.node_baseTower_shoes[i][j].length/2)-1, -PI, 0)) * w/2;
                z = sin(map(k, 0, floor(this.node_baseTower_shoes[i][j].length/2)-1, -PI, 0)) * w/2;
              } else {
                x = cos(map(k, floor(this.node_baseTower_shoes[i][j].length/2), this.node_baseTower_shoes[i][j].length-1, 0, PI)) * w/2;
                z = sin(map(k, floor(this.node_baseTower_shoes[i][j].length/2), this.node_baseTower_shoes[i][j].length-1, 0, PI)) * w/2;
                z += this.W_baseTower_shoes;
              }
              this.node_baseTower_shoes[i][j][k] = createVector(x, y, z);
              this.node_baseTower_shoes[i][j][k] = PRotateY(this.node_baseTower_shoes[i][j][k], HALF_PI*0.33 * pow(-1, i));
              this.node_baseTower_shoes[i][j][k].x += (this.W_frame*_rate_leg_w) * pow(-1, i+1);
              this.node_baseTower_shoes[i][j][k] = PRotateY(this.node_baseTower_shoes[i][j][k], -var_view[state_view][1] * HALF_PI);
              this.node_baseTower_shoes[i][j][k].add(this.center_d);
            }
          }
        }
      } else if (state_baseTower == 3) {
        for (let i=0; i<this.center_baseTower.length; i++) {
          if (i == 0) {
            this.center_baseTower[i] = this.center_d.copy();
          } else {
            this.center_baseTower[i] = createVector(0, -(this.H_room+this.H_base), 0);
            this.center_baseTower[i].add(this.center_baseTower[i-1]);
          }
        }
        for (let i=0; i<this.node_baseTower.length; i++) {
          let w = map(i, 0, this.num_floor, this.W_baseTower, this.W_baseTower*0.66);
          for (let j=0; j<this.node_baseTower[i].length; j++) {
            let x = cos(map(j, 0, this.node_baseTower[i].length, 0, TWO_PI)) * w/2;
            let z = sin(map(j, 0, this.node_baseTower[i].length, 0, TWO_PI)) * w/2;
            this.node_baseTower[i][j] = createVector(x, 0, z).add(this.center_baseTower[i]);
          }
        }
      } else if (state_baseTower == 4) {
        for (let i=0; i<this.center_baseTower.length; i++) {
          if (i == 0) {
            this.center_baseTower[i] = this.center_d.copy();
          } else {
            this.center_baseTower[i] = createVector(0, -(this.H_room+this.H_base), 0);
            this.center_baseTower[i].add(this.center_baseTower[i-1]);
          }
        }
        let _w_tower = new Array(this.node_baseTower.length);
        for (let i=0; i<this.node_baseTower.length; i++) {
          _w_tower[i] = map(i, 0, this.num_floor, this.W_baseTower, this.W_baseTower*0.66);
        }
        for (let i=0; i<this.node_baseTower.length; i++) {
          let w = _w_tower[i];
          for (let j=0; j<this.node_baseTower[i].length; j++) {
            let y = -(this.H_base+this.H_room) * j;
            for (let k=0; k<this.node_baseTower[i][j].length; k++) {
              this.node_baseTower[i][j][k] = createVector(w/2.0 * pow(-1, ceil(k%1.5)+1), y, w/2.0 * pow(-1, floor(k/2)+1));
              this.node_baseTower[i][j][k].add(this.center_baseTower[i]);
            }
          }
        }

        let _h_floor = this.H_base * 0.5;
        let _w_floor = new Array(this.node_baseTower_floor.length+1);
        for (let i=0; i<_w_floor.length; i++) {
          _w_floor[i] = _w_tower[i]  + real(50);//map(i, -1, this.num_floor, this.W_baseTower, this.W_baseTower*0.66) * 1.66;
        }
        for (let i=0; i<this.node_baseTower_floor.length; i++) {
          for (let j=0; j<this.node_baseTower_floor[i].length; j++) {
            for (let k=0; k<this.node_baseTower_floor[i][j].length; k++) {
              let w = (_w_floor[i] - _w_tower[i])/2;
              w -= this.H_base * 0.5;
              let x = (_w_tower[i])/2 + w/2;
              let d = _w_tower[i] + w;
              let z = -w/2;
              let y = _h_floor - _h_floor * k;
              if (j == 0  ||  j == 2) {
                d = _w_tower[i];
                z = 0;
              }
              for (let l=0; l<this.node_baseTower_floor[i][j][k].length; l++) {
                this.node_baseTower_floor[i][j][k][l] = createVector(x+w/2.0 * pow(-1, ceil(l%1.5)+1), y, z+d/2.0 * pow(-1, floor(l/2)+1));
                this.node_baseTower_floor[i][j][k][l] = PRotateY(this.node_baseTower_floor[i][j][k][l], this.angle_begin_baseTower_stairs - i*HALF_PI + j*HALF_PI);
                this.node_baseTower_floor[i][j][k][l].add(this.center_baseTower[i+1]);
              }
            }
          }
        }

        let _d_wall = this.H_base * 0.5;
        let _h_wall = this.H_base * 0.75;
        for (let i=0; i<this.node_baseTower_wall.length; i++) {
          for (let j=0; j<this.node_baseTower_wall[i].length; j++) {
            for (let k=0; k<this.node_baseTower_wall[i][j].length; k++) {
              let w = _w_floor[i] - _d_wall;
              let d = _d_wall;
              let y = _h_floor -(_h_wall+_h_floor) * k;
              for (let l=0; l<this.node_baseTower_wall[i][j][k].length; l++) {
                this.node_baseTower_wall[i][j][k][l] = createVector(w/2.0 * pow(-1, ceil(l%1.5)+1), y, d/2.0 * pow(-1, floor(l/2)+1));
                this.node_baseTower_wall[i][j][k][l].z += -_w_floor[i]/2+d/2;
                this.node_baseTower_wall[i][j][k][l].x += -_d_wall*0.5;
                this.node_baseTower_wall[i][j][k][l] = PRotateY(this.node_baseTower_wall[i][j][k][l], HALF_PI * j);
                this.node_baseTower_wall[i][j][k][l].add(this.center_baseTower[i+1]);
              }
            }
          }
        }
        for (let i=0; i<this.node_baseTower_tooth.length; i++) {
          for (let j=0; j<this.node_baseTower_tooth[i].length; j++) {
            for (let k=0; k<this.node_baseTower_tooth[i][j].length; k++) {
              let d = _d_wall;
              let w = (_w_floor[i]-_d_wall) / (this.node_baseTower_tooth[i][j].length*2);
              let x = -_w_floor[i]/2 + w*0.5 + w*2*k;
              let z = -_w_floor[i]/2+d/2;
              for (let l=0; l<this.node_baseTower_tooth[i][j][k].length; l++) {
                let y = -_h_wall - this.H_base*0.5*l;
                for (let n=0; n<this.node_baseTower_tooth[i][j][k][l].length; n++) {
                  this.node_baseTower_tooth[i][j][k][l][n] = createVector(x+w/2.0 * pow(-1, ceil(n%1.5)+1), y, z+d/2.0 * pow(-1, floor(n/2)+1));
                  this.node_baseTower_tooth[i][j][k][l][n] = PRotateY(this.node_baseTower_tooth[i][j][k][l][n], HALF_PI * j);
                  this.node_baseTower_tooth[i][j][k][l][n].add(this.center_baseTower[i+1]);
                }
              }
            }
          }
        }

        for (let i=0; i<this.node_baseTower_stairs.length; i++) {
          for (let j=0; j<this.node_baseTower_stairs[i].length; j++) {
            let w = (_w_floor[i] - _w_tower[i])/2 - _d_wall - real(1);
            let d = (_w_tower[i] + (_w_floor[i]-_w_tower[i])/2 - _d_wall*2) / this.node_baseTower_stairs[i][j].length;
            let x = _w_tower[i]/2 + w/2 +  real(0.5);
            for (let k=0; k<this.node_baseTower_stairs[i][j].length; k++) {
              let z = map(k, 0, this.node_baseTower_stairs[i][j].length-1, _w_tower[i]/2+d/2 - d, -(_w_floor[i]/2-_d_wall*1-d*0.5));
              if (i == this.node_baseTower_stairs.length-1) {
                z = map(k, 0, this.node_baseTower_stairs[i][j].length-1, _w_tower[i]/2+d/2 - d, -(_w_tower[i]/2));
              }
              let y = map(k, 0, this.node_baseTower_stairs[i][j].length-1, 0, -(this.H_room+this.H_base - _h_floor));
              for (let l=0; l<this.node_baseTower_stairs[i][j][k].length; l++) {
                this.node_baseTower_stairs[i][j][k][l] = createVector(x+w/2.0 * pow(-1, ceil(l%1.5)+1), y, z+d/2.0 * pow(-1, floor(l/2)+1));
              }
            }
            for (let k=0; k<this.node_baseTower_stairs_d[i][j].length; k++) {
              this.node_baseTower_stairs_d[i][j][k][0] = this.node_baseTower_stairs[i][j][k][0].copy().add(0, 0, -_d_wall);
              this.node_baseTower_stairs_d[i][j][k][1] = this.node_baseTower_stairs[i][j][k][1].copy().add(0, 0, -_d_wall);
              for (let l=0; l<this.node_baseTower_stairs_d[i][j][k].length; l++) {
                this.node_baseTower_stairs_d[i][j][k][l] = PRotateY(this.node_baseTower_stairs_d[i][j][k][l], this.angle_begin_baseTower_stairs - i*HALF_PI + j*PI);
                this.node_baseTower_stairs_d[i][j][k][l].add(this.center_baseTower[i]);
              }
            }

            for (let k=0; k<this.node_baseTower_stairs[i][j].length; k++) {
              for (let l=0; l<this.node_baseTower_stairs[i][j][k].length; l++) {
                this.node_baseTower_stairs[i][j][k][l] = PRotateY(this.node_baseTower_stairs[i][j][k][l], this.angle_begin_baseTower_stairs - i*HALF_PI + j*PI);
                this.node_baseTower_stairs[i][j][k][l].add(this.center_baseTower[i]);
              }
            }
          }
        }
      } else if (state_baseTower == 5) {
        for (let i=0; i<this.center_baseTower.length; i++) {
          if (i == 0) {
            this.center_baseTower[i] = this.center_d.copy();
          } else {
            this.center_baseTower[i] = createVector(0, -(this.H_room+this.H_base), 0);
            this.center_baseTower[i].add(this.center_baseTower[i-1]);
          }
        }

        let _w_floor = new Array(this.node_baseTower.length);
        for (let i=0; i<this.node_baseTower.length; i++) {
          _w_floor[i] = map(i, 0, this.num_floor-1, this.W_baseTower, this.W_frame*0.5);
          for (let j=0; j<this.node_baseTower[i].length; j++) {
            let w = _w_floor[i] * 0.66;
            let y = -(this.H_room+this.H_base) * j;
            for (let k=0; k<this.node_baseTower[i][j].length; k++) {
              let x = cos(map(k, 0, this.node_baseTower[i][j].length, 0, TWO_PI)) * w/2;
              let z = sin(map(k, 0, this.node_baseTower[i][j].length, 0, TWO_PI)) * w/2;
              this.node_baseTower[i][j][k] = createVector(x, y, z);
              this.node_baseTower[i][j][k] = PRotateY(this.node_baseTower[i][j][k], HALF_PI - (this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
              this.node_baseTower[i][j][k].add(this.center_baseTower[i]);
            }
          }
        }
        let _h_eaves = this.H_room*0.35 * 2;
        let _w_eaves = this.H_room*0.33;
        for (let i=0; i<this.node_baseTower_eaves.length; i++) {
          for (let j=0; j<this.node_baseTower_eaves[i].length; j++) {
            for (let k=0; k<this.node_baseTower_eaves[i][j].length; k++) {
              let y = sin(map(j, 0, this.node_baseTower_eaves[i].length-1, HALF_PI*1.5, HALF_PI)) * _h_eaves;
              let x = cos(map(j, 0, this.node_baseTower_eaves[i].length-1, HALF_PI*1.5, HALF_PI)) * _w_eaves;
              y -= sin(map(0, 0, this.node_baseTower_eaves[i].length-1, HALF_PI*1.5, HALF_PI)) * _h_eaves;
              x += _w_eaves + _w_floor[i]*0.5;
              y -= this.H_room+this.H_base;
              this.node_baseTower_eaves[i][j][k] = createVector(x, y, 0);
              this.node_baseTower_eaves[i][j][k] = PRotateY(this.node_baseTower_eaves[i][j][k], map(k, 0, this.node_baseTower_eaves[i][j].length, 0, TWO_PI));
              this.node_baseTower_eaves[i][j][k] = PRotateY(this.node_baseTower_eaves[i][j][k], HALF_PI - (this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
              this.node_baseTower_eaves[i][j][k].add(this.center_baseTower[i]);
            }
          }
        }


        for (let i=0; i<this.node_baseTower_pillar.length; i++) {
          for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
            for (let k=0; k<this.node_baseTower_pillar[i][j].length; k++) {
              let w = this.W_frame*0.045;
              let y = -(this.H_room) * k;
              for (let l=0; l<this.node_baseTower_pillar[i][j][k].length; l++) {
                let x = cos(map(l, 0, this.node_baseTower_pillar[i][j][k].length, 0, TWO_PI)) * w/2;
                let z = sin(map(l, 0, this.node_baseTower_pillar[i][j][k].length, 0, TWO_PI)) * w/2;
                x += _w_floor[i]*0.66*0.5 + w/2+real(0.5);
                this.node_baseTower_pillar[i][j][k][l] = createVector(x, y, z);
                this.node_baseTower_pillar[i][j][k][l] = PRotateY(this.node_baseTower_pillar[i][j][k][l], map(j, 0, this.node_baseTower_pillar[i].length, 0, TWO_PI));
                this.node_baseTower_pillar[i][j][k][l] = PRotateY(this.node_baseTower_pillar[i][j][k][l], HALF_PI - (this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
                this.node_baseTower_pillar[i][j][k][l].add(this.center_baseTower[i]);
              }
            }
          }
        }

        for (let i=0; i<this.node_baseTower_fence_pillar.length; i++) {
          for (let j=0; j<this.node_baseTower_fence_pillar[i].length; j++) {
            for (let k=0; k<this.node_baseTower_fence_pillar[i][j].length; k++) {
              let w = this.W_frame*0.02;
              let y = -(this.H_room*0.25) * k;
              if (i == 0) {
                w = this.W_frame*0.035;
                y = -(this.H_room*0.95) * k;
              }
              for (let l=0; l<this.node_baseTower_fence_pillar[i][j][k].length; l++) {
                let x = cos(map(l, 0, this.node_baseTower_fence_pillar[i][j][k].length, 0, TWO_PI)) * w/2;
                let z = sin(map(l, 0, this.node_baseTower_fence_pillar[i][j][k].length, 0, TWO_PI)) * w/2;
                if (i == 0) {
                  x += _w_floor[i]*0.65 + w/2;
                } else {
                  x += _w_floor[i]*0.6 + w/2;
                }
                this.node_baseTower_fence_pillar[i][j][k][l] = createVector(x, y, z);
                this.node_baseTower_fence_pillar[i][j][k][l] = PRotateY(this.node_baseTower_fence_pillar[i][j][k][l], map(j, 0, this.node_baseTower_pillar[i].length, 0, TWO_PI));
                this.node_baseTower_fence_pillar[i][j][k][l] = PRotateY(this.node_baseTower_fence_pillar[i][j][k][l], HALF_PI - (this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
                this.node_baseTower_fence_pillar[i][j][k][l].add(this.center_baseTower[i]);
              }
            }
          }
        }

        for (let i=0; i<this.node_baseTower_fence.length; i++) {
          for (let j=0; j<this.node_baseTower_fence[i].length; j++) {
            for (let k=0; k<this.node_baseTower_fence[i][j].length; k++) {
              for (let l=0; l<this.node_baseTower_fence[i][j][k].length; l++) {
                let w = this.W_frame*0.015;
                let z = (_w_floor[i]*0.6 + this.W_frame*0.02*2)/2  *  sin((this.num_face_baseTower-2)*PI/this.num_face_baseTower/2)  * pow(-1, l+1);
                for (let n=0; n<this.node_baseTower_fence[i][j][k][l].length; n++) {
                  let x = cos(map(n, 0, this.node_baseTower_fence[i][j][k][l].length, 0, TWO_PI)) * w/2;
                  let y = sin(map(n, 0, this.node_baseTower_fence[i][j][k][l].length, 0, TWO_PI)) * w/2;
                  x += (_w_floor[i]*0.6 + this.W_frame*0.02/2) * sin((this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
                  y += -(this.H_room*0.25)+w  +  (this.H_room*0.25)/this.node_baseTower_fence[i][j].length * k;
                  this.node_baseTower_fence[i][j][k][l][n] = createVector(x, y, z);
                  this.node_baseTower_fence[i][j][k][l][n] = PRotateY(this.node_baseTower_fence[i][j][k][l][n], map(j, 0, this.node_baseTower_fence[i].length, 0, TWO_PI));
                  //this.node_baseTower_fence[i][j][k][l][n] = PRotateY(this.node_baseTower_fence[i][j][k][l][n], HALF_PI - (this.num_face_baseTower-2)*PI/this.num_face_baseTower/2);
                  this.node_baseTower_fence[i][j][k][l][n].add(this.center_baseTower[i]);
                }
              }
            }
          }
        }
      }
    }
  };

































  this.display = function(_index_floor) {
    let _state_noise = 0;
    //if (state_arrange == 2) {
      _state_noise = state_noise;
    //}
    let _var_noise = this.num_num_sign;






    if (this.show_floor[_index_floor]) {
      
      
      stroke(c_dark);
      strokeWeight(var_weight);
      noFill();
      for (let ii=_index_floor; ii<_index_floor+1; ii++) {
        for (let i=0; i<this.node_base[ii].length; i++) {
          for (let j=0; j<this.node_base[ii][i].length; j++) {
            FS_drawLine(this.node_base[ii][i][j], this.node_base[ii][i][(j+1)%this.node_base[ii][i].length], _state_noise, _var_noise);
          }
        }
        drawCylinder_LINES(this.node_base[ii], 0, _state_noise, _var_noise);
      }


      noStroke();
      fill(c_bkg);
      for (let ii=_index_floor; ii<_index_floor+1; ii++) {
        FS_drawShape(this.node_base[ii][1]);
      }
      fill(c_dark);
      for (let ii=_index_floor; ii<_index_floor+1; ii++) {
        drawCylinder_TRIANGLES(this.node_base[ii]);
      }
      







      stroke(c_dark);
      strokeWeight(var_weight);
      noFill();
      for (let ii=_index_floor; ii<_index_floor+1; ii++) {
        for (let i=0; i<this.node_cover[ii].length; i++) {
          for (let j=0; j<this.node_cover[ii][i].length; j++) {
            FS_drawLine(this.node_cover[ii][i][j], this.node_cover[ii][i][(j+1)%this.node_cover[ii][i].length], _state_noise, _var_noise);
          }
        }
        drawCylinder_LINES(this.node_cover[ii], 0, _state_noise, _var_noise);
      }






      fill(c_bkg);
      noStroke();
      for (let i=_index_floor; i<_index_floor+1; i++) {
        drawCylinder_TRIANGLES(this.node_sign_pillar[i]);
      }

      stroke(c_dark);
      strokeWeight(var_weight*2);
      noFill();
      for (let i=_index_floor; i<_index_floor+1; i++) {
        drawCylinder_LINES(this.node_sign_pillar[i], 0, _state_noise, _var_noise);
        FS_drawEllipse(this.node_sign_pillar[i][this.node_sign_pillar[i].length-1], _state_noise, _var_noise);
      }

      fill(c_dark);
      for (let i=_index_floor; i<_index_floor+1; i++) {
        TRIANGLES_getShape(this.node_sign_hole[i]);
      }









      for (let ii=_index_floor; ii<_index_floor+1; ii++) {
        this.display_object(ii);
      }
    }








    if (this.have_baseTower) {
      if (state_baseTower == 1) {
        for (let i=0; i<this.node_baseTower_pillar_hor.length; i++) {
          if (i == _index_floor) {
            for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
              noStroke();
              fill(c_bkg);
              drawCylinder_TRIANGLES(this.node_baseTower_pillar[i][j]);

              noFill();
              stroke(c_dark);
              strokeWeight(real(2));
              drawCylinder_LINES(this.node_baseTower_pillar[i][j], 0, _state_noise, _var_noise);
            }



            for (let j=0; j<this.node_baseTower_pillar_hor[i].length; j++) {
              noStroke();
              fill(c_bkg);
              drawCylinder_TRIANGLES(this.node_baseTower_pillar_hor[i][j]);

              noFill();
              stroke(c_dark);
              strokeWeight(real(2));
              if ((p5.Vector.dist(screenPosition(this.node_baseTower_pillar_hor[i][j][1][0]), screenPosition(this.node_baseTower_pillar_hor[i][j][1][floor(this.node_baseTower_pillar_hor[i][j][0].length/4*2)]))   >   p5.Vector.dist(screenPosition(this.node_baseTower_pillar_hor[i][j][1][floor(this.node_baseTower_pillar_hor[i][j][0].length/4*1)]), screenPosition(this.node_baseTower_pillar_hor[i][j][1][floor(this.node_baseTower_pillar_hor[i][j][0].length/4*3)])))) {
                drawCylinder_LINES(this.node_baseTower_pillar_hor[i][j], 0, _state_noise, _var_noise);
              } else {
                drawCylinder_LINES(this.node_baseTower_pillar_hor[i][j], 1, _state_noise, _var_noise);
              }

              //drawCylinder_LINES(this.node_baseTower_pillar_hor[i][j], 1, _state_noise, _var_noise);
            }


            for (let j=0; j<this.node_baseTower_pillar_slash[i].length; j++) {
              noStroke();
              fill(c_bkg);
              drawCylinder_TRIANGLES(this.node_baseTower_pillar_slash[i][j]);

              noFill();
              stroke(c_dark);
              strokeWeight(real(1.5));
              if ((p5.Vector.dist(screenPosition(this.node_baseTower_pillar_slash[i][j][1][0]), screenPosition(this.node_baseTower_pillar_slash[i][j][1][floor(this.node_baseTower_pillar_slash[i][j][0].length/4*2)]))   >   p5.Vector.dist(screenPosition(this.node_baseTower_pillar_slash[i][j][1][floor(this.node_baseTower_pillar_slash[i][j][0].length/4*1)]), screenPosition(this.node_baseTower_pillar_slash[i][j][1][floor(this.node_baseTower_pillar_slash[i][j][0].length/4*3)])))) {
                drawCylinder_LINES(this.node_baseTower_pillar_slash[i][j], 0, _state_noise, _var_noise);
              } else {
                drawCylinder_LINES(this.node_baseTower_pillar_slash[i][j], 1, _state_noise, _var_noise);
              }
            }
          }
        }


        if (_index_floor == 0) {
          noFill();
          stroke(c_dark);
          strokeWeight(real(1));
          for (let i=0; i<this.node_baseTower_base.length; i++) {
            FS_drawEllipse(this.node_baseTower_base[i], _state_noise, _var_noise);
          }
        }
      } else if (state_baseTower == 2) {
        for (let i=0; i<this.center_baseTower_leg.length; i++) {
          for (let j=0; j<this.center_baseTower_leg[i].length-1; j++) {
            if (j >= _index_floor*this.detail_baseTower_leg  &&  j < (_index_floor+1)*this.detail_baseTower_leg) {
              let _n = Array.from(Array(2), () => new Array(this.node_baseTower_leg[i][j].length)); 
              for (let k=0; k<_n.length; k++) {
                for (let l=0; l<_n[k].length; l++) {
                  _n[k][l] = this.node_baseTower_leg[i][j+k][l];
                }
              }
              noFill();
              stroke(c_dark);
              strokeWeight(real(2));
              drawCylinder_LINES(_n, 0, _state_noise, _var_noise);
              noStroke();
              fill(c_bkg);
              drawCylinder_TRIANGLES(_n);
            }
          }
        }

        if (_index_floor == this.num_floor_tower) {
          for (let i=0; i<this.node_baseTower_pants.length; i++) {
            noFill();
            stroke(c_dark);
            strokeWeight(real(2));
            drawCylinder_LINES(this.node_baseTower_pants[i], 0, _state_noise, _var_noise);
            FS_drawEllipse(this.node_baseTower_pants[i][this.node_baseTower_pants[i].length-1], _state_noise, _var_noise);
            noStroke();
            fill(c_bkg);
            drawCylinder_TRIANGLES(this.node_baseTower_pants[i]);
          }
        }


        if (_index_floor == 0) {
          for (let i=0; i<this.node_baseTower_shoes.length; i++) {
            noStroke();
            fill(c_bkg);
            drawCylinder_TRIANGLES(this.node_baseTower_shoes[i]);

            noFill();
            stroke(c_dark);
            strokeWeight(real(6));
            FS_drawEllipse(this.node_baseTower_shoes[i][0], _state_noise, _var_noise);
            strokeWeight(real(4));
            FS_drawEllipse(this.node_baseTower_leg[i][0], _state_noise, _var_noise);
            noStroke();
            fill(c_dark);
            for (let k=0; k<this.node_baseTower_shoes[i][0].length; k++) {
              let w = real(3);
              FS_drawShape(getNode_ellipse(this.node_baseTower_shoes[i][0][k].x, this.node_baseTower_shoes[i][0][k].y, this.node_baseTower_shoes[i][0][k].z, w, w, 10));
            }
            for (let k=0; k<this.node_baseTower_leg[i][0].length; k++) {
              let w = real(2);
              FS_drawShape(getNode_ellipse(this.node_baseTower_leg[i][0][k].x, this.node_baseTower_leg[i][0][k].y, this.node_baseTower_leg[i][0][k].z, w, w, 10));
            }

            noFill();
            stroke(c_dark);
            strokeWeight(real(2));
            let _point_far = this.center_d.copy().add(real(1), real(500), 0);
            let n_edge = [];
            //   1. 判断是否有交点  --------------------------------------------------------------
            for (let j=0; j<this.node_baseTower_shoes[i].length; j++) {
              for (let k=0; k<this.node_baseTower_shoes[i][j].length; k++) {
                let ray = p5.Vector.sub(screenPosition(this.node_baseTower_shoes[i][j][k]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_baseTower_shoes[i][j][k]));
                let _ray = p5.Vector.sub(screenPosition(this.node_baseTower_shoes[i][j][k]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_baseTower_shoes[i][j][k]));
                let have_point = false;
                for (let _j=0; _j<this.node_baseTower_shoes[i].length; _j++) {
                  for (let _k=0; _k<this.node_baseTower_shoes[i][_j].length; _k++) {
                    if (isIntersection(screenPosition(this.node_baseTower_shoes[i][_j][_k]), screenPosition(this.node_baseTower_shoes[i][_j][(_k+1)%this.node_baseTower_shoes[i][_j].length]), _ray, ray)) {
                      have_point = true;
                      break;
                    }
                    if (_j < this.node_baseTower_shoes[i].length-1) {
                      if (isIntersection(screenPosition(this.node_baseTower_shoes[i][_j][_k]), screenPosition(this.node_baseTower_shoes[i][_j+1][_k]), _ray, ray)) {
                        have_point = true;
                        break;
                      }
                    }
                  }
                  if (have_point) {
                    break;
                  }
                }
                if (!have_point) {
                  n_edge.push(this.node_baseTower_shoes[i][j][k].copy());
                  //FS_drawLine(n_edge[n_edge.length-1], ray);
                }
              }
            }
            //   2. 排序  --------------------------------------------------------------
            let n_edge_sort = [];
            let _time_for = n_edge.length;
            for (let j=0; j<_time_for; j++) {
              let _index_max_angle = 0;
              for (let i=0; i<n_edge.length; i++) {
                let _angle_max = p5.Vector.sub(screenPosition(n_edge[_index_max_angle]), screenPosition(_point_far)).heading();
                let _angle = p5.Vector.sub(screenPosition(n_edge[i]), screenPosition(_point_far)).heading();
                if (_angle > _angle_max) {
                  _index_max_angle = i;
                }
              }
              n_edge_sort.push(n_edge[_index_max_angle]);
              n_edge.splice(_index_max_angle, 1);
            }


            for (let i=0; i<n_edge_sort.length-1; i++) {
              FS_drawLine(n_edge_sort[i], n_edge_sort[i+1], _state_noise, _var_noise);
            }
          }
        }
      } else if (state_baseTower == 3) {
        for (let i=0; i<this.node_baseTower.length-1; i++) {
          if (_index_floor == i) {
            let _n = Array.from(Array(2), () => new Array(this.node_baseTower[i].length)); 
            for (let j=0; j<_n.length; j++) {
              for (let k=0; k<_n[j].length; k++) {
                _n[j][k] = this.node_baseTower[i+j][k].copy();
              }
            }
            noFill();
            stroke(c_dark);
            strokeWeight(real(2));
            drawCylinder_LINES(_n, 0, _state_noise, _var_noise);
            noStroke();
            fill(c_bkg);
            //drawCylinder_TRIANGLES(_n);
            beginShape(TRIANGLES);
            texture(this.TOWER);
            for (let k=0; k<_n[0].length; k++) {
              TRIANGLES_getRect_uv(_n[0][k], _n[1][k], _n[1][(k+1)%_n[0].length], _n[0][(k+1)%_n[0].length], 
                createVector(map(k, 0, _n[0].length, 0, 1), map(i, 0, this.num_floor, 1, 0)), 
                createVector(map(k, 0, _n[0].length, 0, 1), map(i+1, 0, this.num_floor, 1, 0)), 
                createVector(map(k+1, 0, _n[0].length, 0, 1), map(i+1, 0, this.num_floor, 1, 0)), 
                createVector(map(k+1, 0, _n[0].length, 0, 1), map(i, 0, this.num_floor, 1, 0)));
            }

            endShape();
          }
        }
      } else if (state_baseTower == 4) {
        for (let i=0; i<this.node_baseTower.length; i++) {
          if (_index_floor == i) {
            noFill();
            stroke(c_dark);
            strokeWeight(real(1));
            drawCylinder_info(this.node_baseTower[i], _state_noise, _var_noise);
            noStroke();
            fill(c_bkg);
            drawCylinder_TRIANGLES(this.node_baseTower[i]);
          }
        }

        for (let i=0; i<this.node_baseTower_floor.length; i++) {
          if (_index_floor-1 == i) {
            noFill();
            stroke(c_dark);
            strokeWeight(real(1));
            //FS_drawEllipse(this.node_baseTower_floor[i][0], _state_noise, _var_noise);
            for (let j=0; j<this.node_baseTower_floor[i].length; j++) {
              //FS_drawEllipse(this.node_baseTower_floor[i][j][1], _state_noise, _var_noise);

              FS_drawLine(this.node_baseTower_floor[i][j][1][1], this.node_baseTower_floor[i][j][1][2], _state_noise, _var_noise);
              if (j == 0  ||  j == 2) {
                FS_drawLine(this.node_baseTower_floor[i][j][1][0], this.node_baseTower_floor[i][j][1][1], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][0], this.node_baseTower_floor[i][j][0][1], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][0], this.node_baseTower_floor[i][j][1][0], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][1], this.node_baseTower_floor[i][j][1][1], _state_noise, _var_noise);
              } else {
                FS_drawLine(this.node_baseTower_floor[i][j][1][0], this.node_baseTower_floor[i][j][1][1], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][1][2], this.node_baseTower_floor[i][j][1][3], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][2], this.node_baseTower_floor[i][j][0][3], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][2], this.node_baseTower_floor[i][j][1][2], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_floor[i][j][0][3], this.node_baseTower_floor[i][j][1][3], _state_noise, _var_noise);
              }
            }
            noStroke();
            fill(c_bkg);
            //drawCylinder_TRIANGLES(this.node_baseTower_floor[i]);
            for (let j=0; j<this.node_baseTower_floor[i].length; j++) {
              drawCylinder_TRIANGLES(this.node_baseTower_floor[i][j]);
              FS_drawShape(this.node_baseTower_floor[i][j][0]);
              FS_drawShape(this.node_baseTower_floor[i][j][1]);
            }
            //补四块地板中间的面
            FS_drawShape([this.node_baseTower_floor[i][0][1][3], this.node_baseTower_floor[i][1][1][3], this.node_baseTower_floor[i][2][1][3], this.node_baseTower_floor[i][3][1][3]]);

            noFill();
            stroke(c_dark);
            strokeWeight(real(1));
            for (let j=0; j<this.node_baseTower_wall[i].length; j++) {
              FS_drawEllipse(this.node_baseTower_wall[i][j][0], _state_noise, _var_noise);

              for (let l=0; l<this.node_baseTower_wall[i][j][0].length; l++) {
                if (l == 0  ||  l == 2) {
                  FS_drawLine(this.node_baseTower_wall[i][j][0][l], this.node_baseTower_wall[i][j][1][l], _state_noise, _var_noise);
                }
              }
              FS_drawLine(this.node_baseTower_wall[i][j][0][3], this.node_baseTower_wall[i][j][0][2], _state_noise, _var_noise);
            }

            noStroke();
            fill(c_bkg);
            for (let j=0; j<this.node_baseTower_wall[i].length; j++) {
              drawCylinder_TRIANGLES(this.node_baseTower_wall[i][j]);
              FS_drawShape(this.node_baseTower_wall[i][j][1]);
            }
          }
        }


        for (let i=0; i<this.node_baseTower_tooth.length; i++) {
          if (_index_floor-1 == i) {
            noFill();
            stroke(c_dark);
            strokeWeight(real(1));
            for (let j=0; j<this.node_baseTower_tooth[i].length; j++) {
              for (let k=0; k<this.node_baseTower_tooth[i][j].length; k++) {
                FS_drawEllipse(this.node_baseTower_tooth[i][j][k][1], _state_noise, _var_noise);
                if (k < this.node_baseTower_tooth[i][j].length-1) {
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][1], this.node_baseTower_tooth[i][j][k+1][0][0], _state_noise, _var_noise);
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][2], this.node_baseTower_tooth[i][j][k+1][0][3], _state_noise, _var_noise);
                } else {
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][1], this.node_baseTower_wall[i][j][1][1], _state_noise, _var_noise);
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][2], this.node_baseTower_wall[i][j][1][2], _state_noise, _var_noise);
                  FS_drawLine(this.node_baseTower_wall[i][j][1][1], this.node_baseTower_wall[i][j][1][2], _state_noise, _var_noise);
                }
                if (k > 0) {
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][0], this.node_baseTower_tooth[i][j][k][0][3], _state_noise, _var_noise);
                }
                FS_drawLine(this.node_baseTower_tooth[i][j][k][0][1], this.node_baseTower_tooth[i][j][k][0][2], _state_noise, _var_noise);

                for (let n=0; n<this.node_baseTower_tooth[i][j][k][0].length; n++) {
                  FS_drawLine(this.node_baseTower_tooth[i][j][k][0][n], this.node_baseTower_tooth[i][j][k][1][n], _state_noise, _var_noise);
                }
                //drawCylinder_info(this.node_baseTower_tooth[i][j][k]);
              }
            }
            noStroke();
            fill(c_bkg);
            for (let j=0; j<this.node_baseTower_tooth[i].length; j++) {
              for (let k=0; k<this.node_baseTower_tooth[i][j].length; k++) {
                drawCylinder_TRIANGLES(this.node_baseTower_tooth[i][j][k]);
                FS_drawShape(this.node_baseTower_tooth[i][j][k][1]);
              }
            }
          }
        }


        for (let i=0; i<this.node_baseTower_stairs.length; i++) {
          if (_index_floor == i) {
            for (let j=0; j<this.node_baseTower_stairs[i].length; j++) {
              noFill();
              stroke(c_dark);
              strokeWeight(real(1));
              for (let k=1; k<this.node_baseTower_stairs[i][j].length; k++) {
                FS_drawEllipse(this.node_baseTower_stairs[i][j][k], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_stairs[i][j][k][3], this.node_baseTower_stairs[i][j][k-1][0], _state_noise, _var_noise);
                FS_drawLine(this.node_baseTower_stairs[i][j][k][2], this.node_baseTower_stairs[i][j][k-1][1], _state_noise, _var_noise);
              }
              FS_drawLine(this.node_baseTower_stairs[i][j][0][0], this.node_baseTower_stairs[i][j][0][1], _state_noise, _var_noise);
              FS_drawLine(this.node_baseTower_stairs_d[i][j][0][1], this.node_baseTower_stairs[i][j][0][1], _state_noise, _var_noise);

              FS_drawEllipse([this.node_baseTower_stairs_d[i][j][0][0], this.node_baseTower_stairs_d[i][j][0][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][0]], _state_noise, _var_noise);



              noStroke();
              fill(c_bkg);
              FS_drawShape([this.node_baseTower_stairs[i][j][this.node_baseTower_stairs[i][j].length-1][0], this.node_baseTower_stairs[i][j][this.node_baseTower_stairs[i][j].length-1][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][0]]);
              fill(c_bkg);
              for (let k=1; k<this.node_baseTower_stairs[i][j].length; k++) {
                FS_drawShape(this.node_baseTower_stairs[i][j][k]);
                FS_drawShape([this.node_baseTower_stairs[i][j][k][3], this.node_baseTower_stairs[i][j][k][2], this.node_baseTower_stairs[i][j][k-1][1], this.node_baseTower_stairs[i][j][k-1][0]]);
              }
              FS_drawShape([this.node_baseTower_stairs_d[i][j][0][0], this.node_baseTower_stairs_d[i][j][0][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][1], this.node_baseTower_stairs_d[i][j][this.node_baseTower_stairs_d[i][j].length-1][0]]);
              for (let k=0; k<this.node_baseTower_stairs_d[i][j].length-1; k++) {
                FS_drawShape([this.node_baseTower_stairs_d[i][j][k][1], this.node_baseTower_stairs[i][j][k][1], this.node_baseTower_stairs[i][j][k+1][2], this.node_baseTower_stairs[i][j][k+1][1], this.node_baseTower_stairs_d[i][j][k+1][1]]);
              }
            }
          }
        }
      } else if (state_baseTower == 5) {
        for (let i=0; i<this.node_baseTower.length; i++) {
          if (_index_floor == i) {
            noFill();
            stroke(c_dark);
            strokeWeight(real(2));
            //drawCylinder_info(this.node_baseTower[i]);
            for (let j=0; j<this.node_baseTower[i].length; j++) {
              if (j == 0) {
                for (let k=0; k<this.node_baseTower[i][j].length; k++) {
                  FS_drawLine(this.node_baseTower[i][j][k], this.node_baseTower[i][j+1][k], _state_noise, _var_noise);
                }
                FS_drawEllipse(this.node_baseTower[i][0], _state_noise, _var_noise);
              }
            }

            noStroke();
            fill(c_bkg);
            drawCylinder_TRIANGLES(this.node_baseTower[i]);
            FS_drawShape(this.node_baseTower[i][1]);



            noFill();
            stroke(c_dark);
            strokeWeight(real(1));
            //drawCylinder_info(this.node_baseTower_eaves[i]);
            for (let j=0; j<this.node_baseTower_eaves[i].length; j++) {
              if (j == 0  ||  j == this.node_baseTower_eaves[i].length-1) {
                FS_drawEllipse(this.node_baseTower_eaves[i][j], _state_noise, _var_noise);
              }
              for (let k=0; k<this.node_baseTower_eaves[i][j].length; k++) {
                if (j < this.node_baseTower_eaves[i].length-1) {
                  FS_drawLine(this.node_baseTower_eaves[i][j][k], this.node_baseTower_eaves[i][j+1][k], _state_noise, _var_noise);
                }
              }
            }

            noStroke();
            fill(c_bkg);
            //drawCylinder_TRIANGLES(this.node_baseTower_eaves[i]);
            FS_drawShape(this.node_baseTower_eaves[i][0]);
            beginShape(TRIANGLES);
            texture(this.EAVES);
            for (let j=0; j<this.node_baseTower_eaves[i].length-1; j++) {
              for (let k=0; k<this.node_baseTower_eaves[i][j].length; k++) {
                TRIANGLES_getRect_uv(this.node_baseTower_eaves[i][j][k], this.node_baseTower_eaves[i][j+1][k], this.node_baseTower_eaves[i][j+1][(k+1)%this.num_face_baseTower], this.node_baseTower_eaves[i][j][(k+1)%this.num_face_baseTower], 
                  createVector(map(j, 0, this.node_baseTower_eaves[i].length-1, 1-0.125, 1), map(j, 0, this.node_baseTower_eaves[i].length-1, 0, 1)), 
                  createVector(map(j+1, 0, this.node_baseTower_eaves[i].length-1, 1-0.125, 1), map(j+1, 0, this.node_baseTower_eaves[i].length-1, 0, 1)), 
                  createVector(map(j+1, 0, this.node_baseTower_eaves[i].length-1, 0.125, 0), map(j+1, 0, this.node_baseTower_eaves[i].length-1, 0, 1)), 
                  createVector(map(j, 0, this.node_baseTower_eaves[i].length-1, 0.125, 0), map(j, 0, this.node_baseTower_eaves[i].length-1, 0, 1)));
              }
            }
            endShape();
            fill(255);


            noFill();
            stroke(c_dark);
            strokeWeight(real(2));
            for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
              drawCylinder_LINES(this.node_baseTower_pillar[i][j], 0, _state_noise, _var_noise);
              FS_drawEllipse(this.node_baseTower_pillar[i][j][0], _state_noise, _var_noise);
            }
            noStroke();
            fill(c_bkg);
            for (let j=0; j<this.node_baseTower_pillar[i].length; j++) {
              drawCylinder_TRIANGLES(this.node_baseTower_pillar[i][j]);
            }




            for (let j=0; j<this.node_baseTower_fence_pillar[i].length; j++) {
              noFill();
              stroke(c_dark);
              strokeWeight(real(1.5));
              drawCylinder_LINES(this.node_baseTower_fence_pillar[i][j], 0, _state_noise, _var_noise);
              FS_drawEllipse(this.node_baseTower_fence_pillar[i][j][0], _state_noise, _var_noise);
              FS_drawEllipse(this.node_baseTower_fence_pillar[i][j][1], _state_noise, _var_noise);

              noStroke();
              fill(c_bkg);
              drawCylinder_TRIANGLES(this.node_baseTower_fence_pillar[i][j]);
            }

            if (i > 0) {
              for (let j=0; j<this.node_baseTower_fence[i].length; j++) {
                for (let k=0; k<this.node_baseTower_fence[i][j].length; k++) {
                  noFill();
                  stroke(c_dark);
                  strokeWeight(real(1.5));
                  if (p5.Vector.dist(screenPosition(this.node_baseTower_fence[i][j][k][0][0]), screenPosition(this.node_baseTower_fence[i][j][k][0][floor(this.node_baseTower_fence[i][j][k][0].length/4*2)]))   >   
                    p5.Vector.dist(screenPosition(this.node_baseTower_fence[i][j][k][0][floor(this.node_baseTower_fence[i][j][k][0].length/4*1)]), screenPosition(this.node_baseTower_fence[i][j][k][0][floor(this.node_baseTower_fence[i][j][k][0].length/4*3)]))) {
                    drawCylinder_LINES(this.node_baseTower_fence[i][j][k], 0, _state_noise, _var_noise);
                  } else {
                    drawCylinder_LINES(this.node_baseTower_fence[i][j][k], 1, _state_noise, _var_noise);
                  }

                  noStroke();
                  fill(c_bkg);
                  drawCylinder_TRIANGLES(this.node_baseTower_fence[i][j][k]);
                }
              }
            }
          }
        }
      }
    }
  };








  this.display_base = function() {
    let _state_noise = 0;
    //if (state_arrange == 2) {
      _state_noise = state_noise;
    //}
    let _var_noise = this.num_num_sign;

    stroke(c_dark);
    strokeWeight(var_weight);
    noFill();
    for (let ii=0; ii<1; ii++) {
      for (let i=0; i<this.node_base[ii].length; i++) {
        for (let j=0; j<this.node_base[ii][i].length; j++) {
          FS_drawLine(this.node_base[ii][i][j], this.node_base[ii][i][(j+1)%this.node_base[ii][i].length], _state_noise, _var_noise);
        }
      }
      drawCylinder_LINES(this.node_base[ii], 0, _state_noise, _var_noise);
    }

    noStroke();
    fill(c_bkg);
    FS_drawShape(this.node_base[0][1]);

    fill(c_dark);
    drawCylinder_TRIANGLES(this.node_base[0]);
  };










  this.display_cover_u = function() {
    let _state_noise = 0;
    //if (state_arrange == 2) {
      _state_noise = state_noise;
    //}
    let _var_noise = this.num_num_sign;

    stroke(c_dark);
    strokeWeight(var_weight);
    noFill();
    for (let i=0; i<this.node_cover_u.length; i++) {
      for (let j=0; j<this.node_cover_u[i].length; j++) {
        FS_drawLine(this.node_cover_u[i][j], this.node_cover_u[i][(j+1)%this.node_cover_u[i].length], _state_noise, _var_noise);
      }
    }
    drawCylinder_LINES(this.node_cover_u, 0, _state_noise, _var_noise);

    noStroke();
    fill(c_bkg);
    FS_drawShape(this.node_cover_u[1]);
    fill(c_dark);
    drawCylinder_TRIANGLES(this.node_cover_u);


    fill(c_bkg);
    noStroke();
    drawCylinder_TRIANGLES(this.node_sign_pillar[this.node_sign_pillar.length-1]);

    stroke(c_dark);
    strokeWeight(var_weight*2);
    noFill();
    drawCylinder_LINES(this.node_sign_pillar[this.node_sign_pillar.length-1], 0, _state_noise, _var_noise);
    FS_drawEllipse(this.node_sign_pillar[this.node_sign_pillar.length-1][this.node_sign_pillar[0].length-1], _state_noise, _var_noise);

    fill(c_dark);
    TRIANGLES_getShape(this.node_sign_hole[this.node_sign_hole.length-1]);
  };






  this.display_object = function(_ii) {
    let _state_noise = state_noise;
    let _var_noise = this.num_num_sign;

    for (let i=0; i<this.object[_ii].length; i++) {
      this.object[_ii][i].display(_state_noise, _var_noise);
    }
  };









  this.display_red = function() {
    let _state_noise = 0;
    let _var_noise = this.num_num_sign;

    stroke(c_dark);
    strokeWeight(var_weight*(1.5));
    noFill();
    for (let i=0; i<this.node_sign.length; i++) {
      FS_drawEllipse(this.node_sign[i], _state_noise, _var_noise);
    }

    noStroke();
    for (let i=0; i<this.node_sign.length; i++) {
      let _uv = new Array(this.node_sign[i].length);
      for (let j=0; j<_uv.length; j++) {
        let x = map(cos(map(j, 0, _uv.length, 0, TWO_PI)), -1, 1, 0, 1);
        let y = map(sin(map(j, 0, _uv.length, 0, TWO_PI)), -1, 1, 0, 1);

        _uv[j] = createVector(x, y);
      }
      FS_drawShape_texture(this.node_sign[i], _uv, this.SIGN[i], 2);
    }
  };







  this.display_ground = function() {
    let _state_noise = 0;
    if (state_arrange == 2) {
      _state_noise = state_noise;
    }
    let _var_noise = this.num_num_sign;

    if (this.state_ground == 1) {
      noFill();
      stroke(c_dark);
      strokeWeight(var_weight*(0.5));
      for (let i=0; i<this.node_grass.length; i++) {
        for (let j=0; j<this.node_grass[i].length; j++) {
          for (let k=0; k<this.node_grass[i][j].length-1; k++) {
            FS_drawLine(this.node_grass[i][j][k], this.node_grass[i][j][k+1], _state_noise, _var_noise);
          }
        }
      }
    } else if (this.state_ground == 2) {
      noFill();
      for (let i=0; i<this.node_web.length; i++) {
        for (let j=0; j<this.node_web[i].length-1; j++) {
          let w_max = sin(map(i, -1, this.node_web.length, 0, PI)) * real(1);
          let c_max = lerpColor(c_bkg, c_dark, sin(map(i, -1, this.node_web.length, 0, PI)));
          stroke(lerpColor(c_bkg, c_max, constrain(sin(map(j, -1, this.node_web[i].length-1, 0, PI)), 0, 1)));
          strokeWeight(lerp(0, w_max, constrain(sin(map(j, -1, this.node_web[i].length-1, 0, PI)), 0, 1)));
          FS_drawLine(this.node_web[i][j], this.node_web[i][j+1], _state_noise, _var_noise);
        }
      }
      for (let i=0; i<this.node_web.length-1; i++) {
        for (let j=0; j<this.node_web[i].length; j++) {
          let w_max = sin(map(j, -1, this.node_web[i].length, 0, PI)) * real(1);
          let c_max = lerpColor(c_bkg, c_dark, sin(map(j, -1, this.node_web[i].length, 0, PI)));
          stroke(lerpColor(c_bkg, c_max, constrain(sin(map(i, -1, this.node_web.length-1, 0, PI)), 0, 1)));
          strokeWeight(lerp(0, w_max, constrain(sin(map(i, -1, this.node_web.length-1, 0, PI)), 0, 1)));
          FS_drawLine(this.node_web[i][j], this.node_web[i+1][j], _state_noise, _var_noise);
        }
      }
    }
  };






  this.displayInfo = function() {
  };
}
