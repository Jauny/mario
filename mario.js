var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mario = {
  height: 20,
  width: 10,

  x: 10,
  y: canvas.height,

  vx: 0,
  vy: 0,

  gravity: 0.1,

  draw: function() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
  },

  move: function() {
    this.vy += this.gravity;
    this.y += this.vy;
    if (this.y > canvas.height) {
      this.y = canvas.height
      this.vy = 0;
    }

    for (var i = 0; i < platforms.length; i++) {
      var p = platforms[i];
      if (
        p.x < this.x && p.x + p.width > this.x + this.width &&
        p.y < this.y && p.y + p.height > this.y &&
        this.vy > 0
      ) {
        this.vy = 0;
        this.y = p.y;
      }
    }
    this.x += this.vx;
  }
}

var Platform = function(x, y) {
  this.x = x;
  this.y = y;

  this.width = 50;
  this.height = 10;
}
Platform.prototype.draw = function() {
  ctx.fillStyle = 'black';
  ctx.fillRect(this.x, this.y, this.width, this.height);
}

var platforms = [];
for (var i = 0; i < 10; i++) {
  var x = Math.random() * canvas.height;
  var y = Math.random() * canvas.width;
  platforms.push(new Platform(x, y))
}

var draw = function() {
  ctx.fillStyle = 'gainsboro';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }
  mario.move();
  mario.draw();
}

document.addEventListener('keydown', function(evt) {
  switch (evt.keyCode) {
    case 37:
      mario.vx = -2;
      break;
    case 39:
      mario.vx = 2;
      break;
    case 38:
      if (mario.vy !== 0) {
        return;
      }
      jumped = true;
      mario.vy = -4;
      window.setTimeout(function() {
        jumped = false;
        mario.vy = 0;
      }, 500);
      break;
  }
})

document.addEventListener('keyup', function(evt) {
  switch (evt.keyCode) {
    case 37:
      mario.vx = 0;
      break;
    case 39:
      mario.vx = 0;
      break;
  }
})

window.setInterval(draw, 1000/60);