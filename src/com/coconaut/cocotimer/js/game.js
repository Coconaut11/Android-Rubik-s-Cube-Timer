var

canvas, ctx,
width, height,

frames,

times = [],
bestTime, worstTime, aof, aot,
scramble,

btnDltLastColor = "black",

insideList = false;

var lastX = 0, lastY = 0;

function main() {
  timelist.init();
  canvas = document.createElement("canvas");

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.addEventListener("touchstart", onpress);
  canvas.addEventListener("touchend", onrelease);
  canvas.addEventListener("touchmove", onmove);

  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  document.body.appendChild(canvas);

  console.log(canvas.width + ", " + canvas.height);

  run();
}

function run() {
  var loop = function() {
    update();
    render();
    window.requestAnimationFrame(loop, canvas);
  }
  window.requestAnimationFrame(loop, canvas);
}

function update() {
  timer.update();
}

function render() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);

  //Time Text
  ctx.font = "100px Arial";
  ctx.fillStyle = timer.timeColor;
  var time = TimeUtil.intToTime(timer.getTime(false));
  ctx.fillText(TimeUtil.timeToString(time), width/2 - 210, height/2 - height/20);

  //Delete last solve button
  ctx.font = "70px Arial bold";
  ctx.fillStyle = btnDltLastColor;
  ctx.fillText("←", width - 125, 75);
  ctx.fillRect(width - 130, 34, 85, 40);

  //Delete All btn
  ctx.font = "40px Arial bold";
  ctx.fillText("X", width - 90, height - 40);

  timelist.render(ctx);
}

function onpress(evt) {
  var touch = evt.targetTouches[0];
  if(BoundsUtil.inside(touch.pageX, touch.pageY, width - 130, 34, 85, 40))
    btnDltLastColor = "gray";
  else if(BoundsUtil.inside(touch.pageX, touch.pageY, width - 94, height - 70, 36, 36)) {
    //Changing color stuff
  } else {
    if(!clickInTimeList(touch)) {
      if(timer.canStart && !timer.delaying) timer.timeColor = "#00ff00";
      timer.stopTime();
    }
  }

  lastX = touch.pageX;
  lastY = touch.pageY;
}

function onrelease(evt) {
  var touch = evt.changedTouches[0];

  btnDltLastColor = "black";

  if(BoundsUtil.inside(touch.pageX, touch.pageY, width - 130, 34, 85, 40)) {
    timelist.removeLast();
    return;
  }

  if(BoundsUtil.inside(touch.pageX, touch.pageY, width - 94, height - 70, 36, 36)) {
    timelist.removeAll();
  }

  if(!clickInTimeList(touch) && !insideList)
    timer.startTime();
  else {
    insideList = false;
  }
}

function onmove(evt) {
  if (evt.targetTouches.length == 1) {
    timer.cancelTimeing();
    var touch = evt.targetTouches[0];
    if(clickInTimeList(touch)) {
      var x = touch.pageX;
      var y = touch.pageY;

      var dragVel = y - lastY;
      timelist.yOff += dragVel;

      insideList = true;

      lastX = touch.pageX;
      lastY = touch.pageY;
    }
  }
}


function clickInTimeList(touch) {
  var x = touch.pageX;
  var y = touch.pageY;

  if(x < 210 && y < window.innerWidth - 600) {
    return true;
  }

  return false;
}

window.onload = main();
