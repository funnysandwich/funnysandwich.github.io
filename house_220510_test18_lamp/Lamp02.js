function Lamp02(begin) {
  this.state = 2;
  this.ran = random(-999, 999);
  this.var_easing = 0.65;
  this.begin = begin.copy();
  this.W_pole_begin = real(random(7, 10));
  this.W_pole_end = this.W_pole_begin * random(0.8, 0.85);
  this.H_ori = 0;
  this.H_ori_target = real(random(35, 60));
  this.att_H = random(0.65, 0.7);
  this.open_shine = false;


  this.is_face_left = random(1) < 0.5;



  this.node = new Array(4);




  this.ro_node = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.ro_node.length; i++) {
    const ro_z = map(noise(i*0.2+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.ro_node.length-1, 0, 1);
    const ro_x = map(noise(i*0.2+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.ro_node.length-1, 0, 1);
    this.ro_node[i][0] = ro_z;
    this.ro_node[i][1] = ro_x;
  }




  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }



  this.node_pole = Array.from(Array(this.node.length), () => new Array(8));
  for (let i=0; i<this.node_pole.length; i++) {
    for (let j=0; j<this.node_pole[i].length; j++) {
      this.node_pole[i][j] = this.begin.copy();
    }
  }




  this.W_pole_up_begin = this.W_pole_end * random(0.65, 0.75);
  this.W_pole_up_end = this.W_pole_up_begin * random(0.65, 0.75);


  this.node_up = new Array(2);
  this.node_pole_up = Array.from(Array(this.node_up.length), () => new Array(8));
  for (let i=0; i<this.node_up.length; i++) {
    this.node_up[i] = this.begin.copy();
  }
  for (let i=0; i<this.node_pole_up.length; i++) {
    for (let j=0; j<this.node_pole_up[i].length; j++) {
      this.node_pole_up[i][j] = this.begin.copy();
    }
  }







  this.angle_z_horLine = HALF_PI - random(HALF_PI*0.15, HALF_PI*0.5);

  this.L_horLine_ori = 0;
  this.L_horLine_ori_target = real(random(17, 25));
  this.att_L_horLine = random(0.75, 0.8);

  this.W_pole_horLine_begin = this.W_pole_up_begin - real(1.5);
  this.W_pole_horLine_end = this.W_pole_horLine_begin * random(0.65, 0.75);


  this.node_horLine = new Array(4);
  this.node_pole_horLine = Array.from(Array(this.node_horLine.length), () => new Array(8));

  for (let i=0; i<this.node_horLine.length; i++) {
    this.node_horLine[i] = this.begin.copy();
  }
  for (let i=0; i<this.node_pole_horLine.length; i++) {
    for (let j=0; j<this.node_pole_horLine[i].length; j++) {
      this.node_pole_horLine[i][j] = this.begin.copy();
    }
  }


  this.ro_node_horLine = Array.from(Array(this.node_horLine.length), () => new Array(2));
  for (let i=0; i<this.ro_node_horLine.length; i++) {
    const ro_z = map(i, 0, this.ro_node_horLine.length-1, HALF_PI*0.4, this.angle_z_horLine);
    this.ro_node_horLine[i][0] = this.ro_node[this.node.length-1][0] + ro_z;
    this.ro_node_horLine[i][1] = this.ro_node[this.node.length-1][1];
  }








  this.H_head = 0;
  this.H_head_target = real(random(15, 25));
  this.W_connection_head = this.W_pole_horLine_end +real(4);
  this.W_head = this.H_head_target * 0.75;

  this.node_head = Array.from(Array(2), () => new Array(7));
  for (let i=0; i<this.node_head.length; i++) {
    for (let j=0; j<this.node_head[i].length; j++) {
      this.node_head[i][j] = this.begin.copy();
    }
  }





  this.node_base = new Array(4);
  this.W_base = real(random(20, 30));
  for (let i=0; i<this.node_base.length; i++) {
    this.node_base[i] = this.begin.copy();
  }



  this.node_ring = Array.from(Array(floor(random(2, 4))), () => new Array(6));
  this.W_ring = this.W_pole_end * random(1.25, 1.75);
  for (let i=0; i<this.node_ring.length; i++) {
    for (let j=0; j<this.node_ring[i].length; j++) {
      this.node_ring[i][j] = this.begin.copy();
    }
  }











  this.update = function() {
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing*0.75);
    this.L_horLine_ori = easing_x(this.L_horLine_ori, this.L_horLine_ori_target, this.var_easing*0.2);
    this.H_head = easing_x(this.H_head, this.H_head_target, this.var_easing*0.15);


    for (let i=1; i<this.node.length; i++) {
      const h = this.H_ori*pow(this.att_H, i-1);
      let n = createVector(0, -h, 0);
      n = PRotateZ(n, this.ro_node[i][0]);
      n = PRotateX(n, this.ro_node[i][1]);
      if (this.is_face_left) {
        n = PRotateY(n, HALF_PI);
      }
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, this.var_easing);
    }




    for (let i=0; i<this.node_pole.length; i++) {
      let w = map(i, 0, this.node_pole.length-1, this.W_pole_begin, this.W_pole_end);
      for (let j=0; j<this.node_pole[i].length; j++) {
        const x = cos(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
        const y = sin(map(j, 0, this.node_pole[i].length, 0, TWO_PI)) * w/2.0;
        let n = createVector(x, 0, y);
        n = PRotateZ(n, this.ro_node[i][0]);
        n = PRotateX(n, this.ro_node[i][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node[i]);
        this.node_pole[i][j] = easing_p(this.node_pole[i][j], n, this.var_easing);
      }
    }





    for (let i=0; i<this.node_up.length; i++) {
      const h = this.H_ori * i;//*pow(this.att_H, (i-2));
      let n = createVector(0, -h, 0);
      n = PRotateZ(n, this.ro_node[this.node.length-1][0]);
      n = PRotateX(n, this.ro_node[this.node.length-1][1]);
      if (this.is_face_left) {
        n = PRotateY(n, HALF_PI);
      }
      n.add(this.node[this.node.length-1]);
      this.node_up[i] = easing_p(this.node_up[i], n, this.var_easing);
    }


    for (let i=0; i<this.node_pole_up.length; i++) {
      let w = map(i, 0, this.node_pole_up.length-1, this.W_pole_up_begin, this.W_pole_up_end);
      for (let j=0; j<this.node_pole_up[i].length; j++) {
        const x = cos(map(j, 0, this.node_pole_up[i].length, 0, TWO_PI)) * w/2.0;
        const y = sin(map(j, 0, this.node_pole_up[i].length, 0, TWO_PI)) * w/2.0;
        let n = createVector(x, 0, y);
        n = PRotateZ(n, this.ro_node[this.node.length-1][0]);
        n = PRotateX(n, this.ro_node[this.node.length-1][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node_up[i]);
        this.node_pole_up[i][j] = easing_p(this.node_pole_up[i][j], n, this.var_easing);
      }
    }





    this.node_horLine[0] = p5.Vector.sub(this.node_up[1], this.node_up[0]).mult(0.65).add(this.node_up[0]);

    for (let i=1; i<this.node_horLine.length; i++) {
      const h = this.L_horLine_ori * pow(this.att_L_horLine, i-1);
      let n = createVector(0, -h, 0);
      n = PRotateZ(n, this.ro_node_horLine[i][0]);
      n = PRotateX(n, this.ro_node_horLine[i][1]);
      if (this.is_face_left) {
        n = PRotateY(n, HALF_PI);
      }
      n.add(this.node_horLine[i-1]);
      this.node_horLine[i] = easing_p(this.node_horLine[i], n, this.var_easing);
    }


    for (let i=0; i<this.node_pole_horLine.length; i++) {
      let w = map(i, 0, this.node_pole_horLine.length-1, this.W_pole_horLine_begin, this.W_pole_horLine_end);
      for (let j=0; j<this.node_pole_horLine[i].length; j++) {
        const x = cos(map(j, 0, this.node_pole_horLine[i].length, 0, TWO_PI)) * w/2.0;
        const y = sin(map(j, 0, this.node_pole_horLine[i].length, 0, TWO_PI)) * w/2.0;
        let n = createVector(x, 0, y);
        n = PRotateZ(n, this.ro_node_horLine[i][0]);
        n = PRotateX(n, this.ro_node_horLine[i][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node_horLine[i]);
        this.node_pole_horLine[i][j] = easing_p(this.node_pole_horLine[i][j], n, this.var_easing);
      }
    }







    for (let i=0; i<this.node_head.length; i++) {
      for (let j=0; j<this.node_head[i].length; j++) {
        let x = pow(-1, (i+2)) * this.W_connection_head*0.3;
        x *= map((cos(map(j, 0, this.node_head[i].length-1, 0, TWO_PI*2))), 1, -1, 1.0, 1.5);
        let y = sin(map(j, 0, this.node_head[i].length-1, 0, PI))  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, -this.H_head*0.75, -this.H_head);
        let z = map(j, 0, this.node_head[i].length-1, -this.W_connection_head*0.5, this.W_connection_head*0.5);
        z += map(cos(map(j, 0, this.node_head[i].length-1, PI+HALF_PI, PI+HALF_PI+TWO_PI)), -1, 1, -1, 1)  *  map(sin(map(j, 0, this.node_head[i].length-1, 0, PI)), 0, 1, -this.W_head*0.3, -this.W_head*0.5);
        let n = createVector(x, y, z);
        n = PRotateZ(n, this.ro_node[this.ro_node.length-1][0] + this.angle_z_horLine);
        n = PRotateX(n, this.ro_node[this.ro_node.length-1][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node_horLine[this.node_horLine.length-1]);
        this.node_head[i][j] = easing_p(this.node_head[i][j], n, this.var_easing);
      }
    }








    for (let i=0; i<this.node_base.length; i++) {
      let n = createVector(this.W_base/2.0 * pow(-1, ceil(i%1.5)+1), 0, this.W_base/2.0 * pow(-1, floor(i/2)+1));
      n.add(this.begin);
      this.node_base[i] = easing_p(this.node_base[i], n, this.var_easing*0.5);
    }






    for (let i=0; i<this.node_ring.length; i++) {
      for (let j=0; j<this.node_ring[i].length; j++) {
        const x = cos(map(j, 0, this.node_ring[i].length, 0, TWO_PI)) * this.W_ring/2.0;
        const z = sin(map(j, 0, this.node_ring[i].length, 0, TWO_PI)) * this.W_ring/2.0;
        let n = createVector(x, 0, z);
        n = PRotateZ(n, this.ro_node[this.ro_node.length-1][0]);
        n = PRotateX(n, this.ro_node[this.ro_node.length-1][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(p5.Vector.sub(this.node_up[1], this.node_up[0]).mult(map(i, 0, this.node_ring.length, 0.15, 0.5)).add(this.node_up[0]));
        this.node_ring[i][j] = easing_p(this.node_ring[i][j], n, this.var_easing*0.75);
      }
    }






    let screen_center = screenPosition(p5.Vector.add(this.node_head[0][2], this.node_head[0][5]).mult(0.5));
    let r = real(10)*2.0;
    if (is_phone) {
      r = real(50);
    }
    if (dist(mouseX, mouseY, screen_center.x+width/2, screen_center.y+height/2) < r) {
      this.open_shine = true;
    } else {
      this.open_shine = false;
    }
  };












  this.display = function() {
    let index_pole_minX = new Array(this.node.length);
    let index_pole_maxX = new Array(this.node.length);
    let screen_pole_minX = new Array(this.node.length);
    let screen_pole_maxX = new Array(this.node.length);    

    for (let i=0; i<this.node_pole.length; i++) {
      index_pole_minX[i] = 0;
      index_pole_maxX[i] = 0;
      screen_pole_minX[i] = screenPosition(this.node_pole[i][index_pole_minX[i]]);
      screen_pole_maxX[i] = screenPosition(this.node_pole[i][index_pole_maxX[i]]);
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
    }


    let index_pole_up_minX = new Array(this.node_up.length);
    let index_pole_up_maxX = new Array(this.node_up.length);
    let screen_pole_up_minX = new Array(this.node_up.length);
    let screen_pole_up_maxX = new Array(this.node_up.length);    

    for (let i=0; i<this.node_pole_up.length; i++) {
      index_pole_up_minX[i] = 0;
      index_pole_up_maxX[i] = 0;
      screen_pole_up_minX[i] = screenPosition(this.node_pole_up[i][index_pole_up_minX[i]]);
      screen_pole_up_maxX[i] = screenPosition(this.node_pole_up[i][index_pole_up_maxX[i]]);
      for (let j=1; j<this.node_pole_up[i].length; j++) {
        if (screenPosition(this.node_pole_up[i][j]).x  <  screen_pole_up_minX[i].x) {
          screen_pole_up_minX[i] = screenPosition(this.node_pole_up[i][j]);
          index_pole_up_minX[i] = j;
        }
        if (screenPosition(this.node_pole_up[i][j]).x  >  screen_pole_up_maxX[i].x) {
          screen_pole_up_maxX[i] = screenPosition(this.node_pole_up[i][j]);
          index_pole_up_maxX[i] = j;
        }
      }
    }


    let index_pole_horLine_minX = new Array(this.node_horLine.length);
    let index_pole_horLine_maxX = new Array(this.node_horLine.length);
    let screen_pole_horLine_minX = new Array(this.node_horLine.length);
    let screen_pole_horLine_maxX = new Array(this.node_horLine.length);    

    for (let i=0; i<this.node_pole_horLine.length; i++) {
      index_pole_horLine_minX[i] = 0;
      index_pole_horLine_maxX[i] = 0;
      screen_pole_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][index_pole_horLine_minX[i]]);
      screen_pole_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][index_pole_horLine_maxX[i]]);
      for (let j=1; j<this.node_pole_horLine[i].length; j++) {
        if (screenPosition(this.node_pole_horLine[i][j]).x  <  screen_pole_horLine_minX[i].x) {
          screen_pole_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][j]);
          index_pole_horLine_minX[i] = j;
        }
        if (screenPosition(this.node_pole_horLine[i][j]).x  >  screen_pole_horLine_maxX[i].x) {
          screen_pole_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][j]);
          index_pole_horLine_maxX[i] = j;
        }
      }
    }



    const face = p5.Vector.sub(this.node_horLine[this.node_horLine.length-1], this.node_horLine[0]);
    const face_afterRoY = PRotateY(face, roY);
    const face_afterRoY_afterNor = face_afterRoY.normalize();
    let is_face_frontAndBack = false;
    if (abs(face_afterRoY_afterNor.x) < abs(face_afterRoY_afterNor.z)) {
      is_face_frontAndBack = true;
    } else {
      is_face_frontAndBack = false;
    }
    /*
    strokeWeight(real(10));
     if (face_afterRoY_afterNor.z >= 0) {
     stroke(255, 0, 0);
     if (face_afterRoY_afterNor.x >= 0) {
     stroke(255, 128, 128);
     }
     } else {
     stroke(0, 0, 255);
     if (face_afterRoY_afterNor.x >= 0) {
     stroke(128, 128, 255);
     }
     }
     point(face);
     */

    if (this.is_face_left) {
      if (face_afterRoY_afterNor.z >= 0) {
        for (let i=0; i<this.node_pole_horLine[0].length; i++) {
          this.node_pole_horLine[0][i].z += real(1);

          if (face_afterRoY_afterNor.x >= 0) {
            this.node_pole_horLine[0][i].x += map(face_afterRoY_afterNor.x, 1, 0, real(2.0), 0);
          } else {
            this.node_pole_horLine[0][i].x -= map(face_afterRoY_afterNor.x, -1, 0, real(2.0), 0);
          }
        }
      } else {
        for (let i=0; i<this.node_pole_horLine[0].length; i++) {
          this.node_pole_horLine[0][i].z += real(1.0);
          if (!is_face_frontAndBack) {
            if (face_afterRoY_afterNor.x >= 0) {
              this.node_pole_horLine[0][i].x -= real(1.0);
            } else {
              this.node_pole_horLine[0][i].x += real(1.0);
            }
          }
        }
      }
    } else {
      if (face_afterRoY_afterNor.z <= 0) {
        for (let i=0; i<this.node_pole_horLine[0].length; i++) {
          this.node_pole_horLine[0][i].x += real(1);
          if (face_afterRoY_afterNor.x >= 0) {
            this.node_pole_horLine[0][i].z += map(face_afterRoY_afterNor.x, 1, 0, real(2.0), 0);
          } else {
            this.node_pole_horLine[0][i].z -= map(face_afterRoY_afterNor.x, -1, 0, real(2.0), 0);
          }
        }
      } else {
        for (let i=0; i<this.node_pole_horLine[0].length; i++) {
          this.node_pole_horLine[0][i].x += real(1);
          if (!is_face_frontAndBack) {
            if (face_afterRoY_afterNor.x >= 0) {
              this.node_pole_horLine[0][i].z -= real(1.0);
            } else {
              this.node_pole_horLine[0][i].z += real(1.0);
            }
          }
        }
      }
    }


    noStroke();
    fill(c_white);
    beginShape(TRIANGLES);
    //for (let i=0; i<this.node_pole_horLine.length-1; i++) {
    //  for (let j=0; j<this.node_pole_horLine[i].length; j++) {
    //    TRIANGLES_getRect(this.node_pole_horLine[i][j], this.node_pole_horLine[i+1][j], this.node_pole_horLine[i+1][(j+1)%this.node_pole_horLine[i].length], this.node_pole_horLine[i][(j+1)%this.node_pole_horLine[i].length]);
    //  }
    //}
    for (let i=0; i<this.node_pole_horLine.length-1; i++) {
      TRIANGLES_getRect(this.node_pole_horLine[i][index_pole_horLine_minX[i]], this.node_pole_horLine[i+1][index_pole_horLine_minX[i+1]], this.node_pole_horLine[i+1][index_pole_horLine_maxX[i+1]], this.node_pole_horLine[i][index_pole_horLine_maxX[i]]);
    }
    for (let i=0; i<this.node_pole_up.length-1; i++) {
      for (let j=0; j<this.node_pole_up[i].length; j++) {
        TRIANGLES_getRect(this.node_pole_up[i][j], this.node_pole_up[i+1][j], this.node_pole_up[i+1][(j+1)%this.node_pole_up[i].length], this.node_pole_up[i][(j+1)%this.node_pole_up[i].length]);
      }
    }
    for (let i=0; i<this.node_pole.length-1; i++) {
      TRIANGLES_getRect(this.node_pole[i][index_pole_minX[i]], this.node_pole[i+1][index_pole_minX[i+1]], this.node_pole[i+1][index_pole_maxX[i+1]], this.node_pole[i][index_pole_maxX[i]]);
    }


    fill(0);
    for (let i=0; i<this.node_head.length; i++) {
      TRIANGLES_getRect(this.node_head[i][0], this.node_head[i][1], this.node_head[i][5], this.node_head[i][6]);
      if (i == 1) {
        TRIANGLES_getRect(this.node_head[i][1], this.node_head[i][2], this.node_head[i][4], this.node_head[i][5]);
      }
      TRIANGLES_getTriangle(this.node_head[i][2], this.node_head[i][3], this.node_head[i][4]);
    }
    for (let i=0; i<this.node_head[0].length-1; i++) {
      TRIANGLES_getRect(this.node_head[0][i], this.node_head[0][i+1], this.node_head[1][i+1], this.node_head[1][i]);
    }
    endShape();











    fill(255);
    if (this.open_shine) {
      fill(0);
    } else {
      noStroke();
      beginShape();
      texture(LED);
      vertex(this.node_head[0][2].x, this.node_head[0][2].y, this.node_head[0][2].z, 0, 0);
      vertex(this.node_head[0][4].x, this.node_head[0][4].y, this.node_head[0][4].z, 1, 0);
      vertex(this.node_head[0][5].x, this.node_head[0][5].y, this.node_head[0][5].z, 1, 1);
      vertex(this.node_head[0][1].x, this.node_head[0][1].y, this.node_head[0][1].z, 0, 1);
      endShape(CLOSE);
    }
    fill(255);








    noFill();
    stroke(0);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<this.node_pole.length-1; i++) {
      LINES_getLine(this.node_pole[i][index_pole_minX[i]], this.node_pole[i+1][index_pole_minX[i+1]]);
      LINES_getLine(this.node_pole[i][index_pole_maxX[i]], this.node_pole[i+1][index_pole_maxX[i+1]]);
    }

    for (let i=0; i<this.node_pole_up.length-1; i++) {
      let n_max = this.node_pole_up[i][index_pole_up_maxX[i]];
      let n1_max = this.node_pole_up[i+1][index_pole_up_maxX[i+1]];
      n_max = PRotateY(PRotateY(n_max, -roY).add(0, 0, real(2)), roY);
      n1_max = PRotateY(PRotateY(n1_max, -roY).add(0, 0, real(2)), roY);
      LINES_getLine(n_max, n1_max);

      let n_min = this.node_pole_up[i][index_pole_up_minX[i]];
      let n1_min = this.node_pole_up[i+1][index_pole_up_minX[i+1]];
      n_min = PRotateY(PRotateY(n_min, -roY).add(0, 0, real(2)), roY);
      n1_min = PRotateY(PRotateY(n1_min, -roY).add(0, 0, real(2)), roY);
      LINES_getLine(n_min, n1_min);
    }

    for (let i=0; i<this.node_pole_horLine.length-1; i++) {
      let n_max = this.node_pole_horLine[i][index_pole_horLine_maxX[i]];
      let n1_max = this.node_pole_horLine[i+1][index_pole_horLine_maxX[i+1]];
      if (i == 0 && !is_face_frontAndBack   &&   ((this.is_face_left && face_afterRoY_afterNor.x > 0 && face_afterRoY_afterNor.z > 0) || (!this.is_face_left && face_afterRoY_afterNor.x < 0 && face_afterRoY_afterNor.z < 0))) {
        n_max = intersection(screenPosition(n_max), screenPosition(n1_max), screenPosition(this.node_pole_up[0][index_pole_up_minX[0]]), screenPosition(this.node_pole_up[1][index_pole_up_minX[1]]));
        n_max.add(0, -real(100), 0);
        if (this.is_face_left) {
          n_max = PRotateY(PRotateY(n_max, -roY).add(0, 0, real(2)), roY);
        } else {
          n_max = PRotateY(PRotateY(n_max, -roY).add(-real(2), 0, real(1)), roY);
        }
        n_max = PRotateY(n_max, roY);
      } else {
        n_max = PRotateY(PRotateY(n_max, -roY).add(0, 0, real(2)), roY);
      }
      n1_max = PRotateY(PRotateY(n1_max, -roY).add(0, 0, real(2)), roY);
      LINES_getLine(n_max, n1_max);



      let n_min = this.node_pole_horLine[i][index_pole_horLine_minX[i]];
      let n1_min = this.node_pole_horLine[i+1][index_pole_horLine_minX[i+1]];
      if (i == 0 && !is_face_frontAndBack   &&   ((this.is_face_left && face_afterRoY_afterNor.x < 0 && face_afterRoY_afterNor.z > 0) || (!this.is_face_left && face_afterRoY_afterNor.x > 0 && face_afterRoY_afterNor.z < 0))) {
        n_min = intersection(screenPosition(n_min), screenPosition(n1_min), screenPosition(this.node_pole_up[0][index_pole_up_maxX[0]]), screenPosition(this.node_pole_up[1][index_pole_up_maxX[1]]));
        n_min.add(0, -real(100), 0);
        if (this.is_face_left) {
          n_min = PRotateY(PRotateY(n_min, -roY).add(0, 0, real(2)), roY);
        } else {
          n_min = PRotateY(PRotateY(n_min, -roY).add(-real(2), 0, real(1)), roY);
        }
        n_min = PRotateY(n_min, roY);
      } else {
        n_min = PRotateY(PRotateY(n_min, -roY).add(0, 0, real(2)), roY);
      }
      n1_min = PRotateY(PRotateY(n1_min, -roY).add(0, 0, real(2)), roY);
      LINES_getLine(n_min, n1_min);
    }



    for (let j=0; j<this.node_pole[0].length; j++) {
      if ((index_pole_maxX[0]+j)%this.node_pole[0].length == index_pole_minX[0]) {
        break;
      } else {
        LINES_getLine(this.node_pole[0][(index_pole_maxX[0]+j)%this.node_pole[0].length], this.node_pole[0][(index_pole_maxX[0]+j+1)%this.node_pole[0].length]);
      }
    }
    for (let j=0; j<this.node_pole_up[1].length; j++) {
      if ((index_pole_up_maxX[1]+j)%this.node_pole_up[1].length == index_pole_up_minX[1]) {
        break;
      } else {
        LINES_getLine(this.node_pole_up[1][(index_pole_up_maxX[1]+j)%this.node_pole_up[1].length], this.node_pole_up[1][(index_pole_up_maxX[1]+j+1)%this.node_pole_up[1].length]);
      }
    }
    //for (let j=0; j<this.node_pole_horLine[0].length; j++) {
    //  if ((index_pole_horLine_maxX[0]+j)%this.node_pole_horLine[0].length == index_pole_horLine_minX[0]) {
    //    break;
    //  } else {
    //    LINES_getLine(this.node_pole_horLine[0][(index_pole_horLine_maxX[0]+j)%this.node_pole_horLine[0].length], this.node_pole_horLine[0][(index_pole_horLine_maxX[0]+j+1)%this.node_pole_horLine[0].length]);
    //  }
    //}



    LINES_getRect(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3]);

    for (let i=0; i<this.node_ring.length; i++) {
      for (let j=0; j<this.node_ring[i].length; j++) {
        LINES_getLine(this.node_ring[i][j], this.node_ring[i][(j+1)%this.node_ring[i].length]);
      }
    }

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
    LINES_getLine(this.node_up[0], this.node_up[1]);

    for (let i=0; i<this.node_horLine.length-1; i++) {
      LINES_getLine(this.node_horLine[i], this.node_horLine[i+1]);
    }
    endShape();


    strokeWeight(real(3));
    beginShape(POINTS);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    vertex(this.node_up[1].x, this.node_up[1].y, this.node_up[1].z);

    for (let i=0; i<this.node_horLine.length; i++) {
      vertex(this.node_horLine[i].x, this.node_horLine[i].y, this.node_horLine[i].z);
    }
    endShape();
  };







  this.displayInfo_LINES = function() {
    for (let i=0; i<this.node_pole.length; i++) {
      if (!open_info_wichFloor[i]) {
        for (let j=0; j<this.node_pole[i].length; j++) {
          const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(4.0).add(this.node[i]);
          const n_next = p5.Vector.sub(this.node_pole[i][(j+1)%this.node_pole[i].length], this.node[i]).mult(4.0).add(this.node[i]);
          LINES_getLine(n, n_next);
        }
        if (i < this.node_pole.length-1) {
          for (let j=0; j<this.node_pole[i].length; j+=2) {
            const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(1.5).add(this.node[i]);
            const n_next = p5.Vector.sub(this.node_pole[i+1][j], this.node[i+1]).mult(1.5).add(this.node[i+1]);

            LINES_getLine(n, n_next);
          }
        }
      }
    }


    if (!open_info_wichFloor[open_info_wichFloor.length-1]) {
      for (let i=0; i<this.node_pole_up.length-1; i++) {
        for (let j=0; j<this.node_pole_up[i].length; j+=2) {
          const n = p5.Vector.sub(this.node_pole_up[i][j], this.node_up[i]).mult(1.5).add(this.node_up[i]);
          const n_next = p5.Vector.sub(this.node_pole_up[i+1][j], this.node_up[i+1]).mult(1.5).add(this.node_up[i+1]);

          LINES_getLine(n, n_next);
        }
      }
      for (let i=0; i<this.node_pole_horLine.length-1; i++) {
        for (let j=0; j<this.node_pole_horLine[i].length; j+=2) {
          LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i+1][j]);
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
    }




    //LINES_getRect(this.node_base[0], this.node_base[1], this.node_base[2], this.node_base[3]);




    for (let i=0; i<this.node_ring.length; i++) {
      for (let j=0; j<this.node_ring[i].length; j++) {
        LINES_getLine(this.node_ring[i][j], this.node_ring[i][(j+1)%this.node_ring[i].length]);
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
            const n = p5.Vector.sub(this.node_pole[i][j], this.node[i]).mult(1.5).add(this.node[i]);
            const n_next = p5.Vector.sub(this.node_pole[i+1][j], this.node[i+1]).mult(1.5).add(this.node[i+1]);

            LINES_getLine(n, n_next);
          }
        }
      }
    }

    if (open_info_wichFloor[open_info_wichFloor.length-1]) {
      for (let i=0; i<this.node_pole_up.length-1; i++) {
        for (let j=0; j<this.node_pole_up[i].length; j+=2) {
          const n = p5.Vector.sub(this.node_pole_up[i][j], this.node_up[i]).mult(1.5).add(this.node_up[i]);
          const n_next = p5.Vector.sub(this.node_pole_up[i+1][j], this.node_up[i+1]).mult(1.5).add(this.node_up[i+1]);

          LINES_getLine(n, n_next);
        }
      }
      for (let i=0; i<this.node_pole_horLine.length-1; i++) {
        for (let j=0; j<this.node_pole_horLine[i].length; j+=2) {
          LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i+1][j]);
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
    }
  };
}
//@funnysandwich
