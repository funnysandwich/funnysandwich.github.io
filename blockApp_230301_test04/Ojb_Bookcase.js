function Bookcase(center_d, W_room, D_room, H_room) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();
  this.W_frame = W_room;
  this.D_frame = D_room;
  this.H_frame = H_room;
  this.T_frame = real(4);
  this.T_hor = real(3);

  this.node_frame_hor = new Array(2);
  for (let i=0; i<this.node_frame_hor.length; i++) {
    this.node_frame_hor[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_frame_hor[i].length; j++) {
      for (let k=0; k<this.node_frame_hor[i][j].length; k++) {
        this.node_frame_hor[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_frame_ver = new Array(2);
  for (let i=0; i<this.node_frame_ver.length; i++) {
    this.node_frame_ver[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_frame_ver[i].length; j++) {
      for (let k=0; k<this.node_frame_hor[i][j].length; k++) {
        this.node_frame_ver[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.node_bookcase_hor = new Array(3);
  for (let i=0; i<this.node_bookcase_hor.length; i++) {
    this.node_bookcase_hor[i] = Array.from(Array(2), () => new Array(4));
    for (let j=0; j<this.node_bookcase_hor[i].length; j++) {
      for (let k=0; k<this.node_bookcase_hor[i][j].length; k++) {
        this.node_bookcase_hor[i][j][k] = this.center_d.copy();
      }
    }
  }

  this.book = [];
















  this.update = function() {
    for (let i=0; i<this.node_frame_hor.length; i++) {
      for (let j=0; j<this.node_frame_hor[i].length; j++) {
        let y = - (this.H_frame-this.T_frame)*i  -  this.T_frame*j;
        for (let k=0; k<this.node_frame_hor[i][j].length; k++) {
          this.node_frame_hor[i][j][k] = createVector(this.W_frame/2.0 * pow(-1, ceil(k%1.5)+1), y, this.D_frame/2.0 * pow(-1, floor(k/2)+1));
          this.node_frame_hor[i][j][k].add(this.center_d);
        }
      }
    }

    for (let i=0; i<this.node_frame_ver.length; i++) {
      for (let j=0; j<this.node_frame_hor[i].length; j++) {
        let x = (this.W_frame-this.T_frame)/2 * pow(-1, i+1);
        let y = -this.T_frame - (this.H_frame-this.T_frame*2)*j;
        for (let k=0; k<this.node_frame_ver[i][j].length; k++) {
          this.node_frame_ver[i][j][k] = createVector(x  +  this.T_frame/2.0 * pow(-1, ceil(k%1.5)+1), y, this.D_frame/2.0 * pow(-1, floor(k/2)+1));
          this.node_frame_ver[i][j][k].add(this.center_d);
        }
      }
    }


    for (let i=0; i<this.node_bookcase_hor.length; i++) {
      let w = this.W_frame-this.T_frame*2 - real(1);
      let d = this.D_frame * 0.85;
      let z = -this.D_frame/2 + d/2;
      for (let j=0; j<this.node_bookcase_hor[i].length; j++) {
        let y = -this.T_frame - ((this.H_frame-this.T_frame*2) / (this.node_bookcase_hor.length+1) * (i+1))  + this.T_hor/2 - this.T_hor*j;
        for (let k=0; k<this.node_bookcase_hor[i][j].length; k++) {
          this.node_bookcase_hor[i][j][k] = createVector(w/2.0 * pow(-1, ceil(k%1.5)+1), y, z+d/2.0 * pow(-1, floor(k/2)+1));
          this.node_bookcase_hor[i][j][k].add(this.center_d);
        }
      }
    }


    for (let i=0; i<this.node_bookcase_hor.length+1; i++) {
      let y = -this.T_frame-real(0.5);
      if (i > 0) {
        y -= ((this.H_frame-this.T_frame*2)/(this.node_bookcase_hor.length+1)*i) + this.T_hor/2;
      }
      let x = -this.W_frame/2 + this.T_frame+real(0.5);


      for (let j=0; j<100; j++) {
        let d = FS_rand(0.7, 0.95) * (this.D_frame * 0.85);
        let z = -this.D_frame/2 + d/2;
        let w = real(FS_rand(1.5, 3));
        if(FS_rand(0, 1) < 0.25){
          w = real(FS_rand(3.5, 5));
        }
        let h = FS_rand(0.65, 1.0) * ((this.H_frame-this.T_frame*2)/(this.node_bookcase_hor.length+1)-this.T_hor);
        x += w + real(0.5);
        if (x > this.W_frame/2-this.T_frame) {
          this.book.push(new Book((this.W_frame/2-this.T_frame)-(x-w), h, d, x-w/2+this.center_d.x, y+this.center_d.y, z+this.center_d.z));
          break;
        }
        this.book.push(new Book(w, h, d, x-w/2+this.center_d.x, y+this.center_d.y, z+this.center_d.z));
      }
    }


    for (let i=0; i<this.book.length; i++) {
      this.book[i].update();
    }
  };











  this.display = function(_state_noise, _var_noise) {
    fill(c_object);
    noStroke();
    for (let i=0; i<this.node_frame_hor.length; i++) {
      drawCylinder_TRIANGLES(this.node_frame_hor[i]);
      FS_drawShape(this.node_frame_hor[i][1]);
    }
    for (let i=0; i<this.node_frame_ver.length; i++) {
      drawCylinder_TRIANGLES(this.node_frame_ver[i]);
    }
    FS_drawShape([this.node_frame_hor[0][0][0].copy().add(0, 0, -real(0.5)), this.node_frame_hor[0][0][1].copy().add(0, 0, -real(0.5)), this.node_frame_hor[1][1][1].copy().add(0, 0, -real(0.5)), this.node_frame_hor[1][1][0].copy().add(0, 0, -real(0.5))]);
    for (let i=0; i<this.node_bookcase_hor.length; i++) {
      drawCylinder_TRIANGLES(this.node_bookcase_hor[i]);
      FS_drawShape(this.node_bookcase_hor[i][1]);
    }

    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(1));
    for (let i=0; i<this.node_frame_hor.length; i++) {
      drawCylinder_info(this.node_frame_hor[i], _state_noise, _var_noise);
    }
    for (let i=0; i<this.node_frame_ver.length; i++) {
      drawCylinder_info(this.node_frame_ver[i], _state_noise, _var_noise);
    }
    for (let i=0; i<this.node_bookcase_hor.length; i++) {
      drawCylinder_info(this.node_bookcase_hor[i], _state_noise, _var_noise);
    }



    for (let i=0; i<this.book.length; i++) {
      this.book[i].display(_state_noise, _var_noise);
    }
  };
}













































function Book(W, H, D, X, Y, Z) {
  this.W = W;
  this.H = H;
  this.D = D;

  this.node_book = Array.from(Array(2), () => new Array(4));


  this.update = function() {
    for (let i=0; i<this.node_book.length; i++) {
      let y = -this.H * i;
      for (let j=0; j<this.node_book[i].length; j++) {
        this.node_book[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D/2.0 * pow(-1, floor(j/2)+1));
        this.node_book[i][j].add(X, Y, Z);
      }
    }
  };



  this.display = function(_state_noise, _var_noise) {
    fill(c_object);
    noStroke();
    drawCylinder_TRIANGLES(this.node_book);
    FS_drawShape(this.node_book[1]);


    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(1));
    drawCylinder_info(this.node_book, _state_noise, _var_noise);
  };
}