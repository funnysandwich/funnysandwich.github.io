/*
 -----------------
 test01
 
 
 
 -----------------
 test02
 
 玻璃罩子的结构改成更简单的形状
 
 由于内部空间变成圆角矩形，所以地层也要重新算
 
 
 
 
 -----------------
 test03
 
 改变画风
 加入复式楼层
 
 
 因为太多人表示看不出来app的样式，所以尝试用黑色阴影覆盖下来，但是现在效果有点烂
 
 
 
 
 -----------------
 test04
 
 阴影改成圆扩散就好多了
 
 加入时间
 高度也加入时间
 
 
 
 
 
 */

const searchParams = new URLSearchParams(window.location.href);
let px = 2;
if (searchParams.has("px")) {
  if (
    searchParams.get("px") === '1'    ||
    searchParams.get("px") === '2'    ||
    searchParams.get("px") === '3'    ||
    searchParams.get("px") === '4'    ||
    searchParams.get("px") === '5'    ||
    searchParams.get("px") === '6'
    ) {
    px = Math.floor(searchParams.get("px"));
  } else {
    px = 2;
  }
}


console.log("px: "+px);





let cvWH = Math.min(window.innerWidth, window.innerHeight);
let canvas, PG;



let c_bkg, c_dark, c_object;
let c_info;



let block;
let gap_block, W_block, D_block;






// 0：1个  1：平铺  2：俯视图平铺  3：垂直城市
let state_arrange = countProb([1, 1, 1, 1]);




// 0：正方形  1：横的长方形1440:900  2：竖的长方形500:1080
let state_WH = countProb([1, 1, 1]);

let var_WH;
if (state_WH == 0) {
  var_WH = [Math.min(window.innerWidth, window.innerHeight), Math.min(window.innerWidth, window.innerHeight)];
} else if (state_WH == 1) {
  if (window.innerWidth / window.innerHeight > 1.6) {
    var_WH = [Math.round(window.innerHeight*1.6), window.innerHeight];
  } else {
    var_WH = [window.innerWidth, Math.round(window.innerWidth/1.6)];
  }
} else if (state_WH == 2) {
  if (window.innerHeight / window.innerWidth > 2.16) {
    var_WH = [window.innerWidth, Math.round(window.innerWidth*2.16)];
  } else {
    var_WH = [Math.round(window.innerHeight/2.16), window.innerHeight];
  }
}




let state_view = 0;
let var_view = [
  [0.33, 0.5, 500.0/Math.min(var_WH[0], var_WH[1])], // 0：俯视30度，斜视45度
  [0.66, 0.0, 700.0/Math.min(var_WH[0], var_WH[1])], // 1：俯视60度，正视
  [0.5, 0.15, 700.0/Math.min(var_WH[0], var_WH[1])], // 2：俯视45度，斜视13.5度
  [0.5, 0.5, 700.0/Math.min(var_WH[0], var_WH[1])], // 3：俯视45度，斜视45度
  [1, 0, 700.0/Math.min(var_WH[0], var_WH[1])]        // 4：俯视90度，正视
];



// 0：无  1：草地  2：网格
let state_ground = 1;//countProb([0, 1, 1]);


// 0：无  1：常规noise炸毛  2：下滑  3：游离  4：震动
let state_noise = 4;

// 1：常规结构塔  2：长腿  3：烟囱（太丑了，舍弃）  4：石塔楼  5：东方塔楼
let state_baseTower = 0;




if (state_arrange == 0) {
  if (state_WH == 1) {
    var_view[state_view][2] = 700.0/Math.min(var_WH[0], var_WH[1]);
  }
} else if (state_arrange == 1) {
  state_view = countProb([0, 1, 1, 1]);
  if (state_WH == 2) {
    var_view[state_view][2] = 550.0/Math.min(var_WH[0], var_WH[1]);
  }
} else if (state_arrange == 2) {
  state_ground = 2;
  state_view = 4;
  // 0：无  1：常规noise炸毛  2：下滑  3：游离  4：震动
  state_noise = countProb([0, 1, 1, 1, 2]);
} else if (state_arrange == 3) {
  // 1：常规结构塔  2：长腿  3：烟囱（太丑了，舍弃）  4：石塔楼  5：东方塔楼
  state_baseTower = countProb([0, 1, 1, 0, 1, 1]);
  if (state_WH == 0) {
    state_baseTower = countProb([0, 1, 0, 0, 1, 1]);
  }
  state_view = 0;
  var_view[state_view][2] = 500.0/Math.min(var_WH[0], var_WH[1]);
  if (state_WH == 1) {
    var_view[state_view][2] = 700.0/Math.min(var_WH[0], var_WH[1]);
  }
}



