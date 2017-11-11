// Most of this is by Daniel Shiffman
// http://codingtra.in


// Steering Text Paths
// I added the functionality to make the particles change into another text and changed the positioning of the text to always be in the middle of the canvas

var font;
var vehicles = [];
var canvasHeight = 400;
var canvasWidth = 750;

//var texts = ['Welcome', 'aboard', 'the', 'coding', 'train', '!!!'];
//var nextT = 0;
var formattedTime = "00:00:00";
var prevSec = -1;
var maxChangeForce = 0;

var instructions = [];

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(51);

    var bounds = font.textBounds(formattedTime, 0, 0, 192);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(formattedTime, posx, posy, 192, {
        sampleFactor: 0.1
    });

    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }


}

function draw() {
    background(51);
    stroke(255);
    strokeWeight(3);
    textFont(font,36);
    textAlign(CENTER);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();

    var dateString = days[d.getDay()] + ', ' + months[month()-1] + ' ' + day() + ', ' + year();

    text(dateString, canvasWidth/2, 50);

    if (d.getSeconds() == 0) {
        $.simpleWeather({
          location: '',
          woeid: '23689635',
          unit: 'f',
          success: function(weather) {
            var weatherString = weather.temp + ' ' + weather.units.temp;
            text(weatherString, canvasWidth/2, canvasHeight-30);

            var clothingString = 'Winter jacket';
            textAlign(LEFT);
            text(clothingString, 10, canvasHeight-30);
          },
          error: function(error) {
            wxText = 'Cannot load weather';
          }
        });
    }



    calcTime();

    for (var i = 0; i < instructions.length; i++) {
        var v = instructions[i];
        v.behaviors();
        v.update();
        v.show();
    }

    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}

function calcTime() {
  var hours = hour();
  if (hours > 12) { hours = hours - 12;}
  var minutes = minute();
  var seconds = second();
  
  if(seconds != prevSec) {
    prevSec = seconds;
    //hours = nf(hours, 2, 0);
    minutes = nf(minutes, 2, 0);
    seconds = nf(seconds, 2, 0);
    updateText(hours + ":" + minutes + ":" + seconds);
  }
}

function updateText(newText) {
    //nextT++;
    //if (nextT > texts.length - 1) {
        //nextT = 0;
    //}

    formattedTime = newText;
    var bounds = font.textBounds(formattedTime, 0, 0, 162);
    var posx = width / 2 - bounds.w / 2;
    var posy = height / 2 + bounds.h / 2;

    var points = font.textToPoints(formattedTime, posx, posy, 162, {
        sampleFactor: 0.1
    });

    if (points.length < vehicles.length) {
        var toSplice = vehicles.length - points.length;
        vehicles.splice(points.length - 1, toSplice);

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    } else if (points.length > vehicles.length) {

        for (var i = vehicles.length; i < points.length; i++) {
            var v = vehicles[i - 1].clone();

            vehicles.push(v);
        }

        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }

    } else {
        for (var i = 0; i < points.length; i++) {
            vehicles[i].target.x = points[i].x;
            vehicles[i].target.y = points[i].y;

            var force = p5.Vector.random2D();
            force.mult(random(maxChangeForce));
            vehicles[i].applyForce(force);
        }
    }
}


  