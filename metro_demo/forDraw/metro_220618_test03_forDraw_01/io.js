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

  if (have_button_stop  &&  dist(real(13), real(300), mouseX, mouseY) < real(10)) {
    open_stop = true;
    time_stop = 0;
    open_sprint = false;
    time_sprint = 0;
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
  } else {
    if (state_click == 0) {
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
          roadHor[i].change();
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
        mountain.change();
      }
    } else if (state_click == 1) {
      open_light = true;
      time_light = 0;

      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }

      open_random_billboard = true;
      time_billboard = 0;

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 2) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }
      open_shake = true;
      time_shake = 0;

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 3) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 4) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }
    }
  }
};


function mouseDragged() {
  if (open_fog) {
    FOG_update_wipe();
  }
}


function keyPressed() {
  if (key == ' ') {
    open_stop = true;
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

    if (open_TVScreen) {
      this.open_TVSnow = false;

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
    open_frame = !open_frame;
  }else if (key == 'c' || key == 'C') {
    state_color += 1;
    if (state_color >= state_c_all.length) {
      state_color = 0;
    }
    str_info[0] = "ColorMode: "+state_color;

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
    if (state_click == 1) {
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
    if (state_click == 1) {
      this.open_random_billboard = false;
      this.time_billboard = 0;
    }




    if (state_winDecoration == 5) {
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }
  } else if (key == 's' || key == 'S') {
    save("Tamsui_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
  }else if(key == 'g' || key == 'G'){
   open_green = !open_green; 
  }
}