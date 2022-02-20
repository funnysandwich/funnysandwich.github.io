function Mountain(begin, W_block, H_max, H_min, count_noise, ran, var_easing1, have_river) {
  this.begin = begin.copy();
  this.end = begin.copy().add(-gap_block, 0, 0);
  this.W = W_block + gap_block;
  this.ran = ran;
  this.var_easing1 = 0.1;
  this.have_river = have_river;
  this.H_max_target = H_max;
  this.H_min_target = H_min;
  this.H_max = 0;
  this.H_min = 0;
  this.Z = skyline.z+real(200);



  this.node = new Array(10+1);
  for (let i=0; i<this.node.length; i++) {
    let x = map(i, 0, this.node.length-1, this.begin.x+this.W-gap_block, this.end.x);
    let y = skyline.y;
    this.node[i] = createVector(x, y, this.Z);
  }


  this.Y_rate = new Array(this.node.length);
  for (let i=0; i<this.node.length; i++) {
    this.Y_rate[i] = 1;
  }





  this.change = function(H_max, H_min, ran, var_easing1) {
    this.ran = ran;
    this.var_easing1 = 0.1;
    this.H_max_target = H_max;
    this.H_min_target = H_min;
    this.H_max = 0;
    this.H_min = 0;


    for (let i=0; i<this.node.length; i++) {
      let x = map(i, 0, this.node.length-1, this.begin.x+this.W-gap_block, this.end.x);
      let y = skyline.y;
      this.node[i] = createVector(x, y, this.Z);
    }

    for (let i=0; i<this.node.length; i++) {
      this.Y_rate[i] = 0;
    }
  };




  this.update = function(have_leftBlock) {
    this.begin.x += speed;

    this.H_max = easing_x(this.H_max, this.H_max_target, this.var_easing1);
    this.H_min = easing_x(this.H_min, this.H_min_target, this.var_easing1);

    if (have_leftBlock) {
      for (let i=0; i<this.node.length; i++) {
        this.Y_rate[i] = easing_x(this.Y_rate[i], 1, this.var_easing1);
        if (this.have_river) {
          //this.Y_rate[i] *= map(sin(map(i, 0, this.node.length-1, 0, PI)), 0, 1, 1, 0);
        }
      }
    } else {
      for (let i=0; i<this.node.length; i++) {
        this.Y_rate[i] = constrain(easing_x(this.Y_rate[i], map(i, 0, this.node.length-1, 1, 0), this.var_easing1), 0, 1);
        if (this.have_river) {
          //this.Y_rate[i] *= map(sin(map(i, 0, this.node.length-1, 0, PI)), 0, 1, 1, 0);
        }
      }
    }

    for (let i=0; i<this.node.length; i++) {
      let x = map(i, 0, this.node.length-1, this.begin.x+this.W-gap_block, this.end.x);
      let y = skyline.y-map(noise((count_noise + i*0.2)), 0, 1, this.H_min, this.H_max) * this.Y_rate[i];
      this.node[i] = createVector(x, y, this.Z);
    }
  };



  this.display = function() {
    noStroke();
    let t = constrain(map(this.node[0].z, skyline.z, 0, 1, 0), 0, 1);
    let c = lerpColor(lerpColor(c_near, c_far, 0.25), c_far, t);
    beginShape(TRIANGLE_STRIP);

    for (let i=0; i<this.node.length; i++) {
      fill(c);
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
      fill(c_far);
      vertex(this.node[i].x, skyline.y, this.node[i].z);
    }

    endShape();
  };




  this.displayInfo = function() {
    //stroke(255, 0, 0);
    //strokeWeight(real(2));
    //point(this.node[0]);
    noFill();
    stroke(200, 200, 0);
    strokeWeight(real(2));
    beginShape();
    vertex(this.node[0].x, skyline.y, this.node[0].z);
    for (let i=0; i<this.node.length; i++) {
      vertex(this.node[i].x, this.node[i].y, this.node[i].z);
    }
    vertex(this.node[this.node.length-1].x, skyline.y, this.node[this.node.length-1].z);
    endShape();
  };
}