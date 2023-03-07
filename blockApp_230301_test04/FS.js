
function addAlphaToColor(c, alpha) {
  return color(red(c), green(c), blue(c), alpha);
}

function changeBrightness(c, v) {
  let h = hue(c);
  let s = saturation(c);
  let b = constrain(lightness(c)+v, 0, 100);

  colorMode(HSL);
  c = color(h, s, b);
  colorMode(RGB, 255);
  return c;
}

function changeSB(c, v_s, v_b) {
  let h = hue(c);
  let s = constrain(saturation(c)+v_s, 0, 255);
  let b = constrain(lightness(c)+v_b, 0, 100);

  colorMode(HSL);
  c = color(h, s, b);
  colorMode(RGB, 255);
  return c;
}


function easing_p(p, target, varlue) {
  if (p5.Vector.dist(p, target) > 0.0001) {
    return p5.Vector.add((p5.Vector.sub(target, p)).mult(varlue), p);
  } else {
    return target;
  }
}
function easing_x(x, target, varlue) {
  if (abs(x-target) > 0.0001) {
    return x + (target - x) * varlue;
  } else {
    return target;
  }
}
function real(x) {
  x = x/scaleRate;
  return x;
}



function PRotateX(p, angle) {
  let p_new = createVector(p.z, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p.x, p_new.y, p_new.x);
  return p_final;
}
function PRotateY(p, angle) {
  let p_new = createVector(p.x, p.z);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p.y, p_new.y);
  return p_final;
}
function PRotateZ(p, angle) {
  let p_new = createVector(p.x, p.y);
  p_new.rotate(angle);
  let p_final = createVector(p_new.x, p_new.y, p.z);
  return p_final;
}




function getNode_ellipse(x, y, z, w, h, num) {
  let n = new Array(num);
  for (let i=0; i<n.length; i++) {
    let nx = cos(map(i, 0, n.length, 0, TWO_PI)) * w/2.0;
    let ny = sin(map(i, 0, n.length, 0, TWO_PI)) * h/2.0;
    n[i] = createVector(nx + x, ny + y, z);
  }
  return n;
}



function getNode_rect_fillet(x, y, z, w, h, r_fillet, detail_fillet) {
  let n = new Array(detail_fillet * 4);
  for (let i=0; i<n.length; i++) {
    if (i < n.length/4) {
      let nx = cos(map(i, 0, n.length/4-1, PI, PI+HALF_PI)) * r_fillet;
      let ny = sin(map(i, 0, n.length/4-1, PI, PI+HALF_PI)) * r_fillet;
      n[i] = createVector(nx - w/2.0 + r_fillet, ny - h/2.0 + r_fillet, 0);
    } else if (i < n.length/4*2) {
      let nx = cos(map(i, n.length/4, n.length/4*2-1, -HALF_PI, 0)) * r_fillet;
      let ny = sin(map(i, n.length/4, n.length/4*2-1, -HALF_PI, 0)) * r_fillet;
      n[i] = createVector(nx + w/2.0 - r_fillet, ny - h/2.0 + r_fillet, 0);
    } else if (i < n.length/4*3) {
      let nx = cos(map(i, n.length/4*2, n.length/4*3-1, 0, HALF_PI)) * r_fillet;
      let ny = sin(map(i, n.length/4*2, n.length/4*3-1, 0, HALF_PI)) * r_fillet;
      n[i] = createVector(nx + w/2.0 - r_fillet, ny + h/2.0 - r_fillet, 0);
    } else {
      let nx = cos(map(i, n.length/4*3, n.length-1, HALF_PI, PI)) * r_fillet;
      let ny = sin(map(i, n.length/4*3, n.length-1, HALF_PI, PI)) * r_fillet;
      n[i] = createVector(nx - w/2.0 + r_fillet, ny + h/2.0 - r_fillet, 0);
    }
    //n[i].add(x+w/2.0, y+h/2.0, z);
    n[i].add(x, y, z);//center
  }
  return n;
}




function TRIANGLES_getRect_uv(UL, UR, DR, DL, ul, ur, dr, dl) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z, ul.x, ul.y);
  vertex(UR.x, UR.y, UR.z, ur.x, ur.y);
  vertex(DR.x, DR.y, DR.z, dr.x, dr.y);
  vertex(DR.x, DR.y, DR.z, dr.x, dr.y);
  vertex(DL.x, DL.y, DL.z, dl.x, dl.y);
  vertex(UL.x, UL.y, UL.z, ul.x, ul.y);
}

function TRIANGLES_getRect(UL, UR, DR, DL) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}

function TRIANGLES_getRect_fill(UL, UR, DR, DL, c) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  fill(c);
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}

