function PHsetup() {
  SP = createGraphics(125, 184, WEBGL);
  spoon = new Spoon();



  img_bowl00.resize(411, 234);
  img_bowl01.resize(411, 234);



  sideW = round(0.4236*width);
  scaleRate = width / 375.0;
  scaleWH = float(width)/height;
  scrollFlash = 0.0;
  scrollVar = 0;
  rayDetail = 360;
  lightCount = 0;
  wait_side = 0;
  open_climax = false;
  time_climax = 0;
  spoon_rotateY_var = 0.0;
  open_mask2016 = false;
  open_mask2017 = false;
  open_mask2018 = false;
  open_mask2019 = false;
  open_mask2020 = false;
  open_homepage = false;
  time_loading = 28;
  v_loading = random(50, 250);
  y01_loading = (height-img_loading01.height)/2 -img_loading00.height;
  y02_loading = (height-img_loading02.height)/2 -img_loading00.height -img_loading01.height*1.35;
  count_open_info = 0;
  is_touched = false;



  PG = createGraphics(100, floor(100.0/scaleWH)+50, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  lightW = max(floor(230*scaleRate), 230) * (1.0/scalePG);




  for (let i=0; i<img_bar.length; i++) {
    open_scrollToTarget.push(false);
  }




  link_kdlaf2016 = createA("http://kdlaf.tnua.edu.tw/2016/", "2018", "_blank");
  link_kdlaf2017 = createA("http://kdlaf.tnua.edu.tw/2017/", "2017", "_blank");
  link_kdlaf2018 = createA("http://kdlaf.tnua.edu.tw/2018/", "2018", "_blank");
  link_kdlaf2019 = createA("http://kdlaf.tnua.edu.tw/2019/", "2019", "_blank");
  link_kdlaf2020 = createA("http://kdlaf.tnua.edu.tw/", "2020", "_blank");
  link_kdlaf2016.position(0, 0);
  link_kdlaf2017.position(0, 0);
  link_kdlaf2018.position(0, 0);
  link_kdlaf2019.position(0, 0);
  link_kdlaf2020.position(0, 0);
  img_kdlaf2016 = createImg("data/2016kdlaf.jpg");
  img_kdlaf2017 = createImg("data/2017kdlaf.jpg");
  img_kdlaf2018 = createImg("data/2018kdlaf.jpg");
  img_kdlaf2019 = createImg("data/2019kdlaf.jpg");
  img_kdlaf2020 = createImg("data/2020kdlaf.jpg");
  img_kdlaf2016.position(0, 0);
  img_kdlaf2017.position(0, 0);
  img_kdlaf2018.position(0, 0);
  img_kdlaf2019.position(0, 0);
  img_kdlaf2020.position(0, 0);
  img_kdlaf2016.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2017.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2018.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2019.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2020.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2016.parent(link_kdlaf2016);
  img_kdlaf2017.parent(link_kdlaf2017);
  img_kdlaf2018.parent(link_kdlaf2018);
  img_kdlaf2019.parent(link_kdlaf2019);
  img_kdlaf2020.parent(link_kdlaf2020);
  link_kdlaf2016.hide();
  link_kdlaf2017.hide();
  link_kdlaf2018.hide();
  link_kdlaf2019.hide();
  link_kdlaf2020.hide();
  link_kdlaf2016.mouseOver(mouseOver2016);
  link_kdlaf2017.mouseOver(mouseOver2016);
  link_kdlaf2018.mouseOver(mouseOver2016);
  link_kdlaf2019.mouseOver(mouseOver2016);
  link_kdlaf2020.mouseOver(mouseOver2016);
  link_kdlaf2016.mouseOut(mouseOut2016);
  link_kdlaf2017.mouseOut(mouseOut2017);
  link_kdlaf2018.mouseOut(mouseOut2018);
  link_kdlaf2019.mouseOut(mouseOut2019);
  link_kdlaf2020.mouseOut(mouseOut2020);


  str_loading = createDiv("loading...");
  str_loading.style('font-size', '16px');
  str_loading.style('color', '#ffffff');
  str_loading.position(width/2 - 28, height/2 + img_loading00.height/2 +20);




  beginY01 = floor(sideW*(img_sideText01.height/img_sideText01.width));
  beginY02 = floor(beginY01 +height +(width*(img_page01.height/img_page01.width)-height));
  beginY03 = floor(beginY02 +height +(width*(img_page02.height/img_page02.width)-height));
  beginY04 = floor(beginY03 +height +(width*(img_page03.height/img_page03.width)-height));
  beginY05 = beginY04 + 600;




  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(scaleRate).add(width*0.559, height*0.042).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(scaleRate).add(width*0.375, height*0.490).mult(1.0/scalePG);
  }

  for (let i=0; i<node_walls_E.length; i++) {
    walls[i] = new Wall(node_walls_E[i%node_walls_E.length], node_walls_E[(i+1)%node_walls_E.length]);
  }
  for (let i=0; i<node_walls_A.length; i++) {
    walls[node_walls_E.length+i] = new Wall(node_walls_A[i%node_walls_A.length], node_walls_A[(i+1)%node_walls_A.length]);
  }
  for (let i=0; i<node_walls_A2.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+i] = new Wall(node_walls_A2[i%node_walls_A2.length], node_walls_A2[(i+1)%node_walls_A2.length]);
  }
  for (let i=0; i<node_walls_T.length; i++) {
    walls[node_walls_E.length+node_walls_A.length+node_walls_A2.length+i] = new Wall(node_walls_T[i%node_walls_T.length], node_walls_T[(i+1)%node_walls_T.length]);
  }



  open_info = true;
}


























