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




  if (this.phase == 1) {
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
  } else if (this.phase == 2) {
    this.node_title = [
      [18.001, 24.015], [22.798, 18.903], [30.977, 20.533], [32.199, 27.617], [24.887, 33.407], [32.701, 33.407], [32.701, 37.085], [18.568, 37.085], [18.568, 34.184], [28.216, 26.371], [27.788, 23.239], [24.057, 22.39], [21.695, 25.164], 
      [38.21, 27.911], [40.165, 27.911], [37.1, 37.025], [35.133, 37.025], 
      [42.383, 28.085], [47.867, 28.085], [47.867, 29.935], [43.937, 29.935], [43.669, 31.577], [46.856, 31.538], [48.678, 34.566], [46.995, 36.577], [43.388, 37.025], [40.353, 36.241], [42.435, 34.746], [44.071, 35.072], [46.034, 34.454], [45.394, 33.038], [41.444, 33.047], 
      [58.208, 27.911], [61.81, 27.911], [64.433, 28.694], [65.184, 31.071], [64.075, 32.752], [65.275, 33.671], [64.746, 37.025], [58.208, 37.025], [60.312, 29.762], [62.815, 30.058], [63.112, 30.695], [62.467, 31.519], [60.312, 31.519], [60.312, 33.37], [62.284, 33.37], [63.133, 34.167], [62.985, 35.175], [60.312, 35.175], 
      [66.834, 27.911], [68.939, 27.911], [68.939, 33.671], [69.55, 34.87], [70.743, 35.175], [71.943, 34.857], [72.548, 33.671], [72.548, 27.911], [74.653, 27.911], [74.653, 33.837], [73.606, 36.313], [70.743, 37.211], [68.045, 36.454], [66.834, 33.903], 
      [76.374, 27.911], [78.479, 27.911], [78.479, 37.025], [76.374, 37.025], 
      [80.201, 27.911], [82.295, 27.911], [82.295, 35.175], [87.002, 35.175], [87.002, 37.025], [80.201, 37.025], 
      [88.169, 27.911], [91.723, 27.911], [94.735, 29.182], [96.034, 32.469], [94.735, 35.866], [91.797, 37.025], [88.169, 37.025], [90.262, 29.517], [92.924, 30.388], [93.928, 32.457], [92.872, 34.735], [90.262, 35.175], 
      [97.395, 27.911], [99.501, 27.911], [99.501, 37.025], [97.395, 37.025], 
      [101.223, 27.911], [103.421, 27.911], [107.329, 33.811], [107.353, 27.911], [109.459, 27.911], [109.459, 37.025], [107.25, 37.025], [103.328, 31.094], [103.328, 37.025], [101.223, 37.025], 
      [111.175, 29.781], [114.198, 27.608], [117.504, 28.299], [119.055, 30.224], [116.881, 30.537], [116.049, 29.628], [114.556, 29.465], [113.007, 30.628], [112.956, 34.259], [114.805, 35.283], [117.181, 34.134], [117.181, 33.306], [115.216, 33.306], [115.273, 31.681], [119.02, 31.681], [119.02, 37.025], [117.181, 37.025], [117.181, 35.915], [114.413, 37.211], [111.175, 35.333]
    ];

    this.index_title = [
      [0, 1, 2], [0, 11, 12], [2, 10, 11], [2, 9, 10], [2, 3, 4], [4, 8, 9], [4, 5, 6], [4, 6, 8], [6, 7, 8], 
      [13, 14, 15], [13, 15, 16], 
      [17, 18, 19], [17, 19, 20], [17, 20, 31], [20, 21, 31], [21, 22, 30], [21, 30, 31], [22, 23, 30], [23, 24, 30], [24, 25, 29], [25, 26, 29], [26, 27, 28], 
      [32, 33, 41], [32, 40, 41], [33, 34, 35], [33, 35, 36], [36, 42, 43], [37, 47, 43], [37, 47, 48], [37, 38, 48], [38, 48, 49], [38, 39, 49], [39, 32, 49], [32, 40, 49], [44, 45, 46], [43, 44, 47], 
      [50, 51, 63], [51, 52, 63], [52, 62, 63], [52, 61, 62], [53, 54, 61], [54, 55, 61], [56, 60, 61], [56, 59, 60], [56, 57, 59], [57, 58, 59], 
      [64, 65, 66], [64, 66, 67], 
      [68, 69, 70], [70, 71, 72], [70, 72, 73], [70, 73, 68], 
      [74, 75, 81], [75, 81, 82], [75, 76, 77], [75, 77, 83], [77, 78, 83], [78, 79, 83], [79, 84, 85], [79, 80, 85], [80, 85, 81], [80, 81, 74], 
      [86, 87, 88], [88, 89, 86], 
      [90, 91, 95], [90, 95, 96], [92, 94, 95], [92, 93, 94], [90, 97, 99], [97, 98, 99], 
      [102, 103, 104], [101, 102, 104], [101, 105, 106], [101, 106, 107], [101, 100, 107], [100, 107, 108], [100, 108, 119], [108, 109, 119], [109, 118, 119], [109, 110, 118], [110, 117, 118], [111, 116, 115], [111, 114, 115], [111, 113, 114], [111, 112, 113]
    ];
  } else if (this.phase == 3) {
    this.node_title = [
      [18.497, 23.761], [22.809, 18.902], [30.563, 20.559], [32.146, 23.853], [29.462, 27.809], [32.608, 32.243], [30.563, 36.242], [22.083, 37.455], [18.243, 32.073], [22.407, 31.672], [24.076, 34.046], [27.983, 33.221], [28.909, 31.76], [26.525, 29.292], [23.786, 29.337], [23.848, 26.523], [26.37, 26.392], [27.99, 24.394], [27.547, 23.368], [24.209, 22.245], [22.661, 24.385], 
      [38.209, 27.911], [40.164, 27.911], [37.1, 37.026], [35.133, 37.026], [42.382, 28.085], [47.866, 28.085], [47.866, 29.936], [43.936, 29.936], [43.668, 31.577], [46.856, 31.538], [48.677, 34.566], [46.994, 36.577], [43.387, 37.026], [40.352, 36.242], [42.435, 34.747], [44.071, 35.072], [46.034, 34.454], [45.394, 33.039], [41.444, 33.047], 
      [57.498, 30.892], [60.224, 27.895], [63.462, 27.973], [66.391, 30.125], [66.391, 34.388], [64.207, 36.74], [60.619, 36.973], [58.046, 34.615], [59.693, 31.504], [61.745, 29.582], [64.327, 30.814], [64.266, 33.825], [62.473, 35.373], [60.066, 33.706], 
      [67.885, 27.911], [71.488, 27.911], [74.11, 28.694], [74.862, 31.071], [73.752, 32.752], [74.952, 33.672], [74.423, 37.026], [67.885, 37.026], [69.99, 29.762], [72.492, 30.059], [72.79, 30.695], [72.144, 31.52], [69.99, 31.52], [69.99, 33.37], [71.962, 33.37], [72.811, 34.167], [72.663, 35.175], [69.99, 35.175], 
      [75.98, 33.787], [78.073, 33.787], [78.339, 34.924], [79.693, 35.317], [80.595, 34.348], [80.595, 27.911], [82.688, 27.911], [82.688, 35.022], [80.422, 37.437], [76.54, 36.316], 
      [84.421, 27.911], [91.708, 27.911], [91.708, 29.762], [86.515, 29.762], [86.515, 31.509], [91.152, 31.509], [91.152, 33.359], [86.515, 33.359], [86.515, 35.175], [91.72, 35.175], [91.72, 37.026], [84.421, 37.026], 
      [93.102, 29.979], [95.992, 27.947], [99.3, 28.145], [101.04, 30.231], [98.95, 30.532], [98.354, 29.916], [96.741, 29.728], [95.169, 30.7], [95.171, 34.293], [96.737, 35.321], [98.412, 35.013], [98.95, 34.347], [101.121, 34.516], [99.142, 36.9], [95.992, 37.211], [93.246, 35.175], 
      [101.546, 27.911], [109.319, 27.911], [109.319, 29.762], [106.485, 29.762], [106.485, 37.026], [104.38, 37.026], [104.38, 29.762], [101.546, 29.762]
    ];

    this.index_title = [
      [0, 1, 2], [0, 19, 20], [2, 18, 19], [2, 3, 18], [3, 4, 18], [4, 16, 17], [4, 12, 16], [4, 5, 12], [5, 11, 12], [5, 6, 10], [6, 7, 8], [8, 9, 10], [12, 15, 16], [13, 14, 15], 
      [21, 22, 23], [21, 23, 24], 
      [25, 26, 27], [25, 27, 28], [25, 28, 39], [28, 29, 39], [29, 38, 39], [29, 30, 38], [30, 31, 38], [31, 32, 38], [32, 33, 37], [33, 34, 37], [34, 35, 36], 
      [40, 41, 48], [41, 42, 48], [42, 49, 50], [42, 43, 50], [43, 44, 45], [43, 45, 50], [45, 46, 51], [46, 52, 53], [46, 47, 48], [40, 47, 48], 
      [54, 55, 63], [54, 62, 63], [54, 62, 71], [54, 71, 61], [55, 56, 57], [55, 57, 58], [58, 64, 65], [59, 69, 65], [59, 69, 70], [59, 60, 70], [60, 70, 71], [60, 61, 71], [66, 67, 68], [66, 65, 69], 
      [72, 73, 74], [72, 74, 81], [74, 75, 81], [75, 80, 81], [75, 76, 80], [76, 79, 80], [76, 77, 79], [77, 78, 79], 
      [82, 83, 85], [82, 85, 90], [82, 90, 93], [83, 84, 85], [86, 87, 88], [86, 88, 89], [90, 91, 92], [90, 92, 93], 
      [94, 95, 101], [94, 101, 102], [94, 102, 109], [95, 96, 101], [96, 97, 100], [97, 98, 99], [102, 107, 108], [102, 108, 109], [103, 106, 107], [104, 105, 106], 
      [110, 111, 112], [110, 112, 117], [113, 114, 116], [114, 115, 116]
    ];
  } else if (this.phase == 4) {
    this.node_title = [
      [22.586, 19.227], [28.937, 19.227], [29.012, 30.091], [31.117, 30.122], [31.117, 33.615], [29.012, 33.615], [29.012, 37.131], [24.917, 37.131], [24.888, 33.615], [15.757, 33.615], [15.757, 30.932], [20.79, 30.122], [24.876, 23.089], [24.917, 30.122], 
      [35.725, 29.069], [37.414, 29.069], [34.766, 36.945], [33.066, 36.945], 
      [39.331, 29.219], [44.07, 29.219], [44.07, 30.818], [40.674, 30.818], [40.442, 32.237], [43.197, 32.203], [44.77, 34.82], [43.316, 36.558], [40.199, 36.945], [37.577, 36.268], [39.376, 34.976], [40.79, 35.257], [42.486, 34.723], [41.933, 33.5], [38.52, 33.507], 
      [54.353, 29.429], [56.292, 29.429], [59.201, 36.92], [57.385, 36.92], [56.832, 35.437], [53.745, 35.437], [53.174, 36.92], [51.358, 36.92], [54.332, 33.916], [55.313, 31.369], [56.264, 33.916], 
      [59.234, 29.429], [65.622, 29.429], [65.622, 30.95], [63.293, 30.95], [63.293, 36.92], [61.563, 36.92], [61.563, 30.95], [59.234, 30.95], 
      [66.359, 29.429], [68.793, 29.429], [70.894, 34.769], [72.995, 29.429], [75.428, 29.429], [75.428, 36.92], [73.698, 36.92], [73.698, 32.11], [71.74, 36.92], [70.057, 36.92], [68.099, 32.11], [68.08, 36.92], [66.359, 36.92], 
      [76.185, 31.877], [78.469, 29.367], [81.181, 29.432], [83.635, 31.235], [83.635, 34.806], [81.806, 36.777], [78.8, 36.972], [76.644, 34.996], [78.024, 32.39], [79.743, 30.78], [81.906, 31.812], [81.855, 34.334], [80.353, 35.631], [78.336, 34.235], 
      [85.737, 29.511], [88.644, 29.511], [90.536, 30.95], [89.053, 31.431], [87.844, 30.731], [86.76, 30.836], [86.472, 31.831], [90.485, 33.907], [89.629, 36.843], [85.984, 36.7], [84.323, 34.857], [86.263, 34.6], [86.767, 35.249], [88.435, 35.516], [88.774, 34.522], [84.584, 32.244], 
      [91.904, 29.429], [95.122, 29.429], [97.584, 30.487], [97.559, 33.523], [94.804, 34.467], [93.625, 34.467], [93.625, 36.92], [91.904, 36.92], [93.625, 30.95], [95.115, 30.95], [96.153, 31.441], [96.153, 32.536], [94.889, 32.946], [93.625, 32.946], 
      [98.877, 29.429], [100.598, 29.429], [100.598, 32.385], [103.611, 32.385], [103.611, 29.429], [105.342, 29.429], [105.342, 36.92], [103.611, 36.92], [103.611, 33.907], [100.598, 33.907], [100.598, 36.92], [98.877, 36.92], 
      [106.753, 29.429], [112.742, 29.429], [112.742, 30.95], [108.474, 30.95], [108.474, 32.385], [112.285, 32.385], [112.285, 33.907], [108.474, 33.907], [108.474, 35.399], [112.751, 35.399], [112.751, 36.92], [106.753, 36.92], 
      [114.191, 29.429], [117.448, 29.429], [119.697, 30.729], [119.697, 32.864], [118.188, 33.816], [120.163, 36.92], [118.36, 36.92], [116.692, 34.126], [115.903, 34.122], [115.912, 36.92], [114.191, 36.92], [114.191, 32.604], [116.042, 30.8], [117.304, 30.775], [118.056, 31.432], [118.09, 32.049], [116.831, 32.604], [115.996, 32.604], 
      [121.363, 29.429], [127.352, 29.429], [127.352, 30.95], [123.084, 30.95], [123.084, 32.385], [126.896, 32.385], [126.896, 33.907], [123.084, 33.907], [123.084, 35.399], [127.361, 35.399], [127.361, 36.92], [121.363, 36.92]
    ];

    this.index_title = [
      [0, 1, 2], [0, 10, 12], [2, 3, 4], [2, 4, 5], [2, 12, 13], [2, 6, 11], [6, 7, 8], [8, 9, 11], [9, 10, 11], [10, 11, 12], 
      [14, 15, 16], [14, 16, 17], 
      [18, 19, 20], [18, 20, 21], [18, 21, 32], [21, 22, 32], [22, 23, 31], [22, 31, 32], [23, 24, 31], [24, 25, 31], [25, 26, 30], [26, 27, 30], [27, 28, 29], 
      [33, 34, 42], [33, 42, 39], [33, 39, 40], [34, 36, 42], [34, 35, 36], [37, 38, 41], [37, 41, 43], 
      [44, 45, 46], [44, 46, 51], [47, 48, 50], [48, 49, 50], 
      [52, 53, 62], [52, 62, 63], [52, 63, 64], [53, 60, 61], [53, 61, 62], [54, 55, 60], [55, 59, 60], [55, 56, 59], [56, 57, 58], [56, 58, 59], 
      [65, 66, 73], [65, 73, 72], [66, 67, 73], [67, 68, 75], [67, 75, 74], [68, 69, 70], [68, 70, 75], [70, 71, 76], [71, 77, 78], [71, 72, 73], 
      [79, 80, 81], [79, 81, 82], [79, 83, 84], [79, 84, 94], [84, 85, 94], [85, 86, 93], [85, 93, 94], [86, 87, 92], [86, 92, 93], [87, 88, 92], [88, 89, 92], [89, 90, 91], 
      [95, 96, 105], [95, 103, 104], [95, 101, 103], [95, 101, 102], [96, 97, 105], [97, 98, 99], [97, 105, 106], [99, 106, 107], [99, 107, 108], [99, 100, 108], 
      [109, 110, 119], [109, 119, 120], [111, 112, 117], [111, 117, 118], [113, 114, 115], [113, 115, 116], 
      [121, 122, 124], [121, 124, 129], [121, 129, 132], [122, 123, 124], [125, 126, 127], [125, 127, 128], [129, 130, 131], [129, 131, 132], 
      [133, 134, 144], [134, 135, 145], [135, 136, 146], [136, 137, 147], [137, 138, 139], [139, 140, 148], [140, 148, 149], [140, 141, 149], [141, 142, 143], [143, 144, 149], [144, 145, 150], 
      [151, 152, 154], [151, 154, 159], [151, 159, 162], [152, 153, 154], [155, 156, 157], [155, 157, 158], [159, 160, 161], [159, 161, 162]
    ];
  }


  for (let i=0; i<this.node_title.length; i++) {
    this.node_title[i][0] *= this.rate;
    this.node_title[i][1] *= this.rate;
  }








  let n_BT = [];
  for (let i=0; i<node_BT.length; i++) {
    for (let j=0; j<node_BT[i].length; j++) {
      n_BT.push(createVector(node_BT[i][j][0], node_BT[i][j][1]));
    }
  }

  for (let i=0; i<n_BT.length; i++) {
    n_BT[i].mult((57.55*(this.rate)) / 100.0);
    n_BT[i].add(221.288*(this.rate), 483.232*(this.rate));
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

    for (let i=0; i<this.info.length; i++) {
      this.info[i] = str_info[0][i+1];
    }
  } else if (this.phase == 2) {
    this.info = new Array(7);

    for (let i=0; i<this.info.length; i++) {
      this.info[i] = str_info[1][i+1];
    }
  } else if (this.phase == 3) {
    this.info = new Array(1);

    for (let i=0; i<this.info.length; i++) {
      this.info[i] = str_info[2][i+1];
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
      this.CARD.vertex(n_BT[this.index_BT[i][0]].x, n_BT[this.index_BT[i][0]].y);
      this.CARD.vertex(n_BT[this.index_BT[i][1]].x, n_BT[this.index_BT[i][1]].y);
      this.CARD.vertex(n_BT[this.index_BT[i][2]].x, n_BT[this.index_BT[i][2]].y);
    }
    this.CARD.endShape();






    this.CARD.fill(c_winFrame);
    this.CARD.textAlign(CENTER, CENTER);
    this.CARD.textSize(11 * this.rate);
    if (this.phase == 1) {
      this.CARD.text("1024 ed", 0, 488.367 * this.rate, 192.7 * this.rate);
    } else if (this.phase == 2) {
      this.CARD.text("1024 ed", 0, 488.367 * this.rate, 192.7 * this.rate);
    } else if (this.phase == 3) {
      this.CARD.text("2048 ed", 0, 488.367 * this.rate, 192.7 * this.rate);
    } else if (this.phase == 4) {
      this.CARD.text("512 ed", 0, 488.367 * this.rate, 192.7 * this.rate);
    }
    this.CARD.text("//blocktrain.art", 307.3 * this.rate, 488.367 * this.rate, 192.7 * this.rate);

    this.CARD.fill(c_sky);
    if (open_mode_line) {
      this.CARD.fill(changeSB(c_sky, 10, 20));
    }
    this.CARD.textAlign(LEFT, TOP);
    this.CARD.textSize(6.85 * this.rate);
    this.CARD.textLeading(11 * this.rate);
    if (this.phase == 1  ||  this.phase == 2) {
      this.CARD.text(this.info[0]+"\n"+this.info[1], 191.52 * this.rate, 32.468 * this.rate);
      this.CARD.text(this.info[2]+"\n"+this.info[3], 291.186 * this.rate, 32.468 * this.rate);
      this.CARD.text(this.info[4]+"\n"+this.info[5]+"\n"+this.info[6], 392.938 * this.rate, 32.468 * this.rate);
    } else if (this.phase == 3) {

      this.CARD.text(this.info[0], 392.938 * this.rate, 32.468 * this.rate);
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
