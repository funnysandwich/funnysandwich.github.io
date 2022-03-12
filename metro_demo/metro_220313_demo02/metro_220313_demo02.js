/*
 ---------
 test01
 
 初次挑战fxhash，尝试把一直想做的捷运窗外风景做出来
 
 
 ---------
 test02
 
 增加房子节点，把房子变成扭曲的
 
 
 
 */




let canvas, PG;
let scaleRate;
let roY, roX;
let cameraY;


let skyline;
let beginLine, endLine;

let c_far, c_near, c_sky, c_sky_near, c_win, c_winFrame;
let c_info1, c_info2, c_infoRed, c_infoGreen, c_infoGreen2, c_infoYellow;


let blocks = [];
let count_blocks;
let gap_block;
let w_next_block;
let speed, mileage;
let udgStation;
let Y_shake;




let roadVer = [];
let roadHor = [];




let open_info = false;
let open_follow = false;
let open_stop = false, open_sprint = false, open_jump = false;
let is_onTheGround = false;



let str_info = [];



let open_crucifix, rate_crucifix;
let open_roof, rate_roof;
let open_handrail, rate_handrail;
let open_ladder, rate_ladder;
let open_billboard, rate_billboard, open_billboardRoof, rate_billboardRoof;

let open_billMc, rate_billMc;
let open_paifang, rate_paifang;

let rate_normalHouse;
let open_constrHouse, rate_constrHouse, open_catHouse, rate_catHouse;
let open_CTowerHouse, rate_CTowerHouse;
let open_firewatchHouse, rate_firewatchHouse;
let open_blockHouse, rate_blockHouse;
let open_fair, rate_fair;
let open_tree, rate_tree;

let open_river, rate_river;
let open_nightMarket, rate_nightMarket, isNightMarket_next=false;
let open_mountain;
let open_sea;
let open_lightRail;




let open_rain;
let open_waterDrop;
let open_fog;
let open_flood;
let open_desert;
let open_TVScreen;








let state_click;
let state_floor;
let stateVar_floor = [];
let H_floor;




const WH_winFrame = [
  [225, 125, 50, 1, 0, 0], 
  [125, 180, 50, 1, 0, 0], 
  [150, 150, 150, 1, 0, 0], 
  [150, 150, 50, 1, 0, 0], 
  [125, 170, 125, 1, 0, 0], 
  [225, 75, 75, 1, 0, 0], 
  [95, 150, 50, 2, 0, 30], 
  [45, 135, 20, 3, 0, 20], 
  [160, 120, 4, 1, 1, 0]
];
let state_winFrame;




let state_winDecoration;







let state_color;
const c_all = [
  ["#cdccd3", "#0d0b16"], 
  ["#b0ab8f", "#100c08"], 
  ["#505050", "#000000"], 
  ["#cfc7bd", "#45403c", "#211f1e"], 
  ["#e6e5d0", "#141a1d"], 
  ["#86ad9b", "#1a2f30", "#181e1f"], 
  ["#a6cbd9", "#92a79e", "#181e1f"], 
  //["#b8613c", "#835e4c", "#1a1006"], 
  ["#d9bf9c", "#e39239", "#431d01", "#0f0b0c"], 
  ["#9fb6bc", "#fffbd4", "#3a4f4f", "#181e1f"], 
  ["#f3c79b", "#c08ca3", "#1d0f11", "#1a1617"], 
  ["#a8a390", "#723d31", "#380303", "#09040c"]

];
const state_c_all = [
  [0, 1, 1, 0, 0], 
  [0, 1, 1, 0, 0], 
  [0, 1, 1, 0, 0], 
  [0, 1, 2, 0, 0], 
  [0, 1, 1, 0, 0], 
  [0, 1, 2, 0, 0], 
  [1, 2, 2, 1, 0], 
  //[1, 2, 2, 1, 0], 
  [1, 2, 3, 1, 0], 
  [1, 2, 3, 1, 0], 
  [1, 2, 3, 1, 0], 
  [1, 2, 3, 1, 0]
];







let have_button_stop, have_button_sprint, have_button_jump;




//------- loadSongs -------
let songs = [];
let count_songs = 0;
let totalSongs = 3;
let is_song_load_done = false;
let open_play = false;

let var_loading = 0.0;



function loadingSound(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print( filename);
    songs.push(sound);
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}