function PHdraw() {
  if (!open_homepage) {
    if (v_loading > 1)  v_loading -= 1 ;
    else {
      v_loading = 1;
    }
    let s_y02_loading = constrain(map(y02_loading/(v_loading*0.25), 0, y02_loading, y02_loading, (height-img_loading00.height)/2), y02_loading, (height-img_loading00.height)/2);
    let s_y01_loading = constrain(map(y01_loading/(v_loading*0.25), 0, y01_loading, y01_loading, (height-img_loading00.height)/2), y01_loading, (height-img_loading00.height)/2);
    if (open_info)  background(60);
    else  background(0);

    push();
    if (v_loading == 1  &&  time_loading > 180) {
      translate(width/2, height/2);
      scale(map(sin(map(min(time_loading % 180, 30), 0, 30, 0, PI)), 0, 1, 1, 0.85));
      translate(-width/2, -height/2);
    }
    image(img_loading02, (width-img_loading02.width)/2, s_y02_loading);
    image(img_loading01, (width-img_loading01.width)/2, s_y01_loading);
    image(img_loading00, (width-img_loading00.width)/2, (height-img_loading00.height)/2);

    if (time_loading > 180  &&  time_loading % 180 <= 45) {
      tint(255, map(sin(map(min(time_loading % 180, 45), 0, 45, 0, PI)), 0, 1, 0, 255));
      image(img_loading_hand, (width-img_loading_hand.width)/2, (height-img_loading_hand.height)/2);
      noTint();
    }
    pop();


    if (v_loading == 1) {
      str_loading.hide();
      time_loading ++;
      noFill();
      stroke(255, min(map(min(time_loading % 180, 60), 30, 60, 255, 0), 255));
      strokeWeight(1);
      let d = map(min(time_loading % 180, 60), 0, 60, 0, 200);
      ellipse(width/2, height/2, d, d);
    }

    if (open_info) {
      displayInfo();
    }
  } else {

    if (open_info)  background(60);
    else  background(0);

    if (is_touched) {
      scrollFlash = mouseY - pmouseY;
    } else {
      scrollFlash += (0 - scrollFlash) * 0.05;
      if (abs(scrollFlash) < 0.1)  scrollFlash = 0;
    }
    scrollVar += scrollFlash;













    if (lights.length > 4) {
      lights[0].dead = true;
    }
    for (let i=0; i<lights.length; i++) {
      if (lights[i].dead  &&  lights[i].life <= 0) {
        lights.shift();
      }
    }




    if (open_info)  displayInfo();
    else {
      fill(100);
      noStroke();
      text("fps: " + nfc(frameRate(), 1), 10, 20);
    }
  }
}
