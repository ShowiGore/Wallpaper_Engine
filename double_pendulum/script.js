let canvas
let ctx

let min_size
let max_size

const g = 9.80665;
const time = 0.2;
let x0;
let y0;

let l1 = 100;
let l2 = 100;
let m1 = 0.1;
let m2 = 0.1;
let theta1 = 1 * (Math.PI) / 2;
let theta2 = 3 * (Math.PI) / 2;
let r0 = 20;
let r1 = 20;
let r2 = 20;



let mu = 1 + m1 / m2;
let theta1_d2 = 0;
let theta2_d2 = 0;
let theta1_d = 0;
let theta2_d = 0;

let x1
let y1
let x2
let y2

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

    mu = 1 + m1 / m2;

  }
}

function run() {
  theta1_d2 = (g * (Math.sin(theta2) * Math.cos(theta1 - theta2) - mu * Math.sin(theta1)) - (l2 * theta2_d * theta2_d + l1 * theta1_d * theta1_d * Math.cos(theta1 - theta2)) * Math.sin(theta1 - theta2)) / (l1 * (mu - Math.cos(theta1 - theta2) * Math.cos(theta1 - theta2)));
  theta2_d2 = (mu * g * (Math.sin(theta1) * Math.cos(theta1 - theta2) - Math.sin(theta2)) + (mu * l1 * theta1_d * theta1_d + l2 * theta2_d * theta2_d * Math.cos(theta1 - theta2)) * Math.sin(theta1 - theta2)) / (l2 * (mu - Math.cos(theta1 - theta2) * Math.cos(theta1 - theta2)));
  theta1_d += theta1_d2 * time;
  theta2_d += theta2_d2 * time;
  theta1 += theta1_d * time;
  theta2 += theta2_d * time;

  x1 = x0 + l1 * Math.sin(theta1);
  y1 = y0 + l1 * Math.cos(theta1);
  x2 = x0 + l1 * Math.sin(theta1) + l2 * Math.sin(theta2);
  y2 = y0 + l1 * Math.cos(theta1) + l2 * Math.cos(theta2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line(x0, y0, x1, y1);
  line(x1, y1, x2, y2);
  circle(x0, y0, r0);
  circle(x1, y1, r1);
  circle(x2, y2, r2);

  window.requestAnimationFrame(run);
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#808080";
  ctx.fill();
}

function line(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 8;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

//canvas load
window.onload = function() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  x0 = canvas.width/2;
  y0 = canvas.height/2;
  window.requestAnimationFrame(run);
}

//canvas resize
window.onresize = function() {
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  x0 = canvas.width/2;
  y0 = canvas.height/2;
}
