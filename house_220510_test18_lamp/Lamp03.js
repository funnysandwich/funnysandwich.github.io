function Lamp03(begin) {
  this.state = 3;
  this.ran = random(-999, 999);
  this.var_easing = 0.65;
  this.begin = begin.copy();
  this.W_pole_begin = real(random(5, 7));
  this.W_pole_end = this.W_pole_begin * random(0.65, 0.85);
  this.H_ori = 0;
  this.H_ori_target = real(random(55, 75));
  this.att_H = random(0.8, 0.88);

  this.open_shine = false;
  this.open_tv = false;
  this.add_time_tv = 1;

  this.is_face_left = random(1) < 0.5;



  this.node = new Array(4);




  this.ro_node = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.ro_node.length; i++) {
    const ro_z = map(noise(i*0.2+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.ro_node.length-1, 0, 1);
    const ro_x = map(noise(i*0.2+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.ro_node.length-1, 0, 1);
    this.ro_node[i][0] = ro_z;
    this.ro_node[i][1] = ro_x;
  }




  this.node[0] = this.begin.copy();
  for (let i=1; i<this.node.length; i++) {
    this.node[i] = this.node[0].copy();
  }








  this.node_pole = Array.from(Array(this.node.length), () => new Array(8));
  for (let i=0; i<this.node_pole.length; i++) {
    for (let j=0; j<this.node_pole[i].length; j++) {
      this.node_pole[i][j] = this.begin.copy();
    }
  }






  this.D_wing = 0;
  this.D_wing_target = real(random(50, 75));

  this.W_wing = this.D_wing_target * random(0.15, 0.2);
  this.node_wing = Array.from(Array(5), () => new Array(2));
  for (let i=0; i<this.node_wing.length; i++) {
    for (let j=0; j<2; j++) {
      this.node_wing[i][j] = this.begin.copy();
    }
  }





  this.L_horLine = 0;
  this.L_horLine_target = this.H_ori_target * random(0.2, 0.25);
  this.angle_z_horLine = HALF_PI/2.0 + random(0, HALF_PI*0.25);
  this.node_horLine = new Array(2);
  this.node_horLine[0] = this.begin.copy();
  this.node_horLine[1] = this.begin.copy();

  this.node_pole_horLine = Array.from(Array(2), () => new Array(this.node_pole[0].length));
  for (let i=0; i<this.node_pole_horLine.length; i++) {
    for (let j=0; j<this.node_pole_horLine[i].length; j++) {
      this.node_pole_horLine[i][j] = this.begin.copy();
    }
  }







  this.H_head = 0;
  this.H_head_target = real(random(15, 25));
  this.W_connection_head = this.W_pole_end +real(2);
  this.W_head = this.H_head_target * 0.75;

  this.node_head = Array.from(Array(2), () => new Array(7));
  for (let i=0; i<this.node_head.length; i++) {
    for (let j=0; j<this.node_head[i].length; j++) {
      this.node_head[i][j] = this.begin.copy();
    }
  }
















  this.L_monitor = 0;
  this.L_monitor_target = real(random(6, 15));
  this.node_monitor = Array.from(Array(2), () => new Array(2));
  for (let i=0; i<this.node_monitor.length; i++) {
    for (let j=0; j<this.node_monitor[i].length; j++) {
      this.node_monitor[i][j] = this.begin.copy();
    }
  }







  this.W_TV = 0;
  this.W_TV_target = real(random(15, 30));
  this.D_TV = 0;
  this.D_TV_target = real(random(7, 10));
  this.H_TV = 0;
  this.H_TV_target = this.W_TV_target * random(1.5, 2.0);
  this.node_TV = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_TV.length; i++) {
    for (let j=0; j<this.node_TV[i].length; j++) {
      this.node_TV[i][j] = this.begin.copy();
    }
  }




  this.W_base = 0;
  this.W_base_target = real(random(4, 10));
  this.H_base = real(random(7, 20));
  this.node_base = Array.from(Array(4), () => new Array(3));
  for (let i=0; i<this.node_base.length; i++) {
    for (let j=0; j<this.node_base[i].length; j++) {
      this.node_base[i][j] = this.begin.copy();
    }
  }




















  this.update = function() {
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing*0.75);
    this.D_wing = easing_x(this.D_wing, this.D_wing_target, this.var_easing*0.2);
    this.L_monitor = easing_x(this.L_monitor, this.L_monitor_target, this.var_easing*0.25);
    this.L_horLine = easing_x(this.L_horLine, this.L_horLine_target, this.var_easing*0.15);
    this.H_head = easing_x(this.H_head, this.H_head_target, this.var_easing*0.15);
    this.W_TV = easing_x(this.W_TV, this.W_TV_target, this.var_easing*0.35);
    this.D_TV = easing_x(this.D_TV, this.D_TV_target, this.var_easing*0.35);
    this.H_TV = easing_x(this.H_TV, this.H_TV_target, this.var_easing*0.35);
    this.W_base = easing_x(this.W_base, this.W_base_target, this.var_easing*0.3);




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






    for (let i=0; i<this.node_wing.length; i++) {
      for (let j=0; j<2; j++) {
        const x = map(sin(map(i, 0, this.node_wing.length-1, 0, PI)), 0, 1, this.W_wing*0.5, this.W_wing) * pow(-1, j+1) / 2.0;
        const z = map(i, 0, this.node_wing.length-1, -this.D_wing/2.0, this.D_wing/2.0);
        const y = map(sin(map(i, 0, this.node_wing.length-1, 0, PI)), 0, 1, -this.D_wing*0.1, 0);
        let n = createVector(x, y, z);
        n = PRotateZ(n, this.ro_node[this.ro_node.length-1][0]);
        n = PRotateX(n, this.ro_node[this.ro_node.length-1][1]);
        if (this.is_face_left) {
          n = PRotateY(n, HALF_PI);
        }
        n.add(this.node[this.node.length-1]);
        this.node_wing[i][j] = easing_p(this.node_wing[i][j], n, this.var_easing);
      }
    }










    this.node_horLine[0] = p5.Vector.sub(this.node[this.node.length-2], this.node[this.node.length-1]).mult(0.25).add(this.node[this.node.length-1]);
    this.node_horLine[1] = createVector(0, -this.L_horLine, 0);
    this.node_horLine[1] = PRotateZ(this.node_horLine[1], this.ro_node[this.ro_node.length-1][0] + this.angle_z_horLine);
    this.node_horLine[1] = PRotateX(this.node_horLine[1], this.ro_node[this.ro_node.length-1][1]);
    if (this.is_face_left) {
      this.node_horLine[1] = PRotateY(this.node_horLine[1], HALF_PI);
    }
    this.node_horLine[1].add(this.node_horLine[0]);


    for (let i=0; i<this.node_pole_horLine.length; i++) {
      const w = map(i, 0, this.node_pole_horLine.length-1, this.W_pole_end, this.W_pole_end*0.35);
      for (let j=0; j<this.node_pole_horLine[i].length; j++) {
        const x = cos(map(j, 0, this.node_pole_horLine[i].length, 0, TWO_PI)) * w/2.0;
        const z = sin(map(j, 0, this.node_pole_horLine[i].length, 0, TWO_PI)) * w/2.0;
        this.node_pole_horLine[i][j] = createVector(x, 0, z);
        if (i == 0) {
          this.node_pole_horLine[i][j] = PRotateZ(this.node_pole_horLine[i][j], this.ro_node[this.ro_node.length-1][0] + HALF_PI);
        } else {
          this.node_pole_horLine[i][j] = PRotateZ(this.node_pole_horLine[i][j], this.ro_node[this.ro_node.length-1][0] + this.angle_z_horLine);
        }
        this.node_pole_horLine[i][j] = PRotateX(this.node_pole_horLine[i][j], this.ro_node[this.ro_node.length-1][1]);
        if (this.is_face_left) {
          this.node_pole_horLine[i][j] = PRotateY(this.node_pole_horLine[i][j], HALF_PI);
        }
        this.node_pole_horLine[i][j].add(this.node_horLine[i]);
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
        n.add(this.node_horLine[1]);
        this.node_head[i][j] = easing_p(this.node_head[i][j], n, this.var_easing);
      }
    }






    for (let i=0; i<this.node_monitor.length; i++) {
      for (let j=0; j<this.node_monitor[i].length; j++) {
        let z = this.L_monitor * pow(-1, i);
        let y = j * real(5);
        this.node_monitor[i][j] = createVector(0, y, z);
        this.node_monitor[i][j] = PRotateZ(this.node_monitor[i][j], this.ro_node[this.ro_node.length-1][0]);
        this.node_monitor[i][j] = PRotateX(this.node_monitor[i][j], this.ro_node[this.ro_node.length-1][1]);
        if (this.is_face_left) {
          this.node_monitor[i][j] = PRotateY(this.node_monitor[i][j], HALF_PI);
        }
        this.node_monitor[i][j].add(p5.Vector.sub(this.node[this.node.length-2], this.node[this.node.length-1]).mult(0.333).add(this.node[this.node.length-1]));
      }
    }






    for (let i=0; i<this.node_TV.length; i++) {
      const h = this.H_TV/2.0 * pow(-1, i);
      for (let j=0; j<this.node_TV[i].length; j++) {
        this.node_TV[i][j] = createVector(this.D_TV/2.0 * pow(-1, ceil(j%1.5)+1), h, this.W_TV/2.0 * pow(-1, floor(j/2)+1));
        this.node_TV[i][j].add(0, 0, -this.W_TV/2.0-this.W_pole_begin/2.0);
        this.node_TV[i][j] = PRotateZ(this.node_TV[i][j], this.ro_node[2][0]);
        this.node_TV[i][j] = PRotateX(this.node_TV[i][j], this.ro_node[2][1]);
        if (this.is_face_left) {
          this.node_TV[i][j] = PRotateY(this.node_TV[i][j], HALF_PI);
        }
        this.node_TV[i][j].add(p5.Vector.add(this.node[1], this.node[2]).mult(0.5));
      }
    }





    for (let i=0; i<this.node_base.length; i++) {
      this.node_base[i][0] = this.node_pole[0][i*2+1].copy();
      this.node_base[i][1] = p5.Vector.sub(this.node_pole[1][i*2+1], this.node_pole[0][i*2+1]).setMag(this.H_base).add(this.node_pole[0][i*2+1]);
      this.node_base[i][2] = p5.Vector.sub(this.node_pole[0][i*2+1], this.node_pole[0][((i*2+1)+4)%8]).setMag(this.W_base).add(this.node_pole[0][i*2+1]);
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


    let screen_center_tv = screenPosition(p5.Vector.add(this.node_TV[1][2], this.node_TV[0][1]).mult(0.5));
    let h_tv = p5.Vector.dist(this.node_TV[1][2], this.node_TV[0][1]);
    r = h_tv/2.0;
    if (is_phone) {
      r = h_tv*0.85;
    }
    if (dist(mouseX, mouseY, screen_center_tv.x+width/2, screen_center_tv.y+height/2) < r) {
      this.open_tv = true;
    } else {
      this.open_tv = false;
    }

    if (this.open_tv) {
      this.add_time_tv = easing_x(this.add_time_tv, 6, 0.5);
    } else {
      this.add_time_tv = easing_x(this.add_time_tv, 1, 0.05);
    }
    time_tv += this.add_time_tv;

    if (time_tv >= 180) {
      open_tv = 0;
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







    const face = p5.Vector.sub(this.node_horLine[1], this.node_horLine[0]);
    const face_afterRoY = PRotateY(face, roY);
    const face_afterRoY_afterNor = face_afterRoY.normalize();
    let is_face_frontAndBack = false;
    if (abs(face_afterRoY_afterNor.x) < abs(face_afterRoY_afterNor.z)) {
      is_face_frontAndBack = true;
    } else {
      is_face_frontAndBack = false;
    }





    let index_horLine_minX = new Array(this.node_pole_horLine.length);
    let index_horLine_maxX = new Array(this.node_pole_horLine.length);
    let screen_horLine_minX = new Array(this.node_pole_horLine.length);
    let screen_horLine_maxX = new Array(this.node_pole_horLine.length);
    for (let i=0; i<this.node_pole_horLine.length; i++) {
      index_horLine_minX[i] = 0;
      index_horLine_maxX[i] = 0;
      screen_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][index_horLine_minX[i]]);
      screen_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][index_horLine_maxX[i]]);


      //-------------------
      for (let j=1; j<this.node_pole_horLine[i].length; j++) {
        if (is_face_frontAndBack) {
          if (screenPosition(this.node_pole_horLine[i][j]).x  <  screen_horLine_minX[i].x) {
            screen_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][j]);
            index_horLine_minX[i] = j;
          }
          if (screenPosition(this.node_pole_horLine[i][j]).x  >  screen_horLine_maxX[i].x) {
            screen_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][j]);
            index_horLine_maxX[i] = j;
          }
        } else {
          if (face_afterRoY.x > 0) {
            if (screenPosition(this.node_pole_horLine[i][j]).y  <  screen_horLine_minX[i].y) {
              screen_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][j]);
              index_horLine_minX[i] = j;
            }
            if (screenPosition(this.node_pole_horLine[i][j]).y  >  screen_horLine_maxX[i].y) {
              screen_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][j]);
              index_horLine_maxX[i] = j;
            }
          } else {
            if (screenPosition(this.node_pole_horLine[i][j]).y  >  screen_horLine_minX[i].y) {
              screen_horLine_minX[i] = screenPosition(this.node_pole_horLine[i][j]);
              index_horLine_minX[i] = j;
            }
            if (screenPosition(this.node_pole_horLine[i][j]).y  <  screen_horLine_maxX[i].y) {
              screen_horLine_maxX[i] = screenPosition(this.node_pole_horLine[i][j]);
              index_horLine_maxX[i] = j;
            }
          }
        }
      }
      //-------------------
    }








    noStroke();
    beginShape(TRIANGLES);
    fill(c_white);
    for (let i=0; i<this.node_pole.length-1; i++) {
      TRIANGLES_getRect(this.node_pole[i][index_pole_minX[i]], this.node_pole[i+1][index_pole_minX[i+1]], this.node_pole[i+1][index_pole_maxX[i+1]], this.node_pole[i][index_pole_maxX[i]]);
      if (i == this.node_pole.length-2) {
        for (let j=0; j<this.node_pole[i].length; j++) {
          TRIANGLES_getRect(this.node_pole[i][j], this.node_pole[i+1][j], this.node_pole[i+1][(j+1)%this.node_pole[i].length], this.node_pole[i][(j+1)%this.node_pole[i].length]);
        }
      }
    }
    for (let i=0; i<this.node_pole_horLine[0].length; i++) {
      TRIANGLES_getRect(this.node_pole_horLine[0][i], this.node_pole_horLine[1][i], this.node_pole_horLine[1][(i+1)%this.node_pole_horLine[0].length], this.node_pole_horLine[0][(i+1)%this.node_pole_horLine[0].length]);
    }


    fill(0);
    for (let i=0; i<this.node_wing.length-1; i++) {
      TRIANGLES_getRect(this.node_wing[i][0], this.node_wing[i][1], this.node_wing[i+1][1], this.node_wing[i+1][0]);
    }
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


    TRIANGLES_getRect(this.node_TV[0][0], this.node_TV[0][1], this.node_TV[0][2], this.node_TV[0][3]);
    TRIANGLES_getRect(this.node_TV[1][0], this.node_TV[1][1], this.node_TV[1][2], this.node_TV[1][3]);

    TRIANGLES_getRect(this.node_TV[1][0], this.node_TV[1][1], this.node_TV[0][1], this.node_TV[0][0]);
    TRIANGLES_getRect(this.node_TV[1][3], this.node_TV[1][2], this.node_TV[0][2], this.node_TV[0][3]);

    TRIANGLES_getRect(this.node_TV[1][0], this.node_TV[1][3], this.node_TV[0][3], this.node_TV[0][0]);
    //TRIANGLES_getRect(this.node_TV[1][1], this.node_TV[1][2], this.node_TV[0][2], this.node_TV[0][1]);


    fill(c_white);
    for (let i=0; i<this.node_base.length; i++) {
      TRIANGLES_getTriangle(this.node_base[i][0], this.node_base[i][1], this.node_base[i][2]);
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


    fill(255);
    noStroke();
    beginShape();
    texture(TV);
    vertex(this.node_TV[1][2].x, this.node_TV[1][2].y, this.node_TV[1][2].z, 0, 0);
    vertex(this.node_TV[1][1].x, this.node_TV[1][1].y, this.node_TV[1][1].z, 1, 0);
    vertex(this.node_TV[0][1].x, this.node_TV[0][1].y, this.node_TV[0][1].z, 1, 1);
    vertex(this.node_TV[0][2].x, this.node_TV[0][2].y, this.node_TV[0][2].z, 0, 1);
    endShape(CLOSE);
    fill(255);






    noFill();
    stroke(0);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<this.node_pole.length-2; i++) {
      LINES_getLine(this.node_pole[i][index_pole_minX[i]], this.node_pole[i+1][index_pole_minX[i+1]]);
      LINES_getLine(this.node_pole[i][index_pole_maxX[i]], this.node_pole[i+1][index_pole_maxX[i+1]]);
    }
    let n_max = this.node_pole[this.node.length-1][index_pole_maxX[this.node.length-1]];
    let n1_max = this.node_pole[this.node.length-2][index_pole_maxX[this.node.length-2]];
    n_max = PRotateY(PRotateY(n_max, -roY).add(0, 0, real(2)), roY);
    n1_max = PRotateY(PRotateY(n1_max, -roY).add(0, 0, real(2)), roY);
    LINES_getLine(n_max, n1_max);
    let n_min = this.node_pole[this.node.length-1][index_pole_minX[this.node.length-1]];
    let n1_min = this.node_pole[this.node.length-2][index_pole_minX[this.node.length-2]];
    n_min = PRotateY(PRotateY(n_min, -roY).add(0, 0, real(2)), roY);
    n1_min = PRotateY(PRotateY(n1_min, -roY).add(0, 0, real(2)), roY);
    LINES_getLine(n_min, n1_min);

    for (let j=0; j<this.node_pole[0].length; j++) {
      if ((index_pole_maxX[0]+j)%this.node_pole[0].length == index_pole_minX[0]) {
        break;
      } else {
        LINES_getLine(this.node_pole[0][(index_pole_maxX[0]+j)%this.node_pole[0].length], this.node_pole[0][(index_pole_maxX[0]+j+1)%this.node_pole[0].length]);
      }
    }

    LINES_getLine(this.node[this.node.length-1], p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).mult(0.2).add(this.node[this.node.length-1]));





    for (let i=0; i<this.node_pole_horLine.length-1; i++) {
      LINES_getLine(this.node_pole_horLine[i][index_horLine_minX[i]], this.node_pole_horLine[i+1][index_horLine_minX[i+1]]);
      LINES_getLine(this.node_pole_horLine[i][index_horLine_maxX[i]], this.node_pole_horLine[i+1][index_horLine_maxX[i+1]]);
    }



    for (let i=0; i<this.node_wing.length-1; i++) {
      LINES_getLine(this.node_wing[i][0], this.node_wing[i+1][0]);
      LINES_getLine(this.node_wing[i][1], this.node_wing[i+1][1]);
    }
    LINES_getLine(this.node_wing[0][0], this.node_wing[0][1]);
    LINES_getLine(this.node_wing[this.node_wing.length-1][0], this.node_wing[this.node_wing.length-1][1]);

    LINES_getLine(p5.Vector.add(this.node_wing[1][0], this.node_wing[1][1]).mult(0.5), p5.Vector.sub(this.node[this.node.length-2], this.node[this.node.length-1]).mult(0.25).add(this.node[this.node.length-1]).add(0, 0, -real(1.5)));
    LINES_getLine(p5.Vector.add(this.node_wing[3][0], this.node_wing[3][1]).mult(0.5), p5.Vector.sub(this.node[this.node.length-2], this.node[this.node.length-1]).mult(0.25).add(this.node[this.node.length-1]).add(0, 0, real(1.5)));



    LINES_getLine(this.node_monitor[0][0], this.node_monitor[1][0]);
    LINES_getLine(this.node_monitor[0][0], this.node_monitor[0][1]);
    LINES_getLine(this.node_monitor[1][0], this.node_monitor[1][1]);
    //for (let i=0; i<this.node_monitor.length; i++) {

    //this.node_monitor[i].add(p5.Vector.sub(this.node[this.node.length-2], this.node[this.node.length-1]).mult(0.333).add(this.node[this.node.length-1]));
    //}



    const l = min(p5.Vector.dist(p5.Vector.sub(this.node[3], this.node[2]).mult(0.2).add(this.node[2]), this.node[2]), real(15));

    LINES_getLine(p5.Vector.sub(this.node_TV[1][0], this.node_TV[1][2]).mult(0.4).add(this.node_TV[1][2]), p5.Vector.sub(this.node[3], this.node[2]).setMag(l).add(this.node[2]));
    LINES_getLine(p5.Vector.sub(this.node_TV[0][0], this.node_TV[0][2]).mult(0.4).add(this.node_TV[0][2]), p5.Vector.sub(this.node[0], this.node[1]).setMag(l).add(this.node[1]).add(0, 0, -real(2)));



    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i][0], this.node_base[i][1]);
      LINES_getLine(this.node_base[i][0], this.node_base[i][2]);
      LINES_getLine(this.node_base[i][1], this.node_base[i][2]);
    }
    endShape();


    noFill();
    stroke(0);
    strokeWeight(real(6));
    beginShape(POINTS);
    vertex(this.node_monitor[0][1].x, this.node_monitor[0][1].y, this.node_monitor[0][1].z);
    vertex(this.node_monitor[1][1].x, this.node_monitor[1][1].y, this.node_monitor[1][1].z);
    endShape();


    /*if (is_face_frontAndBack) {
     stroke(255, 0, 0);
     } else {
     stroke(0, 0, 255);
     if (face_afterRoY.z < 0) {
     stroke(128, 128, 255);
     
     if (face_afterRoY.x > 0) {
     stroke(0, 255, 255);
     }
     }
     }
     noFill();
     strokeWeight(real(10));
     point(real(100), 0, 0);
     */






    TV.background(0);
    TV.rectMode(CENTER);
    TV.noFill();
    TV.stroke(255);
    TV.strokeWeight(3);


    for (let i=0; i<5; i++) {
      TV.rect(TV.width/2, TV.height/2, map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.width, 0), map((time_tv+map(i, 0, 5, 0, 180))%180, 0, 180, TV.height, 0));
    }

    TV.rectMode(CORNER);

    TV.noStroke();
    TV.fill(0);
    const w_TV = 10;
    TV.rect(0, 0, TV.width, w_TV);
    TV.rect(0, TV.height-w_TV, TV.width, w_TV);
    TV.rect(0, 0, w_TV, TV.height);
    TV.rect(TV.width-w_TV, 0, w_TV, TV.height);
  };













  this.displayInfo = function() {
    noFill();
    stroke(160);
    strokeWeight(real(1.25));
    beginShape(LINES);
    for (let i=0; i<this.node.length-1; i++) {
      LINES_getLine(this.node[i], this.node[i+1]);
    }
    LINES_getLine(this.node_horLine[0], this.node_horLine[1]);

    endShape();


    strokeWeight(real(3));
    beginShape(POINTS);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
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
      for (let i=0; i<this.node_wing.length; i++) {
        LINES_getLine(this.node_wing[i][0], this.node_wing[i][1]);
        if (i < this.node_wing.length-1) {
          LINES_getLine(this.node_wing[i][0], this.node_wing[i+1][0]);
          LINES_getLine(this.node_wing[i][1], this.node_wing[i+1][1]);
        }
      }

      for (let i=0; i<this.node_pole_horLine.length; i++) {
        for (let j=0; j<this.node_pole_horLine[i].length; j++) {
          LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i][(j+1)%this.node_pole_horLine[i].length]);
          if (i==0) {
            LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i+1][j]);
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
    }


    if (!this.open_tv) {
      for (let i=0; i<4; i++) {
        LINES_getLine(this.node_TV[0][i], this.node_TV[0][(i+1)%4]);
        LINES_getLine(this.node_TV[1][i], this.node_TV[1][(i+1)%4]);
        LINES_getLine(this.node_TV[0][i], this.node_TV[1][i]);
      }
    }


    for (let i=0; i<this.node_base.length; i++) {
      LINES_getLine(this.node_base[i][0], this.node_base[i][1]);
      LINES_getLine(this.node_base[i][0], this.node_base[i][2]);
      LINES_getLine(this.node_base[i][1], this.node_base[i][2]);
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
      for (let i=0; i<this.node_wing.length; i++) {
        LINES_getLine(this.node_wing[i][0], this.node_wing[i][1]);
        if (i < this.node_wing.length-1) {
          LINES_getLine(this.node_wing[i][0], this.node_wing[i+1][0]);
          LINES_getLine(this.node_wing[i][1], this.node_wing[i+1][1]);
        }
      }

      for (let i=0; i<this.node_pole_horLine.length; i++) {
        for (let j=0; j<this.node_pole_horLine[i].length; j++) {
          LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i][(j+1)%this.node_pole_horLine[i].length]);
          if (i==0) {
            LINES_getLine(this.node_pole_horLine[i][j], this.node_pole_horLine[i+1][j]);
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
    }




    if (this.open_tv) {
      for (let i=0; i<4; i++) {
        LINES_getLine(this.node_TV[0][i], this.node_TV[0][(i+1)%4]);
        LINES_getLine(this.node_TV[1][i], this.node_TV[1][(i+1)%4]);
        LINES_getLine(this.node_TV[0][i], this.node_TV[1][i]);
      }
    }
  };
}
//@funnysandwich
