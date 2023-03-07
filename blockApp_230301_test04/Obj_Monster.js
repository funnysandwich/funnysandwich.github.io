function Monster(center_d, W_room, D_room, H_room, rate_fillet) {
  this.ran = FS_rand(-9999, 9999);
  this.center_d = center_d.copy();


  this.W_fur_max = W_room * 0.15;
  this.W_body = W_room - this.W_fur_max;
  this.D_body = D_room - this.W_fur_max;
  this.H_body = H_room - this.W_fur_max;


  this.R_fillet = this.W_body * rate_fillet;
  this.num_fillet = 3;

  this.node_body = Array.from(Array(2), () => new Array(4 * this.num_fillet));
  for (let i=0; i<this.node_body.length; i++) {
    for (let j=0; j<this.node_body[i].length; j++) {
      this.node_body[i][j] = this.center_d.copy();
    }
  }

  this.node_fur = [];



  let w = floor((100 - (100*rate_fillet)*2) * 4  +  (100*rate_fillet*2*PI));
  let h = floor(H_room / W_room * 100);


  this.MONSTER = createGraphics(w, h);
  this.MONSTER.pixelDensity(px);
















  this.update = function() {
    for (let i=0; i<this.node_body.length; i++) {
      this.node_body[i] = getNode_rect_fillet(0, 0, 0, this.W_body, this.D_body, this.R_fillet, this.num_fillet);
      for (let j=0; j<this.node_body[i].length; j++) {
        this.node_body[i][j] = PRotateX(this.node_body[i][j], -HALF_PI);
        this.node_body[i][j].y += this.H_body/2 * pow(-1, i)  -  H_room/2;
        this.node_body[i][j].add(this.center_d);
      }
    }



    for (let i=0; i<this.node_body.length; i++) {
      let l_sum = 0;
      for (let j=0; j<this.node_body[i].length; j++) {
        l_sum += p5.Vector.dist(this.node_body[i][j], this.node_body[i][(j+1)%this.node_body[i].length]);
      }

      let index_now = 0;
      let l_sum_now = p5.Vector.dist(this.node_body[i][(index_now+1)%this.node_body[i].length], this.node_body[i][index_now]);
      let l = 0;
      for (let j=0; j<500; j++) {
        l += this.W_fur_max*0.5;

        if (l > l_sum_now) {
          for (let k=0; k<500; k++) {
            if (l > l_sum_now) {
              index_now += 1;
              l_sum_now += p5.Vector.dist(this.node_body[i][(index_now+1)%this.node_body[i].length], this.node_body[i][index_now%this.node_body[i].length]);
            } else {
              break;
            }
          }
        }

        if (l > l_sum) {
          break;
        }
        if (l <= l_sum_now) {
          let _center = p5.Vector.sub(this.node_body[i][(index_now+1)%this.node_body[i].length], this.node_body[i][index_now%this.node_body[i].length]).setMag(l_sum_now - l).add(this.node_body[i][index_now%this.node_body[i].length]);
          let n_fur = new Array(16);
          let w_fur = FS_rand(this.W_fur_max*0.5, this.W_fur_max);
          for (let k=0; k<n_fur.length; k++) {
            let x = cos(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
            let y = sin(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
            n_fur[k] = createVector(x, y, 0);
          }
          this.node_fur.push([n_fur, _center]);
        }
      }
    }





    let index_min = new Array(this.node_body.length);
    let index_max = new Array(this.node_body.length);
    for (let i=0; i<this.node_body.length; i++) {
      index_min[i] = 0;
      index_max[i] = 0;
      for (let j=0; j<this.node_body[i].length; j++) {
        if (screenPosition(this.node_body[i][j]).x < screenPosition(this.node_body[i][index_min[i]]).x) {
          index_min[i] = j;
        }
        if (screenPosition(this.node_body[i][j]).x > screenPosition(this.node_body[i][index_max[i]]).x) {
          index_max[i] = j;
        }
      }
    }

    let l = 0;
    for (let i=0; i<500; i++) {
      l += this.W_fur_max*0.5;
      if (l > p5.Vector.dist(this.node_body[0][index_min[0]], this.node_body[1][index_min[1]])) {
        break;
      } else {
        let _center = p5.Vector.sub(this.node_body[1][index_min[1]], this.node_body[0][index_min[0]]).setMag(l).add(this.node_body[0][index_min[0]]);
        let n_fur = new Array(12);
        let w_fur = FS_rand(this.W_fur_max*0.5, this.W_fur_max);
        for (let k=0; k<n_fur.length; k++) {
          let x = cos(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
          let y = sin(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
          n_fur[k] = createVector(x, y, 0);
        }
        this.node_fur.push([n_fur, _center]);
      }
    }

    l = 0;
    for (let i=0; i<500; i++) {
      l += this.W_fur_max*0.5;
      if (l > p5.Vector.dist(this.node_body[0][index_max[0]], this.node_body[1][index_max[1]])) {
        break;
      } else {
        let _center = p5.Vector.sub(this.node_body[1][index_max[1]], this.node_body[0][index_max[0]]).setMag(l).add(this.node_body[0][index_max[0]]);
        let n_fur = new Array(16);
        let w_fur = FS_rand(this.W_fur_max*0.5, this.W_fur_max);
        for (let k=0; k<n_fur.length; k++) {
          let x = cos(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
          let y = sin(map(k, 0, n_fur.length, 0, TWO_PI)) * w_fur/2;
          n_fur[k] = createVector(x, y, 0);
        }
        this.node_fur.push([n_fur, _center]);
      }
    }








    for (let i=0; i<this.node_fur.length; i++) {
      for (let k=0; k<this.node_fur[i][0].length; k++) {
        this.node_fur[i][0][k] = PRotateX(this.node_fur[i][0][k], -var_view[state_arrange][0]);
        this.node_fur[i][0][k] = PRotateY(this.node_fur[i][0][k], -var_view[state_arrange][1]);
        this.node_fur[i][0][k].add(this.node_fur[i][1]);
      }
    }










    this.MONSTER.background(c_dark);


    for (let i=0; i<4; i++) {
      let x_min = i * (this.MONSTER.width/4)  +  (this.MONSTER.width/4)*0;
      let x_max = (i+1) * (this.MONSTER.width/4)  -  (this.MONSTER.width/4)*0;
      let num = 30;//floor(FS_rand(3, 9));
      let _center = new Array(num);
      let _show = new Array(num);
      let _w = new Array(num);
      let _w_eye_ra = new Array(num);
      for (let j=0; j<num; j++) {
        _w_eye_ra[j] = FS_rand(0.33, 0.66);
        _w[j] = FS_rand(10, 20);
        _show[j] = true;
        _center[j] = createVector(FS_rand(x_min+_w[j]/2, x_max-_w[j]/2), FS_rand(_w[j]/2, this.MONSTER.height-_w[j]/2));
      }
      for (let j=0; j<num; j++) {
        for (let k=0; k<num; k++) {
          if (j != k  &&  _show[j]) {
            if (p5.Vector.dist(_center[j], _center[k]) < (_w[j]+_w[k])/2) {

              _show[k] = false;
            }
          }
        }
      }


      for (let j=0; j<num; j++) {
        if (_show[j]) {
          let angle = FS_rand(-HALF_PI*0.5, HALF_PI*0.5);
          this.MONSTER.noStroke();
          this.MONSTER.fill(c_bkg);
          this.MONSTER.beginShape();
          for (let k=0; k<6; k++) {
            let x = cos(map(k, 0, 6, PI+HALF_PI*_w_eye_ra[j], TWO_PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            let y = sin(map(k, 0, 6, PI+HALF_PI*_w_eye_ra[j], TWO_PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            y -= sin(map(0, 0, 6, PI+HALF_PI*_w_eye_ra[j], TWO_PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            let n = createVector(x, y).rotate(angle);
            n.add(_center[j]);
            this.MONSTER.vertex(n.x, n.y);
          }
          for (let k=0; k<6; k++) {
            x = cos(map(k, 0, 6, HALF_PI*_w_eye_ra[j], PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            y = sin(map(k, 0, 6, HALF_PI*_w_eye_ra[j], PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            y -= sin(map(0, 0, 6, HALF_PI*_w_eye_ra[j], PI-HALF_PI*_w_eye_ra[j])) *  _w[j]/2;
            let n = createVector(x, y).rotate(angle);
            n.add(_center[j]);
            this.MONSTER.vertex(n.x, n.y);
          }
          this.MONSTER.endShape(CLOSE);

          this.MONSTER.noStroke();
          this.MONSTER.fill(c_dark);
          this.MONSTER.beginShape();
          for (let k=0; k<6; k++) {
            let x = cos(map(k, 0, 6, -HALF_PI+HALF_PI*0.5, HALF_PI-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            let y = sin(map(k, 0, 6, -HALF_PI+HALF_PI*0.5, HALF_PI-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            x -= cos(map(0, 0, 6, -HALF_PI+HALF_PI*0.5, HALF_PI-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            let n = createVector(x, y).rotate(angle);
            n.add(_center[j]);
            this.MONSTER.vertex(n.x, n.y);
          }
          for (let k=0; k<6; k++) {
            x = cos(map(k, 0, 6, HALF_PI+HALF_PI*0.5, PI*1.5-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            y = sin(map(k, 0, 6, HALF_PI+HALF_PI*0.5, PI*1.5-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            x -= cos(map(0, 0, 6, HALF_PI+HALF_PI*0.5, PI*1.5-HALF_PI*0.5)) *  _w[j]*(1-_w_eye_ra[j])/2;
            let n = createVector(x, y).rotate(angle);
            n.add(_center[j]);
            this.MONSTER.vertex(n.x, n.y);
          }
          this.MONSTER.endShape(CLOSE);
        }
      }
    }
  };



























  this.display = function(_state_noise, _var_noise) {
    noStroke();
    fill(c_dark);
    for (let i=0; i<this.node_body.length; i++) {
      FS_drawShape(this.node_body[i]);
    }

    //drawCylinder_TRIANGLES(this.node_body);
    let l_sum = 0;
    for (let j=0; j<this.node_body[0].length; j++) {
      l_sum += p5.Vector.dist(this.node_body[0][j], this.node_body[0][(j+1)%this.node_body[0].length]);
    }
    let l_now = 0;
    let uv_x = new Array(this.node_body[0].length+1);
    uv_x[0] = 0;
    for (let j=0; j<this.node_body[0].length; j++) {
      l_now += p5.Vector.dist(this.node_body[0][j], this.node_body[0][(j+1)%this.node_body[0].length]);
      uv_x[j+1] = map(l_now, 0, l_sum, 0, 1);
    }
    //print(uv_x);

    let index_min = new Array(this.node_body.length);
    let index_max = new Array(this.node_body.length);
    for (let i=0; i<this.node_body.length; i++) {
      index_min[i] = 0;
      index_max[i] = 0;
      for (let j=0; j<this.node_body[i].length; j++) {
        if (screenPosition(this.node_body[i][j]).x < screenPosition(this.node_body[i][index_min[i]]).x) {
          index_min[i] = j;
        }
        if (screenPosition(this.node_body[i][j]).x > screenPosition(this.node_body[i][index_max[i]]).x) {
          index_max[i] = j;
        }
      }
    }

    beginShape(TRIANGLES);
    texture(this.MONSTER);
    for (let j=0; j<this.node_body[0].length; j++) {
      TRIANGLES_getRect_uv(this.node_body[0][j], this.node_body[1][j], this.node_body[1][(j+1)%this.node_body[0].length], this.node_body[0][(j+1)%this.node_body[0].length], 
        createVector(uv_x[j], 1), 
        createVector(uv_x[j], 0), 
        createVector(uv_x[j+1], 0), 
        createVector(uv_x[j+1], 1));
    }
    endShape();
    fill(255);


    fill(c_dark);
    for (let i=0; i<this.node_fur.length; i++) {
      FS_drawShape(this.node_fur[i][0]);
    }
  };
}