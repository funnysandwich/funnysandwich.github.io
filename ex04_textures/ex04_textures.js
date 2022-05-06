/*
 * @name Textures
 * @description Images and videos are supported for texture.
 */
// video source: https://vimeo.com/90312869
let img;
let vid;
let theta = 0;

function setup() {
  createCanvas(710, 400, WEBGL);

  img = loadImage('data/cat.jpg');
  vid = createVideo(['data/360video_256crop_v2.mp4']);
  vid.elt.muted = true;
  vid.loop();
  vid.hide();
}

function draw() {
  background(250);
  translate(-220, 0, 0);
  push();
  rotateZ(theta * mouseX * 0.001);
  rotateX(theta * mouseX * 0.001);
  rotateY(theta * mouseX * 0.001);
  //pass image as texture
  texture(vid);
  sphere(150);
  pop();
  translate(440, 0, 0);
  push();
  rotateZ(theta * 0.1);
  rotateX(theta * 0.1);
  rotateY(theta * 0.1);
  
  //box(100, 100, 100);
  fill(255);
  beginShape();
  texture(img);
  vertex(-100,-100,0,0,0);
  vertex(100,-100,0,1,0);
  vertex(100,100,0,1,1);
  vertex(-100,100,0,0,1);
  endShape(CLOSE);
  fill(255);
  pop();
  theta += 0.05;
}
