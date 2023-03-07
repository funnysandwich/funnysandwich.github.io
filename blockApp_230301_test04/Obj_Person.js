function Person(center_d, W_room, D_room, w_body) {
  this.center_d = center_d.copy();

  this.W_body = w_body;
  this.D_body = this.W_body * 0.45;
  this.H_body = this.W_body * 1.8;
  this.W_leg = this.W_body*0.45;
  this.H_leg = this.H_body * 1.25;
  this.D_arm = this.W_leg * 0.85;
  this.W_arm = this.D_arm * 0.6;
  this.H_arm = this.H_body * 1.0;
  this.W_head = this.W_body * 0.8;



  this.node_leg_l = Array.from(Array(2), () => new Array(5*2-2));
  this.node_leg_r = Array.from(Array(2), () => new Array(5*2-2));
  for (let i=0; i<this.node_leg_l.length; i++) {
    for (let j=0; j<this.node_leg_l[i].length; j++) {
      this.node_leg_l[i][j] = this.center_d.copy();
      this.node_leg_r[i][j] = this.center_d.copy();
    }
  }
  this.node_body = Array.from(Array(2), () => new Array(5*2));
  for (let i=0; i<this.node_body.length; i++) {
    for (let j=0; j<this.node_body[i].length; j++) {
      this.node_body[i][j] = this.center_d.copy();
    }
  }
  this.node_arm_l = Array.from(Array(2), () => new Array(5));
  this.node_arm_r = Array.from(Array(2), () => new Array(5));
  for (let i=0; i<this.node_arm_l.length; i++) {
    for (let j=0; j<this.node_arm_l[i].length; j++) {
      this.node_arm_l[i][j] = this.center_d.copy();
      this.node_arm_r[i][j] = this.center_d.copy();
    }
  }
  this.node_shoulder_l = Array.from(Array(4), () => new Array(5));
  this.node_shoulder_r = Array.from(Array(4), () => new Array(5));
  for (let i=0; i<this.node_shoulder_l.length; i++) {
    for (let j=0; j<this.node_shoulder_l[i].length; j++) {
      this.node_shoulder_l[i][j] = this.center_d.copy();
      this.node_shoulder_r[i][j] = this.center_d.copy();
    }
  }
  this.node_shoulder = Array.from(Array(2), () => new Array(this.node_shoulder_l.length*2-1));
  for (let i=0; i<this.node_shoulder.length; i++) {
    for (let j=0; j<this.node_shoulder[i].length; j++) {
      this.node_shoulder[i][j] = this.center_d.copy();
    }
  }
  this.node_head = Array.from(Array(11), () => new Array(12));
  for (let i=0; i<this.node_head.length; i++) {
    for (let j=0; j<this.node_head[i].length; j++) {
      this.node_head[i][j] = this.center_d.copy();
    }
  }


















  this.update = function() {
    for (let i=0; i<this.node_leg_l.length; i++) {
      let y = -this.H_leg * i;
      for (let j=0; j<this.node_leg_l[i].length; j++) {
        let x = cos(map(j, 0, this.node_leg_l[i].length, 0, TWO_PI)) * this.W_leg/2;
        let z = sin(map(j, 0, this.node_leg_l[i].length, 0, TWO_PI)) * this.W_leg/2;
        this.node_leg_l[i][j] = createVector(x-(this.W_body/2-this.W_leg/2), y, z).add(this.center_d);
        this.node_leg_r[i][j] = createVector(x+(this.W_body/2-this.W_leg/2), y, z).add(this.center_d);
      }
    }

    for (let i=0; i<this.node_body.length; i++) {
      let y = -this.H_leg  - this.H_body* i;
      for (let j=0; j<this.node_body[i].length; j++) {
        let x, z;
        if (j < floor(this.node_body[i].length/2)) {
          x = cos(map(j, 0, floor(this.node_body[i].length/2)-1, -HALF_PI, HALF_PI)) * this.D_body/2;
          z = sin(map(j, 0, floor(this.node_body[i].length/2)-1, -HALF_PI, HALF_PI)) * this.D_body/2;
          x += this.W_body/2 - this.D_body/2;
        } else {
          x = cos(map(j, floor(this.node_body[i].length/2), this.node_body[i].length-1, HALF_PI, PI+HALF_PI)) * this.D_body/2;
          z = sin(map(j, floor(this.node_body[i].length/2), this.node_body[i].length-1, HALF_PI, PI+HALF_PI)) * this.D_body/2;
          x -= this.W_body/2 - this.D_body/2;
        }
        this.node_body[i][j] = createVector(x, y, z).add(this.center_d);
      }
    }

    for (let i=0; i<this.node_arm_l.length; i++) {
      let y = -this.H_leg  - this.H_body + this.H_arm - this.H_arm*i;
      for (let j=0; j<this.node_arm_l[i].length; j++) {
        let x = cos(map(j, 0, this.node_arm_l[i].length-1, PI+HALF_PI, HALF_PI)) * this.W_arm;
        let z = sin(map(j, 0, this.node_arm_l[i].length-1, PI+HALF_PI, HALF_PI)) * this.D_arm/2;
        this.node_arm_l[i][j] = createVector(x - this.W_body/2-real(0.5), y, z).add(this.center_d);
      }
    }
    for (let i=0; i<this.node_arm_r.length; i++) {
      let y = -this.H_leg  - this.H_body + this.H_arm - this.H_arm*i;
      for (let j=0; j<this.node_arm_r[i].length; j++) {
        let x = cos(map(j, 0, this.node_arm_r[i].length-1, -HALF_PI, HALF_PI)) * this.W_arm;
        let z = sin(map(j, 0, this.node_arm_r[i].length-1, -HALF_PI, HALF_PI)) * this.D_arm/2;
        this.node_arm_r[i][j] = createVector(x + this.W_body/2+real(0.5), y, z).add(this.center_d);
      }
    }
    for (let i=0; i<this.node_shoulder_l.length; i++) {
      let y = -this.H_leg  - this.H_body - map(sin(map(i, 0, this.node_shoulder_l.length-1, 0, HALF_PI)), 0, 1, 0, this.D_arm);
      let w = map(cos(map(i, 0, this.node_shoulder_l.length-1, 0, HALF_PI)), 1, 0, this.W_arm, 0);
      let d = map(cos(map(i, 0, this.node_shoulder_l.length-1, 0, HALF_PI)), 1, 0, this.D_arm, 0);
      for (let j=0; j<this.node_shoulder_l[i].length; j++) {
        let x = cos(map(j, 0, this.node_shoulder_l[i].length-1, PI+HALF_PI, HALF_PI)) * w;
        let z = sin(map(j, 0, this.node_shoulder_l[i].length-1, PI+HALF_PI, HALF_PI)) * d/2;
        this.node_shoulder_l[i][j] = createVector(x - this.W_body/2-real(0.5), y, z).add(this.center_d);
      }
    }
    for (let i=0; i<this.node_shoulder_r.length; i++) {
      let y = -this.H_leg  - this.H_body - map(sin(map(i, 0, this.node_shoulder_r.length-1, 0, HALF_PI)), 0, 1, 0, this.D_arm);
      let w = map(cos(map(i, 0, this.node_shoulder_r.length-1, 0, HALF_PI)), 1, 0, this.W_arm, 0);
      let d = map(cos(map(i, 0, this.node_shoulder_r.length-1, 0, HALF_PI)), 1, 0, this.D_arm, 0);
      for (let j=0; j<this.node_shoulder_r[i].length; j++) {
        let x = cos(map(j, 0, this.node_shoulder_r[i].length-1, -HALF_PI, HALF_PI)) * w;
        let z = sin(map(j, 0, this.node_shoulder_r[i].length-1, -HALF_PI, HALF_PI)) * d/2;
        this.node_shoulder_r[i][j] = createVector(x + this.W_body/2+real(0.5), y, z).add(this.center_d);
      }
    }

    for (let j=0; j<this.node_shoulder[0].length; j++) {
      if (j < floor(this.node_shoulder[0].length/2)) {
        this.node_shoulder[0][j] = this.node_shoulder_l[j][0].copy();
      } else {
        this.node_shoulder[0][j] = this.node_shoulder_l[this.node_shoulder[0].length-1-j][this.node_shoulder_l[0].length-1].copy();
      }
      if (j < floor(this.node_shoulder[1].length/2)) {
        this.node_shoulder[1][j] = this.node_shoulder_r[j][0].copy();
      } else {
        this.node_shoulder[1][j] = this.node_shoulder_r[this.node_shoulder[1].length-1-j][this.node_shoulder_r[0].length-1].copy();
      }
    }


    let _center_head = this.center_d.copy().add(0, -this.H_leg-this.H_body-this.D_arm-this.W_head*0.45, 0);
    for (let i=0; i<this.node_head.length; i++) {
      let w = map(sin(map(i, 0, this.node_head.length-1, 0, PI)), 0, 1, 0, this.W_head);
      let y = map(cos(map(i, 0, this.node_head.length-1, 0, PI)), 1, -1, -this.W_head/2, this.W_head/2);
      //y -= this.H_leg+this.H_body;
      for (let j=0; j<this.node_head[i].length; j++) {
        let x = cos(map(j, 0, this.node_head[i].length, 0, TWO_PI)) * w/2;
        let z = sin(map(j, 0, this.node_head[i].length, 0, TWO_PI)) * w/2;
        this.node_head[i][j] = createVector(x, y, z).add(_center_head);
      }
    }
  };





























  this.display = function(_state_noise, _var_noise) {
    fill(c_object);
    noStroke();
    //for (let j=0; j<this.node_leg_l[0].length; j++) {
    //  FS_drawShape([this.node_leg_l[0][j], this.node_leg_l[1][j], this.node_leg_l[1][(j+1)%this.node_leg_l[0].length], this.node_leg_l[0][(j+1)%this.node_leg_l[0].length]]);
    //}
    //beginShape(TRIANGLES);
    drawCylinder_TRIANGLES(this.node_leg_l);
    drawCylinder_TRIANGLES(this.node_leg_r);
    drawCylinder_TRIANGLES(this.node_body);
    drawCylinder_TRIANGLES(this.node_arm_l);
    drawCylinder_TRIANGLES(this.node_arm_r);
    drawCylinder_TRIANGLES(this.node_shoulder_l);
    drawCylinder_TRIANGLES(this.node_shoulder_r);
    drawCylinder_TRIANGLES(this.node_shoulder);
    drawCylinder_TRIANGLES(this.node_head);
    
    TRIANGLES_getShape(this.node_body[1]);
    //endShape();

    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));

    FS_drawEllipse(this.node_leg_l[0], _state_noise, _var_noise);
    FS_drawEllipse(this.node_leg_r[0], _state_noise, _var_noise);

    FS_drawEllipse(this.node_arm_l[0], _state_noise, _var_noise);
    FS_drawEllipse(this.node_arm_r[0], _state_noise, _var_noise);


    drawCylinder_LINES(this.node_leg_l, 0, _state_noise, _var_noise);
    drawCylinder_LINES(this.node_leg_r, 0, _state_noise, _var_noise);
    drawCylinder_LINES(this.node_body, 0, _state_noise, _var_noise);

    drawCylinder_LINES(this.node_arm_l, 0, _state_noise, _var_noise);
    drawCylinder_LINES(this.node_arm_r, 0, _state_noise, _var_noise);


    let index_min = new Array(this.node_shoulder.length);
    for (let i=0; i<this.node_shoulder.length; i++) {
      index_min[i] = 0;
      for (let j=0; j<this.node_shoulder[i].length; j++) {
        if (screenPosition(this.node_shoulder[i][j]).y  <  screenPosition(this.node_shoulder[i][index_min[i]]).y) {
          index_min[i] = j;
        }
      }
    }
    FS_drawLine(this.node_shoulder[0][index_min[0]], this.node_shoulder[1][index_min[1]], _state_noise, _var_noise);


    let _point_far = p5.Vector.sub(this.node_leg_r[0][0], this.node_shoulder[0][floor(this.node_shoulder[0].length/2)]).setMag(real(500)).add(this.node_leg_r[0][0]);
    let n_edge = [];
    //   1. 判断是否有交点  --------------------------------------------------------------
    for (let i=0; i<this.node_shoulder_l.length; i++) {
      for (let j=0; j<this.node_shoulder_l[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_shoulder_l[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_shoulder_l[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_shoulder_l[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_shoulder_l[i][j]));
        let have_point = false;
        for (let _i=0; _i<this.node_shoulder_l.length; _i++) {
          for (let _j=0; _j<this.node_shoulder_l[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_shoulder_l[_i][_j]), screenPosition(this.node_shoulder_l[_i][(_j+1)%this.node_shoulder_l[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_shoulder_l.length-1) {
              if (isIntersection(screenPosition(this.node_shoulder_l[_i][_j]), screenPosition(this.node_shoulder_l[_i+1][_j]), _ray, ray)) {
                have_point = true;
                break;
              }
            }
          }
          if (have_point) {
            break;
          }
        }
        if (!have_point) {
          n_edge.push(this.node_shoulder_l[i][j].copy());
          //LINES_getLine(n_edge[n_edge.length-1], ray);
        }
      }
    }
    //   2. 排序  --------------------------------------------------------------
    let n_edge_sort = [];
    let _time_for = n_edge.length;
    for (let j=0; j<_time_for; j++) {
      let _index_max_angle = 0;
      for (let i=0; i<n_edge.length; i++) {
        let _angle_max = p5.Vector.sub(screenPosition(n_edge[_index_max_angle]), screenPosition(_point_far)).heading();
        let _angle = p5.Vector.sub(screenPosition(n_edge[i]), screenPosition(_point_far)).heading();
        if (_angle > _angle_max) {
          _index_max_angle = i;
        }
      }
      n_edge_sort.push(n_edge[_index_max_angle]);
      n_edge.splice(_index_max_angle, 1);
    }


    for (let i=0; i<n_edge_sort.length-1; i++) {
      FS_drawLine(n_edge_sort[i], n_edge_sort[i+1], _state_noise, _var_noise);
    }




    _point_far = p5.Vector.sub(this.node_body[1][floor(this.node_body[1].length/2)], this.node_shoulder[1][floor(this.node_shoulder[1].length/2)]).setMag(real(500)).add(this.node_body[1][floor(this.node_body[1].length/2)]);
    n_edge = [];
    //   1. 判断是否有交点  --------------------------------------------------------------
    for (let i=0; i<this.node_shoulder_r.length; i++) {
      for (let j=0; j<this.node_shoulder_r[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_shoulder_r[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_shoulder_r[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_shoulder_r[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_shoulder_r[i][j]));
        let have_point = false;
        for (let _i=0; _i<this.node_shoulder_r.length; _i++) {
          for (let _j=0; _j<this.node_shoulder_r[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_shoulder_r[_i][_j]), screenPosition(this.node_shoulder_r[_i][(_j+1)%this.node_shoulder_r[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_shoulder_r.length-1) {
              if (isIntersection(screenPosition(this.node_shoulder_r[_i][_j]), screenPosition(this.node_shoulder_r[_i+1][_j]), _ray, ray)) {
                have_point = true;
                break;
              }
            }
          }
          if (have_point) {
            break;
          }
        }
        for (let _i=0; _i<this.node_arm_r.length; _i++) {
          if (have_point) {
            break;
          }
          for (let _j=0; _j<this.node_arm_r[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_arm_r[_i][_j]), screenPosition(this.node_arm_r[_i][(_j+1)%this.node_shoulder_r[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_arm_r.length-1) {
              if (isIntersection(screenPosition(this.node_arm_r[_i][_j]), screenPosition(this.node_arm_r[_i+1][_j]), _ray, ray)) {
                have_point = true;
                break;
              }
            }
          }
        }
        if (!have_point) {
          n_edge.push(this.node_shoulder_r[i][j].copy());
          //LINES_getLine(n_edge[n_edge.length-1], ray);
        }
      }
    }
    //   2. 排序  --------------------------------------------------------------
    n_edge_sort = [];
    _time_for = n_edge.length;
    for (let j=0; j<_time_for; j++) {
      let _index_max_angle = 0;
      for (let i=0; i<n_edge.length; i++) {
        let _angle_max = p5.Vector.sub(screenPosition(n_edge[_index_max_angle]), screenPosition(_point_far)).heading();
        let _angle = p5.Vector.sub(screenPosition(n_edge[i]), screenPosition(_point_far)).heading();
        if (_angle > _angle_max) {
          _index_max_angle = i;
        }
      }
      n_edge_sort.push(n_edge[_index_max_angle]);
      n_edge.splice(_index_max_angle, 1);
    }


    for (let i=0; i<n_edge_sort.length-1; i++) {
      FS_drawLine(n_edge_sort[i], n_edge_sort[i+1], _state_noise, _var_noise);
    }




    _point_far = p5.Vector.sub(this.node_head[0][0], this.node_head[this.node_head.length-1][0]).setMag(real(500)).add(this.node_head[0][0]).add(-real(1), 0, real(1));
    n_edge = [];
    // head  1. 判断是否有交点  --------------------------------------------------------------
    for (let i=floor(this.node_head.length/2); i<this.node_head.length; i++) {
      for (let j=0; j<this.node_head[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_head[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_head[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_head[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_head[i][j]));
        let have_point = false;
        for (let _i=0; _i<this.node_head.length; _i++) {
          if (have_point) {
            break;
          }
          for (let _j=0; _j<this.node_head[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_head[_i][_j]), screenPosition(this.node_head[_i][(_j+1)%this.node_head[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_head.length-1) {
              if (isIntersection(screenPosition(this.node_head[_i][_j]), screenPosition(this.node_head[_i+1][_j]), _ray, ray)) {
                have_point = true;
                break;
              }
            }
          }
        }
        if (!have_point) {
          n_edge.push(this.node_head[i][j].copy());
          //LINES_getLine(n_edge[n_edge.length-1], ray);
        }
      }
    }
    // head  2. 排序  --------------------------------------------------------------
    n_edge_sort = [];
    _time_for = n_edge.length;
    for (let j=0; j<_time_for; j++) {
      let _index_max_angle = 0;
      for (let i=0; i<n_edge.length; i++) {
        let _angle_max = p5.Vector.sub(screenPosition(n_edge[_index_max_angle]), screenPosition(_point_far)).heading();
        let _angle = p5.Vector.sub(screenPosition(n_edge[i]), screenPosition(_point_far)).heading();
        if (_angle > _angle_max) {
          _index_max_angle = i;
        }
      }
      n_edge_sort.push(n_edge[_index_max_angle]);
      n_edge.splice(_index_max_angle, 1);
    }


    for (let i=0; i<n_edge_sort.length-1; i++) {
      FS_drawLine(n_edge_sort[i], n_edge_sort[i+1], _state_noise, _var_noise);
    }



    _point_far = p5.Vector.sub(this.node_head[this.node_head.length-1][0], this.node_head[0][0]).setMag(real(500)).add(this.node_head[this.node_head.length-1][0]).add(-real(1), 0, real(1));
    n_edge = [];
    // head  1. 判断是否有交点  --------------------------------------------------------------
    for (let i=0; i<floor(this.node_head.length/2)+1; i++) {
      for (let j=0; j<this.node_head[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_head[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_head[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_head[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_head[i][j]));
        let have_point = false;
        for (let _i=0; _i<this.node_head.length; _i++) {
          if (have_point) {
            break;
          }
          for (let _j=0; _j<this.node_head[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_head[_i][_j]), screenPosition(this.node_head[_i][(_j+1)%this.node_head[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_head.length-1) {
              if (isIntersection(screenPosition(this.node_head[_i][_j]), screenPosition(this.node_head[_i+1][_j]), _ray, ray)) {
                have_point = true;
                break;
              }
            }
          }
        }
        if (!have_point) {
          n_edge.push(this.node_head[i][j].copy());
          //LINES_getLine(n_edge[n_edge.length-1], ray);
        }
      }
    }
    // head  2. 排序  --------------------------------------------------------------
    n_edge_sort = [];
    _time_for = n_edge.length;
    for (let j=0; j<_time_for; j++) {
      let _index_max_angle = 0;
      for (let i=0; i<n_edge.length; i++) {
        let _angle_max = p5.Vector.sub(screenPosition(n_edge[_index_max_angle]), screenPosition(_point_far)).heading();
        let _angle = p5.Vector.sub(screenPosition(n_edge[i]), screenPosition(_point_far)).heading();
        if (_angle > _angle_max) {
          _index_max_angle = i;
        }
      }
      n_edge_sort.push(n_edge[_index_max_angle]);
      n_edge.splice(_index_max_angle, 1);
    }


    for (let i=0; i<n_edge_sort.length-1; i++) {
      FS_drawLine(n_edge_sort[i], n_edge_sort[i+1], _state_noise, _var_noise);
    }



    //index_min = new Array(floor(this.node_head.length/2)+1);
    //let index_max = new Array(floor(this.node_head.length/2)+1);
    //for (let i=0; i<=floor(this.node_head.length/2); i++) {
    //  index_min[i] = 0;
    //  index_max[i] = 0;
    //  for (let j=0; j<this.node_head[i].length; j++) {
    //    if (screenPosition(this.node_head[i][j]).x  <  screenPosition(this.node_head[i][index_min[i]]).x) {
    //      index_min[i] = j;
    //    }
    //    if (screenPosition(this.node_head[i][j]).x  >  screenPosition(this.node_head[i][index_max[i]]).x) {
    //      index_max[i] = j;
    //    }
    //  }
    //}

    //for (let i=0; i<this.node_head.length-1; i++) {
    //  LINES_getLine(this.node_head[i][index_min[i]], this.node_head[i+1][index_min[i+1]]);
    //  LINES_getLine(this.node_head[i][index_max[i]], this.node_head[i+1][index_max[i+1]]);
    //}




    //drawCylinder_info(this.node_leg_l);
    //drawCylinder_info(this.node_leg_r);
    //drawCylinder_info(this.node_body);

    //drawCylinder_info(this.node_shoulder_l);
    //drawCylinder_info(this.node_shoulder_r);
    //drawCylinder_info(this.node_shoulder);
  };





  this.displayInfo = function() {
  };
}