function Ball(x, y, radius, context) {
  this.x = x;
  this.y = y;
  this.radius = radius || 10;
  this.startAngle = 0;
  this.moving = false
  this.endAngle = (Math.PI * 2);
  this.context = context
  this.speed = 3
  this.xDirection = 1
  this.yDirection = 1
}

Ball.prototype.draw = function () {
    this.context.beginPath();
    this.context.fillStyle = "white"
    this.context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.context.closePath();
    this.context.fill();
    return this;
};

Ball.prototype.move = function () {
  this.bounceCheck();

  this.x = this.x + (this.speed * this.xDirection);
  this.y = this.y + (this.speed * this.yDirection);

  return this;
}

var obstacleCoords = [[50, 50, 250, 60], [50, 450, 250, 460], [50, 50, 60, 450], [250, 50, 260, 460], [150, 170, 155, 220]]

Ball.prototype.holeCheck = function(puttHole) {
    if(Math.abs((puttHole.x - this.x)) < (puttHole.radius + this.radius) && Math.abs((puttHole.y - this.y)) < (puttHole.radius + this.radius)) {
        this.x = puttHole.x
        this.y = puttHole.y
        this.moving = false
    }
}

Ball.prototype.bounceCheck = function() {
  obstacleCoords.forEach(function (obstacle, index) {
    var xMin = obstacle[0];
    var yMin = obstacle[1];
    var xMax = obstacle[2];
    var yMax = obstacle[3];
    if ((this.y + this.radius >= yMin && this.y - this.radius <= yMax) && (this.x + this.radius >= xMin && this.x - this.radius <= xMax) ) {

      var prevX = this.x - this.speed * this.xDirection;
      var prevY = this.y - this.speed * this.yDirection;
      if ((prevY - this.radius > yMax &&  this.y - this.radius <= yMax) || // check for collision in y direction on bottom
          (prevY + this.radius < yMin && this.y + this.radius >= yMin)){  // check for collision in y direction on top

        this.yDirection *= -1;
      }

      if ((prevX - this.radius > xMax &&  this.x - this.radius <= xMax) || // check for collision in x direction on right
          (prevX + this.radius < xMin && this.x + this.radius >= xMin)) {  // check for collision in x direction on left

        this.xDirection *= -1;
      }
      this.speed *= 0.8;
    }
  }, this);
  return this;
}





// X Bounce Obstacles!!
//left side
// var obstacle = new Bumper(50, 20, 500, 10);
// var golfBall = new Ball(10, 10, 6, 0);

// right side
// var obstacle = new Bumper(650, 20, 500, 10);
// var golfBall = new Ball(670, 10, 6, 0);
// var obstacles = [obstacle]

// var obstacleTwo = new Bumper(50, 450, 10, 400);
// var obstacles = [obstacle, obstacleTwo]

// Y Bounce Obstacles!!

// Top obstacle
// var obstacle = new Bumper(50, 50, 10, 400);
// var golfBall = new Ball(50, 30, 6, 0);




module.exports = Ball;