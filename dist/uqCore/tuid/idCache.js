const maxCacheSize = 10000;
export class IdCache {
    queue = []; // 每次使用，都排到队头
    cache; // 已经缓冲的
    localArr;
    waitingIds = []; // 等待loading的
    tuidInner;
    constructor(tuidLocal) {
        this.cache = tuidLocal.uq.net.createObservableMap();
        this.tuidInner = tuidLocal;
        this.initLocalArr();
    }
    initLocalArr() {
        this.localArr = this.tuidInner.schemaLocal.arr(this.tuidInner.name + '.ids');
    }
    cacheSet(id, val) {
        this.cache.set(id, val);
    }
    useId(id, defer) {
        if (!id)
            return;
        if (typeof id !== 'number') {
            console.error('id cache ' + id + ' is not number');
            return;
        }
        if (this.cache.has(id) === true) {
            this.moveToHead(id);
            return;
        }
        this.tuidInner.cacheTuids(defer === true ? 70 : 20);
        if (this.waitingIds.findIndex(v => v === id) >= 0) {
            this.moveToHead(id);
            return;
        }
        if (this.queue.length >= maxCacheSize) {
            // 缓冲已满，先去掉最不常用的
            let r = this.queue.shift();
            if (r === id) {
                // 如果移除的，正好是现在用的，则插入
                this.queue.push(r);
                return;
            }
            if (this.cache.has(r) === true) {
                // 如果移除r已经缓存
                this.cache.delete(r);
            }
            else {
                // 如果移除r还没有缓存
                let index = this.waitingIds.findIndex(v => v === r);
                this.waitingIds.splice(index, 1);
            }
        }
        this.waitingIds.push(id);
        this.queue.push(id);
        return;
    }
    moveToHead(id) {
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.queue.push(id);
    }
    getValue(id) {
        return this.cache.get(id);
    }
    remove(id) {
        this.cache.delete(id);
        let index = this.queue.findIndex(v => v === id);
        this.queue.splice(index, 1);
        this.localArr.removeItem(id);
    }
    valueFromId(id) {
        let _id;
        switch (typeof id) {
            case 'object':
                _id = id.id;
                break;
            case 'number':
                _id = id;
                break;
            default: return;
        }
        return this.getValue(_id);
    }
    resetCache(id) {
        this.remove(id);
        this.useId(id);
    }
    cacheValue(val) {
        if (val === undefined)
            return false;
        let id = this.getIdFromObj(val);
        if (id === undefined)
            return false;
        this.cacheSet(id, val);
        return true;
    }
    getIdFromObj(val) { return this.tuidInner.getIdFromObj(val); }
    async cacheIds() {
        let tuidValues = await this.loadIds();
        this.cacheIdValues(tuidValues);
    }
    cacheIdValues(tuidValues) {
        if (tuidValues === undefined)
            return;
        let tuids = this.unpackTuidIds(tuidValues);
        for (let tuidValue of tuids) {
            if (this.cacheValue(tuidValue) === true) {
                this.cacheTuidFieldValues(tuidValue);
            }
        }
    }
    async modifyIds(ids) {
        let tuidValues = await this.loadTuidIdsOrLocal(ids);
        let localedValues = tuidValues.filter(v => {
            let p = v.indexOf('\t');
            if (p < 0)
                p = v.length;
            let id = Number(v.substring(0, p));
            let val = this.localArr.getItem(id);
            return (val !== undefined);
        });
        if (localedValues.length === 0)
            return;
        this.cacheIdValues(localedValues);
    }
    async loadIds() {
        if (this.waitingIds.length === 0)
            return;
        let loadingIds = [...this.waitingIds];
        this.waitingIds = [];
        return await this.loadTuidIdsOrLocal(loadingIds);
    }
    unpackTuidIds(values) {
        return this.tuidInner.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.tuidInner.cacheTuidFieldValues(tuidValue);
    }
    async assureObj(id) {
        let val = this.cache.get(id);
        if (val !== undefined)
            return val;
        /*
        switch (typeof val) {
            case 'object': return val;
            // case 'number': this.cache.set(id, undefined); break;
        }
        */
        let ret = await this.loadTuidIdsOrLocal([id]);
        this.cacheIdValues(ret);
    }
    async loadValuesFromIds(netIds) {
        let netRet = await this.tuidInner.loadValuesFromIds(undefined, netIds);
        return netRet;
    }
    async loadTuidIdsOrLocal(ids) {
        let ret = [];
        let netIds = [];
        for (let id of ids) {
            let value = this.localArr.getItem(id);
            //if (value === undefined)
            // 值不存在或者是空字符串，重新获取
            if (!value)
                netIds.push(id);
            else
                ret.push(value);
        }
        let len = netIds.length;
        if (len === 0)
            return ret;
        let netRet = await this.loadValuesFromIds(netIds);
        for (let i = 0; i < len; i++) {
            //有些id可能没有内容，不会返回
            //let id = netIds[i]; 
            let row = netRet[i];
            if (!row)
                continue;
            let p = row.indexOf('\t');
            if (p < 0)
                p = row.length;
            let id = Number(row.substring(0, p));
            let pos = netIds.findIndex(v => v === id);
            if (pos >= 0)
                netIds.splice(pos, 1);
            ret.push(row);
            this.localArr.setItem(id, row);
        }
        len = netIds.length;
        for (let i = 0; i < len; i++) {
            this.localArr.setItem(netIds[i], '');
        }
        return ret;
    }
}
export class IdDivCache extends IdCache {
    div;
    divName;
    constructor(tuidLocal, div) {
        super(tuidLocal);
        this.div = div;
        this.divName = div.name;
        this.localArr = tuidLocal.schemaLocal.arr(tuidLocal.name + '.ids.' + this.divName);
    }
    initLocalArr() {
        // 这个不需要，必须去掉
        // this.localArr = this.tuidInner.cache.arr(this.tuidInner.name + '.ids');
    }
    getIdFromObj(val) { return this.div.getIdFromObj(val); }
    unpackTuidIds(values) {
        return this.div.unpackTuidIds(values);
    }
    cacheTuidFieldValues(tuidValue) {
        this.div.cacheTuidFieldValues(tuidValue);
    }
    async loadValuesFromIds(netIds) {
        let netRet = await this.tuidInner.loadValuesFromIds(this.divName, netIds);
        return netRet;
    }
}
//# sourceMappingURL=idCache.js.map