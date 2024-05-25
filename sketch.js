new p5();

let regularFont;
let headingFont;
let titleFont;
let launchTowerImg;
let rocketImg;
let cloudImg;
let rocketHeight = 0;
let rocketTarget = 0;
let particles = [];
let clouds = [];

bottomHeight = 0;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 3; j++) {
    let x = random(windowWidth/20, windowWidth*19/20);
    let y = random(bottomHeight - 500, bottomHeight);
    while(true){
      let ok = true;
      for(let cloud of clouds){
        if(dist(cloud[0], cloud[1], x, y) < 200){
          ok = false;
        }
      }
      if(ok){
        break;
      }
      x = random(windowWidth / 20, windowWidth * 19 / 20);
      y = random(bottomHeight - 500, bottomHeight);
    }
    clouds.push([x, y]);
  }
  bottomHeight -= 500;
}

function engine(x, y, angle, offset = 0) {
  // if (frameCount % 3) return;
  let d = [2 + Math.random() / 2, Math.random() / 5 - 0.1],
    dx = Math.cos(angle) * d[0] + Math.sin(angle) * d[1],
    dy = Math.cos(angle) * d[1] - Math.sin(angle) * d[0];
  particles.push(new Particle(
    x + dx * offset, y + dy * offset,
    dx, dy,
    15 + Math.random(), 0.7 + Math.random() / 8)
  );
}

class Particle {
  constructor(x, y, dx, dy, size, rate) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.rate = rate;
    this.age = 0;
  }
  update(delta) {
    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.size += this.rate * delta;
    this.age += delta;
  }
  draw() {
    noStroke();
    fill(
      255 - min(155, this.age * 3),
      255 - min(155, this.age * 8),
      255 - min(155, this.age * 30),
      min(255, this.age * 20) - max(0, this.age - 255 / 15) * 5
    );
    circle(this.x, this.y, this.size);
  }
}

function preload(){
  regularFont = loadFont('fonts/PTSansNarrow-Regular.ttf');
  titleFont = loadFont('fonts/PTSansNarrow-Bold.ttf');
  launchTowerImg = loadImage('images/launchtower.png');
  rocketImg = loadImage('images/rocket.png');
  cloudImg = loadImage('images/cloud.png');
}

function setup(){
  width = windowWidth;
  height = windowHeight;
  // console.log(width, height);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  // for(let i = 0; i < clouds.length; i++){
  //   clouds[i][0] *= width/1991;
  //   clouds[i][1] *= height/1120;
  // }
}

function mouseWheel(event){
  rocketTarget += Math.max(-10, Math.min(10, event.delta / 10));
}

function draw(){
  push();
  // console.log(rocketHeight);
  let fade = (1 - Math.min(1, Math.max(0, (rocketHeight - 6000*height/1120) / 1500)));
  background(135*fade, 206*fade, 235*fade);

  rocketHeight += (rocketTarget - rocketHeight)/10;
  rocketHeight = max(rocketHeight, 0);
  rocketTarget = max(rocketTarget, 0);

  translate(noise(rocketHeight / 100) * 20 - 10, noise(rocketHeight / 100 + 1000) * 20 - 10);

  let mult = (0.9 * height) / (launchTowerImg.height);
  imageMode(CENTER);
  image(launchTowerImg, width/2, height-launchTowerImg.height*mult/2+rocketHeight, launchTowerImg.width*mult, launchTowerImg.height*mult);
  image(rocketImg, width/2, height-rocketImg.height*mult/2, rocketImg.width*mult, rocketImg.height*mult);
  push();
  scale(width/1991, height/1120);
  for(let cloud of clouds){
    image(cloudImg, cloud[0], cloud[1]+rocketHeight, cloudImg.width*mult/5, cloudImg.height*mult/5);
  }
  pop();

  fill(color(153, 153, 153));
  noStroke();
  rect(0, height-50+rocketHeight, width, height);

  for (let particle of particles){
    particle.update((rocketTarget - rocketHeight) / 10);
  }
  for (let i = 0.3; i < (rocketTarget - rocketHeight) / 10; i++){
    engine(1045, 960, Math.PI * 1.5, i - 0.3);
  }

  particles = particles.filter(x => x.age < 150);
  // console.log(width, height);
  push();
  scale(width/1991, height/1120);
  for (let particle of particles){
    particle.draw();
  }
  pop();
  pop();
}

// function mousePressed(){
//   console.log(mouseX, mouseY);
// }

function windowResized(){
  // launchTowerImg = loadImage('images/launchtower.png');
  // rocketImg = loadImage('images/rocket.png');
  setup();
}