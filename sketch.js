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
let cloudlayers = 5;
let cloudlayerheight = 500;

let textboxes = [
  { t: 'Please enjoy the result of like 6 hours and 300 lines of my painstaking code!'},
  { t: 'Apollo 11 is the American spaceflight launched by NASA on July 16, 1969 that is most known for the monumental achievement of allowing astronauts Neil Armstrong and Buzz Aldrin to become the first people ever to land and walk on the surface of the Moon. '},
  { t: 'The crew consisted of Commander Neil Armstrong, Command Module Pilot Michael Collins, and Lunar Module Pilot Edwin "Buzz" Aldrin. After a four-day journey, on July 20, 1969, Armstrong and Aldrin descended to the lunar surface in the Lunar Module called "Eagle." Collins never stepped foot on the Moon, instead orbiting around it in the Command Module called "Columbia."'},
  { t: 'The primary objective of this mission was to fulfill President John F. Kennedy\'s goal of "landing a man on the moon and returning him safely to the Earth" before the end of the decade. Kennedy was motivated by the pressure to catch up to the Soviet Union in the "space race" because Soviet Yuri Gagarin was the first human in space.'},
  { t: 'In addition, the Bay of Pigs invasion, the failed military operation by the CIA to overthrow Fidel Castro, put even more pressure on Kennedy to restore American confidence/morale and counter this severe embarassment to the U.S.'},
  { t: 'Because of these high stakes, the U.S. spent a large amount of energy and resources on the entirety of Project Apollo. Many advancements went into Project Apollo, including the creation of a powerful heat shield able to endure temperatures around 5000 degrees Farenheit and the revolutionary command module computers designed by MIT that were smaller and faster than the computers at the time. 25.8 billion dollars, equal to 257 billion dollars adjusting to inflation, was spent on Project Apollo.'},
  { t: 'Thankfully, the mission was successful, and Armstrong\'s iconic line "That\'s one small step for man, one giant leap for mankind" signified not only a triumph for the years of hard scientific work and dedication that went into this project, but also a significant victory in the ideological battle of the Cold War.' },
  { t: 'However, this mission was nearly considered a failure as many things almost went horrendously wrong during the Apollo 11 mission, including a near stranding of Neil Armstrong and Buzz Aldrin while they were on the moon. Due to a broken circuit breaker switch, there was a large chance of having no way to launch back off the moon to go back to Earth. It was only due to the quick thinking of Aldrin to use a felt-tip pen to jam into the circuit that they were able to lift off the moon.' },
  { t: 'Some fun facts: In the event of the Apollo 11 mission failing, Nixon had a speech prepared titled the "In the event of Moon Disaster" speech. Thankfully, this speech never had to be given, but as soon as the astronauts came back to earth, they were quarantined due to fear of any alien microbes that could cause a plague on Earth! On the moon, Armstrong even got his quote wrong; he missed an "a" right before the word "man."' },
  { t: 'Ultimately, the Apollo 11 mission was extremely significant to U.S. history as a whole not only because it represents a great U.S. victory against the Soviet Union in the Cold War, but also because this mission reinforced the U.S. image as the top international leader in science and technology, contributing significantly to national pride and showcasing the potential of the U.S. for advancement and innovation.'},
  { t: 'Furthermore, in a time of significant social and political upheaval due to events such as the civil rights movement and the Vietnam War, the Apollo 11 mission fostered a sense of national pride and unity and showed the still ongoing positive growth of the U.S.'},
  { t: 'Apollo 11 is a powerful testament to the amazing innovation, ingenuity, and determination of humanity'},
  { t: 'Thank you for scrolling!!' },
  { t: 'Sources: https://commons.wikimedia.org/wiki/File:Saturn_V_-_launch_tower.svg\nhttps://www.britannica.com/topic/Apollo-11\nhttps://www.nasa.gov/news-release/nasa-shares-progress-toward-early-artemis-moon-missions-with-crew/\nhttps://www.nasa.gov/history/the-decision-to-go-to-the-moon/\nhttps://www.planetary.org/space-policy/cost-of-apollo\nhttps://www.nasa.gov/news-release/nasa-shares-progress-toward-early-artemis-moon-missions-with-crew/\nhttps://www.history.com/news/moon-landing-technology-inventions-computers-heat-shield-rovers\nhttps://www.history.com/news/what-if-the-moon-landing-had-failed\nhttps://www.history.com/news/buzz-aldrin-moon-landing-accident\nhttps://www.nasa.gov/mission/apollo-11/\nhttps://www.theepochtimes.com/bright/neil-armstrong-and-buzz-aldrin-became-the-first-men-to-walk-on-the-moon-51-years-ago-this-week-3431874\nhttps://www.nasa.gov/image-article/apollo-11-launches-into-history/\nhttps://www.navytimes.com/news/your-navy/2019/07/13/apollo-11s-amiable-strangers-armstrong-aldrin-collins/\nhttps://www.nasa.gov/history/60-years-ago-president-kennedy-proposes-moon-landing-goal-in-speech-to-congress/\nhttps://blogs.illinois.edu/view/25/801367#image-3\nhttps://www.sothebys.com/en/buy/auction/2022/buzz-aldrin-american-icon/flown-to-and-used-on-the-lunar-surface-the-broken'},
];

