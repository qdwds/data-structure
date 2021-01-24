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
            1  /* 右侧 比父节点大 */ ;
    }

    //  中序遍历
    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        //  停止递归的条件      等于null的时候 栈执行 最后进去的小值
        if (node !== null) {
            //  从大到小 依次压入栈底
            this.inOrderTraverseNode(node.left, callback);
            //	最小值没有节点的时候 从最小值开始依次弹出
            callback(node.key); //  弹栈
            //  弹完后把右侧节点传入
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    //  先序遍历
    perOrderTraverse(callback) {
        this.perOrderTraverseNode(this.root, callback);
    }
    perOrderTraverseNode(node, callback) {
        if (node !== null) {
            //	执行根节点
            callback(node.key);
            //  寻找左侧    小值
            this.perOrderTraverseNode(node.left, callback);
            // 寻找右侧
            this.perOrderTraverseNode(node.right, callback);
        }
    }

    //  后续排序
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node !== null) {
            // 寻找左侧
            this.postOrderTraverseNode(node.left, callback)
            //  寻找右侧
            this.postOrderTraverseNode(node.right, callback)
            //  节点
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
        return node;
    }

    //  查找最大值
    max() {
        return this.maxNode(this.root)
    }
    maxNode(node) {
        while (node !== null && node.right !== null) {
            node = node.right;
        }
        return node
    }

    // 搜索一个特定的值
    search(key) {
        return this.searchNode(this.root, key)
    }
    searchNode(node, key) {
        if (node === null) return false;

        let result = this.defaultCompare(key, node.key)
        if (result === -1) {
            return this.searchNode(node.left, key);
        } else if (result === 1) {
            return this.searchNode(node.right, key)
        } else {
            return true;
        }
    }

    //  移除 节点返回一个新的root树，而不是返回移除的节点值
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        if (node === null) return false;
        //  key 比 当前节点小
        if (this.defaultCompare(key, node.key) === -1) {
            node.left = this.removeNode(node.left, key)
            return node;
        } else if (this.defaultCompare(key, node.key) === 1) {
            //  key 比当前节点大
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            //  { 1 } 情况1: 移除没有左右叶的节点
            if (node.let === null && node.right === null) {
                node = null;
                return node;
            }
            // { 2 } 情况2：移除只存在 左叶或右叶的 节点
            if (node.left === null) {
                node = node.left;   //  null  赋值给当前节点表示移除
                return node;
            } else if (node.right === null) {
                node = node.right   //  null  赋值给当前节点表示移除
                return node;
            }

            // { 3 }  情况3：移除有两个子节点的节点
            const aux = this.minNode(node.right);   //  找到右侧最小节点
            node.key = aux.key; //  最小节点更新 要移除的这个节点
            node.right = this.removeNode(node.right, aux.key);  //  移除掉原来位置的值
            return node;
        }
    }
}