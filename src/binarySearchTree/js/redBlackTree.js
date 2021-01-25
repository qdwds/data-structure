//  用于创建每个树的节点
// class Node {
//     constructor(key = null, left = null, right = null) {
//         this.key = key;
//         this.left = left;
//         this.right = right;
//     }
// }
//  红黑颜色
const Colors = {
    RED: 0,
    BLACK: 1
}

const Compare = {
    LESS_THAN: -1,
    BLACK: true,
    EQUALS: 0
};

class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;    //  默认节点红色
        this.parent = null; //  指向节点的引用
    }
    // 判断结点是否为红色
    isRed() {
        return this.color === Colors.RED;
    }
}


class RedBlackTree extends BinarySearchTree {
    constructor() {
        super();
        this.root = null;
    }

    //  用来比较两个节点
    defaultCompare(a, b) {
        //  两个相等 = 0
        if (a === b) {
            //  如果一样放到下一个节点
            return 0;
        }
        return a < b ?
            -1 /* 左侧 比父节点小 */ :
            1  /* 右侧 比父节点大 */;
    }

    //  插入节点
    insert(key) {
        //  节点为空的时候直接插入
        if (this.root === null) {
            //  红黑树第一个节点只能是黑色
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            console.log(newNode);
            this.fixTreeProperties(newNode)
        }
    }
    insertNode(node, key) {
        if (this.defaultCompare(key, node.key) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;    //  指向被插入节点父节点的引用
                return node.left;  //  返回节点引用
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right === null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;      //  指向被插入节点父节点的引用
            return node.right;  //  返回节点引用
        } else {
            return this.insertNode(node.right, key);
        }
    }

    //  验证红黑树规则
    fixTreeProperties(node) {
        while (
            node &&
            node.parent &&
            node.parent.isRed() &&
            node.color !== Colors.BLACK
        ) {
            let parent = node.parent;
            const grandParent = parent.parent

            //  父节点是左侧节点
            if (grandParent && grandParent.left === parent) {
                const uncle = grandParent.right;

                //  叔节点也是红色 需要从新填色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    //  节点是右侧子节点 - 左旋转
                    if(node === parent.right){
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    //  节点是左侧子节点 - 右旋转
                    this.rotationLL(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            } else {
                //  父节点是右侧子节点
                const uncle = grandParent.left;

                // 叔叔节点是红色 需要重新填充颜色
                if (uncle && uncle.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    //  节点是左侧子节点 - 右旋转
                    if(node === parent.left){
                        this.rotationLL(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    //  节点是右侧子节点 - 左旋转
                    this.rotationRR(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            }
        }
        this.root.color = Colors.BLACK;
    }

    rotationLL(node){
        const tmp = node.left;
        node.left = tmp.right;
        if(tmp.right && tmp.right.key){
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }

    rotationRR(node){
        const tmp = node.right;
        node.right = tmp.left;
        if(tmp.left && tmp.left.key){
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        }else{
            if(node === node.parent.left){
                node.parent.left = tmp;
            }else{
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
    }
}