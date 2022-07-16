function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == ' ') {
      speed = 0;
    } else if (key == 's'  ||  key == 'S') {
      save("LH_forest_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    }
  }
}






function mousePressed() {
  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {
      let be = blocks[i].begin.copy();
      let w = blocks[i].W;
      let d = blocks[i].D;
      let index_x = blocks[i].index_x;
      blocks[i] = new Block(be, w, d, index_x);
    }


    for (let i=0; i<blocks.length; i++) {
      if (blocks[i].is_house                            &&
        blocks[i].index_x != 0                          &&
        blocks[i].index_x != 4                          &&
        blocks[i].index_x != 5                          &&
        blocks[i+1].is_house                            &&
        blocks[i+1].index_x - blocks[i].index_x == 1    &&
        blocks[i].house.show_win_side.length > 1        &&
        blocks[i+1].house.show_win_side.length > 1
        ) {

        let index_win_rope = 0.0;
        for (let j=1; j<blocks[i].house.node_win_side.length; j++) {
          for (let k=0; k<blocks[i].house.node_win_side[j].length; k++) {
            if (blocks[i].house.show_win_side[j][k]) {
              if (random(1) < map(j, 1, 7, 0.85, 0.01)) {
                index_win_rope = j;
                index_win_rope += k*0.1;
                break;
              }
            }
          }
        }

        if (index_win_rope > 0.0) {
          let index_winOther_rope = 0.0;
          for (let j=1; j<blocks[i+1].house.node_win_side.length; j++) {
            for (let k=0; k<blocks[i+1].house.node_win_side[j].length; k++) {
              if (blocks[i+1].house.show_win_side[j][k]) {
                if (random(1) < map(abs(j-index_win_rope), 0, 3, 0.85, 0.01)) {
                  index_winOther_rope = j;
                  index_winOther_rope += k*0.1;
                  break;
                }
              }
            }
          }

          if (index_winOther_rope > 0.0) {
            blocks[i].house.have_rope = true;
            blocks[i].house.index_rope_i = floor(index_win_rope);
            blocks[i].house.index_rope_j = floor((index_win_rope-floor(index_win_rope))*10);
            blocks[i].house.index_ropeOther_i = floor(index_winOther_rope);
            blocks[i].house.index_ropeOther_j = floor((index_winOther_rope-floor(index_winOther_rope))*10);
          }
        }
      }
    }
  }

  if (is_phone) {
    return false;
  }
}
