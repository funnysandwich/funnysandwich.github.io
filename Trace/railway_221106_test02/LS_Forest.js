function Forest(begin, end, is_left) {
  this.ran = random(-9999, 9999);
  this.begin = begin.copy();
  this.end = end.copy();
  this.is_left = is_left;


  this.W = real(random(50, 100));
  this.H_ori = real(random(300, 400));

  this.X = real(random(-700, 0));
  if (state_pole_l == 4) {
    this.X = real(random(-700, -150));
  }
  if (!this.is_left) {
    this.X = real(random(0, 700));
    if (state_pole_r == 4) {
      this.X = real(random(150, 700));
    }
  }


  this.node_trunk = new Array(4);
  for (let i=0; i<this.node_trunk.length; i++) {
    this.node_trunk[i] = p5.Vector.sub(this.end, this.begin).mult(noise(this.ran)).add(this.begin);
  }

  this.bark_trunk = Array.from(Array(this.node_trunk.length), () => new Array(2));
  for (let i=0; i<this.bark_trunk.length; i++) {
    for (let j=0; j<this.bark_trunk[i].length; j++) {
      this.bark_trunk[i][j] = this.node_trunk[0].copy();
    }
  }

  this.ro_trunk = new Array(this.node_trunk.length);
  for (let i=0; i<this.ro_trunk.length; i++) {
    this.ro_trunk[i] = lerp(-PI*0.125, PI*0.125, noise(this.ran+839+i*0.25));
  }


  this.node_base = new Array(6);
  for (let i=0; i<this.node_base.length; i++) {
    this.node_base[i] = this.node_trunk[0].copy();
  }




  this.X_grass = real(random(-500, 0));
  if (!this.is_left) {
    this.X_grass = real(random(0, 500));
  }
  this.grass = new Grass(p5.Vector.sub(this.end, this.begin).mult(noise(this.ran+333)).add(this.begin).add(this.X_grass, 0, 0), createVector(real(10), real(25)));









  this.update = function(begin, end) {
    this.begin = begin.copy();
    this.end = end.copy();


    this.node_trunk[0] = p5.Vector.sub(this.begin, this.end).mult(noise(this.ran)).add(this.begin).add(map(this.node_trunk[0].z, rail.begin.z, rail.end.z, this.X, this.X*0.35), 0, 0);

    for (let i=1; i<this.node_trunk.length; i++) {
      this.node_trunk[i] = createVector(0, -this.H_ori * pow(0.88, (i-1)), 0);
      this.node_trunk[i] = PRotateZ(this.node_trunk[i], this.ro_trunk[i]);
      this.node_trunk[i].add(this.node_trunk[i-1]);
    }


    for (let i=0; i<this.bark_trunk.length; i++) {
      let w = map(i, 0, this.bark_trunk.length, this.W, 0);
      this.bark_trunk[i][0] = createVector(-w/2.0, 0, 0);
      this.bark_trunk[i][1] = createVector(w/2.0, 0, 0);
      for (let j=0; j<this.bark_trunk[i].length; j++) {
        let angle = map(this.node_trunk[0].z, rail.begin.z, rail.end.z, 0, -PI*0.4);
        if (!this.is_left) {
          angle *= -1;
        }
        //this.bark_trunk[i][j] = PRotateY(this.bark_trunk[i][j], angle);
        this.bark_trunk[i][j].add(this.node_trunk[i]);
      }
    }



    for (let i=0; i<this.node_base.length; i++) {
      let x = cos(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
      let z = sin(map(i, 0, this.node_base.length, 0, TWO_PI)) * this.W/2.0;
      this.node_base[i] = createVector(x, 0, z);
      this.node_base[i].add(this.node_trunk[0]);
      this.node_base[i].y = map(this.node_base[i].z, this.begin.z, this.end.z, this.begin.y, this.end.y);
    }


    let begin_grass = p5.Vector.sub(this.end, this.begin).mult(noise(this.ran+333)).add(this.begin);
    this.grass.update(begin_grass.add(map(begin_grass.z, rail.begin.z, rail.end.z, this.X_grass, this.X_grass*0.35), 0, 0));









    for (let i=0; i<this.node_trunk.length; i++) {
      this.node_trunk[i] = PRotateX(this.node_trunk[i], roX);
      this.node_trunk[i].add(0, tranY, tranZ);
    }
    for (let i=0; i<this.bark_trunk.length; i++) {
      for (let j=0; j<this.bark_trunk[i].length; j++) {
        this.bark_trunk[i][j] = PRotateX(this.bark_trunk[i][j], roX);
        this.bark_trunk[i][j].add(0, tranY, tranZ);
      }
    }
    for (let i=0; i<this.node_base.length; i++) {
      this.node_base[i] = PRotateX(this.node_base[i], roX);
      this.node_base[i].add(0, tranY, tranZ);
    }
  };











  this.display = function() {
    const c1 = lerpColor(c_far, c_near, constrain(map(this.node_trunk[0].z, rail.begin.z, rail.end.z, -0.125, 1), 0, 1));
    fill(c1);
    for (let i=0; i<this.bark_trunk.length-1; i++) {
      TRIANGLES_getRect(this.bark_trunk[i][0], this.bark_trunk[i][1], this.bark_trunk[i+1][1], this.bark_trunk[i+1][0]);
    }
    for (let i=0; i<this.node_base.length; i++) {
      TRIANGLES_getTriangle(this.node_base[i], this.node_base[(i+1)%this.node_base.length], this.node_trunk[1]);
    }


    this.grass.display();
  };









  this.displayInfo = function() {
    for (let i=0; i<this.node_trunk.length-1; i++) {
      LINES_getLine(this.node_trunk[i], this.node_trunk[i+1]);
    }
    for (let i=0; i<this.bark_trunk.length-1; i++) {
      for (let j=0; j<this.bark_trunk[i].length; j++) {
        LINES_getLine(this.bark_trunk[i][j], this.bark_trunk[i+1][j]);
      }
    }
    LINES_getEllipse(this.node_base);

    this.grass.displayInfo();
  };
}
