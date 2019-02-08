var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

//load images

var floor = new Image();
var piece = new Image();
var obs = new Image();
var bg = new Image();
var good = new Image();


floor.src = "images/floor10.png";
piece.src = "images/piece7.png";
obs.src = "images/obs2.png";
bg.src = "images/bg2.png";
good.src = "images/good.png";


// variables
pX = 170;
pY = 591;
right = 0;
left = 0;
oX = 120;
oY = 0;
score = 0;

// obstacle coordinates

var obstacle = [];

obstacle[0] = {
  x : 80,
  y : canvas.height - canvas.height - 50
};

// good coordinates

var point = [];

point[0] = {
  x : 300,
  y : canvas.height - canvas.height - 50
};

// on load function

function draw() {

  var wid = window.innerWidth ;
  var hei = window.innerHeight;
  ctx.canvas.width = bg.width;
  ctx.canvas.height = bg.height;

  ctx.drawImage(bg,0,0);

  for (var i = 0; i < obstacle.length; i++) {
    ctx.drawImage(obs,obstacle[i].x,obstacle[i].y);

    obstacle[i].y +=3;

    if (obstacle[i].y >= 130 && obstacle[i].y <= 131) {
      obstacle.push({
        x : Math.floor(Math.random()*canvas.width) - 5,
        y : canvas.height - canvas.height - 50
      });
    }

    // collision
    if( pY - piece.height >= obs.y && obstacle[i].y >= pY - piece.height && obstacle[i].y <= pY - piece.height + 1 && pX + piece.width >= obstacle[i].x && pX <= obstacle[i].x) {
    console.log("wad");
    location.reload(); // reload the page
    }

    if( pX + piece.width >= obstacle[i].x && pX <= obstacle[i].x) {
    //console.log("yay");
    //location.reload(); // reload the page
    }

    if (obstacle[i].y > canvas.height) {
        //console.log("y");
        obstacle.splice(i, 1);
    }
  }

  // NEWW
  for (var i = 0; i < point.length; i++) {
    ctx.drawImage(good,point[i].x,point[i].y);

    point[i].y +=3;

    if (point[i].y >= 190 && point[i].y <= 191) {
      point.push({
        x : Math.floor(Math.random()*canvas.width) - 5,
        y : canvas.height - canvas.height - 50
      });
    }

    // collision
    if( pY - piece.height >= good.y && point[i].y >= pY - piece.height && point[i].y <= pY - piece.height + 1 && pX + piece.width >= point[i].x && pX <= point[i].x) {
    console.log("wad");
    score += 1;
    }

    if (point[i].y > canvas.height) {
        //console.log("y");
        point.splice(i, 1);
    }
  }

  ctx.font = '25px roboto';
  ctx.fillText(score, 10, 20);
  ctx.drawImage(floor,0, bg.height - floor.height);
  ctx.drawImage(piece, pX, pY);

  // intervals
  requestAnimationFrame(draw,10);
  requestAnimationFrame(cl2, 10);
  requestAnimationFrame(cl, 10);
  requestAnimationFrame(out, 10);
  requestAnimationFrame(obsd, 10);
}

// buttons
function cl2go() {
  right += 2;
}
function cl2stop() {
  right = 0;
}
function cl2() {
  pX += right;
}
function clgo() {
  left += 2;
}
function clstop() {
  left = 0;
}
function cl() {
  pX -= left;
}


// borders
function out() {
  if (pX > canvas.width - 80) {
     pX = canvas.width - 80;
  }
  if (pX < 0) {
    pX = 0;
  }
}

// obstacle going down
function obsd() {
  oY += 4;
}
