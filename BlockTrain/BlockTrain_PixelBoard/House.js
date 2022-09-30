// include a comment about LICENSE.md in House.js
// Copyright 2022 funnysandwich.tez
function House(center, is_main, index) {
  this.W = real(500);
  //this.H = real(500+100);
  this.D = real(150);
  this.center = center.copy();
  this.is_main = is_main;
  this.index = index;
  this.ran = random(-999, 999);

  this.Y = skyline.y + real(50);
  if (!this.is_main) {
    this.Y = skyline.y + real(50) + map(noise(this.ran), 0, 1, -real(1000), real(500));
  }
  this.center.y = this.Y + Y_move_state_board;






  this.bill0 = new Bill0(this.center);
  if (this.is_main) {
    this.bill1 = new Array(5);
    for (let i=0; i<this.bill1.length; i++) {
      const y = this.center.y - Y_move_state_board_target1 - real(250) + map(i, 0, this.bill1.length, -real(750), real(750));
      const n = createVector(this.center.x, y, this.center.z+this.W*0.1+real(1));
      if (i == floor(this.bill1.length/2)) {
        this.bill1[i] = new Bill1(n, true);
      } else {
        this.bill1[i] = new Bill1(n, false);
      }
    }
  }
  if (this.index % 3 == 0  ||  (this.index+3-1) % 3 == 0) {

    this.bill2 = new Array(1);
    for (let i=0; i<this.bill2.length; i++) {
      const y = this.center.y - Y_move_state_board_target2 - real(250);
      let n = createVector(this.center.x, y, this.center.z-this.W*0.9*i);
      if (this.index % 3 == 0) {
        n.x -= this.W*0.6;
      } else {
        n.x += this.W*0.6;
        n.z = this.center.z-this.W*0.9;
      }
      if (i == 0  &&  this.is_main) {
        this.bill2[i] = new Bill2(n, true, this.index);
      } else {
        this.bill2[i] = new Bill2(n, false, this.index);
      }
    }
  }






  this.node = new Array(4);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = createVector(0, 0, 0);
  }





  this.num_floor = 20;
  this.H = real(450);






  this.node_wall = Array.from(Array(this.num_floor+1), () => new Array(4));
  this.node_wall[0][0] = this.center.copy().add(-this.W*0.6, real(0.2), -this.W*1.1);
  this.node_wall[0][1] = this.center.copy().add(this.W*0.6, real(0.2), -this.W*1.1);
  this.node_wall[0][2] = this.center.copy().add(this.W*0.6, real(0.2), this.W*0.1);
  this.node_wall[0][3] = this.center.copy().add(-this.W*0.6, real(0.2), this.W*0.1);
  for (let i=1; i<this.node_wall.length; i++) {
    this.node_wall[i][0] = this.center.copy().add(-this.W*0.6, real(0.2)+this.H*i, -this.W*1.1);
    this.node_wall[i][1] = this.center.copy().add(this.W*0.6, real(0.2)+this.H*i, -this.W*1.1);
    this.node_wall[i][2] = this.center.copy().add(this.W*0.6, real(0.2)+this.H*i, this.W*0.1);
    this.node_wall[i][3] = this.center.copy().add(-this.W*0.6, real(0.2)+this.H*i, this.W*0.1);
  }



  this.W_win = this.W*1.2 * 0.05;
  this.H_win = this.H/10.0 * 2.75;

  this.node_win_F = new Array(this.num_floor);
  this.node_win_L = new Array(this.num_floor);
  this.node_win_R = new Array(this.num_floor);
  this.show_win_F = new Array(this.num_floor);
  this.show_win_L = new Array(this.num_floor);
  this.show_win_R = new Array(this.num_floor);

  for (let i=0; i<this.num_floor; i++) {
    this.node_win_F[i] = Array.from(Array(floor(random(2, 4))), () => new Array(4));
    this.node_win_L[i] = Array.from(Array(floor(random(2, 4))), () => new Array(4));
    this.node_win_R[i] = Array.from(Array(floor(random(2, 4))), () => new Array(4));
    this.show_win_F[i] = new Array(this.node_win_F[i].length);
    this.show_win_L[i] = new Array(this.node_win_L[i].length);
    this.show_win_R[i] = new Array(this.node_win_R[i].length);
  }



  for (let i=0; i<this.node_win_F.length; i++) {
    for (let j=0; j<this.node_win_F[i].length; j++) {
      this.show_win_F[i][j] = noise(this.ran+111 + i*40 + j*88) < 0.5;
      let center_win = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).mult(1.0/(this.node_win_F[i].length+1) * (j+1)).add(this.node_wall[i][3]);
      center_win.y += this.H/10.0*4;
      center_win.z += real(0.5);
      for (let k=0; k<this.node_win_F[i][j].length; k++) {
        this.node_win_F[i][j][k] = createVector(this.W_win/2.0 * pow(-1, ceil(k%1.5)+1), this.H_win/2.0 * pow(-1, floor(k/2)+1), 0).add(center_win);
      }
    }
  }


  for (let i=0; i<this.node_win_L.length; i++) {
    for (let j=0; j<this.node_win_L[i].length; j++) {
      this.show_win_L[i][j] = noise(this.ran+111 + i*40 + j*88 + 999) < 0.5;
      let center_win = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).mult(1.0/(this.node_win_L[i].length+1) * (j+1)).add(this.node_wall[i][0]);
      center_win.y += this.H/10.0*4;
      center_win.x -= real(0.5);
      for (let k=0; k<this.node_win_L[i][j].length; k++) {
        this.node_win_L[i][j][k] = createVector(0, this.H_win/2.0 * pow(-1, floor(k/2)+1), this.W_win/2.0 * pow(-1, ceil(k%1.5)+1)).add(center_win);
      }
    }
  }

  for (let i=0; i<this.node_win_R.length; i++) {
    for (let j=0; j<this.node_win_R[i].length; j++) {
      this.show_win_R[i][j] = noise(this.ran+111 + i*40 + j*88 + 678) < 0.5;
      let center_win = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).mult(1.0/(this.node_win_R[i].length+1) * (j+1)).add(this.node_wall[i][2]);
      center_win.y += this.H/10.0*4;
      center_win.x += real(0.5);
      for (let k=0; k<this.node_win_R[i][j].length; k++) {
        this.node_win_R[i][j][k] = createVector( 0, this.H_win/2.0 * pow(-1, floor(k/2)+1), this.W_win/2.0 * pow(-1, ceil(k%1.5)+1)).add(center_win);
      }
    }
  }









  this.update = function() {
    this.Y = skyline.y + real(50);
    if (!this.is_main) {
      this.Y = skyline.y + real(50) + map(noise(this.ran+frameCount*0.0005), 0, 1, -real(1000), real(500));
    }
    this.center.y = this.Y + Y_move_state_board;
    this.center.z = center.z + map(Y_magnifier, -real(250), real(250), real(460), -real(480));
    this.center.x = center.x + X_move_state_board;







    if (state_board == 0  ||  abs(Y_move_state_board - Y_move_state_board_target0) < real(2000)) {
      this.bill0.update(this.center);
      this.node[0] = this.bill0.node[0][3].copy();
      this.node[1] = this.bill0.node[1][3].copy();
      this.node[2] = this.bill0.node[1][2].copy();
      this.node[3] = this.bill0.node[0][2].copy();
    } 

    if (state_board == 1  ||  abs(Y_move_state_board - Y_move_state_board_target1) < real(2000)) {
      if (this.is_main) {
        for (let i=0; i<this.bill1.length; i++) {
          const y = this.center.y - Y_move_state_board_target1 - real(250) + map(i, 0, this.bill1.length, -real(750), real(750));
          const n = createVector(this.center.x, y, this.center.z+this.W*0.1+real(1));
          this.bill1[i].update(n);
          if (this.bill1[i].is_main) {
            this.node[0] = this.bill1[i].node[0].copy();
            this.node[1] = this.bill1[i].node[1].copy();
            this.node[2] = this.bill1[i].node[2].copy();
            this.node[3] = this.bill1[i].node[3].copy();
          }
        }
      }
    }

    if (state_board == 2  ||  abs(Y_move_state_board - Y_move_state_board_target2) < real(2000)) {
      if (this.index % 3 == 0  ||  (this.index+3-1) % 3 == 0) {
        for (let i=0; i<this.bill2.length; i++) {
          const y = this.center.y - Y_move_state_board_target2 - real(350);
          let n = createVector(this.center.x, y, this.center.z-this.W*0.9*i);
          if (this.index % 3 == 0) {
            n.x -= this.W*0.6;
          } else {
            n.x += this.W*0.6;
            n.z = this.center.z-this.W*0.9;
          }
          this.bill2[i].update(n);

          if (this.bill2[i].is_main) {
            this.node[0] = this.bill2[i].node[0].copy();
            this.node[1] = this.bill2[i].node[1].copy();
            this.node[2] = this.bill2[i].node[2].copy();
            this.node[3] = this.bill2[i].node[3].copy();
          }
        }
      }
    }






    this.node_wall[0][0] = this.center.copy().add(-this.W*0.6, real(0.2), -this.W*1.1);
    this.node_wall[0][1] = this.center.copy().add(this.W*0.6, real(0.2), -this.W*1.1);
    this.node_wall[0][2] = this.center.copy().add(this.W*0.6, real(0.2), this.W*0.1);
    this.node_wall[0][3] = this.center.copy().add(-this.W*0.6, real(0.2), this.W*0.1);
    for (let i=1; i<this.node_wall.length; i++) {
      this.node_wall[i][0] = this.center.copy().add(-this.W*0.6, real(0.2)+this.H*i, -this.W*1.1);
      this.node_wall[i][1] = this.center.copy().add(this.W*0.6, real(0.2)+this.H*i, -this.W*1.1);
      this.node_wall[i][2] = this.center.copy().add(this.W*0.6, real(0.2)+this.H*i, this.W*0.1);
      this.node_wall[i][3] = this.center.copy().add(-this.W*0.6, real(0.2)+this.H*i, this.W*0.1);
    }






    for (let i=0; i<this.node_win_F.length; i++) {
      for (let j=0; j<this.node_win_F[i].length; j++) {
        this.show_win_F[i][j] = noise(this.ran+111 + i*40 + j*88 + frameCount*0.001) < 0.5;
        if (this.index >= 3) {
          this.show_win_F[i][j] = false;
        }
        let center_win = p5.Vector.sub(this.node_wall[i][2], this.node_wall[i][3]).mult(1.0/(this.node_win_F[i].length+1) * (j+1)).add(this.node_wall[i][3]);
        center_win.y += this.H/10.0*4;
        center_win.z += real(0.5);
        for (let k=0; k<this.node_win_F[i][j].length; k++) {
          this.node_win_F[i][j][k] = createVector(this.W_win/2.0 * pow(-1, ceil(k%1.5)+1), this.H_win/2.0 * pow(-1, floor(k/2)+1), 0).add(center_win);
        }
      }
    }


    for (let i=0; i<this.node_win_L.length; i++) {
      for (let j=0; j<this.node_win_L[i].length; j++) {
        this.show_win_L[i][j] = noise(this.ran+111 + i*40 + j*88 + 999 + frameCount*0.001) < 0.5;
        if (this.index == 0  ||  this.index == 3  ||  this.index == 6  ||  this.index == 1  ||  this.index == 4  ||  this.index == 7) {
          this.show_win_L[i][j] = false;
        }
        let center_win = p5.Vector.sub(this.node_wall[i][3], this.node_wall[i][0]).mult(1.0/(this.node_win_L[i].length+1) * (j+1)).add(this.node_wall[i][0]);
        center_win.y += this.H/10.0*4;
        center_win.x -= real(0.5);
        for (let k=0; k<this.node_win_L[i][j].length; k++) {
          this.node_win_L[i][j][k] = createVector(0, this.H_win/2.0 * pow(-1, floor(k/2)+1), this.W_win/2.0 * pow(-1, ceil(k%1.5)+1)).add(center_win);
        }
      }
    }

    for (let i=0; i<this.node_win_R.length; i++) {
      for (let j=0; j<this.node_win_R[i].length; j++) {
        this.show_win_R[i][j] = noise(this.ran+111 + i*40 + j*88 + 678 + frameCount*0.001) < 0.5;
        if (this.index == 0  ||  this.index == 3  ||  this.index == 6  ||  this.index == 2  ||  this.index == 5  ||  this.index == 8) {
          this.show_win_R[i][j] = false;
        }
        let center_win = p5.Vector.sub(this.node_wall[i][1], this.node_wall[i][2]).mult(1.0/(this.node_win_R[i].length+1) * (j+1)).add(this.node_wall[i][2]);
        center_win.y += this.H/10.0*4;
        center_win.x += real(0.5);
        for (let k=0; k<this.node_win_R[i][j].length; k++) {
          this.node_win_R[i][j][k] = createVector( 0, this.H_win/2.0 * pow(-1, floor(k/2)+1), this.W_win/2.0 * pow(-1, ceil(k%1.5)+1)).add(center_win);
        }
      }
    }




    if (open_viewRotate) {
      if (this.index == 1) {
        for (let i=0; i<this.node_wall.length; i++) {
          this.node_wall[i][3].x -= real(150);
        }
      }
    }
  };















  this.display_0 = function() {
    if (state_board == 0  ||  abs(Y_move_state_board - Y_move_state_board_target0) < real(2000)) {
      this.bill0.display();
    }
  };



  this.display_1 = function() {
    if (state_board == 1  ||  abs(Y_move_state_board - Y_move_state_board_target1) < real(2000)) {
      if (this.is_main) {
        for (let i=0; i<this.bill1.length; i++) {
          this.bill1[i].display();
        }
      }
    }
  };



  this.display_2 = function() {
    if (state_board == 2  ||  abs(Y_move_state_board - Y_move_state_board_target2) < real(2000)) {
      if (this.index % 3 == 0  ||  (this.index+3-1) % 3 == 0) {
        for (let i=0; i<this.bill2.length; i++) {
          this.bill2[i].display();
        }
      }
    }
  };









  this.display_TRIANGLES = function() {
    let c1, c2;


    if (state_board == 0  ||  abs(Y_move_state_board - Y_move_state_board_target0) < real(2000)) {
      this.bill0.display_TRIANGLES();
    }
    if (state_board == 1  ||  abs(Y_move_state_board - Y_move_state_board_target1) < real(2000)) {
      if (this.is_main) {
        for (let i=0; i<this.bill1.length; i++) {
          this.bill1[i].display_TRIANGLES();
        }
      }
    }
    if (state_board == 2  ||  abs(Y_move_state_board - Y_move_state_board_target2) < real(2000)) {
      if (this.index % 3 == 0  ||  (this.index+3-1) % 3 == 0) {
        for (let i=0; i<this.bill2.length; i++) {
          this.bill2[i].display_TRIANGLES();
        }
      }
    }


    c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1));
    //u
    TRIANGLES_getRect_fill4(this.node_wall[0][0], this.node_wall[0][1], this.node_wall[0][2], this.node_wall[0][3], c1, c1, c2, c2);
    //f
    TRIANGLES_getRect_fill4(this.node_wall[0][3], this.node_wall[0][2], this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3], c2, c2, c2, c2);
    //l
    TRIANGLES_getRect_fill4(this.node_wall[0][0], this.node_wall[0][3], this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][0], c1, c2, c2, c1);
    //r
    TRIANGLES_getRect_fill4(this.node_wall[0][1], this.node_wall[0][2], this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][1], c1, c2, c2, c1);






    fill(c_sky);
    for (let i=0; i<this.node_win_F.length; i++) {
      for (let j=0; j<this.node_win_F[i].length; j++) {
        if (this.show_win_F[i][j]) {
          TRIANGLES_getRect(this.node_win_F[i][j][0], this.node_win_F[i][j][1], this.node_win_F[i][j][2], this.node_win_F[i][j][3]);
        }
      }
    }
    for (let i=0; i<this.node_win_L.length; i++) {
      for (let j=0; j<this.node_win_L[i].length; j++) {
        if (this.show_win_L[i][j]) {
          TRIANGLES_getRect(this.node_win_L[i][j][0], this.node_win_L[i][j][1], this.node_win_L[i][j][2], this.node_win_L[i][j][3]);
        }
      }
    }
    for (let i=0; i<this.node_win_R.length; i++) {
      for (let j=0; j<this.node_win_R[i].length; j++) {
        if (this.show_win_R[i][j]) {
          TRIANGLES_getRect(this.node_win_R[i][j][0], this.node_win_R[i][j][1], this.node_win_R[i][j][2], this.node_win_R[i][j][3]);
        }
      }
    }








    if (this.is_main  &&  open_web) {
      fill(255, 128, 128);
      for (let i=0; i<=var_px[state_board].length; i++) {
        let x = lerp(this.node[0].x, this.node[1].x, map(i, 0, var_px[state_board].length, 0, 1));
        TRIANGLES_getLine_weight(createVector(x, this.node[0].y, this.node[0].z+real(0.2)), createVector(x, this.node[3].y, this.node[3].z+real(0.2)), real(1));
      }
      for (let j=0; j<=var_px[state_board][0].length; j++) {
        let y = lerp(this.node[0].y, this.node[3].y, map(j, 0, var_px[state_board][0].length, 0, 1));
        TRIANGLES_getLine_weight_Y(createVector(this.node[0].x, y, this.node[0].z+real(0.2)), createVector(this.node[1].x, y, this.node[1].z+real(0.2)), real(1));
      }
    }
  };




  this.displayInfo = function() {
    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3]);
    }
    for (let i=0; i<4; i++) {
      LINES_getLine(this.node_wall[0][i], this.node_wall[this.node_wall.length-1][i]);
    }

    if (this.is_main) {
      LINES_getLine(this.node[0], this.node[2]);
      LINES_getLine(this.node[1], this.node[3]);
    }

    if (state_board == 0  ||  abs(Y_move_state_board - Y_move_state_board_target0) < real(2000)) {
      this.bill0.displayInfo();
    }
    if (state_board == 1  ||  abs(Y_move_state_board - Y_move_state_board_target1) < real(2000)) {
      if (this.is_main) {
        for (let i=0; i<this.bill1.length; i++) {
          this.bill1[i].displayInfo();
        }
      }
    }
    if (state_board == 2  ||  abs(Y_move_state_board - Y_move_state_board_target2) < real(2000)) {
      if (this.index % 3 == 0  ||  (this.index+3-1) % 3 == 0) {
        for (let i=0; i<this.bill2.length; i++) {
          this.bill2[i].displayInfo();
        }
      }
    }
  };
}
//@funnysandwich