new p5();

let regularFont;
let titleFont;
let launchTowerImg;
let rocketImg;
let cloudImg;
let rocketHeight = 0;
let rocketTarget = 0;
let particles = [];
let clouds = [];

bottomHeight = -100;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 3; j++) {
    let x = random(windowWidth/20, windowWidth*19/20);
    let y = random(bottomHeight - 500*windowHeight/1120, bottomHeight);
    while(true){
      let ok = true;
      for(let cloud of clouds){
        if(dist(cloud[0], cloud[1], x, y) < 200*windowWidth/1991){
          ok = false;
        }
      }
      if(ok){
        break;
      }
      x = random(windowWidth / 20, windowWidth * 19 / 20);
      y = random(bottomHeight - 500*windowHeight/1120, bottomHeight);
    }
    clouds.push([x, y]);
  }
  bottomHeight -= 500*windowHeight/1120;
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
    this.lx = x;
    this.ly = y;
    this.dx = dx;
    this.dy = dy;
    this.size = size;
    this.rate = rate;
    this.age = 0;
  }
  update(delta) {
    this.lx = this.x;
    this.ly = this.y;
    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.size += this.rate * delta;
    this.age += Math.abs(delta);
  }
  draw() {
    push();
    stroke(
      255 - min(155, this.age * 3),
      255 - min(155, this.age * 8),
      255 - min(155, this.age * 30),
      min(255, this.age * 20) - max(0, this.age - 255 / 15) * 5
    );
    strokeWeight(this.size);
    line(this.x, this.y, this.lx * 2 - this.x, this.ly * 2 - this.y);
    pop();
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

  noStroke();
  for (let i = 0; i < 100; ++i) {
    let sum = 0;
    for (let s = 0; s < 3; ++s) sum += Math.max(0, 1 - Math.abs(
      (noise(rocketTarget / 20000, 92 + s * 3) * 100) % 32 - i - 1
    ) * 3);
    sum *= 1 - fade;
    let y = (rocketHeight / 2 + height * 5 * noise(i * 20 - 13, 59)) % (height + 20) - 10,
      twinkle = 0.2 + Math.min(1, sum) * 0.8;
    fill(255, twinkle * (255 - fade * 200 * (1 + Math.max(0, (y - 200) / 2000))));
    push();
    translate((width + 300) * noise(i * 20 - 25, 52) - 150, y);
    rotate((1 - Math.cos(sum * Math.PI)) / 2 * Math.PI * (1 - 2 * (i % 2)));
    scale(2, 2);
    beginShape();
    vertex(3 - 2 * twinkle, 0);
    vertex(0, 24 * twinkle - 3);
    vertex(2 * twinkle - 3, 0);
    vertex(0, 3 - 24 * twinkle);
    endShape(CLOSE);
    beginShape();
    vertex(0, 3 - 2 * twinkle);
    vertex(12 * twinkle - 1, 0);
    vertex(0, 2 * twinkle - 3);
    vertex(1 - 12 * twinkle, 0);
    endShape(CLOSE);
    pop();
  }

  rocketHeight += (rocketTarget - rocketHeight)/10;
  rocketHeight = max(rocketHeight, 0);
  rocketTarget = max(rocketTarget, 0);

  translate(noise(rocketHeight / 100) * 20 - 10, noise(rocketHeight / 100 + 1000) * 20 - 10);

  let mult = (height) / (launchTowerImg.height);
  imageMode(CENTER);
  for(let cloud of clouds){
    image(cloudImg, cloud[0], cloud[1]+rocketHeight, cloudImg.width*mult/5, cloudImg.height*mult/5);
  }

  image(launchTowerImg, width / 2, height - launchTowerImg.height * mult / 2 + rocketHeight, launchTowerImg.width * mult, launchTowerImg.height * mult);

  fill(color(153, 153, 153));
  noStroke();
  rect(0, height-50+rocketHeight, width, height);

  for (let particle of particles){
    particle.update((rocketTarget - rocketHeight) / 10);
  }
  for (let i = 0.3; i < (rocketTarget - rocketHeight) / 10; i++){
    engine(1051.5, 950, Math.PI * 1.5, i - 0.3);
  }

  particles = particles.filter(x => x.age < 150);
  // console.log(width, height);
  push();
  scale(width/1991, height/1120);
  for (let particle of particles){
    particle.draw();
  }
  pop();

  image(rocketImg, width / 2, height - rocketImg.height * mult / 2, rocketImg.width * mult, rocketImg.height * mult);

  textSize(100*width/1991);
  textFont(titleFont);
  textAlign(CENTER, CENTER);
  fill('black');
  text('Apollo 11', width*3/4, height/2-50*height/1120+rocketHeight);

  textSize(30*width/1991);
  textFont(regularFont);
  textAlign(CENTER, CENTER);
  fill('black');
  text('scroll down :)', width*3/4,height/2+50*height/1120+rocketHeight);
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