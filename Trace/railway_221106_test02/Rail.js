function Rail(begin, end) {
  this.begin = begin.copy();
  this.end = end.copy();


  this.W = real(250);
  this.node_l = new Array(2);
  this.node_r = new Array(2);

  let X = map(noise(frameCount*0.005), 0, 1, -real(1000), real(1000)) * 0.1;
  this.node_l[0] = this.begin.copy().add(-this.W/2.0+X, 0, 0);
  this.node_l[1] = this.end.copy().add(-this.W/2.0, 0, 0);
  this.node_r[0] = this.begin.copy().add(this.W/2.0+X, 0, 0);
  this.node_r[1] = this.end.copy().add(this.W/2.0, 0, 0);



  this.railBar = [];
  this.railBar.push(new RailBar(this.node_l[0], this.node_l[1], this.node_r[0], this.node_r[1], 0, 0));
  this.count_railBar = 1;





  this.update = function() {

    let X = map(noise(frameCount*0.005), 0, 1, -real(1000), real(1000));
    if (frameCount < 60) {
      X *= max(map(frameCount, 30, 60, 0.1, 1), 0.1);
    }
    this.node_l[0] = this.begin.copy().add(-this.W/2.0+X, 0, 0);
    this.node_l[1] = this.end.copy().add(-this.W/2.0, 0, 0);
    this.node_r[0] = this.begin.copy().add(this.W/2.0+X, 0, 0);
    this.node_r[1] = this.end.copy().add(this.W/2.0, 0, 0);






    if (this.railBar.length > 0) {
      if (this.railBar[this.railBar.length-1].life - Z_beginLine  >  real(150)) {
        let i = this.railBar.length-1;
        this.railBar.push(new RailBar(this.node_l[0], this.node_l[1], this.node_r[0], this.node_r[1], i, this.count_railBar));
        this.count_railBar += 1;
      }


      for (let i=0; i<this.railBar.length; i++) {

        this.railBar[i].update(i);
        if (i > 0) {
          for (let j=0; j<this.railBar[i].node_l_ver.length; j++) {
            this.railBar[i].node_l_ver[j][1] = this.railBar[i-1].node_l_ver[j][0].copy();
            this.railBar[i].node_r_ver[j][1] = this.railBar[i-1].node_r_ver[j][0].copy();
          }
        }
      }
    }


    if (this.railBar.length > 0) {
      for (let i=0; i<this.railBar.length; i++) {
        if (this.railBar[i].dead) {
          this.railBar.splice(i, 1);
        }
      }
    }







    for (let i=0; i<this.node_l.length; i++) {
      this.node_l[i] = PRotateX(this.node_l[i], roX);
      this.node_r[i] = PRotateX(this.node_r[i], roX);
      this.node_l[i].add(0, tranY, tranZ);
      this.node_r[i].add(0, tranY, tranZ);
    }



    if (this.railBar.length > 0) {
      for (let i=0; i<this.railBar.length; i++) {
        this.railBar[i].update_rotate();
      }
    }
  };







  this.display = function() {
    let c1, c2;
    let w_ran = real(40);
    for (let i=0; i<10; i++) {
      c1 = color(255);
      c2 = color(0);
      //TRIANGLES_getLine_weight_fill2(this.node_l[0].copy().add(map(noise(i+383+frameCount*0.01), 0, 1, -w_ran/2.0, w_ran/2.0), map(noise(i-33+frameCount*0.01), 0, 1, -w_ran, 0), 0), this.node_l[1].copy().add(map(noise(i+955+frameCount*0.01), 0, 1, -w_ran/2.0, w_ran/2.0), map(noise(i+124+frameCount*0.01), 0, 1, -w_ran, 0), 0), real(1), c1, c2);
      //TRIANGLES_getLine_weight_fill2(this.node_r[0].copy().add(map(noise(i+3+frameCount*0.01), 0, 1, -w_ran/2.0, w_ran/2.0), map(noise(i+111+frameCount*0.01), 0, 1, -w_ran, 0), 0), this.node_r[1].copy().add(map(noise(i+444+frameCount*0.01), 0, 1, -w_ran/2.0, w_ran/2.0), map(noise(i+666+frameCount*0.01), 0, 1, -w_ran, 0), 0), real(1), c1, c2);
    }

    if (this.railBar.length > 0) {
      for (let i=0; i<this.railBar.length; i++) {
        this.railBar[i].display();
      }
    }
  };







  this.displayInfo = function() {
    LINES_getLine(this.node_l[0], this.node_l[1]);
    LINES_getLine(this.node_r[0], this.node_r[1]);


    if (this.railBar.length > 0) {
      for (let i=0; i<this.railBar.length; i++) {
        this.railBar[i].displayInfo();
      }
    }
  };
}
