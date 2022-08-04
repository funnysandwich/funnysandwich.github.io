function Block(begin, index_y, index_x) {
  this.begin = begin.copy();
  this.index_y = index_y;
  this.index_x = index_x;
  this.index_o = round(map(dist(this.begin.x, this.begin.y, 0, 0), 0, width/2, 0, num_hor/2));
  this.begin.z = map(this.index_y, 0, num_ver, real(-50), real(-2));
  this.is_cursor = false;
  this.ready_change = true;
  this.var_easing = random(0.4, 0.7);



  this.node = new Array(4);
  this.node[0] = this.begin.copy();
  this.node[1] = this.node[0].copy().add(-W_block/2.0, -H_block/2.0, 0);
  this.node[2] = this.node[0].copy().add(0, -H_block, 0);
  this.node[3] = this.node[0].copy().add(W_block/2.0, -H_block/2.0, 0);






  this.L_house_l = 0;
  this.L_house_r = 0;  
  this.L_house_l_target = random(0.25, 0.65) * p5.Vector.dist(this.node[0], this.node[1]);
  this.L_house_r_target = random(0.25, 0.65) * p5.Vector.dist(this.node[0], this.node[3]);
  this.H_house_floor = 0;
  this.H_house_floor_target = random(0.333, 0.4) * H_block;
  this.num_floor = floor(random(1, 4));
  if (state_change == 0) {
    this.num_floor = floor(random(map(this.index_y, 0, num_ver, 1, 6), map(this.index_y, 0, num_ver, 1.1, 10)));
  } else if (state_change == 2) {
    this.num_floor = floor(random(map(this.index_y, 0, num_ver, 6, 1), map(this.index_y, 0, num_ver, 10, 1.1)));
  } else if (state_change == 1) {
    this.num_floor = floor(max(random(map(this.index_x, 0, num_hor-2, 7, 1), 1), max(map(this.index_x, 0, num_hor-2, 10, 1.1), 1.1)));
  } else if (state_change == 3) {
    this.num_floor = floor(random(map(this.index_x, 0, num_hor, 1, 10), map(this.index_x, 0, num_hor, 1.1, 15)));
  }

  this.node_wall = Array.from(Array(this.num_floor+1), () => new Array(4));


  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<4; j++) {
      this.node_wall[i][j] = this.begin.copy();
      this.node_wall[i][j].z += real(0.5);
    }
  }




  this.is_roof_face_left = random(1) < 0.5;
  this.H_roof = random(0.95, 1.5) * this.H_house_floor_target;
  this.node_roof_f = this.begin.copy();
  this.node_roof_b = this.begin.copy();


  this.node_eaves_f = new Array(3); 
  this.node_eaves_b = new Array(3);

  for (let i=0; i<3; i++) {
    this.node_eaves_f[i] = this.begin.copy();
    this.node_eaves_b[i] = this.begin.copy();
  }

  this.show_eaves = new Array(4);
  if (this.is_roof_face_left) {
    this.show_eaves[0] = this.node_eaves_f[0].copy();
    this.show_eaves[1] = this.node_eaves_f[1].copy();
    this.show_eaves[2] = this.node_eaves_b[1].copy();
    this.show_eaves[3] = this.node_eaves_b[2].copy();
  } else {
    this.show_eaves[0] = this.node_eaves_b[0].copy();
    this.show_eaves[1] = this.node_eaves_b[1].copy();
    this.show_eaves[2] = this.node_eaves_f[1].copy();
    this.show_eaves[3] = this.node_eaves_f[2].copy();
  }











  this.change = function() {
    this.var_easing = random(0.4, 0.7);

    this.node = new Array(4);
    this.node[0] = this.begin.copy();
    this.node[1] = this.node[0].copy().add(-W_block/2.0, -H_block/2.0, 0);
    this.node[2] = this.node[0].copy().add(0, -H_block, 0);
    this.node[3] = this.node[0].copy().add(W_block/2.0, -H_block/2.0, 0);


    this.L_house_l_target = random(0.25, 0.65) * p5.Vector.dist(this.node[0], this.node[1]);
    this.L_house_r_target = random(0.25, 0.65) * p5.Vector.dist(this.node[0], this.node[3]);
    this.H_house_floor_target = random(0.333, 0.4) * H_block;
    this.num_floor = floor(random(1, 4));
    if (state_change == 0) {
      this.num_floor = floor(random(map(this.index_y, 0, num_ver, 1, 6), map(this.index_y, 0, num_ver, 1.1, 10)));
    } else if (state_change == 2) {
      this.num_floor = floor(random(map(this.index_y, 0, num_ver, 6, 1), map(this.index_y, 0, num_ver, 10, 1.1)));
    } else if (state_change == 1) {
      this.num_floor = floor(max(random(map(this.index_x, 0, num_hor-2, 7, 1), 1), max(map(this.index_x, 0, num_hor-2, 10, 1.1), 1.1)));
    } else if (state_change == 3) {
      this.num_floor = floor(random(map(this.index_x, 0, num_hor, 1, 10), map(this.index_x, 0, num_hor, 1.1, 15)));
    }

    this.node_wall = Array.from(Array(this.num_floor+1), () => new Array(4));


    for (let i=0; i<this.node_wall.length; i++) {
      let n = createVector(0, 0, 0);
      if (i == 0) {
        this.node_wall[0][0] = this.begin.copy();
        this.node_wall[0][1] = p5.Vector.sub(this.node[1], this.node[0]).setMag(this.L_house_l).add(this.node[0]);
        this.node_wall[0][3] = p5.Vector.sub(this.node[3], this.node[0]).setMag(this.L_house_r).add(this.node[0]);
        this.node_wall[0][2] = p5.Vector.sub(this.node_wall[0][1], this.node_wall[0][0]).add(this.node_wall[0][3]);
      } else {
        for (let j=0; j<4; j++) {
          this.node_wall[i][j] = createVector(0, -this.H_house_floor, 0);
          this.node_wall[i][j].add(this.node_wall[i-1][j]);
        }
      }
      for (let j=0; j<4; j++) {
        this.node_wall[i][j].z = this.begin.z+real(0.5);
      }
    }



    this.is_roof_face_left = random(1) < 0.5;
    this.H_roof = random(0.95, 1.5) * this.H_house_floor_target;
  };
















  this.update = function() {
    this.H_house_floor = easing_x(this.H_house_floor, this.H_house_floor_target, this.var_easing);
    this.L_house_l = easing_x(this.L_house_l, this.L_house_l_target, this.var_easing);
    this.L_house_r = easing_x(this.L_house_r, this.L_house_r_target, this.var_easing);


    this.node[0] = this.begin.copy();
    this.node[1] = easing_p(this.node[1], this.node[0].copy().add(-W_block/2.0, -H_block/2.0, 0), this.var_easing);
    this.node[2] = easing_p(this.node[2], this.node[0].copy().add(0, -H_block, 0), this.var_easing);
    this.node[3] = easing_p(this.node[3], this.node[0].copy().add(W_block/2.0, -H_block/2.0, 0), this.var_easing);



    for (let i=0; i<this.node_wall.length; i++) {
      let n = createVector(0, 0, 0);
      if (i == 0) {
        n = this.begin.copy();
        this.node_wall[0][0] = easing_p(this.node_wall[0][0], n, this.var_easing);
        n = p5.Vector.sub(this.node[1], this.node[0]).setMag(this.L_house_l).add(this.node[0]);
        this.node_wall[0][1] = easing_p(this.node_wall[0][1], n, this.var_easing);
        n = p5.Vector.sub(this.node[3], this.node[0]).setMag(this.L_house_r).add(this.node[0]);
        this.node_wall[0][3] = easing_p(this.node_wall[0][3], n, this.var_easing);
        n = p5.Vector.sub(this.node_wall[0][1], this.node_wall[0][0]).add(this.node_wall[0][3]);
        this.node_wall[0][2] = easing_p(this.node_wall[0][2], n, this.var_easing);
      } else {
        for (let j=0; j<4; j++) {
          n = createVector(0, -this.H_house_floor, 0);
          n.add(this.node_wall[i-1][j]);
          this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, this.var_easing);
        }
      }
      for (let j=0; j<4; j++) {
        this.node_wall[i][j].z = this.begin.z+real(0.5);
      }
    }


    if (!this.is_roof_face_left) {
      let n = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][0]).mult(0.5));
      this.node_roof_f = easing_p(this.node_roof_f, n, this.var_easing);
      n = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][1]).mult(0.5));
      this.node_roof_b = easing_p(this.node_roof_b, n, this.var_easing);
    } else {
      let n = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][0]).mult(0.5));
      this.node_roof_f = easing_p(this.node_roof_f, n, this.var_easing);
      n = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-2][0]).setMag(this.H_roof).add(p5.Vector.add(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).mult(0.5));
      this.node_roof_b = easing_p(this.node_roof_b, n, this.var_easing);
    }
    this.node_roof_f.z = this.begin.z+real(0.5);
    this.node_roof_b.z = this.begin.z+real(0.5);



    let n_f = new Array(3);
    let n_b = new Array(3);


    if (!this.is_roof_face_left) {
      n_f[0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][0]);
      n_f[1] = p5.Vector.sub(this.node_roof_f, this.node_roof_b).setMag(real(5)).add(this.node_roof_f);
      n_f[2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][3]);
      n_b[0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][0]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][1]);
      n_b[1] = p5.Vector.sub(this.node_roof_b, this.node_roof_f).setMag(real(5)).add(this.node_roof_b);
      n_b[2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][2]);
    } else {
      n_f[0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][1]);
      n_f[1] = p5.Vector.sub(this.node_roof_f, this.node_roof_b).setMag(real(5)).add(this.node_roof_f);
      n_f[2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][0]);
      n_b[0] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][1]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][2]);
      n_b[1] = p5.Vector.sub(this.node_roof_b, this.node_roof_f).setMag(real(5)).add(this.node_roof_b);
      n_b[2] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][0]).setMag(real(5)).add(this.node_wall[this.node_wall.length-1][3]);
    }

    n_f[0] = p5.Vector.sub(n_f[0], n_f[1]).setMag(real(5)).add(n_f[0]);
    n_f[2] = p5.Vector.sub(n_f[2], n_f[1]).setMag(real(5)).add(n_f[2]);
    n_b[0] = p5.Vector.sub(n_b[0], n_b[1]).setMag(real(5)).add(n_b[0]);
    n_b[2] = p5.Vector.sub(n_b[2], n_b[1]).setMag(real(5)).add(n_b[2]);

    for (let i=0; i<3; i++) {
      this.node_eaves_f[i] = easing_p(this.node_eaves_f[i], n_f[i], this.var_easing);
      this.node_eaves_b[i] = easing_p(this.node_eaves_b[i], n_b[i], this.var_easing);
      this.node_eaves_f[i].z = this.begin.z+real(0.5);
      this.node_eaves_b[i].z = this.begin.z+real(0.5);
    }




    if (this.is_roof_face_left) {
      this.show_eaves[0] = easing_p(this.show_eaves[0], this.node_eaves_f[0].copy(), this.var_easing);
      this.show_eaves[1] = easing_p(this.show_eaves[1], this.node_eaves_f[1].copy(), this.var_easing);
      this.show_eaves[2] = easing_p(this.show_eaves[2], this.node_eaves_b[1].copy(), this.var_easing);
      this.show_eaves[3] = easing_p(this.show_eaves[3], this.node_eaves_b[2].copy(), this.var_easing);
    } else {
      this.show_eaves[0] = easing_p(this.show_eaves[0], this.node_eaves_b[0].copy(), this.var_easing);
      this.show_eaves[1] = easing_p(this.show_eaves[1], this.node_eaves_b[1].copy(), this.var_easing);
      this.show_eaves[2] = easing_p(this.show_eaves[2], this.node_eaves_f[1].copy(), this.var_easing);
      this.show_eaves[3] = easing_p(this.show_eaves[3], this.node_eaves_f[2].copy(), this.var_easing);
    }






    let center = screenPosition(p5.Vector.add(this.node[0], this.node[2]).mult(0.5));
    if (isIntersection(center, createVector(mouseX-width/2.0, mouseY-height/2.0), screenPosition(this.node[0]), screenPosition(this.node[1]))    ||
      isIntersection(center, createVector(mouseX-width/2.0, mouseY-height/2.0), screenPosition(this.node[1]), screenPosition(this.node[2]))      ||
      isIntersection(center, createVector(mouseX-width/2.0, mouseY-height/2.0), screenPosition(this.node[2]), screenPosition(this.node[3]))      ||      
      isIntersection(center, createVector(mouseX-width/2.0, mouseY-height/2.0), screenPosition(this.node[3]), screenPosition(this.node[0]))
      ) {
      this.is_cursor = false;
      this.ready_change = true;
    } else {
      this.is_cursor = true;
    }
  };























  this.display = function() {


    let eaves_xxx_l = createVector(0, 0, 0);
    let eaves_xxx_r = createVector(0, 0, 0);
    let have_back_roof = false;

    if (this.is_roof_face_left) {
      if (isIntersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]))) {
        eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
      } else {
        have_back_roof = true;
        eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_f[1]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
      }
      eaves_xxx_r = intersection((this.node_eaves_f[2]), (this.node_eaves_b[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
    } else {
      if (isIntersection(screenPosition(this.node_eaves_f[2]), screenPosition(this.node_eaves_b[2]), screenPosition(this.node_wall[0][3]), screenPosition(this.node_wall[this.node_wall.length-1][3]))) {
        eaves_xxx_r = intersection((this.node_eaves_f[2]), (this.node_eaves_b[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
      } else {
        have_back_roof = true;
        eaves_xxx_r = intersection((this.node_eaves_f[1]), (this.node_eaves_f[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
      }
      eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
    }
    eaves_xxx_l.z = this.begin.z+real(0.5);
    eaves_xxx_r.z = this.begin.z+real(0.5);




    fill(255);



    if (this.show_eaves[1].y > this.node_wall[this.node_wall.length-1][1].y) {
      let p_l = intersection(this.node_wall[0][1], this.node_wall[this.node_wall.length-1][1], this.show_eaves[0], this.show_eaves[1]);
      p_l.z = this.begin.z+real(0.5);
      TRIANGLES_getRect(p_l, this.show_eaves[1], this.node_wall[0][0], this.node_wall[0][1]);
      let p_r = intersection(this.node_wall[0][3], this.node_wall[this.node_wall.length-1][3], this.show_eaves[3], this.show_eaves[2]);
      p_r.z = this.begin.z+real(0.5);
      TRIANGLES_getRect(p_r, this.show_eaves[2], this.node_wall[0][0], this.node_wall[0][3]);
      TRIANGLES_getTriangle(this.show_eaves[1], this.show_eaves[2], this.node_wall[0][0]);
    } else {
      TRIANGLES_getTriangle(eaves_xxx_l, this.show_eaves[0], this.show_eaves[1]);
      TRIANGLES_getTriangle(eaves_xxx_r, this.show_eaves[3], this.show_eaves[2]);


      TRIANGLES_getTriangle(this.node_wall[0][0], this.node_wall[0][1], this.node_wall[this.node_wall.length-1][1]);
      TRIANGLES_getRect(this.node_wall[0][0], this.node_wall[0][3], this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][1]);
      TRIANGLES_getRect(this.show_eaves[1], this.show_eaves[2], this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][1]);
    }
  };






  this.display_LINES = function() {
    LINES_getLine(this.node_wall[0][0], this.node_wall[0][1]);
    LINES_getLine(this.node_wall[0][0], this.node_wall[0][3]);



    let eaves_xxx_l = createVector(0, 0, 0);
    let eaves_xxx_r = createVector(0, 0, 0);
    let have_back_roof = false;

    if (this.is_roof_face_left) {
      if (isIntersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]))) {
        eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
      } else {
        have_back_roof = true;
        eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_f[1]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
      }
      eaves_xxx_r = intersection((this.node_eaves_f[2]), (this.node_eaves_b[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
    } else {
      if (isIntersection(screenPosition(this.node_eaves_f[2]), screenPosition(this.node_eaves_b[2]), screenPosition(this.node_wall[0][3]), screenPosition(this.node_wall[this.node_wall.length-1][3]))) {
        eaves_xxx_r = intersection((this.node_eaves_f[2]), (this.node_eaves_b[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
      } else {
        have_back_roof = true;
        eaves_xxx_r = intersection((this.node_eaves_f[1]), (this.node_eaves_f[2]), (this.node_wall[0][3]), (this.node_wall[this.node_wall.length-1][3]));
      }
      eaves_xxx_l = intersection((this.node_eaves_f[0]), (this.node_eaves_b[0]), (this.node_wall[0][1]), (this.node_wall[this.node_wall.length-1][1]));
    }
    eaves_xxx_l.z = this.begin.z+real(0.5);
    eaves_xxx_r.z = this.begin.z+real(0.5);




    LINES_getLine(this.node_wall[0][1], eaves_xxx_l);
    LINES_getLine(this.node_wall[0][3], eaves_xxx_r);


    LINES_getLine(eaves_xxx_l, this.show_eaves[0]);
    LINES_getLine(this.show_eaves[0], this.show_eaves[1]);
    LINES_getLine(this.show_eaves[1], this.show_eaves[2]);
    LINES_getLine(this.show_eaves[2], this.show_eaves[3]);
    LINES_getLine(this.show_eaves[3], eaves_xxx_r);
  };









  this.displayInfo = function() {
    if (!this.is_cursor) {
      LINES_getRect(this.node[0], this.node[1], this.node[2], this.node[3]);
    } else {
      LINES_getLine(this.node_wall[0][0], this.node_wall[0][1]);
      LINES_getLine(this.node_wall[0][0], this.node_wall[0][3]);
    }


    LINES_getLine(this.node_wall[0][0], this.node_wall[this.node_wall.length-1][0]);
    LINES_getLine(this.node_wall[0][1], this.node_wall[this.node_wall.length-1][1]);
    LINES_getLine(this.node_wall[0][3], this.node_wall[this.node_wall.length-1][3]);


    if (this.is_cursor) {
      const h = this.H_house_floor*this.num_floor + this.H_roof + real(40);

      LINES_getLine(this.node[1], this.node[1].copy().add(0, -h, 0));
      LINES_getLine(this.node[2], this.node[2].copy().add(0, -h, 0));
      LINES_getLine(this.node[3], this.node[3].copy().add(0, -h, 0));
      LINES_getRect(this.node[0].copy().add(0, -h, 0), this.node[1].copy().add(0, -h, 0), this.node[2].copy().add(0, -h, 0), this.node[3].copy().add(0, -h, 0));
      for (let i=0; i<this.node_wall.length; i++) {
        LINES_getLine(this.node_wall[i][0].copy().add(-W_block/2, -H_block/2, 0), this.node_wall[i][0].copy().add(-W_block/2-real(10), -H_block/2, 0));
      }
      LINES_getLine(this.node_wall[this.node_wall.length-1][0].copy().add(-W_block/2-real(20), -H_block/2, 0), this.node_wall[this.node_wall.length-1][0].copy().add(-W_block/2, -H_block/2-this.H_roof, 0));
    }
  };





  this.displayInfo_TRIANGLES = function() {
    if (this.is_cursor) {
      fill(255);
    } else {
      fill(255, 60);
    }
    for (let i=0; i<this.node_wall.length-1; i++) {
      TRIANGLES_getRect(this.node_wall[i][0], this.node_wall[i][1], this.node_wall[i+1][1], this.node_wall[i+1][0]);
      TRIANGLES_getRect(this.node_wall[i][0], this.node_wall[i][3], this.node_wall[i+1][3], this.node_wall[i+1][0]);
    }
    if (this.is_roof_face_left) {
      TRIANGLES_getTriangle(this.node_roof_f, this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][1]);
    } else {
      TRIANGLES_getTriangle(this.node_roof_f, this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]);
    }

    if (this.is_cursor) {
      fill(128);
    } else {
      fill(0, 30);
    }

    TRIANGLES_getRect(this.node_eaves_f[0], this.node_eaves_f[1], this.node_eaves_b[1], this.node_eaves_b[0]);
    TRIANGLES_getRect(this.node_eaves_f[2], this.node_eaves_f[1], this.node_eaves_b[1], this.node_eaves_b[2]);



    if (this.is_cursor) {
      fill(200);
      TRIANGLES_getRect(this.node[0], this.node[1], this.node[2], this.node[3]);
      fill(0, 10);
    }
  };
}
//@funnysandwich