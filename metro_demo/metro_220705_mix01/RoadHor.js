function RoadHor(begin, L, W) {
  this.begin = begin.copy();
  this.L = L;
  this.W = W;
  this.W_road = this.W * random(0.4, 0.8);


  this.node_center = this.begin.copy().add(0, real(0.1), -this.W/2.0);

  this.node_road = new Array(4);
  this.node_road[0] = this.node_center.copy().add(-this.L/2.0, 0, -this.W_road/2.0);
  this.node_road[1] = this.node_center.copy().add(this.L/2.0, 0, -this.W_road/2.0);
  this.node_road[2] = this.node_center.copy().add(this.L/2.0, 0, this.W_road/2.0);
  this.node_road[3] = this.node_center.copy().add(-this.L/2.0, 0, this.W_road/2.0);


  this.var_easing1 = random(0.075, 0.125);
  this.var_easing2 = random(0.015, 0.035);
  
  
  
  









  this.change = function() {
    this.W_road = this.W * random(0.4, 0.8);
    this.var_easing1 = random(0.075, 0.125);
    this.var_easing2 = random(0.015, 0.035);


    for (let i=0; i<this.node_road.length; i++) {
      this.node_road[i] = this.node_center.copy().add(0, real(1), 0);
    }
  };







  this.update = function() {


    this.node_road[0].z = this.node_center.z - this.W_road/2.0;
    this.node_road[1].z = this.node_center.z - this.W_road/2.0;
    this.node_road[2].z = this.node_center.z + this.W_road/2.0;
    this.node_road[3].z = this.node_center.z + this.W_road/2.0;


    this.node_road[0].x = easing_x(this.node_road[0].x, this.node_center.x-this.L/2.0, this.var_easing2);
    this.node_road[1].x = easing_x(this.node_road[1].x, this.node_center.x+this.L/2.0, this.var_easing2);
    this.node_road[2].x = easing_x(this.node_road[2].x, this.node_center.x+this.L/2.0, this.var_easing2);
    this.node_road[3].x = easing_x(this.node_road[3].x, this.node_center.x-this.L/2.0, this.var_easing2);
  };










  this.display = function() {
    //if (!open_desert) {
    //  noStroke();
    //  fill(255);
    //  beginShape();
    //  for (let i=0; i<this.node_road.length; i++) {
    //    if (i==0) {
    //      let t_c = constrain(map(this.node_road[0].z, skyline.z, 0, 1, 0), 0, 1);
    //      fill(lerpColor(c_near, c_sky, t_c));
    //    } else if (i==2) {
    //      let t_c = constrain(map(this.node_road[3].z, skyline.z, 0, 1, 0), 0, 1);
    //      fill(lerpColor(c_near, c_sky, t_c));
    //    }
    //    fill(255,0,0);
    //    vertex(this.node_road[i].x, this.node_road[i].y, this.node_road[i].z);
    //  }
    //  endShape(CLOSE);
    //}
  };








  this.displayInfo = function() {
    //noFill();
    //stroke(c_infoGreen);
    //strokeWeight(real(5));
    //beginShape();
    //vertex(this.node_center.x+this.L/2.0, this.node_center.y, this.node_center.z);
    //vertex(this.node_center.x-this.L/2.0, this.node_center.y, this.node_center.z);
    //endShape();

    //strokeWeight(real(2));
    //beginShape();
    for (let i=0; i<this.node_road.length; i++) {
      LINES_getLine(this.node_road[i], this.node_road[(i+1)%this.node_road.length]);
      //vertex(this.node_road[i].x, this.node_road[i].y+real(1), this.node_road[i].z);
    }
    //endShape(CLOSE);
  };
}