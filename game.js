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
let maxDistance = distance([0,0], endingPoint);

const maxSteps = 60;
const maxStepSize = 14;
var stepX = maxStepSize;
var stepY = maxStepSize;


// 
// step-1: Declare important variables
//
var generation = 0;
var genomes = [];
var populationSize = 100;
var mutationRate = 0.05;
var mutationStep = 0.2;

var currentGnome = 0; 
var score = 0;
const speedValue = [500, 200, 50, -5000 , 20000000]
const speedLable = ["Slow", "Medium", "Fast", "Rapid Fast"]
const speedSelected = 4
var allowRandomStepSize = false;
// Distance between mouse and cheese
var currentDistance = -1

var currentStep = 0;

var speedDisplay = document.getElementById("speed");
var scoreDisplay = document.getElementById("score");
var distanceDisplay = document.getElementById("distance");
var generationDisplay = document.getElementById("generation");
var genomeDisplay = document.getElementById("gnome");

speedDisplay.innerHTML = speedLable[speedSelected];

// 
// Step-2 creating initial population
// 
function createInitialPopulation(){
	// Store all the genomes of current population
	genomes = [];
	// Assign Population
	for(var i = 0; i < populationSize; i++){
		var gnome = {
			id: Math.random(),
			cheeseDistance: Math.random(), // More fit if the distance is less 
			stepSize: getRandomInt(maxStepSize),
			stepsTaken: 0,
			angle: Math.random(180),
			fitness: -1
		}
		genomes.push(gnome)
	}
}

// 
// step-3 Fitness Update 
// 
function fitnessUpdate(){
// Fitness Calculation
// step1: Distance between cheese and enading of mouse journey
// Step2: Score
	
	   	fitness = 100 - (genomes[currentGnome].cheeseDistance / maxDistance);
	   	genomes[currentGnome].fitness = fitness;

}

function distance(p1,p2){
	return Math.sqrt( Math.pow( (p1[0] - p2[0]) , 2) + Math.pow( (p1[1] - p2[1]) , 2) )
}

//
// Step-4 Selection of parents using fitness 
//
function evolve(){

	genomes.sort(function (a, b) {
    	return b.fitness - a.fitness;
	});

	var newGenomes = [];
	newGenomes.push(clone(genomes[0]));
	while (newGenomes.length < populationSize) {
		newGenomes.push(makeChild(getRandomGenome(), getRandomGenome()));
	}

}

function randomWeightedNumBetween(min, max) {
 return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
}

function getRandomGenome(x) {
	return genomes[randomWeightedNumBetween(0, x)];
}

// 
// Step-5 Mutation and creating new generation
// 
 function makeGnome(parent1, parent2) {
 	var gnome = {
			id: Math.random(),
			cheeseDistance: randomGene(parent1.cheeseDistance, parent2.cheeseDistance),
			stepSize: randomGene(parent1.stepSize , parent2.stepSize ) ,
			stepsTaken: randomGene( parent1.stepsTaken , parent2.stepsTaken ),
			angle: randomGene( parent1.angle , parent2.angle),
			fitness: -1
 		}

 	if (Math.random() < mutationRate) {
 		gnome.cheeseDistance += Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		gnome.stepSize += Math.random() * mutationStep * 2 - mutationStep;
 	}
 	if (Math.random() < mutationRate) {
 		gnome.stepsTaken += Math.random() * mutationStep * 2 - mutationStep;
 	}
 	 if (Math.random() < mutationRate) {
 		gnome.angle += Math.random() * mutationStep * 2 - mutationStep;
 	}
 	return gnome;
 }

  function randomGene(propOne, propTwo) {
 	if (Math.round(Math.random()) === 0) {
 		return clone(propOne);
 	} else {
 		return clone(propTwo);
 	}
 }



function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function updateScore(){
	scoreDisplay.innerHTML = currentStep;
}

function updateGnome(){
	genomeDisplay.innerHTML = currentGnome;
}

function updateGeneration(){
	generationDisplay.innerHTML = generation;
}

function updateDistance(){
	distanceDisplay.innerHTML = currentDistance;
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
		updateScore();
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
		// finding distance between ending point and cheese
		currentDistance = distance(currentPoint, endingPoint);
		genomes[currentGnome].cheeseDistance = currentDistance	
		fitnessUpdate()
		updateDistance()	

		currentPoint = startingPoint.slice(0);
		currentStep = 0;
		hidePath();
		pathTaken = [];
		currentGnome++;
		updateGnome();

		if(currentGnome >= 100){
			currentGnome = 0;
			generation++
			updateGeneration();
		}
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

// Draw game world
world.drawImage(rat, startingPoint[0] - 40, startingPoint[1] - 20 );
world.drawImage(cheese, endingPoint[0] - 20 , endingPoint[1] - 20 );
world.beginPath();
world.rect(wallX1, wallY1, wallWidth, wallHeight);
world.rect(wallX2, wallY2, wallWidth, wallHeight);
world.fillStyle = "black";
world.fill(); 

function inception(){
updateGnome()
updateScore()
updateGeneration()
createInitialPopulation();

var run = function(){
	move();
	if(currentStep >= maxSteps){
		update();
 	}
 };

var days = setInterval(run, speedValue[speedSelected]);

}
document.onLoad = inception();
