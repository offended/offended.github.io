var player;
var enemy;
var isGameOver;
var randomX;
var randomY;
var levelCounter;
var levelCounter2;
var power;
var velocity;
var score;

function setup () {
    isGameOver = false;
    createCanvas(1000, 700);
    power = 0;
    powermeter = createSprite(0, 400, 0, 25);
    player = createSprite(width/2, height-10, 20, 20);
    enemy = createSprite(width/2, 0, 20, 20);
    boost = createSprite(random(40, 960), random(240, 660), 30, 30);
    
    randomX = 0;
    randomY = 10;
    levelCounter = 1;
    levelCounter2 = 1;
    velocity = 10;
    score = 0;
}

function draw() {
    if (isGameOver) {
        gameOver();
    } else {
        if (enemy.overlap(player)) {
            isGameOver = true;
        }
    if (enemy.overlap(player)) {
        gameOver();
    }
    if (boost.overlap(player)) {
        if (power < 10000) {
            power = power + levelCounter*4 + 50;
            boost.position.x = random(40, 960);
            boost.position.y = random(240, 660);
        }
        powermeter.width = power/10;
    }
    
    background(10, 1, 50);
    
    
    if (keyDown("CTRL")) {
        velocity = 5;
    }
    else if (keyDown("SPACE") && power > 0) {
        velocity = 15;
        power = power - 20;
        powermeter.width = power/10;
    }
    else {
        velocity = 10;
    }
    
    if (keyDown(RIGHT_ARROW) && player.position.x < width-10) {
        player.position.x = player.position.x + velocity;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > 10) {
        player.position.x = player.position.x - velocity;
    }
    if (keyDown(DOWN_ARROW) && player.position.y < height-10){
        player.position.y = player.position.y + velocity;
    }
    if (keyDown(UP_ARROW) && player.position.y > 10) {
        player.position.y = player.position.y - velocity;
    }
    
    enemy.position.y = enemy.position.y + randomY;
    enemy.position.x = enemy.position.x + randomX;
    if (enemy.position.y > height) {
        randomX = random(-2-levelCounter2, levelCounter2+2);
        randomY = random(levelCounter, levelCounter+4);
        enemy.position.y = 0;
        enemy.position.x = random(5, width-75);
        enemy.rotationSpeed = random(0, 10);
        enemy.height = random(levelCounter/2, levelCounter+10*levelCounter);
        enemy.width = random(levelCounter/2, levelCounter+5*levelCounter);
        
        if (levelCounter < 20)
        {
            levelCounter = levelCounter + 0.5;
        }
        else if (levelCounter > 19)
        {
            levelCounter = levelCounter + 0.125;
        }
        if (levelCounter2 < 20)
        {
            levelCounter2 = levelCounter2 + 0.5;
        }
    }
    
    if (0 > enemy.position.x) {
        randomX = -randomX;
    }
    if (enemy.position.x > 1000) {
        randomX = -randomX;
    }
    if (0 > enemy.position.y) {
        randomY = -randomY;
    }
    if (enemy.position.y > 700) {
        randomY = -randomY;
    }
    drawSprites();
    }
}

function gameOver() {
    background(0);
    textAlign(CENTER);
    fill("white");
    text("congratulations on losing", width/2, height/2);
    text("click anywhere to exercise more futility", width/2, 3*height/5);
    text("remember: hold left control to go slow, hold space bar to use boost", width/2, 3*height/5.3);
}

function mouseClicked() {
   if (isGameOver) {
    isGameOver = false;
    levelCounter = 1;
    player.position.x = width/2;
    player.position.y = height-10;
    enemy.position.x = width/2;
    enemy.position.y = 0;
    enemy.height = 20;
    enemy.width = 20;
    levelCounter = 1;
    levelCounter2 = 1;
    velocity = 10;
    power = 0;
   }
}