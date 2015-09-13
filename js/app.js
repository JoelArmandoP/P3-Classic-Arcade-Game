// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'enemy';
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
    this.y = Math.floor(Math.random() * 5 + 3) * game.rowHeight;
    this.speed = Math.floor(Math.random() * 100 ) + 90;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    drawImg(Resources.get(this.sprite), this.x, this.y);
};


// Player constructor
var Player = function() {
    this.sprite = 'boy';
    this.place();
    this.speed = 180;
    this.lives = 3;
}

//Place the player randomly in the bottom rows
Player.prototype.place = function() {
    this.x = Math.floor(Math.random() * game.columns) * game.colWidth;
    this.y = (Math.floor(Math.random() * 3) + 8) * game.rowHeight;
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
        drawImg(Resources.get(this.sprite), this.x, this.y);
    }
    drawSmallImg(Resources.get(this.sprite), 0, 0);
    for (var life = 0; life < this.lives; life++) {
            drawSmallImg(Resources.get('heart'),
                (life + 1) * game.colWidth/2, 0);
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
    var newTargetX, newTargetY;
    switch(dir) {
        case 'left':
            if(this.targetX > 0) {
                newTargetX = this.targetX - game.colWidth;
            }
            break;
        case 'up':
            if(this.targetY > 0) {
                newTargetY = this.targetY - game.rowHeight;
            }
            break;
        case 'right':
            if(this.targetX < (game.columns - 2) * game.colWidth) {
                newTargetX = this.targetX + game.colWidth;
            }
            break;
        case 'down':
            if(this.targetY < (game.rows - 2) * game.rowHeight) {
                newTargetY = this.targetY + game.rowHeight;
            }
            break;
    }
    if(Math.abs(newTargetX - this.x) <= game.colWidth) {
        this.targetX = newTargetX;
    }
    if(Math.abs(newTargetY - this.y) <= game.rowHeight) {
        this.targetY = newTargetY;
    }
}

// Define the parameters for the game: board, lifes and enemies.
var game = {
    assets: {
        stone: 'images/stone-block.png',
        water: 'images/water-block.png',
        grass: 'images/grass-block.png',
        enemy: 'images/enemy-bug.png',
        boy:   'images/char-boy.png',
        catGirl: 'images/char-cat-girl.png',
        hornGirl: 'images/char-horn-girl.png',
        pinkGirl: 'images/char-pink-girl.png',
        princessGirl: 'images/char-princess-girl.png',
        heart: 'images/Heart.png',
        tree:  'images/tree-short.png',
        orangeGem: 'images/gem-orange.png',
        blueGem: 'images/gem-blue.png',
        greenGem: 'images/gem-green.png',
        key: 'images/Key.png',
        chestClosed: 'images/chest-closed.png',
        chestOpen: 'images/chest-open.png',
        tree: 'images/tree-short.png',
        rampSouth: 'images/ramp-south.png'
    },
    rowImages: [
        'stone',   // First row is stone
        'water',   // Row 1 of 2 of water
        'water',   // Row 2 of 2 of water
        'stone',   // Row 1 of 5 of stone
        'stone',   // Row 2 of 5 of stone
        'stone',   // Row 3 of 5 of stone
        'stone',   // Row 4 of 5 of stone
        'stone',   // Row 4 of 5 of grass
        'grass',   // Row 1 of 4 of grass
        'grass',   // Row 2 of 4 of grass
        'grass',   // Row 3 of 4 of grass
        'grass'    // Row 4 of 4 of grass
        ],
    items: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ],
    trees: [
        [8, 5],
        [9, 5],
        [9, 0],
        [10, 0],
    ],
    columns: 12,
    rowHeight: 40,
    colWidth: 50,
    imgHeight: 171,
    imgTile: 80,
    imgWidth: 101,
    imgAbove: 50,
    numEnemies: 10,
    //playerSpeed: 180,
};
game.rows = game.rowImages.length;
game.imgScale = game.colWidth/game.imgWidth;
game.imgHeightScaled = game.imgHeight * game.imgScale;
game.imgAboveScaled = game.imgAbove * game.imgScale;
game.trees.forEach(function (where) { game.items[where[0]][where[1]] = 'tree'; });
game.items[5][0] = 'orangeGem';
game.items[4][8] = 'blueGem';
game.items[6][9] = 'greenGem';
game.items[8][9] = 'key';
game.items[0][5] = 'chestClosed';
game.items[1][5] = 'stone';
game.items[2][5] = 'rampSouth';


// Keep track of all the enemies.
var allEnemies = [];

// Create the new enemies and push them into allEnemies
for (var i = 0; i < game.numEnemies; i++) {
    var enemy = new Enemy();
    allEnemies.push(enemy);
}

// Create the Player to start the game
var player = new Player(300, 205);

function drawImg(img, x, y) {
    ctx.drawImage(img, x, y-game.imgAboveScaled, game.colWidth, game.imgHeightScaled);
}

function drawSmallImg(img, x, y) {
    ctx.drawImage(img, x, y-game.imgAboveScaled/2, game.colWidth/2, game.imgHeightScaled/2);
}

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

