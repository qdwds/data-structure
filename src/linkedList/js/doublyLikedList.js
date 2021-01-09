// 双向链表就 两个指针 一个指向前面 一个指向后面
class DoublyLinkedList extends LinkedList {
    constructor(quealsFn = defaultEquals) {
        super(quealsFn);

        this.tail = null;  //  链表最后一个元素的引用
    }

    //  插入MO数据
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new DoublyNode(element);
            let current = this.head;
            if (index === 0) {
                //  第一项的时候
                if (this.head === null) {
                    this.head = node;   //  第一个节点
                    this.tail = node;   //  每次插入都要设置最后一个节点
                } else {
                    //  在设置第一个值的时候，并且第一个值存在
                    node.next = this.head;
                    current.prev = node;    //  上一个
                    this.tail = node;   //  每次插入都要设置最后一个节点
                }
            } else if (index === this.count) {
                //  最后一项的时候
                current = this.tail;    //  保存变量
                current.next = node;    //  下一个节点
                node.prev = current;    //  上一个节点
                this.tail = node;       //  每次插入都要设置最后一个节点
            } else {
                const previous = this.getElementAt(index - 1);
                current = previous.next;
                node.next = current;
                previous.next = node;
                current.prev = node;
                node.prev = previous
            }
            this.count += 1;
            return true;
        }
        return false;
    }

    //  任意位置移除
    //  需要处理三个场景 从头部 从中间 从尾部
    removeAt(index) {
        if (index >= 0 && index < this.count) {
            let current = this.head;
            if (index === 0) {
                //  直接移除第一项就ok
                this.head = current.next;
                if (this.count === 1) {
                    //  只有一个元素最后一个引用置空
                    this.tail = null;
                } else {
                    // 置空下一个引用
                    this.head.prev = null;
                }
            } else if (index === this.count - 1) {  //  最后一项
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else {
                current = this.getElementAt(index)
                const previous = current.prev;
                //  跳过中间一项 和下一项连接
                previous.next = current.next;
                current.next.prev = previous;
            }
            this.count -= 1;
            return current.element;
        }
        return null;
    }
}

//  链表里面的数据打印出来就像死循环～