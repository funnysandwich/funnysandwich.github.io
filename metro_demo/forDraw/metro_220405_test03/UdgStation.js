function UdgStation() {
  this.node_wall = new Array(4);
  this.node_wall[0] = createVector(-real(300), real(200), 0);
  this.node_wall[1] = createVector(real(300), real(250), 0);
  this.node_wall[2] = createVector(real(300), real(1000), 0);
  this.node_wall[3] = createVector(-real(300), real(1000), 0);


  this.udgPoster = [];
  this.udgPoster.push(new UdgPoster(real(random(100, 500)), createVector(real(random(200, 500)), real(700), real(2))));
  for (let i=0; i<3; i++) {
    let w = real(random(250, 500));
    let x = this.udgPoster[i].center.x-this.udgPoster[i].W/2.0 - real(200) - w/2.0;
    this.udgPoster.push(new UdgPoster(w, createVector(x, real(700), real(2))));
  }




  this.num_light = 1;
  this.node_light = Array.from(Array(this.num_light), () => new Array(6));
  this.center_light = new Array(this.num_light);
  this.begin_light = createVector(-real(300), real(800), real(1));
  this.end_light = createVector(real(300), real(800), real(1));
  for (let i=0; i<this.node_light.length; i++) {
    this.center_light[i] = this.begin_light.copy();
    let x_move = this.udgPoster[this.udgPoster.length-1].center.x - this.udgPoster[this.udgPoster.length-1].W/2.0 - (i+1)*real(400);
    for (let j=0; j<this.node_light[i].length; j++) {
      let x = cos(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * real(10);
      let y = sin(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * real(5);
      this.node_light[i][j] = createVector(x_move + x, y, 0).add(this.center_light[i]);
    }
  }





  this.change = function() {
  };





  this.update = function() {
    this.node_wall[1].y = map(constrain(cameraY, -real(300), 0), -real(300), 0, real(250), real(200));




    if (this.udgPoster.length > 0) {
      for (let i=0; i<this.udgPoster.length; i++) {
        this.udgPoster[i].update();
      }
      for (let i=0; i<this.udgPoster.length; i++) {
        if (this.udgPoster[i].dead) {
          this.udgPoster.splice(i, 1);
        }
      }
    } else {

      if (cameraY < -real(200)) {


        this.begin_light.y = map(cameraY, real(-800), 0, real(800), real(160));
        this.end_light.y = map(cameraY, real(-800), 0, real(800), real(160+100));

        for (let i=0; i<this.node_light.length; i++) {
          this.center_light[i].x += speed;
          if (this.center_light[i].x > this.end_light.x) {
            this.center_light[i].x = this.begin_light.x;
          }
          let t_y = constrain(map(this.center_light[i].x, this.begin_light.x, this.end_light.x, 0, 1), 0, 1);

          this.center_light[i].y = lerp(this.begin_light.y, this.end_light.y, t_y);
          for (let j=0; j<this.node_light[i].length; j++) {
            let x = cos(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * real(10);
            let y = sin(map(j, 0, this.node_light[i].length, 0, TWO_PI)) * real(5);
            this.node_light[i][j] = createVector(x, y, 0).add(this.center_light[i]);
          }
        }
      }
    }
  };















  this.display = function() {
    if (cameraY < -real(10)) {
      if (state_click != 1) {
        fill(lerpColor(c_near, c_winFrame, 0.75));
      } else {
        fill(lerpColor(c_near_copy, c_winFrame, 0.75));
      }
      noStroke();
      beginShape();
      for (let i=0; i<this.node_wall.length; i++) {
        vertex(this.node_wall[i].x, this.node_wall[i].y, this.node_wall[i].z);
      }
      endShape(CLOSE);


      if (this.udgPoster.length > 0) {
        for (let i=0; i<this.udgPoster.length; i++) {
          this.udgPoster[i].display();
        }
      }



      noStroke();
      fill(lerpColor(c_near, c_far, 0.2));
      for (let i=0; i<this.node_light.length; i++) {
        beginShape();
        for (let j=0; j<this.node_light[i].length; j++) {
          vertex(this.node_light[i][j].x, this.node_light[i][j].y, this.node_light[i][j].z);
        }
        endShape(CLOSE);
      }
    }
  };















  this.displayInfo = function() {

    //noFill();
    //strokeWeight(real(1));
    //stroke(c_info2);
    //beginShape();
    for (let i=0; i<this.node_wall.length; i++) {
      //vertex(this.node_wall[i].x, this.node_wall[i].y, this.node_wall[i].z);
      LINES_getLine(this.node_wall[i], this.node_wall[(i+1)%this.node_wall.length]);
    }
    //endShape(CLOSE);



    if (this.udgPoster.length > 0) {
      for (let i=0; i<this.udgPoster.length; i++) {
        this.udgPoster[i].displayInfo();
      }
    }


    if (cameraY < -real(200)) {

      //noFill();
      //strokeWeight(real(1));
      //stroke(c_info2);
      for (let i=0; i<this.node_light.length; i++) {
        //beginShape();
        for (let j=0; j<this.node_light[i].length; j++) {
          //vertex(this.node_light[i][j].x, this.node_light[i][j].y, this.node_light[i][j].z);
          LINES_getLine(this.node_light[i][j], this.node_light[i][(j+1)%this.node_light[i].length]);
        }
        //endShape(CLOSE);
      }
    }
  };
}
