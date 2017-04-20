var vertices = [];
var edges = [];
var preOrderWalk = [];
var preOrderTraversalPath = [];
var isTSPDone = "true";
var index1=0, index2=1;
var p4;

function setup() {
    h1 = createElement("h1","Visualization of TSP with Dynamic programming");
    h1.style('text-align:left');
    var p1 = createP("Please click on the canvas to plot the cities. It will draw connected graph automatically as you can observe in canvas.");
    var p2 = createP("Once you are done with generating Cities, you can click on Find MST button to get MST.");
    var p3 = createP("Once Algorithm generate MST, FIND TSP button will be activated. Click on it one by one and It will walk through MST in preOrderTraversal and connect the vertices if required. Final Solution is in green color edges.");    
    createP("");
    p4 = createElement("p","Darshan");
    createP("");
    createCanvas(640, 360);
    createP("");
    buttonStartMST = createButton("Find MST");
    buttonStartTSP = createButton("Find TSP");
    buttonStartMST.mousePressed(buttonStartMSTPressed);
    buttonStartTSP.mousePressed(buttonStartTSPPressed);
}

function buttonStartMSTPressed(){
    calculateMST();
    preOrderWalk = [];
    calculatePreOrderPath(vertices[0]);
    console.log(preOrderWalk);
    preOrderTraversalPath = [];
    for(var i=0;i<preOrderWalk.length;i++){
        preOrderTraversalPath.push(preOrderWalk[i].name);
    }
    preOrderTraversalPath.push(preOrderWalk[0].name);
    isTSPDone = "false"; 
    
}

function buttonStartTSPPressed(){
    var c = color('#0f0');
    if(index2 < preOrderWalk.length){
        var index = findEdgeIndex(preOrderWalk[index1],preOrderWalk[index2]);
        if(edges[index].show == true){
            edges[index].color = c;
            index1++;
            index2++;
        }
        else{
            edges[index].show = true;
            edges[index].color = c;
            index1++;
            index2++;
        }
    }
    else{
        var index = findEdgeIndex(preOrderWalk[index1],preOrderWalk[0]);
        edges[index].show = true;
        edges[index].color = c;
        isTSPDone = "true"; 
    }
}

function mousePressed() {
    
    if(0 <= mouseX && mouseX <= width && 0 <= mouseY && mouseY <= height){
        //var v = createVector(mouseX, mouseY);
        index1=0, index2=1;
        var v = new city(mouseX,mouseY,vertices.length);
        vertices.push(v);
        for(var i=0;i<vertices.length;i++){
            vertices[i].parent = null;
            vertices[i].children = [];
        }
        edges = [];
        for(var i=0;i<vertices.length;i++){
            for(var j=0;j<vertices.length;j++){
                if(i!=j){
                    var v1 = vertices[i];
                    var v2 = vertices[j];
                    edges.push(new edge(vertices[i],vertices[j],floor(dist(v1.x,v1.y,v2.x,v2.y))));
                }
            }
        }
    }
}

function draw() {
    p4.html("Here is our PreOrderTraversalPath from MST : " + preOrderTraversalPath);
    background(51);
    if(isTSPDone == "true"){
        buttonStartTSP.attribute("disabled", "true");
    }
    if(isTSPDone == "false"){
        buttonStartTSP.removeAttribute("disabled");
        //buttonStartTSP.setAttribute("disabled", "false");
    }
    for(var i=0;i < edges.length; i++){
        edges[i].displayEdge();
    }
    for (var i = 0; i < vertices.length; i++) {
        vertices[i].displayVertex();
    }
    
}   

function hideEdges(){
    for(var i=0;i<edges.length;i++){
        edges[i].show = false;
    }
}

function calculatePreOrderPath(startCity){
    //console.log(startCity.name + "-");
    if(startCity.children.length == 0 || startCity.children == null ){
        console.log(startCity.name);
        preOrderWalk.push(startCity);
        return;
    }
    else{
        console.log(startCity.name);
        preOrderWalk.push(startCity);
        for(var i=0;i<startCity.children.length;i++){
            var child = startCity.children[i];
            calculatePreOrderPath(child);
        }
        return;
    }
}

function calculateMST(){
    hideEdges();
    //background(51);
    var reached = [];
    var unreached = [];

    for (var i = 0; i < vertices.length; i++) {
        unreached.push(vertices[i]);
    }
    
    reached.push(unreached[0]);
    unreached.splice(0, 1);

    while (unreached.length > 0) {
        var record = 100000;
        var rIndex;
        var uIndex;
        for (var i = 0; i < reached.length; i++) {
            for (var j = 0; j < unreached.length; j++) {
                var v1 = reached[i];
                var v2 = unreached[j];
                var d = floor(dist(v1.x, v1.y, v2.x, v2.y));
                if (d < record) {
                    record = d;
                    rIndex = i;
                    uIndex = j;
                }
            }
        }
        var ans = findEdgeIndex(reached[rIndex],unreached[uIndex]);
        edges[ans].show = true;
        reached.push(unreached[uIndex]);
        unreached.splice(uIndex, 1);
    }
    
    settingParentsAndChildrenInMST();
    console.log(vertices);
}

function settingParentsAndChildrenInMST(){
    for(var i=0; i<edges.length; i++){
        if(edges[i].show == true){
            edges[i].vertex2.parent = edges[i].vertex1;
            edges[i].vertex1.children.push(edges[i].vertex2);
        }
    }
}

function findEdgeIndex(vertex1,vertex2){
    for(var i=0;i<edges.length;i++){
        if(edges[i].name == str(vertex1.name)+str("-")+str(vertex2.name)){
            return i;
        }
    }
    
}