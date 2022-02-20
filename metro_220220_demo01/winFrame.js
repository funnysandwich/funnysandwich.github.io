function drawWinFrame(w, h, w_fillet, num, state, gap) {
  const z = real(200);

  if (!open_info) {
    noStroke();
    fill(c_winFrame);
  } else {
    noFill();
    stroke(lerpColor(c_info2, c_sky, 0.5));
    strokeWeight(real(1));
  }



  if (num == 1) {
    const node = new Array(10*4);

    for (let i=0; i<node.length; i++) {
      const x = cos(map(i, 0, node.length-1, -PI, PI)) * (w_fillet*0.5);
      const y = sin(map(i, 0, node.length-1, -PI, PI)) * (w_fillet*0.5) + Y_shake;
      if (i < floor(node.length/4)) {
        node[i] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, z);
      } else if (i < floor(node.length/4)*2) {
        node[i] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, z);
      } else if (i < floor(node.length/4)*3) {
        node[i] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, z);
      } else {
        node[i] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, z);
      }
    }


    for (let j=0; j<4; j++) {
      beginShape(TESS);
      if (j==0) {
        vertex(-width*0.75, 0, z);
      } else if (j==1) {
        vertex(0, -height*0.75, z);
      } else if (j==2) {
        vertex(width*0.75, 0, z);
      } else {
        vertex(0, height*0.75, z);
      }
      for (let i=floor(node.length/4)*j; i<floor(node.length/4)*(j+1)+1; i++) {
        vertex(node[i%node.length].x, node[i%node.length].y, node[i%node.length].z);
      }
      if (j==0) {
        vertex(0, -height*0.75, z);
      } else if (j==1) {
        vertex(width*0.75, 0, z);
      } else if (j==2) {
        vertex(0, height*0.75, z);
      } else {
        vertex(-width*0.75, 0, z);
      }
      endShape(CLOSE);
    }
  } else {
    if (state == 0) {
      const node = Array.from(Array(num), () => new Array(10*4));
      for (let i=0; i<num; i++) {
        const x_center = -((gap*(num-1)/2.0) + w*num/2.0)  +  w/2.0  +  i*(w+gap);
        for (let j=0; j<node[i].length; j++) {
          const x = cos(map(j, 0, node[i].length-1, -PI, PI)) * (w_fillet*0.5);
          const y = sin(map(j, 0, node[i].length-1, -PI, PI)) * (w_fillet*0.5) + Y_shake;
          if (j < floor(node[i].length/4)) {
            node[i][j] = createVector(x_center +x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, z);
          } else if (j < floor(node[i].length/4)*2) {
            node[i][j] = createVector(x_center +x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5, z);
          } else if (j < floor(node[i].length/4)*3) {
            node[i][j] = createVector(x_center +x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, z);
          } else {
            node[i][j] = createVector(x_center +x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5, z);
          }
        }
      }

      for (let i=0; i<4; i++) {
        beginShape(TESS);
        let iii = 0;
        if (i == 0) {
          iii = 0;
          vertex(-width*0.75, 0, z);
        } else if (i == 1) {
          iii = num - 1;
          vertex(0, -height*0.75, z);
        } else if (i == 2) {
          iii = num - 1;
          vertex(width*0.75, 0, z);
        } else {
          iii = 0;
          vertex(0, height*0.75, z);
        }
        for (let j=floor(node[iii].length/4)*i; j<floor(node[iii].length/4)*(i+1)+1; j++) {
          vertex(node[iii][j%node[iii].length].x, node[iii][j%node[iii].length].y, node[iii][j%node[iii].length].z);
        }
        if (i == 0) {
          for (let j=0; j<num-1; j++) {
            vertex(node[j+1][floor(node[j].length/4)-1].x, node[j+1][floor(node[j].length/4)-1].y, node[j+1][floor(node[j].length/4)-1].z);
            vertex(node[j+1][floor(node[j].length/4)].x, node[j+1][floor(node[j].length/4)].y, node[j+1][floor(node[j].length/4)].z);
          }
          vertex(0, -height*0.75, z);
        } else if (i ==1 ) {
          vertex(width*0.75, 0, z);
        } else if (i == 2) {
          for (let j=num-1; j>=0+1; j--) {
            vertex(node[j-1][floor(node[j].length/4)*3-1].x, node[j-1][floor(node[j].length/4)*3-1].y, node[j-1][floor(node[j].length/4)*3-1].z);
            vertex(node[j-1][floor(node[j].length/4)*3].x, node[j-1][floor(node[j].length/4)*3].y, node[j-1][floor(node[j].length/4)*3].z);
          }
          vertex(0, height*0.75, z);
        } else {
          vertex(-width*0.75, 0, z);
        }
        endShape(CLOSE);
      }

      for (let i=0; i<num-1; i++) {
        beginShape(TESS);
        for (let j=floor(node[0].length/4); j<floor(node[0].length/4) *3; j++) {
          vertex(node[i][j].x, node[i][j].y, node[i][j].z);
        }
        for (let j=floor(node[0].length/4) *3; j<node[0].length; j++) {
          vertex(node[i+1][j].x, node[i+1][j].y, node[i+1][j].z);
        }
        for (let j=0; j<floor(node[0].length/4); j++) {
          vertex(node[i+1][j].x, node[i+1][j].y, node[i+1][j].z);
        }
        endShape(CLOSE);
      }
    }
  }















  if (have_button_stop) { // Left :-135 -141  width:20
    const center = createVector(-real(141+6), real(30), z+real(2));
    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      noStroke();
    } else {
      stroke(c_info2);
      noFill();
      strokeWeight(real(1));
    }
    beginShape();
    const angle_error = HALF_PI - (PI - 2*((6-2)*PI/6.0/2.0));
    for (let i=0; i<6; i++) {
      const x = cos(map(i, 0, 6, 0, TWO_PI)-angle_error) * real(6);
      const y = sin(map(i, 0, 6, 0, TWO_PI)-angle_error) * real(6);
      vertex(center.x+x, center.y+y, center.z);
    }
    endShape(CLOSE);


    // print("X: "+mouseX+"  , Y: "+mouseY);
    if (!open_info) {
      if (dist(real(13), real(300), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
        if (open_stop) {
          fill(lerpColor(c_winFrame, c_far, 0.35));
        }
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
    } else {
      stroke(c_info2);
      noFill();
      strokeWeight(real(1));
    }
    beginShape();
    for (let i=0; i<10; i++) {
      const x = cos(map(i, 0, 10, 0, TWO_PI)) * real(3);
      const y = sin(map(i, 0, 10, 0, TWO_PI)) * real(3);
      vertex(center.x+x+real(0.5), center.y+y, center.z+real(1));
    }
    endShape(CLOSE);
  }
}
