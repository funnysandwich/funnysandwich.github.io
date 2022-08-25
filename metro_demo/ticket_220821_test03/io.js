function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == 's'  ||  key == 'S') {
      save("Test_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    } else if (key == " ") {
      location.reload();
    } else if (key == 'c'  ||  key == 'C') {
      state_color ++;
      if (state_color == c_all.length) {
        state_color = 0;
      }


      c_bkg = c_all[state_color][2];
      document.bgColor = '000000';
      c_bkg = convertToRGB(c_bkg);
      background(c_bkg);

      c_info = color(200);
      c_ticket = c_all[state_color][0];
      c_ticket = convertToRGB(c_ticket);
      c_ticket_light = changeBrightness(c_bkg, -15);
      c_text = c_all[state_color][1];
      c_text = convertToRGB(c_text);
      c_text2 = lerpColor(c_ticket, c_text, 0.5);

      F = createGraphics(floor(W_ticket*scaleRate), floor(H_ticket*scaleRate));
      drawF();
      B = createGraphics(F.width, F.height);
      drawB();
    }
  }
}






function mousePressed() {
  var_flash = mouseX;

  if (state_click == 1) {
    open_split = true;
  } else if (state_click == 2) {
    open_sprint = true;
    time_sprint = 0;
  } else if (state_click == 3) {
    if (open_light_shine) {
      time_swipe = 8;
    }
    open_swipe = true;
  } else if (state_click == 4) {
    open_jump = true;
  } else if (state_click == 5) {
    if (!open_spring) {
      count_click_spring ++;
      if (count_click_spring == 4) {
        open_spring = true;
      }
    }
  }else if(state_click == 6){
    open_win = true;
  } else if (state_click == 7) {
    open_light = true;
  }

  if (is_phone) {
    return false;
  }
}


function mouseDragged() {
  open_follow = true;

  if (is_phone) {
    return false;
  }
}

function mouseReleased() {
  open_follow = false;

  if (is_phone) {
    return false;
  }
}