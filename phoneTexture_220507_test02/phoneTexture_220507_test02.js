/*
 ----------
 test01
 手机显示不出来2000PG以上的画面
 结果是我的6s显示不出来，人家的12没问题
 
 
 
 ----------
 test02
 
 用image去接PG，可行！
 
 
 */


let P = new Array(5);
let INFO;
let IM = new Array(5);

function setup() {
  createCanvas(500, 500, WEBGL);
  INFO = createGraphics(500, 500);
  INFO.background(0, 0);
  INFO.fill(0);
  INFO.noStroke();
  for (let i=0; i<5; i++) {
    let w = floor(map(i, 0, P.length, 1800, 2300));
    let h = 375*5;
    let center_x = map(i, 0, P.length-1, -200, 200)+250;
    INFO.text("i: "+i+"\nw: "+w+"\nh: "+h, center_x-40, 300);
  }

  textureMode(NORMAL);

  for (let i=0; i<P.length; i++) {
    if (i == 4) {
      let w = floor(map(i, 0, P.length, 1800, 2300));
      let h = 375*5;    
      P[i] = createGraphics(w, h);
      P[i].background(128, 128, 255);
      P[i].fill(255, 0, 0);
      P[i].ellipse(P[i].width/2, P[i].height/2, 300, 300);

      IM[i] = createImage(w, h);
      IM[i].loadPixels();
      for (let j = 0; j < IM[i].width; j++) {
        for (let k = 0; k < IM[i].height; k++) {
          IM[i].set(j, k, P[i].get(j, k));
        }
      }
      IM[i].updatePixels();
    }
  }
}


function draw() {
  background(200);

  for (let i=0; i<P.length; i++) {
    if (i == 4) {
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



      fill(255);
      beginShape();
      texture(IM[i]);
      vertex(center_x-40, -140, -1, 0, 0);
      vertex(center_x+40, -140, -1, 1, 0);
      vertex(center_x+40, -60, -1, 1, 1);
      vertex(center_x-40, -60, -1, 0, 1);

      endShape();
      fill(255);
    }
  }
  image(INFO, -250, -250, 500, 500);
}
