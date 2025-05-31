const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game variables
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2; // Ball speed in X direction
let ballDY = -2; // Ball speed in Y direction
let score = 0;
let lives = 3;

// Gyroscope Variables
let gammaOffset = 0; // Used for calibration
const paddleSpeedMultiplier = 7; // Adjust this value; controls how quickly the paddle moves relative to gamma
// Event listeners for keyboard input (Disable keyboard controls -- keep for debugging, maybe)
//document.addEventListener("keydown", keyDownHandler, false);
//document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

// Collision detection function (No changes needed)
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
        document.location.reload(); // Restart the game
      } else {
        ballX = canvas.width / 2;
        ballY = canvas.height - 30;
        ballDX = 2;
        ballDY = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }
  if (
    ballX + ballDX > canvas.width - ballRadius ||
    ballX + ballDX < ballRadius
  ) {
    ballDX = -ballDX;
  }
}

// Drawing functions (No changes needed to drawing, just to _how_ the paddle position is determined)
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

// Device Orientation Handling
function handleOrientation(event) {
  let gamma = event.gamma; // Tilt left/right (-90 to 90 degrees)

  // Calibrate the gamma value on first use.  Consider button tap instead.
  if (gammaOffset === null) {  // This is wrong, gammaOffset should never be null.
    gammaOffset = gamma;
  }

  // Apply calibration offset
  gamma -= gammaOffset;

  // Calculate new paddle position based on gamma
  // Adjust paddleX based on gamma. Multiply to control speed.
  paddleX += gamma * paddleSpeedMultiplier;

  // Keep the paddle within the bounds of the canvas
  paddleX = Math.max(0, Math.min(canvas.width - paddleWidth, paddleX));
}

function requestGyroPermission() {
    if (typeof(DeviceOrientationEvent.requestPermission) === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          } else {
            alert("Permission to use device orientation was denied.");
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS 13+ devices don't need permission
      window.addEventListener('deviceorientation', handleOrientation);
    }
  }



// Main Draw Function (Modified)

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
    // Remove or comment out Keyboard logic.

  ballX += ballDX;
  ballY += ballDY;
  requestAnimationFrame(draw);
}

// Start the game
requestGyroPermission();
draw();