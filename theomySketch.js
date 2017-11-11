// Most of this is by Daniel Shiffman
// http://codingtra.in


// Steering Text Paths
// I added the functionality to make the particles change into another text and changed the positioning of the text to always be in the middle of the canvas

var font;
var vehicles = [];

//var texts = ['Welcome', 'aboard', 'the', 'coding', 'train', '!!!'];
//var nextT = 0;
var formattedTime = "00:00:00";
var prevSec = -1;
var maxChangeForce = 0;
var insText = '';

var instructions = [];

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
    createCanvas(750, 400);
    background(51);
    fill('#FFFFFF');
    textFont(font,36);
    text('38 F New York Partly Cloudy N 7 mph', 10, 50);

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

    var boundsIns = font.textBounds(insText, 0, 0, 30);
    var posxIns = width / 2 - boundsIns.w / 2;
    var posyIns = height / 6 + boundsIns.h / 2;

    var insAr = split(insText, ' ');

    for (var i = 0; i < insAr.length; i++) {
        var bounds2 = font.textBounds(insAr[i], 0, 0, 30);
        var posx2 = posxIns;
        var posy2 = posyIns;

        posxIns += bounds2.w + 10;

        var points2 = font.textToPoints(insAr[i], posx2, posy2, 30, {
            sampleFactor: 0.3
        });

        for (var j = 0; j < points2.length; j++) {
            var pt = points2[j];
            var v = new Vehicle(pt.x, pt.y, 3);
            instructions.push(v);
        }
    }
}

function draw() {
    background(51);
  
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
  //if (hours > 12) { hours = hours - 12;}
  var minutes = minute();
  var seconds = second();
  
  if(seconds != prevSec) {
    prevSec = seconds;
    hours = nf(hours, 2, 0);
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


  