// 0 ：无  1：
let state_nightShadow = 0;







let time_draw_sum = 0;
let time_draw = 0;
let time_point = [];
let count_floor_now = 0;
let count_floor_sum = 0;
let count_floor_index = 0;




let var_weight = 0;
let scaleRate = var_view[state_view][2];
let open_info = false;
let str_info = [];
let is_phone = false;
let time_touch = 0;
let open_follow = false;
















function setup() {
  canvas = createCanvas(var_WH[0], var_WH[1], WEBGL);
  //canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  canvas.position(0, (windowHeight-height)/2);
  addScreenPositionFunction();
  pixelDensity(px);
  ortho(-width/2, width/2, -height/2, height/2, -floor(real(500)), floor(real(2000)));
  textureMode(NORMAL);
  textureWrap(CLAMP);


  c_bkg = color(225);
  c_dark = color(37, 37, 37);
  c_object = c_bkg;//lerpColor(c_bkg, color(255), 1);
  c_info = color(200);
  document.bgColor = "#252525";
  background(255);
  background(c_bkg);


  var_weight = real(1);
  block = [];
  gap_block = real(33.33);
  W_block = real(100);
  D_block = real(100);
  let num_hor = 1;
  let num_ver = 1;
  if (state_arrange == 1) {
    num_hor = 10;
    num_ver = 10;
    if (state_WH == 1) {
      num_hor = 12;
      num_ver = 12;
    } else if (state_WH == 2) {
      if (state_view == 1) {
        num_hor = 4;
        num_ver = 11;
      } else {
        num_hor = 7;
        num_ver = 14;
      }
    }
  } else if (state_arrange == 2) {
    num_hor = 4;
    num_ver = 4;
    if (state_WH == 1) {
      num_hor = 7;
      num_ver = 4;
    } else if (state_WH == 2) {
      num_hor = 4;
      num_ver = 10;
    }
  } else if (state_arrange == 3) {
    num_hor = 2;
    num_ver = 2;
  }
  for (let i=0; i<num_ver; i++) {
    let z = -(D_block+gap_block)/2*(num_ver-1) + (D_block+gap_block)*i;
    if (state_arrange == 3) {
    }
    for (let j=0; j<num_hor; j++) {
      let x = -(W_block+gap_block)/2*(num_hor-1) + (W_block+gap_block)*j;
      if (state_arrange == 1  &&  state_view == 3  &&  state_WH != 1) {
        x += (i-num_ver/2) * (W_block+gap_block);
      } else if (state_arrange == 3) {
        //x = (W_block+gap_block)*j - (W_block+gap_block)*i;// - (W_block+gap_block)*5;
      }
      block.push(new Block(createVector(x, 0, z), W_block, D_block, false));
    }
  }
  //if (state_arrange == 2) {
  //  this.block_closeUp = [];
  //  this.block_closeUp.push(new Block(createVector(0, 0, 0), W_block, D_block, true));
  //}



  time_draw_sum += block.length;
  time_point.push(time_draw_sum); // display_ground

  time_draw_sum += block.length;
  time_point.push(time_draw_sum); // display_base

  for (let i=0; i<block.length; i++) {
    time_draw_sum += block[i].num_floor;
  }
  time_point.push(time_draw_sum); // display

  time_draw_sum += block.length;
  time_point.push(time_draw_sum); // display_cover_u

  time_draw_sum += 1;
  time_point.push(time_draw_sum); // red
  print(time_point);








  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  //frameRate(5);




  str_info.push("------");
  str_info.push("W_c, H_c: "+cvWH+", "+cvWH);
  str_info.push("W_w, H_w: "+window.innerWidth+", "+window.innerHeight);
  str_info.push("W_s, H_s: "+displayWidth+", "+displayHeight);




  canvas.mouseOver(over);
  canvas.mouseOut(out);
}
function over() {
  open_follow = true;
}
function out() {
  open_follow = false;
}










































