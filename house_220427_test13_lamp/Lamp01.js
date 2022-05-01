function Lamp01(begin) {
  this.state = 1;
  this.ran = random(-999, 999);
  this.var_easing = 0.65;
  this.begin = begin.copy();
  this.W_pole_begin = real(random(3, 6));
  this.W_pole_end = this.W_pole_begin * random(0.25, 0.5);
  this.W_base = this.W_pole_begin * random(1.05, 1.45);
  if (random(1) < 0.5) {
    this.W_base = this.W_pole_begin * random(2.0, 2.5);
  }
  this.H_base = map(this.W_base, this.W_pole_begin*1.05, this.W_pole_begin*2.5, real(20), real(1.5));
  this.H_ori = 0;
  this.H_ori_target = real(random(30, 50));
  this.att_H = random(0.8, 0.85);
  this.L_horLine = 0;
  this.L_horLine_target = this.H_ori_target * random(0.4, 0.7);
  this.angle_z_horLine = HALF_PI - random(HALF_PI*0.1, HALF_PI*0.45);


  this.is_face_left = random(1) < 0.5;
  this.open_shine = false;







  this.node = new Array(9);




  this.ro_node = Array.from(Array(this.node.length), () => new Array(2));
  this.ro_node_target = Array.from(Array(this.node.length), () => new Array(2));

  for (let i=0; i<5; i++) {
    const ro_z = map(noise(i*0.25+this.ran), 0, 1, -HALF_PI*0.35, HALF_PI*0.35) * map(i, 0, 5, 0, 1);
    const ro_x = map(noise(i*0.25+this.ran+999), 0, 1, -HALF_PI*0.35, HALF_PI*0.35) * map(i, 0, 5, 0, 1);
    this.ro_node_target[i][0] = ro_z;
    this.ro_node_target[i][1] = ro_x;
  }
  for (let i=5; i<8; i++) {
    const ro_z = map(i, 4, 7, 0, this.angle_z_horLine);
    this.ro_node_target[i][0] = this.ro_node_target[4][0] + ro_z;
    this.ro_node_target[i][1] = this.ro_node_target[4][1];
  }
  this.ro_node_target[8][0] = this.ro_node_target[7][0];
  this.ro_node_target[8][1] = this.ro_node_target[7][1];


  for (let i=0; i<this.ro_node.length; i++) {
    this.ro_node[i][0] = 0;
    this.ro_node[i][1] = 0;
  }






  this.node[0] = this.begin.copy();
  for (let i=1; i<this.node.length; i++) {
    this.node[i] = this.node[0].copy();
  }





  this.node_base = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_base.length; i++) {
    for (let j=0; j<this.node_base[i].length; j++) {
      this.node_base[i][j] = this.begin.copy().add(0, -this.H_base, 0);
    }
  }







  this.node_pole = Array.from(Array(this.node.length), () => new Array(8));
  for (let i=0; i<this.node_pole.length; i++) {
    let w = min(map(i, 1, this.node_pole.length-1, this.W_pole_begin, this.W_pole_end), this.W_pole_begin);
    for (let j=0; j<this.node_pole[i].length; j++) {
      const x = cos(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
      const y = sin(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
      this.node_pole[i][j] = createVector(x, 0, y);
      this.node_pole[i][j] = PRotateZ(this.node_pole[i][j], this.ro_node[i][0]);
      this.node_pole[i][j] = PRotateX(this.node_pole[i][j], this.ro_node[i][1]);
      this.node_pole[i][j].add(this.node[i]);
    }
  }




  this.H_head = 0;
  this.H_head_target = real(random(15, 25));
  this.W_connection_head = this.W_pole_end + real(2);
  this.W_head = this.H_head * 0.75;

  this.node_head = Array.from(Array(2), () => new Array(9));
  for (let i=0; i<this.node_head.length; i++) {
    for (let j=0; j<this.node_head[i].length; j++) {
      let x = pow(-1, (i+2)) * this.W_connection_head/2.0;
      x *= map((cos(map(j, 0, this.node_head[i].length-1, 0, TWO_PI*2))), 1, -1, 1.0, 1.5);
      let y = sin(map(j, 0, this.node_head[i].length-1, 0, PI))  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, -this.H_head*0.25, -this.H_head);
      let z = map(j, 0, this.node_head[i].length-1, -this.W_connection_head/2.0, this.W_connection_head/2.0);
      z += map(cos(map(j, 0, this.node_head[i].length-1, PI+HALF_PI, PI+HALF_PI+TWO_PI)), -1, 1, -1, 1)  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, this.W_head*0.05, -this.W_head*0.5);
      this.node_head[i][j] = createVector(x, y, z);
      this.node_head[i][j] = PRotateZ(this.node_head[i][j], this.ro_node[this.node.length-1][0]);
      this.node_head[i][j] = PRotateX(this.node_head[i][j], this.ro_node[this.node.length-1][1]);
      this.node_head[i][j].add(this.node[this.node.length-1]);
    }
  }




  this.W_bulb = this.W_head * 0.55;
  this.node_bulb = Array.from(Array(3), () => new Array(6));
  for (i=0; i<this.node_bulb.length; i++) {
    let w = sin(map(i, 0, this.node_bulb.length-1, HALF_PI, PI)) * (this.W_bulb/2.0);
    let x = cos(map(i, 0, this.node_bulb.length-1, HALF_PI, PI)) * (-this.W_bulb/2.0);
    for (j=0; j<this.node_bulb[i].length; j++) {
      let z = cos(map(j, 0, this.node_bulb[i].length, 0, TWO_PI)+HALF_PI) * w;
      let y = sin(map(j, 0, this.node_bulb[i].length, 0, TWO_PI)+HALF_PI) * w;
      this.node_bulb[i][j] = createVector(x, y, z);
      this.node_bulb[i][j] = PRotateZ(this.node_bulb[i][j], this.ro_node[this.node.length-1][0]);
      this.node_bulb[i][j] = PRotateX(this.node_bulb[i][j], this.ro_node[this.node.length-1][1]);
      const m1 = p5.Vector.add(this.node_head[0][2], this.node_head[0][6]).mult(0.5);
      const m2 = p5.Vector.add(this.node_head[0][3], this.node_head[0][5]).mult(0.5);
      this.node_bulb[i][j].add(p5.Vector.sub(m2, m1).mult(0.25).add(m1));
    }
  }





















  this.update = function() {
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing);
    this.L_horLine = easing_x(this.L_horLine, this.L_horLine_target, this.var_easing*0.2);



    for (let i=0; i<this.ro_node.length; i++) {
      for (let j=0; j<2; j++) {
        this.ro_node[i][j] = easing_x(this.ro_node[i][j], this.ro_node_target[i][j], this.var_easing*0.2);
      }
    }


    for (let i=1; i<this.node.length; i++) {
      let h = this.H_ori*pow(this.att_H, i-1);
      if (i == 1) {
        h = this.H_base;
      } else if (i == this.node.length-1) {
        h = this.L_horLine;
      }
      let n = createVector(0, -h, 0);
      n = PRotateZ(n, this.ro_node[i][0]);
      n = PRotateX(n, this.ro_node[i][1]);
      if (this.is_face_left) {
        n = PRotateY(n, HALF_PI);
      }
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, this.var_easing);
    }





    for (let i=0; i<this.node_base.length; i++) {
      for (let j=0; j<this.node_base[i].length; j++) {
        let n = createVector(this.W_base/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.W_base/2.0 * pow(-1, floor(j/2)+1));
        n = PRotateZ(n, this.ro_node[i][0]);
        n = PRotateX(n, this.ro_node[i][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node[i]);
        this.node_base[i][j] = easing_p(this.node_base[i][j], n, this.var_easing*0.5);
      }
    }




    for (let i=0; i<this.node_pole.length; i++) {
      let w = min(map(i, 1, this.node_pole.length-1, this.W_pole_begin, this.W_pole_end), this.W_pole_begin);
      for (let j=0; j<this.node_pole[i].length; j++) {
        const x = cos(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
        const y = sin(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
        this.node_pole[i][j] = createVector(x, 0, y);
        this.node_pole[i][j] = PRotateZ(this.node_pole[i][j], this.ro_node[i][0]);
        this.node_pole[i][j] = PRotateX(this.node_pole[i][j], this.ro_node[i][1]);
        if (this.is_face_left) {
          this.node_pole[i][j] = PRotateY(this.node_pole[i][j], HALF_PI);
        }
        this.node_pole[i][j].add(this.node[i]);
      }
    }




    this.H_head = easing_x(this.H_head, this.H_head_target, this.var_easing*0.2);
    this.W_head = this.H_head * 0.75;

    for (let i=0; i<this.node_head.length; i++) {
      for (let j=0; j<this.node_head[i].length; j++) {
        let x = pow(-1, (i+2)) * this.W_connection_head/2.0;
        x *= map((cos(map(j, 0, this.node_head[i].length-1, 0, TWO_PI*2))), 1, -1, 1.0, 1.5);
        let y = sin(map(j, 0, this.node_head[i].length-1, 0, PI))  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, -this.H_head*0.25, -this.H_head);
        let z = map(j, 0, this.node_head[i].length-1, -this.W_connection_head/2.0, this.W_connection_head/2.0);
        z += map(cos(map(j, 0, this.node_head[i].length-1, PI+HALF_PI, PI+HALF_PI+TWO_PI)), -1, 1, -1, 1)  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, this.W_head*0.05, -this.W_head*0.5);
        this.node_head[i][j] = createVector(x, y, z);
        this.node_head[i][j] = PRotateZ(this.node_head[i][j], this.ro_node[this.node.length-1][0]);
        this.node_head[i][j] = PRotateX(this.node_head[i][j], this.ro_node[this.node.length-1][1]);
        if (this.is_face_left) {
          this.node_head[i][j] = PRotateY(this.node_head[i][j], HALF_PI);
        }
        this.node_head[i][j].add(this.node[this.node.length-1]);
      }
    }



    this.W_bulb = easing_x(this.W_bulb, this.W_head * 0.55, this.var_easing*0.5);


    for (i=0; i<this.node_bulb.length; i++) {
      let w = sin(map(i, 0, this.node_bulb.length-1, HALF_PI, PI)) * (this.W_bulb/2.0);
      let x = cos(map(i, 0, this.node_bulb.length-1, HALF_PI, PI)) * (-this.W_bulb/2.0);
      for (j=0; j<this.node_bulb[i].length; j++) {
        let z = cos(map(j, 0, this.node_bulb[i].length, 0, TWO_PI)+HALF_PI) * w;
        let y = sin(map(j, 0, this.node_bulb[i].length, 0, TWO_PI)+HALF_PI) * w;
        this.node_bulb[i][j] = createVector(x, y, z);
        this.node_bulb[i][j] = PRotateZ(this.node_bulb[i][j], this.ro_node[this.node.length-1][0]);
        this.node_bulb[i][j] = PRotateX(this.node_bulb[i][j], this.ro_node[this.node.length-1][1]);
        if (this.is_face_left) {
          this.node_bulb[i][j] = PRotateY(this.node_bulb[i][j], HALF_PI);
        }
        const m1 = p5.Vector.add(this.node_head[0][2], this.node_head[0][6]).mult(0.5);
        const m2 = p5.Vector.add(this.node_head[0][3], this.node_head[0][5]).mult(0.5);
        this.node_bulb[i][j].add(p5.Vector.sub(m2, m1).mult(0.25).add(m1));
      }
    }








    let screen_center = screenPosition(p5.Vector.add(this.node_bulb[0][0], this.node_bulb[0][floor(this.node_bulb[0].length/2)]).mult(0.5));

    if (dist(mouseX, mouseY, screen_center.x+width/2, screen_center.y+height/2) < real(10)*2.0) {
      this.open_shine = true;
    } else {
      this.open_shine = false;
    }
  };


























  this.display = function() {
    const face = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]);
    const face_afterRoY = PRotateY(face, roY);
    const face_afterRoY_afterNor = face_afterRoY.normalize();
    let is_face_frontAndBack = false;
    if (abs(face_afterRoY_afterNor.x) < abs(face_afterRoY_afterNor.z)) {
      is_face_frontAndBack = true;
    } else {
      is_face_frontAndBack = false;
    }


    let index_pole_minX = new Array(this.node.length);
    let index_pole_maxX = new Array(this.node.length);
    let screen_pole_minX = new Array(this.node.length);
    let screen_pole_maxX = new Array(this.node.length);    

    for (let i=0; i<this.node_pole.length; i++) {
      index_pole_minX[i] = 0;
      index_pole_maxX[i] = 0;
      screen_pole_minX[i] = screenPosition(this.node_pole[i][index_pole_minX[i]]);
      screen_pole_maxX[i] = screenPosition(this.node_pole[i][index_pole_maxX[i]]);
      if (i < this.node_pole.length-2) {
        for (let j=1; j<this.node_pole[i].length; j++) {
          if (screenPosition(this.node_pole[i][j]).x  <  screen_pole_minX[i].x) {
            screen_pole_minX[i] = screenPosition(this.node_pole[i][j]);
            index_pole_minX[i] = j;
          }
          if (screenPosition(this.node_pole[i][j]).x  >  screen_pole_maxX[i].x) {
            screen_pole_maxX[i] = screenPosition(this.node_pole[i][j]);
            index_pole_maxX[i] = j;
          }
        }
      } else {
        //-------------------

        if (is_face_frontAndBack) {
          for (let j=1; j<this.node_pole[i].length; j++) {
            if (screenPosition(this.node_pole[i][j]).x  <  screen_pole_minX[i].x) {
              screen_pole_minX[i] = screenPosition(this.node_pole[i][j]);
              index_pole_minX[i] = j;
            }
            if (screenPosition(this.node_pole[i][j]).x  >  screen_pole_maxX[i].x) {
              screen_pole_maxX[i] = screenPosition(this.node_pole[i][j]);
              index_pole_maxX[i] = j;
            }
          }
        } else {
          if ((!this.is_face_left && face_afterRoY.x > 0)  ||  (this.is_face_left && face_afterRoY.x < 0)) {
            for (let j=1; j<this.node_pole[i].length; j++) {
              if (screenPosition(this.node_pole[i][j]).y  <  screen_pole_minX[i].y) {
                screen_pole_minX[i] = screenPosition(this.node_pole[i][j]);
                index_pole_minX[i] = j;
              }
              if (screenPosition(this.node_pole[i][j]).y  >  screen_pole_maxX[i].y) {
                screen_pole_maxX[i] = screenPosition(this.node_pole[i][j]);
                index_pole_maxX[i] = j;
              }
            }
          } 
          if ((!this.is_face_left && face_afterRoY.x <= 0)  ||  (this.is_face_left && face_afterRoY.x >= 0)) {
            for (let j=1; j<this.node_pole[i].length; j++) {
              if (screenPosition(this.node_pole[i][j]).y  >  screen_pole_minX[i].y) {
                screen_pole_minX[i] = screenPosition(this.node_pole[i][j]);
                index_pole_minX[i] = j;
              }
              if (screenPosition(this.node_pole[i][j]).y  <  screen_pole_maxX[i].y) {
                screen_pole_maxX[i] = screenPosition(this.node_pole[i][j]);
                index_pole_maxX[i] = j;
              }
            }
          }
        }
        //-------------------
      }
    }




    //-------- 先算第一层和第二层
    let index_bulb_i = new Array(this.node_bulb[0].length);
    let boundary_bulb = new Array(this.node_bulb[0].length);
    for (let j=0; j<this.node_bulb[0].length; j++) {
      boundary_bulb[j] = this.node_bulb[0][j].copy();
    }

    let ready_open_add_i = true;
    for (let j=0; j<this.node_bulb[0].length; j++) {
      let node_bulb_far = p5.Vector.sub(this.node_bulb[1][j], this.node_bulb[0][j]).setMag(real(200)).add(this.node_bulb[0][j]);
      if (!isIntersection(
        screenPosition(this.node_bulb[0][(j+1)%this.node_bulb[0].length]), 
        screenPosition(this.node_bulb[0][(j-1+this.node_bulb[0].length)%this.node_bulb[0].length]), 
        screenPosition(this.node_bulb[0][j]), 
        screenPosition(node_bulb_far)
        )) {
        index_bulb_i[j] = 1;
        boundary_bulb[j] = this.node_bulb[1][j].copy();
      } else {
        index_bulb_i[j] = 0;
      }
    }


    let count = 0;
    for (let j=0; j<this.node_bulb[0].length; j++) {
      if (index_bulb_i[j] == 1) {
        if (index_bulb_i[(j+1)%this.node_bulb[0].length] == 0) {
          boundary_bulb.splice(j+1+count, 0, this.node_bulb[0][j]);
          count += 1;
        } else if (index_bulb_i[(j-1+this.node_bulb[0].length)%this.node_bulb[0].length] == 0) {
          boundary_bulb.splice(j+count, 0, this.node_bulb[0][j]);
          count += 1;
        }
      }
    }


    //-------- 再算第三层
    let boundary_bulb_copy = new Array(boundary_bulb.length);
    for (let i=0; i<boundary_bulb.length; i++) {
      boundary_bulb_copy[i] = boundary_bulb[i].copy();
    }

    for (let i=0; i<boundary_bulb.length; i++) {
      let far = p5.Vector.sub(this.node_bulb[2][0], boundary_bulb[i]).setMag(real(200)).add(boundary_bulb[i]);
      if (!isIntersection(
        screenPosition(boundary_bulb[(i+1)%boundary_bulb.length]), 
        screenPosition(boundary_bulb[(i-1+boundary_bulb.length)%boundary_bulb.length]), 
        screenPosition(boundary_bulb[i]), 
        screenPosition(far)
        )) {
        index_bulb_i[i] = 2;
        boundary_bulb_copy[i] = this.node_bulb[2][0].copy();
      }
    }

    count = 0;
    for (let i=0; i<boundary_bulb.length; i++) {
      if (index_bulb_i[i] == 2) {
        if (index_bulb_i[(i+1)%boundary_bulb.length] != 2) {
          boundary_bulb_copy.splice(i+1+count, 0, boundary_bulb[i]);
          //boundary_bulb_copy[i] = boundary_bulb[i].copy();
          count += 1;
        } else if (index_bulb_i[(i-1+boundary_bulb.length)%boundary_bulb.length] != 2) {
          boundary_bulb_copy.splice(i+count, 0, boundary_bulb[i]);
          //boundary_bulb_copy[i] = boundary_bulb[i].copy();
          count += 1;
        }
      }
    }






    noStroke();
    beginShape(TRIANGLES);
    fill(255);
    for (let i=1; i<this.node_pole.length-1; i++) {
      for (let j=0; j<this.node_pole[i].length; j++) {
        //TRIANGLES_getRect(this.node_pole[i][j], this.node_pole[i+1][j], this.node_pole[i+1][(j+1)%this.node_pole[i].length], this.node_pole[i][(j+1)%this.node_pole[i].length]);
      }
    }
    for (let i=1; i<this.node_pole.length-1; i++) {
      TRIANGLES_getRect(this.node_pole[i][index_pole_minX[i]], this.node_pole[i][index_pole_maxX[i]], this.node_pole[i+1][index_pole_maxX[i+1]], this.node_pole[i+1][index_pole_minX[i+1]]);
    }
    //TRIANGLES_getTriangle(this.node_pole[1][index_pole_minX[1]], this.node_pole[1][index_pole_maxX[1]], p5.Vector.add(this.node_pole[2][index_pole_maxX[2]], this.node_pole[2][index_pole_minX[2]]).mult(0.5));


    fill(255);
    for (let i=0; i<this.node_base[0].length; i++) {
      TRIANGLES_getRect(this.node_base[0][i], this.node_base[1][i], this.node_base[1][(i+1)%this.node_base[0].length], this.node_base[0][(i+1)%this.node_base[0].length]);
    }
    TRIANGLES_getRect(this.node_base[1][0], this.node_base[1][1], this.node_base[1][2], this.node_base[1][3]);








    fill(0);
    for (let i=0; i<this.node_head.length; i++) {
      TRIANGLES_getRect(this.node_head[i][0], this.node_head[i][1], this.node_head[i][7], this.node_head[i][8]);
      TRIANGLES_getRect(this.node_head[i][1], this.node_head[i][2], this.node_head[i][6], this.node_head[i][7]);
      TRIANGLES_getRect(this.node_head[i][2], this.node_head[i][3], this.node_head[i][5], this.node_head[i][6]);
      TRIANGLES_getTriangle(this.node_head[i][3], this.node_head[i][4], this.node_head[i][5]);
    }

    for (let i=0; i<this.node_head[0].length-1; i++) {
      TRIANGLES_getRect(this.node_head[0][i], this.node_head[0][i+1], this.node_head[1][i+1], this.node_head[1][i]);
    }





    if (this.open_shine) {
      if (frameCount%10 < 5  &&  random(1) < 0.5) {
        fill(0);
      } else {
        fill(255);
      }
    } else {
      fill(255);
    }

    for (let i=0; i<this.node_bulb.length; i++) {
      for (j=0; j<this.node_bulb[i].length; j++) {
        if (i < this.node_bulb.length-1) {
          TRIANGLES_getRect(this.node_bulb[i][j], this.node_bulb[i][(j+1)%this.node_bulb[i].length], this.node_bulb[i+1][(j+1)%this.node_bulb[i].length], this.node_bulb[i+1][j]);
        }
      }
    }
    endShape();











    noFill();
    stroke(0);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<this.node_base.length; i++) {
      LINES_getRect(this.node_base[i][0], this.node_base[i][1], this.node_base[i][2], this.node_base[i][3]);
    }
    for (let i=0; i<this.node_base[0].length; i++) {
      LINES_getLine(this.node_base[0][i], this.node_base[1][i]);
    }
    for (let i=0; i<this.node_pole[1].length; i++) {
      LINES_getLine(this.node_pole[1][i], this.node_pole[1][(i+1)%this.node_pole[1].length]);
    }








    for (let i=1; i<this.node_pole.length-1; i++) {
      LINES_getLine(this.node_pole[i][index_pole_minX[i]], this.node_pole[i+1][index_pole_minX[i+1]]);
      LINES_getLine(this.node_pole[i][index_pole_maxX[i]], this.node_pole[i+1][index_pole_maxX[i+1]]);
    }



    for (let j=0; j<boundary_bulb_copy.length; j++) {
      LINES_getLine(boundary_bulb_copy[j], boundary_bulb_copy[(j+1)%boundary_bulb_copy.length]);
    }




    for (let i=0; i<this.node_head.length; i++) {
      for (let j=0; j<this.node_head[i].length-1; j++) {
        //LINES_getLine(this.node_head[i][j], this.node_head[i][j+1]);
      }
    }
    for (let j=0; j<this.node_head[0].length; j++) {
      //LINES_getLine(this.node_head[0][j], this.node_head[1][j]);
    }



    //for (let i=0; i<this.node_pole.length-1; i++) {
    //  const screen_pole_center = screenPosition(this.node[i]);
    //  let index_pole_minX = 0;
    //  let index_pole_maxX = 0;
    //  let screen_pole_minX = screenPosition(this.node_pole[i][index_pole_minX]);
    //  let screen_pole_maxX = screenPosition(this.node_pole[i][index_pole_maxX]);
    //  for (let j=1; j<this.node_pole[i].length; j++) {
    //    if (screenPosition(this.node_pole[i][j]).x  <  screen_pole_minX.x) {
    //      screen_pole_minX = screenPosition(this.node_pole[i][j]);
    //      index_pole_minX = j;
    //    }
    //    if (screenPosition(this.node_pole[i][j]).x  >  screen_pole_maxX.x) {
    //      screen_pole_maxX = screenPosition(this.node_pole[i][j]);
    //      index_pole_maxX = j;
    //    }
    //  }

    //  const screen_poleNext_center = screenPosition(this.node[i+1]);
    //  let index_poleNext_minX = 0;
    //  let index_poleNext_maxX = 0;
    //  let screen_poleNext_minX = screenPosition(this.node_pole[i+1][index_poleNext_minX]);
    //  let screen_poleNext_maxX = screenPosition(this.node_pole[i+1][index_poleNext_maxX]);
    //  for (let j=1; j<this.node_pole[i].length; j++) {
    //    if (screenPosition(this.node_pole[i+1][j]).x  <  screen_poleNext_minX.x) {
    //      screen_poleNext_minX = screenPosition(this.node_pole[i+1][j]);
    //      index_poleNext_minX = j;
    //    }
    //    if (screenPosition(this.node_pole[i+1][j]).x  >  screen_poleNext_maxX.x) {
    //      screen_poleNext_maxX = screenPosition(this.node_pole[i+1][j]);
    //      index_poleNext_maxX = j;
    //    }
    //  }

    //  LINES_getLine(createVector(this.node_pole[i][index_pole_minX].x, this.node_pole[i][index_pole_minX].y, this.node_pole[i][index_pole_minX].z), createVector(this.node_pole[i+1][index_poleNext_minX].x, this.node_pole[i+1][index_poleNext_minX].y, this.node_pole[i+1][index_poleNext_minX].z));
    //  LINES_getLine(createVector(this.node_pole[i][index_pole_maxX].x, this.node_pole[i][index_pole_maxX].y, this.node_pole[i][index_pole_maxX].z), createVector(this.node_pole[i+1][index_poleNext_maxX].x, this.node_pole[i+1][index_poleNext_maxX].y, this.node_pole[i+1][index_poleNext_maxX].z));
    //}




    endShape();
  };








  this.displayInfo = function() {

    noFill();
    stroke(160);
    strokeWeight(real(1.25));
    beginShape(LINES);
    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }

    endShape();


    strokeWeight(real(3));
    beginShape(POINTS);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }

    endShape();











    /*
    const face = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]);
     const face_afterRoY = PRotateY(face, roY);
     const face_afterRoY_afterNor = face_afterRoY.normalize();
     let is_face_frontAndBack = false;
     if (abs(face_afterRoY_afterNor.x) < abs(face_afterRoY_afterNor.z)) {
     is_face_frontAndBack = true;
     } else {
     is_face_frontAndBack = false;
     }
     
     
     
     
     //-------- 先算第一层和第二层
     let index_bulb_i = new Array(this.node_bulb[0].length);
     let boundary_bulb = new Array(this.node_bulb[0].length);
     for (let j=0; j<this.node_bulb[0].length; j++) {
     boundary_bulb[j] = this.node_bulb[0][j].copy();
     }
     
     let ready_open_add_i = true;
     for (let j=0; j<this.node_bulb[0].length; j++) {
     let node_bulb_far = p5.Vector.sub(this.node_bulb[1][j], this.node_bulb[0][j]).setMag(real(200)).add(this.node_bulb[0][j]);
     if (!isIntersection(
     screenPosition(this.node_bulb[0][(j+1)%this.node_bulb[0].length]), 
     screenPosition(this.node_bulb[0][(j-1+this.node_bulb[0].length)%this.node_bulb[0].length]), 
     screenPosition(this.node_bulb[0][j]), 
     screenPosition(node_bulb_far)
     )) {
     index_bulb_i[j] = 1;
     boundary_bulb[j] = this.node_bulb[1][j].copy();
     } else {
     index_bulb_i[j] = 0;
     }
     }
     
     
     let count = 0;
     for (let j=0; j<this.node_bulb[0].length; j++) {
     if (index_bulb_i[j] == 1) {
     if (index_bulb_i[(j+1)%this.node_bulb[0].length] == 0) {
     boundary_bulb.splice(j+1+count, 0, this.node_bulb[0][j]);
     count += 1;
     } else if (index_bulb_i[(j-1+this.node_bulb[0].length)%this.node_bulb[0].length] == 0) {
     boundary_bulb.splice(j+count, 0, this.node_bulb[0][j]);
     count += 1;
     }
     }
     }
     
     
     //-------- 再算第三层
     let boundary_bulb_copy = new Array(boundary_bulb.length);
     for (let i=0; i<boundary_bulb.length; i++) {
     boundary_bulb_copy[i] = boundary_bulb[i].copy();
     }
     
     for (let i=0; i<boundary_bulb.length; i++) {
     let far = p5.Vector.sub(this.node_bulb[2][0], boundary_bulb[i]).setMag(real(200)).add(boundary_bulb[i]);
     if (!isIntersection(
     screenPosition(boundary_bulb[(i+1)%boundary_bulb.length]), 
     screenPosition(boundary_bulb[(i-1+boundary_bulb.length)%boundary_bulb.length]), 
     screenPosition(boundary_bulb[i]), 
     screenPosition(far)
     )) {
     index_bulb_i[i] = 2;
     boundary_bulb_copy[i] = this.node_bulb[2][0].copy();
     }
     }
     
     count = 0;
     for (let i=0; i<boundary_bulb.length; i++) {
     if (index_bulb_i[i] == 2) {
     if (index_bulb_i[(i+1)%boundary_bulb.length] != 2) {
     boundary_bulb_copy.splice(i+1+count, 0, boundary_bulb[i]);
     //boundary_bulb_copy[i] = boundary_bulb[i].copy();
     count += 1;
     } else if (index_bulb_i[(i-1+boundary_bulb.length)%boundary_bulb.length] != 2) {
     boundary_bulb_copy.splice(i+count, 0, boundary_bulb[i]);
     //boundary_bulb_copy[i] = boundary_bulb[i].copy();
     count += 1;
     }
     }
     }
     
     
     
     
     stroke(255, 0, 0);
     strokeWeight(real(1));
     beginShape(LINES);
     for (let j=0; j<boundary_bulb_copy.length; j++) {
     LINES_getLine(boundary_bulb_copy[j], boundary_bulb_copy[(j+1)%boundary_bulb_copy.length]);
     }
     endShape();
     
     
     let ori = createVector(real(200), 0, 0);
     let n = PRotateY(ori, roY);
     if (n.x > 0) {
     stroke(0, 0, 255);
     } else {
     stroke(255, 0, 0);
     }
     strokeWeight(real(9));
     point(ori);
     
     
     strokeWeight(real(3));
     
     
     if (is_face_frontAndBack) {
     stroke(255, 0, 0);
     } else {
     stroke(0, 0, 255);
     }
     */
  };




  this.displayInfo_LINES = function() {

    //for (let i=0; i<this.node_base.length; i++) {
    //  LINES_getRect(this.node_base[i][0], this.node_base[i][1], this.node_base[i][2], this.node_base[i][3]);
    //}
    //for (let i=0; i<this.node_base[0].length; i++) {
    //  LINES_getLine(this.node_base[0][i], this.node_base[1][i]);
    //}
    for (let i=0; i<this.node_pole.length; i++) {
      if (!open_info_wichFloor[i]) {
        for (let j=0; j<this.node_pole[i].length; j++) {
          const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(4.0).add(this.node[i]);
          const n_next = p5.Vector.sub(this.node_pole[i][(j+1)%this.node_pole[i].length], this.node[i]).mult(4.0).add(this.node[i]);
          LINES_getLine(n, n_next);
        }
        if (i < this.node_pole.length-1) {
          for (let j=0; j<this.node_pole[i].length; j+=2) {
            const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(2.0).add(this.node[i]);
            const n_next = p5.Vector.sub(this.node_pole[i+1][j], this.node[i+1]).mult(2.0).add(this.node[i+1]);

            LINES_getLine(n, n_next);
          }
        }
      }
    }


    if (!this.open_shine) {
      for (let i=0; i<this.node_head.length; i++) {
        for (let j=0; j<this.node_head[i].length-1; j++) {
          LINES_getLine(this.node_head[i][j], this.node_head[i][j+1]);
        }
      }
      for (let j=0; j<this.node_head[0].length; j++) {
        LINES_getLine(this.node_head[0][j], this.node_head[1][j]);
      }



      for (let i=0; i<this.node_bulb.length; i++) {
        for (j=0; j<this.node_bulb[i].length; j++) {
          if (i < this.node_bulb.length-1) {
            LINES_getLine(this.node_bulb[i][j], this.node_bulb[i][(j+1)%this.node_bulb[i].length]);
            LINES_getLine(this.node_bulb[i][j], this.node_bulb[i+1][j]);
          }
        }
      }
    }
  };




  this.displayInfo_LINES_red = function() {
    for (let i=0; i<this.node_pole.length; i++) {
      if (open_info_wichFloor[i]) {
        for (let j=0; j<this.node_pole[i].length; j++) {
          const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(4.0).add(this.node[i]);
          const n_next = p5.Vector.sub(this.node_pole[i][(j+1)%this.node_pole[i].length], this.node[i]).mult(4.0).add(this.node[i]);
          LINES_getLine(n, n_next);
        }
        if (i < this.node_pole.length-1) {
          for (let j=0; j<this.node_pole[i].length; j+=2) {
            const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(2.0).add(this.node[i]);
            const n_next = p5.Vector.sub(this.node_pole[i+1][j], this.node[i+1]).mult(2.0).add(this.node[i+1]);

            LINES_getLine(n, n_next);
          }
        }
      }
    }



    if (this.open_shine) {
      for (let i=0; i<this.node_head.length; i++) {
        for (let j=0; j<this.node_head[i].length-1; j++) {
          LINES_getLine(this.node_head[i][j], this.node_head[i][j+1]);
        }
      }
      for (let j=0; j<this.node_head[0].length; j++) {
        LINES_getLine(this.node_head[0][j], this.node_head[1][j]);
      }



      for (let i=0; i<this.node_bulb.length; i++) {
        for (j=0; j<this.node_bulb[i].length; j++) {
          if (i < this.node_bulb.length-1) {
            LINES_getLine(this.node_bulb[i][j], this.node_bulb[i][(j+1)%this.node_bulb[i].length]);
            LINES_getLine(this.node_bulb[i][j], this.node_bulb[i+1][j]);
          }
        }
      }
    }
  };
}
//@funnysandwich
