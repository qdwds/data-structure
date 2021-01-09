//  其实都是通过调用双向链表上面的方法；    继承的作用；
class StackLinekdList{
    constructor(){
        this.items = new DoublyLinkedList();
    }
    post(element){
        this.items.puss(element)
    }
    pop(){
        if(this.isEmpty()){
            return null;
        }
        return this.items.removeAt(this.size() - 1);    //  从链表尾部移除一个元素
    }
    peek(){
        if(this.isEmpty()){
            return null;
        }
        return this.items.getElementAt(this.size() - 1).element;
    }
    isEmpty(){
        return this.items.isEmpty();
    }
    size(){
        return this.items.size();
    }
    clear(){
        return this.items.clear();
    }
    toString(){
        return this.items.toString();
    }
}