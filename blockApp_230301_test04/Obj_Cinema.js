function Cinema(center_d, W_room, D_room, H_room) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();



  this.node_stairs = Array.from(Array(4), () => new Array(4));
  for (let i=0; i<this.node_stairs.length; i++) {
    for (let j=0; j<this.node_stairs[i].length; j++) {
      this.node_stairs[i][j] = this.center_d.copy();
    }
  }
  this.node_stairs_d_l = this.center_d.copy();
  this.node_stairs_d_r = this.center_d.copy();





  this.chair = [];























  this.update = function() {
    for (let i=0; i<this.node_stairs.length; i++) {
      let d = (D_room*1.25) / this.node_stairs.length;
      let y = -real(5) * i;
      let z = -D_room/2 + d/2 + d*(this.node_stairs.length-1-i);
      for (let j=0; j<this.node_stairs[i].length; j++) {
        this.node_stairs[i][j] = createVector(W_room/2.0 * pow(-1, ceil(j%1.5)+1), y, z + d/2.0 * pow(-1, floor(j/2)+1));
        this.node_stairs[i][j].add(this.center_d);
      }
    }
    this.node_stairs_d_r = createVector(this.node_stairs[0][1].x, this.node_stairs[0][1].y, this.node_stairs[this.node_stairs.length-1][1].z);
    this.node_stairs_d_l = createVector(this.node_stairs[0][0].x, this.node_stairs[0][0].y, this.node_stairs[this.node_stairs.length-1][0].z);


    //this.chair.push(new CinemaChair(this.center_d.copy().add(0, -real(5)*2, 0), real(22), true, true));
    for (let i=0; i<this.node_stairs.length-1; i++) {
      for (let j=0; j<3; j++) {
        let w = real(22);
        let x = -(w*3 - (w*0.15)*(3-1))/2 + w/2 + (w-w*0.15)*j;
        let y = -real(5) * (this.node_stairs.length-1-1-i+1);
        let z = -D_room/2 +  ((D_room*1.25) / this.node_stairs.length)*i + ((D_room*1.25) / this.node_stairs.length)*0.55;
        this.chair.push(new CinemaChair(this.center_d.copy().add(x, y, z), w, j == 0, true));
      }
    }

    for (let i=0; i<this.chair.length; i++) {
      this.chair[i].update();
    }
  };
























  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    for (let i=1; i<this.node_stairs.length; i++) {
      FS_drawShape(this.node_stairs[i]);
      FS_drawShape([this.node_stairs[i][3], this.node_stairs[i][2], this.node_stairs[i-1][1], this.node_stairs[i-1][0]]);
      FS_drawShape([this.node_stairs_d_r, this.node_stairs[i][1], this.node_stairs[i][2]]);
      FS_drawShape([this.node_stairs_d_r, this.node_stairs[i][2], this.node_stairs[i-1][1]]);
      FS_drawShape([this.node_stairs_d_l, this.node_stairs[i][0], this.node_stairs[i][3]]);
      FS_drawShape([this.node_stairs_d_l, this.node_stairs[i][3], this.node_stairs[i-1][0]]);
    }


    noFill();
    strokeWeight(var_weight*(1));
    stroke(c_dark);
    for (let i=1; i<this.node_stairs.length; i++) {
      FS_drawEllipse(this.node_stairs[i], _state_noise, _var_noise);
    }
    FS_drawLine(this.node_stairs[0][0], this.node_stairs[0][1], _state_noise, _var_noise);

    for (let i=1; i<this.node_stairs.length; i++) {
      FS_drawLine(this.node_stairs[i][3], this.node_stairs[i-1][0], _state_noise, _var_noise);
      FS_drawLine(this.node_stairs[i][2], this.node_stairs[i-1][1], _state_noise, _var_noise);
    }


    FS_drawLine(this.node_stairs_d_r, this.node_stairs[this.node_stairs.length-1][1], _state_noise, _var_noise);
    FS_drawLine(this.node_stairs_d_r, this.node_stairs[0][1], _state_noise, _var_noise);
    FS_drawLine(this.node_stairs_d_l, this.node_stairs[this.node_stairs.length-1][0], _state_noise, _var_noise);
    FS_drawLine(this.node_stairs_d_l, this.node_stairs[0][0], _state_noise, _var_noise);






    for (let i=0; i<this.chair.length; i++) {
      this.chair[i].display(_state_noise, _var_noise);
    }
  };
}






















