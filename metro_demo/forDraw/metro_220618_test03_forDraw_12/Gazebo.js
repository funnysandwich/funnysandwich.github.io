function Gazebo(begin, W) {
  this.ran = random(-999, 999);
  this.begin = begin.copy();
  this.W = W;
  this.num_face = 6;
  if(this.W < real(85)){
    this.num_face = 5;
  }
  this.H_ori = 0;
  this.H_ori_target = real(random(50, 80));
  this.W_pole = real(random(5, 7));
  this.var_easing1 = random(0.4, 0.6);


  this.node = new Array(2);



  this.node_rotate = Array.from(Array(this.node.length), () => new Array(2));
  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.5+this.ran), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, this.node_rotate.length-1, 0, 1);
    let lx = map(noise(i*0.5+this.ran+999), 0, 1, -HALF_PI*0.15, HALF_PI*0.15) * map(i, 0, this.node_rotate.length-1, 0, 1);
    this.node_rotate[i][0] = lz;
    this.node_rotate[i][1] = 0;
  }



  this.node[0] = this.begin.copy();
  for (let i=1; i<this.node.length; i++) {
    this.node[i] = this.begin.copy();
  }




  this.node_wall = Array.from(Array(this.node.length), () => new Array(this.num_face));
  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = this.begin.copy();
    }
  }




  this.H_roof = 0;
  this.H_roof_target = this.H_ori_target * random(0.4, 1.25);

  this.node_roof = this.begin.copy();
  this.node_eaves = Array.from(Array(this.num_face), () => new Array(4));
  for (let i=0; i<this.node_eaves.length; i++) {
    for (let j=0; j<this.node_eaves[i].length; j++) {
      this.node_eaves[i][j] = this.begin.copy();
    }
  }






  this.node_pole = Array.from(Array(2), () => new Array(this.num_face));
  for (let i=0; i<this.node_pole.length; i++) {
    for (let j=0; j<this.node_pole[i].length; j++) {
      this.node_pole[i][j] = this.begin.copy();
    }
  }


  this.node_base = Array.from(Array(2), () => new Array(this.num_face));
  for (let i=0; i<this.node_base.length; i++) {
    for (let j=0; j<this.node_base[i].length; j++) {
      this.node_base[i][j] = this.begin.copy();
    }
  }








  this.update = function() {
    this.begin.x += speed;
    this.H_ori = easing_x(this.H_ori, this.H_ori_target, this.var_easing1);
    this.H_roof = easing_x(this.H_roof, this.H_roof_target, this.var_easing1);



    this.node[0] = this.begin.copy();

    for (let i=1; i<this.node.length; i++) {
      this.node[i] = createVector(0, -this.H_ori, 0);
      this.node[i] = PRotateZ(this.node[i], this.node_rotate[i][0]);
      //this.node[i] = PRotateX(this.node[i], this.node_rotate[i][1]);
      this.node[i].add(this.node[i-1]);
    }






    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        const x = cos(map(j, 0, this.node_wall[i].length, 0, TWO_PI)) * this.W/2.0;
        const z = sin(map(j, 0, this.node_wall[i].length, 0, TWO_PI)) * this.W/2.0;
        this.node_wall[i][j] = createVector(x, 0, z);
        this.node_wall[i][j] = PRotateX(this.node_wall[i][j], this.node_rotate[i][1]);
        this.node_wall[i][j].add(this.node[i]);
      }
    }





    let n_roof = createVector(0, -this.H_roof, 0);
    n_roof = PRotateX(n_roof, this.node_rotate[this.node_rotate.length-1][1]);
    n_roof.add(this.node[this.node.length-1]);
    this.node_roof = easing_p(this.node_roof, n_roof, 0.65);



    for (let i=0; i<this.node_eaves.length; i++) {
      for (let j=0; j<this.node_eaves[i].length; j++) {
        this.node_eaves[i][j] = p5.Vector.sub(this.node_wall[this.node.length-1][i], this.node_roof).mult(map(j, 0, this.node_eaves[i].length-1, 0, 1)).add(this.node_roof);
        this.node_eaves[i][j].y += map(sin(map(j, 0, this.node_eaves[i].length, 0, PI)), 0, 1, 0, this.H_roof*0.25);
      }
    }






    for (let i=0; i<this.node_pole.length; i++) {
      for (let j=0; j<this.node_pole[i].length; j++) {
        this.node_pole[i][j] = p5.Vector.sub(this.node_eaves[j][this.node_eaves[0].length-1], this.node[1]).mult(0.75).add(this.node[i]);
      }
    }



    for (let i=0; i<this.node_base.length; i++) {
      for (let j=0; j<this.node_base[i].length; j++) {
        this.node_base[i][j] = p5.Vector.sub(this.node_pole[1][j], this.node_pole[0][j]).mult(map(i, 0, this.node_base.length-1, 0, 0.25)).add(this.node_pole[0][j]);
      }
    }
  };














  this.display = function() {
    let t, c1, c2;


    for (let i=0; i<this.node_pole.length; i++) {
      for (let j=0; j<this.node_pole[i].length; j++) {
        if (i < this.node_pole.length-1) {
          t = constrain(map(this.node_pole[i][j].z, skyline.z, 0, 1, 0), 0, 1);
          fill(lerpColor(c_near, c_far, t));
          TRIANGLES_getLine_weight(this.node_pole[i][j], this.node_pole[i+1][j], this.W_pole);
        }
      }
    }




    for (let i=0; i<this.node_eaves.length; i++) {
      for (let j=0; j<this.node_eaves[i].length-1; j++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_eaves[i][j].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_eaves[(i+1)%this.node_eaves.length][j].z, skyline.z, 0, 1, 0), 0, 1));
        const c3 = lerpColor(c_near, c_far, constrain(map(this.node_eaves[(i+1)%this.node_eaves.length][j+1].z, skyline.z, 0, 1, 0), 0, 1));
        const c4 = lerpColor(c_near, c_far, constrain(map(this.node_eaves[i][j+1].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_eaves[i][j], this.node_eaves[(i+1)%this.node_eaves.length][j], this.node_eaves[(i+1)%this.node_eaves.length][j+1], this.node_eaves[i][j+1], c1, c2, c3, c4);
      }
    }



    for (let i=0; i<this.node_base.length-1; i++) {
      for (let j=0; j<this.node_base[i].length; j++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_base[i][j].z, skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_base[i][(j+1)%this.node_base[i].length].z, skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_base[i][j], this.node_base[i][(j+1)%this.node_base[i].length], this.node_base[i+1][(j+1)%this.node_base[i].length], this.node_base[i+1][j], c1, c2, c2, c1);
      }
    }
  };












  this.displayInfo = function() {
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        LINES_getLine(this.node_wall[i][j], this.node_wall[i][(j+1)%this.node_wall[i].length]);
        if (i < this.node_wall.length-1) {
          LINES_getLine(this.node_pole[i][j], this.node_pole[i+1][j]);
        }
      }
    }


    for (let i=0; i<this.node_eaves.length; i++) {
      for (let j=0; j<this.node_eaves[i].length-1; j++) {
        LINES_getLine(this.node_eaves[i][j], this.node_eaves[i][j+1]);
      }
    }
  };
}