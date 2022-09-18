

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
let speed, mileage, mileage_end;
let udgStation;
let Y_shake;





let roadVer = [];
let roadHor = [];




let open_info = false;
let is_phone = false;
let time_touch = 0;
let open_follow = false;
let open_stop = false, open_sprint = false, open_jump = false;
let is_onTheGround = false;



let str_info = [];









let open_rain;
let open_waterDrop;
let open_fog;
let open_darkCloud;
let open_sunBeam;
let open_typhoon;
let open_tornado;
let open_snow;
let open_firework;
let open_hugeMoon;






let open_TVScreen, open_winScreen;








let state_click;



let state_floor;
let stateVar_floor = [];
let H_floor;




const WH_winFrame = [//w, h, w_fillet, num, state, gap
  [225, 125, 50, 1, 0, 0], 
  [125, 180, 50, 1, 0, 0], 
  [150, 150, 50, 1, 0, 0], 
  [125, 170, 125, 1, 0, 0], 
  [225, 75, 75, 1, 0, 0], 
  [150, 150, 150, 1, 0, 0], 
  [95, 150, 50, 2, 0, 30], 
  [45, 135, 20, 3, 0, 20], 
  [160, 120, 4, 1, 1, 0], 
  [150, 90, 0, 1, 2, 0], 
  [200, 125, 15, 1, 3, 0], 
  [175, 155, 15, 4, 4, 10.8], 
  [105, 125, 100, 1, 5, 0], 
  [110, 160, 130, 1, 6, 0], 
  [150, 150, 80, 1, 7, 0], 
  [225, 75, 145, 1, 8, 0], 
  [160, 130, 230, 1, 8, 0], 
  [225, 225, 15, 1, 0, 0]

];
let state_winFrame;

let state_winDecoration;

const c_all = [
  ["#e6e5d0", "#141a1d"], 
  ["#8c8d93", "#2b201e", "#050001"], 
  ["#ba5f57", "#b8b891", "#382616", "#271708"], 
  ["#a4a481", "#c09977", "#2a1506", "#0f0900"], 
  ["#cba7bc", "#948f9f", "#3a374f", "#0f0900"], 
  ["#86ad9b", "#1a2f30", "#181e1f"], 
  ["#a6cbd9", "#92a79e", "#181e1f"], 
  //["#b8613c", "#835e4c", "#1a1006"], 
  ["#d9bf9c", "#e39239", "#431d01", "#0f0b0c"], 
  ["#9fb6bc", "#fffbd4", "#3a4f4f", "#181e1f"], 
  ["#f3c79b", "#c08ca3", "#1d0f11", "#1a1617"], 
  ["#a8a390", "#723d31", "#380303", "#09040c"], 
  ["#fee4a2", "#959a8b", "#293538", "#111517"], 
  ["#712c37", "#80979e", "#222d2f"], 
  ["#4c6363", "#0d2d3c", "#1f4a53", "#031217", "#000002"], 
  ["#beb6ac", "#92a79e", "#45403c", "#181e1f"], 
  ["#9fb6bc", "#cfc7bd", "#3a4f4f", "#211f1e"], 
  ["#712c37", "#d28139", "#380303", "#09040c"], 
  ["#081e19", "#0a513e", "#1ae49a", "#1ae49a", "#1f1e1a"], 
  ["#12090c", "#5f2f53", "#00c3df", "#00c3df", "#1a1617"]


];
const state_c_all = [
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 2, 0, 0, 0], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [0, 1, 2, 0, 0, 0], 
  [1, 2, 2, 1, 0, 1], 
  //[1, 2, 2, 1, 0, 0], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 2, 1, 0, 1], 
  [2, 3, 4, 2, 1, 0], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [1, 2, 3, 1, 0, 1], 
  [2, 3, 4, 1, 0, 1], 
  [2, 3, 4, 1, 0, 1]
];
let state_color;
let open_mode_line;

let state_gap_block;
let gap_block_ver;
let range_W_block;

let state_W_road;
let W_road_basic;


let state_speed;
let ori_speed;

let state_viewHeight;
let viewHeight;
let rotateX_viewHeight;









let state_landscape;
let open_mountain;
let open_sea;
let open_flood;
let open_desert;


let houseUsual1, houseUsual2, houseRare1, houseRare2;

let rate_normalHouse;
let open_constrHouse, rate_constrHouse;
let open_catHouse, rate_catHouse;
let open_CTowerHouse, rate_CTowerHouse;
let open_firewatchHouse, rate_firewatchHouse;
let open_blockHouse, rate_blockHouse;
let open_dottedHouse, rate_dottedHouse;
let open_UGHouse, rate_UGHouse;
let open_orientHouse, rate_orientHouse;


let state_specialStreet;
let open_river, rate_river;
let open_nightMarket, rate_nightMarket, isNightMarket_next=false;
let open_lightRail;







let state_object_first, state_object_second, state_object_third;

let open_crucifix, rate_crucifix;
let open_roof, rate_roof;
let open_handrail, rate_handrail;
let open_ladder, rate_ladder;
let open_billboard, rate_billboard;
let open_billboardRoof, rate_billboardRoof;
let open_billboardSide, rate_billboardSide;
let open_dino, rate_dino;

let open_billMc, rate_billMc;
let open_billYoubetu, rate_billYoubetu;
let open_billTezos, rate_billTezos;
let open_billMessage, rate_billMessage;
let open_billLike, rate_billLike;
let open_billCannotReturn, rate_billCannotReturn;
let open_billCall, rate_billCall;
let open_billPower, rate_billPower;
let open_billBitcoin, rate_billBitcoin;
let open_billEthereum, rate_billEthereum;
let open_billTelegram, rate_billTelegram;
let open_parking, rate_parking;
let open_billMetro, rate_billMetro;
let open_billFile, rate_billFile;
let open_fair, rate_fair;
let open_tree, rate_tree;
let open_foliage, rate_foliage;
let open_constrSite, rate_constrSite;
let open_paifang, rate_paifang;
let open_PTTower, rate_PTTower;
let open_gazebo, rate_gazebo;










let have_button_stop, have_button_sprint, have_button_jump;
let have_button_regenerate, have_button_shine, have_button_submerge, have_button_spring;
let have_button_invert;




//------- loadSongs -------
let song_track;
let songs = [];
let count_songs = 0;//0
let totalSongs = 0;//0
let is_song_load_done = false;//false
let open_play = false;

let var_loading = 0.0;











let done_begin_ani = false;
let Y_begin = 0;
//let card;
let node_BT;
let div;







//let data = {};
//function preload() {
//  data = loadJSON('/data/test.json');
//  node_BT = loadStrings('/node_bt.txt');
//}








