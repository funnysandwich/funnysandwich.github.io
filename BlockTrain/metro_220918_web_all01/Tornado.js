function Tornado(begin, index_song) {
  this.ran = random(-999, 999);
  this.dead = false;
  this.begin = begin.copy();

  this.node = Array.from(Array(40), () => new Array(6));





  if (is_song_load_done  &&  open_play) {
    song_tornado[index_song].play();
    song_tornado[index_song].setVolume(0);
  }





  this.update = function() {
    this.begin.x += speed;
    if (this.begin.x > endLine) {
      song_tornado[index_song].stop();
      this.dead = true;
    }

    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length; j++) {
        let y = map(noise(frameCount*0.01+this.ran+i*100 -j*0.015), 0, 1, this.begin.y, this.begin.y-real(2500));
        let w = map(y, this.begin.y-real(2500), this.begin.y, real(800), real(200));
        let x = cos(frameCount*0.85+this.ran+99 -j*0.5 + i*100) * w/2.0;
        let z = sin(frameCount*0.85+this.ran+99 -j*0.5 + i*100) * w/2.0;
        x += map(noise(y*0.002 - frameCount*0.05 + this.ran-99), 0, 1, -real(500), real(500));
        this.node[i][j] = this.begin.copy().add(x, y, z);
      }
    }


    if (is_song_load_done  &&  open_play) {
      if (this.begin.x <= -real(2500)) {
        if (!song_tornado[index_song].isPlaying()) {
          song_tornado[index_song].play();
          song_tornado[index_song].setVolume(0);
        }
      } else if (this.begin.x > -real(2500)  &&  this.begin.x < real(2500)) {
        let volume_max = constrain(map(this.begin.z, real(500), skyline.z, 0.6, 0.3), 0, 0.6);
        let volume = sin(map(this.begin.x, -real(2500), real(2500), 0, PI)) * volume_max;
        let p = constrain(map(this.begin.x, -real(1000), real(1000), -1, 1),-1,1);
        if (!is_onTheGround) {
          volume = map(constrain(cameraY, -real(300), 0), -real(300), 0, 0, volume_max);
        }
        song_tornado[index_song].setVolume(volume);
        song_tornado[index_song].pan(p);
      } else if (this.begin.x > real(2500)) {
        if (song_tornado[index_song].isPlaying()) {
          song_tornado[index_song].stop();
        }
      }
    }
  };





  this.display = function() {
    fill(lerpColor(c_winFrame, c_sky, 0.15));
    //fill(255, 0, 0);
    let w = real(6);
    for (let i=0; i<this.node.length; i++) {
      for (let j=0; j<this.node[i].length-1; j++) {
        let c1 = lerpColor(c_winFrame, c_sky, map(abs(sin(frameCount*0.85+this.ran+99 -j*0.5 + i*100)), 0, 1, 0.15, 0.85));
        let c2 = lerpColor(c_winFrame, c_sky, map(abs(sin(frameCount*0.85+this.ran+99 -(j+1)*0.5 + i*100)), 0, 1, 0.15, 0.85));
        if (open_darkCloud) {
          c1 = lerpColor(c_winFrame, c_sky, 0.15);
          c2 = lerpColor(c_winFrame, c_sky, 0.15);
        }
        //TRIANGLES_getLine_weight_T(this.node[i][j], this.node[i][j+1], w);
        TRIANGLES_getLine_weight_T_fill2(this.node[i][j], this.node[i][j+1], w, c1, c2);
      }
    }
  };





  this.displayInfo = function() {
    for (let i=0; i<this.node.length; i+=2) {
      for (let j=0; j<this.node[i].length-1; j++) {
        LINES_getLine(this.node[i][j], this.node[i][j+1]);
      }
    }
  };
}