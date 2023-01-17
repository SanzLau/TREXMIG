//VARIABLES
var PLAY =1;
var END = 0;
var gameState= PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacle, obstaclesGroup;
var newImage;
var score = 0;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;

//FUNCIÓN DONDE SE GUARDAN LAS IMÁGENES Y ANIMACIONES.
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1= loadImage("obstacle1.png");
  obstacle2= loadImage("obstacle2.png");
  obstacle3= loadImage("obstacle3.png");
  obstacle4= loadImage("obstacle4.png");
  obstacle5= loadImage("obstacle5.png");
  obstacle6= loadImage("obstacle6.png");

 
}

function setup() { 
  createCanvas(600, 200);  //crea canvas del juego.

  trex = createSprite(50,160,20,50);   //Crea sprite se trex
  trex.addAnimation("running", trex_running);   //Se agrega animación al sprite
  trex.scale = 0.5;  //Se cambia de tamaño
  trex.debug=false;
  
  ground = createSprite(200,180,400,20);  //Crea sprite del suelo
  ground.addImage("ground",groundImage);   ///Se agrega imagen al suelo
  ground.x = ground.width /2;  //  
  ground.velocityX = -4;  //Velocidad al suelo hacia la izquierda
  
  invisibleGround = createSprite(200,190,400,10); //Crea suelo invisible
  invisibleGround.visible = false; //El suelo se hace invisible.

  //CREAR GRUPOS DE OBSTÁCULOS Y NUBES
  obstaclesGroup = new Group(); 
  cloudsGroup = new Group();

  console.log("Miguel tiene "+13+ " años") //Concatenación

  
}

function draw() {
  background(180);

   //mostrar la puntuación
   text("Puntuación: "+ score, 500,50);

  if(gameState === PLAY){

    //mover el suelo
    ground.velocityX = -4;

    //puntuación
     score = score + Math.round(frameCount/60);
    

    //El trex brinca al presionar la barra espaciadora solo cuando la posición de Y del trex es mayor o igual a 150.
    if(keyDown("space") && trex.y>=150) {
      trex.velocityY = -10; //Velocidad hacia arriba
    }

    // Regresa el suelo a la mitad del canvas para simular el movimiento.
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    //Aparecer nubes
    spawnClouds();
    //Aparecer obstaculos
    spawnObstacles();

    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  

  }
  else if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);

  }
    
  
  
  trex.velocityY = trex.velocityY + 0.8   //Da gravedad al trex
   
  
  //Trex colisiona contra el suelo invisible para no caer.
  trex.collide(invisibleGround);
  
  
  drawSprites(); //Dibuja los sprites
}

//FUNCIÓN QUE CREA LAS NUBES
function spawnClouds() {
  
  //Las nubes aparecen cada 60 cuadros
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))  //Las nubes aparecen de forma aleatoria en Y.
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    //Tiempo de vida de nubes
    cloud.lifetime = 200;
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;

    //agrega nubes al grupo
    cloudsGroup.add(cloud);
    }
}

// FUNCIÓN QUE CREA LOS OBSTACULOS.
function spawnObstacles(){
  //Las obstaculos aparecen cada 60 cuadros.
  if (frameCount % 60 === 0) {
   obstacle= createSprite(600,165,10,40);
   obstacle.velocityX =-6;

   //generar obstáculos al azar
   var rand = Math.round(random(1,6));
   switch(rand) {
     case 1: obstacle.addImage(obstacle1);
             break;
     case 2: obstacle.addImage(obstacle2);
             break;
     case 3: obstacle.addImage(obstacle3);
             break;
     case 4: obstacle.addImage(obstacle4);
             break;
     case 5: obstacle.addImage(obstacle5);
             break;
     case 6: obstacle.addImage(obstacle6);
             break;
     default: break;
   }

   obstacle.scale=0.4;

   //agrega obstáculos algrupo
   obstaclesGroup.add(obstacle);
}
}