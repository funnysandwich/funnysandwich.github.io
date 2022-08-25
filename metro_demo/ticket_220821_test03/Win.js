function Win() {
  this.W = real(400);
  this.H = real(200);
  this.W_fillet = real(100);

  this.begin = createVector(real(700)+this.W/2.0, -real(350), -real(250));


  this.node = Array.from(Array(6), () => new Array(3*4));
  for (let i=0; i<this.node.length; i++) {
    let scale = 1.0;//map(i, 0, this.node.length-1, 1.25, 1.0);
    for (let j=0; j<this.node[i].length; j++) {
      if (j < this.node[i].length/4) {
        let x = cos(map(j, 0, this.node[i].length/4-1, PI, PI+HALF_PI))*this.W_fillet/2.0;
        let y = sin(map(j, 0, this.node[i].length/4-1, PI, PI+HALF_PI))*this.W_fillet/2.0;
        this.node[i][j] = createVector(x, y, 0).add(-this.W/2.0+this.W_fillet/2.0, -this.H/2.0+this.W_fillet/2.0, 0);
      } else if (j < this.node[i].length/4*2) {
        let x = cos(map(j, this.node[i].length/4, this.node[i].length/4*2-1, PI+HALF_PI, TWO_PI))*this.W_fillet/2.0;
        let y = sin(map(j, this.node[i].length/4, this.node[i].length/4*2-1, PI+HALF_PI, TWO_PI))*this.W_fillet/2.0;
        this.node[i][j] = createVector(x, y, 0).add(this.W/2.0-this.W_fillet/2.0, -this.H/2.0+this.W_fillet/2.0, 0);
      } else if (j < this.node[i].length/4*3) {
        let x = cos(map(j, this.node[i].length/4*2, this.node[i].length/4*3-1, 0, HALF_PI))*this.W_fillet/2.0;
        let y = sin(map(j, this.node[i].length/4*2, this.node[i].length/4*3-1, 0, HALF_PI))*this.W_fillet/2.0;
        this.node[i][j] = createVector(x, y, 0).add(this.W/2.0-this.W_fillet/2.0, this.H/2.0-this.W_fillet/2.0, 0);
      } else {
        let x = cos(map(j, this.node[i].length/4*3, this.node[i].length-1, HALF_PI, PI))*this.W_fillet/2.0;
        let y = sin(map(j, this.node[i].length/4*3, this.node[i].length-1, HALF_PI, PI))*this.W_fillet/2.0;
        this.node[i][j] = createVector(x, y, 0).add(-this.W/2.0+this.W_fillet/2.0, this.H/2.0-this.W_fillet/2.0, 0);
      }
      this.node[i][j].mult(scale);
      this.node[i][j].add(this.begin);
    }
  }








  this.shadow_node0 = createVector(0, 0, 0);
  this.shadow_node1 = createVector(0, 0, 0);
  this.shadow_node3 = new Array(ticket[num_ticket-1].node_fillet[2].length);
  this.shadow_node4 = new Array(ticket[0].node_fillet[3].length);
  for (let i=0; i<this.shadow_node3.length; i++) {
    this.shadow_node3[i] = createVector(0, 0, 0);
  }
  for (let i=0; i<this.shadow_node4.length; i++) {
    this.shadow_node4[i] = createVector(0, 0, 0);
  }



  this.shadow_wheel = new Array(num_ticket);
  for (let i=0; i<this.shadow_wheel.length; i++) {
    this.shadow_wheel[i] = Array.from(Array(ticket[i].num_wheel), () => new Array(6));
  }
  for (let i=0; i<this.shadow_wheel.length; i++) {
    for (let j=0; j<this.shadow_wheel[i].length; j++) {
      for (let k=0; k<this.shadow_wheel[i][j].length; k++) {
        this.shadow_wheel[i][j][k] = createVector(0, 0, 0);
      }
    }
  }









  this.update = function() {

    this.begin.x = map(time_win, 0, time_max_win, real(700)+this.W/2.0, -real(700)-this.W/2.0);

    for (let i=0; i<this.node.length; i++) {
      let scale = map(i, 0, this.node.length-1, 1.25, 1.0);
      let z = map(i, 0, this.node.length-1, -real(2), 0);
      for (let j=0; j<this.node[i].length; j++) {
        if (j < this.node[i].length/4) {
          let x = cos(map(j, 0, this.node[i].length/4-1, PI, PI+HALF_PI))*this.W_fillet/2.0;
          let y = sin(map(j, 0, this.node[i].length/4-1, PI, PI+HALF_PI))*this.W_fillet/2.0;
          this.node[i][j] = createVector(x, y, 0).add(-this.W/2.0+this.W_fillet/2.0, -this.H/2.0+this.W_fillet/2.0, 0);
        } else if (j < this.node[i].length/4*2) {
          let x = cos(map(j, this.node[i].length/4, this.node[i].length/4*2-1, PI+HALF_PI, TWO_PI))*this.W_fillet/2.0;
          let y = sin(map(j, this.node[i].length/4, this.node[i].length/4*2-1, PI+HALF_PI, TWO_PI))*this.W_fillet/2.0;
          this.node[i][j] = createVector(x, y, 0).add(this.W/2.0-this.W_fillet/2.0, -this.H/2.0+this.W_fillet/2.0, 0);
        } else if (j < this.node[i].length/4*3) {
          let x = cos(map(j, this.node[i].length/4*2, this.node[i].length/4*3-1, 0, HALF_PI))*this.W_fillet/2.0;
          let y = sin(map(j, this.node[i].length/4*2, this.node[i].length/4*3-1, 0, HALF_PI))*this.W_fillet/2.0;
          this.node[i][j] = createVector(x, y, 0).add(this.W/2.0-this.W_fillet/2.0, this.H/2.0-this.W_fillet/2.0, 0);
        } else {
          let x = cos(map(j, this.node[i].length/4*3, this.node[i].length-1, HALF_PI, PI))*this.W_fillet/2.0;
          let y = sin(map(j, this.node[i].length/4*3, this.node[i].length-1, HALF_PI, PI))*this.W_fillet/2.0;
          this.node[i][j] = createVector(x, y, 0).add(-this.W/2.0+this.W_fillet/2.0, this.H/2.0-this.W_fillet/2.0, 0);
        }
        this.node[i][j].mult(scale);
        this.node[i][j].add(this.begin).add(0, 0, z);
      }
    }






    let y_skyline = ticket[0].node_ticket[4].y+W_wheel*0.5;

    this.shadow_node0 = TPFxz(y_skyline, ticket[0].node_ticket[0], this.begin);
    this.shadow_node1 = TPFxz(y_skyline, ticket[num_ticket-1].node_ticket[1], this.begin);
    for (let i=0; i<this.shadow_node3.length; i++) {
      this.shadow_node3[i] = TPFxz(y_skyline, ticket[num_ticket-1].node_fillet[2][i], this.begin);
    }
    for (let i=0; i<this.shadow_node4.length; i++) {
      this.shadow_node4[i] = TPFxz(y_skyline, ticket[0].node_fillet[3][i], this.begin);
    }

    this.shadow_node0 = p5.Vector.sub(this.shadow_node0, this.shadow_node4[this.shadow_node4.length-1]).setMag(max(real(350), p5.Vector.dist(this.shadow_node0, this.shadow_node4[this.shadow_node4.length-1]))).add(this.shadow_node4[this.shadow_node4.length-1]);
    this.shadow_node1 = p5.Vector.sub(this.shadow_node1, this.shadow_node3[0]).setMag(max(real(350), p5.Vector.dist(this.shadow_node1, this.shadow_node3[0]))).add(this.shadow_node3[0]);



    for (let i=0; i<this.shadow_wheel.length; i++) {
      for (let j=0; j<this.shadow_wheel[i].length; j++) {
        for (let k=0; k<this.shadow_wheel[i][j].length; k++) {
          //if (k == 0  ||  k == this.shadow_wheel[i][j].length-1) {
          //  this.shadow_wheel[i][j][k] = TPFxz(y_skyline, createVector(ticket[i].node_wheel[j][k].x, ticket[i].node_fillet[3][0].y, ticket[i].node_wheel[j][k].z), this.begin.copy().add(0, this.H/2.0, 0));
          //} else {
          this.shadow_wheel[i][j][k] = TPFxz(y_skyline, ticket[i].node_wheel[j][k], this.begin);
          // }
        }
      }
    }
  };





  this.display = function() {

    let c = lerpColor(c_bkg, lerpColor(c_bkg, color(255, 255, 220), 0.1), constrain(sin(map(time_win, 0, time_max_win, 0, PI)), 0, 1));


    for (let i=0; i<this.node.length; i++) {
      fill(lerpColor(c_bkg, c, map(i, 0-1, this.node.length-1, 0, 1)));
      for (let j=0; j<this.node[i].length/4-1; j++) {
        TRIANGLES_getRect(this.node[i][j+1], this.node[i][this.node[i].length/4+this.node[i].length/4-1-(j+1)], this.node[i][this.node[i].length/4+this.node[i].length/4-1-j], this.node[i][j]);
      }
      TRIANGLES_getRect(this.node[i][0], this.node[i][this.node[i].length/4*2-1], this.node[i][this.node[i].length/4*2], this.node[i][this.node[i].length-1]);
      for (let j=this.node[i].length/4*2; j<this.node[i].length/4*3-1; j++) {
        TRIANGLES_getRect(this.node[i][j+1], this.node[i][this.node[i].length/4*3+this.node[i].length/4*3-1-(j+1)], this.node[i][this.node[i].length/4*3+this.node[i].length/4*3-1-j], this.node[i][j]);
      }
    }



    TRIANGLES_getRect_fill4(createVector(this.begin.x-real(1500), real(0), this.begin.z), createVector(this.begin.x+real(1500), real(0), this.begin.z), createVector(this.begin.x+real(1500), real(100), this.begin.z), createVector(this.begin.x-real(1500), real(100), this.begin.z), c_bkg, c_bkg, c, c);
    TRIANGLES_getRect_fill(createVector(this.begin.x-real(1500), real(100), this.begin.z), createVector(this.begin.x+real(1500), real(100), this.begin.z), createVector(this.begin.x+real(1500), real(500), this.begin.z), createVector(this.begin.x-real(1500), real(500), this.begin.z), c);






    for (let i=0; i<this.shadow_node3.length-1; i++) {
      let c1 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node3[i], this.shadow_node3[this.shadow_node3.length-1]), 0, real(200), 0, 1), 0, 1));
      let c2 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node3[i+1], this.shadow_node3[this.shadow_node3.length-1]), 0, real(200), 0, 1), 0, 1));
      let c3 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node4[this.shadow_node4.length-1-(i+1)], this.shadow_node4[0]), 0, real(200), 0, 1), 0, 1));
      let c4 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node4[this.shadow_node4.length-1-i], this.shadow_node4[0]), 0, real(200), 0, 1), 0, 1));
      TRIANGLES_getRect_fill4(this.shadow_node3[i], this.shadow_node3[i+1], this.shadow_node4[this.shadow_node4.length-1-(i+1)], this.shadow_node4[this.shadow_node4.length-1-i], c1, c2, c3, c4);
    }

    let c1 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node4[this.shadow_node4.length-1], this.shadow_node4[0]), 0, real(200), 0, 1), 0, 1));
    let c2 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node3[0], this.shadow_node3[this.shadow_node3.length-1]), 0, real(200), 0, 1), 0, 1));
    let c3 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node1, this.shadow_node3[this.shadow_node3.length-1]), 0, real(200), 0, 1), 0, 1));
    let c4 = lerpColor(c_bkg, c, constrain(map(p5.Vector.dist(this.shadow_node0, this.shadow_node4[0]), 0, real(200), 0, 1), 0, 1));
    TRIANGLES_getRect_fill4(this.shadow_node4[this.shadow_node4.length-1], this.shadow_node3[0], this.shadow_node1, this.shadow_node0, c1, c2, c3, c4);





    for (let i=0; i<this.shadow_wheel.length; i++) {
      for (let j=0; j<this.shadow_wheel[i].length; j++) {
        for (let k=0; k<this.shadow_wheel[i][j].length-2; k++) {
          fill(c_bkg);
          TRIANGLES_getTriangle(this.shadow_wheel[i][j][0], this.shadow_wheel[i][j][k+1], this.shadow_wheel[i][j][k+2]);
        }
      }
    }
  };







  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        LINES_getLine(this.node[i][j], this.node[i][(j+1)%this.node[i].length]);
      }
    }





    LINES_getLine(this.shadow_node1, this.shadow_node3[0]);
    for (let i=0; i<this.shadow_node3.length-1; i++) {
      LINES_getLine(this.shadow_node3[i], this.shadow_node3[i+1]);
    }
    LINES_getLine(this.shadow_node3[this.shadow_node3.length-1], this.shadow_node4[0]);

    for (let i=0; i<this.shadow_node4.length-1; i++) {
      LINES_getLine(this.shadow_node4[i], this.shadow_node4[i+1]);
    }
    LINES_getLine(this.shadow_node4[this.shadow_node4.length-1], this.shadow_node0);






    for (let i=0; i<this.shadow_wheel.length; i++) {
      for (let j=0; j<this.shadow_wheel[i].length; j++) {
        for (let k=0; k<this.shadow_wheel[i][j].length-1; k++) {
          LINES_getLine(this.shadow_wheel[i][j][k], this.shadow_wheel[i][j][k+1]);
        }
      }
    }
  };
}
