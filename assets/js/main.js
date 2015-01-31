var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var audio = document.getElementsByTagName('audio')[0];
var started = false;
var interval;
var wonAlready = false;
var probability = 0.7 - (Number(localStorage.completed) * .005);

var unlockedColors;

function setColor(newColor){
  if (localStorage.completed >= 5){
    localStorage.completed = Number(localStorage.completed) - 5;
    localStorage.colors = localStorage.colors + "," + newColor;
    location.reload();
  }
  else{
    alert("You don't have enough stuffs");
  }
}

function colorSplit(){
  return unlockedColors = localStorage.colors.split(",");
}

function getSecret(){
  if (localStorage.completed >= 50){
    localStorage.completed = Number(localStorage.completed) - 50;
    alert("Just mash buttons brah");
  }
  else{
    alert("You don't have enough stuffs");
    location.reload();
  }
}

// Generates random colors
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

function randColor() {
  colorSplit();
  return unlockedColors.randomElement();
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

// Functions for winning, scores, and printing
function won() {
  clearInterval(timer);
  audio.pause();
  Score();
  printWon();
}

function Score(){
  if (wonAlready == false) {
    wonAlready = true;
    localStorage.completed = Number(localStorage.completed) + 1;
    printScore();
  }
}

function printScore(){
  var score = document.getElementById('completed_number');
  score.innerHTML = "Wow I've made it " + localStorage.completed + " times";
}

function printWon(){
  var won = document.getElementById('win')
  won.innerHTML = "I want to go to the other side again!"
}

function resetScore(){
  localStorage.completed = 0;
  localStorage.clicker = 0;
  localStorage.colors = "black,white"
  printScore();
  location.reload();
}

// Creates the canvas and box
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
  if(secondsLabel.innerHTML == 0 && minutesLabel.innerHTML == 0 && started == false) {
    startEverything();
    started = true;
  }
  if(this.winner()) {
    return
  }
  randomBackground();
  var rand = Math.random() < probability ? true : false;
  if(rand) {
    this.goForward();
  }
  else {
    this.goBack();
  }
}

Box.prototype.winner = function() {
  if(this.x == this.canvas.width - this.box_width) {
    won();
    return true;
  }
  if(this.y == 0) {
    won();
    return true;
  }
  return false;
}

function randomKeyBinds(box) {
  var el = document;
  el.onkeyup = function(evt) {
    evt = evt || window.event;
    b.randMove();
  };
  el.ontouchend = function(evt) {
    evt = evt || window.event;
    b.randMove();
  };
}

function forceWin(box, x) {
  setInterval(function () {box.randMove()}, x);
}

function startEverything() {
  audio.play();
  timer = setInterval(setTime, 1000);
}

document.addEventListener("DOMContentLoaded", function(event) {
  if (localStorage.completed === undefined) {
    localStorage.completed = 0;
  }
  if (probability < .5){
    probability = .51
  }
  if (localStorage.colors === undefined){
    localStorage.colors = "black,white"
  }
  printScore();
  b = new Box();
  randomKeyBinds(b);
  for (i=0; i<localStorage.clicker; i++){
    forceWin(b,1000);
  }
});

function setTime()
{
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds%60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
  var valString = val + "";
  if(valString.length < 2)
  {
    return "0" + valString;
  }
  else
  {
    return valString;
  }
}

function getWallpaper(){
  if (localStorage.completed >= 1){
    window.open('assets/images/endurance_1920x1080.png');
    localStorage.completed = Number(localStorage.completed) - 1;
    printScore();
  }
  else{
    window.alert("You don't have enough stuffs")
  }
}

function getClickerOne(){
  if (localStorage.completed >= 10){
    localStorage.clicker = 1
    localStorage.completed = Number(localStorage.completed) - 10
    location.reload()
  }
  else{
    window.alert("You don't have enough stuffs")
  }
}