function setup() {
  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);

  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);
  //strokeJoin(ROUND);
  //strokeCap(ROUND);
  textureMode(NORMAL);
  frameRate(30);



  state_color = 9;





  //------- loadSongs -------
  loadingSound("https://funnysandwich.github.io/metro_demo/audio/train_rain.wav");
  loadingSound("https://funnysandwich.github.io/metro_demo/audio/train_90.wav");
  loadingSound("https://funnysandwich.github.io/metro_demo/audio/train_alone.wav");






  roY = 0;
  roX = 0;
  cameraY = -real(800);
  speed = 0;//real(20);
  mileage = 0;
  Y_shake = 0;
  beginLine = -real(3500);
  endLine = real(2350);
  gap_block = real(150);
  w_next_block = real(100)*5;
  isRiver_next = false;
  skyline = createVector(0, real(300), -(real(100)*5*6+gap_block*5));

  c_far = color(c_all[state_color][state_c_all[state_color][0]]);
  c_near = color(c_all[state_color][state_c_all[state_color][1]]);
  c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
  c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
  c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
  c_win = c_far;

  c_info1 = lerpColor(c_far, c_winFrame, 0.627);
  c_info2 = lerpColor(c_far, c_near, 0.35);
  c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
  c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
  c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
  c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);


  document.bgColor = c_all[state_color][state_c_all[state_color][2]];









  state_winFrame = 0; //floor(random(0, WH_winFrame.length));
  state_winDecoration = 4; //0:无 1:潜水艇 2:遮光板 3:卷帘窗 4:窗帘
  state_click = 0; //0:再生 1:闪 2:下降 3:弹簧 4:鼓球


  if (state_click == 1) {
    this.c_near_copy = c_near;
    this.open_light = false;
    this.time_light = 20;
  } else if (state_click == 2) {
    this.open_shake = false;
    this.time_shake = 0;
    this.time_max_shake = floor(random(10, 20));
  }



  if (state_winDecoration == 2) {
    this.open_follow_shade_hand = new Array(WH_winFrame[state_winFrame][3]);
    this.center_shade_hand_Y = new Array(WH_winFrame[state_winFrame][3]);
    for (let i=0; i<center_shade_hand_Y.length; i++) {
      open_follow_shade_hand[i] = false;
      center_shade_hand_Y[i] = createVector(0, 0, real(200));
    }
  } else if (state_winDecoration == 3) {
    const num = 7;
    this.H_rollUpWin = 0;
    this.open_shade = false;
    this.center_rollUpWin = new Array(num);
    this.node_rollUpWin = Array.from(Array(num), () => new Array(4));
    for (let i=0; i<node_rollUpWin.length; i++) {
      center_rollUpWin[i] = createVector(0, -real(100), real(200));
      for (let j=0; j<node_rollUpWin[i].length; j++) {
        node_rollUpWin[i][j] = createVector(0, -real(100), real(200));
      }
    }
  } else if (state_winDecoration == 4) {
    this.node_curtain = Array.from(Array(2), () => new Array(20));
    for (let i=0; i<2; i++) {
      for (let j=0; j<node_curtain[i].length; j++) {
        node_curtain[i][j] = createVector(-real(100), -real(100), real(200));
      }
    }
    this.open_curtain = false;
  }







  stateVar_floor.push([0.4, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8]); //0:正常
  stateVar_floor.push([0.4, 2, 2, 1.5, 2, 3, 4, 6, 7, 8, 11, 14, 16]); //1:前面贫民 后面高楼
  stateVar_floor.push([0.8, 5, 7, 5, 8, 2, 4, 2, 3, 2, 2, 1, 2]); //2:前面高楼 后面贫民
  stateVar_floor.push([0.5, 3, 4, 4, 5, 5, 6, 5, 7, 7, 8, 8, 9]); //3:森林
  stateVar_floor.push([0.5, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2]); //4:贫民

  state_floor = 1;









  H_floor = real(75);
  if (state_floor == 2) {
    if (state_click == 4) {
      state_click = 0;
    }
  } else if (state_floor == 3) {
    H_floor = real(200);
  } else if (state_floor == 4) {
    if (state_click == 4) {
      state_click = 0;
    }
  }





  have_button_stop = true;
  if (have_button_stop) {
    this.time_stop = 0;
  }


  have_button_sprint = true;
  if (have_button_sprint) {
    this.time_sprint = 0;
  }

  have_button_jump = true;
  if (have_button_jump) {
    this.time_jump = 0;
  }










  rate_crucifix = max(floor(random(-5, 3.5))/10, 0);
  if (rate_crucifix == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_crucifix = 0;
    open_crucifix = false;
  } else {
    open_crucifix = true;
  }

  rate_roof = max(floor(random(-2, 9))/10, 0);
  if (rate_roof == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_roof = 0;
    open_roof = false;
  } else {
    open_roof = true;
  }

  rate_handrail = max(floor(random(-2, 7.5))/10, 0);
  if (rate_handrail == 0 ) {
    rate_handrail = 0;
    open_handrail = false;
  } else {
    open_handrail = true;
  }

  rate_billboard = max(floor(random(-2, 8.5))/10, 0);
  if (rate_billboard == 0) {
    rate_billboard = 0;
    open_billboard = false;
  } else {
    open_billboard = true;
  }


  rate_billboardRoof = max(floor(random(-2, 8.5))/10, 0);
  if (rate_billboardRoof == 0  ||  (state_floor == 3 && state_click != 2)) {
    rate_billboardRoof = 0;
    open_billboardRoof = false;
  } else {
    open_billboardRoof = true;
  }




  this.BILL = new Array(5);
  for (let i=0; i<BILL.length; i++) {
    BILL[i] = createGraphics(floor(random(25, 100)), 25);
    BILL[i].background(addAlphaToColor(c_far, 160));
    BILL[i].noStroke();
    BILL[i].fill(addAlphaToColor(c_far, 60));
    for (let j=0; j<floor(random(6, 20)); j++) {
      let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
      let x = random(0, BILL[i].width-w);
      BILL[i].rect(x, 0, w, BILL[i].height);
    }
  }
  if (state_click == 1) {
    this.open_random_billboard = false;
    this.time_billboard = 0;
  }



  rate_billMc = max(floor(random(-7, 9))/10, 0);
  rate_billMc = 0;
  if (rate_billMc == 0) {
    rate_billMc = 0;
    open_billMc = false;
  } else {
    rate_billMc = max(rate_billMc, 0.5);
    open_billMc = true;
  }



  rate_paifang = max(floor(random(-7, 9))/10, 0);
  rate_paifang = 1;
  if (rate_paifang == 0) {
    rate_paifang = 0;
    open_paifang = false;
  } else {
    rate_paifang = max(rate_paifang, 0.5);
    open_paifang = true;
  }






  rate_normalHouse = max(floor(random(-10, 6))/100, 0);
  rate_normalHouse = 0.5;





  rate_constrHouse = max(floor(random(-10, 6))/100, 0);
  rate_constrHouse = 0.5;
  if (rate_constrHouse == 0) {
    rate_constrHouse = 0;
    open_constrHouse = false;
  } else {
    open_constrHouse = true;

    this.open_crane = false;
    this.rate_crane = max(floor(random(0, 2))/10, 0);
    if (rate_crane == 0) {
      open_crane = false;
    } else {
      rate_crane = 0.5;
      open_crane = true;
    }
  }


  rate_catHouse = max(floor(random(-10, 6))/100, 0);
  rate_catHouse = 0.5;
  if (rate_catHouse == 0) {
    rate_catHouse = 0;
    open_catHouse = false;
  } else {
    open_catHouse = true;
  }


  rate_CTowerHouse = max(floor(random(-10, 6))/100, 0);
  rate_CTowerHouse = 0.5;
  if (rate_CTowerHouse == 0) {
    rate_CTowerHouse = 0;
    open_CTowerHouse = false;
  } else {
    open_CTowerHouse = true;

    this.rate_CWall = max(floor(random(-7, 9))/10, 0);
    this.rate_CWall = 1;
    this.open_CWall = false;
    if (rate_CWall == 0) {
      open_CWall = false;
    } else {
      open_CWall = true;
      rate_CWall = max(0.5, rate_CWall);
    }

    this.rate_CTRoof = max(floor(random(-2, 6))/10, 0);
    this.open_CTRoof = false;
    if (rate_CTRoof == 0) {
      open_CTRoof = false;
    } else {
      open_CTRoof = true;
    }
  }


  rate_firewatchHouse = max(floor(random(-10, 6))/100, 0);
  rate_firewatchHouse = 0.5;
  if (rate_firewatchHouse == 0) {
    rate_firewatchHouse = 0;
    open_firewatchHouse = false;
  } else {
    open_firewatchHouse = true;
  }




  rate_blockHouse = max(floor(random(-10, 6))/100, 0);
  rate_blockHouse = 0.5;
  if (rate_blockHouse == 0) {
    rate_blockHouse = 0;
    open_blockHouse = false;
  } else {
    open_blockHouse = true;
  }




  rate_fair = max(floor(random(-10, 6))/100, 0);
  rate_fair = 0.05;
  if (rate_fair == 0) {
    rate_fair = 0;
    open_fair = false;
  } else {
    open_fair = true;
  }


  rate_tree = max(floor(random(-10, 6))/100, 0);
  rate_tree = 0.05;
  if (rate_tree == 0) {
    rate_tree = 0;
    open_tree = false;
  } else {
    open_tree = true;

    this.rate_foliage = 0.5;
    this.open_foliage = false;
    if (rate_foliage > 0) {
      open_foliage = true;
    }
  }



  rate_ladder = max(floor(random(-8, 9))/10, 0);
  //rate_ladder = 1;
  if (rate_ladder == 0) {
    rate_ladder = 0;
    open_ladder = false;
  } else {
    rate_ladder = max(rate_ladder, 0.5);
    open_ladder = true;
    if (state_floor == 3) {
      this.floor_min_ladder = 2;
      this.floor_max_ladder = 3;
      this.floor_sub_ladder = 1;
    } else {
      this.floor_min_ladder = 4;
      if (open_firewatchHouse) {
        this.floor_min_ladder = 2;
      }
      this.floor_max_ladder = 12;
      this.floor_sub_ladder = 2;
    }
  }



  rate_river = max(floor(random(-4, 5))/10, 0);
  if (rate_river == 0) {
    rate_river = 0;
    open_river = false;
  } else {
    open_river = true;
    this.isRiver_next = false;

    this.open_bridge = false;
    this.rate_bridge = max(floor(random(5, 20))/100, 0);
    if (rate_bridge == 0) {
      open_bridge = false;
    } else {
      open_bridge = true;
    }

    this.open_PTTower = false;
    this.rate_PTTower = max(floor(random(5, 10))/10, 0);
    if (rate_PTTower == 0) {
      open_PTTower = false;
    } else {
      this.rate_PTTower = max(this.rate_PTTower, 0.5);
      open_PTTower = true;
    }
  }



  rate_nightMarket = max(floor(random(-4, 3))/10, 0);
  if (rate_nightMarket == 0) {
    rate_nightMarket = 0;
    open_nightMarket = false;
    isNightMarket_next = false;
  } else {
    open_nightMarket = true;
    isNightMarket_next = false;
  }





  open_mountain = false;
  if (open_mountain) {
    this.mountain = new Mountain();
  }



  open_sea = false;
  if (open_sea) {
    const num_sea = 4;//floor(random(1, 4));
    this.index_sea = [5];
    for (let i=1; i<num_sea; i++) {
      index_sea.push(5-i);

      this.rate_skerry =  max(floor(random(1, 6))/10, 0);
      this.open_skerry = false;
      if (rate_skerry == 0) {
        open_skerry = false;
      } else {
        rate_skerry =  max(rate_skerry, 0.2);
        open_skerry = true;
      }
    }
  }




  open_lightRail = random(1) < 0;//0.15;
  if (open_lightRail) {
    this.num_rail = 1;//max(floor(random(0, 7)), 1);
    this.H_pier_target = new Array(6);
    this.H_pier = new Array(6);
    this.lightRails = new Array(num_rail);

    for (let i=0; i<6; i++) {
      H_pier_target[i] = real(75) * 2;//floor(random(2, 4));
      H_pier[i] = H_pier_target[i];
    }

    let b = [0, 1, 2, 3, 4, 5];
    for (let i=0; i<num_rail; i++) {
      const index_z = floor(random(0, b.length));

      lightRails[i] = new LightRail(b[index_z]);

      b.splice(index_z, 1);
    }
  }



  open_rain = true;
  if (open_rain) {
    this.rainyday = [];
    rainyday.push(new Rain(beginLine, endLine, skyline.z, 0));
  }


  open_waterDrop = true;
  if (open_waterDrop) {
    this.waterDrop = []; 
    for (let i=0; i<10; i++) {
      waterDrop.push(new WaterDrop());
    }
  }


  open_fog = false;
  if (open_fog) {
    this.FOG = createImage(100, 100);


    FOG.loadPixels();
    for (let i = 0; i < FOG.width; i++) {
      for (let j = 0; j < FOG.height; j++) {
        FOG.set(i, j, addAlphaToColor(c_sky, 0));
      }
    }
    FOG.updatePixels();
  }




  open_flood = false;
  if (open_flood) {
    this.FLOOD = createImage(100, 100);

    FLOOD.loadPixels();
    for (let i = 0; i < FLOOD.width; i++) {
      for (let j = 0; j < FLOOD.height; j++) {
        const t = map(j, 0, FLOOD.height, 0, 0.85);
        const c = lerpColor(c_sky, c_near, t);
        FLOOD.set(i, j, addAlphaToColor(c, 210));
      }
    }
    FLOOD.updatePixels();
  }



  open_desert = false;
  if (open_desert) {
    const num_ver_desert = 5;
    const num_hor_desert = 9;
    this.count_desert_ver = 0;
    this.node_desert = Array.from(Array(num_hor_desert), () => new Array(num_ver_desert));
    for (let i=0; i<node_desert.length; i++) {
      for (let j=0; j<node_desert[i].length; j++) {
        let x = map(i, 0, node_desert.length, endLine+real(1000), beginLine);
        let z = map(j, 0, node_desert[i].length-1, skyline.z, 0);
        let y = skyline.y - real(75) + map(noise(i*2, j*2), 0, 1, real(200), -real(200));
        y = min(y, skyline.y-real(2));
        if (j == node_desert[0].length-1) {
          y = skyline.y;
        }
        node_desert[i][j] = createVector(x, y, z);
      }
      count_desert_ver += 1;
    }
  }



  open_TVScreen = false;
  if (state_winFrame == 8) {
    open_TVScreen = true;
  } else {
    open_TVScreen = false;
  }

  if (open_TVScreen) {
    this.open_TVSnow = false;

    this.TVSCREEN = createImage(50, 50);
    TVSCREEN.loadPixels();
    for (let i = 0; i < TVSCREEN.width; i++) {
      for (let j = 0; j < TVSCREEN.height; j++) {
        const t = random(0, 1);
        const c = lerpColor(c_sky, c_near, t);
        TVSCREEN.set(i, j, addAlphaToColor(c, 128));
      }
    }
    TVSCREEN.updatePixels();
  }
















  udgStation = new UdgStation();



  count_blocks = 0;
  for (let i=0; i<6; i++) {
    let is_mountain = false;
    if (open_mountain) {
      if (i == 5  ||  i == 4  ||  i == 3) {
        is_mountain = true;
      }
    }
    let is_sea = false;
    if (open_sea) {
      for (let j=0; j<index_sea.length; j++) {
        if (i == index_sea[j]) {
          is_sea = true;
          break;
        }
      }
    }
    let is_rail = false;
    if (open_lightRail) {
      for (let j=0; j<num_rail; j++) {
        if (i == lightRails[j].index_z) {
          is_rail = true;
          break;
        }
      }
    }
    let is_house = true;
    if (isRiver_next  ||  is_mountain  ||  is_sea  ||  is_rail  ||  isNightMarket_next) {
      is_house = false;
    }
    let d = real(100)*5;
    let z = map(i, 0, 6-1, -d, -d*6) - gap_block*i;
    blocks.push(new Block(createVector(beginLine, skyline.y, z), real(100)*5, real(100)*5, i, blocks.length, is_house, false, is_mountain, is_sea, is_rail, isNightMarket_next));
    count_blocks += 1;
    if (i<5) {
      roadHor.push(new RoadHor(createVector(skyline.x, skyline.y, z), abs(beginLine - endLine), gap_block));
    }
  }
  roadVer.push(new RoadVer(createVector(beginLine-speed*0, skyline.y, 0), gap_block, -skyline.z, 0));




  str_info.push("ColorMode: "+state_color);
  str_info.push("Speed: "+speed);
  str_info.push("Mileage: "+mileage);

  if (state_click == 0) {
    str_info.push("ClickMode: REGENERATE");
  } else if (state_click == 1) {
    str_info.push("ClickMode: SHINE");
  } else if (state_click == 2) {
    str_info.push("ClickMode: SUBMERGE");
  } else if (state_click == 3) {
    str_info.push("ClickMode: SPRING");
  } else if (state_click == 4) {
    str_info.push("ClickMode: BULGE");
  }

  if (state_floor == 0) {
    str_info.push("FloorMode: NORMAL");
  } else if (state_floor == 1) {
    str_info.push("FloorMode: STAIR");
  } else if (state_floor == 2) {
    str_info.push("FloorMode: EMBANKMENT");
  } else if (state_floor == 3) {
    str_info.push("FloorMode: FOREST");
  } else if (state_floor == 4) {
    str_info.push("FloorMode: SUGARCUBE");
  }

  str_info.push("HouseFeature: ");
  if (open_crucifix) {
    str_info.push("  Crucifix  (prob. "+nfc(rate_crucifix*100, 0)+"%)");
  }
  if (open_roof) {
    str_info.push("  Overbuild  (prob. "+nfc(rate_roof*100, 0)+"%)");
  }
  if (open_handrail) {
    str_info.push("  Handrail  (prob. "+nfc(rate_handrail*100, 0)+"%)");
  }
  if (open_billboard) {
    str_info.push("  Billboard  (prob. "+nfc(rate_billboard*100, 0)+"%)");
  }
  if (open_billboardRoof) {
    str_info.push("  Billboard_Roof  (prob. "+nfc(rate_billboardRoof*100, 0)+"%)");
  }
  if (open_ladder) {
    str_info.push("  Ladder  (prob. "+nfc(rate_ladder*100, 0)+"%)");
  }

  if (open_constrHouse) {
    str_info.push("ConstructionHouse  (prob. "+nfc(rate_constrHouse*100, 0)+"%)");
    if (open_crane) {
      str_info.push("  Crane  (prob. "+nfc(rate_crane*100, 0)+"%)");
    }
    if (open_ladder) {
      str_info.push("  Ladder  (prob. "+nfc(rate_ladder*100, 0)+"%)");
    }
  }
  if (open_catHouse) {
    str_info.push("CatHouse  (prob. "+nfc(rate_catHouse*100, 0)+"%)");
    if (open_ladder) {
      str_info.push("  Ladder  (prob. "+nfc(rate_ladder*100, 0)+"%)");
    }
  }
  if (open_CTowerHouse) {
    str_info.push("CastleTower  (prob. "+nfc(rate_CTowerHouse*100, 0)+"%)");
    if (open_CWall) {
      str_info.push("  CastleRampart  (prob. "+nfc(rate_CWall*100, 0)+"%)");
    }
    if (open_CTRoof) {
      str_info.push("  CastleRoof  (prob. "+nfc(rate_CTRoof*100, 0)+"%)");
    }
    if (open_billboardRoof) {
      str_info.push("  Billboard_Roof  (prob. "+nfc(rate_billboardRoof*100, 0)+"%)");
    }
  }
  if (open_firewatchHouse) {
    str_info.push("FirewatchHouse  (prob. "+nfc(rate_firewatchHouse*100, 0)+"%)");
    if (open_ladder) {
      str_info.push("  Ladder  (prob. "+nfc(rate_ladder*100, 0)+"%)");
    }
    if (open_handrail) {
      str_info.push("  Handrail  (prob. "+nfc(rate_handrail*100, 0)+"%)");
    }
  }
  if (open_blockHouse) {
    str_info.push("BlockHouse  (prob. "+nfc(rate_blockHouse*100, 0)+"%)");
  }


  if (open_billMc) {
    str_info.push("------");
    str_info.push("MmDonald's  (prob. "+nfc(rate_billMc*100, 0)+"%)");
  }

  if (open_paifang) {
    str_info.push("------");
    str_info.push("Paifang  (prob. "+nfc(rate_paifang*100, 0)+"%)");
  }

  if (open_fair) {
    str_info.push("------");
    str_info.push("Fair  (prob. "+nfc(rate_fair*100, 0)+"%)");
  }


  if (open_tree) {
    str_info.push("------");
    str_info.push("Tree  (prob. "+nfc(rate_tree*100, 0)+"%)");
    if (open_foliage) {
      str_info.push("  Foliage  (prob. "+nfc(rate_foliage*100, 0)+"%)");
    }
  }




  if (open_river) {
    str_info.push("------");
    str_info.push("River " + "  (prob. "+nfc(rate_river*100, 0)+"%)");
    if (open_bridge) {
      str_info.push("  Bridge  (prob. "+nfc(rate_bridge*100, 0)+"%)");
    }
    if (open_PTTower) {
      str_info.push("  PowerTower  (prob. "+nfc(rate_PTTower*100, 0)+"%)");
    }
  }
  if (open_lightRail) {
    str_info.push("------");
    let s = "";
    for (let i=0; i<num_rail; i++) {
      s += String(lightRails[i].index_z);
      s += ", ";
    }
    str_info.push("LightRail");
    str_info.push("Rail_Num: "+num_rail + " : "+s);
  }
  if (open_mountain) {
    str_info.push("------");
    str_info.push("Mountain");
  }
  if (open_sea) {
    str_info.push("------");
    str_info.push("Sea");
    if (open_skerry) {
      str_info.push("  Skerry  (prob. "+nfc(rate_skerry*100, 0)+"%)");
    }
  }

  if (open_nightMarket) {
    str_info.push("------");
    str_info.push("NightMarket " + "  (prob. "+nfc(rate_nightMarket*100, 0)+"%)");
  }







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
  if (is_song_load_done  &&  open_play) {//------- loadSongs -------

    if (state_click == 0) {
      if (open_lightRail) {
        for (let i=0; i<6; i++) {
          H_pier[i] = easing_x(H_pier[i], H_pier_target[i], 0.1);
        }
      }
    } else if (state_click == 1) {
      if (open_light) {
        if (time_light < 20) {
          time_light ++;
        } else {
          open_light = false;
        }
      }
      c_near = lerpColor(lerpColor(c_far, c_near, 0.85), c_near_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
    }






    Y_shake = map(noise(frameCount*0.2), 0, 1, -1, 1) * max(map(speed, 0, real(20), 0, 1), 0);






    if (open_stop) {
      speed = easing_x(speed, 0, 0.25);
      if (have_button_stop) {
        if (time_stop < 90) {
          time_stop ++;
        } else {
          time_stop = 0;
          open_stop = false;
        }
      }
    } else if (open_sprint) {
      speed = easing_x(speed, real(120), 0.25);
      if (time_sprint < 2) {
        time_sprint ++;
      } else {
        time_sprint = 0;
        open_sprint = false;
      }
    } else if (open_jump) {
      speed = easing_x(speed, real(20), 0.01);
      if (time_jump < 15) {
        time_jump ++;
        //translate(0, - map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(100)), 0);
      } else {
        time_jump = 0;
        open_jump = false;
      }
    } else {
      speed = easing_x(speed, real(20), 0.01);
    }
    mileage += speed;








    background(c_sky);




    //------------------------------⬇ push Block ⬇------------------------------
    if (abs(blocks[blocks.length-1].begin.x-beginLine) > w_next_block+gap_block) {
      let x_error = abs(blocks[blocks.length-1].begin.x-beginLine) - (w_next_block+gap_block);
      let is_river_now = isRiver_next;
      for (let i=0; i<6; i++) {
        let is_mountain = false;
        if (open_mountain) {
          if (i == 5  ||  i == 4  ||  i == 3) {
            is_mountain = true;
          }
        }
        let is_sea = false;
        if (open_sea) {
          for (let j=0; j<index_sea.length; j++) {
            if (i == index_sea[j]) {
              is_sea = true;
              break;
            }
          }
        }
        let is_rail = false;
        if (open_lightRail) {
          for (let j=0; j<num_rail; j++) {
            if (i == lightRails[j].index_z) {
              is_rail = true;
              break;
            }
          }
        }
        let is_house = true;
        if (is_river_now  ||  is_mountain  ||  is_sea  ||  is_rail  ||  isNightMarket_next) {
          is_house = false;
        }
        let d = real(100)*5;
        let z = map(i, 0, 6-1, -d, -d*6) - gap_block*i;
        blocks.push(new Block(createVector(beginLine + x_error, skyline.y, z), w_next_block, real(100)*5, i, blocks.length, is_house, is_river_now, is_mountain, is_sea, is_rail, isNightMarket_next));
        count_blocks += 1;
      }

      roadVer.push(new RoadVer(createVector(beginLine + x_error, skyline.y, 0), gap_block, -skyline.z, roadVer.length-1));


      w_next_block = real(100) * floor(random(5, 12));
      if (open_river) {
        if (is_river_now) {
          isRiver_next = false;
        } else {
          if (count_blocks > 36) {
            isRiver_next = random(1) < rate_river;
          }
        }
      }
      if (open_nightMarket) {
        if (isNightMarket_next) {
          isNightMarket_next = false;
        } else {
          isNightMarket_next = random(1) < rate_nightMarket;
        }
        if (open_river  &&  isNightMarket_next  &&  isRiver_next) {
          if (random(1) < 0.5) {
            isNightMarket_next = false;
          } else {
            isRiver_next = false;
          }
        }
      }

      if (open_mountain) {
        mountain.pushNode((isRiver_next  ||  is_river_now));
      }
    }









    if (open_rain) {
      for (let i=0; i<50; i++) {
        rainyday.push(new Rain(real(-2350), real(2350), skyline.z, 0));
      }
      if (is_onTheGround) {
        for (let i=0; i<10; i++) {
          rainyday.push(new Rain(-real(500), real(250), 0, real(100)));
        }
      } else {
        for (let i=0; i<2; i++) {
          rainyday.push(new Rain(-real(500), real(250), -real(20), 0));
        }
      }
    }


    if (open_waterDrop) {
      if (is_onTheGround) {
        //for (let i=0; i<10; i++) {
        waterDrop.push(new WaterDrop());
        //}
      }
    }




    if (open_desert) {
      if (node_desert[0][0].x > endLine+real(1000)) {
        let new_node_desert = new Array(node_desert[0].length);
        for (let j=0; j<node_desert[0].length; j++) {
          const x = beginLine;
          const z = map(j, 0, node_desert[0].length-1, skyline.z, 0);
          let y = min(skyline.y - real(75) + map(noise(count_desert_ver*2, j*2), 0, 1, real(200), -real(200)), skyline.y-real(2));
          if (j == node_desert[0].length-1) {
            y = skyline.y;
          }
          new_node_desert[j] = createVector(x, y, z);
        }

        node_desert.shift();
        node_desert.push(new_node_desert);

        count_desert_ver += 1;
      }
    }

    //------------------------------⬆ push Block ⬆------------------------------

    //print(node_desert.length);













    //------------------------------⬇ shiny BILLBOARD ⬇------------------------------
    if (state_click == 1  &&  open_random_billboard) {
      if (time_billboard < 10) {
        time_billboard ++;
      } else {
        time_billboard = 0;
        open_random_billboard = false;
      }
      for (let i=0; i<BILL.length; i++) {
        BILL[i].clear();
        BILL[i].background(addAlphaToColor(c_far, 160));
        BILL[i].noStroke();
        BILL[i].fill(addAlphaToColor(c_far, 60));
        for (let j=0; j<floor(random(6, 20)); j++) {
          let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
          let x = random(0, BILL[i].width-w);
          BILL[i].rect(x, 0, w, BILL[i].height);
        }
      }
    }
    //------------------------------⬆ shiny BILLBOARD ⬆------------------------------















    //------------------------------⬇ update ⬇------------------------------
    if (blocks.length > 0) {
      for (let i=0; i<floor(blocks.length/6); i++) {
        if (blocks[i*6].dead) {
          for (let j=0; j<6; j++) {
            blocks.splice(i*6, 1);
          }
          roadVer.splice(i, 1);
        }
      }
    } 



    if (blocks.length > 0) {
      for (let i=0; i<blocks.length; i++) {
        blocks[i].update(i);
      }
    }
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        roadVer[i].update(i);
      }
    }
    if (roadHor.length > 0) {
      for (let i=0; i<roadHor.length; i++) {
        roadHor[i].update();
      }
    }


    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].update();
      }
    }



    udgStation.update();




    if (open_rain) {
      if (rainyday.length > 0) {
        for (let i=0; i<rainyday.length; i++) {
          if (rainyday[i].dead) {
            rainyday.splice(i, 1);
          }
        }
      }

      if (rainyday.length > 0) {
        for (let i=0; i<rainyday.length; i++) {
          rainyday[i].update();
        }
      }
    }

    if (open_waterDrop) {
      if (waterDrop.length > 0) {
        for (let i=0; i<waterDrop.length; i++) {
          if (waterDrop[i].dead) {
            waterDrop.splice(i, 1);
          }
        }
      }

      if (waterDrop.length > 0) {
        for (let i=0; i<waterDrop.length; i++) {
          waterDrop[i].update();
        }
      }
    }

    if (open_fog) {
      FOG_update();
    }


    if (open_mountain) {
      mountain.update();
    }



    if (open_desert) {
      for (let i=0; i<node_desert.length; i++) {
        for (let j=0; j<node_desert[i].length; j++) {
          node_desert[i][j].x += speed;
          let y = min(skyline.y - real(75) + map(noise((count_desert_ver-(node_desert.length-i))*2, j*2), 0, 1, real(200), -real(200)), skyline.y-real(2));
          if (j == node_desert[0].length-1) {
            y = skyline.y;
          }
          node_desert[i][j].y = easing_x(node_desert[i][j].y, y, 0.1);
        }
      }
    }
    //------------------------------⬆ update ⬆------------------------------











    //------------------------------⬇ camera ⬇------------------------------
    push();

    translate(0, 0, real(1000));
    if (open_follow) {
      if (!open_info) {
        roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.016, HALF_PI*0.016), 0.1);
        roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
      } else {
        roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.5, HALF_PI*0.5), 0.1);
        roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
      }
    } else {
      roY = easing_x(roY, 0, 0.1);
      roX = easing_x(roX, 0, 0.1);
    }
    rotateY(roY);
    rotateX(roX);
    translate(0, 0, -real(1000));


    if (mileage > real(2000)  &&  mileage < real(7000)) {
      cameraY = map(mileage, real(2000), real(7000), -real(800), 0);
    }
    //------------------------------⬆ camera ⬆------------------------------



    drawWinFrame(real(WH_winFrame[state_winFrame][0]), real(WH_winFrame[state_winFrame][1]), real(WH_winFrame[state_winFrame][2]), WH_winFrame[state_winFrame][3], WH_winFrame[state_winFrame][4], real(WH_winFrame[state_winFrame][5]));


    translate(0, cameraY, 0);
    if (cameraY > -real(10)) {
      is_onTheGround = true;
    } else {
      is_onTheGround = false;
    }




    if (state_click == 2  &&  open_shake) {
      if (time_shake < time_max_shake) {
        time_shake ++;
        translate(real(map(noise(frameCount*100), 0, 1, -20, 20)), real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
      } else {
        open_shake = false;
        time_max_shake = floor(random(10, 20));
      }
    }







    noStroke();
    beginShape();
    fill(c_sky);
    vertex(beginLine-real(100), skyline.y+real(0.1), skyline.z);
    vertex(endLine+real(600), skyline.y+real(0.1), skyline.z);
    fill(c_sky_near);
    vertex(endLine+real(600), skyline.y - real(2900), skyline.z);
    vertex(beginLine-real(100), skyline.y - real(2900), skyline.z);
    endShape(CLOSE);




    if (have_button_jump  &&  open_jump) {
      translate(0, map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
    }


    if (!open_info) {
      //------------------------------⬇ display ⬇------------------------------
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].display();
        }
        noStroke();
        beginShape(TRIANGLES);
        for (let i=0; i<blocks.length; i++) {
          if (blocks[i].isHouse  &&  blocks[i].houses.length > 0 ) {
            for (let j=0; j<blocks[i].houses.length; j++) {
              if (blocks[i].houses[j].is_normalHouse || blocks[i].houses[j].is_cat || blocks[i].houses[j].is_CTower || blocks[i].houses[j].is_firewatch || blocks[i].houses[j].is_buildingBlock) {
                blocks[i].houses[j].display_TRIANGLES();
              }
            }
          }
        }

        if (open_mountain) {
          mountain.display();
        }
        endShape();
      }
      if (roadVer.length > 0) {
        for (let i=0; i<roadVer.length; i++) {
          if (roadVer[i].show) {
            roadVer[i].display();
          }
        }
      }
      if (roadHor.length > 0) {
        for (let i=0; i<roadHor.length; i++) {
          roadHor[i].display();
        }
      }


      if (open_lightRail) {
        for (let i=0; i<num_rail; i++) {
          lightRails[i].display();
        }
      }





      if (state_click == 2  ||  open_mountain) {
        noStroke();
        fill(c_sky);
        beginShape();
        vertex(beginLine, skyline.y+real(2), skyline.z);
        vertex(endLine, skyline.y+real(2), skyline.z);
        vertex(endLine, skyline.y+real(2), 0);
        vertex(beginLine, skyline.y+real(2), 0);
        endShape(CLOSE);
      }




      udgStation.display();



      if (state_click == 2  &&  open_shake) {
        translate(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
      }





      if (open_rain) {
        noStroke();
        beginShape(TRIANGLES);
        if (rainyday.length > 0) {
          for (let i=0; i<rainyday.length; i++) {
            rainyday[i].display();
          }
        }
        endShape();
      }


      if (open_desert) {
        beginShape(TRIANGLES);
        noStroke();
        fill(255, 0, 0);
        //noFill();
        //stroke(255, 0, 0);
        //strokeWeight(real(1));
        for (let i=0; i<node_desert.length-1; i++) {
          for (let j=0; j<node_desert[i].length-1; j++) {
            const y_t1 = map(node_desert[i][j].y-(skyline.y-real(75)), real(200), -real(200), 0.3, -0.5);
            const y_t2 = map(node_desert[i+1][j].y-(skyline.y-real(75)), real(200), -real(200), 0.3, -0.5);
            const y_t3 = map(node_desert[i+1][j+1].y-(skyline.y-real(75)), real(200), -real(200), 0.3, -0.5);
            const y_t4 = map(node_desert[i][j+1].y-(skyline.y-real(75)), real(200), -real(200), 0.3, -0.5);

            const c1 = lerpColor(c_sky, c_near, constrain(map(node_desert[i][j].z, skyline.z, 0, 0, 1) + y_t1, 0, 1));
            const c2 = lerpColor(c_sky, c_near, constrain(map(node_desert[i+1][j].z, skyline.z, 0, 0, 1) + y_t2, 0, 1));
            const c3 = lerpColor(c_sky, c_near, constrain(map(node_desert[i+1][j+1].z, skyline.z, 0, 0, 1) + y_t3, 0, 1));
            const c4 = lerpColor(c_sky, c_near, constrain(map(node_desert[i][j+1].z, skyline.z, 0, 0, 1) + y_t4, 0, 1));
            TRIANGLES_getRect_fill4(node_desert[i][j], node_desert[i+1][j], node_desert[i+1][j+1], node_desert[i][j+1], c1, c2, c3, c4);
          }
        }
        endShape();
      }




      if (open_flood) {
        noStroke();
        beginShape();
        texture(FLOOD);
        vertex(beginLine, skyline.y-real(75*1.5), skyline.z, 0, 0);
        vertex(endLine, skyline.y-real(75*1.5), skyline.z, 1, 0);
        vertex(endLine, skyline.y-real(75*1.5), 0, 1, 1);
        vertex(beginLine, skyline.y-real(75*1.5), 0, 0, 1);
        endShape();
        fill(255);
      }



      if (have_button_jump  &&  open_jump) {
        translate(0, -map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
      }


      if (open_waterDrop) {
        if (waterDrop.length > 0) {
          noStroke();
          fill(lerpColor(c_near, c_far, 0.75));
          beginShape(TRIANGLES);
          for (let i=0; i<waterDrop.length; i++) {
            waterDrop[i].display();
          }
          endShape();
        }
      }


      if (open_TVScreen) {
        TVSCREEN.loadPixels();
        for (let i = 0; i < TVSCREEN.width; i++) {
          for (let j = 0; j < TVSCREEN.height; j++) {
            let c = c_winFrame;
            const loc = (i + j*TVSCREEN.width)*4;
            let d = dist(i, j, map(i, 0, TVSCREEN.width, TVSCREEN.width*0.40, TVSCREEN.width*0.6), TVSCREEN.height/2.0);
            let a = constrain(map(d, TVSCREEN.width*0.27, TVSCREEN.width*0.5, 0, 75), 0, 75);
            if (!open_TVSnow) {
              a += map(noise(frameCount/7.0), 0, 1, 15, 0);
              a += map(noise(j*0.2 + frameCount/6.0), 0, 1, 0, 30);
              if (state_click == 1) {
                a -= sin(map(time_billboard, 0, 10, 0, PI)) * 100;
              }
              a = constrain(a, 0, 255);
              TVSCREEN.set(i, j, addAlphaToColor(c, a));
            } else {
              a = 255;
              let t = map(random(1), 0, 1, 0.65, 1);
              t -= constrain(map(d, TVSCREEN.width*0.25, TVSCREEN.width*0.5, 0, 0.5), 0, 0.5);
              t = constrain(t, 0, 1);
              c = lerpColor(c_winFrame, c_sky, t);

              d = dist(i, j, map(mouseX, real(65), real(435), 0, TVSCREEN.width), map(mouseY, real(65), real(435), 0, TVSCREEN.height));
              a = constrain(map(d, TVSCREEN.width*0.02, TVSCREEN.width* 0.1, 0, 255), 0, 255);

              TVSCREEN.set(i, j, addAlphaToColor(c, a));
            }
          }
        }
        TVSCREEN.updatePixels();
        noStroke();
        beginShape();
        texture(TVSCREEN);
        vertex(-real(115), -real(115), real(197), 0, 0);
        vertex(real(115), -real(115), real(197), 1, 0);
        vertex(real(115), real(115), real(197), 1, 1);
        vertex(-real(115), real(115), real(197), 0, 1);
        endShape();
        fill(255);
      }


      if (open_fog) {
        FOG_display();
      }

      //------------------------------⬆ display ⬆------------------------------
    } else {
      //------------------------------⬇ displayInfo ⬇------------------------------

      //displayInfo_3d();

      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].displayInfo();
        }
      }
      if (roadVer.length > 0) {
        for (let i=0; i<roadVer.length; i++) {
          roadVer[i].displayInfo();
        }
      }
      if (roadHor.length > 0) {
        for (let i=0; i<roadHor.length; i++) {
          roadHor[i].displayInfo();
        }
      }


      if (open_lightRail) {
        for (let i=0; i<num_rail; i++) {
          lightRails[i].displayInfo();
        }
      }



      if (open_mountain) {
        mountain.displayInfo();
      }



      if (open_handrail) {
        noFill();
        strokeWeight(real(2));
        stroke(c_info2);
        beginShape(LINES);
        for (let i=0; i<blocks.length; i++) {
          if (blocks[i].isHouse) {
            for (let ii=0; ii<blocks[i].houses.length; ii++) {
              if (blocks[i].houses[ii].is_normalHouse  &&  blocks[i].houses[ii].have_handrail) {
                for (let j=0; j<blocks[i].houses[ii].node_handrail.length; j++) {
                  for (let k=0; k<blocks[i].houses[ii].node_handrail[j].length; k++) {
                    vertex(blocks[i].houses[ii].node_handrail[j][k].x, blocks[i].houses[ii].node_handrail[j][k].y, blocks[i].houses[ii].node_handrail[j][k].z);
                  }
                  vertex(blocks[i].houses[ii].node_handrail[j][1].x, blocks[i].houses[ii].node_handrail[j][1].y, blocks[i].houses[ii].node_handrail[j][1].z);
                  vertex(blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].x, blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].y, blocks[i].houses[ii].node_handrail[(j+1)%blocks[i].houses[ii].node_handrail.length][1].z);
                }
              }
            }
          }
        }
        endShape();
      }





      udgStation.displayInfo();





      if (open_rain) {
        noStroke();
        beginShape(TRIANGLES);
        if (rainyday.length > 0) {
          for (let i=0; i<rainyday.length; i++) {
            rainyday[i].displayInfo();
          }
        }
        endShape();
      }


      if (open_waterDrop) {
        if (waterDrop.length > 0) {
          noStroke();
          fill(c_info2);
          beginShape(TRIANGLES);
          for (let i=0; i<waterDrop.length; i++) {
            waterDrop[i].displayInfo();
          }
          endShape();
        }
      }
      //------------------------------⬆ displayInfo ⬆------------------------------
    }






    pop();







    PG.clear();
    if (open_info) {
      displayInfo();
      // displayInfo_true();
    }
    image(PG, -width/2, -height/2, width, height);
  } else {//------- loadSongs -------
    //------- loadSongs -------
    var_loading = easing_x(var_loading, max(0.1, count_songs/totalSongs), 0.25);

    background(c_winFrame);
    noFill();
    if (var_loading == 1) {
      fill(c_sky);
    }
    stroke(c_sky);
    strokeWeight(real(10));
    arc(0, 0, 80, 80, -HALF_PI, -HALF_PI +  var_loading*TWO_PI, OPEN);
  }
}



















