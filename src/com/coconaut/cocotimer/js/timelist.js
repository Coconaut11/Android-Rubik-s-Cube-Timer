var timelist = {
  times: [],

  yMargin: 600,

  yOff: 0,
  in: 0,

  init: function() {
    for(var i = 0; i < localStorage.getItem("timelistlength"); i++) {
      times[i] = localStorage.getItem("time" + i);
    }
  },

  render: function(ctx) {
    if(this.yOff > 0) this.yOff = 0;

    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 210, window.innerWidth - this.yMargin);

    ctx.font = "35px Arial";
    ctx.fillStyle = "black";
    this.in = 0;
    for(i = 0; i < times.length; i++) {
      var x = 7;
      var y = i * 17 + 17;

      if(i % 2 != 0) {
        this.in++;

        if(y + this.yOff > window.innerWidth - this.yMargin + 50 || y + this.yOff < 0)
        continue;

        ctx.fillStyle = "black";
        ctx.fillText((this.in + (this.in < 10 ? ".  " : ".")) + TimeUtil.timeToString(TimeUtil.intToTime(times[i])), x, y + this.yOff);
      }

    ctx.fillStyle = "white";
    ctx.fillRect(0, window.innerWidth - this.yMargin, 210, this.yMargin);
    }
  },

  save: function() {
    var length = times.length;
    localStorage.setItem("timelistlength", length);

    for(var i = 0; i < length; i++)
      localStorage.setItem("time" + i, times[i]);
  },

  getTime: function(index) {
    return times[index];
  },

  addTime: function(time) {
    if(time == null) return;
    times[times.length + 1] = time;
    this.save();
  },

  removeTime: function(index) {
    delete times[index];
    delete times[index + 1];
  },

  removeAll: function() {
    for(var i = 0; i < times.length; i++) {
      times.pop();
    }
  },

  removeLast: function() {
    times.pop();
    times.pop();
    //alert("Deleting last solve is a WIP Task!");
  }
}
