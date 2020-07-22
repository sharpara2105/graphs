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
//node 2 to node 1 as only node1 to node2 will be chosen, however once node1 to node2 or node1 to node 2 has 
//been selected , we need not traverse node2 to node1 and can make it's length 0 so we are not repeating the
//edge again in our spanning tree.

var edge = new Map();
edge.set('edge1',{length :10 , node1 : 'a', node2 : 'b'});
edge.set('edge2',{length :50 , node1 : 'a', node2 : 'c'});
edge.set('edge3',{length :40 , node1 : 'b', node2 : 'c'});
edge.set('edge4',{length :80 , node1 : 'b', node2 : 'd'});
edge.set('edge5',{length :70 , node1 : 'b', node2 : 'e'});
edge.set('edge6',{length :40 , node1 : 'c', node2 : 'b'});
edge.set('edge7',{length :60 , node1 : 'c', node2 : 'd'});
edge.set('edge8',{length :20 , node1 : 'c', node2 : 'f'});
edge.set('edge9',{length :80 , node1 : 'd', node2 : 'b'});
edge.set('edge10',{length :60 , node1 : 'd', node2 : 'c'});
edge.set('edge11',{length :110 , node1 : 'd', node2 : 'e'});
edge.set('edge12',{length :90 , node1 : 'd', node2 : 'f'});
edge.set('edge13',{length :70 , node1 : 'e', node2 : 'b'});
edge.set('edge14',{length :110 , node1 : 'e', node2 : 'd'});
edge.set('edge15',{length :30 , node1 : 'e', node2 : 'f'});
edge.set('edge16',{length :10 , node1 : 'e', node2 : 'g'});
edge.set('edge17',{length :20 , node1 : 'f', node2 : 'c'});
edge.set('edge18',{length :90 , node1 : 'f', node2 : 'd'});
edge.set('edge19',{length :30 , node1 : 'f', node2 : 'e'});
edge.set('edge20',{length :120 , node1 : 'f', node2 : 'g'});
edge.set('edge21',{length :100 , node1 : 'g', node2 : 'e'});
edge.set('edge22',{length :120 , node1 : 'g', node2 : 'f'});



var minLength = edge.get('edge1').length;
var compKey;
for (let key of edge.keys()) {

  if (edge.get(key).length <= minLength) {     //put '=' for corner edge case that is, if your first element has the minimum length it will never hit the if condition and hence key will be assigned to compkey and hence will return undefined key.
      minLength = edge.get(key).length;
      compKey = key;  
  }
}

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

//node1
c.beginPath();
c.arc(x1,y1,radius,0,2 * Math.PI,false);
c.strokeStyle = 'red';
c.stroke();

//edge
c.beginPath();
c.moveTo(movex,movey);
c.lineTo(x2+radius,y2);
c.strokeStyle = 'pink';
c.stroke();

//node2
c.beginPath();
c.arc(x2+radius,y2,radius,0,2 * Math.PI,false);
c.strokeStyle = 'red';
c.stroke();


//make an entry that these nodes are drawn and possibly their relative position :

var drawn = [];
drawn.push({node: edge.get(compKey).node1, x: x1, y :y1 });
drawn.push({node: edge.get(compKey).node2, x: x2, y :y2 });


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











