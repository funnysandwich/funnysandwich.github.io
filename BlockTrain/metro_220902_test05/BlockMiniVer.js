function BlockMiniVer(begin, W, D, state_side, index_z) {
  this.begin = begin.copy();
  this.W = W;
  this.D = D;
  this.index_z = index_z;



  this.have_billMc = false;
  this.have_billYoubetu = false;
  this.have_billTezos = false;
  this.have_billMessage = false;
  this.have_billLike = false;
  this.have_billCannotReturn = false;
  this.have_billCall = false;
  this.have_billBitcoin = false;
  this.have_billEthereum = false;
  this.have_billTelegram = false;
  this.have_parking = false;
  this.have_billMetro = false;
  this.have_billFile = false;
  this.have_tree = false;
  this.have_fair = false;
  this.have_constrSite = false;
  this.have_paifang = false;
  this.have_PTTower = false;
  this.have_gazebo = false;








  let sum = rate_billMc + rate_billYoubetu + rate_billTezos + rate_billMessage + rate_billLike + rate_billCannotReturn + rate_billCall + rate_billPower + rate_billBitcoin + rate_billEthereum + rate_billTelegram + rate_parking + rate_billMetro + rate_billFile + rate_tree + rate_fair;
  if (this.W >= real(250)) {
    sum += rate_paifang;
  }
  if (this.W >= real(90)) {
    sum += rate_PTTower;

  }
  sum += rate_gazebo;



  const real_rate_billMc = rate_billMc / sum;
  const real_rate_billYoubetu = rate_billYoubetu / sum;
  const real_rate_billTezos = rate_billTezos / sum;
  const real_rate_billMessage = rate_billMessage / sum;
  const real_rate_billLike = rate_billLike / sum;
  const real_rate_billCannotReturn = rate_billCannotReturn / sum;
  const real_rate_billCall = rate_billCall / sum;
  const real_rate_billPower = rate_billPower / sum;
  const real_rate_billBitcoin = rate_billBitcoin / sum;
  const real_rate_billEthereum = rate_billEthereum / sum;
  const real_rate_billTelegram = rate_billTelegram / sum;
  const real_rate_parking = rate_parking / sum;
  const real_rate_billMetro = rate_billMetro / sum;
  const real_rate_billFile = rate_billFile / sum;
  const real_rate_tree = rate_tree / sum;
  const real_rate_fair = rate_fair / sum;
  let real_rate_paifang = 0;
  if (this.W >= real(250)) {
    real_rate_paifang = rate_paifang / sum;
  }
  let real_rate_PTTower = 0;
  if (this.W >= real(90)) {
    real_rate_PTTower = rate_PTTower / sum;
  }
  const real_rate_gazebo = rate_gazebo / sum;



  const var_rate = random(1);
  if (var_rate < real_rate_billMc) {
    this.have_billMc = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu) {
    this.have_billYoubetu = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos) {
    this.have_billTezos = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage) {
    this.have_billMessage = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike) {
    this.have_billLike = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn) {
    this.have_billCannotReturn = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall) {
    this.have_billCall = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower) {
    this.have_billPower = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin) {
    this.have_billBitcoin = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum) {
    this.have_billEthereum = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram) {
    this.have_billTelegram = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking) {
    this.have_parking = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro) {
    this.have_billMetro = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile) {
    this.have_billFile = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile + real_rate_tree) {
    this.have_tree = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile + real_rate_tree + real_rate_fair) {
    this.have_fair = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile + real_rate_tree + real_rate_fair + real_rate_paifang) {
    this.have_paifang = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile + real_rate_tree + real_rate_fair + real_rate_paifang + real_rate_PTTower) {
    this.have_PTTower = true;
  } else if (var_rate < real_rate_billMc + real_rate_billYoubetu + real_rate_billTezos + real_rate_billMessage + real_rate_billLike + real_rate_billCannotReturn + real_rate_billCall + real_rate_billPower + real_rate_billBitcoin + real_rate_billEthereum + real_rate_billTelegram + real_rate_parking + real_rate_billMetro + real_rate_billFile + real_rate_tree + real_rate_fair + real_rate_paifang + real_rate_PTTower + real_rate_gazebo) {
    this.have_gazebo = true;
  }






  if (this.have_billMc) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billMc = new Bill_Mc(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billYoubetu) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billYoubetu = new Bill_Youbetu(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billTezos) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billTezos = new Bill_Tezos(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billMessage) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billMessage = new Bill_Message(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billLike) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billLike = new Bill_Like(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billCannotReturn) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billCannotReturn = new Bill_CannotReturn(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billCall) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billCall = new Bill_Call(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billPower) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billPower = new Bill_Power(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billBitcoin) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billBitcoin = new Bill_Bitcoin(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billEthereum) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billEthereum = new Bill_Ethereum(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billTelegram) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billTelegram = new Bill_Telegram(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_parking) {
    this.W_all_parking = random(real(74.5), this.W);
    this.num_hor_parking = floor(map(min(this.W_all_parking, real(250)), real(74.5), real(250), 1, 4));
    this.num_ver_parking = floor(random(2, 7));
    this.gap_parking = real(6);
    this.W_parking = ((this.W_all_parking-this.gap_parking)/this.num_hor_parking) - this.gap_parking;
    this.D_parking = real(random(40, 65));
    this.D_all_parking = this.D_parking*this.num_ver_parking + this.gap_parking*this.num_ver_parking + this.gap_parking;
    this.X_parking = random(0, this.W-this.W_all_parking);
    this.Z_parking = random(0, this.D-this.D_all_parking);

    this.node_hor_parking = Array.from(Array(this.num_ver_parking+1), () => new Array(4));
    this.node_ver_parking = Array.from(Array(this.num_hor_parking+1), () => new Array(4));

    for (let i=0; i<this.node_hor_parking.length; i++) {
      let center;
      if (i == 0) {
        center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.gap_parking/2.0);
      } else if (i == this.node_hor_parking.length-1) {
        center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.D_all_parking - this.gap_parking/2.0);
      } else {
        const z = (this.D_all_parking-(this.gap_parking*2)) / (this.node_hor_parking.length-1) * i;
        center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.gap_parking + z);
      }
      for (let j=0; j<this.node_hor_parking[i].length; j++) {
        this.node_hor_parking[i][j] = createVector(this.W_all_parking/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.gap_parking/2.0 * pow(-1, floor(j/2)+1)).add(center);
      }
    }

    for (let i=0; i<this.node_ver_parking.length; i++) {
      let center;
      if (i == 0) {
        center = this.begin.copy().add(this.X_parking + this.gap_parking/2.0, 0, this.Z_parking + this.D_all_parking/2.0);
      } else if (i == this.node_ver_parking.length-1) {
        center = this.begin.copy().add(this.X_parking + this.W_all_parking - this.gap_parking/2.0, 0, this.Z_parking + this.D_all_parking/2.0);
      } else {
        const x = (this.W_all_parking-(this.gap_parking*2)) / (this.node_ver_parking.length-1) * i;
        center = this.begin.copy().add(this.X_parking + this.gap_parking + x, 0, this.Z_parking + this.D_all_parking/2.0);
      }
      for (let j=0; j<this.node_ver_parking[i].length; j++) {
        this.node_ver_parking[i][j] = createVector(this.gap_parking/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D_all_parking/2.0 * pow(-1, floor(j/2)+1)).add(center);
      }
    }
  }

  if (this.have_billMetro) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billMetro = new Bill_Metro(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_billFile) {
    let x = random(this.begin.x, this.begin.x+this.W-real(75));
    let z = random(this.begin.z, this.begin.z+this.D-real(75));
    if (this.index_z == 5) {
      z = random(this.begin.z+this.D-real(100), this.begin.z+this.D-real(75));
    }
    this.billFile = new Bill_File(createVector(x, this.begin.y, z), this.index_z);
  }

  if (this.have_tree) {
    const num_hor = max(floor(this.W / real(200)), 1);
    const num_ver = max(floor(this.D / real(200)), 1);
    this.tree = [];
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        const x = map(j, 0, num_hor, 0, this.W);
        const z = map(i, 0, num_ver, 0, this.D);
        this.tree.push(new Tree(this.begin.copy().add(x, 0, z), min(real(200), this.W), this.index_z));
      }
    }
  }


  if (this.have_fair) {
    const num_hor = max(floor(this.W / real(200)), 1);
    const num_ver = max(floor(this.D / real(200)), 1);
    this.popupTent = [];
    for (let i=0; i<num_ver; i++) {
      for (let j=0; j<num_hor; j++) {
        const x = map(j, 0, num_hor, 0, this.W);
        const z = map(i, 0, num_ver, 0, this.D);
        this.popupTent.push(new PopupTent(this.begin.copy().add(x, 0, z), min(real(200), this.W)));
      }
    }
  }


  if (this.have_constrSite) {
    this.W_constrSite = random(max(this.W*0.8, real(65)), max(this.W*0.85, real(68)));
    this.D_constrSite = random(max(this.D*0.8, real(125)), max(this.D*0.85, real(130)));
    this.H_constrSite = real(random(30, 110));
    this.X_constrSite = random(0, this.W-this.W_constrSite);
    this.Z_constrSite = random(0, this.D-this.D_constrSite);

    this.node_wall_constrSite = Array.from(Array(2), () => new Array(4));
    for (let i=0; i<2; i++) {
      for (let j=0; j<4; j++) {
        this.node_wall_constrSite[i][j] = createVector(this.begin.x+this.X_constrSite+this.W_constrSite/2.0, this.begin.y, this.begin.z+this.Z_constrSite+this.D_constrSite/2.0);
      }
    }
  }


  if (this.have_paifang) {
    const w = min(this.W * 0.9, real(235));
    let x = random(0, this.W-w-real(15));
    if (state_side == 1) {
      x = random(real(7.5), this.W-w-real(7.5));
    } else if (state_side == 2) {
      x = random(real(15), this.W-w);
    }
    const z = random(real(30), this.D-real(30));
    this.paifang = new Paifang(this.begin.copy().add(x, 0, z), w);
  }

  if (this.have_PTTower) {
    const w = min(random(real(90)*0.9, real(150)), this.W*0.9);
    const x = random(w/2.0+real(4), this.W-w/2.0-real(4));
    const z = random(w/2.0+real(10), this.D-w/2.0-real(10));
    const h = real(random(300, 500));

    this.pTTower = new PTTower(this.begin.copy().add(x, 0, z), w, h, this.index_z, 1, true);
  }


  if (this.have_gazebo) {
    const w = min(random(real(74.5), this.W) - real(10), real(150));
    let x = random(real(5) + w/2.0, this.W - w/2.0 - real(5));
    if (state_side == 0) {
      x = random(w/2.0, this.W - w/2.0 - real(10));
    } else if (state_side == 2) {
      x = random(real(10) + w/2.0, this.W - w/2.0);
    }
    const z = random(w/2.0+real(10), this.D-w/2.0-real(10));

    this.gazebo = new Gazebo(this.begin.copy().add(x, 0, z), w);
  }






  this.change = function() {
  };






  this.update = function() {
    this.begin.x += speed;


    if (this.have_billMc) {
      this.billMc.update();
    }
    if (this.have_billYoubetu) {
      this.billYoubetu.update();
    }
    if (this.have_billTezos) {
      this.billTezos.update();
    }
    if (this.have_billMessage) {
      this.billMessage.update();
    }
    if (this.have_billLike) {
      this.billLike.update();
    }
    if (this.have_billCannotReturn) {
      this.billCannotReturn.update();
    }
    if (this.have_billCall) {
      this.billCall.update();
    }
    if (this.have_billPower) {
      this.billPower.update();
    }
    if (this.have_billBitcoin) {
      this.billBitcoin.update();
    }
    if (this.have_billEthereum) {
      this.billEthereum.update();
    }
    if (this.have_billTelegram) {
      this.billTelegram.update();
    }


    if (this.have_parking) {
      for (let i=0; i<this.node_hor_parking.length; i++) {
        let center;
        if (i == 0) {
          center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.gap_parking/2.0);
        } else if (i == this.node_hor_parking.length-1) {
          center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.D_all_parking - this.gap_parking/2.0);
        } else {
          const z = (this.D_all_parking-(this.gap_parking*2)) / (this.node_hor_parking.length-1) * i;
          center = this.begin.copy().add(this.X_parking + this.W_all_parking/2.0, 0, this.Z_parking + this.gap_parking + z);
        }
        for (let j=0; j<this.node_hor_parking[i].length; j++) {
          this.node_hor_parking[i][j] = createVector(this.W_all_parking/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.gap_parking/2.0 * pow(-1, floor(j/2)+1)).add(center);
        }
      }

      for (let i=0; i<this.node_ver_parking.length; i++) {
        let center;
        if (i == 0) {
          center = this.begin.copy().add(this.X_parking + this.gap_parking/2.0, 0, this.Z_parking + this.D_all_parking/2.0);
        } else if (i == this.node_ver_parking.length-1) {
          center = this.begin.copy().add(this.X_parking + this.W_all_parking - this.gap_parking/2.0, 0, this.Z_parking + this.D_all_parking/2.0);
        } else {
          const x = (this.W_all_parking-(this.gap_parking*2)) / (this.node_ver_parking.length-1) * i;
          center = this.begin.copy().add(this.X_parking + this.gap_parking + x, 0, this.Z_parking + this.D_all_parking/2.0);
        }
        for (let j=0; j<this.node_ver_parking[i].length; j++) {
          this.node_ver_parking[i][j] = createVector(this.gap_parking/2.0 * pow(-1, ceil(j%1.5)+1), 0, this.D_all_parking/2.0 * pow(-1, floor(j/2)+1)).add(center);
        }
      }
    }


    if (this.have_billMetro) {
      this.billMetro.update();
    }

    if (this.have_billFile) {
      this.billFile.update();
    }


    if (this.have_tree) {
      for (let i=0; i<this.tree.length; i++) {
        this.tree[i].update();
      }
    }


    if (this.have_fair) {
      for (let i=0; i<this.popupTent.length; i++) {
        this.popupTent[i].update();
      }
    }


    if (this.have_constrSite) {
      for (let i=0; i<2; i++) {
        for (let j=0; j<4; j++) {
          if (i == 0) {
            this.node_wall_constrSite[i][j] = createVector(this.W_constrSite/2.0 * pow(-1, ceil(j%1.5)+1), -this.H_constrSite*i, this.D_constrSite/2.0 * pow(-1, floor(j/2)+1));
            this.node_wall_constrSite[i][j].add(this.begin.x+this.X_constrSite+this.W_constrSite/2.0, this.begin.y, this.begin.z+this.Z_constrSite+this.D_constrSite/2.0);
          } else {
            let n = createVector(this.W_constrSite/2.0 * pow(-1, ceil(j%1.5)+1), -this.H_constrSite*i, this.D_constrSite/2.0 * pow(-1, floor(j/2)+1));
            n.add(this.begin.x+this.X_constrSite+this.W_constrSite/2.0+speed, this.begin.y, this.begin.z+this.Z_constrSite+this.D_constrSite/2.0);
            this.node_wall_constrSite[i][j] = easing_p(this.node_wall_constrSite[i][j], n, 0.5);
          }
        }
      }
    }

    if (this.have_paifang) {
      this.paifang.update();
    }

    if (this.have_PTTower) {
      this.pTTower.update();
    }

    if (this.have_gazebo) {
      this.gazebo.update();
    }
  };








  this.display = function() {
    //noStroke();
    //beginShape(TRIANGLES);
    if (this.have_billMc) {
      this.billMc.display();
    }
    if (this.have_billYoubetu) {
      this.billYoubetu.display();
    }
    if (this.have_billTezos) {
      this.billTezos.display();
    }
    if (this.have_billMessage) {
      this.billMessage.display();
    }
    if (this.have_billLike) {
      this.billLike.display();
    }
    if (this.have_billCannotReturn) {
      this.billCannotReturn.display();
    }
    if (this.have_billCall) {
      this.billCall.display();
    }
    if (this.have_billPower) {
      this.billPower.display();
    }
    if (this.have_billBitcoin) {
      this.billBitcoin.display();
    }
    if (this.have_billEthereum) {
      this.billEthereum.display();
    }
    if (this.have_billTelegram) {
      this.billTelegram.display();
    }


    if (this.have_parking) {
      let c1, c2;
      for (let i=0; i<this.node_hor_parking.length; i++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_hor_parking[i][0].z-real(500), skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_hor_parking[i][3].z-real(500), skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_hor_parking[i][0], this.node_hor_parking[i][1], this.node_hor_parking[i][2], this.node_hor_parking[i][3], c1, c1, c2, c2);
      }
      for (let i=0; i<this.node_ver_parking.length; i++) {
        c1 = lerpColor(c_near, c_far, constrain(map(this.node_ver_parking[i][0].z-real(500), skyline.z, 0, 1, 0), 0, 1));
        c2 = lerpColor(c_near, c_far, constrain(map(this.node_ver_parking[i][3].z-real(500), skyline.z, 0, 1, 0), 0, 1));
        TRIANGLES_getRect_fill4(this.node_ver_parking[i][0], this.node_ver_parking[i][1], this.node_ver_parking[i][2], this.node_ver_parking[i][3], c1, c1, c2, c2);
      }
    }


    if (this.have_billMetro) {
      this.billMetro.display();
    }
    if (this.have_billFile) {
      this.billFile.display();
    }


    if (this.have_tree) {
      for (let i=0; i<this.tree.length; i++) {
        this.tree[i].display();
      }
    }

    if (this.have_fair) {
      for (let i=0; i<this.popupTent.length; i++) {
        this.popupTent[i].display();
      }
    }

    if (this.have_constrSite) {
      let c1, c2;
      /*c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][0].z-real(1000), skyline.z, 0, 1, 0), 0, 0.95));
       c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][3].z-real(1000), skyline.z, 0, 1, 0), 0, 0.95));
       //F
       TRIANGLES_getRect_fill(this.node_wall_constrSite[1][3], this.node_wall_constrSite[1][2], this.node_wall_constrSite[0][2], this.node_wall_constrSite[0][3], c2);
       //B
       TRIANGLES_getRect_fill(this.node_wall_constrSite[1][0], this.node_wall_constrSite[1][1], this.node_wall_constrSite[0][1], this.node_wall_constrSite[0][0], c1);
       //L
       TRIANGLES_getRect_fill4(this.node_wall_constrSite[1][0], this.node_wall_constrSite[1][3], this.node_wall_constrSite[0][3], this.node_wall_constrSite[0][0], c1, c2, c2, c1);
       //R
       TRIANGLES_getRect_fill4(this.node_wall_constrSite[1][2], this.node_wall_constrSite[1][1], this.node_wall_constrSite[0][1], this.node_wall_constrSite[0][2], c2, c1, c1, c2);
       */
      const w = real(5);
      c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][3].z, skyline.z, 0, 1, 0), 0, 0.95));
      //c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][3].z-real(1000), skyline.z, 0, 1, 0), 0, 0.95));
      fill(c1);
      TRIANGLES_getLine_weightToR(this.node_wall_constrSite[0][0], this.node_wall_constrSite[1][0], w);
      TRIANGLES_getLine_weightToR(this.node_wall_constrSite[0][3], this.node_wall_constrSite[1][3], w);
      TRIANGLES_getLine_weightToL(this.node_wall_constrSite[0][1], this.node_wall_constrSite[1][1], w);
      TRIANGLES_getLine_weightToL(this.node_wall_constrSite[0][2], this.node_wall_constrSite[1][2], w);
      TRIANGLES_getLine_weightToD_Y(this.node_wall_constrSite[1][3], this.node_wall_constrSite[1][2], w);
      TRIANGLES_getLine_weightToD_Y(this.node_wall_constrSite[1][0], this.node_wall_constrSite[1][1], w);
      TRIANGLES_getLine_weightToR(this.node_wall_constrSite[1][0], this.node_wall_constrSite[1][3], w);
      TRIANGLES_getLine_weightToL(this.node_wall_constrSite[1][1], this.node_wall_constrSite[1][2], w);

      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][3], this.node_wall_constrSite[1][2], w);
      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][2], this.node_wall_constrSite[1][1], w);
      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][1], this.node_wall_constrSite[1][0], w);
      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][0], this.node_wall_constrSite[1][3], w);
      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][2], this.node_wall_constrSite[1][3], w);
      TRIANGLES_getLine_weight_Y(this.node_wall_constrSite[0][0], this.node_wall_constrSite[1][1], w);

      c1 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][3].z-real(2000), skyline.z, 0, 1, 0), 0, 0.95));
      c2 = lerpColor(c_near, c_far, constrain(map(this.node_wall_constrSite[0][3].z-real(2000), skyline.z, 0, 1, 0), 0, 0.95));

      TRIANGLES_getRect_fill4(this.node_wall_constrSite[0][0], this.node_wall_constrSite[0][1], this.node_wall_constrSite[0][2], this.node_wall_constrSite[0][3], c1, c1, c2, c2);
    }


    if (this.have_paifang) {
      this.paifang.display();
    }

    if (this.have_PTTower) {
      this.pTTower.display();
    }

    if (this.have_gazebo) {
      this.gazebo.display();
    }
    //endShape();
  };




  this.displayInfo = function() {
    //noStroke();
    //fill(255, 0, 0);
    //beginShape();
    //vertex(this.begin.x, this.begin.y, this.begin.z);
    //vertex(this.begin.x+W, this.begin.y, this.begin.z);
    //vertex(this.begin.x+W, this.begin.y, this.begin.z+D);
    //vertex(this.begin.x, this.begin.y, this.begin.z+D);
    //endShape();


    //noFill();
    //strokeWeight(real(2));
    //stroke(c_info2);
    //beginShape(LINES);
    if (this.have_billMc) {
      this.billMc.displayInfo();
    }
    if (this.have_billYoubetu) {
      this.billYoubetu.displayInfo();
    }
    if (this.have_billTezos) {
      this.billTezos.displayInfo();
    }
    if (this.have_billMessage) {
      this.billMessage.displayInfo();
    }
    if (this.have_billLike) {
      this.billLike.displayInfo();
    }
    if (this.have_billCannotReturn) {
      this.billCannotReturn.displayInfo();
    }
    if (this.have_billCall) {
      this.billCall.displayInfo();
    }
    if (this.have_billPower) {
      this.billPower.displayInfo();
    }
    if (this.have_billBitcoin) {
      this.billBitcoin.displayInfo();
    }
    if (this.have_billEthereum) {
      this.billEthereum.displayInfo();
    }
    if (this.have_billTelegram) {
      this.billTelegram.displayInfo();
    }
    if (this.have_billMetro) {
      this.billMetro.displayInfo();
    }
    if (this.have_billFile) {
      this.billFile.displayInfo();
    }
    if (this.have_tree) {
      for (let i=0; i<this.tree.length; i++) {
        this.tree[i].displayInfo();
      }
    }
    if (this.have_fair) {
      for (let i=0; i<this.popupTent.length; i++) {
        this.popupTent[i].displayInfo();
      }
    }
    if (this.have_constrSite) {
      for (let i=0; i<this.node_wall_constrSite.length; i++) {
        LINES_getRect(this.node_wall_constrSite[i][0], this.node_wall_constrSite[i][1], this.node_wall_constrSite[i][2], this.node_wall_constrSite[i][3]);
      }
      for (let i=0; i<this.node_wall_constrSite[0].length; i++) {
        LINES_getLine(this.node_wall_constrSite[0][i], this.node_wall_constrSite[1][i]);
      }
    }
    if (this.have_paifang) {
      this.paifang.displayInfo();
    }
    if (this.have_PTTower) {
      this.pTTower.displayInfo();
    }
    if (this.have_gazebo) {
      this.gazebo.displayInfo();
    }
    //endShape();
  };
}