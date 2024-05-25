new p5();

let regularFont;
let headingFont;
let titleFont;
let launchTowerImg;
let rocketHeight = 0;

function preload(){
  regularFont = loadFont('fonts/PTSansNarrow-Regular.ttf');
  titleFont = loadFont('fonts/PTSansNarrow-Bold.ttf');
  launchTowerImg = loadImage('images/launchtower.png');
  rocketImg = loadImage('images/rocket.png');
}

function setup(){
  width = windowWidth;
  height = windowHeight;
  // console.log(width, height);
  createCanvas(windowWidth, windowHeight);
  frameRate(60);

  imageMode(CENTER);
  launchTowerImg.resize(launchTowerImg.width / 2, launchTowerImg.height / 2);
  rocketImg.resize(rocketImg.width / 2, rocketImg.height / 2);
}

function mouseWheel(event){
  if(event.delta > 0){
    rocketHeight += 1;
  }
  else{
    rocketHeight -= 1;
  }
}

function draw(){
  background('#222222');

  image(launchTowerImg, width/2, height-launchTowerImg.height/2, launchTowerImg.width, launchTowerImg.height);
  image(rocketImg, width/2, height-rocketImg.height / 2, rocketImg.width, rocketImg.height);
  fill(color(153, 153, 153));
  noStroke();
  rect(0, height-50, width, height);
}