function CinemaChair(center_d, W, show_side_l, show_side_r) {
  this.center_d = center_d.copy();
  this.W_side = W * 0.15;
  this.W_seat = W - this.W_side*2 - real(1);
  this.D_seat = this.W_seat * 0.9;
  this.H_seat = W * 0.45;
  this.T_seat = this.W_seat * 0.2;
  this.T_back = W * 0.125;
  this.H_back = W * 0.75;


  this.node_seat = Array.from(Array(4), () => new Array(4));
  for (let i=0; i<this.node_seat.length; i++) {
    for (let j=0; j<this.node_seat[i].length; j++) {
      this.node_seat[i][j] = this.center_d.copy();
    }
  }
  this.node_side = new Array(2);
  for (let i=0; i<this.node_side.length; i++) {
    this.node_side[i] = Array.from(Array(4), () => new Array(4));
    for (let j=0; j<this.node_side[i].length; j++) {
      for (let k=0; k<this.node_side[i][j].length; k++) {
        this.node_side[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_back = Array.from(Array(3), () => new Array(4));
  for (let i=0; i<this.node_back.length; i++) {
    for (let j=0; j<this.node_back[i].length; j++) {
      this.node_back[i][j] = this.center_d.copy();
    }
  }
  this.node_leg = new Array(2);
  for (let i=0; i<this.node_leg.length; i++) {
    this.node_leg[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_leg[i].length; j++) {
      for (let k=0; k<this.node_leg[i][j].length; k++) {
        this.node_leg[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_base = new Array(2);
  for (let i=0; i<this.node_base.length; i++) {
    this.node_base[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_base[i].length; j++) {
      for (let k=0; k<this.node_base[i][j].length; k++) {
        this.node_base[i][j][k] = this.center_d.copy();
      }
    }
  }








  this.update = function() {
    for (let i=0; i<this.node_seat.length; i++) {
      let y = -this.H_seat;
      let d = this.D_seat;
      if (i == 1) {
        y = -this.H_seat -this.T_seat*0.4;
        d = this.D_seat;
      } else if (i == 2) {
        y = -this.H_seat -this.T_seat*0.8;
        d = this.D_seat * 0.95;
      } else if (i == 3) {
        y = -this.H_seat -this.T_seat;
        d = this.D_seat * 0.8;
      }
      let z = -this.D_seat/2 + d/2;
      for (let j=0; j<this.node_seat[i].length; j++) {
        this.node_seat[i][j] = createVector(this.W_seat/2.0 * pow(-1, ceil(j%1.5)+1), y, z + d/2.0 * pow(-1, floor(j/2)+1)).add(this.center_d);
      }
    }


    for (let i=0; i<this.node_side.length; i++) {
      let x = (this.W_seat/2 + real(0.5) + this.W_side/2) * pow(-1, i+1);
      for (let j=0; j<this.node_side[i].length; j++) {
        let y = -this.H_seat + this.H_seat*0.4;
        let d = this.D_seat * 0.4;
        if (j == 1) {
          y = -this.H_seat - this.H_seat*0.1;
          d = this.D_seat * 0.75;
        } else if (j == 2) {
          y = -this.H_seat - this.H_seat*0.6;
          d = this.D_seat * 0.9;
        } else if (j == 3) {
          y = -this.H_seat - this.H_seat*0.7;
          d = this.D_seat * 0.9;
        }
        let z = -this.D_seat/2 - this.T_back + d/2;
        if (j == 1  ||  j == 0) {
          z += map(y, -this.H_seat + this.H_seat*0.3, -this.H_seat - this.H_seat*0.6, this.D_seat*0.125, 0);
        }
        for (let k=0; k<this.node_side[i][j].length; k++) {
          this.node_side[i][j][k] = createVector(x + this.W_side/2.0 * pow(-1, ceil(k%1.5)+1), y, z + d/2.0 * pow(-1, floor(k/2)+1)).add(this.center_d);
        }
      }
    }


    for (let i=0; i<this.node_back.length; i++) {
      let y = -this.H_seat-this.T_seat;
      let w = this.W_seat;
      let z = -this.D_seat/2 - this.T_back/2;
      if (i == 1) {
        y = -this.H_seat-this.T_seat-this.H_back*0.9;
      } else if (i == 2) {
        y = -this.H_seat-this.T_seat-this.H_back;
        w *= 0.8;
      }
      for (let j=0; j<this.node_back[i].length; j++) {
        this.node_back[i][j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), y, z + this.T_back/2.0 * pow(-1, floor(j/2)+1)).add(this.center_d);
      }
    }



    for (let i=0; i<this.node_leg.length; i++) {
      for (let j=0; j<this.node_leg[i].length; j++) {
        let w = this.W_side*0.75;
        let y = this.H_seat*0.6 - this.H_seat*0.6*j;
        for (let k=0; k<this.node_leg[i][j].length; k++) {
          this.node_leg[i][j][k] = createVector(w/2.0 * pow(-1, ceil(k%1.5)+1), y, w*0.5/2.0 * pow(-1, floor(k/2)+1));
          this.node_leg[i][j][k].add(p5.Vector.add(this.node_side[i][0][0], this.node_side[i][0][2]).mult(0.5));
        }
      }
    }

    for (let i=0; i<this.node_base.length; i++) {
      for (let j=0; j<this.node_base[i].length; j++) {
        let w = this.W_side*0.75;
        let y = -this.H_seat*0.05 * j;
        for (let k=0; k<this.node_base[i][j].length; k++) {
          this.node_base[i][j][k] = createVector(w/2.0 * pow(-1, ceil(k%1.5)+1), y, w*5/2.0 * pow(-1, floor(k/2)+1));
          this.node_base[i][j][k].add(p5.Vector.add(this.node_leg[i][0][0], this.node_leg[i][0][2]).mult(0.5));
        }
      }
    }
  };













  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    FS_drawShape(this.node_seat[this.node_seat.length-1]);
    for (let i=0; i<this.node_seat.length-1; i++) {
      if (i == 0) {
        fill(c_dark);
      } else {
        fill(c_bkg);
      }      
      for (let j=0; j<this.node_seat[i].length; j++) {
        FS_drawShape([this.node_seat[i][j], this.node_seat[i][(j+1)%4], this.node_seat[i+1][(j+1)%4], this.node_seat[i+1][j]]);
      }
    }

    for (let i=0; i<this.node_side.length; i++) {
      if ((i == 0  &&  show_side_l)  ||  (i == 1  &&  show_side_r)) {
        fill(c_bkg);
        FS_drawShape(this.node_side[i][this.node_side[i].length-1]);
        for (let j=0; j<this.node_side[i].length-1; j++) {
          for (let k=0; k<this.node_side[i][j].length; k++) {
            if (k == 2  &&  j < this.node_side[i].length-2) {
              fill(c_dark);
            } else {
              fill(c_bkg);
            }
            FS_drawShape([this.node_side[i][j][k], this.node_side[i][j][(k+1)%4], this.node_side[i][j+1][(k+1)%4], this.node_side[i][j+1][k]]);
          }
        }
      }
    }

    fill(c_bkg);
    for (let i=0; i<this.node_back.length-1; i++) {
      for (let j=0; j<this.node_back[i].length; j++) {
        FS_drawShape([this.node_back[i][j], this.node_back[i][(j+1)%4], this.node_back[i+1][(j+1)%4], this.node_back[i+1][j]]);
      }
    }
    FS_drawShape(this.node_back[this.node_back.length-1]);


    fill(c_dark);
    for (let i=0; i<this.node_leg.length; i++) {
      if ((i == 0  &&  show_side_l)  ||  (i == 1  &&  show_side_r)) {
        for (let j=0; j<this.node_leg[i].length-1; j++) {
          for (let k=0; k<this.node_leg[i][j].length; k++) {
            FS_drawShape([this.node_leg[i][j][k], this.node_leg[i][j][(k+1)%4], this.node_leg[i][j+1][(k+1)%4], this.node_leg[i][j+1][k]]);
          }
        }
      }
    }
    for (let i=0; i<this.node_base.length; i++) {
      if ((i == 0  &&  show_side_l)  ||  (i == 1  &&  show_side_r)) {
        for (let j=0; j<this.node_base[i].length-1; j++) {
          for (let k=0; k<this.node_base[i][j].length; k++) {
            FS_drawShape([this.node_base[i][j][k], this.node_base[i][j][(k+1)%4], this.node_base[i][j+1][(k+1)%4], this.node_base[i][j+1][k]]);
          }
        }
        FS_drawShape(this.node_base[i][1]);
      }
    }




    noFill();
    strokeWeight(var_weight*(1));
    stroke(c_dark);
    for (let j=0; j<this.node_seat[0].length; j++) {
      if (j != 2) {
        FS_drawLine(this.node_seat[this.node_seat.length-1][j], this.node_seat[this.node_seat.length-1][(j+1)%4], _state_noise, _var_noise);
      }
    }
    FS_drawEllipse(this.node_seat[0], _state_noise, _var_noise);

    for (let i=0; i<this.node_seat.length-1; i++) { 
      for (let j=0; j<this.node_seat[i].length; j++) {
        FS_drawLine(this.node_seat[i][j], this.node_seat[i+1][j], _state_noise, _var_noise);
      }
    }

    for (let i=0; i<this.node_side.length; i++) {
      if ((i == 0  &&  show_side_l)  ||  (i == 1  &&  show_side_r)) {
        for (let j=0; j<this.node_side[i].length-1; j++) {
          for (let k=0; k<this.node_side[i][j].length; k++) {
            FS_drawLine(this.node_side[i][j][k], this.node_side[i][j+1][k], _state_noise, _var_noise);
          }
        }
        FS_drawEllipse(this.node_side[i][3], _state_noise, _var_noise);
        FS_drawEllipse(this.node_side[i][2], _state_noise, _var_noise);
        FS_drawEllipse(this.node_side[i][0], _state_noise, _var_noise);
      }
    }



    for (let i=0; i<this.node_back.length-1; i++) { 
      for (let j=0; j<this.node_back[i].length; j++) {
        FS_drawLine(this.node_back[i][j], this.node_back[i+1][j], _state_noise, _var_noise);
      }
    }
    FS_drawEllipse(this.node_back[this.node_back.length-1], _state_noise, _var_noise);
  };
}