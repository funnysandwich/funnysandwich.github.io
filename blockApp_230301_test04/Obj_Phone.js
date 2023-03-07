function Phone(center_d, W_room, D_room, H_room) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();


  this.node_line = new Array(200);
  for (let i=0; i<this.node_line.length; i++) {
    this.node_line[i] = this.center_d.copy();
  }


  this.node_phone_base = Array.from(Array(2), () => new Array(8));
  for (let i=0; i<this.node_phone_base.length; i++) {
    for (let j=0; j<this.node_phone_base[i].length; j++) {
      this.node_phone_base[i][j] = this.center_d.copy();
    }
  }



  this.node_phone_io = new Array(2);
  for (let i=0; i<this.node_phone_base.length; i++) {
    this.node_phone_io[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_phone_io[i].length; j++) {
      for (let k=0; k<this.node_phone_io[i][j].length; k++) {
        this.node_phone_io[i][j][k] = this.center_d.copy();
      }
    }
  }











  this.update = function() {
    let _y = real(FS_rand(40, 60));
    for (let i=0; i<this.node_line.length; i++) {
      let x = cos(i*0.5) * real(0.75);
      let z = sin(i*0.5) * real(0.75);
      let y = -H_room + map(i, 0, this.node_line.length-1, 0, _y);
      this.node_line[i] = createVector(x, y, z).add(this.center_d);
    }



    for (let i=0; i<this.node_phone_base.length; i++) {
      let y = -real(2) * i;
      let d = real(3.5);
      let w = real(15);
      for (let j=0; j<this.node_phone_base[i].length; j++) {
        if (j < floor(this.node_phone_base[i].length/2)) {
          this.node_phone_base[i][j] = createVector(map(j, 0, floor(this.node_phone_base[i].length/2)-1, -w/2, w/2), y, -d/2);
        } else {
          this.node_phone_base[i][j] = createVector(map(j, floor(this.node_phone_base[i].length/2), this.node_phone_base[i].length-1, w/2, -w/2), y, d/2);
        }
        if (j == 1  ||  j == 6) {
          this.node_phone_base[i][j].x -= real(1);
        } else if (j == 2  ||  j == 5) {
          this.node_phone_base[i][j].x += real(1);
        }
        if (j == 0  ||  j == 7  ||  j == 3  ||  j == 4) {
          this.node_phone_base[i][j].y -= real(2);
        }
      }
    }


    this.node_phone_io[0][0][0] = this.node_phone_base[1][0].copy();
    this.node_phone_io[0][0][1] = this.node_phone_base[1][1].copy();
    this.node_phone_io[0][0][2] = this.node_phone_base[1][6].copy();
    this.node_phone_io[0][0][3] = this.node_phone_base[1][7].copy();
    this.node_phone_io[1][0][0] = this.node_phone_base[1][2].copy();
    this.node_phone_io[1][0][1] = this.node_phone_base[1][3].copy();
    this.node_phone_io[1][0][2] = this.node_phone_base[1][4].copy();
    this.node_phone_io[1][0][3] = this.node_phone_base[1][5].copy();
    for (let i=0; i<this.node_phone_io.length; i++) {
      for (let k=0; k<this.node_phone_io[i][0].length; k++) {
        this.node_phone_io[i][1][k] = this.node_phone_io[i][0][k].copy().add(0, -real(2), 0);
      }
    }



    let _angle_y = FS_rand(0, TWO_PI);

    for (let i=0; i<this.node_phone_base.length; i++) {
      for (let j=0; j<this.node_phone_base[i].length; j++) {
        this.node_phone_base[i][j] = PRotateZ(this.node_phone_base[i][j], HALF_PI);
        this.node_phone_base[i][j].add(-real(4), real(7.5), 0);
        this.node_phone_base[i][j] = PRotateY(this.node_phone_base[i][j], _angle_y);
        this.node_phone_base[i][j].add(this.node_line[this.node_line.length-1]);
      }
    }

    for (let i=0; i<this.node_phone_base.length; i++) {
      for (let j=0; j<this.node_phone_io[i].length; j++) {
        for (let k=0; k<this.node_phone_io[i][j].length; k++) {
          this.node_phone_io[i][j][k] = PRotateZ(this.node_phone_io[i][j][k], HALF_PI);
          this.node_phone_io[i][j][k].add(-real(4), real(7.5), 0);
          this.node_phone_io[i][j][k] = PRotateY(this.node_phone_io[i][j][k], _angle_y);
          this.node_phone_io[i][j][k].add(this.node_line[this.node_line.length-1]);
        }
      }
    }
  };











  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    drawCylinder_TRIANGLES(this.node_phone_base);
    //FS_drawShape(this.node_phone_base[0]);
    //FS_drawShape(this.node_phone_base[1]);
    FS_drawShape([this.node_phone_base[1][1], this.node_phone_base[1][2], this.node_phone_base[1][5], this.node_phone_base[1][6]]);
    FS_drawShape([this.node_phone_base[0][1], this.node_phone_base[0][2], this.node_phone_base[0][5], this.node_phone_base[0][6]]);
    FS_drawShape([this.node_phone_base[0][0], this.node_phone_base[0][1], this.node_phone_base[0][6], this.node_phone_base[0][7]]);
    FS_drawShape([this.node_phone_base[0][2], this.node_phone_base[0][3], this.node_phone_base[0][4], this.node_phone_base[0][5]]);
    for (let i=0; i<this.node_phone_io.length; i++) {
      drawCylinder_TRIANGLES(this.node_phone_io[i]);
      FS_drawShape(this.node_phone_io[i][1]);
    }


    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));
    for (let i=0; i<this.node_line.length-1; i++) {
      FS_drawLine(this.node_line[i], this.node_line[i+1], _state_noise, _var_noise);
    }

    strokeWeight(var_weight*(1));
    FS_drawEllipse(this.node_phone_base[0], _state_noise, _var_noise);
    FS_drawEllipse([this.node_phone_base[1][1], this.node_phone_base[1][2], this.node_phone_base[1][5], this.node_phone_base[1][6]], _state_noise, _var_noise);
    FS_drawLine(this.node_phone_base[0][0], this.node_phone_base[1][0], _state_noise, _var_noise);
    FS_drawLine(this.node_phone_base[0][7], this.node_phone_base[1][7], _state_noise, _var_noise);
    FS_drawLine(this.node_phone_base[0][3], this.node_phone_base[1][3], _state_noise, _var_noise);
    FS_drawLine(this.node_phone_base[0][4], this.node_phone_base[1][4], _state_noise, _var_noise);

    for (let i=0; i<this.node_phone_io.length; i++) {
      FS_drawEllipse(this.node_phone_io[i][1], _state_noise, _var_noise);
      for (let k=0; k<this.node_phone_io[i][0].length; k++) {
        FS_drawLine(this.node_phone_io[i][0][k], this.node_phone_io[i][1][k], _state_noise, _var_noise);
      }
    }
  };
}