function draw() {
  //background(c_bkg);
  //orbitControl();
  rotateX(-HALF_PI * var_view[state_view][0]);
  rotateY(-HALF_PI * var_view[state_view][1]);

  //push();
  //for (let i=0; i<10; i++) {
  //  translate(i*30, 0, 0);
  //  fill(255, 0, 0);
  //  stroke(0);
  //  box(20);
  //}
  //pop();



  if (touches.length == 1) {
    is_phone = true;
    time_touch ++;
  } else {
    time_touch = 0;
  }

  if (time_touch == 30) {
    open_info = !open_info;
  }




  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  if (time_draw == 0) {
    for (let i=0; i<block.length; i++) {
      //block[i].update();
    }
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆-------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------







  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    if (time_draw < time_point[0]) {
      block[time_draw].update();
      block[time_draw].display_ground();
      time_draw += 1;
    } else if (time_draw < time_point[1]) {
      //block[time_draw-time_point[0]].display_base();
      time_draw += 1;
    } else if (time_draw < time_point[2]) {
      //block[time_draw-time_point[1]-count_floor].num_floor;
      let index_block = time_draw-time_point[1] - count_floor_sum - count_floor_now + count_floor_index;

      block[index_block].display(count_floor_now);

      count_floor_now += 1;
      if (count_floor_now >= block[index_block].num_floor) {
        count_floor_index += 1;
        count_floor_now = 0;
        count_floor_sum += block[index_block].num_floor;
      }


      time_draw += 1;
    } else if (time_draw < time_point[3]) {
      if (time_draw  ==  0 + block.length*3  &&  state_nightShadow == 1) {
        push();
        //rotateY(HALF_PI);
        noFill();
        stroke(c_dark);
        strokeWeight(var_weight);

        //beginShape(LINES);
        //let _num = 1000000;
        //for (let i=0; i<_num; i++) {
        //  let _n = createVector(FS_rand(0, real(map(i, 0, _num, 400, 500))), -real(99), 0);
        //  _n = PRotateY(_n, FS_rand(0, TWO_PI));
        //  let _l = map(i, 0, _num, 10, 1);
        //  let __n = _n.copy().add(real(FS_rand(-_l, _l)), 0, real(FS_rand(-_l, _l)));
        //  vertex(_n.x, _n.y, _n.z);
        //  vertex(__n.x, __n.y, __n.z);
        //}

        //for (let i=0; i<_num; i++) {  // 画圈圈
        //  let _center = createVector(FS_rand(0, real(map(i, 0, _num, 300, 400))), -real(99), 0);
        //  let _l = real(map(cos(map(_center.x, 0, real(400), 0, HALF_PI)), 1, 0, 10, 1));
        //  _center = PRotateY(_center, FS_rand(0, TWO_PI));
        //  let _n = new Array(6);
        //  for (let j=0; j<_n.length; j++) {
        //    let x = cos(map(j, 0, _n.length, 0, TWO_PI)) * _l;
        //    let z = sin(map(j, 0, _n.length, 0, TWO_PI)) * _l;
        //    _n[j] = _center.copy().add(x, 0, z);
        //  }
        //  for (let j=0; j<_n.length; j++) {
        //    vertex(_n[j].x, _n[j].y, _n[j].z);
        //    vertex(_n[(j+1)%_n.length].x, _n[(j+1)%_n.length].y, _n[(j+1)%_n.length].z);
        //  }
        //}
        //endShape();



        //beginShape(LINES);
        //let _num = 1000000;
        //for (let i=0; i<_num; i++) {
        //  let _n = createVector(FS_rand(real(map(sin(map(i, 0, _num, 0, HALF_PI)), 0, 1, 200, 700)), real(700+10)), -real(99), 0);
        //  let _l = real(map(cos(map(_n.x, real(200), real(700), 0, HALF_PI)), 1, 0, 1, 100));
        //  _n = PRotateY(_n, FS_rand(0, TWO_PI));
        //  let __n = _n.copy().add(FS_rand(-_l, _l), 0, FS_rand(-_l, _l));
        //  vertex(_n.x, _n.y, _n.z+(gap_block+W_block)/2);
        //  vertex(__n.x, __n.y, __n.z+(gap_block+W_block)/2);
        //}
        //endShape();

        /*
      noStroke();
         fill(c_dark);
         beginShape(TRIANGLES);
         let _num = 100000;
         for (let i=0; i<_num; i++) {
         let _center = createVector(FS_rand(real(map(sin(map(i, 0, _num, 0, HALF_PI)), 0, 1, 200, 700)), real(700+10)), -real(99), 0);
         let _l = real(map(cos(map(_center.x, real(200), real(700), 0, HALF_PI)), 1, 0, 1, 100));
         _center = PRotateY(_center, FS_rand(0, TWO_PI));
         let _n = new Array(8);
         for (let j=0; j<_n.length; j++) {
         let x = cos(map(j, 0, _n.length, 0, TWO_PI)) * _l;
         let z = sin(map(j, 0, _n.length, 0, TWO_PI)) * _l;
         _n[j] = _center.copy().add(x, 0, z+(gap_block+W_block)/2);
         }
         //for (let j=0; j<_n.length; j++) {
         //  vertex(_n[j].x, _n[j].y, _n[j].z);
         //  vertex(_n[(j+1)%_n.length].x, _n[(j+1)%_n.length].y, _n[(j+1)%_n.length].z);
         //}
         for (let j=0; j<_n.length-2; j++) {
         vertex(_n[0].x, _n[0].y, _n[0].z);
         vertex(_n[j+1].x, _n[j+1].y, _n[j+1].z);
         vertex(_n[j+2].x, _n[j+2].y, _n[j+2].z);
         }
         }
         endShape();
         */

        noFill();
        stroke(c_dark);
        strokeWeight(var_weight);
        beginShape(LINES);
        let _num = 250000;
        for (let i=0; i<_num; i++) {
          let _center = createVector(FS_rand(real(map(sin(map(i, 0, _num, 0, HALF_PI)), 0, 1, 200, 700)), real(700+10)), -real(99), 0);
          let _l = real(map(cos(map(_center.x, real(200), real(700), 0, HALF_PI)), 1, 0, 1, 100));
          _center = PRotateY(_center, FS_rand(0, TWO_PI)).add(0, 0, (gap_block+W_block)/2);
          vertex(_center.x-_l, _center.y, _center.z);
          vertex(_center.x+_l, _center.y, _center.z);          
          vertex(_center.x, _center.y, _center.z-_l);
          vertex(_center.x, _center.y, _center.z+_l);
        }
        endShape();



        pop();
      }
      block[time_draw-time_point[2]].display_cover_u();
      time_draw += 1;
    } else if (time_draw < time_point[4]) {
      for (let i=0; i<block.length; i++) {
        block[i].display_red();
      }
      time_draw += 1;
    }









    //push();
    //translate(real(50),real(100),real(250));
    //rotateY(HALF_PI*0.5);
    //rotateX(HALF_PI*0.33);
    //for (let i=0; i<block.length; i++) {
    //  block[i].display();
    //}
    //pop();
    //    push();
    //translate(real(250),real(50),real(50));
    //rotateY(HALF_PI*0.5);
    //rotateX(HALF_PI*0.33 - HALF_PI);
    //for (let i=0; i<block.length; i++) {
    //  block[i].display();
    //}
    //pop();

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ display ⬆-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  } else {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ displayInfo ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noFill();
    stroke(c_info);
    strokeWeight(var_weight);
    beginShape(LINES);

    endShape();






    PG.clear();
    displayInfo();
    image(PG, -width/2, -height/2, width, height);



    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }


  if (time_draw >= time_point[time_point.length-1]) {
    fxpreview();
    console.log("done");
    noLoop();
  }
}


























