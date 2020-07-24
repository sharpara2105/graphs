//Prim's and Kruskal are two algorithms which are used to calculate minimum spanning Tree : This is a greedy approach that we are going to follow.
// Both the cases will be handled simultaneously : creation of spanning tree that would be minimum.
// I will try to develop a variant or the same algoritgm depending on my understanding.
// will try to follow the advanced data structure so that i am enabled with better understanding of the map
//data structure as well in the process.

// First of all, let's create the representation of our graph. I have 2 options: adjacency list or matrix.
//let's see what works best.

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

// map insertion is in FIFO order
const graph = new Map();
graph.set('a',{a:0, b:1, c:5,d:0,e:0,f:0,g:0});
graph.set('b',{a:1, b:0, c:4,d:8,e:7,f:0,g:0});
graph.set('c',{a:5, b:4, c:0,d:6,e:0,f:2,g:0});
graph.set('d',{a:0, b:8, c:6,d:0,e:11,f:9,g:0});
graph.set('e',{a:0, b:1, c:5,d:0,e:0,f:0,g:0});
graph.set('f',{a:0, b:0, c:2,d:9,e:3,f:0,g:12});
graph.set('g',{a:0, b:0, c:0,d:0,e:10,f:12,g:0});

// the idea that i should delete the duplicate node need not be used as it will strip the selection of the
//node 2 to node 1 as only node1 to node2 will be chosen, however once node1 to node2 or node2 to node 1 has 
//been selected , we need not traverse node2 to node1 and can make it's length 0 so we are not repeating the
//edge again in our spanning tree.

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


var minCost = 0;
var minLength = edge.get('edge1').length;
var compKey;
for (let key of edge.keys()) {

  if (edge.get(key).length <= minLength) {     //put '=' for corner edge case that is, if your first element has the minimum length it will never hit the if condition and hence key will be assigned to compkey and hence will return undefined key.
      minLength = edge.get(key).length;
      compKey = key;  
  }
}
minCost += minLength;
var node1 = edge.get(compKey).node1;
var node2 = edge.get(compKey).node2;




//let's draw the first edge now :
var x1 = 200;
var y1 = 200;
var radius = 20;
var movex = x1;
var movey = y1;

x2 = movex + radius + minLength;
y2 = movey;

// draw node1
c.beginPath();
c.arc(x1,y1,radius,0,2 * Math.PI,false);
c.strokeStyle = 'red';
c.stroke();

//draw edge
c.beginPath();
c.moveTo(movex,movey);
c.lineTo(x2+radius,y2);
c.strokeStyle = 'pink';
c.stroke();

//draw node2
c.beginPath();
c.arc(x2+radius,y2,radius,0,2 * Math.PI,false);
c.strokeStyle = 'red';
c.stroke();


//make an entry that these nodes are drawn and possibly their relative position :
var drawn = [];

drawn.push(node1);
drawn.push(node2);


var near = [
    {
        nodeName : 'a',
        adjNodes :[],
        counter : 1024,
        // x : x1,
        // y : y1
    },
    {
        nodeName : 'b',
        adjNodes :[],
        counter : 1024,
        // x : x2,
        // y :y2
    },
    {
        nodeName : 'c',
        adjNodes :[],
        counter : 1024,
        // x : 0,
        // y : 0
    },
    {
        nodeName : 'd',
        adjNodes :[],
        counter : 1024,
        // x : 0,
        // y : 0
    },
    {
        nodeName : 'e',
        adjNodes :[],
        counter : 1024,
        // x : 0,
        // y : 0
    },
    {
        nodeName : 'f',
        adjNodes :[],
        counter : 1024,
        // x : 0,
        // y : 0
    },
    {
        nodeName : 'g',
        adjNodes :[],
        counter : 1024,
        // x : 0,
        // y : 0
    },
];

function checkIndex(structure,value) {
    const temp1=structure.findIndex(function(structure) {
    return structure.nodeName === value ;
    });
    return temp1;
}
const i = checkIndex(near,node1)
near[i].counter = 0;
const j = checkIndex(near,node2)
near[j].counter = 0;


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
// //get the adjacent nodes for the starting selected edge; node1 : 'a'
getAdjacentNodes(node1);
//now get the adjacent node for the starting selected edge; node2 : 'b'
getAdjacentNodes(node2);


// //----main algo------------*******************************-------------------------------

// //check if there is already an entry of this node in the drawn array.

function checkEntry(value) {
    const temp1=drawn.findIndex(function(drawn) {
    return drawn === value ;
    });
    return temp1;
}



//get all the adjacent nodes where counter's value = 0 and their corresponding near index numbers;
//can't save will have to find minimum on the fly alongside of that.

function  mainAlgo() {
    
const temp2 = near.findIndex(function(near) {
              return near.counter != 0 ;
            });
    

if (temp2 != -1) {

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





// //-----------------------draw node and edge function here -----------------------

// // make an entry to the drawn array.
drawn.push(selectedNode);
minCost += selectedValue;


// // make counter of the corresponding node in the near array as '0' :
const counterIndex = checkIndex(near,selectedNode);
near[counterIndex].counter = 0;


// //get all the adj nodes again :

getAdjacentNodes(selectedNode);


mainAlgo(); //keep calling mainAlgo() till all the (near.counter)'s become '0'

}
}


//-------------------*******************************-------------------------------


mainAlgo();

console.log(near);
console.log(minCost);





/*
//get the start node : minimum edge length : using array which is extra space o(n) so, going to follow the in-place approach abouve.
edgeLength =[];

for (let value of edge.values()) {
    edgeLength.push(value.length);
  }

  // 1. finding min element by creating a minElement variable and comparison.
var minElement = edgeLength[0];
function findMin(structure) {
    for (var i =1 ; i < structure.length ; i++) {
        if(structure[i] < minElement) {
            minElement = structure[i];
        }
    }
   return minElement; 
}
 
var sourceEdge = findMin(edgeLength);

    */


//finding minimum element by creating a min heap and extracting the first element.
//let's create a min heap:
/*
lengthArray = [5,4,8,7,6,2,1]

function minHeapify(structure,i) {
    var smallest = i;
    var l = 2*i+1 ;
    var r = 2*i+2;
    if (l < structure.length && structure[l]<structure[i]) {
        smallest = l;
    }
    if( l < structure.length && structure[r]<structure[smallest]) {
        smallest = r;
    }
    if(smallest != i) {
    //swap structure[i] with structure[smallest]
    var temp = structure[i];
    structure[i] = structure[smallest];
    structure[smallest] = temp;
    // i= smallest;
    minHeapify(lengthArray,smallest);
    }
    return structure;

}

function buildMinheap() {
    var heapSize = lengthArray.length;
    for (var i = Math.floor(heapSize/2)-1; i >= 0 ; i--) {      
       var comp= minHeapify(lengthArray,i);
    }
    console.log(comp);
}
buildMinheap();
*/











