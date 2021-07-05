let canvas
let ctx;

let min_size;
let max_size;

const g = 9.80665;
const time = 0.1;
let x0;
let y0;

let l_min = 50;
let l_max = 100;
let m_min = 0.1;
let m_max = 0.4;
let theta_min = 0.5 * (Math.PI);
let theta_max = 1.5 * (Math.PI);

let l1 = Math.random() * (l_max - l_min) + l_min;
let l2 = Math.random() * (l_max - l_min) + l_min;
let m1 = Math.random() * (m_max - m_min) + m_min;
let m2 = Math.random() * (m_max - m_min) + m_min;
let theta1 = Math.random() * (theta_max - theta_min) + theta_min;
let theta2 = Math.random() * (theta_max - theta_min) + theta_min;

let r0;
let r1;
let r2;
let s1;
let s2;
let x1
let y1
let x2
let y2

let mu = 1 + m1 / m2;
let theta1_d2 = 0;
let theta2_d2 = 0;
let theta1_d = 0;
let theta2_d = 0;

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
  let st1 = Math.sin(theta1);
  let st2 = Math.sin(theta2);
  let ct1Mt2 = Math.cos(theta1 - theta2)
  let st1Mt2 = Math.sin(theta1 - theta2);
  let mMct1mt2Mct1mt2 = mu - ct1Mt2 * ct1Mt2;
  let t1_ds = theta1_d * theta1_d;
  let t2_ds = theta2_d * theta2_d;
  let l1Mt1_ds = l1 * t1_ds;
  let l2Mt2_ds = l2 * t2_ds;

  theta1_d2 = (g * (st2 * ct1Mt2 - mu * st1) - (l2Mt2_ds + l1Mt1_ds * ct1Mt2) * st1Mt2) / (l1 * mMct1mt2Mct1mt2);
  theta2_d2 = (mu * g * (st1 * ct1Mt2 - st2) + (mu * l1Mt1_ds + l2Mt2_ds * ct1Mt2) * st1Mt2) / (l2 * mMct1mt2Mct1mt2);
  theta1_d += theta1_d2 * time;
  theta2_d += theta2_d2 * time;
  theta1 += theta1_d * time;
  theta2 += theta2_d * time;

  x1 = x0 + s1 * Math.sin(theta1);
  y1 = y0 + s1 * Math.cos(theta1);
  x2 = x0 + s1 * Math.sin(theta1) + s2 * Math.sin(theta2);
  y2 = y0 + s1 * Math.cos(theta1) + s2 * Math.cos(theta2);

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
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function setup() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");
  canvas.width = canvas.scrollWidth;
  canvas.height = canvas.scrollHeight;
  min_size = Math.min(canvas.width, canvas.height);
  //max_size = Math.max(canvas.width, canvas.height);

  ctx.lineWidth = min_size / 60;

  r_min = min_size / 40;
  r_max = min_size / 20;
  s_min = min_size * 1 / 6 - r_max / 2;
  s_max = min_size * 1 / 4 - r_max / 2;

  a = (r_min - r_max) / (m_min - m_max);
  b = (((-m_max) * r_min + m_min * r_max) / (m_min - m_max));
  r0 = (r_min + r_max) / 2;
  r1 = a * m1 + b;
  r2 = a * m2 + b;

  a = (s_min - s_max) / (l_min - l_max);
  b = (((-l_max) * s_min + l_min * s_max) / (l_min - l_max));
  s1 = a * l1 + b;
  s2 = a * l2 + b;

  x0 = canvas.width / 2;
  y0 = canvas.height / 2;
}

//canvas load
window.onload = function() {
  setup();
  window.requestAnimationFrame(run);
}

//canvas resize
window.onresize = function() {
  setup();
}
