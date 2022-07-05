function LightRail(index_z) {
  this.index_z = index_z;
  this.W_target = abs(beginLine - endLine);
  this.W = this.W_target;
  this.D = real(100)*4.0;
  this.H = real(55);
  this.node_center = createVector(0, skyline.y-H_pier[this.index_z], -(real(100)*5/2.0 + this.index_z*(real(100)*5+gap_block)));

  this.var_easing1 = random(0.075, 0.175)*0.45;



  this.node_ground = Array.from(Array(2), () => new Array(4));
  for (let i=0; i<this.node_ground.length; i++) {
    for (let j=0; j<this.node_ground[i].length; j++) {
      this.node_ground[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), -this.H*i, this.D/2.0 * pow(-1, floor(j/2)+1));
      this.node_ground[i][j].add(this.node_center);
    }
  }




  this.node_rail = new Array(5);
  for (let i=0; i<this.node_rail.length; i++) {
    let x = map(i, 0, this.node_rail.length, -real(1000), real(1000));
    this.node_rail[i] = createVector(x, -real(0.1), -this.D*0.3).add(this.node_center);
  }






  this.wait_train = 0;
  this.wait_max_train = floor(random(30, 200));
  this.ready_open_createTrain = true;
  this.train = [];







  this.change = function() {
    this.W = 0;
    this.H = real(55);
    this.var_easing1 = random(0.075, 0.175)*0.45;



    if (this.train.length > 0) {
      for (let i=0; i<this.train.length; i++) {
        this.train[i].change();
      }
    }
  };














  this.update = function() {
    this.W = easing_x(this.W, this.W_target, this.var_easing1);
    this.node_center.y = skyline.y-H_pier[this.index_z];


    for (let i=0; i<this.node_ground.length; i++) {
      for (let j=0; j<this.node_ground[i].length; j++) {
        this.node_ground[i][j] = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), -this.H*i, this.D/2.0 * pow(-1, floor(j/2)+1));
        this.node_ground[i][j].add(this.node_center);
      }
    }

    for (let i=0; i<this.node_rail.length; i++) {
      this.node_rail[i].x += speed;
      if (this.node_rail[i].x > real(1000)) {
        this.node_rail[i].x = -real(1000);
      }
    }
    if (this.index_z == 0) {
      this.node_ground[1][3].add(0, real(12), 0);
      this.node_ground[1][2].add(0, real(12), 0);
    }







    if (this.wait_train < this.wait_max_train) {
      this.wait_train ++;
    } else {
      if (this.ready_open_createTrain) {
        this.ready_open_createTrain = false;
        this.train.push(new Train(createVector(beginLine, this.node_center.y, this.node_center.z), real(random(600, 750)), this.D*0.65, true));
      }
    }





    if (this.train.length > 0) {
      for (let i=0; i<this.train.length; i++) {
        this.train[i].update(this.node_center);
      }
      for (let i=0; i<this.train.length; i++) {
        if (this.train[i].dead) {
          this.train.splice(i, 1);
          this.wait_train = 0;
          this.wait_max_train = floor(random(30, 200));
          this.ready_open_createTrain = true;
        }
      }
    }
  };









  this.display = function() {
    //noStroke();
    let c1, c2;

    //---D---
    //beginShape();
    //t = constrain(map(this.node_ground[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    //vertex(this.node_ground[0][0].x, this.node_ground[0][0].y, this.node_ground[0][0].z);
    //vertex(this.node_ground[0][1].x, this.node_ground[0][1].y, this.node_ground[0][1].z);
    //t = constrain(map(this.node_ground[0][2].z, skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    //vertex(this.node_ground[0][2].x, this.node_ground[0][2].y, this.node_ground[0][2].z);
    //vertex(this.node_ground[0][3].x, this.node_ground[0][3].y, this.node_ground[0][3].z);
    //endShape(CLOSE);
    c1 = lerpColor(c_near, c_far, constrain(map(this.node_ground[0][0].z, skyline.z, 0, 1, 0), 0, 1));
    c2 = lerpColor(c_near, c_far, constrain(map(this.node_ground[0][2].z, skyline.z, 0, 1, 0), 0, 1));
    TRIANGLES_getRect_fill4(this.node_ground[0][0], this.node_ground[0][1], this.node_ground[0][2], this.node_ground[0][3], c1, c1, c2, c2);

    //---F---
    //t = constrain(map(this.node_ground[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    //beginShape();
    //vertex(this.node_ground[1][3].x, this.node_ground[1][3].y, this.node_ground[1][3].z);
    //vertex(this.node_ground[1][2].x, this.node_ground[1][2].y, this.node_ground[1][2].z);
    //vertex(this.node_ground[0][2].x, this.node_ground[0][2].y, this.node_ground[0][2].z);
    //vertex(this.node_ground[0][3].x, this.node_ground[0][3].y, this.node_ground[0][3].z);
    //endShape(CLOSE);
    fill(lerpColor(c_near, c_far, constrain(map(this.node_ground[0][3].z, skyline.z, 0, 1, 0), 0, 1)));
    TRIANGLES_getRect(this.node_ground[1][3], this.node_ground[1][2], this.node_ground[0][2], this.node_ground[0][3]);


    //---B---
    //t = constrain(map(this.node_ground[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    //fill(lerpColor(c_near, c_far, t));
    //beginShape();
    //vertex(this.node_ground[1][0].x, this.node_ground[1][0].y, this.node_ground[1][0].z);
    //vertex(this.node_ground[1][1].x, this.node_ground[1][1].y, this.node_ground[1][1].z);
    //vertex(this.node_ground[0][1].x, this.node_ground[0][1].y, this.node_ground[0][1].z);
    //vertex(this.node_ground[0][0].x, this.node_ground[0][0].y, this.node_ground[0][0].z);
    //endShape(CLOSE);
    fill(lerpColor(c_near, c_far, constrain(map(this.node_ground[0][0].z, skyline.z, 0, 1, 0), 0, 1)));
    TRIANGLES_getRect(this.node_ground[1][0], this.node_ground[1][1], this.node_ground[0][1], this.node_ground[0][0]);



    if (this.index_z == 0) {
      //---rail---
      //noStroke();
      fill(lerpColor(c_near, c_far, 0.15));

      for (let i=0; i<this.node_rail.length; i++) {
        //beginShape();
        //vertex(this.node_rail[i].x, this.node_rail[i].y, this.node_rail[i].z);
        //vertex(this.node_rail[i].x+real(40), this.node_rail[i].y, this.node_rail[i].z);
        //vertex(this.node_rail[i].x+real(40), this.node_rail[i].y, this.node_rail[i].z+this.D*0.6);
        //vertex(this.node_rail[i].x, this.node_rail[i].y, this.node_rail[i].z+this.D*0.6);
        //endShape(CLOSE);
        TRIANGLES_getRect(createVector(this.node_rail[i].x, this.node_center.y-real(0.25), this.node_rail[i].z), 
          createVector(this.node_rail[i].x+real(40), this.node_center.y-real(0.25), this.node_rail[i].z), 
          createVector(this.node_rail[i].x+real(40), this.node_center.y-real(0.25), this.node_rail[i].z+this.D*0.6), 
          createVector(this.node_rail[i].x, this.node_center.y-real(0.25), this.node_rail[i].z+this.D*0.6));
      }

      //beginShape();
      //vertex(this.node_center.x-this.W/2.0, this.node_center.y-real(0.1), this.node_center.z-this.D*0.17);
      //vertex(this.node_center.x+this.W/2.0, this.node_center.y-real(0.1), this.node_center.z-this.D*0.17);
      //vertex(this.node_center.x+this.W/2.0, this.node_center.y-real(0.1), this.node_center.z-this.D*0.17+real(40));
      //vertex(this.node_center.x-this.W/2.0, this.node_center.y-real(0.1), this.node_center.z-this.D*0.17+real(40));
      //endShape(CLOSE);
      TRIANGLES_getRect(
        createVector(this.node_center.x-this.W/2.0, this.node_center.y-real(0.5), this.node_center.z-this.D*0.17), 
        createVector(this.node_center.x+this.W/2.0, this.node_center.y-real(0.5), this.node_center.z-this.D*0.17), 
        createVector(this.node_center.x+this.W/2.0, this.node_center.y-real(0.5), this.node_center.z-this.D*0.17+real(40)), 
        createVector(this.node_center.x-this.W/2.0, this.node_center.y-real(0.5), this.node_center.z-this.D*0.17+real(40)));
    }





    if (this.train.length > 0) {
      for (let i=0; i<this.train.length; i++) {
        this.train[i].display();
      }
    }
  };









  this.displayInfo = function() {
    //noFill();
    //strokeWeight(real(1.5));
    //stroke(c_infoGreen2);
    //beginShape(LINES);
    for (let i=0; i<this.node_ground.length; i++) {
      for (let j=0; j<this.node_ground[i].length; j++) {
        LINES_getLine(this.node_ground[i][j], this.node_ground[i][(j+1)%4]);
      }
    }
    //endShape();






    if (this.train.length > 0) {
      for (let i=0; i<this.train.length; i++) {
        this.train[i].displayInfo();
      }
    }
  };
}