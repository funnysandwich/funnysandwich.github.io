function Bed(center_d, W_room, D_room, H_room, is_ladder_face_front) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();


  let num = 2;

  this.H_leg = real(10);
  this.H_floor = this.H_leg*3.5;
  this.W_leg = real(1.5);
  this.W_board = W_room - this.W_leg;
  this.D_board = D_room - this.W_leg;
  this.T_board = real(1.5);
  this.W_bed = W_room - this.W_leg*4;
  this.D_bed = D_room - this.W_leg*4;
  this.T_bed = this.T_board * 1.5;

  this.node_board = new Array(num);
  for (let i=0; i<this.node_board.length; i++) {
    this.node_board[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_board[i].length; j++) {
      for (let k=0; k<this.node_board[i][j].length; k++) {
        this.node_board[i][j][k] = this.center_d.copy();
      }
    }
  }

  this.node_leg = new Array(4);
  for (let i=0; i<this.node_leg.length; i++) {
    this.node_leg[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_leg[i].length; j++) {
      for (let k=0; k<this.node_leg[i][j].length; k++) {
        this.node_leg[i][j][k] = this.center_d.copy();
      }
    }
  }

  this.node_bar_hor = new Array(2);
  for (let i=0; i<this.node_bar_hor.length; i++) {
    this.node_bar_hor[i] = new Array(num);
    for (let j=0; j<this.node_bar_hor[i].length; j++) {
      this.node_bar_hor[i][j] =  Array.from(Array(2), () => new Array(4));
      for (let k=0; k<this.node_bar_hor[i][j].length; k++) {
        for (let l=0; l<this.node_bar_hor[i][j][k].length; l++) {
          this.node_bar_hor[i][j][k][l] = this.center_d.copy();
        }
      }
    }
  }
  this.node_bar_ver = new Array(2);
  for (let i=0; i<this.node_bar_ver.length; i++) {
    this.node_bar_ver[i] = new Array(num);
    for (let j=0; j<this.node_bar_ver[i].length; j++) {
      this.node_bar_ver[i][j] = new Array(3);
      for (let k=0; k<this.node_bar_ver[i][j].length; k++) {
        this.node_bar_ver[i][j][k] =  Array.from(Array(2), () => new Array(4));
        for (let l=0; l<this.node_bar_ver[i][j][k].length; l++) {
          for (let n=0; n<this.node_bar_ver[i][j][k][l].length; n++) {
            this.node_bar_ver[i][j][k][l][n] = this.center_d.copy();
          }
        }
      }
    }
  }

  this.node_bed = new Array(num);
  for (let i=0; i<this.node_bed.length; i++) {
    this.node_bed[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_bed[i].length; j++) {
      for (let k=0; k<this.node_bed[i][j].length; k++) {
        this.node_bed[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_pillow = new Array(num);
  for (let i=0; i<this.node_pillow.length; i++) {
    this.node_pillow[i] = Array.from(Array(2), () => new Array(7));
    for (let j=0; j<this.node_pillow[i].length; j++) {
      for (let k=0; k<this.node_pillow[i][j].length; k++) {
        this.node_pillow[i][j][k] = this.center_d.copy();
      }
    }
  }


  this.node_ladder = new Array(num-1);
  for (let i=0; i<this.node_ladder.length; i++) {
    this.node_ladder[i] = new Array(2);
    for (let j=0; j<this.node_ladder[i].length; j++) {
      this.node_ladder[i][j] =  Array.from(Array(2), () => new Array(4));
      for (let k=0; k<this.node_ladder[i][j].length; k++) {
        for (let l=0; l<this.node_ladder[i][j][k].length; l++) {
          this.node_ladder[i][j][k][l] = this.center_d.copy();
        }
      }
    }
  }
  this.node_ladder_hor = new Array(num-1);
  for (let i=0; i<this.node_ladder_hor.length; i++) {
    this.node_ladder_hor[i] = new Array(2);
    for (let j=0; j<this.node_ladder_hor[i].length; j++) {
      this.node_ladder_hor[i][j] = Array.from(Array(2), () => new Array(4));
      for (let k=0; k<this.node_ladder_hor[i][j].length; k++) {
        for (let l=0; l<this.node_ladder_hor[i][j][k].length; l++) {
          this.node_ladder_hor[i][j][k][l] = this.center_d.copy();
        }
      }
    }
  }






















  this.update = function() {


    for (let i=0; i<this.node_leg.length; i++) {
      let x = (W_room/2-this.W_leg/2) * pow(-1, floor(i==0 || i==3));
      let z = (D_room/2-this.W_leg/2) * pow(-1, floor(i==0 || i==1));
      for (let j=0; j<this.node_leg[i].length; j++) {
        let y = -(this.H_leg*2 + (this.H_floor)*(this.node_board.length-1)) * j;
        for (let k=0; k<this.node_leg[i][j].length; k++) {
          this.node_leg[i][j][k] = createVector(this.W_leg/2.0 * pow(-1, ceil(k%1.5)+1), y, this.W_leg/2.0 * pow(-1, floor(k/2)+1));
          this.node_leg[i][j][k].add(x, 0, z);
          this.node_leg[i][j][k].add(this.center_d);
        }
      }
    }

    for (let i=0; i<this.node_board.length; i++) {
      for (let j=0; j<this.node_board[i].length; j++) {
        let y = -(this.H_leg + (this.H_floor)*i + this.T_board*j);
        for (let k=0; k<this.node_board[i][j].length; k++) {
          this.node_board[i][j][k] = createVector(this.W_board/2.0 * pow(-1, ceil(k%1.5)+1), y, this.D_board/2.0 * pow(-1, floor(k/2)+1));
          this.node_board[i][j][k].add(this.center_d);
        }
      }
    }

    for (let i=0; i<this.node_bar_hor.length; i++) {
      let x = this.W_board/2 * pow(-1, i+1);
      for (let j=0; j<this.node_bar_hor[i].length; j++) {
        for (let k=0; k<this.node_bar_hor[i][j].length; k++) {
          let y = -this.H_leg - this.H_floor*j - this.T_board - this.H_leg+this.W_leg*2.5 - this.W_leg*0.75*k;
          for (let l=0; l<this.node_bar_hor[i][j][k].length; l++) {
            this.node_bar_hor[i][j][k][l] = createVector(x + this.W_leg*0.66/2.0 * pow(-1, ceil(l%1.5)+1), y, this.D_board/2.0 * pow(-1, floor(l/2)+1));
            this.node_bar_hor[i][j][k][l].add(this.center_d);
          }
        }
      }
    }
    for (let i=0; i<this.node_bar_ver.length; i++) {
      let x = this.W_board/2 * pow(-1, i+1);
      for (let j=0; j<this.node_bar_ver[i].length; j++) {
        for (let k=0; k<this.node_bar_ver[i][j].length; k++) {
          let z = -this.D_board/2 + (this.D_board/(this.node_bar_ver[i][j].length+1))*(k+1);
          for (let l=0; l<this.node_bar_ver[i][j][k].length; l++) {
            let y = -this.H_leg - this.H_floor*j - this.T_board - (this.H_leg-this.W_leg*2.5-this.W_leg*0.75*0.5)*l;
            for (let n=0; n<this.node_bar_ver[i][j][k][l].length; n++) {
              this.node_bar_ver[i][j][k][l][n] = createVector(x + this.W_leg*0.5/2.0 * pow(-1, ceil(n%1.5)+1), y, z + this.W_leg*0.5/2.0 * pow(-1, floor(n/2)+1));
              this.node_bar_ver[i][j][k][l][n].add(this.center_d);
            }
          }
        }
      }
    }


    for (let i=0; i<this.node_bed.length; i++) {
      for (let j=0; j<this.node_bed[i].length; j++) {
        let y = -(this.H_leg + this.T_board + (this.H_floor)*i + this.T_bed*j + real(0.5));
        for (let k=0; k<this.node_bed[i][j].length; k++) {
          this.node_bed[i][j][k] = createVector(this.W_bed/2.0 * pow(-1, ceil(k%1.5)+1), y, this.D_bed/2.0 * pow(-1, floor(k/2)+1));
          this.node_bed[i][j][k].add(this.center_d);
        }
      }
    }


    for (let i=0; i<this.node_pillow.length; i++) {
      for (let j=0; j<this.node_pillow[i].length; j++) {
        let z = (this.D_bed*0.25) * pow(-1, j+1);
        for (let k=0; k<this.node_pillow[i][j].length; k++) {
          let x = cos(map(k, 1, this.node_pillow[i][j].length-2, 0, -PI)) * this.W_bed*0.15/2;
          let y = sin(map(k, 1, this.node_pillow[i][j].length-2, 0, -PI)) * this.W_bed*0.05/2 - this.W_bed*0.025;
          if (k == 0  ||  k == this.node_pillow[i][j].length-1) {
            x = this.W_bed*0.15/2 * pow(-1, floor(k!=0));
            y = 0;
          }
          this.node_pillow[i][j][k] = createVector(x+(this.W_bed*0.4)*pow(-1, floor(is_ladder_face_front)+1), y, z);
          this.node_pillow[i][j][k].y -= (this.H_leg + this.T_board + this.T_bed + (this.H_floor)*i + real(1));
          this.node_pillow[i][j][k].add(this.center_d);
        }
      }
    }



    for (let i=0; i<this.node_ladder.length; i++) {
      for (let j=0; j<this.node_ladder[i].length; j++) {
        for (let k=0; k<this.node_ladder[i][j].length; k++) {
          let y = -this.H_leg - this.H_floor*i - this.T_board - (this.H_floor-this.T_board*0.5)*k;
          let z = (this.D_board/2-this.W_leg) * pow(-1, floor(is_ladder_face_front)+1);
          let x = (this.W_bed*0.25) * pow(-1, floor(is_ladder_face_front)+1)  +  this.W_bed*0.1*pow(-1, j+1);
          for (let l=0; l<this.node_ladder[i][j][k].length; l++) {
            this.node_ladder[i][j][k][l] = createVector(x + this.W_leg*0.66/2.0 * pow(-1, ceil(l%1.5)+1), y, z + this.W_leg*0.66/2.0 * pow(-1, floor(l/2)+1));
            this.node_ladder[i][j][k][l].add(this.center_d);
          }
        }
      }
    }


    for (let i=0; i<this.node_ladder_hor.length; i++) {
      for (let j=0; j<this.node_ladder_hor[i].length; j++) {
        for (let k=0; k<this.node_ladder_hor[i][j].length; k++) {
          for (let l=0; l<this.node_ladder_hor[i][j][k].length; l++) {
            let w = this.W_leg * 0.5;
            let z = cos(map(l, 0, this.node_ladder_hor[i][j][k].length, 0, TWO_PI)) * w;
            z += (this.D_board/2-this.W_leg) * pow(-1, floor(is_ladder_face_front)+1);
            let y = sin(map(l, 0, this.node_ladder_hor[i][j][k].length, 0, TWO_PI)) * w;
            y += -this.H_leg - this.H_floor*i - this.T_board - (this.H_floor/(this.node_ladder_hor[i].length+1))*(j+1);
            let x = (this.W_bed*0.25) * pow(-1, floor(is_ladder_face_front)+1)  +  (this.W_bed*0.1-this.W_leg*0.66*0.5)*pow(-1, k+1);
            this.node_ladder_hor[i][j][k][l] = createVector(x, y, z);
            this.node_ladder_hor[i][j][k][l].add(this.center_d);
          }
        }
      }
    }
  };




























  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    for (let i=0; i<this.node_leg.length; i++) {
      drawCylinder_TRIANGLES(this.node_leg[i]);
      TRIANGLES_getShape(this.node_leg[i][1]);
    }
    for (let i=0; i<this.node_board.length; i++) {
      drawCylinder_TRIANGLES(this.node_board[i]);
      TRIANGLES_getShape(this.node_board[i][1]);
    }
    for (let i=0; i<this.node_bar_hor.length; i++) {
      for (let j=0; j<this.node_bar_hor[i].length; j++) {
        drawCylinder_TRIANGLES(this.node_bar_hor[i][j]);
        TRIANGLES_getShape(this.node_bar_hor[i][j][1]);
      }
    }
    for (let i=0; i<this.node_bar_ver.length; i++) {
      for (let j=0; j<this.node_bar_ver[i].length; j++) {
        for (let k=0; k<this.node_bar_ver[i][j].length; k++) {
          drawCylinder_TRIANGLES(this.node_bar_ver[i][j][k]);
        }
      }
    }
    for (let i=0; i<this.node_bed.length; i++) {
      drawCylinder_TRIANGLES(this.node_bed[i]);
      TRIANGLES_getShape(this.node_bed[i][1]);
    }
    for (let i=0; i<this.node_bed.length; i++) {
      drawCylinder_TRIANGLES(this.node_pillow[i]);
      TRIANGLES_getShape(this.node_pillow[i][0]);
      TRIANGLES_getShape(this.node_pillow[i][1]);
    }
    for (let i=0; i<this.node_ladder.length; i++) {
      for (let j=0; j<this.node_ladder[i].length; j++) {
        drawCylinder_TRIANGLES(this.node_ladder[i][j]);
      }
    }
    for (let i=0; i<this.node_ladder_hor.length; i++) {
      for (let j=0; j<this.node_ladder_hor[i].length; j++) {
        drawCylinder_TRIANGLES(this.node_ladder_hor[i][j]);
      }
    }





    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));
    for (let i=0; i<this.node_leg.length; i++) {
      drawCylinder_LINES(this.node_leg[i], 0, _state_noise, _var_noise);
      FS_drawEllipse(this.node_leg[i][0], _state_noise, _var_noise);
    }
    strokeWeight(var_weight*(1.5));
    for (let i=0; i<this.node_leg.length; i++) {
      FS_drawEllipse(this.node_leg[i][1], _state_noise, _var_noise);
    }
    for (let i=0; i<this.node_board.length; i++) {
      drawCylinder_info(this.node_board[i], _state_noise, _var_noise);
    }
    for (let i=0; i<this.node_bar_hor.length; i++) {
      for (let j=0; j<this.node_bar_hor[i].length; j++) {
        let n = Array.from(Array(2), () => new Array(4));
        n[0][0] = this.node_bar_hor[i][j][1][0].copy();
        n[0][1] = this.node_bar_hor[i][j][1][1].copy();
        n[0][2] = this.node_bar_hor[i][j][0][1].copy();
        n[0][3] = this.node_bar_hor[i][j][0][0].copy();
        n[1][1] = this.node_bar_hor[i][j][1][3].copy();
        n[1][2] = this.node_bar_hor[i][j][1][2].copy();
        n[1][3] = this.node_bar_hor[i][j][0][2].copy();
        n[1][0] = this.node_bar_hor[i][j][0][3].copy();
        drawCylinder_LINES(n, 1, _state_noise, _var_noise);
      }
    }
    for (let i=0; i<this.node_bar_ver.length; i++) {
      for (let j=0; j<this.node_bar_ver[i].length; j++) {
        for (let k=0; k<this.node_bar_ver[i][j].length; k++) {
          drawCylinder_LINES(this.node_bar_ver[i][j][k], 0, _state_noise, _var_noise);
        }
      }
    }
    strokeWeight(var_weight*(1));
    for (let i=0; i<this.node_bed.length; i++) {
      drawCylinder_info(this.node_bed[i], _state_noise, _var_noise);
    }
    for (let i=0; i<this.node_bed.length; i++) {
      drawCylinder_LINES(this.node_pillow[i], 0, _state_noise, _var_noise);
      FS_drawEllipse(this.node_pillow[i][0], _state_noise, _var_noise);
      FS_drawEllipse(this.node_pillow[i][1], _state_noise, _var_noise);
    }
    strokeWeight(var_weight*(1.5));
    for (let i=0; i<this.node_ladder.length; i++) {
      for (let j=0; j<this.node_ladder[i].length; j++) {
        drawCylinder_LINES(this.node_ladder[i][j], 0, _state_noise, _var_noise);
        FS_drawEllipse(this.node_ladder[i][j][0], _state_noise, _var_noise);
      }
    }
    for (let i=0; i<this.node_ladder_hor.length; i++) {
      for (let j=0; j<this.node_ladder_hor[i].length; j++) {
        drawCylinder_LINES(this.node_ladder_hor[i][j], 1, _state_noise, _var_noise);
      }
    }
  };
}