function TRIANGLES_getRect_fill4(UL, UR, DR, DL, c1, c2, c3, c4) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
  fill(c2);
  vertex(UR.x, UR.y, UR.z);
  fill(c3);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  fill(c4);
  vertex(DL.x, DL.y, DL.z);
  fill(c1);
  vertex(UL.x, UL.y, UL.z);
}


function TRIANGLES_getTriangle(p1, p2, p3) {
  if (p1==null || p2==null || p3==null) {
    return;
  }
  vertex(p1.x, p1.y, p1.z);
  vertex(p2.x, p2.y, p2.z);
  vertex(p3.x, p3.y, p3.z);
}


function TRIANGLES_getTriangle_fill3(p1, p2, p3, c1, c2, c3) {
  if (p1==null || p2==null || p3==null) {
    return;
  }
  fill(c1);
  vertex(p1.x, p1.y, p1.z);
  fill(c2);
  vertex(p2.x, p2.y, p2.z);
  fill(c3);
  vertex(p3.x, p3.y, p3.z);
}




function TRIANGLES_getShape(n) {
  if (n==null || n.length<3) {
    return;
  }
  for (let i=0; i<n.length-2; i++) {
    //vertex(n[0].x, n[0].y, n[0].z);
    //vertex(n[i+1].x, n[i+1].y, n[i+1].z);
    //vertex(n[i+2].x, n[i+2].y, n[i+2].z);
    FS_drawShape([n[0], n[i+1], n[i+2]]);
  }
}




function TRIANGLES_getLine_weight(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_fill2(P1, P2, w, c1, c2) {
  if (P1==null || P2==null) {
    return;
  }
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
  vertex(P1.x + w/2.0, P1.y, P1.z);
  fill(c2);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x + w/2.0, P2.y, P2.z);
  vertex(P2.x - w/2.0, P2.y, P2.z);
  fill(c1);
  vertex(P1.x - w/2.0, P1.y, P1.z);
}


function TRIANGLES_getLine_weightToR(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P1.x + w, P1.y, P1.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x + w, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P1.x, P1.y, P1.z);
}

function TRIANGLES_getLine_weightToL(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x - w, P1.y, P1.z);
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x - w, P2.y, P2.z);
  vertex(P1.x - w, P1.y, P1.z);
}

function TRIANGLES_getLine_weight_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y - w/2.0, P1.z);
  vertex(P2.x, P2.y - w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P1.x, P1.y + w/2.0, P1.z);
  vertex(P1.x, P1.y - w/2.0, P1.z);
}

function TRIANGLES_getLine_weight_Y_fill2(P1, P2, w, c1, c2) {
  if (P1==null || P2==null) {
    return;
  }
  fill(c1);
  vertex(P1.x, P1.y - w/2.0, P1.z);
  fill(c2);
  vertex(P2.x, P2.y - w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  vertex(P2.x, P2.y + w/2.0, P2.z);
  fill(c1);
  vertex(P1.x, P1.y + w/2.0, P1.z);
  vertex(P1.x, P1.y - w/2.0, P1.z);
}


function TRIANGLES_getLine_weightToU_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y - w, P1.z);
  vertex(P2.x, P2.y - w, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P1.x, P1.y, P1.z);
  vertex(P1.x, P1.y - w, P1.z);
}

function TRIANGLES_getLine_weightToD_Y(P1, P2, w) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
  vertex(P2.x, P2.y + w, P2.z);
  vertex(P2.x, P2.y + w, P2.z);
  vertex(P1.x, P1.y + w, P1.z);
  vertex(P1.x, P1.y, P1.z);
}


function TRIANGLES_getLine_weight_T(P1, P2, w) {//垂直宽度
  if (P1==null || P2==null) {
    return;
  }
  let ul = p5.Vector.sub(P2, P1).rotate(HALF_PI).setMag(w/2.0).add(P1);
  let ur = p5.Vector.sub(P2, P1).rotate(-HALF_PI).setMag(w/2.0).add(P1);
  let dl = p5.Vector.sub(P1, P2).rotate(-HALF_PI).setMag(w/2.0).add(P2);
  let dr = p5.Vector.sub(P1, P2).rotate(HALF_PI).setMag(w/2.0).add(P2);
  TRIANGLES_getRect(ul, ur, dr, dl);
}

function TRIANGLES_getLine_weight_T_fill2(P1, P2, w, c1, c2) {//垂直宽度
  if (P1==null || P2==null) {
    return;
  }
  let ul = p5.Vector.sub(P2, P1).rotate(HALF_PI).setMag(w/2.0).add(P1);
  let ur = p5.Vector.sub(P2, P1).rotate(-HALF_PI).setMag(w/2.0).add(P1);
  let dl = p5.Vector.sub(P1, P2).rotate(-HALF_PI).setMag(w/2.0).add(P2);
  let dr = p5.Vector.sub(P1, P2).rotate(HALF_PI).setMag(w/2.0).add(P2);
  TRIANGLES_getRect_fill4(ul, ur, dr, dl, c1, c1, c2, c2);
}


