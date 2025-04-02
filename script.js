const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 320;
canvas.height = 480;

// Load images
const birdImg = new Image();
birdImg.src = 'bird.png';
const bgImg = new Image();
bgImg.src = 'background.png';
const pipeNorthImg = new Image();
pipeNorthImg.src = 'pipeNorth.png';
const pipeSouthImg = new Image();
pipeSouthImg.src = 'pipeSouth.png';

// Load sounds
const flySound = new Audio('fly.mp3');
const scoreSound = new Audio('score.mp3');
const gameOverSound = new Audio('gameOver.mp3');

// Bird properties
const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.5,
    lift: -10,
    velocity: 0
};

// Pipe properties
const pipeWidth = 50;
const pipeGap = 100;
let pipes = [];
let frame = 0;

// Score and level
let score = 0;
let level = 1;
const maxLevel = 20;

// Event listener for bird control
document.addEventListener('keydown', () => {
    bird.velocity = bird.lift;
    flySound.play();
});

// Function to create pipes
function createPipe() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height / 2)) + 50;
    pipes.push({
        x: canvas.width,
        y: pipeHeight
    });
}

// Function to draw everything
function draw() {
    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    // Draw pipes
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        ctx.drawImage(pipeNorthImg, pipe.x, pipe.y - pipeNorthImg.height);
        ctx.drawImage(pipeSouthImg, pipe.x, pipe.y + pipeGap);
        pipe.x -= 2 + level * 0.5;

        // Check for collision
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.y || bird.y + bird.height > pipe.y + pipeGap)
        ) {
            gameOver();
            return;
        }

        // Check if pipe is off screen
        if (pipe.x + pipeWidth <= 0) {
            pipes.splice(i, 1);
            score++;
            scoreSound.play();
            if (score % 5 === 0 && level < maxLevel) {
                level++;
            }
        }
    }

    // Draw bird
    ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // Draw score and level
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
    ctx.fillText(`Level: ${level}`, 10, 50);
}

// Function to update game state
function update() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height >= canvas.height || bird.y <= 0) {
        gameOver();
        return;
    }

    if (frame % 100 === 0) {
        createPipe();
    }

    frame++;
}

// Function to handle game over
function gameOver() {
    gameOverSound.play();
    alert(`Game Over! Your score: ${score}`);
    document.location.reload();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