let images = [
  { t: 'no image' },
  { t: 'apollorocket.png' },
  { t: 'crew.png' },
  { t: 'jfkspeech.png' },
  { t: 'no image' },
  { t: 'heatshield.png' },
  { t: 'no image' },
  { t: 'pencircuit.png' },
  { t: 'disasterspeech.png' },
  { t: 'no image' },
  { t: 'no image' },
  { t: 'manonmoon.png' },
  { t: 'no image'},
  { t: 'no image' }
]

let textdist = 1200*windowHeight/1120;
for(let i = 0; i < textboxes.length; i++){
  Object.defineProperty(textboxes[i], "at", {value:(i+1)*textdist, configurable:true});
  Object.defineProperty(textboxes[i], "x", {value: windowWidth/4*(2*(i%2)+1), configurable: true});
  Object.defineProperty(textboxes[i], "y", { value: windowHeight/2});

  Object.defineProperty(images[i], "at", { value: (i + 1) * textdist });
  Object.defineProperty(images[i], "x", { value: windowWidth / 4 * (2 * ((i+1) % 2) + 1) });
  Object.defineProperty(images[i], "y", { value: windowHeight / 2 });
}

let endscreenheight = (textboxes.length-1)*textdist;
Object.defineProperty(textboxes[textboxes.length - 1], "at", {value:endscreenheight + 2500*windowHeight/1120});
Object.defineProperty(textboxes[textboxes.length - 1], "x", {value:windowWidth/2});
console.log(textboxes);

bottomHeight = -100*windowHeight/1120;
for (let i = 0; i < cloudlayers; i++) {
  for (let j = 0; j <= 3*(cloudlayers - i)/cloudlayers; j++) {
    let x = random(windowWidth/20, windowWidth*19/20);
    let y = random(bottomHeight - cloudlayerheight *windowHeight/1120, bottomHeight);
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
      y = random(bottomHeight - cloudlayerheight*windowHeight/1120, bottomHeight);
    }
    clouds.push([x, y]);
  }
  bottomHeight -= cloudlayerheight*windowHeight/1120;
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
    delta = abs(delta);
    this.lx = this.x;
    this.ly = this.y;
    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.size += this.rate * delta;
    this.age += delta;
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

  for(let i = 0; i < images.length; i++){
    if(images[i].t != 'no image'){
      images[i].t = loadImage('images/'+images[i].t);
    }
  }
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
  rocketTarget += Math.max(-40, Math.min(40, event.delta/10));
  // rocketTarget += event.delta;
}

