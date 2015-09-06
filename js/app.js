// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.place();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x > game.columns * game.colWidth) {
        this.place();
    }
};

// Place the enemy at a random position with a random speed
Enemy.prototype.place = function() {
    this.x = -Math.floor(Math.random() * game.columns) * game.colWidth - game.colWidth;
    this.y = Math.floor(Math.random() * 3 + 1) * game.rowHeight - 20;
    this.speed = Math.floor(Math.random() * 100 ) + 90;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player constructor
var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

// It upates the position of the Player
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.
}

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Change the Player target position in response to input
// Parameter: Direction to move to
Player.prototype.handleInput = function(dir) {
}

// Define the parameter for the board of the game and the amount of enemies
var game = {
    rows: 6,
    columns: 5,
    rowHeight: 83,
    colWidth: 101,
    numEnemies: 6
}

// Keep track of all the enemies.
var allEnemies = [];

// Create the new enemies and push them into allEnemies
for (var i = 0; i < game.numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Create the Player for the game
var player = new Player(300, 205);



// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
