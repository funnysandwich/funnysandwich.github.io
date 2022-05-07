let P = new Array(5);
let INFO;

function setup() {
  createCanvas(500, 500, WEBGL);
  INFO = createGraphics(500, 500);
  INFO.background(0, 0);
  INFO.fill(0);
  INFO.noStroke();
  for (let i=0; i<5; i++) {
    let w = floor(map(i, 0, P.length, 1800, 2500));
    let center_x = map(i, 0, P.length-1, -200, 200)+250;
    INFO.text("i:"+i+", "+nfc(w, 2), center_x-40, 300);
  }

  textureMode(NORMAL);

  for (let i=0; i<P.length; i++) {
    let w = floor(map(i, 0, P.length, 1800, 2500));
    P[i] = createGraphics(w, 375*5);
    P[i].background(160, 60, 0);
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
    vertex(center_x-40, -40, -1, 0, 0);
    vertex(center_x+40, -40, -1, 1, 0);
    vertex(center_x+40, 40, -1, 1, 1);
    vertex(center_x-40, 40, -1, 0, 1);

    endShape();
    fill(255);
  }
  image(INFO, -250, -250, 500, 500);
}
