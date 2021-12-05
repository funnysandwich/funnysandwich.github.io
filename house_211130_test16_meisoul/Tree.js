function Tree(begin) {
  this.begin = begin.copy();
  this.ran = random(-999, 999);
  this.oriH = real(random(15, 20));
  this.lampFace = random(0, TWO_PI);
  this.W = random(4, 5);

  this.leaf_oriW = real(random(25, 35));
  this.leaf_W_att = 0.7;







  this.node = new Array(floor(random(4, 6)));
  for (let i=0; i<this.node.length; i++) {
    this.node[i] = createVector(this.begin.x, this.begin.y, this.begin.z);
  }




  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let l = map(i, 0, this.node.length-1, HALF_PI*0.01, HALF_PI*0.15);
    this.node_rotate[i][0] = random(-l, l);
    this.node_rotate[i][1] = random(-l, l);
  }




  this.node_leaf = Array.from(Array(this.node.length-2), () => new Array(8)); 
  for (let i=0; i<this.node_leaf.length; i++) {
    for (let j=0; j<this.node_leaf[i].length; j++) {
      this.node_leaf[i][j] = createVector(this.begin.x, this.begin.y, this.begin.z);
    }
  }

  this.have_leaf = Array.from(Array(this.node_leaf.length), () => new Array(this.node_leaf[0].length));
  for (let i=0; i<this.have_leaf.length; i++) {      
    let twig_begin = floor(random(0, this.have_leaf[i].length));
    let twig_num = floor(random(map(i, 0, this.have_leaf.length, 0.5, 0), 5));
    if (twig_num < 2) {
      twig_num = 0;
    }
    for (let j=0; j<this.have_leaf[i].length; j++) {
      this.have_leaf[i][j] = false;

      for (let k=0; k<twig_num; k++) {
        if (j == (twig_begin + floor(this.have_leaf[i].length/twig_num)*k)  %  this.have_leaf[i].length) {
          this.have_leaf[i][j] = true;
        }
      }
    }
  }






  this.update = function() {
    this.node[0] = easing_p2(this.node[0], createVector(this.begin.x, this.begin.y, this.begin.z));
    for (let i=1; i<this.node.length; i++) {
      let n;
      if (i == 1) {
        n = createVector(0, -this.oriH, 0);
      } else {
        n = createVector(0, -this.oriH, 0).setMag(p5.Vector.dist(this.node[i-1], this.node[i-2])).mult(0.88);
      }
      n = PRotateZ(n, this.node_rotate[i][0]);
      n = PRotateX(n, this.node_rotate[i][1]);
      n.add(this.node[i-1]);
      this.node[i] = easing_p(this.node[i], n);
    }


    for (let i=0; i<this.node_leaf.length; i++) {
      for (let j=0; j<this.node_leaf[i].length; j++) {
        let x = cos(map(j, 0, this.node_leaf[i].length, 0, TWO_PI)) * (this.leaf_oriW/2.0 * pow(this.leaf_W_att, i));
        let y = sin(map(j, 0, this.node_leaf[i].length, 0, TWO_PI)) * (this.leaf_oriW/2.0 * pow(this.leaf_W_att, i));
        let n = createVector(x, 0, y);
        n = PRotateZ(n, this.node_rotate[i+2][0]);
        n = PRotateX(n, this.node_rotate[i+2][1]);
        n.add(this.node[i+1]);
        this.node_leaf[i][j] = easing_p2(this.node_leaf[i][j], n);
      }
    }
  };





  this.display = function() {
    stroke(0);

    for (let i=1; i<this.node.length; i++) {
      strokeWeight(real(map(i, 0, this.node.length, 4, 1.5)));
      line(this.node[i].x, this.node[i].y, this.node[i].z, this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
    }

    fill(0);
    strokeWeight(real(2));
    noFill();
    for (let i=0; i<this.node_leaf.length; i++) {
      for (let j=0; j<this.node_leaf[i].length; j++) {
        if (this.have_leaf[i][j]) {
          let n = p5.Vector.sub(this.node[i+2], this.node[i+1]).mult(-0.5).add(this.node[i+2]);
          let m = p5.Vector.add(n, this.node_leaf[i][j]).mult(0.5);
          let weight = map(i, 0, this.node_leaf.length, 2, 1);
          strokeWeight(real(weight));
          //beginShape(LINES);
          //vertex(n.x, n.y, n.z);
          //vertex(m.x, m.y, m.z);
          //endShape();
          line(n.x, n.y, n.z,m.x, m.y, m.z);

          strokeWeight(real(weight-0.3));
          //beginShape(LINES);
          //vertex(m.x, m.y, m.z);
          //vertex(this.node_leaf[i][j].x, this.node_leaf[i][j].y, this.node_leaf[i][j].z);
          //endShape();
          line(m.x, m.y, m.z,this.node_leaf[i][j].x, this.node_leaf[i][j].y, this.node_leaf[i][j].z);
        }
      }
    }
  };







  this.displayInfo = function() {
    stroke(200);
    strokeWeight(real(2));
    noFill();
    beginShape(POINTS);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    endShape();
    strokeWeight(real(0.5));
    beginShape(LINES);
    for (let i=1; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      vertex(this.node[i-1].x, this.node[i-1].y, this.node[i-1].z);
    }
    endShape();



    strokeWeight(real(0.5));
    noFill();
    beginShape(LINES);
    for (let i=0; i<this.node_leaf.length; i++) {
      for (let j=0; j<this.node_leaf[i].length; j++) {
        if (this.have_leaf[i][j]) {

          let n = p5.Vector.sub(this.node[i+2], this.node[i+1]).mult(-0.5).add(this.node[i+2]);
          vertex(n.x, n.y, n.z);
          vertex(this.node_leaf[i][j].x, this.node_leaf[i][j].y, this.node_leaf[i][j].z);
        }
      }
    }
    endShape();
  };
}
//@funnysandwich