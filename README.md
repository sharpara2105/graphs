***********************Documentation in progress********************
Note:
leaf : means just one edge, 
forest : if a single node disconnected to other tree/graph.

############  update file name in index.html to run intended js files.  ###################
------------- please find description of all the javascript files below: --------------------

1. Agenda : Learn Canvas
File-name : 'canvas-fun-bubbles.js'
Description : It's a fun implementations of basic shapes. when you hover mouse pointer over the canvas bubbles/circles enlarges and then shrinks as you move away.
can also see the positions changing in the console.


2. Agenda : Create a graph.
File-name : 'create-graph.js'
Grpah Type : undirected weighted.
Traversal : BFS
using objects instead of map.

This is about creating a graph given the nodes and edges in a data structure.
( no duplication of edges between the nodes is handled and hence there is a single path to every node).


(i) how should i define my data structure that can help me in 'traversal', 'access', 'search' and  'get' operations.
(ii) problems i faced while retrieving through object data structure and later reseacrhed that there is a better alternative: a built in type which can be better used for these kind of situations and we can also dynamically assign our values in it : "Map".
(iii) There are various differences depending on the data structure used. Hence should compare and contrast preferences of one data stucture over the other
(iv) Way of creation and intialization of our data structure is important:
'.incldes' method over array was returning false : it was probably because my array was not initialized in a correct way : will have to check . So, i used 'findIndex' method instead.
(iv) one more alternative to the temp array that i was using for array is 
"queue"
 which makes sense if i need ordered vertices and that's my intention of work the whole time.
 (v) case for a disconnected node is taken care of (called as forest : that aloof node drawn on the canvas!)


3.  Agenda : Create a minHeap
File-name : 'min-heap.js'
Description : Transforming a given array into a minHeap in o(n) time complexity.

4. Agenda : create a spaning tree by implementing prim's algo
 Grpah Type : undirected weighted.
 Data Structure : Map and Array of objects
 File Name : 'spanning-tree.js'

 Comments have been added in the file itself : 'spanning-tree.js'


 5. Extra files with no specific use case : 'helper-functions.js',
                                         ' rough-work.js'