var canvas = document.getElementById("gameDisplay");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ctx = canvas.getContext("2d");


ctx.arc(60, canvasHeight/2 - 5, 10, 0, 2 * Math.PI);
ctx.fillStyle = "blue"
ctx.fill(); 



ctx.beginPath();
ctx.rect(220, 0, 10, 180);
ctx.fillStyle = "red";
ctx.fill();

ctx.beginPath();
ctx.rect(420, 170, 10, 180);
ctx.fillStyle = "red";
ctx.fill(); 


/*



//

var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

// That's how you define the value of a pixel //
function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvasWidth) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

// That's how you update the canvas, so that your //
// modification are taken in consideration //
function updateCanvas() {
    ctx.putImageData(canvasData, 0, 0);
}

drawPixel(1, 1, 255, 0, 0, 255);
drawPixel(1, 2, 255, 0, 0, 255);
drawPixel(1, 3, 255, 0, 0, 255);
updateCanvas();



drawPixel(1, 150, 255, 0, 0, 255);
updateCanvas();

ctx.clearRect(0,0, canvasWidth, canvasHeight);
*/
