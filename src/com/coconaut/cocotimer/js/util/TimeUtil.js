var TimeUtil = {
  intToTime: function(time) {
    var t = {min: 0, sec: 0, mil: 0};

    t.sec = time/60;
    t.min = t.sec/60;
    t.mil = (time%60) * 100 / 60;
    t.sec %= 60;
    t.min %= 60;

    t.min = Math.floor(t.min);
    t.sec = Math.floor(t.sec);
    t.mil = Math.floor(t.mil);

    return t;
  },

  timeToString: function(time) {
    var str = (time.min > 9 ? time.min : "0"+time.min) + ":" + (time.sec > 9 ? time.sec : "0"+time.sec) + ":" + (time.mil > 9 ? time.mil : "0"+time.mil);
    return str;
  }
}
