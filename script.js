var myGamePiece;
var myObstacle = [];
var myScore;
var myMusic;

function startgame() {
	myGameArea.start();
	myGamePiece = new component(40,40,"assets/blueball1.png",10,120,"image");
	myScore = new component("30px", "Consolas", "black", 280, 40, "text");
	myMusic = new sound("assets/bgm.mp3");
	
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

function component(width ,height ,color ,x , y,type) {
	this.type = type;
	this.height = height;
	this.width = width;
	this.x = x;
	this.y = y;
	this.speedX = 0;
	this.speedY = 0;
	this.gravity = 0.05;
	this.gravitySpeed = 0;
	this.bounce = 0.6;
	this.newPos = function() {
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
	}
	this.update = function() {
		ctx = myGameArea.context;
		if(this.type == "text") {			
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text,this.x,this.y);
		}
		else if(this.type == "image") {
			this.image = new Image();
			this.image.src = color;
			ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
		}
		else {
	        ctx.fillStyle = color;
	        ctx.fillRect(this.x,this.y,this.width,this.height);
		}
		
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
	this.hitBottom = function() {
		var rockBottom = myGameArea.canvas.height - this.height;
		if(this.y>rockBottom) {
			this.y = rockBottom;
			this.gravitySpeed = -(this.gravitySpeed*this.bounce);
		}
	}
	
}

function updateGameArea() {
	var x = myGameArea.canvas.width;
	var y = myGameArea.canvas.height;
	for(i=0;i<myObstacle.length;i++) {
	    if(myGamePiece.crashWith(myObstacle[i])){
		    myGameArea.stop();
		    myMusic.play();
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
	
	myScore.update();
	myGamePiece.newPos();
	myGamePiece.update();

    
}

function everyInterval(n) {
	if((myGameArea.frameNo/n)%1 == 0) {
		myScore.text = "SCORE:"+myGameArea.frameNo/n;
		return true;
	}
	else
		return false;
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute = ("preload","auto");
	this.sound.setAttribute = ("controls","none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function() {
		this.sound.play();
	}
	this.stop = function() {
		this.sound.pause();
	}
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