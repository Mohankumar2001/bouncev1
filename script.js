var myGamePiece;
var myObstacle = [];

function startgame() {
	myGameArea.start();
	myGamePiece = new component(30,30,"red",10,120);
	}

var myGameArea = {
	canvas: document.createElement("canvas"),
	start: function() {
		this.canvas.height = 480;
		this.canvas.width = 480;
		this.context = this.canvas.getContext("2d");
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
    	clearInterval(this.interval);
    }
}

function component(width ,height ,color ,x , y) {
	this.height = height;
	this.width = width;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.newPos = function() {
		this.x += this.speedX;
		this.y += this.speedY;
		
	}
	this.update = function() {
		ctx = myGameArea.context;
	    ctx.fillStyle = color;
	    ctx.fillRect(this.x,this.y,this.width,this.height);
	}
	this.crashWith = function(otherObj) {
		var myLeft = this.x;
		var myRight = this.x + this.width;
		var myTop = this.y;
		var myBottom = this.y + this.height;
		var otherLeft = otherObj.x;
		var otherRight = otherObj.x + otherObj.width;
		var otherTop = otherObj.y;
		var otherBottom = otherObj.y + otherObj.height;
		var crash = true;
        if ((myLeft>otherRight)||(myRight<otherLeft)||(myTop>otherBottom)||(myBottom<otherTop)) {
        	crash = false;
        }
        return crash;
	}
	
}

function updateGameArea() {
	var x = myGameArea.canvas.width;
	var y = myGameArea.canvas.height;
	for(i=0;i<myObstacle.length;i++) {
	    if(myGamePiece.crashWith(myObstacle[i])){
		    myGameArea.stop();
		    return;
	    }
	}
	
	myGameArea.clear();
	myGameArea.frameNo +=1;
	if(myGameArea.frameNo==1||everyInterval(150)){
	  	myObstacle.push(new component(200,10,"blue",myGameArea.canvas.width-200,0))
	}
	for(i=0;i<myObstacle.length;i++) {
		myObstacle[i].y +=1
		myObstacle[i].update();
	}
	myGamePiece.newPos();
	myGamePiece.update();

    
}

function everyInterval(n) {
	if((myGameArea.frameNo/n)%1 == 0)
		return true;
	else
		return false;
}

function moveup() {
    myGamePiece.speedY -= 1; 
}

function movedown() {
    myGamePiece.speedY += 1; 
}
function moveleft() {
    myGamePiece.speedX -= 1; 
}

function moveright() {
    myGamePiece.speedX += 1; 
}