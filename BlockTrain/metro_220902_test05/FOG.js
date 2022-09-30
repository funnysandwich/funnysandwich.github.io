function FOG_update() {

  FOG.loadPixels();
  for (let i = 0; i < FOG.width; i++) {
    for (let j = 0; j < FOG.height; j++) {
      //FOG.set(i, j, addAlphaToColor(c_sky, 128));
      const loc = (i + j*FOG.width)*4;
      if (FOG.pixels[loc+3] != 230) {
        FOG.pixels[loc+0] = red(c_sky);
        FOG.pixels[loc+1] = green(c_sky);
        FOG.pixels[loc+2] = blue(c_sky);
        FOG.pixels[loc+3] = easing_x(FOG.pixels[loc+3], 230, 0.01);
      }
    }
  }
  FOG.updatePixels();
}




function FOG_update_wipe() {
  FOG.loadPixels();
  for (let i = 0; i < FOG.width; i++) {
    for (let j = 0; j < FOG.height; j++) {
      //FOG.set(i, j, addAlphaToColor(c_sky, 128));
      const loc = (i + j*FOG.width)*4;
      let d = dist(i, j, map(mouseX, real(65), real(435), 0, FOG.width), map(mouseY, real(65), real(435), 0, FOG.height));
      let a = constrain(d/12, 0, 1);
      a = constrain(map(a, 0, 1, -800, 200), 0, 230);
      if (d <= 12  &&  FOG.pixels[loc+3] > a) {
        FOG.pixels[loc+0] = red(c_sky);
        FOG.pixels[loc+1] = green(c_sky);
        FOG.pixels[loc+2] = blue(c_sky);
        FOG.pixels[loc+3] = a;
      }
    }
  }
  FOG.updatePixels();
}




function FOG_display() {

  noStroke();
  fill(255);
  beginShape();
  texture(FOG);
  vertex(-real(115), -real(115)-cameraY+Y_shake, real(198), 0, 0);
  vertex(real(115), -real(115)-cameraY+Y_shake, real(198), 1, 0);
  vertex(real(115), real(115)-cameraY+Y_shake, real(198), 1, 1);
  vertex(-real(115), real(115)-cameraY+Y_shake, real(198), 0, 1);
  endShape();
  fill(255);
}