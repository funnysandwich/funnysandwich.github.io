function Ticket(s_begin, s_index) {
  this.begin = s_begin.copy();
  this.index = s_index;


  this.node_ticket = new Array(6);
  this.node_ticket[0] = createVector(-W_ticket/2.0, -H_ticket/2.0, 0.0);
  this.node_ticket[1] = createVector(W_ticket/2.0, -H_ticket/2.0, 0.0);
  this.node_ticket[2] = createVector(W_ticket/2.0, H_ticket/2.0 - H_car, 0.0);
  this.node_ticket[3] = createVector(W_ticket/2.0, H_ticket/2.0, 0.0);
  this.node_ticket[4] = createVector(-W_ticket/2.0, H_ticket/2.0, 0.0);
  this.node_ticket[5] = createVector(-W_ticket/2.0, H_ticket/2.0 - H_car, 0.0);
  for (let i=0; i<this.node_ticket.length; i++) {
    this.node_ticket[i].add(this.begin);
  }



  let num_fillet_detail = 5;
  if (W_fillet > real(50)) {
    num_fillet_detail = 10;
  }
  this.node_fillet = Array.from(Array(4), () => new Array(num_fillet_detail));
  for (let i=0; i<this.node_fillet.length; i++) {
    for (let j=0; j<this.node_fillet[i].length; j++) {
      if (state_WH == 5) {
        if (i == 1 || i == 2) {
          W_fillet = real(10);
        } else {
          W_fillet = real(WH_all[state_WH][2]);
        }
      }
      let x=0.0, y=0.0;
      if (i == 0) {
        x = cos(map(j, 0, this.node_fillet[i].length-1, PI, PI+HALF_PI)) * W_fillet/2.0;
        y = sin(map(j, 0, this.node_fillet[i].length-1, PI, PI+HALF_PI)) * W_fillet/2.0;
        this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[0]).add(W_fillet/2.0, W_fillet/2.0, 0);
      } else if (i == 1) {
        x = cos(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, TWO_PI)) * W_fillet/2.0;
        y = sin(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, TWO_PI)) * W_fillet/2.0;
        this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[1]).add(-W_fillet/2.0, W_fillet/2.0, 0);
      } else if (i == 2) {
        x = cos(map(j, 0, this.node_fillet[i].length-1, 0, HALF_PI)) * W_fillet/2.0;
        y = sin(map(j, 0, this.node_fillet[i].length-1, 0, HALF_PI)) * W_fillet/2.0;
        this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[3]).add(-W_fillet/2.0, -W_fillet/2.0, 0);
      } else if (i == 3) {
        x = cos(map(j, 0, this.node_fillet[i].length-1, HALF_PI, PI)) * W_fillet/2.0;
        y = sin(map(j, 0, this.node_fillet[i].length-1, HALF_PI, PI)) * W_fillet/2.0;
        this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[4]).add(W_fillet/2.0, -W_fillet/2.0, 0);
      }
    }
  }






  this.num_wheel = floor(random(2, 7));
  if (this.num_wheel == 3) {
    this.num_wheel = 2;
  }
  this.node_wheel = Array.from(Array(this.num_wheel), () => new Array(6));
  for (let i=0; i<this.node_wheel.length; i++) {
    for (let j=0; j<this.node_wheel[i].length; j++) {
      let x = cos(map(j, 0, this.node_wheel[i].length-1, PI, 0)) * W_wheel/2.0;
      let y = sin(map(j, 0, this.node_wheel[i].length-1, PI, 0)) * H_wheel/2.0;
      this.node_wheel[i][j] = createVector(x, y, 0);
      if (i == 0) {
        this.node_wheel[i][j].add(p5.Vector.sub(this.node_ticket[3], this.node_ticket[4]).mult(0.3333).add(this.node_ticket[4]));
      } else {
        this.node_wheel[i][j].add(p5.Vector.sub(this.node_ticket[3], this.node_ticket[4]).mult(0.6666).add(this.node_ticket[4]));
      }
    }
  }







  if (state_click == 3  &&  this.index == num_ticket-1) {
    this.node_wall = new Array(4);
  }











  if (WH_all[state_WH][3] == 5) {
    this.W_phone = real(WH_all[state_WH][0] + 20);
    this.H_phone = real(WH_all[state_WH][1] + 20);
    this.D_phone = real(20);
    this.W_phone_fillet = W_fillet + real(10);
    this.node_phone = Array.from(Array(2), () => new Array(4));
    this.node_phone_fillet = new Array(2);
    for (let i=0; i<2; i++) {
      this.node_phone_fillet[i] = Array.from(Array(4), () => new Array(num_fillet_detail));
    }


    for (let i=0; i<2; i++) {
      let z = real(2) + i*-this.D_phone;
      this.node_phone[i][0] = createVector(-this.W_phone/2.0, -this.H_phone/2.0, z);
      this.node_phone[i][1] = createVector(this.W_phone/2.0, -this.H_phone/2.0, z);
      this.node_phone[i][2] = createVector(this.W_phone/2.0, this.H_phone/2.0, z);
      this.node_phone[i][3] = createVector(-this.W_phone/2.0, this.H_phone/2.0, z);
    }
    for (let i=0; i<2; i++) {
      for (let j=0; j<this.node_phone_fillet[i].length; j++) {
        for (let k=0; k<this.node_phone_fillet[i][j].length; k++) {
          if (j == 0) {
            let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, PI, PI+HALF_PI)) * this.W_phone_fillet/2.0;
            let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, PI, PI+HALF_PI)) * this.W_phone_fillet/2.0;
            this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(this.W_phone_fillet/2.0, this.W_phone_fillet/2.0, 0);
          } else if (j == 1) {
            let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, -HALF_PI, 0)) * this.W_phone_fillet/2.0;
            let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, -HALF_PI, 0)) * this.W_phone_fillet/2.0;
            this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(-this.W_phone_fillet/2.0, this.W_phone_fillet/2.0, 0);
          } else if (j == 2) {
            let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, 0, HALF_PI)) * this.W_phone_fillet/2.0;
            let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, 0, HALF_PI)) * this.W_phone_fillet/2.0;
            this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(-this.W_phone_fillet/2.0, -this.W_phone_fillet/2.0, 0);
          } else if (j == 3) {
            let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, HALF_PI, PI)) * this.W_phone_fillet/2.0;
            let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, HALF_PI, PI)) * this.W_phone_fillet/2.0;
            this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(this.W_phone_fillet/2.0, -this.W_phone_fillet/2.0, 0);
          }
        }
      }
    }



    this.node_head = new Array(5*2);
    for (let i=0; i<this.node_head.length; i++) {
      if (i < this.node_head.length/2) {
        let x = cos(map(i, 0, this.node_head.length/2-1, PI, HALF_PI)) * real(12.8);
        let y = sin(map(i, 0, this.node_head.length/2-1, PI, HALF_PI)) * real(12.8);
        this.node_head[i] = createVector(x, y, 0).add(this.node_phone[0][0]).add(this.W_phone/2.0-(W_ticket*0.6*0.5)+real(12.8), this.H_phone/2.0-H_ticket+real(12.8), 0);
      } else {
        let x = cos(map(i, this.node_head.length/2, this.node_head.length-1, HALF_PI, 0)) * real(12.8);
        let y = sin(map(i, this.node_head.length/2, this.node_head.length-1, HALF_PI, 0)) * real(12.8);
        this.node_head[i] = createVector(x, y, 0).add(this.node_phone[0][1]).add(-this.W_phone/2.0+(W_ticket*0.6*0.5)-real(12.8), this.H_phone/2.0-H_ticket+real(12.8), 0);
      }
    }
  }














  this.update = function() {

    this.node_ticket[0] = createVector(-W_ticket/2.0, -H_ticket/2.0, 0.0);
    this.node_ticket[1] = createVector(W_ticket/2.0, -H_ticket/2.0, 0.0);
    this.node_ticket[2] = createVector(W_ticket/2.0, H_ticket/2.0 - H_car, 0.0);
    this.node_ticket[3] = createVector(W_ticket/2.0, H_ticket/2.0, 0.0);
    this.node_ticket[4] = createVector(-W_ticket/2.0, H_ticket/2.0, 0.0);
    this.node_ticket[5] = createVector(-W_ticket/2.0, H_ticket/2.0 - H_car, 0.0);



    for (let i=0; i<this.node_ticket.length; i++) {
      this.node_ticket[i].add(this.begin);

      if (WH_all[state_WH][3] != 5) {
      this.node_ticket[i].y += sin(time_wheel)*real(-0.5)  * map(speed_wheel, 0.2, 1.0, 1.0, 4.0);
      this.node_ticket[i].x += cos(time_wheel) * map(speed_wheel, 0.2, 1.0, 0, real(-0.5));
      }
      
      
      if (state_click == 2) {
        this.node_ticket[i].x += min(map(speed_wheel, 0.2, 1.0, 0, -real(7.5)), 0);
        //this.node_ticket[i].x += sin(map(time_sprint, 0, 30, 0, PI))*real(-5);
      } else if (state_click == 3) {
        this.node_ticket[i].x += X_swipe;
      } else if (state_click == 4) {
        this.node_ticket[i].y += Y_jump;
      } else if (state_click == 5) {
        if (i == 0 || i == 4 || i == 5) {
          this.node_ticket[i].x -= W_spring;
        } else {
          this.node_ticket[i].x += W_spring;
        }
        if (i == 0 || i == 1) {
          this.node_ticket[i].y += H_spring;
        } else if (i == 2 || i == 5) {
          this.node_ticket[i].y += H_spring*(H_car/H_ticket);
        }
      }
    }



    this.node_ticket[0].y += Y_split;
    this.node_ticket[1].y += Y_split;




    for (let i=0; i<this.node_fillet.length; i++) {
      for (let j=0; j<this.node_fillet[i].length; j++) {
        if (WH_all[state_WH][3] == 2) {
          if (i == 1 || i == 2) {
            W_fillet = real(10);
          } else {
            W_fillet = real(WH_all[state_WH][2]);
          }
          W_fillet = min(W_fillet, H_car*2);
        } else if (WH_all[state_WH][3] == 3) {
          if (i == 0 || i == 1) {
            W_fillet = real(WH_all[state_WH][2]);
          } else {
            W_fillet = real(10);
          }
        } else if (WH_all[state_WH][3] == 4) {
          if (i == 2 || i == 3) {
            W_fillet = real(WH_all[state_WH][2]);
          } else {
            W_fillet = real(25);
          }
          W_fillet = min(W_fillet, H_car*2);
        }
        let x=0.0, y=0.0;
        if (WH_all[state_WH][3] != 1) {
          if (i == 0) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, PI, PI+HALF_PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, PI, PI+HALF_PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[0]).add(W_fillet/2.0, W_fillet/2.0, 0);
          } else if (i == 1) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, TWO_PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, TWO_PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[1]).add(-W_fillet/2.0, W_fillet/2.0, 0);
          } else if (i == 2) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, 0, HALF_PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, 0, HALF_PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[3]).add(-W_fillet/2.0, -W_fillet/2.0, 0);
          } else if (i == 3) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, HALF_PI, PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, HALF_PI, PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[4]).add(W_fillet/2.0, -W_fillet/2.0, 0);
          }
        } else {
          if (i == 0) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, HALF_PI, 0)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, HALF_PI, 0)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[0]).add(0, 0, 0);
          } else if (i == 1) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, PI, HALF_PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, PI, HALF_PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[1]).add(0, 0, 0);
          } else if (i == 2) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, PI+HALF_PI, PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[3]).add(0, 0, 0);
          } else if (i == 3) {
            x = cos(map(j, 0, this.node_fillet[i].length-1, TWO_PI, PI+HALF_PI)) * W_fillet/2.0;
            y = sin(map(j, 0, this.node_fillet[i].length-1, TWO_PI, PI+HALF_PI)) * W_fillet/2.0;
            this.node_fillet[i][j] = createVector(x, y, 0).add(this.node_ticket[4]).add(0, 0, 0);
          }
        }





        this.node_fillet[i][j] = PRotateY(this.node_fillet[i][j], roY);
      }
    }



    if (WH_all[state_WH][3] == 2  ||  WH_all[state_WH][3] == 3  ||  WH_all[state_WH][3] == 4) {
      W_fillet = real(WH_all[state_WH][2]);
      if (WH_all[state_WH][3] == 2  ||  WH_all[state_WH][3] == 4) {
        W_fillet = min(W_fillet, H_car*2);
      }
    }





    for (let i=0; i<this.node_wheel.length; i++) {
      for (let j=0; j<this.node_wheel[i].length; j++) {
        let x = cos(map(j, 0, this.node_wheel[i].length-1, PI, 0)) * W_wheel/2.0 + map(cos(time_wheel+map(i, 0, this.node_wheel.length-1, 0, PI)), -1, 1, W_wheel*0.05, -W_wheel*0.08) * map(speed_wheel, 0.2, 1.0, 1.0, 3.0);
        let y = sin(map(j, 0, this.node_wheel[i].length-1, PI, 0)) * map(sin(time_wheel+map(i, 0, this.node_wheel.length-1, 0, PI)), -1, 1, H_wheel*0.25, H_wheel*0.4*map(speed_wheel, 0.2, 1.0, 1.0, 2));
        this.node_wheel[i][j] = createVector(x, y, 0);
        if (j == 0  ||  j == this.node_wheel[i].length-1) {
          this.node_wheel[i][j].y -= W_wheel;
        } else {
          if (state_click == 4) {
            this.node_wheel[i][j].y -= Y_jump*0.25;
          }
        }
        this.node_wheel[i][j].add(p5.Vector.sub(this.node_ticket[3], this.node_ticket[4]).mult(map(i, 0, this.node_wheel.length-1, 0.15, 0.85)).add(this.node_ticket[4]));
        if ((roY < -HALF_PI && roY > -PI-HALF_PI)  ||  (roY > HALF_PI && roY < PI+HALF_PI)) {
          this.node_wheel[i][j].add(0, 0, real(1));
        } else {
          this.node_wheel[i][j].add(0, 0, -real(1));
        }
        this.node_wheel[i][j] = PRotateY(this.node_wheel[i][j], roY);
      }
    }








    if (state_click == 3  &&  this.index == num_ticket-1) {
      this.node_wall[0] = createVector(real(2)-X_swipe, -real(10), real(2));
      this.node_wall[1] = createVector(real(100)-X_swipe, -real(10), real(2));
      this.node_wall[2] = createVector(real(100)-X_swipe, real(10), real(2));
      this.node_wall[3] = createVector(real(2)-X_swipe, real(10), real(2));
      this.node_wall[0].add(this.node_ticket[1].x, this.node_ticket[1].y, 0);
      this.node_wall[1].add(this.node_ticket[1].x, this.node_ticket[1].y, 0);
      this.node_wall[2].add(this.node_ticket[3].x, this.node_ticket[3].y, 0);
      this.node_wall[3].add(this.node_ticket[3].x, this.node_ticket[3].y, 0);
      for (let i=0; i<this.node_wall.length; i++) {
        if ((roY < -HALF_PI && roY > -PI-HALF_PI)  ||  (roY > HALF_PI && roY < PI+HALF_PI)) {
          this.node_wall[i].z = -real(2);
        }
        this.node_wall[i] = PRotateY(this.node_wall[i], roY);
      }
    }










    if (WH_all[state_WH][3] == 5) {
      for (let i=0; i<2; i++) {
        let z = real(2) + i*-this.D_phone;
        this.node_phone[i][0] = createVector(-this.W_phone/2.0, -this.H_phone/2.0, z);
        this.node_phone[i][1] = createVector(this.W_phone/2.0, -this.H_phone/2.0, z);
        this.node_phone[i][2] = createVector(this.W_phone/2.0, this.H_phone/2.0, z);
        this.node_phone[i][3] = createVector(-this.W_phone/2.0, this.H_phone/2.0, z);
      }




      for (let i=0; i<2; i++) {
        for (let j=0; j<this.node_phone_fillet[i].length; j++) {
          for (let k=0; k<this.node_phone_fillet[i][j].length; k++) {
            if (j == 0) {
              let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, PI, PI+HALF_PI)) * this.W_phone_fillet/2.0;
              let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, PI, PI+HALF_PI)) * this.W_phone_fillet/2.0;
              this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(this.W_phone_fillet/2.0, this.W_phone_fillet/2.0, 0);
            } else if (j == 1) {
              let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, -HALF_PI, 0)) * this.W_phone_fillet/2.0;
              let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, -HALF_PI, 0)) * this.W_phone_fillet/2.0;
              this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(-this.W_phone_fillet/2.0, this.W_phone_fillet/2.0, 0);
            } else if (j == 2) {
              let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, 0, HALF_PI)) * this.W_phone_fillet/2.0;
              let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, 0, HALF_PI)) * this.W_phone_fillet/2.0;
              this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(-this.W_phone_fillet/2.0, -this.W_phone_fillet/2.0, 0);
            } else if (j == 3) {
              let x = cos(map(k, 0, this.node_phone_fillet[i][j].length-1, HALF_PI, PI)) * this.W_phone_fillet/2.0;
              let y = sin(map(k, 0, this.node_phone_fillet[i][j].length-1, HALF_PI, PI)) * this.W_phone_fillet/2.0;
              this.node_phone_fillet[i][j][k] = createVector(x, y, 0).add(this.node_phone[i][j]).add(this.W_phone_fillet/2.0, -this.W_phone_fillet/2.0, 0);
            }

            this.node_phone_fillet[i][j][k] = PRotateY(this.node_phone_fillet[i][j][k], roY);
          }
        }
      }




      for (let i=0; i<this.node_head.length; i++) {
        if (i < this.node_head.length/2) {
          let x = cos(map(i, 0, this.node_head.length/2-1, PI, HALF_PI)) * real(12.8);
          let y = sin(map(i, 0, this.node_head.length/2-1, PI, HALF_PI)) * real(12.8);
          this.node_head[i] = createVector(x, y, 0).add(this.node_phone[0][0]).add(this.W_phone/2.0-(W_ticket*0.6*0.5)+real(12.8), this.H_phone/2.0-H_ticket/2.0, 0);
        } else {
          let x = cos(map(i, this.node_head.length/2, this.node_head.length-1, HALF_PI, 0)) * real(12.8);
          let y = sin(map(i, this.node_head.length/2, this.node_head.length-1, HALF_PI, 0)) * real(12.8);
          this.node_head[i] = createVector(x, y, 0).add(this.node_phone[0][1]).add(-this.W_phone/2.0+(W_ticket*0.6*0.5)-real(12.8), this.H_phone/2.0-H_ticket/2.0, 0);
        }
        this.node_head[i] = PRotateY(this.node_head[i], roY);
      }



      for (let i=0; i<2; i++) {
        for (let j=0; j<this.node_phone[i].length; j++) {
          this.node_phone[i][j] = PRotateY(this.node_phone[i][j], roY);
        }
      }
    }
  };


























  this.display = function() {
    noStroke();
    fill(255);
    if ((roY < -HALF_PI && roY > -PI-HALF_PI)  ||  (roY > HALF_PI && roY < PI+HALF_PI)) {
      if (WH_all[state_WH][3] != 5) {
        beginShape(TRIANGLES);
        texture(B[this.index]);
        let uv_ul = createVector(1-map(this.node_fillet[0][0].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][0].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        let uv_dl = createVector(1-map(this.node_ticket[5].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), 1-H_car/H_ticket);
        let uv_ur = createVector(1-map(this.node_fillet[1][this.node_fillet[1].length-1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        let uv_dr = createVector(1-map(this.node_ticket[2].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), 1-H_car/H_ticket);
        TRIANGLES_getRect_uv(this.node_fillet[0][0], this.node_fillet[1][this.node_fillet[1].length-1], this.node_ticket[2].copy().add(0, Y_split, 0), this.node_ticket[5].copy().add(0, Y_split, 0), uv_ul, uv_ur, uv_dr, uv_dl);

        for (let j=0; j<this.node_fillet[0].length-1; j++) {
          uv_ul = createVector(1-map(this.node_fillet[0][j+1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][j+1].y, this.node_fillet[1][0].y, this.node_ticket[2].y, 0, 1-H_car/H_ticket));
          uv_dl = createVector(1-map(this.node_fillet[0][j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][j].y, this.node_fillet[1][0].y, this.node_ticket[2].y, 0, 1-H_car/H_ticket));
          uv_ur = createVector(1-map(this.node_fillet[1][this.node_fillet[1].length-1-(j+1)].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1-(j+1)].y, this.node_fillet[1][0].y, this.node_ticket[2].y, 0, 1-H_car/H_ticket));
          uv_dr = createVector(1-map(this.node_fillet[1][this.node_fillet[1].length-1-j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1-j].y, this.node_fillet[1][0].y, this.node_ticket[2].y, 0, 1-H_car/H_ticket));
          TRIANGLES_getRect_uv(this.node_fillet[0][j+1], this.node_fillet[1][this.node_fillet[1].length-1-(j+1)], this.node_fillet[1][this.node_fillet[1].length-1-j], this.node_fillet[0][j], uv_ul, uv_ur, uv_dr, uv_dl);
        }

        uv_ul = createVector(1-map(this.node_ticket[5].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_ticket[5].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_dl = createVector(1-map(this.node_fillet[3][this.node_fillet[3].length-1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_ur = createVector(1-map(this.node_ticket[2].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_ticket[2].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_dr = createVector(1-map(this.node_fillet[2][0].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][0].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        TRIANGLES_getRect_uv(this.node_ticket[5], this.node_ticket[2], this.node_fillet[2][0], this.node_fillet[3][this.node_fillet[3].length-1], uv_ul, uv_ur, uv_dr, uv_dl);

        for (let j=0; j<this.node_fillet[0].length-1; j++) {
          uv_ul = createVector(1-map(this.node_fillet[3][this.node_fillet[3].length-1-j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1-j].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
          uv_dl = createVector(1-map(this.node_fillet[3][this.node_fillet[3].length-1-(j+1)].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1-(j+1)].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
          uv_ur = createVector(1-map(this.node_fillet[2][j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][j].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
          uv_dr = createVector(1-map(this.node_fillet[2][j+1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][j+1].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
          TRIANGLES_getRect_uv(this.node_fillet[3][this.node_fillet[3].length-1-j], this.node_fillet[2][j], this.node_fillet[2][j+1], this.node_fillet[3][this.node_fillet[3].length-1-(j+1)], uv_ul, uv_ur, uv_dr, uv_dl);
        }
        endShape();
      } else {
        beginShape(TRIANGLES);
        texture(B[this.index]);
        let uv_ul = createVector(map(this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
        let uv_dl = createVector(map(this.node_phone_fillet[1][2][0].x, this.node_phone_fillet[1][2][0].x, this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1].x, 0, 1), map(this.node_phone_fillet[1][2][0].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
        let uv_ur = createVector(map(this.node_phone_fillet[1][0][0].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][0][0].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
        let uv_dr = createVector(map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1].x, this.node_phone_fillet[1][2][0].x, this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1].x, 0, 1), map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
        TRIANGLES_getRect_uv(this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1], this.node_phone_fillet[1][0][0], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1], this.node_phone_fillet[1][2][0], uv_ul, uv_ur, uv_dr, uv_dl);

        for (let k=0; k<this.node_phone_fillet[1][0].length-1; k++) {
          uv_ul = createVector(map(this.node_phone_fillet[1][1][k+1].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][1][k+1].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_ur = createVector(map(this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-(k+1)].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-(k+1)].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_dr = createVector(map(this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-k].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-k].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_dl = createVector(map(this.node_phone_fillet[1][1][k].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][1][k].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          TRIANGLES_getRect_uv(this.node_phone_fillet[1][1][k+1], this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-(k+1)], this.node_phone_fillet[1][0][this.node_phone_fillet[1][0].length-1-k], this.node_phone_fillet[1][1][k], uv_ul, uv_ur, uv_dr, uv_dl);

          uv_ul = createVector(map(this.node_phone_fillet[1][2][k+1].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][2][k+1].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_ur = createVector(map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-(k+1)].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-(k+1)].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_dr = createVector(map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-k].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-k].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          uv_dl = createVector(map(this.node_phone_fillet[1][2][k].x, this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1].x, this.node_phone_fillet[1][0][0].x, 0, 1), map(this.node_phone_fillet[1][2][k].y, this.node_phone_fillet[1][1][0].y, this.node_phone_fillet[1][3][0].y, 0, 1));
          TRIANGLES_getRect_uv(this.node_phone_fillet[1][2][k+1], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-(k+1)], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-k], this.node_phone_fillet[1][2][k], uv_ul, uv_ur, uv_dr, uv_dl);
        }
        endShape();
      }
    } else {


      beginShape(TRIANGLES);
      texture(F[this.index]);
      let uv_ul = createVector(map(this.node_fillet[0][0].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][0].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
      let uv_dl = createVector(map(this.node_ticket[5].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), 1-H_car/H_ticket);
      let uv_ur = createVector(map(this.node_fillet[1][this.node_fillet[1].length-1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
      let uv_dr = createVector(map(this.node_ticket[2].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), 1-H_car/H_ticket);
      TRIANGLES_getRect_uv(this.node_fillet[0][0], this.node_fillet[1][this.node_fillet[1].length-1], this.node_ticket[2].copy().add(0, Y_split, 0), this.node_ticket[5].copy().add(0, Y_split, 0), uv_ul, uv_ur, uv_dr, uv_dl);

      for (let j=0; j<this.node_fillet[0].length-1; j++) {
        uv_ul = createVector(map(this.node_fillet[0][j+1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][j+1].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        uv_dl = createVector(map(this.node_fillet[0][j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[0][j].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        uv_ur = createVector(map(this.node_fillet[1][this.node_fillet[1].length-1-(j+1)].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1-(j+1)].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        uv_dr = createVector(map(this.node_fillet[1][this.node_fillet[1].length-1-j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[1][this.node_fillet[1].length-1-j].y, this.node_fillet[1][0].y, this.node_ticket[2].y+Y_split, 0, 1-H_car/H_ticket));
        TRIANGLES_getRect_uv(this.node_fillet[0][j+1], this.node_fillet[1][this.node_fillet[1].length-1-(j+1)], this.node_fillet[1][this.node_fillet[1].length-1-j], this.node_fillet[0][j], uv_ul, uv_ur, uv_dr, uv_dl);
      }

      uv_ul = createVector(map(this.node_ticket[5].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_ticket[5].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
      uv_dl = createVector(map(this.node_fillet[3][this.node_fillet[3].length-1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
      uv_ur = createVector(map(this.node_ticket[2].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_ticket[2].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
      uv_dr = createVector(map(this.node_fillet[2][0].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][0].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
      TRIANGLES_getRect_uv(this.node_ticket[5], this.node_ticket[2], this.node_fillet[2][0], this.node_fillet[3][this.node_fillet[3].length-1], uv_ul, uv_ur, uv_dr, uv_dl);

      for (let j=0; j<this.node_fillet[0].length-1; j++) {
        uv_ul = createVector(map(this.node_fillet[3][this.node_fillet[3].length-1-j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1-j].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_dl = createVector(map(this.node_fillet[3][this.node_fillet[3].length-1-(j+1)].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[3][this.node_fillet[3].length-1-(j+1)].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_ur = createVector(map(this.node_fillet[2][j].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][j].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        uv_dr = createVector(map(this.node_fillet[2][j+1].x, this.node_fillet[0][0].x, this.node_fillet[1][this.node_fillet[1].length-1].x, 0, 1), map(this.node_fillet[2][j+1].y, this.node_ticket[2].y, this.node_fillet[3][0].y, 1-H_car/H_ticket, 1));
        TRIANGLES_getRect_uv(this.node_fillet[3][this.node_fillet[3].length-1-j], this.node_fillet[2][j], this.node_fillet[2][j+1], this.node_fillet[3][this.node_fillet[3].length-1-(j+1)], uv_ul, uv_ur, uv_dr, uv_dl);
      }
      endShape();
    }
    fill(255);
  };














  this.display_TRIANGLES = function() {
    fill(c_text);
    for (let i=0; i<this.node_wheel.length; i++) {
      TRIANGLES_getShape(this.node_wheel[i]);
    }


    if (state_click == 1  &&  open_split) {
      fill(c_ticket);

      for (let i=0; i<3; i++) {
        for (let j=0; j<2; j++) {
          let w_o = constrain(map(time_split, 0, 10/2, real(15), real(25)), real(15), real(25));
          let x_o = cos(map(i, 0, 3-1, PI+PI*0.2, PI-PI*0.2)-PI*j) * w_o;
          let y_o = sin(map(i, 0, 3-1, PI+PI*0.2, PI-PI*0.2)-PI*j) * w_o;

          let w_i = constrain(map(time_split, 10/2, 10, real(15), real(25)), real(15), real(25));
          let x_i = cos(map(i, 0, 3-1, PI+PI*0.2, PI-PI*0.2)-PI*j) * w_i;
          let y_i = sin(map(i, 0, 3-1, PI+PI*0.2, PI-PI*0.2)-PI*j) * w_i;

          let n_o = createVector(x_o, y_o, 0);
          let n_i = createVector(x_i, y_i, 0);
          n_o = PRotateY(n_o, roY);
          n_i = PRotateY(n_i, roY);
          if (j == 0) {
            n_o.add(this.node_ticket[5]);
            n_i.add(this.node_ticket[5]);
          } else {
            n_o.add(this.node_ticket[2]);
            n_i.add(this.node_ticket[2]);
          }

          if ((j==0 && this.index==0)  ||  (j==1 && this.index==num_ticket-1)) {
            TRIANGLES_getLine_weight_T(n_i, n_o, real(2.5));
          }
        }
      }
    }

    if (state_click == 3  &&  this.index == num_ticket-1) {
      fill(c_bkg);
      TRIANGLES_getRect(this.node_wall[0], this.node_wall[1], this.node_wall[2], this.node_wall[3]);

      if (open_light_shine  &&  frameCount%8<4) {
        if (is_light_green) {
          fill(128, 200, 128);
        } else {
          fill(200, 128, 128);
        }
        let node_light = new Array(6);
        for (let i=0; i<node_light.length; i++) {
          let x = cos(map(i, 0, node_light.length, 0, TWO_PI))*real(3);
          let y = sin(map(i, 0, node_light.length, 0, TWO_PI))*real(3);
          node_light[i] = createVector(x, y, real(4)).add(this.node_ticket[1]).add(real(30)-X_swipe, -real(50), 0);
          if (!is_light_green) {
            node_light[i].y += real(10);
          }
        }
        TRIANGLES_getShape(node_light);
      }
    }




    if (WH_all[state_WH][3] == 5) {
      let c;
      let c_black = changeBrightness(c_bkg, -5);
      if (lightness(c_ticket) < lightness(c_text)) {
        c = c_ticket;
        if (lightness(c_ticket) > 25) {
          c = changeBrightness(c_ticket, 25-lightness(c_ticket));
        }
      } else {
        c = c_text;
        if (lightness(c_text) > 25) {
          c = changeBrightness(c_text, 25-lightness(c_text));
        }
      }
      c = changeBrightness(c_bkg, 5);
      fill(c_black);


      fill(changeSB(c_bkg, -10, 10));

      //for (let k=0; k<this.node_phone_fillet[1][0].length-1; k++) {
      //  TRIANGLES_getRect(this.node_phone_fillet[1][0][k], this.node_phone_fillet[1][0][k+1], this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1-(k+1)], this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1-k]);
      //  TRIANGLES_getRect(this.node_phone_fillet[1][2][k], this.node_phone_fillet[1][2][k+1], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-(k+1)], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1-k]);
      //}
      //TRIANGLES_getRect(this.node_phone_fillet[1][0][0], this.node_phone_fillet[1][1][this.node_phone_fillet[1][1].length-1], this.node_phone_fillet[1][2][0], this.node_phone_fillet[1][3][this.node_phone_fillet[1][3].length-1]);





      for (let i=0; i<2-1; i++) {
        for (let j=0; j<this.node_phone_fillet[i].length; j++) {
          for (let k=0; k<this.node_phone_fillet[i][j].length-1; k++) {
            let c1 = lerpColor(c_phone3, c_phone2, map(this.node_phone_fillet[i][j][k].y, this.node_phone_fillet[i][1][0].y, this.node_phone_fillet[i][3][0].y, 0, 1));
            let c2 = lerpColor(c_phone3, c_phone2, map(this.node_phone_fillet[i][j][k+1].y, this.node_phone_fillet[i][1][0].y, this.node_phone_fillet[i][3][0].y, 0, 1));
            TRIANGLES_getRect_fill4(this.node_phone_fillet[i][j][k], this.node_phone_fillet[i][j][k+1], this.node_phone_fillet[i+1][j][k+1], this.node_phone_fillet[i+1][j][k], c1, c2, c2, c1);
          }
          let c1 = lerpColor(c_phone3, c_phone2, map(this.node_phone_fillet[i][j][this.node_phone_fillet[i][j].length-1].y, this.node_phone_fillet[i][1][0].y, this.node_phone_fillet[i][3][0].y, 0, 1));
          let c2 = lerpColor(c_phone3, c_phone2, map(this.node_phone_fillet[i][(j+1)%4][0].y, this.node_phone_fillet[i][1][0].y, this.node_phone_fillet[i][3][0].y, 0, 1));

          TRIANGLES_getRect_fill4(this.node_phone_fillet[i][j][this.node_phone_fillet[i][j].length-1], this.node_phone_fillet[i][(j+1)%4][0], this.node_phone_fillet[i+1][(j+1)%4][0], this.node_phone_fillet[i+1][j][this.node_phone_fillet[i][j].length-1], c1, c2, c2, c1);
        }
      }



      fill(c_phone);
      for (let j=0; j<this.node_phone_fillet[0].length; j++) {
        for (let k=0; k<this.node_phone_fillet[0][j].length-1; k++) {
          TRIANGLES_getRect(this.node_phone_fillet[0][j][k], this.node_phone_fillet[0][j][k+1], this.node_fillet[j][k+1], this.node_fillet[j][k]);
        }
        TRIANGLES_getRect(this.node_phone_fillet[0][j][this.node_phone_fillet[0][j].length-1], this.node_phone_fillet[0][(j+1)%4][0], this.node_fillet[(j+1)%4][0], this.node_fillet[j][this.node_fillet[j].length-1]);
      }


      for (let i=0; i<this.node_head.length/2-1; i++) {
        TRIANGLES_getRect(this.node_head[i], this.node_head[i+1], this.node_head[this.node_head.length-1-(i+1)], this.node_head[this.node_head.length-1-i]);
      }
    }
  };












  this.displayInfo = function() {

    LINES_getLine(this.node_ticket[2], this.node_ticket[5]);

    for (let i=0; i<this.node_fillet.length; i++) {
      for (let j=0; j<this.node_fillet[i].length-1; j++) {
        LINES_getLine(this.node_fillet[i][j], this.node_fillet[i][j+1]);
      }

      LINES_getLine(this.node_fillet[i][this.node_fillet[i].length-1], this.node_fillet[(i+1)%this.node_fillet.length][0]);
    }

    for (let j=0; j<this.node_wheel.length; j++) {
      for (let k=0; k<this.node_wheel[j].length-1; k++) {
        LINES_getLine(this.node_wheel[j][k], this.node_wheel[j][k+1]);
      }
    }



    let n_eye_l = new Array(node_eye_l_global[this.index].length);
    for (let i=0; i<node_eye_l_global[this.index].length; i++) {
      n_eye_l[i] = node_eye_l_global[this.index][i].copy().mult(1.0/scaleRate);
      n_eye_l[i].add(-real(realF(50)), (real(F[this.index].height)-H_car)*0.47, 0);
      if (state_click == 5) {
        n_eye_l[i].x *= 1 + W_spring*2/W_ticket;
        n_eye_l[i].y *= 1 - H_spring/H_ticket;
      }
      n_eye_l[i] = PRotateY(n_eye_l[i], roY);
      n_eye_l[i].add(p5.Vector.add(this.node_ticket[0], this.node_ticket[1]).mult(0.5));
    }

    let n_eye_r = new Array(node_eye_r_global[this.index].length);
    for (let i=0; i<node_eye_r_global[this.index].length; i++) {
      n_eye_r[i] = node_eye_r_global[this.index][i].copy().mult(1.0/scaleRate);
      n_eye_r[i].add(real(realF(50)), (real(F[this.index].height)-H_car)*0.47, 0);
      if (state_click == 5) {
        n_eye_r[i].x *= 1 + W_spring*2/W_ticket;
        n_eye_r[i].y *= 1 - H_spring/H_ticket;
      }
      n_eye_r[i] = PRotateY(n_eye_r[i], roY);
      n_eye_r[i].add(p5.Vector.add(this.node_ticket[0], this.node_ticket[1]).mult(0.5));
    }


    for (let i=0; i<n_eye_l.length-1; i++) {
      LINES_getLine(n_eye_l[i], n_eye_l[i+1]);
    }
    for (let i=0; i<n_eye_l.length; i++) {
      if (i < n_eye_l.length/2) {
        LINES_getLine(n_eye_l[i], createVector(n_eye_l[i].x, n_eye_l[0].y-real(realF(20)), n_eye_l[i].z));
      } else {
        LINES_getLine(n_eye_l[i], createVector(n_eye_l[i].x, n_eye_l[n_eye_l.length-1].y+real(realF(20)), n_eye_l[i].z));
      }
    }


    for (let i=0; i<n_eye_r.length-1; i++) {
      LINES_getLine(n_eye_r[i], n_eye_r[i+1]);
    }
    for (let i=0; i<n_eye_r.length; i++) {
      if (i < n_eye_r.length/2) {
        LINES_getLine(n_eye_r[i], createVector(n_eye_r[i].x, n_eye_r[0].y-real(realF(20)), n_eye_r[i].z));
      } else {
        LINES_getLine(n_eye_r[i], createVector(n_eye_r[i].x, n_eye_r[n_eye_r.length-1].y+real(realF(20)), n_eye_r[i].z));
      }
    }



    if (WH_all[state_WH][3] == 5) {

      for (let i=0; i<2; i++) {
        for (let j=0; j<this.node_phone_fillet[i].length; j++) {
          for (let k=0; k<this.node_phone_fillet[i][j].length-1; k++) {
            LINES_getLine(this.node_phone_fillet[i][j][k], this.node_phone_fillet[i][j][k+1]);
          }
          LINES_getLine(this.node_phone_fillet[i][j][this.node_phone_fillet[i][j].length-1], this.node_phone_fillet[i][(j+1)%4][0]);
        }
      }

      for (let j=0; j<this.node_phone_fillet[0].length; j++) {
        for (let k=0; k<this.node_phone_fillet[0][j].length; k++) {
          LINES_getLine(this.node_phone_fillet[0][j][k], this.node_phone_fillet[1][j][k]);
        }
      }

      for (let i=0; i<this.node_head.length-1; i++) {
        LINES_getLine(this.node_head[i], this.node_head[i+1]);
      }
    }





    const center = p5.Vector.add(this.node_ticket[0], this.node_ticket[3]).mult(0.5);
    LINES_getLine(center.copy().add(-real(5), 0, 0), center.copy().add(real(5), 0, 0));
    LINES_getLine(center.copy().add(0, -real(5), 0), center.copy().add(0, real(5), 0));
  };









  this.displayInfo2 = function() {
    if (this.index == num_ticket-1) {
      LINES_getLine(this.node_ticket[0].copy().add(0, -real(30), 0), this.node_ticket[1].copy().add(0, -real(30), 0));
      LINES_getLine(this.node_ticket[0].copy().add(0, -real(30)-real(5), 0), this.node_ticket[0].copy().add(0, -real(30)+real(5), 0));
      LINES_getLine(this.node_ticket[1].copy().add(0, -real(30)-real(5), 0), this.node_ticket[1].copy().add(0, -real(30)+real(5), 0));

      LINES_getLine(this.node_ticket[1].copy().add(real(15), 0, 0), this.node_ticket[3].copy().add(real(15), 0, 0));
      LINES_getLine(this.node_ticket[1].copy().add(real(15-5), 0, 0), this.node_ticket[1].copy().add(real(15+5), 0, 0));
      LINES_getLine(this.node_ticket[3].copy().add(real(15-5), 0, 0), this.node_ticket[3].copy().add(real(15+5), 0, 0));

      LINES_getLine(this.node_fillet[1][0].copy().add(0, -real(5), 0), createVector(this.node_fillet[1][this.node_fillet[1].length-1].x, this.node_fillet[1][0].y-real(5), this.node_fillet[1][this.node_fillet[1].length-1].z));
      LINES_getLine(this.node_fillet[1][this.node_fillet[1].length-1], createVector(this.node_fillet[1][this.node_fillet[1].length-1].x, this.node_fillet[1][0].y-real(5+4), this.node_fillet[1][this.node_fillet[1].length-1].z));
      LINES_getLine(this.node_fillet[1][0], this.node_fillet[1][0].copy().add(0, -real(5+4), 0));

      LINES_getLine(this.node_ticket[2].copy().add(real(30), 0, 0), this.node_ticket[3].copy().add(real(30), 0, 0));
      LINES_getLine(this.node_ticket[2].copy().add(real(30-5), 0, 0), this.node_ticket[2].copy().add(real(30+5), 0, 0));
      LINES_getLine(this.node_ticket[3].copy().add(real(30-5), 0, 0), this.node_ticket[3].copy().add(real(30+5), 0, 0));
    }
    if (this.index == 0) {
      LINES_getLine(this.node_fillet[3][0].copy().add(0, real(5), 0), createVector(this.node_fillet[3][this.node_fillet[3].length-1].x, this.node_fillet[3][0].y+real(5), this.node_fillet[3][this.node_fillet[3].length-1].z));
      LINES_getLine(this.node_fillet[3][0], this.node_fillet[3][0].copy().add(0, real(5+4), 0));
      LINES_getLine(this.node_fillet[3][this.node_fillet[3].length-1], createVector(this.node_fillet[3][this.node_fillet[3].length-1].x, this.node_fillet[3][0].y, this.node_fillet[3][this.node_fillet[3].length-1].z).add(0, real(5+4), 0));
    }
  };
}