function draw(){
  push();
  // console.log(rocketHeight);
  let fade = (1 - Math.min(1, Math.max(0, (rocketHeight - (cloudlayers*cloudlayerheight+1000)*height/1120) / 1500)));
  let out = Math.max(0, (rocketHeight - endscreenheight) / 1200);
  background(135*(fade+out), 206*(fade+out), 235*(fade+out));

  noStroke();
  for (let i = 0; i < 100; ++i) {
    let sum = 0;
    for (let s = 0; s < 3; ++s) sum += Math.max(0, 1 - Math.abs(
      (noise(rocketTarget / 20000, 92 + s * 3) * 100) % 32 - i - 1
    ) * 3);
    sum *= 1 - fade;
    sum *= Math.max(0, 1 - out * 200);
    let y = (rocketHeight / 2 + height * 5 * noise(i * 20 - 13, 59)) % (height + 20) - 10,
      twinkle = 0.2 + Math.min(1, sum) * 0.8;
    fill(255, twinkle * (255 - fade * 200 * (1 + Math.max(0, (y - 200) / 2000))));
    push();
    translate((width + 300) * noise(i * 20 - 25, 52) - 150, y);
    scale(1, 1 + out * 200);
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
    image(cloudImg, cloud[0], cloud[1]+rocketHeight, cloudImg.width*mult/2, cloudImg.height*mult/2);
  }

  if (out > 1.53) {
    fill(255);
    rect(0, 0, width, height);
  }

  noStroke(); 
  fill(255 - 255 * (fade + out)); 
  textSize(30*height/1120);   
  push();
  for (let i = 0; i < textboxes.length; i++) {
    let t = textboxes[i];
    let img = images[i];
    textFont(regularFont);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    let y = Math.max(0, (Math.abs(rocketHeight - t.at) - 200)) * Math.pow((rocketHeight - t.at) / 400, 3) + (rocketHeight - t.at) / 10;
    text(t.t, t.x, t.y + y, 500*width/1991);

    imageMode(CENTER);
    if(img.t != 'no image'){
      let scale = (500*width/1991)/img.t.width;
      image(img.t, img.x, img.y + y, img.t.width*scale, img.t.height*scale);
    }
  }
  pop();

  if(out < 1.53){
    push();
    translate(width/2, height/2);
    scale(1 - Math.max(0, out - 0.5), 1 + Math.max(0, out - 0.5) * 10);
    translate(-width / 2, -height / 2);

    fill(color(153, 153, 153));
    noStroke();
    rect(0, height-55*height/1120+rocketHeight, width, height);

    for (let particle of particles){
      particle.update((rocketTarget - rocketHeight) / 50);
    }
    for (let i = 0.3; i < (rocketTarget - rocketHeight) / 10; i++){
      engine(1051.5, 960, Math.PI * 1.5, i+0.3);
    }

    particles = particles.filter(x => x.age < 150);
    // console.log(width, height);
    push();
    // scale(width/1991, height/1120);
    for (let particle of particles){
      particle.draw();
    }
    pop();

    image(rocketImg, width / 2, height - rocketImg.height * mult / 2, rocketImg.width * mult, rocketImg.height * mult);
    image(launchTowerImg, width / 2, height - launchTowerImg.height * mult / 2 + rocketHeight, launchTowerImg.width * mult, launchTowerImg.height * mult);

    textSize(100*width/1991);
    textFont(titleFont);
    textAlign(CENTER, CENTER);
    fill('black');
    text('Apollo 11', width*3/4, height/2-50*height/1120+rocketHeight);

    textSize(30*width/1991);
    textFont(regularFont);
    textAlign(CENTER, CENTER);
    fill('black');
    text('just keep scrolling down (or up idk)', width*3/4,height/2+50*height/1120+rocketHeight);
    pop();

    fill(255, out * 150); 
    rect(0, 0, width, height); 
  }

  fill(255, Math.max(0, 1 - Math.abs(rocketHeight - endscreenheight) / 40) * 200); //this
  rect(0, 0, width, height); //this
  pop();

  // rect(windowWidth / 10, windowHeight / 2, 10, 10);
}

// function mousePressed(){
//   console.log(mouseX, mouseY);
// }

function windowResized(){
  // launchTowerImg = loadImage('images/launchtower.png');
  // rocketImg = loadImage('images/rocket.png');
  setup();
}