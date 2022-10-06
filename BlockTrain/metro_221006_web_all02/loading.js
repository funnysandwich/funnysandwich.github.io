function countProb(number) {
  let real_rate = new Array(number.length);
  let sum = 0;
  for (let i=0; i<number.length; i++) {
    sum += number[i];
  }

  for (let i=0; i<number.length; i++) {
    real_rate[i] = number[i] / sum;
  }

  const r = FS_rand(0, 1);

  let s_real_rate = 0;
  let index_final = 0;
  for (let i=0; i<number.length; i++) {
    s_real_rate += real_rate[i];
    if (r < s_real_rate) {
      index_final = i;
      break;
    }
  }

  return index_final;
}





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
function loadingSound_object(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    songs_object.push(sound);
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
function loadingSound_tornado(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    song_tornado.push(sound);
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}
function loadingSound_boom(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    song_boom.push(sound);
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}
function loadingSound_thunder(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    song_thunder = sound;
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
}
function loadingSound_trainPass(filename) {
  loadSound(filename, soundLoaded);
  function soundLoaded(sound) {
    print(filename);
    song_trainPass.push(sound);
    count_songs ++;
    if (count_songs == totalSongs) {
      is_song_load_done = true;
    }
  }
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





function PBLoaded(str_PB) {
  if (str_PB[0][6] != 'A') {

    if (str_PB[0][4] == '0') {
      num_PB0 += 1;
      let var_px = Array.from(Array(23), () => new Array(23));
      for (let i=0; i<var_px.length; i++) {
        for (let j=0; j<var_px[i].length; j++) {
          var_px[i][j] = constrain(Math.floor(str_PB[0][11+(j*3)+0 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+1 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+2 + i*var_px[i].length*3]), 0, 255) / 255.0;
        }
      }

      let B = createGraphics(23*dpi, 23*dpi);
      B.loadPixels();
      for (let i = 0; i < B.width; i++) {
        for (let j = 0; j < B.height; j++) {
          let c = color(lerpColor(c_near, c_far, var_px[floor(i/dpi)][floor(j/dpi)]));
          if (open_mode_line) {
            c = color(lerpColor(c_sky, c_near, var_px[floor(i/dpi)][floor(j/dpi)]));
          }
          B.set(i, j, c);
        }
      }
      B.updatePixels();
      BILL[0].push(B);

      open_billboardRoof = true;
      rate_billboardRoof = floor(random(2, 10)) * 0.1;
    } else if (str_PB[0][4] == '1') {
      num_PB1 += 1;
      let var_px = Array.from(Array(39), () => new Array(13));
      for (let i=0; i<var_px.length; i++) {
        for (let j=0; j<var_px[i].length; j++) {
          var_px[i][j] = constrain(Math.floor(str_PB[0][11+(j*3)+0 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+1 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+2 + i*var_px[i].length*3]), 0, 255) / 255.0;
        }
      }
      let B = createGraphics(39*dpi, 13*dpi);
      B.loadPixels();
      for (let i = 0; i < B.width; i++) {
        for (let j = 0; j < B.height; j++) {
          let c = color(lerpColor(c_near, c_far, var_px[floor(i/dpi)][floor(j/dpi)]));
          if (open_mode_line) {
            c = color(lerpColor(c_sky, c_near, var_px[floor(i/dpi)][floor(j/dpi)]));
          }
          B.set(i, j, c);
        }
      }
      B.updatePixels();
      BILL[1].push(B);

      open_billboard = true;
      rate_billboard = floor(random(2, 10)) * 0.1;
    } else if (str_PB[0][4] == '2') {
      num_PB2 += 1;
      let var_px = Array.from(Array(13), () => new Array(39));
      for (let i=0; i<var_px.length; i++) {
        for (let j=0; j<var_px[i].length; j++) {
          var_px[i][j] = constrain(Math.floor(str_PB[0][11+(j*3)+0 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+1 + i*var_px[i].length*3]  +  str_PB[0][11+(j*3)+2 + i*var_px[i].length*3]), 0, 255) / 255.0;
        }
      }
      let B = createGraphics(13*dpi, 39*dpi);
      B.loadPixels();
      for (let i = 0; i < B.width; i++) {
        for (let j = 0; j < B.height; j++) {
          let c = color(lerpColor(c_near, c_far, var_px[floor(i/dpi)][floor(j/dpi)]));
          if (open_mode_line) {
            c = color(lerpColor(c_sky, c_near, var_px[floor(i/dpi)][floor(j/dpi)]));
          }
          B.set(i, j, c);
        }
      }
      B.updatePixels();
      BILL[2].push(B);

      open_billboardSide = true;
      rate_billboardSide = floor(random(2, 10)) * 0.1;
    }
  }
}
