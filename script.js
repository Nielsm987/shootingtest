const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;
let ballDY = -2;
let score = 0;
let lives = 3;

// Gyroscope Variables
let gammaOffset = null;
const paddleSpeedMultiplier = 7;

// Drawing functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#fff";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Collision detection
function collisionDetection() {
  if (ballY + ballDY < ballRadius) {
    ballDY = -ballDY;
  } else if (ballY + ballDY > canvas.height - ballRadius) {
    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
      ballDY = -ballDY;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER! Score: " + score);
        document.location.reload();
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        ballDX = 2;
        ballDY = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
    ballDX = -ballDX;
  }
}

// Device orientation handling
function handleOrientation(event) {
  let gamma = event.gamma;
  if (gammaOffset === null && gamma !== null) {
    gammaOffset = gamma;
  }
  gamma -= gammaOffset ?? 0;
  paddleX += gamma * paddleSpeedMultiplier;
  paddleX = Math.max(0, Math.min(canvas.width - paddleWidth, paddleX));
}

// Gyroscope permission
function requestGyroPermission() {
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === 'granted') {
          window.addEventListener("deviceorientation", handleOrientation);
        } else {
          alert("Permission to use device orientation was denied.");
        }
      })
      .catch(console.error);
  } else {
    window.addEventListener("deviceorientation", handleOrientation);
  }
}

// Main draw loop
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  ballX += ballDX;
  ballY += ballDY;
  requestAnimationFrame(draw);
}

// Start game on button click
document.getElementById("startButton").addEventListener("click", () => {
  requestGyroPermission();
  draw();
  document.getElementById("startButton").style.display = "none"; // hide button
});
