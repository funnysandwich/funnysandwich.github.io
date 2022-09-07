document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
    if (state_winDecoration == 5) {
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }
  }
};
document.onclick = function (event) {
  let e = event || window.event;

  //------- loadSongs -------
  if (is_song_load_done  &&  !open_play  &&  var_loading == 1) {
    open_play = true;
    song_track.amp(0);
    song_track.loop();
    if (songs.length > 0) {
      for (let i=0; i<songs.length; i++) {
        songs[i].amp(0);
        songs[i].loop();
      }
    }
  }

  if (have_button_stop  &&  dist(real(13), real(300), mouseX, mouseY) < real(10)) {
    open_stop = true;
    time_stop = 0;
    open_sprint = false;
    time_sprint = 0;
    song_track.pause();
    if (songs.length > 0) {
      for (let i=0; i<songs.length; i++) {
        songs[i].pause();
      }
    }
  } else if (have_button_sprint  &&  dist(real(13), real(250), mouseX, mouseY) < real(10)) {
    open_sprint = true;
    time_sprint = 0;
    open_stop = false;
    time_stop = 0;
  } else if (have_button_jump  &&  dist(real(13), real(200), mouseX, mouseY) < real(10)) {
    if (!open_jump) {
      open_jump = true;
      time_jump = 0;
      open_stop = false;
      time_stop = 0;
    }
  } else if (have_button_regenerate  &&  dist(width-real(13), real(250-75), mouseX, mouseY) < real(10)) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change();
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        roadVer[i].change();
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        for (let j=0; j<roadHor[i].length; j++) {
          roadHor[i][j].change();
        }
      }
    }
    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].change();
      }
      for (let i=0; i<6; i++) {
        H_pier_target[i] = real(75) * (2 + floor(random(0, map(i, 0, 6, 0.5, 16))));

        H_pier[i] = 0;
      }
    }
    if (open_desert) {
      count_desert_ver = 0;
      for (let i=0; i<node_desert.length; i++) {
        for (let j=0; j<node_desert[i].length; j++) {
          const x = map(i, 0, node_desert.length, endLine+real(1000), beginLine);
          const z = map(j, 0, node_desert[i].length-1, skyline.z, 0);
          //let y = min(skyline.y - real(75) + map(noise(i, j), 0, 1, real(200), -real(200)), skyline.y-real(2));
          //if (j == node_desert[0].length-1) {
          //  y = skyline.y;
          //}
          node_desert[i][j] = createVector(x, skyline.y, z);
        }
        count_desert_ver += 1;
      }
    }
    if (open_mountain) {
      open_houseBeginY_followMountainY = true;
      mountain.change();
    }
  } else if (have_button_shine  &&  dist(width-real(13), real(250-25), mouseX, mouseY) < real(10)) {
    open_light = true;
    time_light = 0;

    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change_shine();
      }
    }

    open_random_billboard = true;
    time_billboard = 0;

    if (open_mountain) {
      mountain.lightUpAllWin();
    }
  } else if (have_button_submerge  &&  dist(width-real(13), real(250+25), mouseX, mouseY) < real(10)) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change_submerge();
      }
    }
    open_shake = true;
    time_shake = 0;

    if (open_mountain) {
      open_houseBeginY_followMountainY = false;
      mountain.changeBeginY();
    }
  } else if (have_button_spring  &&  dist(width-real(13), real(250+75), mouseX, mouseY) < real(10)) {
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].change_spring();
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        roadVer[i].changeH();
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        for (let j=0; j<roadHor[i].length; j++) {
          roadHor[i][j].changeH();
        }
      }
    }

    if (open_mountain) {
      mountain.changeH();
    }
  } else if (have_button_invert  &&  dist(width/2, height-real(20), mouseX, mouseY) < real(15)) {
    open_invert = !open_invert;
  } else if (open_TVScreen  &&  dist(width/2+real(130), height-real(20), mouseX, mouseY) < real(10)) {
    open_TVSnow = !open_TVSnow;


    time_TVSnow = 0;
  }
};


function mouseDragged() {
  if (open_fog) {
    FOG_update_wipe();
  }
}