/*
function FS_drawLine(begin, end) {
 beginShape(LINES);
 let _count = 1;
 for (let i=0; i<p5.Vector.dist(end, begin); i+=real(1)) {
 _count += 1;
 }
 _count = max(_count, 2);
 let n = new Array(_count);
 for (let i=0; i<n.length; i++) {
 n[i] = p5.Vector.sub(end, begin).mult(map(i, 0, n.length-1, 0, 1)).add(begin);
 //n[i].add(p5.Vector.random3D().mult(real(1)).mult(0.25));
 //n[i].add(
 //  ((noise(ran*13+423+i*0.1)-0.5)*2)*real(0.5), 
 //  ((noise(ran*5+55+i*0.1)-0.5)*2)*real(0.5), 
 //  ((noise(ran*6+666+i*0.1)-0.5)*2)*real(0.5)
 //  );
 let x = n[i].x*0.1;
 let y = n[i].y*0.1;
 let z = n[i].z*0.1;
 n[i].add(
 ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
 ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
 ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
 );
 }
 for (let i=0; i<n.length-1; i++) {
 LINES_getLine(n[i], n[i+1]);
 }
 LINES_getLine(n[0], begin);
 LINES_getLine(n[n.length-1], end);
 endShape();
 }*/



function FS_drawLine(begin, end, _state_noise, _var_noise) {

  let _count = 1;
  for (let i=0; i<p5.Vector.dist(end, begin); i+=real(1)) {
    _count += 1;
  }
  _count = max(_count, 2);
  let n = new Array(_count);
  for (let i=0; i<n.length; i++) {
    n[i] = p5.Vector.sub(end, begin).mult(map(i, 0, n.length-1, 0, 1)).add(begin);
    let x = n[i].x*0.1;
    let y = n[i].y*0.1;
    let z = n[i].z*0.1;
    n[i].add(
      ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
      ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
      ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
      );
  }
  beginShape(LINES);
  for (let i=0; i<n.length-1; i++) {
    LINES_getLine(n[i], n[i+1]);
  }
  LINES_getLine(n[0], begin);
  LINES_getLine(n[n.length-1], end);
  endShape();

  if (_var_noise > 2) {
    n = new Array(_count);
    for (let i=0; i<n.length; i++) {
      n[i] = p5.Vector.sub(end, begin).mult(map(i, 0, n.length-1, 0, 1)).add(begin);
      let x = n[i].x*0.1;
      let y = n[i].y*0.1;
      let z = n[i].z*0.1;
      if (_state_noise == 0) {
        n[i].add(
          ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
          ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
          ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
          );
      } else if (_state_noise == 1) {
        let __var_noise = constrain(map(_var_noise, 2, 5, 1, 100), 1, 100);
        if (state_arrange == 2) {
          __var_noise = constrain(map(_var_noise, 2, 5, 1, 50), 1, 50);
        }
        n[i].add(
          ((noise(x, y, z)-0.5)*2)*real(0.5*__var_noise), 
          ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*__var_noise), 
          ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*__var_noise)
          );
      } else if (_state_noise == 2) {
        let __var_noise = constrain(map(_var_noise, 2, 5, 1, 200), 1, 200);
        n[i].add(
          ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
          ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
          max(((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*__var_noise), 0)
          );
      } else if (_state_noise == 3) {
        let __var_noise = constrain(map(_var_noise, 2, 5, 0, 50), 0, 50);
        let _v = 0.1;
        let _vv = 1.0;
        //if (state_WH == 0) {
        //  _v = 0.1;
        //  _vv = 1.125;
        //} else if (state_WH == 1) {
        //  _v = 0.1;
        //  _vv = 1.0;
        //}
        n[i].add(
          ((noise(z*_v)-0.5)*2)*real(__var_noise*_vv) + ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
          ((noise(y*_v)-0.5)*2)*real(__var_noise*_vv)*0 + ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
          ((noise(x*_v)-0.5)*2)*real(__var_noise*_vv) + ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
          );
      } else if (_state_noise == 4) {
        n[i].add(
          ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
          ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
          ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
          );
      }
    }
    push();
    strokeWeight(real(0.5));
    beginShape(LINES);
    for (let i=0; i<n.length-1; i++) {
      LINES_getLine(n[i], n[i+1]);
    }
    // LINES_getLine(n[0], begin);
    //LINES_getLine(n[n.length-1], end);

    if (_state_noise == 4) {
      let _n_add = new Array(round(constrain(map(_var_noise, 2, 5, 0, 6), 0, 6)));
      for (let i=0; i<_n_add.length; i++) {
        let v = map(_var_noise, 2, 5, 0, 15);
        _n_add[i] = createVector(real(FS_rand(-1, 1)*v), real(FS_rand(-1, 1)*v), real(FS_rand(-1, 1)*v));
      }
      for (let i=0; i<_n_add.length; i++) {
        for (let j=0; j<n.length-1; j++) {
          LINES_getLine(n[j].copy().add(_n_add[i]), n[j+1].copy().add(_n_add[i]));
        }
      }
    }
    endShape();
    pop();
  }
}


