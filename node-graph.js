var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

graph = [
    {'name':'a','adjNode' : 'b'},
    {'name':'b','adjNode' : 'c'},
    {'name':'c','adjNode' : 'd'},
    {'name':'d','adjNode' : 0},

];

function nodeStructure(x,y,radius,l) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.l = l;

    this.createStructure = function () {
        console.log("function called");

        //create a line connecting two nodes

        c.beginPath();
        c.moveTo(this.x+this.radius,200);
        this.l = this.x+this.radius+this.l;
        c.lineTo(this.l,this.y);
        c.stroke();


        // create the adjacent node

        c.beginPath();
        c.arc((this.l+this.radius),this.y,this.radius,0,2*Math.PI,false);
        this.length = this.l;
        p = this.l + this.radius;
        rad = this.radius;
        if (p == 520) {
        
            q = this.y+100; 
        }
        else {
        q = this.y;
        }
        this.styling();
        
    }

    this.styling = function () {
        c.strokeStyle = 'red';
        c.stroke();
        c.fillStyle = 'red';
        c.fill();
    }
}

var p = 200;
var q = 200;
var rad = 40;
var length = 80;

//create the first node
    c.beginPath();
    c.arc(p,q,rad,0,2 * Math.PI,false);
    c.strokeStyle = 'red';
        c.stroke();
        c.fillStyle = 'red';
        c.fill();

for (var i = 0; i < graph.length;i ++) {
     console.log(p);
    if(graph[i].adjNode) {
        console.log(graph[i].name);
        var node = new nodeStructure(p,q,rad,length);
        node.createStructure();
    }
    
}







