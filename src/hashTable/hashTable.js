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

class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key); //  防止key是对象
        let hash = 0;   //  存储hash总和
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i); // 每个ASCII添加到hash
        }
        return hash % 37;// 避免超过最大范围
    }
    //  hash ascii码表
    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    put(key,value){
        if(key !== null && value !== null){
            const position = this.hashCode(key);
            this.table[position] = new ValuePair(key,value);
            return true;
        }
        return false;
    }

    get(key){
        const valuePair = this.table[this.hashCode(key)];
        return valuePair === undefined ? undefined :valuePair.value;
    }

    remove(key){
        const hash = this.hashCode(key);
        const valuePair = this.table[hash];
        if(valuePair !== null){
            delete this.table[valuePair.key];
            return ture;
        }      
        return false;
    }
    isEmpty(){
        return Object.keys(this.table).length === 0
    }
    toString(){
        if(this.isEmpty()){
            return ''
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0].toString()]}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString}, { ${keys[i]} => ${ this.table[keys[i]].toString()}}`;
        }
        return objString;
    }

}