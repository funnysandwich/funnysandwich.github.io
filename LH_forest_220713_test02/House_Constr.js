function House_Constr(begin, W) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.D = this.W;
  this.H_ori = 0;
  this.H_ori_target = real(random(150, 220));
  this.var_easing = random(0.2, 0.7);



  this.num_floor = floor(random(3, 5));


  this.node = new Array(this.num_floor + 1);
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }




  this.rotate_Y = random(0, HALF_PI/2.0);
  if (this.begin.x > 0) {
    this.rotate_Y = random(-HALF_PI/2.0, 0);
  }


  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.25+this.ran), 0, 1, -HALF_PI*0.5, HALF_PI*0.5) * map(i, 0, 5, 0, 1);
    let lx = map(noise(i*0.25+this.ran+999), 0, 1, -HALF_PI*0.125, HALF_PI*0.125) * map(i, 0, 5, 0, 1);
    if (this.begin.x>0) {
      lz *= -1;
    }
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }





  this.node_wall = Array.from(Array(this.node.length), () => new Array(4));
  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1)).add(this.node[i]);
    }
  }
















  this.update = function(begin) {
    this.begin = begin.copy();
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing);


    this.node[0] = this.begin.copy();
    for (let i=1; i<this.node.length; i++) {
      this.node[i] = createVector(0, -this.H_ori, 0);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i][0]);
      this.node[i] = PRotateX(this.node[i], this.node_rotate[i][1]);
      this.node[i].add(this.node[i-1]);
    }



    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D/2.0 * pow(-1, floor(j/2)+1));
        this.node_wall[i][j] = PRotateY(this.node_wall[i][j], this.rotate_Y);
        this.node_wall[i][j] = PRotateZ(this.node_wall[i][j], this.node_rotate[i][0]);
        this.node_wall[i][j] = PRotateX(this.node_wall[i][j], this.node_rotate[i][1]);
        this.node_wall[i][j].add(this.node[i]);
      }
    }
  };












  this.display = function() {
    let c1, c2, c3, c4;




    fill(lerpColor(c_far, c_near, map(sin(map(this.node[0].z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1)));

    let w_line = real(16);
    let line_move = real(1);


    for (let i=0; i<this.node_wall.length-1; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        if (i == this.node_wall.length-1-1) {
          let n = p5.Vector.sub(this.node_wall[i+1][j], this.node_wall[i][j]).setMag(real(50)).add(this.node_wall[i+1][j]);
          TRIANGLES_getLine_weight(this.node_wall[i+1][j], n, w_line);
        } 
        TRIANGLES_getLine_weight(this.node_wall[i][j], this.node_wall[i+1][j], w_line);
      }
      TRIANGLES_getLine_weight(this.node_wall[i][0], this.node_wall[i+1][1], w_line*0.5);
      TRIANGLES_getLine_weight(this.node_wall[i][2], this.node_wall[i+1][3], w_line*0.5);
    }

    for (let i=1; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        TRIANGLES_getLine_weight_Y(this.node_wall[i][j], this.node_wall[i][(j+1)%4], w_line*0.5);
      }
    }
  };













  this.displayInfo = function() {
    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }
    for (let i=0; i<this.node.length; i++) {
      LINES_getLine(this.node[i].copy().add(-real(10), 0, 0), this.node[i].copy().add(real(10), 0, 0));
    }


    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i][2], this.node_wall[i][3]);
      if (i < this.node_wall.length-1) {
        for (let j=0; j<this.node_wall[i].length; j++) {
          //LINES_getLine(this.node_wall[i][j], this.node_wall[i+1][j]);
        }
      }
    }
  };
}