function mousePressed() {
  if (open_winScreen) {
    if (map(mouseX, 0, width, -real(156), real(156)) > node_winScreen_lu.x-real(1.5)  &&  map(mouseX, 0, width, -real(156), real(156)) < node_winScreen_lu.x+real(WH_winFrame[state_winFrame][0])+real(1.5)  &&
      map(mouseY, 0, height, -real(156), real(156)) > node_winScreen_lu.y-real(15)  &&  map(mouseY, 0, height, -real(156), real(156)) < node_winScreen_lu.y) {
      if (!open_winScreen_follow) {
        pos_winScreen_pressed.x = (node_winScreen_lu.x+real(WH_winFrame[state_winFrame][0])/2.0) - map(mouseX, 0, width, -real(156), real(156));
        pos_winScreen_pressed.y = (node_winScreen_lu.y-real(15)/2.0) - map(mouseY, 0, height, -real(156), real(156));
      }
      open_winScreen_follow = true;
    }
  }
}

function mouseReleased() {
  if (open_winScreen) {
    open_winScreen_follow = false;
  }
}


function keyPressed() {
  if (key == ' ') {
    state_winFrame = floor(random(0, WH_winFrame.length));
    if (state_winFrame >= WH_winFrame.length) {
      state_winFrame = 0;
    }
    state_winFrame =  WH_winFrame.length - 1;
    if (state_winFrame == 8) {
      open_TVScreen = true;
    } else {
      open_TVScreen = false;
    }
    if (state_winFrame == 9) {
      open_winScreen = true;
      this.open_winScreen_follow = false;
      this.center_winScreen = createVector(0, 0, real(200));
      this.node_winScreen_lu = createVector(-real(WH_winFrame[state_winFrame][0]/2.0), -real(WH_winFrame[state_winFrame][1]/2.0), real(200));
      this.pos_winScreen_pressed = createVector(0, 0, 0);
    } else {
      open_winScreen = false;
    }

    if (open_TVScreen) {
      this.open_TVSnow = true;
      this.time_TVSnow = 0;

      this.TVSCREEN = createImage(50, 50);
      TVSCREEN.loadPixels();
      for (let i = 0; i < TVSCREEN.width; i++) {
        for (let j = 0; j < TVSCREEN.height; j++) {
          const t = random(0, 1);
          const c = lerpColor(c_sky, c_near, t);
          TVSCREEN.set(i, j, addAlphaToColor(c, 128));
        }
      }
      TVSCREEN.updatePixels();
    }




    state_winDecoration = floor(random(0, 5));
    if (state_winDecoration > 6) {
      state_winDecoration = 0;
    }

    if (state_winDecoration == 2) {
      this.open_follow_shade_hand = new Array(WH_winFrame[state_winFrame][3]);
      this.center_shade_hand_Y = new Array(WH_winFrame[state_winFrame][3]);
      for (let i=0; i<center_shade_hand_Y.length; i++) {
        open_follow_shade_hand[i] = false;
        center_shade_hand_Y[i] = createVector(0, 0, real(200));
      }
    } else if (state_winDecoration == 3) {
      const num = 7;
      this.H_rollUpWin = 0;
      this.open_shade = false;
      this.center_rollUpWin = new Array(num);
      this.node_rollUpWin = Array.from(Array(num), () => new Array(4));
      for (let i=0; i<node_rollUpWin.length; i++) {
        center_rollUpWin[i] = createVector(0, -real(100), real(200));
        for (let j=0; j<node_rollUpWin[i].length; j++) {
          node_rollUpWin[i][j] = createVector(0, -real(100), real(200));
        }
      }
    } else if (state_winDecoration == 4) {
      this.node_curtain = Array.from(Array(2), () => new Array(20));
      for (let i=0; i<2; i++) {
        for (let j=0; j<node_curtain[i].length; j++) {
          node_curtain[i][j] = createVector(-real(100), -real(100), real(200));
        }
      }
      this.open_curtain = false;
    } else if (state_winDecoration == 5) {
      this.FRAME = createGraphics(750, 750);
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }







    state_color = floor(random(0, state_c_all.length));
    if (state_color >= state_c_all.length) {
      state_color = 0;
    }

    //str_info[0] = "ColorMode: "+state_color;

    c_far = color(c_all[state_color][state_c_all[state_color][0]]);
    c_near = color(c_all[state_color][state_c_all[state_color][1]]);
    c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
    c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
    c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
    c_win = color(c_all[state_color][state_c_all[state_color][5]]);

    c_info1 = lerpColor(c_far, c_winFrame, 0.627);
    c_info2 = lerpColor(c_far, c_near, 0.35);
    c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
    c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
    c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
    c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);
    if (have_button_shine) {
      this.c_near_copy = c_near;
    }

    print("------ " + state_color);
    print(c_all[state_color]);
    print(state_c_all[state_color]);
    print("c_sky: "+c_sky);
    print("c_sky_near: "+c_sky_near);
    print("c_winFrame: "+c_winFrame);
    print("c_far: "+c_far);
    print("c_near: "+c_near);
    if (have_button_invert) {
      print("c_sky_copy: "+c_sky_copy);
      print("c_winFrame_copy: "+c_winFrame_copy);
      print("c_far_copy: "+c_far_copy);
      print("c_near_copy: "+c_near_copy);
    }






    document.bgColor = c_all[state_color][state_c_all[state_color][2]];


    if (open_flood) {
      FLOOD.loadPixels();
      for (let i = 0; i < FLOOD.width; i++) {
        for (let j = 0; j < FLOOD.height; j++) {
          const t = map(j, 0, FLOOD.height, 0, 0.75);
          const c = lerpColor(c_sky, c_near, t);
          FLOOD.set(i, j, addAlphaToColor(c, 210));
        }
      }
      FLOOD.updatePixels();
    }


    for (let i=0; i<BILL.length; i++) {
      BILL[i] = createGraphics(floor(random(25, 100)), 25);
      BILL[i].background(addAlphaToColor(c_far, 160));
      BILL[i].noStroke();
      BILL[i].fill(addAlphaToColor(c_far, 60));
      for (let j=0; j<floor(random(6, 20)); j++) {
        let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
        let x = random(0, BILL[i].width-w);
        BILL[i].rect(x, 0, w, BILL[i].height);
      }
    }
    if (have_button_shine) {
      this.open_random_billboard = false;
      this.time_billboard = 0;
    }




    if (state_winDecoration == 5) {
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }
  } else if (key == 'w' || key == 'W') {
    state_winFrame += 1;
    if (state_winFrame >= WH_winFrame.length) {
      state_winFrame = 0;
    }
    if (state_winFrame == 8) {
      open_TVScreen = true;
    } else {
      open_TVScreen = false;
    }
    if (state_winFrame == 9) {
      open_winScreen = true;
      this.open_winScreen_follow = false;
      this.center_winScreen = createVector(0, 0, real(200));
      this.node_winScreen_lu = createVector(-real(WH_winFrame[state_winFrame][0]/2.0), -real(WH_winFrame[state_winFrame][1]/2.0), real(200));
      this.pos_winScreen_pressed = createVector(0, 0, 0);
    } else {
      open_winScreen = false;
    }

    if (open_TVScreen) {
      this.open_TVSnow = true;
      this.time_TVSnow = 0;

      this.TVSCREEN = createImage(50, 50);
      TVSCREEN.loadPixels();
      for (let i = 0; i < TVSCREEN.width; i++) {
        for (let j = 0; j < TVSCREEN.height; j++) {
          const t = random(0, 1);
          const c = lerpColor(c_sky, c_near, t);
          TVSCREEN.set(i, j, addAlphaToColor(c, 128));
        }
      }
      TVSCREEN.updatePixels();
    }
  } else if (key == 'q'  ||  key == 'Q') {
    state_winDecoration += 1;
    if (state_winDecoration > 6) {
      state_winDecoration = 0;
    }

    if (state_winDecoration == 2) {
      this.open_follow_shade_hand = new Array(WH_winFrame[state_winFrame][3]);
      this.center_shade_hand_Y = new Array(WH_winFrame[state_winFrame][3]);
      for (let i=0; i<center_shade_hand_Y.length; i++) {
        open_follow_shade_hand[i] = false;
        center_shade_hand_Y[i] = createVector(0, 0, real(200));
      }
    } else if (state_winDecoration == 3) {
      const num = 7;
      this.H_rollUpWin = 0;
      this.open_shade = false;
      this.center_rollUpWin = new Array(num);
      this.node_rollUpWin = Array.from(Array(num), () => new Array(4));
      for (let i=0; i<node_rollUpWin.length; i++) {
        center_rollUpWin[i] = createVector(0, -real(100), real(200));
        for (let j=0; j<node_rollUpWin[i].length; j++) {
          node_rollUpWin[i][j] = createVector(0, -real(100), real(200));
        }
      }
    } else if (state_winDecoration == 4) {
      this.node_curtain = Array.from(Array(2), () => new Array(20));
      for (let i=0; i<2; i++) {
        for (let j=0; j<node_curtain[i].length; j++) {
          node_curtain[i][j] = createVector(-real(100), -real(100), real(200));
        }
      }
      this.open_curtain = false;
    } else if (state_winDecoration == 5) {
      this.FRAME = createGraphics(750, 750);
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    } else if (state_winDecoration == 6) {
      this.node_handle = Array.from(Array(3), () => new Array(4));
      this.open_handle_follow = new Array(node_handle.length);
      for (let i=0; i<node_handle.length; i++) {
        let x = map(i, 0, node_handle.length-1, -real(225)*0.5*0.6, real(225)*0.5*0.6);
        node_handle[i][0] = createVector(x, -real(125)*0.7, real(200) + real(70));
        node_handle[i][1] = createVector(x, -real(125)*0.7 +real(100)*0.25, real(200) + real(70));
        node_handle[i][2] = p5.Vector.sub(node_handle[i][1], node_handle[i][0]).setMag(real(25)).add(node_handle[i][1]).add(0, 0, real(9));
        node_handle[i][3] = p5.Vector.sub(node_handle[i][1], node_handle[i][0]).setMag(real(25)).add(node_handle[i][1]).add(0, 0, -real(9));

        open_handle_follow[i] = false;
      }
    }
  } else if (key == 'c' || key == 'C') {
    state_color += 1;
    if (state_color >= state_c_all.length) {
      state_color = 0;
    }
    //str_info[0] = "ColorMode: "+state_color;

    c_far = color(c_all[state_color][state_c_all[state_color][0]]);
    c_near = color(c_all[state_color][state_c_all[state_color][1]]);
    c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
    c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
    c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
    c_win = color(c_all[state_color][state_c_all[state_color][5]]);

    c_info1 = lerpColor(c_far, c_winFrame, 0.627);
    c_info2 = lerpColor(c_far, c_near, 0.35);
    c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
    c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
    c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
    c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);
    if (have_button_shine) {
      this.c_near_copy = c_near;
    }



    //if (open_info) {
    //  document.bgColor = c_all[state_c_all[state_color][3]];
    //} else {
    //  document.bgColor = c_all[state_c_all[state_color][2]];
    //}
    document.bgColor = c_all[state_color][state_c_all[state_color][2]];


    if (open_flood) {
      FLOOD.loadPixels();
      for (let i = 0; i < FLOOD.width; i++) {
        for (let j = 0; j < FLOOD.height; j++) {
          const t = map(j, 0, FLOOD.height, 0, 0.75);
          const c = lerpColor(c_sky, c_near, t);
          FLOOD.set(i, j, addAlphaToColor(c, 210));
        }
      }
      FLOOD.updatePixels();
    }


    for (let i=0; i<BILL.length; i++) {
      BILL[i] = createGraphics(floor(random(25, 100)), 25);
      BILL[i].background(addAlphaToColor(c_far, 160));
      BILL[i].noStroke();
      BILL[i].fill(addAlphaToColor(c_far, 60));
      for (let j=0; j<floor(random(6, 20)); j++) {
        let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
        let x = random(0, BILL[i].width-w);
        BILL[i].rect(x, 0, w, BILL[i].height);
      }
    }
    if (have_button_shine) {
      this.open_random_billboard = false;
      this.time_billboard = 0;
    }
    if (have_button_invert) {
      this.c_sky_copy = c_sky;
      this.c_winFrame_copy = c_winFrame;
      this.c_far_copy = c_far;
      if (!have_button_shine) { 
        this.c_near_copy = c_near;
      }
      this.open_invert = false;
      this.time_invert = 0;
      this.x_button_invert = -real(4.5);
    }




    if (state_winDecoration == 5) {
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }
  } else if (key == 's' || key == 'S') {
    save("Tamsui_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
  } else if (key == '1') {
    if (have_button_invert) {
      open_invert = !open_invert;
    }
  } else if (key == 't') {
    open_stop = true;
    time_stop = 0;
    open_sprint = false;
    time_sprint = 0;
  } else if (key == 'n') {
    noLoop();
  }
}
