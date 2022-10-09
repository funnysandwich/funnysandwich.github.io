// include a comment about LICENSE.md in io.js
// Copyright 2022 funnysandwich.tez
function keyPressed() {
  if (!is_phone) {
    if (key == 'i'  ||  key == 'I') {
      open_info = !open_info;
    } else if (key == 's'  ||  key == 'S') {
      save("StraightMaze_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
    }
  }
}






function mousePressed() {
  corridor = [];
  corridor2 = [];
  corridor3 = [];
  count_corridor -= 8;
  for (let i=0; i<8; i++) {
    corridor.push(new Corridor(count_corridor, i, createVector(0, 0, 0), 1));
    corridor2.push(new Corridor(count_corridor, i, createVector(-real(750), 0, 0), 2));
    corridor3.push(new Corridor(count_corridor, i, createVector(real(750), 0, 0), 3));    
    count_corridor ++;
  }

  if (is_phone) {
    return false;
  }
}
//@funnysandwich
