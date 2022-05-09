function Sign(begin) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.H_basic = real(random(15, 22));
  this.W_target = real(random(9, 15));
  this.W = 0;
  this.face = random(0, TWO_PI);

  this.center = createVector(0, 0, 0);
  this.detail = new Array(9);
  this.node = new Array(4);


  for (let i=0; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }
  for (let i=0; i<this.detail.length; i++) {
    this.detail[i] = this.begin.copy();
  }









  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let l = map(i, 0, this.node.length-1, HALF_PI*0.01, HALF_PI*0.15);
    this.node_rotate[i][0] = random(-l, l);
    this.node_rotate[i][1] = random(-l, l);
  }









  this.update = function() {
    this.W = easing_x(this.W, this.W_target, 0.5);

    this.node[0] = easing_p(this.node[0], createVector(this.begin.x, this.begin.y, this.begin.z), 0.35);
    for (let i=1; i<this.node.length; i++) {
      let n;
      if (i == 1) {
        n = createVector(0, -this.H_basic, 0);
      } else {
        n = createVector(0, -this.H_basic, 0).setMag(p5.Vector.dist(this.node[i-1], this.node[i-2])).mult(0.7);
      }
      n = PRotateZ(n, this.node_rotate[i][0]);
      n = PRotateX(n, this.node_rotate[i][1]);
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n, 0.65);
    }



    this.center = p5.Vector.sub(this.node[this.node.length-1], this.node[this.node.length-2]).setMag(this.W/2).add(this.node[this.node.length-1]);



    //for (let i=0; i<this.detail.length; i++) {
    //  let x = cos(map(i, 0, this.detail.length, 0, TWO_PI)) * (this.W/2);
    //  let y = sin(map(i, 0, this.detail.length, 0, TWO_PI)) * (this.W/2);
    //  this.detail[i] = createVector(x, y, 0);
    //  this.detail[i] = PRotateY(this.detail[i], this.face);
    //  this.detail[i] = PRotateZ(this.detail[i], this.node_rotate[this.node_rotate.length-1][0]);
    //  this.detail[i] = PRotateX(this.detail[i], this.node_rotate[this.node_rotate.length-1][1]);
    //  this.detail[i].add(this.center);
    //}


    for (let i=0; i<this.detail.length; i++) {
      if (i < this.detail.length/3) {
        let x = cos(map(i, 0, this.detail.length/3-1, -HALF_PI-(HALF_PI/3*2), -HALF_PI+(HALF_PI/3*2))) * (this.W*0.2);
        let y = sin(map(i, 0, this.detail.length/3-1, -HALF_PI-(HALF_PI/3*2), -HALF_PI+(HALF_PI/3*2))) * (this.W*0.2);
        this.detail[i] = createVector(x, y-(this.W/2), 0);
      } else if (i < this.detail.length/3*2) {
        let x = cos(map(i, this.detail.length/3, this.detail.length/3*2-1, -HALF_PI+(HALF_PI/3), HALF_PI)) * (this.W*0.2);
        let y = sin(map(i, this.detail.length/3, this.detail.length/3*2-1, -HALF_PI+(HALF_PI/3), HALF_PI)) * (this.W*0.2);
        this.detail[i] = createVector(x+(this.W/2), y+(this.W*0.27), 0);
      } else {
        let x = cos(map(i, this.detail.length/3*2, this.detail.length-1, HALF_PI, PI+(HALF_PI/3*2))) * (this.W*0.2);
        let y = sin(map(i, this.detail.length/3*2, this.detail.length-1, HALF_PI, PI+(HALF_PI/3*2))) * (this.W*0.2);
        this.detail[i] = createVector(x-(this.W/2), y+(this.W*0.27), 0);
      }
      this.detail[i] = PRotateY(this.detail[i], this.face);
      this.detail[i] = PRotateZ(this.detail[i], this.node_rotate[this.node_rotate.length-1][0]);
      this.detail[i] = PRotateX(this.detail[i], this.node_rotate[this.node_rotate.length-1][1]);
      this.detail[i].add(this.center);
    }
  };





  this.display = function() {
    noFill();
    stroke(0);
    strokeWeight(real(2));
    beginShape(LINES);
    for (let i=0; i<this.node.length-1; i++) {
      //strokeWeight(real(map(i, 0, this.node.length-1, 2, 1.5)));
      LINES_getLine(this.node[i], this.node[i+1]);
    }

    for (let i=0; i<this.detail.length; i++) {
      LINES_getLine(this.detail[i], this.detail[(i+1)%this.detail.length]);
    }
    endShape();


    beginShape(POINTS);
    for (let i=0; i<this.detail.length; i++) {
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z);
    }
    endShape();


    noStroke();
    fill(255);
    beginShape();
    if (lamp.state == 1) {
      texture(SIGN[0]);
    } else if (lamp.state == 2) {
      texture(SIGN[1]);
    } else {
      texture(SIGN[2]);
    }
    for (let i=0; i<this.detail.length; i++) {
      let uv_x = 0;
      let uv_y = 0;
      if (i < this.detail.length/3) {
        uv_x = map(cos(map(i, 0, this.detail.length/3-1, -HALF_PI-(HALF_PI/3*2), -HALF_PI+(HALF_PI/3*2))), -1, 1, 0.45, 0.55);
        uv_y = map(sin(map(i, 0, this.detail.length/3-1, -HALF_PI-(HALF_PI/3*2), -HALF_PI+(HALF_PI/3*2))), 0, -1, 0.15, 0);
      } else if (i < this.detail.length/3*2) {
        uv_x = map(cos(map(i, this.detail.length/3, this.detail.length/3*2-1, -HALF_PI+(HALF_PI/3), HALF_PI)), 0, 1, 0.85, 1);
        uv_y = map(sin(map(i, this.detail.length/3, this.detail.length/3*2-1, -HALF_PI+(HALF_PI/3), HALF_PI)), 0, 1, 0.8, 1);
      } else {
        uv_x = map(cos(map(i, this.detail.length/3*2, this.detail.length-1, HALF_PI, PI+(HALF_PI/3*2))), 0, -1, 0.15, 0);
        uv_y = map(sin(map(i, this.detail.length/3*2, this.detail.length-1, HALF_PI, PI+(HALF_PI/3*2))), 0, 1, 0.8, 1);
      }
      vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z, uv_x, uv_y);
    }
    endShape(CLOSE);
    fill(255);
  };









  this.displayInfo = function() {
    //stroke(200);
    //strokeWeight(real(2));
    //for (let i=0; i<this.node.length; i++) {
    //  point(this.node[i]);
    //}
    //point(this.center);
    //strokeWeight(real(0.5));
    //for (let i=1; i<this.node.length; i++) {
    //  line(this.node[i].x, this.node[i].y, this.node[i].z, this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
    //}

    //strokeWeight(real(1.5));
    //for (let i=0; i<this.detail.length; i++) {
    //  point(this.detail[i]);
    //}
    //strokeWeight(real(0.5));
    //beginShape();
    //for (let i=0; i<this.detail.length; i++) {
    //  vertex(this.detail[i].x, this.detail[i].y, this.detail[i].z);
    //}
    //endShape(CLOSE);


    for (let i=1; i<this.node.length; i++) {
      LINES_getLine(this.node[i], this.node[i-1]);
    }
    for (let i=0; i<this.detail.length; i++) {
      LINES_getLine(this.detail[i], this.detail[(i+1)%this.detail.length]);
    }
  };
}
//@funnysandwich