function setup() {

  //canvas = createCanvas(500, 500, WEBGL);
  canvas = createCanvas(min(min(windowWidth, windowHeight), 1000), min(min(windowWidth, windowHeight, 1000)), WEBGL);
  canvas.position((windowWidth-width)/2, (windowHeight-width)/2);
  addScreenPositionFunction();


  scaleRate = 500.0/width;
  PG = createGraphics(500, 500);
  //strokeJoin(ROUND);
  //strokeCap(ROUND);
  textureMode(NORMAL);
  frameRate(30);



  node_BT = [
    [[0.0, 0.828], [6.048, 0.54], [10.248, 3.422], [8.604, 7.803], [10.392, 11.102], [9.041, 14.689], [0, 14.689]], 
    [[3.495, 3.771], [6.596, 4.099], [5.926, 6.106], [3.495, 6.325]], 
    [[3.495, 9.43], [6.596, 9.639], [6.353, 11.549], [3.495, 11.864]], 
    [[12.53, 0.186], [16.044, 0.186], [16.044, 14.689], [12.53, 14.689]], 
    [[20.111, 2.051], [25.951, 2.051], [25.951, 3.369], [20.111, 3.369]], 
    [[20.972, 4.648], [25.04, 4.648], [28.062, 7.47], [28.062, 11.864], [25.795, 14.689], [20.972, 14.871], [18.414, 12.662], [17.891, 7.614]], 
    [[22.461, 7.839], [25.312, 8.258], [25.486, 10.576], [22.977, 12.166], [20.648, 10.082]], 
    [[31.694, 4.648], [37.684, 4.648], [39.907, 6.262], [39.907, 9.024], [37.116, 9.024], [36.597, 7.26], [33.339, 7.349], [33.016, 11.601], [35.898, 12.225], [36.679, 10.817], [39.907, 10.817], [39.668, 13.041], [37.863, 14.689], [32.447, 14.689], [30.08, 12.575], [30.08, 7.437]], 
    [[41.777, 0.186], [45.291, 0.186], [45.291, 7.119], [47.79, 4.404], [51.676, 4.351], [47.202, 9.024], [51.554, 14.689], [47.79, 14.689], [45.291, 11.019], [45.291, 14.689], [41.777, 14.689]], 
    [[53.27, 0.663], [63.728, 0.663], [63.728, 4.009], [60.567, 4.009], [60.567, 14.689], [56.523, 14.689], [56.244, 4.009], [53.27, 4.009]], 
    [[63.433, 4.816], [66.801, 4.667], [66.805, 5.411], [71.479, 4.667], [71.479, 8.243], [66.822, 8.363], [66.86, 14.689], [63.433, 14.799]], 
    [[73.607, 5.979], [75.861, 4.667], [79.213, 5.208], [79.567, 4.667], [83.147, 4.667], [83.147, 9.143], [83.147, 14.689], [79.457, 14.799], [79.457, 13.723], [76.172, 14.799], [73.568, 13.329], [72.385, 9.935]], 
    [[76.251, 8.243], [78.055, 7.454], [79.362, 7.887], [79.421, 11.502], [77.766, 12.019], [75.118, 10.392]], 
    [[84.654, 0], [89.138, 0], [89.138, 2.161], [86.653, 3.755], [84.654, 3.404]], 
    [[85.224, 4.667], [88.6, 4.667], [88.6, 14.799], [85.033, 14.799]], 
    [[90.508, 4.82], [93.78, 4.667], [93.763, 5.69], [97.473, 4.667], [99.806, 5.694], [100, 14.799], [96.793, 14.799], [96.469, 8.383], [94.623, 8.014], [93.707, 9.089], [93.618, 14.799], [90.508, 14.799]]
  ];







  //let varData = data.mainVar;



  const loadingPath_pre = "https://funnysandwich.github.io/BlockTrain/";
  let loadingPath = "Bounces/EFX/MP3/Train.mp3";
  totalSongs += 1;
  loadingSound_track(loadingPath_pre + loadingPath);


  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬇ Phase01 ⬇---------------------------------------
  //--------------------------------------------------------------------------------------------

  //state_color = varData.Phase01.Color;
  state_color = countProb([3.2, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 6.6, 3, 3, 3, 1, 1]);
  state_color = Math.min(Math.max(Math.floor(state_color), 0), 18);

  //state_winFrame = varData.Phase01.Shape;
  state_winFrame = countProb([18, 9, 12, 9, 11, 11, 7, 5, 1.5, 1.5, 1, 1, 4, 2, 3, 2, 2]);
  state_winFrame = Math.min(Math.max(Math.floor(state_winFrame), 0), 16);

  //state_winDecoration = varData.Phase01.Decoration;
  state_winDecoration = countProb([20, 18, 12, 12, 10, 2, 5, 5, 5, 3, 8]);
  state_winDecoration = Math.min(Math.max(Math.floor(state_winDecoration), 0), 10);

  //state_gap_block = varData.Phase01.Density;
  state_gap_block = countProb([15, 35, 35, 15]);
  state_gap_block = Math.min(Math.max(Math.floor(state_gap_block), 0), 3);

  //state_W_road = varData.Phase01.RoadWidth;
  state_W_road = countProb([30, 50, 20]);
  state_W_road = Math.min(Math.max(Math.floor(state_W_road), 0), 2);

  //state_viewHeight = varData.Phase01.ViewHeight;
  state_viewHeight = countProb([15, 55, 20, 7, 3]);
  state_viewHeight = Math.min(Math.max(Math.floor(state_viewHeight), 0), 4);

  //state_speed = varData.Phase01.Speed;
  state_speed = countProb([6, 27, 34, 20, 12, 1]);
  state_speed = Math.min(Math.max(Math.floor(state_speed), 0), 5);




  loadingPath = "Bounces/Window/MP3/";
  open_mode_line = false;



  if (state_color == 0) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car1.mp3");
  } else if (state_color == 1) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car2.mp3");
  } else if (state_color == 2) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car3.mp3");
  } else if (state_color == 3) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car4.mp3");
  } else if (state_color == 4) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car5.mp3");
  } else if (state_color == 5) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car6.mp3");
  } else if (state_color == 6) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car7.mp3");
  } else if (state_color == 7) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car8.mp3");
  } else if (state_color == 8) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car9.mp3");
  } else if (state_color == 9) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car10.mp3");
  } else if (state_color == 10) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car11.mp3");
  } else if (state_color == 11) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car12.mp3");
  } else if (state_color == 12) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car13.mp3");
  } else if (state_color == 13) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car14.mp3");
  } else if (state_color == 14) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car1.mp3");
  } else if (state_color == 15) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car2.mp3");
  } else if (state_color == 16) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "Car3.mp3");
  } else if (state_color == 17) {
    open_mode_line = true;
  } else if (state_color == 18) {
    open_mode_line = true;
  }








  if (state_winFrame == 8  ||  state_winFrame == 9  ||  state_winFrame == 10  ||  state_winFrame == 11) {
    state_winDecoration = 0;
  }
  if (state_winFrame == 12  ||  state_winFrame == 13  ||  state_winFrame == 14  ||  state_winFrame == 15  ||  state_winFrame == 16) {
    if (state_winDecoration == 5) {
      state_winDecoration = 0;
    }
    if (state_winFrame == 14  &&  state_winDecoration == 1) {
      state_winDecoration = 0;
    }
  }






  range_W_block = [5, 12];

  if (state_gap_block == 0) {
    gap_block = real(150);
    range_W_block = [5, 8];
  } else if (state_gap_block == 1) {
    gap_block = real(200);
    range_W_block = [5, 12];
  } else if (state_gap_block == 2) {
    gap_block = real(450);
    range_W_block = [5, 12];
  } else if (state_gap_block == 3) {
    gap_block = real(500);
    range_W_block = [17, 20];
  }







  W_road_basic = real(150);

  if (state_W_road == 0) {
    W_road_basic = real(50);
  } else if (state_W_road == 1) {
    W_road_basic = real(150);
  } else if (state_W_road == 2) {
    W_road_basic = real(350);
  }


  if (state_W_road == 2  &&  state_gap_block == 0) {
    state_W_road = 1;
    W_road_basic = real(150);
  }





  rotateX_viewHeight = 0;

  if (state_viewHeight == 0) {
    viewHeight = real(150);
  } else if (state_viewHeight == 1) {
    viewHeight = real(300);
  } else if (state_viewHeight == 2) {
    viewHeight = real(450);
  } else if (state_viewHeight == 3) {
    viewHeight = real(600);
  } else if (state_viewHeight == 4) {
    viewHeight = real(750);
  }






  //state_speed = Math.floor((Math.asin(FS_rand(0, 1)) * Math.pow(-1, Math.floor(FS_rand(0, 2)))  + Math.PI*0.5)  /  Math.PI * 6);

  if (state_speed == 0) {
    ori_speed = real(10);
  } else if (state_speed == 1) {
    ori_speed = real(15);
  } else if (state_speed == 2) {
    ori_speed = real(20);
  } else if (state_speed == 3) {
    ori_speed = real(25);
  } else if (state_speed == 4) {
    ori_speed = real(30);
  } else if (state_speed == 5) {
    ori_speed = real(40);
  }


  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬆ Phase01 ⬆---------------------------------------
  //--------------------------------------------------------------------------------------------
















  roY = 0;
  roX = 0;
  cameraY = -real(800);
  speed = 0;
  mileage = 0;
  mileage_end = real(random(15000, 20000)*2);
  Y_shake = 0;
  beginLine = -real(3500)-gap_block*2;
  endLine = real(2350);
  //gap_block = real(150);
  gap_block_ver = real(150);
  w_next_block = real(100)*5;
  isRiver_next = false;
  skyline = createVector(0, viewHeight, -(real(100)*5*6+gap_block_ver*5));

  c_far = color(c_all[state_color][state_c_all[state_color][0]]);
  c_near = color(c_all[state_color][state_c_all[state_color][1]]);
  c_winFrame = color(c_all[state_color][state_c_all[state_color][2]]);
  c_sky = color(c_all[state_color][state_c_all[state_color][3]]);
  c_sky_near = color(c_all[state_color][state_c_all[state_color][4]]);
  c_win = color(c_all[state_color][state_c_all[state_color][5]]);

  c_info1 = lerpColor(c_far, c_winFrame, 0.627);
  c_info2 = lerpColor(c_far, c_near, 0.35);
  c_infoRed = lerpColor(c_far, color(255, 0, 0), 0.25);
  c_infoGreen = lerpColor(c_far, color(0, 128, 0), 0.25);
  c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
  c_infoYellow = lerpColor(c_far, color(160, 100, 0), 0.5);


  background(c_winFrame);
  document.bgColor = c_all[state_color][state_c_all[state_color][2]];


  if (open_mode_line) {
    c_info1 = lerpColor(c_far, c_winFrame, 0.2);
  }






  div = createDiv('Loading...');
  div.style('width', real(500));
  div.style('font-size', real(12.5));
  div.style('font-weight', 'bold');
  div.style('textAlign', 'center');
  div.style('color', c_all[state_color][state_c_all[state_color][3]]);
  div.position(canvas.x+canvas.width/2-real(250), canvas.y+canvas.height/2-real(80));























  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬇ Phase02 ⬇---------------------------------------
  //--------------------------------------------------------------------------------------------

  //state_landscape = varData.Phase02.Landscape;
  state_landscape = countProb([38, 13, 7, 24, 18]);
  state_landscape = Math.min(Math.max(Math.floor(state_landscape), 0), 4);

  //state_floor = varData.Phase02.Arrange;
  state_floor = countProb([35, 20, 25, 15, 5]);
  state_floor = Math.min(Math.max(Math.floor(state_floor), 0), 4);

  //houseUsual1 = varData.Phase02.House_Usual_1;
  houseUsual1 = countProb([7, 20, 10, 15, 18, 10, 5, 14, 1]);
  houseUsual1 = Math.min(Math.max(Math.floor(houseUsual1), 0), 8);

  //houseUsual2 = varData.Phase02.House_Usual_2;
  houseUsual2 = countProb([50, 9, 4, 9, 9, 6, 4, 8, 1]);
  houseUsual2 = Math.min(Math.max(Math.floor(houseUsual2), 0), 8);

  //houseRare1 = varData.Phase02.House_Rare_1;
  houseRare1 = countProb([20, 15, 13, 10, 15, 7, 5, 14, 1]);
  houseRare1 = Math.min(Math.max(Math.floor(houseRare1), 0), 8);

  //houseRare2 = varData.Phase02.House_Rare_2;
  houseRare2 = countProb([60, 8, 5, 7, 7, 2, 2, 8, 1]);
  houseRare2 = Math.min(Math.max(Math.floor(houseRare2), 0), 8);

  //state_specialStreet = varData.Phase02.SpecialStreet;
  state_specialStreet = countProb([50, 12, 19, 19]);
  state_specialStreet = Math.min(Math.max(Math.floor(state_specialStreet), 0), 3);









  open_desert = false;
  open_flood = false;
  open_sea = false;
  open_mountain = false;

  loadingPath = "Bounces/Building/MP3/";
  totalSongs += 1;



  if (state_landscape == 0) {
    loadingSound(loadingPath_pre + loadingPath + "Default.mp3");
  } else if (state_landscape == 1) {
    open_desert = true;
    loadingSound(loadingPath_pre + loadingPath + "Desert.mp3");
  } else if (state_landscape == 2) {
    open_flood = true;
    loadingSound(loadingPath_pre + loadingPath + "Water.mp3");
  } else if (state_landscape == 3) {
    open_sea = true;
    loadingSound(loadingPath_pre + loadingPath + "Ocean.mp3");
  } else if (state_landscape == 4) {
    open_mountain = true;
    loadingSound(loadingPath_pre + loadingPath + "Mountain.mp3");
  }







  stateVar_floor.push([0.4, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8]); //0:正常
  stateVar_floor.push([0.4, 2, 2, 1.5, 2, 3, 4, 6, 7, 8, 11, 14, 16]); //1:前面贫民 后面高楼
  stateVar_floor.push([0.8, 5, 7, 5, 8, 2, 4, 2, 3, 2, 2, 1, 2]); //2:前面高楼 后面贫民
  stateVar_floor.push([0.5, 3, 4, 4, 5, 5, 6, 5, 7, 7, 8, 8, 9]); //3:森林
  stateVar_floor.push([0.5, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2]); //4:贫民




  if (state_floor == 1  &&  (open_sea  ||  open_mountain)) {
    state_floor = 0;
  }
  if (state_floor == 2  &&  open_sea) {
    state_floor = 0;
  }






  open_normalHouse = true;
  open_constrHouse = false;
  open_catHouse = false;
  open_CTowerHouse = false;
  open_firewatchHouse = false;
  open_blockHouse = false;
  open_dottedHouse = false;
  open_orientHouse = false;
  open_UGHouse = false;


  rate_normalHouse = floor(random(1, 11)) * 0.1;
  rate_constrHouse = 0;
  rate_catHouse = 0;
  rate_CTowerHouse = 0;
  rate_firewatchHouse = 0;
  rate_blockHouse = 0;
  rate_dottedHouse = 0;
  rate_orientHouse = 0;
  rate_UGHouse = 0;





  if (houseUsual1 == 0) {
  } else if (houseUsual1 == 1) {
    open_constrHouse = true;
    rate_constrHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 2) {
    open_catHouse = true;
    rate_catHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 3) {
    open_CTowerHouse = true;
    rate_CTowerHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 4) {
    open_firewatchHouse = true;
    rate_firewatchHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 5) {
    open_blockHouse = true;
    rate_blockHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 6) {
    open_dottedHouse = true;
    rate_dottedHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 7) {
    open_orientHouse = true;
    rate_orientHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual1 == 8) {
    open_UGHouse = true;
    rate_UGHouse += floor(random(1, 11)) * 0.1;
  }


  if (houseUsual2 == 0) {
  } else if (houseUsual2 == 1) {
    open_constrHouse = true;
    rate_constrHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 2) {
    open_catHouse = true;
    rate_catHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 3) {
    open_CTowerHouse = true;
    rate_CTowerHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 4) {
    open_firewatchHouse = true;
    rate_firewatchHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 5) {
    open_blockHouse = true;
    rate_blockHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 6) {
    open_dottedHouse = true;
    rate_dottedHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 7) {
    open_orientHouse = true;
    rate_orientHouse += floor(random(1, 11)) * 0.1;
  } else if (houseUsual2 == 8) {
    open_UGHouse = true;
    rate_UGHouse += floor(random(1, 11)) * 0.1;
  }



  if (houseRare1 != 0  &&  (houseRare1 == houseUsual1  ||  houseRare1 == houseUsual2)) {
    houseRare1 = 0;
  }
  if (houseRare1 == 0) {
  } else if (houseRare1 == 1) {
    open_constrHouse = true;
    rate_constrHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 2) {
    open_catHouse = true;
    rate_catHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 3) {
    open_CTowerHouse = true;
    rate_CTowerHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 4) {
    open_firewatchHouse = true;
    rate_firewatchHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 5) {
    open_blockHouse = true;
    rate_blockHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 6) {
    open_dottedHouse = true;
    rate_dottedHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 7) {
    open_orientHouse = true;
    rate_orientHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare1 == 8) {
    open_UGHouse = true;
    rate_UGHouse += floor(random(1, 6)) * 0.01;
  }



  if (houseRare2 != 0  &&  (houseRare2 == houseUsual1  ||  houseRare2 == houseUsual2)) {
    houseRare2 = 0;
  }
  if (houseRare2 == 0) {
  } else if (houseRare2 == 1) {
    open_constrHouse = true;
    rate_constrHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 2) {
    open_catHouse = true;
    rate_catHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 3) {
    open_CTowerHouse = true;
    rate_CTowerHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 4) {
    open_firewatchHouse = true;
    rate_firewatchHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 5) {
    open_blockHouse = true;
    rate_blockHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 6) {
    open_dottedHouse = true;
    rate_dottedHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 7) {
    open_orientHouse = true;
    rate_orientHouse += floor(random(1, 6)) * 0.01;
  } else if (houseRare2 == 8) {
    open_UGHouse = true;
    rate_UGHouse += floor(random(1, 6)) * 0.01;
  }





  open_lightRail = false;
  open_nightMarket = false;
  open_river = false;
  rate_river = 0;
  rate_nightMarket = 0;



  if (state_specialStreet == 0) {
  } else if (state_specialStreet == 1) {
    open_lightRail = true;
    this.num_rail = floor(random(1, 3.5));
    if (open_mountain) {
      num_rail = min(num_rail, 2);
    }
    this.song_trainPass = [];
    for (let i=0; i<num_rail; i++) {
      totalSongs += 1;
      loadingSound_trainPass(loadingPath_pre + "Bounces/EFX/MP3/TrainPass_new.mp3");
    }
  } else if (state_specialStreet == 2) {
    open_river = true;
    rate_river = floor(random(1, 6)) * 0.1;
  } else if (state_specialStreet == 3) {
    open_nightMarket = true;
    rate_nightMarket = floor(random(1, 6)) * 0.1;
  }


  if (open_river  &&  open_flood) {
    open_river = false;
  }






  if (open_constrHouse) {
    open_crane = true;
    rate_crane = 0.5;
  }

  if (open_CTowerHouse) {
    this.rate_CWall = floor(random(1, 9)) * 0.1;
    this.open_CWall = true;
  }


  rate_dino = 0;
  if (open_dottedHouse) {
    this.node_fileBroken = Array.from(Array(26), () => new Array(2));
    loadStrings("node_billFileBroken.txt", fileBrokenLoaded);

    this.node_dino = Array.from(Array(35), () => new Array(2));
    loadStrings("node_dino.txt", dinoLoaded);

    rate_dino = max(floor(random(-7, 9))/10, 0);
    if (rate_dino == 0) {
      open_dino = false;
    } else {
      open_dino = true;
    }
  }



  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬆ Phase02 ⬆---------------------------------------
  //--------------------------------------------------------------------------------------------










  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬇ Phase03 ⬇---------------------------------------
  //--------------------------------------------------------------------------------------------
  //state_object_first = varData.Phase03.First;
  state_object_first = countProb([0, 3, 3, 3, 8, 8, 8, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2.5, 2.5, 3, 4, 4]);
  state_object_first = Math.min(Math.max(Math.floor(state_object_first), 0), 27);

  //state_object_second = varData.Phase03.Second;
  state_object_second = countProb([0, 3, 3, 3, 8, 8, 8, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2.5, 2.5, 3, 4, 4]);
  state_object_second = Math.min(Math.max(Math.floor(state_object_second), 0), 27);

  //state_object_third = varData.Phase03.Third;
  state_object_third = countProb([0, 3, 3, 3, 8, 8, 8, 3, 3, 3, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2.5, 2.5, 3, 4, 4]);
  state_object_third = Math.min(Math.max(Math.floor(state_object_third), 0), 27);




  loadingPath = "Bounces/Object/MP3/";


  rate_roof = 0;
  rate_handrail = 0;
  rate_crucifix = 0;
  rate_billboard = 1;
  rate_billboardRoof = 0;
  rate_billboardSide = 0;
  rate_ladder = 0;

  open_roof = false;
  open_handrail = false;
  open_crucifix = false;
  open_billboard = false;
  open_billboardRoof = false;
  open_billboardSide = false;
  open_ladder = false;



  rate_billMc = 0;
  rate_billYoubetu = 0;
  rate_billTezos = 0;
  rate_billMessage = 0;
  rate_billLike = 0;
  rate_billCannotReturn = 0;
  rate_billCall = 0;
  rate_billPower = 0;
  rate_billBitcoin = 0;
  rate_billEthereum = 0;
  rate_billTelegram = 0;
  rate_parking = 0;
  rate_billMetro = 0;
  rate_billFile = 0;
  rate_tree = 0;
  rate_foliage = 0;
  rate_fair = 0;
  rate_paifang = 0;
  rate_PTTower = 0;
  rate_gazebo = 0;

  open_billMc = false;
  open_billYoubetu = false;
  open_billTezos = false;
  open_billMessage = false;
  open_billLike = false;
  open_billCannotReturn = false;
  open_billCall = false;
  open_billPower = false;
  open_billBitcoin = false;
  open_billEthereum = false;
  open_billTelegram = false;
  open_parking = false;
  open_billMetro = false;
  open_billFile = false;
  open_tree = false;
  open_foliage = false;
  open_fair = false;
  open_paifang = false;
  open_PTTower = false;
  open_gazebo = false;






  if (state_object_first == 0) {
  } else if (state_object_first == 1) {
    open_roof = true;
    rate_roof += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 2) {
    open_handrail = true;
    rate_handrail += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 3) {
    open_crucifix = true;
    rate_crucifix += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 4) {
    open_billboardRoof = true;
    rate_billboardRoof += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 5) {
    open_billboardSide = true;
    rate_billboardSide += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 6) {
    open_billboard = true;
    rate_billboard += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 7) {
    open_ladder = true;
    rate_ladder += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 8) {
    open_billMc = true;
    rate_billMc += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 9) {
    open_billYoubetu = true;
    rate_billYoubetu += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 10) {
    open_billTezos = true;
    rate_billTezos += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 11) {
    open_billBitcoin = true;
    rate_billBitcoin += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 12) {
    open_billEthereum = true;
    rate_billEthereum += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 13) {
    open_billMessage = true;
    rate_billMessage += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 14) {
    open_billLike = true;
    rate_billLike += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 15) {
    open_billCannotReturn = true;
    rate_billCannotReturn += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 16) {
    open_billCall = true;
    rate_billCall += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 17) {
    open_billPower = true;
    rate_billPower += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 18) {
    open_billMetro = true;
    rate_billMetro += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 19) {
    open_billFile = true;
    rate_billFile += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 20) {
    open_billTelegram = true;
    rate_billTelegram += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 21) {
    open_parking = true;
    rate_parking += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 22) {
    open_fair = true;
    rate_fair += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 23) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
    open_foliage = true;
    rate_foliage += 1;
  } else if (state_object_first == 24) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 25) {
    open_gazebo = true;
    rate_gazebo += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 26) {
    open_paifang = true;
    rate_paifang += floor(random(5, 10)) * 0.1;
  } else if (state_object_first == 27) {
    open_PTTower = true;
    rate_PTTower += floor(random(5, 10)) * 0.1;
  }







  if (state_object_second == 0) {
  } else if (state_object_second == 1) {
    open_roof = true;
    rate_roof += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 2) {
    open_handrail = true;
    rate_handrail += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 3) {
    open_crucifix = true;
    rate_crucifix += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 4) {
    open_billboardRoof = true;
    rate_billboardRoof += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 5) {
    open_billboardSide = true;
    rate_billboardSide += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 6) {
    open_billboard = true;
    rate_billboard += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 7) {
    open_ladder = true;
    rate_ladder += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 8) {
    open_billMc = true;
    rate_billMc += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 9) {
    open_billYoubetu = true;
    rate_billYoubetu += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 10) {
    open_billTezos = true;
    rate_billTezos += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 11) {
    open_billBitcoin = true;
    rate_billBitcoin += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 12) {
    open_billEthereum = true;
    rate_billEthereum += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 13) {
    open_billMessage = true;
    rate_billMessage += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 14) {
    open_billLike = true;
    rate_billLike += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 15) {
    open_billCannotReturn = true;
    rate_billCannotReturn += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 16) {
    open_billCall = true;
    rate_billCall += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 17) {
    open_billPower = true;
    rate_billPower += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 18) {
    open_billMetro = true;
    rate_billMetro += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 19) {
    open_billFile = true;
    rate_billFile += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 20) {
    open_billTelegram = true;
    rate_billTelegram += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 21) {
    open_parking = true;
    rate_parking += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 22) {
    open_fair = true;
    rate_fair += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 23) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
    open_foliage = true;
    rate_foliage += 0.5;
  } else if (state_object_second == 24) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
    if (open_foliage) {
      rate_foliage -= 0.5;
    }
  } else if (state_object_second == 25) {
    open_gazebo = true;
    rate_gazebo += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 26) {
    open_paifang = true;
    rate_paifang += floor(random(5, 10)) * 0.1;
  } else if (state_object_second == 27) {
    open_PTTower = true;
    rate_PTTower += floor(random(5, 10)) * 0.1;
  }




  if (state_object_third == 0) {
  } else if (state_object_third == 1) {
    open_roof = true;
    rate_roof += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 2) {
    open_handrail = true;
    rate_handrail += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 3) {
    open_crucifix = true;
    rate_crucifix += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 4) {
    open_billboardRoof = true;
    rate_billboardRoof += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 5) {
    open_billboardSide = true;
    rate_billboardSide += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 6) {
    open_billboard = true;
    rate_billboard += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 7) {
    open_ladder = true;
    rate_ladder += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 8) {
    open_billMc = true;
    rate_billMc += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 9) {
    open_billYoubetu = true;
    rate_billYoubetu += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 10) {
    open_billTezos = true;
    rate_billTezos += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 11) {
    open_billBitcoin = true;
    rate_billBitcoin += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 12) {
    open_billEthereum = true;
    rate_billEthereum += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 13) {
    open_billMessage = true;
    rate_billMessage += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 14) {
    open_billLike = true;
    rate_billLike += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 15) {
    open_billCannotReturn = true;
    rate_billCannotReturn += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 16) {
    open_billCall = true;
    rate_billCall += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 17) {
    open_billPower = true;
    rate_billPower += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 18) {
    open_billMetro = true;
    rate_billMetro += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 19) {
    open_billFile = true;
    rate_billFile += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 20) {
    open_billTelegram = true;
    rate_billTelegram += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 21) {
    open_parking = true;
    rate_parking += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 22) {
    open_fair = true;
    rate_fair += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 23) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
    open_foliage = true;
    if (rate_foliage == 0.5) {
      rate_foliage = 0.6666;
    } else if (rate_foliage == 0) {
      rate_foliage = 0.3333;
    }
  } else if (state_object_third == 24) {
    open_tree = true;
    rate_tree += floor(random(5, 10)) * 0.1;
    if (rate_foliage == 0.5) {
      rate_foliage = 0.3333;
    } else if (rate_foliage == 1.5) {
      rate_foliage = 0.6666;
    }
  } else if (state_object_third == 25) {
    open_gazebo = true;
    rate_gazebo += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 26) {
    open_paifang = true;
    rate_paifang += floor(random(5, 10)) * 0.1;
  } else if (state_object_third == 27) {
    open_PTTower = true;
    rate_PTTower += floor(random(5, 10)) * 0.1;
  }






  if (open_ladder) {
    if (state_floor == 3) {
      this.floor_min_ladder = 2;
      this.floor_max_ladder = 3;
      this.floor_sub_ladder = 1;
    } else if (state_floor == 4) {
      this.floor_min_ladder = 2;
      this.floor_max_ladder = 2;
      this.floor_sub_ladder = 0;
    } else {
      this.floor_min_ladder = 4;
      if (open_firewatchHouse) {
        floor_min_ladder = 2;
      }
      this.floor_max_ladder = 12;
      this.floor_sub_ladder = 2;
    }
  }






  if (open_roof  ||  open_handrail) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P0.mp3");
  }  
  if (open_billboardRoof) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P1.mp3");
  }  
  if (open_billboardSide) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P2.mp3");
  }  
  if (open_billboard) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P3.mp3");
  }  
  if (open_crucifix) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P4.mp3");
  }  
  if (open_billMc  ||  open_billMessage  ||  open_billCannotReturn  ||  open_billCall  ||  open_billPower  ||  open_billMetro  ||  open_billFile) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P5.mp3");
  }  
  if (open_billYoubetu  ||  open_billTezos  ||  open_billBitcoin  ||  open_billEthereum  ||  open_billLike  ||  open_billTelegram) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P6.mp3");
  }  
  if (open_parking  ||  open_fair  ||  open_tree  ||  open_gazebo  ||  open_paifang) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P7.mp3");
  }  
  if (open_ladder  ||  open_PTTower) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "P8.mp3");
  }



  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬆ Phase03 ⬆---------------------------------------
  //--------------------------------------------------------------------------------------------








  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬇ Phase04 ⬇---------------------------------------
  //--------------------------------------------------------------------------------------------

  loadingPath = "Bounces/Atmosphere/MP3/";


  open_rain = false;
  open_waterDrop = false;
  open_fog = false;
  open_darkCloud = false;
  open_sunBeam = false;
  open_typhoon = false;
  open_tornado = false;
  open_snow = false;
  open_firework = false;
  open_hugeMoon = false;

  //open_rain = varData.Phase04.Weather.weather_rain == 1;
  //open_waterDrop = varData.Phase04.Weather.weather_waterdrop == 1;
  //open_fog = varData.Phase04.Weather.weather_fog == 1;
  //open_darkCloud = varData.Phase04.Weather.weather_darkCloud == 1;
  //open_sunBeam = varData.Phase04.Weather.weather_sunBeam == 1;
  //open_typhoon = varData.Phase04.Weather.weather_typhoon == 1;
  //open_tornado = varData.Phase04.Weather.weather_tornado == 1;
  //open_snow = varData.Phase04.Weather.weather_snow == 1;
  //open_firework = varData.Phase04.Weather.weather_firework == 1;
  //open_hugeMoon = varData.Phase04.Weather.weather_hugeMoon == 1;
  open_rain = countProb([89, 11]) == 1;
  open_waterDrop = countProb([91, 9]) == 1;
  open_fog = countProb([91, 9]) == 1;
  open_darkCloud = countProb([91, 9]) == 1; 
  open_sunBeam = countProb([91, 9]) == 1;
  open_typhoon = countProb([91, 9]) == 1;
  open_tornado = countProb([91, 9]) == 1;
  open_snow = countProb([91, 9]) == 1;
  open_firework = countProb([93, 7]) == 1;
  open_hugeMoon = countProb([91, 9]) == 1;


  have_button_stop = false;
  have_button_sprint = false;
  have_button_jump = false;
  have_button_regenerate = false;
  have_button_shine = false;
  have_button_submerge = false;
  have_button_spring = false;
  have_button_invert = false;

  //have_button_stop = varData.Phase04.Button.button_stop == 1;
  //have_button_sprint = varData.Phase04.Button.button_sprint == 1;
  //have_button_jump = varData.Phase04.Button.button_jump == 1;
  //have_button_regenerate = varData.Phase04.Button.button_regenerate == 1;
  //have_button_shine = varData.Phase04.Button.button_shine == 1;
  //have_button_submerge = varData.Phase04.Button.button_submerge == 1;
  //have_button_spring = varData.Phase04.Button.button_spring == 1;
  //have_button_invert = varData.Phase04.Button.button_invert == 1;
  have_button_stop = countProb(85, 15) == 1;
  have_button_sprint = countProb(85, 15) == 1;
  have_button_jump = countProb(85, 15) == 1;
  have_button_regenerate = countProb(87, 13) == 1;
  have_button_shine = countProb(89, 11) == 1;
  have_button_submerge = countProb(90, 10) == 1;
  have_button_spring = countProb(89, 11) == 1;
  have_button_invert = countProb(89, 11) == 1;







  if (open_sunBeam) {
    open_darkCloud = true;
  }


  if (open_typhoon  &&  open_tornado) {
    if (FS_rand(0, 1) < 0.5) {
      open_typhoon = false;
    } else {
      open_tornado = false;
    }
  }

  if (open_rain  &&  open_typhoon  &&  open_snow) {
    let ran = FS_rand(0, 1);
    if (ran < 0.3333) {
      open_typhoon = false;
      open_snow = false;
    } else if (ran < 0.6666) {
      open_rain = false;
      open_snow = false;
    } else {
      open_rain = false;
      open_typhoon = false;
    }
  }
  if (open_rain  &&  open_typhoon) {
    if (FS_rand(0, 1) < 0.5) {
      open_rain = false;
    } else {
      open_typhoon = false;
    }
  }
  if (open_rain  &&  open_snow) {
    if (FS_rand(0, 1) < 0.5) {
      open_rain = false;
    } else {
      open_snow = false;
    }
  }
  if (open_typhoon  &&  open_snow) {
    if (FS_rand(0, 1) < 0.5) {
      open_typhoon = false;
    } else {
      open_snow = false;
    }
  }

  if (open_hugeMoon  &&  open_sunBeam) {
    if (FS_rand(0, 1) < 0.5) {
      open_hugeMoon = false;
    } else {
      open_sunBeam = false;
      open_darkCloud = false;
    }
  }

  if (open_hugeMoon  &&  open_darkCloud  &&  !open_sunBeam) {
    if (FS_rand(0, 1) < 0.5) {
      open_hugeMoon = false;
    } else {
      open_darkCloud = false;
    }
  }

  if (open_firework  &&  open_typhoon) {
    open_firework = false;
  }





  if (open_rain) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W0.mp3");
  }
  if (open_waterDrop) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W1.mp3");
  }
  if (open_fog) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W2.mp3");
  }
  if (open_darkCloud  &&  !open_sunBeam) {
    this.song_thunder;
    this.time_thunder = 0;
    this.time_max_thunder = 120;
    this.gap_thunder = 0;
    this.gap_max_thunder = floor(random(200, 500));
    totalSongs += 1;
    loadingSound_thunder(loadingPath_pre + loadingPath + "W3.mp3");
  }
  if (open_sunBeam) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W4.mp3");
  }
  if (open_typhoon) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W5.mp3");
  }
  if (open_tornado) {
    this.song_tornado = [];//new Array(3);
    totalSongs += 3;
    loadingSound_tornado(loadingPath_pre + loadingPath + "W6.mp3");
    loadingSound_tornado(loadingPath_pre + loadingPath + "W6.mp3");
    loadingSound_tornado(loadingPath_pre + loadingPath + "W6.mp3");
  }
  if (open_snow) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W7.mp3");
  }
  if (open_firework) {
    this.song_boom = [];
    totalSongs += 3;
    loadingSound_boom(loadingPath_pre + "Bounces/EFX/MP3/boom0.mp3");
    loadingSound_boom(loadingPath_pre + "Bounces/EFX/MP3/boom1.mp3");
    loadingSound_boom(loadingPath_pre + "Bounces/EFX/MP3/boom2.mp3");
  }
  if (open_hugeMoon) {
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W9.mp3");
  }





  state_click = 0; 







  if (!open_rain && !open_waterDrop && !open_fog && !open_darkCloud && !open_sunBeam && !open_typhoon && !open_tornado && !open_snow && !open_firework && !open_hugeMoon &&
    !have_button_stop && !have_button_sprint && !have_button_jump && !have_button_regenerate && !have_button_shine && !have_button_submerge && !have_button_spring && !have_button_invert
    ) {
    have_button_regenerate = true;
    have_button_stop = FS_rand(0, 1) < 0.5;
    have_button_sprint = FS_rand(0, 1) < 0.5;
    have_button_jump = FS_rand(0, 1) < 0.5;
    have_button_shine = FS_rand(0, 1) < 0.5;
    have_button_submerge = FS_rand(0, 1) < 0.5;
    have_button_spring = FS_rand(0, 1) < 0.5;
    have_button_invert = FS_rand(0, 1) < 0.5;
  }













  if (have_button_shine) {
    this.c_near_copy = c_near;
    this.open_light = false;
    this.time_light = 20;
  } 
  if (have_button_submerge) {
    this.open_shake = false;
    this.time_shake = 0;
    this.time_max_shake = floor(random(10, 20));
  }
  if (have_button_invert) {
    this.c_sky_copy = c_sky;
    this.c_winFrame_copy = c_winFrame;
    this.c_far_copy = c_far;
    if (!have_button_shine) { 
      this.c_near_copy = c_near;
    }

    this.open_invert = false;
    this.time_invert = 0;
    this.x_button_invert = -real(4.5);
  }


  //--------------------------------------------------------------------------------------------
  //----------------------------------------⬆ Phase04 ⬆---------------------------------------
  //--------------------------------------------------------------------------------------------






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
  } else if (state_winDecoration == 5) {
    this.FRAME = createGraphics(750, 750);
    drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
  } else if (state_winDecoration == 6) {
    this.node_handle = Array.from(Array(3), () => new Array(4));
    this.open_handle_follow = new Array(node_handle.length);
    for (let i=0; i<node_handle.length; i++) {
      let x = map(i, 0, node_handle.length-1, -real(225)*0.5*0.6, real(225)*0.5*0.6);
      node_handle[i][0] = createVector(x, -real(125)*0.7, real(200) + real(70));
      node_handle[i][1] = createVector(x, -real(125)*0.7 +real(100)*0.25, real(200) + real(70));
      node_handle[i][2] = p5.Vector.sub(node_handle[i][1], node_handle[i][0]).setMag(real(25)).add(node_handle[i][1]).add(0, 0, real(9));
      node_handle[i][3] = p5.Vector.sub(node_handle[i][1], node_handle[i][0]).setMag(real(25)).add(node_handle[i][1]).add(0, 0, -real(9));

      open_handle_follow[i] = false;
    }
  } else if (state_winDecoration == 7) {
    this.time_shutter = 0;
    this.time_max_shutter = 15;
    this.open_shutter = false;
  } else if (state_winDecoration == 8) {
    this.time_blink = 0;
    this.time_max_blink = 15;
    this.open_blink = false;
    this.num_blink = 1;

    this.num_node_flash = floor(random(4, 16));
    this.ran_flash = random(-999, 999);
    this.time_flash = 0;
    this.open_flash = false;
    this.time_max_flash = 5;
  } else if (state_winDecoration == 9) {
    this.time_fan = 0;
  } else if (state_winDecoration == 10) {
    this.num_LED = 16;
    this.time_breathe = new Array(num_LED);
    this.time_max_breathe = 240;
    for (let i=0; i<time_breathe.length; i++) {
      time_breathe[i] = map(i, 0, time_breathe.length, -60, time_max_breathe);
    }
    this.open_LED_shine = false;
    this.time_LED_shine = false;
  }
















  H_floor = real(75);
  if (state_floor == 3) {
    H_floor = real(200);
  }





  //have_button_stop = false;
  if (have_button_stop) {
    this.time_stop = 0;
  }
  //have_button_sprint = false;
  if (have_button_sprint) {
    this.time_sprint = 0;
  }
  //have_button_jump = false;
  if (have_button_jump) {
    this.time_jump = 0;
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
  if (have_button_shine) {
    this.open_random_billboard = false;
    this.time_billboard = 0;
  }








  //-----------------------------------------------------------------------------------------------
  //-----------------------------------⬇ initialize miniblock ⬇-----------------------------------
  //-----------------------------------------------------------------------------------------------






  if (open_billTezos) {
    this.node_tezos = Array.from(Array(26), () => new Array(2));
    loadStrings("node_billTezos.txt", tezosLoaded);
  }


  if (open_billLike) {
    this.node_like = Array.from(Array(16), () => new Array(2));
    loadStrings("node_billLike.txt", likeLoaded);
  }

  if (open_billCannotReturn) {
    this.node_CTReturn = Array.from(Array(40), () => new Array(2));
    loadStrings("node_billCannotReturn.txt", cannotReturnLoaded);
  }



  if (open_billCall) {
    this.node_call = Array.from(Array(10), () => new Array(2));
    loadStrings("node_billCall.txt", callLoaded);
  }


  if (open_billPower) {
    this.node_power = Array.from(Array(12), () => new Array(2));
    loadStrings("node_billPower.txt", powerLoaded);
  }


  if (open_billBitcoin) {
    this.node_bitcoin = Array.from(Array(38), () => new Array(2));
    loadStrings("node_billBitcoin.txt", bitcoinLoaded);
  }


  if (open_billEthereum) {
    this.node_ethereum = Array.from(Array(9), () => new Array(2));
    loadStrings("node_billEthereum.txt", ethereumLoaded);
  }



  if (open_billTelegram) {
    this.node_telegram = Array.from(Array(11), () => new Array(2));
    loadStrings("node_billTelegram.txt", telegramLoaded);
  }


  if (open_billMetro) {
    this.node_metro = Array.from(Array(28), () => new Array(2));
    loadStrings("node_billMetro.txt", metroLoaded);
  }


  if (open_billFile) {
    this.node_file = Array.from(Array(18), () => new Array(2));
    loadStrings("node_billFile.txt", fileLoaded);
  }





  //-----------------------------------------------------------------------------------------------
  //-----------------------------------⬆ initialize miniblock ⬆-----------------------------------
  //-----------------------------------------------------------------------------------------------





  //--------------------------------------------------------------------------------------------
  //-----------------------------------⬇ initialize house ⬇-----------------------------------
  //--------------------------------------------------------------------------------------------



  //--------------------------------------------------------------------------------------------
  //-----------------------------------⬆ initialize house ⬆-----------------------------------
  //--------------------------------------------------------------------------------------------











  //rate_ladder = max(floor(random(-8, 9))/10, 0);
  //rate_ladder = 0;
  //if (rate_ladder == 0) {
  //  rate_ladder = 0;
  //  open_ladder = false;
  //} else {
  //  rate_ladder = max(rate_ladder, 0.5);
  //  open_ladder = true;

  //}







  //-------------------------------------------------------------------------------------------------
  //-----------------------------------⬇ initialize environment ⬇-----------------------------------
  //-------------------------------------------------------------------------------------------------




  if (open_river) {
    open_river = true;
    this.isRiver_next = false;

    this.open_bridge = false;
    this.rate_bridge = max(floor(random(5, 20))/100, 0);
    if (rate_bridge == 0) {
      open_bridge = false;
    } else {
      open_bridge = true;
    }
  }





  //rate_nightMarket = max(floor(random(-4, 3))/10, 0);
  //rate_nightMarket = 0;
  if (rate_nightMarket == 0) {
    rate_nightMarket = 0;
    open_nightMarket = false;
    isNightMarket_next = false;
  } else {
    open_nightMarket = true;
    isNightMarket_next = false;
  }





  //open_mountain = false;
  if (open_mountain) {
    this.open_houseBeginY_followMountainY = true;
    this.mountain = new Mountain();
  }



  //open_sea = false;
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




  //open_lightRail = random(1) < 0;//0.15;
  if (open_lightRail) {
    //this.num_rail = 1;//max(floor(random(0, 7)), 1);
    this.H_pier_target = new Array(6);
    this.H_pier = new Array(6);
    this.lightRails = new Array(num_rail);

    for (let i=0; i<6; i++) {
      H_pier_target[i] = real(75) * (2 + floor(random(0, map(i, 0, 6, 0.5, 16))));
      H_pier[i] = H_pier_target[i];
    }

    let b = [0, 1, 2, 3, 4, 5];
    if (state_floor == 1) {
      b.splice(5, 1);
    }
    if (open_mountain) {
      b = [0, 1, 2];
    }
    if (state_floor == 2) {
      b.splice(0, 1);
    }


    for (let i=0; i<num_rail; i++) {
      const index_z = floor(random(0, b.length));

      lightRails[i] = new LightRail(i, b[index_z]);

      b.splice(index_z, 1);
    }
  }



  //open_rain = false;
  if (open_rain || open_typhoon || open_snow) {
    this.rainyday = [];
    rainyday.push(new Rain(beginLine, endLine, skyline.z, 0));
  }


  //open_waterDrop = false;
  if (open_waterDrop) {
    this.waterDrop = []; 
    // for (let i=0; i<10; i++) {
    //waterDrop.push(new WaterDrop());
    //}
  }


  //open_fog = false;
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









  //open_flood = false;
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



  //open_desert = false;
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






  if (open_sunBeam) {
    this.sunBeam = [];
    sunBeam.push(new SunBeam());
  }




  if (open_tornado) {
    this.tornado = [];
    tornado.push(new Tornado(createVector(0, skyline.y, skyline.z+real(500)), 0));
  }





  if (open_firework) {
    this.firework = [];
    firework.push(new Firework(createVector(0, skyline.y, skyline.z+real(10)), floor(random(0, song_boom.length))));
    this.time_firework = 0;
    this.time_max_firework = floor(random(10, 120));
  }



  if (open_hugeMoon) {
    this.W_moon = real(random(400, 1500));
    this.center_moon = createVector(real(random(-2000, 2000)), skyline.y-random(W_moon/2.0, W_moon), skyline.z+real(5));
    const num_face = 8;//偶数
    this.node_moon = new Array(2+4*floor(num_face/2));
    for (let i=0; i<node_moon.length; i++) {
      let x = cos(map(i, 0, node_moon.length, 0, TWO_PI)) * W_moon/2.0;
      let y = sin(map(i, 0, node_moon.length, 0, TWO_PI)) * W_moon/2.0;
      node_moon[i] = center_moon.copy().add(x, y, 0);
    }
  }







  //-------------------------------------------------------------------------------------------------
  //-----------------------------------⬆ initialize environment ⬆-----------------------------------
  //-------------------------------------------------------------------------------------------------






  open_TVScreen = false;
  if (state_winFrame == 8) {
    open_TVScreen = true;
  } else {
    open_TVScreen = false;
  }

  if (state_winFrame == 9) {
    open_winScreen = true;
    this.open_winScreen_follow = false;
    this.center_winScreen = createVector(0, 0, real(200));
    this.node_winScreen_lu = createVector(-real(WH_winFrame[state_winFrame][0]/2.0), -real(WH_winFrame[state_winFrame][1]/2.0), real(200));
    this.pos_winScreen_pressed = createVector(0, 0, 0);
  } else {
    open_winScreen = false;
  }

  if (state_winFrame == 10) {
    this.time_speak = 0;
    this.open_openMouth = true;
    this.time_max_speak = floor(random(5, 15));
    this.time_min_speak = 0;
    this.time_delay_max_speak = 0;
    this.time_delay_min_speak = 0;
  } else if (state_winFrame == 11) {
    this.W_mess = new Array(WH_winFrame[state_winFrame][3]);
    for (let i=0; i<W_mess.length; i++) {
      W_mess[i] = real(WH_winFrame[state_winFrame][0]);
    }
  }

  if (open_TVScreen) {
    this.open_TVSnow = true;
    this.time_TVSnow = 0;

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
  let x_begin = endLine;
  for (let j=0; j<6; j++) {
    x_begin = x_begin - w_next_block - gap_block;
    if (x_begin < beginLine) {
      break;
    }
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
      let z = map(i, 0, 6-1, -d, -d*6) - gap_block_ver*i;
      blocks.push(new Block(createVector(x_begin, skyline.y, z), w_next_block, real(100)*5, i, blocks.length, is_house, is_river_now, is_mountain, is_sea, is_rail, isNightMarket_next));
      count_blocks += 1;
    }

    let s_roadHor = new Array(6);
    for (let i=0; i<s_roadHor.length; i++) {
      let z = (-real(100)*5 - gap_block_ver) * (i+1);
      s_roadHor[i] = new RoadHor(createVector(x_begin-speed*0, skyline.y, z), gap_block_ver, w_next_block, j, i);
    }
    roadHor.push(s_roadHor);
    roadVer.push(new RoadVer(createVector(x_begin-speed*0, skyline.y, 0), gap_block, -skyline.z, j));




    w_next_block = real(100) * floor(random(range_W_block[0], range_W_block[1]));
    if (open_river) {
      if (is_river_now) {
        isRiver_next = false;
      } else {
        isRiver_next = random(1) < rate_river;
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
  }






  let s_info = [];

  s_info.push("---- Window ----");
  if (state_winFrame == 0) {
    s_info.push("Shape: HOR");
  } else if (state_winFrame == 1) {
    s_info.push("Shape: VER");
  } else if (state_winFrame == 2) {
    s_info.push("Shape: SQUARE");
  } else if (state_winFrame == 3) {
    s_info.push("Shape: STRIP");
  } else if (state_winFrame == 4) {
    s_info.push("Shape: STADIUM");
  } else if (state_winFrame == 5) {
    s_info.push("Shape: CIRCLE");
  } else if (state_winFrame == 6) {
    s_info.push("Shape: DOUBLE");
  } else if (state_winFrame == 7) {
    s_info.push("Shape: TRIPLE");
  } else if (state_winFrame == 8) {
    s_info.push("Shape: SCREEN");
  } else if (state_winFrame == 9) {
    s_info.push("Shape: WINSWIN");
  } else if (state_winFrame == 10) {
    s_info.push("Shape: NOISEY");
  } else if (state_winFrame == 11) {
    s_info.push("Shape: BRIDGE");
  } else if (state_winFrame == 12) {
    s_info.push("Shape: ARCH");
  } else if (state_winFrame == 13) {
    s_info.push("Shape: HALF");
  } else if (state_winFrame == 14) {
    s_info.push("Shape: CROSS");
  } else if (state_winFrame == 15) {
    s_info.push("Shape: SLIP");
  } else if (state_winFrame == 16) {
    s_info.push("Shape: EYE");
  }

  if (state_winDecoration == 0) {
    s_info.push("Decoration: NULL");
  } else if (state_winDecoration == 1) {
    s_info.push("Decoration: SUBMARINE");
  } else if (state_winDecoration == 2) {
    s_info.push("Decoration: PLANE");
  } else if (state_winDecoration == 3) {
    s_info.push("Decoration: SHUTTER");
  } else if (state_winDecoration == 4) {
    s_info.push("Decoration: CURTAIN");
  } else if (state_winDecoration == 5) {
    s_info.push("Decoration: MESS");
  } else if (state_winDecoration == 6) {
    s_info.push("Decoration: HANDLE");
  } else if (state_winDecoration == 7) {
    s_info.push("Decoration: BLINK");
  } else if (state_winDecoration == 8) {
    s_info.push("Decoration: FLASH");
  } else if (state_winDecoration == 9) {
    s_info.push("Decoration: FAN");
  } else if (state_winDecoration == 10) {
    s_info.push("Decoration: HOLIDAY");
  }

  if (state_color == 0) {
    s_info.push("Color: DEFULT");
  } else if (state_color == 1) {
    s_info.push("Color: SHINING");
  } else if (state_color == 2) {
    s_info.push("Color: HER");
  } else if (state_color == 3) {
    s_info.push("Color: FAIRY");
  } else if (state_color == 4) {
    s_info.push("Color: BUDAPEST");
  } else if (state_color == 5) {
    s_info.push("Color: DECKARD");
  } else if (state_color == 6) {
    s_info.push("Color: JOEL");
  } else if (state_color == 7) {
    s_info.push("Color: RUNNER");
  } else if (state_color == 8) {
    s_info.push("Color: DALLAS");
  } else if (state_color == 9) {
    s_info.push("Color: VANILLA");
  } else if (state_color == 10) {
    s_info.push("Color: FORBIDDEN");
  } else if (state_color == 11) {
    s_info.push("Color: K");
  } else if (state_color == 12) {
    s_info.push("Color: JACKHOUSE");
  } else if (state_color == 13) {
    s_info.push("Color: TYLER");
  } else if (state_color == 14) {
    s_info.push("Color: MIX1");
  } else if (state_color == 15) {
    s_info.push("Color: MIX2");
  } else if (state_color == 16) {
    s_info.push("Color: MIX3");
  } else if (state_color == 17) {
    s_info.push("Color: DSO1");
  } else if (state_color == 18) {
    s_info.push("Color: DSO2");
  }

  if (state_gap_block == 0) {
    s_info.push("Density: HANDSHAKE");
  } else if (state_gap_block == 1) {
    s_info.push("Density: DENSE");
  } else if (state_gap_block == 2) {
    s_info.push("Density: NORMAL");
  } else if (state_gap_block == 3) {
    s_info.push("Density: SPARSE");
  }

  if (state_W_road == 0) {
    s_info.push("RoadWidth: NARROW");
  } else if (state_W_road == 1) {
    s_info.push("RoadWidth: DEFULT");
  } else if (state_W_road == 2) {
    s_info.push("RoadWidth: WIDE");
  }

  if (state_viewHeight == 0) {
    s_info.push("ViewHeight: LOW");
  }
  if (state_viewHeight == 1) {
    s_info.push("ViewHeight: DEFULT");
  }
  if (state_viewHeight == 2) {
    s_info.push("ViewHeight: HIGH");
  }
  if (state_viewHeight == 3) {
    s_info.push("ViewHeight: HIGH+");
  }
  if (state_viewHeight == 4) {
    s_info.push("ViewHeight: HIGH++");
  }

  if (state_speed == 0) {
    s_info.push("Speed: LAZY");
  } else if (state_speed == 1) {
    s_info.push("Speed: SLOW");
  } else if (state_speed == 2) {
    s_info.push("Speed: NORMAL");
  } else if (state_speed == 3) {
    s_info.push("Speed: FAST");
  } else if (state_speed == 4) {
    s_info.push("Speed: FAST+");
  } else if (state_speed == 5) {
    s_info.push("Speed: HURRY");
  }


  //s_info[s_info.length-1] += (" ("+nfc(speed*scaleRate, 2) + "), Mileage: "+nfc(mileage*scaleRate, 2));


  str_info.push(s_info);






  s_info = [];
  s_info.push("---- Building ----");

  if (open_mountain) {
    s_info.push("Landscape: "+"Mountain".toUpperCase());
  } else if (open_sea) {
    s_info.push("Landscape: "+"Sea".toUpperCase());
    if (open_skerry) {
      s_info.push("  Skerry  (prob. "+nfc(rate_skerry*100, 0)+"%)");
    }
  } else if (open_desert) {
    s_info.push("Landscape: "+"desert".toUpperCase());
  } else if (open_flood) {
    s_info.push("Landscape: "+"flood".toUpperCase());
  } else {
    s_info.push("Landscape: "+"default".toUpperCase());
  }

  if (state_floor == 0) {
    s_info.push("Arrange: DEFULT");
  } else if (state_floor == 1) {
    s_info.push("Arrange: STAIR");
  } else if (state_floor == 2) {
    s_info.push("Arrange: EMBANKMENT");
  } else if (state_floor == 3) {
    s_info.push("Arrange: SKYSCRAPER");
  } else if (state_floor == 4) {
    s_info.push("Arrange: SUGARCUBE");
  }


  if (houseUsual1 == 0) {
    s_info.push("House_Usual_1: NULL");
  } else if (houseUsual1 == 1) {
    s_info.push("House_Usual_1: CONSTR");
  } else if (houseUsual1 == 2) {
    s_info.push("House_Usual_1: CAT");
  } else if (houseUsual1 == 3) {
    s_info.push("House_Usual_1: WALL");
  } else if (houseUsual1 == 4) {
    s_info.push("House_Usual_1: FIREWATCH");
  } else if (houseUsual1 == 5) {
    s_info.push("House_Usual_1: BLOCK");
  } else if (houseUsual1 == 6) {
    s_info.push("House_Usual_1: DOTTED");
  } else if (houseUsual1 == 7) {
    s_info.push("House_Usual_1: ORIENT");
  } else if (houseUsual1 == 8) {
    s_info.push("House_Usual_1: UNDERGROUND");
  }
  if (houseUsual2 == 0) {
    s_info.push("House_Usual_2: NULL");
  } else if (houseUsual2 == 1) {
    s_info.push("House_Usual_2: CONSTR");
  } else if (houseUsual2 == 2) {
    s_info.push("House_Usual_2: CAT");
  } else if (houseUsual2 == 3) {
    s_info.push("House_Usual_2: WALL");
  } else if (houseUsual2 == 4) {
    s_info.push("House_Usual_2: FIREWATCH");
  } else if (houseUsual2 == 5) {
    s_info.push("House_Usual_2: BLOCK");
  } else if (houseUsual2 == 6) {
    s_info.push("House_Usual_2: DOTTED");
  } else if (houseUsual2 == 7) {
    s_info.push("House_Usual_2: ORIENT");
  } else if (houseUsual2 == 8) {
    s_info.push("House_Usual_2: UNDERGROUND");
  }
  if (houseRare1 == 0) {
    s_info.push("House_Rare_1: NULL");
  } else if (houseRare1 == 1) {
    s_info.push("House_Rare_1: CONSTR");
  } else if (houseRare1 == 2) {
    s_info.push("House_Rare_1: CAT");
  } else if (houseRare1 == 3) {
    s_info.push("House_Rare_1: WALL");
  } else if (houseRare1 == 4) {
    s_info.push("House_Rare_1: FIREWATCH");
  } else if (houseRare1 == 5) {
    s_info.push("House_Rare_1: BLOCK");
  } else if (houseRare1 == 6) {
    s_info.push("House_Rare_1: DOTTED");
  } else if (houseRare1 == 7) {
    s_info.push("House_Rare_1: ORIENT");
  } else if (houseRare1 == 8) {
    s_info.push("House_Rare_1: UNDERGROUND");
  }
  if (houseRare2 == 0) {
    s_info.push("House_Rare_2: NULL");
  } else if (houseRare2 == 1) {
    s_info.push("House_Rare_2: CONSTR");
  } else if (houseRare2 == 2) {
    s_info.push("House_Rare_2: CAT");
  } else if (houseRare2 == 3) {
    s_info.push("House_Rare_2: WALL");
  } else if (houseRare2 == 4) {
    s_info.push("House_Rare_2: FIREWATCH");
  } else if (houseRare2 == 5) {
    s_info.push("House_Rare_2: BLOCK");
  } else if (houseRare2 == 6) {
    s_info.push("House_Rare_2: DOTTED");
  } else if (houseRare2 == 7) {
    s_info.push("House_Rare_2: ORIENT");
  } else if (houseRare2 == 8) {
    s_info.push("House_Rare_2: UNDERGROUND");
  }




  if (open_lightRail) {
    s_info.push("SpecialStreet: RAILWAY");
  } else if (open_river) {
    s_info.push("SpecialStreet: RIVER");
  } else if (open_nightMarket) {
    s_info.push("SpecialStreet: NIGHTMARKET");
  } else {
    s_info.push("SpecialStreet: NULL");
  }



  str_info.push(s_info);






  s_info = [];
  s_info.push("---- Object ----");

  if (state_object_first == 0) {
    s_info.push("NULL");
  } else if (state_object_first == 1) {
    s_info.push("ROOFTOP_SHANTY");
  } else if (state_object_first == 2) {
    s_info.push("ROOFTOP_RAILING");
  } else if (state_object_first == 3) {
    s_info.push("ROOFTOP_CROSS");
  } else if (state_object_first == 4) {
    s_info.push("BILLBOARD_ROOFTOP");
  } else if (state_object_first == 5) {
    s_info.push("BILLBOARD_SIDE");
  } else if (state_object_first == 6) {
    s_info.push("BILLBOARD_FLOOR");
  } else if (state_object_first == 7) {
    s_info.push("BRIDGE");
  } else if (state_object_first == 8) {
    s_info.push("AD_MC");
  } else if (state_object_first == 9) {
    s_info.push("AD_YT");
  } else if (state_object_first == 10) {
    s_info.push("AD_XTZ");
  } else if (state_object_first == 11) {
    s_info.push("AD_BTC");
  } else if (state_object_first == 12) {
    s_info.push("AD_ETH");
  } else if (state_object_first == 13) {
    s_info.push("AD_MESSAGE");
  } else if (state_object_first == 14) {
    s_info.push("AD_LIKE");
  } else if (state_object_first == 15) {
    s_info.push("AD_CN");
  } else if (state_object_first == 16) {
    s_info.push("AD_CALL");
  } else if (state_object_first == 17) {
    s_info.push("AD_POWER");
  } else if (state_object_first == 18) {
    s_info.push("AD_METRO");
  } else if (state_object_first == 19) {
    s_info.push("AD_FILE");
  } else if (state_object_first == 20) {
    s_info.push("AD_PLANE");
  } else if (state_object_first == 21) {
    s_info.push("PARK");
  } else if (state_object_first == 22) {
    s_info.push("FAIR");
  } else if (state_object_first == 23) {
    s_info.push("TREE");
  } else if (state_object_first == 24) {
    s_info.push("DEADTREE");
  } else if (state_object_first == 25) {
    s_info.push("GAZEBO");
  } else if (state_object_first == 26) {
    s_info.push("PAIFANG");
  } else if (state_object_first == 27) {
    s_info.push("TOWER");
  }

  if (state_object_second == 0) {
  } else if (state_object_second == 1) {
    s_info.push("ROOFTOP_SHANTY");
  } else if (state_object_second == 2) {
    s_info.push("ROOFTOP_RAILING");
  } else if (state_object_second == 3) {
    s_info.push("ROOFTOP_CROSS");
  } else if (state_object_second == 4) {
    s_info.push("BILLBOARD_ROOFTOP");
  } else if (state_object_second == 5) {
    s_info.push("BILLBOARD_SIDE");
  } else if (state_object_second == 6) {
    s_info.push("BILLBOARD_FLOOR");
  } else if (state_object_second == 7) {
    s_info.push("BRIDGE");
  } else if (state_object_second == 8) {
    s_info.push("AD_MC");
  } else if (state_object_second == 9) {
    s_info.push("AD_YT");
  } else if (state_object_second == 10) {
    s_info.push("AD_XTZ");
  } else if (state_object_second == 11) {
    s_info.push("AD_BTC");
  } else if (state_object_second == 12) {
    s_info.push("AD_ETH");
  } else if (state_object_second == 13) {
    s_info.push("AD_MESS");
  } else if (state_object_second == 14) {
    s_info.push("AD_LIKE");
  } else if (state_object_second == 15) {
    s_info.push("AD_CN");
  } else if (state_object_second == 16) {
    s_info.push("AD_CALL");
  } else if (state_object_second == 17) {
    s_info.push("AD_POWER");
  } else if (state_object_second == 18) {
    s_info.push("AD_METRO");
  } else if (state_object_second == 19) {
    s_info.push("AD_FILE");
  } else if (state_object_second == 20) {
    s_info.push("AD_PLANE");
  } else if (state_object_second == 21) {
    s_info.push("PARK");
  } else if (state_object_second == 22) {
    s_info.push("FAIR");
  } else if (state_object_second == 23) {
    s_info.push("TREE");
  } else if (state_object_second == 24) {
    s_info.push("DEADTREE");
  } else if (state_object_second == 25) {
    s_info.push("GAZEBO");
  } else if (state_object_second == 26) {
    s_info.push("PAIFANG");
  } else if (state_object_second == 27) {
    s_info.push("TOWER");
  }

  if (state_object_third == 0) {
  } else if (state_object_third == 1) {
    s_info.push("ROOFTOP_SHANTY");
  } else if (state_object_third == 2) {
    s_info.push("ROOFTOP_RAILING");
  } else if (state_object_third == 3) {
    s_info.push("ROOFTOP_CROSS");
  } else if (state_object_third == 4) {
    s_info.push("BILLBOARD_ROOFTOP");
  } else if (state_object_third == 5) {
    s_info.push("BILLBOARD_SIDE");
  } else if (state_object_third == 6) {
    s_info.push("BILLBOARD_FLOOR");
  } else if (state_object_third == 7) {
    s_info.push("BRIDGE");
  } else if (state_object_third == 8) {
    s_info.push("AD_MC");
  } else if (state_object_third == 9) {
    s_info.push("AD_YT");
  } else if (state_object_third == 10) {
    s_info.push("AD_XTZ");
  } else if (state_object_third == 11) {
    s_info.push("AD_BTC");
  } else if (state_object_third == 12) {
    s_info.push("AD_ETH");
  } else if (state_object_third == 13) {
    s_info.push("AD_MESS");
  } else if (state_object_third == 14) {
    s_info.push("AD_LIKE");
  } else if (state_object_third == 15) {
    s_info.push("AD_CN");
  } else if (state_object_third == 16) {
    s_info.push("AD_CALL");
  } else if (state_object_third == 17) {
    s_info.push("AD_POWER");
  } else if (state_object_third == 18) {
    s_info.push("AD_METRO");
  } else if (state_object_third == 19) {
    s_info.push("AD_FILE");
  } else if (state_object_third == 20) {
    s_info.push("AD_PLANE");
  } else if (state_object_third == 21) {
    s_info.push("PARK");
  } else if (state_object_third == 22) {
    s_info.push("FAIR");
  } else if (state_object_third == 23) {
    s_info.push("TREE");
  } else if (state_object_third == 24) {
    s_info.push("DEADTREE");
  } else if (state_object_third == 25) {
    s_info.push("GAZEBO");
  } else if (state_object_third == 26) {
    s_info.push("PAIFANG");
  } else if (state_object_third == 27) {
    s_info.push("TOWER");
  }

  str_info.push(s_info);







  s_info = [];
  s_info.push("---- Atmosphere ----");
  if (!open_rain && !open_waterDrop && !open_fog && !open_darkCloud && !open_sunBeam && !open_typhoon && !open_tornado && !open_snow && !open_firework && !open_hugeMoon) {
    s_info.push("Weather: NULL");
  } else {
    s_info.push("Weather: ");
    if (open_rain) {
      s_info.push("  RAIN");
    }
    if (open_waterDrop) {
      s_info.push("  WATERDROP");
    }
    if (open_fog) {
      s_info.push("  MIST");
    }
    if (open_darkCloud && !open_sunBeam) {
      s_info.push("  DARKCLOUD");
    }
    if (open_sunBeam) {
      s_info.push("  SUNBEAM");
    }
    if (open_typhoon) {
      s_info.push("  TYPHOON");
    }
    if (open_tornado) {
      s_info.push("  TORNADO");
    }
    if (open_snow) {
      s_info.push("  SNOW");
    }
    if (open_firework) {
      s_info.push("  FIREWORK");
    }
    if (open_hugeMoon) {
      s_info.push("  HUGEMOON");
    }
  }

  if (!have_button_stop && !have_button_sprint && !have_button_jump && !have_button_regenerate && !have_button_shine && !have_button_submerge && !have_button_spring && !have_button_invert) {
    s_info.push("Button: NULL");
  } else {
    s_info.push("Button: ");
    if (open_TVScreen) {
      s_info.push("  TV_SNOW");
    }
    if (have_button_jump) {
      s_info.push("  JUMP");
    }
    if (have_button_sprint) {
      s_info.push("  SPRINT");
    }
    if (have_button_stop) {
      s_info.push("  STOP");
    }
    if (have_button_regenerate) {
      s_info.push("  REGENERATE");
    }
    if (have_button_shine) {
      s_info.push("  LIGHT");
    }
    if (have_button_submerge) {
      s_info.push("  SUBMERGE");
    }
    if (have_button_spring) {
      s_info.push("  SPRING");
    }
    if (have_button_invert) {
      s_info.push("  DARK");
    }
  }

  str_info.push(s_info);












  //card = new Card(1);
  //card.update();








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

    if (touches.length == 1) {
      is_phone = true;
      time_touch ++;
    } else {
      time_touch = 0;
    }

    if (time_touch == 30) {
      open_info = !open_info;
      if (state_winDecoration == 5) {
        drawDrakWinFrame((WH_winFrame[state_winFrame][0]), WH_winFrame[state_winFrame][1], WH_winFrame[state_winFrame][2]);
      }
    }


    if (speed > 0) {
      let volume = constrain(map(speed, 0, ori_speed, 0, 1), 0, 1);
      if (!song_track.isPlaying()) {
        song_track.setVolume(0);
        song_track.play();
      } else {
        song_track.setVolume(volume);
      }

      if (!is_onTheGround) {
        volume = constrain(map(cameraY, -real(450), -real(10), 0, 1), 0, 1);
      }

      if (songs.length > 0) {
        for (let i=0; i<songs.length; i++) {
          if (!songs[i].isPlaying()) {
            songs[i].setVolume(0);
            songs[i].play();
          } else {
            songs[i].setVolume(volume);
          }
        }
      }
    } else {
      if (song_track.isPlaying()) {
        song_track.pause();
      }
      if (songs.length > 0) {
        for (let i=0; i<songs.length; i++) {
          if (songs[i].isPlaying()) {
            songs[i].pause();
          }
        }
      }
    }




    if (have_button_regenerate) {
      if (open_lightRail) {
        for (let i=0; i<6; i++) {
          H_pier[i] = easing_x(H_pier[i], H_pier_target[i], 0.1);
        }
      }
    }
    if (have_button_invert) {
      if (open_invert) {
        if (time_invert < 15) {
          time_invert ++;
        }
      } else {
        if (time_invert > 0) {
          time_invert --;
        }
      }

      if (open_mode_line) {
        c_sky = lerpColor(c_sky_copy, color(0), map(time_invert, 0, 15, 0, 1));
        c_far = lerpColor(c_far_copy, color(16, 246, 6), map(time_invert, 0, 15, 0, 1));
        if (state_color == c_all.length-1) {
          c_far = lerpColor(c_far_copy, color(75, 79, 206), map(time_invert, 0, 15, 0, 1));
        }
      } else {
        c_sky = lerpColor(c_sky_copy, c_winFrame_copy, map(time_invert, 0, 15, 0, 0.95));
        //c_winFrame = lerpColor(c_sky_copy, c_winFrame_copy, map(time_invert, 0, 15, 1, 0.8));
        c_near = lerpColor(c_near_copy, c_winFrame_copy, map(time_invert, 0, 15, 0, 1));
        c_far = lerpColor(c_sky, c_far_copy, map(time_invert, 0, 15, 1, 0));
      }
    }
    if (have_button_shine) {
      if (open_light) {
        if (time_light < 20) {
          time_light ++;
        } else {
          open_light = false;
        }
      }

      if (open_mode_line) {
        c_info2 = lerpColor(color(255), lerpColor(c_far, c_near, 0.35), constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        c_infoRed = lerpColor(color(255), lerpColor(c_far, color(255, 0, 0), 0.25), constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        c_infoGreen = lerpColor(color(255), lerpColor(c_far, color(0, 128, 0), 0.25), constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        c_infoGreen2 = lerpColor(color(255), lerpColor(c_info1, color(0, 160, 0), 0.5), constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        c_infoYellow = lerpColor(color(255), lerpColor(c_far, color(160, 100, 0), 0.5), constrain(map(time_light, 0, 20, 0, 1), 0, 1));
      } else {
        if (have_button_invert && open_invert) {
          c_near = lerpColor(lerpColor(c_sky_copy, c_winFrame_copy, 0.65), c_winFrame_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        } else {
          c_near = lerpColor(lerpColor(c_far, c_near, 0.85), c_near_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
        }
      }
    }






    Y_shake = real(map(noise(frameCount*0.2), 0, 1, -1, 1)) * max(map(speed, 0, real(20), 0, 1), 0);






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
      speed = easing_x(speed, ori_speed, 0.01);
      if (time_jump < 15) {
        time_jump ++;
        //translate(0, - map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(100)), 0);
      } else {
        time_jump = 0;
        open_jump = false;
      }
    } else {
      speed = easing_x(speed, ori_speed, 0.01);
    }
    //speed = 0;
    mileage += speed;








    background(c_sky);



    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ push Block ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------


    if ((blocks[blocks.length-1].begin.x-beginLine) > w_next_block+gap_block) {
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
        let z = map(i, 0, 6-1, -d, -d*6) - gap_block_ver*i;
        blocks.push(new Block(createVector(beginLine + x_error, skyline.y, z), w_next_block, real(100)*5, i, blocks.length, is_house, is_river_now, is_mountain, is_sea, is_rail, isNightMarket_next));
        count_blocks += 1;
      }

      let s_roadHor = new Array(6);
      for (let i=0; i<s_roadHor.length; i++) {
        let z = (-real(100)*5 - gap_block_ver) * (i+1);
        s_roadHor[i] = new RoadHor(createVector(beginLine + x_error, skyline.y, z), gap_block_ver, w_next_block, roadHor.length, i);
      }
      roadHor.push(s_roadHor);
      roadVer.push(new RoadVer(createVector(beginLine + x_error, skyline.y, 0), gap_block, -skyline.z, roadVer.length));



      w_next_block = real(100) * floor(random(range_W_block[0], range_W_block[1]));
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



      if (open_sunBeam) {
        let num = floor(random(-2, 2.5));
        if (num > 0) {
          for (let i=0; i<num; i++) {
            sunBeam.push(new SunBeam(beginLine));
          }
        }
      }

      if (open_tornado) {
        if (random(1) < 0.2) {
          for (let i=0; i<song_tornado.length; i++) {
            if (!song_tornado[i].isPlaying()) {
              tornado.push(new Tornado(createVector(beginLine, skyline.y, random(-real(500), skyline.z+real(750))), i));
              break;
            }
          }
        }
      }
    }









    if (open_rain  ||  open_typhoon  ||  open_snow) {
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
      } else if (open_typhoon) {
        for (let i=0; i<10; i++) {
          rainyday.push(new Rain(real(-2500), real(-900), skyline.z*0.25, 0));
        }
      } else if (open_snow) {
        for (let i=0; i<10; i++) {
          rainyday.push(new Rain(real(-3350), real(1350), skyline.z*0.5, 0));
        }
      }
    }


    if (open_waterDrop) {
      if (is_onTheGround) {
        //for (let i=0; i<10; i++) {
        waterDrop.push(new WaterDrop());
        // }
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




    if (open_firework) {
      if (time_firework < time_max_firework) {
        time_firework ++;
      } else {
        time_max_firework = floor(random(10, 120));
        time_firework = 0;
        let num = floor(random(1, 6));
        let x = random(-real(2000), real(250));
        for (let i=0; i<num; i++) {
          firework.push(new Firework(createVector(x, skyline.y, skyline.z+real(10)), floor(random(0, song_boom.length))));
        }
      }
    }







    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ push Block ⬆----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------













    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ shiny BILLBOARD ⬇----------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    if (have_button_shine  &&  open_random_billboard) {
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
    //------------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ shiny BILLBOARD ⬆----------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------------------------------------------------













    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ update ⬇--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //if (blocks.length > 0) {
    //  for (let i=0; i<floor(blocks.length/6); i++) {
    //    if (blocks[i*6].dead) {
    //      for (let j=0; j<6; j++) {
    //        blocks.splice(i*6, 1);
    //      }
    //      roadVer.splice(i, 1);
    //    }
    //  }
    //}
    if (roadVer.length > 0) {
      for (let i=0; i<roadVer.length; i++) {
        if (roadVer[i].dead) {
          roadVer.splice(i, 1);
          roadHor.splice(i, 1);
          for (let j=0; j<6; j++) {
            blocks.splice(i*6, 1);
          }
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
        for (let j=0; j<roadHor[i].length; j++) {
          roadHor[i][j].update(i);
        }
      }
    }




    if (open_lightRail) {
      for (let i=0; i<num_rail; i++) {
        lightRails[i].update();
      }
    }



    udgStation.update();




    if (open_rain || open_typhoon || open_snow) {
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


    if (open_darkCloud  &&  !open_sunBeam) {
      if (gap_thunder < gap_max_thunder) {
        if (is_onTheGround) {
          gap_thunder ++;
        }

        if (song_thunder.isPlaying()) {
          song_thunder.stop();
        }
      } else {

        if (time_thunder < time_max_thunder) {
          time_thunder ++;

          if (!song_thunder.isPlaying()) {
            song_thunder.play();
          }
          let volume = constrain(map(time_thunder, floor(time_max_thunder/2), time_max_thunder, 1, 0), 0, 1);
          song_thunder.setVolume(volume);
        } else {
          gap_thunder = 0;
          gap_max_thunder = floor(random(200, 500));
          time_thunder = 0;
          time_max_thunder = floor(random(90, 200));
          song_thunder.stop();
        }
      }
    }


    if (open_sunBeam) {
      if (sunBeam.length > 0) {
        for (let i=0; i<sunBeam.length; i++) {
          if (sunBeam[i].dead) {
            sunBeam.splice(i, 1);
          }
        }
      }
      if (sunBeam.length > 0) {
        for (let i=0; i<sunBeam.length; i++) {
          sunBeam[i].update();
        }
      }
    }


    if (open_tornado) {
      if (tornado.length > 0) {
        for (let i=0; i<tornado.length; i++) {
          if (tornado[i].dead) {
            tornado.splice(i, 1);
          }
        }
      }
      if (tornado.length > 0) {
        for (let i=0; i<tornado.length; i++) {
          tornado[i].update();
        }
      }
    }



    if (open_firework) {
      if (firework.length > 0) {
        for (let i=0; i<firework.length; i++) {
          if (firework[i].dead) {
            firework.splice(i, 1);
          }
        }
      }
      if (firework.length > 0) {
        for (let i=0; i<firework.length; i++) {
          firework[i].update();
        }
      }
    }


    if (open_hugeMoon) {
      W_moon = map(noise(frameCount*0.00025-91), 0, 1, real(400), real(1800));

      center_moon = createVector(map(noise(frameCount*0.00025), 0, 1, real(-1500), real(1500)), skyline.y-map(noise(frameCount*0.001+999), 0, 1, W_moon*0.4, real(1000)), skyline.z+real(5));
      if (open_mountain) {
        center_moon.y = skyline.y-map(noise(frameCount*0.002+999), 0, 1, real(500), real(2000));
      }
      for (let i=0; i<node_moon.length; i++) {
        let x = cos(map(i, 0, node_moon.length, 0, TWO_PI)) * W_moon/2.0;
        let y = sin(map(i, 0, node_moon.length, 0, TWO_PI)) * W_moon/2.0;
        node_moon[i] = center_moon.copy().add(x, y, 0);
      }
    }



    if (state_winDecoration == 7) {
      if (open_shutter) {
        if (time_shutter < time_max_shutter) {
          time_shutter ++;
        } else {
          time_shutter = 0;
          open_shutter = false;
        }
      }
    } else if (state_winDecoration == 8) {
      if (open_blink) {
        if (time_blink < time_max_blink) {
          time_blink ++;
        } else {
          time_blink = 0;
          open_blink = false;
          time_max_blink = floor(random(4, 20));
          if (time_max_blink > 16) {
            num_blink = 2;
          } else {
            num_blink = 1;
          }
        }
      }

      if (open_flash) {
        if (time_flash < time_max_flash) {
          time_flash ++;
        } else {
          time_flash = 0;
          open_flash = false;
          time_max_flash = floor(random(4, 10));
          ran_flash = random(-999, 999);
          num_node_flash = floor(random(7, 16));
        }
      }
    } else if (state_winDecoration == 9) {
      time_fan += speed*scaleRate*0.003;
      if (time_fan > TWO_PI) {
        time_fan = time_fan % TWO_PI;
      }
    } else if (state_winDecoration == 10) {
      for (let i=0; i<time_breathe.length; i++) {
        if (time_breathe[i] < time_max_breathe) {
          time_breathe[i] ++;
        } else {
          time_breathe[i] = -60;
        }
      }

      if (open_LED_shine) {
        if (time_LED_shine < 12) {
          time_LED_shine ++ ;
        } else {
          open_LED_shine = false;
          time_LED_shine = 0;
        }
      }
    }



    if (state_winFrame == 10) {
      if (!open_follow) {
        if (open_openMouth) {
          if (time_speak < time_max_speak+time_delay_max_speak) {
            time_speak += lerp(speed, real(20), 0.4)/real(20);
          } else {
            open_openMouth = false;
            time_min_speak = time_speak - floor(random(5, 20)) - time_delay_max_speak;
            if (random(1) < 0.2) {
              time_delay_min_speak = -floor(random(5, 15));
            } else {
              time_delay_min_speak = 0;
            }
          }
        } else {
          if (time_speak > time_min_speak+time_delay_min_speak) {
            time_speak -= lerp(speed, real(20), 0.4)/real(20);
          } else {
            open_openMouth = true;
            time_max_speak = time_speak + floor(random(5, 20)) -time_delay_min_speak;
            if (random(1) < 0.2) {
              time_delay_max_speak = floor(random(5, 15));
            } else {
              time_delay_max_speak = 0;
            }
          }
        }
      } else {
        open_openMouth = false;
        if (time_speak > time_min_speak+time_delay_min_speak) {
          time_speak -= lerp(speed, real(20), 0.4)/real(20);
        }
      }
    }


    if (state_viewHeight == 4) {
      rotateX_viewHeight = 0;
      //rotateX_viewHeight = map(constrain(cameraY, -real(300), 0), -real(300), 0, 0, -0.05);
    }
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ update ⬆--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------









    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ camera ⬇--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    push();

    translate(0, 0, real(1000));
    if (open_follow) {
      if (!open_info) {
        roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.016, HALF_PI*0.016), 0.1);
        roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
      } else {
        //roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.5, HALF_PI*0.5), 0.1);
        //roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
        roY = easing_x(roY, map(mouseX, 0, width, -HALF_PI*0.016, HALF_PI*0.016), 0.1);
        roX = easing_x(roX, map(mouseY, 0, height, HALF_PI*0.015, -HALF_PI*0.015), 0.1);
      }
    } else {
      roY = easing_x(roY, 0, 0.1);
      roX = easing_x(roX, 0, 0.1);
    }
    rotateY(roY);
    rotateX(roX);

    translate(0, 0, -real(1000));

    if (mileage < real(200)) {
      cameraY = -real(800);
    } else if (mileage >= real(2000)  &&  mileage < real(7000)) {
      cameraY = map(mileage, real(2000), real(7000), -real(800), 0);
    } else if (mileage >= real(7000)  &&  mileage < mileage_end-real(3000)) {
      cameraY = 0;
    } else if (mileage >= mileage_end-real(3000)  &&  mileage < mileage_end) {
      if (cameraY == 0) {
        udgStation.addPoster(real(-2750));
      }
      cameraY = map(mileage, mileage_end-real(3000), mileage_end, 0, -real(800));
    } else if (mileage >= mileage_end) {
      cameraY = -real(800);
      mileage = 0;
      mileage_end = real(random(15000, 20000)*2);


      rate_normalHouse = floor(random(1, 11)) * 0.1;
      rate_constrHouse = 0;
      rate_catHouse = 0;
      rate_CTowerHouse = 0;
      rate_firewatchHouse = 0;
      rate_blockHouse = 0;
      rate_dottedHouse = 0;
      rate_orientHouse = 0;
      rate_UGHouse = 0;

      if (houseUsual1 == 0) {
      } else if (houseUsual1 == 1) {
        rate_constrHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 2) {
        rate_catHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 3) {
        rate_CTowerHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 4) {
        rate_firewatchHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 5) {
        rate_blockHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 6) {
        rate_dottedHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 7) {
        rate_orientHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual1 == 8) {
        rate_UGHouse += floor(random(1, 11)) * 0.1;
      }
      if (houseUsual2 == 0) {
      } else if (houseUsual2 == 1) {
        rate_constrHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 2) {
        rate_catHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 3) {
        rate_CTowerHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 4) {
        rate_firewatchHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 5) {
        rate_blockHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 6) {
        rate_dottedHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 7) {
        rate_orientHouse += floor(random(1, 11)) * 0.1;
      } else if (houseUsual2 == 8) {
        rate_UGHouse += floor(random(1, 11)) * 0.1;
      }
      if (houseRare1 == 0) {
      } else if (houseRare1 == 1) {
        rate_constrHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 2) {
        rate_catHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 3) {
        rate_CTowerHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 4) {
        rate_firewatchHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 5) {
        rate_blockHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 6) {
        rate_dottedHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 7) {
        rate_orientHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare1 == 8) {
        rate_UGHouse += floor(random(1, 6)) * 0.01;
      }
      if (houseRare2 == 0) {
      } else if (houseRare2 == 1) {
        rate_constrHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 2) {
        rate_catHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 3) {
        rate_CTowerHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 4) {
        rate_firewatchHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 5) {
        rate_blockHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 6) {
        rate_dottedHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 7) {
        rate_orientHouse += floor(random(1, 6)) * 0.01;
      } else if (houseRare2 == 8) {
        rate_UGHouse += floor(random(1, 6)) * 0.01;
      }




      if (open_river) {
        rate_river = floor(random(1, 6)) * 0.1;
        rate_bridge = floor(random(5, 20)) * 0.01;
      } else if (open_nightMarket) {
        rate_nightMarket = floor(random(1, 6)) * 0.1;
      }

      if (open_constrHouse) {
        rate_crane = 0.5;
      }

      if (open_CTowerHouse) {
        rate_CWall = floor(random(1, 9)) * 0.1;
      }

      if (open_dottedHouse) {
        rate_dino = max(floor(random(-7, 9))/10, 0);
        if (rate_dino == 0) {
          open_dino = false;
        } else {
          open_dino = true;
        }
      }





      rate_roof = 0;
      rate_handrail = 0;
      rate_crucifix = 0;
      rate_billboard = 1;
      rate_billboardRoof = 0;
      rate_billboardSide = 0;
      rate_ladder = 0;


      rate_billMc = 0;
      rate_billYoubetu = 0;
      rate_billTezos = 0;
      rate_billMessage = 0;
      rate_billLike = 0;
      rate_billCannotReturn = 0;
      rate_billCall = 0;
      rate_billPower = 0;
      rate_billBitcoin = 0;
      rate_billEthereum = 0;
      rate_billTelegram = 0;
      rate_parking = 0;
      rate_billMetro = 0;
      rate_billFile = 0;
      rate_tree = 0;
      rate_foliage = 0;
      rate_fair = 0;
      rate_paifang = 0;
      rate_PTTower = 0;
      rate_gazebo = 0;

      if (state_object_first == 0) {
      } else if (state_object_first == 1) {
        rate_roof += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 2) {
        rate_handrail += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 3) {
        rate_crucifix += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 4) {
        rate_billboardRoof += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 5) {
        rate_billboardSide += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 6) {
        rate_billboard += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 7) {
        rate_ladder += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 8) {
        rate_billMc += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 9) {
        rate_billYoubetu += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 10) {
        rate_billTezos += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 11) {
        rate_billBitcoin += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 12) {
        rate_billEthereum += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 13) {
        rate_billMessage += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 14) {
        rate_billLike += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 15) {
        rate_billCannotReturn += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 16) {
        rate_billCall += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 17) {
        rate_billPower += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 18) {
        rate_billMetro += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 19) {
        rate_billFile += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 20) {
        rate_billTelegram += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 21) {
        rate_parking += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 22) {
        rate_fair += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 23) {
        rate_tree += floor(random(5, 10)) * 0.1;
        rate_foliage += 1;
      } else if (state_object_first == 24) {
        rate_tree += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 25) {
        rate_gazebo += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 26) {
        rate_paifang += floor(random(5, 10)) * 0.1;
      } else if (state_object_first == 27) {
        rate_PTTower += floor(random(5, 10)) * 0.1;
      }


      if (state_object_second == 0) {
      } else if (state_object_second == 1) {
        rate_roof += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 2) {
        rate_handrail += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 3) {
        rate_crucifix += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 4) {
        rate_billboardRoof += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 5) {
        rate_billboardSide += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 6) {
        rate_billboard += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 7) {
        rate_ladder += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 8) {
        rate_billMc += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 9) {
        rate_billYoubetu += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 10) {
        rate_billTezos += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 11) {
        rate_billBitcoin += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 12) {
        rate_billEthereum += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 13) {
        rate_billMessage += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 14) {
        rate_billLike += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 15) {
        rate_billCannotReturn += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 16) {
        rate_billCall += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 17) {
        rate_billPower += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 18) {
        rate_billMetro += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 19) {
        rate_billFile += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 20) {
        rate_billTelegram += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 21) {
        rate_parking += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 22) {
        rate_fair += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 23) {
        rate_tree += floor(random(5, 10)) * 0.1;
        rate_foliage += 0.5;
      } else if (state_object_second == 24) {
        rate_tree += floor(random(5, 10)) * 0.1;
        if (open_foliage) {
          rate_foliage -= 0.5;
        }
      } else if (state_object_second == 25) {
        rate_gazebo += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 26) {
        rate_paifang += floor(random(5, 10)) * 0.1;
      } else if (state_object_second == 27) {
        rate_PTTower += floor(random(5, 10)) * 0.1;
      }


      if (state_object_third == 0) {
      } else if (state_object_third == 1) {
        rate_roof += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 2) {
        rate_handrail += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 3) {
        rate_crucifix += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 4) {
        rate_billboardRoof += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 5) {
        rate_billboardSide += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 6) {
        rate_billboard += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 7) {
        rate_ladder += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 8) {
        rate_billMc += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 9) {
        rate_billYoubetu += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 10) {
        rate_billTezos += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 11) {
        rate_billBitcoin += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 12) {
        rate_billEthereum += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 13) {
        rate_billMessage += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 14) {
        rate_billLike += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 15) {
        rate_billCannotReturn += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 16) {
        rate_billCall += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 17) {
        rate_billPower += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 18) {
        rate_billMetro += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 19) {
        rate_billFile += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 20) {
        rate_billTelegram += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 21) {
        rate_parking += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 22) {
        rate_fair += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 23) {
        rate_tree += floor(random(5, 10)) * 0.1;
        if (rate_foliage == 0.5) {
          rate_foliage = 0.6666;
        } else if (rate_foliage == 0) {
          rate_foliage = 0.3333;
        }
      } else if (state_object_third == 24) {
        rate_tree += floor(random(5, 10)) * 0.1;
        if (rate_foliage == 0.5) {
          rate_foliage = 0.3333;
        } else if (rate_foliage == 1.5) {
          rate_foliage = 0.6666;
        }
      } else if (state_object_third == 25) {
        rate_gazebo += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 26) {
        rate_paifang += floor(random(5, 10)) * 0.1;
      } else if (state_object_third == 27) {
        rate_PTTower += floor(random(5, 10)) * 0.1;
      }




      if (open_firework) {
        for (let i=0; i<song_boom.length; i++) {
          song_boom[i].stop();
        }
      }
      if (open_tornado) {
        for (let i=0; i<song_tornado.length; i++) {
          song_tornado[i].stop();
        }
      }
      if (open_darkCloud  &&  !open_sunBeam) {
        song_thunder.stop();
      }
      if (open_lightRail) {
        for (let i=0; i<song_trainPass.length; i++) {
          song_trainPass[i].stop();
        }
      }
      if (songs.length > 0) {
        for (let i=0; i<songs.length; i++) {
          songs[i].stop();
        }
        for (let i=0; i<songs.length; i++) {
          songs[i].setVolume(0);
          songs[i].loop();
        }
      }
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ camera ⬆--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------




    //udgStation
    translate(0, cameraY  +  map(Y_begin, 0, -real(134), real(250), 0), 0);
    if (cameraY > -real(10)) {
      is_onTheGround = true;
    } else {
      is_onTheGround = false;
    }
    //udgStation



    if (have_button_submerge  &&  open_shake) {
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
    vertex(endLine+real(600), skyline.y - real(3400), skyline.z);
    vertex(beginLine-real(100), skyline.y - real(3400), skyline.z);
    endShape(CLOSE);



    //fill(255);
    //beginShape();
    //texture(FRAME);
    //vertex(-real(3000), skyline.y+real(0.1), skyline.z, 0, 1);
    //vertex(real(3000), skyline.y+real(0.1), skyline.z, 1, 1);
    //vertex(real(3000), skyline.y - real(3000), skyline.z, 1, 0);
    //vertex(-real(3000), skyline.y - real(3000), skyline.z, 0, 0);
    //endShape(CLOSE);
    //fill(255);




    if (have_button_jump  &&  open_jump) {
      translate(0, map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
    }

    //if (state_viewHeight == 4) {
    //  rotateX(rotateX_viewHeight);
    //}

    if (!open_info  &&  !open_mode_line) {
      //--------------------------------------------------------------------------------------------------------------------------------------------------------
      //------------------------------⬇ display ⬇-------------------------------------------------------------------------------------------------------------
      //--------------------------------------------------------------------------------------------------------------------------------------------------------
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].display();
        }
      }



      noStroke();
      beginShape(TRIANGLES);
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          //if ((blocks[i].index_z == 0  &&  blocks[i].begin.x < real(750)  &&  blocks[i].begin.x+blocks[i].W > real(-550))       ||  
          //  (blocks[i].index_z == 1  &&  blocks[i].begin.x < real(1000)  &&  blocks[i].begin.x+blocks[i].W > real(-1000))       ||
          //  (blocks[i].index_z == 2  &&  blocks[i].begin.x < real(1350)  &&  blocks[i].begin.x+blocks[i].W > real(-1350))       ||
          //  (blocks[i].index_z == 3  &&  blocks[i].begin.x < real(1700)  &&  blocks[i].begin.x+blocks[i].W > real(-1700))       ||
          //  (blocks[i].index_z == 4  &&  blocks[i].begin.x < real(2050)  &&  blocks[i].begin.x+blocks[i].W > real(-2050))       ||
          //  (blocks[i].index_z == 5  &&  blocks[i].begin.x < real(2350)  &&  blocks[i].begin.x+blocks[i].W > real(-2350))) {

          blocks[i].display_TRIANGLES();




          if (blocks[i].isSea) {
            if (blocks[i].isSkerry) {
              blocks[i].skerry.display();
            }
            if (blocks[i].index_z == 5) {
              blocks[i].sea.display();
            }
          }

          //if (!blocks[i].open_desert) {
          //blocks[i].display_coverRoad();
          //}

          //blocks[i].display_lamp_hor();
          //}
        }



        for (let i=0; i<blocks.length; i++) {
          if (blocks[i].isRiver) {
            blocks[i].display_river();
          }
        }

        if (open_mountain) {
          mountain.display();
        }
      }


      if (roadVer.length > 0) {
        for (let i=0; i<roadVer.length; i++) {
          roadVer[i].display();
          roadVer[i].display_lamp();
        }
      }
      if (roadHor.length > 0) {
        for (let i=0; i<roadHor.length; i++) {
          for (let j=0; j<roadHor[i].length; j++) {
            roadHor[i][j].display();
            roadHor[i][j].display_lamp();
          }
        }
      }




      if (open_lightRail) {
        for (let i=0; i<num_rail; i++) {
          lightRails[i].display();
        }
      }






      if (have_button_submerge  ||  open_mountain) {
        //noStroke();
        fill(c_sky);
        //beginShape();
        //vertex(beginLine, skyline.y+real(2), skyline.z);
        //vertex(endLine, skyline.y+real(2), skyline.z);
        //vertex(endLine, skyline.y+real(2), 0);
        //vertex(beginLine, skyline.y+real(2), 0);
        //endShape(CLOSE);
        TRIANGLES_getRect(createVector(beginLine, skyline.y+real(2), skyline.z), 
          createVector(endLine, skyline.y+real(2), skyline.z), 
          createVector(endLine, skyline.y+real(2), -real(1)), 
          createVector(beginLine, skyline.y+real(2), -real(1)));
      }




      if (open_desert) {

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
      }













      if (open_rain || open_typhoon || open_snow) {
        //noStroke();
        //beginShape(TRIANGLES);

        if (rainyday.length > 0) {
          for (let i=0; i<rainyday.length; i++) {
            rainyday[i].display();
          }
        }
        //endShape();
      }






      if (open_waterDrop) {
        if (waterDrop.length > 0) {
          //noStroke();
          fill(lerpColor(c_near, c_far, 0.75));
          //beginShape(TRIANGLES);
          for (let i=0; i<waterDrop.length; i++) {
            waterDrop[i].display();
          }
          //endShape();
        }
      }





      if (open_darkCloud) {

        let Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));

        let var_lerpColor_darkCloud = 0.15;//map(noise(mileage/5000.0), 0, 1, 0.01,0.2);


        let c = c_winFrame;
        if (!open_sunBeam) {
          if (time_thunder != 0  &&  time_thunder < time_max_thunder/18) {
            c = lerpColor(c_winFrame, c_sky, random(0, 1));
            if (have_button_invert) {
              c = lerpColor(c_winFrame_copy, c_sky_copy, random(0, 1));
            }
          }
        }

        TRIANGLES_getRect_fill4(
          createVector(real(-2500), skyline.y-real(3000), skyline.z+real(2)), 
          createVector(real(2500), skyline.y-real(3000), skyline.z+real(2)), 
          createVector(real(2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(-2500), Y_darkCloud, skyline.z+real(2)), 
          c, c, lerpColor(c, c_sky, var_lerpColor_darkCloud), lerpColor(c, c_sky, var_lerpColor_darkCloud)
          );

        TRIANGLES_getRect_fill4(
          createVector(real(-2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(2500), skyline.y, skyline.z+real(2)), 
          createVector(real(-2500), skyline.y, skyline.z+real(2)), 
          lerpColor(c, c_sky, var_lerpColor_darkCloud), lerpColor(c, c_sky, var_lerpColor_darkCloud), c_sky, c_sky
          );



        //TRIANGLES_getRect_fill4( 
        //  createVector(real(-500), skyline.y-real(1000), skyline.z+real(3)), 
        //  createVector(real(500), skyline.y-real(1000), skyline.z+real(3)), 
        //  createVector(real(500), skyline.y, skyline.z+real(3)), 
        //  createVector(real(-500), skyline.y, skyline.z+real(3)), 
        //  addAlphaToColor(color(255, 0, 0), 255), c_sky, c_sky, c_sky
        //  );




        if (open_sunBeam) {
          if (sunBeam.length > 0) {
            for (let i=0; i<sunBeam.length; i++) {
              sunBeam[i].display();
            }
          }
        }
      }



      if (open_tornado) {
        if (tornado.length > 0) {
          for (let i=0; i<tornado.length; i++) {
            tornado[i].display();
          }
        }
      }





      if (open_firework) {
        if (firework.length > 0) {
          for (let i=0; i<firework.length; i++) {
            firework[i].display();
          }
        }
      }



      if (open_hugeMoon) {
        const var_c = map(noise(frameCount*0.01), 0, 1, 5, 30);
        for (let i=0; i<node_moon.length; i++) {
          if (i < floor(node_moon.length/4.0)  ||  i > floor(node_moon.length/4.0*3)) {
            let c1 = lerpColor(c_sky, c_sky_near, map(node_moon[i].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
            let c2 = lerpColor(c_sky, c_sky_near, map(node_moon[(i+1)%node_moon.length].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
            let c3 = lerpColor(c_sky, c_sky_near, map(node_moon[(node_moon.length+(floor(node_moon.length/2)-i-1))%node_moon.length].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
            let c4 = lerpColor(c_sky, c_sky_near, map(node_moon[(node_moon.length+(floor(node_moon.length/2.0)-i))%node_moon.length].y, skyline.y+real(0.1), skyline.y-real(2900), 0, 1));
            c1 = changeBrightness(c1, constrain(map(sin(map(center_moon.y-node_moon[i].y, -W_moon/2.0, W_moon/2.0, HALF_PI, PI-HALF_PI*0.5)), 1, 0, 0, var_c), 0, var_c));
            c2 = changeBrightness(c2, constrain(map(sin(map(center_moon.y-node_moon[(i+1)%node_moon.length].y, -W_moon/2.0, W_moon/2.0, HALF_PI, PI-HALF_PI*0.5)), 1, 0, 0, var_c), 0, var_c));
            c3 = changeBrightness(c3, constrain(map(sin(map(center_moon.y-node_moon[(node_moon.length+(floor(node_moon.length/2)-i-1))%node_moon.length].y, -W_moon/2.0, W_moon/2.0, HALF_PI, PI-HALF_PI*0.5)), 1, 0, 0, var_c), 0, var_c));
            c4 = changeBrightness(c4, constrain(map(sin(map(center_moon.y-node_moon[(node_moon.length+(floor(node_moon.length/2.0)-i))%node_moon.length].y, -W_moon/2.0, W_moon/2.0, HALF_PI, PI-HALF_PI*0.5)), 1, 0, 0, var_c), 0, var_c));

            TRIANGLES_getRect_fill4(node_moon[i], node_moon[(i+1)%node_moon.length], node_moon[(node_moon.length+(floor(node_moon.length/2)-i-1))%node_moon.length], node_moon[(node_moon.length+(floor(node_moon.length/2.0)-i))%node_moon.length], c1, c2, c3, c4);
          }
        }
      }




      if (!is_onTheGround) {
        udgStation.display_TRIANGLES(); //udgStation
      }




      if (state_viewHeight == 0) {
        fill(c_near);
        TRIANGLES_getRect(
          createVector(beginLine-real(100), skyline.y-real(10), -real(0.5)), 
          createVector(endLine+real(600), skyline.y-real(10), -real(0.5)), 
          createVector(endLine+real(600), skyline.y+real(100), -real(0.5)), 
          createVector(beginLine-real(100), skyline.y+real(100), -real(0.5))
          );
      }


      endShape();




      if (open_lightRail) {
        for (let i=0; i<num_rail; i++) {
          if (lightRails[i].train.length > 0) {
            for (let j=0; j<lightRails[i].train.length; j++) {
              lightRails[i].train[j].display_win();
            }
          }
        }
      }







      if (!is_onTheGround) {
        udgStation.display(); //udgStation
      }


      if (open_flood) {
        noStroke();
        beginShape(TRIANGLES);
        texture(FLOOD);  
        TRIANGLES_getRect_uv(
          createVector(beginLine, skyline.y-real(75*1.5), skyline.z), 
          createVector(endLine, skyline.y-real(75*1.5), skyline.z), 
          createVector(endLine, skyline.y-real(75*1.5), real(100)), 
          createVector(beginLine, skyline.y-real(75*1.5), real(100)), 
          createVector(0, 0), createVector(1, 0), createVector(1, 1), createVector(0, 1)
          );

        if (!is_onTheGround  ||  state_viewHeight == 0) {
          TRIANGLES_getRect_uv(
            createVector(beginLine, skyline.y-real(75*1.5), real(100)), 
            createVector(endLine, skyline.y-real(75*1.5), real(100)), 
            createVector(endLine, skyline.y+real(1800), real(100)), 
            createVector(beginLine, skyline.y+real(1800), real(100)), 
            createVector(0, 1), createVector(1, 1), createVector(1, 0), createVector(0, 0)
            );
        }
        endShape();
        fill(255);
      }








      //--------------------------------------------------------------------------------------------------------------------------------------------------------
      //------------------------------⬆ display ⬆-------------------------------------------------------------------------------------------------------------
      //--------------------------------------------------------------------------------------------------------------------------------------------------------
    } else {




      //--------------------------------------------------------------------------------------------------------------------------------------------------------
      //------------------------------⬇ displayInfo ⬇----------------------------------------------------------------------------------------------------------
      //--------------------------------------------------------------------------------------------------------------------------------------------------------


      //------------------------------ c_infoRed

      noFill();
      stroke(c_infoRed);
      strokeWeight(real(2));
      beginShape(LINES);
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].displayInfo_red();
        }
      }
      endShape();



      //------------------------------ c_info2
      stroke(c_info2);
      strokeWeight(real(2));
      beginShape(LINES);
      if (blocks.length > 0) {
        for (let i=0; i<blocks.length; i++) {
          blocks[i].displayInfo();
        }
      }
      if (open_snow) {
        if (rainyday.length > 0) {
          for (let i=0; i<rainyday.length; i+=2) {
            rainyday[i].displayInfo();
          }
        }
      }



      if (!is_onTheGround) {
        udgStation.displayInfo(); //udgStation
      }

      endShape();




      //------------------------------ c_infoYellow
      stroke(c_infoYellow);
      strokeWeight(real(2));
      beginShape(LINES);
      for (let i=0; i<blocks.length; i++) {
        if (blocks[i].isSea) {
          if (blocks[i].isSkerry) {
            blocks[i].skerry.displayInfo();
          }
          if (blocks[i].index_z == 5) {
            blocks[i].sea.displayInfo();
          }
        }

        if (blocks[i].isRiver) {
          if (blocks[i].index_z == 0) {
            blocks[i].river.displayInfo();
          }
        }
      }


      if (open_mountain) {
        mountain.displayInfo();
      }


      if (open_darkCloud) {
        let Y_darkCloud = map(noise(mileage/5000.0), 0, 1, skyline.y-real(1000), skyline.y-real(2500));

        LINES_getLine(createVector(-real(2500), Y_darkCloud, skyline.z+real(2)), createVector(real(2500), Y_darkCloud, skyline.z+real(2)));

        if (open_sunBeam) {
          if (sunBeam.length > 0) {
            for (let i=0; i<sunBeam.length; i++) {
              sunBeam[i].displayInfo();
            }
          }
        }
      }



      if (open_tornado) {
        if (tornado.length > 0) {
          for (let i=0; i<tornado.length; i++) {
            tornado[i].displayInfo();
          }
        }
      }


      if (open_firework) {
        if (firework.length > 0) {
          for (let i=0; i<firework.length; i++) {
            firework[i].displayInfo();
          }
        }
      }


      if (open_hugeMoon) {
        for (let i=0; i<node_moon.length; i+=2) {
          LINES_getLine(node_moon[i], node_moon[(i+2)%node_moon.length]);
        }
      }

      endShape();




      //------------------------------ c_infoGreen
      stroke(c_infoGreen);
      strokeWeight(real(2));
      beginShape(LINES);
      //for (let i=0; i<blocks.length; i++) {
      //blocks[i].displayInfo_lamp();
      // }

      if (roadVer.length > 0) {
        for (let i=0; i<roadVer.length; i++) {
          roadVer[i].displayInfo();
        }
      }
      if (roadHor.length > 0) {
        for (let i=0; i<roadHor.length; i++) {
          for (let j=0; j<roadHor[i].length; j++) {
            roadHor[i][j].displayInfo();
          }
        }
      }
      //for (let i=0; i<5; i++) {
      //  let z = (i+1) * (-real(100)*5 - gap_block);
      //  LINES_getLine(createVector(beginLine, skyline.y, z + gap_block*0.25), createVector(endLine, skyline.y, z + gap_block*0.25));
      //  LINES_getLine(createVector(beginLine, skyline.y, z + gap_block*0.75), createVector(endLine, skyline.y, z + gap_block*0.75));
      //}






      endShape();



      //------------------------------ c_infoGreen2
      if (open_lightRail) {
        stroke(c_infoGreen2);
        strokeWeight(real(1.5));
        beginShape(LINES);
        if (blocks.length > 0) {
          for (let i=0; i<blocks.length; i++) {
            if (blocks[i].isRail) {
              if (!blocks[i].isRiver) {

                for (let l=0; l<blocks[i].node_pier.length; l++) {
                  for (let j=0; j<blocks[i].node_pier[l].length; j++) {
                    for (let k=0; k<blocks[i].node_pier[l][j].length; k++) {
                      LINES_getLine(blocks[i].node_pier[l][j][k], blocks[i].node_pier[l][j][(k+1)%blocks[i].node_pier[l][j].length]);
                    }
                  }
                  for (let k=0; k<blocks[i].node_pier[l][0].length; k++) {
                    LINES_getLine(blocks[i].node_pier[l][0][k], blocks[i].node_pier[l][1][k]);
                  }
                }
              }
            }
          }
        }
        for (let i=0; i<num_rail; i++) {
          lightRails[i].displayInfo();
        }



        endShape();
      }


      //------------------------------ c_info2 0.25
      if (open_rain || open_waterDrop || open_typhoon) {
        stroke(c_info2);
        strokeWeight(real(0.25));
        beginShape(LINES);

        if (open_rain || open_typhoon) {
          if (rainyday.length > 0) {
            for (let i=0; i<rainyday.length; i+=4) {
              rainyday[i].displayInfo();
            }
          }
        }


        if (open_waterDrop) {
          if (waterDrop.length > 0) {
            for (let i=0; i<waterDrop.length; i++) {
              waterDrop[i].displayInfo();
            }
          }
        }

        endShape();
      }
      //--------------------------------------------------------------------------------------------------------------------------------------------------------
      //------------------------------⬆ displayInfo ⬆----------------------------------------------------------------------------------------------------------
      //--------------------------------------------------------------------------------------------------------------------------------------------------------
    }

    //if (state_viewHeight == 4) {
    //  rotateX(-rotateX_viewHeight);
    //}



    if (have_button_submerge  &&  open_shake) {
      translate(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
    }




    if (have_button_jump  &&  open_jump) {
      translate(0, -map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
    }


    if (!open_info) {

      if (open_TVScreen) {
        if (time_TVSnow < 10) {
          time_TVSnow ++;
        }

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
              if (have_button_shine) {
                a -= sin(map(time_billboard, 0, 10, 0, PI)) * 100;
              }
              a += map(time_TVSnow, 0, 10, 255, 0);
              a = constrain(a, 0, 255);
              TVSCREEN.set(i, j, addAlphaToColor(c, a));
            } else {
              a = 255;
              let t = random(0.45, 0.75);
              if (have_button_shine  &&  time_billboard > 0) {
                t = random(map(sin(map(time_billboard, 0, 10, 0, PI)), 0, 1, 0.45, 0.7), map(sin(map(time_billboard, 0, 10, 0, PI)), 0, 1, 0.75, 1));
              }

              t -= constrain(map(d, TVSCREEN.width*0.2, TVSCREEN.width*0.45, 0, 0.65), 0, 0.65);
              //t -= constrain(map(d, TVSCREEN.width*0.25, TVSCREEN.width*0.5, 0, 0.5), 0, 0.5);
              t -= map(time_TVSnow, 0, 10, 1, 0);
              t = constrain(t, 0, 0.75);
              c = lerpColor(c_winFrame, c_sky, t);


              //d = dist(i, j, map(mouseX, real(65), real(435), 0, TVSCREEN.width), map(mouseY, real(65), real(435), 0, TVSCREEN.height));
              //a = constrain(map(d, TVSCREEN.width*0.02, TVSCREEN.width* 0.1, 0, 255), 0, 255);

              TVSCREEN.set(i, j, addAlphaToColor(c, a));
            }
          }
        }
        TVSCREEN.updatePixels();
        noStroke();
        beginShape();
        texture(TVSCREEN);
        vertex(-real(115), -real(115)-cameraY, real(197), 0, 0);
        vertex(real(115), -real(115)-cameraY, real(197), 1, 0);
        vertex(real(115), real(115)-cameraY, real(197), 1, 1);
        vertex(-real(115), real(115)-cameraY, real(197), 0, 1);
        endShape();
        fill(255);
      }


      if (open_fog) {
        FOG_display();
      }
    }


    translate(0, -cameraY, 0);  //udgStation


    if (state_winDecoration == 5  &&  !open_info) {
      noStroke();
      fill(255);
      beginShape();
      texture(FRAME);
      vertex(-width*0.5, -height*0.5, real(200), 0, 0);
      vertex(width*0.5, -height*0.5, real(200), 1, 0);
      vertex(width*0.5, height*0.5, real(200), 1, 1);
      vertex(-width*0.5, height*0.5, real(200), 0, 1);
      endShape(CLOSE);
      fill(255);
    } else {
      drawWinFrame(real(WH_winFrame[state_winFrame][0]), real(WH_winFrame[state_winFrame][1]), real(WH_winFrame[state_winFrame][2]), WH_winFrame[state_winFrame][3], WH_winFrame[state_winFrame][4], real(WH_winFrame[state_winFrame][5]));
    }


    //if (!open_info) {
    //card.display();
    //}


    pop();







    if (open_info) {
      PG.clear();
      displayInfo();
      // displayInfo_true();
      image(PG, -width/2, -height/2, width, height);
    }
  }












  if (!done_begin_ani) {
    //------- loadSongs -------

    let X_door = 0;
    if (open_play) {
      Y_begin = max(map(speed, 0, ori_speed*0.1, 0, -real(134)), -real(134));
      X_door = constrain(map(speed, ori_speed*0.0125, ori_speed*0.125, 0, -real(94)), -real(94), 0);
      if (X_door <= -real(93)) {
        done_begin_ani = true;
      }
    }

    if (var_loading == 1) {
      div.html('Click the Screen');
    }






    var_loading = easing_x(var_loading, max(0.1, count_songs/totalSongs), 0.1);

    let node = new Array(node_BT.length);
    for (let i=0; i<node_BT.length; i++) {
      node[i] = new Array(node_BT[i].length);
      for (let j=0; j<node_BT[i].length; j++) {
        node[i][j] = createVector(node_BT[i][j][0], node_BT[i][j][1], 0);
        node[i][j].mult(real(70)/100.0);
        node[i][j].add(-real(70)/2.0, -real(48)+Y_begin, real(272));
      }
    }
    let sum_length = 0;
    for (let i=0; i<node.length; i++) {
      for (let j=0; j<node[i].length; j++) {
        sum_length += p5.Vector.dist(node[i][j], node[i][(j+1)%node[i].length]);
      }
    }

    const current_length = var_loading * sum_length;
    let current_node = node[0][0].copy();
    let current_i = 0;
    let current_j = 0;

    let s_length = 0;
    for (let i=0; i<node.length; i++) {
      for (let j=0; j<node[i].length; j++) {
        let l = p5.Vector.dist(node[i][j], node[i][(j+1)%node[i].length]);
        s_length += l;
        if (current_length <= s_length) {
          current_i = i;
          current_j = j;
          current_node = p5.Vector.sub(node[i][(j+1)%node[i].length], node[i][j]).mult(1-(s_length-current_length)/l).add(node[i][j]);
          i = node.length-1;
          j = node[i].length-1;
          break;
        }
      }
    }




    //background(c_winFrame);
    noStroke();
    beginShape(TRIANGLES);
    fill(lerpColor(c_winFrame, c_sky, 0.5));
    TRIANGLES_getRect(
      createVector(-real(94), -real(94)+Y_begin, real(271)), 
      createVector(real(94), -real(94)+Y_begin, real(271)), 
      createVector(real(94), real(20)+Y_begin, real(271)), 
      createVector(-real(94), real(20)+Y_begin, real(271))
      );

    fill(c_winFrame);
    TRIANGLES_getRect(
      createVector(-real(94), real(20)+Y_begin, real(271)), 
      createVector(real(94), real(20)+Y_begin, real(271)), 
      createVector(real(94), real(40)+Y_begin, real(271)), 
      createVector(-real(94), real(40)+Y_begin, real(271))
      );


    TRIANGLES_getRect(
      createVector(-real(94), real(40)+Y_begin+real(10), real(272)), 
      createVector(0+X_door-real(10), real(40)+Y_begin+real(10), real(272)), 
      createVector(0+X_door-real(10), real(188+40)+Y_begin-real(10), real(272)), 
      createVector(-real(94), real(188+40)+Y_begin-real(10), real(272))
      );
    TRIANGLES_getRect(
      createVector(-X_door+real(10), real(40)+Y_begin+real(10), real(272)), 
      createVector(real(94), real(40)+Y_begin+real(10), real(272)), 
      createVector(real(94), real(188+40)+Y_begin-real(10), real(272)), 
      createVector(-X_door+real(10), real(188+40)+Y_begin-real(10), real(272))
      );

    fill(lerpColor(c_winFrame, c_sky, 0.125));
    TRIANGLES_getRect(
      createVector(-real(94), real(40)+Y_begin, real(271)), 
      createVector(0+X_door, real(40)+Y_begin, real(271)), 
      createVector(0+X_door, real(188+40)+Y_begin, real(271)), 
      createVector(-real(94), real(188+40)+Y_begin, real(271))
      );
    TRIANGLES_getRect(
      createVector(-X_door, real(40)+Y_begin, real(271)), 
      createVector(real(94), real(40)+Y_begin, real(271)), 
      createVector(real(94), real(188+40)+Y_begin, real(271)), 
      createVector(-X_door, real(188+40)+Y_begin, real(271))
      );

    if (var_loading == 1) {
      if (frameCount%16<8) {
        fill(c_sky);
      }
    } else {
      fill(lerpColor(c_winFrame, c_sky, 0.125));
    }
    TRIANGLES_getShape(getNode_ellipse(0, real(30)+Y_begin, real(272), real(10), real(5), 8));

    endShape();



    noFill();
    stroke(c_sky);
    strokeWeight(real(0.5));
    beginShape(LINES);
    s_length = 0;
    for (let i=0; i<node.length; i++) {
      for (let j=0; j<node[i].length; j++) {

        if (current_i == i  &&  current_j == j) {
          LINES_getLine(node[i][j], current_node);
          i = node.length-1;
          j = node[i].length-1;
          break;
        } else {
          LINES_getLine(node[i][j], node[i][(j+1)%node[i].length]);
        }
      }
    }


    LINES_getEllipse(getNode_rect_fillet(-real(45), -real(48)+real(10.5/2.0)-real(25)+Y_begin, real(272), real(90), real(50), real(7), 4));


    endShape();

    stroke(255, 0, 0);
    strokeWeight(real(3));
    //point(current_node);


    noFill();
    if (var_loading == 1) {
      fill(c_sky);
    }
    stroke(c_sky);
    strokeWeight(real(10));
    //arc(0, 0, 80, 80, -HALF_PI, -HALF_PI +  var_loading*TWO_PI, OPEN);
  }
}











function FS_rand(a, b) {
  const var_min = Math.min(a, b);
  const var_max = Math.max(a, b);
  //return fxrand()*(var_max-var_min) + var_min;
  return Math.random()*(var_max-var_min) + var_min;
}


function remap(value, x1, x2, y1, y2) {
  return y1 + (y2 - y1) * (value - x1) / (x2 - x1);
}



function windowResized() {
  location.reload();
}

//@funnysandwich
