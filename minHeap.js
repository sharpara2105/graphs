//finding minimum element by creating a min heap and extracting the first element.
//let's create a min heap:

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
