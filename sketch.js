var PLAY = 1;
var END = 0;
var gameState = PLAY;

var track,trackimage;
var car,carimage;
var pointimage;
var stoneimage;
var pointGroup,obstacleGroup;
var pointsound,diesound;

var score;
var inWall1,inWall2;

function preload()
{
  
  trackimage = loadImage("raceTrack.png");
  carimage = loadImage("carimage1.jpg");
  
  pointimage = loadImage("coin.png");
  stoneimage = loadImage("stone.png");
  
  pointsound = loadSound("checkPoint.mp3");
  diesound = loadSound("die.mp3");
}

function setup() 
{
  createCanvas(500,600);
  
  pointGroup = new Group();
  obstacleGroup = new Group();
  
  track = createSprite(250,300);
  track.addImage("image",trackimage);
  track.scale=3.0;
  track.velocityY=-15;
  
  car = createSprite(250,100,50,100);
  car.addImage("carOP",carimage);
  car.scale=0.2;
  
  inWall1 = createSprite(440,200,10,800)
  inWall1.visible=false;
  
  inWall2 = createSprite(60,200,10,800)
  inWall2.visible=false;
  
  score = 0;

}

function draw() 
{
  background("lightblue");
 
  if(gameState===PLAY)
    {
      if(track.y < 0)
  {
      track.y = track.width/2;
  }
  
  if(keyDown("RIGHT_ARROW"))
  {
    car.x=car.x+5;
  }
    
  if(keyDown("LEFT_ARROW"))
  {
    car.x=car.x-5;
  }
   
  if(car.isTouching(pointGroup))
    {
      pointGroup.destroyEach();
      pointsound.play();
      score = score+1;
    }
  
      car.collide(inWall1);
      car.collide(inWall2);
      
  obstacles();
  points();
  drawSprites();
      
    }
  
  if(car.isTouching(obstacleGroup))
    {
      pointGroup.destroyEach();
      obstacleGroup.destroyEach();
      track.velocityY=0;
      diesound.play();
      gameState = END;
    }
  
  else if(gameState === END)
    {
      car.destroy();
      track.destroy();
      
      stroke("black");
      fill("red");
      textSize(50);
      text("GameOver",110,345);
    }
  
  stroke("black");
  fill("white");
  textSize(15);
  text("Score: "+ score, 100,50);
}


function points()
{
  if(frameCount%150===0)
    {
      var point = createSprite(300,545,10,10);
      
      point.x = Math.round(random(250,400));
      point.y = Math.round(random(250,700));  
      point.addImage(pointimage);
      point.scale = 0.1;
      point.velocityY = -5;

      point.lifetime = 250;
      pointGroup.add(point);
    }
}


function obstacles() 
{
  if(frameCount%190===0)
  {
    var rock = createSprite(450,600,10,40);
    rock.setCollider("rectangle",0,0,400,315);
    rock.debug=false;
    
    rock.x = Math.round(random(300,400));
    rock.y = Math.round(random(300,700));  
    rock.velocityY = -4;
    rock.addImage(stoneimage);
            
    rock.scale = 0.2;
    rock.lifetime = 250;
    obstacleGroup.add(rock);
  }
}