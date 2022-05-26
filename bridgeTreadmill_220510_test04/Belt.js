function Belt() {


  this.num_detail_single_arc = 6;
  this.W_fillet = floor(width*0.25);
  this.count = 0;
  this.time = 0.5;
  this.speed = 0.2;


  this.node = Array.from(Array(2), () => new Array(this.num_detail_single_arc * 2));

  for (let i=0; i<this.node.length; i++) {
    for (let j=0; j<this.node[i].length; j++) {
      let x, y, z;
      x = ceil(width/2.0) * pow(-1, i+1);
      if (j < this.node[i].length/2) {
        z = map(cos(map(j, 0, this.node[i].length/2-1, 0, -PI)), -1, 1, 0, -this.W_fillet);
        y = sin(map(j, 0, this.node[i].length/2-1, 0, -PI)) * this.W_fillet/2.0;
        y -= ceil(height/2.0);
      } else {
        z = map(cos(map(j, this.node[i].length/2, this.node[i].length-1, -PI, -TWO_PI)), -1, 1, 0, -this.W_fillet);
        y = sin(map(j, this.node[i].length/2, this.node[i].length-1, -PI, -TWO_PI)) * this.W_fillet/2.0;
        y += ceil(height/2.0);
      }
      this.node[i][j] = createVector(x, y, z);
    }
  }




  this.node_wheel = Array.from(Array(4), () => new Array(this.num_detail_single_arc * 2 - 2));
  for (let i=0; i<this.node_wheel.length; i++) {
    for (let j=0; j<this.node_wheel[i].length; j++) {
      let z = cos(map(j, 0, this.node_wheel[i].length, 0, TWO_PI)) * (this.W_fillet/2.0-real(5));
      let y = sin(map(j, 0, this.node_wheel[i].length, 0, TWO_PI)) * (this.W_fillet/2.0-real(5));
      let x = 0;
      if (i == 0) {
        x -= ceil(width/2.0) + real(10);
        y -= ceil(height/2.0);
      } else if (i == 1) {
        x += ceil(width/2.0) + real(10);
        y -= ceil(height/2.0);
      } else if (i == 2) {
        x += ceil(width/2.0) + real(10);
        y += ceil(height/2.0);
      } else {
        x -= ceil(width/2.0) + real(10);
        y += ceil(height/2.0);
      }

      this.node_wheel[i][j] = createVector(x, y, z);
    }
  }










  this.update = function() {
    if (open_roll) {
      this.count ++;
      this.count = this.count % 100;
      if (this.count < 3) {
        this.speed = map(sin(map(this.count, 0, 3, 0, HALF_PI)), 0, 1, 0.0025, 0.02);
      } else {
        this.speed = map(cos(map(this.count, 5, 100, HALF_PI, PI)), 0, -1, 0.02, 0.0025);
      }

      this.time -= this.speed;
    } else {
      this.count = 0;
    }


    if (this.time < 0) {
      this.time = 0.5;
    }


    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        let x, y, z;
        x = ceil(width/2.0) * pow(-1, i+1);
        if (j < this.node[i].length/2) {
          z = map(cos(map(j, 0, this.node[i].length/2-1, 0, -PI)), -1, 1, 0, -this.W_fillet);
          y = sin(map(j, 0, this.node[i].length/2-1, 0, -PI)) * this.W_fillet/2.0;
          y -= ceil(height/2.0);
        } else {
          z = map(cos(map(j, this.node[i].length/2, this.node[i].length-1, -PI, -TWO_PI)), -1, 1, 0, -this.W_fillet);
          y = sin(map(j, this.node[i].length/2, this.node[i].length-1, -PI, -TWO_PI)) * this.W_fillet/2.0;
          y += ceil(height/2.0);
        }
        this.node[i][j] = createVector(x, y, z);
        this.node[i][j].add(0, 0, (map(abs(roY), 0, 1.5, 0, this.W_fillet*0.5)));
        this.node[i][j] = PRotateY(this.node[i][j], -roY);
        this.node[i][j].mult(max(map(abs(roY), 0, 1.5, 1, 0.55), 0.55));
      }
    }





    for (let i=0; i<this.node_wheel.length; i++) {
      for (let j=0; j<this.node_wheel[i].length; j++) {
        let z = cos(map(j, 0, this.node_wheel[i].length, 0, TWO_PI)+map(this.time, 0, 0.5, 0, -TWO_PI*2)) * (this.W_fillet/2.0-real(3));
        let y = sin(map(j, 0, this.node_wheel[i].length, 0, TWO_PI)+map(this.time, 0, 0.5, 0, -TWO_PI*2)) * (this.W_fillet/2.0-real(3));
        let x = 0;
        z -= this.W_fillet/2.0;
        const move = real(35);
        if (i == 0) {
          x -= ceil(width/2.0) + move;
          y -= ceil(height/2.0);
        } else if (i == 1) {
          x += ceil(width/2.0) + move;
          y -= ceil(height/2.0);
        } else if (i == 2) {
          x += ceil(width/2.0) + move;
          y += ceil(height/2.0);
        } else {
          x -= ceil(width/2.0) + move;
          y += ceil(height/2.0);
        }

        this.node_wheel[i][j] = createVector(x, y, z);
        this.node_wheel[i][j].add(0, 0, (map(abs(roY), 0, 1.5, 0, this.W_fillet*0.5)));
        this.node_wheel[i][j] = PRotateY(this.node_wheel[i][j], -roY);
        this.node_wheel[i][j].mult(max(map(abs(roY), 0, 1.5, 1, 0.55), 0.55));
      }
    }
  };





  this.display = function() {
    let c1, c2;
    noStroke();
    fill(255);
    beginShape(TRIANGLES);
    texture(M);
    for (let j=0; j<this.node[0].length; j++) {
      let y_D = 0;
      if (j < this.num_detail_single_arc) {
        const h_max = (round(belt.W_fillet*PI)/2.0)  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D = (map(j, 0, this.num_detail_single_arc-1, 0, h_max))/2.0;
      } else {
        const h_min = (round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        const h_max = (round(belt.W_fillet*PI) + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D = (map(j, this.num_detail_single_arc, this.node[0].length-1, h_min, h_max))/2.0;
      }



      let y_D1 = 0;
      if (j < this.num_detail_single_arc-1) {
        const h_max = (round(belt.W_fillet*PI)/2.0)  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D1 = (map(j+1, 0, this.num_detail_single_arc-1, 0, h_max))/2.0;
      } else if (j == this.num_detail_single_arc-1) {
        y_D1 = ((round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI)))/2.0;
      } else if (j < this.node[0].length-1) {
        const h_min = (round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        const h_max = (round(belt.W_fillet*PI) + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D1 = (map(j+1, this.num_detail_single_arc, this.node[0].length-1, h_min, h_max))/2.0;
      } else {
        y_D1 = (1)/2.0;
      }


      y_D += this.time;
      y_D1 += this.time;


      TRIANGLES_getRect_uv(this.node[0][(j+1)%this.node[0].length], this.node[1][(j+1)%this.node[0].length], this.node[1][j], this.node[0][j], 
        createVector(0, y_D1), createVector(1, y_D1), createVector(1, y_D), createVector(0, y_D));
    }
    endShape();
    fill(255);



    beginShape(TRIANGLES);
    fill(128);
    for (let i=0; i<2; i++) {
      for (let j=0; j<this.node_wheel[0].length; j++) {
        if (i == 0) {
          c1 = color(128);
          c2 = color(100);
        } else if (i == 1) {
          c2 = color(128);
          c1 = color(100);
        }

        TRIANGLES_getRect_fill4(this.node_wheel[i*2][j], this.node_wheel[i*2+1][j], this.node_wheel[i*2+1][(j+1)%this.node_wheel[0].length], this.node_wheel[i*2][(j+1)%this.node_wheel[0].length], c1, c2, c2, c1);
      }
    }

    fill(100);
    for (let i=0; i<this.node_wheel.length; i++) {
      if (i == 0 || i == 3) {
        fill(100);
      } else {
        fill(75);
      }

      for (let j=1; j<this.node_wheel[i].length-1; j++) {
        TRIANGLES_getTriangle(this.node_wheel[i][0], this.node_wheel[i][j], this.node_wheel[i][j+1]);
      }
    }

    fill(128);
    for (let j=0; j<this.node[0].length; j++) {
      if (roY > -1.0) {
        TRIANGLES_getLine_weightToL(this.node[0][j], this.node[0][(j+1)%this.node[0].length], real(2));
      } else {
        TRIANGLES_getLine_weight(this.node[0][j], this.node[0][(j+1)%this.node[0].length], real(4));
      }
    }
    fill(100);
    for (let j=0; j<this.node[1].length; j++) {
      if (roY < 1.0) {
        TRIANGLES_getLine_weightToR(this.node[1][j], this.node[1][(j+1)%this.node[1].length], real(2));
      } else {
        TRIANGLES_getLine_weight(this.node[1][j], this.node[1][(j+1)%this.node[1].length], real(4));
      }
    }
    endShape();




    //fill(100);
    //for (let i=0; i<this.node_wheel.length; i++) {
    //  beginShape();
    //  for (let j=0; j<this.node_wheel[i].length; j++) {
    //    vertex(this.node_wheel[i][j].x, this.node_wheel[i][j].y, this.node_wheel[i][j].z);
    //  }
    //  endShape(CLOSE);
    //}
  };













  this.displayInfo = function() {




    noFill();
    stroke(colorWithAlpha(c_info, 128));
    strokeWeight(real(1));
    beginShape(LINES);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        LINES_getLine(this.node[i][j], this.node[i][(j+1)%this.node[i].length]);
      }
    }
    for (let j=0; j<this.node[0].length; j++) {
      LINES_getLine(this.node[0][j], this.node[1][j]);
      //LINES_getLine(this.node[0][j], this.node[1][(j+1)%this.node[0].length]);
    }


    for (let i=0; i<this.node_wheel.length; i++) {
      for (let j=0; j<this.node_wheel[i].length; j++) {
        LINES_getLine(this.node_wheel[i][j], this.node_wheel[i][(j+1)%this.node_wheel[i].length]);
        if (i == 0 || i == 2) {
          LINES_getLine(this.node_wheel[i][j], this.node_wheel[i+1][j]);
        }
      }
    }




    for (let i=0; i<this.node_wheel.length; i++) {
      let n1 = p5.Vector.sub(this.node_wheel[i][floor(this.node_wheel[i].length/2)], this.node_wheel[i][0]).mult(0.333).add(this.node_wheel[i][0]);
      let n2 = p5.Vector.sub(this.node_wheel[i][floor(this.node_wheel[i].length/2)], this.node_wheel[i][0]).mult(0.666).add(this.node_wheel[i][0]);
      let n3 = p5.Vector.sub(p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4)], this.node_wheel[i][ceil(this.node_wheel[i].length/4)]).mult(0.5), p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4*3)], this.node_wheel[i][ceil(this.node_wheel[i].length/4*3)]).mult(0.5)).mult(0.333).add(p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4*3)], this.node_wheel[i][ceil(this.node_wheel[i].length/4*3)]).mult(0.5));
      let n4 = p5.Vector.sub(p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4)], this.node_wheel[i][ceil(this.node_wheel[i].length/4)]).mult(0.5), p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4*3)], this.node_wheel[i][ceil(this.node_wheel[i].length/4*3)]).mult(0.5)).mult(0.666).add(p5.Vector.add(this.node_wheel[i][floor(this.node_wheel[i].length/4*3)], this.node_wheel[i][ceil(this.node_wheel[i].length/4*3)]).mult(0.5));
      LINES_getLine(n1, n2);
      LINES_getLine(n3, n4);
    }







    endShape();







    noStroke();
    fill(255);
    beginShape(TRIANGLES);
    texture(M_info);
    for (let j=0; j<this.node[0].length; j++) {
      let y_D = 0;
      if (j < this.num_detail_single_arc) {
        const h_max = (round(belt.W_fillet*PI)/2.0)  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D = (map(j, 0, this.num_detail_single_arc-1, 0, h_max))/2.0;
      } else {
        const h_min = (round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        const h_max = (round(belt.W_fillet*PI) + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D = (map(j, this.num_detail_single_arc, this.node[0].length-1, h_min, h_max))/2.0;
      }



      let y_D1 = 0;
      if (j < this.num_detail_single_arc-1) {
        const h_max = (round(belt.W_fillet*PI)/2.0)  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D1 = (map(j+1, 0, this.num_detail_single_arc-1, 0, h_max))/2.0;
      } else if (j == this.num_detail_single_arc-1) {
        y_D1 = ((round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI)))/2.0;
      } else if (j < this.node[0].length-1) {
        const h_min = (round(belt.W_fillet*PI)/2.0 + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        const h_max = (round(belt.W_fillet*PI) + round(375/width * height))  /  (round(375/width * height)*2 + round(belt.W_fillet*PI));
        y_D1 = (map(j+1, this.num_detail_single_arc, this.node[0].length-1, h_min, h_max))/2.0;
      } else {
        y_D1 = (1)/2.0;
      }


      y_D += this.time;
      y_D1 += this.time;


      TRIANGLES_getRect_uv(this.node[0][(j+1)%this.node[0].length], this.node[1][(j+1)%this.node[0].length], this.node[1][j], this.node[0][j], 
        createVector(0, y_D1), createVector(1, y_D1), createVector(1, y_D), createVector(0, y_D));
    }
    endShape();
    fill(255);
  };
}