function Sky(begin, end) {
  this.begin = begin.copy().add(map(noise(frameCount*0.005), 0, 1, -real(1000), real(1000))*0.25, 0, 0);
  this.end = end.copy();


  this.num_detail = 5;
  this.L = real(3500);

  this.node_end = new Array(this.num_detail);
  for (let i=0; i<this.node_end.length; i++) {
    let x = cos(map(i, 0, this.node_end.length-1, PI, TWO_PI)) * this.L;
    let y = sin(map(i, 0, this.node_end.length-1, PI, TWO_PI)) * this.L*0.25;
    this.node_end[i] = createVector(x, y, 0).add(this.begin);
  }



  this.aLine = new Array(this.node_end.length-1);
  for (let i=0; i<this.node_end.length-1; i++) {
    this.aLine[i] = [];
    for (let j=0; j<96; j++) {
      this.aLine[i].push(new ALine(this.begin, this.begin, this.node_end[i], this.node_end[i+1], map(j, 0, 96, 0, 1)));
    }
  }












  this.update = function() {
    this.begin = begin.copy().add(map(noise(frameCount*0.005), 0, 1, -real(1000), real(1000))*0.25, 0, 0);
    this.end = end.copy();






    this.begin = PRotateX(this.begin, roX);
    this.end = PRotateX(this.end, roX);

    for (let i=0; i<this.node_end.length; i++) {
      let x = cos(map(i, 0, this.node_end.length-1, PI, TWO_PI)) * this.L;
      let y = sin(map(i, 0, this.node_end.length-1, PI, TWO_PI)) * this.L*0.85;
      this.node_end[i] = createVector(x, y, 0).add(this.begin);
    }






    for (let i=0; i<this.aLine.length; i++) {
      if (frameCount%round(20 / (speed/real(10)*0.5)) == 0) {
        this.aLine[i].push(new ALine(this.begin, this.begin, this.node_end[i], this.node_end[i+1], 0));
      }
    }

    for (let i=0; i<this.aLine.length; i++) {
      if (this.aLine[i].length > 0) {
        for (let j=0; j<this.aLine[i].length; j++) {
          this.aLine[i][j].update(this.begin, this.begin, this.node_end[i], this.node_end[i+1]);
        }
      }

      if (this.aLine[i].length > 0) {
        for (let j=0; j<this.aLine[i].length; j++) {
          if (this.aLine[i][j].dead) {
            this.aLine[i].splice(j, 1);
          }
        }
      }
    }
  };








  this.display = function() {
    for (let i=0; i<this.aLine.length; i++) {
      if (this.aLine[i].length > 0) {
        for (let j=0; j<this.aLine[i].length; j++) {
          this.aLine[i][j].display();
        }
      }
    }
  };



  this.displayInfo = function() {
    for (let i=0; i<this.node_end.length; i++) {
      LINES_getLine(this.node_end[i], this.begin);
    }
    for (let i=0; i<this.aLine.length; i++) {
      if (this.aLine[i].length > 0) {
        for (let j=0; j<this.aLine[i].length; j++) {
          this.aLine[i][j].displayInfo();
        }
      }
    }
  };
}
