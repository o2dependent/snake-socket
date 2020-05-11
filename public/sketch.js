var snek;
var fud = [];
var sneks = [];
function setup() {
	createCanvas(800, 800);
	frameRate(12);
	//make a new food
	var temp = new food();
	fud.push(temp);
	//connect to localhost 3000
	socket = io.connect('http://localhost:3000');
	//when connected create new snake with client
	socket.on('started',makeSnake);
	//when foodDataServer comes in unpackFood
	socket.on('foodDataServer',unpackFood);
	//when snakeDataServer comes in unpackSnake
	socket.on('snakeDataServer',unpackSnake);
	socket.emit('start');
}
////////////////////
//SOCKET FUNCTIONS//
////////////////////
function makeSnake(id) {
	//make a new snake
	snek = new snake(id);
	var newfood = new food();
	fud.push(newfood);
	packFood();
}

function moveSnake(snekOther) {
	snekOther.show();
}




function packFood() {
	for(var i = 0;i < fud.length;i++) {
		var temp = fud[i];
		var packed = {
			i: i,
			x: temp.pos.x,
			y: temp.pos.y
		}
		socket.emit('foodData',packed);
	}

}
function unpackFood(unpacked) {
	fud[unpacked.i] = new food(createVector(unpacked.x,unpacked.y));
}


function packSnake() {
	//array[0] = prevX
	//array[1] = prevY
	//array[2] = head[x,y]
	//array[3] = dir[x,y]
	//array[4] = id
	var temp = [];
	for(var i = 0;i < snek.prev.length;i++) {
		console.log('prev x: ' + snek.prev[i].x);
		temp.push(snek.prev[i].x);
	}
	var prevx = temp;
	temp = [];
	for(var i = 0;i < snek.prev.length;i++) {
		console.log('prev y: ' + snek.prev[i].y);
		temp.push(snek.prev[i].y);
	}
	var prevy = temp;
	var prev = {
		x: prevx,
		y: prevy
	};
	var head = {
		x: snek.head.x,
		y: snek.head.y
	};
	var dir = {
		x: snek.dir.x,
		y: snek.dir.y
	};
	var id = snek.id;
	socket.emit('snakeData',prev,head,dir,id);
}
function unpackSnake(prev,head,dir,id) {
	var inList = false;
	var tempId = id;
	var tempPrev = [];
	var tempHead = createVector(head.x,head.y);
	var tempDir = createVector(dir.x,dir.y);
	//repack prev
	for(var j = 0;j < prev.x.length;j++) {
		var t = createVector(prev.x[j],prev.y[j]);
		tempPrev.push(t);
	}
	var tempSnake = new snake(tempId,tempPrev,tempHead,tempDir);
	//is this already an existing snake
	for(var j = 0; j < sneks.length;j++) {
		var tem = sneks[j];
		if(id == tem.id) {
			sneks[j] = tempSnake;
			inList = true;
		}
	}
	if(!inList) {
		sneks.push(tempSnake);
	}
}

///////////////////
//P5.JS FUNCTIONS//
///////////////////
////DRAW
function draw() {
	background(51);
	//display all food
	for(var i = 0; i < fud.length;i++) {
		var temp = fud[i];
		temp.show();
	}
	fill(200,100,0);
	for(var i = 0; i < sneks.length;i++) {
		// console.log(sneks[i].id);
		if(snek.id != sneks[i].id) {
			var temp = sneks[i];
			temp.show();
		}
	}
	//display snake if there is one
	fill(0,50,200);
	if(snek != undefined){
		snek.update(fud);
		snek.show();

		packSnake();
	}
}

////MOUSE PRESSED
function mousePressed() {
	// var temp = new food();
	// fud.push(temp);
}

////KEYBOARD INPUT
function keyPressed() {
	if(snek == undefined){
		socket.emit('start');
		return;
	}
	//wasd
	if(snek.dir.x == 1||
		 snek.dir.x == -1) {
			 if(keyCode === 83) {
	 			snek.move(createVector(0,1));
			} else if(keyCode === 87) {
				snek.move(createVector(0,-1));
			}
	} else {
		if(keyCode === 65) {
			snek.move(createVector(-1,0));
		} else if(keyCode === 68) {
			snek.move(createVector(1,0));
		}
	}


	//up down arrow
	if(snek.dir.x == 1||
		 snek.dir.x == -1) {
			 if(keyCode === 40) {
				snek.move(createVector(0,1));
			} else if(keyCode === 38) {
				snek.move(createVector(0,-1));
			}
	} else {
		if(keyCode === 37) {
			snek.move(createVector(-1,0));
		} else if(keyCode === 39) {
			snek.move(createVector(1,0));
		}
	}


	//Backspace stops program
	if(keyCode === 8) {
		remove();
	}

}
