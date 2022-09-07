/*
 ---------
 test05
 
 从 metro_220704_split04 改的，因为之前偷懒，新的东西直接加在 split04 里面
 
 新增地下车站的周期
 把横的广告宽高比例改成3：1
 新增竖的广告牌
 把权力还给 roadHor 和 roadVer
 
 
 
 
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
let speed, mileage, mileage_end;
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
let open_constrSite, rate_constrSite;
let open_paifang, rate_paifang;
let open_PTTower, rate_PTTower;
let open_gazebo, rate_gazebo;


let rate_normalHouse;
let open_constrHouse, rate_constrHouse, open_catHouse, rate_catHouse;
let open_CTowerHouse, rate_CTowerHouse;
let open_firewatchHouse, rate_firewatchHouse;
let open_blockHouse, rate_blockHouse;
let open_dottedHouse, rate_dottedHouse;
let open_UGHouse, rate_UGHouse;
let open_orientHouse, rate_orientHouse;


let open_river, rate_river;
let open_nightMarket, rate_nightMarket, isNightMarket_next=false;
let open_mountain;
let open_sea;
let open_lightRail;




let open_rain;
let open_waterDrop;
let open_fog;
let open_lineSky;
let open_darkCloud;
let open_sunBeam;
let open_typhoon;
let open_tornado;
let open_snow;
let open_firework;
let open_hugeMoon;


let open_flood;
let open_desert;



let open_TVScreen, open_winScreen;








let state_click;



let state_floor;
let stateVar_floor = [];
let H_floor;




const WH_winFrame = [
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
  [225, 225, 15, 1, 0, 0]
];
let state_winFrame;

let state_winDecoration;

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
  ["#a8a390", "#723d31", "#380303", "#09040c"], 
  ["#fee4a2", "#959a8b", "#293538", "#111517"], 
  ["#712c37", "#80979e", "#222d2f"], 
  ["#4c6363", "#0d2d3c", "#1f4a53", "#031217", "#000002"], 
  ["#beb6ac", "#92a79e", "#45403c", "#181e1f"], 
  ["#9fb6bc", "#cfc7bd", "#3a4f4f", "#211f1e"], 
  ["#712c37", "#d28139", "#380303", "#09040c"]


];
const state_c_all = [
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
  [0, 1, 2, 0, 0, 0], 
  [0, 1, 1, 0, 0, 0], 
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
  [1, 2, 3, 1, 0, 1]
];
let state_color;

let state_gap_block;

let state_W_road;
let W_road_basic;









let have_button_stop, have_button_sprint, have_button_jump;
let have_button_regenerate, have_button_shine, have_button_submerge, have_button_spring;
let have_button_invert;




//------- loadSongs -------
let song_track;
let songs = [];
let count_songs = 0;//0
let totalSongs = 3;//0
let is_song_load_done = false;//false
let open_play = false;

let var_loading = 0.0;




function loadingSound(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    songs.push(sound);
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}
function loadingSound_track(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    song_track = sound;
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}



let data = {};
function preload() {
  data = loadJSON('data/test.json');
}








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




  let varData = data.mainVar;
  //print(varData.length);


  const loadingPath_pre = "https://funnysandwich.github.io/BlockTrain/";
  let loadingPath = "Bounces/track/blocktrain_track.mp3";
  loadingSound_track(loadingPath_pre + loadingPath);



  loadingPath = "Bounces/Window/MP3/";
  state_color = 0;
  if (varData.split01.color == 0) {
    state_color = 0;
    loadingSound(loadingPath_pre + loadingPath + "Car7.mp3");
  } else if (varData.split01.color == 1) {
    state_color = 1;
    loadingSound(loadingPath_pre + loadingPath + "Car2.mp3");
  } else if (varData.split01.color == 2) {
    state_color = 2;
    loadingSound(loadingPath_pre + loadingPath + "Car9.mp3");
  } else if (varData.split01.color == 3) {
    state_color = 3;
    loadingSound(loadingPath_pre + loadingPath + "Car1.mp3");
  } else if (varData.split01.color == 4) {
    state_color = 4;
    loadingSound(loadingPath_pre + loadingPath + "Car6.mp3");
  } else if (varData.split01.color == 5) {
    state_color = 5;
    loadingSound(loadingPath_pre + loadingPath + "Car12.mp3");
  } else if (varData.split01.color == 6) {
    state_color = 6;
    loadingSound(loadingPath_pre + loadingPath + "Car11.mp3");
  } else if (varData.split01.color == 7) {
    state_color = 7;
    loadingSound(loadingPath_pre + loadingPath + "Car10.mp3");
  } else if (varData.split01.color == 8) {
    state_color = 8;
    loadingSound(loadingPath_pre + loadingPath + "Car4.mp3");
  } else if (varData.split01.color == 9) {
    state_color = 9;
    loadingSound(loadingPath_pre + loadingPath + "Car5.mp3");
  } else if (varData.split01.color == 10) {
    state_color = 10;
    loadingSound(loadingPath_pre + loadingPath + "Car3.mp3");
  } else if (varData.split01.color == 11) {
    state_color = 11;
    loadingSound(loadingPath_pre + loadingPath + "Car8.mp3");
  } else if (varData.split01.color == 12) {
    state_color = 12;
    loadingSound(loadingPath_pre + loadingPath + "Car14.mp3");
  } else if (varData.split01.color == 13) {
    state_color = 13;
    loadingSound(loadingPath_pre + loadingPath + "Car13.mp3");
  }






















  roY = 0;
  roX = 0;
  cameraY = -real(800);
  speed = 0;
  mileage = 0;
  mileage_end = real(random(15000, 20000)*2);
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
  c_win = color(c_all[state_color][state_c_all[state_color][5]]);

  c_info1 = lerpColor(c_far, c_winFrame, 0.627);
  c_info2 = lerpColor(c_far, c_near, 0.35);
  c_infoRed = lerpColor(c_sky, color(255, 0, 0), 0.25);
  c_infoGreen = lerpColor(c_sky, color(0, 128, 0), 0.25);
  c_infoGreen2 = lerpColor(c_info1, color(0, 160, 0), 0.5);
  c_infoYellow = lerpColor(c_sky, color(160, 100, 0), 0.5);


  background(c_winFrame);
  document.bgColor = c_all[state_color][state_c_all[state_color][2]];





  state_winFrame = WH_winFrame.length-1;
  if (varData.split01.window == 0) {
    state_winFrame = 0;
  } else if (varData.split01.window == 1) {
    state_winFrame = 1;
  } else if (varData.split01.window == 2) {
    state_winFrame = 2;
  } else if (varData.split01.window == 3) {
    state_winFrame = 3;
  } else if (varData.split01.window == 4) {
    state_winFrame = 4;
  } else if (varData.split01.window == 5) {
    state_winFrame = 5;
  } else if (varData.split01.window == 6) {
    state_winFrame = 6;
  } else if (varData.split01.window == 7) {
    state_winFrame = 7;
  } else if (varData.split01.window == 8) {
    state_winFrame = 8;
  } else if (varData.split01.window == 9) {
    state_winFrame = 9;
  }


  state_winDecoration = 0;
  if (varData.split01.frame == 0) {
    state_winDecoration = 0;
  } else if (varData.split01.frame == 1) {
    state_winDecoration = 1;
  } else if (varData.split01.frame == 2) {
    state_winDecoration = 2;
  } else if (varData.split01.frame == 3) {
    state_winDecoration = 3;
  } else if (varData.split01.frame ==4) {
    state_winDecoration = 4;
  } else if (varData.split01.frame == 5) {
    state_winDecoration = 5;
  } else if (varData.split01.frame == 6) {
    state_winDecoration = 6;
  }


  if (state_winFrame == 8  ||  state_winFrame == 9) {
    state_winDecoration = 0;
  }
  
  
  
  state_gap_block = 0;


  state_W_road = 0;
  W_road_basic = real(150);
  
  if (state_W_road == 0) {
    W_road_basic = real(150);
  }








  open_desert = false;
  open_flood = false;
  open_sea = false;
  open_mountain = false;

  loadingPath = "Bounces/Building/MP3/";
  if (varData.split02.landscape == 0) {
    loadingSound(loadingPath_pre + loadingPath + "Default.mp3");
  } else if (varData.split02.landscape == 1) {
    open_desert = true;
    loadingSound(loadingPath_pre + loadingPath + "Desert.mp3");
  } else if (varData.split02.landscape == 2) {
    open_flood = true;
    loadingSound(loadingPath_pre + loadingPath + "Water.mp3");
  } else if (varData.split02.landscape == 3) {
    open_sea = true;
    loadingSound(loadingPath_pre + loadingPath + "Ocean.mp3");
  } else if (varData.split02.landscape == 4) {
    open_mountain = true;
    loadingSound(loadingPath_pre + loadingPath + "Mountain.mp3");
  }




  rate_normalHouse = 1;
  rate_constrHouse = 0;
  rate_catHouse = 0;
  rate_CTowerHouse = 0;
  rate_firewatchHouse = 0;
  rate_blockHouse = 0;
  rate_dottedHouse = 0;
  rate_orientHouse = 0;
  rate_UGHouse = 0;


  rate_normalHouse = varData.split02.house.house_normal;
  rate_constrHouse = varData.split02.house.house_construction;
  rate_catHouse = varData.split02.house.house_cat;
  rate_CTowerHouse = varData.split02.house.house_castle;
  rate_firewatchHouse = varData.split02.house.house_firewatch;
  rate_blockHouse = varData.split02.house.house_block;
  rate_dottedHouse = varData.split02.house.house_dotted;
  rate_orientHouse = varData.split02.house.house_orient;
  rate_UGHouse = varData.split02.house.house_underground;


  rate_normalHouse = max(0, rate_normalHouse);
  rate_constrHouse = max(0, rate_constrHouse);
  rate_catHouse = max(0, rate_catHouse);
  rate_CTowerHouse = max(0, rate_CTowerHouse);
  rate_firewatchHouse = max(0, rate_firewatchHouse);
  rate_blockHouse = max(0, rate_blockHouse);
  rate_dottedHouse = max(0, rate_dottedHouse);
  rate_orientHouse = max(0, rate_orientHouse);
  rate_UGHouse = max(0, rate_UGHouse);







  stateVar_floor.push([0.4, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8, 2, 8]); //0:正常
  stateVar_floor.push([0.4, 2, 2, 1.5, 2, 3, 4, 6, 7, 8, 11, 14, 16]); //1:前面贫民 后面高楼
  stateVar_floor.push([0.8, 5, 7, 5, 8, 2, 4, 2, 3, 2, 2, 1, 2]); //2:前面高楼 后面贫民
  stateVar_floor.push([0.5, 3, 4, 4, 5, 5, 6, 5, 7, 7, 8, 8, 9]); //3:森林
  stateVar_floor.push([0.5, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2, 1.5, 2]); //4:贫民

  state_floor = 0;
  if (varData.split02.arrange == 0) {
    state_floor = 4;
  } else if (varData.split02.arrange == 1) {
    state_floor = 0;
  } else if (varData.split02.arrange == 2) {
    state_floor = 1;
  } else if (varData.split02.arrange == 3) {
    state_floor = 2;
  } else if (varData.split02.arrange == 4) {
    state_floor = 3;
  }





  open_lightRail = false;
  rate_river = 0;
  rate_nightMarket = 0;
  if (varData.split02.street.street_metro == 0) {
    open_lightRail = false;
  } else {
    open_lightRail = true;
    this.num_rail = varData.split02.street.street_metro;
  }
  rate_river = varData.split02.street.street_river;
  rate_nightMarket = varData.split02.street.street_nightMarket;

  rate_river = constrain(rate_river, 0, 0.5);
  rate_nightMarket = constrain(rate_nightMarket, 0, 0.5);









  loadingPath = "https://funnysandwich.github.io/metro_demo/split03/";


  rate_roof = 0;
  rate_handrail = 0;
  rate_crucifix = 0;
  rate_billboard = 1;
  rate_billboardRoof = 1;
  rate_billboardSide = 1;
  rate_ladder = 0;

  //if (varData.split03.part.part_roof > 0) {
  //  rate_roof = varData.split03.part.part_roof;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_1.mp3");
  //}
  //if (varData.split03.part.part_handrail > 0) {
  //  rate_handrail = varData.split03.part.part_handrail;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_2.mp3");
  //}
  //if (varData.split03.part.part_crucifix > 0) {
  //  rate_crucifix = varData.split03.part.part_crucifix;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_3.mp3");
  //}
  //if (varData.split03.part.part_bill_roof > 0) {
  //  rate_billboardRoof = varData.split03.part.part_bill_roof;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_4.mp3");
  //}
  //if (varData.split03.part.part_bill > 0) {
  //  rate_billboard = varData.split03.part.part_bill;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_6.mp3");
  //}
  //if (varData.split03.part.part_ladder > 0) {
  //  rate_ladder = varData.split03.part.part_ladder;
  //  totalSongs += 1;
  //  loadingSound(loadingPath + "blocktrain_item_7.mp3");
  //}

  rate_roof = constrain(rate_roof, 0, 1);
  rate_handrail = constrain(rate_handrail, 0, 1);
  rate_crucifix = constrain(rate_crucifix, 0, 1);
  rate_billboardRoof = constrain(rate_billboardRoof, 0, 1);
  rate_billboard = constrain(rate_billboard, 0, 1);
  rate_ladder = constrain(rate_ladder, 0, 1);





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
  rate_fair = 0;
  rate_paifang = 0;
  rate_PTTower = 0;
  rate_gazebo = 0;

  if (varData.split03.bill.bill_mc > 0) {
    rate_billMc = varData.split03.bill.bill_mc;
  }
  if (varData.split03.bill.bill_youbetu > 0) {
    rate_billYoubetu = varData.split03.bill.bill_youbetu;
  }
  if (varData.split03.bill.bill_tezos > 0) {
    rate_billTezos = varData.split03.bill.bill_tezos;
  }
  if (varData.split03.bill.bill_message > 0) {
    rate_billMessage = varData.split03.bill.bill_message;
  }
  if (varData.split03.bill.bill_like > 0) {
    rate_billLike = varData.split03.bill.bill_like;
  }
  if (varData.split03.bill.bill_return > 0) {
    rate_billCannotReturn = varData.split03.bill.bill_return;
  }
  if (varData.split03.bill.bill_call > 0) {
    rate_billCall = varData.split03.bill.bill_call;
  }
  if (varData.split03.bill.bill_power > 0) {
    rate_billPower = varData.split03.bill.bill_power;
  }
  if (varData.split03.bill.bill_bitcoin > 0) {
    rate_billBitcoin = varData.split03.bill.bill_bitcoin;
  }
  if (varData.split03.bill.bill_ethereum > 0) {
    rate_billEthereum = varData.split03.bill.bill_ethereum;
  }
  if (varData.split03.bill.bill_telegram > 0) {
    rate_billTelegram = varData.split03.bill.bill_telegram;
  }
  if (varData.split03.bill.bill_park > 0) {
    rate_parking = varData.split03.bill.bill_park;
  }
  if (varData.split03.bill.bill_metro > 0) {
    rate_billMetro = varData.split03.bill.bill_metro;
  }
  if (varData.split03.bill.bill_file > 0) {
    rate_billFile = varData.split03.bill.bill_file;
  }
  if (varData.split03.bill.bill_tree > 0) {
    rate_tree = varData.split03.bill.bill_tree;
  }
  if (varData.split03.bill.bill_deadTree > 0) {
    rate_tree = varData.split03.bill.bill_deadTree;
  }
  if (rate_tree > 0) {
    let sum_tree = varData.split03.bill.bill_tree + varData.split03.bill.bill_deadTree;
    this.rate_foliage = varData.split03.bill.bill_tree / sum_tree;
  }
  if (varData.split03.bill.bill_fair > 0) {
    rate_fair = varData.split03.bill.bill_fair;
  }
  if (varData.split03.bill.bill_paifang > 0) {
    rate_paifang = varData.split03.bill.bill_paifang;
  }
  if (varData.split03.bill.bill_tower > 0) {
    rate_PTTower = varData.split03.bill.bill_tower;
  }
  if (varData.split03.bill.bill_gazebo > 0) {
    rate_gazebo = varData.split03.bill.bill_gazebo;
  }








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



  if (varData.split04.weather.weather_rain == 1) {
    open_rain = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W0.mp3");
  }
  if (varData.split04.weather.weather_waterdrop == 1) {
    open_waterDrop = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W1.mp3");
  }
  if (varData.split04.weather.weather_fog == 1) {
    open_fog = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W2.mp3");
  }
  if (varData.split04.weather.weather_darkCloud == 1) {
    open_darkCloud = true;
  }
  if (varData.split04.weather.weather_sunBeam == 1) {
    open_sunBeam = true;
  }
  if (varData.split04.weather.weather_typhoon == 1) {
    open_typhoon = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W5.mp3");
  }
  if (varData.split04.weather.weather_tornado == 1) {
    open_tornado = true;
  }
  if (varData.split04.weather.weather_snow == 1) {
    open_snow = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W7.mp3");
  }
  if (varData.split04.weather.weather_firework == 1) {
    open_firework = true;
  }
  if (varData.split04.weather.weather_hugeMoon == 1) {
    open_hugeMoon = true;
    totalSongs += 1;
    loadingSound(loadingPath_pre + loadingPath + "W9.mp3");
  }





  if (open_sunBeam) {
    open_darkCloud = true;
  }

  if (open_rain  &&  open_typhoon  &&  open_snow) {
    let ran = random(1);
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
    if (random(1) < 0.5) {
      open_rain = false;
    } else {
      open_typhoon = false;
    }
  }
  if (open_rain  &&  open_snow) {
    if (random(1) < 0.5) {
      open_rain = false;
    } else {
      open_snow = false;
    }
  }
  if (open_typhoon  &&  open_snow) {
    if (random(1) < 0.5) {
      open_typhoon = false;
    } else {
      open_snow = false;
    }
  }

  if (open_hugeMoon  &&  open_sunBeam) {
    if (random(1) < 0.5) {
      open_hugeMoon = false;
    } else {
      open_sunBeam = false;
      open_darkCloud = false;
    }
  }
  if (open_hugeMoon  &&  open_darkCloud  &&  !open_sunBeam) {
    if (random(1) < 0.5) {
      open_hugeMoon = false;
    } else {
      open_darkCloud = false;
    }
  }









  state_click = 0; //0:再生 1:闪 2:下降 3:弹簧 4:鼓球

  have_button_stop = false;
  have_button_sprint = false;
  have_button_jump = false;
  have_button_regenerate = false;
  have_button_shine = false;
  have_button_submerge = false;
  have_button_spring = false;
  have_button_invert = false;


  if (varData.split04.button.button_stop == 1) {
    have_button_stop = true;
  }
  if (varData.split04.button.button_sprint == 1) {
    have_button_sprint = true;
  }
  if (varData.split04.button.button_jump == 1) {
    have_button_jump = true;
  }
  if (varData.split04.button.button_regenerate == 1) {
    have_button_regenerate = true;
  }
  if (varData.split04.button.button_shine == 1) {
    have_button_shine = true;
  }
  if (varData.split04.button.button_submerge == 1) {
    have_button_submerge = true;
  }
  if (varData.split04.button.button_spring == 1) {
    have_button_spring = true;
  }
  if (varData.split04.button.button_invert == 1) {
    have_button_invert = true;
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










  //rate_crucifix = max(floor(random(-5, 3.5))/10, 0);
  //rate_crucifix = 0;
  if (rate_crucifix == 0) {
    rate_crucifix = 0;
    open_crucifix = false;
  } else {
    open_crucifix = true;
  }

  //rate_roof = max(floor(random(-2, 9))/10, 0);
  //rate_roof = 0;
  if (rate_roof == 0) {
    rate_roof = 0;
    open_roof = false;
  } else {
    open_roof = true;
  }

  //rate_handrail = max(floor(random(-2, 7.5))/10, 0);
  //rate_handrail = 0;
  if (rate_handrail == 0 ) {
    rate_handrail = 0;
    open_handrail = false;
  } else {
    open_handrail = true;
  }

  //rate_billboard = max(floor(random(-2, 8.5))/10, 0);
  //rate_billboard = 0;
  if (rate_billboard == 0) {
    rate_billboard = 0;
    open_billboard = false;
  } else {
    open_billboard = true;
  }


  //rate_billboardRoof = max(floor(random(-2, 8.5))/10, 0);
  //rate_billboardRoof = 0;
  if (rate_billboardRoof == 0) {
    rate_billboardRoof = 0;
    open_billboardRoof = false;
  } else {
    open_billboardRoof = true;
  }


  if (rate_billboardSide == 0) {
    rate_billboardSide = 0;
    open_billboardSide = false;
  } else {
    open_billboardSide = true;
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



  //rate_billMc = max(floor(random(-7, 9))/10, 0);
  //rate_billMc = 0;
  if (rate_billMc == 0) {
    rate_billMc = 0;
    open_billMc = false;
  } else {
    open_billMc = true;
  }


  //rate_billYoubetu = max(floor(random(-7, 9))/10, 0);
  //rate_billYoubetu = 0;
  if (rate_billYoubetu == 0) {
    rate_billYoubetu = 0;
    open_billYoubetu = false;
  } else {
    open_billYoubetu = true;
  }


  //rate_billTezos = max(floor(random(-7, 9))/10, 0);
  //rate_billTezos = 0;
  if (rate_billTezos == 0) {
    rate_billTezos = 0;
    open_billTezos = false;
  } else {
    open_billTezos = true;

    this.node_tezos = Array.from(Array(26), () => new Array(2));
    loadStrings("node_billTezos.txt", tezosLoaded);
  }


  //rate_billMessage = max(floor(random(-7, 9))/10, 0);
  //rate_billMessage = 0;
  if (rate_billMessage == 0) {
    rate_billMessage = 0;
    open_billMessage = false;
  } else {
    open_billMessage = true;
  }


  //rate_billLike = max(floor(random(-7, 9))/10, 0);
  //rate_billLike = 0;
  if (rate_billLike == 0) {
    rate_billLike = 0;
    open_billLike = false;
  } else {
    open_billLike = true;

    this.node_like = Array.from(Array(16), () => new Array(2));
    loadStrings("node_billLike.txt", likeLoaded);
  }


  //rate_billCannotReturn = max(floor(random(-7, 9))/10, 0);
  //rate_billCannotReturn = 0;
  if (rate_billCannotReturn == 0) {
    rate_billCannotReturn = 0;
    open_billCannotReturn = false;
  } else {
    open_billCannotReturn = true;

    this.node_CTReturn = Array.from(Array(40), () => new Array(2));
    loadStrings("node_billCannotReturn.txt", cannotReturnLoaded);
  }



  //rate_billCall = max(floor(random(-7, 9))/10, 0);
  //rate_billCall = 0;
  if (rate_billCall == 0) {
    rate_billCall = 0;
    open_billCall = false;
  } else {
    open_billCall = true;

    this.node_call = Array.from(Array(10), () => new Array(2));
    loadStrings("node_billCall.txt", callLoaded);
  }



  //rate_billPower = max(floor(random(-7, 9))/10, 0);
  //rate_billPower = 0;
  if (rate_billPower == 0) {
    rate_billPower = 0;
    open_billPower = false;
  } else {
    open_billPower = true;

    this.node_power = Array.from(Array(12), () => new Array(2));
    loadStrings("node_billPower.txt", powerLoaded);
  }



  //rate_billBitcoin = max(floor(random(-7, 9))/10, 0);
  //rate_billBitcoin = 0;
  if (rate_billBitcoin == 0) {
    rate_billBitcoin = 0;
    open_billBitcoin = false;
  } else {
    open_billBitcoin = true;

    this.node_bitcoin = Array.from(Array(38), () => new Array(2));
    loadStrings("node_billBitcoin.txt", bitcoinLoaded);
  }


  //rate_billEthereum = max(floor(random(-7, 9))/10, 0);
  //rate_billEthereum = 0;
  if (rate_billEthereum == 0) {
    rate_billEthereum = 0;
    open_billEthereum = false;
  } else {
    open_billEthereum = true;

    this.node_ethereum = Array.from(Array(9), () => new Array(2));
    loadStrings("node_billEthereum.txt", ethereumLoaded);
  }



  //rate_billTelegram = max(floor(random(-7, 9))/10, 0);
  //rate_billTelegram = 0;
  if (rate_billTelegram == 0) {
    rate_billTelegram = 0;
    open_billTelegram = false;
  } else {
    open_billTelegram = true;

    this.node_telegram = Array.from(Array(11), () => new Array(2));
    loadStrings("node_billTelegram.txt", telegramLoaded);
  }


  //rate_parking = max(floor(random(-7, 9))/10, 0);
  //rate_parking = 0;
  if (rate_parking == 0) {
    rate_parking = 0;
    open_parking = false;
  } else {
    open_parking = true;
  }


  //rate_billMetro = max(floor(random(-7, 9))/10, 0);
  //rate_billMetro = 0;
  if (rate_billMetro == 0) {
    rate_billMetro = 0;
    open_billMetro = false;
  } else {
    open_billMetro = true;

    this.node_metro = Array.from(Array(28), () => new Array(2));
    loadStrings("node_billMetro.txt", metroLoaded);
  }

  //rate_billFile = max(floor(random(-7, 9))/10, 0);
  //rate_billFile = 0;
  if (rate_billFile == 0) {
    rate_billFile = 0;
    open_billFile = false;
  } else {
    open_billFile = true;

    this.node_file = Array.from(Array(18), () => new Array(2));
    loadStrings("node_billFile.txt", fileLoaded);
  }


  //rate_tree = max(floor(random(-7, 9))/100, 0);
  //rate_tree = 0;
  if (rate_tree == 0) {
    rate_tree = 0;
    open_tree = false;
  } else {
    open_tree = true;

    //this.rate_foliage = 0.5;
    this.open_foliage = false;
    if (rate_foliage > 0) {
      open_foliage = true;
    }
  }



  //rate_fair = max(floor(random(-7, 9))/100, 0);
  //rate_fair = 0;
  if (rate_fair == 0) {
    rate_fair = 0;
    open_fair = false;
  } else {
    open_fair = true;
  }



  //rate_constrSite = max(floor(random(-7, 9))/100, 0);
  rate_constrSite = 0;
  if (rate_constrSite == 0) {
    rate_constrSite = 0;
    open_constrSite = false;
  } else {
    open_constrSite = true;
  }



  //rate_paifang = max(floor(random(-7, 9))/100, 0);
  //rate_paifang = 0;
  if (rate_paifang == 0) {
    rate_paifang = 0;
    open_paifang = false;
  } else {
    //rate_paifang = max(rate_paifang, 0.5);
    open_paifang = true;
  }



  //rate_PTTower = max(floor(random(-7, 9))/10, 0);
  //rate_PTTower = 0;
  if (rate_PTTower == 0) {
    open_PTTower = false;
  } else {
    open_PTTower = true;
  }




  //rate_gazebo = max(floor(random(-7, 9))/10, 0);
  //rate_gazebo = 0;
  if (rate_gazebo == 0) {
    open_gazebo = false;
  } else {
    open_gazebo = true;
  }



  //-----------------------------------------------------------------------------------------------
  //-----------------------------------⬆ initialize miniblock ⬆-----------------------------------
  //-----------------------------------------------------------------------------------------------





  //--------------------------------------------------------------------------------------------
  //-----------------------------------⬇ initialize house ⬇-----------------------------------
  //--------------------------------------------------------------------------------------------



  //rate_normalHouse = max(floor(random(-10, 6))/100, 0);
  //rate_normalHouse = 10;





  //rate_constrHouse = max(floor(random(-10, 6))/100, 0);
  //rate_constrHouse = 0;
  if (rate_constrHouse == 0) {
    rate_constrHouse = 0;
    open_constrHouse = false;
  } else {
    open_constrHouse = true;

    this.open_crane = false;
    this.rate_crane = max(floor(random(1, 6))/10, 0);
    if (rate_crane == 0) {
      open_crane = false;
    } else {
      rate_crane = 0.5;
      open_crane = true;
    }
  }


  //rate_catHouse = max(floor(random(-10, 6))/100, 0);
  //rate_catHouse = 0;
  if (rate_catHouse == 0) {
    rate_catHouse = 0;
    open_catHouse = false;
  } else {
    open_catHouse = true;
  }


  //rate_CTowerHouse = max(floor(random(-10, 6))/100, 0);
  //rate_CTowerHouse = 0;
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


  //rate_firewatchHouse = max(floor(random(-10, 6))/100, 0);
  //rate_firewatchHouse = 0;
  if (rate_firewatchHouse == 0) {
    rate_firewatchHouse = 0;
    open_firewatchHouse = false;
  } else {
    open_firewatchHouse = true;
  }




  //rate_blockHouse = max(floor(random(-10, 6))/100, 0);
  //rate_blockHouse = 0;
  if (rate_blockHouse == 0) {
    rate_blockHouse = 0;
    open_blockHouse = false;
  } else {
    open_blockHouse = true;
  }



  rate_dino = 0;

  //rate_dottedHouse = max(floor(random(-10, 6))/100, 0);
  //rate_dottedHouse = 0;
  if (rate_dottedHouse == 0) {
    rate_dottedHouse = 0;
    open_dottedHouse = false;
  } else {
    open_dottedHouse = true;
    this.node_fileBroken = Array.from(Array(26), () => new Array(2));
    loadStrings("node_billFileBroken.txt", fileBrokenLoaded);


    rate_dino = max(floor(random(-7, 9))/10, 0);
    rate_dino = 0;
    if (rate_dino == 0) {
      rate_dino = 0;
      open_dino = false;
    } else {
      open_dino = true;
      this.node_dino = Array.from(Array(35), () => new Array(2));
      loadStrings("node_dino.txt", dinoLoaded);
    }
  }




  //rate_UGHouse = max(floor(random(-10, 6))/100, 0);
  //rate_UGHouse = 1;
  if (rate_UGHouse == 0) {
    rate_UGHouse = 0;
    open_UGHouse = false;
  } else {
    open_UGHouse = true;
  }




  //rate_orientHouse = max(floor(random(-10, 6))/100, 0);
  //rate_orientHouse = 0;
  if (rate_orientHouse == 0) {
    rate_orientHouse = 0;
    open_orientHouse = false;
  } else {
    open_orientHouse = true;
  }

  //--------------------------------------------------------------------------------------------
  //-----------------------------------⬆ initialize house ⬆-----------------------------------
  //--------------------------------------------------------------------------------------------











  //rate_ladder = max(floor(random(-8, 9))/10, 0);
  //rate_ladder = 0;
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







  //-------------------------------------------------------------------------------------------------
  //-----------------------------------⬇ initialize environment ⬇-----------------------------------
  //-------------------------------------------------------------------------------------------------




  //rate_river = max(floor(random(-4, 5))/10, 0);
  //rate_river = 0;
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
    for (let i=0; i<num_rail; i++) {
      const index_z = floor(random(0, b.length));

      lightRails[i] = new LightRail(b[index_z]);

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
    for (let i=0; i<10; i++) {
      waterDrop.push(new WaterDrop());
    }
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




  open_lineSky = false;
  if (open_lineSky) {
    this.SKY = createGraphics(1000, 500);
    SKY.background(0, 0);
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
    tornado.push(new Tornado(createVector(0, skyline.y, skyline.z+real(500))));
  }





  if (open_firework) {
    this.firework = [];
    firework.push(new Firework(createVector(0, skyline.y, skyline.z+real(10))));
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
      blocks.push(new Block(createVector(x_begin, skyline.y, z), w_next_block, real(100)*5, i, blocks.length, is_house, is_river_now, is_mountain, is_sea, is_rail, isNightMarket_next));
      count_blocks += 1;
    }

    let s_roadHor = new Array(6);
    for (let i=0; i<s_roadHor.length; i++) {
      let z = (-real(100)*5 - gap_block) * (i+1);
      s_roadHor[i] = new RoadHor(createVector(x_begin-speed*0, skyline.y, z), gap_block, w_next_block, j, i);
    }
    roadHor.push(s_roadHor);
    roadVer.push(new RoadVer(createVector(x_begin-speed*0, skyline.y, 0), gap_block, -skyline.z, j));




    w_next_block = real(100) * floor(random(5, 12));
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



  str_info.push("Speed: "+speed);
  str_info.push("Mileage: "+mileage);
  if (state_winFrame == 0) {
    str_info.push("Window: "+"singular_fillet_hor".toUpperCase());
  } else if (state_winFrame == 1) {
    str_info.push("Window: "+"singular_fillet_ver".toUpperCase());
  } else if (state_winFrame == 2) {
    str_info.push("Window: "+"singular_fillet_rect".toUpperCase());
  } else if (state_winFrame == 3) {
    str_info.push("Window: "+"singular_ellipse_hor".toUpperCase());
  } else if (state_winFrame == 4) {
    str_info.push("Window: "+"singular_ellipse_ver".toUpperCase());
  } else if (state_winFrame == 5) {
    str_info.push("Window: "+"singular_ellipse_circle".toUpperCase());
  } else if (state_winFrame == 6) {
    str_info.push("Window: "+"plural_double".toUpperCase());
  } else if (state_winFrame == 7) {
    str_info.push("Window: "+"plural_triple".toUpperCase());
  } else if (state_winFrame == 8) {
    str_info.push("Window: "+"special_oldTV".toUpperCase());
  } else if (state_winFrame == 8) {
    str_info.push("Window: "+"window".toUpperCase());
  }

  if (state_winDecoration == 0) {
    str_info.push("Frame: "+"null".toUpperCase());
  } else if (state_winDecoration == 1) {
    str_info.push("Frame: "+"submarine".toUpperCase());
  } else if (state_winDecoration == 2) {
    str_info.push("Frame: "+"plane".toUpperCase());
  } else if (state_winDecoration == 3) {
    str_info.push("Frame: "+"rollup".toUpperCase());
  } else if (state_winDecoration == 4) {
    str_info.push("Frame: "+"curtain".toUpperCase());
  } else if (state_winDecoration == 5) {
    str_info.push("Frame: "+"mess".toUpperCase());
  } else if (state_winDecoration == 6) {
    str_info.push("Frame: "+"handle".toUpperCase());
  }

  if (state_color == 0) {
    str_info.push("Color: "+"gray_purple".toUpperCase());
  } else if (state_color == 1) {
    str_info.push("Color: "+"gray_yellow".toUpperCase());
  } else if (state_color == 2) {
    str_info.push("Color: "+"gray_dark".toUpperCase());
  } else if (state_color == 3) {
    str_info.push("Color: "+"gray_warm".toUpperCase());
  } else if (state_color == 4) {
    str_info.push("Color: "+"gray_bright".toUpperCase());
  } else if (state_color == 5) {
    str_info.push("Color: "+"gray_dream".toUpperCase());
  } else if (state_color == 6) {
    str_info.push("Color: "+"gradient_eternal".toUpperCase());
  } else if (state_color == 7) {
    str_info.push("Color: "+"gradient_blade".toUpperCase());
  } else if (state_color == 8) {
    str_info.push("Color: "+"gradient_blade2".toUpperCase());
  } else if (state_color == 9) {
    str_info.push("Color: "+"gradient_dallas".toUpperCase());
  } else if (state_color == 10) {
    str_info.push("Color: "+"gradient_vanilla".toUpperCase());
  } else if (state_color == 11) {
    str_info.push("Color: "+"gradient_emperor".toUpperCase());
  } else if (state_color == 12) {
    str_info.push("Color: "+"gradient_jack".toUpperCase());
  } else if (state_color == 13) {
    str_info.push("Color: "+"gradient_fight".toUpperCase());
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



  if (open_mountain  ||  open_sea  ||  open_desert  ||  open_flood) {
    str_info.push("------");
  }
  if (open_mountain) {
    str_info.push("Landscape: "+"Mountain".toUpperCase());
  } else if (open_sea) {
    str_info.push("Landscape: "+"Sea".toUpperCase());
    if (open_skerry) {
      str_info.push("  Skerry  (prob. "+nfc(rate_skerry*100, 0)+"%)");
    }
  } else if (open_desert) {
    str_info.push("Landscape: "+"desert".toUpperCase());
  } else if (open_flood) {
    str_info.push("Landscape: "+"flood".toUpperCase());
  } else {
    str_info.push("Landscape: "+"default".toUpperCase());
  }






  //let sum = rate_normalHouse + rate_constrHouse + rate_catHouse + rate_CTowerHouse + rate_firewatchHouse + rate_blockHouse + rate_dottedHouse + rate_UGHouse + rate_orientHouse;
  //sum = max(sum, 1);
  //const real_rate_normalHouse = rate_normalHouse / sum;
  //const real_rate_constrHouse = rate_constrHouse / sum;
  //const real_rate_catHouse = rate_catHouse / sum;
  //const real_rate_CTowerHouse = rate_CTowerHouse / sum;
  //const real_rate_firewatchHouse = rate_firewatchHouse / sum;
  //const real_rate_blockHouse = rate_blockHouse / sum;
  //const real_rate_dottedHouse = rate_dottedHouse / sum;
  //const real_rate_UGHouse = rate_UGHouse / sum;
  //const real_rate_orientHouse = rate_orientHouse / sum;

  //str_info.push("------");
  //str_info.push("NormalHouse  (prob. "+nfc(real_rate_normalHouse*100, 1)+"%)");


  //if (open_constrHouse) {
  //  str_info.push("ConstructionHouse  (prob. "+nfc(real_rate_constrHouse*100, 1)+"%)");
  //}
  //if (open_catHouse) {
  //  str_info.push("CatHouse  (prob. "+nfc(real_rate_catHouse*100, 1)+"%)");
  //}
  //if (open_CTowerHouse) {
  //  str_info.push("CastleTower  (prob. "+nfc(real_rate_CTowerHouse*100, 1)+"%)");
  //}
  //if (open_firewatchHouse) {
  //  str_info.push("FirewatchHouse  (prob. "+nfc(real_rate_firewatchHouse*100, 1)+"%)");
  //}
  //if (open_blockHouse) {
  //  str_info.push("BlockHouse  (prob. "+nfc(real_rate_blockHouse*100, 1)+"%)");
  //}
  //if (open_dottedHouse) {
  //  str_info.push("DottedLineHouse  (prob. "+nfc(real_rate_dottedHouse*100, 1)+"%)");
  //}
  //if (open_UGHouse) {
  //  str_info.push("UnderGroundHouse  (prob. "+nfc(real_rate_UGHouse*100, 1)+"%)");
  //}
  //if (open_orientHouse) {
  //  str_info.push("OrientalHouse  (prob. "+nfc(real_rate_orientHouse*100, 1)+"%)");
  //}




  //str_info.push("------");
  //if (state_floor == 0) {
  //  str_info.push("FloorMode: AVERAGE");
  //} else if (state_floor == 1) {
  //  str_info.push("FloorMode: STAIR");
  //} else if (state_floor == 2) {
  //  str_info.push("FloorMode: EMBANKMENT");
  //} else if (state_floor == 3) {
  //  str_info.push("FloorMode: FOREST");
  //} else if (state_floor == 4) {
  //  str_info.push("FloorMode: SUGARCUBE");
  //}




  //if(open_lightRail  ||  open_river  ||  open_nightMarket){
  //str_info.push("------");
  //}


  //if (open_lightRail) {
  //  let s = "Row: ";
  //  for (let i=0; i<num_rail; i++) {
  //    s += String(lightRails[i].index_z);
  //    if (i != num_rail-1) {
  //      s += ", ";
  //    }
  //  }
  //  s += "  (0-5)";
  //  str_info.push("LightRail  (num: "+num_rail+")");
  //  str_info.push("  "+s);
  //}


  //if (open_river) {
  //  str_info.push("River " + "  (prob. "+nfc(rate_river*100, 0)+"%)");
  //  if (open_bridge) {
  //    str_info.push("  Bridge  (prob. "+nfc(rate_bridge*100, 0)+"%)");
  //  }
  //  if (open_PTTower) {
  //    str_info.push("  PowerTower  (prob. "+nfc(rate_PTTower*100, 0)+"%)");
  //  }
  //}



  //if (open_nightMarket) {
  //  str_info.push("NightMarket " + "  (prob. "+nfc(rate_nightMarket*100, 0)+"%)");
  //}





  if (open_crucifix || open_roof || open_handrail || open_billboard || open_billboardRoof || open_billboardSide || open_ladder) {
    str_info.push("------");
    if (open_roof) {
      str_info.push("Roof " + "  (prob. "+nfc(rate_roof*100, 0)+"%)");
    }
    if (open_handrail) {
      str_info.push("Handrail " + "  (prob. "+nfc(rate_handrail*100, 0)+"%)");
    }
    if (open_crucifix) {
      str_info.push("Crucifix " + "  (prob. "+nfc(rate_crucifix*100, 0)+"%)");
    }
    if (open_billboardRoof) {
      str_info.push("BillboardRoof " + "  (prob. "+nfc(rate_billboardRoof*100, 0)+"%)");
    }
    if (open_billboard) {
      str_info.push("Billboard " + "  (prob. "+nfc(rate_billboard*100, 0)+"%)");
    }
    if (open_billboardSide) {
      str_info.push("BillboardSide " + "  (prob. "+nfc(rate_billboardSide*100, 0)+"%)");
    }
    if (open_ladder) {
      str_info.push("Ladder " + "  (prob. "+nfc(rate_ladder*100, 0)+"%)");
    }
  }






  if (open_billMc || open_billYoubetu || open_billTezos || open_billMessage || open_billLike || open_billCannotReturn || open_billCall || open_billPower || open_billBitcoin || open_billEthereum || open_billTelegram || open_parking || open_billMetro || open_billFile || open_tree || open_fair || open_constrSite || open_paifang) {
    str_info.push("------");

    if (open_billMc) {
      str_info.push("MmDonald's  (prob. "+nfc(rate_billMc*100, 0)+"%)");
    }

    if (open_billYoubetu) {
      str_info.push("Youbetu  (prob. "+nfc(rate_billYoubetu*100, 0)+"%)");
    }

    if (open_billTezos) {
      str_info.push("Tezos  (prob. "+nfc(rate_billTezos*100, 0)+"%)");
    }

    if (open_billMessage) {
      str_info.push("Message  (prob. "+nfc(rate_billMessage*100, 0)+"%)");
    }

    if (open_billLike) {
      str_info.push("Like  (prob. "+nfc(rate_billLike*100, 0)+"%)");
    }

    if (open_billCannotReturn) {
      str_info.push("CannotReturn  (prob. "+nfc(rate_billCannotReturn*100, 0)+"%)");
    }

    if (open_billCall) {
      str_info.push("Call  (prob. "+nfc(rate_billCall*100, 0)+"%)");
    }

    if (open_billPower) {
      str_info.push("Power  (prob. "+nfc(rate_billPower*100, 0)+"%)");
    }

    if (open_billBitcoin) {
      str_info.push("Bitcoin  (prob. "+nfc(rate_billBitcoin*100, 0)+"%)");
    }

    if (open_billEthereum) {
      str_info.push("Ethereum  (prob. "+nfc(rate_billEthereum*100, 0)+"%)");
    }

    if (open_billTelegram) {
      str_info.push("Telegram  (prob. "+nfc(rate_billTelegram*100, 0)+"%)");
    }

    if (open_parking) {
      str_info.push("Parking  (prob. "+nfc(rate_parking*100, 0)+"%)");
    }

    if (open_billMetro) {
      str_info.push("Metro  (prob. "+nfc(rate_billMetro*100, 0)+"%)");
    }

    if (open_billFile) {
      str_info.push("File  (prob. "+nfc(rate_billFile*100, 0)+"%)");
    }

    if (open_tree) {
      str_info.push("Tree  (prob. "+nfc(rate_tree*100, 0)+"%)");
      if (open_foliage) {
        str_info.push("  Foliage  (prob. "+nfc(rate_foliage*100, 0)+"%)");
      }
    }

    if (open_fair) {
      str_info.push("Fair  (prob. "+nfc(rate_fair*100, 0)+"%)");
    }

    if (open_constrSite) {
      str_info.push("ConstructionSite  (prob. "+nfc(rate_constrSite*100, 0)+"%)");
    }

    if (open_paifang) {
      str_info.push("Paifang  (prob. "+nfc(rate_paifang*100, 0)+"%)");
    }
  }






  if (open_rain || open_waterDrop || open_fog || open_darkCloud || open_sunBeam || open_typhoon || open_tornado || open_snow || open_firework || open_hugeMoon) {
    str_info.push("------");
    str_info.push("Weather: ");
    if (open_rain) {
      str_info.push("  RAIN");
    }
    if (open_waterDrop) {
      str_info.push("  WATERDROP");
    }
    if (open_fog) {
      str_info.push("  FOG");
    }
    if (open_darkCloud) {
      str_info.push("  DARKCLOUD");
    }
    if (open_sunBeam) {
      str_info.push("  SUNBEAM");
    }
    if (open_typhoon) {
      str_info.push("  TYPHOON");
    }
    if (open_tornado) {
      str_info.push("  TORNADO");
    }
    if (open_snow) {
      str_info.push("  SNOW");
    }
    if (open_firework) {
      str_info.push("  FIREWORK");
    }
    if (open_hugeMoon) {
      str_info.push("  HUGE_MOON");
    }
  }




  if (have_button_stop  ||  have_button_sprint  ||  have_button_jump  ||  have_button_regenerate  ||  have_button_shine  ||  have_button_submerge  ||  have_button_spring  ||  open_TVScreen  ||  have_button_invert) {
    str_info.push("------");
    str_info.push("Button: ");
    if (open_TVScreen) {
      str_info.push("  TV_SNOW");
    }
    if (have_button_jump) {
      str_info.push("  JUMP");
    }
    if (have_button_sprint) {
      str_info.push("  SPRINT");
    }
    if (have_button_stop) {
      str_info.push("  STOP");
    }
    if (have_button_regenerate) {
      str_info.push("  REGENERATE");
    }
    if (have_button_shine) {
      str_info.push("  SHINE");
    }
    if (have_button_submerge) {
      str_info.push("  SUBMERGE");
    }
    if (have_button_spring) {
      str_info.push("  SPRING");
    }
    if (have_button_invert) {
      str_info.push("  TURN_OFF_LIGHT");
    }
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


function tezosLoaded(str_tezos) {
  for (let i=0; i<str_tezos.length; i++) {
    let a = split(str_tezos[i], ", ");
    for (let j=0; j<2; j++) {
      node_tezos[i][j] = parseFloat(a[j]);
    }
  }
}

function likeLoaded(str_like) {
  for (let i=0; i<str_like.length; i++) {
    let a = split(str_like[i], ", ");
    for (let j=0; j<2; j++) {
      node_like[i][j] = parseFloat(a[j]);
    }
  }
}

function cannotReturnLoaded(str_cannotReturn) {
  for (let i=0; i<str_cannotReturn.length; i++) {
    let a = split(str_cannotReturn[i], ", ");
    for (let j=0; j<2; j++) {
      node_CTReturn[i][j] = parseFloat(a[j]);
    }
  }
}

function callLoaded(str_call) {
  for (let i=0; i<str_call.length; i++) {
    let a = split(str_call[i], ", ");
    for (let j=0; j<2; j++) {
      node_call[i][j] = parseFloat(a[j]);
    }
  }
}


function powerLoaded(str_power) {
  for (let i=0; i<str_power.length; i++) {
    let a = split(str_power[i], ", ");
    for (let j=0; j<2; j++) {
      node_power[i][j] = parseFloat(a[j]);
    }
  }
}

function bitcoinLoaded(str_bitcoin) {
  for (let i=0; i<str_bitcoin.length; i++) {
    let a = split(str_bitcoin[i], ", ");
    for (let j=0; j<2; j++) {
      node_bitcoin[i][j] = parseFloat(a[j]);
    }
  }
}

function ethereumLoaded(str_ethereum) {
  for (let i=0; i<str_ethereum.length; i++) {
    let a = split(str_ethereum[i], ", ");
    for (let j=0; j<2; j++) {
      node_ethereum[i][j] = parseFloat(a[j]);
    }
  }
}

function telegramLoaded(str_telegram) {
  for (let i=0; i<str_telegram.length; i++) {
    let a = split(str_telegram[i], ", ");
    for (let j=0; j<2; j++) {
      node_telegram[i][j] = parseFloat(a[j]);
    }
  }
}

function metroLoaded(str_metro) {
  for (let i=0; i<str_metro.length; i++) {
    let a = split(str_metro[i], ", ");
    for (let j=0; j<2; j++) {
      node_metro[i][j] = parseFloat(a[j]);
    }
  }
}

function fileLoaded(str_file) {
  for (let i=0; i<str_file.length; i++) {
    let a = split(str_file[i], ", ");
    for (let j=0; j<2; j++) {
      node_file[i][j] = parseFloat(a[j]);
    }
  }
}

function fileBrokenLoaded(str_fileBroken) {
  for (let i=0; i<str_fileBroken.length; i++) {
    let a = split(str_fileBroken[i], ", ");
    for (let j=0; j<2; j++) {
      node_fileBroken[i][j] = parseFloat(a[j]);
    }
  }
}

function dinoLoaded(str_dion) {
  for (let i=0; i<str_dion.length; i++) {
    let a = split(str_dion[i], ", ");
    for (let j=0; j<2; j++) {
      node_dino[i][j] = parseFloat(a[j]);
    }
  }
}











function draw() {
  if (is_song_load_done  &&  open_play) {//------- loadSongs -------


    if (speed > 0) {
      let volume = constrain(map(speed, 0, real(20), 0, 1), 0, 1);
      if (!song_track.isPlaying()) {
        song_track.amp(0);
        song_track.play();
      } else {
        song_track.amp(volume);
      }

      if (!is_onTheGround) {
        volume = constrain(map(cameraY, -real(450), -real(10), 0, 1), 0, 1);
      }

      if (songs.length > 0) {
        for (let i=0; i<songs.length; i++) {
          if (!songs[i].isPlaying()) {
            songs[i].amp(0);
            songs[i].play();
          } else {
            songs[i].amp(volume);
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
      c_sky = lerpColor(c_sky_copy, c_winFrame_copy, map(time_invert, 0, 15, 0, 0.95));
      //c_winFrame = lerpColor(c_sky_copy, c_winFrame_copy, map(time_invert, 0, 15, 1, 0.8));
      c_near = lerpColor(c_near_copy, c_winFrame_copy, map(time_invert, 0, 15, 0, 1));
      c_far = lerpColor(c_sky, c_far_copy, map(time_invert, 0, 15, 1, 0));
    }
    if (have_button_shine) {
      if (open_light) {
        if (time_light < 20) {
          time_light ++;
        } else {
          open_light = false;
        }
      }
      if (have_button_invert && open_invert) {
        c_near = lerpColor(lerpColor(c_sky_copy, c_winFrame_copy, 0.65), c_winFrame_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
      } else {
        c_near = lerpColor(lerpColor(c_far, c_near, 0.85), c_near_copy, constrain(map(time_light, 0, 20, 0, 1), 0, 1));
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
    //speed = 0;
    mileage += speed;








    background(c_sky);



    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬇ push Block ⬇----------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------


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

      let s_roadHor = new Array(6);
      for (let i=0; i<s_roadHor.length; i++) {
        let z = (-real(100)*5 - gap_block) * (i+1);
        s_roadHor[i] = new RoadHor(createVector(beginLine + x_error, skyline.y, z), gap_block, w_next_block, roadHor.length, i);
      }
      roadHor.push(s_roadHor);
      roadVer.push(new RoadVer(createVector(beginLine + x_error, skyline.y, 0), gap_block, -skyline.z, roadVer.length));



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
          tornado.push(new Tornado(createVector(beginLine, skyline.y, random(-real(500), skyline.z+real(750)))));
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
          firework.push(new Firework(createVector(x, skyline.y, skyline.z+real(10))));
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
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    //------------------------------⬆ camera ⬆--------------------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------------------------------------------------------------




    //udgStation
    translate(0, cameraY, 0);
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
    vertex(endLine+real(600), skyline.y - real(2900), skyline.z);
    vertex(beginLine-real(100), skyline.y - real(2900), skyline.z);
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


    if (!open_info) {
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

        TRIANGLES_getRect_fill4(
          createVector(real(-2500), skyline.y-real(3000), skyline.z+real(2)), 
          createVector(real(2500), skyline.y-real(3000), skyline.z+real(2)), 
          createVector(real(2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(-2500), Y_darkCloud, skyline.z+real(2)), 
          c_winFrame, c_winFrame, lerpColor(c_winFrame, c_sky, var_lerpColor_darkCloud), lerpColor(c_winFrame, c_sky, var_lerpColor_darkCloud)
          );

        TRIANGLES_getRect_fill4( 
          createVector(real(-2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(2500), Y_darkCloud, skyline.z+real(2)), 
          createVector(real(2500), skyline.y, skyline.z+real(2)), 
          createVector(real(-2500), skyline.y, skyline.z+real(2)), 
          lerpColor(c_winFrame, c_sky, var_lerpColor_darkCloud), lerpColor(c_winFrame, c_sky, var_lerpColor_darkCloud), c_sky, c_sky
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

        if (!is_onTheGround) {
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



      if (have_button_submerge  &&  open_shake) {
        translate(-real(map(noise(frameCount*100), 0, 1, -20, 20)), -real(map(noise(frameCount*100+999), 0, 1, -12, 12)), 0);
      }




      if (have_button_jump  &&  open_jump) {
        translate(0, -map(sin(map(time_jump, 0, 15, 0, PI)), 0, 1, 0, real(map(speed, 0, real(20), 0.1, 100))), 0);
      }





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



    pop();







    if (open_info) {
      PG.clear();
      displayInfo();
      // displayInfo_true();
      image(PG, -width/2, -height/2, width, height);
    }
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

//@funnysandwich