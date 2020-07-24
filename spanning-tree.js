//Prim's and Kruskal are two algorithms which are used to calculate minimum spanning Tree,which works on the greedy approach
// Both the cases will be handled simultaneously : creation of spanning tree that would be minimum.
// I will try to implement **PRIM'S ALGORITHM** depending on my understanding.

//Initialize the canvas element

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

// Note:map insertion is in FIFO order.
// the idea that i should delete the duplicate node need not be used as it will strip the selection of the
//node 2 to node 1 as only node1 to node2 will be chosen, however once node1 to node2 or node2 to node 1 has 
//been selected , we need not traverse node2 to node1 and can make it's length 0 so we are not repeating the
//edge again in our spanning tree.

//STEP1 : Declare and intialize all the data structures needed 

const edge = new Map();
edge.set('edge1',{length :100 , node1 : 'a', node2 : 'b'});
edge.set('edge2',{length :50 , node1 : 'a', node2 : 'c'});
edge.set('edge3',{length :100 , node1 : 'b', node2 : 'a'});
edge.set('edge4',{length :40 , node1 : 'b', node2 : 'c'});
edge.set('edge5',{length :80 , node1 : 'b', node2 : 'd'});
edge.set('edge6',{length :70 , node1 : 'b', node2 : 'e'});
edge.set('edge7',{length :50 , node1 : 'c', node2 : 'a'});
edge.set('edge8',{length :40 , node1 : 'c', node2 : 'b'});
edge.set('edge9',{length :60 , node1 : 'c', node2 : 'd'});
edge.set('edge10',{length :20 , node1 : 'c', node2 : 'f'});
edge.set('edge11',{length :80 , node1 : 'd', node2 : 'b'});
edge.set('edge12',{length :60 , node1 : 'd', node2 : 'c'});
edge.set('edge13',{length :110 , node1 : 'd', node2 : 'e'});
edge.set('edge14',{length :90 , node1 : 'd', node2 : 'f'});
edge.set('edge15',{length :70 , node1 : 'e', node2 : 'b'});
edge.set('edge16',{length :110 , node1 : 'e', node2 : 'd'});
edge.set('edge17',{length :30 , node1 : 'e', node2 : 'f'});
edge.set('edge18',{length :100 , node1 : 'e', node2 : 'g'});
edge.set('edge19',{length :20 , node1 : 'f', node2 : 'c'});
edge.set('edge20',{length :90 , node1 : 'f', node2 : 'd'});
edge.set('edge21',{length :30 , node1 : 'f', node2 : 'e'});
edge.set('edge22',{length :120 , node1 : 'f', node2 : 'g'});
edge.set('edge23',{length :100 , node1 : 'g', node2 : 'e'});
edge.set('edge24',{length :120 , node1 : 'g', node2 : 'f'});

