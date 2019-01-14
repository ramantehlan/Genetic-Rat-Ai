/*
This is a very simple game, aim here
is for the mouse to reach the cheese. 
while rat can only move in the white
area, rat will die if run into a wall

Author: Raman Tehlan <Ramantehlan@gmail.com>
Date of Creation: 14-January-2018
*/

var canvas = document.getElementById("gameDisplay");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
var world = canvas.getContext("2d");
const rat = document.getElementById("rat");
const cheese = document.getElementById("cheese");

const wallWidth = 15;
const wallHeight = 200;
const wallX1 = 220 
const wallY1 = 0
const wallX2 = 420
const wallY2 = canvasHeight - wallHeight;

const startingPoint = [60, (canvasHeight/2 - rat.naturalHeight/2) ]
const endingPoint = [ (canvasWidth - 60) , (canvasHeight/2 - rat.naturalHeight/2) ]
let currentPoint = startingPoint.slice(0);
let pathTaken = []

const maxSteps = 60;
const maxStepSize = 14;
var stepX = maxStepSize;
var stepY = maxStepSize;
var genomes = [];
var populationSize = 100;
var currentGnome = -1;
var mutationRate = 0.05;
var mutationStep = 0.2;
var score = 0;
var speed = 25;
var allowRandomStepSize = false;

var currentStep = 0;




function inception(){

// Draw game world
world.drawImage(rat, startingPoint[0] - 40, startingPoint[1] - 20 );
world.drawImage(cheese, endingPoint[0] - 20 , endingPoint[1] - 20 );
world.beginPath();
world.rect(wallX1, wallY1, wallWidth, wallHeight);
world.rect(wallX2, wallY2, wallWidth, wallHeight);
world.fillStyle = "black";
world.fill(); 

createInitialPopulation();

var run = function(){
	move();
	if(currentStep >= maxSteps){
		update();
 	}
 };

var days = setInterval(run, speed);

}
document.onLoad = inception();

function createInitialPopulation(){
	genomes = [];

	for(var i = 0; i < populationSize; i++){
		var gnome = {
			id: Math.random(),
			cheeseDistance: Math.random(), // More fit if the distance is less 
			stepSize: getRandomInt(maxStepSize),
			stepsTaken: 0,
			angle: Math.random(180)
		}
		genomes.push(gnome)
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function move(){
	
	if( currentPoint[0] >= wallX1 && currentPoint[0] <= (wallX1 + wallWidth) 
		&& currentPoint[1] >= wallY1 && currentPoint[1] <= wallHeight
		){
		update();
	}else if(currentPoint[0] >= wallX2 && currentPoint[0] <= (wallX2 + wallWidth) 
		&& currentPoint[1] >= wallY2 && currentPoint[1] <=  (wallY2 + wallHeight) ){
		update()
	}else{
		world.beginPath();
		world.strokeStyle = "#000000";
		world.lineWidth = 1;
		world.moveTo(currentPoint[0], currentPoint[1]);
		pathTaken.push([currentPoint[0], currentPoint[1]])
		nextPoint();
		world.lineTo(currentPoint[0], currentPoint[1]);
		world.stroke();

		currentStep++;
	}
}

function nextPoint(){
	if(allowRandomStepSize){
		stepX = getRandomInt(maxStepSize);
		stepY = getRandomInt(maxStepSize);
	}

	radians = toRadian(getRandomInt(180));
	currentPoint[0] += stepX * Math.sin(radians);
	currentPoint[1] += stepY * Math.cos(radians);
}

function update(){
		currentPoint = startingPoint.slice(0);
		currentStep = 0;
		hidePath();
		pathTaken = [];
}

function toRadian(angle){
	return ( angle * Math.PI / 180 );
}

function toAngle(radian){
	return ( radian * 180 / Math.PI );
}

function hidePath(){
	if(pathTaken.length != 0){
		pathSize = pathTaken.length;
		world.beginPath();
		world.strokeStyle = "#eff2ef";
		world.lineWidth = 2;
		world.moveTo(pathTaken[0][0], pathTaken[0][1]);
		for(var i = 1; i < pathSize; i++){
			world.lineTo(pathTaken[i][0], pathTaken[i][1]);
		}	
		world.stroke();
	}
}
