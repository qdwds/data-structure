class  CircularLinkedList extends LinkedList{
    constructor(equalsFn = defaultEquals){
        super(equalsFn)
    }

    //  在任意位置插入新元素
    insert(element,index){
        if(index >= 0 && index <= this.count){
            const node = new Node(element,index);
            let current = this.head;    //  过渡节点
            //  循环列表为空
            if(index === 0){
                if(this.head === null){
                    this.head = node;
                    //  设置下一个节点还是这个节点 - 循环
                    node.next = this.head;
                }else{
                    // 链表中有值，并且设置的是第一个
                    node.next = current;
                    current = this.getElementAt(this.size());
                    //  更新最后一个元素
                    this.head = node;
                    current.next = this.head;
                }
            }else{
                //  这种场景没有变化
                const previous = this.getElementAt(index - 1);
                //  设置下一个节点
                node.next = previous.next;
                previous.next = node;
            }
            this.count += 1;
            return true;
        }
        return false;
    }

    //  移除任意节点
    removeAt(index){
        if(index >= 0 && index < this.count){
            let current = this.head;
            if(index === 0){
                //  没有内容的情况下
                if(this.size() === 0){
                    this.head = null;
                }else{
                    const removed = this.head;
                    current = this.getElementAt(this.size());
                    this.head = this.head.next; //  下一个直接赋值给原来
                    current.next = this.head;   //  连接
                    current = removed;
                }
            }else{
                //  不需要修改循环链表 最后一个元素
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                previous.next = current.next;   //  连接循环量表
            }
            this.count -= 1;
            return current.element;
        }
        return null;
    }
}