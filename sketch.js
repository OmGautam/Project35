var balloon;
var bgImage,balloonImage;
var position,database;

function preload(){
  bgImage = loadImage("images/Balloon1.png");
  balloonImage = loadImage("images/Balloon2.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500,500);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addImage(balloonImage);
  balloon.scale = 0.5

  var bp = database.ref('balloon/position');
  bp.on("value",readpos,err);
}

function draw() {
  background(bgImage);  

  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}

  drawSprites();
}

function changePosition(x,y){
database.ref('balloon/position').set({
    x:position.x+x, 
    y:position.y+y
})

}

function readpos(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function err(){
console.log("error");
}