function LINES_getLine(P1, P2) {
  if (P1==null || P2==null) {
    return;
  }
  vertex(P1.x, P1.y, P1.z);
  vertex(P2.x, P2.y, P2.z);
}


function LINES_getRect(UL, UR, DR, DL) {
  if (UL==null || UR==null || DR==null || DL==null) {
    return;
  }
  vertex(UL.x, UL.y, UL.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(UR.x, UR.y, UR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DR.x, DR.y, DR.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(DL.x, DL.y, DL.z);
  vertex(UL.x, UL.y, UL.z);
}


function LINES_getEllipse(n) {
  if (n==null || n.length<2) {
    return;
  }
  for (let i=0; i<n.length-1; i++) {
    //vertex(n[i].x, n[i].y, n[i].z);
    //vertex(n[i+1].x, n[i+1].y, n[i+1].z);
    FS_drawLine(n[i], n[i+1]);
  }
  //vertex(n[n.length-1].x, n[n.length-1].y, n[n.length-1].z);
  //vertex(n[0].x, n[0].y, n[0].z);
  FS_drawLine(n[n.length-1], n[0]);
}



function TPFyz(x, p1, p2) {  //Two-point Form    get y、z
  let y = 0;
  let z = 0;
  if (p2.x-p1.x == 0) {
    y = ((x - p1.x)*(p2.y-p1.y))/0.01 + p1.y;
    z = ((x - p1.x)*(p2.z-p1.z))/0.01 + p1.z;
    return  createVector(x, y, z);
  } else {
    y = ((x - p1.x)*(p2.y-p1.y))/(p2.x-p1.x) + p1.y;
    z = ((x - p1.x)*(p2.z-p1.z))/(p2.x-p1.x) + p1.z;
    return  createVector(x, y, z);
  }
}


function TPFxz(y, p1, p2) {  //Two-point Form    get x、z
  let x = 0;
  let z = 0;
  if (p2.y-p1.y == 0) {
    x = ((y - p1.y)*(p2.x-p1.x))/0.01 + p1.x;
    z = ((y - p1.y)*(p2.z-p1.z))/0.01 + p1.z;
    return  createVector(x, y, z);
  } else {
    x = ((y - p1.y)*(p2.x-p1.x))/(p2.y-p1.y) + p1.x;
    z = ((y - p1.y)*(p2.z-p1.z))/(p2.y-p1.y) + p1.z;
    return  createVector(x, y, z);
  }
}


function intersection( wall_A, wall_B, ray_O, ray_P) {
  let den = (wall_A.x - wall_B.x) * (ray_O.y - ray_P.y) - (wall_A.y - wall_B.y) * (ray_O.x - ray_P.x);
  if (den != 0) {
    let t = ((wall_A.x - ray_O.x) * (ray_O.y - ray_P.y) - (wall_A.y - ray_O.y) * (ray_O.x - ray_P.x)) / den;
    let u = -((wall_A.x - wall_B.x) * (wall_A.y - ray_O.y) - (wall_A.y - wall_B.y) * (wall_A.x - ray_O.x)) / den;
    if (t>0 && t<1 && u>0 && u<1) {
      let new_P = createVector(wall_A.x+t*(wall_B.x-wall_A.x), wall_A.y+t*(wall_B.y-wall_A.y));
      return new_P;
    } else {
      return ray_P;
    }
  } else {
    return ray_P;
  }
}

function isIntersection( wall_A, wall_B, ray_O, ray_P) {
  let den = (wall_A.x - wall_B.x) * (ray_O.y - ray_P.y) - (wall_A.y - wall_B.y) * (ray_O.x - ray_P.x);
  if (den != 0) {
    let t = ((wall_A.x - ray_O.x) * (ray_O.y - ray_P.y) - (wall_A.y - ray_O.y) * (ray_O.x - ray_P.x)) / den;
    let u = -((wall_A.x - wall_B.x) * (wall_A.y - ray_O.y) - (wall_A.y - wall_B.y) * (wall_A.x - ray_O.x)) / den;
    if (t>0 && t<1 && u>0 && u<1) {
      let new_P = createVector(wall_A.x+t*(wall_B.x-wall_A.x), wall_A.y+t*(wall_B.y-wall_A.y));
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}


function sinCtanC(value, i) {
  if (i > 1) {
    return sinCtanC(sin(tan(value)), i-1);
  } else if (i == 1) {
    return sin(tan(value));
  } else {
    return value;
  }
}

function accXiu(value_0_1, i) {
  if (i > 1) {
    return accXiu(sin(lerp(0, HALF_PI, value_0_1)), i-1);
  } else if (i == 1) {
    return sin(lerp(0, HALF_PI, value_0_1));
  } else {
    return value_0_1;
  }
}





function lerpVector(p1, p2, v) {
  let p_new = p1.copy();
  p_new.x = lerp(p1.x, p2.x, v);
  p_new.y = lerp(p1.y, p2.y, v);
  p_new.z = lerp(p1.z, p2.z, v);
  return p_new;
}



function FS_rand(a, b) {
  const var_min = Math.min(a, b);
  const var_max = Math.max(a, b);
  //return fxrand()*(var_max-var_min) + var_min;
  return Math.random()*(var_max-var_min) + var_min;
}


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






function get_triangle_with_points(p, num) {
  let _n = new Array(num * p.length);
  for (let i=0; i<p.length; i++) {
    for (let k=0; k<num; k++) {
      let n = p5.Vector.sub(p[(i+2)%p.length], p[(i+1)%p.length]).mult(sqrt(FS_rand(0, 1))).add(p[(i+1)%p.length]);
      _n[(i*num) + k] = p5.Vector.sub(n, p[i]).mult(sqrt(FS_rand(0, 1))).add(p[i]);
    }
  }
  return _n;
}







function drawCylinder_info(n, _state_noise, _var_noise) {
  for (let i=0; i<n.length; i++) {
    FS_drawEllipse(n[i], _state_noise, _var_noise);
    if (i < n.length-1) {
      for (let j=0; j<n[i].length; j++) {
        FS_drawLine(n[i][j], n[i+1][j], _state_noise, _var_noise);
      }
    }
  }
}

function drawCylinder_LINES(n, xy, _state_noise, _var_noise) {
  let index_min = new Array(n.length);
  let index_max = new Array(n.length); 
  for (let i=0; i<n.length; i++) {
    index_min[i] = 0;
    index_max[i] = 0;
    for (let j=0; j<n[i].length; j++) {
      if (xy == 0) {
        if (screenPosition(n[i][j]).x < screenPosition(n[i][index_min[i]]).x) {
          index_min[i] = j;
        }
        if (screenPosition(n[i][j]).x > screenPosition(n[i][index_max[i]]).x) {
          index_max[i] = j;
        }
      } else {
        if (screenPosition(n[i][j]).y < screenPosition(n[i][index_min[i]]).y) {
          index_min[i] = j;
        }
        if (screenPosition(n[i][j]).y > screenPosition(n[i][index_max[i]]).y) {
          index_max[i] = j;
        }
      }
    }
  }
  for (let i=0; i<n.length-1; i++) {
    FS_drawLine(n[i][index_min[i]], n[i+1][index_min[i+1]], _state_noise, _var_noise);
    FS_drawLine(n[i][index_max[i]], n[i+1][index_max[i+1]], _state_noise, _var_noise);
  }
}

function drawCylinder_TRIANGLES(n) {
  for (let i=0; i<n.length-1; i++) {
    for (let j=0; j<n[i].length; j++) {
      FS_drawShape([n[i][j], n[i][(j+1)%n[i].length], n[i+1][(j+1)%n[i].length], n[i+1][j]]);
    }
  }
}
function drawCylinder_TRIANGLES_half(n, xy) {
  let index_min = new Array(n.length);
  let index_max = new Array(n.length); 
  for (let i=0; i<n.length; i++) {
    index_min[i] = 0;
    index_max[i] = 0;
    for (let j=0; j<n[i].length; j++) {
      if (xy == 0) {
        if (screenPosition(n[i][j]).x < screenPosition(n[i][index_min[i]]).x) {
          index_min[i] = j;
        }
        if (screenPosition(n[i][j]).x > screenPosition(n[i][index_max[i]]).x) {
          index_max[i] = j;
        }
      } else {
        if (screenPosition(n[i][j]).y < screenPosition(n[i][index_min[i]]).y) {
          index_min[i] = j;
        }
        if (screenPosition(n[i][j]).y > screenPosition(n[i][index_max[i]]).y) {
          index_max[i] = j;
        }
      }
    }
  }
  for (let i=0; i<n.length-1; i++) {
    for (let j=0; j<n[i].length; j++) {
      if ((index_min[i] > index_max[i]   &&   (j >= index_max[i]  &&  j <= index_min[i]))    ||
        (index_min[i] < index_max[i]   &&   (j >= index_max[i]  ||  j <= index_min[i]))) {
        TRIANGLES_getRect(n[i][j], n[i][(j+1)%n[i].length], n[i+1][(j+1)%n[i].length], n[i+1][j]);
      }
    }
  }
}
//@funnysandwich
