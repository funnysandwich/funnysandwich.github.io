function TrafficLight(center_d, W_room, D_room, H_room) {
  this.center_d = center_d.copy();

  this.W_pillar = real(1.5);
  this.H_pillar = H_room * FS_rand(0.3, 0.4);
  this.W_box = real(10);
  this.D_box = this.W_box * 0.5;
  this.H_box = this.W_box * 3;
  this.W_light = this.W_box * 0.8;
  this.H_base = H_room * 0.025;
  this.W_base = real(10);

  this.is_face_left = FS_rand(0, 1) < 0.5;


  this.node_pillar = Array.from(Array(2), () => new Array(8));
  for (let i=0; i<this.node_pillar.length; i++) {
    for (let j=0; j<this.node_pillar[i].length; j++) {
      this.node_pillar[i][j] = this.center_d.copy();
    }
  }
  this.node_box = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_box.length; i++) {
    for (let j=0; j<this.node_box[i].length; j++) {
      this.node_box[i][j] = this.center_d.copy();
    }
  }
  this.node_light = Array.from(Array(3), () => new Array(16));
  for (let i=0; i<this.node_light.length; i++) {
    for (let j=0; j<this.node_light[i].length; j++) {
      this.node_light[i][j] = this.center_d.copy();
    }
  }
  this.node_light_eaves = new Array(this.node_light.length);
  for (let i=0; i<this.node_light_eaves.length; i++) {
    this.node_light_eaves[i] = Array.from(Array(2), () => new Array(floor(this.node_light[0].length/2)));
    for (let j=0; j<this.node_light_eaves[i].length; j++) {
      for (let k=0; k<this.node_light_eaves[i][j].length; k++) {
        this.node_light_eaves[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_base = Array.from(Array(2), () => new Array(8));
  for (let i=0; i<this.node_base.length; i++) {
    for (let j=0; j<this.node_base[i].length; j++) {
      this.node_base[i][j] = this.center_d.copy();
    }
  }















  this.update = function() {
    for (let i=0; i<this.node_pillar.length; i++) {
      let y = -this.H_base*(1-i) - this.H_pillar * i;
      for (let j=0; j<this.node_pillar[i].length; j++) {
        let x = cos(map(j, 0, this.node_pillar[i].length, 0, TWO_PI)) * this.W_pillar/2;
        let z = sin(map(j, 0, this.node_pillar[i].length, 0, TWO_PI)) * this.W_pillar/2;
        this.node_pillar[i][j] = createVector(x, y, z);
        this.node_pillar[i][j].add(this.center_d);
      }
    }


    for (let i=0; i<this.node_box.length; i++) {
      let y = -this.H_pillar - this.H_box * i;
      for (let j=0; j<this.node_box[i].length; j++) {
        this.node_box[i][j] = createVector(this.W_box/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D_box/2.0 * pow(-1, floor(j/2)+1));
        this.node_box[i][j].add(this.center_d);
      }
    }


    for (let i=0; i<this.node_light.length; i++) {
      for (let j=0; j<this.node_light[i].length; j++) {
        let x = cos(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * this.W_light/2;
        let y = sin(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * this.W_light/2;
        this.node_light[i][j] = createVector(x, y, 0);
        this.node_light[i][j].add(0, -this.H_pillar-this.H_box/2 + map(i, 0, this.node_light.length-1, -(this.H_box/2-this.W_light*0.75), (this.H_box/2-this.W_light*0.75)), this.D_box/2+real(0.5));
        this.node_light[i][j].add(this.center_d);
      }
    }


    for (let i=0; i<this.node_light_eaves.length; i++) {
      for (let j=0; j<this.node_light_eaves[i].length; j++) {
        for (let k=0; k<this.node_light_eaves[i][j].length; k++) {
          this.node_light_eaves[i][j][k] = this.node_light[i][(floor(this.node_light[0].length/2) + k) % this.node_light[0].length].copy();
          if (j == 1) {
            this.node_light_eaves[i][j][k].z += map(sin(map(k, 0, this.node_light_eaves[i][j].length-1, 0, PI)), 0, 1, this.D_box*0.5, this.D_box);
          }
        }
      }
    }

    for (let i=0; i<this.node_base.length; i++) {
      let y = -this.H_base * i;
      for (let j=0; j<this.node_base[i].length; j++) {
        let x = cos(map(j, 0, this.node_base[i].length, 0, TWO_PI)) * this.W_base/2;
        let z = sin(map(j, 0, this.node_base[i].length, 0, TWO_PI)) * this.W_base/2;
        this.node_base[i][j] = createVector(x, y, z);
        this.node_base[i][j].add(this.center_d);
      }
    }






    for (let i=0; i<this.node_box.length; i++) {
      for (let j=0; j<this.node_box[i].length; j++) {
        if (!this.is_face_left) {
          this.node_box[i][j].add(this.center_d.copy().mult(-1));
          this.node_box[i][j] = PRotateY(this.node_box[i][j], -HALF_PI);
          this.node_box[i][j].add(this.center_d);
        }
      }
    }
    for (let i=0; i<this.node_light.length; i++) {
      for (let j=0; j<this.node_light[i].length; j++) {
        if (!this.is_face_left) {
          this.node_light[i][j].add(this.center_d.copy().mult(-1));
          this.node_light[i][j] = PRotateY(this.node_light[i][j], -HALF_PI);
          this.node_light[i][j].add(this.center_d);
        }
      }
    }    
    for (let i=0; i<this.node_light_eaves.length; i++) {
      for (let j=0; j<this.node_light_eaves[i].length; j++) {
        for (let k=0; k<this.node_light_eaves[i][j].length; k++) {
          if (!this.is_face_left) {
            this.node_light_eaves[i][j][k].add(this.center_d.copy().mult(-1));
            this.node_light_eaves[i][j][k] = PRotateY(this.node_light_eaves[i][j][k], -HALF_PI);
            this.node_light_eaves[i][j][k].add(this.center_d);
          }
        }
      }
    }
  };














  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    drawCylinder_TRIANGLES(this.node_pillar);
    drawCylinder_TRIANGLES(this.node_base);
    TRIANGLES_getShape(this.node_base[1]);
    fill(c_bkg);
    drawCylinder_TRIANGLES(this.node_box);
    TRIANGLES_getShape(this.node_box[1]);
    for (let i=0; i<this.node_light_eaves.length; i++) {
      for (let k=0; k<this.node_light_eaves[i][0].length-1; k++) {
        FS_drawShape([this.node_light_eaves[i][0][k], this.node_light_eaves[i][1][k], this.node_light_eaves[i][1][k+1], this.node_light_eaves[i][0][k+1]]);
      }
    }

    fill(c_dark);
    for (let i=0; i<this.node_light.length; i++) {
      TRIANGLES_getShape(this.node_light[i]);
    }



    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));
    drawCylinder_LINES(this.node_pillar, 0, _state_noise, _var_noise);
    FS_drawEllipse(this.node_pillar[0], _state_noise, _var_noise);
    drawCylinder_LINES(this.node_base, 0, _state_noise, _var_noise);
    FS_drawEllipse(this.node_base[0], _state_noise, _var_noise);
    strokeWeight(var_weight*(1.5));
    FS_drawEllipse(this.node_base[1], _state_noise, _var_noise);
    strokeWeight(var_weight*(1.5));
    drawCylinder_info(this.node_box, _state_noise, _var_noise);

    for (let i=0; i<this.node_light_eaves.length; i++) {
      FS_drawLine(this.node_light_eaves[i][0][0], this.node_light_eaves[i][1][0], _state_noise, _var_noise);
      FS_drawLine(this.node_light_eaves[i][0][this.node_light_eaves[i][0].length-1], this.node_light_eaves[i][1][this.node_light_eaves[i][0].length-1], _state_noise, _var_noise);
      for (let k=0; k<this.node_light_eaves[i][0].length-1; k++) {
        FS_drawLine(this.node_light_eaves[i][0][k], this.node_light_eaves[i][0][k+1], _state_noise, _var_noise);
        FS_drawLine(this.node_light_eaves[i][1][k], this.node_light_eaves[i][1][k+1], _state_noise, _var_noise);
      }
      drawCylinder_LINES(this.node_light_eaves[i], 1, _state_noise, _var_noise);
    }
  };
}