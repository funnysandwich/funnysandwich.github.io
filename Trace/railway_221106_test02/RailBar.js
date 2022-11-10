function RailBar(begin_l, end_l, begin_r, end_r, index, count) {
  this.ran = random(-999, 999);
  this.begin_l = begin_l.copy();
  this.end_l = end_l.copy();
  this.begin_r = begin_r.copy();
  this.end_r = end_r.copy();
  this.dead = false;
  this.open_show = false;
  this.index = index;
  this.count = count;

  this.num = floor(random(4, 8));

  this.life = Z_beginLine;
  //this.lifeSpan = 0;

  this.node_l = new Array(this.num);
  this.node_r = new Array(this.num);
  for (let i=0; i<this.num; i++) {
    this.node_l[i] = this.begin_l.copy();
    this.node_r[i] = this.begin_r.copy();
  }


  this.node_l_ver = Array.from(Array(7), () => new Array(2));
  this.node_r_ver = Array.from(Array(7), () => new Array(2));
  for (let i=0; i<this.node_l_ver.length; i++) {
    for (let j=0; j<this.node_l_ver[i].length; j++) {
      this.node_l_ver[i][j] = this.begin_l.copy();
      this.node_r_ver[i][j] = this.begin_r.copy();
    }
  }





  this.ground = [];
  if (state_ground == 0  ||  state_ground == 1  ||  state_ground == 2  ||  state_ground == 3) {
    let num = 50;
    if (state_ground == 1) {
      num = 100;
    } else if (state_ground == 2) {
      num = 30;
    } else if (state_ground == 3) {
      num = 8;
    }
    this.ground = new Array(num);
    for (let i=0; i<this.ground.length; i++) {
      if (state_ground == 0  ||  state_ground == 1  ||  state_ground == 2) {
        this.ground[i] = new Ground(this.begin_l);
      } else if (state_ground == 3) {
        this.ground[i] = new Grass(this.begin_l, createVector(10, 25));
      }
    }
  }






  this.have_board = true;
  for (let i=0; i<5; i++) {
    if (this.index > i  &&  rail.railBar[rail.railBar.length-(i+1)].have_board  &&  rail.railBar[rail.railBar.length-(i+1)].board.floor_H > i+1) {
      this.have_board = false;
    }
  }

  if (this.have_board) {
    this.board = new Board(this.node_l_ver[0][0]);
  }











  this.have_pole_l = state_pole_l != 0;
  this.have_pole_r = state_pole_r != 0;

  if (state_pole_l == 1) {
    this.gap_railBar_l = 2;
  } else if (state_pole_l == 2) {
    this.gap_railBar_l = 8;
  } else if (state_pole_l == 3) {
    this.gap_railBar_l = 4;
  } else if (state_pole_l == 4) {
    this.gap_railBar_l = 8;
  }
  if (state_pole_r == 1) {
    this.gap_railBar_r = 2;
  } else if (state_pole_r == 2) {
    this.gap_railBar_r = 8;
  } else if (state_pole_r == 3) {
    this.gap_railBar_r = 4;
  } else if (state_pole_r == 4) {
    this.gap_railBar_r = 8;
  }

  if (state_pole_l == 1  ||  state_pole_l == 2  ||  state_pole_l == 3  ||  state_pole_l == 4) {
    if (this.count % this.gap_railBar_l != 0) {
      this.have_pole_l = false;
    }
  }
  if (state_pole_r == 1  ||  state_pole_r == 2  ||  state_pole_r == 3  ||  state_pole_r == 4) {
    if (this.count % this.gap_railBar_r != 0) {
      this.have_pole_r = false;
    }
  }



  if (this.have_pole_l) {
    if (state_pole_l == 1) {
      this.pole_l = new Pole(this.begin_l, this.end_l, true, this.count, this.gap_railBar_l);
    } else if (state_pole_l == 2) {
      this.pole_l = new TelePole(this.begin_l, this.end_l, true, this.count, this.gap_railBar_l);
    } else if (state_pole_l == 3) {
      this.pole_l = new Partition(this.begin_l, this.end_l, true, this.count, this.gap_railBar_l);
    } else if (state_pole_l == 4) {
      this.pole_l = new Pillar(this.begin_l, this.end_l, true, this.count, this.gap_railBar_l);
    }
  }
  if (this.have_pole_r) {
    if (state_pole_r == 1) {
      this.pole_r = new Pole(this.begin_r, this.end_r, false, this.count, this.gap_railBar_r);
    } else if (state_pole_r == 2) {
      this.pole_r = new TelePole(this.begin_r, this.end_r, false, this.count, this.gap_railBar_r);
    } else if (state_pole_r == 3) {
      this.pole_r = new Partition(this.begin_r, this.end_r, false, this.count, this.gap_railBar_r);
    } else if (state_pole_r == 4) {
      this.pole_r = new Pillar(this.begin_r, this.end_r, false, this.count, this.gap_railBar_r);
    }
  }






  this.have_landscape_l = state_landscape_l != 0;
  this.have_landscape_r = state_landscape_r != 0;


  if (this.have_landscape_l) {
    if (state_landscape_l == 1) {
      this.landscape_l = new Sea(this.begin_l, this.end_l, true, this.count);
    } else if (state_landscape_l == 2) {
      this.landscape_l = new Forest(this.begin_l, this.end_l, true);
    } else if (state_landscape_l == 3) {
      this.landscape_l = new LS_Grass(this.begin_l, this.end_l, true, this.count, createVector(100, 200));
    }
  }

  if (this.have_landscape_r) {
    if (state_landscape_r == 1) {
      this.landscape_r = new Sea(this.begin_r, this.end_r, false, this.count);
    } else if (state_landscape_r == 2) {
      this.landscape_r = new Forest(this.begin_r, this.end_r, false);
    } else if (state_landscape_r == 3) {
      this.landscape_r = new LS_Grass(this.begin_r, this.end_r, false, this.count, createVector(100, 200));
    }
  }














  this.have_wall_l = state_wall_l == 1;
  this.have_wall_r = state_wall_r == 1;

  if (this.count % 3 != 0) {
    this.have_wall_l = false;
    this.have_wall_r = false;
  }

  if (this.have_wall_l) {
    this.wall_l = new Wall(this.begin_l, this.end_l, true, this.count, floor(this.count/3));
  }
  if (this.have_wall_r) {
    this.wall_r = new Wall(this.begin_r, this.end_r, true, this.count, floor(this.count/3));
  }



























  this.update = function(index) {
    this.index = index;


    this.life += speed;
    for (let i=0; i<this.num; i++) {
      this.node_l[i] = p5.Vector.sub(this.end_l, this.begin_l).setMag(this.life).add(this.begin_l);
      this.node_r[i] = p5.Vector.sub(this.end_r, this.begin_r).setMag(this.life).add(this.begin_r);
    }
    for (let i=0; i<this.node_l_ver.length; i++) {
      this.node_l_ver[i][0] = p5.Vector.sub(this.end_l, this.begin_l).setMag(this.life).add(this.begin_l);
      this.node_r_ver[i][0] = p5.Vector.sub(this.end_r, this.begin_r).setMag(this.life).add(this.begin_r);
      this.node_l_ver[i][1] = p5.Vector.sub(this.end_l, this.begin_l).setMag(this.life+real(150)).add(this.begin_l);
      this.node_r_ver[i][1] = p5.Vector.sub(this.end_r, this.begin_r).setMag(this.life+real(150)).add(this.begin_r);
    }


    if (this.life > skyline.z) {
      this.open_show = true;
    }
    if (p5.Vector.sub(this.end_l, this.node_l[0]).z < -real(150)) {
      this.open_show = false;
    }
    if (p5.Vector.sub(this.end_l, this.node_l[0]).z < -real(150)*10) {
      this.dead = true;
    }




    if (this.have_board) {
      if (this.board.is_I) {
        this.board.update(this.node_r[0]);
      } else {
        this.board.update(this.node_l[0]);
      }
    }





    for (let i=0; i<this.num; i++) {
      let w_ran = real(40);
      this.node_l[i].x += -real(40)+map(noise(this.ran+i), 0, 1, -w_ran/2.0, w_ran/2.0);
      this.node_l[i].y += map(noise(this.ran+i+833), 0, 1, -w_ran*0.5, 0);
      this.node_l[i].z += map(noise(this.ran+i+123), 0, 1, -w_ran*0.75, w_ran*0.75);
      this.node_r[i].x += real(40)+map(noise(this.ran+i+45), 0, 1, -w_ran/2.0, w_ran/2.0);
      this.node_r[i].y += map(noise(this.ran+i+833), 0, 1, -w_ran*0.5, 0);
      this.node_r[i].z += map(noise(this.ran+i+8), 0, 1, -w_ran*0.75, w_ran*0.75);
    }



    for (let i=0; i<this.node_l_ver.length; i++) {
      for (let j=0; j<this.node_l_ver[i].length; j++) {
        let w_ran = real(55);
        this.node_l_ver[i][j].x += map(noise(this.ran+i+j), 0, 1, -w_ran/2.0, w_ran/2.0);
        this.node_l_ver[i][j].y += map(noise(this.ran+i+j+833), 0, 1, -w_ran*1, 0);
        this.node_r_ver[i][j].x += map(noise(this.ran+i+j+45), 0, 1, -w_ran/2.0, w_ran/2.0);
        this.node_r_ver[i][j].y += map(noise(this.ran+i+j+833), 0, 1, -w_ran*1, 0);
      }
    }




    if (this.ground.length > 0) {
      for (let i=0; i<this.ground.length; i++) {
        let z = map(noise(this.ran*2+i*10), 0.25, 0.75, this.node_l_ver[0][0].z, this.node_l_ver[0][1].z);
        if (state_ground == 1) {
          z = map(noise(this.ran*2+i*10), 0.29, 0.71, this.node_l_ver[0][0].z, this.node_l_ver[0][1].z);
        }
        let x = map(noise(this.ran*2+i*20+777), 0.4, 0.6, this.node_l_ver[0][0].x, this.node_r_ver[0][0].x);
        let y = map(z, this.begin_l.z, this.end_l.z, this.begin_l.y, this.end_l.y);

        if (state_ground == 2) {
          this.ground[i].railBar_node_l_ver_begin = this.node_l_ver[0][0].copy();
          this.ground[i].railBar_node_r_ver_begin = this.node_r_ver[0][0].copy();
          this.ground[i].railBar_node_l_ver_end = this.node_l_ver[0][1].copy();
          this.ground[i].railBar_node_r_ver_end = this.node_r_ver[0][1].copy();
        } else if (state_ground == 3) {
          for (let j=0; j<this.ground[i].H_ori.length; j++) {
            this.ground[i].H_ori[j] = real(lerp(8, 12, noise(this.ran*88+i*13+j*85))) * map(abs(x-(this.node_l[0].x+this.node_r[0].x)/2.0), 0, abs(this.node_l[0].x-this.node_r[0].x)/2.0, 0.5, 2);
          }
        }

        this.ground[i].update(createVector(x, y, z));
      }
    }






    if (this.have_pole_l) {
      let x = real(300);
      if (state_pole_l == 4) {
        x = real(275);
      }

      if (this.index > this.gap_railBar_l-1) {
        this.pole_l.update(this.node_l_ver[0][0].copy().add(-x, 0, 0), rail.railBar[this.index-this.gap_railBar_l].node_l_ver[0][0].copy().add(-x, 0, 0), this.index);
      } else {
        this.pole_l.update(this.node_l_ver[0][0].copy().add(-x, 0, 0), this.node_l_ver[0][1].copy().add(-x, 0, 0), this.index);
      }
    }

    if (this.have_pole_r) {
      let x = real(300);
      if (state_pole_r == 4) {
        x = real(275);
      }
      if (this.index > this.gap_railBar_r-1) {
        this.pole_r.update(this.node_r_ver[0][0].copy().add(x, 0, 0), rail.railBar[this.index-this.gap_railBar_r].node_r_ver[0][0].copy().add(x, 0, 0), this.index);
      } else {
        this.pole_r.update(this.node_r_ver[0][0].copy().add(x, 0, 0), this.node_r_ver[0][1].copy().add(x, 0, 0), this.index);
      }
    }





    if (this.have_landscape_l) {
      let x = real(350);
      if (state_landscape_l == 2) {
        x = real(375);
      } else if (state_landscape_l == 3) {
        if (state_pole_l == 3) {
          x = real(425);
        }
      }
      if (this.index > 0) {
        this.landscape_l.update(this.node_l_ver[0][0].copy().add(-x, 0, 0), rail.railBar[this.index-1].node_l_ver[0][0].copy().add(-x, 0, 0));
      } else {
        this.landscape_l.update(this.node_l_ver[0][0].copy().add(-x, 0, 0), this.node_l_ver[0][1].copy().add(-x, 0, 0));
      }
    }
    if (this.have_landscape_r) {
      let x = real(350);
      if (state_landscape_r == 2) {
        x = real(375);
      } else if (state_landscape_r == 3) {
        if (state_pole_r == 3) {
          x = real(425);
        }
      }
      if (this.index > 0) {
        this.landscape_r.update(this.node_r_ver[0][0].copy().add(x, 0, 0), rail.railBar[this.index-1].node_r_ver[0][0].copy().add(x, 0, 0));
      } else {
        this.landscape_r.update(this.node_r_ver[0][0].copy().add(x, 0, 0), this.node_r_ver[0][1].copy().add(x, 0, 0));
      }
    }








    if (this.have_wall_l) {
      if (this.index > 2) {
        this.wall_l.update(this.node_l_ver[0][0].copy().add(-real(265), 0, 0), rail.railBar[this.index-3].node_l_ver[0][0].copy().add(-real(265), 0, 0), this.index);
      } else {
        this.wall_l.update(this.node_l_ver[0][0].copy().add(-real(265), 0, 0), this.node_l_ver[0][1].copy().add(-real(265), 0, 0), this.index);
      }
    }
    if (this.have_wall_r) {
      if (this.index > 2) {
        this.wall_r.update(this.node_r_ver[0][0].copy().add(real(265), 0, 0), rail.railBar[this.index-3].node_r_ver[0][0].copy().add(real(265), 0, 0), this.index);
      } else {
        this.wall_r.update(this.node_r_ver[0][0].copy().add(real(265), 0, 0), this.node_r_ver[0][1].copy().add(real(265), 0, 0), this.index);
      }
    }
  };









  this.update_rotate = function() {
    for (let i=0; i<this.num; i++) {
      this.node_l[i] = PRotateX(this.node_l[i], roX);
      this.node_r[i] = PRotateX(this.node_r[i], roX);
      this.node_l[i].add(0, tranY, tranZ);
      this.node_r[i].add(0, tranY, tranZ);
    }
    for (let i=0; i<this.node_l_ver.length; i++) {
      for (let j=0; j<this.node_l_ver[i].length; j++) {
        this.node_l_ver[i][j] = PRotateX(this.node_l_ver[i][j], roX);
        this.node_r_ver[i][j] = PRotateX(this.node_r_ver[i][j], roX);
        this.node_l_ver[i][j].add(0, tranY, tranZ);
        this.node_r_ver[i][j].add(0, tranY, tranZ);
      }
    }

    if (this.have_pole_l) {
      this.pole_l.update_rotate();
    }
    if (this.have_pole_r) {
      this.pole_r.update_rotate();
    }
  };







  this.display = function() {
    if (this.open_show) {
      for (let i=0; i<this.num; i++) {
        fill(lerpColor(c_far, c_near, map(this.node_l[i].z, this.begin_l.z, this.end_l.z, 0, 1)));
        TRIANGLES_getLine_weight_Y(this.node_l[i], this.node_r[i], real(1));
      }

      for (let i=0; i<this.node_l_ver.length; i++) {
        let c1 = lerpColor(c_far, c_near, map(this.node_l_ver[i][0].z, this.begin_l.z, this.end_l.z, 0, 1));
        let c2 = lerpColor(c_far, c_near, map(this.node_l_ver[i][1].z, this.begin_l.z, this.end_l.z, 0, 1));
        TRIANGLES_getLine_weight_fill2(this.node_l_ver[i][0], this.node_l_ver[i][1], real(1), c1, c2);
        c1 = lerpColor(c_far, c_near, map(this.node_r_ver[i][0].z, this.begin_r.z, this.end_r.z, 0, 1));
        c2 = lerpColor(c_far, c_near, map(this.node_r_ver[i][1].z, this.begin_r.z, this.end_r.z, 0, 1));
        TRIANGLES_getLine_weight_fill2(this.node_r_ver[i][0], this.node_r_ver[i][1], real(1), c1, c2);
      }


      if (this.ground.length > 0) {
        if (this.ground.length > 0) {
          for (let i=0; i<this.ground.length; i++) {
            this.ground[i].display();
          }
        }
      }







      if (this.have_board) {
        this.board.display();
      }



      if (this.have_pole_l) {
        this.pole_l.display();
      }
      if (this.have_pole_r) {
        this.pole_r.display();
      }



      if (this.have_landscape_l) {
        this.landscape_l.display();
      }
      if (this.have_landscape_r) {
        this.landscape_r.display();
      }




      if (this.have_wall_l) {
        this.wall_l.display();
      }
      if (this.have_wall_r) {
        this.wall_r.display();
      }
    } else {
      if (this.have_pole_l  &&  state_pole_l == 2) {
        this.pole_l.display();
      }
      if (this.have_pole_r  &&  state_pole_r == 2) {
        this.pole_r.display();
      }
    }
  };









  this.displayInfo = function() {
    if (this.open_show) {
      LINES_getLine(this.node_l[0], this.node_r[0]);
      LINES_getLine(this.node_l_ver[0][0], this.node_l_ver[0][1]);
      LINES_getLine(this.node_r_ver[0][0], this.node_r_ver[0][1]);



      if (this.ground.length > 0) {
        if (this.ground.length > 0) {
          for (let i=0; i<this.ground.length; i++) {
            this.ground[i].displayInfo();
          }
        }
      }

      if (this.have_board) {
        this.board.displayInfo();
      }

      if (this.have_pole_l) {
        this.pole_l.displayInfo();
        print(this.index);
      }
      if (this.have_pole_r) {
        this.pole_r.displayInfo();
      }


      if (this.have_landscape_l) {
        this.landscape_l.displayInfo();
      }
      if (this.have_landscape_r) {
        this.landscape_r.displayInfo();
      }


      if (this.have_wall_l) {
        this.wall_l.displayInfo();
      }
      if (this.have_wall_r) {
        this.wall_r.displayInfo();
      }
    } else {
      if (this.have_pole_l  &&  state_pole_l == 2) {
        this.pole_l.displayInfo();
      }
      if (this.have_pole_r  &&  state_pole_r == 2) {
        this.pole_r.displayInfo();
      }
    }
  };
}
