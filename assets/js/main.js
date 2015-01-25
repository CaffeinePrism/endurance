function randColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function randomBackground() {
  // http://www.paulirish.com/2009/random-hex-color-code-snippets/
  var rand = randColor();
  var canvas = document.getElementById('canvas');
  canvas.style.background = rand;
};

function getCanvasColor() {
  var canvas = document.getElementById('canvas');
  return canvas.style.background || "rgb(0, 0, 0)";
}

function won() {
  alert('win');
}

function Box() {
  this.canvas = document.getElementById('canvas');
  this.context = canvas.getContext('2d');
  this.box_width = 10;
  this.color = '#000000';

  this.x = 0
  this.y = canvas.height - this.box_width;


  this.context.fillRect(this.x, this.y, this.box_width, this.box_width);
}

Box.prototype.moveTo = function(x, y, color) {
  this.canvas.width = this.canvas.width;

  if(x < 0) {
    x = 0;
  }
  if(y < this.canvas.height - this.box_width) {
    y = this.canvas.height - this.box_width;
  }
  if(x > this.canvas.width - this.box_width) {
    x = this.canvas.width - this.box_width;
  }
  if(y > this.canvas.height - this.box_width) {
    y = this.canvas.height - this.box_width;
  }

  if (color !== undefined) {
    this.context.fillStyle = color;
    this.color = color;
  }

  this.context.fillRect(x, y, this.box_width, this.box_width);

  this.x = x;
  this.y = y;
};

Box.prototype.randomColor = function() {
  var rand = randColor();
  this.moveTo(this.x,this.y, rand);
}

Box.prototype.goBack = function() {
  this.moveTo(this.x-2, this.y-2);
  this.randomColor();
}

Box.prototype.goForward = function() {
  this.moveTo(this.x+2, this.y+2);
  this.randomColor();
}

Box.prototype.randMove = function() {
  if(this.winner()) {
    return
  }
  randomBackground();
  var rand = Math.random() < 0.5 ? true : false;
  if(rand) {
    this.goForward();
  }
  else {
    this.goBack();
  }
}

Box.prototype.winner = function() {
  //get to the other side or colors match
  if(this.x == this.canvas.width - this.box_width) {
    won();
  }
  if(this.y == 0) {
    won();
  }
}

var KEYCODES = {
  'shift' : '16',
  'ctrl' : '17',
  'alt' : '18',
  '0' : '48',
  '1' : '49',
  '2' : '50',
  '3' : '51',
  '4' : '52',
  '5' : '53',
  '6' : '54',
  '7' : '55',
  '8' : '56',
  '9' : '57',
  'a' : '65',
  'b' : '66',
  'c' : '67',
  'd' : '68',
  'e' : '69',
  'f' : '70',
  'g' : '71',
  'h' : '72',
  'i' : '73',
  'j' : '74',
  'k' : '75',
  'l' : '76',
  'm' : '77',
  'n' : '78',
  'o' : '79',
  'p' : '80',
  'q' : '81',
  'r' : '82',
  's' : '83',
  't' : '84',
  'u' : '85',
  'v' : '86',
  'w' : '87',
  'x' : '88',
  'y' : '89',
  'z' : '90',
}

function randomKeyBinds(box) {
  var el = document;
  for (var k in KEYCODES) {
    el.onkeyup = function(evt) {
      evt = evt || window.event;
      b.randMove();
    };
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  b = new Box();
  randomKeyBinds(b);


//  setInterval(function () {b.moveTo(b.x+20, b.y)}, 500);
//  setInterval(function () {b.randomColor()}, 500);
//  setInterval(function () {randomBackground()}, 500);

});
