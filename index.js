let shouldFilter = [false, false];

let container;
let speedContainer;

let copies = 1;
let currentSize = 0;
let step = 5;
let radius = 30;
let total = 100;
let isX = 0;
let shouldX = 0;

function preload() {
  mySound = loadSound('audio/kilojoule.mp3');
}

function setup() {
  container = document.body;
  speedContainer = document.getElementById('speed')

  createCanvas(windowWidth, windowHeight);
  background(0)

  mySound.loop()

  fft = new p5.FFT();
}

function mousePressed() {
  let speed = floor(mouseX / width * 3 * 100) / 100;
  mySound.rate(speed)
  speedContainer.innerText = floor(speed * 100);
  shouldX = mouseX;
}

function draw() {
  background(0);

  let vol = 2;
  let w = width / 2;
  let h = height / 2;
  let t = frameCount / 300;

  if(currentSize > vol) {
    currentSize -= step;
  } else if(currentSize < vol) {
    currentSize += step;
  }

  stroke('white')
  noFill()
  fft.analyze();

  if(shouldX > isX) {
    isX += 10;
  }
  if(shouldX < isX) {
    isX -= 10;
  }

  for (var i = 0; i < total; i++) {
    let y = cos(PI*t*2+i*PI*2/total) * radius;
    let x = sin(PI*t*2+i*PI*2/total) * radius;
    stroke(`hsla(${floor(abs(sin(t)*255))}, 80%, 50%, ${i/total})`)
    ellipse(w+x, h+y, fft.getEnergy(300)/h*h+100)
  }

  let zeros = 100 - floor((isX / width) * 100);
  let rzeros = [1];

  console.log(zeros);

  for (var i = 0; i < zeros; i++) {
    rzeros.push(0)
  }

  let a = random(rzeros);

  if(shouldFilter[0] && !shouldFilter[1]) {
    shouldFilter[1] = true;
    container.classList.toggle('posterize');
    setTimeout(() => { shouldFilter[1] = false; }, 3000)
  }

  if(shouldFilter[0] & a == 1) {
    container.classList.toggle('invert')
  }

  if(a == 1 && !shouldFilter[0]) {
    shouldFilter[0] = true;
    setTimeout(() => { shouldFilter[0] = false; }, 3000)
  }
}
