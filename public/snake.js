function snake(id,prev,head,dir) {
  this.id = id;
  if(prev != undefined)
    this.prev = prev;
  else
    this.prev = [];


  if(head == undefined)
    this.head = createVector(1,1);
  else
    this.head = head;

  if(dir == undefined)
    this.dir = createVector(1,0);
  else
    this.dir = dir;

  this.side = 50;



  this.show = function() {
    //snek managmen
    // fill(100,0,200);
    for(var i = 0;i <= this.prev.length - 1;i++) {
      var pos = this.prev[i];
      // print("i: " + i + "  x: " + pos.x + "  y: " + pos.y);
      rect(pos.x * this.side,pos.y * this.side,this.side,this.side);
    }
    rect(this.head.x * this.side,this.head.y * this.side,this.side,this.side);
  }


  this.update = function(food) {
    //Eat food
    for(var i = 0;i < food.length;i++) {
      var foo = food[i];
      if(this.head.dist(foo.pos) == 0) {
        this.prev.push(createVector(this.head.x,this.head.y));
        foo.eaten();
      }
    }

    //Death

    for(var i = 0;i < this.prev.length - 1;i++) {
      this.prev[i] = this.prev[i+1];
    }
    if(this.prev.length > 0) {
      this.prev[this.prev.length - 1] = createVector(this.head.x,this.head.y);
    }
    this.head.x += this.dir.x;
    this.head.y += this.dir.y;
    this.death();
  }

  this.death = function() {
    if(this.head.x * this.side < 0||
       this.head.x * this.side >= width||
       this.head.y * this.side < 0||
       this.head.y * this.side >= height){
           this.prev = [];
           this.head = createVector(0,0);
           this.dir = createVector(1,0);
       }
    for(var i = 0; i <= this.prev.length - 1;i++) {
      if(this.head.dist(this.prev[i]) == 0) {
        this.prev = [];
        this.head = createVector(0,0);
        this.dir = createVector(1,0);
        break;
      }
    }
  }
  this.move = function(newDir) {
    this.dir = newDir;
  }
}
