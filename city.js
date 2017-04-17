function city(x,y,name){
    this.name = name;
    this.x=x;
    this.y=y;
    this.parent;
    this.children = [];
    this.asChildVisited = false;
    
    this.displayVertex = function(){
        fill(255);
        //noFill();
        stroke(255);
        ellipse(this.x, this.y, 16, 16);
        noStroke();
        fill(255,0,0);
        textAlign(CENTER,CENTER);
        textStyle(BOLD)
        text(this.name, this.x, this.y);
    }
}