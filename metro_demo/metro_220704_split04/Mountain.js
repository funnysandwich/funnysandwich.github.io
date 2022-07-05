function Mountain() {
  this.ran = random(-999, 999);
  this.deadLine = endLine + real(1000);

  this.house = [];
  this.house_in_which_node = [];

  this.house_middle = [];
  this.house_middle_in_which_node = [];


  this.count_behind_x = 0;
  this.node_behind = Array.from(Array(3), () => new Array(8));
  this.Y_target_behind = Array.from(Array(this.node_behind.length), () => new Array(this.node_behind[0].length));
  for (let i=0; i<this.node_behind.length; i++) {
    for (let j=0; j<this.node_behind[i].length; j++) {
      let x = map(j, 0, this.node_behind[i].length, this.deadLine, beginLine);
      if (i != 0) {
        x += random(-(this.deadLine-beginLine)/this.node_behind[i].length*0.45, (this.deadLine-beginLine)/this.node_behind[i].length*0.45);
      }
      let z = map(i, 0, this.node_behind.length-1, skyline.z+(real(500)+gap_block), skyline.z);
      if (i != this.node_behind.length-1) {
        z += random(-(real(500)+gap_block)/2.0*0.25, (real(500)+gap_block)/2.0*0.25);
      } else {
        z -= real(250);
      }
      let y = skyline.y;
      if (i == 1) {
        y = map(noise(j+this.ran), 0, 1, skyline.y-real(1000), skyline.y-real(1500));
      } else if (i == 2) {
        y = map(noise(j+this.ran+999), 0, 1, skyline.y-real(1200), skyline.y-real(1500));
      }

      this.Y_target_behind[i][j] = y;
      this.node_behind[i][j] = createVector(x, y, z);
    }
  }
  this.count_behind_x = this.node_behind[0].length;


  this.count_middle_x = 0;
  this.node_middle = Array.from(Array(3), () => new Array(8));
  this.Y_target_middle = Array.from(Array(this.node_middle.length), () => new Array(this.node_middle[0].length));
  for (let i=0; i<this.node_middle.length; i++) {
    for (let j=0; j<this.node_middle[i].length; j++) {
      let x = map(j, 0, this.node_middle[i].length, this.deadLine, beginLine);
      if (i != 0) {
        x += random(-(this.deadLine-beginLine)/this.node_middle[i].length*0.45, (this.deadLine-beginLine)/this.node_middle[i].length*0.45);
      }
      let z = map(i, 0, this.node_middle.length-1, skyline.z+(real(500)+gap_block)*2, skyline.z+(real(500)+gap_block));
      if (i != this.node_middle.length-1) {
        z += random(-(real(500)+gap_block)/2.0*0.25, 0);
      }
      let y = skyline.y;
      if (i == 1) {
        y = map(noise(j+this.ran+777), 0, 1, skyline.y-real(500), skyline.y-real(1200));
      } else if (i == 2) {
        y = map(noise(j+this.ran+123), 0, 1, skyline.y-real(750), skyline.y-real(1200));
      }

      this.Y_target_middle[i][j] = y;
      this.node_middle[i][j] = createVector(x, y, z);
    }
  }
  this.count_middle_x =this.node_middle[0].length;



  this.count_front_x = 0;
  this.node_front = Array.from(Array(3), () => new Array(8));
  this.Y_target_front = Array.from(Array(this.node_front.length), () => new Array(this.node_front[0].length));
  for (let i=0; i<this.node_front.length; i++) {
    for (let j=0; j<this.node_front[i].length; j++) {
      let x = map(j, 0, this.node_middle[i].length, this.deadLine, beginLine);
      if (i != 0) {
        x += random(-(this.deadLine-beginLine) / (this.node_front[0].length+1)*0.45, (this.deadLine-beginLine) / (this.node_front[0].length+1)*0.45);
      }
      let z = map(i, 0, this.node_front.length-1, skyline.z+(real(500)+gap_block)*3, skyline.z+(real(500)+gap_block)*2);
      z -= gap_block+real(150);
      if (i != this.node_front.length-1) {
        z += random(-(real(500)+gap_block)/2.0*0.25, 0);
      } else {
        z -= real(250);
      }
      let y = max(map(noise(j+this.ran+555), 0, 1, skyline.y+real(500), skyline.y-real(1500)), skyline.y+real(2.5));
      if (i == 1) {
        y = max(map(noise(j+this.ran+555), 0, 1, skyline.y+real(500), skyline.y-real(1500)), skyline.y-real(300));
      } else if (i == 2) {
        y = max(map(noise(j+this.ran+555), 0, 1, skyline.y+real(1000), skyline.y-real(2000)), skyline.y-real(300));
      }

      this.Y_target_front[i][j] = y;
      this.node_front[i][j] = createVector(x, y, z);
    }
  }
  this.count_front_x =this.node_front[0].length;














  this.change = function() {
    if (have_button_regenerate) {
      this.ran = random(-999, 999);
      for (let i=0; i<this.node_behind.length; i++) {
        for (let j=0; j<this.node_behind[i].length; j++) {
          this.node_behind[i][j].y = skyline.y+real(2.5);
        }
      }

      for (let i=0; i<this.node_middle.length; i++) {
        for (let j=0; j<this.node_middle[i].length; j++) {
          this.node_middle[i][j].y = skyline.y+real(2.5);
        }
      }

      for (let i=0; i<this.node_front.length; i++) {
        for (let j=0; j<this.node_front[i].length; j++) {
          this.node_front[i][j].y = skyline.y+real(2.5);
        }
      }





      if (this.house.length > 0) {
        for (let i=0; i<this.house.length; i++) {
          const i_node = this.node_front[0].length-1-(this.count_front_x-this.house_in_which_node[i]);
          if (i_node > 0) {
            const floor_num = floor(random(stateVar_floor[state_floor][7], stateVar_floor[state_floor][8]+1));
            const w = min(real(random(200, 400)), this.node_front[1][i_node-1].x-this.node_front[1][i_node].x);
            const d = real(random(100, 200));
            const x = random(this.node_front[1][i_node].x, (this.node_front[1][i_node-1].x-w));
            const y = skyline.y;//this.Y_target_front[1][i_node]+real(5);
            const z = this.node_front[1][i_node].z-d;
            this.house[i].change(createVector(x, y, z), w, d, H_floor, floor_num, -1);
          }
        }
      }


      if (this.house_middle.length > 0) {
        for (let i=0; i<this.house_middle.length; i++) {
          const i_node = this.node_middle[0].length-1-(this.count_middle_x-this.house_middle_in_which_node[i]);
          if (i_node > 0) {
            const floor_num = floor(random(stateVar_floor[state_floor][9], stateVar_floor[state_floor][10]+1));
            const w = min(real(random(150, 300)), this.node_middle[1][i_node-1].x-this.node_middle[1][i_node].x);
            const d = real(random(75, 150));
            const x = random(this.node_middle[1][i_node].x, (this.node_middle[1][i_node-1].x-w));
            const y = skyline.y;            
            const z = lerp(this.node_middle[1][i_node].z, this.node_middle[1][i_node-1].z, map(x, this.node_middle[1][i_node].x, (this.node_middle[1][i_node-1].x-w), 0, 1))  -  d*1.5;
            this.house_middle[i].change(createVector(x, y, z), w, d, H_floor, floor_num, -1);
          }
        }
      }
    }  if (have_button_shine) {
      if (this.house.length > 0) {
        for (let i=0; i<this.house.length; i++) {
          this.house[i].lightUpAllWin();
        }
      }
      if (this.house_middle.length > 0) {
        for (let i=0; i<this.house_middle.length; i++) {
          this.house_middle[i].lightUpAllWin();
        }
      }
    }  if (have_button_submerge) {
      if (this.house.length > 0) {
        for (let i=0; i<this.house.length; i++) {      
          this.house[i].changeBeginY();
        }
      }
      if (this.house_middle.length > 0) {
        for (let i=0; i<this.house_middle.length; i++) {
          this.house_middle[i].changeBeginY();
        }
      }
    }  if (have_button_spring) {
      if (this.house.length > 0) {
        for (let i=0; i<this.house.length; i++) {
          this.house[i].changeH();
        }
      }
      if (this.house_middle.length > 0) {
        for (let i=0; i<this.house_middle.length; i++) {
          this.house_middle[i].changeH();
        }
      }
    }
  };

















  this.update = function() {
    for (let i=0; i<this.node_behind.length; i++) {
      for (let j=0; j<this.node_behind[i].length; j++) {
        this.node_behind[i][j].x += speed;
        this.node_behind[i][j].y = easing_x(this.node_behind[i][j].y, this.Y_target_behind[i][j], 0.05);
      }
    }

    for (let i=0; i<this.node_middle.length; i++) {
      for (let j=0; j<this.node_middle[i].length; j++) {
        this.node_middle[i][j].x += speed;
        this.node_middle[i][j].y = easing_x(this.node_middle[i][j].y, this.Y_target_middle[i][j], 0.1);
      }
    }

    for (let i=0; i<this.node_front.length; i++) {
      for (let j=0; j<this.node_front[i].length; j++) {
        this.node_front[i][j].x += speed;
        this.node_front[i][j].y = easing_x(this.node_front[i][j].y, this.Y_target_front[i][j], 0.2);
      }
    }





    if (this.node_behind[0][0].x > this.deadLine) {
      for (let i=0; i<this.node_behind.length; i++) {
        this.node_behind[i].shift();
        this.Y_target_behind[i].shift();
      }
    }

    if (this.node_middle[0][0].x > this.deadLine) {
      for (let i=0; i<this.node_middle.length; i++) {
        this.node_middle[i].shift();
        this.Y_target_middle[i].shift();
      }
    }

    if (this.node_front[0][0].x > this.deadLine) {
      for (let i=0; i<this.node_front.length; i++) {
        this.node_front[i].shift();
        this.Y_target_front[i].shift();
      }
    }



    if (this.house.length > 0) {
      if (this.house[0].begin.x > endLine) {
        this.house.shift();
        this.house_in_which_node.shift();
      }
    }

    if (this.house_middle.length > 0) {
      if (this.house_middle[0].begin.x > endLine) {
        this.house_middle.shift();
        this.house_middle_in_which_node.shift();
      }
    }






    if (this.house.length > 0) {
      for (let i=0; i<this.house.length; i++) {
        this.house[i].update(-1);
        if (have_button_regenerate) {
          const i_node = this.node_front[0].length-1-(this.count_front_x-this.house_in_which_node[i]);
          this.house[i].begin.y = this.node_front[1][i_node].y;
        }
      }
    }

    if (this.house_middle.length > 0) {
      for (let i=0; i<this.house_middle.length; i++) {
        this.house_middle[i].update(-1);
        if (have_button_regenerate) {
          const i_node = this.node_middle[0].length-1-(this.count_middle_x-this.house_middle_in_which_node[i]);
          if (i_node > 0) {
            this.house_middle[i].begin.y = lerp(this.node_middle[1][i_node].y, this.node_middle[1][i_node-1].y, map(this.house_middle[i].begin.x, this.node_middle[1][i_node].x, this.node_middle[1][i_node-1].x-this.house_middle[i].W, 0, 1))  +  real(50);
          }
        }
      }
    }
  };










  this.pushNode = function(isRiver) {
    for (let i=0; i<this.node_behind.length; i++) {
      //this.node_behind[i].shift();

      let x = beginLine;
      if (i != 0) {
        x += random(-(this.deadLine-beginLine) / (this.node_behind[0].length+1)*0.45, (this.deadLine-beginLine) / (this.node_behind[0].length+1)*0.45);
      }
      let z = map(i, 0, this.node_behind.length-1, skyline.z+(real(500)+gap_block), skyline.z);
      if (i != this.node_behind.length-1) {
        z += random(-(real(500)+gap_block)/2.0*0.25, (real(500)+gap_block)/2.0*0.25);
      }
      let y = skyline.y;
      if (i == 1) {
        y = map(noise(this.count_behind_x+this.ran), 0, 1, skyline.y-real(1000), skyline.y-real(1500));
      } else if (i == 2) {
        y = map(noise(this.count_behind_x+this.ran+999), 0, 1, skyline.y-real(1200), skyline.y-real(1500));
      }
      if (isRiver) {
        y = skyline.y + real(2.5);
      }
      this.Y_target_behind[i].push(y);
      this.node_behind[i].push(createVector(x, y, z));
    }
    this.count_behind_x += 1;






    for (let i=0; i<this.node_middle.length; i++) {
      //this.node_middle[i].shift();

      let x = beginLine;
      if (i != 0) {
        x += random(-(this.deadLine-beginLine) / (this.node_middle[0].length+1)*0.45, (this.deadLine-beginLine) / (this.node_middle[0].length+1)*0.45);
      }
      let z = map(i, 0, this.node_middle.length-1, skyline.z+(real(500)+gap_block)*2, skyline.z+(real(500)+gap_block));

      if (i != this.node_middle.length-1) {
        z -= gap_block+real(150);
        z += random(-(real(500)+gap_block)/2.0*0.25, (real(500)+gap_block)/2.0*0.25);
      } else {
        z -= real(200);
      }
      let y = skyline.y;
      if (i == 1) {
        y = map(noise(this.count_middle_x+this.ran+777), 0, 1, skyline.y-real(400), skyline.y-real(1300));
      } else if (i == 2) {
        y = map(noise(this.count_middle_x+this.ran+123), 0, 1, skyline.y-real(500), skyline.y-real(1200));
      }
      if (isRiver) {
        y = skyline.y + real(2.5);
      }
      this.Y_target_middle[i].push(y);
      this.node_middle[i].push(createVector(x, y, z));
    }
    this.count_middle_x += 1;






    for (let i=0; i<this.node_front.length; i++) {
      //this.node_front[i].shift();

      let x = beginLine;
      if (i != 0) {
        x += map(noise(this.ran+91), 0, 1, -(this.deadLine-beginLine) / (this.node_front[0].length+1)*0.5, (this.deadLine-beginLine) / (this.node_front[0].length+1)*0.5);
      }
      let z = map(i, 0, this.node_front.length-1, skyline.z+(real(500)+gap_block)*3, skyline.z+(real(500)+gap_block)*2);
      z -= gap_block+real(150);
      if (i != this.node_front.length-1) {
        z += random(-(real(500)+gap_block)/2.0*0.25, 0);
      } else {
        z -= real(250);
      }
      let y = max(map(noise(this.count_front_x+this.ran+555), 0, 1, skyline.y+real(500), skyline.y-real(1500)), skyline.y+real(2.5));
      if (i == 1) {
        y = max(map(noise(this.count_front_x+this.ran+555), 0, 1, skyline.y+real(500), skyline.y-real(1500)), skyline.y-real(300));
      } else if (i == 2) {
        y = max(map(noise(this.count_front_x+this.ran+555), 0, 1, skyline.y+real(1000), skyline.y-real(2000)), skyline.y-real(300));
      }
      if (isRiver) {
        y = skyline.y + real(2.5);
      }
      this.Y_target_front[i].push(y);
      this.node_front[i].push(createVector(x, y, z));
    }
    this.count_front_x += 1;




    if (this.Y_target_front[1][this.Y_target_front[1].length-1] <= skyline.y-real(300)    &&
      this.Y_target_front[1][this.Y_target_front[1].length-2] <= skyline.y-real(300)      &&
      this.node_front[1][this.node_front[0].length-2].x-this.node_front[1][this.node_front[0].length-1].x > real(150)) {
      const floor_num = floor(random(stateVar_floor[state_floor][7], stateVar_floor[state_floor][8]+1));
      const w = min(real(random(200, 400)), this.node_front[1][this.node_front[0].length-2].x-this.node_front[1][this.node_front[0].length-1].x);
      const d = real(random(100, 200));
      const x = random(this.node_front[1][this.node_front[1].length-1].x, (this.node_front[1][this.node_front[1].length-2].x-w));
      const y = this.Y_target_front[1][this.Y_target_front[1].length-1]+real(5);
      const z = this.node_front[1][this.node_front[1].length-1].z-d;
      this.house.push(new House(createVector(x, y, z), w, d, H_floor, floor_num, 3, -1));
      this.house_in_which_node.push(this.count_front_x);
    }




    if (this.Y_target_middle[1][this.Y_target_middle[1].length-1]  <  this.Y_target_middle[2][this.Y_target_middle[2].length-1]      &&
      this.Y_target_middle[1][this.Y_target_middle[1].length-2]  <  this.Y_target_middle[2][this.Y_target_middle[2].length-2]        &&
      this.node_middle[1][this.node_middle[1].length-2].x-this.node_middle[1][this.node_middle[1].length-1].x > real(100)) {
      const floor_num = floor(random(stateVar_floor[state_floor][9], stateVar_floor[state_floor][10]+1));
      const w = min(real(random(150, 300)), this.node_middle[1][this.node_middle[1].length-2].x-this.node_middle[1][this.node_middle[1].length-1].x);
      const d = real(random(75, 150));
      const x = random(this.node_middle[1][this.node_middle[1].length-1].x, (this.node_middle[1][this.node_middle[1].length-2].x-w));
      const y = lerp(this.Y_target_middle[1][this.Y_target_middle[1].length-1], this.Y_target_middle[1][this.Y_target_middle[1].length-2], map(x, this.node_middle[1][this.node_middle[1].length-1].x, (this.node_middle[1][this.node_middle[1].length-2].x-w), 0, 1))  +  real(50);
      const z = lerp(this.node_middle[1][this.node_middle[1].length-1].z, this.node_middle[1][this.node_middle[1].length-2].z, map(x, this.node_middle[1][this.node_middle[1].length-1].x, (this.node_middle[1][this.node_middle[1].length-2].x-w), 0, 1))  -  d*1.5;
      this.house_middle.push(new House(createVector(x, y, z), w, d, H_floor, floor_num, 4, -1));
      this.house_middle_in_which_node.push(this.count_middle_x);
    }
  };











  this.display = function() {
    fill(255, 0, 0);
    for (let i=0; i<this.node_behind.length-1; i++) {
      for (let j=0; j<this.node_behind[i].length-1; j++) {
        let c1 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_behind[i][j].y, skyline.y-real(1000), skyline.y-real(1500), 0, 0.5)), c_near, constrain(map(this.node_behind[i][j].z, skyline.z, 0, 0, 1), 0, 1));
        let c2 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_behind[i][j+1].y, skyline.y-real(1000), skyline.y-real(1500), 0, 0.5)), c_near, constrain(map(this.node_behind[i][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c3 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_behind[i+1][j+1].y, skyline.y-real(1000), skyline.y-real(1500), 0, 0.5)), c_near, constrain(map(this.node_behind[i+1][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c4 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_behind[i+1][j].y, skyline.y-real(1000), skyline.y-real(1500), 0, 0.5)), c_near, constrain(map(this.node_behind[i+1][j].z, skyline.z, 0, 0, 1), 0, 1));

        TRIANGLES_getRect_fill4(this.node_behind[i][j], this.node_behind[i][j+1], this.node_behind[i+1][j+1], this.node_behind[i+1][j], c1, c2, c3, c4);
      }
    }

    for (let i=0; i<this.node_middle.length-1; i++) {
      for (let j=0; j<this.node_middle[i].length-1; j++) {
        let c1 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_middle[i][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.5)), lerpColor(c_near, c_sky, map(this.node_middle[i][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.1)), constrain(map(this.node_middle[i][j].z, skyline.z, 0, 0, 1), 0, 1));
        let c2 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_middle[i][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.5)), lerpColor(c_near, c_sky, map(this.node_middle[i][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.1)), constrain(map(this.node_middle[i][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c3 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_middle[i+1][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.5)), lerpColor(c_near, c_sky, map(this.node_middle[i+1][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.1)), constrain(map(this.node_middle[i+1][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c4 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_middle[i+1][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.5)), lerpColor(c_near, c_sky, map(this.node_middle[i+1][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.1)), constrain(map(this.node_middle[i+1][j].z, skyline.z, 0, 0, 1), 0, 1));

        TRIANGLES_getRect_fill4(this.node_middle[i][j], this.node_middle[i][j+1], this.node_middle[i+1][j+1], this.node_middle[i+1][j], c1, c2, c3, c4);
      }
    }


    for (let i=0; i<this.node_front.length-1; i++) {
      for (let j=0; j<this.node_front[i].length-1; j++) {
        let c1 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_front[i][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.25)), c_near, constrain(map(this.node_front[i][j].z, skyline.z, 0, 0, 1), 0, 1));
        let c2 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_front[i][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.25)), c_near, constrain(map(this.node_front[i][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c3 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_front[i+1][j+1].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.25)), c_near, constrain(map(this.node_front[i+1][j+1].z, skyline.z, 0, 0, 1), 0, 1));
        let c4 = lerpColor(lerpColor(c_sky, c_sky_near, map(this.node_front[i+1][j].y, skyline.y-real(500), skyline.y-real(1500), 0, 0.25)), c_near, constrain(map(this.node_front[i+1][j].z, skyline.z, 0, 0, 1), 0, 1));

        TRIANGLES_getRect_fill4(this.node_front[i][j], this.node_front[i][j+1], this.node_front[i+1][j+1], this.node_front[i+1][j], c1, c2, c3, c4);
      }
    }




    if (this.house.length > 0) {
      for (let i=0; i<this.house.length; i++) {
        this.house[i].display_TRIANGLES();
      }
    }

    if (this.house_middle.length > 0) {
      for (let i=0; i<this.house_middle.length; i++) {
        this.house_middle[i].display_TRIANGLES();
      }
    }
  };




  this.displayInfo = function() {
    //noFill();
    //strokeWeight(real(2));
    //stroke(c_infoYellow);
    //beginShape(LINES);
    for (let i=0; i<this.node_behind.length; i++) {
      for (let j=0; j<this.node_behind[i].length-1; j++) {
        LINES_getLine(this.node_behind[i][j], this.node_behind[i][j+1]);
      }
    }

    for (let j=0; j<this.node_behind[0].length; j++) {
      for (let i=0; i<this.node_behind.length-1; i++) {
        LINES_getLine(this.node_behind[i][j], this.node_behind[i+1][j]);
      }
    }

    for (let i=0; i<this.node_middle.length; i++) {
      for (let j=0; j<this.node_middle[i].length-1; j++) {
        LINES_getLine(this.node_middle[i][j], this.node_middle[i][j+1]);
      }
    }

    for (let j=0; j<this.node_middle[0].length; j++) {
      for (let i=0; i<this.node_middle.length-1; i++) {
        LINES_getLine(this.node_middle[i][j], this.node_middle[i+1][j]);
      }
    }

    for (let i=0; i<this.node_front.length; i++) {
      for (let j=0; j<this.node_front[i].length-1; j++) {
        LINES_getLine(this.node_front[i][j], this.node_front[i][j+1]);
      }
    }

    for (let j=0; j<this.node_front[0].length; j++) {
      for (let i=0; i<this.node_front.length-1; i++) {
        LINES_getLine(this.node_front[i][j], this.node_front[i+1][j]);
      }
    }
   // endShape();


    if (this.house.length > 0) {
      for (let i=0; i<this.house.length; i++) {
        this.house[i].displayInfo();
      }
    }

    if (this.house_middle.length > 0) {
      for (let i=0; i<this.house_middle.length; i++) {
        this.house_middle[i].displayInfo();
      }
    }
  };
}