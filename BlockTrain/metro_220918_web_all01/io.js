
function mouseClicked() {

  //------- loadSongs -------
  if (is_song_load_done  &&  !open_play  &&  var_loading == 1) {
    open_play = true;
    song_track.setVolume(0);
    song_track.loop();
    if (songs.length > 0) {
      for (let i=0; i<songs.length; i++) {
        songs[i].setVolume(0);
        songs[i].loop();
      }
    }
    if (songs_object.length > 0) {
      for (let i=0; i<songs_object.length; i++) {
        songs_object[i].setVolume(0);
        songs_object[i].loop();
      }
    }
    div.hide();
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
    if (songs_object.length > 0) {
      for (let i=0; i<songs_object.length; i++) {
        songs_object[i].pause();
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

    if (state_winDecoration == 10) {
      open_LED_shine = true;
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
  } else {
    if (state_winDecoration == 7) {
      open_shutter = true;
    } else if (state_winDecoration == 8) {
      if (is_onTheGround) {
        open_flash = true;
      }
    } else if (state_winDecoration == 10) {
      open_LED_shine = true;
    }
  }
  if (is_phone) {
    time_touch = 0;
    return false;
  }
}


function mouseDragged() {
  if (open_fog) {
    FOG_update_wipe();
  }
  if (is_phone) {
    time_touch = 0;
    return false;
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
  if (is_phone) {
    time_touch = 0;
    return false;
  }
}

function mouseReleased() {
  if (open_winScreen) {
    open_winScreen_follow = false;
  }
  if (is_phone) {
    time_touch = 0;
    return false;
  }
}


function keyPressed() {
  if (key == 'i'  ||  key == 'I') {
    open_info = !open_info;
    if (state_winDecoration == 5) {
      drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
    }
  } else if (key == 's' || key == 'S') {
    save("BlockTrain_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".png");
  }
}