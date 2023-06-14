export class LocalDb {
    createLocalMap(name) {
        return new LocalMap(this, name);
    }
}
export class LocalMapDb extends LocalDb {
    map;
    constructor() {
        super();
        this.map = new Map();
    }
    getItem(key) {
        return this.map.get(key);
    }
    setItem(key, value) {
        this.map.set(key, value);
    }
    removeItem(key) {
        this.map.delete(key);
    }
}
// const __ls = new _LocalStorage(); // new Ls;
export class LocalCache {
    local;
    key;
    constructor(local, key) {
        this.local = local;
        this.key = key;
    }
    get() {
        try {
            // 下面缓冲的内容不能有，可能会被修改，造成circular引用
            //if (this.value !== undefined) return this.value;
            let text = this.local.getItem(this.key);
            if (text === null)
                return;
            if (text === undefined)
                return undefined;
            //return this.value = 
            return JSON.parse(text);
        }
        catch (err) {
            this.local.removeItem(this.key);
            return;
        }
    }
    set(value) {
        let t = JSON.stringify(value, (key, value) => {
            if (key !== '_tuid')
                return value;
        });
        this.local.setItem(this.key, t);
    }
    remove(local) {
        if (local === undefined) {
            this.local.removeItem(this.key);
        }
        else {
            this.local.removeLocal(local);
        }
    }
    child(key) {
        return this.local.child(key);
    }
    arr(key) {
        return this.local.arr(key);
    }
    map(key) {
        return this.local.map(key);
    }
}
class Local {
    caches;
    locals;
    localDb;
    name;
    constructor(localDb, name) {
        this.localDb = localDb;
        this.name = name;
        this.caches = {};
        this.locals = {};
    }
    getItem(key) {
        let k = this.keyForGet(key);
        if (k === undefined)
            return;
        return this.localDb.getItem(k);
    }
    setItem(key, value) {
        let k = this.keyForSet(key);
        this.localDb.setItem(k, value);
    }
    removeItem(key) {
        let k = this.keyForRemove(key);
        if (k === undefined)
            return;
        localStorage.removeItem(k);
    }
    arr(key) {
        let sk = String(key);
        let arr = this.locals[sk];
        if (arr === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = arr = new LocalArr(this.localDb, k);
        }
        return arr;
    }
    map(key) {
        let sk = String(key);
        let map = this.locals[sk];
        if (map === undefined) {
            let k = this.keyForSet(key);
            this.locals[sk] = map = new LocalMap(this.localDb, k);
        }
        return map;
    }
    removeLocal(local) {
        let sk = local.name;
        let k = this.keyForRemove(sk);
        if (k === undefined)
            return;
        let arr = this.locals[sk];
        if (arr === undefined)
            arr = new LocalArr(this.localDb, k);
        else
            this.locals[sk] = undefined;
        arr.removeAll();
    }
    child(key) {
        let ks = String(key);
        let ret = this.caches[ks];
        if (ret !== undefined)
            return ret;
        return this.caches[ks] = ret = new LocalCache(this, key);
    }
}
const maxArrSize = 500;
export class LocalArr extends Local {
    index;
    constructor(localDb, name) {
        super(localDb, name);
        let index = this.localDb.getItem(this.name);
        if (index) {
            this.index = index.split('\n').map(v => Number(v));
        }
        else {
            this.index = [];
        }
    }
    saveIndex() {
        this.localDb.setItem(this.name, this.index.join('\n'));
    }
    keyForGet(key) {
        let i = this.index.indexOf(key);
        if (i < 0)
            return undefined;
        return `${this.name}.${key}`;
    }
    keyForSet(key) {
        let i = this.index.indexOf(key);
        if (i < 0) {
            this.index.unshift(key);
            if (this.index.length > maxArrSize)
                this.index.pop();
        }
        else {
            this.index.splice(i, 1);
            this.index.unshift(key);
        }
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    keyForRemove(key) {
        let i = this.index.indexOf(key);
        if (i < 0)
            return;
        this.index.splice(i, 1);
        this.saveIndex();
        return `${this.name}.${key}`;
    }
    removeAll() {
        for (let i of this.index) {
            this.localDb.removeItem(`${this.name}.${i}`);
        }
        this.localDb.removeItem(this.name);
        this.index.splice(0);
    }
    item(index) {
        return this.child(index);
    }
}
export class LocalMap extends Local {
    index;
    max;
    constructor(localDb, name) {
        super(localDb, name);
        this.max = 0;
        this.index = {};
        let index = this.localDb.getItem(this.name);
        if (index) {
            let ls = index.split('\n');
            ls.forEach(l => {
                let p = l.indexOf('\t');
                if (p < 0)
                    return;
                let key = l.substr(0, p);
                let i = Number(l.substr(p + 1));
                if (isNaN(i) === true)
                    return;
                this.index[key] = i;
                if (i > this.max)
                    this.max = i;
            });
        }
    }
    saveIndex() {
        let ls = [];
        for (let k in this.index) {
            let v = this.index[k];
            if (v === undefined)
                continue;
            ls.push(`${k}\t${v}`);
        }
        this.localDb.setItem(this.name, ls.join('\n'));
    }
    keyForGet(key) {
        let i = this.index[key];
        if (i === undefined)
            return undefined;
        return `${this.name}.${i}`;
    }
    keyForSet(key) {
        let i = this.index[key];
        if (i === undefined) {
            ++this.max;
            i = this.max;
            this.index[key] = i;
            this.saveIndex();
        }
        return `${this.name}.${i}`;
    }
    keyForRemove(key) {
        let i = this.index[key];
        if (i === undefined)
            return;
        this.index[key] = undefined;
        this.saveIndex();
        return `${this.name}.${i}`;
    }
    removeAll() {
        for (let i in this.index) {
            this.localDb.removeItem(`${this.name}.${this.index[i]}`);
            this.index[i] = undefined;
        }
        this.localDb.removeItem(this.name);
        this.max = 0;
    }
    item(key) {
        return this.child(key);
    }
}
//# sourceMappingURL=LocalDb.js.map