function FS_drawEllipse(n, _state_noise, _var_noise) {
  if (n==null || n.length<2) {
    return;
  }
  for (let i=0; i<n.length-1; i++) {
    FS_drawLine(n[i], n[i+1], _state_noise, _var_noise);
  }
  FS_drawLine(n[n.length-1], n[0], _state_noise, _var_noise);
}








function FS_drawShape(_n) {
  let _center = p5.Vector.add(_n[0], p5.Vector.add(_n[1], _n[2]).mult(0.5)).mult(0.5);
  if (_center > 3) {
    _center = p5.Vector.add(_n[0], _n[floor(_n.length/2)]).mult(0.5);
  }

  beginShape(TRIANGLES);
  for (let i=0; i<_n.length; i++) {
    let _count = 1;
    for (let j=0; j<p5.Vector.dist(_n[(i+1)%_n.length], _n[i]); j+=real(1)) {
      _count += 1;
    }
    _count = max(_count, 2);
    let n = new Array(_count);
    for (let j=0; j<n.length; j++) {
      n[j] = p5.Vector.sub(_n[(i+1)%_n.length], _n[i]).mult(map(j, 0, n.length-1, 0, 1)).add(_n[i]);
      let x = n[j].x*0.1;
      let y = n[j].y*0.1;
      let z = n[j].z*0.1;
      n[j].add(
        ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
        ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
        ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
        );
      // n[j] = p5.Vector.sub(_center, n[j]).setMag(real(0.4)).add(n[j]);
      //n[j].add(0,real(0.5),0);
      //vertex(n[j].x, n[j].y, n[j].z);
    }
    for (let j=0; j<n.length-1; j++) {
      vertex(_center.x, _center.y, _center.z);
      vertex(n[j].x, n[j].y, n[j].z);
      vertex(n[j+1].x, n[j+1].y, n[j+1].z);
    }
  }
  endShape();
}



