function drawWinFrame(w, h, w_fillet, num, state, gap) {
  const z = real(200);

  if (!open_info) {
    noStroke();
    fill(c_winFrame);
    beginShape(TRIANGLES);
  } else {
    noFill();
    stroke(lerpColor(c_info2, c_sky, 0.5));
    strokeWeight(real(1));
    beginShape(LINES);
  }



  if (num == 1) {
    if (state == 0) {
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
      if (!open_info) {
        for (let j=0; j<4; j++) {

          for (let i=floor(node.length/4)*j; i<floor(node.length/4)*(j+1)-1; i++) {
            if (j == 0) {
              vertex(-width*0.75, -height*0.75, z);
            } else if (j == 1) {
              vertex(width*0.75, -height*0.75, z);
            } else if (j == 2) {
              vertex(width*0.75, height*0.75, z);
            } else {
              vertex(-width*0.75, height*0.75, z);
            }
            vertex(node[i%node.length].x, node[i%node.length].y, node[i%node.length].z);
            vertex(node[(i+1)%node.length].x, node[(i+1)%node.length].y, node[(i+1)%node.length].z);
          }
        }
        TRIANGLES_getRect(node[node.length/4-1], node[node.length/4], createVector(width*0.75, -height*0.75, z), createVector(-width*0.75, -height*0.75, z));
        TRIANGLES_getRect(node[node.length/4*2-1], node[node.length/4*2], createVector(width*0.75, height*0.75, z), createVector(width*0.75, -height*0.75, z));
        TRIANGLES_getRect(node[node.length/4*3-1], node[node.length/4*3], createVector(-width*0.75, height*0.75, z), createVector(width*0.75, height*0.75, z));
        TRIANGLES_getRect(node[node.length-1], node[0], createVector(-width*0.75, -height*0.75, z), createVector(-width*0.75, height*0.75, z));
      } else {
        for (let i=0; i<node.length; i++) {
          vertex(node[i].x, node[i].y, node[i].z);
          vertex(node[(i+1)%node.length].x, node[(i+1)%node.length].y, node[(i+1)%node.length].z);
        }
      }

      if (state_winDecoration == 1) {
        drawSubmarineWin(node, z, num);
      } else if (state_winDecoration == 2) {
        drawWinShade(node, w, h, z, 0);
      } else if (state_winDecoration == 3) {
        drawRollUpWin(createVector(0, node[node.length/4-1].y, z), w, h, z);
      } else if (state_winDecoration == 4) {
        drawCurtain(w, h, z);
      }
    } else if (state == 1) {
      const node = new Array(4*4);
      for (let i=0; i<node.length; i++) {
        let x, y;
        if (i < floor(node.length/4)) {
          x = map(i, 0, node.length/4, -w/2.0, w/2.0);
          y = sin(map(i, 0, node.length/4, 0, PI)) * (-w_fillet) - h/2.0;
        } else if (i < floor(node.length/4)*2) {
          x = sin(map(i, node.length/4, node.length/4*2, 0, PI)) * (w_fillet) + w/2.0;
          y = map(i, node.length/4, node.length/4*2, -h/2.0, h/2.0);
        } else if (i < floor(node.length/4)*3) {
          x = map(i, node.length/4*2, node.length/4*3, w/2.0, -w/2.0);
          y = sin(map(i, node.length/4*2, node.length/4*3, 0, PI)) * (w_fillet) + h/2.0;
        } else {
          x = sin(map(i, node.length/4*3, node.length, 0, PI)) * (-w_fillet) - w/2.0;
          y = map(i, node.length/4*3, node.length, h/2.0, -h/2.0);
        }
        node[i] = createVector(x, y + Y_shake, z);
      }

      if (!open_info) {
        for (let j=0; j<4; j++) {

          for (let i=floor(node.length/4)*j; i<floor(node.length/4)*(j+1)-1; i++) {
            if (j == 0) {
              vertex(-width*0.75, -height*0.75, z);
            } else if (j == 1) {
              vertex(width*0.75, -height*0.75, z);
            } else if (j == 2) {
              vertex(width*0.75, height*0.75, z);
            } else {
              vertex(-width*0.75, height*0.75, z);
            }
            vertex(node[i%node.length].x, node[i%node.length].y, node[i%node.length].z);
            vertex(node[(i+1)%node.length].x, node[(i+1)%node.length].y, node[(i+1)%node.length].z);
          }
        }
        TRIANGLES_getRect(node[node.length/4-1], node[node.length/4], createVector(width*0.75, -height*0.75, z), createVector(-width*0.75, -height*0.75, z));
        TRIANGLES_getRect(node[node.length/4*2-1], node[node.length/4*2], createVector(width*0.75, height*0.75, z), createVector(width*0.75, -height*0.75, z));
        TRIANGLES_getRect(node[node.length/4*3-1], node[node.length/4*3], createVector(-width*0.75, height*0.75, z), createVector(width*0.75, height*0.75, z));
        TRIANGLES_getRect(node[node.length-1], node[0], createVector(-width*0.75, -height*0.75, z), createVector(-width*0.75, height*0.75, z));




        let moveW = real(8.5);
        let moveH = real(8);
        const node2 = new Array(4*4);
        for (let i=0; i<node2.length; i++) {
          let x, y;
          if (i < floor(node2.length/4)) {
            x = map(i, 0, node2.length/4, -w/2.0-moveW, w/2.0+moveW);
            y = -h/2.0 -moveH;
          } else if (i < floor(node2.length/4)*2) {
            x = w/2.0 +moveW;
            y = map(i, node2.length/4, node2.length/4*2, -h/2.0-moveH, h/2.0+moveH);
          } else if (i < floor(node2.length/4)*3) {
            x = map(i, node2.length/4*2, node2.length/4*3, w/2.0+moveW, -w/2.0-moveW);
            y =  h/2.0 +moveH;
          } else {
            x =  -w/2.0 -moveW;
            y = map(i, node2.length/4*3, node2.length, h/2.0+moveH, -h/2.0-moveH);
          }
          node2[i] = createVector(x, y + Y_shake, z+real(1));
        }




        moveW = real(10);
        moveH = real(7);
        const m_W = 0;//map(mouseX, 0, width, real(5), -real(5));
        const m_H = 0;//map(mouseY, 0, height, real(2.5), -real(2.5));
        let c2 = lerpColor(c_winFrame, c_sky, map(noise(frameCount/7.0), 0, 1, 0.03, 0.17));
        if (have_button_shine  &&  time_billboard > 0) {
          c2 = lerpColor(c_winFrame, c_sky, map(sin(map(time_billboard, 0, 10, 0, PI)), 0, 1, 0.1, 0.25));
        }
        let c1 = lerpColor(c_winFrame, color(0), 0);
        TRIANGLES_getRect_fill4(node2[0], node2[node2.length/4*3], node2[node2.length/4*3].copy().add(-moveW+m_W, moveH+m_H, 0), node2[0].copy().add(-moveW+m_W, -moveH+m_H, 0), c2, c2, c1, c1);
        TRIANGLES_getRect_fill4(node2[0], node2[node2.length/4*1], node2[node2.length/4*1].copy().add(moveW+m_W, -moveH+m_H, 0), node2[0].copy().add(-moveW+m_W, -moveH+m_H, 0), c2, c2, c1, c1);
        TRIANGLES_getRect_fill4(node2[node2.length/4*1], node2[node2.length/4*2], node2[node2.length/4*2].copy().add(moveW+m_W, moveH+m_H, 0), node2[node2.length/4*1].copy().add(moveW+m_W, -moveH+m_H, 0), c2, c2, c1, c1);
        TRIANGLES_getRect_fill4(node2[node2.length/4*2], node2[node2.length/4*3], node2[node2.length/4*3].copy().add(-moveW+m_W, moveH+m_H, 0), node2[node2.length/4*2].copy().add(moveW+m_W, moveH+m_H, 0), c2, c2, c1, c1);


        c2 = lerpColor(c_winFrame, c_sky, 0.15);
        if (have_button_shine  &&  time_billboard > 0) {
          c2 = lerpColor(c_winFrame, c_sky, map(sin(map(time_billboard, 0, 10, 0, PI)), 0, 1, 0.15, 0.45));
        }
        TRIANGLES_getLine_weight_fill2(node2[0].copy().add(0, 0, real(0.5)), node2[0].copy().add(-moveW+m_W, -moveH+m_H, 0), real(2), c2, c1);
        TRIANGLES_getLine_weight_fill2(node2[node2.length/4*1].copy().add(0, 0, real(0.5)), node2[node2.length/4*1].copy().add(moveW+m_W, -moveH+m_H, 0), real(2), c2, c1);
        TRIANGLES_getLine_weight_fill2(node2[node2.length/4*2].copy().add(0, 0, real(0.5)), node2[node2.length/4*2].copy().add(moveW+m_W, moveH+m_H, 0), real(2), c2, c1);
        TRIANGLES_getLine_weight_fill2(node2[node2.length/4*3].copy().add(0, 0, real(0.5)), node2[node2.length/4*3].copy().add(-moveW+m_W, moveH+m_H, 0), real(2), c2, c1);
      } else {
        for (let i=0; i<node.length; i++) {
          vertex(node[i].x, node[i].y, node[i].z);
          vertex(node[(i+1)%node.length].x, node[(i+1)%node.length].y, node[(i+1)%node.length].z);
        }
      }
    }
  } else {
    if (state == 0) {
      const detail = floor(map(num, 2, 3, 8, 6));
      const node = Array.from(Array(num), () => new Array(detail*4));
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


      if (!open_info) {
        for (let i=0; i<num; i++) {
          for (let j=0; j<4; j++) {
            for (let k=floor(node[i].length/4)*j; k<floor(node[i].length/4)*(j+1)-1; k++) {
              if (i == 0  && j == 0 ) {
                vertex(-width*0.75, -height*0.75, z);
              } else if (i == num-1  && j == 1 ) {
                vertex(width*0.75, -height*0.75, z);
              } else if (i == num-1  && j == 2 ) {
                vertex(width*0.75, height*0.75, z);
              } else if (i == 0  && j == 3 ) {
                vertex(-width*0.75, height*0.75, z);
              } else if (j == 1) {
                vertex((node[i][node[i].length/4*2-1].x+node[i+1][0].x)/2.0, -height*0.5, z);
              } else if (j == 0) {
                vertex((node[i-1][node[i].length/4*2-1].x+node[i][0].x)/2.0, -height*0.5, z);
              } else if (j == 2) {
                vertex((node[i][node[i].length/4*2].x+node[i+1][node[i].length-1].x)/2.0, height*0.5, z);
              } else if (j == 3) {
                vertex((node[i-1][node[i].length/4*2].x+node[i][node[i].length-1].x)/2.0, height*0.5, z);
              }
              vertex(node[i][k].x, node[i][k].y, node[i][k].z);
              vertex(node[i][k+1].x, node[i][k+1].y, node[i][k+1].z);
            }
          }
        }

        for (let i=0; i<num; i++) {
          if (i == 0) {
            TRIANGLES_getRect(node[i][node[i].length-1], node[i][0], createVector(-width*0.75, -height*0.75, z), createVector(-width*0.75, height*0.75, z));
            //U
            TRIANGLES_getRect(node[i][node[i].length/4-1], node[i][node[i].length/4], createVector((node[i][node[i].length/4*2-1].x+node[i+1][0].x)/2.0, -height*0.5, z), createVector(-width*0.75, -height*0.75, z));
            //D
            TRIANGLES_getRect(node[i][node[i].length/4*3-1], node[i][node[i].length/4*3], createVector(-width*0.75, height*0.75, z), createVector((node[i][node[i].length/4*2].x+node[i+1][node[i].length-1].x)/2.0, height*0.5, z));
          } else if (i == num-1) {
            TRIANGLES_getRect(node[i][node[i].length/4*2-1], node[i][node[i].length/4*2], createVector(width*0.75, height*0.75, z), createVector(width*0.75, -height*0.75, z));
            //U
            TRIANGLES_getRect(node[i][node[i].length/4-1], node[i][node[i].length/4], createVector(width*0.75, -height*0.75, z), createVector((node[i-1][node[i].length/4*2-1].x+node[i][0].x)/2.0, -height*0.5, z));
            //D
            TRIANGLES_getRect(node[i][node[i].length/4*3-1], node[i][node[i].length/4*3], createVector((node[i-1][node[i].length/4*2].x+node[i][node[i].length-1].x)/2.0, height*0.5, z), createVector(width*0.75, height*0.75, z));
          } else {
            //U
            TRIANGLES_getRect(node[i][node[i].length/4-1], node[i][node[i].length/4], createVector((node[i][node[i].length/4*2-1].x+node[i+1][0].x)/2.0, -height*0.5, z), createVector((node[i-1][node[i].length/4*2-1].x+node[i][0].x)/2.0, -height*0.5, z));
            //D
            TRIANGLES_getRect(node[i][node[i].length/4*3-1], node[i][node[i].length/4*3], createVector((node[i-1][node[i].length/4*2].x+node[i][node[i].length-1].x)/2.0, height*0.5, z), createVector((node[i][node[i].length/4*2].x+node[i+1][node[i].length-1].x)/2.0, height*0.5, z));
          }

          if (i < num-1) {
            //R
            TRIANGLES_getRect(node[i][node[i].length/4*2-1], node[i][node[i].length/4*2], node[i+1][node[i].length-1], node[i+1][0]); 
            TRIANGLES_getTriangle(node[i][node[i].length/4*2-1], node[i+1][0], createVector((node[i][node[i].length/4*2-1].x+node[i+1][0].x)/2.0, -height*0.5, z));
            TRIANGLES_getTriangle(node[i][node[i].length/4*2], node[i+1][node[i].length-1], createVector((node[i][node[i].length/4*2].x+node[i+1][node[i].length-1].x)/2.0, height*0.5, z));
          } else if (i > 0) {
            //L
            TRIANGLES_getRect(node[i][node[i].length-1], node[i][0], node[i-1][node[i].length/4*2-1], node[i-1][node[i].length/4*2]);
            TRIANGLES_getTriangle(node[i][0], node[i-1][node[i].length/4*2-1], createVector((node[i][0].x+node[i-1][node[i].length/4*2-1].x)/2.0, -height*0.5, z));
            TRIANGLES_getTriangle(node[i][node[i].length-1], node[i-1][node[i].length/4*2], createVector((node[i][node[i].length-1].x+node[i-1][node[i].length/4*2].x)/2.0, height*0.5, z));
          }
        }
      } else {
        for (let i=0; i<num; i++) {
          for (let j=0; j<node[i].length; j++) {
            vertex(node[i][j].x, node[i][j].y, node[i][j].z);
            vertex(node[i][(j+1)%node[i].length].x, node[i][(j+1)%node[i].length].y, node[i][(j+1)%node[i].length].z);
          }
        }
      }




      if (state_winDecoration == 1) {
        for (let i=0; i<num; i++) {
          drawSubmarineWin(node[i], z, num);
        }
      } else if (state_winDecoration == 2) {
        for (let i=0; i<num; i++) {
          drawWinShade(node[i], w, h, z, i);
        }
      } else if (state_winDecoration == 3) {
        drawRollUpWin(p5.Vector.add(node[0][node[0].length/4-1], node[node.length-1][node[0].length/4]).mult(0.5), p5.Vector.dist(node[0][0], node[node.length-1][node[0].length/4*2-1]), p5.Vector.dist(node[0][node[0].length/4-1], node[0][node[0].length/4*3]), z);
      } else if (state_winDecoration == 4) {
        drawCurtain(p5.Vector.dist(node[0][0], node[node.length-1][node[0].length/4*2-1]), p5.Vector.dist(node[0][node[0].length/4-1], node[0][node[0].length/4*3]), z);
      }





      /*
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
       
       
       */
    }
  }










































  //-----------------------------------------------------------------------
  //------------------------------⬇ button ⬇------------------------------
  //-----------------------------------------------------------------------




  if (have_button_stop) { // Left :-135 -141  width:20
    const center = createVector(-real(141+6), real(30)+Y_shake, z+real(2));
    const node_button = new Array(6);
    const angle_error = HALF_PI - (PI - 2*((node_button.length-2)*PI/node_button.length/2.0));
    for (let i=0; i<node_button.length; i++) {
      const x = cos(map(i, 0, node_button.length, 0, TWO_PI)-angle_error) * real(6);
      const y = sin(map(i, 0, node_button.length, 0, TWO_PI)-angle_error) * real(6);
      node_button[i] = createVector(center.x+x, center.y+y, center.z);
    }
    const node_button2 = new Array(10);
    for (let i=0; i<node_button2.length; i++) {
      const x = cos(map(i, 0, node_button2.length, 0, TWO_PI)) * real(3);
      const y = sin(map(i, 0, node_button2.length, 0, TWO_PI)) * real(3);
      node_button2[i] = createVector(center.x+x+real(0.5), center.y+y, center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      for (let i=0; i<node_button.length-2; i++) {
        vertex(node_button[0].x, node_button[0].y, node_button[0].z);
        vertex(node_button[i+1].x, node_button[i+1].y, node_button[i+1].z);
        vertex(node_button[i+2].x, node_button[i+2].y, node_button[i+2].z);
      }

      if (dist(real(13), real(300), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
        if (open_stop) {
          fill(lerpColor(c_winFrame, c_far, 0.35));
        }
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      for (let i=0; i<node_button2.length-2; i++) {
        vertex(node_button2[0].x, node_button2[0].y, node_button2[0].z);
        vertex(node_button2[i+1].x, node_button2[i+1].y, node_button2[i+1].z);
        vertex(node_button2[i+2].x, node_button2[i+2].y, node_button2[i+2].z);
      }
    } else {
      for (let i=0; i<node_button.length; i++) {
        vertex(node_button[i].x, node_button[i].y, node_button[i].z);
        vertex(node_button[(i+1)%node_button.length].x, node_button[(i+1)%node_button.length].y, node_button[(i+1)%node_button.length].z);
      }
      for (let i=0; i<node_button2.length; i++) {
        vertex(node_button2[i].x, node_button2[i].y, node_button2[i].z);
        vertex(node_button2[(i+1)%node_button2.length].x, node_button2[(i+1)%node_button2.length].y, node_button2[(i+1)%node_button2.length].z);
      }
    }
  }








  if (have_button_sprint) {
    const center = createVector(-real(141+6), real(0)+Y_shake, z+real(2));
    const node_button = new Array(3);
    const angle_error = HALF_PI - (PI - 2*((6-2)*PI/6.0/2.0));
    for (let i=0; i<node_button.length; i++) {
      const x = cos(map(i, 0, node_button.length, 0, TWO_PI)+PI) * real(7);
      const y = sin(map(i, 0, node_button.length, 0, TWO_PI)+PI) * real(7);
      node_button[i] = createVector(center.x+x, center.y+y, center.z);
    }
    const node_button2 = new Array(3);
    for (let i=0; i<node_button2.length; i++) {
      const x = cos(map(i, 0, node_button2.length, 0, TWO_PI)+PI) * real(3.5);
      const y = sin(map(i, 0, node_button2.length, 0, TWO_PI)+PI) * real(3.5);
      node_button2[i] = createVector(center.x+x+real(0.5), center.y+y, center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      for (let i=0; i<node_button.length-2; i++) {
        vertex(node_button[0].x, node_button[0].y, node_button[0].z);
        vertex(node_button[i+1].x, node_button[i+1].y, node_button[i+1].z);
        vertex(node_button[i+2].x, node_button[i+2].y, node_button[i+2].z);
      }

      if (dist(real(13), real(250), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      for (let i=0; i<node_button2.length-2; i++) {
        vertex(node_button2[0].x, node_button2[0].y, node_button2[0].z);
        vertex(node_button2[i+1].x, node_button2[i+1].y, node_button2[i+1].z);
        vertex(node_button2[i+2].x, node_button2[i+2].y, node_button2[i+2].z);
      }
    } else {
      for (let i=0; i<node_button.length; i++) {
        vertex(node_button[i].x, node_button[i].y, node_button[i].z);
        vertex(node_button[(i+1)%node_button.length].x, node_button[(i+1)%node_button.length].y, node_button[(i+1)%node_button.length].z);
      }
      for (let i=0; i<node_button2.length; i++) {
        vertex(node_button2[i].x, node_button2[i].y, node_button2[i].z);
        vertex(node_button2[(i+1)%node_button2.length].x, node_button2[(i+1)%node_button2.length].y, node_button2[(i+1)%node_button2.length].z);
      }
    }
  }




  if (have_button_jump) {
    const center = createVector(-real(141+6), real(-30)+Y_shake, z+real(2));
    const node_button = new Array(3);
    const angle_error = PI/6.0;
    for (let i=0; i<node_button.length; i++) {
      const x = cos(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(7);
      const y = sin(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(7);
      node_button[i] = createVector(center.x+x, center.y+y, center.z);
    }
    const node_button2 = new Array(3);
    for (let i=0; i<node_button2.length; i++) {
      const x = cos(map(i, 0, node_button2.length, 0, TWO_PI)+angle_error) * real(3.5);
      const y = sin(map(i, 0, node_button2.length, 0, TWO_PI)+angle_error) * real(3.5);
      node_button2[i] = createVector(center.x+x+real(0.5), center.y+y, center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      for (let i=0; i<node_button.length-2; i++) {
        vertex(node_button[0].x, node_button[0].y, node_button[0].z);
        vertex(node_button[i+1].x, node_button[i+1].y, node_button[i+1].z);
        vertex(node_button[i+2].x, node_button[i+2].y, node_button[i+2].z);
      }

      if (dist(real(13), real(200), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      for (let i=0; i<node_button2.length-2; i++) {
        vertex(node_button2[0].x, node_button2[0].y, node_button2[0].z);
        vertex(node_button2[i+1].x, node_button2[i+1].y, node_button2[i+1].z);
        vertex(node_button2[i+2].x, node_button2[i+2].y, node_button2[i+2].z);
      }
    } else {
      for (let i=0; i<node_button.length; i++) {
        vertex(node_button[i].x, node_button[i].y, node_button[i].z);
        vertex(node_button[(i+1)%node_button.length].x, node_button[(i+1)%node_button.length].y, node_button[(i+1)%node_button.length].z);
      }
      for (let i=0; i<node_button2.length; i++) {
        vertex(node_button2[i].x, node_button2[i].y, node_button2[i].z);
        vertex(node_button2[(i+1)%node_button2.length].x, node_button2[(i+1)%node_button2.length].y, node_button2[(i+1)%node_button2.length].z);
      }
    }
  }











  if (have_button_regenerate) {
    const center = createVector(real(141+6), real(-45)+Y_shake, z+real(2));
    const node_button = new Array(3);
    const angle_error = PI/6.0;
    for (let i=0; i<3; i++) {
      const x = cos(map(i, 0, 3, 0, TWO_PI)+angle_error) * real(4.5);
      const y = sin(map(i, 0, 3, 0, TWO_PI)+angle_error) * real(3.5) - real(1.5);
      node_button[i] = createVector(center.x+x, center.y+y, center.z+real(1));
    }
    const node_button2 = new Array(3);
    for (let i=0; i<3; i++) {
      const x = cos(map(i, 0, 3, 0, TWO_PI)+angle_error) * real(4.5);
      const y = sin(map(i, 0, 3, 0, TWO_PI)+angle_error) * real(3.5) + real(2);
      node_button2[i] = createVector(center.x+x, center.y+y, center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      TRIANGLES_getRect(center.copy().add(real(-5), real(-6.5), 0), center.copy().add(real(6), real(-6.5), 0), center.copy().add(real(6), real(5.5), 0), center.copy().add(real(-5), real(5.5), 0));


      if (dist(width-real(13), real(250-75), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      TRIANGLES_getTriangle(node_button[0], node_button[1], node_button[2]);
      TRIANGLES_getTriangle(node_button2[0], node_button2[1], node_button2[2]);
    } else {
      for (let i=0; i<node_button.length; i++) {
        LINES_getLine(node_button[i], node_button[(i+1)%3]);
      }
      for (let i=0; i<node_button2.length; i++) {
        LINES_getLine(node_button2[i], node_button2[(i+1)%3]);
      }
    }
  }




  if (have_button_shine) {
    const center = createVector(real(141+6), real(-15)+Y_shake, z+real(2));
    const node_button = new Array(4);
    node_button[0] = center.copy().add(real(-2.961), real(0), real(1));
    node_button[1] = center.copy().add(real(0), real(-6.099), real(1));
    node_button[2] = center.copy().add(real(2.961), real(0), real(1));
    node_button[3] = center.copy().add(real(0), real(6.099), real(1));
    const node_button2 = new Array(3);
    node_button2[0] = center.copy().add(real(-6.099), real(0), real(1));
    node_button2[1] = center.copy().add(real(0), real(-2.961), real(1));
    node_button2[2] = center.copy().add(real(6.099), real(0), real(1));
    node_button2[3] = center.copy().add(real(0), real(2.961), real(1));



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      TRIANGLES_getRect(center.copy().add(real(-4.5), real(-4.5), 0), center.copy().add(real(5.5), real(-4.5), 0), center.copy().add(real(5.5), real(4.5), 0), center.copy().add(real(-4.5), real(4.5), 0));


      if (dist(width-real(13), real(250-25), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      TRIANGLES_getRect(node_button[0], node_button[1], node_button[2], node_button[3]);
      TRIANGLES_getRect(node_button2[0], node_button2[1], node_button2[2], node_button2[3]);
    } else {
      for (let i=0; i<node_button.length; i++) {
        LINES_getLine(node_button[i], node_button[(i+1)%4]);
      }
      for (let i=0; i<node_button2.length; i++) {
        LINES_getLine(node_button2[i], node_button2[(i+1)%4]);
      }
    }
  }







  if (have_button_submerge) {
    const center = createVector(real(141+6), real(15)+Y_shake, z+real(2));
    const node_button = new Array(3);
    const angle_error = -PI/6.0;
    for (let i=0; i<node_button.length; i++) {
      const x = cos(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(7);
      const y = sin(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(7);
      node_button[i] = createVector(center.x+x, center.y+y, center.z);
    }
    const node_button2 = new Array(3);
    for (let i=0; i<node_button2.length; i++) {
      const x = cos(map(i, 0, node_button2.length, 0, TWO_PI)+angle_error) * real(3.5);
      const y = sin(map(i, 0, node_button2.length, 0, TWO_PI)+angle_error) * real(3.5);
      node_button2[i] = createVector(center.x+x-real(0.5), center.y+y, center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      for (let i=0; i<node_button.length-2; i++) {
        vertex(node_button[0].x, node_button[0].y, node_button[0].z);
        vertex(node_button[i+1].x, node_button[i+1].y, node_button[i+1].z);
        vertex(node_button[i+2].x, node_button[i+2].y, node_button[i+2].z);
      }

      if (dist(width-real(13), real(250+25), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      for (let i=0; i<node_button2.length-2; i++) {
        vertex(node_button2[0].x, node_button2[0].y, node_button2[0].z);
        vertex(node_button2[i+1].x, node_button2[i+1].y, node_button2[i+1].z);
        vertex(node_button2[i+2].x, node_button2[i+2].y, node_button2[i+2].z);
      }
    } else {
      for (let i=0; i<node_button.length; i++) {
        vertex(node_button[i].x, node_button[i].y, node_button[i].z);
        vertex(node_button[(i+1)%node_button.length].x, node_button[(i+1)%node_button.length].y, node_button[(i+1)%node_button.length].z);
      }
      for (let i=0; i<node_button2.length; i++) {
        vertex(node_button2[i].x, node_button2[i].y, node_button2[i].z);
        vertex(node_button2[(i+1)%node_button2.length].x, node_button2[(i+1)%node_button2.length].y, node_button2[(i+1)%node_button2.length].z);
      }
    }
  }






  if (have_button_spring) {
    const center = createVector(real(141+6), real(45)+Y_shake, z+real(2));
    const node_button = new Array(3);
    const angle_error = -PI/6.0;
    for (let i=0; i<node_button.length; i++) {
      const x = cos(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(4);
      const y = sin(map(i, 0, node_button.length, 0, TWO_PI)+angle_error) * real(3.75);
      node_button[i] = createVector(center.x+x, center.y+y-real(1.5), center.z+real(1));
    }
    const node_button2 = new Array(3);
    for (let i=0; i<node_button2.length; i++) {
      const x = cos(map(i, 0, node_button2.length, 0, TWO_PI)-angle_error) * real(4);
      const y = sin(map(i, 0, node_button2.length, 0, TWO_PI)-angle_error) * real(3.75);
      node_button2[i] = createVector(center.x+x, center.y+y+real(1.5), center.z+real(1));
    }



    if (!open_info) {
      fill(lerpColor(c_winFrame, c_far, 0.15));
      TRIANGLES_getRect(center.copy().add(real(-5), real(-5.5), 0), center.copy().add(real(6), real(-5.5), 0), center.copy().add(real(6), real(5.5), 0), center.copy().add(real(-5), real(5.5), 0));


      if (dist(width-real(13), real(250+75), mouseX, mouseY) < real(10)) {
        fill(lerpColor(c_winFrame, c_far, 0.55));
      } else {
        fill(lerpColor(c_winFrame, c_far, 0.35));
      }
      TRIANGLES_getTriangle(node_button[0], node_button[1], node_button[2]);
      TRIANGLES_getTriangle(node_button2[0], node_button2[1], node_button2[2]);
    } else {
      for (let i=0; i<node_button.length; i++) {
        vertex(node_button[i].x, node_button[i].y, node_button[i].z);
        vertex(node_button[(i+1)%node_button.length].x, node_button[(i+1)%node_button.length].y, node_button[(i+1)%node_button.length].z);
      }
      for (let i=0; i<node_button2.length; i++) {
        vertex(node_button2[i].x, node_button2[i].y, node_button2[i].z);
        vertex(node_button2[(i+1)%node_button2.length].x, node_button2[(i+1)%node_button2.length].y, node_button2[(i+1)%node_button2.length].z);
      }
    }
  }




  endShape();
}















function drawDrakWinFrame(w, h, w_fillet) {

  const node = new Array(10*4);

  for (let i=0; i<node.length; i++) {
    const x = cos(map(i, 0, node.length-1, -PI, PI)) * (w_fillet*0.5);
    const y = sin(map(i, 0, node.length-1, -PI, PI)) * (w_fillet*0.5) + Y_shake;
    if (i < floor(node.length/4)) {
      node[i] = createVector(x-(w-w_fillet)*0.5, y-(h-w_fillet)*0.5);
    } else if (i < floor(node.length/4)*2) {
      node[i] = createVector(x+(w-w_fillet)*0.5, y-(h-w_fillet)*0.5);
    } else if (i < floor(node.length/4)*3) {
      node[i] = createVector(x+(w-w_fillet)*0.5, y+(h-w_fillet)*0.5);
    } else {
      node[i] = createVector(x-(w-w_fillet)*0.5, y+(h-w_fillet)*0.5);
    }
    node[i].mult(1.6);
    node[i].add(FRAME.width/2, FRAME.height/2.0);
  }



  FRAME.clear();
  FRAME.background(0, 0);
  FRAME.noFill();
  FRAME.stroke(c_winFrame);
  FRAME.strokeWeight(1);


  FRAME.beginShape(LINES);

  let num_line = 50;

  //------ l
  for (let i=0; i<num_line; i++) {
    let x = FRAME.width/2.0 - w*lerp(1.35, 1.6, accXiu(map(i, 0, num_line-1, 0, 1), 4))/2.0;//FRAME.width/2.0 - (w*random(1.35, 1.6))/2.0;
    //x += random(-2, 2) * map(i, 0, 50-1, 1, 0);
    let l = 100 * map(i, 0, num_line-1, 1.1, 4);
    let y = FRAME.height/2.0 ;//+ random(-h*random(1.35, 1.6), h*random(1.35, 1.6));
    y += h*random(-0.1, 0.1) * lerp(10, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    FRAME.vertex(x + random(-5, 10), y-l/2.0);
    FRAME.vertex(x + random(-5, 10), y+l/2.0);
  }
  //------ r
  for (let i=0; i<num_line; i++) {
    let x = FRAME.width/2.0 + w*lerp(1.35, 1.6, accXiu(map(i, 0, num_line-1, 0, 1), 4))/2.0;//FRAME.width/2.0 - (w*random(1.35, 1.6))/2.0;
    let l = 100 * map(i, 0, num_line-1, 1.1, 4);
    let y = FRAME.height/2.0;
    y += h*random(-0.1, 0.1) * lerp(10, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    FRAME.vertex(x + random(-10, 5), y-l/2.0);
    FRAME.vertex(x + random(-10, 5), y+l/2.0);
  }
  //------ u
  for (let i=0; i<num_line; i++) {
    let y = FRAME.height/2.0 - h*lerp(1.35, 1.6, accXiu(map(i, 0, num_line-1, 0, 1), 4))/2.0;//FRAME.width/2.0 - (w*random(1.35, 1.6))/2.0;
    let l = 100 * map(i, 0, num_line-1, 1.1, 4);
    let x = FRAME.width/2.0 ;
    x += w*random(-0.1, 0.1) * lerp(10, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    FRAME.vertex(x-l/2.0, y + random(-5, 10));
    FRAME.vertex(x+l/2.0, y + random(-5, 10));
  }
  //------ d
  for (let i=0; i<num_line; i++) {
    let y = FRAME.height/2.0 + h*lerp(1.35, 1.6, accXiu(map(i, 0, num_line-1, 0, 1), 4))/2.0;//FRAME.width/2.0 - (w*random(1.35, 1.6))/2.0;
    let l = 100 * map(i, 0, num_line-1, 1.1, 4);
    let x = FRAME.width/2.0;
    x += w*random(-0.1, 0.1) * lerp(10, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    FRAME.vertex(x-l/2.0, y + random(-10, 5));
    FRAME.vertex(x+l/2.0, y + random(-10, 5));
  }






  /*
  let node_new = new Array(40);
   for (let i=0; i<node_new.length; i++) {
   node_new[i] = [];
   for (let j=0; j<node.length; j++) {
   node_new[i].push(node[j].copy());
   
   if (j == floor(node.length/4)-1 || 
   j == floor(node.length/4)*2-1 || 
   j == floor(node.length/4)*3-1 ||
   j == node.length-1
   ) {
   const num = 20;
   for (let k=0; k<num; k++) {
   node_new[i].push(p5.Vector.sub(node[(j+1)%node.length], node[j]).mult(map(k, 0, num, 1.0/num, 1)).add(node[j]));
   }
   }
   }
   }
   
   for (let i=0; i<node_new.length; i++) {
   for (let j=0; j<node_new[i].length; j++) {
   //node_new[i][j].mult(map(sin(map(i, 0, node_new.length-1, 0, HALF_PI)), 0, 1, 1.35, 1.6));
   node_new[i][j].mult(map(i, 0, node_new.length-1, 1.35, 1.6));
   //node_new[i][j].mult(lerp(1.35, 1.6, accXiu(map(i, 0, node_new.length-1, 0, 1), 2)));
   node_new[i][j].add(FRAME.width/2, FRAME.height/2.0);
   const r = random(-1, 1) * map(sin(map(i, 0, node_new.length-1, 0, HALF_PI)), 0, 1, 1, 0);
   const ns = map(noise(j*0.25), 0, 1, -1, 1) * map(sin(map(i, 0, node_new.length-1, 0, HALF_PI)), 0, 1, 1, 0.25);
   node_new[i][j].add(ns*5 + r, ns*15 + r*4);
   }
   }
   
   for (let i=0; i<node_new.length; i++) {
   for (let j=0; j<node_new[i].length; j++) {
   FRAME.vertex(node_new[i][j].x, node_new[i][j].y, node_new[i][j].z);
   FRAME.vertex(node_new[i][(j+1)%node_new[i].length].x, node_new[i][(j+1)%node_new[i].length].y, node_new[i][(j+1)%node_new[i].length].z);
   }
   }
   */









  //四条线，遮面的边界
  FRAME.vertex(0, 0);
  FRAME.vertex(node[0].x, node[0].y);
  FRAME.vertex(FRAME.width, 0);
  FRAME.vertex(node[floor(node.length/4)].x, node[floor(node.length/4)].y);
  FRAME.vertex(FRAME.width, FRAME.height);
  FRAME.vertex(node[floor(node.length/4)*2].x, node[floor(node.length/4)*2].y);
  FRAME.vertex(0, FRAME.height);
  FRAME.vertex(node[floor(node.length/4)*3].x, node[floor(node.length/4)*3].y);


  FRAME.endShape();




  FRAME.noStroke();
  FRAME.fill(c_winFrame);

  FRAME.beginShape();
  FRAME.vertex(0, 0);
  //for (let i=0; i<floor(node.length/4); i++) {
  //  FRAME.vertex(node[i].x, node[i].y, node[i].z);
  //}
  FRAME.vertex(node[0].x, node[0].y);
  if (w_fillet <= 75) {
    FRAME.vertex(node[0].x, node[floor(node.length/4)].y);
  } else {
    FRAME.vertex(node[(node.length/4/2)].x, node[floor(node.length/4/2)].y);
  }
  FRAME.vertex(node[floor(node.length/4)].x, node[floor(node.length/4)].y);
  FRAME.vertex(FRAME.width, 0);
  FRAME.endShape();

  FRAME.beginShape();
  FRAME.vertex(FRAME.width, 0);
  FRAME.vertex(node[floor(node.length/4)].x, node[floor(node.length/4)].y);
  if (w_fillet <= 75) {
    FRAME.vertex(node[floor(node.length/4)*2].x, node[floor(node.length/4)].y);
  } else {
    FRAME.vertex(node[floor(node.length/4*(3/2))].x, node[floor(node.length/4*(3/2))].y);
  }
  FRAME.vertex(node[floor(node.length/4)*2].x, node[floor(node.length/4)*2].y);
  FRAME.vertex(FRAME.width, FRAME.height);
  FRAME.endShape();

  FRAME.beginShape();
  FRAME.vertex(FRAME.width, FRAME.height);
  FRAME.vertex(node[floor(node.length/4)*2].x, node[floor(node.length/4)*2].y);
  if (w_fillet <= 75) {
    FRAME.vertex(node[floor(node.length/4)*2].x, node[floor(node.length/4)*3].y);
  } else {
    FRAME.vertex(node[floor(node.length/4*(5/2))].x, node[floor(node.length/4*(5/2))].y);
  }
  FRAME.vertex(node[floor(node.length/4)*3].x, node[floor(node.length/4)*3].y);
  FRAME.vertex(0, FRAME.height);
  FRAME.endShape();


  FRAME.beginShape();
  FRAME.vertex(0, FRAME.height);
  FRAME.vertex(node[floor(node.length/4)*3].x, node[floor(node.length/4)*3].y);
  if (w_fillet <= 75) {
    FRAME.vertex(node[0].x, node[floor(node.length/4)*3].y);
  } else {
    FRAME.vertex(node[floor(node.length/4*(7/2))].x, node[floor(node.length/4*(7/2))].y);
  }
  FRAME.vertex(node[0].x, node[0].y);
  FRAME.vertex(0, 0);
  FRAME.endShape();

  /*FRAME.beginShape();
   FRAME.vertex(FRAME.width, 0);
   FRAME.vertex(0, 0);
   for (let j=0; j<node_new[node_new.length-1].length/2; j++) {
   FRAME.vertex(node_new[node_new.length-1][j].x, node_new[node_new.length-1][j].y, node_new[node_new.length-1][j].z);
   }
   FRAME.endShape();
   
   FRAME.beginShape();
   FRAME.vertex(0, FRAME.height);
   FRAME.vertex(FRAME.width, FRAME.height);
   for (let j=node_new[node_new.length-1].length/2; j<node_new[node_new.length-1].length; j++) {
   FRAME.vertex(node_new[node_new.length-1][j].x, node_new[node_new.length-1][j].y, node_new[node_new.length-1][j].z);
   }
   FRAME.endShape();
   
   FRAME.beginShape();
   FRAME.vertex(0, FRAME.height);
   FRAME.vertex(0, 0);
   FRAME.vertex(node_new[node_new.length-1][0].x, node_new[node_new.length-1][0].y, node_new[node_new.length-1][0].z);
   FRAME.vertex(node_new[node_new.length-1][node_new[node_new.length-1].length-1].x, node_new[node_new.length-1][node_new[node_new.length-1].length-1].y, node_new[node_new.length-1][node_new[node_new.length-1].length-1].z);
   FRAME.endShape();
   
   FRAME.beginShape();
   FRAME.vertex(FRAME.width, FRAME.height);
   FRAME.vertex(FRAME.width, 0);
   FRAME.vertex(node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)-1].x, node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)-1].y, node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)-1].z);
   FRAME.vertex(node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)].x, node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)].y, node_new[node_new.length-1][floor(node_new[node_new.length-1].length/2)].z);
   FRAME.endShape();
   */



  FRAME.noFill();
  FRAME.stroke(255, 0, 0);
  FRAME.stroke(c_winFrame);
  //FRAME.stroke(lerpColor(c_winFrame, c_far, 0.05));
  FRAME.strokeWeight(1);
  FRAME.beginShape(LINES);

  num_line = 50;
  //------ lu
  for (let i=0; i<num_line; i++) {
    let n1 = node[0].copy();
    let n2 = node[floor(node.length/4)-1].copy();
    let move = lerp(0, w_fillet*0.35, accXiu(map(i, 0, num_line-1, 0, 1), 2));
    n1.add(-move, -move);
    n1.y += random(0, 20);
    n2.add(-move, -move);
    n2.x += random(0, 20);
    let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    n1.add(a, -a);
    n2.add(a, -a);
    FRAME.vertex(n1.x, n1.y);
    FRAME.vertex(n2.x, n2.y);
  }
  //------ ru
  for (let i=0; i<num_line; i++) {
    let n1 = node[floor(node.length/4)].copy();
    let n2 = node[floor(node.length/4)*2-1].copy();
    let move = lerp(0, w_fillet*0.35, accXiu(map(i, 0, num_line-1, 0, 1), 2));
    n1.add(move, -move);
    n1.x += random(-20, 0);
    n2.add(move, -move);
    n2.y += random(0, 20);
    let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    n1.add(a, a);
    n2.add(a, a);
    FRAME.vertex(n1.x, n1.y);
    FRAME.vertex(n2.x, n2.y);
  }
  //------ rd
  for (let i=0; i<num_line; i++) {
    let n1 = node[floor(node.length/4)*2].copy();
    let n2 = node[floor(node.length/4)*3-1].copy();
    let move = lerp(0, w_fillet*0.35, accXiu(map(i, 0, num_line-1, 0, 1), 2));
    n1.add(move, move);
    n1.y += random(-20, 0);
    n2.add(move, move);
    n2.x += random(-20, 0);
    let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    n1.add(a, -a);
    n2.add(a, -a);
    FRAME.vertex(n1.x, n1.y);
    FRAME.vertex(n2.x, n2.y);
  }
  //------ ld
  for (let i=0; i<num_line; i++) {
    let n1 = node[floor(node.length/4)*3].copy();
    let n2 = node[node.length-1].copy();
    let move = lerp(0, w_fillet*0.35, accXiu(map(i, 0, num_line-1, 0, 1), 2));
    n1.add(-move, move);
    n1.x += random(0, 20);
    n2.add(-move, move);
    n2.y += random(-20, 0);
    let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
    n1.add(a, a);
    n2.add(a, a);
    FRAME.vertex(n1.x, n1.y);
    FRAME.vertex(n2.x, n2.y);
  }






  if (w_fillet > 75) {
    let r = 0.125;
    if (w_fillet == 125) {
      r = 0.25;
    }
    //------ lu
    for (let j=0; j<2; j++) {
      for (let i=0; i<num_line; i++) {
        let n1 = node[0].copy();
        let n2 = node[floor(node.length/4)-1].copy();
        let move = lerp(0, w_fillet*r, accXiu(map(i, 0, num_line-1, 0, 1), 2));
        n1.add(-move, -move);
        n1.y += random(0, 10);
        n2.add(-move, -move);
        n2.x += random(0, 10);
        let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
        n1.add(a, -a);
        n2.add(a, -a);
        n1.add(-FRAME.width/2, -FRAME.height/2);
        n1.rotate(HALF_PI*0.25*pow(-1, j));
        n1.add(FRAME.width/2, FRAME.height/2);
        n2.add(-FRAME.width/2, -FRAME.height/2);
        n2.rotate(HALF_PI*0.25*pow(-1, j));
        n2.add(FRAME.width/2.0, FRAME.height/2);

        FRAME.vertex(n1.x, n1.y);
        FRAME.vertex(n2.x, n2.y);
      }
      //------ ru
      for (let i=0; i<num_line; i++) {
        let n1 = node[floor(node.length/4)].copy();
        let n2 = node[floor(node.length/4)*2-1].copy();
        let move = lerp(0, w_fillet*r, accXiu(map(i, 0, num_line-1, 0, 1), 2));
        n1.add(move, -move);
        n1.x += random(-10, 0);
        n2.add(move, -move);
        n2.y += random(0, 10);
        let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
        n1.add(a, a);
        n2.add(a, a);
        n1.add(-FRAME.width/2, -FRAME.height/2);
        n1.rotate(HALF_PI*0.25*pow(-1, j));
        n1.add(FRAME.width/2, FRAME.height/2);
        n2.add(-FRAME.width/2, -FRAME.height/2);
        n2.rotate(HALF_PI*0.25*pow(-1, j));
        n2.add(FRAME.width/2.0, FRAME.height/2);

        FRAME.vertex(n1.x, n1.y);
        FRAME.vertex(n2.x, n2.y);
      }
      //------ rd
      for (let i=0; i<num_line; i++) {
        let n1 = node[floor(node.length/4)*2].copy();
        let n2 = node[floor(node.length/4)*3-1].copy();
        let move = lerp(0, w_fillet*r, accXiu(map(i, 0, num_line-1, 0, 1), 2));
        n1.add(move, move);
        n1.y += random(-10, 0);
        n2.add(move, move);
        n2.x += random(-10, 0);
        let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
        n1.add(a, -a);
        n2.add(a, -a);
        n1.add(-FRAME.width/2, -FRAME.height/2);
        n1.rotate(HALF_PI*0.25*pow(-1, j));
        n1.add(FRAME.width/2, FRAME.height/2);
        n2.add(-FRAME.width/2, -FRAME.height/2);
        n2.rotate(HALF_PI*0.25*pow(-1, j));
        n2.add(FRAME.width/2.0, FRAME.height/2);

        FRAME.vertex(n1.x, n1.y);
        FRAME.vertex(n2.x, n2.y);
      }
      //------ ld
      for (let i=0; i<num_line; i++) {
        let n1 = node[floor(node.length/4)*3].copy();
        let n2 = node[node.length-1].copy();
        let move = lerp(0, w_fillet*r, accXiu(map(i, 0, num_line-1, 0, 1), 2));
        n1.add(-move, move);
        n1.x += random(0, 10);
        n2.add(-move, move);
        n2.y += random(-10, 0);
        let a = random(-1, 1) * lerp(w_fillet, 0, accXiu(map(i, 0, num_line-1, 0, 1)), 6);
        n1.add(a, a);
        n2.add(a, a);
        n1.add(-FRAME.width/2, -FRAME.height/2);
        n1.rotate(HALF_PI*0.25*pow(-1, j));
        n1.add(FRAME.width/2, FRAME.height/2);
        n2.add(-FRAME.width/2, -FRAME.height/2);
        n2.rotate(HALF_PI*0.25*pow(-1, j));
        n2.add(FRAME.width/2.0, FRAME.height/2);

        FRAME.vertex(n1.x, n1.y);
        FRAME.vertex(n2.x, n2.y);
      }
    }
  }



  FRAME.endShape();
}




















function drawSubmarineWin(node, z, num) {
  const center = p5.Vector.add(node[0], node[node.length/4*2]).mult(0.5);
  const node_E = new Array(node.length);

  let w = real(15);
  if (num == 2) {
    w = real(10);
  } else if (num == 3) {
    w = real(6);
  }

  for (let i=0; i<node_E.length; i++) {
    let center_fillet;
    if (i<node_E.length/4) {
      center_fillet = createVector(node[node.length/4-1].x, node[0].y, z);
    } else if (i<node_E.length/4 * 2) {
      center_fillet = createVector(node[node.length/4].x, node[node.length/4*2-1].y, z);
    } else if (i<node_E.length/4 * 3) {
      center_fillet = createVector(node[node.length/4*3-1].x, node[node.length/4*2].y, z);
    } else {
      center_fillet = createVector(node[node.length/4*3].x, node[node.length-1].y, z);
    }
    node_E[i] = p5.Vector.sub(node[i], center_fillet).setMag(w).add(node[i]).add(0, 0, real(1));
  }







  if (!open_info) {

    const c1 = color(lerpColor(c_winFrame, c_far, 0.2));
    const c2 = color(lerpColor(c_winFrame, c_far, 0.05));

    for (let i=0; i<node_E.length; i++) {
      TRIANGLES_getRect_fill4(node_E[i], node[i], node[(i+1)%node.length], node_E[(i+1)%node.length], c1, c2, c2, c1);
    }





    const rivet = new Array(10);
    for (let i=0; i<rivet.length; i++) {
      const x = cos(map(i, 0, rivet.length, 0, TWO_PI)) * real(1000);
      const y = sin(map(i, 0, rivet.length, 0, TWO_PI)) * real(1000);
      const n = createVector(x, y).add(center.x, center.y);
      for (let j=0; j<node.length; j++) {
        let itsc = intersection(node[j], node[(j+1)%node.length], createVector(center.x, center.y), n);
        if (itsc.x != n.x) {
          itsc = createVector(itsc.x, itsc.y);
          rivet[i] = p5.Vector.sub(itsc, createVector(center.x, center.y)).setMag(w*0.6).add(itsc).add(0, 0, z+real(2));
          break;
        }
      }
    }


    for (let i=0; i<rivet.length; i++) {
      const n_e = new Array(5);
      for (let j=0; j<5; j++) {
        const angle_error = 0.3+p5.Vector.sub(createVector(center.x, center.y), createVector(rivet[i].x, rivet[i].y)).heading();
        const x = cos(map(j, 0, 5, 0, TWO_PI)+angle_error) * w/5.0;
        const y = sin(map(j, 0, 5, 0, TWO_PI)+angle_error) * w/5.0;
        n_e[j] = createVector(x, y, 0).add(rivet[i]);
      }
      for (let j=0; j<5-2; j++) {
        fill(lerpColor(c_winFrame, c_far, 0.45));
        vertex(n_e[0].x, n_e[0].y, n_e[0].z);
        fill(lerpColor(c_winFrame, c_far, 0.17));
        vertex(n_e[j+1].x, n_e[j+1].y, n_e[j+1].z);
        if (j == 5-2-1) {
          fill(lerpColor(c_winFrame, c_far, 0.45));
        }
        vertex(n_e[j+2].x, n_e[j+2].y, n_e[j+2].z);
      }
    }
  } else {
    for (let i=0; i<node_E.length; i++) {
      LINES_getLine(node_E[i], node_E[(i+1)%node_E.length]);
    }
  }
}

















function drawWinShade(node, w, h, z, index) {
  let node_hand = new Array(8);
  let center_shade_hand_X = (node[0].x + node[node.length/4*2-1].x)*0.5;

  let mouse_screen = createVector(map(mouseX, 0, width, real(-155), real(155)), map(mouseY, 0, height, real(-155), real(155)), node[0].z+real(1));


  if (open_follow_shade_hand[index]) {
    center_shade_hand_Y[index] =  constrain(mouse_screen.y, -h/2.0 - real(10), h/2.0);
  } else {
    center_shade_hand_Y[index] = easing_x(center_shade_hand_Y[index], node[node.length/4].y - real(10), 0.05);
  }

  if (mouse_screen.x > center_shade_hand_X-w*0.25  &&  mouse_screen.x < center_shade_hand_X+w*0.25  &&
    mouse_screen.y > center_shade_hand_Y[index]-real(7)  &&  mouse_screen.y < center_shade_hand_Y[index]+real(7)) {
    open_follow_shade_hand[index] = true;
  } else {
    open_follow_shade_hand[index] = false;
  }




  for (let i=0; i<node_hand.length; i++) {
    let x = 0;
    let y = 0;
    if (i < node_hand.length/2) {
      x = cos(map(i, 0, node_hand.length/2-1, -HALF_PI, HALF_PI)) * real(2);
      y = sin(map(i, 0, node_hand.length/2-1, -HALF_PI, HALF_PI)) * real(2);
      x += w * 0.25;
    } else {
      x = cos(map(i, node_hand.length/2, node_hand.length-1, HALF_PI, PI+HALF_PI)) * real(2);
      y = sin(map(i, node_hand.length/2, node_hand.length-1, HALF_PI, PI+HALF_PI)) * real(2);
      x -= w * 0.25;
    }
    node_hand[i] = createVector(x, y+Y_shake, real(1)).add(center_shade_hand_X, center_shade_hand_Y[index], z);
  }





  if (!open_info) {
    if (open_follow_shade_hand[index]) {
      fill(lerpColor(c_winFrame, c_far, 0.65));
    } else {
      fill(lerpColor(c_winFrame, c_far, 0.25));
    }
    for (let i=0; i<node_hand.length-2; i++) {
      vertex(node_hand[0].x, node_hand[0].y, node_hand[0].z);
      vertex(node_hand[i+1].x, node_hand[i+1].y, node_hand[i+1].z);
      vertex(node_hand[i+2].x, node_hand[i+2].y, node_hand[i+2].z);
    }

    fill(c_winFrame);
    TRIANGLES_getRect(createVector(center_shade_hand_X-w*0.55, -h*0.65, z+real(0.5)), createVector(center_shade_hand_X+w*0.55, -h*0.65, z+real(0.5)), createVector(center_shade_hand_X+w*0.55, center_shade_hand_Y[index]+real(7)+Y_shake, z+real(0.5)), createVector(center_shade_hand_X-w*0.55, center_shade_hand_Y[index]+real(7)+Y_shake, z+real(0.5)));
  } else {
    for (let i=0; i<node_hand.length; i++) {
      LINES_getLine(node_hand[i], node_hand[(i+1)%node_hand.length]);
    }
  }
}












function drawRollUpWin(node_UM, W, H, z) {

  const w = W*1.05;
  const center_open = node_UM.copy().add(W*0.5+real(13), H*0.5+real(7), real(1.5));
  const center_close = node_UM.copy().add(W*0.5+real(13), H*0.5-real(7), real(1.5));
  const mouse_screen = createVector(map(mouseX, 0, width, real(-155), real(155)), map(mouseY, 0, height, real(-155), real(155)), z+real(1));
  const node_switch = new Array(8);


  if (!open_shade  &&  p5.Vector.dist(mouse_screen, center_open) < real(7)) {
    open_shade = true;
  }
  if (open_shade  &&  p5.Vector.dist(mouse_screen, center_close) < real(7)) {
    open_shade = false;
  }





  if (!open_shade) {
    H_rollUpWin = easing_x(H_rollUpWin, (H/node_rollUpWin.length)*0.5, 0.2);

    for (let i=0; i<node_rollUpWin.length; i++) {
      center_rollUpWin[i] = createVector(node_UM.x, easing_x(center_rollUpWin[i].y, node_UM.y-H_rollUpWin, map(i, 0, node_rollUpWin.length-1, 0.05, 0.1)), node_UM.z+real(1));
      for (let j=0; j<node_rollUpWin[i].length; j++) {
        node_rollUpWin[i][j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), Y_shake + H_rollUpWin/2.0 * pow(-1, floor(j/2)+1), 0).add(center_rollUpWin[i]);
      }
    }


    node_switch[0] = center_open.copy().add(-real(3.5), -real(3.5), 0);
    node_switch[1] = center_open.copy().add(real(3.5), -real(3.5), 0);
    for (i=2; i<node_switch.length; i++) {
      const x = cos(map(i, 2, node_switch.length-1, 0, PI)) * real(3.5);
      const y = sin(map(i, 2, node_switch.length-1, 0, PI)) * real(3.5);
      node_switch[i] = createVector(x, y, 0).add(center_open);
    }
  } else {
    H_rollUpWin = easing_x(H_rollUpWin, H/node_rollUpWin.length, 0.1);

    for (let i=0; i<node_rollUpWin.length; i++) {
      let y_target = map(i, 0, node_rollUpWin.length-1, node_UM.y, node_UM.y+H);
      center_rollUpWin[i] = createVector(node_UM.x, easing_x(center_rollUpWin[i].y, y_target, map(i, 0, node_rollUpWin.length-1, 0.05, 0.1)), node_UM.z+real(1));

      for (let j=0; j<node_rollUpWin[i].length; j++) {
        node_rollUpWin[i][j] = createVector(w/2.0 * pow(-1, ceil(j%1.5)+1), Y_shake + H_rollUpWin/2.0 * pow(-1, floor(j/2)+1), 0).add(center_rollUpWin[i]);
      }
    }


    node_switch[0] = center_close.copy().add(-real(3.5), real(3.5), 0);
    node_switch[1] = center_close.copy().add(real(3.5), real(3.5), 0);
    for (i=2; i<node_switch.length; i++) {
      const x = cos(map(i, 2, node_switch.length-1, 0, -PI)) * real(3.5);
      const y = sin(map(i, 2, node_switch.length-1, 0, -PI)) * real(3.5);
      node_switch[i] = createVector(x, y, 0).add(center_close);
    }
  }





  if (!open_info) {
    fill(c_winFrame);
    for (let i=0; i<node_rollUpWin.length; i++) {
      TRIANGLES_getRect(node_rollUpWin[i][0], node_rollUpWin[i][1], node_rollUpWin[i][2], node_rollUpWin[i][3]);
    }

    fill(lerpColor(c_winFrame, c_sky, 0.4));
    for (let i=0; i<node_switch.length-2; i++) {
      vertex(node_switch[0].x, node_switch[0].y, node_switch[0].z);
      vertex(node_switch[i+1].x, node_switch[i+1].y, node_switch[i+1].z);
      vertex(node_switch[i+2].x, node_switch[i+2].y, node_switch[i+2].z);
    }
  } else {
    for (let i=0; i<node_rollUpWin.length; i++) {
      for (let j=0; j<node_rollUpWin[i].length; j++) {
        LINES_getLine(node_rollUpWin[i][j], node_rollUpWin[i][(j+1)%4]);
      }
    }

    for (let i=0; i<node_switch.length; i++) {
      LINES_getLine(node_switch[i], node_switch[(i+1)%node_switch.length]);
    }
  }
}











function drawCurtain(W, H, Z) {
  const mouse_screen = createVector(map(mouseX, 0, width, real(-155), real(155)), map(mouseY, 0, height, real(-155), real(155)), Z+real(1));


  if (mouse_screen.x > -W*0.5-real(10)  &&  mouse_screen.x < W*0.5+real(25)  &&
    mouse_screen.y > -H*0.5-real(11+10)  &&  mouse_screen.y < -H*0.5-real(9-10)) {
    open_curtain = true;
  } else {
    open_curtain = false;
  }



  if (open_curtain) {
    for (let i=0; i<2; i++) {
      let y = -H*0.5 - real(10);
      for (let j=0; j<node_curtain[i].length; j++) {
        let x = map(j, 0, node_curtain[i].length-1, map(mouse_screen.x, -W*0.5-real(10), W*0.5+real(25), -W*0.5-real(15), -W*0.52), mouse_screen.x);//W*0.55);
        y = -H * 0.5 - real(15)  +  sin(map(j, 0, node_curtain[i].length, PI, TWO_PI*4+PI))*real(4);
        let z = map(sin(map(j, 0, node_curtain[i].length, PI, TWO_PI*4+PI)), 0, 1, Z+real(2), Z+real(0.5));
        if (i == 1) {
          //x = map(j, 0, node_curtain[i].length-1, -W*0.52, W*0.52);
          y = H * 0.44  +  sin(map(j, 0, node_curtain[i].length, 0, TWO_PI*4))*real(4);
          node_curtain[i][j] = easing_p(node_curtain[i][j], createVector(x, y, z), 0.2);
          node_curtain[i][j].y += Y_shake/2.0;
        } else {
          node_curtain[i][j] = easing_p(node_curtain[i][j], createVector(x, y, z), 0.1);
        }
      }
    }
  } else {
    for (let i=0; i<2; i++) {
      let y = -H*0.5 - real(10);
      for (let j=0; j<node_curtain[i].length; j++) {
        let x = map(j, 0, node_curtain[i].length-1, -W*0.5-real(15), -W*0.5-real(3));
        y = -H * 0.5 - real(15)  +  sin(map(j, 0, node_curtain[i].length, PI, TWO_PI*3+PI))*real(2);
        let z = Z+real(2);

        if (i == 1) {
          y = H * 0.44  +  cos(map(j, 0, node_curtain[i].length, HALF_PI, TWO_PI*3+HALF_PI))*real(4);
          node_curtain[i][j] = easing_p(node_curtain[i][j], createVector(x, y, z), 0.2);
          node_curtain[i][j].y += Y_shake/2.0;
        } else {
          node_curtain[i][j] = easing_p(node_curtain[i][j], createVector(x, y, z), 0.1);
        }
      }
    }
  }








  if (!open_info) {
    //fill(255);
    fill(c_winFrame);
    for (let j=0; j<node_curtain[0].length-1; j++) {
      TRIANGLES_getRect(node_curtain[0][j], node_curtain[0][j+1], node_curtain[1][j+1], node_curtain[1][j]);
    }
    if (open_curtain) {
      fill(lerpColor(c_winFrame, c_sky, 0.65));
    } else {
      fill(lerpColor(c_winFrame, c_sky, 0.25));
    }
    TRIANGLES_getRect(createVector(-W*0.5-real(10), -H*0.5-real(11)+Y_shake, Z+real(1.5)), createVector(W*0.5+real(5), -H*0.5-real(11)+Y_shake, Z+real(1.5)), createVector(W*0.5+real(5), -H*0.5-real(9)+Y_shake, Z+real(1.5)), createVector(-W*0.5-real(10), -H*0.5-real(9)+Y_shake, Z+real(1.5)));
  } else {
    for (let i=0; i<2; i++) {
      for (let j=0; j<node_curtain[i].length-1; j++) {
        LINES_getLine(node_curtain[i][j], node_curtain[i][j+1]);
      }
    }
    LINES_getLine(node_curtain[0][node_curtain[0].length-1], node_curtain[1][node_curtain[1].length-1]);
  }
}