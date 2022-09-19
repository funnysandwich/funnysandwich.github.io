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