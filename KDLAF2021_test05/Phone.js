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
  v_loading = random(25, 150);
  y01_loading = floor((height-img_loading01.height)/2 -img_loading00.height);
  y02_loading = floor((height-img_loading02.height)/2 -img_loading00.height -img_loading01.height*1.35);  
  count_open_info = 0;
  is_touched = false;



  PG = createGraphics(100, floor(100.0/scaleWH)+50, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  lightW = max(floor(400*scaleRate), 400) * (1.0/scalePG);




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
  str_loading.style('textAlign', 'center');
  str_loading.style('width', '100px');
  str_loading.position(width/2 - 50, height/2 + img_loading00.height/2 +20);




  //beginY00 = -round(height*(1.0-0.766));
  beginY00 = -((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626);
  beginY01 = beginY00 + floor(sideW*(img_sideText01.height/img_sideText01.width));
  beginY02 = floor(beginY01 +height +(width*(img_page01.height/img_page01.width)-height));
  beginY03 = floor(beginY02 +height +(width*(img_page02.height/img_page02.width)-height));
  beginY04 = floor(beginY03 +height +(width*(img_page03.height/img_page03.width)-height));
  beginY05 = beginY04 + height;




  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(0.557).mult(scaleRate).add(width*0.559, height*0.042).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(0.557).mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(0.557).mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(0.557).mult(scaleRate).add(width*0.375, height*0.490).mult(1.0/scalePG);
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
}


























function PHdraw() {
  if (open_info)  background(60);
  else  background(0);



  //-------------------------------- ⬇首页glitch⬇ --------------------------------
  if (open_climax) {
    time_climax ++;
    if (time_climax == 1) {
      sound_glitch.play();
      scrollVar = height*0.25;
      wait_side = 31;
    } else if (time_climax > 15) {
      open_climax = false;
      time_climax = 0;
    }
  } else {
    time_climax = 0;
    if (scrollVar ==0 && frameCount % 480 == 0)  open_climax = true;
  }
  //-------------------------------- ⬆首页glitch⬆ --------------------------------




  //-------------------------------- ⬇滚轮⬇ --------------------------------
  if (!is_pc) {
    if (is_touched) {
      scrollFlash = mouseY - pmouseY;
    } else {
      scrollFlash += (0 - scrollFlash) * 0.05;
      if (abs(scrollFlash) < 0.1)  scrollFlash = 0;
    }
    scrollVar -= scrollFlash;
  } else {
    scrollVar += scrollFlash;
  }

  if (scrollFlash != 0)  wait_side = 0;


  if (scrollVar<0)  scrollVar = 0;
  if (!open_scrollToTarget[0] && !open_scrollToTarget[1] && !open_scrollToTarget[2] && !open_scrollToTarget[3]) {
    if (scrollVar > 0  &&  scrollVar <= (height+beginY00)/2) {
      if (scrollFlash == 0) {
        wait_side ++;
      } else {
        wait_side = 0;
      }
      if (wait_side > 30) {
        scrollVar += floor((0-scrollVar)*0.05);
      }
    } else if (scrollVar > (height+beginY00)/2  &&  scrollVar < height+beginY00) {
      if (scrollFlash == 0) {
        wait_side ++;
      } else {
        wait_side = 0;
      }
      if (wait_side > 30) {
        scrollVar += ceil(((height+beginY00)-scrollVar)*0.05);
      }
    } else if (scrollVar > beginY05) {
      scrollVar = beginY05;
    }
  }


  if (is_pc)  scrollFlash = 0;
  //-------------------------------- ⬆滚轮⬆ --------------------------------










  //-------------------------------- ⬇页面01⬇ --------------------------------
  if (scrollVar > beginY01  &&  scrollVar < beginY02 +height) {
    image(img_page01, 0, map(scrollVar, beginY01, beginY01 +height, height, 0), width, width*(img_page01.height/img_page01.width));
    if (open_info) {
      fill(128, 128, 255, 60);
      strokeWeight(3);
      stroke(128, 128, 255);
      rect(0, map(scrollVar, beginY01, beginY01 +height, height, 0), width, width*(img_page01.height/img_page01.width));
      strokeWeight(30);
      point((width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0));
      strokeWeight(1);
      fill(128, 128, 255);
      textSize(15);
      text("w: "+nfc(img_page01.width*scaleRate, 3)+"\nh: "+nfc(img_page01.height*scaleRate, 3), 5, map(scrollVar, beginY01, beginY01 +height, height, 0) + width*(img_page01.height/img_page01.width)*scaleRate*0.5);
      textSize(30);
      text("beginY01: "+beginY01, (width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0)+30);
    }
  }
  //-------------------------------- ⬆页面01⬆ --------------------------------



  //-------------------------------- ⬇页面02⬇ --------------------------------
  if (scrollVar > beginY02  &&  scrollVar < beginY03 +height) {
    image(img_page02, 0, map(scrollVar, beginY02, beginY02 +height, height, 0), width, width*(img_page02.height/img_page02.width));
    if (open_info) {
      fill(60, 128, 128, 60);
      strokeWeight(3);
      stroke(60, 128, 128);
      rect(0, map(scrollVar, beginY02, beginY02 +height, height, 0), width, width*(img_page02.height/img_page02.width));
      strokeWeight(30);
      point((width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0));
      strokeWeight(1);
      fill(60, 128, 128);
      textSize(15);
      text("w: "+nfc(img_page02.width*scaleRate, 3)+"\nh: "+nfc(img_page02.height*scaleRate, 3), 5, map(scrollVar, beginY02, beginY02 +height, height, 0) +width*(img_page02.height/img_page02.width)*0.5);
      textSize(30);
      text("beginY02: "+beginY02, (width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0)+30);
    }
  }
  //-------------------------------- ⬆页面02⬆ --------------------------------




  //-------------------------------- ⬇页面03⬇ --------------------------------
  if (scrollVar > beginY03) {
    image(img_page03, 0, map(scrollVar, beginY03, beginY03 +height, height, 0), width, width*(img_page03.height/img_page03.width));
    link_kdlaf2016.show();
    link_kdlaf2017.show();
    link_kdlaf2018.show();
    link_kdlaf2019.show();
    link_kdlaf2020.show();
    link_kdlaf2020.position(40.636*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +59.73*scaleRate);
    link_kdlaf2019.position(40.636*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +183.996*scaleRate);
    link_kdlaf2018.position(40.636*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +308.181*scaleRate);
    link_kdlaf2017.position(40.636*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +432.382*scaleRate);
    link_kdlaf2016.position(40.636*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +556.567*scaleRate);


    if (open_info) {
      fill(128, 60, 128, 60);
      strokeWeight(3);
      stroke(128, 60, 128);
      rect(0, map(scrollVar, beginY03, beginY03 +height, height, 0), width, width*(img_page03.height/img_page03.width));
      strokeWeight(30);
      point((width-sideW)/2, map(scrollVar, beginY03, beginY03 +height, height, 0));
      strokeWeight(1);
      fill(128, 60, 128);
      textSize(15);
      text("w: "+nfc(img_page03.width*scaleRate, 3)+"\nh: "+nfc(img_page03.height*scaleRate, 3), 5, map(scrollVar, beginY03, beginY03 +height, height, 0) +width*(img_page03.height/img_page03.width)*0.5);
      textSize(30);
      text("beginY03: "+beginY03, (width-sideW)/2, map(scrollVar, beginY03, beginY03 +height, height, 0)+30);
    }
  } else {
    link_kdlaf2016.hide();
    link_kdlaf2017.hide();
    link_kdlaf2018.hide();
    link_kdlaf2019.hide();
    link_kdlaf2020.hide();
  }
  //-------------------------------- ⬆页面03⬆ --------------------------------



  //-------------------------------- ⬇页面04⬇ --------------------------------
  if (scrollVar > beginY04) {
    SP.clear();
    SP.push();
    SP.scale(0.55);
    SP.rotateY(spoon_rotateY_var % TWO_PI);
    SP.rotateZ(0);
    SP.translate(0, SP.height*0.28);
    if (!open_info) {
      spoon.display();
    } else {
      spoon.displayInfo();
    }
    SP.pop();

    image(SP, (width-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*scaleRate*0.25*3, SP.width*scaleRate*3, SP.height*scaleRate*3);     
    if (open_info) {
      noFill();
      stroke(255, 128, 128);
      strokeWeight(3);
      rect((width-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*scaleRate*0.45*3, SP.width*scaleRate*3, SP.height*scaleRate*3);

      stroke(128, 128, 60);
      strokeWeight(30);
      point(width/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)));
      fill(128, 128, 60);
      strokeWeight(1);
      textSize(30);
      text("beginY04: "+beginY04, (width-sideW)/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04))+30);
    }
  }
  //-------------------------------- ⬆页面04⬆ --------------------------------





  if (scrollVar < beginY01+height) {
    push();
    if (scrollVar > beginY01-beginY00) {
      translate(0, map(scrollVar, beginY01-beginY00, beginY01+height, 0, -height));
    }

    //-------------------------------- ⬇后面半个碗⬇ --------------------------------
    push();
    if (scrollVar > beginY01-beginY00) {
      translate(width/2, height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5));
      rotate(min(map(scrollVar, beginY01-beginY00, beginY01+height, 0, PI), PI));
      translate(-width/2, -(height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5)));
    }
    image(img_bowl00, -(411*scaleRate-width)/2.0, height-((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626), 411*scaleRate, 411*scaleRate*(img_bowl00.height/img_bowl00.width));
    pop();
    //-------------------------------- ⬆后面半个碗⬆ --------------------------------





    PG.background(255, 0);
    //PG.clear();
    PG.push();
    PG.translate(-PG.width/2, -PG.height/2);
    //PG.blendMode(EXCLUSION);
    if (!open_info) {
      for (let i=0; i<lights.length; i++) {
        lights[i].display();
      }
    } else {
      for (let i=0; i<lights.length; i++) {
        lights[i].displayInfo();
      }
    }
    //PG.blendMode(BLEND);
    PG.pop();



    //SP.background(255, 0);
    SP.clear();
    SP.push();
    SP.scale(0.55);
    if (open_climax)  spoon_rotateY_var += -0.025;
    else  spoon_rotateY_var += -0.001;
    SP.rotateY(spoon_rotateY_var % TWO_PI);
    SP.rotateZ(-0.25);
    SP.translate(SP.width/9.0, SP.height*0.55);

    if (!open_info) {
      spoon.display();
    } else {
      spoon.displayInfo();
    }
    SP.pop();


    //-------------------------------- ⬇画勺子SP（后面）⬇ --------------------------------
    if (spoon_rotateY_var % TWO_PI  <=  -PI) {
      push();
      translate(0, constrain(map(scrollVar, beginY01-beginY00+(height+beginY00)*0.75, beginY01+height, 0, height*1.5), 0, height*1.5));
      translate(width/2.0, height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5));
      rotate(constrain(map(scrollVar, beginY01-beginY00, beginY01+height, 0, PI), 0, PI));
      translate(-width/2.0, -(height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5)));      
      image(SP, (width-SP.width*scaleRate*3)/2.0, height-SP.height*0.85*scaleRate*3, SP.width*scaleRate*3, SP.height*scaleRate*3);     
      pop();
    }
    //-------------------------------- ⬆画勺子SP（后面）⬆ --------------------------------




    image(PG, 0, constrain(map(scrollVar, beginY01+height*0.75, beginY01+height, 0, -200), -200, 0), width, ceil(width*(PG.height/PG.width)));



    //-------------------------------- ⬇画EAT⬇ --------------------------------
    if (!open_info) {
      fill(0);
      stroke(0);
      strokeWeight(1.5);
      beginShape();
      for (let i=0; i<node_walls_E.length; i++) {
        vertex(node_walls_E[i].x *scalePG, node_walls_E[i].y *scalePG);
      }
      endShape(CLOSE);
      beginShape();
      for (let i=0; i<node_walls_A.length; i++) {
        vertex(node_walls_A[i].x *scalePG, node_walls_A[i].y *scalePG);
      }
      endShape(CLOSE);
      beginShape();
      for (let i=0; i<node_walls_A2.length; i++) {
        vertex(node_walls_A2[i].x *scalePG, node_walls_A2[i].y *scalePG);
      }
      endShape(CLOSE);
      beginShape();
      for (let i=0; i<node_walls_T.length; i++) {
        vertex(node_walls_T[i].x *scalePG, node_walls_T[i].y *scalePG);
      }
      endShape(CLOSE);

      if (!open_climax) {
        image(img_E, width*0.559, height*0.042, 88.799*scaleRate, 88.799*scaleRate*(img_E.height/img_E.width));
        image(img_A, width*0.127, height*0.228, 114.359*scaleRate, 114.359*scaleRate*(img_A.height/img_A.width));
        image(img_T, width*0.375, height*0.490, 95.846*scaleRate, 95.846*scaleRate*(img_T.height/img_T.width));
      } else {
        image(img_E, width*0.559, height*0.042+ random(height*0.01, height*0.025), 88.799*scaleRate, 88.799*scaleRate*(img_E.height/img_E.width));
        image(img_A, width*0.127, height*0.228+ random(height*0.01, height*0.025), 114.359*scaleRate, 114.359*scaleRate*(img_A.height/img_A.width));
        image(img_T, width*0.375, height*0.490+ random(height*0.01, height*0.025), 95.846*scaleRate, 95.846*scaleRate*(img_T.height/img_T.width));
      }
    } else {
      for (let i=0; i<walls.length; i++) {
        walls[i].displayInfo();
      }
    }
    //-------------------------------- ⬆画EAT⬆ --------------------------------
    pop();
  }





  //-------------------------------- ⬇首页侧边⬇ --------------------------------
  push();
  translate(0, -scrollVar);
  image(img_sideText00, width*0.599, height+beginY00 - sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
  image(img_sideText01, width*0.599, height+beginY00, sideW, sideW*(img_sideText01.height/img_sideText01.width));
  if (open_info) {
    stroke(0, 255, 0);
    noFill();
    strokeWeight(1);
    rect(width*0.599, height+beginY00 - sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
    rect(width*0.599, height+beginY00, sideW, sideW*(img_sideText01.height/img_sideText01.width));
    textSize(12);
    fill(0, 255, 0);
    text("w: "+sideW+"\nh: "+sideW*(img_sideText00.height/img_sideText00.width), width*0.599, height+beginY00 - sideW*(img_sideText00.height/img_sideText00.width)*0.5);
    text("w: "+sideW+"\nh: "+sideW*(img_sideText01.height/img_sideText00.width), width*0.599, height+beginY00 + sideW*(img_sideText01.height/img_sideText01.width)*0.5);
  }
  pop();
  //-------------------------------- ⬆首页侧边⬆ --------------------------------






  if (scrollVar < beginY01+height) {
    push();
    if (scrollVar > beginY01-beginY00) {
      translate(0, map(scrollVar, beginY01-beginY00, beginY01+height, 0, -height));
    }


    image(img_kdlaf, 0, 0, 86*scaleRate, 86*scaleRate);



    //-------------------------------- ⬇画勺子SP（前面）⬇ --------------------------------
    if (spoon_rotateY_var % TWO_PI  >  -PI) {
      push();
      translate(0, constrain(map(scrollVar, beginY01-beginY00+(height+beginY00)*0.75, beginY01+height, 0, height*2), 0, height*2));
      translate(width/2.0, height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5));
      rotate(constrain(map(scrollVar, beginY01-beginY00, beginY01+height, 0, PI), 0, PI));
      translate(-width/2.0, -(height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5)));      
      image(SP, (width-SP.width*scaleRate*3)/2.0, height-SP.height*0.85*scaleRate*3, SP.width*scaleRate*3, SP.height*scaleRate*3);     
      if (open_info) {
        noFill();
        stroke(255, 128, 128);
        strokeWeight(3);
        rect((width-SP.width*scaleRate*3)/2.0, height-SP.height*0.85*scaleRate*3, SP.width*scaleRate*3, SP.height*scaleRate*3);
        strokeWeight(35);
        point(width/2.0, height-ceil((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626 *0.5));
      }
      pop();
    }
    //-------------------------------- ⬆画勺子SP（前面）⬆ --------------------------------




    //-------------------------------- ⬇前面半个碗⬇ --------------------------------
    push();
    if (scrollVar > beginY01-beginY00) {
      translate(width/2, height-ceil((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626 *0.5));
      rotate(min(map(scrollVar, beginY01-beginY00, beginY01+height, 0, PI), PI));
      translate(-width/2, -(height-ceil((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626 *0.5)));
    }
    if (open_info) {
      noFill();
      stroke(255, 255, 128);
      strokeWeight(1);
      rect(-(411*scaleRate-width)/2.0, height-((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626), 411*scaleRate, 411*scaleRate*(img_bowl01.height/img_bowl01.width));
      fill(128, 128, 60);
      textSize(15);
      text("w: "+(411*scaleRate)+"\nh: "+411*scaleRate*(img_bowl01.height/img_bowl01.width), 0, height-((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626)+30);
      strokeWeight(30);
      point(width/2, height-ceil((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626 *0.5));
    } else {
      image(img_bowl01, -(411*scaleRate-width)/2.0, height-((411*scaleRate*(img_bowl01.height/img_bowl01.width))*0.626), 411*scaleRate, 411*scaleRate*(img_bowl01.height/img_bowl01.width));
    }
    pop();
    //-------------------------------- ⬆前面半个碗⬆ --------------------------------




    pop();
  }






  if (lights.length > 4) {
    lights[0].dead = true;
  }
  for (let i=0; i<lights.length; i++) {
    if (lights[i].dead  &&  lights[i].life <= 0) {
      lights.shift();
    }
  }
  if (lights.length > 8) {
    lights.shift();
  }




  if (open_info)  displayInfo();
  else {
    fill(100);
    noStroke();
    text("fps: " + nfc(frameRate(), 1), 10, 20);
  }
}


























function PHwindowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if (windowWidth > windowHeight)  is_wLongerThanH = true;
  else  is_wLongerThanH = false;


  sideW = round(0.4236*width);
  scaleRate = width / 375.0;
  scaleWH = float(width)/height;



  PG = createGraphics(100, floor(100.0/scaleWH)+50, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  lightW = max(floor(400*scaleRate), 400) * (1.0/scalePG);



  img_kdlaf2016.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2017.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2018.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2019.size(293.372*scaleRate, 67.355*scaleRate);
  img_kdlaf2020.size(293.372*scaleRate, 67.355*scaleRate);



  beginY00 = -((411*scaleRate*(img_bowl00.height/img_bowl00.width))*0.626);
  beginY01 = beginY00 + floor(sideW*(img_sideText01.height/img_sideText01.width));
  beginY02 = floor(beginY01 +height +(width*(img_page01.height/img_page01.width)-height));
  beginY03 = floor(beginY02 +height +(width*(img_page02.height/img_page02.width)-height));
  beginY04 = floor(beginY03 +height +(width*(img_page03.height/img_page03.width)-height));
  beginY05 = beginY04 + height;



  if (lights.length > 0) {
    for (let i=0; i<lights.length; i++) {
      lights.shift();
    }
  }



  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(0.557).mult(scaleRate).add(width*0.559, height*0.042).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(0.557).mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(0.557).mult(scaleRate).add(width*0.127, height*0.228).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(0.557).mult(scaleRate).add(width*0.375, height*0.490).mult(1.0/scalePG);
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
}