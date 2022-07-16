/*
 --------------
 test01:
 
 做一个穿梭小房子的森林
 
 
 
 --------------
 test02:
 
 加入 akaswap api
 
 
 
 */


let canvas, PG;
let scaleRate;


let skyline, endLine;
let speed, Y_shake;
let gap_block;
let W_road;
let num_hor;



let viewer;
let viewer_count_house;
let count_load, all_load;
let ready_set_rate = true;



let rate_empty;
let rate_tree;
let rate_house;
let rate_houseConstr;
let rate_fence;
let rate_hole;
let rate_leaves;




let blocks = [];




let c_far, c_near, c_info, c_infoRed;

let open_info = false;
let is_phone = false;





function preload() {
}





function setup() {
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  //canvas = createCanvas(windowWidth, windowHeight);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  background(255);

  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);
  textureMode(NORMAL);
  frameRate(30);



  viewer_count_house = 0;
  viewer = new URLSearchParams(window.location.search).get('viewer');
  viewer = 'tz1cbhmVZuFTKHcACSFpg5ER1bGVGkanhrbW';

  let id_token = [
    '2465', 
    '2285', 
    '2284', 
    '1856', 
    '1807', 
    '1588', 
    '1587', 
    '1579', 
    '1578', 
    '1559', 
    '1558', 
    '1519', 
    '1512', 
    '1509', 
    '1503', 
    '1493', 
    '1492', 
    '1459', 
    '1458', 
    '1457', 
    '1456', 
    '1455', 
    '1454', 
    '986', 
    '984', 
    '801', 
    '663', 
    '514', 
    '485', 
    '414', 
    '406', 
    '403', 
    '402', 
    '400', 
    '398', 
    '397'
  ];

  count_load = 0;
  all_load = id_token.length;

  for (let i=0; i<all_load; i++) {
    let url = 'https://api.akaswap.com/v2/fa2tokens/KT1AFq5XorPduoYyWxs5gEyrFK6fVjJVbtCj/'+id_token[i];
    loadJSON(url, loadingJSON);
  }






  speed = real(10);
  Y_shake = 0;
  gap_block = real(20);
  W_road = real(200);
  skyline = createVector(0, real(300), -real(3500));
  endLine = real(500);
  num_hor = 3*2;



  c_far = color(255);
  c_near = color(0);
  c_info = color(200);
  c_infoRed = lerpColor(c_far, color(255, 0, 0), 0.25);





  rate_empty = 0.1;
  rate_tree = 1;
  rate_house = 0;
  rate_houseConstr = 0.1;
  rate_fence = 0.1;
  rate_hole = 0.05;

  rate_leaves = 0.1;







  for (let i=0; i<num_hor; i++) {
    let w = real(750);
    let d = w;
    let x = 0;
    if (i < floor(num_hor/2)) {
      x = -(w * (floor(num_hor/2)-i)  +  gap_block*(floor(num_hor/2)-i));
      x -= W_road / 2.0;
    } else {
      x = w * (i-floor(num_hor/2))  +  gap_block*(i-floor(num_hor/2)+1);
      x += W_road / 2.0;
    }
    blocks.push(new Block(createVector(x, skyline.y, skyline.z - d), w, d, i));
  }
}