function FS_drawShape_texture(_n, _uv, _img, _state) {
  let _center = p5.Vector.add(_n[0], p5.Vector.add(_n[1], _n[2]).mult(0.5)).mult(0.5);
  if (_center > 3) {
    _center = p5.Vector.add(_n[0], _n[floor(_n.length/2)]).mult(0.5);
  }

  let index_x_min = 0;
  let index_x_max = 0;
  let index_y_min = 0;
  let index_y_max = 0;
  let uv_x_min = 0;
  let uv_x_max = 1;
  let uv_y_min = 0;
  let uv_y_max = 1;
  if (_state == 0) {
    for (let i=0; i<_n.length; i++) {
      if (_n[i].x < _n[index_x_min].x) {
        index_x_min = i;
      }
      if (_n[i].x > _n[index_x_max].x) {
        index_x_max = i;
      }
      if (_n[i].y < _n[index_y_min].y) {
        index_y_min = i;
      }
      if (_n[i].y > _n[index_y_max].y) {
        index_y_max = i;
      }
    }
  } else if (_state == 1) {
    for (let i=0; i<_n.length; i++) {
      if (_n[i].z < _n[index_x_min].z) {
        index_x_min = i;
      }
      if (_n[i].z > _n[index_x_max].z) {
        index_x_max = i;
      }
      if (_n[i].y < _n[index_y_min].y) {
        index_y_min = i;
      }
      if (_n[i].y > _n[index_y_max].y) {
        index_y_max = i;
      }
    }
  } else if (_state == 2) {
    for (let i=0; i<_n.length; i++) {
      if (_n[i].x < _n[index_x_min].x) {
        index_x_min = i;
      }
      if (_n[i].x > _n[index_x_max].x) {
        index_x_max = i;
      }
      if (_n[i].z < _n[index_y_min].z) {
        index_y_min = i;
      }
      if (_n[i].z > _n[index_y_max].z) {
        index_y_max = i;
      }
    }
  }
  uv_x_min = _uv[index_x_min].x;
  uv_x_max = _uv[index_x_max].x;
  uv_y_min = _uv[index_y_min].y;
  uv_y_max = _uv[index_y_max].y;




  beginShape(TRIANGLES);
  texture(_img);
  for (let i=0; i<_n.length; i++) {
    let _count = 1;
    for (let j=0; j<p5.Vector.dist(_n[(i+1)%_n.length], _n[i]); j+=real(1)) {
      _count += 1;
    }
    _count = max(_count, 2);
    let n = new Array(_count);
    for (let j=0; j<n.length; j++) {
      n[j] = p5.Vector.sub(_n[(i+1)%_n.length], _n[i]).mult(map(j, 0, n.length-1, 0, 1)).add(_n[i]);
      let x = n[j].x*0.1;
      let y = n[j].y*0.1;
      let z = n[j].z*0.1;
      n[j].add(
        ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
        ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
        ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
        );
      // n[j] = p5.Vector.sub(_center, n[j]).setMag(real(0.4)).add(n[j]);
      //n[j].add(0,real(0.5),0);
      //vertex(n[j].x, n[j].y, n[j].z);
    }
    for (let j=0; j<n.length-1; j++) {
      if (_state == 0) {
        vertex(_center.x, _center.y, _center.z, map(_center.x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(_center.y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
        vertex(n[j].x, n[j].y, n[j].z, map(n[j].x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(n[j].y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
        vertex(n[j+1].x, n[j+1].y, n[j+1].z, map(n[j+1].x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(n[j+1].y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
      } else if (_state == 1) {
        vertex(_center.x, _center.y, _center.z, map(_center.z, _n[index_x_min].z, _n[index_x_max].z, uv_x_min, uv_x_max), map(_center.y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
        vertex(n[j].x, n[j].y, n[j].z, map(n[j].z, _n[index_x_min].z, _n[index_x_max].z, uv_x_min, uv_x_max), map(n[j].y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
        vertex(n[j+1].x, n[j+1].y, n[j+1].z, map(n[j+1].z, _n[index_x_min].z, _n[index_x_max].z, uv_x_min, uv_x_max), map(n[j+1].y, _n[index_y_min].y, _n[index_y_max].y, uv_y_min, uv_y_max));
      } else if (_state == 2) {
        vertex(_center.x, _center.y, _center.z, map(_center.x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(_center.z, _n[index_y_min].z, _n[index_y_max].z, uv_y_min, uv_y_max));
        vertex(n[j].x, n[j].y, n[j].z, map(n[j].x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(n[j].z, _n[index_y_min].z, _n[index_y_max].z, uv_y_min, uv_y_max));
        vertex(n[j+1].x, n[j+1].y, n[j+1].z, map(n[j+1].x, _n[index_x_min].x, _n[index_x_max].x, uv_x_min, uv_x_max), map(n[j+1].z, _n[index_y_min].z, _n[index_y_max].z, uv_y_min, uv_y_max));
      }
    }
  }
  endShape();
  fill(255);
}






function FS_drawShape_texture_range(_n, _uv, _range, _img) {
  let _center = p5.Vector.add(_n[0], p5.Vector.add(_n[1], _n[2]).mult(0.5)).mult(0.5);
  if (_center > 3) {
    _center = p5.Vector.add(_n[0], _n[floor(_n.length/2)]).mult(0.5);
  }

  beginShape(TRIANGLES);
  texture(_img);
  for (let i=0; i<_n.length; i++) {
    let _count = 1;
    for (let j=0; j<p5.Vector.dist(_n[(i+1)%_n.length], _n[i]); j+=real(1)) {
      _count += 1;
    }
    _count = max(_count, 2);
    let n = new Array(_count);
    for (let j=0; j<n.length; j++) {
      n[j] = p5.Vector.sub(_n[(i+1)%_n.length], _n[i]).mult(map(j, 0, n.length-1, 0, 1)).add(_n[i]);
      let x = n[j].x*0.1;
      let y = n[j].y*0.1;
      let z = n[j].z*0.1;
      n[j].add(
        ((noise(x, y, z)-0.5)*2)*real(0.5*1), 
        ((noise(x+real(500), y+real(500), z+real(500))-0.5)*2)*real(0.5*1), 
        ((noise(x-real(500), y-real(500), z-real(500))-0.5)*2)*real(0.5*1)
        );
      // n[j] = p5.Vector.sub(_center, n[j]).setMag(real(0.4)).add(n[j]);
      //n[j].add(0,real(0.5),0);
      //vertex(n[j].x, n[j].y, n[j].z);
    }
    for (let j=0; j<n.length-1; j++) {
      vertex(_center.x, _center.y, _center.z, map(screenPosition(_center).x, _range[0], _range[1], _range[2], _range[3]), map(screenPosition(_center).y, _range[4], _range[5], _range[6], _range[7]));
      vertex(n[j].x, n[j].y, n[j].z, map(screenPosition(n[j]).x, _range[0], _range[1], _range[2], _range[3]), map(screenPosition(n[j]).y, _range[4], _range[5], _range[6], _range[7]));
      vertex(n[j+1].x, n[j+1].y, n[j+1].z, map(screenPosition(n[j+1]).x, _range[0], _range[1], _range[2], _range[3]), map(screenPosition(n[j+1]).y, _range[4], _range[5], _range[6], _range[7]));
    }
  }
  endShape();
  fill(255);
}



function windowResized() {
  //location.reload();
}

//@funnysandwich
