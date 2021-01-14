//  用于创建每个树的节点
class Node {
    constructor(key = null, left = null, right = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}
// export const Compare = {
//     LESS_THAN: -1,
//     BIGGER_THAN: 1,
//     EQUALS: 0
//   };

class BinarySearchTree {
    constructor() {
        this.root = null;   //  Node根节点
    }

    //  向二叉搜索树插入一个键
    insert(key) {
        //  如果没有根节点，直接创建一个新的节点
        if (this.root === null) {
            this.root = new Node(key);
        } else {
            //  如果不是第一个节点 递归查找到指定位置然后创建节点
            this.insertNode(this.root, key)
        }
    }
    insertNode(node, key) {
        //  左侧 比父节点小
        if (this.defaultCompare(key, node.key) === -1) {
            if (node.left === null) {
                node.left = new Node(key)
            } else {
                this.insertNode(node.left, key)
            }
        } else {
            // 右侧 比父节点大
            if (node.right === null) {
                node.right = new Node(key)
            } else {
                this.insertNode(node.right, key)
            }
        }
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

    //  中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        //  停止递归的条件
        if (node !== null) {
            //  通过栈先把所有小的都放到栈里面
            //  先遍历左测 小节点 
            this.inOrderTraverseNode(node.left, callback);
            callback(node.key);
            //  后遍历右测 大节点
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    //  先序遍历
    perOrderTraverse(callback) {
        this.perOrderTraverseNode(this.root, callback);
    }
    perOrderTraverseNode(node, callback) {
        if (node !== null) {
            callback(node.key);
            this.perOrderTraverseNode(node.left, callback);
            this.perOrderTraverseNode(node.right, callback);
        }
    }

    //  后续排序
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    //  查找最小值
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        while (node !== null && node.left !== null) {
            node = node.left;
        }
        return node.key;
    }

    //  查找最大值
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        while (node !== null && node.right !== null) {
            node = node.right;
        }
        return node.key
    }

    // 搜索一个特定的值
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        debugger
        if (node === null) return false;

        if (this.defaultCompare(key, node.key) === -1) {
            return this.searchNode(node.left, key);
        } else if (this.defaultCompare(key, node.key === 1)) {
            return this.searchNode(node.right, key)
        } else {
            return true;
        }
    }
}