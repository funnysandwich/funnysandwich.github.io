function PCsetup() {
  SP = createGraphics(300, 380, WEBGL);

  spoon = new Spoon();



  img_bowl00.resize(920, 920*img_bowl00.height/img_bowl00.width);
  img_bowl01.resize(920, 920*img_bowl01.height/img_bowl01.width);



  if (width < 1274) {
    sideW = 268.0;
  } else {
    sideW = floor(width*0.21);
  }
  scaleRate = (width-sideW)/920.0;
  scaleWH = float(width)/height;
  scrollFlash = 0;
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



  PG = createGraphics(600, floor(600.0/scaleWH)+150, WEBGL);
  PG.textureMode(NORMAL);
  scalePG = float(width) / PG.width;
  lightW = max(floor(500*scaleRate), 500) * (1.0/scalePG);



  //img_kdlaf.resize(150, 150);
  //img_sideText00.resize(sideW, sideW*img_sideText00.height/img_sideText00.width);
  //img_sideText01.resize(sideW, sideW*img_sideText01.height/img_sideText01.width);
  //img_E.resize(159.3, 209.85);
  //img_A.resize(205.15, 209.85);
  //img_T.resize(171.94, 209.85);
  for (let i=0; i<img_light.length; i++) {
    //img_light[i].resize(500, 500);
  }
  for (let i=0; i<img_bar.length; i++) {
    //img_bar[i].resize(sideW, sideW*img_bar[i].height/img_bar[i].width);
    open_scrollToTarget.push(false);
  }
  img_page01.resize(920, 920*img_page01.height/img_page01.width);
  img_page02.resize(920, 920*img_page02.height/img_page02.width);
  img_page03.resize(920, 920*img_page03.height/img_page03.width);


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
  img_kdlaf2016.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2017.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2018.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2019.size(720*scaleRate, 165.197*scaleRate);
  img_kdlaf2020.size(720*scaleRate, 165.197*scaleRate);
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
  beginY02 = floor(beginY01 +height +(img_page01.height*scaleRate-height));
  beginY03 = floor(beginY02 +height +(img_page02.height*scaleRate-height));
  beginY04 = floor(beginY03 +height +(img_page03.height*scaleRate-height));
  beginY05 = beginY04 + 600;



  let xy = [];
  for (let i=0; i<node_walls_E_ori.length; i++) {
    xy = float(split(node_walls_E_ori[i], ','));
    node_walls_E[i] = createVector(xy[0], xy[1]);
    node_walls_E[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.236, height*0.115).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A_ori.length; i++) {
    xy = float(split(node_walls_A_ori[i], ','));
    node_walls_A[i] = createVector(xy[0], xy[1]);
    node_walls_A[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_A2_ori.length; i++) {
    xy = float(split(node_walls_A2_ori[i], ','));
    node_walls_A2[i] = createVector(xy[0], xy[1]);
    node_walls_A2[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.442, height*0.352).mult(1.0/scalePG);
  }
  for (let i=0; i<node_walls_T_ori.length; i++) {
    xy = float(split(node_walls_T_ori[i], ','));
    node_walls_T[i] = createVector(xy[0], xy[1]);
    node_walls_T[i].mult(min(scaleRate, 1.47)).add((width-sideW)*0.693, height*0.212).mult(1.0/scalePG);
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





  //lights.push(new Light());




  //sound_0.autoplay(true);
  open_info = true;
}






























function PCdraw() {
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
    scrollVar += scrollFlash;
    if (scrollVar<0)  scrollVar = 0;
    if (!open_scrollToTarget[0] && !open_scrollToTarget[1] && !open_scrollToTarget[2] && !open_scrollToTarget[3]) {
      if (scrollVar > 0  &&  scrollVar <= height/2) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((0-scrollVar)*0.05);
        }
      } else if (scrollVar > height/2  &&  scrollVar < height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY01+height-height*0.25  &&  scrollVar < beginY01+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY01+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY02  &&  scrollVar < beginY02+height*0.5) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((beginY02-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY02+height*0.5  &&  scrollVar < beginY02+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY02+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY03  &&  scrollVar < beginY03+height*0.5) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += floor((beginY03-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY03+height*0.5  &&  scrollVar < beginY03+height) {
        if (scrollFlash == 0) {
          wait_side ++;
        } else {
          wait_side = 0;
        }
        if (wait_side > 30) {
          scrollVar += ceil((beginY03+height-scrollVar)*0.05);
        }
      } else if (scrollVar > beginY05) {
        scrollVar = beginY05;
      }
    }


    if (open_scrollToTarget[0]) {
      open_scrollToTarget[1] = false;
      open_scrollToTarget[2] = false;
      open_scrollToTarget[3] = false;
      scrollVar += floor((0-scrollVar)*0.05);
      if (scrollVar == 0 )  open_scrollToTarget[0] = false;
    } else if (open_scrollToTarget[1]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[2] = false;
      open_scrollToTarget[3] = false;
      scrollVar += floor((beginY01+height-scrollVar)*0.05);
      if (scrollVar == beginY01+height)  open_scrollToTarget[1] = false;
    } else if (open_scrollToTarget[2]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[1] = false;
      open_scrollToTarget[3] = false;
      if (beginY02+height-scrollVar > 0) {
        scrollVar += ceil((beginY02+height-scrollVar)*0.05);
      } else {
        scrollVar += floor((beginY02+height-scrollVar)*0.05);
      }
      if (scrollVar == beginY02+height)  open_scrollToTarget[2] = false;
    } else if (open_scrollToTarget[3]) {
      open_scrollToTarget[0] = false;
      open_scrollToTarget[1] = false;
      open_scrollToTarget[2] = false;
      if (beginY03+height-scrollVar > 0) {
        scrollVar += ceil((beginY03+height-scrollVar)*0.05);
      } else {
        scrollVar += floor((beginY03+height-scrollVar)*0.05);
      }
      if (scrollVar == beginY03+height)  open_scrollToTarget[3] = false;
    }
     //-------------------------------- ⬆滚轮⬆ --------------------------------








    //-------------------------------- ⬇首页侧边⬇ --------------------------------
    push();
    translate(0, -scrollVar);
    image(img_sideText00, width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
    image(img_sideText01, width-sideW, height, sideW, sideW*(img_sideText01.height/img_sideText01.width));
    if (open_info) {
      stroke(0, 255, 0);
      noFill();
      strokeWeight(1);
      rect(width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width), sideW, sideW*(img_sideText00.height/img_sideText00.width));
      rect(width-sideW, height, sideW, sideW*(img_sideText01.height/img_sideText01.width));
      textSize(12);
      fill(0, 255, 0);
      text("w: "+sideW+"\nh: "+sideW*(img_sideText00.height/img_sideText00.width), width-sideW, height-sideW*(img_sideText00.height/img_sideText00.width)*0.5);
      text("w: "+sideW+"\nh: "+sideW*(img_sideText01.height/img_sideText00.width), width-sideW, height+sideW*(img_sideText01.height/img_sideText01.width)*0.5);
    }
    pop();
    //-------------------------------- ⬆首页侧边⬆ --------------------------------



    //-------------------------------- ⬇侧边导航栏⬇ --------------------------------
    if (scrollVar > beginY01) {
      if (scrollVar  <  beginY01 + sideW*(img_bar[0].height/img_bar[0].width)) {
        image(img_bar[0], width-sideW, map(scrollVar, beginY01, beginY01+img_bar[0].height, -img_bar[0].height, 0), sideW, sideW*(img_bar[0].height/img_bar[0].width));
      } else {
        image(img_bar[0], width-sideW, 0, sideW, sideW*(img_bar[0].height/img_bar[0].width));
      }
    }

    if (scrollVar > beginY01+height - sideW*(img_bar[0].height/img_bar[0].width)) {
      if (scrollVar  <  beginY01+height) {
        image(img_bar[1], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height, sideW*(img_bar[0].height/img_bar[0].width)), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height +sideW*(img_bar[0].height/img_bar[0].width), height -sideW*(img_bar[0].height/img_bar[0].width)*2 ), sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, height +sideW*(img_bar[0].height/img_bar[0].width)*2, height -sideW*(img_bar[0].height/img_bar[0].width) ), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else if (scrollVar < beginY02+height) {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, map(max(scrollVar, beginY02), beginY02, beginY02 +height, height -sideW*(img_bar[0].height/img_bar[0].width)*2, sideW*(img_bar[0].height/img_bar[0].width)*2), sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, height -sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else if (scrollVar < beginY03+height) {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*2, sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, map(max(scrollVar, beginY03), beginY03, beginY03 +height, height -sideW*(img_bar[0].height/img_bar[0].width), sideW*(img_bar[0].height/img_bar[0].width)*3), sideW, sideW*(img_bar[3].height/img_bar[3].width));
      } else {
        image(img_bar[1], width-sideW, sideW*(img_bar[0].height/img_bar[0].width), sideW, sideW*(img_bar[1].height/img_bar[1].width));
        image(img_bar[2], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*2, sideW, sideW*(img_bar[2].height/img_bar[2].width));
        image(img_bar[3], width-sideW, sideW*(img_bar[0].height/img_bar[0].width)*3, sideW, sideW*(img_bar[3].height/img_bar[3].width));
      }
    }
    //-------------------------------- ⬆侧边导航栏⬆ --------------------------------


    //-------------------------------- ⬇页面01⬇ --------------------------------
    if (scrollVar > beginY01  &&  scrollVar < beginY02 +height) {
      image(img_page01, 0, map(scrollVar, beginY01, beginY01 +height, height, 0), img_page01.width*scaleRate, img_page01.height*scaleRate);
      if (open_info) {
        fill(128, 128, 255, 60);
        strokeWeight(3);
        stroke(128, 128, 255);
        rect(0, map(scrollVar, beginY01, beginY01 +height, height, 0), img_page01.width*scaleRate, img_page01.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0));
        strokeWeight(1);
        fill(128, 128, 255);
        textSize(15);
        text("w: "+nfc(img_page01.width*scaleRate, 3)+"\nh: "+nfc(img_page01.height*scaleRate, 3), 5, map(scrollVar, beginY01, beginY01 +height, height, 0) +img_page01.height*scaleRate*0.5);
        textSize(30);
        text("beginY01: "+beginY01, (width-sideW)/2, map(scrollVar, beginY01, beginY01 +height, height, 0)+30);
      }
    }
    //-------------------------------- ⬆页面01⬆ --------------------------------


    //-------------------------------- ⬇页面02⬇ --------------------------------
    if (scrollVar > beginY02  &&  scrollVar < beginY03 +height) {
      image(img_page02, 0, map(scrollVar, beginY02, beginY02 +height, height, 0), img_page02.width*scaleRate, img_page02.height*scaleRate);
      if (open_info) {
        fill(60, 128, 128, 60);
        strokeWeight(3);
        stroke(60, 128, 128);
        rect(0, map(scrollVar, beginY02, beginY02 +height, height, 0), img_page02.width*scaleRate, img_page02.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0));
        strokeWeight(1);
        fill(60, 128, 128);
        textSize(15);
        text("w: "+nfc(img_page02.width*scaleRate, 3)+"\nh: "+nfc(img_page02.height*scaleRate, 3), 5, map(scrollVar, beginY02, beginY02 +height, height, 0) +img_page02.height*scaleRate*0.5);
        textSize(30);
        text("beginY02: "+beginY02, (width-sideW)/2, map(scrollVar, beginY02, beginY02 +height, height, 0)+30);
      }
    }
    //-------------------------------- ⬆页面02⬆ --------------------------------


    //-------------------------------- ⬇页面03⬇ --------------------------------
    if (scrollVar > beginY03) {
      image(img_page03, 0, map(scrollVar, beginY03, beginY03 +height, height, 0), img_page03.width*scaleRate, img_page03.height*scaleRate);
      link_kdlaf2016.show();
      link_kdlaf2017.show();
      link_kdlaf2018.show();
      link_kdlaf2019.show();
      link_kdlaf2020.show();
      link_kdlaf2020.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +146.639*scaleRate);
      link_kdlaf2019.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +451.676*scaleRate);
      link_kdlaf2018.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +756.549*scaleRate);
      link_kdlaf2017.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +1061.5*scaleRate);
      link_kdlaf2016.position(99.763*scaleRate, map(scrollVar, beginY03, beginY03 +height, height, 0) +1366.374*scaleRate);


      if (open_info) {
        fill(128, 60, 128, 60);
        strokeWeight(3);
        stroke(128, 60, 128);
        rect(0, map(scrollVar, beginY03, beginY03 +height, height, 0), img_page03.width*scaleRate, img_page03.height*scaleRate);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY03, beginY03 +height, height, 0));
        strokeWeight(1);
        fill(128, 60, 128);
        textSize(15);
        text("w: "+nfc(img_page03.width*scaleRate, 3)+"\nh: "+nfc(img_page03.height*scaleRate, 3), 5, map(scrollVar, beginY03, beginY03 +height, height, 0) +img_page03.height*scaleRate*0.5);
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


    if (scrollVar > beginY04) {
      if (open_info) {
        stroke(128, 128, 60);
        strokeWeight(30);
        point((width-sideW)/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)));
        fill(128, 128, 60);
        strokeWeight(1);
        textSize(30);
        text("beginY04: "+beginY04, (width-sideW)/2, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04))+30);
      }
    }





    if (scrollVar < beginY01+height) {
      push();
      if (scrollVar > beginY01) {
        translate(0, -min(scrollVar-beginY01, height));
      }

      //-------------------------------- ⬇后面半个碗⬇ --------------------------------
      push();
      if (scrollVar > beginY01) {
        translate((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(min(map(scrollVar, beginY01, beginY01+height, 0, PI), PI));
        translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));
      }
      image(img_bowl00, 0, height-((min(scaleRate, 1.00)*img_bowl00.height)*0.528), width-sideW, scaleRate*img_bowl00.height);
      pop();
      //-------------------------------- ⬆后面半个碗⬆ --------------------------------



      image(img_kdlaf, 0, 0, max((150.0/1274)*width, 150), max((150.0/1274)*width, 150));



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
      PG.blendMode(BLEND);

      PG.pop();



      //SP.background(255, 0);
      SP.clear();
      SP.push();
      //SP.translate(-SP.width/2, -SP.height/2);
      //SP.translate((width-sideW)*0.5,  height*0.9);

      //if (scrollVar > img_sideText01.height+height*0.25) {
      //  let s_spoon_rotateY_var  =  map(min(scrollVar,img_sideText01.height+height*0.5), img_sideText01.height+height*0.25, img_sideText01.height+height*0.5, spoon_rotateY_var%TWO_PI, 0);
      //  SP.rotateY(s_spoon_rotateY_var % TWO_PI);
      //} else {
      if (open_climax)  spoon_rotateY_var += -0.025;
      else  spoon_rotateY_var += -0.001;
      SP.rotateY(spoon_rotateY_var % TWO_PI);
      //}
      SP.rotateZ(-0.25);

      //SP.translate(img_bowl01.width*0.913*0.05, 0);
      SP.translate(SP.width/9.0, SP.height*0.28);

      if (!open_info) {
        spoon.display();
      } else {
        spoon.displayInfo();
      }
      SP.pop();




      if (spoon_rotateY_var % TWO_PI  <=  -PI) {
        push();
        translate(0, constrain(map(scrollVar, beginY01+height*0.75, beginY01+height, 0, height*2), 0, height*2));
        translate(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(constrain(map(scrollVar, beginY01, beginY01+height, 0, PI), 0, PI));
        translate(-SP.width*scaleRate*0.5*3-((width-sideW)-SP.width*scaleRate*3)/2.0, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));      
        image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);     
        if (open_info) {
          noFill();
          stroke(255, 128, 128);
          strokeWeight(3);
          rect(((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);
          strokeWeight(35);
          point(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        }
        pop();
      }
      image(PG, 0, constrain(map(scrollVar, beginY01+height-sideW*(img_bar[0].height/img_bar[0].width), beginY01+height, 0, -300), -300, 0), width, ceil(width*(float(PG.height)/PG.width)));






      if (!open_info) {
        fill(0);
        stroke(0);
        strokeWeight(1);
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
          image(img_E, (width-sideW)*0.236, height*0.115, min(scaleRate, 1.47)*159.3, min(scaleRate, 1.47)*159.3*(img_E.height/img_E.width));
          image(img_A, (width-sideW)*0.442, height*0.352, min(scaleRate, 1.47)*205.15, min(scaleRate, 1.47)*205.15*(img_A.height/img_A.width));
          image(img_T, (width-sideW)*0.693, height*0.212, min(scaleRate, 1.47)*171.94, min(scaleRate, 1.47)*171.94*(img_T.height/img_T.width));
        } else {
          image(img_E, (width-sideW)*0.236, height*0.115 + random(height*0.01, height*0.025), min(scaleRate, 1.47)*159.3, min(scaleRate, 1.47)*159.3*(img_E.height/img_E.width));
          image(img_A, (width-sideW)*0.442, height*0.352+ random(height*0.01, height*0.025), min(scaleRate, 1.47)*205.15, min(scaleRate, 1.47)*205.15*(img_A.height/img_A.width));
          image(img_T, (width-sideW)*0.693, height*0.212+ random(height*0.01, height*0.025), min(scaleRate, 1.47)*171.94, min(scaleRate, 1.47)*171.94*(img_T.height/img_T.width));
        }
      } else {
        for (let i=0; i<walls.length; i++) {
          walls[i].displayInfo();
        }
      }


      if (spoon_rotateY_var % TWO_PI  >  -PI) {
        push();
        translate(0, constrain(map(scrollVar, beginY01+height*0.75, beginY01+height, 0, height*2), 0, height*2));
        translate(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(constrain(map(scrollVar, beginY01, beginY01+height, 0, PI), 0, PI));
        translate(-SP.width*scaleRate*0.5*3-((width-sideW)-SP.width*scaleRate*3)/2.0, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));      
        image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);     
        if (open_info) {
          noFill();
          stroke(255, 128, 128);
          strokeWeight(3);
          rect(((width-sideW)-SP.width*scaleRate*3)/2.0, height-(SP.height*3-200)*min(scaleRate, 1.00), SP.width*scaleRate*3, SP.height*min(scaleRate, 1.00)*3);
          strokeWeight(35);
          point(SP.width*scaleRate*0.5*3+((width-sideW)-SP.width*scaleRate*3)/2.0, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        }
        pop();
      }






      //-------------------------------- ⬇前面半个碗⬇ --------------------------------
      push();
      if (scrollVar > beginY01) {
        translate((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
        rotate(min(map(scrollVar, beginY01, beginY01+height, 0, PI), PI));
        translate(-(width-sideW)/2, -(height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2)));
      }
      image(img_bowl01, 0, height-((min(scaleRate, 1.00)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
      if (open_info) {
        noFill();
        stroke(255, 255, 128);
        strokeWeight(1);
        rect(0, height-((min(scaleRate, 1.00)*img_bowl01.height)*0.528), width-sideW, scaleRate*img_bowl01.height);
        fill(255, 255, 128);
        text("w: "+(width-sideW)+"\nh: "+scaleRate*img_bowl01.height, 0, height-100);
        strokeWeight(30);
        point((width-sideW)/2, height-ceil(((min(scaleRate, 1.00)*img_bowl01.height)*0.528)/2));
      }
      pop();
      //-------------------------------- ⬆前面半个碗⬆ --------------------------------



      pop();
    }



    if (scrollVar > beginY04) {
      SP.clear();
      SP.push();

      SP.rotateY(spoon_rotateY_var % TWO_PI);
      SP.rotateZ(0);
      SP.translate(0, SP.height*0.28);

      if (!open_info) {
        spoon.display();
      } else {
        spoon.displayInfo();
      } 
      SP.pop();

      image(SP, ((width-sideW)-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*min(scaleRate, 1.47)*0.45*3, SP.width*scaleRate*3, SP.height*min(scaleRate, 1.47)*3);     
      if (open_info) {
        noFill();
        stroke(255, 128, 128);
        strokeWeight(3);
        rect(((width-sideW)-SP.width*scaleRate*3)/2.0, map(scrollVar, beginY04, beginY05, height, height-(beginY05-beginY04)) - SP.height*min(scaleRate, 1.47)*0.45*3, SP.width*scaleRate*3, SP.height*min(scaleRate, 1.47)*3);
      }
    }








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

    scrollFlash = 0;

    if (mouseX > width-sideW) {
      if (scrollVar >= beginY01+sideW*(img_bar[0].height/img_bar[0].width)  &&  scrollVar < beginY01+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY01+height  &&  scrollVar < beginY02) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else if (mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY02  &&  scrollVar < beginY02+height) {
        if ( mouseY < sideW*(img_bar[0].height/img_bar[0].width)*2) {
          cursor(HAND);
        } else if ( mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY02+height  &&  scrollVar < beginY03) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*3) {
          cursor(HAND);
        } else if (mouseY > height-sideW*(img_bar[0].height/img_bar[0].width)) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY03  &&  scrollVar < beginY03+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*3) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else if (scrollVar >= beginY03+height) {
        if (mouseY < sideW*(img_bar[0].height/img_bar[0].width)*4) {
          cursor(HAND);
        } else  cursor(ARROW);
      } else  cursor(ARROW);
    } else  cursor(ARROW);
  }
}