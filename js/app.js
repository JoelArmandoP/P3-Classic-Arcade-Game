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
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.place();
    this.speed = 180;
    this.lives = 3;
}

//Place the player randomly in the bottom rows
Player.prototype.place = function() {
    this.x = Math.floor(Math.random() * game.columns) * game.colWidth;
    this.y = (Math.floor(Math.random() * 2) + 4) * game.rowHeight;
    this.targetX = this.x;
    this.targetY = this.y;
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
    if (this.lives > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Reset player and take one life away
Player.prototype.die = function() {
    this.place();
    if (this.lives > 0) {
        this.lives -= 1;
    }
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

// Define the parameters for the game: board, lifes and enemies.
var game = {
    rowImages: [
        'images/water-block.png',   // Top row is water
        'images/stone-block.png',   // Row 1 of 3 of stone
        'images/stone-block.png',   // Row 2 of 3 of stone
        'images/stone-block.png',   // Row 3 of 3 of stone
        'images/grass-block.png',   // Row 1 of 2 of grass
        'images/grass-block.png',   // Row 2 of 3 of grass
        'images/grass-block.png'    // Row 3 of 3 of grass
        ],
    columns: 6,
    rowHeight: 83,
    colWidth: 101,
    numEnemies: 6,
    //playerSpeed: 180,
};
game.rows = game.rowImages.length;

// Keep track of all the enemies.
var allEnemies = [];

// Create the new enemies and push them into allEnemies
for (var i = 0; i < game.numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Create the Player to start the game
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

