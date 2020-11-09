var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground, zombieLeft, zombieRight;
var leftBoxBody,rightBoxBody,bottomBoxBody;
var leftBoxSprite,rightBoxSprite,bottomBoxSprite;
var zombieLeftImg,zombieRightImg, headText, headText2;
var zombie_sound, success_sound, Heading, Heading2;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
	zombieLeftImg = loadImage("zombie left.jpg");
	zombieRightImg = loadImage("zombie right.jpg");
	Heading = loadImage("Text.png");
	Heading2 = loadImage("Text2.png");
}

function setup() {

	createCanvas(800, 700);
	rectMode(CENTER);

	headText = createSprite(400,60,10,10);
	headText.addImage(Heading);
	headText.scale = 0.55;
	headText2 = createSprite(410,100,10,10);
	headText2.addImage(Heading2);
	headText2.scale = 0.2;

	zombie_sound = loadSound("zombie_sound.mp3");
	success_sound = loadSound("win.mp3");

	zombieLeft = createSprite(-50,610,10,10);
	zombieLeft.addImage(zombieLeftImg);
	zombieLeft.scale = 0.2;


	zombieRight = createSprite(850,610,10,10);
	zombieRight.addImage(zombieRightImg);
	zombieRight.scale = 0.2;


	packageSprite=createSprite(50, 50, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale = 0.2;


	helicopterSprite=createSprite(50, 70, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255);

	
	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(50 , 70 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);

	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
	World.add(world, ground);

	leftBoxSprite=createSprite(370, 635, 10,50);
	leftBoxSprite.shapeColor=color(255,0,0);
	bottomBoxSprite=createSprite(400, 655, 50,10);
	bottomBoxSprite.shapeColor=color(255,0,0);
	rightBoxSprite=createSprite(430, 635, 10,50);
 	rightBoxSprite.shapeColor=color(255,0,0);

 	leftBoxBody = Bodies.rectangle(370, 635, 10,70 , {isStatic:true} );
 	World.add(world, leftBoxBody);
 	bottomBoxBody = Bodies.rectangle(400, 655, 50,10 , {isStatic:true} );
 	World.add(world, bottomBoxBody);
 	rightBoxBody = Bodies.rectangle(430, 635, 10,70 , {isStatic:true} );
	World.add(world, rightBoxBody);
	Engine.run(engine);
}


function draw() {
	
	rectMode(CENTER);
	background(rgb(46,48,47));
	
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;

	leftBoxSprite.x = leftBoxBody.position.x;
	leftBoxSprite.y = leftBoxBody.position.y;

	rightBoxSprite.x = rightBoxBody.position.x;
	rightBoxSprite.y = rightBoxBody.position.y;

	
	bottomBoxSprite.x = bottomBoxBody.position.x;
	bottomBoxSprite.y = bottomBoxBody.position.y;

	if(packageSprite.isTouching(bottomBoxSprite) && packageSprite.x > 375 && packageSprite.x < 425) {
		if(zombieLeft.velocityX === 0 || zombieRight.velocityX === 0) {
			fill("red");
			textFont("segoe script");
			textStyle(BOLD);
			textSize(30);
			text("Well Done!", 290,500);
		}
	}

	packageSprite.collide(bottomBoxSprite);
	packageSprite.collide(leftBoxSprite);
	packageSprite.collide(rightBoxSprite);

	if(packageSprite.isTouching(groundSprite)) {
		if(packageSprite.x < 400 && packageSprite.y < 800) {
			zombieLeft.velocityX = 3;
		}
		else if(packageSprite.x > 400 && packageSprite.y < 800) {
			zombieRight.velocityX = -3;
		}
	} 
	if(packageSprite.isTouching(zombieLeft) || packageSprite.isTouching(zombieRight) || packageSprite.y > 800) {
		zombieLeft.velocityX = 0;
		zombieRight.velocityX = 0;
		packageSprite.visible = false;
		fill("red");
		textFont("segoe script");
		textStyle(BOLD);
		textSize(30);
		text("Refresh the page to retry.", 210,500);
	}

	if(keyDown(RIGHT_ARROW)) {
		if(packageSprite.x < 375 || packageSprite.x > 425) {
			if(packageSprite.y < 200) {
				zombie_sound.play();
			}
		}
		else {
			if(packageSprite.y < 200) {
				success_sound.play();
			}
		}
	}
	fill("white");
	textFont("segoe script");
	textSize(20);
	text("You are a sergeant on an Indian Airforce mission. Your task is to drop",20,160);
	text("a package in a designated red drop zone. The package contains essential",20,190);
	text("items for daily-needs for the people stuck in a city infested with",20,220);
	text("zombies. It is very important to deliver the package at the exact",20,250)
	text("location for the success of the mission. You can control the helicopter",20,280);
	text("by down arrow key (for left) and Ctrl key (for right). Press Right arrow",20,310);
	text("key to drop the package. If you drop it outside the drop zone, the",20,340);
	text("zombies would come and destroy it. Good luck !!",20,370);

  	drawSprites();
}

function keyPressed() {
	if (keyCode === DOWN_ARROW && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x-30;    
		if(packageSprite.y < 200) {
			translation={x:-30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	} 
	

	else if (keyCode === CONTROL && packageSprite.y < 200) {
		helicopterSprite.x=helicopterSprite.x+30;
		if(packageSprite.y < 200) {
			translation={x:30,y:0}
			Matter.Body.translate(packageBody, translation)	
		}
	}

 	else if (keyCode === RIGHT_ARROW && packageSprite.y < 200) {
    	Matter.Body.setStatic(packageBody, false);
  	}
}

