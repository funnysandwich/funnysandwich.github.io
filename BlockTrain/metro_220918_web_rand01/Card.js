function Card(phase) {
  this.phase = phase;

  this.CARD = createGraphics(min(width, 1000), min(width, 1000));
  this.CARD.strokeJoin(BEVEL);
  this.CARD.background(0, 0);


  this.rate = this.CARD.width/500.0;

  this.node_card = [
    [0, 0], [5.219, 54.64], [109.504, 54.64], [130.068, 49.454], [146.475, 34.955], [153.025, 18.66], 
    [500, 0], [475.931, 18.66], [490.089, 24.76], [495.018, 37.748], 
    [500, 500], [495.018, 457.646], [489.627, 470.349], [475.931, 476.733], 
    [0, 500], [24.307, 476.733], [10.974, 471.299], [5.219, 457.646]
  ];

  this.index_card = [
    [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 7], [0, 6, 7], 
    [6, 7, 8], [6, 8, 9], [6, 9, 10], 
    [10, 9, 11], [10, 11, 12], [10, 12, 13], [10, 13, 15], 
    [14, 10, 15], [14, 15, 16], [14, 16, 17], [14, 17, 0], [17, 1, 0]
  ];

  for (let i=0; i<this.node_card.length; i++) {
    this.node_card[i][0] *= this.rate;
    this.node_card[i][1] *= this.rate;
  }





  this.node_title = [
    [18.802, 21.963], [23.795, 19.121], [27.913, 19.121], [27.913, 37.025], [23.795, 37.025], [23.795, 23.631], [20.395, 25.297], 
    [34.528, 27.911], [36.483, 27.911], [33.419, 37.025], [31.452, 37.025], 
    [38.702, 28.084], [44.186, 28.084], [44.186, 29.935], [40.256, 29.935], [39.988, 31.577], [43.175, 31.538], [44.996, 34.566], [43.313, 36.577], [39.707, 37.025], [36.672, 36.241], [38.754, 34.746], [40.39, 35.071], [42.353, 34.454], [41.713, 33.038], [37.763, 33.046], 
    [53.694, 27.911], [55.995, 27.911], [58.113, 34.25], [59.975, 27.911], [62.184, 27.911], [64.538, 34.256], [66.37, 27.911], [68.672, 27.911], [65.569, 37.025], [63.306, 37.025], [61.302, 30.49], [59.04, 37.025], [56.794, 37.025], 
    [69.57, 27.911], [71.676, 27.911], [71.676, 37.025], [69.57, 37.025], 
    [73.399, 27.911], [75.596, 27.911], [79.505, 33.811], [79.528, 27.911], [81.634, 27.911], [81.634, 37.025], [79.425, 37.025], [75.503, 31.093], [75.503, 37.025], [73.399, 37.025], 
    [83.355, 27.911], [86.909, 27.911], [89.921, 29.182], [91.22, 32.468], [89.921, 35.866], [86.983, 37.025], [83.355, 37.025], [85.448, 29.516], [88.11, 30.387], [89.114, 32.457], [88.058, 34.734], [85.448, 35.174], 
    [92.241, 31.196], [94.967, 28.199], [98.205, 28.277], [101.133, 30.429], [101.133, 34.693], [98.95, 37.045], [95.362, 37.278], [92.789, 34.919], [94.436, 31.808], [96.488, 29.886], [99.069, 31.118], [99.009, 34.129], [97.216, 35.677], [94.809, 34.01], 
    [101.428, 27.911], [103.729, 27.911], [105.845, 34.244], [107.708, 27.911], [109.918, 27.911], [112.271, 34.256], [114.104, 27.911], [116.405, 27.911], [113.303, 37.025], [111.039, 37.025], [109.035, 30.49], [106.774, 37.025], [104.527, 37.025]
  ];

  this.index_title = [
    [0, 5, 6], [0, 1, 5], [1, 2, 3], [1, 3, 4], 
    [7, 8, 9], [7, 9, 10], 
    [11, 12, 13], [11, 13, 14], [11, 14, 25], [14, 15, 25], [15, 24, 25], [15, 16, 24], [16, 17, 24], [17, 18, 24], [18, 19, 23], [19, 20, 23], [20, 21, 22], 
    [26, 27, 38], [27, 37, 38], [28, 37, 29], [29, 30, 37], [30, 34, 36], [36, 34, 35], [31, 32, 34], [32, 33, 34], 
    [39, 40, 41], [39, 41, 42], 
    [43, 50, 52], [50, 51, 52], [43, 48, 49], [43, 44, 48], [45, 46, 47], [45, 47, 48], 
    [53, 54, 60], [54, 60, 61], [54, 55, 56], [54, 56, 62], [62, 56, 57], [62, 57, 58], [63, 64, 58], [58, 59, 64], [59, 64, 60], [59, 60, 53], 
    [65, 66, 73], [66, 67, 73], [67, 75, 74], [67, 68, 75], [68, 70, 75], [68, 69, 70], [70, 71, 76], [71, 77, 78], [71, 72, 73], [72, 73, 65], 
    [79, 80, 91], [80, 90, 91], [81, 82, 90], [82, 83, 90], [83, 87, 89], [87, 88, 89], [84, 85, 87], [85, 86, 87]
  ];


  for (let i=0; i<this.node_title.length; i++) {
    this.node_title[i][0] *= this.rate;
    this.node_title[i][1] *= this.rate;
  }





  for (let i=0; i<node_BT.length; i++) {
    let a = split(node_BT[i], ", ");
    node_BT[i] = new Array(2);
    node_BT[i][0] = a[0];
    node_BT[i][1] = a[1];
    node_BT[i][0] *= (57.55*(this.rate)) / 100.0;
    node_BT[i][1] *= (57.55*(this.rate)) / 100.0;
    node_BT[i][0] += 221.288*(this.rate);
    node_BT[i][1] += 483.232*(this.rate);
  }

  this.index_BT = [
    [0, 1, 7], [1, 7, 8], [1, 2, 8], [2, 3, 8], [4, 8, 9], [4, 9, 12], [9, 10, 11], [9, 11, 12], [4, 12, 13], [4, 5, 14], [5, 6, 14], [6, 7, 14], [6, 7, 0], 
    [15, 16, 17], [17, 18, 15], 
    [19, 20, 21], [21, 22, 19], [23, 24, 35], [24, 31, 32], [24, 25, 27], [25, 26, 27], [27, 33, 34], [27, 28, 29], [29, 30, 27], [30, 35, 23], 
    [36, 37, 39], [37, 38, 39], [39, 40, 41], [41, 51, 36], [42, 50, 51], [42, 43, 50], [43, 47, 49], [44, 45, 46], [46, 47, 44], [47, 48, 49], [49, 50, 43], 
    [52, 53, 54], [54, 55, 56], [54, 56, 62], [57, 58, 60], [58, 59, 60], [60, 61, 62], [54, 62, 52], 
    [63, 64, 65], [65, 70, 63], [66, 67, 69], [67, 68, 69], 
    [71, 72, 77], [73, 74, 75], [73, 75, 76], [71, 77, 78], 
    [79, 80, 81], [81, 82, 83], [79, 83, 84], [84, 85, 86], [84, 93, 86], [87, 88, 94], [88, 89, 94], [89, 95, 96], [89, 90, 91], [79, 90, 92], 
    [97, 98, 99], [99, 100, 101], [97, 99, 101], [102, 103, 104], [102, 104, 105], 
    [106, 107, 116], [108, 109, 115], [109, 110, 114], [110, 113, 114], [110, 111, 113], [111, 112, 113], [106, 116, 117]
  ];






  if (this.phase == 1) {
    this.info = new Array(7);

    for (let i=0; i<7; i++) {
      this.info[i] = str_info[0][i+1];
    }
  }





  this.update = function() {

    this.CARD.background(0, 0);

    this.CARD.beginShape(TRIANGLES);
    this.CARD.stroke(c_sky);
    this.CARD.strokeWeight(1.5 * this.rate);
    //this.CARD.noStroke();
    this.CARD.fill(c_sky);
    for (let i=0; i<this.index_card.length; i++) {
      this.CARD.vertex(this.node_card[this.index_card[i][0]][0], this.node_card[this.index_card[i][0]][1]);
      this.CARD.vertex(this.node_card[this.index_card[i][1]][0], this.node_card[this.index_card[i][1]][1]);
      this.CARD.vertex(this.node_card[this.index_card[i][2]][0], this.node_card[this.index_card[i][2]][1]);
    }


    this.CARD.endShape();



    this.CARD.fill(c_winFrame);
    this.CARD.stroke(c_winFrame);
    this.CARD.strokeWeight(0.4 * this.rate);
    this.CARD.beginShape(TRIANGLES);
    for (let i=0; i<this.index_title.length; i++) {
      this.CARD.vertex(this.node_title[this.index_title[i][0]][0], this.node_title[this.index_title[i][0]][1]);
      this.CARD.vertex(this.node_title[this.index_title[i][1]][0], this.node_title[this.index_title[i][1]][1]);
      this.CARD.vertex(this.node_title[this.index_title[i][2]][0], this.node_title[this.index_title[i][2]][1]);
    }

    for (let i=0; i<this.index_BT.length; i++) {
      this.CARD.vertex(node_BT[this.index_BT[i][0]][0], node_BT[this.index_BT[i][0]][1]);
      this.CARD.vertex(node_BT[this.index_BT[i][1]][0], node_BT[this.index_BT[i][1]][1]);
      this.CARD.vertex(node_BT[this.index_BT[i][2]][0], node_BT[this.index_BT[i][2]][1]);
    }
    this.CARD.endShape();






    this.CARD.fill(c_winFrame);
    this.CARD.textAlign(CENTER, CENTER);
    this.CARD.textSize(11 * this.rate);
    if (this.phase == 1) {
      this.CARD.text("1024 ed", 0, 488.367 * this.rate, 192.7 * this.rate);
    }
    this.CARD.text("//blocktrain.art", 307.3 * this.rate, 488.367 * this.rate, 192.7 * this.rate);

    this.CARD.fill(c_sky);
    if (open_mode_line) {
      this.CARD.fill(changeSB(c_sky, 10, 20));
    }
    this.CARD.textAlign(LEFT, TOP);
    this.CARD.textSize(6.85 * this.rate);
    this.CARD.textLeading(11 * this.rate);
    if (this.phase == 1) {
      this.CARD.text(this.info[0]+"\n"+this.info[1], 191.52 * this.rate, 32.468 * this.rate);
      this.CARD.text(this.info[2]+"\n"+this.info[3], 291.186 * this.rate, 32.468 * this.rate);
      this.CARD.text(this.info[4]+"\n"+this.info[5]+"\n"+this.info[6], 392.938 * this.rate, 32.468 * this.rate);
    }
  };






  this.display = function() {
    let w = real(187);
    noStroke();
    fill(255);
    beginShape();
    texture(this.CARD);
    vertex(-w/2.0, -w/2.0, real(271), 0, 0);
    vertex(w/2.0, -w/2.0, real(271), 1, 0);
    vertex(w/2.0, w/2.0, real(271), 1, 1);
    vertex(-w/2.0, w/2.0, real(271), 0, 1);
    endShape();
    fill(255);
  };
}
