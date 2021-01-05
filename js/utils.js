export const defaultEquals = (a, b)=>{
    return a === b
}

//  
export const Node = class {
    constructor(element){
        this.element = element;
        this.next = null;
    }
}