var near = [
    {
        nodeName : 'a',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'b',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'c',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'd',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'e',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'f',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
    {
        nodeName : 'g',
        adjNodes :[],
        counter : 1024,
        x : 100,
        y : 100
    },
];

var drawn = [];
var minCost = 0;

//STEP2.1: get the first edge (minimum edge of all):
var minLength = edge.get('edge1').length;
var compKey;
for (let key of edge.keys()) {
//note:put '=' for corner edge case that is, if your first element has the minimum length it will never hit the if condition and hence key will be assigned to compkey and hence will return undefined key
  if (edge.get(key).length <= minLength) {     
      minLength = edge.get(key).length;
      compKey = key;  
    } 
}
//STEP 2.2 : update minCost
minCost += minLength;
//STEP 2.3: Intialize first 2 nodes to begin with
var node1 = edge.get(compKey).node1;
var node2 = edge.get(compKey).node2;

//--------***********************Helper functions********************----------------------------------------------

function checkIndex(structure,value) {
    const temp1=structure.findIndex(function(structure) {
    return structure.nodeName === value ;
    });
    return temp1;
}
function drawCircle(x,y,radius,node) {
    c.beginPath();
    c.arc(x,y,radius,0,2 * Math.PI,false);
    c.strokeStyle = 'red';
    c.stroke();
    c.fillStyle = 'red';
    c.fill();
    //label:
    c.lineWidth=1;
    c.fillStyle="#CC00FF";
    c.lineStyle="#ffff00";
    c.font="18px sans-serif";
    c.fillText(node, x+radius, y);
}
function drawEdge(movex,movey,x2,y2,color) {
    c.beginPath();
    c.moveTo(movex,movey);
    c.lineTo(x2,y2);
    c.strokeStyle = color;
    c.stroke();
}
function getAdjacentNodes(node) {
    for(let value of edge.values()) {
        if(value.node1 == node) {
            const temp1=near.findIndex(function(near) {
                return near.nodeName === value.node1 ;
                });
            near[temp1].adjNodes.push({node:value.node2, length: value.length});
            
        }
    }
    
}
function checkEntry(value) {
    const temp1=drawn.findIndex(function(drawn) {
    return drawn === value ;
    });
    return temp1;
}
//---------------------------------------------------------------------------------------

//STEP 3: Drawing 
// STEP 3.1 :Intialize positions
var x1 = 200;
var y1 = 200;
var radius = 20;

var movex = x1;
var movey = y1;

x2 = movex + radius*2 + minLength;
y2 = movey;

//STEP 3.2 : Draw
drawCircle(x1,y1,radius,node1);
drawEdge(movex,movey,x2,y2,'pink');
drawCircle(x2,y2,radius,node2);

//STEP 3.3 : update 'near' array values
const i = checkIndex(near,node1);
const j = checkIndex(near,node2);
near[i].counter = 0;
near[j].counter = 0;
near[i].x = x1;
near[i].y = y1;
near[j].x = x2;
near[j].y = y2;

//STEP 3.4 : make an entry that these nodes are drawn:
drawn.push(node1);
drawn.push(node2);

// STEP 3.5 : Get the adjacent nodes for the starting selected edge 'node1' and 'node2' in the near array adjNodes :
getAdjacentNodes(node1);
getAdjacentNodes(node2);


// STEP4 : For all the other items ***************************************************************
// Note: Implementing Prim's algorithm here.
//Get all the adjacent nodes where counter's value = 0 and their corresponding near index numbers;

//Find minimum dynamically
//STEP 4.1 : get the selectedValue (minimum value) and its corresponding node (selectedNode).

function  mainAlgo() {   
    const zeroCounter = near.findIndex(function(near) {
                return near.counter != 0 ;
                });
    
    if (zeroCounter != -1) {

        var selectedValue = 1024;
        var selectedNode=null;

        for (var l = 0 ; l < near.length ; l ++) {
            if(near[l].counter === 0) {
                for ( var s = 0; s < near[l].adjNodes.length ; s ++) {
                    
                    if (near[l].adjNodes[s].length < selectedValue && checkEntry(near[l].adjNodes[s].node) === -1 ) {
                        selectedValue = near[l].adjNodes[s].length;
                        selectedNode = near[l].adjNodes[s].node;
                    }
                }  
            }  
        }
//draw node and edge function here :
//STEP 4.2 : Before pushing the selected node in drawn , get the last entry to get the relative positions.
        var relx;
        var rely;
        var relativeNode = drawn[drawn.length-1];
        const relPosition =checkIndex(near,relativeNode);

//STEP 4.3 : set relx,rely,x2,y2 
        relx = near[relPosition].x;
        rely = near[relPosition].y;
        x2 = relx + 2*radius + selectedValue;
        y2 = rely +(Math.random())*7 +3; 

//STEP 4.3.1 : Draw
        drawEdge(relx,rely,x2,y2,'pink');
        drawCircle(x2,y2,radius,selectedNode);

// STEP 4.4 : Make an entry to the drawn array.
        drawn.push(selectedNode);
// STEP 4.5 : Update minCost
        minCost += selectedValue;

// STEP 4.6 : Make counter of the corresponding node in the near array as '0'(recusrion stopping condition) :
        const counterIndex = checkIndex(near,selectedNode);
        near[counterIndex].counter = 0;
// STEP 4.7 : Update corresponding x,y 
        near[counterIndex].x = x2;
        near[counterIndex].y = y2; 

// STEP 4.8 : Get all the adj nodes again:
        getAdjacentNodes(selectedNode);

// STEP 4.9 : Keep calling mainAlgo() till all the (near.counter)'s become '0'
        mainAlgo(); 
    }
}
//-------------------*******************************-------------------------------

mainAlgo();
console.log(near);
console.log(minCost);


















