function Paifang(begin, W) {
  this.begin = begin.copy();
  this.W = W;
  this.var_easing1 = random(0.2, 0.4);
  this.state = floor(random(0, 3));


  this.W_pillar = real(random(15, 24));
  this.H_pillar_target = real(random(120, 250));
  this.H_pillar = 0;
  const num_pillar = 2;

  this.node_pillar = new Array(num_pillar);
  this.moveX_pillar = new Array(num_pillar);

  for (let i=0; i<this.node_pillar.length; i++) {
    this.moveX_pillar[i] = real(random(-40, 40));
    this.node_pillar[i] = Array.from(Array(2), () => new Array(4));
    const center_pillar = this.begin.copy().add(this.W_pillar/2.0 + i*(this.W-this.W_pillar), 0, this.W_pillar/2.0);
    for (let j=0; j<this.node_pillar[i].length; j++) {
      const y = -this.H_pillar * j;
      for (let k=0; k<this.node_pillar[i][j].length; k++) {
        this.node_pillar[i][j][k] = createVector(this.W_pillar/2.0 * pow(-1, ceil(k%1.5)+1)  +  this.moveX_pillar[i]*j, y, this.W_pillar/2.0 * pow(-1, floor(k/2)+1)).add(center_pillar);
      }
    }
  }




  this.H_wall_target = real(random(40, 60));
  this.H_wall = 0;


  this.node_wall = Array.from(Array(2), () => new Array(4));
  this.node_wall[0][0] = this.node_pillar[0][1][0].copy();
  this.node_wall[0][1] = this.node_pillar[1][1][1].copy();
  this.node_wall[0][2] = this.node_pillar[1][1][2].copy();
  this.node_wall[0][3] = this.node_pillar[0][1][3].copy();
  this.node_wall[1][0] = p5.Vector.sub(this.node_pillar[0][1][0], this.node_pillar[0][0][0]).setMag(this.H_wall).add(this.node_pillar[0][1][0]);
  this.node_wall[1][1] = p5.Vector.sub(this.node_pillar[1][1][1], this.node_pillar[1][0][1]).setMag(this.H_wall).add(this.node_pillar[1][1][1]);
  this.node_wall[1][2] = p5.Vector.sub(this.node_pillar[1][1][2], this.node_pillar[1][0][2]).setMag(this.H_wall).add(this.node_pillar[1][1][2]);
  this.node_wall[1][3] = p5.Vector.sub(this.node_pillar[0][1][3], this.node_pillar[0][0][3]).setMag(this.H_wall).add(this.node_pillar[0][1][3]);








  this.H_roof = this.H_wall_target * random(0.5, 0.75);
  this.Xmove_eaver = this.W * random(0.1, 0.2);
  this.Zmove_eaver = this.W * random(0.1, 0.15);

  this.node_roof = new Array(2);

  this.node_roof[0] = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][3]).mult(0.5);
  this.node_roof[0] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[0][3]).setMag(this.H_roof).add(this.node_roof[0]);
  this.node_roof[1] = p5.Vector.add(this.node_wall[1][1], this.node_wall[1][2]).mult(0.5);
  this.node_roof[1] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[0][2]).setMag(this.H_roof).add(this.node_roof[1]);


  this.node_eaver = Array.from(Array(4), () => new Array(4));

  this.node_eaver[0][0] = p5.Vector.sub(this.node_wall[1][0], this.node_wall[1][1]).setMag(this.Xmove_eaver).add(this.node_wall[1][0]);
  this.node_eaver[0][0] = p5.Vector.sub(this.node_wall[1][0], this.node_wall[1][3]).setMag(this.Zmove_eaver).add(this.node_eaver[0][0]);
  this.node_eaver[0][1] = p5.Vector.sub(this.node_wall[1][1], this.node_wall[1][0]).setMag(this.Xmove_eaver).add(this.node_wall[1][1]);
  this.node_eaver[0][1] = p5.Vector.sub(this.node_wall[1][1], this.node_wall[1][2]).setMag(this.Zmove_eaver).add(this.node_eaver[0][1]);
  this.node_eaver[0][2] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[1][3]).setMag(this.Xmove_eaver).add(this.node_wall[1][2]);
  this.node_eaver[0][2] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[1][1]).setMag(this.Zmove_eaver).add(this.node_eaver[0][2]);
  this.node_eaver[0][3] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[1][2]).setMag(this.Xmove_eaver).add(this.node_wall[1][3]);
  this.node_eaver[0][3] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[1][0]).setMag(this.Zmove_eaver).add(this.node_eaver[0][3]);

  this.node_eaver[this.node_eaver.length-1][0] = this.node_roof[0].copy();
  this.node_eaver[this.node_eaver.length-1][1] = this.node_roof[1].copy();
  this.node_eaver[this.node_eaver.length-1][2] = this.node_roof[1].copy();
  this.node_eaver[this.node_eaver.length-1][3] = this.node_roof[0].copy();

  for (let i=1; i<this.node_eaver.length-1; i++) {
    const t_ = map(i, 0, this.node_eaver.length-1, 0, 1);
    const t_x = cos(map(i, 0, this.node_eaver.length-1, HALF_PI, 0));
    const t_y = sin(map(i, 0, this.node_eaver.length-1, HALF_PI, 0));
    for (let j=0; j<this.node_eaver[i].length; j++) {
      let x = lerp(this.node_eaver[0][j].x, this.node_eaver[this.node_eaver.length-1][j].x, t_x);
      let y = lerp(this.node_eaver[0][j].y, this.node_eaver[this.node_eaver.length-1][j].y, 1);
      let z = lerp(this.node_eaver[0][j].z, this.node_eaver[this.node_eaver.length-1][j].z, t_x);
      y += lerp(0, this.H_roof, t_y);
      this.node_eaver[i][j] = createVector(x, y, z);
    }
  }




  this.W_pai = this.W * random(0.25, 0.5);
  if (this.state == 2) {
    this.W_pai = this.W * random(0.37, 0.5);
  }
  this.H_pai = this.H_wall_target * random(0.5, 0.85);
  if (this.state == 1  ||  this.state == 2) {
    this.H_pai = this.H_wall_target * random(0.85, 1.25);
  }
  this.node_pai = new Array(4);

  const um = p5.Vector.add(this.node_wall[1][3], this.node_wall[1][2]).mult(0.5);
  const dm = p5.Vector.add(this.node_wall[0][3], this.node_wall[0][2]).mult(0.5);
  this.node_pai[0] = p5.Vector.sub(this.node_wall[1][3], um).setMag(this.W_pai/2.0).add(um);
  this.node_pai[1] = p5.Vector.sub(this.node_wall[1][2], um).setMag(this.W_pai/2.0).add(um);
  this.node_pai[2] = p5.Vector.sub(this.node_wall[0][2], dm).setMag(this.W_pai/2.0).add(dm);
  this.node_pai[3] = p5.Vector.sub(this.node_wall[0][3], dm).setMag(this.W_pai/2.0).add(dm);
  this.node_pai[3] = p5.Vector.sub(this.node_pai[3], this.node_pai[0]).setMag(this.H_pai).add(this.node_pai[0]);
  this.node_pai[2] = p5.Vector.sub(this.node_pai[2], this.node_pai[1]).setMag(this.H_pai).add(this.node_pai[1]);
  for (let i=0; i<this.node_pai.length; i++) {
    this.node_pai[i].add(0, 0, real(1));
  }







  if (this.state == 1  ||  this.state == 2) {




    this.W_wall2 = this.W_pai+real(40);
    this.node_wall2 = Array.from(Array(2), () => new Array(4));

    const um_b = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][1]).mult(0.5);
    const dm_b = p5.Vector.add(this.node_wall[0][0], this.node_wall[0][1]).mult(0.5);
    this.node_wall2[0][0] = p5.Vector.sub(this.node_wall[1][0], um_b).setMag(this.W_wall2/2.0).add(um_b);
    this.node_wall2[0][1] = p5.Vector.sub(this.node_wall[1][1], um_b).setMag(this.W_wall2/2.0).add(um_b);
    this.node_wall2[0][2] = p5.Vector.sub(this.node_wall[1][2], um).setMag(this.W_wall2/2.0).add(um);
    this.node_wall2[0][3] = p5.Vector.sub(this.node_wall[1][3], um).setMag(this.W_wall2/2.0).add(um);
    this.node_wall2[1][0] = p5.Vector.sub(this.node_wall2[0][0], p5.Vector.sub(this.node_wall[0][0], dm_b).setMag(this.W_wall2/2.0).add(dm_b)).add(this.node_wall2[0][0]);
    this.node_wall2[1][1] = p5.Vector.sub(this.node_wall2[0][1], p5.Vector.sub(this.node_wall[0][1], dm_b).setMag(this.W_wall2/2.0).add(dm_b)).add(this.node_wall2[0][1]);
    this.node_wall2[1][2] = p5.Vector.sub(this.node_wall2[0][2], p5.Vector.sub(this.node_wall[0][2], dm).setMag(this.W_wall2/2.0).add(dm)).add(this.node_wall2[0][2]);
    this.node_wall2[1][3] = p5.Vector.sub(this.node_wall2[0][3], p5.Vector.sub(this.node_wall[0][3], dm).setMag(this.W_wall2/2.0).add(dm)).add(this.node_wall2[0][3]);




    this.node_eaver_cut = Array.from(Array(this.node_eaver.length), () => new Array(2));
    for (let i=0; i<this.node_eaver.length; i++) {
      const m_eaver = p5.Vector.add(this.node_eaver[i][3], this.node_eaver[i][2]).mult(0.5);
      this.node_eaver_cut[i][0] = p5.Vector.sub(this.node_eaver[i][3], m_eaver).setMag(this.W_wall2/2.0).add(m_eaver);
      this.node_eaver_cut[i][1] = p5.Vector.sub(this.node_eaver[i][2], m_eaver).setMag(this.W_wall2/2.0).add(m_eaver);
    }




    this.H_roof2 = this.H_roof * random(0.65, 0.85);
    this.Xmove_eaver2 = this.W_wall2 * random(0.2, 0.25);
    this.Zmove_eaver2 = this.W_wall2 * random(0.1, 0.15);

    let node_roof2 = [createVector(0, 0, 0), createVector(0, 0, 0)];
    node_roof2[0] = p5.Vector.add(this.node_wall2[1][0], this.node_wall2[1][3]).mult(0.5);
    node_roof2[0] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[0][3]).setMag(this.H_roof2).add(node_roof2[0]);
    node_roof2[1] = p5.Vector.add(this.node_wall2[1][1], this.node_wall2[1][2]).mult(0.5);
    node_roof2[1] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[0][2]).setMag(this.H_roof2).add(node_roof2[1]);


    this.node_eaver2 = Array.from(Array(4), () => new Array(4));
    this.node_eaver2[0][0] = p5.Vector.sub(this.node_wall2[1][0], this.node_wall2[1][1]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][0]);
    this.node_eaver2[0][0] = p5.Vector.sub(this.node_wall2[1][0], this.node_wall2[1][3]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][0]);
    this.node_eaver2[0][1] = p5.Vector.sub(this.node_wall2[1][1], this.node_wall2[1][0]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][1]);
    this.node_eaver2[0][1] = p5.Vector.sub(this.node_wall2[1][1], this.node_wall2[1][2]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][1]);
    this.node_eaver2[0][2] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[1][3]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][2]);
    this.node_eaver2[0][2] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[1][1]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][2]);
    this.node_eaver2[0][3] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[1][2]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][3]);
    this.node_eaver2[0][3] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[1][0]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][3]);

    this.node_eaver2[this.node_eaver2.length-1][0] = node_roof2[0].copy();
    this.node_eaver2[this.node_eaver2.length-1][1] = node_roof2[1].copy();
    this.node_eaver2[this.node_eaver2.length-1][2] = node_roof2[1].copy();
    this.node_eaver2[this.node_eaver2.length-1][3] = node_roof2[0].copy();

    for (let i=1; i<this.node_eaver2.length-1; i++) {
      const t_ = map(i, 0, this.node_eaver2.length-1, 0, 1);
      const t_x = cos(map(i, 0, this.node_eaver2.length-1, HALF_PI, 0));
      const t_y = sin(map(i, 0, this.node_eaver2.length-1, HALF_PI, 0));
      for (let j=0; j<this.node_eaver2[i].length; j++) {
        let x = lerp(this.node_eaver2[0][j].x, this.node_eaver2[this.node_eaver2.length-1][j].x, t_x);
        let y = lerp(this.node_eaver2[0][j].y, this.node_eaver2[this.node_eaver2.length-1][j].y, 1);
        let z = lerp(this.node_eaver2[0][j].z, this.node_eaver2[this.node_eaver2.length-1][j].z, t_x);
        y += lerp(0, this.H_roof2, t_y);
        this.node_eaver2[i][j] = createVector(x, y, z);
      }
    }




    const um2 = p5.Vector.add(this.node_wall2[1][3], this.node_wall2[1][2]).mult(0.5);
    const h = p5.Vector.dist(um2, um)-real(10);
    const Ymove_pai = p5.Vector.sub(um, dm).setMag(h);
    for (let i=0; i<this.node_pai.length; i++) {
      this.node_pai[i].add(Ymove_pai);
    }
  }





  if (this.state == 2) {
    this.node_pillar2 = new Array(2);
    for (let i=0; i<this.node_pillar2.length; i++) {
      this.node_pillar2[i] = Array.from(Array(2), () => new Array(4));
    }

    const mfd_for_pillar = p5.Vector.add(this.node_pillar[0][0][3], this.node_pillar[1][0][2]).mult(0.5);
    const mbd_for_pillar = p5.Vector.add(this.node_pillar[0][0][0], this.node_pillar[1][0][1]).mult(0.5);
    const mfu_for_pillar = p5.Vector.add(this.node_pillar[0][1][3], this.node_pillar[1][1][2]).mult(0.5);
    const mbu_for_pillar = p5.Vector.add(this.node_pillar[0][1][0], this.node_pillar[1][1][1]).mult(0.5);

    this.node_pillar2[0][0][0] = p5.Vector.sub(this.node_pillar[0][0][0], mbd_for_pillar).setMag(this.W_wall2/2.0).add(mbd_for_pillar);
    this.node_pillar2[0][0][1] = p5.Vector.sub(mbd_for_pillar, this.node_pillar2[0][0][0]).setMag(this.W_pillar).add(this.node_pillar2[0][0][0]);
    this.node_pillar2[0][0][3] = p5.Vector.sub(this.node_pillar[0][0][3], mfd_for_pillar).setMag(this.W_wall2/2.0).add(mfd_for_pillar);
    this.node_pillar2[0][0][2] = p5.Vector.sub(mfd_for_pillar, this.node_pillar2[0][0][3]).setMag(this.W_pillar).add(this.node_pillar2[0][0][3]);
    this.node_pillar2[0][1][0] = p5.Vector.sub(this.node_pillar[0][1][0], mbu_for_pillar).setMag(this.W_wall2/2.0).add(mbu_for_pillar);
    this.node_pillar2[0][1][1] = p5.Vector.sub(mbu_for_pillar, this.node_pillar2[0][1][0]).setMag(this.W_pillar).add(this.node_pillar2[0][1][0]);
    this.node_pillar2[0][1][3] = p5.Vector.sub(this.node_pillar[0][1][3], mfu_for_pillar).setMag(this.W_wall2/2.0).add(mfu_for_pillar);
    this.node_pillar2[0][1][2] = p5.Vector.sub(mfu_for_pillar, this.node_pillar2[0][1][3]).setMag(this.W_pillar).add(this.node_pillar2[0][1][3]);

    this.node_pillar2[1][0][1] = p5.Vector.sub(this.node_pillar[1][0][1], mbd_for_pillar).setMag(this.W_wall2/2.0).add(mbd_for_pillar);
    this.node_pillar2[1][0][0] = p5.Vector.sub(mbd_for_pillar, this.node_pillar2[1][0][1]).setMag(this.W_pillar).add(this.node_pillar2[1][0][1]);
    this.node_pillar2[1][0][2] = p5.Vector.sub(this.node_pillar[1][0][2], mfd_for_pillar).setMag(this.W_wall2/2.0).add(mfd_for_pillar);
    this.node_pillar2[1][0][3] = p5.Vector.sub(mfd_for_pillar, this.node_pillar2[1][0][2]).setMag(this.W_pillar).add(this.node_pillar2[1][0][2]);
    this.node_pillar2[1][1][1] = p5.Vector.sub(this.node_pillar[1][1][1], mbu_for_pillar).setMag(this.W_wall2/2.0).add(mbu_for_pillar);
    this.node_pillar2[1][1][0] = p5.Vector.sub(mbu_for_pillar, this.node_pillar2[1][1][1]).setMag(this.W_pillar).add(this.node_pillar2[1][1][1]);
    this.node_pillar2[1][1][2] = p5.Vector.sub(this.node_pillar[1][1][2], mfu_for_pillar).setMag(this.W_wall2/2.0).add(mfu_for_pillar);
    this.node_pillar2[1][1][3] = p5.Vector.sub(mfu_for_pillar, this.node_pillar2[1][1][2]).setMag(this.W_pillar).add(this.node_pillar2[1][1][2]);




    this.node_wall3 = new Array(2);
    for (let i=0; i<this.node_wall3.length; i++) {
      this.node_wall3[i] = Array.from(Array(2), () => new Array(4));
    }

    const h_wall3 = this.H_wall - this.H_roof;
    this.node_wall3[0][1][0] = this.node_pillar[0][1][1].copy();
    this.node_wall3[0][1][1] = this.node_pillar2[0][1][0].copy();
    this.node_wall3[0][1][2] = this.node_pillar2[0][1][3].copy();
    this.node_wall3[0][1][3] = this.node_pillar[0][1][2].copy();
    this.node_wall3[0][0][0] = p5.Vector.sub(this.node_pillar[0][0][1], this.node_pillar[0][1][1]).setMag(h_wall3).add(this.node_pillar[0][1][1]);
    this.node_wall3[0][0][1] = p5.Vector.sub(this.node_pillar2[0][0][0], this.node_pillar2[0][1][0]).setMag(h_wall3).add(this.node_pillar2[0][1][0]);
    this.node_wall3[0][0][2] = p5.Vector.sub(this.node_pillar2[0][0][3], this.node_pillar2[0][1][3]).setMag(h_wall3).add(this.node_pillar2[0][1][3]);
    this.node_wall3[0][0][3] = p5.Vector.sub(this.node_pillar[0][0][2], this.node_pillar[0][1][2]).setMag(h_wall3).add(this.node_pillar[0][1][2]);

    this.node_wall3[1][1][0] = this.node_pillar2[1][1][1].copy();
    this.node_wall3[1][1][1] = this.node_pillar[1][1][0].copy();
    this.node_wall3[1][1][2] = this.node_pillar[1][1][3].copy();
    this.node_wall3[1][1][3] = this.node_pillar2[1][1][2].copy();
    this.node_wall3[1][0][0] = p5.Vector.sub(this.node_pillar2[1][0][1], this.node_pillar2[1][1][1]).setMag(h_wall3).add(this.node_pillar2[1][1][1]);
    this.node_wall3[1][0][1] = p5.Vector.sub(this.node_pillar[1][0][0], this.node_pillar[1][1][0]).setMag(h_wall3).add(this.node_pillar[1][1][0]);
    this.node_wall3[1][0][2] = p5.Vector.sub(this.node_pillar[1][0][3], this.node_pillar[1][1][3]).setMag(h_wall3).add(this.node_pillar[1][1][3]);
    this.node_wall3[1][0][3] = p5.Vector.sub(this.node_pillar2[1][0][2], this.node_pillar2[1][1][2]).setMag(h_wall3).add(this.node_pillar2[1][1][2]);
  }













  this.change = function() {
  };











  this.update = function() {
    this.begin.x += speed;

    this.H_pillar = easing_x(this.H_pillar, this.H_pillar_target, this.var_easing1);
    this.H_wall = easing_x(this.H_wall, this.H_wall_target, this.var_easing1);



    for (let i=0; i<this.node_pillar.length; i++) {
      const center_pillar = this.begin.copy().add(this.W_pillar/2.0 + i*(this.W-this.W_pillar), 0, this.W_pillar/2.0);
      for (let j=0; j<this.node_pillar[i].length; j++) {
        const y = -this.H_pillar * j;
        for (let k=0; k<this.node_pillar[i][j].length; k++) {
          this.node_pillar[i][j][k] = createVector(this.W_pillar/2.0 * pow(-1, ceil(k%1.5)+1)  +  this.moveX_pillar[i]*j, y, this.W_pillar/2.0 * pow(-1, floor(k/2)+1)).add(center_pillar);
        }
      }
    }



    this.node_wall[0][0] = this.node_pillar[0][1][0].copy();
    this.node_wall[0][1] = this.node_pillar[1][1][1].copy();
    this.node_wall[0][2] = this.node_pillar[1][1][2].copy();
    this.node_wall[0][3] = this.node_pillar[0][1][3].copy();
    this.node_wall[1][0] = p5.Vector.sub(this.node_pillar[0][1][0], this.node_pillar[0][0][0]).setMag(this.H_wall).add(this.node_pillar[0][1][0]);
    this.node_wall[1][1] = p5.Vector.sub(this.node_pillar[1][1][1], this.node_pillar[1][0][1]).setMag(this.H_wall).add(this.node_pillar[1][1][1]);
    this.node_wall[1][2] = p5.Vector.sub(this.node_pillar[1][1][2], this.node_pillar[1][0][2]).setMag(this.H_wall).add(this.node_pillar[1][1][2]);
    this.node_wall[1][3] = p5.Vector.sub(this.node_pillar[0][1][3], this.node_pillar[0][0][3]).setMag(this.H_wall).add(this.node_pillar[0][1][3]);





    this.node_roof[0] = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][3]).mult(0.5);
    this.node_roof[0] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[0][3]).setMag(this.H_roof).add(this.node_roof[0]);
    this.node_roof[1] = p5.Vector.add(this.node_wall[1][1], this.node_wall[1][2]).mult(0.5);
    this.node_roof[1] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[0][2]).setMag(this.H_roof).add(this.node_roof[1]);


    this.node_eaver[0][0] = p5.Vector.sub(this.node_wall[1][0], this.node_wall[1][1]).setMag(this.Xmove_eaver).add(this.node_wall[1][0]);
    this.node_eaver[0][0] = p5.Vector.sub(this.node_wall[1][0], this.node_wall[1][3]).setMag(this.Zmove_eaver).add(this.node_eaver[0][0]);
    this.node_eaver[0][1] = p5.Vector.sub(this.node_wall[1][1], this.node_wall[1][0]).setMag(this.Xmove_eaver).add(this.node_wall[1][1]);
    this.node_eaver[0][1] = p5.Vector.sub(this.node_wall[1][1], this.node_wall[1][2]).setMag(this.Zmove_eaver).add(this.node_eaver[0][1]);
    this.node_eaver[0][2] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[1][3]).setMag(this.Xmove_eaver).add(this.node_wall[1][2]);
    this.node_eaver[0][2] = p5.Vector.sub(this.node_wall[1][2], this.node_wall[1][1]).setMag(this.Zmove_eaver).add(this.node_eaver[0][2]);
    this.node_eaver[0][3] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[1][2]).setMag(this.Xmove_eaver).add(this.node_wall[1][3]);
    this.node_eaver[0][3] = p5.Vector.sub(this.node_wall[1][3], this.node_wall[1][0]).setMag(this.Zmove_eaver).add(this.node_eaver[0][3]);

    this.node_eaver[this.node_eaver.length-1][0] = this.node_roof[0].copy();
    this.node_eaver[this.node_eaver.length-1][1] = this.node_roof[1].copy();
    this.node_eaver[this.node_eaver.length-1][2] = this.node_roof[1].copy();
    this.node_eaver[this.node_eaver.length-1][3] = this.node_roof[0].copy();

    for (let i=1; i<this.node_eaver.length-1; i++) {
      const t_ = map(i, 0, this.node_eaver.length-1, 0, 1);
      const t_x = cos(map(i, 0, this.node_eaver.length-1, HALF_PI, 0));
      const t_y = sin(map(i, 0, this.node_eaver.length-1, HALF_PI, 0));
      for (let j=0; j<this.node_eaver[i].length; j++) {
        let x = lerp(this.node_eaver[0][j].x, this.node_eaver[this.node_eaver.length-1][j].x, t_x);
        let y = lerp(this.node_eaver[0][j].y, this.node_eaver[this.node_eaver.length-1][j].y, 1);
        let z = lerp(this.node_eaver[0][j].z, this.node_eaver[this.node_eaver.length-1][j].z, t_x);
        y += lerp(0, this.H_roof, t_y);
        this.node_eaver[i][j] = createVector(x, y, z);
      }
    }



    const um = p5.Vector.add(this.node_wall[1][3], this.node_wall[1][2]).mult(0.5);
    const dm = p5.Vector.add(this.node_wall[0][3], this.node_wall[0][2]).mult(0.5);
    this.node_pai[0] = p5.Vector.sub(this.node_wall[1][3], um).setMag(this.W_pai/2.0).add(um);
    this.node_pai[1] = p5.Vector.sub(this.node_wall[1][2], um).setMag(this.W_pai/2.0).add(um);
    this.node_pai[2] = p5.Vector.sub(this.node_wall[0][2], dm).setMag(this.W_pai/2.0).add(dm);
    this.node_pai[3] = p5.Vector.sub(this.node_wall[0][3], dm).setMag(this.W_pai/2.0).add(dm);
    this.node_pai[3] = p5.Vector.sub(this.node_pai[3], this.node_pai[0]).setMag(this.H_pai).add(this.node_pai[0]);
    this.node_pai[2] = p5.Vector.sub(this.node_pai[2], this.node_pai[1]).setMag(this.H_pai).add(this.node_pai[1]);
    for (let i=0; i<this.node_pai.length; i++) {
      this.node_pai[i].add(0, 0, real(1));
    }






    if (this.state == 1  ||  this.state == 2) {



      const um_b = p5.Vector.add(this.node_wall[1][0], this.node_wall[1][1]).mult(0.5);
      const dm_b = p5.Vector.add(this.node_wall[0][0], this.node_wall[0][1]).mult(0.5);
      this.node_wall2[0][0] = p5.Vector.sub(this.node_wall[1][0], um_b).setMag(this.W_wall2/2.0).add(um_b);
      this.node_wall2[0][1] = p5.Vector.sub(this.node_wall[1][1], um_b).setMag(this.W_wall2/2.0).add(um_b);
      this.node_wall2[0][2] = p5.Vector.sub(this.node_wall[1][2], um).setMag(this.W_wall2/2.0).add(um);
      this.node_wall2[0][3] = p5.Vector.sub(this.node_wall[1][3], um).setMag(this.W_wall2/2.0).add(um);
      this.node_wall2[1][0] = p5.Vector.sub(this.node_wall2[0][0], p5.Vector.sub(this.node_wall[0][0], dm_b).setMag(this.W_wall2/2.0).add(dm_b)).add(this.node_wall2[0][0]);
      this.node_wall2[1][1] = p5.Vector.sub(this.node_wall2[0][1], p5.Vector.sub(this.node_wall[0][1], dm_b).setMag(this.W_wall2/2.0).add(dm_b)).add(this.node_wall2[0][1]);
      this.node_wall2[1][2] = p5.Vector.sub(this.node_wall2[0][2], p5.Vector.sub(this.node_wall[0][2], dm).setMag(this.W_wall2/2.0).add(dm)).add(this.node_wall2[0][2]);
      this.node_wall2[1][3] = p5.Vector.sub(this.node_wall2[0][3], p5.Vector.sub(this.node_wall[0][3], dm).setMag(this.W_wall2/2.0).add(dm)).add(this.node_wall2[0][3]);






      for (let i=0; i<this.node_eaver.length; i++) {
        const m_eaver = p5.Vector.add(this.node_eaver[i][3], this.node_eaver[i][2]).mult(0.5);
        this.node_eaver_cut[i][0] = p5.Vector.sub(this.node_eaver[i][3], m_eaver).setMag(this.W_wall2/2.0).add(m_eaver);
        this.node_eaver_cut[i][1] = p5.Vector.sub(this.node_eaver[i][2], m_eaver).setMag(this.W_wall2/2.0).add(m_eaver);
      }







      let node_roof2 = [createVector(0, 0, 0), createVector(0, 0, 0)];
      node_roof2[0] = p5.Vector.add(this.node_wall2[1][0], this.node_wall2[1][3]).mult(0.5);
      node_roof2[0] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[0][3]).setMag(this.H_roof2).add(node_roof2[0]);
      node_roof2[1] = p5.Vector.add(this.node_wall2[1][1], this.node_wall2[1][2]).mult(0.5);
      node_roof2[1] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[0][2]).setMag(this.H_roof2).add(node_roof2[1]);


      this.node_eaver2[0][0] = p5.Vector.sub(this.node_wall2[1][0], this.node_wall2[1][1]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][0]);
      this.node_eaver2[0][0] = p5.Vector.sub(this.node_wall2[1][0], this.node_wall2[1][3]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][0]);
      this.node_eaver2[0][1] = p5.Vector.sub(this.node_wall2[1][1], this.node_wall2[1][0]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][1]);
      this.node_eaver2[0][1] = p5.Vector.sub(this.node_wall2[1][1], this.node_wall2[1][2]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][1]);
      this.node_eaver2[0][2] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[1][3]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][2]);
      this.node_eaver2[0][2] = p5.Vector.sub(this.node_wall2[1][2], this.node_wall2[1][1]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][2]);
      this.node_eaver2[0][3] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[1][2]).setMag(this.Xmove_eaver2).add(this.node_wall2[1][3]);
      this.node_eaver2[0][3] = p5.Vector.sub(this.node_wall2[1][3], this.node_wall2[1][0]).setMag(this.Zmove_eaver2).add(this.node_eaver2[0][3]);

      this.node_eaver2[this.node_eaver2.length-1][0] = node_roof2[0].copy();
      this.node_eaver2[this.node_eaver2.length-1][1] = node_roof2[1].copy();
      this.node_eaver2[this.node_eaver2.length-1][2] = node_roof2[1].copy();
      this.node_eaver2[this.node_eaver2.length-1][3] = node_roof2[0].copy();

      for (let i=1; i<this.node_eaver2.length-1; i++) {
        const t_ = map(i, 0, this.node_eaver2.length-1, 0, 1);
        const t_x = cos(map(i, 0, this.node_eaver2.length-1, HALF_PI, 0));
        const t_y = sin(map(i, 0, this.node_eaver2.length-1, HALF_PI, 0));
        for (let j=0; j<this.node_eaver2[i].length; j++) {
          let x = lerp(this.node_eaver2[0][j].x, this.node_eaver2[this.node_eaver2.length-1][j].x, t_x);
          let y = lerp(this.node_eaver2[0][j].y, this.node_eaver2[this.node_eaver2.length-1][j].y, 1);
          let z = lerp(this.node_eaver2[0][j].z, this.node_eaver2[this.node_eaver2.length-1][j].z, t_x);
          y += lerp(0, this.H_roof2, t_y);
          this.node_eaver2[i][j] = createVector(x, y, z);
        }
      }






      const um2 = p5.Vector.add(this.node_wall2[1][3], this.node_wall2[1][2]).mult(0.5);
      const h = p5.Vector.dist(um2, um)-real(10);
      const Ymove_pai = p5.Vector.sub(um, dm).setMag(h);
      for (let i=0; i<this.node_pai.length; i++) {
        this.node_pai[i].add(Ymove_pai);
      }
    }




    if (this.state == 2) {
      const mfd_for_pillar = p5.Vector.add(this.node_pillar[0][0][3], this.node_pillar[1][0][2]).mult(0.5);
      const mbd_for_pillar = p5.Vector.add(this.node_pillar[0][0][0], this.node_pillar[1][0][1]).mult(0.5);
      const mfu_for_pillar = p5.Vector.add(this.node_pillar[0][1][3], this.node_pillar[1][1][2]).mult(0.5);
      const mbu_for_pillar = p5.Vector.add(this.node_pillar[0][1][0], this.node_pillar[1][1][1]).mult(0.5);

      this.node_pillar2[0][0][0] = p5.Vector.sub(this.node_pillar[0][0][0], mbd_for_pillar).setMag(this.W_wall2/2.0).add(mbd_for_pillar);
      this.node_pillar2[0][0][1] = p5.Vector.sub(mbd_for_pillar, this.node_pillar2[0][0][0]).setMag(this.W_pillar).add(this.node_pillar2[0][0][0]);
      this.node_pillar2[0][0][3] = p5.Vector.sub(this.node_pillar[0][0][3], mfd_for_pillar).setMag(this.W_wall2/2.0).add(mfd_for_pillar);
      this.node_pillar2[0][0][2] = p5.Vector.sub(mfd_for_pillar, this.node_pillar2[0][0][3]).setMag(this.W_pillar).add(this.node_pillar2[0][0][3]);
      this.node_pillar2[0][1][0] = p5.Vector.sub(this.node_pillar[0][1][0], mbu_for_pillar).setMag(this.W_wall2/2.0).add(mbu_for_pillar);
      this.node_pillar2[0][1][1] = p5.Vector.sub(mbu_for_pillar, this.node_pillar2[0][1][0]).setMag(this.W_pillar).add(this.node_pillar2[0][1][0]);
      this.node_pillar2[0][1][3] = p5.Vector.sub(this.node_pillar[0][1][3], mfu_for_pillar).setMag(this.W_wall2/2.0).add(mfu_for_pillar);
      this.node_pillar2[0][1][2] = p5.Vector.sub(mfu_for_pillar, this.node_pillar2[0][1][3]).setMag(this.W_pillar).add(this.node_pillar2[0][1][3]);

      this.node_pillar2[1][0][1] = p5.Vector.sub(this.node_pillar[1][0][1], mbd_for_pillar).setMag(this.W_wall2/2.0).add(mbd_for_pillar);
      this.node_pillar2[1][0][0] = p5.Vector.sub(mbd_for_pillar, this.node_pillar2[1][0][1]).setMag(this.W_pillar).add(this.node_pillar2[1][0][1]);
      this.node_pillar2[1][0][2] = p5.Vector.sub(this.node_pillar[1][0][2], mfd_for_pillar).setMag(this.W_wall2/2.0).add(mfd_for_pillar);
      this.node_pillar2[1][0][3] = p5.Vector.sub(mfd_for_pillar, this.node_pillar2[1][0][2]).setMag(this.W_pillar).add(this.node_pillar2[1][0][2]);
      this.node_pillar2[1][1][1] = p5.Vector.sub(this.node_pillar[1][1][1], mbu_for_pillar).setMag(this.W_wall2/2.0).add(mbu_for_pillar);
      this.node_pillar2[1][1][0] = p5.Vector.sub(mbu_for_pillar, this.node_pillar2[1][1][1]).setMag(this.W_pillar).add(this.node_pillar2[1][1][1]);
      this.node_pillar2[1][1][2] = p5.Vector.sub(this.node_pillar[1][1][2], mfu_for_pillar).setMag(this.W_wall2/2.0).add(mfu_for_pillar);
      this.node_pillar2[1][1][3] = p5.Vector.sub(mfu_for_pillar, this.node_pillar2[1][1][2]).setMag(this.W_pillar).add(this.node_pillar2[1][1][2]);


      const h_wall3 = this.H_wall - this.H_roof;
      this.node_wall3[0][1][0] = this.node_pillar[0][1][1].copy();
      this.node_wall3[0][1][1] = this.node_pillar2[0][1][0].copy();
      this.node_wall3[0][1][2] = this.node_pillar2[0][1][3].copy();
      this.node_wall3[0][1][3] = this.node_pillar[0][1][2].copy();
      this.node_wall3[0][0][0] = p5.Vector.sub(this.node_pillar[0][0][1], this.node_pillar[0][1][1]).setMag(h_wall3).add(this.node_pillar[0][1][1]);
      this.node_wall3[0][0][1] = p5.Vector.sub(this.node_pillar2[0][0][0], this.node_pillar2[0][1][0]).setMag(h_wall3).add(this.node_pillar2[0][1][0]);
      this.node_wall3[0][0][2] = p5.Vector.sub(this.node_pillar2[0][0][3], this.node_pillar2[0][1][3]).setMag(h_wall3).add(this.node_pillar2[0][1][3]);
      this.node_wall3[0][0][3] = p5.Vector.sub(this.node_pillar[0][0][2], this.node_pillar[0][1][2]).setMag(h_wall3).add(this.node_pillar[0][1][2]);

      this.node_wall3[1][1][0] = this.node_pillar2[1][1][1].copy();
      this.node_wall3[1][1][1] = this.node_pillar[1][1][0].copy();
      this.node_wall3[1][1][2] = this.node_pillar[1][1][3].copy();
      this.node_wall3[1][1][3] = this.node_pillar2[1][1][2].copy();
      this.node_wall3[1][0][0] = p5.Vector.sub(this.node_pillar2[1][0][1], this.node_pillar2[1][1][1]).setMag(h_wall3).add(this.node_pillar2[1][1][1]);
      this.node_wall3[1][0][1] = p5.Vector.sub(this.node_pillar[1][0][0], this.node_pillar[1][1][0]).setMag(h_wall3).add(this.node_pillar[1][1][0]);
      this.node_wall3[1][0][2] = p5.Vector.sub(this.node_pillar[1][0][3], this.node_pillar[1][1][3]).setMag(h_wall3).add(this.node_pillar[1][1][3]);
      this.node_wall3[1][0][3] = p5.Vector.sub(this.node_pillar2[1][0][2], this.node_pillar2[1][1][2]).setMag(h_wall3).add(this.node_pillar2[1][1][2]);
    }
  };










  this.display = function() {
    let t, c1, c2;
    noStroke();
    beginShape(TRIANGLES);
    //--- pillar F ---
    t = constrain(map(this.node_pillar[0][0][3].z, skyline.z, 0, 1, 0), 0, 1);
    fill(lerpColor(c_near, c_far, t)); 
    TRIANGLES_getRect(this.node_pillar[0][1][3], this.node_pillar[0][1][2], this.node_pillar[0][0][2], this.node_pillar[0][0][3]);
    TRIANGLES_getRect(this.node_pillar[1][1][3], this.node_pillar[1][1][2], this.node_pillar[1][0][2], this.node_pillar[1][0][3]);

    //--- pillar L ---
    for (let i=0; i<this.node_pillar.length; i++) {
      if (this.node_pillar[i][1][3].x > -real(100)) {
        t = constrain(map(this.node_pillar[i][1][0].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_pillar[i][1][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_pillar[i][1][0], this.node_pillar[i][1][3], this.node_pillar[i][0][3], this.node_pillar[i][0][0], c1, c2, c2, c1);
      }
    }

    //--- pillar R ---
    for (let i=0; i<this.node_pillar.length; i++) {
      if (this.node_pillar[i][1][2].x < real(100)) {
        t = constrain(map(this.node_pillar[i][1][2].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_pillar[i][1][1].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_pillar[i][1][2], this.node_pillar[i][1][1], this.node_pillar[i][0][1], this.node_pillar[i][0][2], c1, c2, c2, c1);
      }
    }



    //--- wall F ---
    t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
    c1 = lerpColor(c_near, c_far, t);
    TRIANGLES_getRect_fill(this.node_wall[1][3], this.node_wall[1][2], this.node_wall[0][2], this.node_wall[0][3], c1);
    //--- wall L ---
    if (this.node_wall[1][3].x > -real(100)) {
      t = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);
      t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      c2 = lerpColor(c_near, c_far, t);
      TRIANGLES_getRect_fill4(this.node_wall[1][0], this.node_wall[1][3], this.node_wall[0][3], this.node_wall[0][0], c1, c2, c2, c1);
    }
    //--- wall R ---
    if (this.node_wall[1][2].x < real(100)) {
      t = constrain(map(this.node_wall[0][2].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);
      t = constrain(map(this.node_wall[0][1].z, skyline.z, 0, 1, 0), 0, 1);
      c2 = lerpColor(c_near, c_far, t);
      TRIANGLES_getRect_fill4(this.node_wall[1][2], this.node_wall[1][1], this.node_wall[0][1], this.node_wall[0][2], c1, c2, c2, c1);
    }




    //--- eaver F ---
    for (let i=0; i<this.node_eaver.length-1; i++) {
      if (this.state == 0) {
        t = constrain(map(this.node_eaver[i+1][3].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_eaver[i][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_eaver[i+1][3], this.node_eaver[i+1][2], this.node_eaver[i][2], this.node_eaver[i][3], c1, c1, c2, c2);
      } else if (this.state == 1  ||  this.state == 2) {
        t = constrain(map(this.node_eaver[i+1][3].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_eaver[i][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_eaver[i+1][3], this.node_eaver_cut[i+1][0], this.node_eaver_cut[i][0], this.node_eaver[i][3], c1, c1, c2, c2);
        TRIANGLES_getRect_fill4(this.node_eaver_cut[i+1][1], this.node_eaver[i+1][2], this.node_eaver[i][2], this.node_eaver_cut[i][1], c1, c1, c2, c2);
        t = constrain(map(this.node_wall[0][0].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill(this.node_roof[0], this.node_roof[1], this.node_wall[0][1], this.node_wall[0][0], c1);
      }
    }
    //--- eaver L ---
    for (let i=0; i<this.node_eaver.length-1; i++) {
      t = constrain(map(this.node_eaver[i][0].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);
      t = constrain(map(this.node_eaver[i][3].z, skyline.z, 0, 1, 0), 0, 1);
      c2 = lerpColor(c_near, c_far, t);
      TRIANGLES_getRect_fill4(this.node_eaver[i+1][0], this.node_eaver[i+1][3], this.node_eaver[i][3], this.node_eaver[i][0], c1, c2, c2, c1);
    }
    //--- eaver R ---
    for (let i=0; i<this.node_eaver.length-1; i++) {
      t = constrain(map(this.node_eaver[i][2].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);
      t = constrain(map(this.node_eaver[i][1].z, skyline.z, 0, 1, 0), 0, 1);
      c2 = lerpColor(c_near, c_far, t);
      TRIANGLES_getRect_fill4(this.node_eaver[i+1][2], this.node_eaver[i+1][1], this.node_eaver[i][1], this.node_eaver[i][2], c1, c2, c2, c1);
    }
    //--- eaver D ---
    if (this.state == 0) {
      t = constrain(map(this.node_eaver[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);    
      TRIANGLES_getRect_fill(this.node_eaver[0][0], this.node_eaver[0][1], this.node_eaver[0][2], this.node_eaver[0][3], c1);
    } else if (this.state == 1  ||  this.state == 2) {
      t = constrain(map(this.node_eaver[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t));    
      vertex(this.node_eaver[0][0].x, this.node_eaver[0][0].y, this.node_eaver[0][0].z);
      vertex(this.node_eaver_cut[0][0].x, this.node_eaver_cut[0][0].y, this.node_eaver_cut[0][0].z);
      vertex(this.node_eaver[0][3].x, this.node_eaver[0][3].y, this.node_eaver[0][3].z);

      vertex(this.node_eaver[0][1].x, this.node_eaver[0][1].y, this.node_eaver[0][1].z);
      vertex(this.node_eaver_cut[0][1].x, this.node_eaver_cut[0][1].y, this.node_eaver_cut[0][1].z);
      vertex(this.node_eaver[0][2].x, this.node_eaver[0][2].y, this.node_eaver[0][2].z);
    }

    //--- pai ---
    t = constrain(map(this.node_pai[0].z-real(400), skyline.z, 0, 1, 0), 0, 1);
    c1 = lerpColor(c_near, c_far, t);
    TRIANGLES_getRect_fill(this.node_pai[0], this.node_pai[1], this.node_pai[2], this.node_pai[3], c1);






    if (this.state == 1  ||  this.state == 2) {
      //--- wall2 F ---
      t = constrain(map(this.node_wall[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);
      TRIANGLES_getRect_fill(this.node_wall2[1][3], this.node_wall2[1][2], this.node_wall2[0][2], this.node_wall2[0][3], c1);
      //--- wall2 L ---
      if (this.node_wall2[1][3].x > -real(100)) {
        t = constrain(map(this.node_wall2[0][0].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_wall2[0][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_wall2[1][0], this.node_wall2[1][3], this.node_wall2[0][3], this.node_wall2[0][0], c1, c2, c2, c1);
      }
      //--- wall2 R ---
      if (this.node_wall2[1][2].x < real(100)) {
        t = constrain(map(this.node_wall2[0][2].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_wall2[0][1].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_wall2[1][2], this.node_wall2[1][1], this.node_wall2[0][1], this.node_wall2[0][2], c1, c2, c2, c1);
      }


      //--- eaver2 F ---
      for (let i=0; i<this.node_eaver2.length-1; i++) {
        t = constrain(map(this.node_eaver2[i+1][3].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_eaver2[i][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_eaver2[i+1][3], this.node_eaver2[i+1][2], this.node_eaver2[i][2], this.node_eaver2[i][3], c1, c1, c2, c2);
      }
      //--- eaver2 L ---
      for (let i=0; i<this.node_eaver2.length-1; i++) {
        t = constrain(map(this.node_eaver2[i][0].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_eaver2[i][3].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_eaver2[i+1][0], this.node_eaver2[i+1][3], this.node_eaver2[i][3], this.node_eaver2[i][0], c1, c2, c2, c1);
      }
      //--- eaver2 R ---
      for (let i=0; i<this.node_eaver2.length-1; i++) {
        t = constrain(map(this.node_eaver2[i][2].z, skyline.z, 0, 1, 0), 0, 1);
        c1 = lerpColor(c_near, c_far, t);
        t = constrain(map(this.node_eaver2[i][1].z, skyline.z, 0, 1, 0), 0, 1);
        c2 = lerpColor(c_near, c_far, t);
        TRIANGLES_getRect_fill4(this.node_eaver2[i+1][2], this.node_eaver2[i+1][1], this.node_eaver2[i][1], this.node_eaver2[i][2], c1, c2, c2, c1);
      }
      //--- eaver D ---
      t = constrain(map(this.node_eaver2[0][3].z, skyline.z, 0, 1, 0), 0, 1);
      c1 = lerpColor(c_near, c_far, t);    
      TRIANGLES_getRect_fill(this.node_eaver2[0][0], this.node_eaver2[0][1], this.node_eaver2[0][2], this.node_eaver2[0][3], c1);
    }







    if (this.state == 2) {
      //--- pillar2 F ---
      t = constrain(map(this.node_pillar2[0][0][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t)); 
      TRIANGLES_getRect(this.node_pillar2[0][1][3], this.node_pillar2[0][1][2], this.node_pillar2[0][0][2], this.node_pillar2[0][0][3]);
      TRIANGLES_getRect(this.node_pillar2[1][1][3], this.node_pillar2[1][1][2], this.node_pillar2[1][0][2], this.node_pillar2[1][0][3]);

      //--- pillar2 L ---
      for (let i=0; i<this.node_pillar2.length; i++) {
        if (this.node_pillar2[i][1][3].x > -real(100)) {
          t = constrain(map(this.node_pillar2[i][1][0].z, skyline.z, 0, 1, 0), 0, 1);
          c1 = lerpColor(c_near, c_far, t);
          t = constrain(map(this.node_pillar2[i][1][3].z, skyline.z, 0, 1, 0), 0, 1);
          c2 = lerpColor(c_near, c_far, t);
          TRIANGLES_getRect_fill4(this.node_pillar2[i][1][0], this.node_pillar2[i][1][3], this.node_pillar2[i][0][3], this.node_pillar2[i][0][0], c1, c2, c2, c1);
        }
      }

      //--- pillar2 R ---
      for (let i=0; i<this.node_pillar2.length; i++) {
        if (this.node_pillar2[i][1][2].x < real(100)) {
          t = constrain(map(this.node_pillar2[i][1][2].z, skyline.z, 0, 1, 0), 0, 1);
          c1 = lerpColor(c_near, c_far, t);
          t = constrain(map(this.node_pillar2[i][1][1].z, skyline.z, 0, 1, 0), 0, 1);
          c2 = lerpColor(c_near, c_far, t);
          TRIANGLES_getRect_fill4(this.node_pillar2[i][1][2], this.node_pillar2[i][1][1], this.node_pillar2[i][0][1], this.node_pillar2[i][0][2], c1, c2, c2, c1);
        }
      }

      t = constrain(map(this.node_wall3[0][1][3].z, skyline.z, 0, 1, 0), 0, 1);
      fill(lerpColor(c_near, c_far, t)); 
      TRIANGLES_getRect(this.node_wall3[0][1][3], this.node_wall3[0][1][2], this.node_wall3[0][0][2], this.node_wall3[0][0][3]);
      TRIANGLES_getRect(this.node_wall3[1][1][3], this.node_wall3[1][1][2], this.node_wall3[1][0][2], this.node_wall3[1][0][3]);
    }





    endShape();
  };












  this.displayInfo = function() {
    noFill();
    stroke(c_info2);
    strokeWeight(real(2));

    beginShape(LINES);
    for (let i=0; i<this.node_pillar.length; i++) {
      for (let j=0; j<this.node_pillar[i].length; j++) {
        for (let k=0; k<this.node_pillar[i][j].length; k++) {
          vertex(this.node_pillar[i][j][k].x, this.node_pillar[i][j][k].y, this.node_pillar[i][j][k].z);
          vertex(this.node_pillar[i][j][(k+1)%4].x, this.node_pillar[i][j][(k+1)%4].y, this.node_pillar[i][j][(k+1)%4].z);
          if (j == 0) {
            vertex(this.node_pillar[i][j][k].x, this.node_pillar[i][j][k].y, this.node_pillar[i][j][k].z);
            vertex(this.node_pillar[i][j+1][k].x, this.node_pillar[i][j+1][k].y, this.node_pillar[i][j+1][k].z);
          }
        }
      }
    }
    for (let i=0; i<this.node_wall.length; i++) {
      for (let j=0; j<this.node_wall[i].length; j++) {
        vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
        vertex(this.node_wall[i][(j+1)%4].x, this.node_wall[i][(j+1)%4].y, this.node_wall[i][(j+1)%4].z);
        if (i == 0) {
          vertex(this.node_wall[i][j].x, this.node_wall[i][j].y, this.node_wall[i][j].z);
          vertex(this.node_wall[i+1][j].x, this.node_wall[i+1][j].y, this.node_wall[i+1][j].z);
        }
      }
    }

    vertex(this.node_roof[0].x, this.node_roof[0].y, this.node_roof[0].z);
    vertex(this.node_roof[1].x, this.node_roof[1].y, this.node_roof[1].z);
    for (let i=0; i<this.node_eaver.length-1; i++) {
      for (let j=0; j<this.node_eaver[i].length; j++) {
        if (i==0) {
          vertex(this.node_eaver[i][j].x, this.node_eaver[i][j].y, this.node_eaver[i][j].z);
          vertex(this.node_eaver[i][(j+1)%4].x, this.node_eaver[i][(j+1)%4].y, this.node_eaver[i][(j+1)%4].z);
        }
        vertex(this.node_eaver[i][j].x, this.node_eaver[i][j].y, this.node_eaver[i][j].z);
        vertex(this.node_eaver[i+1][j].x, this.node_eaver[i+1][j].y, this.node_eaver[i+1][j].z);
      }
    }



    if (this.state == 1  ||  this.state == 2) {
      vertex(this.node_wall2[1][3].x, this.node_wall2[1][3].y, this.node_wall2[1][3].z);
      vertex(this.node_wall2[1][2].x, this.node_wall2[1][2].y, this.node_wall2[1][2].z);
      vertex(this.node_wall2[1][2].x, this.node_wall2[1][2].y, this.node_wall2[1][2].z);
      vertex(this.node_wall2[0][2].x, this.node_wall2[0][2].y, this.node_wall2[0][2].z);
      vertex(this.node_wall2[0][2].x, this.node_wall2[0][2].y, this.node_wall2[0][2].z);
      vertex(this.node_wall2[0][3].x, this.node_wall2[0][3].y, this.node_wall2[0][3].z);
      vertex(this.node_wall2[0][3].x, this.node_wall2[0][3].y, this.node_wall2[0][3].z);
      vertex(this.node_wall2[1][3].x, this.node_wall2[1][3].y, this.node_wall2[1][3].z);

      vertex(this.node_wall2[1][0].x, this.node_wall2[1][0].y, this.node_wall2[1][0].z);
      vertex(this.node_wall2[1][1].x, this.node_wall2[1][1].y, this.node_wall2[1][1].z);
      vertex(this.node_wall2[1][1].x, this.node_wall2[1][1].y, this.node_wall2[1][1].z);
      vertex(this.node_wall2[0][1].x, this.node_wall2[0][1].y, this.node_wall2[0][1].z);
      vertex(this.node_wall2[0][1].x, this.node_wall2[0][1].y, this.node_wall2[0][1].z);
      vertex(this.node_wall2[0][0].x, this.node_wall2[0][0].y, this.node_wall2[0][0].z);
      vertex(this.node_wall2[0][0].x, this.node_wall2[0][0].y, this.node_wall2[0][0].z);
      vertex(this.node_wall2[1][0].x, this.node_wall2[1][0].y, this.node_wall2[1][0].z);

      for (let i=0; i<this.node_eaver2.length-1; i++) {
        for (let j=0; j<this.node_eaver2[i].length; j++) {
          if (i==0) {
            vertex(this.node_eaver2[i][j].x, this.node_eaver2[i][j].y, this.node_eaver2[i][j].z);
            vertex(this.node_eaver2[i][(j+1)%4].x, this.node_eaver2[i][(j+1)%4].y, this.node_eaver2[i][(j+1)%4].z);
          }
          vertex(this.node_eaver2[i][j].x, this.node_eaver2[i][j].y, this.node_eaver2[i][j].z);
          vertex(this.node_eaver2[i+1][j].x, this.node_eaver2[i+1][j].y, this.node_eaver2[i+1][j].z);
        }
      }
      vertex(this.node_eaver2[this.node_eaver2.length-1][0].x, this.node_eaver2[this.node_eaver2.length-1][0].y, this.node_eaver2[this.node_eaver2.length-1][0].z);
      vertex(this.node_eaver2[this.node_eaver2.length-1][1].x, this.node_eaver2[this.node_eaver2.length-1][1].y, this.node_eaver2[this.node_eaver2.length-1][1].z);
    }







    if (this.state == 2) {

      LINES_getRect(this.node_pillar2[0][1][3], this.node_pillar2[0][1][2], this.node_pillar2[0][0][2], this.node_pillar2[0][0][3]);
      LINES_getRect(this.node_pillar2[0][1][0], this.node_pillar2[0][1][1], this.node_pillar2[0][0][1], this.node_pillar2[0][0][0]);
      LINES_getRect(this.node_pillar2[1][1][3], this.node_pillar2[1][1][2], this.node_pillar2[1][0][2], this.node_pillar2[1][0][3]);
      LINES_getRect(this.node_pillar2[1][1][0], this.node_pillar2[1][1][1], this.node_pillar2[1][0][1], this.node_pillar2[1][0][0]);

      LINES_getLine(this.node_wall3[0][0][3], this.node_wall3[0][0][2]);
      LINES_getLine(this.node_wall3[1][0][3], this.node_wall3[1][0][2]);
    }

    endShape();
  };
}