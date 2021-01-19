//  用于创建每个树的节点
// class Node {
//     constructor(key = null, left = null, right = null) {
//         this.key = key;
//         this.left = left;
//         this.right = right;
//     }
// }
const Colors = {
    RED: false,
    BLACK: true,
};
const Compare = {
    RED: false,
    BLACK: true,
    EQUALS: 0
};
class RedBlackNode extends Node {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
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
        if (this.root === null) {
            //  红黑树第一个节点只能是黑色
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNdoe = this.insertNode(this.root, key);
            this.fixTreeProperties(newNdoe)
        }
    }
    insertNode(node, key) {
        if (this.defaultCompare(key, node.key) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key)
            }
        } else if (node.right === null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }

    fixTreeProperties(node) {
        console.log(node);
        while (node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parend

            //  父节点是左侧节点
            if (grandParent?.left === parent) {
                const uncle = grandParent.right;

                //  叔节点也是红色 需要从新填色
                if (uncle?.color == Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = COloes.BLACK;
                    node = grandParent;
                } else {
                    //  节点是右侧子节点 - 左旋转
                    //  节点是左侧子节点 - 右旋转
                }
            } else {
                //  父节点是右侧子节点
                const uncle = grandParent.left;

                // 叔叔节点是红色 需要重新填充颜色
                if (uncle?.color === Colors.RED) {
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    //  节点是左侧子节点 - 右旋转
                    //  节点是右侧子节点 - 左旋转
                }
            }
        }
        this.root.color = COloes.BLACK;
    }
}