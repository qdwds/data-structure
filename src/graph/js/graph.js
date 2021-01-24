class Graph{
    constructor(isDirected = false){
        this.isDirected = isDirected;   //  表示图是否有向  默认无
        //  使用顶点的姓名为key，邻接点为value
        this.vertices = [];     //  存储图中所有顶点名字
        this.adjList = new Dictionary() //  存储邻接表
    }

    addVertex(v){
        if(!this.vertices.includes(v)){
            this.vertices.push(v);
            this.adjList.set(v,[])  //  设置顶点v作为键对应的字典 为空数组
        }
    }

    //  要连接的两个顶点
    addEdge(v,w){
        //  连接之前要检测两个顶点是否存在
        if(!this.adjList.get(v)){
            this.addVertex(x);
        }
        if(!this.addVertex.get(w)){
            this.addVertex(w)
        }
        //  添加v到w的边
        this.adjList.get(v).push(w);
        if(!this.Dictionary){
            this.adjList.get(w).push(v) //  添加w到v的边
        }
    }

}