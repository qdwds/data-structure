import { defaultEquals, Node } from "../../js/utils.js";


const LinkedList = class {
    constructor(equalsFn = defaultEquals) {
        this.conut = 0; //  储存链表数量
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
        this.conut += 1;
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
console.log(linkedList.head);   //  链表数据结构    仔细看数据结构