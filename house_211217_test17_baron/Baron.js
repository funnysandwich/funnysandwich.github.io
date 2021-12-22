function Baron() {
  this.ran = random(-999, 999);
  this.begin = createVector(0, -real(1), 0);
  let s_H_leg = real(random(50, 60));
  this.H_body = s_H_leg * random(0.7, 0.8);
  this.H_head = this.H_body * random(0.75, 0.9);
  this.W_body = this.H_body * random(1.0, 1.25);
  this.H_shoe = s_H_leg * random(0.35, 0.5);
  this.H_leg = s_H_leg - this.H_shoe;
  this.open_fast = false;
  this.ready_open_shot = true;
  this.open_shot = false;
  this.shot_begin = createVector(0, 0, 0);
  this.shot_end = createVector(0, 0, 0);
  this.time_shot = 0;
  this.open_time_shot = false;



  this.node_body = new Array(3);
  for (let i=0; i<this.node_body.length; i++) {
    this.node_body[i] = this.begin.copy();
  }

  this.node_head = new Array(5);
  for (let i=0; i<this.node_head.length; i++) {
    this.node_head[i] = this.begin.copy();
  }


  this.node_body_E = Array.from(Array(this.node_body.length), () => new Array(8));
  for (let i=0; i<this.node_body_E.length; i++) {
    for (let j=0; j<this.node_body_E[i].length; j++) {
      this.node_body_E[i][j] = this.begin.copy();
    }
  }

  this.node_head_E = Array.from(Array(this.node_head.length), () => new Array(8));
  for (let i=0; i<this.node_head_E.length; i++) {
    for (let j=0; j<this.node_head_E[i].length; j++) {
      this.node_head_E[i][j] = this.begin.copy();
    }
  }



  this.node_Lleg = new Array(4);
  this.node_Rleg = new Array(4);
  for (let i=0; i<this.node_Lleg.length; i++) {
    this.node_Lleg[i] = this.begin.copy();
    this.node_Rleg[i] = this.begin.copy();
  }


  this.node_Lleg_E = Array.from(Array(this.node_Lleg.length), () => new Array(6));
  this.node_Rleg_E = Array.from(Array(this.node_Rleg.length), () => new Array(6));
  for (let i=0; i<this.node_Lleg_E.length; i++) {
    for (let j=0; j<this.node_Lleg_E[i].length; j++) {
      this.node_Lleg_E[i][j] = this.begin.copy();
      this.node_Rleg_E[i][j] = this.begin.copy();
    }
  }



  //let W_shoe_max = p5.Vector.dist(this.node_Rleg_E[this.node_Lleg_E.length-1][0], this.node_Rleg_E[this.node_Lleg_E.length-1][floor(this.node_Lleg_E[0].length/2)]);
  //W_shoe_max *= 1.25;
  //let W_shoe_min = W_shoe_max * 0.8;


  this.node_Lshoe = new Array(2);
  this.node_Rshoe = new Array(2);
  for (let i=0; i<this.node_Lshoe.length; i++) {
    this.node_Lshoe[i] = this.begin.copy();
    this.node_Rshoe[i] = this.begin.copy();
  }


  this.node_Lshoe_E = Array.from(Array(this.node_Lshoe.length), () => new Array(6));
  this.node_Rshoe_E = Array.from(Array(this.node_Rshoe.length), () => new Array(6));
  for (let i=0; i<this.node_Lshoe_E.length; i++) {
    for (let j=0; j<this.node_Lshoe_E[i].length; j++) {
      this.node_Lshoe_E[i][j] = this.begin.copy();
      this.node_Rshoe_E[i][j] = this.begin.copy();
    }
  }


  //let H_shoe_D = this.H_shoe * 0.333;
  this.node_Lshoe_D = Array.from(Array(2), () => new Array(6));
  this.node_Rshoe_D = Array.from(Array(2), () => new Array(6));
  for (let i=0; i<this.node_Lshoe_D.length; i++) {
    for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
      this.node_Lshoe_D[i][j] = this.begin.copy();
      this.node_Rshoe_D[i][j] = this.begin.copy();
    }
  }




  this.L_arm = this.H_body * 0.6;
  this.W_arm_max = this.H_body * 0.5;
  this.W_arm_min = this.H_body * 0.25;
  this.angleX_arm = 0;


  this.node_Larm = new Array(4);
  this.node_Rarm = new Array(4);
  this.node_Larm_E = Array.from(Array(this.node_Larm.length), () => new Array(6));
  this.node_Rarm_E = Array.from(Array(this.node_Rarm.length), () => new Array(6));
  for (let i=0; i<this.node_Larm.length; i++) {
    this.node_Larm[i] = this.begin.copy();
    this.node_Rarm[i] = this.begin.copy();
  }
  for (let i=0; i<this.node_Larm_E.length; i++) {
    for (let j=0; j<this.node_Larm_E[i].length; j++) {
      this.node_Larm_E[i][j] = this.begin.copy();
      this.node_Rarm_E[i][j] = this.begin.copy();
    }
  }



  this.L_hand = this.H_body * 0.45;

  this.node_Lhand = new Array(3);
  this.node_Rhand = new Array(3);
  this.node_Lhand_E = Array.from(Array(this.node_Lhand.length), () => new Array(6));
  this.node_Rhand_E = Array.from(Array(this.node_Rhand.length), () => new Array(6));
  for (let i=0; i<this.node_Lhand.length; i++) {
    this.node_Lhand[i] = this.begin.copy();
    this.node_Rhand[i] = this.begin.copy();
  }
  for (let i=0; i<this.node_Lhand_E.length; i++) {
    for (let j=0; j<this.node_Lhand_E[i].length; j++) {
      this.node_Lhand_E[i][j] = this.begin.copy();
      this.node_Rhand_E[i][j] = this.begin.copy();
    }
  }









  this.W_gun = real(7);
  this.L_gun = real(25);


  this.node_gun = new Array(5);
  for (let i=0; i<this.node_gun.length; i++) {
    this.node_gun[i] = this.begin.copy();
  }


  this.node_gun_E = Array.from(Array(this.node_gun.length), () => new Array(4));
  for (let i=0; i<this.node_gun_E.length; i++) {
    for (let j=0; j<this.node_gun_E[i].length; j++) {
      this.node_gun_E[i][j] = this.begin.copy();
    }
  }




  this.node_Dgun = new Array(2);
  this.node_Dgun[0] = createVector(-this.L_gun * 0.3, this.W_gun*0.25, this.W_gun*0.5);
  this.node_Dgun[1] = createVector(-this.L_gun * 0.1, this.W_gun*0.25, -this.W_gun*1.0);
  for (let i=0; i<this.node_Dgun.length; i++) {
    this.node_Dgun[i] = this.begin.copy();
  }


  this.node_Dgun_E = Array.from(Array(this.node_Dgun.length), () => new Array(4));
  for (let i=0; i<this.node_Dgun_E.length; i++) {
    for (let j=0; j<this.node_Dgun_E[i].length; j++) {
      this.node_Dgun_E[i][j] = this.begin.copy();
    }
  }





  this.node_Lear = new Array(4);
  this.node_Rear = new Array(4);
  this.node_Lear_E = new Array(4);
  this.node_Rear_E = new Array(4);

  for (let i=0; i<this.node_Lear.length; i++) {
    this.node_Lear[i] = this.begin.copy();
    this.node_Rear[i] = this.begin.copy();
    this.node_Lear_E[i] = this.begin.copy();
    this.node_Rear_E[i] = this.begin.copy();
  }















  this.change = function() {
    this.ran = random(-999, 999);
    this.begin = createVector(0, -real(1), 0);
    let s_H_leg = real(random(50, 60));
    this.H_body = s_H_leg * random(0.7, 0.8);
    this.H_head = this.H_body * random(0.75, 0.9);
    this.W_body = this.H_body * random(1.0, 1.25);
    this.H_shoe = s_H_leg * random(0.35, 0.5);
    this.H_leg = s_H_leg - this.H_shoe;
    this.open_fast = false;
    this.ready_open_shot = true;
    this.open_shot = false;
    this.shot_begin = createVector(0, 0, 0);
    this.shot_end = createVector(0, 0, 0);
    this.time_shot = 0;
    this.open_time_shot = false;


    for (let i=0; i<this.node_body.length; i++) {
      this.node_body[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_head.length; i++) {
      this.node_head[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_body_E.length; i++) {
      for (let j=0; j<this.node_body_E[i].length; j++) {
        this.node_body_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_head_E.length; i++) {
      for (let j=0; j<this.node_head_E[i].length; j++) {
        this.node_head_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_Lleg.length; i++) {
      this.node_Lleg[i] = this.begin.copy();
      this.node_Rleg[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_Lleg_E.length; i++) {
      for (let j=0; j<this.node_Lleg_E[i].length; j++) {
        this.node_Lleg_E[i][j] = this.begin.copy();
        this.node_Rleg_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_Lshoe.length; i++) {
      this.node_Lshoe[i] = this.begin.copy();
      this.node_Rshoe[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_Lshoe_E.length; i++) {
      for (let j=0; j<this.node_Lshoe_E[i].length; j++) {
        this.node_Lshoe_E[i][j] = this.begin.copy();
        this.node_Rshoe_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_Lshoe_D.length; i++) {
      for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
        this.node_Lshoe_D[i][j] = this.begin.copy();
        this.node_Rshoe_D[i][j] = this.begin.copy();
      }
    }

    this.L_arm = this.H_body * 0.6;
    this.W_arm_max = this.H_body * 0.5;
    this.W_arm_min = this.H_body * 0.25;
    this.angleX_arm = 0;
    for (let i=0; i<this.node_Larm.length; i++) {
      this.node_Larm[i] = this.begin.copy();
      this.node_Rarm[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_Larm_E.length; i++) {
      for (let j=0; j<this.node_Larm_E[i].length; j++) {
        this.node_Larm_E[i][j] = this.begin.copy();
        this.node_Rarm_E[i][j] = this.begin.copy();
      }
    }

    this.L_hand = this.H_body * 0.45;
    for (let i=0; i<this.node_Lhand.length; i++) {
      this.node_Lhand[i] = this.begin.copy();
      this.node_Rhand[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_Lhand_E.length; i++) {
      for (let j=0; j<this.node_Lhand_E[i].length; j++) {
        this.node_Lhand_E[i][j] = this.begin.copy();
        this.node_Rhand_E[i][j] = this.begin.copy();
      }
    }

    this.W_gun = real(7);
    this.L_gun = real(25);
    for (let i=0; i<this.node_gun.length; i++) {
      this.node_gun[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_gun_E.length; i++) {
      for (let j=0; j<this.node_gun_E[i].length; j++) {
        this.node_gun_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_Dgun.length; i++) {
      this.node_Dgun[i] = this.begin.copy();
    }
    for (let i=0; i<this.node_Dgun_E.length; i++) {
      for (let j=0; j<this.node_Dgun_E[i].length; j++) {
        this.node_Dgun_E[i][j] = this.begin.copy();
      }
    }
    for (let i=0; i<this.node_Lear.length; i++) {
      this.node_Lear[i] = this.begin.copy();
      this.node_Rear[i] = this.begin.copy();
      this.node_Lear_E[i] = this.begin.copy();
      this.node_Rear_E[i] = this.begin.copy();
    }
  };















  this.update = function() {
    this.node_body[0] = easing_p(this.node_body[0], this.begin.copy().add(0, this.begin.y-this.H_shoe-this.H_leg, 0));
    this.node_body[2] = easing_p(this.node_body[2], this.begin.copy().add(0, this.begin.y-this.H_shoe-this.H_leg-this.H_body, 0));
    this.node_body[1] = easing_p(this.node_body[1], p5.Vector.sub(this.node_body[2], this.node_body[0]).mult(0.35).add(this.node_body[0]));



    for (let i=0; i<this.node_head.length; i++) {
      let y = cos(map(i, 0, this.node_head.length, HALF_PI, -0.1)) * -this.H_head;
      this.node_head[i] = easing_p(this.node_head[i], this.node_body[this.node_body.length-1].copy().add(0, y, 0));
    }



    for (let i=0; i<this.node_body_E.length; i++) {
      let w_z = map(i, 0, this.node_body_E.length-1, this.W_body*0.65, this.W_body*0.75);
      let w_x = this.W_body;
      if (i==1) {
        w_z = this.W_body*0.62;
        w_x = this.W_body*0.95;
      }
      for (let j=0; j<this.node_body_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_body_E[i].length, 0, TWO_PI)) * (w_x/2.0);
        let z = sin(map(j, 0, this.node_body_E[i].length, 0, TWO_PI)) * (w_z/2.0);
        this.node_body_E[i][j] = easing_p3(this.node_body_E[i][j], this.node_body[i].copy().add(x, 0, z));
      }
    }



    for (let i=0; i<this.node_head_E.length; i++) {
      let w = sin(map(i, 0, this.node_head_E.length, HALF_PI, -0.1)) * this.W_body;
      //let y = cos(map(i, 0, this.node_head_E.length, HALF_PI, 0)) * -this.H_head;
      for (let j=0; j<this.node_head_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_head_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_head_E[i].length, 0, TWO_PI)) * (w/2.0)*0.75;
        this.node_head_E[i][j] = easing_p3(this.node_head_E[i][j], this.node_head[i].copy().add(x, 0, z));
      }
    }



    for (let i=0; i<this.node_Lleg.length; i++) {
      let l = map(i, 0, this.node_Lleg.length-1, 0, this.H_leg);
      this.node_Lleg[i] = easing_p(this.node_Lleg[i], this.node_body[0].copy().add(-this.W_body/4.0, l, 0));
      this.node_Rleg[i] = easing_p(this.node_Rleg[i], this.node_body[0].copy().add(this.W_body/4.0, l, 0));
    }



    for (let i=0; i<this.node_Lleg_E.length; i++) {
      let w = map(sin(map(i, 0, this.node_Lleg_E.length-1, HALF_PI*0.75, PI)), 1, 0, this.W_body*0.5, this.W_body*0.25);
      for (let j=0; j<this.node_Lleg_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_Lleg_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Lleg_E[i].length, 0, TWO_PI)) * (w/2.0);
        this.node_Lleg_E[i][j] = easing_p3(this.node_Lleg_E[i][j], this.node_Lleg[i].copy().add(x, 0, z));
        this.node_Rleg_E[i][j] = easing_p3(this.node_Rleg_E[i][j], this.node_Rleg[i].copy().add(x, 0, z));
      }
    }



    let W_shoe_max = p5.Vector.dist(this.node_Rleg_E[this.node_Lleg_E.length-1][0], this.node_Rleg_E[this.node_Lleg_E.length-1][floor(this.node_Lleg_E[0].length/2)]);
    W_shoe_max *= 1.25;
    let W_shoe_min = W_shoe_max * 0.9;



    for (let i=0; i<this.node_Lshoe.length; i++) {
      let l = map(i, 0, this.node_Lshoe.length-1, real(0.5), this.H_shoe);
      this.node_Lshoe[i] = easing_p(this.node_Lshoe[i], p5.Vector.sub(this.node_Lleg[this.node_Lleg.length-1], this.node_Lleg[0]).setMag(l).add(this.node_Lleg[this.node_Lleg.length-1]));
      this.node_Rshoe[i] = easing_p(this.node_Rshoe[i], p5.Vector.sub(this.node_Rleg[this.node_Rleg.length-1], this.node_Rleg[0]).setMag(l).add(this.node_Rleg[this.node_Rleg.length-1]));
    }



    for (let i=0; i<this.node_Lshoe_E.length; i++) {
      let w = map(i, 0, this.node_Lshoe_E.length-1, W_shoe_max, W_shoe_min);
      for (let j=0; j<this.node_Lshoe_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_Lshoe_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Lshoe_E[i].length, 0, TWO_PI)) * (w/2.0);
        let nl = createVector(x, 0, z);
        let nr = createVector(x, 0, z);
        nl = PRotateY(nl, HALF_PI*0.15);
        nr = PRotateY(nr, -HALF_PI*0.15);
        this.node_Lshoe_E[i][j] = easing_p3(this.node_Lshoe_E[i][j], this.node_Lshoe[i].copy().add(nl));
        this.node_Rshoe_E[i][j] = easing_p3(this.node_Rshoe_E[i][j], this.node_Rshoe[i].copy().add(nr));
      }
    }



    let H_shoe_D = this.H_shoe * 0.333;

    for (let i=0; i<this.node_Lshoe_D.length; i++) {
      for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
        let l = -H_shoe_D * i * map(sin(map(j, 0, this.node_Lshoe_D[i].length-1, 0, PI)), 0, 1, 1.25, 0.5);
        let x = cos(map(j, 0, this.node_Lshoe_D[i].length-1, 0, PI)) * (W_shoe_min/2.0);
        let z = sin(map(j, 0, this.node_Lshoe_D[i].length-1, 0, PI)) * (W_shoe_min/2.0 * 2.8);
        let nl = createVector(x, l, z);
        let nr = createVector(x, l, z);
        nl = PRotateY(nl, HALF_PI*0.15);
        nr = PRotateY(nr, -HALF_PI*0.15);
        this.node_Lshoe_D[i][j] = easing_p3(this.node_Lshoe_D[i][j], this.node_Lshoe[this.node_Lshoe.length-1].copy().add(nl));
        this.node_Rshoe_D[i][j] = easing_p3(this.node_Rshoe_D[i][j], this.node_Rshoe[this.node_Lshoe.length-1].copy().add(nr));
      }
    }






    if (this.ready_open_shot) {
      this.angleX_arm = easing_x4(this.angleX_arm, map(mouseY, 0, height, -PI+HALF_PI*map(abs(width/2-mouseX), width/2, 0, 0.5, 0.0), -HALF_PI*map(abs(width/2-mouseX), width/2, 0, 0.5, 0.0)));
    } else {
      this.angleX_arm = easing_x(this.angleX_arm, 0);
    }



    let s_node_Larm = new Array(this.node_Larm.length);
    let s_node_Larm_E = Array.from(Array(this.node_Larm_E.length), () => new Array(this.node_Larm_E[0].length));
    for (let i=0; i<this.node_Larm.length; i++) {
      let l = -this.L_arm / (this.node_Larm.length-1);
      if (i==0) {
        l = 0;
      }
      let angle = map(i, 0, this.node_Larm.length-1, 0, -HALF_PI*0.9);
      s_node_Larm[i] = createVector(l, 0, 0);
      let w = map(i, 0, this.node_Larm.length-1, this.W_arm_max, this.W_arm_min);
      for (let j=0; j<this.node_Larm_E[i].length; j++) {
        let y = cos(map(j, 0, this.node_Larm_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Larm_E[i].length, 0, TWO_PI)) * (w/2.0);
        s_node_Larm_E[i][j] = createVector(0, y, z);
      }

      s_node_Larm[i] = PRotateZ(s_node_Larm[i], angle);
      s_node_Larm[i] = PRotateX(s_node_Larm[i], this.angleX_arm);
      if (i==0) {
        s_node_Larm[i].add(this.node_head_E[0][floor(this.node_head_E[0].length/2)]).add(0, this.W_arm_max/2.0, 0);
      } else {
        s_node_Larm[i].add(s_node_Larm[i-1]);
      }
      for (let j=0; j<this.node_Larm_E[i].length; j++) {
        s_node_Larm_E[i][j] = PRotateZ(s_node_Larm_E[i][j], angle);
        s_node_Larm_E[i][j] = PRotateX(s_node_Larm_E[i][j], this.angleX_arm);
        s_node_Larm_E[i][j].add(s_node_Larm[i]);
      }
    }
    for (let i=0; i<this.node_Larm.length; i++) {
      this.node_Larm[i] = easing_p6(this.node_Larm[i], s_node_Larm[i]);
      for (let j=0; j<this.node_Larm_E[i].length; j++) {
        this.node_Larm_E[i][j] = easing_p6(this.node_Larm_E[i][j], s_node_Larm_E[i][j]);
      }
    }


    let s_node_Rarm = new Array(this.node_Rarm.length);
    let s_node_Rarm_E = Array.from(Array(this.node_Rarm_E.length), () => new Array(this.node_Rarm_E[0].length));
    for (let i=0; i<this.node_Rarm.length; i++) {
      let l = this.L_arm / (this.node_Larm.length-1);
      if (i==0) {
        l = 0;
      }    
      let angle = map(i, 0, this.node_Rarm.length-1, 0, HALF_PI*0.9);
      s_node_Rarm[i] = createVector(l, 0, 0);
      let w = map(i, 0, this.node_Rarm.length-1, this.W_arm_max, this.W_arm_min);
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        let y = cos(map(j, 0, this.node_Rarm_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Rarm_E[i].length, 0, TWO_PI)) * (w/2.0);
        s_node_Rarm_E[i][j] = createVector(0, y, z);
      }

      s_node_Rarm[i] = PRotateZ(s_node_Rarm[i], angle);
      if (i==0) {
        s_node_Rarm[i].add(this.node_head_E[0][0]).add(0, this.W_arm_max/2.0, 0);
      } else {
        s_node_Rarm[i].add(s_node_Rarm[i-1]);
      }
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        s_node_Rarm_E[i][j] = PRotateZ(s_node_Rarm_E[i][j], angle);
        s_node_Rarm_E[i][j].add(s_node_Rarm[i]);
      }
    }
    for (let i=0; i<this.node_Rarm.length; i++) {
      this.node_Rarm[i] = easing_p6(this.node_Rarm[i], s_node_Rarm[i]);
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        this.node_Rarm_E[i][j] = easing_p6(this.node_Rarm_E[i][j], s_node_Rarm_E[i][j]);
      }
    }



    for (let i=0; i<this.node_Lhand.length; i++) {
      let l = -this.L_hand / (this.node_Lhand.length-1);
      if (i==0) {
        l = 0;
      }
      let angle = map(i, 0, this.node_Lhand.length-1, -HALF_PI*0.9, -HALF_PI*1.1);
      this.node_Lhand[i] = createVector(l, 0, 0);
      let w = map(i, 0, this.node_Lhand.length-1, this.W_arm_min*1.3, this.W_arm_min*0.9);
      for (let j=0; j<this.node_Lhand_E[i].length; j++) {
        let y = cos(map(j, 0, this.node_Lhand_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Lhand_E[i].length, 0, TWO_PI)) * (w/2.0);
        this.node_Lhand_E[i][j] = createVector(0, y, z);
      }

      this.node_Lhand[i] = PRotateZ(this.node_Lhand[i], angle);
      this.node_Lhand[i] = PRotateX(this.node_Lhand[i], this.angleX_arm);
      if (i==0) {
        this.node_Lhand[i].add(this.node_Larm[this.node_Larm.length-1]);
      } else {
        this.node_Lhand[i].add(this.node_Lhand[i-1]);
      }
      for (let j=0; j<this.node_Lhand_E[i].length; j++) {
        this.node_Lhand_E[i][j] = PRotateZ(this.node_Lhand_E[i][j], angle);
        this.node_Lhand_E[i][j] = PRotateX(this.node_Lhand_E[i][j], this.angleX_arm);
        this.node_Lhand_E[i][j].add(this.node_Lhand[i]);
      }
    }


    let s_node_Rhand = new Array(this.node_Rhand.length);
    let s_node_Rhand_E = Array.from(Array(this.node_Rhand_E.length), () => new Array(this.node_Rhand_E[0].length));
    for (let i=0; i<this.node_Rhand.length; i++) {
      let l = this.L_hand / (this.node_Rhand.length-1);
      if (i==0) {
        l = 0;
      }
      let angle = map(i, 0, this.node_Rhand.length-1, HALF_PI*0.9, HALF_PI*1.1);
      s_node_Rhand[i] = createVector(l, 0, 0);
      let w = map(i, 0, this.node_Rhand.length-1, this.W_arm_min*1.3, this.W_arm_min*0.9);
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        let y = cos(map(j, 0, this.node_Rhand_E[i].length, 0, TWO_PI)) * (w/2.0);
        let z = sin(map(j, 0, this.node_Rhand_E[i].length, 0, TWO_PI)) * (w/2.0);
        s_node_Rhand_E[i][j] = createVector(0, y, z);
      }

      s_node_Rhand[i] = PRotateZ(s_node_Rhand[i], angle);
      if (i==0) {
        s_node_Rhand[i].add(s_node_Rarm[s_node_Rarm.length-1]);
      } else {
        s_node_Rhand[i].add(s_node_Rhand[i-1]);
      }
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        s_node_Rhand_E[i][j] = PRotateZ(s_node_Rhand_E[i][j], angle);
        s_node_Rhand_E[i][j].add(s_node_Rhand[i]);
      }
    }
    for (let i=0; i<this.node_Rhand.length; i++) {
      this.node_Rhand[i] = easing_p6(this.node_Rhand[i], s_node_Rhand[i]);
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        this.node_Rhand_E[i][j] = easing_p(this.node_Rhand_E[i][j], s_node_Rhand_E[i][j]);
      }
    }




    for (let i=0; i<this.node_gun.length; i++) {
      let x = 0;
      if (i==1) {
        x = -this.L_gun * 0.1;
      } else if (i==2) {
        x = -this.L_gun * 0.6;
      } else if (i==3) {
        x = -this.L_gun * 0.7;
      } else if (i==4) {
        x = -this.L_gun;
      }

      this.node_gun[i] = createVector(x, this.W_gun*0.25, this.W_gun);

      this.node_gun[i] = PRotateZ(this.node_gun[i], -HALF_PI*1.0);
      this.node_gun[i] = PRotateX(this.node_gun[i], this.angleX_arm);
      this.node_gun[i].add(p5.Vector.sub(this.node_Lhand_E[2][0], this.node_Lhand_E[1][0]).mult(0.2).add(this.node_Lhand_E[1][0]));
    }
    for (let i=0; i<this.node_gun.length; i++) {
      let w = this.W_gun;
      if (i==0) {
        w = this.W_gun * 0.5;
      } else if (i==3) {
        w = this.W_gun * 0.5;
      } else if (i==4) {
        w = real(1);
      }
      for (let j=0; j<this.node_gun_E[i].length; j++) {
        let y = cos(map(j, 0, this.node_gun_E[i].length, HALF_PI*0.5, TWO_PI+HALF_PI*0.5)) * (w/2.0);
        let z = sin(map(j, 0, this.node_gun_E[i].length, HALF_PI*0.5, TWO_PI+HALF_PI*0.5)) * (w/2.0);
        this.node_gun_E[i][j] = createVector(0, y, z);
        this.node_gun_E[i][j] = PRotateZ(this.node_gun_E[i][j], -HALF_PI*1.0);
        this.node_gun_E[i][j] = PRotateX(this.node_gun_E[i][j], this.angleX_arm);
        this.node_gun_E[i][j].add(this.node_gun[i]);
      }
    }


    this.node_Dgun[0] = createVector(-this.L_gun * 0.3, this.W_gun*0.25, this.W_gun*0.7);
    this.node_Dgun[1] = createVector(-this.L_gun * 0.1, this.W_gun*0.25, -this.W_gun*0.8);
    for (let i=0; i<this.node_Dgun.length; i++) {
      this.node_Dgun[i] = PRotateZ(this.node_Dgun[i], -HALF_PI*1.0);
      this.node_Dgun[i] = PRotateX(this.node_Dgun[i], this.angleX_arm);
      this.node_Dgun[i].add(p5.Vector.sub(this.node_Lhand_E[2][0], this.node_Lhand_E[1][0]).mult(0.2).add(this.node_Lhand_E[1][0]));
    }


    for (let i=0; i<this.node_Dgun_E.length; i++) {
      let w = this.W_gun;
      if (i == 1) {
        w = this.W_gun*0.5;
      }
      for (let j=0; j<this.node_Dgun_E[i].length; j++) {
        let x = cos(map(j, 0, this.node_Dgun_E[i].length, HALF_PI*0.5, TWO_PI+HALF_PI*0.5)) * (w/2.0);
        let y = sin(map(j, 0, this.node_Dgun_E[i].length, HALF_PI*0.5, TWO_PI+HALF_PI*0.5)) * (w/2.0);
        this.node_Dgun_E[i][j] = createVector(x, y, 0);

        this.node_Dgun_E[i][j] = PRotateZ(this.node_Dgun_E[i][j], -HALF_PI*1.0);
        this.node_Dgun_E[i][j] = PRotateX(this.node_Dgun_E[i][j], this.angleX_arm);
        this.node_Dgun_E[i][j].add(this.node_Dgun[i]);
      }
    }



    this.node_Lear[0] = p5.Vector.add(this.node_head_E[0][floor(this.node_head_E[0].length/2)], this.node_head_E[1][floor(this.node_head_E[1].length/2)]).mult(0.5);
    this.node_Lear[1] = p5.Vector.add(this.node_head_E[2][floor(this.node_head_E[2].length/2)], this.node_head_E[3][floor(this.node_head_E[3].length/2)]).mult(0.5);
    this.node_Lear[2] = p5.Vector.sub(this.node_head_E[1][floor(this.node_head_E[1].length/2)+1], this.node_Lear[1]).mult(0.33).add(this.node_Lear[1]);
    this.node_Lear[3] = p5.Vector.sub(this.node_head_E[1][floor(this.node_head_E[1].length/2)+1], this.node_Lear[0]).mult(0.33).add(this.node_Lear[0]);

    this.node_Rear[0] = p5.Vector.add(this.node_head_E[0][0], this.node_head_E[1][0]).mult(0.5);
    this.node_Rear[1] = p5.Vector.add(this.node_head_E[2][0], this.node_head_E[3][0]).mult(0.5);
    this.node_Rear[2] = p5.Vector.sub(this.node_head_E[1][this.node_head_E[1].length-1], this.node_Rear[1]).mult(0.33).add(this.node_Rear[1]);
    this.node_Rear[3] = p5.Vector.sub(this.node_head_E[1][this.node_head_E[1].length-1], this.node_Rear[0]).mult(0.33).add(this.node_Rear[0]);

    this.node_Lear_E[1] = p5.Vector.sub(this.node_Lear[1], this.node_head[3]).setMag(real(7)).add(this.node_Lear[1]);
    this.node_Lear_E[2] = p5.Vector.sub(this.node_Lear[2], p5.Vector.add(this.node_head[2], this.node_head[3]).mult(0.5)).setMag(real(3.5)).add(this.node_Lear[2]);
    this.node_Lear_E[0] = p5.Vector.sub(this.node_Lear[0], this.node_body[0]).setMag(real(7)).add(this.node_Lear[0]);
    this.node_Lear_E[3] = p5.Vector.sub(this.node_Lear[3], this.node_body[0]).setMag(real(3.5)).add(this.node_Lear[3]);

    this.node_Rear_E[1] = p5.Vector.sub(this.node_Rear[1], this.node_head[3]).setMag(real(7)).add(this.node_Rear[1]);
    this.node_Rear_E[2] = p5.Vector.sub(this.node_Rear[2], p5.Vector.add(this.node_head[2], this.node_head[3]).mult(0.5)).setMag(real(3.5)).add(this.node_Rear[2]);
    this.node_Rear_E[0] = p5.Vector.sub(this.node_Rear[0], this.node_body[0]).setMag(real(7)).add(this.node_Rear[0]);
    this.node_Rear_E[3] = p5.Vector.sub(this.node_Rear[3], this.node_body[0]).setMag(real(3.5)).add(this.node_Rear[3]);






    if (open_winkL) {
      if (time_winkL < 10) {
        time_winkL ++;
      } else {
        time_winkL = 0;
        open_winkL = false;
      }
    }
    if (open_winkR) {
      if (time_winkR < 10) {
        time_winkR ++;
      } else {
        time_winkR = 0;
        open_winkR = false;
      }
    }
    let tl = constrain(sin(map(time_winkL, 0, 10, 0, PI)), 0, 1);
    let tr = constrain(sin(map(time_winkR, 0, 10, 0, PI)), 0, 1);

    bez_baronEyeL[1].x = lerp(42.59, 41.412, tl);
    bez_baronEyeL[1].y = lerp(50, 53.344, tl);
    bez_baronEyeL[2].x = lerp(38.765, 38.765, tl);
    bez_baronEyeL[2].y = lerp(47.987, 54.505, tl);
    bez_baronEyeL[3].x = lerp(35.933, 35.933, tl);
    bez_baronEyeL[3].y = lerp(48.086, 54.626, tl);
    bez_baronEyeL[4].x = lerp(33.1, 32.582, tl);
    bez_baronEyeL[4].y = lerp(48.186, 54.77, tl);
    bez_baronEyeL[5].x = lerp(29.798, 30.041, tl);
    bez_baronEyeL[5].y = lerp(50, 52.639, tl);


    bez_baronEyeR[1].x = lerp(56.944, 58.167, tr);
    bez_baronEyeR[1].y = lerp(51.052, 53.999, tr);
    bez_baronEyeR[2].x = lerp(59.901, 59.901, tr);
    bez_baronEyeR[2].y = lerp(48.125, 54.355, tr);
    bez_baronEyeR[3].x = lerp(63.572, 63.572, tr);
    bez_baronEyeR[3].y = lerp(48.131, 54.361, tr);
    bez_baronEyeR[4].x = lerp(66.407, 66.407, tr);
    bez_baronEyeR[4].y = lerp(48.136, 54.365, tr);
    bez_baronEyeR[5].x = lerp(70.641, 69.215, tr);
    bez_baronEyeR[5].y = lerp(49.941, 53.262, tr);







    FACE.background(255);
    if (!open_info) {
      FACE.fill(0);
      FACE.noStroke();
    } else {
      FACE.fill(180);
      FACE.noStroke();
    }
    FACE.rect(0, 60, 100, 50);
    FACE.ellipse(50, 60, 100, 100);
    //----脸----
    if (!open_info) {
      FACE.fill(128);
    } else {
      FACE.fill(255);
    }
    FACE.beginShape();
    FACE.vertex(49.465, 34.012);
    FACE.bezierVertex(52.469, 32.274, 62.267, 25.449, 68.72, 25.742);
    FACE.bezierVertex(78.46, 26.185, 87.288, 49.202, 76.813, 76.22);
    FACE.bezierVertex(72.49, 87.37, 58.503, 94.816, 50.572, 94.715);
    FACE.bezierVertex(42.59, 94.614, 27.492, 88.076, 22.117, 74.797);
    FACE.bezierVertex(16.742, 61.518, 14.867, 30.058, 26.881, 27.845);
    FACE.bezierVertex(38.895, 25.632, 45.039, 33.38, 49.465, 34.012);
    FACE.endShape();
    if (!open_info) {
      FACE.stroke(0);
      FACE.strokeWeight(5);
      FACE.line(73.396, 26.69, 77.276, 34);
      FACE.line(25.733, 26.69, 22.852, 34);
    }
    //----眉毛----
    if (!open_info) {
      FACE.noFill();
      FACE.stroke(0);
      FACE.strokeWeight(2);
    } else {
      FACE.noFill();
      FACE.stroke(200);
      FACE.strokeWeight(1);
    }
    FACE.beginShape();
    FACE.vertex(42.251, 43.371);
    FACE.bezierVertex(37.309, 41.222, 27.492, 43.319, 26.234, 45.286);
    FACE.endShape();
    FACE.beginShape();
    FACE.vertex(56.027, 43.685);
    FACE.bezierVertex(57.866, 42.465, 66.859, 40.936, 71.866, 43.876);
    FACE.endShape();  
    //----眼睛----
    if (!open_info) {
      FACE.noStroke();
      FACE.fill(200);
      FACE.rect(25.218, 46.964, 49.038, 9.57);
      FACE.noStroke();
      FACE.fill(0);
    } else {
      FACE.noFill();
      FACE.stroke(200);
      FACE.strokeWeight(1);
    }
    baron_eye_move_y = easing_x2(baron_eye_move_y, constrain(map(mouseY, 0, height, -2.2, 2.2), -2.2, 2.2));
    FACE.ellipse(35.465, 51.617+baron_eye_move_y, 6.0, 6.0);
    FACE.ellipse(64.146, 51.791+baron_eye_move_y, 6.0, 6.0);

    if (!open_info) {
      FACE.noStroke();
      FACE.fill(128);
    } else {
      FACE.noStroke();
      FACE.fill(255);
    }
    //----L
    FACE.beginShape();
    FACE.vertex(bez_baronEyeL[0].x, bez_baronEyeL[0].y);
    FACE.bezierVertex(bez_baronEyeL[1].x, bez_baronEyeL[1].y, bez_baronEyeL[2].x, bez_baronEyeL[2].y, bez_baronEyeL[3].x, bez_baronEyeL[3].y);
    FACE.bezierVertex(bez_baronEyeL[4].x, bez_baronEyeL[4].y, bez_baronEyeL[5].x, bez_baronEyeL[5].y, bez_baronEyeL[6].x, bez_baronEyeL[6].y);
    FACE.vertex(24, 53);
    FACE.vertex(24, 46);
    FACE.vertex(51, 46);
    FACE.vertex(51, 53);
    FACE.endShape();
    FACE.beginShape();
    FACE.vertex(bez_baronEyeL[0].x, bez_baronEyeL[0].y);
    FACE.bezierVertex(43.644, 52.971, 39.423, 55.206, 35.933, 55.405);
    FACE.bezierVertex(32.442, 55.604, 29.798, 53.07, bez_baronEyeL[6].x, bez_baronEyeL[6].y);
    FACE.vertex(24, 48);
    FACE.vertex(24, 58);
    FACE.vertex(51, 58);
    FACE.vertex(51, 48);
    FACE.endShape();
    //----R
    FACE.beginShape();
    FACE.vertex(bez_baronEyeR[0].x, bez_baronEyeR[0].y);
    FACE.bezierVertex(bez_baronEyeR[1].x, bez_baronEyeR[1].y, bez_baronEyeR[2].x, bez_baronEyeR[2].y, bez_baronEyeR[3].x, bez_baronEyeR[3].y);
    FACE.bezierVertex(bez_baronEyeR[4].x, bez_baronEyeR[4].y, bez_baronEyeR[5].x, bez_baronEyeR[5].y, bez_baronEyeR[6].x, bez_baronEyeR[6].y);
    FACE.vertex(75, 53);
    FACE.vertex(75, 46);
    FACE.vertex(48, 46);
    FACE.vertex(48, 53);
    FACE.endShape();
    FACE.beginShape();
    FACE.vertex(bez_baronEyeR[0].x, bez_baronEyeR[0].y);
    FACE.bezierVertex(56.944, 54.361, 60.082, 55.361, 63.572, 55.147);
    FACE.bezierVertex(67.063, 54.932, 71.696, 53.143, bez_baronEyeR[6].x, bez_baronEyeR[6].y);
    FACE.vertex(75, 48);
    FACE.vertex(75, 58);
    FACE.vertex(48, 58);
    FACE.vertex(48, 48);
    FACE.endShape();

    if (!open_info) {
      FACE.noFill();
      FACE.stroke(0);
      FACE.strokeWeight(2);
    } else {
      FACE.noFill();
      FACE.stroke(200);
      FACE.strokeWeight(1);
    }
    //----L
    FACE.beginShape();
    FACE.vertex(bez_baronEyeL[0].x, bez_baronEyeL[0].y);
    FACE.bezierVertex(bez_baronEyeL[1].x, bez_baronEyeL[1].y, bez_baronEyeL[2].x, bez_baronEyeL[2].y, bez_baronEyeL[3].x, bez_baronEyeL[3].y);
    FACE.bezierVertex(bez_baronEyeL[4].x, bez_baronEyeL[4].y, bez_baronEyeL[5].x, bez_baronEyeL[5].y, bez_baronEyeL[6].x, bez_baronEyeL[6].y);
    FACE.bezierVertex(29.798, 53.07, 32.442, 55.604, 35.933, 55.405);
    FACE.bezierVertex(39.423, 55.206, 43.644, 52.971, bez_baronEyeL[0].x, bez_baronEyeL[0].y);
    FACE.endShape();
    FACE.beginShape();
    FACE.vertex(bez_baronEyeR[0].x, bez_baronEyeR[0].y);
    FACE.bezierVertex(bez_baronEyeR[1].x, bez_baronEyeR[1].y, bez_baronEyeR[2].x, bez_baronEyeR[2].y, bez_baronEyeR[3].x, bez_baronEyeR[3].y);
    FACE.bezierVertex(bez_baronEyeR[4].x, bez_baronEyeR[4].y, bez_baronEyeR[5].x, bez_baronEyeR[5].y, bez_baronEyeR[6].x, bez_baronEyeR[6].y);
    FACE.bezierVertex(71.696, 53.143, 67.063, 54.932, 63.572, 55.147);
    FACE.bezierVertex(60.082, 55.361, 56.944, 54.361, bez_baronEyeR[0].x, bez_baronEyeR[0].y);
    FACE.endShape();
    //----胡子----
    if (!open_info) {
      FACE.noStroke();
      FACE.fill(0);
    } else {
      FACE.noFill();
      FACE.stroke(200);
      FACE.strokeWeight(1);
    }
    FACE.beginShape();
    FACE.vertex(34.629, 67.611);
    FACE.bezierVertex(37.309, 70.984, 39.712, 71.585, 49, 71.123);
    FACE.bezierVertex(55.688, 71.307, 58.288, 73.572, 63.602, 67.842);
    FACE.bezierVertex(64.572, 68.674, 62.631, 82.444, 49.046, 77.269);
    FACE.bezierVertex(37.632, 80.318, 34.259, 73.387, 34.629, 67.611);
    FACE.endShape();
    //----嘴巴----
    if (!open_info) {
      FACE.noFill();
      FACE.stroke(0);
      FACE.strokeWeight(1.5);
    } else {
      FACE.noFill();
      FACE.stroke(200);
      FACE.strokeWeight(1);
    }
    FACE.beginShape();
    FACE.vertex(43.217, 78.698);
    FACE.bezierVertex(42.747, 79.58, 42.925, 82.947, 48.755, 80.513);
    FACE.bezierVertex(51.731, 81.851, 55.312, 82.444, 54.272, 78.931);
    FACE.endShape();
    //----鼻子----
    FACE.beginShape();
    FACE.vertex(45.507, 53.455);
    FACE.bezierVertex(47.718, 60.225, 45.007, 62.779, 45.007, 66.952);
    FACE.bezierVertex(45.007, 71.585, 53.142, 72.102, 53.142, 66.952);
    FACE.bezierVertex(53.142, 64.133, 50, 60.75, 52.051, 53.455);
    FACE.endShape();








    if (!open_info) {
      EAR.background(0);
      EAR.noStroke();
    } else {
      EAR.background(255);
      EAR.stroke(100);
      EAR.strokeWeight(0.5);
    }
    for (let i=0; i<3; i++) {
      if (!this.open_fast) {
        if (frameCount%30 < 10*(i+1)  &&  frameCount%30 > 10*(i)) {
          EAR.fill(255);
        } else {
          EAR.fill(128);
        }
      } else {
        if (frameCount%6<3 && random(2)<1) {
          EAR.fill(255);
        } else {
          EAR.fill(128);
        }
      }
      EAR.ellipse(3, 12+i*8, 3, 3);
    }






    if (frameCount % 60 == 0  &&  roY-(map(mouseX, 0, width, -HALF_PI, HALF_PI)-HALF_PI/2)<0.1) {
      if (this.ready_open_shot) {
        this.open_shot = true;
        this.open_time_shot = true;
        this.time_shot = 0;
      }
    } else {
      this.open_shot = false;
    }

    if (this.open_time_shot) {
      this.time_shot ++;
      if (this.time_shot > 10) {
        this.open_time_shot = false;
        this.time_shot = 0;
      }
    }
  };














  this.display = function() {
    noStroke();
    fill(255);
    //noFill();
    //stroke(200);
    //strokeWeight(real(1));
    for (let i=0; i<this.node_body_E.length-1; i++) {
      for (let j=0; j<this.node_body_E[i].length; j++) {
        beginShape();
        vertex(this.node_body_E[i][j].x, this.node_body_E[i][j].y, this.node_body_E[i][j].z);
        vertex(this.node_body_E[i][(j+1)%this.node_body_E[i].length].x, this.node_body_E[i][(j+1)%this.node_body_E[i].length].y, this.node_body_E[i][(j+1)%this.node_body_E[i].length].z);
        vertex(this.node_body_E[i+1][(j+1)%this.node_body_E[i].length].x, this.node_body_E[i+1][(j+1)%this.node_body_E[i].length].y, this.node_body_E[i+1][(j+1)%this.node_body_E[i].length].z);
        vertex(this.node_body_E[i+1][j].x, this.node_body_E[i+1][j].y, this.node_body_E[i+1][j].z);
        endShape();
      }
    }

    for (let i=0; i<this.node_head_E.length-1; i++) {
      for (let j=0; j<this.node_head_E[i].length; j++) {
        if ((j==1||j==2)  &&  (i==0||i==1||i==2||i==3)) {
          fill(255);
          let uvx = map(this.node_head_E[i][j].x, this.node_head_E[0][1].x, this.node_head_E[0][3].x, 1.0, 0.0);
          let uvy = map(this.node_head_E[i][j].y, this.node_head_E[0][2].y, this.node_head_E[4][2].y, 1.0, 0.0);
          let uvx_ = map(this.node_head_E[i][j+1].x, this.node_head_E[0][1].x, this.node_head_E[0][3].x, 1.0, 0.0);
          let uvy_ = map(this.node_head_E[i+1][j].y, this.node_head_E[0][2].y, this.node_head_E[4][2].y, 1.0, 0.0);
          beginShape();
          texture(FACE);
          vertex(this.node_head_E[i][j].x, this.node_head_E[i][j].y, this.node_head_E[i][j].z, uvx, uvy);
          vertex(this.node_head_E[i][(j+1)%this.node_head_E[i].length].x, this.node_head_E[i][(j+1)%this.node_head_E[i].length].y, this.node_head_E[i][(j+1)%this.node_head_E[i].length].z, uvx_, uvy);
          vertex(this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].x, this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].y, this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].z, uvx_, uvy_);
          vertex(this.node_head_E[i+1][j].x, this.node_head_E[i+1][j].y, this.node_head_E[i+1][j].z, uvx, uvy_);
          endShape();
        } else {
          fill(255);
          beginShape();
          vertex(this.node_head_E[i][j].x, this.node_head_E[i][j].y, this.node_head_E[i][j].z);
          vertex(this.node_head_E[i][(j+1)%this.node_head_E[i].length].x, this.node_head_E[i][(j+1)%this.node_head_E[i].length].y, this.node_head_E[i][(j+1)%this.node_head_E[i].length].z);
          vertex(this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].x, this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].y, this.node_head_E[i+1][(j+1)%this.node_head_E[i].length].z);
          vertex(this.node_head_E[i+1][j].x, this.node_head_E[i+1][j].y, this.node_head_E[i+1][j].z);
          endShape();
        }
      }
    }
    fill(255);

    let sp_node_body_E = Array.from(Array(this.node_body_E.length), () => new Array(this.node_body_E[0].length));
    for (let i=0; i<sp_node_body_E.length; i++) {
      for (let j=0; j<sp_node_body_E[i].length; j++) {
        sp_node_body_E[i][j] = screenPosition(this.node_body_E[i][j]);
      }
    }
    let min_node_body_E = new Array(this.node_body_E.length);
    let index_min_node_body_E = new Array(this.node_body_E.length);
    let max_node_body_E = new Array(this.node_body_E.length);
    let index_max_node_body_E = new Array(this.node_body_E.length);
    for (let i=0; i<this.node_body_E.length; i++) {
      min_node_body_E[i] = sp_node_body_E[i][0].copy();
      index_min_node_body_E[i] = 0;
      max_node_body_E[i] = sp_node_body_E[i][0].copy();
      index_max_node_body_E[i] = 0;
    }
    for (let i=0; i<sp_node_body_E.length; i++) {
      for (let j=0; j<sp_node_body_E[i].length; j++) {
        if (sp_node_body_E[i][j].x < min_node_body_E[i].x) {
          min_node_body_E[i] = sp_node_body_E[i][j].copy();
          index_min_node_body_E[i] = j;
        }
        if (sp_node_body_E[i][j].x > max_node_body_E[i].x) {
          max_node_body_E[i] = sp_node_body_E[i][j].copy();
          index_max_node_body_E[i] = j;
        }
      }
    }


    let sp_node_head_E = Array.from(Array(this.node_head_E.length), () => new Array(this.node_head_E[0].length));
    for (let i=0; i<sp_node_head_E.length; i++) {
      for (let j=0; j<sp_node_head_E[i].length; j++) {
        sp_node_head_E[i][j] = screenPosition(this.node_head_E[i][j]);
      }
    }
    let min_node_head_E = new Array(this.node_head_E.length);
    let index_min_node_head_E = new Array(this.node_head_E.length);
    let max_node_head_E = new Array(this.node_head_E.length);
    let index_max_node_head_E = new Array(this.node_head_E.length);
    for (let i=0; i<this.node_head_E.length; i++) {
      min_node_head_E[i] = sp_node_head_E[i][0].copy();
      index_min_node_head_E[i] = 0;
      max_node_head_E[i] = sp_node_head_E[i][0].copy();
      index_max_node_head_E[i] = 0;
    }
    for (let i=0; i<sp_node_head_E.length; i++) {
      for (let j=0; j<sp_node_head_E[i].length; j++) {
        if (sp_node_head_E[i][j].x < min_node_head_E[i].x) {
          min_node_head_E[i] = sp_node_head_E[i][j].copy();
          index_min_node_head_E[i] = j;
        }
        if (sp_node_head_E[i][j].x > max_node_head_E[i].x) {
          max_node_head_E[i] = sp_node_head_E[i][j].copy();
          index_max_node_head_E[i] = j;
        }
      }
    }


    noFill();
    stroke(0);
    strokeWeight(real(4));
    beginShape();
    for (let i=0; i<this.node_body_E.length; i++) {
      vertex(this.node_body_E[i][index_min_node_body_E[i]].x, this.node_body_E[i][index_min_node_body_E[i]].y, this.node_body_E[i][index_min_node_body_E[i]].z);
    }
    for (let i=0; i<this.node_head_E.length; i++) {
      vertex(this.node_head_E[i][index_min_node_head_E[i]].x, this.node_head_E[i][index_min_node_head_E[i]].y, this.node_head_E[i][index_min_node_head_E[i]].z);
    }
    for (let i=this.node_head_E.length-1; i>=0; i--) {
      vertex(this.node_head_E[i][index_max_node_head_E[i]].x, this.node_head_E[i][index_max_node_head_E[i]].y, this.node_head_E[i][index_max_node_head_E[i]].z);
    }
    for (let i=this.node_body_E.length-1; i>=0; i--) {
      vertex(this.node_body_E[i][index_max_node_body_E[i]].x, this.node_body_E[i][index_max_node_body_E[i]].y, this.node_body_E[i][index_max_node_body_E[i]].z);
    }
    endShape();

    beginShape(POINTS);
    for (let i=0; i<this.node_head_E.length; i++) {
      vertex(this.node_head_E[i][index_min_node_head_E[i]].x, this.node_head_E[i][index_min_node_head_E[i]].y, this.node_head_E[i][index_min_node_head_E[i]].z);
    }
    for (let i=this.node_head_E.length-1; i>=0; i--) {
      vertex(this.node_head_E[i][index_max_node_head_E[i]].x, this.node_head_E[i][index_max_node_head_E[i]].y, this.node_head_E[i][index_max_node_head_E[i]].z);
    }
    endShape();







    noStroke();
    fill(255);
    for (let i=0; i<this.node_Lleg_E.length-1; i++) {
      for (let j=0; j<this.node_Lleg_E[i].length; j++) {
        beginShape();
        vertex(this.node_Lleg_E[i][j].x, this.node_Lleg_E[i][j].y, this.node_Lleg_E[i][j].z);
        vertex(this.node_Lleg_E[i][(j+1)%this.node_Lleg_E[i].length].x, this.node_Lleg_E[i][(j+1)%this.node_Lleg_E[i].length].y, this.node_Lleg_E[i][(j+1)%this.node_Lleg_E[i].length].z);
        vertex(this.node_Lleg_E[i+1][(j+1)%this.node_Lleg_E[i].length].x, this.node_Lleg_E[i+1][(j+1)%this.node_Lleg_E[i].length].y, this.node_Lleg_E[i+1][(j+1)%this.node_Lleg_E[i].length].z);
        vertex(this.node_Lleg_E[i+1][j].x, this.node_Lleg_E[i+1][j].y, this.node_Lleg_E[i+1][j].z);
        endShape();
      }
    }
    for (let i=0; i<this.node_Rleg_E.length-1; i++) {
      for (let j=0; j<this.node_Rleg_E[i].length; j++) {
        beginShape();
        vertex(this.node_Rleg_E[i][j].x, this.node_Rleg_E[i][j].y, this.node_Rleg_E[i][j].z);
        vertex(this.node_Rleg_E[i][(j+1)%this.node_Rleg_E[i].length].x, this.node_Rleg_E[i][(j+1)%this.node_Rleg_E[i].length].y, this.node_Rleg_E[i][(j+1)%this.node_Rleg_E[i].length].z);
        vertex(this.node_Rleg_E[i+1][(j+1)%this.node_Rleg_E[i].length].x, this.node_Rleg_E[i+1][(j+1)%this.node_Rleg_E[i].length].y, this.node_Rleg_E[i+1][(j+1)%this.node_Rleg_E[i].length].z);
        vertex(this.node_Rleg_E[i+1][j].x, this.node_Rleg_E[i+1][j].y, this.node_Rleg_E[i+1][j].z);
        endShape();
      }
    }
    let sp_node_Lleg_E = Array.from(Array(this.node_Lleg_E.length), () => new Array(this.node_Lleg_E[0].length));
    let sp_node_Rleg_E = Array.from(Array(this.node_Rleg_E.length), () => new Array(this.node_Rleg_E[0].length));
    for (let i=0; i<sp_node_Lleg_E.length; i++) {
      for (let j=0; j<sp_node_Lleg_E[i].length; j++) {
        sp_node_Lleg_E[i][j] = screenPosition(this.node_Lleg_E[i][j]);
        sp_node_Rleg_E[i][j] = screenPosition(this.node_Rleg_E[i][j]);
      }
    }
    let min_node_Lleg_E = new Array(this.node_Lleg_E.length);
    let index_min_node_Lleg_E = new Array(this.node_Lleg_E.length);
    let max_node_Lleg_E = new Array(this.node_Lleg_E.length);
    let index_max_node_Lleg_E = new Array(this.node_Lleg_E.length);
    let min_node_Rleg_E = new Array(this.node_Rleg_E.length);
    let index_min_node_Rleg_E = new Array(this.node_Rleg_E.length);
    let max_node_Rleg_E = new Array(this.node_Rleg_E.length);
    let index_max_node_Rleg_E = new Array(this.node_Rleg_E.length);
    for (let i=0; i<this.node_Lleg_E.length; i++) {
      min_node_Lleg_E[i] = sp_node_Lleg_E[i][0].copy();
      index_min_node_Lleg_E[i] = 0;
      max_node_Lleg_E[i] = sp_node_Lleg_E[i][0].copy();
      index_max_node_Lleg_E[i] = 0;
      min_node_Rleg_E[i] = sp_node_Rleg_E[i][0].copy();
      index_min_node_Rleg_E[i] = 0;
      max_node_Rleg_E[i] = sp_node_Rleg_E[i][0].copy();
      index_max_node_Rleg_E[i] = 0;
    }
    for (let i=0; i<sp_node_Lleg_E.length; i++) {
      for (let j=0; j<sp_node_Lleg_E[i].length; j++) {
        if (sp_node_Lleg_E[i][j].x < min_node_Lleg_E[i].x) {
          min_node_Lleg_E[i] = sp_node_Lleg_E[i][j].copy();
          index_min_node_Lleg_E[i] = j;
        }
        if (sp_node_Lleg_E[i][j].x > max_node_Lleg_E[i].x) {
          max_node_Lleg_E[i] = sp_node_Lleg_E[i][j].copy();
          index_max_node_Lleg_E[i] = j;
        }
        if (sp_node_Rleg_E[i][j].x < min_node_Rleg_E[i].x) {
          min_node_Rleg_E[i] = sp_node_Rleg_E[i][j].copy();
          index_min_node_Rleg_E[i] = j;
        }
        if (sp_node_Rleg_E[i][j].x > max_node_Rleg_E[i].x) {
          max_node_Rleg_E[i] = sp_node_Rleg_E[i][j].copy();
          index_max_node_Rleg_E[i] = j;
        }
      }
    }
    noFill();
    stroke(0);
    strokeWeight(real(4));
    beginShape();
    for (let i=0; i<this.node_Lleg_E.length; i++) {
      vertex(this.node_Lleg_E[i][index_min_node_Lleg_E[i]].x, this.node_Lleg_E[i][index_min_node_Lleg_E[i]].y, this.node_Lleg_E[i][index_min_node_Lleg_E[i]].z);
    }
    for (let i=this.node_Lleg_E.length-1; i>=0; i--) {
      vertex(this.node_Lleg_E[i][index_max_node_Lleg_E[i]].x, this.node_Lleg_E[i][index_max_node_Lleg_E[i]].y, this.node_Lleg_E[i][index_max_node_Lleg_E[i]].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_Rleg_E.length; i++) {
      vertex(this.node_Rleg_E[i][index_min_node_Rleg_E[i]].x, this.node_Rleg_E[i][index_min_node_Rleg_E[i]].y, this.node_Rleg_E[i][index_min_node_Rleg_E[i]].z);
    }
    for (let i=this.node_Rleg_E.length-1; i>=0; i--) {
      vertex(this.node_Rleg_E[i][index_max_node_Rleg_E[i]].x, this.node_Rleg_E[i][index_max_node_Rleg_E[i]].y, this.node_Rleg_E[i][index_max_node_Rleg_E[i]].z);
    }
    endShape();

    beginShape(POINTS);
    for (let i=0; i<this.node_Lleg_E.length; i++) {
      vertex(this.node_Lleg_E[i][index_min_node_Lleg_E[i]].x, this.node_Lleg_E[i][index_min_node_Lleg_E[i]].y, this.node_Lleg_E[i][index_min_node_Lleg_E[i]].z);
    }
    for (let i=this.node_Lleg_E.length-1; i>=0; i--) {
      vertex(this.node_Lleg_E[i][index_max_node_Lleg_E[i]].x, this.node_Lleg_E[i][index_max_node_Lleg_E[i]].y, this.node_Lleg_E[i][index_max_node_Lleg_E[i]].z);
    }
    for (let i=0; i<this.node_Rleg_E.length; i++) {
      vertex(this.node_Rleg_E[i][index_min_node_Rleg_E[i]].x, this.node_Rleg_E[i][index_min_node_Rleg_E[i]].y, this.node_Rleg_E[i][index_min_node_Rleg_E[i]].z);
    }
    for (let i=this.node_Rleg_E.length-1; i>=0; i--) {
      vertex(this.node_Rleg_E[i][index_max_node_Rleg_E[i]].x, this.node_Rleg_E[i][index_max_node_Rleg_E[i]].y, this.node_Rleg_E[i][index_max_node_Rleg_E[i]].z);
    }
    endShape();







    noStroke();
    fill(0);
    for (let i=0; i<this.node_Lshoe_E.length-1; i++) {
      for (let j=0; j<this.node_Lshoe_E[i].length; j++) {
        beginShape();
        vertex(this.node_Lshoe_E[i][j].x, this.node_Lshoe_E[i][j].y, this.node_Lshoe_E[i][j].z);
        vertex(this.node_Lshoe_E[i][(j+1)%this.node_Lshoe_E[i].length].x, this.node_Lshoe_E[i][(j+1)%this.node_Lshoe_E[i].length].y, this.node_Lshoe_E[i][(j+1)%this.node_Lshoe_E[i].length].z);
        vertex(this.node_Lshoe_E[i+1][(j+1)%this.node_Lshoe_E[i].length].x, this.node_Lshoe_E[i+1][(j+1)%this.node_Lshoe_E[i].length].y, this.node_Lshoe_E[i+1][(j+1)%this.node_Lshoe_E[i].length].z);
        vertex(this.node_Lshoe_E[i+1][j].x, this.node_Lshoe_E[i+1][j].y, this.node_Lshoe_E[i+1][j].z);
        endShape();
      }
    }
    for (let i=0; i<this.node_Rshoe_E.length-1; i++) {
      for (let j=0; j<this.node_Rshoe_E[i].length; j++) {
        beginShape();
        vertex(this.node_Rshoe_E[i][j].x, this.node_Rshoe_E[i][j].y, this.node_Rshoe_E[i][j].z);
        vertex(this.node_Rshoe_E[i][(j+1)%this.node_Rshoe_E[i].length].x, this.node_Rshoe_E[i][(j+1)%this.node_Rshoe_E[i].length].y, this.node_Rshoe_E[i][(j+1)%this.node_Rshoe_E[i].length].z);
        vertex(this.node_Rshoe_E[i+1][(j+1)%this.node_Rshoe_E[i].length].x, this.node_Rshoe_E[i+1][(j+1)%this.node_Rshoe_E[i].length].y, this.node_Rshoe_E[i+1][(j+1)%this.node_Rshoe_E[i].length].z);
        vertex(this.node_Rshoe_E[i+1][j].x, this.node_Rshoe_E[i+1][j].y, this.node_Rshoe_E[i+1][j].z);
        endShape();
      }
    }


    for (let i=0; i<this.node_Lshoe_D.length-1; i++) {
      for (let j=0; j<this.node_Lshoe_D[i].length-1; j++) {
        beginShape();
        vertex(this.node_Lshoe_D[i][j].x, this.node_Lshoe_D[i][j].y, this.node_Lshoe_D[i][j].z);
        vertex(this.node_Lshoe_D[i][j+1].x, this.node_Lshoe_D[i][j+1].y, this.node_Lshoe_D[i][j+1].z);
        vertex(this.node_Lshoe_D[i+1][j+1].x, this.node_Lshoe_D[i+1][j+1].y, this.node_Lshoe_D[i+1][j+1].z);
        vertex(this.node_Lshoe_D[i+1][j].x, this.node_Lshoe_D[i+1][j].y, this.node_Lshoe_D[i+1][j].z);
        endShape(CLOSE);
      }
    }
    for (let i=0; i<this.node_Rshoe_D.length-1; i++) {
      for (let j=0; j<this.node_Rshoe_D[i].length-1; j++) {
        beginShape();
        vertex(this.node_Rshoe_D[i][j].x, this.node_Rshoe_D[i][j].y, this.node_Rshoe_D[i][j].z);
        vertex(this.node_Rshoe_D[i][j+1].x, this.node_Rshoe_D[i][j+1].y, this.node_Rshoe_D[i][j+1].z);
        vertex(this.node_Rshoe_D[i+1][j+1].x, this.node_Rshoe_D[i+1][j+1].y, this.node_Rshoe_D[i+1][j+1].z);
        vertex(this.node_Rshoe_D[i+1][j].x, this.node_Rshoe_D[i+1][j].y, this.node_Rshoe_D[i+1][j].z);
        endShape(CLOSE);
      }
    }






    noStroke();
    fill(255);
    for (let i=0; i<this.node_Larm_E.length-1; i++) {
      for (let j=0; j<this.node_Larm_E[i].length; j++) {
        beginShape();
        vertex(this.node_Larm_E[i][j].x, this.node_Larm_E[i][j].y, this.node_Larm_E[i][j].z);
        vertex(this.node_Larm_E[i][(j+1)%this.node_Larm_E[i].length].x, this.node_Larm_E[i][(j+1)%this.node_Larm_E[i].length].y, this.node_Larm_E[i][(j+1)%this.node_Larm_E[i].length].z);
        vertex(this.node_Larm_E[i+1][(j+1)%this.node_Larm_E[i].length].x, this.node_Larm_E[i+1][(j+1)%this.node_Larm_E[i].length].y, this.node_Larm_E[i+1][(j+1)%this.node_Larm_E[i].length].z);
        vertex(this.node_Larm_E[i+1][j].x, this.node_Larm_E[i+1][j].y, this.node_Larm_E[i+1][j].z);
        endShape();
      }
    }
    for (let i=0; i<this.node_Rarm_E.length-1; i++) {
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        beginShape();
        vertex(this.node_Rarm_E[i][j].x, this.node_Rarm_E[i][j].y, this.node_Rarm_E[i][j].z);
        vertex(this.node_Rarm_E[i][(j+1)%this.node_Rarm_E[i].length].x, this.node_Rarm_E[i][(j+1)%this.node_Rarm_E[i].length].y, this.node_Rarm_E[i][(j+1)%this.node_Rarm_E[i].length].z);
        vertex(this.node_Rarm_E[i+1][(j+1)%this.node_Rarm_E[i].length].x, this.node_Rarm_E[i+1][(j+1)%this.node_Rarm_E[i].length].y, this.node_Rarm_E[i+1][(j+1)%this.node_Rarm_E[i].length].z);
        vertex(this.node_Rarm_E[i+1][j].x, this.node_Rarm_E[i+1][j].y, this.node_Rarm_E[i+1][j].z);
        endShape();
      }
    }
    let sp_node_Larm_E = Array.from(Array(this.node_Larm_E.length), () => new Array(this.node_Larm_E[0].length));
    let sp_node_Rarm_E = Array.from(Array(this.node_Rarm_E.length), () => new Array(this.node_Rarm_E[0].length));
    for (let i=0; i<sp_node_Larm_E.length; i++) {
      for (let j=0; j<sp_node_Larm_E[i].length; j++) {
        sp_node_Larm_E[i][j] = screenPosition(this.node_Larm_E[i][j]);
        sp_node_Rarm_E[i][j] = screenPosition(this.node_Rarm_E[i][j]);
      }
    }

    let up_node_Larm_E = new Array(this.node_Larm_E.length);
    let up_node_Larm_E_center = new Array(this.node_Larm_E.length);
    let index_up_node_Larm_E = new Array(this.node_Larm_E.length);
    let down_node_Larm_E = new Array(this.node_Larm_E.length);
    let down_node_Larm_E_center = new Array(this.node_Larm_E.length);
    let index_down_node_Larm_E = new Array(this.node_Larm_E.length);
    let up_node_Rarm_E = new Array(this.node_Rarm_E.length);
    let up_node_Rarm_E_center = new Array(this.node_Larm_E.length);
    let index_up_node_Rarm_E = new Array(this.node_Rarm_E.length);
    let down_node_Rarm_E = new Array(this.node_Rarm_E.length);
    let down_node_Rarm_E_center = new Array(this.node_Larm_E.length);
    let index_down_node_Rarm_E = new Array(this.node_Rarm_E.length);
    for (let i=0; i<this.node_Larm_E.length; i++) {
      up_node_Larm_E[i] = sp_node_Larm_E[i][3].copy();
      index_up_node_Larm_E[i] = 3;
      down_node_Larm_E[i] = sp_node_Larm_E[i][0].copy();
      index_down_node_Larm_E[i] = 0;
      up_node_Rarm_E[i] = sp_node_Rarm_E[i][3].copy();
      index_up_node_Rarm_E[i] = 3;
      down_node_Rarm_E[i] = sp_node_Rarm_E[i][0].copy();
      index_down_node_Rarm_E[i] = 0;
      //up_node_Larm_E_center[i] = p5.Vector.add(sp_node_Larm_E[i][2], sp_node_Larm_E[i][4]).mult(0.5);
      //down_node_Larm_E_center[i] = p5.Vector.add(sp_node_Larm_E[i][1], sp_node_Larm_E[i][5]).mult(0.5);
      //up_node_Rarm_E_center[i] = p5.Vector.add(sp_node_Rarm_E[i][2], sp_node_Rarm_E[i][4]).mult(0.5);
      //down_node_Rarm_E_center[i] = p5.Vector.add(sp_node_Rarm_E[i][1], sp_node_Rarm_E[i][5]).mult(0.5);
      up_node_Larm_E_center[i] = screenPosition(this.node_Larm[i]);
      down_node_Larm_E_center[i] = screenPosition(this.node_Larm[i]);
      up_node_Rarm_E_center[i] = screenPosition(this.node_Rarm[i]);
      down_node_Rarm_E_center[i] = screenPosition(this.node_Rarm[i]);
    }
    for (let i=0; i<sp_node_Larm_E.length; i++) {
      for (let j=0; j<sp_node_Larm_E[i].length; j++) {
        if (j==2||j==3||j==4) {
          if (p5.Vector.dist(up_node_Larm_E_center[i], sp_node_Larm_E[i][j]) > p5.Vector.dist(up_node_Larm_E_center[i], up_node_Larm_E[i])) {
            up_node_Larm_E[i] = sp_node_Larm_E[i][j].copy();
            index_up_node_Larm_E[i] = j;
          }
          if (p5.Vector.dist(up_node_Rarm_E_center[i], sp_node_Rarm_E[i][j]) > p5.Vector.dist(up_node_Rarm_E_center[i], up_node_Rarm_E[i])) {
            up_node_Rarm_E[i] = sp_node_Rarm_E[i][j].copy();
            index_up_node_Rarm_E[i] = j;
          }
        } else {
          if (p5.Vector.dist(down_node_Larm_E_center[i], sp_node_Larm_E[i][j]) > p5.Vector.dist(down_node_Larm_E_center[i], down_node_Larm_E[i])) {
            down_node_Larm_E[i] = sp_node_Larm_E[i][j].copy();
            index_down_node_Larm_E[i] = j;
          }
          if (p5.Vector.dist(down_node_Rarm_E_center[i], sp_node_Rarm_E[i][j]) > p5.Vector.dist(down_node_Rarm_E_center[i], down_node_Rarm_E[i])) {
            down_node_Rarm_E[i] = sp_node_Rarm_E[i][j].copy();
            index_down_node_Rarm_E[i] = j;
          }
        }
      }
    }
    noFill();
    stroke(0);
    strokeWeight(real(4));
    beginShape();
    for (let i=0; i<this.node_Larm_E.length; i++) {
      vertex(this.node_Larm_E[i][index_up_node_Larm_E[i]].x, this.node_Larm_E[i][index_up_node_Larm_E[i]].y, this.node_Larm_E[i][index_up_node_Larm_E[i]].z);
    }
    for (let i=this.node_Larm_E.length-1; i>=0; i--) {
      vertex(this.node_Larm_E[i][index_down_node_Larm_E[i]].x, this.node_Larm_E[i][index_down_node_Larm_E[i]].y, this.node_Larm_E[i][index_down_node_Larm_E[i]].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_Rarm_E.length; i++) {
      vertex(this.node_Rarm_E[i][index_up_node_Rarm_E[i]].x, this.node_Rarm_E[i][index_up_node_Rarm_E[i]].y, this.node_Rarm_E[i][index_up_node_Rarm_E[i]].z);
    }
    for (let i=this.node_Rarm_E.length-1; i>=0; i--) {
      vertex(this.node_Rarm_E[i][index_down_node_Rarm_E[i]].x, this.node_Rarm_E[i][index_down_node_Rarm_E[i]].y, this.node_Rarm_E[i][index_down_node_Rarm_E[i]].z);
    }
    endShape();
    beginShape(POINTS);
    for (let i=0; i<this.node_Larm_E.length; i++) {
      vertex(this.node_Larm_E[i][index_up_node_Larm_E[i]].x, this.node_Larm_E[i][index_up_node_Larm_E[i]].y, this.node_Larm_E[i][index_up_node_Larm_E[i]].z);
    }
    for (let i=this.node_Larm_E.length-1; i>=0; i--) {
      vertex(this.node_Larm_E[i][index_down_node_Larm_E[i]].x, this.node_Larm_E[i][index_down_node_Larm_E[i]].y, this.node_Larm_E[i][index_down_node_Larm_E[i]].z);
    }
    for (let i=0; i<this.node_Rarm_E.length; i++) {
      vertex(this.node_Rarm_E[i][index_up_node_Rarm_E[i]].x, this.node_Rarm_E[i][index_up_node_Rarm_E[i]].y, this.node_Rarm_E[i][index_up_node_Rarm_E[i]].z);
    }
    for (let i=this.node_Rarm_E.length-1; i>=0; i--) {
      vertex(this.node_Rarm_E[i][index_down_node_Rarm_E[i]].x, this.node_Rarm_E[i][index_down_node_Rarm_E[i]].y, this.node_Rarm_E[i][index_down_node_Rarm_E[i]].z);
    }
    endShape();





    noStroke();
    fill(0);
    for (let i=0; i<this.node_Lhand_E.length-1; i++) {
      for (let j=0; j<this.node_Lhand_E[i].length; j++) {
        beginShape();
        vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
        vertex(this.node_Lhand_E[i][(j+1)%this.node_Lhand_E[i].length].x, this.node_Lhand_E[i][(j+1)%this.node_Lhand_E[i].length].y, this.node_Lhand_E[i][(j+1)%this.node_Lhand_E[i].length].z);
        vertex(this.node_Lhand_E[i+1][(j+1)%this.node_Lhand_E[i].length].x, this.node_Lhand_E[i+1][(j+1)%this.node_Lhand_E[i].length].y, this.node_Lhand_E[i+1][(j+1)%this.node_Lhand_E[i].length].z);
        vertex(this.node_Lhand_E[i+1][j].x, this.node_Lhand_E[i+1][j].y, this.node_Lhand_E[i+1][j].z);
        endShape();
      }
    }
    for (let i=0; i<this.node_Rhand_E.length-1; i++) {
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        beginShape();
        vertex(this.node_Rhand_E[i][j].x, this.node_Rhand_E[i][j].y, this.node_Rhand_E[i][j].z);
        vertex(this.node_Rhand_E[i][(j+1)%this.node_Rhand_E[i].length].x, this.node_Rhand_E[i][(j+1)%this.node_Rhand_E[i].length].y, this.node_Rhand_E[i][(j+1)%this.node_Rhand_E[i].length].z);
        vertex(this.node_Rhand_E[i+1][(j+1)%this.node_Rhand_E[i].length].x, this.node_Rhand_E[i+1][(j+1)%this.node_Rhand_E[i].length].y, this.node_Rhand_E[i+1][(j+1)%this.node_Rhand_E[i].length].z);
        vertex(this.node_Rhand_E[i+1][j].x, this.node_Rhand_E[i+1][j].y, this.node_Rhand_E[i+1][j].z);
        endShape();
      }
    }
    noFill();
    stroke(0);
    let w_hand = p5.Vector.dist(this.node_Rhand_E[this.node_Rhand_E.length-1][0], this.node_Rhand_E[this.node_Rhand_E.length-1][floor(this.node_Rhand_E[0].length/2)]);
    strokeWeight(w_hand);
    beginShape(POINTS);
    vertex(this.node_Lhand[2].x, this.node_Lhand[2].y, this.node_Lhand[2].z);
    vertex(this.node_Rhand[2].x, this.node_Rhand[2].y, this.node_Rhand[2].z);
    endShape();
    let thumb_l = p5.Vector.sub(this.node_Lhand_E[this.node_Lhand_E.length-2][1], this.node_Lhand_E[this.node_Lhand_E.length-1][1]).mult(0.5).add(this.node_Lhand_E[this.node_Lhand_E.length-1][1]);
    let thumb_r = p5.Vector.sub(this.node_Rhand_E[this.node_Rhand_E.length-2][1], this.node_Rhand_E[this.node_Rhand_E.length-1][1]).mult(0.5).add(this.node_Rhand_E[this.node_Rhand_E.length-1][1]);
    strokeWeight(w_hand*0.5);
    beginShape(POINTS);
    vertex(thumb_l.x, thumb_l.y, thumb_l.z);
    vertex(thumb_r.x, thumb_r.y, thumb_r.z);
    endShape();







    noStroke();
    fill(160);
    for (let i=0; i<this.node_gun_E.length-1; i++) {
      for (let j=0; j<this.node_gun_E[i].length; j++) {
        beginShape();
        vertex(this.node_gun_E[i][j].x, this.node_gun_E[i][j].y, this.node_gun_E[i][j].z);
        vertex(this.node_gun_E[i][(j+1)%this.node_gun_E[i].length].x, this.node_gun_E[i][(j+1)%this.node_gun_E[i].length].y, this.node_gun_E[i][(j+1)%this.node_gun_E[i].length].z);
        vertex(this.node_gun_E[i+1][(j+1)%this.node_gun_E[i].length].x, this.node_gun_E[i+1][(j+1)%this.node_gun_E[i].length].y, this.node_gun_E[i+1][(j+1)%this.node_gun_E[i].length].z);
        vertex(this.node_gun_E[i+1][j].x, this.node_gun_E[i+1][j].y, this.node_gun_E[i+1][j].z);
        endShape();
      }
    }
    for (let i=0; i<this.node_Dgun_E.length-1; i++) {
      for (let j=0; j<this.node_Dgun_E[i].length; j++) {
        beginShape();
        vertex(this.node_Dgun_E[i][j].x, this.node_Dgun_E[i][j].y, this.node_Dgun_E[i][j].z);
        vertex(this.node_Dgun_E[i][(j+1)%this.node_Dgun_E[i].length].x, this.node_Dgun_E[i][(j+1)%this.node_Dgun_E[i].length].y, this.node_Dgun_E[i][(j+1)%this.node_Dgun_E[i].length].z);
        vertex(this.node_Dgun_E[i+1][(j+1)%this.node_Dgun_E[i].length].x, this.node_Dgun_E[i+1][(j+1)%this.node_Dgun_E[i].length].y, this.node_Dgun_E[i+1][(j+1)%this.node_Dgun_E[i].length].z);
        vertex(this.node_Dgun_E[i+1][j].x, this.node_Dgun_E[i+1][j].y, this.node_Dgun_E[i+1][j].z);
        endShape();
      }
    }










    noFill();
    stroke(0);
    strokeWeight(real(5));
    beginShape();
    for (let j=0; j<this.node_body_E[0].length; j++) {
      let n = p5.Vector.sub(this.node_body_E[0][j], this.node_body[0]).mult(1.05).add(this.node_body[0]);
      vertex(n.x, n.y, n.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Lleg_E[0].length; j++) {
      let nl = p5.Vector.sub(this.node_Lleg_E[this.node_Lleg_E.length-1][j], this.node_Lleg[this.node_Lleg_E.length-1]).mult(1.2).add(this.node_Lleg[this.node_Lleg_E.length-1]);
      vertex(nl.x, nl.y, nl.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Rleg_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rleg_E[this.node_Rleg_E.length-1][j], this.node_Rleg[this.node_Rleg_E.length-1]).mult(1.2).add(this.node_Rleg[this.node_Lleg_E.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Larm_E[0].length; j++) {
      let nl = p5.Vector.sub(this.node_Larm_E[0][j], this.node_Larm[0]).mult(1.1).add(this.node_Larm[0]);
      vertex(nl.x, nl.y, nl.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Rarm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rarm_E[0][j], this.node_Rarm[0]).mult(1.1).add(this.node_Rarm[0]);
      vertex(nr.x, nr.y, nr.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Larm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Larm_E[this.node_Larm_E.length-1][j], this.node_Larm[this.node_Larm.length-1]).mult(1.2).add(this.node_Larm[this.node_Larm.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    endShape(CLOSE);
    beginShape();
    for (let j=0; j<this.node_Rarm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rarm_E[this.node_Rarm_E.length-1][j], this.node_Rarm[this.node_Rarm.length-1]).mult(1.2).add(this.node_Rarm[this.node_Rarm.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    endShape(CLOSE);

    beginShape(POINTS);
    for (let j=0; j<this.node_body_E[0].length; j++) {
      let n = p5.Vector.sub(this.node_body_E[0][j], this.node_body[0]).mult(1.05).add(this.node_body[0]);
      vertex(n.x, n.y, n.z);
    }
    for (let j=0; j<this.node_Lleg_E[0].length; j++) {
      let nl = p5.Vector.sub(this.node_Lleg_E[this.node_Lleg_E.length-1][j], this.node_Lleg[this.node_Lleg_E.length-1]).mult(1.2).add(this.node_Lleg[this.node_Lleg_E.length-1]);
      vertex(nl.x, nl.y, nl.z);
    }
    for (let j=0; j<this.node_Rleg_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rleg_E[this.node_Rleg_E.length-1][j], this.node_Rleg[this.node_Rleg_E.length-1]).mult(1.2).add(this.node_Rleg[this.node_Lleg_E.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    for (let j=0; j<this.node_Larm_E[0].length; j++) {
      let nl = p5.Vector.sub(this.node_Larm_E[0][j], this.node_Larm[0]).mult(1.1).add(this.node_Larm[0]);
      vertex(nl.x, nl.y, nl.z);
    }
    for (let j=0; j<this.node_Rarm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rarm_E[0][j], this.node_Rarm[0]).mult(1.1).add(this.node_Rarm[0]);
      vertex(nr.x, nr.y, nr.z);
    }
    for (let j=0; j<this.node_Larm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Larm_E[this.node_Larm_E.length-1][j], this.node_Larm[this.node_Larm.length-1]).mult(1.2).add(this.node_Larm[this.node_Larm.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    for (let j=0; j<this.node_Rarm_E[0].length; j++) {
      let nr = p5.Vector.sub(this.node_Rarm_E[this.node_Rarm_E.length-1][j], this.node_Rarm[this.node_Rarm.length-1]).mult(1.2).add(this.node_Rarm[this.node_Rarm.length-1]);
      vertex(nr.x, nr.y, nr.z);
    }
    endShape();






    noStroke();
    fill(255);
    beginShape();
    texture(EAR);
    vertex(this.node_Lear[0].x, this.node_Lear[0].y, this.node_Lear[0].z, 1, 1);
    vertex(this.node_Lear[1].x, this.node_Lear[1].y, this.node_Lear[1].z, 1, 0);
    vertex(this.node_Lear_E[1].x, this.node_Lear_E[1].y, this.node_Lear_E[1].z, 0, 0.25);
    vertex(this.node_Lear_E[0].x, this.node_Lear_E[0].y, this.node_Lear_E[0].z, 0, 0.75);
    endShape(CLOSE);
    fill(255);
    noFill();
    stroke(0);
    strokeWeight(real(1.5));
    beginShape();
    vertex(this.node_Lear[0].x, this.node_Lear[0].y, this.node_Lear[0].z);
    vertex(this.node_Lear[1].x, this.node_Lear[1].y, this.node_Lear[1].z);
    vertex(this.node_Lear_E[1].x, this.node_Lear_E[1].y, this.node_Lear_E[1].z);
    vertex(this.node_Lear_E[0].x, this.node_Lear_E[0].y, this.node_Lear_E[0].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Lear[0].x, this.node_Lear[0].y, this.node_Lear[0].z);
    vertex(this.node_Lear[1].x, this.node_Lear[1].y, this.node_Lear[1].z);
    vertex(this.node_Lear[2].x-real(4), this.node_Lear[2].y, this.node_Lear[2].z);
    vertex(this.node_Lear[3].x-real(2.5), this.node_Lear[3].y, this.node_Lear[3].z);
    endShape(CLOSE);
    fill(255);
    noStroke();
    beginShape();
    vertex(this.node_Lear_E[1].x, this.node_Lear_E[1].y, this.node_Lear_E[1].z);
    vertex(this.node_Lear_E[0].x, this.node_Lear_E[0].y, this.node_Lear_E[0].z);
    vertex(this.node_Lear_E[3].x, this.node_Lear_E[3].y, this.node_Lear_E[3].z);
    vertex(this.node_Lear_E[2].x, this.node_Lear_E[2].y, this.node_Lear_E[2].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Lear_E[3].x, this.node_Lear_E[3].y, this.node_Lear_E[3].z);
    vertex(this.node_Lear_E[2].x, this.node_Lear_E[2].y, this.node_Lear_E[2].z);
    vertex(this.node_Lear[2].x, this.node_Lear[2].y, this.node_Lear[2].z);
    vertex(this.node_Lear[3].x, this.node_Lear[3].y, this.node_Lear[3].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Lear[0].x, this.node_Lear[0].y, this.node_Lear[0].z);
    vertex(this.node_Lear_E[0].x, this.node_Lear_E[0].y, this.node_Lear_E[0].z);
    vertex(this.node_Lear_E[3].x, this.node_Lear_E[3].y, this.node_Lear_E[3].z);
    vertex(this.node_Lear[3].x, this.node_Lear[3].y, this.node_Lear[3].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Lear[1].x, this.node_Lear[1].y, this.node_Lear[1].z);
    vertex(this.node_Lear_E[1].x, this.node_Lear_E[1].y, this.node_Lear_E[1].z);
    vertex(this.node_Lear_E[2].x, this.node_Lear_E[2].y, this.node_Lear_E[2].z);
    vertex(this.node_Lear[2].x, this.node_Lear[2].y, this.node_Lear[2].z);
    endShape(CLOSE);


    noStroke();
    fill(255);
    beginShape();
    texture(EAR);
    vertex(this.node_Rear[0].x, this.node_Rear[0].y, this.node_Rear[0].z, 1, 1);
    vertex(this.node_Rear[1].x, this.node_Rear[1].y, this.node_Rear[1].z, 1, 0);
    vertex(this.node_Rear_E[1].x, this.node_Rear_E[1].y, this.node_Rear_E[1].z, 0, 0.25);
    vertex(this.node_Rear_E[0].x, this.node_Rear_E[0].y, this.node_Rear_E[0].z, 0, 0.75);
    endShape(CLOSE);
    fill(255);
    noFill();
    stroke(0);
    strokeWeight(real(1.5));
    beginShape();
    vertex(this.node_Rear[0].x, this.node_Rear[0].y, this.node_Rear[0].z);
    vertex(this.node_Rear[1].x, this.node_Rear[1].y, this.node_Rear[1].z);
    vertex(this.node_Rear_E[1].x, this.node_Rear_E[1].y, this.node_Rear_E[1].z);
    vertex(this.node_Rear_E[0].x, this.node_Rear_E[0].y, this.node_Rear_E[0].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Rear[0].x, this.node_Rear[0].y, this.node_Rear[0].z);
    vertex(this.node_Rear[1].x, this.node_Rear[1].y, this.node_Rear[1].z);
    vertex(this.node_Rear[2].x+real(4), this.node_Rear[2].y, this.node_Rear[2].z);
    vertex(this.node_Rear[3].x+real(2.5), this.node_Rear[3].y, this.node_Rear[3].z);
    endShape(CLOSE);
    fill(255);
    noStroke();
    beginShape();
    vertex(this.node_Rear_E[1].x, this.node_Rear_E[1].y, this.node_Rear_E[1].z);
    vertex(this.node_Rear_E[0].x, this.node_Rear_E[0].y, this.node_Rear_E[0].z);
    vertex(this.node_Rear_E[3].x, this.node_Rear_E[3].y, this.node_Rear_E[3].z);
    vertex(this.node_Rear_E[2].x, this.node_Rear_E[2].y, this.node_Rear_E[2].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Rear_E[3].x, this.node_Rear_E[3].y, this.node_Rear_E[3].z);
    vertex(this.node_Rear_E[2].x, this.node_Rear_E[2].y, this.node_Rear_E[2].z);
    vertex(this.node_Rear[2].x, this.node_Rear[2].y, this.node_Rear[2].z);
    vertex(this.node_Rear[3].x, this.node_Rear[3].y, this.node_Rear[3].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Rear[0].x, this.node_Rear[0].y, this.node_Rear[0].z);
    vertex(this.node_Rear_E[0].x, this.node_Rear_E[0].y, this.node_Rear_E[0].z);
    vertex(this.node_Rear_E[3].x, this.node_Rear_E[3].y, this.node_Rear_E[3].z);
    vertex(this.node_Rear[3].x, this.node_Rear[3].y, this.node_Rear[3].z);
    endShape(CLOSE);
    beginShape();
    vertex(this.node_Rear[1].x, this.node_Rear[1].y, this.node_Rear[1].z);
    vertex(this.node_Rear_E[1].x, this.node_Rear_E[1].y, this.node_Rear_E[1].z);
    vertex(this.node_Rear_E[2].x, this.node_Rear_E[2].y, this.node_Rear_E[2].z);
    vertex(this.node_Rear[2].x, this.node_Rear[2].y, this.node_Rear[2].z);
    endShape(CLOSE);
  };








  this.displayInfo = function() {
    stroke(160);
    strokeWeight(real(3));
    beginShape(POINTS);
    for (let i=0; i<this.node_body.length; i++) {
      vertex(this.node_body[i].x, this.node_body[i].y, this.node_body[i].z);
    }
    for (let i=0; i<this.node_head.length; i++) {
      vertex(this.node_head[i].x, this.node_head[i].y, this.node_head[i].z);
    }
    for (let i=0; i<this.node_Lleg.length; i++) {
      vertex(this.node_Lleg[i].x, this.node_Lleg[i].y, this.node_Lleg[i].z);
      vertex(this.node_Rleg[i].x, this.node_Rleg[i].y, this.node_Rleg[i].z);
    }
    for (let i=0; i<this.node_Lshoe.length; i++) {
      vertex(this.node_Lshoe[i].x, this.node_Lshoe[i].y, this.node_Lshoe[i].z);
      vertex(this.node_Rshoe[i].x, this.node_Rshoe[i].y, this.node_Rshoe[i].z);
    }
    for (let i=0; i<this.node_Larm.length; i++) {
      vertex(this.node_Larm[i].x, this.node_Larm[i].y, this.node_Larm[i].z);
      vertex(this.node_Rarm[i].x, this.node_Rarm[i].y, this.node_Rarm[i].z);
    }
    for (let i=0; i<this.node_Lhand.length; i++) {
      vertex(this.node_Lhand[i].x, this.node_Lhand[i].y, this.node_Lhand[i].z);
      vertex(this.node_Rhand[i].x, this.node_Rhand[i].y, this.node_Rhand[i].z);
    }
    for (let i=0; i<this.node_gun.length; i++) {
      vertex(this.node_gun[i].x, this.node_gun[i].y, this.node_gun[i].z);
    }
    for (let i=0; i<this.node_Dgun.length; i++) {
      vertex(this.node_Dgun[i].x, this.node_Dgun[i].y, this.node_Dgun[i].z);
    }
    for (let i=0; i<this.node_Lear.length; i++) {
      vertex(this.node_Lear[i].x, this.node_Lear[i].y, this.node_Lear[i].z);
      vertex(this.node_Rear[i].x, this.node_Rear[i].y, this.node_Rear[i].z);
    }
    endShape();


    strokeWeight(real(1.5));
    beginShape();
    for (let i=0; i<this.node_body.length; i++) {
      vertex(this.node_body[i].x, this.node_body[i].y, this.node_body[i].z);
    }
    for (let i=0; i<this.node_head.length; i++) {
      vertex(this.node_head[i].x, this.node_head[i].y, this.node_head[i].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_Lleg.length; i++) {
      vertex(this.node_Lleg[i].x, this.node_Lleg[i].y, this.node_Lleg[i].z);
    }
    for (let i=0; i<this.node_Lshoe.length; i++) {
      vertex(this.node_Lshoe[i].x, this.node_Lshoe[i].y, this.node_Lshoe[i].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_Rleg.length; i++) {
      vertex(this.node_Rleg[i].x, this.node_Rleg[i].y, this.node_Rleg[i].z);
    }
    for (let i=0; i<this.node_Rshoe.length; i++) {
      vertex(this.node_Rshoe[i].x, this.node_Rshoe[i].y, this.node_Rshoe[i].z);
    }
    endShape();
    beginShape(LINES);
    vertex(this.node_Lleg[0].x, this.node_Lleg[0].y, this.node_Lleg[0].z);
    vertex(this.node_Rleg[0].x, this.node_Rleg[0].y, this.node_Rleg[0].z);
    vertex(this.node_Larm[0].x, this.node_Larm[0].y, this.node_Larm[0].z);
    vertex(this.node_Rarm[0].x, this.node_Rarm[0].y, this.node_Rarm[0].z);
    vertex(this.node_Dgun[0].x, this.node_Dgun[0].y, this.node_Dgun[0].z);
    vertex(this.node_Dgun[1].x, this.node_Dgun[1].y, this.node_Dgun[1].z);
    endShape();
    beginShape();
    for (let i=0; i<this.node_Larm.length; i++) {
      vertex(this.node_Larm[i].x, this.node_Larm[i].y, this.node_Larm[i].z);
    }
    for (let i=0; i<this.node_Lhand.length; i++) {
      vertex(this.node_Lhand[i].x, this.node_Lhand[i].y, this.node_Lhand[i].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_Rarm.length; i++) {
      vertex(this.node_Rarm[i].x, this.node_Rarm[i].y, this.node_Rarm[i].z);
    }
    for (let i=0; i<this.node_Rhand.length; i++) {
      vertex(this.node_Rhand[i].x, this.node_Rhand[i].y, this.node_Rhand[i].z);
    }
    endShape();
    beginShape();
    for (let i=0; i<this.node_gun.length; i++) {
      vertex(this.node_gun[i].x, this.node_gun[i].y, this.node_gun[i].z);
    }
    endShape();
    beginShape();
    for (let i=1; i<this.node_Lear.length+1; i++) {
      vertex(this.node_Lear[i%this.node_Lear.length].x, this.node_Lear[i%this.node_Lear.length].y, this.node_Lear[i%this.node_Lear.length].z);
    }
    endShape();
    beginShape();
    for (let i=1; i<this.node_Rear.length+1; i++) {
      vertex(this.node_Rear[i%this.node_Rear.length].x, this.node_Rear[i%this.node_Rear.length].y, this.node_Rear[i%this.node_Rear.length].z);
    }
    endShape();





    strokeWeight(real(2));
    beginShape(POINTS);
    /*for (let i=0; i<this.node_body_E.length; i++) {
     for (let j=0; j<this.node_body_E[i].length; j++) {
     vertex(this.node_body_E[i][j].x, this.node_body_E[i][j].y, this.node_body_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_head_E.length; i++) {
     for (let j=0; j<this.node_head_E[i].length; j++) {
     vertex(this.node_head_E[i][j].x, this.node_head_E[i][j].y, this.node_head_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_Lleg_E.length; i++) {
     for (let j=0; j<this.node_Lleg_E[i].length; j++) {
     vertex(this.node_Lleg_E[i][j].x, this.node_Lleg_E[i][j].y, this.node_Lleg_E[i][j].z);
     vertex(this.node_Rleg_E[i][j].x, this.node_Rleg_E[i][j].y, this.node_Rleg_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_Lshoe_E.length; i++) {
     for (let j=0; j<this.node_Lshoe_E[i].length; j++) {
     vertex(this.node_Lshoe_E[i][j].x, this.node_Lshoe_E[i][j].y, this.node_Lshoe_E[i][j].z);
     vertex(this.node_Rshoe_E[i][j].x, this.node_Rshoe_E[i][j].y, this.node_Rshoe_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_Lshoe_D.length; i++) {
     for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
     vertex(this.node_Lshoe_D[i][j].x, this.node_Lshoe_D[i][j].y, this.node_Lshoe_D[i][j].z);
     vertex(this.node_Rshoe_D[i][j].x, this.node_Rshoe_D[i][j].y, this.node_Rshoe_D[i][j].z);
     }
     }
     
     for (let i=0; i<this.node_Rarm.length; i++) {
     for (let j=0; j<this.node_Rarm_E[i].length; j++) {
     vertex(this.node_Larm_E[i][j].x, this.node_Larm_E[i][j].y, this.node_Larm_E[i][j].z);
     vertex(this.node_Rarm_E[i][j].x, this.node_Rarm_E[i][j].y, this.node_Rarm_E[i][j].z);
     }
     }
     
     for (let i=0; i<this.node_Lhand.length; i++) {
     for (let j=0; j<this.node_Lhand_E[i].length; j++) {
     vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
     vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_Rhand.length; i++) {
     for (let j=0; j<this.node_Rhand_E[i].length; j++) {
     vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
     vertex(this.node_Rhand_E[i][j].x, this.node_Rhand_E[i][j].y, this.node_Rhand_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_gun.length; i++) {
     for (let j=0; j<this.node_gun_E[i].length; j++) {
     vertex(this.node_gun_E[i][j].x, this.node_gun_E[i][j].y, this.node_gun_E[i][j].z);
     }
     }
     for (let i=0; i<this.node_Dgun.length; i++) {
     for (let j=0; j<this.node_Dgun_E[i].length; j++) {
     vertex(this.node_Dgun_E[i][j].x, this.node_Dgun_E[i][j].y, this.node_Dgun_E[i][j].z);
     }
     }
     
     for (let i=0; i<this.node_Lear_E.length; i++) {
     vertex(this.node_Lear_E[i].x, this.node_Lear_E[i].y, this.node_Lear_E[i].z);
     vertex(this.node_Rear_E[i].x, this.node_Rear_E[i].y, this.node_Rear_E[i].z);
     }*/
    endShape();



    noFill();
    stroke(200);
    strokeWeight(real(0.75));
    for (let i=0; i<this.node_body_E.length; i++) {
      beginShape();
      for (let j=0; j<this.node_body_E[i].length; j++) {
        vertex(this.node_body_E[i][j].x, this.node_body_E[i][j].y, this.node_body_E[i][j].z);
      }
      endShape(CLOSE);
    }

    for (let i=0; i<this.node_head_E.length; i++) {
      beginShape();
      for (let j=0; j<this.node_head_E[i].length; j++) {
        vertex(this.node_head_E[i][j].x, this.node_head_E[i][j].y, this.node_head_E[i][j].z);
      }
      endShape(CLOSE);
    }

    for (let j=0; j<this.node_body_E[0].length; j++) {
      beginShape();
      for (let i=0; i<this.node_body_E.length; i++) {
        vertex(this.node_body_E[i][j].x, this.node_body_E[i][j].y, this.node_body_E[i][j].z);
      }
      for (let i=0; i<this.node_head_E.length; i++) {
        vertex(this.node_head_E[i][j].x, this.node_head_E[i][j].y, this.node_head_E[i][j].z);
      }
      endShape();
    }


    for (let j=0; j<this.node_Lleg_E[0].length; j++) {
      beginShape();
      for (let i=0; i<this.node_Lleg_E.length; i++) {
        vertex(this.node_Lleg_E[i][j].x, this.node_Lleg_E[i][j].y, this.node_Lleg_E[i][j].z);
      }
      for (let i=0; i<this.node_Lshoe_E.length; i++) {
        vertex(this.node_Lshoe_E[i][j].x, this.node_Lshoe_E[i][j].y, this.node_Lshoe_E[i][j].z);
      }
      endShape();
    }
    for (let j=0; j<this.node_Rleg_E[0].length; j++) {
      beginShape();
      for (let i=0; i<this.node_Rleg_E.length; i++) {
        vertex(this.node_Rleg_E[i][j].x, this.node_Rleg_E[i][j].y, this.node_Rleg_E[i][j].z);
      }
      for (let i=0; i<this.node_Rshoe_E.length; i++) {
        vertex(this.node_Rshoe_E[i][j].x, this.node_Rshoe_E[i][j].y, this.node_Rshoe_E[i][j].z);
      }
      endShape();
    }
    beginShape();
    for (let j=0; j<this.node_Lshoe_E[1].length; j++) {
      vertex(this.node_Lshoe_E[1][j].x, this.node_Lshoe_E[1][j].y, this.node_Lshoe_E[1][j].z);
    }
    endShape(CLOSE);

    for (let i=0; i<this.node_Rleg.length; i++) {
      beginShape();
      for (let j=0; j<this.node_Rleg_E[i].length; j++) {
        vertex(this.node_Lleg_E[i][j].x, this.node_Lleg_E[i][j].y, this.node_Lleg_E[i][j].z);
      }
      endShape(CLOSE);
      beginShape();
      for (let j=0; j<this.node_Rleg_E[i].length; j++) {
        vertex(this.node_Rleg_E[i][j].x, this.node_Rleg_E[i][j].y, this.node_Rleg_E[i][j].z);
      }
      endShape(CLOSE);
    }
    for (let i=0; i<this.node_Lshoe_D.length; i++) {
      beginShape();
      for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
        vertex(this.node_Lshoe_D[i][j].x, this.node_Lshoe_D[i][j].y, this.node_Lshoe_D[i][j].z);
      }
      endShape();
    }
    for (let i=0; i<this.node_Lshoe_D.length; i++) {
      beginShape();
      for (let j=0; j<this.node_Lshoe_D[i].length; j++) {
        vertex(this.node_Rshoe_D[i][j].x, this.node_Rshoe_D[i][j].y, this.node_Rshoe_D[i][j].z);
      }
      endShape();
    }
    beginShape();
    for (let j=0; j<this.node_Rshoe_E[1].length; j++) {
      vertex(this.node_Rshoe_E[1][j].x, this.node_Rshoe_E[1][j].y, this.node_Rshoe_E[1][j].z);
    }
    endShape(CLOSE);

    beginShape(LINES);
    for (let j=0; j<this.node_Lshoe_D[0].length; j++) {
      vertex(this.node_Lshoe_D[0][j].x, this.node_Lshoe_D[0][j].y, this.node_Lshoe_D[0][j].z);
      vertex(this.node_Lshoe_D[1][j].x, this.node_Lshoe_D[1][j].y, this.node_Lshoe_D[1][j].z);
    }
    for (let j=0; j<this.node_Rshoe_D[0].length; j++) {
      vertex(this.node_Rshoe_D[0][j].x, this.node_Rshoe_D[0][j].y, this.node_Rshoe_D[0][j].z);
      vertex(this.node_Rshoe_D[1][j].x, this.node_Rshoe_D[1][j].y, this.node_Rshoe_D[1][j].z);
    }
    endShape();


    for (let j=0; j<this.node_Larm_E[0].length; j++) {
      beginShape();
      for (let i=0; i<this.node_Larm_E.length; i++) {
        vertex(this.node_Larm_E[i][j].x, this.node_Larm_E[i][j].y, this.node_Larm_E[i][j].z);
      }
      for (let i=0; i<this.node_Lhand_E.length; i++) {
        vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
      }
      endShape();
    }
    for (let j=0; j<this.node_Rarm_E[0].length; j++) {
      beginShape();
      for (let i=0; i<this.node_Rarm_E.length; i++) {
        vertex(this.node_Rarm_E[i][j].x, this.node_Rarm_E[i][j].y, this.node_Rarm_E[i][j].z);
      }
      for (let i=0; i<this.node_Rhand_E.length; i++) {
        vertex(this.node_Rhand_E[i][j].x, this.node_Rhand_E[i][j].y, this.node_Rhand_E[i][j].z);
      }
      endShape();
    }
    for (let i=0; i<this.node_Rarm.length; i++) {
      beginShape();
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        vertex(this.node_Larm_E[i][j].x, this.node_Larm_E[i][j].y, this.node_Larm_E[i][j].z);
      }
      endShape(CLOSE);
      beginShape();
      for (let j=0; j<this.node_Rarm_E[i].length; j++) {
        vertex(this.node_Rarm_E[i][j].x, this.node_Rarm_E[i][j].y, this.node_Rarm_E[i][j].z);
      }
      endShape(CLOSE);
    }
    for (let i=0; i<this.node_Rhand.length; i++) {
      beginShape();
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        vertex(this.node_Lhand_E[i][j].x, this.node_Lhand_E[i][j].y, this.node_Lhand_E[i][j].z);
      }
      endShape(CLOSE);
      beginShape();
      for (let j=0; j<this.node_Rhand_E[i].length; j++) {
        vertex(this.node_Rhand_E[i][j].x, this.node_Rhand_E[i][j].y, this.node_Rhand_E[i][j].z);
      }
      endShape(CLOSE);
    }
  };
}
//@funnysandwich