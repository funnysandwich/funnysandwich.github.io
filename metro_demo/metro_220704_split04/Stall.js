function Stall(begin_room, W_room, D_room, is_faceRight) {
  this.ran = random(-999, 999);
  this.begin_room = begin_room.copy();
  this.W_room = W_room;
  this.D_room = D_room;
  this.W = real(random(30, 55));
  this.D = D_room * random(0.35, 0.5);
  this.H_base = real(random(4, 8));
  this.H_car = real(random(15, 28));
  this.H_pillar = real(random(20, 50));
  this.H_upPoster = real(random(7, 15));
  this.var_easing1 = random(0.4, 0.6);

  this.state = floor(random(0, 3));


  this.is_faceRight = is_faceRight;

  this.begin = begin_room.copy().add(W_room-this.W, 0, random(D_room*0.1, D_room-this.D-D_room*0.1));
  if (!this.is_faceRight) {
    this.begin = begin_room.copy().add(0, 0, random(D_room*0.1, D_room-this.D-D_room*0.1));
  }

  this.center = this.begin.copy().add(this.W/2.0, 0, this.D/2.0);





  if (have_button_spring) {
    this.open_spring = false;
    this.time_spring = 0;
    this.time_max_spring = floor(random(5, 15));
    this.H_ori_target = this.H_pillar;
    this.H_ori_ori = this.H_pillar;
  } 




  this.node_wall = Array.from(Array(5), () => new Array(4));
  this.node_rotate = Array.from(Array(this.node_wall.length), () => new Array(2));


  for (let i=0; i<this.node_rotate.length; i++) {
    let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-2, 0, 1);
    let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-2, 0, 1);
    this.node_rotate[i][0] = lz;
    if (i == this.node_rotate.length-1) {
      this.node_rotate[i][0] = this.node_rotate[i-1][0];
    }
    this.node_rotate[i][1] = 0;
  }


  for (let i=0; i<this.node_wall.length; i++) {
    for (let j=0; j<this.node_wall[i].length; j++) {
      this.node_wall[i][j] = this.center.copy();
    }
  }







  this.change = function() {
    this.ran = random(-999, 999);
    this.W = real(random(30, 45));
    this.D = D_room * random(0.35, 0.5);
    this.H_base = real(random(4, 8));
    this.H_car = real(random(20, 30));
    this.H_pillar = real(random(20, 30));
    this.H_upPoster = real(random(7, 15));
    this.var_easing1 = random(0.4, 0.6);

    this.state = floor(random(0, 3));


    this.begin = this.begin_room.copy().add(this.W_room-this.W, 0, random(this.D_room*0.1, this.D_room-this.D-this.D_room*0.1));
    if (!this.is_faceRight) {
      this.begin = this.begin_room.copy().add(0, 0, random(this.D_room*0.1, this.D_room-this.D-this.D_room*0.1));
    }

    this.center = this.begin.copy().add(this.W/2.0, 0, this.D/2.0);



    for (let i=0; i<this.node_rotate.length; i++) {
      let lz = map(noise(i*0.1+this.ran), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-2, 0, 1);
      let lx = map(noise(i*0.1+this.ran+999), 0, 1, -HALF_PI*0.25, HALF_PI*0.25) * map(i, 0, this.node_rotate.length-2, 0, 1);
      this.node_rotate[i][0] = lz;
      if (i == this.node_rotate.length-1) {
        this.node_rotate[i][0] = this.node_rotate[i-1][0];
      }
      this.node_rotate[i][1] = 0;
    }


    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        this.node_wall[i][j] = this.center.copy();
      }
    }
  };









  this.changeH = function() {
    if (!this.open_spring  &&  random(1) < 0.75) {
      this.open_spring = true;
      this.time_spring = 0;
      this.time_max_spring = floor(random(5, 15));
      this.H_ori_target = this.H_pillar * random(1.75, 4);
      this.H_ori_ori = this.H_pillar;
      //if (state_floor == 3) {
      //  this.H_ori_target = real(10);
      //  this.H_ori_ori = this.H_ori;
      //}
    }
  };
  
  
  
  
  
  












  this.update = function() {
    this.begin_room.x += speed;
    this.begin.x += speed;
    this.center = this.begin.copy().add(this.W/2.0, 0, this.D/2.0);
    
    
    
    if (have_button_spring  &&  this.open_spring) {
      if (this.time_spring < this.time_max_spring) {
        this.time_spring ++;
      } else {
        this.open_spring = false;
      }
      this.H_pillar = map(sin(map(this.time_spring, 0, this.time_max_spring, 0, PI)), 0, 1, this.H_ori_ori, this.H_ori_target);
    }
    
    
    


    for (let i=0; i<this.node_wall.length; i++) {
      const y = -(constrain(i-0, 0, 1)*this.H_base) - (constrain(i-1, 0, 1)*this.H_car) - (constrain(i-2, 0, 1)*this.H_pillar) - (constrain(i-3, 0, 1)*this.H_upPoster);
      for (let j=0; j<this.node_wall[i].length; j++) {
        let n = createVector(this.W/2.0 * pow(-1, ceil(j%1.5)+1), y, this.D/2.0 * pow(-1, floor(j/2)+1));
        n = PRotateZ(n, this.node_rotate[i][0]);
        n.add(this.center);
        this.node_wall[i][j] = easing_p(this.node_wall[i][j], n, this.var_easing1);
      }
    }
  };









  this.display = function() {
    let t;
    const moveX_base = real(4);
    const weight_base = real(4);

    //noStroke();
    //beginShape(TRIANGLES);


    //--- base FL ---
    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][3].x +moveX_base, this.node_wall[1][3].y, this.node_wall[1][3].z -moveX_base);
    vertex(this.node_wall[1][3].x +moveX_base +weight_base, this.node_wall[1][3].y, this.node_wall[1][3].z -moveX_base);
    vertex(this.node_wall[0][3].x +moveX_base +weight_base, this.node_wall[0][3].y, this.node_wall[0][3].z -moveX_base);
    vertex(this.node_wall[0][3].x +moveX_base +weight_base, this.node_wall[0][3].y, this.node_wall[0][3].z -moveX_base);
    vertex(this.node_wall[0][3].x +moveX_base, this.node_wall[0][3].y, this.node_wall[0][3].z -moveX_base);
    vertex(this.node_wall[1][3].x +moveX_base, this.node_wall[1][3].y, this.node_wall[1][3].z -moveX_base);
    //--- base FR ---
    vertex(this.node_wall[1][2].x -moveX_base, this.node_wall[1][2].y, this.node_wall[1][2].z -moveX_base);
    vertex(this.node_wall[1][2].x -moveX_base -weight_base, this.node_wall[1][2].y, this.node_wall[1][2].z -moveX_base);
    vertex(this.node_wall[0][2].x -moveX_base -weight_base, this.node_wall[0][2].y, this.node_wall[0][2].z -moveX_base);
    vertex(this.node_wall[0][2].x -moveX_base -weight_base, this.node_wall[0][2].y, this.node_wall[0][2].z -moveX_base);
    vertex(this.node_wall[0][2].x -moveX_base, this.node_wall[0][2].y, this.node_wall[0][2].z -moveX_base);
    vertex(this.node_wall[1][2].x -moveX_base, this.node_wall[1][2].y, this.node_wall[1][2].z -moveX_base);
    //--- base BL ---
    t = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[1][0].x +moveX_base, this.node_wall[1][0].y, this.node_wall[1][0].z +moveX_base);
    vertex(this.node_wall[1][0].x +moveX_base +weight_base, this.node_wall[1][0].y, this.node_wall[1][0].z +moveX_base);
    vertex(this.node_wall[0][0].x +moveX_base +weight_base, this.node_wall[0][0].y, this.node_wall[0][0].z +moveX_base);
    vertex(this.node_wall[0][0].x +moveX_base +weight_base, this.node_wall[0][0].y, this.node_wall[0][0].z +moveX_base);
    vertex(this.node_wall[0][0].x +moveX_base, this.node_wall[0][0].y, this.node_wall[0][0].z +moveX_base);
    vertex(this.node_wall[1][0].x +moveX_base, this.node_wall[1][0].y, this.node_wall[1][0].z +moveX_base);
    //--- base BR ---
    vertex(this.node_wall[1][1].x -moveX_base, this.node_wall[1][1].y, this.node_wall[1][1].z +moveX_base);
    vertex(this.node_wall[1][1].x -moveX_base -weight_base, this.node_wall[1][1].y, this.node_wall[1][1].z +moveX_base);
    vertex(this.node_wall[0][1].x -moveX_base -weight_base, this.node_wall[0][1].y, this.node_wall[0][1].z +moveX_base);
    vertex(this.node_wall[0][1].x -moveX_base -weight_base, this.node_wall[0][1].y, this.node_wall[0][1].z +moveX_base);
    vertex(this.node_wall[0][1].x -moveX_base, this.node_wall[0][1].y, this.node_wall[0][1].z +moveX_base);
    vertex(this.node_wall[1][1].x -moveX_base, this.node_wall[1][1].y, this.node_wall[1][1].z +moveX_base);


    //--- car F ---
    t = constrain(map(this.node_wall[2][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[2][3].x, this.node_wall[2][3].y, this.node_wall[2][3].z);
    vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
    vertex(this.node_wall[1][2].x, this.node_wall[1][2].y, this.node_wall[1][2].z);
    vertex(this.node_wall[1][2].x, this.node_wall[1][2].y, this.node_wall[1][2].z);
    vertex(this.node_wall[1][3].x, this.node_wall[1][3].y, this.node_wall[1][3].z);
    vertex(this.node_wall[2][3].x, this.node_wall[2][3].y, this.node_wall[2][3].z);
    //--- car B ---
    t = constrain(map(this.node_wall[2][0].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
    vertex(this.node_wall[2][1].x, this.node_wall[2][1].y, this.node_wall[2][1].z);
    vertex(this.node_wall[1][1].x, this.node_wall[1][1].y, this.node_wall[1][1].z);
    vertex(this.node_wall[1][1].x, this.node_wall[1][1].y, this.node_wall[1][1].z);
    vertex(this.node_wall[1][0].x, this.node_wall[1][0].y, this.node_wall[1][0].z);
    vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
    if (this.is_faceRight) {
      //--- car R ---
      t = constrain(map(this.node_wall[2][2].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
      t = constrain(map(this.node_wall[2][1].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[2][1].x, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[1][1].x, this.node_wall[1][1].y, this.node_wall[1][1].z);
      vertex(this.node_wall[1][1].x, this.node_wall[1][1].y, this.node_wall[1][1].z);
      t = constrain(map(this.node_wall[2][2].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[1][2].x, this.node_wall[1][2].y, this.node_wall[1][2].z);
      vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
    } else {
      //--- car L ---
      t = constrain(map(this.node_wall[2][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
      t = constrain(map(this.node_wall[2][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[2][3].x, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[1][3].x, this.node_wall[1][3].y, this.node_wall[1][3].z);
      vertex(this.node_wall[1][3].x, this.node_wall[1][3].y, this.node_wall[1][3].z);
      t = constrain(map(this.node_wall[2][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[1][0].x, this.node_wall[1][0].y, this.node_wall[1][0].z);
      vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
    }
    const addW = real(0);
    //--- car U ---
    t = constrain(map(this.node_wall[2][0].z-real(500), skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t));
    if (this.is_faceRight) {

      vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
      vertex(this.node_wall[2][1].x +addW, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[2][2].x +addW, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][2].x +addW, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][3].x, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
    } else {
      vertex(this.node_wall[2][0].x -addW, this.node_wall[2][0].y, this.node_wall[2][0].z);
      vertex(this.node_wall[2][1].x, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][3].x -addW, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[2][0].x -addW, this.node_wall[2][0].y, this.node_wall[2][0].z);
    }


    const weight_pillar = real(2);
    if (this.state == 1  ||  this.state == 2  ||  this.is_faceRight) {
      //--- pillar FR ---
      t = constrain(map(this.node_wall[4][2].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      vertex(this.node_wall[4][2].x -weight_pillar, this.node_wall[4][2].y, this.node_wall[4][2].z);
      vertex(this.node_wall[2][2].x -weight_pillar, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][2].x -weight_pillar, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[2][2].x, this.node_wall[2][2].y, this.node_wall[2][2].z);
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      //--- pillar BR ---
      t = constrain(map(this.node_wall[4][1].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][1].x, this.node_wall[4][1].y, this.node_wall[4][1].z);
      vertex(this.node_wall[4][1].x -weight_pillar, this.node_wall[4][1].y, this.node_wall[4][1].z);
      vertex(this.node_wall[2][1].x -weight_pillar, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[2][1].x -weight_pillar, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[2][1].x, this.node_wall[2][1].y, this.node_wall[2][1].z);
      vertex(this.node_wall[4][1].x, this.node_wall[4][1].y, this.node_wall[4][1].z);
    } 
    if (this.state == 1  ||  this.state == 2  ||  !this.is_faceRight) {
      //--- pillar FL ---
      t = constrain(map(this.node_wall[4][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      vertex(this.node_wall[4][3].x +weight_pillar, this.node_wall[4][3].y, this.node_wall[4][3].z);
      vertex(this.node_wall[2][3].x +weight_pillar, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[2][3].x +weight_pillar, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[2][3].x, this.node_wall[2][3].y, this.node_wall[2][3].z);
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      //--- pillar BL ---
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
      vertex(this.node_wall[4][0].x +weight_pillar, this.node_wall[4][0].y, this.node_wall[4][0].z);
      vertex(this.node_wall[2][0].x +weight_pillar, this.node_wall[2][0].y, this.node_wall[2][0].z);
      vertex(this.node_wall[2][0].x +weight_pillar, this.node_wall[2][0].y, this.node_wall[2][0].z);
      vertex(this.node_wall[2][0].x, this.node_wall[2][0].y, this.node_wall[2][0].z);
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
    }


    if (this.state == 2) {
      //--- poster U ---
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
      vertex(this.node_wall[4][1].x, this.node_wall[4][1].y, this.node_wall[4][1].z);
      t = constrain(map(this.node_wall[4][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
    }
    if (this.state == 1  ||  this.state == 2) {
      //--- poster F ---
      t = constrain(map(this.node_wall[4][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      vertex(this.node_wall[3][2].x, this.node_wall[3][2].y, this.node_wall[3][2].z);
      vertex(this.node_wall[3][2].x, this.node_wall[3][2].y, this.node_wall[3][2].z);
      vertex(this.node_wall[3][3].x, this.node_wall[3][3].y, this.node_wall[3][3].z);
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      //--- poster B ---
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
      vertex(this.node_wall[4][1].x, this.node_wall[4][1].y, this.node_wall[4][1].z);
      vertex(this.node_wall[3][1].x, this.node_wall[3][1].y, this.node_wall[3][1].z);
      vertex(this.node_wall[3][1].x, this.node_wall[3][1].y, this.node_wall[3][1].z);
      vertex(this.node_wall[3][0].x, this.node_wall[3][0].y, this.node_wall[3][0].z);
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
    }
    if (this.is_faceRight) {
      //--- poster R ---
      t = constrain(map(this.node_wall[4][2].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
      t = constrain(map(this.node_wall[4][1].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][1].x, this.node_wall[4][1].y, this.node_wall[4][1].z);
      vertex(this.node_wall[3][1].x, this.node_wall[3][1].y, this.node_wall[3][1].z);
      vertex(this.node_wall[3][1].x, this.node_wall[3][1].y, this.node_wall[3][1].z);
      t = constrain(map(this.node_wall[4][2].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[3][2].x, this.node_wall[3][2].y, this.node_wall[3][2].z);
      vertex(this.node_wall[4][2].x, this.node_wall[4][2].y, this.node_wall[4][2].z);
    } else {
      //--- poster L ---
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
      t = constrain(map(this.node_wall[4][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[4][3].x, this.node_wall[4][3].y, this.node_wall[4][3].z);
      vertex(this.node_wall[3][3].x, this.node_wall[3][3].y, this.node_wall[3][3].z);
      vertex(this.node_wall[3][3].x, this.node_wall[3][3].y, this.node_wall[3][3].z);
      t = constrain(map(this.node_wall[4][0].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));
      vertex(this.node_wall[3][0].x, this.node_wall[3][0].y, this.node_wall[3][0].z);
      vertex(this.node_wall[4][0].x, this.node_wall[4][0].y, this.node_wall[4][0].z);
    }



    // endShape();
  };












  this.displayInfo = function() {
    //noFill();
    //strokeWeight(real(1.5));
    //stroke(c_info2);

    //beginShape(LINES);
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i][(j+1)%4].x, this.node_wall[i][(j+1)%4].y, this.node_wall[i][(j+1)%4].z);
      }
    }
    for (let j=0; j<this.node_wall[0].length; j++) {
      for (let i=0; i<this.node_wall.length-1; i++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
      }
    }
    //endShape();
  };
}