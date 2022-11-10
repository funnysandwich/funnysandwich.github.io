function Board(begin) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.is_I = random(1) < 0.5;

  this.H_arrow = real(random(80, 150));
  this.W_arrow = real(random(20, 30));
  this.floor_H = 1;
  if (random(1) < 0.25) {
    this.floor_H = floor(random(2, 5));
  }
  this.H = real(65) * this.floor_H;
  this.W = real(random(100, 400));
  if (this.floor_H > 1) {
    this.W = real(random(350, 400));
  }
  this.W_ori = this.W;

  this.detail_fillet = 3;
  this.R_fillet = real(25);

  this.node = new Array(this.detail_fillet * 4);
  for (let i=0; i<this.node.length; i++) {
    if (i < this.node.length/4) {
      let nx = cos(map(i, 0, this.node.length/4-1, PI, PI+HALF_PI)) * this.R_fillet;
      let ny = sin(map(i, 0, this.node.length/4-1, PI, PI+HALF_PI)) * this.R_fillet;
      this.node[i] = createVector(nx - this.W/2.0 + this.R_fillet, ny - this.H/2.0 + this.R_fillet, 0);
    } else if (i < this.node.length/4*2) {
      let nx = cos(map(i, this.node.length/4, this.node.length/4*2-1, -HALF_PI, 0)) * this.R_fillet;
      let ny = sin(map(i, this.node.length/4, this.node.length/4*2-1, -HALF_PI, 0)) * this.R_fillet;
      this.node[i] = createVector(nx + this.W/2.0 - this.R_fillet, ny - this.H/2.0 + this.R_fillet, 0);
    } else if (i < this.node.length/4*3) {
      let nx = cos(map(i, this.node.length/4*2, this.node.length/4*3-1, 0, HALF_PI)) * this.R_fillet;
      let ny = sin(map(i, this.node.length/4*2, this.node.length/4*3-1, 0, HALF_PI)) * this.R_fillet;
      this.node[i] = createVector(nx + this.W/2.0 - this.R_fillet, ny + this.H/2.0 - this.R_fillet, 0);
    } else {
      let nx = cos(map(i, this.node.length/4*3, this.node.length-1, HALF_PI, PI)) * this.R_fillet;
      let ny = sin(map(i, this.node.length/4*3, this.node.length-1, HALF_PI, PI)) * this.R_fillet;
      this.node[i] = createVector(nx - this.W/2.0 + this.R_fillet, ny + this.H/2.0 - this.R_fillet, 0);
    }
    this.node[i].add(this.begin).add(0, -this.H/2.0-this.H_arrow, 0);
  }



  this.node_arrow = new Array(4);
  this.node_arrow[0] = this.begin.copy().add(-this.W_arrow*0.25, 0, 0);
  this.node_arrow[1] = this.begin.copy().add(-this.W_arrow*0.25, -this.H_arrow, 0);
  this.node_arrow[2] = this.begin.copy().add(this.W_arrow*0.5, -this.H_arrow, 0);
  this.node_arrow[3] = this.begin.copy().add(this.W_arrow*0.5, 0, 0);






  this.node_user = new Array(8);
  for (let i=0; i<this.node_user.length; i++) {
    this.node_user[i] = createVector(0, 0, 0);
  }







  this.update = function(begin) {
    this.begin = begin.copy();
    if (this.is_I) {
      this.begin.add(real(150), 0, 0);
    } else {
      this.begin.add(-real(150), 0, 0);
    }


    if (this.W > real(150)  &&  this.begin.z > -real(200)) {
      //this.W = map(this.begin.z, -real(200), real(200), this.W_ori, real(200));
      this.W = easing_x(this.W, real(150), map(speed, real(10), real(100), 0.035, 0.35));
    }



    for (let i=0; i<this.node.length; i++) {
      if (i < this.node.length/4) {
        let nx = cos(map(i, 0, this.node.length/4-1, PI, PI+HALF_PI)) * this.R_fillet;
        let ny = sin(map(i, 0, this.node.length/4-1, PI, PI+HALF_PI)) * this.R_fillet;
        this.node[i] = createVector(nx - this.W/2.0 + this.R_fillet, ny - this.H/2.0 + this.R_fillet, 0);
      } else if (i < this.node.length/4*2) {
        let nx = cos(map(i, this.node.length/4, this.node.length/4*2-1, -HALF_PI, 0)) * this.R_fillet;
        let ny = sin(map(i, this.node.length/4, this.node.length/4*2-1, -HALF_PI, 0)) * this.R_fillet;
        this.node[i] = createVector(nx + this.W/2.0 - this.R_fillet, ny - this.H/2.0 + this.R_fillet, 0);
      } else if (i < this.node.length/4*3) {
        let nx = cos(map(i, this.node.length/4*2, this.node.length/4*3-1, 0, HALF_PI)) * this.R_fillet;
        let ny = sin(map(i, this.node.length/4*2, this.node.length/4*3-1, 0, HALF_PI)) * this.R_fillet;
        this.node[i] = createVector(nx + this.W/2.0 - this.R_fillet, ny + this.H/2.0 - this.R_fillet, 0);
      } else {
        let nx = cos(map(i, this.node.length/4*3, this.node.length-1, HALF_PI, PI)) * this.R_fillet;
        let ny = sin(map(i, this.node.length/4*3, this.node.length-1, HALF_PI, PI)) * this.R_fillet;
        this.node[i] = createVector(nx - this.W/2.0 + this.R_fillet, ny + this.H/2.0 - this.R_fillet, 0);
      }
      this.node[i].add(this.begin).add(0, -this.H/2.0-this.H_arrow, 0);
      if (this.is_I) {
        this.node[i].add(-this.W/2.0+real(50), 0, 0);
      } else {
        this.node[i].add(this.W/2.0-real(50), 0, 0);
      }
    }



    this.node_arrow[0] = this.begin.copy().add(-this.W_arrow*0.2, 0, 0);
    this.node_arrow[1] = this.begin.copy().add(-this.W_arrow*0.5, -this.H_arrow, 0);
    this.node_arrow[2] = this.begin.copy().add(this.W_arrow*0.5, -this.H_arrow, 0);
    this.node_arrow[3] = this.begin.copy().add(this.W_arrow*0.2, 0, 0);



    for (let i=0; i<this.node_user.length; i++) {
      let w = real(100);
      let x = cos(map(i, 0, this.node_user.length, 0, TWO_PI)) * w/2.0;
      let z = sin(map(i, 0, this.node_user.length, 0, TWO_PI));
      let y = map(z, -1, 1, p5.Vector.sub(rail.begin, this.begin).setMag(w/2.0).y, p5.Vector.sub(rail.end, this.begin).setMag(w/2.0).y);
      z = map(z, -1, 1, p5.Vector.sub(rail.begin, this.begin).setMag(w/2.0).z, p5.Vector.sub(rail.end, this.begin).setMag(w/2.0).z);
      this.node_user[i] = this.begin.copy().add(x, y, z);
    }





    for (let i=0; i<this.node.length; i++) {
      this.node[i].add(-this.begin.x, -this.begin.y, -this.begin.z);
      this.node[i] = PRotateX(this.node[i], -roX);
      this.node[i].add(this.begin);

      this.node[i] = PRotateX(this.node[i], roX);
      this.node[i].add(0, tranY, tranZ);
    }

    for (let i=0; i<this.node_arrow.length; i++) {
      this.node_arrow[i].add(-this.begin.x, -this.begin.y, -this.begin.z);
      this.node_arrow[i] = PRotateX(this.node_arrow[i], -roX);
      this.node_arrow[i].add(this.begin);

      this.node_arrow[i] = PRotateX(this.node_arrow[i], roX);
      this.node_arrow[i].add(0, tranY, tranZ);
    }

    for (let i=0; i<this.node_user.length; i++) {
      this.node_user[i] = PRotateX(this.node_user[i], roX);
      this.node_user[i].add(0, tranY, tranZ);
    }
  };







  this.display = function() {
    fill(255);
    TRIANGLES_getShape(this.node);
    TRIANGLES_getShape(this.node_arrow);

    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<5; j++) {
        fill(lerpColor(c_far, c_near, map(this.node[i].z, skyline.z, real(200), 0, 1)));
        let n = p5.Vector.sub(createVector(0, 0, real(1000)), this.node[i]).setMag(real(1)).add(this.node[i]);
        let n_ = p5.Vector.sub(createVector(0, 0, real(1000)), this.node[(i+1)%this.node.length]).setMag(real(1)).add(this.node[(i+1)%this.node.length]);
        if (i == this.node.length/4*3) {
          n = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[1]).setMag(real(1)).add(this.node_arrow[1]);
        } else if (i == this.node.length/4*3-1) {
          n_ = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[2]).setMag(real(1)).add(this.node_arrow[2]);
        }
        n.add(real(lerp(-10, 10, noise(this.ran+i*99+j*99))), real(lerp(-10, 10, noise(this.ran+i*22+j*44))), 0);
        n_.add(real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*99+j*99))), real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*22+j*44))), 0);
        TRIANGLES_getLine_weight_T(n, n_, real(1));


        if (i == this.node.length/4*3-1) {
          n = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[2]).setMag(real(1)).add(this.node_arrow[2]);
          n_ = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[3]).setMag(real(1)).add(this.node_arrow[3]);
          n.add(real(lerp(-10, 10, noise(this.ran+i*99+j*99))), real(lerp(-10, 10, noise(this.ran+i*22+j*44))), 0);
          n_.add(real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*99+j*99))), real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*22+j*44))), 0);
          TRIANGLES_getLine_weight_T(n, n_, real(1));
          n = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[0]).setMag(real(1)).add(this.node_arrow[0]);
          n_ = p5.Vector.sub(createVector(0, 0, real(1000)), this.node_arrow[1]).setMag(real(1)).add(this.node_arrow[1]);
          n.add(real(lerp(-10, 10, noise(this.ran+i*99+j*99))), real(lerp(-10, 10, noise(this.ran+i*22+j*44))), 0);
          n_.add(real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*99+j*99))), real(lerp(-10, 10, noise(this.ran+((i+1)%this.node.length)*22+j*44))), 0);
          TRIANGLES_getLine_weight_T(n, n_, real(1));
        }
      }
    }




    fill(lerpColor(c_far, c_near, map(this.begin.z, skyline.z, real(200), 0, 1)));
    TRIANGLES_getShape(this.node_user);
  };








  this.displayInfo = function() {
    LINES_getEllipse(this.node);
    LINES_getEllipse(this.node_arrow);
    LINES_getEllipse(this.node_user);
  };
}
