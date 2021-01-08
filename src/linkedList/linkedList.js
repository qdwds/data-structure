const defaultEquals = (a, b) => {
    return a === b
}

//  节点的单独节点属性 哈哈
const Node = class {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
console.log(new Node());
const LinkedList = class {
    constructor(equalsFn = defaultEquals) {
        this.count = 0; //  储存链表数量
        this.head = null;  //  第一个元素的引用头
        this.equalsFn = equalsFn;
    }

    //  向链表尾部添加一个新元素
    push(element) {
        const node = new Node(element); //  创建新的传入的节点
        let current;    //  过渡this.head
        //  第一次进来
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            //  可以看成递归判断整个列表里面的next，需要从头开始逐个遍历，只有最后一个进来的是null
            while (current.next !== null) {
                current = current.next;
            }
            //  只有这里才真正赋值，连接最后一个节点
            current.next = node;
        }
        this.count += 1;
    }

    //  从指定位置移除一个元素
    removeAt(index) {
        let current = this.head;
        if (index === 0) {
            this.head = current.next;   //  直接返回第二个
        } else {
            const previous = this.getElementAt(index - 1);
            //  跨过要删除的项，重新连接
            current = previous.next;
            previous.next = current.next;
        }
        this.count -= 1;
    }
    getElementAt(index) {
        if (index >= 0 && index <= this.count) {
            let node = this.head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;    //  返回找到的这个元素
        }
        //  不是有效数据返回空值
        return undefined;
    }
    

    //  在任意位置插入
    insert(element, index) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if(index === 0){
                //  新节点直接给到头上
                const current = this.head;
                node.next = current;
                this.head = node
            }else{
                const previous = this.getElementAt(index - 1);
                //  连接新节点
                const current = previous.next;
                node.next = current;
                previous.next = node;
            }
            this.count += 1;
            return true;
        }
        return false;
    }
    //  返回元素的位置
    indexOf(element){
        let current = this.head;
        for (let i = 0; i < this.count && current !== null; i++) {
            //  如果当前元素和 链表里面某一个一样 就返回下标
            if(this.equalsFn(element,current.element)){
                return i 
            }
            //  如果上没有找到就重新迭代寻找
            current = current.next;
        }
        return -1;
    }

    //  移除
    remove(element){
        const index = this.indexOf(element);
        return this.getElementAt(index);
    }

    size(){
        return this.count;
    }
    isEmpty(){
        return this.size() === 0;
    }
    getHead(){
        return this.head;
    }
    toString(){
        if(this.head === null) return '';
        let objString = `${this.head.element}`; //  自己的元素
        let current = this.head.next;   //  下一个节点
        for (let i = 0; i < this.size() && current !== null; i++) {
            objString = `${objString}, ${current.element}`;
            current =current.next;            
        }
        return objString
    }
}



/**
 * @链表数据结构
 * Node{
 *   element:"a",
 *   next:@Node {
 *      element:"b",
 *      next:@Node {
 *         element:"c",
 *         next:null
 *     }
 *   }
 * }
 */

const linkedList = new LinkedList();
linkedList.push('a');
linkedList.push('b');
linkedList.push('c');
linkedList.push('d');
linkedList.push('e');
linkedList.push('f');
console.log(linkedList.head);   //  链表数据结构    仔细看数据结构
console.log(linkedList.removeAt(2));
console.log(linkedList.head);   //  链表数据结构    仔细看数据结构
console.log(linkedList.toString());