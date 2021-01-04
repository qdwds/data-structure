class Deque {
    constructor() {
        this.count = 0;
        this.locwestCount = 0;   //  记录队列前端第一位；
        this.items = {};
    }
    //  队列前端添加一个元素
    addFront(element) {
        //  队列为空
        if (this.isEmtry()) {
            this.addBack(element)
        } else if (this.locwestCount > 0) {
            //  一个元素已经被双端队列的前端移除；
            this.locwestCount -= 1;
            this.items[this.locwestCount] = element;
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i - 1];
            }
            this.count += 1;
            this.locwestCount = 0;
            this.items[0] = element;
        }
    }
    //  队列后端添加一个元素
    addBack(element) {
        this.items[this.count] = element;
        this.count += 1;
    }
    //  移除队列前端第一个元素
    removeFront() {
        if (this.isEmtry()) return undefined;
        const result = this.items[this.locwestCount];
        delete this.items[this.locwestCount]
        this.locwestCount += 1;
        return result;
    }
    //  移除队列后端一个元素
    removeBack() {
        if (this.isEmtry()) return undefined;
        this.count -= 1;
        const result = this.items[this.count];
        delete this.items[this.count]
        return result;
    }
    // 获取队列前端第一项
    peekFront() {
        if (this.isEmtry()) return undefined;
        return this.items[this.locwestCount]
    }
    //  获取队列后端第一项
    peekBack() {
        if (this.isEmtry()) return undefined;
        return this.items[this.items.length - 1]
    }
    isEmtry() {
        return this.count - this.locwestCount === 0;
    }

    size() {
        return this.count - this.locwestCount;
    }

    clear() {
        this.count = 0;
        this.locwestCount = 0;
        this.items = {};
    }

    toString() {
        if (this.isEmtry()) return '';
        let objString = `${this.items[this.locwestCount]}`; //  先把第一项放进去
        for (let i = this.locwestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;    //  每一项依次放进去
        }
        return objString;
    }
}
