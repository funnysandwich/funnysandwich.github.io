function Ground(center_d, W_room, D_room, H_room, rate_fillet) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();
  this.W_frame = W_room;
  this.D_frame = D_room;
  this.H_frame = H_room;
  this.R_fillet = this.W_frame * rate_fillet;
  this.num_fillet = 7;

  this.node_frame = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_frame.length; i++) {
    for (let j=0; j<this.node_frame[i].length; j++) {
      this.node_frame[i][j] = this.center_d.copy();
    }
  }

  this.node_ground = new Array(floor(FS_rand(3, 7)));
  for (let i=0; i<this.node_ground.length; i++) {
    this.node_ground[i] = Array.from(Array(16), () => new Array(16));
    for (let j=0; j<this.node_ground[i].length; j++) {
      for (let k=0; k<this.node_ground[i][j].length; k++) {
        this.node_ground[i][j][k] = this.center_d.copy();
      }
    }
  }
  this.GROUND = new Array(this.node_ground.length-1);
  for (let i=0; i<this.GROUND.length; i++) {
    this.GROUND[i] = createGraphics(400, 200);
    this.GROUND[i].pixelDensity(px);
  }
  this.GROUND_U = createGraphics(200, 200);
  this.GROUND_U.pixelDensity(px);










  this.update = function() {
    for (let i=0; i<this.node_frame.length; i++) {
      let y = -this.H_frame * i;
      for (let j=0; j<this.node_frame[i].length; j++) {
        this.node_frame[i][j] = createVector(this.W_frame/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D_frame/2.0 * pow(-1, floor(j/2)+1));
        this.node_frame[i][j].add(this.center_d);
      }
    }


    for (let i=0; i<this.node_ground.length; i++) {
      let y = 0;
      if (i == 0) {
        y = 0;
      } else if (i == this.node_ground.length-1) {
        y = -this.H_frame;
      } else {
        y = -(this.H_frame/(this.node_ground.length-1)) * i  +  lerp(-(this.H_frame/(this.node_ground.length-1))*0.5, (this.H_frame/(this.node_ground.length-1))*0.5, noise(this.ran*3+635+i*245));
      }
      for (let j=0; j<this.node_ground[i].length; j++) {
        for (let k=0; k<this.node_ground[i][j].length; k++) {
          this.node_ground[i][j][k] = createVector(map(k, 0, this.node_ground[i][j].length-1, -this.W_frame/2, this.W_frame/2), map(j, 0, this.node_ground[i].length-1, -this.D_frame/2, this.D_frame/2), 0);

          if (this.node_ground[i][j][k].x < -this.W_frame/2+this.R_fillet  &&  this.node_ground[i][j][k].y < -this.D_frame/2+this.R_fillet) {
            let _p = intersection(createVector(-this.W_frame/2+this.R_fillet, -this.D_frame/2), createVector(-this.W_frame/2, -this.D_frame/2+this.R_fillet), this.node_ground[i][j][k], this.node_ground[i][j][k].copy().add(real(50), real(50)));
            let _l = p5.Vector.dist(_p, this.node_ground[i][j][k]);
            let _l_max = p5.Vector.dist(createVector(-this.W_frame/2+this.R_fillet, -this.D_frame/2), createVector(-this.W_frame/2, -this.D_frame/2+this.R_fillet));
            this.node_ground[i][j][k] = p5.Vector.sub(this.node_ground[i][j][k], _p).setMag(sin(map(_l, 0, _l_max, 0, PI))*(_l_max*0.2)).add(_p);
          } else if (this.node_ground[i][j][k].x > this.W_frame/2-this.R_fillet  &&  this.node_ground[i][j][k].y < -this.D_frame/2+this.R_fillet) {
            let _p = intersection(createVector(this.W_frame/2-this.R_fillet, -this.D_frame/2), createVector(this.W_frame/2, -this.D_frame/2+this.R_fillet), this.node_ground[i][j][k], this.node_ground[i][j][k].copy().add(-real(50), real(50)));
            let _l = p5.Vector.dist(_p, this.node_ground[i][j][k]);
            let _l_max = p5.Vector.dist(createVector(this.W_frame/2-this.R_fillet, -this.D_frame/2), createVector(this.W_frame/2, -this.D_frame/2+this.R_fillet));
            this.node_ground[i][j][k] = p5.Vector.sub(this.node_ground[i][j][k], _p).setMag(sin(map(_l, 0, _l_max, 0, PI))*(_l_max*0.22)).add(_p);
          } else if (this.node_ground[i][j][k].x > this.W_frame/2-this.R_fillet  &&  this.node_ground[i][j][k].y > this.D_frame/2-this.R_fillet) {
            let _p = intersection(createVector(this.W_frame/2-this.R_fillet, this.D_frame/2), createVector(this.W_frame/2, this.D_frame/2-this.R_fillet), this.node_ground[i][j][k], this.node_ground[i][j][k].copy().add(-real(50), -real(50)));
            let _l = p5.Vector.dist(_p, this.node_ground[i][j][k]);
            let _l_max = p5.Vector.dist(createVector(this.W_frame/2-this.R_fillet, this.D_frame/2), createVector(this.W_frame/2, this.D_frame/2-this.R_fillet));
            this.node_ground[i][j][k] = p5.Vector.sub(this.node_ground[i][j][k], _p).setMag(sin(map(_l, 0, _l_max, 0, PI))*(_l_max*0.2)).add(_p);
          } else if (this.node_ground[i][j][k].x < -this.W_frame/2+this.R_fillet  &&  this.node_ground[i][j][k].y > this.D_frame/2-this.R_fillet) {
            let _p = intersection(createVector(-this.W_frame/2+this.R_fillet, this.D_frame/2), createVector(-this.W_frame/2, this.D_frame/2-this.R_fillet), this.node_ground[i][j][k], this.node_ground[i][j][k].copy().add(real(50), -real(50)));
            let _l = p5.Vector.dist(_p, this.node_ground[i][j][k]);
            let _l_max = p5.Vector.dist(createVector(-this.W_frame/2+this.R_fillet, this.D_frame/2), createVector(-this.W_frame/2, this.D_frame/2-this.R_fillet));
            this.node_ground[i][j][k] = p5.Vector.sub(this.node_ground[i][j][k], _p).setMag(sin(map(_l, 0, _l_max, 0, PI))*(_l_max*0.22)).add(_p);
          }

          this.node_ground[i][j][k] = createVector(this.node_ground[i][j][k].x, y, this.node_ground[i][j][k].y);
          let var_noise = max(lerp(-real(50), real(100), noise(this.ran+this.node_ground[i][j][k].x*scaleRate*0.005, this.ran+this.node_ground[i][j][k].z*scaleRate*0.005, this.ran+this.node_ground[i][j][k].y*scaleRate*0.00125)), 0);
          var_noise *= map(i, 0, this.node_ground.length-1, 0, 1);
          this.node_ground[i][j][k].y += var_noise;
          this.node_ground[i][j][k].y = min(this.node_ground[i][j][k].y, -real(0.5));
          this.node_ground[i][j][k].add(this.center_d);
        }
      }
    }

    this.GROUND_U.background(c_bkg);
    this.GROUND_U.noFill();
    this.GROUND_U.stroke(c_dark);
    this.GROUND_U.strokeWeight(0.75);
    this.GROUND_U.beginShape(LINES);
    for (let j=0; j<1000; j++) {
      let n = createVector(FS_rand(0, this.GROUND_U.width), FS_rand(0, this.GROUND_U.height));
      let _n = n.copy().add(FS_rand(-1, 1), FS_rand(-1, 1));
      this.GROUND_U.vertex(n.x, n.y);
      this.GROUND_U.vertex(_n.x, _n.y);
    }
    this.GROUND_U.endShape();



    for (let i=0; i<this.GROUND.length; i++) {
      this.GROUND[i].background(c_bkg);
      let _state = countProb([1, 0, 1, 1, 1, 1, 1, 1, 1]);
      if (_state == 0) {  //  斜线
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(0.75);
        this.GROUND[i].beginShape(LINES);
        for (let j=0; j<60; j++) {
          let n = createVector(map(j, 0, 60, -40, this.GROUND[i].width), 0);
          let _n = createVector(map(j, 0, 60, -40, this.GROUND[i].width)+40, this.GROUND[i].height);
          this.GROUND[i].vertex(n.x, n.y);
          this.GROUND[i].vertex(_n.x, _n.y);
        }
        this.GROUND[i].endShape();
      } else if (_state == 1) {  //  沙子
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(1);
        this.GROUND[i].beginShape(LINES);
        for (let j=0; j<5000; j++) {
          let n = createVector(FS_rand(0, this.GROUND[i].width), FS_rand(0, this.GROUND[i].height));
          let _n = n.copy().add(FS_rand(-1, 1), FS_rand(-1, 1));
          this.GROUND[i].vertex(n.x, n.y);
          this.GROUND[i].vertex(_n.x, _n.y);
        }
        this.GROUND[i].endShape();
      } else if (_state == 2) {  //  横竖网格
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(0.75);
        this.GROUND[i].beginShape(LINES);
        let num = 80;
        for (let j=0; j<num; j++) {
          let n = createVector(map(j, 0, num, 0, this.GROUND[i].width), 0);
          let _n = createVector(map(j, 0, num, 0, this.GROUND[i].width), this.GROUND[i].height);
          this.GROUND[i].vertex(n.x, n.y);
          this.GROUND[i].vertex(_n.x, _n.y);
        }
        num *= 0.5;
        for (let j=0; j<num; j++) {
          let n = createVector(0, map(j, 0, num, 0, this.GROUND[i].height));
          let _n = createVector(this.GROUND[i].width, map(j, 0, num, 0, this.GROUND[i].height));
          this.GROUND[i].vertex(n.x, n.y);
          this.GROUND[i].vertex(_n.x, _n.y);
        }
        this.GROUND[i].endShape();
      } else if (_state == 3) {  //  黑不溜秋
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(2);
        this.GROUND[i].beginShape(LINES);
        for (let j=0; j<3000; j++) {
          let n = createVector(FS_rand(0, this.GROUND[i].width), FS_rand(-this.GROUND[i].height*0.25, this.GROUND[i].height*1.25));
          let _n = n.copy().add(50*FS_rand(0.25, 2) * pow(-1, floor(FS_rand(0, 2))), 50*FS_rand(0.25, 2) * pow(-1, floor(FS_rand(0, 2))));
          this.GROUND[i].vertex(n.x, n.y);
          this.GROUND[i].vertex(_n.x, _n.y);
        }
        this.GROUND[i].endShape();
      } else if (_state == 4) {  //  方块
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(0.5);
        this.GROUND[i].beginShape(LINES);
        let num_ver = 50;
        let num_hor = num_ver*2;
        let n = Array.from(Array(num_ver), () => new Array(num_hor));
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            n[j][k] = createVector(map(k, 0, num_hor-1, 0, this.GROUND[i].width), map(j, 0, num_ver-1, 0, this.GROUND[i].height));
          }
        }
        for (let j=0; j<num_ver-1; j+=2) {
          for (let k=0; k<num_hor-1; k+=2) {
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
            this.GROUND[i].vertex(n[j][k+1].x, n[j][k+1].y);
            this.GROUND[i].vertex(n[j][k+1].x, n[j][k+1].y);
            this.GROUND[i].vertex(n[j+1][k+1].x, n[j+1][k+1].y);
            this.GROUND[i].vertex(n[j+1][k+1].x, n[j+1][k+1].y);
            this.GROUND[i].vertex(n[j+1][k].x, n[j+1][k].y);
            this.GROUND[i].vertex(n[j+1][k].x, n[j+1][k].y);
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
          }
        }
        this.GROUND[i].endShape();
      } else if (_state == 5) {  //  扭曲竖线
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(0.85);
        this.GROUND[i].beginShape(LINES);
        let num_ver = 40;
        let num_hor = num_ver*2;
        let n = Array.from(Array(num_ver), () => new Array(num_hor));
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            n[j][k] = createVector(map(k, 0, num_hor-1, 0, this.GROUND[i].width), map(j, 0, num_ver-1, 0, this.GROUND[i].height));
            n[j][k].add(map(noise(this.ran+j*0.1, this.ran*13+k*0.03), 0, 1, -1, 1)*40, 0);
          }
        }
        for (let j=0; j<num_ver-1; j++) {
          for (let k=0; k<num_hor; k++) {
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
            this.GROUND[i].vertex(n[j+1][k].x, n[j+1][k].y);
          }
        }
        this.GROUND[i].endShape();
      } else if (_state == 6) {  //  横折线
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_dark);
        this.GROUND[i].strokeWeight(0.85);
        this.GROUND[i].beginShape(LINES);
        let num_ver = 50;
        let num_hor = 80;
        let n = Array.from(Array(num_ver), () => new Array(num_hor));
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            n[j][k] = createVector(map(k, 0, num_hor-1, 0, this.GROUND[i].width), map(j, 0, num_ver-1, 0, this.GROUND[i].height));
          }
        }
        for (let j=0; j<num_ver-1; j++) {
          for (let k=0; k<num_hor-1; k++) {
            if (k%4 < 2) {
              this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
              this.GROUND[i].vertex(n[j+1][k+1].x, n[j+1][k+1].y);
            } else {
              this.GROUND[i].vertex(n[j+1][k].x, n[j+1][k].y);
              this.GROUND[i].vertex(n[j][k+1].x, n[j][k+1].y);
            }
          }
        }
        this.GROUND[i].endShape();
      } else if (_state == 7) {  //  反色网格
        this.GROUND[i].background(c_dark);
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_bkg);
        this.GROUND[i].strokeWeight(0.75);
        this.GROUND[i].beginShape(LINES);
        let num_ver = 40;
        let num_hor = 80;
        let n = Array.from(Array(num_ver), () => new Array(num_hor));
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            n[j][k] = createVector(map(k, 0, num_hor-1, 0, this.GROUND[i].width), map(j, 0, num_ver-1, 0, this.GROUND[i].height));
            n[j][k].add(map(noise(this.ran+j*0.1, this.ran*13+k*0.1), 0, 1, -1, 1)*10, 0);
          }
        }
        for (let j=0; j<num_ver-1; j++) {
          for (let k=0; k<num_hor-1; k++) {
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
            this.GROUND[i].vertex(n[j+1][k].x, n[j+1][k].y);
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y);
            this.GROUND[i].vertex(n[j][k+1].x, n[j][k+1].y);
          }
        }
        this.GROUND[i].endShape();
      } else if (_state == 8) {  //  反色十字
        this.GROUND[i].background(c_dark);
        this.GROUND[i].noFill();
        this.GROUND[i].stroke(c_bkg);
        this.GROUND[i].strokeWeight(0.55);
        this.GROUND[i].beginShape(LINES);
        let num_ver = 25;
        let num_hor = num_ver*2;
        let n = Array.from(Array(num_ver), () => new Array(num_hor));
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            n[j][k] = createVector(map(k, 0, num_hor-1, 0, this.GROUND[i].width), map(j, 0, num_ver-1, 0, this.GROUND[i].height));
          }
        }
        for (let j=0; j<num_ver; j++) {
          for (let k=0; k<num_hor; k++) {
            this.GROUND[i].vertex(n[j][k].x-2, n[j][k].y);
            this.GROUND[i].vertex(n[j][k].x+2, n[j][k].y);
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y-2);
            this.GROUND[i].vertex(n[j][k].x, n[j][k].y+2);
          }
        }
        this.GROUND[i].endShape();
      }
    }
  };














  this.display = function(_state_noise, _var_noise) {
    noFill();
    stroke(c_dark);
    strokeWeight(var_weight*(1));
    let n = new Array(this.node_ground.length);
    for (let i=0; i<this.node_ground.length; i++) {
      n[i] = [];
      for (let k=0; k<this.node_ground[i][0].length; k++) {
        n[i].push(this.node_ground[i][0][k]);
      }
      for (let j=0; j<this.node_ground[i].length; j++) {
        n[i].push(this.node_ground[i][j][this.node_ground[i][0].length-1]);
      }
      for (let k=this.node_ground[i][this.node_ground[i].length-1].length-1; k>=0; k--) {
        n[i].push(this.node_ground[i][this.node_ground[i].length-1][k]);
      }
      for (let j=this.node_ground[i].length-1; j>=0; j--) {
        n[i].push(this.node_ground[i][j][0]);
      }
    }

    drawCylinder_LINES(n, 0, _state_noise, _var_noise);
    for (let i=0; i<n.length; i++) {
      if (i == 0  ||  i == n.length-1) {
        FS_drawEllipse(n[i], _state_noise, _var_noise);
      }
    }




    noStroke();
    for (let i=0; i<this.node_ground.length; i++) {
      if (i == this.node_ground.length-1) {
        //fill(c_bkg);
        for (let j=0; j<this.node_ground[i].length-1; j++) {
          for (let k=0; k<this.node_ground[i][j].length-1; k++) {
            //FS_drawShape([this.node_ground[i][j][k], this.node_ground[i][j][k+1], this.node_ground[i][j+1][k+1], this.node_ground[i][j+1][k]]);
            FS_drawShape_texture([this.node_ground[i][j][k], this.node_ground[i][j][k+1], this.node_ground[i][j+1][k+1], this.node_ground[i][j+1][k]], 
              [createVector(map(this.node_ground[i][j][k].x, this.node_frame[1][0].x, this.node_frame[1][1].x, 0, 1), map(this.node_ground[i][j][k].z, this.node_frame[1][0].z, this.node_frame[1][3].z, 0, 1)), 
              createVector(map(this.node_ground[i][j][k+1].x, this.node_frame[1][0].x, this.node_frame[1][1].x, 0, 1), map(this.node_ground[i][j][k+1].z, this.node_frame[1][0].z, this.node_frame[1][3].z, 0, 1)), 
              createVector(map(this.node_ground[i][j+1][k+1].x, this.node_frame[1][0].x, this.node_frame[1][1].x, 0, 1), map(this.node_ground[i][j+1][k+1].z, this.node_frame[1][0].z, this.node_frame[1][3].z, 0, 1)), 
              createVector(map(this.node_ground[i][j+1][k].x, this.node_frame[1][0].x, this.node_frame[1][1].x, 0, 1), map(this.node_ground[i][j+1][k].z, this.node_frame[1][0].z, this.node_frame[1][3].z, 0, 1))], 
              this.GROUND_U, 2);
          }
        }
      }
    }



    let index_min = new Array(n.length);
    let index_max = new Array(n.length);
    for (let i=0; i<n.length; i++) {
      index_min[i] = 0;
      index_max[i] = 0;
      for (let j=0; j<n[i].length; j++) {
        if (screenPosition(n[i][j]).x < screenPosition(n[i][index_min[i]]).x) {
          index_min[i] = j;
        }
        if (screenPosition(n[i][j]).x > screenPosition(n[i][index_max[i]]).x) {
          index_max[i] = j;
        }
      }
    }


    noStroke();
    //第二种贴图方式需要的最大最小值
    let _min_x=screenPosition(n[0][index_min[0]]).x, _max_x=screenPosition(n[0][index_max[0]]).x, _uv_min_x=0, _uv_max_x=1;
    let _min_y=screenPosition(n[0][index_min[0]]).y, _max_y=screenPosition(n[0][index_max[0]]).y, _uv_min_y=0, _uv_max_y=1;
    for (let i=0; i<n.length; i++) {
      if (screenPosition(n[i][index_min[i]]).x < _min_x) {
        _min_x = screenPosition(n[i][index_min[i]]).x;
      }
      if (screenPosition(n[i][index_max[i]]).x > _max_x) {
        _max_x = screenPosition(n[i][index_max[i]]).x;
      }
      for (let j=0; j<n[i].length; j++) {
        if (j <= index_min[i]  &&  j >= index_max[i]) {
          if (screenPosition(n[i][j]).y < _min_y) {
            _min_y = screenPosition(n[i][j]).y;
          }
          if (screenPosition(n[i][j]).y > _max_y) {
            _max_y = screenPosition(n[i][j]).y;
          }
        }
      }
    }


    for (let i=0; i<this.node_ground.length-1; i++) {
      for (let j=0; j<n[i].length; j++) {

        //第一种贴图方式
        if (j < index_min[i]  &&  j > index_max[i] ) {
          if (abs(n[i][j].x-n[i][(j+1)%n[i].length].x)  >  abs(n[i][j].z-n[i][(j+1)%n[i].length].z)) {
            FS_drawShape_texture([n[i][j], n[i+1][j], n[i+1][(j+1)%n[i].length], n[i][(j+1)%n[i].length]], 
              [createVector(map((n[i][j]).x, n[i][index_min[i]].x, n[i][floor((index_min[i]+index_max[i])/2)].x, 0, 0.5), map((n[i][j]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i+1][j]).x, n[i][index_min[i]].x, n[i][floor((index_min[i]+index_max[i])/2)].x, 0, 0.5), map((n[i+1][j]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i+1][(j+1)%n[i].length]).x, n[i][index_min[i]].x, n[i][floor((index_min[i]+index_max[i])/2)].x, 0, 0.5), map((n[i+1][(j+1)%n[i].length]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i][(j+1)%n[i].length]).x, n[i][index_min[i]].x, n[i][floor((index_min[i]+index_max[i])/2)].x, 0, 0.5), map((n[i][(j+1)%n[i].length]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1))
              ], this.GROUND[i], 0);
          } else {
            FS_drawShape_texture([n[i][j], n[i+1][j], n[i+1][(j+1)%n[i].length], n[i][(j+1)%n[i].length]], 
              [createVector(map((n[i][j]).z, n[i][floor((index_min[i]+index_max[i])/2)].z, n[i][index_max[i]].z, 0.5, 1), map((n[i][j]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i+1][j]).z, n[i][floor((index_min[i]+index_max[i])/2)].z, n[i][index_max[i]].z, 0.5, 1), map((n[i+1][j]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i+1][(j+1)%n[i].length]).z, n[i][floor((index_min[i]+index_max[i])/2)].z, n[i][index_max[i]].z, 0.5, 1), map((n[i+1][(j+1)%n[i].length]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1)), 
              createVector(map((n[i][(j+1)%n[i].length]).z, n[i][floor((index_min[i]+index_max[i])/2)].z, n[i][index_max[i]].z, 0.5, 1), map((n[i][(j+1)%n[i].length]).y, (this.node_frame[1][2]).y, (this.node_frame[0][2]).y, 0, 1))
              ], this.GROUND[i], 1);
          }
        }

        //第二种贴图方式
        //if (j < index_min[i]  &&  j > index_max[i]) {
        //  FS_drawShape_texture_range([n[i][j], n[i+1][j], n[i+1][(j+1)%n[i].length], n[i][(j+1)%n[i].length]], 
        //    [createVector(map(screenPosition(n[i][j]).x, screenPosition(n[i][index_min[i]]).x, screenPosition(n[i][index_max[i]]).x, 0, 1), map(screenPosition(n[i][j]).y, screenPosition(this.node_frame[1][3]).y, screenPosition(this.node_frame[0][2]).y, 0, 1)), 
        //    createVector(map(screenPosition(n[i+1][j]).x, screenPosition(n[i+1][index_min[i+1]]).x, screenPosition(n[i+1][index_max[i+1]]).x, 0, 1), map(screenPosition(n[i+1][j]).y, (this.node_frame[1][3]).y, screenPosition(this.node_frame[0][2]).y, 0, 1)), 
        //    createVector(map(screenPosition(n[i+1][(j+1)%n[i].length]).x, screenPosition(n[i+1][index_min[i+1]]).x, screenPosition(n[i+1][index_max[i+1]]).x, 0, 1), map(screenPosition(n[i+1][(j+1)%n[i].length]).y, screenPosition(this.node_frame[1][3]).y, screenPosition(this.node_frame[0][2]).y, 0, 1)), 
        //    createVector(map(screenPosition(n[i][(j+1)%n[i].length]).x, screenPosition(n[i][index_min[i]]).x, screenPosition(n[i][index_max[i]]).x, 0, 1), map(screenPosition(n[i][(j+1)%n[i].length]).y, screenPosition(this.node_frame[1][3]).y, screenPosition(this.node_frame[0][2]).y, 0, 1))], 
        //    [_min_x, _max_x, 0, 1, _min_y, _max_y, 0, 1], 
        //    this.GROUND[i]);
        //}
      }
    }
  };
}