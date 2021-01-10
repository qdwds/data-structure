class Set {
    constructor() {
        this.items = {};
    }
    has(element) {
        return element in this.items;
        return Object.prototype.hasOwnProperty.call(this.items, element);
    }
    add(element) {
        if (!this.has(element)) {
            this.items[element] = element;
            return true;
        }
        return false;
    }
    delete(element) {
        if (!this.has(element)) {
            delete this.items[element]
            return true;
        }
        return false;
    }
    clear() {
        this.items = {};
    }
    size() {
        return Object.keys(this.items).length;
    }
    values() {
        return Object.values(this.items);
    }
    //  并集：返回两个集合中所有元素的新集合
    union(otherSet) {
        const set = new Set();
        //  自己的集合
        this.values().forEach(value => set.add(value));
        // 传入的集合
        otherSet.values().forEach(value => set.add(value));
        return set.values();
    }
    // 交集：返回两个集合中共用元素的新集合
    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        for (let i = 0; i < values.length; i++) {
            // 传入的集合中有自己集合中这个项的话在插入数据
            if (otherSet.has(values[i])) {
                intersectionSet.add(values[i])
            }

        }
        return intersectionSet;
    }
    // 差集：返回存在第一个集合并且不存在第二个集合中的新集合
    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(element => {
            if (!otherSet.has(element)) {
                differenceSet.add(element)
            }
        })
        return differenceSet
    }
    // 子集：验证一个集合是否是另一个集合的子集
    // 验证一个集合里面元素 是否都存在另一个集合中（有一个不是就返回 false）
    isSubsetOf(otherSet) {
        //  自己元素需要 大于 传入长度；
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSbuset = true;    //  假设当前实例是给定集合的子集；
        this.values().every(value => {
            if (!otherSet.has(value)) {
                isSbuset = false;
                return false;
            }
            return true;
        })
        return isSbuset;
    }
}