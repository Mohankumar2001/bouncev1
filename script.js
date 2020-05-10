var myGamePiece;

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
		this.interval = setInterval(updateGameArea, 20);
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
	},
	clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
	
}

function updateGameArea() {
	myGameArea.clear();
	myGamePiece.newPos();
	myGamePiece.update();
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