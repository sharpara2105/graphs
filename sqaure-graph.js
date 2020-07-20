var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//1. create a suitable data structure :

graph = [
    a = { 
        name : 'a',
        adjNodes : {
            a : 0 ,
            b : 120,
            c : 100,
            d : 150,
            e :0
    }
},
    b = { 
        name : 'b',
        adjNodes : {
            a : 120,
            b : 0,
            c : 0,
            d : 160,
            e : 0
        }
    },

    c = {
        name : 'c',
        adjNodes : {
            a : 100,
            b : 0,
            c : 0,
            d : 130,
            e : 0
        }
    },

    d = {
        name : 'd',
        adjNodes : {
            a : 150,
            b : 160,
            c : 130,
            d : 0,
            e : 0
        }
    },

    e = {
        name : 'e',
        adjNodes : {
            a : 0,
            b : 0,
            c : 0,
            d : 0,
            e : 0
        }
    }

];


var x1 = x2= 200;
var y1 = y2= 200;
var radius = 20;
var movex;
var movey;
var nodeName = [];


var c = canvas.getContext('2d');

for(var i =0 ; i < graph.length ; i++) {
    var adjNode = {...graph[i].adjNodes};
    var char = graph[i].name;
    const j = nodeName.findIndex(function(nodeName) {
                return nodeName.name === char ;
            });
 if(j==-1) {
   
    movex = x1;
    movey = y1;
    
    c.beginPath();
    c.arc(movex,movey,radius,0,2 * Math.PI,false);
    c.strokeStyle = 'red';
    c.stroke();

    nodeName.push({name:graph[i].name, x: movex, y: movey});
    x1 += 50;
    y1 += 50;
 }
 else {
     movex = nodeName[j].x;
     movey = nodeName[j].y;
 }
    y2 = movey;   //movey
    
    for (let key in adjNode) {
        var length = adjNode[key];
        if (adjNode[key]) {
            const s = nodeName.findIndex(function(nodeName){
                        return nodeName.name === key;
            });
            if(s == -1) {
                x2 = movex+2*radius+length;
                c.beginPath();
                c.moveTo(movex,movey);
                c.lineTo(x2,y2);
                c.strokeStyle = 'pink';
                c.stroke();
                c.beginPath();
                c.arc(x2,y2,radius,0,2 * Math.PI,false);
                c.strokeStyle = 'red';
                c.stroke();
                // c.fillStyle = 'red';
                // c.fill();

                nodeName.push({name:key,x:x2,y:y2});
                

            }
            else {
                x2 = nodeName[s].x;
                y2 = nodeName[s].y;

                c.beginPath();
                c.moveTo(movex,movey);
                c.lineTo(x2,y2);
                c.strokeStyle = 'blue';
                c.stroke();
            }  
            y2 += (Math.random())*7 +3; 
            
            const m = graph.findIndex(function(graph) {
                return graph.name === key;   //stringify krne ki koi lod ni hai idhr !!
            } );
            // console.log(Object.keys(i.adjNodes));
            var comp = graph[m].adjNodes;
            for (let key in comp) {
                if (key===graph[i].name) {
                    (graph[m].adjNodes)[key] = 0;
                    
                }
                
            }
        }
    }
    
}

// console.log(nodeName);

// console.log(graph);



 






      