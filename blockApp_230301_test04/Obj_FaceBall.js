function FaceBall(center_d, W_room, D_room, H_room, W) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();



  this.W_ball = W;
  this.center_ball = center_d.copy().add(0, -this.W_ball/2, 0);


  this.node_ball = Array.from(Array(9), () => new Array(10));
  for (let i=0; i<this.node_ball.length; i++) {
    for (let j=0; j<this.node_ball[i].length; j++) {
      this.node_ball[i][j] = this.center_ball.copy();
    }
  }
  this.uv_ball = Array.from(Array(this.node_ball.length), () => new Array(floor(this.node_ball[0].length/2)+1));
  for (let i=0; i<this.uv_ball.length; i++) {
    for (let j=0; j<floor(this.node_ball[0].length/2)+1; j++) {
      this.uv_ball[i][j] = this.center_ball.copy();
    }
  }

  this.FACE = createGraphics(100, 100);
  this.FACE.pixelDensity(px);





  this.update = function() {
    for (let i=0; i<this.node_ball.length; i++) {
      let w = map(sin(map(i, 0, this.node_ball.length-1, 0, PI)), 0, 1, 0, this.W_ball);
      let y = map(cos(map(i, 0, this.node_ball.length-1, 0, PI)), 1, -1, -this.W_ball/2, this.W_ball/2);
      for (let j=0; j<this.node_ball[i].length; j++) {
        let x = cos(map(j, 0, this.node_ball[i].length, 0, TWO_PI)) * w/2;
        let z = sin(map(j, 0, this.node_ball[i].length, 0, TWO_PI)) * w/2;
        this.node_ball[i][j] = createVector(x, y, z);
        //this.node_ball[i][j] = PRotateY(this.node_ball[i][j], -HALF_PI*0.5);
        //this.node_ball[i][j] = PRotateX(this.node_ball[i][j], -HALF_PI*0.5);

        //this.node_ball[i][j].add(this.center_ball);
      }
    }


    for (let i=0; i<this.uv_ball.length; i++) {
      for (let j=0; j<floor(this.node_ball[0].length/2)+1; j++) {
        this.uv_ball[i][j] = createVector(map(this.node_ball[i][j].x, this.node_ball[floor(this.node_ball.length/2)][floor(this.node_ball[0].length/2)].x, this.node_ball[floor(this.node_ball.length/2)][0].x, 0, 1), map(this.node_ball[i][j].y, this.node_ball[0][0].y, this.node_ball[this.node_ball.length-1][0].y, 0, 1));
      }
    }

    let angle_y = FS_rand(-HALF_PI*1, HALF_PI*0.125);
    let angle_x = FS_rand(-HALF_PI*0.65, HALF_PI*0.125);
    for (let i=0; i<this.node_ball.length; i++) {
      for (let j=0; j<this.node_ball[i].length; j++) {
        this.node_ball[i][j] = PRotateX(this.node_ball[i][j], angle_x);
        this.node_ball[i][j] = PRotateY(this.node_ball[i][j], angle_y);
        this.node_ball[i][j].add(this.center_ball);
      }
    }


    //0：微笑  1：难过  2：大笑  3：夹眼大笑  4：夹眼难受  5：下拉眼悲伤  6：白眼
    this.state_face = countProb([1, 1, 1, 1, 1, 1, 1]);

    this.FACE.background(c_bkg);
    this.FACE.strokeJoin(ROUND);
    if (this.state_face == 0) {
      this.FACE.fill(c_dark);
      this.FACE.noStroke();
      this.FACE.ellipse(31.902, 37.083, 14.789, 20.768);
      this.FACE.ellipse(68.098, 37.083, 14.789, 20.768);
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      for (let i=0; i<10; i++) {
        this.FACE.vertex(cos(map(i, 0, 10-1, HALF_PI*0.5, HALF_PI*1.5))*34.436 + 50, sin(map(i, 0, 10-1, HALF_PI*0.5, HALF_PI*1.5))*34.436 + 39.083);
      }
      this.FACE.endShape();
    } else if (this.state_face == 1) {
      this.FACE.fill(c_dark);
      this.FACE.noStroke();
      this.FACE.ellipse(31.902, 37.083, 14.789, 20.768);
      this.FACE.ellipse(68.098, 37.083, 14.789, 20.768);
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      for (let i=0; i<10; i++) {
        this.FACE.vertex(cos(map(i, 0, 10-1, -HALF_PI*0.5, -HALF_PI*1.5))*34.436 + 50, sin(map(i, 0, 10-1, -HALF_PI*0.5, -HALF_PI*1.5))*34.436 + 97.519);
      }
      this.FACE.endShape();
    } else if (this.state_face == 2) {
      this.FACE.fill(c_dark);
      this.FACE.noStroke();
      this.FACE.ellipse(31.902, 37.083, 14.789, 26.946);
      this.FACE.ellipse(68.098, 37.083, 14.789, 26.946);
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      for (let i=0; i<10; i++) {
        this.FACE.vertex(cos(map(i, 0, 10-1, HALF_PI*0.25, HALF_PI*1.75))*27.76 + 50, sin(map(i, 0, 10-1, HALF_PI*0.25, HALF_PI*1.75))*27.76 + 50.893);
      }
      this.FACE.endShape(CLOSE);
    } else if (this.state_face == 3) {
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      this.FACE.vertex(27.468, 26.713);
      this.FACE.vertex(41.246, 37.343);
      this.FACE.vertex(27.468, 47.974);
      this.FACE.endShape();
      this.FACE.beginShape();
      this.FACE.vertex(72.532, 26.713);
      this.FACE.vertex(58.754, 37.343);
      this.FACE.vertex(72.532, 47.974);
      this.FACE.endShape();
      this.FACE.fill(c_dark);
      this.FACE.beginShape();
      for (let i=0; i<10; i++) {
        this.FACE.vertex(cos(map(i, 0, 10-1, HALF_PI*0.25, HALF_PI*1.75))*27.76 + 50, sin(map(i, 0, 10-1, HALF_PI*0.25, HALF_PI*1.75))*27.76 + 50.893);
      }
      this.FACE.endShape(CLOSE);
    } else if (this.state_face == 4) {
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      this.FACE.vertex(26.54, 33.013);
      this.FACE.vertex(42.265, 47.391);
      this.FACE.vertex(26.54, 57.362);
      this.FACE.endShape();
      this.FACE.beginShape();
      this.FACE.vertex(73.567, 33.013);
      this.FACE.vertex(57.735, 47.391);
      this.FACE.vertex(73.567, 57.362);
      this.FACE.endShape();
      this.FACE.beginShape();
      this.FACE.vertex(28.104, 68.758);
      this.FACE.vertex(33.202, 74.634);
      this.FACE.vertex(41.991, 66.27);
      this.FACE.vertex(49.955, 74.634);
      this.FACE.vertex(57.919, 66.27);
      this.FACE.vertex(66.707, 74.634);
      this.FACE.vertex(71.158, 69.503);
      this.FACE.endShape();
    } else if (this.state_face == 5) {
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      this.FACE.vertex(42.499, 43.36);
      this.FACE.vertex(30.496, 51.933);
      this.FACE.vertex(17.952, 55.688);
      this.FACE.endShape();
      this.FACE.beginShape();
      this.FACE.vertex(58.924, 43.36);
      this.FACE.vertex(70.928, 51.933);
      this.FACE.vertex(83.471, 55.688);
      this.FACE.endShape();
      this.FACE.beginShape();
      for (let i=0; i<10; i++) {
        this.FACE.vertex(cos(map(i, 0, 10-1, -HALF_PI*0.25, -HALF_PI*1.75))*11.702 + 50, sin(map(i, 0, 10-1, -HALF_PI*0.25, -HALF_PI*1.75))*11.702 + 77.715);
      }
      this.FACE.endShape();
    } else if (this.state_face == 6) {
      this.FACE.noStroke();
      this.FACE.fill(c_dark);
      this.FACE.ellipse(33.828, 37.082, 10.57, 10.57);
      this.FACE.ellipse(66.172, 37.082, 10.57, 10.57);
      this.FACE.noFill();
      this.FACE.stroke(c_dark);
      this.FACE.strokeWeight(3);
      this.FACE.ellipse(33.828, 44.275, 22.61, 22.61);
      this.FACE.ellipse(66.172, 44.275, 22.61, 22.61);
      this.FACE.strokeWeight(5);
      this.FACE.beginShape();
      this.FACE.vertex(41.952, 69.03);
      this.FACE.vertex(56.612, 69.03);
      this.FACE.endShape();
    }
  };















  this.display = function(_state_noise, _var_noise) {
    noStroke();


    beginShape(TRIANGLES);
    texture(this.FACE);
    for (let i=0; i<this.node_ball.length-1; i++) {
      for (let j=0; j<floor(this.node_ball[i].length/2); j++) {    
        //FS_drawShape_texture([this.node_ball[i][j], this.node_ball[i][(j+1)%this.node_ball[i].length], this.node_ball[i+1][(j+1)%this.node_ball[i].length], this.node_ball[i+1][j]], 
        //  [this.uv_ball[i][j], this.uv_ball[i][(j+1)%this.node_ball[i].length], this.uv_ball[i+1][(j+1)%this.node_ball[i].length], this.uv_ball[i+1][j]], 
        //  this.FACE, 0);

        TRIANGLES_getRect_uv(this.node_ball[i][j], this.node_ball[i][(j+1)%this.node_ball[i].length], this.node_ball[i+1][(j+1)%this.node_ball[i].length], this.node_ball[i+1][j], this.uv_ball[i][j], this.uv_ball[i][(j+1)%this.node_ball[i].length], this.uv_ball[i+1][(j+1)%this.node_ball[i].length], this.uv_ball[i+1][j]);
      }
    }
    endShape();
    fill(255);

    fill(c_bkg);
    beginShape(TRIANGLES);
    for (let i=0; i<this.node_ball.length-1; i++) {
      for (let j=floor(this.node_ball[i].length/2); j<this.node_ball[i].length; j++) {
        TRIANGLES_getRect(this.node_ball[i][j], this.node_ball[i][(j+1)%this.node_ball[i].length], this.node_ball[i+1][(j+1)%this.node_ball[i].length], this.node_ball[i+1][j]);
      }
    }
    endShape();





    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(2));


    let _point_far = p5.Vector.sub(this.node_ball[this.node_ball.length-1][0], this.center_ball).setMag(real(500)).add(this.node_ball[this.node_ball.length-1][0]).add(real(1), 0, 0);
    let n_edge = [];
    //   1. 判断是否有交点  --------------------------------------------------------------
    for (let i=0; i<floor(this.node_ball.length/2)+1; i++) {
      for (let j=0; j<this.node_ball[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_ball[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_ball[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_ball[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_ball[i][j]));
        let have_point = false;
        for (let _i=0; _i<floor(this.node_ball.length/2)+1; _i++) {
          for (let _j=0; _j<this.node_ball[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_ball[_i][_j]), screenPosition(this.node_ball[_i][(_j+1)%this.node_ball[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < floor(this.node_ball.length/2)) {
              if (isIntersection(screenPosition(this.node_ball[_i][_j]), screenPosition(this.node_ball[_i+1][_j]), _ray, ray)) {
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
          n_edge.push(this.node_ball[i][j].copy());
          //FS_drawLine(n_edge[n_edge.length-1], ray);
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





    _point_far = p5.Vector.sub(this.node_ball[0][0], this.center_ball).setMag(real(500)).add(this.node_ball[0][0]).add(real(1), 0, 0);
    n_edge = [];
    //   1. 判断是否有交点  --------------------------------------------------------------
    for (let i=floor(this.node_ball.length/2); i<this.node_ball.length; i++) {
      for (let j=0; j<this.node_ball[i].length; j++) {
        let ray = p5.Vector.sub(screenPosition(this.node_ball[i][j]), screenPosition(_point_far)).setMag(real(500)).add(screenPosition(this.node_ball[i][j]));
        let _ray = p5.Vector.sub(screenPosition(this.node_ball[i][j]), screenPosition(_point_far)).setMag(real(0.25)).add(screenPosition(this.node_ball[i][j]));
        let have_point = false;
        for (let _i=floor(this.node_ball.length/2); _i<this.node_ball.length; _i++) {
          for (let _j=0; _j<this.node_ball[_i].length; _j++) {
            if (isIntersection(screenPosition(this.node_ball[_i][_j]), screenPosition(this.node_ball[_i][(_j+1)%this.node_ball[_i].length]), _ray, ray)) {
              have_point = true;
              break;
            }
            if (_i < this.node_ball.length-1) {
              if (isIntersection(screenPosition(this.node_ball[_i][_j]), screenPosition(this.node_ball[_i+1][_j]), _ray, ray)) {
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
          n_edge.push(this.node_ball[i][j].copy());
          //FS_drawLine(n_edge[n_edge.length-1], ray);
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
  };
}