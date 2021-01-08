export const defaultEquals = (a, b)=>{
    return a === b
}

//  节点的单独节点属性 哈哈
export const Node = class {
    constructor(element){
        this.element = element;
        this.next = null;
    }
}