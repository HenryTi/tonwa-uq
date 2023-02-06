import { Entity } from '../entity';
import { EntityCaller } from '../caller';
import { IdCache, IdDivCache } from './idCache';
export class UqTuid extends Entity {
    noCache;
    typeName = 'tuid';
    idName;
    unique;
    //render: Render<M>;
    setSchema(schema) {
        super.setSchema(schema);
        let { id } = schema;
        this.idName = id;
    }
    buildTuidBox() {
        return new TuidBox(this);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    stopCache() { this.noCache = true; }
    static idValue(id) {
        let t = typeof id;
        switch (t) {
            default:
                debugger;
                throw new Error('unknown id type: ' + t);
            case 'undefined': return undefined;
            case 'object': return id.id;
            case 'number': return id;
        }
    }
    static equ(id1, ix) {
        if (id1 === undefined || id1 === null)
            return false;
        if (ix === undefined || ix === null)
            return false;
        return Tuid.idValue(id1) === Tuid.idValue(ix);
        /*
        if (typeof id1 === 'object') {
            let id1Id = id1.id;
            return typeof ix === 'object'? id1Id === ix.id : id1Id === ix;
        }
        if (typeof ix === 'object') {
            let id2Id = ix.id;
            return typeof id1 === 'object'? id2Id === id1.id : id2Id === id1;
        }
        return id1 === ix;
        */
    }
    cacheIds() { }
    async modifyIds(ids) { }
    isImport = false;
}
export class Tuid extends UqTuid {
}
export class TuidInner extends Tuid {
    divs;
    cacheFields;
    idCache;
    localArr;
    constructor(uq, name, typeId) {
        super(uq, name, typeId);
        this.idCache = new IdCache(this);
        this.localArr = this.schemaLocal.arr(this.name + '.whole');
        if (uq.newVersion === true)
            this.localArr.removeAll();
    }
    setSchema(schema) {
        super.setSchema(schema);
        let { arrs } = schema;
        if (arrs !== undefined) {
            this.divs = {};
            for (let arr of arrs) {
                let { name } = arr;
                let tuidDiv = new TuidDiv(this.uq, this, name);
                this.divs[name] = tuidDiv;
                tuidDiv.setSchema(arr);
                tuidDiv.buildFieldsTuid();
            }
        }
    }
    getObj(id) {
        let obj = this.valueFromId(id);
        if (obj)
            return obj;
        this.useId(id);
        return { id };
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        if (!id)
            return;
        this.idCache.useId(id, defer);
    }
    boxId(id) {
        if (!id)
            return;
        if (typeof id === 'object')
            return id;
        this.useId(id);
        //let {createBoxId} = this.uq;
        //if (!createBoxId) 
        return { id: id };
        //return createBoxId(this, id);
    }
    valueFromId(id) { return this.idCache.getValue(id); }
    resetCache(id) {
        if (typeof id === 'object')
            id = id.id;
        this.idCache.resetCache(id);
    }
    async assureBox(id) {
        if (!id)
            return;
        if (typeof id === 'object')
            id = id.id;
        await this.idCache.assureObj(id);
        return this.idCache.getValue(id);
    }
    cacheIds() {
        this.idCache.cacheIds();
        if (this.divs === undefined)
            return;
        for (let i in this.divs)
            this.divs[i].cacheIds();
    }
    async modifyIds(ids) {
        await this.idCache.modifyIds(ids);
    }
    cacheTuids(defer) { this.uq.cacheTuids(defer); }
    get hasDiv() { return this.divs !== undefined; }
    div(name) {
        return this.divs && this.divs[name];
    }
    async loadValuesFromIds(divName, ids) {
        let ret = await new IdsCaller(this, { divName, ids }, undefined, false).request();
        return ret;
    }
    async loadMain(id) {
        if (typeof id === 'object')
            id = id.id;
        await this.idCache.assureObj(id);
        return this.idCache.valueFromId(id);
    }
    async load(id) {
        if (id === undefined || id === 0)
            return;
        //let cacheValue = this.idCache.valueFromId(id); 
        //if (typeof cacheValue === 'object') return cacheValue;
        if (typeof id === 'object')
            id = id.id;
        let valuesText = undefined; //this.localArr.getItem(id);
        let values;
        if (valuesText) {
            values = JSON.parse(valuesText);
        }
        else {
            values = await new GetCaller(this, id).request();
            if (values !== undefined) {
                // this.localArr.setItem(id, JSON.stringify(values));
            }
        }
        if (values === undefined)
            return;
        for (let f of this.schema.fields) {
            let { tuid } = f;
            if (tuid === undefined)
                continue;
            let t = this.uq.getTuid(tuid);
            if (t === undefined)
                continue;
            let n = f.name;
            values[n] = t.boxId(values[n]);
        }
        this.idCache.cacheValue(values);
        this.cacheTuidFieldValues(values);
        return values;
    }
    cacheTuidFieldValues(values) {
        let { fields, arrs } = this.schema;
        this.cacheFieldsInValue(values, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let arrValues = values[name];
                if (arrValues === undefined)
                    continue;
                let tuidDiv = this.div(name);
                for (let row of arrValues) {
                    //row._$tuid = tuidDiv;
                    //row.$owner = this.boxId(row.owner);
                    tuidDiv.cacheValue(row);
                    this.cacheFieldsInValue(row, fields);
                }
            }
        }
    }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields, $create, $update, stampOnMain } = this.schema;
        // if (mainFields === undefined) debugger;
        this.cacheFields = mainFields || this.fields;
        if (stampOnMain === true) {
            if ($create === true)
                this.cacheFields.push({ name: '$create', type: 'timestamp', _tuid: undefined });
            if ($update === true)
                this.cacheFields.push({ name: '$update', type: 'timestamp', _tuid: undefined });
        }
        this.uq.buildFieldTuid(this.cacheFields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
    async save(id, props) {
        let ret = await new SaveCaller(this, { id: id, props: props }).request();
        if (id !== undefined) {
            this.idCache.remove(id);
            this.localArr.removeItem(id);
        }
        return ret;
    }
    async saveProp(id, prop, value) {
        await new SavePropCaller(this, { id, prop, value }).request();
        this.idCache.remove(id);
        await this.idCache.assureObj(id);
    }
    async all() {
        let ret = await new AllCaller(this, {}).request();
        return ret;
    }
    async search(key, pageStart, pageSize) {
        let ret = await this.searchArr(undefined, key, pageStart, pageSize);
        return ret;
    }
    async searchArr(owner, key, pageStart, pageSize) {
        //let api = this.uqApi;
        //let ret = await api.tuidSearch(this.name, undefined, owner, key, pageStart, pageSize);
        let params = { arr: undefined, owner: owner, key: key, pageStart: pageStart, pageSize: pageSize };
        let ret = await new SearchCaller(this, params).request();
        let { fields } = this.schema;
        for (let row of ret) {
            this.cacheFieldsInValue(row, fields);
        }
        return ret;
    }
    async loadArr(arr, owner, id) {
        if (id === undefined || id === 0)
            return;
        //let api = this.uqApi;
        //return await api.tuidArrGet(this.name, arr, owner, id);
        return await new LoadArrCaller(this, { arr: arr, owner: owner, id: id }).request();
    }
    async saveArr(arr, owner, id, props) {
        //let params = _.clone(props);
        //params["$id"] = id;
        //return await this.uqApi.tuidArrSave(this.name, arr, owner, params);
        return await new SaveArrCaller(this, { arr: arr, owner: owner, id: id, props: props }).request();
    }
    async posArr(arr, owner, id, order) {
        //return await this.uqApi.tuidArrPos(this.name, arr, owner, id, order);
        return await new ArrPosCaller(this, { arr: arr, owner: owner, id: id, order: order }).request();
    }
    async no() {
        return await new TuidNoCaller(this, undefined).request();
    }
}
class TuidCaller extends EntityCaller {
    get entity() { return this._entity; }
    ;
}
// 包含main字段的load id
// 当前为了兼容，先调用的包含所有字段的内容
class GetCaller extends TuidCaller {
    method = 'GET';
    get path() { return `tuid/${this.entity.name}/${this.params}`; }
}
class IdsCaller extends TuidCaller {
    get path() {
        let { divName } = this.params;
        return `tuidids/${this.entity.name}/${divName !== undefined ? divName : '$'}`;
    }
    buildParams() { return this.params.ids; }
    xresult(res) {
        return res.split('\n');
    }
}
class SaveCaller extends TuidCaller {
    get path() { return `tuid/${this.entity.name}`; }
    buildParams() {
        let { fields, arrs } = this.entity.schema;
        let { id, props } = this.params;
        let params = { $id: id };
        this.transParams(params, props, fields);
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let arrName = arr.name;
                let arrParams = [];
                let arrFields = arr.fields;
                let arrValues = props[arrName];
                if (arrValues !== undefined) {
                    for (let arrValue of arrValues) {
                        let row = {};
                        this.transParams(row, arrValue, arrFields);
                        arrParams.push(row);
                    }
                }
                params[arrName] = arrParams;
            }
        }
        return params;
    }
    transParams(values, params, fields) {
        if (params === undefined)
            return;
        for (let field of fields) {
            let { name, tuid, type } = field;
            let val = params[name];
            if (tuid !== undefined) {
                if (typeof val === 'object') {
                    if (val !== null)
                        val = val.id;
                }
            }
            else {
                switch (type) {
                    case 'date':
                        val = this.entity.buildDateParam(val);
                        break;
                    case 'datetime':
                        val = this.entity.buildDateTimeParam(val);
                        break;
                }
            }
            values[name] = val;
        }
    }
}
class SearchCaller extends TuidCaller {
    get path() { return `tuids/${this.entity.name}`; }
}
class AllCaller extends TuidCaller {
    method = 'GET';
    get path() { return `tuid-all/${this.entity.name}`; }
}
class LoadArrCaller extends TuidCaller {
    method = 'GET';
    get path() {
        let { arr, owner, id } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/${id}`;
    }
}
class SavePropCaller extends TuidCaller {
    get path() { return `tuid-prop/${this.entity.name}/`; }
}
class SaveArrCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, props } = this.params;
        let params = Object.assign({}, props);
        params['$id'] = id;
        return params;
    }
}
class ArrPosCaller extends TuidCaller {
    get path() {
        let { arr, owner } = this.params;
        return `tuid-arr-pos/${this.entity.name}/${owner}/${arr}/`;
    }
    buildParams() {
        let { id, order } = this.params;
        return { bid: id, $order: order };
    }
}
class TuidNoCaller extends TuidCaller {
    get path() {
        return `tuid-no/${this.entity.name}/`;
    }
    buildParams() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let date = d.getDate();
        return { year, month, date };
    }
}
export class TuidImport extends Tuid {
    tuidLocal;
    constructor(uq, name, typeId, from) {
        super(uq, name, typeId);
        this.from = from;
    }
    setFrom(tuidLocal) { this.tuidLocal = tuidLocal; }
    from;
    isImport = true;
    getObj(id) { return this.tuidLocal?.getObj(id); }
    /*
    tv(id:number, render?:Render<any>):JSX.Element {
        return this.tuidLocal?.tv(id, render);
    }
    */
    useId(id) { this.tuidLocal?.useId(id); }
    boxId(id) {
        if (!this.tuidLocal)
            debugger;
        return this.tuidLocal?.boxId(id);
    }
    valueFromId(id) { return this.tuidLocal?.valueFromId(id); }
    resetCache(id) {
        this.tuidLocal?.resetCache(id);
    }
    async assureBox(id) {
        await this.tuidLocal.assureBox(id);
        return this.tuidLocal.valueFromId(id);
    }
    get hasDiv() { return this.tuidLocal?.hasDiv; }
    div(name) { return this.tuidLocal?.div(name); }
    async loadMain(id) {
        let ret = await this.tuidLocal.loadMain(id);
        return ret;
    }
    async load(id) {
        return await this.tuidLocal.load(id);
    }
    async save(id, props) {
        return await this.tuidLocal.save(id, props);
    }
    async saveProp(id, prop, value) {
        await this.tuidLocal.saveProp(id, prop, value);
    }
    async all() {
        return await this.tuidLocal.all();
    }
    async search(key, pageStart, pageSize) {
        return await this.tuidLocal.search(key, pageStart, pageSize);
    }
    async searchArr(owner, key, pageStart, pageSize) {
        return await this.tuidLocal.searchArr(owner, key, pageStart, pageSize);
    }
    async loadArr(arr, owner, id) {
        return await this.tuidLocal.loadArr(arr, owner, id);
    }
    async saveArr(arr, owner, id, props) {
        await this.tuidLocal.saveArr(arr, owner, id, props);
    }
    async posArr(arr, owner, id, order) {
        await this.tuidLocal.posArr(arr, owner, id, order);
    }
    async no() {
        return await this.tuidLocal.no();
    }
}
// field._tuid 用这个接口
// Tuid, TuidDiv 实现这个接口
export class TuidBox {
    tuid;
    ownerField = undefined;
    constructor(tuid) {
        this.tuid = tuid;
    }
    boxId(id) {
        return this.tuid.boxId(id);
    }
    getIdFromObj(obj) {
        return this.tuid.getIdFromObj(obj);
    }
    useId(id) {
        return this.tuid.useId(id);
    }
    async showInfo() {
        alert('showInfo not implemented');
    }
}
export class TuidDiv extends TuidInner {
    typeName = 'div';
    // protected cacheFields: Field[];
    tuid;
    //protected idName: string;
    //protected idCache: IdDivCache;
    constructor(uq, tuid, name) {
        super(uq, name, 0);
        this.tuid = tuid;
        this.idName = 'id';
        this.idCache = new IdDivCache(tuid, this);
    }
    get owner() { return this.tuid; }
    buildFieldsTuid() {
        super.buildFieldsTuid();
        let { mainFields } = this.schema;
        if (mainFields === undefined)
            debugger;
        this.uq.buildFieldTuid(this.cacheFields = mainFields);
    }
    buildTuidDivBox(ownerField) {
        return new TuidBoxDiv(this.tuid, this, ownerField);
    }
    getIdFromObj(obj) { return obj[this.idName]; }
    cacheValue(value) {
        this.idCache.cacheValue(value);
    }
    useId(id, defer) {
        if (this.noCache === true)
            return;
        this.idCache.useId(id, defer);
    }
    valueFromId(id) {
        return this.idCache.getValue(id);
    }
    async assureBox(id) {
        await this.idCache.assureObj(id);
        return this.idCache.getValue(id);
    }
    async cacheIds() {
        await this.idCache.cacheIds();
    }
    cacheTuidFieldValues(values) {
        let fields = this.schema.fields;
        this.cacheFieldsInValue(values, fields);
    }
    unpackTuidIds(values) {
        return this.unpackTuidIdsOfFields(values, this.cacheFields);
    }
}
export class TuidBoxDiv extends TuidBox {
    //ownerField: Field;
    div;
    constructor(tuid, div, ownerField) {
        super(tuid);
        this.div = div;
        this.ownerField = ownerField;
    }
    boxId(id) {
        return this.div.boxId(id);
    }
    getIdFromObj(obj) {
        return this.div.getIdFromObj(obj);
    }
    useId(id) {
        return this.div.useId(id);
    }
}
//# sourceMappingURL=tuid.js.map