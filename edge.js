function edge(vertex1,vertex2,distance){
    this.vertex1 = vertex1;
    this.vertex2 = vertex2;
    this.distance = distance;
    this.name = str(this.vertex1.name)+str("-")+str(this.vertex2.name);
    this.show = true;
    this.color = 255;
    
    this.displayEdge = function(){
        if(this.show == true){
            stroke(this.color);
            strokeWeight(2);
            line(this.vertex1.x, this.vertex1.y, this.vertex2.x, this.vertex2.y);
        }
    }
}