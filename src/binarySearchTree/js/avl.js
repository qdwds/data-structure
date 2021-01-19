const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5
}
// export const Compare = {
//     LESS_THAN: -1,
//     BIGGER_THAN: 1,
//     EQUALS: 0
//   };
//  自平衡二叉搜索树
class AVLTree extends BinarySearchTree {
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

    // LL 向左单旋转
    rotationLL(node) {
        debugger
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp
    }

    //  RR 向右单旋转
    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
    }

    // LR 左右旋转
    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node)
    }
    // Rl 右左旋转
    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRL(node);
    }

    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        if (node === null) {
            //  没有数据的时候直接创建
            return new Node(key)
        } else if (this.defaultCompare(key, node.key) === -1) {
            //  插到左侧
            node.left = this.insertNode(node.left, key)
        } else if (this.defaultCompare(key, node.key) === 1) {
            //  插到右侧
            node.right = this.insertNode(node.right, key)
        } else {
            return node;
        }
        
        //  进行二叉树平衡操作
        const balanceFactor = this.getBalanceFactor(node);
        //  左侧树插入节点后不平衡情况下
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT /* 5 */) {
            //  插入值比左侧小
            if (this.defaultCompare(key, node.left.key) === -1) {
                node = this.rotationLL(node)
            } else {
                return this.rotationLR(node);
            }
        }
        //  右侧树插入节点后不平衡情况下
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT /* 1 */) {
            //  插入值比右侧小
            if (this.defaultCompare(key, node.right.key) === 1) {
                node = this.rotationRR(node);
            } else {
                return this.rotationRL(node)
            }
        }
        return node;
    }

    //  获取平衡因子
    getBalanceFactor(node) {
        //  计算高度差值    通过左侧节点删除右侧节点计算出高度差值
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;  //  1
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT; //  2
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;  //  4
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;   //  5
            default:
                return BalanceFactor.BALANCED;  //  3
        }
    }
    //  计算一个节点的高度      节点的高度是从节点到任意子节点的边的最大值
    getNodeHeight(node) {
        if (node === null) {
            return -1;
        }
        console.log(node);
        return Math.max(
            this.getNodeHeight(node.left),
            this.getNodeHeight(node.right)
        ) + 1;
    }
    remove(key){
        return this.removeNode(this.root,key)
    }
    //  移除节点
    removeNode(node, key) {
        //  使用继承方法的移除；
        node = super.removeNode(node, key);
        if (node === null) return node //    null 不需要平衡

        //  检测树是否平衡  递归计算 以移除的节点 为根节点的平衡因子
        const balanceFactor = this.getBalanceFactor(node);
        //  左侧移除完后不平衡
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            //  计算左侧树平衡因子
            const balanceFactorLeft = this.getBalanceFactor(node.left);
            //  左侧树先左不平衡
            if (
                balanceFactorLeft === BalanceFactor.BALANCED ||
                balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            ) {
                //  左侧旋转
                return this.rotationLL(node)
            }
            //  左侧树向右不平衡
            if (balanceFactorLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                //  旋转
                return this.rotationLR(node);
            }
        }

        //  右侧树移除完后不平衡
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            //  计算右侧平衡因子
            const balanceFactorRight = this.getBalanceFactor(node.right);
            // 右侧树向右不平衡
            if (
                balanceFactorRight === BalanceFactor.BALANCED ||
                balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            ) {
                //  有侧旋转
                return this.rotationRR(node)
            }
            //  右侧向左不平衡
            if (balanceFactorRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                // 左右旋转
                return this.rotationRL(node.right)
            }
        }
        return node;
    }
}