function windowResized() {
  location.reload();
}


function addAlphaToColor(c, alpha) {
  return color(red(c), green(c), blue(c), alpha);
}


function easing_p(p, target, varlue) {
  if (p5.Vector.dist(p, target) > 0.0001) {
    return p5.Vector.add((p5.Vector.sub(target, p)).mult(varlue), p);
  } else {
    return target;
  }
}
function easing_x(x, target, varlue) {
  if (abs(x-target) > 0.0001) {
    return x + (target - x) * varlue;
  } else {
    return target;
  }
}
function real(x) {
  x = x/scaleRate;
  return x;
}



function PRotateX(p, angle) {
  let p_new = createVector(p.z, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p.x, p_new.y, p_new.x);
  return p_final;
}
function PRotateY(p, angle) {
  let p_new = createVector(p.x, p.z);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p.y, p_new.y);
  return p_final;
}
function PRotateZ(p, angle) {
  let p_new = createVector(p.x, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p_new.y, p.z);
  return p_final;
}


function TRIANGLES_getRect(UL, UR, DR, DL) {
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}

function TRIANGLES_getRect_fill(UL, UR, DR, DL, c) {
  fill(c);
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}

function TRIANGLES_getRect_fill4(UL, UR, DR, DL, c1, c2, c3, c4) {
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
  fill(c2);
  vertex(UR.x, UR.y, UR.z);
  fill(c3);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  fill(c4);
  vertex(DL.x, DL.y, DL.z);
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
}


