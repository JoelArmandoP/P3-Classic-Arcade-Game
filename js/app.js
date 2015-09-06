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
    this.x = Math.floor(this.x + this.speed * dt);
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
    this.targetX = x;
    this.targetY = y;
    this.speed = 180;
}

// It upates the position of the Player
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    var dp = this.speed * dt;
    var dx = Math.abs(this.targetX - this.x);
    if (dx > dp) {
        dx = dp;
    }
    var dy = Math.abs(this.targetY - this.y);
    if (dy > dp) {
        dy = dp;
    }
    if(this.x > this.targetX) {
        this.x = Math.floor(this.x - dx);
    } else {
        this.x = Math.floor(this.x + dx);
    }
    if(this.y > this.targetY) {
        this.y = Math.floor(this.y - dy);
    } else {
        this.y = Math.floor(this.y + dy);
    }

}

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    console.log(this.x, this.y, this.targetX, this.targetY);
}

// Change the Player target position in response to input
// Parameter: Direction to move to
Player.prototype.handleInput = function(dir) {
    switch(dir) {
        case 'left':
            if(this.targetX > 0) {
                this.targetX = this.targetX - game.colWidth;
            }
            break;
        case 'up':
            if(this.targetY > 0) {
                this.targetY = this.targetY - game.rowHeight;
            }
            break;
        case 'right':
            if(this.targetX < (game.columns - 2) * game.colWidth) {
                this.targetX = this.targetX + game.colWidth;
            }
            break;
        case 'down':
            if(this.targetY < (game.rows - 2) * game.rowHeight) {
                this.targetY = this.targetY + game.rowHeight;
            }
            break;
    }
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
