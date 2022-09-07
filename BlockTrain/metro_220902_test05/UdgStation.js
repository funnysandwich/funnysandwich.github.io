function UdgStation() {
  this.node_wall = new Array(4);
  this.node_wall[0] = createVector(-real(300), real(200), 0);
  this.node_wall[1] = createVector(real(300), real(250), 0);
  this.node_wall[2] = createVector(real(300), real(1500), 0);
  this.node_wall[3] = createVector(-real(300), real(1500), 0);



  this.udgPoster = [];




  this.addPoster = function(x_begin) {
    for (let i=0; i<7; i++) {
      let w=0.0, x=0.0;
      let state_poster = floor(random(0, 3));
      if (state_poster == 0) {
        w = real(270);
      } else if (state_poster == 1) {
        w = real(270 / 3.0);
      } else if (state_poster == 2) {
        w = real(270 * 1.5);
      }

      if (i == 0) {
        this.udgPoster.push(new UdgPoster(w, createVector(x_begin, real(800), real(2)), state_poster));
      } else {
        x = this.udgPoster[i-1].center.x-this.udgPoster[i-1].W/2.0 - real(200) - w/2.0;
        this.udgPoster.push(new UdgPoster(w, createVector(x, real(800), real(2)), state_poster));
      }
    }
  };

  this.addPoster(real(random(-50, 150)));


  this.lights = [];






  this.change = function() {
  };





  this.update = function() {
    this.node_wall[0] = createVector(-real(300), real(200), 0);
    this.node_wall[1].y = map(constrain(cameraY, -real(300), 0), -real(300), 0, real(250), real(200));
    if (cameraY > -real(300)) {
      this.node_wall[0].y += constrain(map(cameraY, -real(300), -real(10), 0, real(50)), 0, real(50));
      this.node_wall[1].y += constrain(map(cameraY, -real(300), -real(10), 0, real(50)), 0, real(50));
    }


    if (this.udgPoster.length > 0) {
      for (let i=0; i<this.udgPoster.length; i++) {
        this.udgPoster[i].update();
      }
      for (let i=0; i<this.udgPoster.length; i++) {
        if (this.udgPoster[i].dead) {
          this.udgPoster.splice(i, 1);
        }
      }
    }




    if (mileage > real(1800)  &&  mileage < real(7000)  &&  cameraY < -real(400)  &&  this.udgPoster.length <= 1) {
      if (this.lights.length == 0) {
        this.lights.push(new Light(createVector(-real(300), -cameraY+real(20), real(1)), createVector(real(300), -cameraY+real(20), real(1))));
      }
    }


    if (mileage >= mileage_end-real(1500)  &&  cameraY > -real(400)) {
      if (this.lights.length == 0) {
        this.lights.push(new Light(createVector(-real(300), -cameraY-real(20), real(1)), createVector(real(300), -cameraY+real(20), real(1))));
      }
    }

    if (this.lights.length > 0) {
      for (let i=0; i<this.lights.length; i++) {
        this.lights[i].update();
      }
    }
    if (this.lights.length > 0) {
      for (let i=0; i<this.lights.length; i++) {
        if (this.lights[i].dead) {
          this.lights.splice(i, 1);
        }
      }
    }
    //print(this.lights.length);
  };







  this.display_TRIANGLES = function() {
    if (!have_button_shine) {
      fill(lerpColor(c_near, c_winFrame, 0.75));
    } else {
      fill(lerpColor(c_near_copy, c_winFrame, 0.75));
    }

    TRIANGLES_getRect(this.node_wall[0], this.node_wall[1], this.node_wall[2], this.node_wall[3]);


    fill(lerpColor(c_near, c_far, 0.2));
    if (this.lights.length > 0) {
      for (let i=0; i<this.lights.length; i++) {
        this.lights[i].display();
      }
    }
  };







  this.display = function() {
    if (this.udgPoster.length > 0) {
      for (let i=0; i<this.udgPoster.length; i++) {
        this.udgPoster[i].display();
      }
    }
  };















  this.displayInfo = function() {
    for (let i=0; i<this.node_wall.length; i++) {
      LINES_getLine(this.node_wall[i], this.node_wall[(i+1)%this.node_wall.length]);
    }



    if (this.udgPoster.length > 0) {
      for (let i=0; i<this.udgPoster.length; i++) {
        this.udgPoster[i].displayInfo();
      }
    }



    if (this.lights.length > 0) {
      for (let i=0; i<this.lights.length; i++) {
        this.lights[i].displayInfo();
      }
    }
  };
}







function Light(begin, end) {
  this.center = begin.copy();
  this.dead =false;

  this.node = new Array(6);
  for (let i=0; i<this.node.length; i++) {
    let x = cos(map(i, 0, this.node.length, 0, TWO_PI)) * real(10);
    let y = sin(map(i, 0, this.node.length, 0, TWO_PI)) * real(5);
    this.node[i] = createVector(x, y, 0).add(this.center);
  }


  this.update = function() {
    if (this.center.x <= end.x) {
      this.center.x += speed;
      this.center.y = map(this.center.x, begin.x, end.x, begin.y, end.y);
    } else {
      this.dead = true;
    }
    for (let i=0; i<this.node.length; i++) {
      let x = cos(map(i, 0, this.node.length, 0, TWO_PI)) * real(10);
      let y = sin(map(i, 0, this.node.length, 0, TWO_PI)) * real(5);
      this.node[i] = createVector(x, y, 0).add(this.center);
    }
  };


  this.display = function() {
    TRIANGLES_getShape(this.node);
  };


  this.displayInfo = function() {
    LINES_getEllipse(this.node);
  };
}
