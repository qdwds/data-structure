class SortedLinekdList extends LinkedList {
    constructor(equalsFn = defaultEquals , sort = defaultSort){
        super(equalsFn);
        this.sort = sort;
    }

    insert(element,index = 0){
        if(this.isEmpty()){
            return super.insert(element,0);
        }
        const pos = this.getIndexNextSortedElement(element);
        return super.insert(element,pos);
    }
}