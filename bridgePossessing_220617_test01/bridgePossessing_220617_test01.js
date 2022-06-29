let canvas, PG;
let scaleRate;


let mess = [];
let count;


let pos_role;
let node_eye_l, node_eye_r;
let center_eye_l, center_eye_r;
let center_face;
let open_wink, time_wink, timeGap_wink, gap_wink;




let open_info = false;
let is_phone = false;
let time_touch;




function setup() {
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);


  smooth(8);

  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);

  textureMode(NORMAL);
  frameRate(30);
  document.bgColor = "#d8d8d9";




  count = 0;

  pos_role = -real(151.472);
  const detail_face = 16;
  node_eye_l = new Array(detail_face);
  node_eye_r = new Array(detail_face);
  center_eye_l = createVector(0, 0, 0);
  center_eye_r = createVector(0, 0, 0);
  center_face = createVector(real(400), real(460), 0);
  open_wink = false;
  time_wink = 0;
  gap_wink = floor(random(15, 100));
  timeGap_wink = 0;


  time_touch = 0;
}









function draw() {

  if (touches.length == 1) {
    is_phone = true;
    time_touch ++;
  }

  if (time_touch == 30) {
    open_info = !open_info;
  }



  background(124, 155, 199);

  beginShape(TRIANGLES);
  noStroke();
  fill(253, 255, 253);
  if (!open_info) {
    TRIANGLES_drawRect(0  -width/2, height-real(65.3)  -height/2, real(0.5), width, real(65.286));
  }
  fill(216, 216, 217);
  TRIANGLES_drawRect(0  -width/2, height-real(65.3)-real(1.68)/2.0  -height/2, real(0.5), width, real(1.68));




  const detail_bar = 16;
  let node_bar = [];

  for (let i=0; i<detail_bar; i++) {
    let x = cos(map(i, 0, detail_bar, 0, TWO_PI)-HALF_PI) * real(24.235);
    let y = sin(map(i, 0, detail_bar, 0, TWO_PI)-HALF_PI) * real(24.235);
    x += width/2.0  -width/2.0;
    y += height-real(65.3)/2.0  -height/2.0;
    node_bar.push(createVector(x, y, real(1)));
    if (i == detail_bar/2) {
      node_bar.push(createVector(x, y, real(1)));
    } else if (i == detail_bar-1) {
      node_bar.push(node_bar[0].copy());
    }
  }
  for (let i=0; i<node_bar.length; i++) {
    if (i < node_bar.length/2) {
      node_bar[i].add(real(150.172), 0, 0);
    } else {
      node_bar[i].add(-real(150.172), 0, 0);
    }
  }

  if (!open_info) {
    fill(247, 247, 247);
    TRIANGLES_getShape(node_bar);
  }




  if (frameCount%60 < 30) {
    if (dist(mouseX-width/2, mouseY-height/2, pos_role, real(204.222)+real(27.691)/2.0) < real(27.691)/2.0) {
      pos_role = real(random(-151.472, 104.239));
    }
    if (!open_info) {
      fill(157, 177, 245);
    } else {
      fill(200, 160);
    }
    TRIANGLES_drawRect(pos_role, real(204.222), real(1.5), real(2.601), real(27.691));
  }



  endShape();


  noFill();
  strokeWeight(real(0.84));
  stroke(216, 216, 217);
  beginShape(LINES);
  LINES_getEllipse(node_bar);
  endShape();



  noFill();

  if (!open_info) {
    strokeWeight(real(1.26));
    stroke(101, 100, 123);
  } else {
    strokeWeight(real(1));
    stroke(200);
  }
  beginShape(LINES);
  const detail_face = 16;
  let node_face = [];
  for (let i=0; i<detail_face; i++) {
    const x = cos(map(i, 0, detail_face, 0, TWO_PI)) * real(26.777/2.0);
    const y = sin(map(i, 0, detail_face, 0, TWO_PI)) * real(26.777/2.0);
    node_face.push(createVector(x, y, 1.5).add(real(399.157)  -width/2.0, real(467.61)  -height/2.0, 0));
  }
  LINES_getEllipse(node_face);


  // center_face = p5.Vector.add(node_face[0], node_face[node_face.length/2]).mult(0.5);
  if (p5.Vector.dist(createVector(mouseX-width/2, mouseY-height/2), center_face) < real(150)) {
    center_face = easing_p(center_face, p5.Vector.add(node_face[0], node_face[node_face.length/2]).mult(0.5).add(p5.Vector.sub(createVector(mouseX-width/2, mouseY-height/2), center_face).setMag(map(p5.Vector.dist(createVector(mouseX-width/2, mouseY-height/2), center_face), real(150), 0, real(4), 0))), 0.2);
  } else {
    center_face = easing_p(center_face, p5.Vector.add(node_face[0], node_face[node_face.length/2]).mult(0.5), 0.5);
  }


  if (timeGap_wink < gap_wink) {
    timeGap_wink ++;
  } else {
    open_wink = true;
  }

  if (open_wink) {
    if (time_wink < 10) {
      time_wink ++;
    } else {
      time_wink = 0;
      open_wink = false;
      timeGap_wink = 0;
      gap_wink = floor(random(5, 100));
    }
  }




  center_eye_l = center_face.copy().add(real(-5.6), real(-2.351), 0);
  for (let i=0; i<node_eye_l.length; i++) {
    const x = cos(map(i, 0, node_eye_l.length, 0, TWO_PI)) * real(3.612/2.0);
    const y = sin(map(i, 0, node_eye_l.length, 0, TWO_PI)) * map(sin(map(time_wink, 0, 10, 0, PI)), 0, 1, real(4.127/2.0), 0);
    node_eye_l[i] = center_eye_l.copy().add(x, y, 0);
  }


  center_eye_r = center_face.copy().add(real(5.6), real(-2.351), 0);
  for (let i=0; i<node_eye_r.length; i++) {
    const x = cos(map(i, 0, node_eye_r.length, 0, TWO_PI)) * real(3.612/2.0);
    const y = sin(map(i, 0, node_eye_r.length, 0, TWO_PI)) * map(sin(map(time_wink, 0, 10, 0, PI)), 0, 1, real(4.127/2.0), 0);
    node_eye_r[i] = center_eye_r.copy().add(x, y, 0);
  }



  LINES_getEllipse(node_eye_l);
  LINES_getEllipse(node_eye_r);


  let node_mouth = new Array(3);
  node_mouth[0] = center_face.copy().add(real(-3.682), constrain(map(mess.length, 10, 20, real(3.66), real(6.969)), real(3.66), real(6.969)), 0);
  node_mouth[1] = center_face.copy().add(0, constrain(map(mess.length, 10, 20, real(6.969), real(3.66)), real(3.66), real(6.969)), 0);
  node_mouth[2] = center_face.copy().add(real(3.682), constrain(map(mess.length, 10, 20, real(3.66), real(6.969)), real(3.66), real(6.969)), 0);

  LINES_getLines(node_mouth);

  endShape();




  if (mess.length > 0) {
    for (let i=0; i<mess.length; i++) {
      mess[i].update();
    }
  }


  if (mess.length > 0) {
    for (let i=0; i<mess.length; i++) {
      if (mess[i].dead) {
        mess.splice(i, 1);
      }
    }
  }




  if (mess.length > 0) {
    if (!open_info) {
      beginShape(TRIANGLES);
      for (let i=0; i<mess.length; i++) {
        mess[i].display();
      }
      endShape();
    } else {
      beginShape(LINES);
      for (let i=0; i<mess.length; i++) {
        mess[i].displayInfo();
      }
      endShape();
    }
  }







  if (open_info) {
    PG.clear();
    PG.background(255, 0);
    displayInfo();
    image(PG, -width/2, -height/2, width, height);
  }
}






function windowResized() {
  location.reload();
}






function touchMoved() {
  if (is_phone) {
    return false;
  }
}

function mousePressed() {
  count ++;
  mess.push(new Mess(createVector(mouseX-width/2.0+real(random(-1, 1)), mouseY-height/2.0+real(random(-1, 1)), real(0.35)), count));
  if (is_phone) {
    return false;
  }
}


function keyPressed() {
  if (key == 'i' || key == 'I') {
    open_info = !open_info;
  } else if (key == 's' || key == 'S') {
    save("PR.jpg");
  }
  if (is_phone) {
    return false;
  }
}

//@funnysandwich