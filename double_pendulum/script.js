var canvas
var ctx

var W
var H
var min_size
var max_size

var g = 1;

var l1
var l2
var m1
var m2
var a1
var a2

var x1
var y1
var x2
var y2

window.wallpaperPropertyListener = {
  applyUserProperties: function(properties) {

    if (properties.length1) {
      l1 = properties.length1.value;
    }

    if (properties.length2) {
      l2 = properties.length2.value;
    }

    if (properties.mass1) {
      m1 = properties.mass1.value;
    }

    if (properties.mass2) {
      m2 = properties.mass2.value;
    }

  }
}

var red = 0;
var yellow = 0;
var green = 0;
var cyan = 0;
var blue = 0;
var magenta = 0;

function run() {
  var x = W / 2;
  var y = H / 2;


  ctx.clearRect(0,0,canvas.width,canvas.height);
  circle(x, y, red, '#FF0000');
  circle(x, y, yellow, '#FFFF00');
  circle(x, y, green, '#00FF00');
  circle(x, y, cyan, '#00FFFF');
  circle(x, y, blue, '#0000FF');
  circle(x, y, magenta, '#FF00FF');

  red = (red + 1) % (min_size/2);
  yellow = (yellow + 2) % (min_size/2);
  green = (green + 3) % (min_size/2);
  cyan = (cyan + 5) % (min_size/2);
  blue = (blue + 7) % (min_size/2);
  magenta = (magenta + 11) % (min_size/2);

  sleep(40);

  window.requestAnimationFrame(run);
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function circle(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.lineWidth = 10;
  ctx.strokeStyle = color;
  //ctx.closePath();
  ctx.stroke();
}

//canvas load
window.onload = function() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  W = canvas.width;
  H = canvas.height;
  min_size = Math.min(W,H);
  max_size = Math.max(W,H);
  window.requestAnimationFrame(run);
}

//canvas resize
window.onresize = function() {
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  W = canvas.width;
  H = canvas.height;
  min_size = Math.min(W,H);
  max_size = Math.max(W,H);
}
