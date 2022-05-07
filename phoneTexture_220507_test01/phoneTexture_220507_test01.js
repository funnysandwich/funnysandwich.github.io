let P = new Array(5);


function setup() {
  createCanvas(500, 500, WEBGL);
  
  textureMode(NORMAL);

  for (let i=0; i<P.length; i++) {
    P[i] = createGraphics(375, 375*(i+1)*2);
    P[i].background(255);
    P[i].fill(255, 0, 0);
    P[i].ellipse(P[i].width/2, P[i].height/2, 300, 300);
  }
}


function draw() {
  background(200);

  for (let i=0; i<P.length; i++) {
    let center_x = map(i, 0, P.length-1, -200, 200);
    fill(255);
    beginShape();
    texture(P[i]);
    vertex(center_x-40, -40, 0, 0, 0);
    vertex(center_x+40, -40, 0, 1, 0);
    vertex(center_x+40, 40, 0, 1, 1);
    vertex(center_x-40, 40, 0, 0, 1);

    endShape();
    fill(255);
  }
}
