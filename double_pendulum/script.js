let canvas
let ctx;

const g = 9.80665;
const time = 1 / 30;

var wallpaperSettings = {
    fps: 0
};
var last = performance.now() / 1000;
var fpsThreshold = 0;

let min_size;
let max_size;

let l_min
let l_max
let m_min
let m_max
let theta_min
let theta_max

let l1
let l2
let m1
let m2
let theta1
let theta2
let mu

let theta1_d2 = 0;
let theta2_d2 = 0;
let theta1_d = 0;
let theta2_d = 0;

let r0;
let r1;
let r2;
let s1;
let s2;

let x0;
let y0;
let x1;
let y1;
let x2;
let y2;

l_min = 2;
l_max = 4;
m_min = 0.2;
m_max = 0.4;
theta_min = 0.5 * Math.PI;
theta_max = 1.5 * Math.PI;

l2 = Math.random() * (l_max - l_min) + l_min;
m1 = Math.random() * (m_max - m_min) + m_min;
l1 = Math.random() * (l_max - l_min) + l_min;
m2 = Math.random() * (m_max - m_min) + m_min;
mu = 1 + m1 / m2;
theta1 = Math.random() * (theta_max - theta_min) + theta_min;
theta2 = Math.random() * (theta_max - theta_min) + theta_min;

function setup_random() {
  l2 = Math.random() * (l_max - l_min) + l_min;
  m1 = Math.random() * (m_max - m_min) + m_min;
  l1 = Math.random() * (l_max - l_min) + l_min;
  m2 = Math.random() * (m_max - m_min) + m_min;
  mu = 1 + m1 / m2;
  theta1 = Math.random() * (theta_max - theta_min) + theta_min;
  theta2 = Math.random() * (theta_max - theta_min) + theta_min;
}

window.wallpaperPropertyListener = {

  applyGeneralProperties: function(properties) {
      if (properties.fps) {
          wallpaperSettings.fps = properties.fps;
      }
  },

  applyUserProperties: function(properties) {

    if (properties.length_min) {
      l_min = properties.length_min.value;
    }

    if (properties.length_max) {
      l_max = properties.length_max.value;
    }

    if (properties.mass_min) {
      m_min = properties.mass_min.value;
    }

    if (properties.mass_max) {
      m_max = properties.mass_max.value;
    }

    mu = 1 + m1 / m2;

    if (properties.theta_min) {
      theta_min = properties.theta_min.value * Math.PI;
    }

    if (properties.theta_max) {
      theta_max = properties.theta_max.value * Math.PI;
    }

    setup_random();
    setup();

  }
}

function run() {
  window.requestAnimationFrame(run);

    var now = performance.now() / 1000;
    var dt = Math.min(now - last, 1);
    last = now;

    if (wallpaperSettings.fps > 0) {
        fpsThreshold += dt;
        if (fpsThreshold < 1.0 / wallpaperSettings.fps) {
            return;
        }
        fpsThreshold -= 1.0 / wallpaperSettings.fps;
    }

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
  theta1 += (theta1_d * time) % (2 * Math.PI);
  theta2 += (theta2_d * time) % (2 * Math.PI);

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

  r0 = (r_min + r_max) / 2;

  if (m_min == m_max) {
    r1 = r2 = r0;
  } else {
    a = (r_min - r_max) / (m_min - m_max);
    b = (((-m_max) * r_min + m_min * r_max) / (m_min - m_max));
    r1 = a * m1 + b;
    r2 = a * m2 + b;
  }

  if (l_min == l_max) {
    s1 = s2 = (s_min + s_max) / 2;
  } else {
    a = (s_min - s_max) / (l_min - l_max);
    b = (-l_max * s_min + l_min * s_max) / (l_min - l_max);
    s1 = a * l1 + b;
    s2 = a * l2 + b;
  }

  x0 = canvas.width / 2;
  y0 = canvas.height / 2;
}

window.onload = function() {
  setup();
  window.requestAnimationFrame(run);
}

window.onresize = function() {
  setup();
}
