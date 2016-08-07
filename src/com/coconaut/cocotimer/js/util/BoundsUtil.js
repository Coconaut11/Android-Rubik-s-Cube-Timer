var BoundsUtil = {
  inside: function(x, y, xx, yy, ww, hh) {
    if(x > xx && x < xx + ww && y > yy && y < yy + hh) return true;
    return false;
  }
};
