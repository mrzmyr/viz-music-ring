let mic;
let shouldFilter = [false, false];
let canvas;
let playbackSpeed = 1;
let copies = 1;
let currentSize = 0;
let step = 5;
let radius = 30;
let total = 100;

function preload() {
  mySound = loadSound('audio/kilojoule.mp3');
}

function setup() {
  canvas = document.querySelector('canvas');

  createCanvas(windowWidth, windowHeight);
  background(0)

  mic = new p5.AudioIn();
  mic.start();
  mySound.loop()

  fft = new p5.FFT();
}

function mousePressed() {
  mySound.rate(mouseX / width * 3)
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

  for (var i = 0; i < 3; i++) {
    for (var i = 0; i < total; i++) {
      let y = cos(PI*t*2+i*PI*2/total) * radius;
      let x = sin(PI*t*2+i*PI*2/total) * radius;
      stroke(`hsla(${floor(abs(sin(t)*255))}, 80%, 50%, ${i/total})`)
      ellipse(w+x, h+y, fft.getEnergy(300)/300*h + 50)
    }
  }

  let a = random([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]);

  if(shouldFilter[0] && !shouldFilter[1]) {
    shouldFilter[1] = true;
    canvas.classList.toggle('posterize');
    setTimeout(() => { shouldFilter[1] = false; }, 3000)
  }

  if(shouldFilter[0] & a == 1) {
    canvas.classList.toggle('invert')
  }

  if(a == 1 && !shouldFilter[0]) {
    shouldFilter[0] = true;
    setTimeout(() => { shouldFilter[0] = false; }, 3000)
  }
}
