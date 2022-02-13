//character
var character;

//starts game and creates character
function startGame() {
    myGameArea.start();
    character = new component(30, 30, "red", 150, 250);
  }

//game area
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20)
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedY = 0;
//this changes how fast it falls
    this.gravity = 3;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

//updates character position
    this.newPos = function(){
        this.gravitySpeed += this.gravity;
        this.y += this.speedY + this.gravity;
        this.hitBottom();
    }
    this.hitBottom = function(){
        var rockBottom = myGameArea.canvas.height - this.height;
        if (this.y > rockBottom) {
            this.y = rockBottom;
        }
    }
}

//makes it move
function updateGameArea(){
    myGameArea.clear();
    character.newPos();
    character.update();
}

//jump and fall functions
function jump(){
//so ur only able to jump when on the ground
    if (this.y == myGameArea.canvas.height) {
    character.y -= 75;
    }
//so u fall after the jump reaches the peak
    if (this.y !== 200) {
        setTimeout(this.hitBottom, 1)
    }
}

