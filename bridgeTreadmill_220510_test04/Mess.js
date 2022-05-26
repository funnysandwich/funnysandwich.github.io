function Mess(H_limit) {

  this.gap = 10;
  this.H = 34;
  if (random(1) < 0.25) {
    this.H *= floor(random(1, 9));
  }
  if (H_limit != 0) {
    this.H = H_limit - this.gap;
  }

  this.W = round(random(33, 210));
  if (this.H > 34) {
    this.W = 210;
  }


  this.H_all = this.H + this.gap;

  this.is_I = random(1) < 0.5;

  this.W_fillet = 15;
  if (state_fillet == 1) {
    this.W_fillet = 3.5;
  } else if (state_fillet == 2) {
    this.W_fillet = 12;
  } else if (state_fillet == 3) {
    this.W_fillet = 15;
  }
  this.num_detail_single_arc = 4;



  this.node = new Array(this.num_detail_single_arc * 4);
  for (let i=0; i<this.node.length; i++) {
    let x, y;
    if (i < floor(this.node.length/4)) {
      x = cos(map(i, 0, floor(this.node.length/4)-1, PI, PI+HALF_PI)) * this.W_fillet;
      y = sin(map(i, 0, floor(this.node.length/4)-1, PI, PI+HALF_PI)) * this.W_fillet;
      x += -(this.W/2.0 - this.W_fillet);
      y += -(this.H/2.0 - this.W_fillet);
    } else if (i < floor(this.node.length/4*2)) {
      x = cos(map(i, floor(this.node.length/4), floor(this.node.length/4)*2-1, PI+HALF_PI, TWO_PI)) * this.W_fillet;
      y = sin(map(i, floor(this.node.length/4), floor(this.node.length/4)*2-1, PI+HALF_PI, TWO_PI)) * this.W_fillet;
      x += (this.W/2.0 - this.W_fillet);
      y += -(this.H/2.0 - this.W_fillet);
    } else if (i < floor(this.node.length/4*3)) {
      x = cos(map(i, floor(this.node.length/4)*2, floor(this.node.length/4)*3-1, 0, HALF_PI)) * this.W_fillet;
      y = sin(map(i, floor(this.node.length/4)*2, floor(this.node.length/4)*3-1, 0, HALF_PI)) * this.W_fillet;
      x += (this.W/2.0 - this.W_fillet);
      y += (this.H/2.0 - this.W_fillet);
    } else {
      x = cos(map(i, floor(this.node.length/4)*3, this.node.length, HALF_PI, PI)) * this.W_fillet;
      y = sin(map(i, floor(this.node.length/4)*3, this.node.length, HALF_PI, PI)) * this.W_fillet;
      x += -(this.W/2.0 - this.W_fillet);
      y += (this.H/2.0 - this.W_fillet);
    }

    if (this.is_I) {
      x += (M.width - this.W/2.0 - 8);
    } else {
      x += this.W/2.0 + 8;
    }
    y += this.H_all/2.0;

    this.node[i] = createVector(x, y);
  }



  if (state_fillet == 0) {
    this.node_tick = new Array(7);
    this.node_tick[0] = createVector(0, 0);
    this.node_tick[1] = createVector(6.264, 0.376);
    this.node_tick[2] = createVector(11.187, -0.91);
    this.node_tick[3] = createVector(15.122, -3.916);
    this.node_tick[4] = createVector(14.046, 1.238);
    this.node_tick[5] = createVector(11.545, 4.838);
    this.node_tick[6] = createVector(-2.103, 9.242);

    for (let i=0; i<this.node_tick.length; i++) {
      if (this.is_I) {
        this.node_tick[i].add(M.width - 17.329, this.gap/2.0+3.916);
      } else {
        this.node_tick[i].x *= -1;
        this.node_tick[i].add(17.329, this.gap/2.0+3.916);
      }
    }
  } else if (state_fillet == 1) {
    this.node_tick = new Array(3);
    this.node_tick[0] = createVector(0, 0);
    this.node_tick[1] = createVector(-4.439, -4.083);
    this.node_tick[2] = createVector(-4.439, 4.083);

    for (let i=0; i<this.node_tick.length; i++) {
      if (this.is_I) {
        this.node_tick[i].add(M.width - 3.6, this.gap/2.0+16.734);
      } else {
        this.node_tick[i].x *= -1;
        this.node_tick[i].add(3.6, this.gap/2.0+16.734);
      }
    }
  } else if (state_fillet == 2) {
    this.node_tick = new Array(3);
    this.node_tick[0] = createVector(0, 0);
    this.node_tick[1] = createVector(-17, 0);
    this.node_tick[2] = createVector(0, -17);

    for (let i=0; i<this.node_tick.length; i++) {
      if (this.is_I) {
        this.node_tick[i].add(M.width - 8, this.gap/2.0+this.H);
      } else {
        this.node_tick[i].x *= -1;
        this.node_tick[i].add(8, this.gap/2.0+this.H);
      }
    }
  } else if (state_fillet == 3) {
    this.node_tick = new Array(7);
    this.node_tick[0] = createVector(-0.3, 0);
    this.node_tick[1] = createVector(-0.376, 6.264);
    this.node_tick[2] = createVector(0.91, 11.187);
    this.node_tick[3] = createVector(3.916, 15.122);
    this.node_tick[4] = createVector(-1.238, 14.046);
    this.node_tick[5] = createVector(-4.838, 11.545);
    this.node_tick[6] = createVector(-9.242, 2.103);

    for (let i=0; i<this.node_tick.length; i++) {
      if (this.is_I) {
        this.node_tick[i].add(M.width - 8, this.gap/2.0+this.H-15.122);
      } else {
        this.node_tick[i].x *= -1;
        this.node_tick[i].add(8, this.gap/2.0+this.H-15.122);
      }
    }
  }












  this.display = function(y, MESS) {
    MESS.noStroke();
    if (this.is_I) {
      MESS.fill(c_bkg[state_color][1]);
    } else {
      MESS.fill(c_bkg[state_color][2]);
      if (state_color == 7) {
        MESS.fill(255); 
        MESS.stroke(c_bkg[state_color][2]);
        MESS.strokeWeight(3);
      }
    }
    //MESS.beginShape(TRIANGLES);
    //for (let i=1; i<this.node.length-1; i++) {
    //  MESS.vertex(this.node[0].x, this.node[0].y + y);
    //  MESS.vertex(this.node[i].x, this.node[i].y + y);
    //  MESS.vertex(this.node[i+1].x, this.node[i+1].y + y);
    //}
    //MESS.endShape();
    MESS.beginShape();
    for (let i=0; i<this.node.length; i++) {
      MESS.vertex(this.node[i].x, this.node[i].y + y);
    }
    MESS.endShape(CLOSE);

    MESS.beginShape();
    for (let i=0; i<this.node_tick.length; i++) {
      MESS.vertex(this.node_tick[i].x, this.node_tick[i].y + y);
    }
    MESS.endShape(CLOSE);



    if (state_color == 7) {
      if (!this.is_I) {
        MESS.noStroke();
        MESS.fill(255);
        MESS.beginShape();
        for (let i=0; i<this.node.length; i++) {
          MESS.vertex(this.node[i].x, this.node[i].y + y);
        }
        MESS.endShape(CLOSE);
        MESS.beginShape();
        for (let i=0; i<this.node_tick.length; i++) {
          MESS.vertex(this.node_tick[i].x, this.node_tick[i].y + y);
        }
        MESS.endShape(CLOSE);
      }
    }
  };




  this.displayInfo = function(y, MESS) {
    MESS.noFill();
    MESS.stroke(colorWithAlpha(c_info, 100));
    MESS.strokeWeight(1);
    MESS.beginShape(LINES);
    for (let i=0; i<this.node.length; i++) {
      MESS.vertex(this.node[i].x, this.node[i].y + y);
      MESS.vertex(this.node[(i+1)%this.node.length].x, this.node[(i+1)%this.node.length].y + y);
    }

    for (let i=0; i<this.node_tick.length; i++) {
      MESS.vertex(this.node_tick[i].x, this.node_tick[i].y + y);
      MESS.vertex(this.node_tick[(i+1)%this.node_tick.length].x, this.node_tick[(i+1)%this.node_tick.length].y + y);
    }

    MESS.endShape();
  };
}