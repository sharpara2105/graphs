var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

//rectangle

// c.fillStyle = "rgba(255,0,0,0.1)";
// c.fillRect(100,100,100,100);
// c.fillStyle = "rgba(0,0,255,0.1)";
// c.fillRect(400,100,100,100);
//line

// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300,100);
// c.lineTo(400,300);
// c.strokeStyle = "pink";
// c.stroke();



//multiple circle:
// for (var i =0; i <10 ; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     console.log(x);
//     console.log(y);

//     c.beginPath();
//     c.arc(x,y,30,0,Math.PI *2,false);
//     c.strokeStyle = 'rgba(0,0,255,math.random()';
//     c.stroke();  
// }

//single arc
var mouse = {
    x : undefined,
    y : undefined
}

var maxRadius = 40;
var minRadius = 2;

var colorArray = [
    '#C09CD9',
    '#7D60A6',
    '#353FF2',
    '#A69C0F',
    '#D9CC1E'
];

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove',
 function(event) {
     mouse.x = event.x;
     mouse.y = event.y;
     console.log(mouse);
 });


function Circle(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        if(mouse.x-this.x < 50 && mouse.x-this.x > -50
            && mouse.y -this.y < 50 && mouse.y-this.y > -50) {
                if(this.radius < maxRadius) {
                    this.radius += 1;
                }
            
        }
        else if(this.radius > minRadius) {
            this.radius -=1;
        }
        c.arc(this.x,this.y,this.radius,0,Math.PI *2,false);
        c.strokeStyle = 'blue';
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
        
   

    }
    this.update = function() {
        if (this.x+ this.radius >innerWidth || this.x-this.radius <0) {
            this.dx = -this.dx;
        }
        if(this.y+this.radius > innerHeight || this.y-this.radius <0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
        
    }
}

var circleArray = [] ;
for (var i =0; i <=800 ; i++) {
    var x = Math.random() * (innerWidth-2*radius)+radius;
    var y = Math.random() * (innerHeight-2*radius)+radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = Math.random() * 3 + 1;
 circleArray.push(new Circle(x,y,dx,dy,radius));
}

// var circle = new Circle(200,200,3,4,30);


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i =0; i < circleArray.length ; i++) {
        circleArray[i].update();
    }
    
    
}
animate();