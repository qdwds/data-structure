function defaultToString(item) {
    if (item === null) {
        return 'null';
    } else if (item === undefined) {
        return 'undefined';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString()
}

class ValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    toString() {
        return `[#${this.key}]：${this.value}`;
    }
}
class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    hasKey(key) {
        return this.table[this.toStrFn(key)] !== null;
    }

    set(key, value) {
        if (key !== null && value !== null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key, value);
            return true
        }
        return false;
    }

    remove(key) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true;
        }
        return false;
    }

    get(key) {
        if (this.hasKey(key)) {
            return this.table[this.toStrFn(key)]
        }
        return null;
    }

    keyValues() {
        return Object.values(this.table);
    }

    keys() {
        return this.keyValues().map(element => element.key)
    }
    values() {
        return this.keyValues().map(element => element.value)
    }
    //  迭代字典中的每个键值对
    forEach(callbackFn) {
        const keyValues = this.keyValues();
        debugger
        for (let i = 0; i < keyValues.length; i++) {
            const result = callbackFn(
                keyValues[i].key,
                keyValues[i].value
            )
            //  什么情况下会返回 false ？ 有懂得大哥回复下
            if (result === false) {
                break;
            }
        }
    }
    size() {
        return Object.keys(this.table).length;
    }
    isEmpty() {
        return this.size === 0;
    }
    clear() {
        this.table = {};
    }
    toString() {
        if (this.isEmpty()) return '';
        const valuePairs = this.keyValues();
        let objString = `${valuePairs[0].toString()}`;
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString}, ${valuePairs[i].toString()}`;
        }
        return objString;
    }
}