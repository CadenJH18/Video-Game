//character
var character;

//background
var myBackground;

//deadly blocks and obstacles
// var boxes = [];
var myObstacles = [
    [],
];

//starts game and creates character
function startGame() {
    myGameArea.start();
    character = new component(30, 30, "red", 75, 250);
    myObstacles = new component(25, 50, "black", 400, 245);
    // boxes = new component(30, 30, "green", 600, 250);
  }

//game area
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function(){
        this.canvas.width = 800;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20)
    },
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
//this changes how fast it falls
    this.gravity = 2.5;
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

    //death with myObjects function
    //!!!if dying to everything change "otherobj" & "other" to "myObjects"?

    this.crashWithObjects = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        //boxes section
        // var boxesleft = boxes.x;
        // var boxesright = boxes.x + (boxes.width);
        // var boxestop = boxes.y;
        // var boxesbottom = boxes.y + (boxes.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright))
        // if((mybottom < boxestop) ||
        // (mytop > boxesbottom) ||
        // (myright < boxesleft) ||
        // (myleft > boxesright))
        {
          crash = false;
        }
        return crash;
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
    if (character.crashWithObjects(myObstacles)) {
        myGameArea.stop();
      } else {
    myGameArea.clear();
    myObstacles.x += -5;
    myObstacles.update();
    // boxes.x += -5;
    // boxes.update();
    character.newPos();
    character.update();
      }
}

//jump and fall functions
window.onkeypress = function jump(){
   if (character.y >= 240) {
       character.y -= 80
   }
//so u fall after the jump reaches the peak
    if (this.y !== 200) {
        setTimeout(this.hitBottom, 1)
    }
}