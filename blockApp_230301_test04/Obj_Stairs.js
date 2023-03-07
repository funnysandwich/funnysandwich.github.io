function Stairs(center_d, W_room, D_room, H_room) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();

  this.angle_begin = FS_rand(0, TWO_PI);
  this.W_pillar = real(12);
  this.node_pillar = Array.from(Array(2), () => new Array(8));
  for (let i=0; i<this.node_pillar.length; i++) {
    for (let j=0; j<this.node_pillar[i].length; j++) {
      this.node_pillar[i][j] = this.center_d.copy();
    }
  }

  this.node_stairs = new Array(35);
  this.H_stairs = H_room / this.node_stairs.length - real(0.5);
  this.W_stairs = (W_room/2 - this.W_pillar/2) * 0.9;
  for (let i=0; i<this.node_stairs.length; i++) {
    this.node_stairs[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_stairs[i].length; j++) {
      for (let k=0; k<this.node_stairs[i][j].length; k++) {
        this.node_stairs[i][j][k] = this.center_d.copy();
      }
    }
  }








  this.update = function() {
    for (let i=0; i<this.node_pillar.length; i++) {
      let y = -H_room * i;
      for (let j=0; j<this.node_pillar[i].length; j++) {
        let x = cos(map(j, 0, this.node_pillar[i].length, 0, TWO_PI)) * this.W_pillar/2;
        let z = sin(map(j, 0, this.node_pillar[i].length, 0, TWO_PI)) * this.W_pillar/2;
        this.node_pillar[i][j] = createVector(x, y, z).add(this.center_d);
      }
    }


    for (let i=0; i<this.node_stairs.length; i++) {
      for (let j=0; j<this.node_stairs[i].length; j++) {
        let y = -this.H_stairs * j - this.H_stairs*i - real(0.5)*i;
        let d = this.W_stairs * 0.38;
        for (let k=0; k<this.node_stairs[i][j].length; k++) {
          this.node_stairs[i][j][k] = createVector(this.W_stairs/2.0 * pow(-1, ceil(k%1.5)+1), y, d/2.0 * pow(-1, floor(k/2)+1));
          this.node_stairs[i][j][k].x += this.W_stairs/2 + this.W_pillar/2;
          if (k == 0 || k == 3) {
            this.node_stairs[i][j][k].z += d*0.25*pow(-1, floor(k==3));
          }
          this.node_stairs[i][j][k] = PRotateY(this.node_stairs[i][j][k], this.angle_begin -HALF_PI*0.2*i);
          this.node_stairs[i][j][k].add(this.center_d);
        }
      }
    }
    //for (let i=0; i<this.node_stairs.length-1; i++) {
    //  this.node_stairs[i][1][0] = this.node_stairs[i+1][0][3].copy();
    //}
  };













  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_bkg);
    drawCylinder_TRIANGLES(this.node_pillar);
    for (let i=0; i<this.node_stairs.length; i++) {
      drawCylinder_TRIANGLES(this.node_stairs[i]);
      FS_drawShape(this.node_stairs[i][1]);
    }



    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));
    drawCylinder_LINES(this.node_pillar, 0, _state_noise, _var_noise);
    FS_drawEllipse(this.node_pillar[0], _state_noise, _var_noise);
    FS_drawEllipse(this.node_pillar[1], _state_noise, _var_noise);
    strokeWeight(var_weight*(1));
    for (let i=0; i<this.node_stairs.length; i++) {
      drawCylinder_info(this.node_stairs[i], _state_noise, _var_noise);
    }
  };
}