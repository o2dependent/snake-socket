function food(pos) {
  this.color = createVector(floor(random(0,255)),floor(random(0,255)),floor(random(0,255)));
  this.side = 50;
  if(pos == undefined)
    this.pos = createVector(floor(random(1,width/this.side - 1)),floor(random(1,height/this.side - 1)));
  else
    this.pos = pos;


  this.eaten = function() {
    this.pos = createVector(floor(random(1,width/this.side - 1)),floor(random(1,height/this.side - 1)));
    this.color = createVector(floor(random(0,255)),floor(random(0,255)),floor(random(0,255)));
    packFood();
  }
  this.show = function() {
    // console.log(this.pos.x + ' ' + this.pos.y);
    fill(255,0,0);
    rect(this.pos.x * this.side,this.pos.y * this.side,this.side,this.side);
  }
}