function TRIANGLES_getTriangle(p1, p2, p3) {
  vertex(p1.x, p1.y, p1.z);
  vertex(p2.x, p2.y, p2.z);
  vertex(p3.x, p3.y, p3.z);
}


function TRIANGLES_getTriangle_fill3(p1, p2, p3, c1, c2, c3) {
  fill(c1);
  vertex(p1.x, p1.y, p1.z);
  fill(c2);
  vertex(p2.x, p2.y, p2.z);
  fill(c3);
  vertex(p3.x, p3.y, p3.z);
}




function TRIANGLES_getLine_weight(P1, P2, w) {
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_fill2(P1, P2, w, c1, c2) {
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  fill(c2);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}

function TRIANGLES_getLine_weightToR(P1, P2, w) {
  vertex(P1.x, P1.y, P1.z);
  vertex(P1.x + w, P1.y, P1.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P1.x, P1.y, P1.z);
}

function TRIANGLES_getLine_weightToL(P1, P2, w) {
  vertex(P1.x - w, P1.y, P1.z);
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x - w, P2.y, P2.z);
  vertex(P1.x - w, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_Y(P1, P2, w) {
  vertex(P1.x, P1.y - w/2.0, P1.z);
  vertex(P2.x, P2.y - w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P1.x, P1.y + w/2.0, P1.z);
  vertex(P1.x, P1.y - w/2.0, P1.z);
}


function LINES_getLine(P1, P2) {
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
}


function LINES_getRect(UL, UR, DR, DL) {
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}



function TPFyz(x, p1, p2) {  //Two-point Form    get x、z
  let y = 0;
  let z = 0;
  if (p2.x-p1.x == 0) {
    y = ((x - p1.x)*(p2.y-p1.y))/0.01 + p1.y;
    z = ((x - p1.x)*(p2.z-p1.z))/0.01 + p1.z;
    return  new PVector(x, y, z);
  } else {
    y = ((x - p1.x)*(p2.y-p1.y))/(p2.x-p1.x) + p1.y;
    z = ((x - p1.x)*(p2.z-p1.z))/(p2.x-p1.x) + p1.z;
    return  createVector(x, y, z);
  }
}


function intersection( wall_A, wall_B, ray_O, ray_P) {
  let den = (wall_A.x - wall_B.x) * (ray_O.y - ray_P.y) - (wall_A.y - wall_B.y) * (ray_O.x - ray_P.x);
  if (den != 0) {
    let t = ((wall_A.x - ray_O.x) * (ray_O.y - ray_P.y) - (wall_A.y - ray_O.y) * (ray_O.x - ray_P.x)) / den;
    let u = -((wall_A.x - wall_B.x) * (wall_A.y - ray_O.y) - (wall_A.y - wall_B.y) * (wall_A.x - ray_O.x)) / den;
    if (t>0 && t<1 && u>0 && u<1) {
      let new_P = createVector(wall_A.x+t*(wall_B.x-wall_A.x), wall_A.y+t*(wall_B.y-wall_A.y));
      return new_P;
    } else {
      return ray_P;
    }
  } else {
    return ray_P;
  }
}





document.onkeydown = function(event) {
  let e = event || window.event;
  if (e && e.keyCode == 73) {
    open_info = !open_info;
  }
};
document.onclick = function (event) {
  let e = event || window.event;

  //------- loadSongs -------
  if (is_song_load_done  &&  !open_play  &&  var_loading == 1) {
    open_play = true;
    songs[0].loop();
  }



  if (have_button_stop  &&  dist(real(13), real(300), mouseX, mouseY) < real(10)) {
    open_stop = true;
    time_stop = 0;
    open_sprint = false;
    time_sprint = 0;
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
  } else {
    if (state_click == 0) {
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
          roadHor[i].change();
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
        mountain.change();
      }
    } else if (state_click == 1) {
      open_light = true;
      time_light = 0;

      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }

      open_random_billboard = true;
      time_billboard = 0;

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 2) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }
      open_shake = true;
      time_shake = 0;

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 3) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }

      if (open_mountain) {
        mountain.change();
      }
    } else if (state_click == 4) {
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].change();
        }
      }
    }
  }
};


