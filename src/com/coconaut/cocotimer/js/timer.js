var timer = {
  time: 0,
  timeing: false,
  canStart: true,

  delay: 30,
  delaying: false,

  timeColor: "black",

  update: function() {
    if(this.timeing) this.time++;

    if(this.delaying && !this.timeing) {
      this.delay--;

      if(this.delay == 0) {
        this.delaying = false;
        this.delay = 30;
      }
    }
  },

  startTime: function() {
    if(!this.timeing && this.canStart && !this.delaying) {
      this.timeing = true;
      this.time = 0;
      this.timeColor = "black";
    } else {
      this.canStart = true;
    }
  },

  stopTime: function() {
    if(this.timeing) {
      this.timeing = false;
      this.canStart = false;
      this.timeColor = "black";
      timelist.addTime(this.time);

      this.delaying = true;
    }
  },

  cancelTimeing: function() {
    if(this.timeing) time = 0;
    this.timeing = false;
    this.canStart = true;
    this.timeColor = "black";
  },

  getTime: function(str) {
    var t = this.time;
    if (str) t = TimeUtil.intToTime(time);

    return t;
  }
}
