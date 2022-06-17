function PTTower(begin, W, H, index, PTT_length, is_miniBlock) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.H_target = H;
  this.W_target = W;
  this.H_ori = 0;
  this.W_ori = 0;  
  this.H_att = random(0.6, 0.7);
  this.W_att = random(0.6, 0.7);
  this.index = index;
  this.PTT_length = PTT_length;
  this.is_miniBlock = is_miniBlock;

  this.var_easing1 = random(0.2, 0.4);





  this.node = new Array(4);
  this.node_wall = Array.from(Array(this.node.length), () => new Array(4));


  this.node_rotate = new Array(this.node.length);
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.25+this.ran), 0, 1, -HALF_PI*0.35, HALF_PI*0.35) * map(i, 0, this.node.length-1, 0, 1);
    this.node_rotate[i] = lz;
  }


  this.node[0] = this.begin.copy();
  this.node[1] = createVector(0, -this.H_ori, 0);
  this.node[1] = PRotateZ(this.node[1], this.node_rotate[1]);
  this.node[1].add(this.node[0]);
  for (let i=2; i<this.node.length; i++) {
    this.node[i] = createVector(0, -p5.Vector.dist(this.node[i-1], this.node[i-2])*this.H_att, 0);
    this.node[i] = PRotateZ(this.node[i], this.node_rotate[i]);
    this.node[i].add(this.node[i-1]);
  }


  for (let j=0; j<this.node_wall[0].length; j++) {
    this.node_wall[0][j] = createVector(this.W_ori/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.W_ori/2.0 * pow(-1, floor(j/2)+1));
    this.node_wall[0][j].add(this.node[0]);
  }
  for (let i=1; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      let w = max(p5.Vector.dist(this.node_wall[i-1][0], this.node_wall[i-1][1]) * this.W_att, real(10));
      this.node_wall[i][j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), 0, w/2.0 * pow(-1, floor(j/2)+1));
      this.node_wall[i][j] = PRotateZ(this.node_wall[i][j], this.node_rotate[i]);
      this.node_wall[i][j].add(this.node[i]);
    }
  }




  this.W_rate_ear = random(1.25, 2);
  this.H_rate_ear = random(0.1, 0.25);
  this.node_earL = new Array(3);
  this.node_earR = new Array(3);
  for (let i=0; i<this.node_earL.length; i++) {
    let lum = p5.Vector.add(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).mult(0.5);
    let ldm = p5.Vector.add(this.node_wall[this.node_wall.length-2][0], this.node_wall[this.node_wall.length-2][3]).mult(0.5);
    let rum = p5.Vector.add(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2]).mult(0.5);
    let rdm = p5.Vector.add(this.node_wall[this.node_wall.length-2][1], this.node_wall[this.node_wall.length-2][2]).mult(0.5);  
    this.node_earL[0] = lum.copy();
    this.node_earL[1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).mult(this.W_rate_ear).add(lum);
    this.node_earL[2] = p5.Vector.sub(ldm, lum).mult(this.H_rate_ear).add(lum);
    this.node_earR[0] = rum.copy();
    this.node_earR[1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).mult(this.W_rate_ear).add(rum);
    this.node_earR[2] = p5.Vector.sub(rdm, rum).mult(this.H_rate_ear).add(rum);
  }










  if (this.index != this.PTT_length-1  &&  !this.is_miniBlock) {
    this.node_lineL_end = createVector(0, 0, 0);
    this.node_lineR_end = createVector(0, 0, 0);

    this.node_lineL = new Array(4);
    this.node_lineR = new Array(4);
    for (let i=0; i<this.node_lineL.length; i++) {
      let rate = constrain(map(i, 0, this.node_lineL.length-1, 0, 1), 0, 1);
      this.node_lineL[i] = p5.Vector.sub(this.node_lineL_end, this.node_earL[1]).mult(rate).add(this.node_earL[1]);
      this.node_lineR[i] = p5.Vector.sub(this.node_lineR_end, this.node_earR[1]).mult(rate).add(this.node_earR[1]);
    }
  }








  this.change = function(begin, W, H) {
    this.ran = random(-999, 999);
    this.begin = begin.copy();
    this.H_target = H;
    this.W_target = W;
    this.H_ori = 0;
    this.W_ori = 0;
    this.H_att = random(0.6, 0.7);
    this.W_att = random(0.6, 0.7);
    this.var_easing1 = random(0.4, 0.6);


    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.2, HALF_PI*0.2) * map(i, 0, this.node.length-1, 0, 1);
      this.node_rotate[i] = lz;
    }


    this.W_rate_ear = random(1.25, 2);
    this.H_rate_ear = random(0.1, 0.25);
  };












  this.update = function() {
    this.begin.x += speed;
    this.H_ori = easing_x(this.H_ori, this.H_target, this.var_easing1);
    this.W_ori = easing_x(this.W_ori, this.W_target, this.var_easing1);




    this.node[0] = this.begin.copy();
    this.node[1] = createVector(0, -this.H_ori, 0);
    this.node[1] = PRotateZ(this.node[1], this.node_rotate[1]);
    this.node[1].add(this.node[0]);
    for (let i=2; i<this.node.length; i++) {
      this.node[i] = createVector(0, -p5.Vector.dist(this.node[i-1], this.node[i-2])*this.H_att, 0);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i]);
      this.node[i].add(this.node[i-1]);
    }




    for (let j=0; j<this.node_wall[0].length; j++) {
      this.node_wall[0][j] = createVector(this.W_ori/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.W_ori/2.0 * pow(-1, floor(j/2)+1));
      this.node_wall[0][j].add(this.node[0]);
    }
    for (let i=1; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        let w = max(p5.Vector.dist(this.node_wall[i-1][0], this.node_wall[i-1][1]) * this.W_att, real(10));
        this.node_wall[i][j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), 0, w/2.0 * pow(-1, floor(j/2)+1));
        this.node_wall[i][j] = PRotateZ(this.node_wall[i][j], this.node_rotate[i]);
        this.node_wall[i][j].add(this.node[i]);
      }
    }





    for (let i=0; i<this.node_earL.length; i++) {
      let lum = p5.Vector.add(this.node_wall[this.node_wall.length-1][0], this.node_wall[this.node_wall.length-1][3]).mult(0.5);
      let ldm = p5.Vector.add(this.node_wall[this.node_wall.length-2][0], this.node_wall[this.node_wall.length-2][3]).mult(0.5);
      let rum = p5.Vector.add(this.node_wall[this.node_wall.length-1][1], this.node_wall[this.node_wall.length-1][2]).mult(0.5);
      let rdm = p5.Vector.add(this.node_wall[this.node_wall.length-2][1], this.node_wall[this.node_wall.length-2][2]).mult(0.5);  
      this.node_earL[0] = lum.copy();
      this.node_earL[1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][3], this.node_wall[this.node_wall.length-1][2]).mult(this.W_rate_ear).add(lum);
      this.node_earL[2] = p5.Vector.sub(ldm, lum).mult(this.H_rate_ear).add(lum);
      this.node_earR[0] = rum.copy();
      this.node_earR[1] = p5.Vector.sub(this.node_wall[this.node_wall.length-1][2], this.node_wall[this.node_wall.length-1][3]).mult(this.W_rate_ear).add(rum);
      this.node_earR[2] = p5.Vector.sub(rdm, rum).mult(this.H_rate_ear).add(rum);
    }






    if (this.index != this.PTT_length-1  &&  !this.is_miniBlock) {
      this.node_lineL_end.x += speed;
      this.node_lineR_end.x += speed;
      for (let i=0; i<this.node_lineL.length; i++) {
        let rate = constrain(map(i, 0, this.node_lineL.length-1, 0, 1), 0, 1);
        this.node_lineL[i] = p5.Vector.sub(this.node_lineL_end, this.node_earL[1]).mult(rate).add(this.node_earL[1]);
        this.node_lineR[i] = p5.Vector.sub(this.node_lineR_end, this.node_earR[1]).mult(rate).add(this.node_earR[1]);
        this.node_lineL[i].y += sin(map(i, 0, this.node_lineL.length-1, 0, PI)) * real(20);
        this.node_lineR[i].y += sin(map(i, 0, this.node_lineL.length-1, 0, PI)) * real(20);
      }
    }
  };











  this.display = function() {
    let t, w;
    //noFill();

    if (index != 0 && index != this.PTT_length-1   ||    this.is_miniBlock) {
      //let t_c = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
      //stroke(lerpColor(c_near, c_far, t_c));

      /*strokeWeight(real(5));
       beginShape(LINES);
       for (let i=0; i<this.node_wall.length; i++) {
       if (i != 0) {
       for (let j=0; j<this.node_wall[i].length; j++) {
       vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
       vertex(this.node_wall[i][(j+1)%this.node_wall[i].length].x, this.node_wall[i][(j+1)%this.node_wall[i].length].y, this.node_wall[i][(j+1)%this.node_wall[i].length].z);
       }
       }
       if (i < this.node_wall.length-1) {
       for (let j=0; j<this.node_wall[i].length; j++) {
       let n = p5.Vector.sub(this.node_wall[1][j], this.node_wall[0][j]).mult(0.1).add(this.node_wall[0][j]);
       vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
       vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
       if (i!=0) {
       vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
       vertex(this.node_wall[i+1][(j+1)%this.node_wall[i].length].x, this.node_wall[i+1][(j+1)%this.node_wall[i].length].y, this.node_wall[i+1][(j+1)%this.node_wall[i].length].z);
       } else {
       let n = p5.Vector.sub(this.node_wall[1][j], this.node_wall[0][j]).mult(0.07).add(this.node_wall[0][j]);
       vertex(n.x, n.y, n.z);
       vertex(this.node_wall[i+1][(j+1)%this.node_wall[i].length].x, this.node_wall[i+1][(j+1)%this.node_wall[i].length].y, this.node_wall[i+1][(j+1)%this.node_wall[i].length].z);
       }
       }
       }
       }
       for (let i=0; i<this.node_earL.length-1; i++) {
       vertex(this.node_earL[i].x, this.node_earL[i].y, this.node_earL[i].z);
       vertex(this.node_earL[i+1].x, this.node_earL[i+1].y, this.node_earL[i+1].z);
       vertex(this.node_earR[i].x, this.node_earR[i].y, this.node_earR[i].z);
       vertex(this.node_earR[i+1].x, this.node_earR[i+1].y, this.node_earR[i+1].z);
       }
       endShape();
       
       
       strokeWeight(real(10));
       beginShape(LINES);
       for (let j=0; j<this.node_wall[0].length; j++) {
       let n = p5.Vector.sub(this.node_wall[1][j], this.node_wall[0][j]).mult(0.07).add(this.node_wall[0][j]);
       vertex(this.node_wall[0][j].x, this.node_wall[0][j].y, this.node_wall[0][j].z);
       vertex(n.x, n.y, n.z);
       }
       endShape();
       */




      t = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
      w = real(5);
      fill(lerpColor(c_near, c_far, t));
      for (let i=0; i<this.node_wall.length; i++) {
        if (i != 0) {
          for (let j=0; j<this.node_wall[i].length; j++) {
            TRIANGLES_getLine_weight_Y(this.node_wall[i][j], this.node_wall[i][(j+1)%this.node_wall[i].length], w);
          }
        }
        if (i < this.node_wall.length-1) {
          for (let j=0; j<this.node_wall[i].length; j++) {
            TRIANGLES_getLine_weight(this.node_wall[i][j], this.node_wall[i+1][j], w);
            if (i!=0) {
              TRIANGLES_getLine_weight(this.node_wall[i][j], this.node_wall[i+1][(j+1)%this.node_wall[i].length], w);
            } else {
              let n = p5.Vector.sub(this.node_wall[1][j], this.node_wall[0][j]).mult(0.07).add(this.node_wall[0][j]);
              TRIANGLES_getLine_weight(n, this.node_wall[i+1][(j+1)%this.node_wall[i].length], w);
            }
          }
        }
      }
      for (let i=0; i<this.node_earL.length-1; i++) {
        TRIANGLES_getLine_weight_Y(this.node_earL[i], this.node_earL[i+1], w);
        TRIANGLES_getLine_weight_Y(this.node_earR[i], this.node_earR[i+1], w);
      }

      w = real(10);
      for (let j=0; j<this.node_wall[0].length; j++) {
        let n = p5.Vector.sub(this.node_wall[1][j], this.node_wall[0][j]).mult(0.07).add(this.node_wall[0][j]);
        TRIANGLES_getLine_weight(n, this.node_wall[0][j], w);
      }
    }




    if (this.index != this.PTT_length-1  &&  !this.is_miniBlock) {
      /*strokeWeight(real(2));
       for (let i=0; i<this.node_lineL.length-1; i++) {
       let t_c = constrain(map(this.node_lineL[i].z, skyline.z, 0, 1, 0), 0, 1);
       stroke(lerpColor(c_near, c_far, t_c));
       beginShape(LINES);
       vertex(this.node_lineL[i].x, this.node_lineL[i].y, this.node_lineL[i].z);
       vertex(this.node_lineL[i+1].x, this.node_lineL[i+1].y, this.node_lineL[i+1].z);
       vertex(this.node_lineR[i].x, this.node_lineR[i].y, this.node_lineR[i].z);
       vertex(this.node_lineR[i+1].x, this.node_lineR[i+1].y, this.node_lineR[i+1].z);       
       endShape();
       
       }
       */
      w = real(2);
      for (let i=0; i<this.node_lineL.length-1; i++) {

        t = constrain(map(this.node_lineL[i].z, skyline.z, 0, 1, 0), 0, 1);
        fill(lerpColor(c_near, c_far, t));
        TRIANGLES_getLine_weight(this.node_lineL[i], this.node_lineL[i+1], w);
        TRIANGLES_getLine_weight(this.node_lineR[i], this.node_lineR[i+1], w);
      }
    }
  };












  this.displayInfo = function() {
    //noFill();
    //if (index != 0 && index != this.PTT_length-1) {
    //  stroke(c_info2);
    //  strokeWeight(real(3));
    //  beginShape(POINTS);
    //  for (let i=0; i<this.node.length; i++) {
    //    vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    //  }
    //  endShape();
    //}

    //stroke(c_info2);
    //strokeWeight(real(2));
    //beginShape(LINES);
    if (index != 0 && index != this.PTT_length-1  ||  this.is_miniBlock) {

      for (let i=0; i<this.node_wall.length; i++) {

        for (let j=0; j<this.node_wall[i].length; j++) {
          vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
          vertex(this.node_wall[i][(j+1)%this.node_wall[i].length].x, this.node_wall[i][(j+1)%this.node_wall[i].length].y, this.node_wall[i][(j+1)%this.node_wall[i].length].z);
        }

        if (i < this.node_wall.length-1) {
          for (let j=0; j<this.node_wall[i].length; j++) {
            vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
            vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
            //vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
            //vertex(this.node_wall[i+1][(j+1)%this.node_wall[i].length].x, this.node_wall[i+1][(j+1)%this.node_wall[i].length].y, this.node_wall[i+1][(j+1)%this.node_wall[i].length].z);
          }
        }
      }
      //for (let i=0; i<this.node.length-1; i++) {
      //  vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      //  vertex(this.node[i+1].x, this.node[i+1].y, this.node[i+1].z);
      //}


      for (let i=0; i<this.node_earL.length-1; i++) {
        vertex(this.node_earL[i].x, this.node_earL[i].y, this.node_earL[i].z);
        vertex(this.node_earL[i+1].x, this.node_earL[i+1].y, this.node_earL[i+1].z);
        vertex(this.node_earR[i].x, this.node_earR[i].y, this.node_earR[i].z);
        vertex(this.node_earR[i+1].x, this.node_earR[i+1].y, this.node_earR[i+1].z);
      }
    }





    if (this.index != this.PTT_length-1  &&  !this.is_miniBlock) {
      for (let i=0; i<this.node_lineL.length-1; i++) {
        vertex(this.node_lineL[i].x, this.node_lineL[i].y, this.node_lineL[i].z);
        vertex(this.node_lineL[i+1].x, this.node_lineL[i+1].y, this.node_lineL[i+1].z);
        vertex(this.node_lineR[i].x, this.node_lineR[i].y, this.node_lineR[i].z);
        vertex(this.node_lineR[i+1].x, this.node_lineR[i+1].y, this.node_lineR[i+1].z);
      }
    }


    //endShape();
  };
}