function mouseDragged() {
  if (open_fog) {
    FOG_update_wipe();
  }
}


function keyPressed() {
  if (key == ' ') {
    open_stop = true;
  } else if (key == 'w' || key == 'W') {
    state_winFrame += 1;
    if (state_winFrame >= WH_winFrame.length) {
      state_winFrame = 0;
    }
    if (state_winFrame == 8) {
      open_TVScreen = true;
    } else {
      open_TVScreen = false;
    }

    if (open_TVScreen) {
      this.open_TVSnow = false;

      this.TVSCREEN = createImage(50, 50);
      TVSCREEN.loadPixels();
      for (let i = 0; i < TVSCREEN.width; i++) {
        for (let j = 0; j < TVSCREEN.height; j++) {
          const t = random(0, 1);
          const c = lerpColor(c_sky, c_near, t);
          TVSCREEN.set(i, j, addAlphaToColor(c, 128));
        }
      }
      TVSCREEN.updatePixels();
    }
  } else if (key == 'q'  ||  key == 'Q') {
    state_winDecoration += 1;
    if (state_winDecoration > 4) {
      state_winDecoration = 0;
    }

    if (state_winDecoration == 2) {
      this.open_follow_shade_hand = new Array(WH_winFrame[state_winFrame][3]);
      this.center_shade_hand_Y = new Array(WH_winFrame[state_winFrame][3]);
      for (let i=0; i<center_shade_hand_Y.length; i++) {
        open_follow_shade_hand[i] = false;
        center_shade_hand_Y[i] = createVector(0, 0, real(200));
      }
    } else if (state_winDecoration == 3) {
      const num = 7;
      this.H_rollUpWin = 0;
      this.open_shade = false;
      this.center_rollUpWin = new Array(num);
      this.node_rollUpWin = Array.from(Array(num), () => new Array(4));
      for (let i=0; i<node_rollUpWin.length; i++) {
        center_rollUpWin[i] = createVector(0, -real(100), real(200));
        for (let j=0; j<node_rollUpWin[i].length; j++) {
          node_rollUpWin[i][j] = createVector(0, -real(100), real(200));
        }
      }
    } else if (state_winDecoration == 4) {
      this.node_curtain = Array.from(Array(2), () => new Array(20));
      for (let i=0; i<2; i++) {
        for (let j=0; j<node_curtain[i].length; j++) {
          node_curtain[i][j] = createVector(-real(100), -real(100), real(200));
        }
      }
      this.open_curtain = false;
    }
  } else if (key == 'c' || key == 'C') {
    state_color += 1;
    if (state_color >= state_c_all.length) {
      state_color = 0;
    }
    str_info[0] = "ColorMode: "+state_color;

    c_far = color(c_all[state_color][state_c_all[state_color][0]]);
    c_near = color(c_all[state_color][state_c_all[state_color][1]]);
    c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
    c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
    c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
    c_win = c_far;

    c_info1 = lerpColor(c_far, c_winFrame, 0.627);
    c_info2 = lerpColor(c_far, c_near, 0.35);
    c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
    c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
    c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
    c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);
    if (state_click == 1) {
      this.c_near_copy = c_near;
    }



    //if (open_info) {
    //  document.bgColor = c_all[state_c_all[state_color][3]];
    //} else {
    //  document.bgColor = c_all[state_c_all[state_color][2]];
    //}
    document.bgColor = c_all[state_color][state_c_all[state_color][2]];


    if (open_flood) {
      FLOOD.loadPixels();
      for (let i = 0; i < FLOOD.width; i++) {
        for (let j = 0; j < FLOOD.height; j++) {
          const t = map(j, 0, FLOOD.height, 0, 0.75);
          const c = lerpColor(c_sky, c_near, t);
          FLOOD.set(i, j, addAlphaToColor(c, 210));
        }
      }
      FLOOD.updatePixels();
    }


    for (let i=0; i<BILL.length; i++) {
      BILL[i] = createGraphics(floor(random(25, 100)), 25);
      BILL[i].background(addAlphaToColor(c_far, 160));
      BILL[i].noStroke();
      BILL[i].fill(addAlphaToColor(c_far, 60));
      for (let j=0; j<floor(random(6, 20)); j++) {
        let w = random(BILL[i].width*0.05, BILL[i].width*0.25);
        let x = random(0, BILL[i].width-w);
        BILL[i].rect(x, 0, w, BILL[i].height);
      }
    }
    if (state_click == 1) {
      this.open_random_billboard = false;
      this.time_billboard = 0;
    }
  } else if (key == 's' || key == 'S') {
    save("Tamsui_"+year()+nf(month(), 2)+nf(day(), 2)+"_"+nf(hour(), 2)+nf(minute(), 2)+nf(second(), 2)+"_"+nf(frameCount, 5)+".jpg");
  }
}
