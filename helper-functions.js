
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