function draw() {
  background(c_far);



  viewer_count_house = 5;
  if (count_load == all_load  &&  ready_set_rate) {
    print(viewer_count_house);

    if (viewer_count_house < 6) {
      rate_house = map(viewer_count_house, 0, 6, 0, 1);
    } else {
      rate_house = min(map(viewer_count_house, 6, 30, 1, 3), 3.5);
    }

    ready_set_rate = false;
  }



  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ push Block ⬇----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------

  if (blocks.length > 0) {
    if (blocks[blocks.length-1].begin.z > skyline.z+gap_block) {
      let d = real(random(350, 750));
      let w = real(random(350, 750));
      for (let i=0; i<num_hor; i++) {
        let x = 0;
        if (i < floor(num_hor/2)) {
          x = -(w * (floor(num_hor/2)-i)  +  gap_block*(floor(num_hor/2)-i));
          x -= W_road / 2.0;
        } else {
          x = w * (i-floor(num_hor/2))  +  gap_block*(i-floor(num_hor/2)+1);
          x += W_road / 2.0;
        }

        blocks.push(new Block(createVector(x, skyline.y, skyline.z - d), w, d, i));
      }




      if (blocks.length >= 6) {
        for (let i=blocks.length-6; i<blocks.length; i++) {
          if (blocks[i].is_house                        &&
            blocks[i].index_x != 0                      &&
            blocks[i].index_x != 4                      &&
            blocks[i].index_x != 5                      &&
            blocks[i+1].is_house                        &&
            blocks[i].house.show_win_side.length > 1    &&
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
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ push Block ⬆----------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------









  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬇ update ⬇--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  Y_shake = map(sin(frameCount*0.5 * map(speed, 0, real(20), 0, 1)), -1, 1, -real(4), real(4));




  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {
      if (blocks[i].dead) {
        blocks.splice(i, 1);
      }
    }
  }
  if (blocks.length > 0) {
    for (let i=0; i<blocks.length; i++) {
      blocks[i].update();
    }
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------
  //------------------------------⬆ update ⬆--------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------------------------------------------






  if (!open_info) {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noStroke();
    beginShape(TRIANGLES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].display();

        if (blocks[i].is_house           &&  
          blocks[i].house.have_rope      &&  
          i < blocks.length-2            &&
          !blocks[i].dead                &&
          !blocks[i+1].dead
          ) {
          let node_rope = new Array(5);
          node_rope[0] = p5.Vector.add(blocks[i].house.node_win_side[blocks[i].house.index_rope_i][blocks[i].house.index_rope_j][2], blocks[i].house.node_win_side[blocks[i].house.index_rope_i][blocks[i].house.index_rope_j][3]).mult(0.5);
          node_rope[4] = p5.Vector.add(blocks[i+1].house.node_win_side[blocks[i].house.index_ropeOther_i][blocks[i].house.index_ropeOther_j][2], blocks[i+1].house.node_win_side[blocks[i].house.index_ropeOther_i][blocks[i].house.index_ropeOther_j][3]).mult(0.5);
          for (let j=1; j<4; j++) {
            node_rope[j] = p5.Vector.sub(node_rope[4], node_rope[0]).mult(map(j, 0, 4, 0, 1)).add(node_rope[0]);
            node_rope[j].y += sin(map(j, 0, 4, 0, PI))*real(50);
          }
          for (let j=0; j<4; j++) {
            const c1 = realColor(node_rope[j]);
            const c2 = realColor(node_rope[j+1]);
            const c3 = realColor(node_rope[j+1].copy().add(0, -real(2), 0));
            const c4 = realColor(node_rope[j].copy().add(0, -real(2), 0));
            TRIANGLES_getRect_fill4(node_rope[j], node_rope[j+1], node_rope[j+1].copy().add(0, -real(4), 0), node_rope[j].copy().add(0, -real(4), 0), c1, c2, c3, c4);
          }
        }
      }
    }
    endShape();
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ display ⬆-------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  } else {
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ displayInfo ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------

    noFill();



    stroke(c_info);
    strokeWeight(real(2));
    beginShape(LINES);
    LINES_getLine(skyline.copy().add(-real(2000), Y_shake, 0), skyline.copy().add(real(2000), Y_shake, 0));
    LINES_getLine(skyline.copy().add(-W_road/2.0, Y_shake, 0), skyline.copy().add(-W_road/2.0, Y_shake, -skyline.z));
    LINES_getLine(skyline.copy().add(W_road/2.0, Y_shake, 0), skyline.copy().add(W_road/2.0, Y_shake, -skyline.z));


    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].displayInfo();
      }
    }
    endShape();





    stroke(c_infoRed);
    strokeWeight(real(2));
    beginShape(LINES);
    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].displayInfo_red();
      }
    }
    endShape();


    if (open_info) {
      PG.clear();
      // PG.background(255, 0);
      displayInfo();
      image(PG, -width/2, -height/2, width, height);
    }


    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
  }
}








function windowResized() {
  location.reload();
}


function realColor(n) {
  return lerpColor(c_far, c_near, constrain(map(sin(map(n.z, skyline.z, endLine, HALF_PI, PI)), 1, 0, 0, 1), 0, 1));
}



function loadingJSON(d) {
  const num = d.owners[viewer];
  if (num == null) {
  } else {
    viewer_count_house += num;
  }
  count_load += 1;
}

//@funnysandwich
