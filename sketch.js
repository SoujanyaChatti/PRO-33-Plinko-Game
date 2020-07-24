var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions=[];

var divisionHeight=300;

var score =0;
var particle;
var turn=0;
var gamestate="play";
var xy=[];


function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  
//creating divisions,and rows of plinkos and pushing them into the empty arrays.
   for (var k =0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
     
   }


    for (var j = 25; j <=width-15; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 25; j <=width-15; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

//creating an array to store the X and Y values of the divisions. 
xy=[[0,650],[80,650],[160,650],[240,650],[320,650],[400,650],[480,650],[560,650],[640,650],[720,650],[800,650]];
    

   
}
 


function draw() {
  background("black");
  textSize(20)
 
  Engine.update(engine);
 
  //condition so that the score and the turns will be displayed in the play mode.
   if(gamestate=="play"){
  fill(random(0,255),random(0,255),random(0,255));
  text("Score : "+score,20,30);
  fill(random(0,255),random(0,255),random(0,255));
  text("No of turns left:"+(-(turn-5)),200,30);
   }
   
//condition for the particles to be displayed and also incrementing the scores using the previous array and the pos of the particles.   
   if(particle!=null){
  particle.display();

  var pos=particle.body.position.x; 
  if(particle.body.position.y>750){
    //making the turns decrease only after the ball are completely in the divisions so that the score when displayed at the end is already added up to the date.
   turn=turn+1;

  if((pos>xy[0][0]&&pos<xy[1][0])||(pos>xy[3][0]&&pos<xy[4][0])||((pos>xy[6][0]&&pos<xy[7][0]))){
    score=score+50;
    particle=null;
  }

   else if((pos>xy[1][0]&&pos<xy[2][0])||(pos>xy[5][0]&&pos<xy[6][0])||((pos>xy[8][0]&&pos<xy[9][0]))){
    score=score+150;
    particle=null;
  }
  else if((pos>xy[2][0]&&pos<xy[3][0])||(pos>xy[7][0]&&pos<xy[8][0])){
    score=score+100;
    particle=null;
  }
 
  else if((pos>xy[4][0]&&pos<xy[5][0])||(pos>xy[9][0]&&pos<xy[10][0])){
    score=score+200;
    particle=null;
  }
}
}

//text to be displayed and their properties.
fill(random(0,255),random(0,255),random(0,255));
textSize(25);
   text("50",30,500);
  
   text("100",180,500);
   text("50",510,500);
   fill(random(0,255),random(0,255),random(0,255));
   text("100",580,500);
   text("50",270,500);
   text("200",340,500);
   fill(random(0,255),random(0,255),random(0,255));
   text("200",740,500);
   text("150",420,500);
   fill(random(0,255),random(0,255),random(0,255));
   text("150",100,500);
   text("150",660,500);

   //calling the display function for the plinkos,particles and divisions from their arrays.
   for (var i = 0; i < plinkos.length; i++) {
   
    plinkos[i].display(); 
  }
   
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
 
   //condition for the gamestate to change to end and the text to be displayed. 
   if(turn>=5){
    gamestate='end';
    text("Your score is:"+score,300,50);
    textSize(90);
    text("Game Over",150,255);
  }
}

//writing function for when the mouse is pressed and creating the particles.
function mousePressed(){
if(gamestate=="play"){

  particle=new Particle(mouseX,10,10,10);
  
}
}