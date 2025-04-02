// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define player and enemy objects
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// Define levels with increasing difficulty
const levels = [
    // Easy levels
    { id: 1, enemies: 5, obstacles: 0 },
    { id: 2, enemies: 7, obstacles: 1 },
    { id: 3, enemies: 10, obstacles: 2 },
    // Medium levels
    { id: 4, enemies: 15, obstacles: 3 },
    { id: 5, enemies: 20, obstacles: 4 },
    { id: 6, enemies: 25, obstacles: 5 },
    // Hard levels
    { id: 7, enemies: 30, obstacles: 6 },
    { id: 8, enemies: 35, obstacles: 7 },
    { id: 9, enemies: 40, obstacles: 8 },
    // Additional levels
    { id: 10, enemies: 45, obstacles: 9 },
    { id: 11, enemies: 50, obstacles: 10 },
    { id: 12, enemies: 55, obstacles: 11 },
    { id: 13, enemies: 60, obstacles: 12 },
    { id: 14, enemies: 65, obstacles: 13 },
    { id: 15, enemies: 70, obstacles: 14 },
    { id: 16, enemies: 75, obstacles: 15 },
    { id: 17, enemies: 80, obstacles: 16 },
    { id: 18, enemies: 85, obstacles: 17 },
    { id: 19, enemies: 90, obstacles: 18 },
    { id: 20, enemies: 95, obstacles: 19 },
    { id: 21, enemies: 100, obstacles: 20 },
    { id: 22, enemies: 105, obstacles: 21 },
    { id: 23, enemies: 110, obstacles: 22 },
    { id: 24, enemies: 115, obstacles: 23 },
    { id: 25, enemies: 120, obstacles: 24 },
    { id: 26, enemies: 125, obstacles: 25 },
    { id: 27, enemies: 130, obstacles: 26 },
    { id: 28, enemies: 135, obstacles: 27 },
    { id: 29, enemies: 140, obstacles: 28 },
    { id: 30, enemies: 145, obstacles: 29 },
];

// Initialize player and current level
let player = new Player(100, 100);
let currentLevel = levels;

// Function to generate level content based on level data
function generateLevel(levelData) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    player.draw();

    // Draw enemies and obstacles based on level data
    for (let i = 0; i < levelData.enemies; i++) {
        const enemy = new Enemy(Math.random() * (canvas.width - 50), Math.random() * (canvas.height - 50));
        enemy.draw();
    }

    for (let i = 0; i < levelData.obstacles; i++) {
        // Draw obstacles (e.g., walls, traps)
        ctx.fillStyle = 'gray';
        ctx.fillRect(Math.random() * (canvas.width - 50), Math.random() * (canvas.height - 50), 50, 50);
    }
}

// Draw initial level
generateLevel(currentLevel);

// Update level on user progress
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') { // Example: Press space to advance level
        const currentIndex = levels.indexOf(currentLevel);
        if (currentIndex < levels.length - 1) {
            currentLevel = levels[currentIndex + 1];
            generateLevel(currentLevel);
        }
    }

    // Handle player movement
    switch (e.key) {
        case 'ArrowUp':
            player.y -= 10;
            break;
        case 'ArrowDown':
            player.y += 10;
            break;
        case 'ArrowLeft':
            player.x -= 10;
            break;
        case 'ArrowRight':
            player.x += 10;
            break;
    }

    // Redraw everything after movement
    generateLevel(currentLevel);
});

// Main game loop
function update() {
    requestAnimationFrame(update);
}

// Start the game
update();