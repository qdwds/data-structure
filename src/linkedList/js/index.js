//  判断两个值是否对等
const defaultEquals = (a, b) => {
    return a === b
}

/**
 * 
 * 单向链表节点
 */
const Node = class {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

/**
 * 双向链表节点
 */
class DoublyNode extends Node{
    constructor(element,next,prev){
        super(element,next);
        this.prev = prev || null;
    }
}

function defaultSort(a,b){
    if(a === b){
        return 0 ;
    }else{
        return a < b ? 1 : -1;
    }
}

function getIndexNextSortedElement(element){
    let current = this.head;
    let i = 0;
    for (; i < this.size() &&current; i++) {
        const comp = this.sort(element,current.element);
        if(comp = -1){
            return i 
        }
        current = current.next;
    }
    return i;
}