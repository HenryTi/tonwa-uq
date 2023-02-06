/* eslint-disable */
import { UqApi } from '../net';
import { TuidImport, TuidInner, TuidsCache } from './tuid';
import { Action } from './action';
import { Sheet } from './sheet';
import { Query } from './query';
import { Book } from './book';
import { History } from './history';
import { Map } from './map';
import { Pending } from './pending';
import { capitalCase, UqError } from '../tool';
import { UqEnum } from './enum';
import { ID, IX, IDX } from './ID';
export function fieldDefaultValue(type) {
    switch (type) {
        case 'tinyint':
        case 'smallint':
        case 'int':
        case 'bigint':
        case 'dec':
        case 'float':
        case 'double':
        case 'enum':
            return 0;
        case 'char':
        case 'text':
            return '';
        case 'datetime':
        case 'date':
            return '2000-1-1';
        case 'time':
            return '0:00';
    }
}
function IDPath(path) { return path; }
var EnumResultType;
(function (EnumResultType) {
    EnumResultType[EnumResultType["data"] = 0] = "data";
    EnumResultType[EnumResultType["sql"] = 1] = "sql";
})(EnumResultType || (EnumResultType = {}));
;
export class UqMan {
    entities = {};
    entityTypes = {};
    enums = {};
    actions = {};
    queries = {};
    ids = {};
    idxs = {};
    ixs = {};
    sheets = {};
    books = {};
    maps = {};
    histories = {};
    pendings = {};
    tuidsCache;
    localEntities;
    localMap;
    localModifyMax;
    tuids = {};
    newVersion;
    uqOwner;
    uqName;
    uqSchema;
    name;
    id;
    net;
    uqApi;
    proxy;
    $proxy;
    uqVersion;
    config;
    constructor(net, uqData, uqSchema) {
        this.net = net;
        let { id, uqOwner, uqName, newVersion } = uqData;
        this.newVersion = newVersion;
        this.uqOwner = uqOwner;
        this.uqName = uqName;
        this.uqSchema = uqSchema;
        this.id = id;
        this.name = uqOwner + '/' + uqName;
        this.uqVersion = 0;
        this.localMap = net.createLocalMap(this.name);
        this.localModifyMax = this.localMap.child('$modifyMax');
        this.localEntities = this.localMap.child('$access');
        this.tuidsCache = new TuidsCache(this);
        let baseUrl = 'tv/';
        this.uqApi = new UqApi(this.net, baseUrl, this.name /* this.uqOwner, this.uqName */);
    }
    getID(name) { return this.ids[name.toLowerCase()]; }
    ;
    getIDX(name) { return this.idxs[name.toLowerCase()]; }
    ;
    getIX(name) { return this.ixs[name.toLowerCase()]; }
    ;
    roles;
    async getRoles() {
        if (this.roles !== undefined)
            return this.roles;
        this.roles = await this.uqApi.getRoles();
        return this.roles;
    }
    tuid(name) { return this.tuids[name.toLowerCase()]; }
    tuidDiv(name, div) {
        let tuid = this.tuids[name.toLowerCase()];
        return tuid && tuid.div(div.toLowerCase());
    }
    action(name) { return this.actions[name.toLowerCase()]; }
    sheet(name) { return this.sheets[name.toLowerCase()]; }
    query(name) { return this.queries[name.toLowerCase()]; }
    book(name) { return this.books[name.toLowerCase()]; }
    map(name) { return this.maps[name.toLowerCase()]; }
    history(name) { return this.histories[name.toLowerCase()]; }
    pending(name) { return this.pendings[name.toLowerCase()]; }
    sheetFromTypeId(typeId) {
        for (let i in this.sheets) {
            let sheet = this.sheets[i];
            if (sheet.typeId === typeId)
                return sheet;
        }
    }
    Role;
    tuidArr = [];
    actionArr = [];
    queryArr = [];
    idArr = [];
    idxArr = [];
    ixArr = [];
    enumArr = [];
    sheetArr = [];
    bookArr = [];
    mapArr = [];
    historyArr = [];
    pendingArr = [];
    async loadEntities() {
        try {
            let entities = this.localEntities.get();
            if (!entities) {
                entities = await this.uqApi.loadEntities();
            }
            if (!entities)
                return;
            this.buildEntities(entities);
            return undefined;
        }
        catch (err) {
            return err;
        }
    }
    buildEntities(entities) {
        if (entities === undefined) {
            debugger;
        }
        this.localEntities.set(entities);
        let { access, tuids, role, version, ids } = entities;
        this.uqVersion = version;
        this.Role = this.buildRole(role?.names);
        this.buildTuids(tuids);
        this.buildIds(ids);
        this.buildAccess(access);
    }
    buildRole(roleNames) {
        if (roleNames === undefined)
            return;
        let ret = {};
        for (let i in roleNames) {
            let items = roleNames[i];
            if (i !== '$') {
                items = items.map(v => `${i}.${v}`);
            }
            ret[i] = items;
        }
        return ret;
    }
    buildTuids(tuids) {
        for (let i in tuids) {
            let schema = tuids[i];
            let { typeId, from } = schema;
            let tuid = this.newTuid(i, typeId, from);
            tuid.sys = true;
        }
        for (let i in tuids) {
            let schema = tuids[i];
            let tuid = this.getTuid(i);
            tuid.setSchema(schema);
        }
        for (let i in this.tuids) {
            let tuid = this.tuids[i];
            tuid.buildFieldsTuid();
        }
    }
    buildIds(ids) {
        for (let i in ids) {
            let schema = ids[i];
            let { typeId } = schema;
            let ID = this.newID(i, typeId);
            ID.setSchema(schema);
        }
    }
    async loadEntitySchema(entityName) {
        return await this.uqApi.schema(entityName);
    }
    async loadAllSchemas() {
        let ret = await this.uqApi.allSchemas();
        let entities = [
            this.actionArr,
            this.enumArr,
            this.sheetArr,
            this.queryArr,
            this.bookArr,
            this.mapArr,
            this.historyArr,
            this.pendingArr,
            this.idArr,
            this.idxArr,
            this.ixArr,
        ];
        entities.forEach(arr => {
            arr.forEach(v => {
                let entity = ret[v.name.toLowerCase()];
                if (!entity)
                    return;
                let schema = entity.call;
                if (!schema)
                    return;
                v.buildSchema(schema);
            });
        });
    }
    getTuid(name) {
        return this.tuids[name];
    }
    buildAccess(access) {
        for (let a in access) {
            let v = access[a];
            switch (typeof v) {
                case 'string':
                    this.fromType(a, v);
                    break;
                case 'object':
                    this.fromObj(a, v);
                    break;
            }
        }
    }
    cacheTuids(defer) {
        this.tuidsCache.cacheTuids(defer);
    }
    setEntity(name, entity) {
        this.entities[name] = entity;
        this.entities[name.toLowerCase()] = entity;
        this.entityTypes[entity.typeId] = entity;
    }
    newEnum(name, id) {
        let enm = this.enums[name];
        if (enm !== undefined)
            return enm;
        enm = this.enums[name] = new UqEnum(this, name, id);
        this.setEntity(name, enm);
        this.enumArr.push(enm);
        return enm;
    }
    newAction(name, id) {
        let action = this.actions[name];
        if (action !== undefined)
            return action;
        action = this.actions[name] = new Action(this, name, id);
        this.setEntity(name, action);
        this.actionArr.push(action);
        return action;
    }
    newTuid(name, id, from) {
        let tuid = this.tuids[name];
        if (tuid !== undefined)
            return tuid;
        if (from !== undefined)
            tuid = new TuidImport(this, name, id, from);
        else
            tuid = new TuidInner(this, name, id);
        this.tuids[name] = tuid;
        this.setEntity(name, tuid);
        this.tuidArr.push(tuid);
        return tuid;
    }
    newQuery(name, id) {
        let query = this.queries[name];
        if (query !== undefined)
            return query;
        query = this.queries[name] = new Query(this, name, id);
        this.setEntity(name, query);
        this.queryArr.push(query);
        return query;
    }
    newBook(name, id) {
        let book = this.books[name];
        if (book !== undefined)
            return book;
        book = this.books[name] = new Book(this, name, id);
        this.setEntity(name, book);
        this.bookArr.push(book);
        return book;
    }
    newMap(name, id) {
        let map = this.maps[name];
        if (map !== undefined)
            return map;
        map = this.maps[name] = new Map(this, name, id);
        this.setEntity(name, map);
        this.mapArr.push(map);
        return map;
    }
    newHistory(name, id) {
        let history = this.histories[name];
        if (history !== undefined)
            return;
        history = this.histories[name] = new History(this, name, id);
        this.setEntity(name, history);
        this.historyArr.push(history);
        return history;
    }
    newPending(name, id) {
        let pending = this.pendings[name];
        if (pending !== undefined)
            return;
        pending = this.pendings[name] = new Pending(this, name, id);
        this.setEntity(name, pending);
        this.pendingArr.push(pending);
        return pending;
    }
    newSheet(name, id) {
        let sheet = this.sheets[name];
        if (sheet !== undefined)
            return sheet;
        sheet = this.sheets[name] = new Sheet(this, name, id);
        this.setEntity(name, sheet);
        this.sheetArr.push(sheet);
        return sheet;
    }
    newID(name, id) {
        let lName = name.toLowerCase();
        let idEntity = this.ids[lName];
        if (idEntity !== undefined)
            return idEntity;
        idEntity = this.ids[lName] = new ID(this, name, id);
        this.setEntity(name, idEntity);
        this.idArr.push(idEntity);
        return idEntity;
    }
    newIDX(name, id) {
        let lName = name.toLowerCase();
        let idx = this.idxs[lName];
        if (idx !== undefined)
            return idx;
        idx = this.idxs[lName] = new IDX(this, name, id);
        this.setEntity(name, idx);
        this.idxArr.push(idx);
        return idx;
    }
    newIX(name, id) {
        let lName = name.toLowerCase();
        let ix = this.ixs[lName];
        if (ix !== undefined)
            return ix;
        ix = this.ixs[lName] = new IX(this, name, id);
        this.setEntity(name, ix);
        this.ixArr.push(ix);
        return ix;
    }
    fromType(name, type) {
        let parts = type.split('|');
        type = parts[0];
        let id = Number(parts[1]);
        switch (type) {
            default:
                break;
            //case 'uq': this.id = id; break;
            case 'tuid':
                // Tuid should not be created here!;
                //let tuid = this.newTuid(name, id);
                //tuid.sys = false;
                break;
            case 'id':
                this.newID(name, id);
                break;
            case 'idx':
                this.newIDX(name, id);
                break;
            case 'ix':
                this.newIX(name, id);
                break;
            case 'action':
                this.newAction(name, id);
                break;
            case 'query':
                this.newQuery(name, id);
                break;
            case 'book':
                this.newBook(name, id);
                break;
            case 'map':
                this.newMap(name, id);
                break;
            case 'history':
                this.newHistory(name, id);
                break;
            case 'sheet':
                this.newSheet(name, id);
                break;
            case 'pending':
                this.newPending(name, id);
                break;
            case 'enum':
                this.newEnum(name, id);
                break;
        }
    }
    fromObj(name, obj) {
        switch (obj['$']) {
            case 'sheet':
                this.buildSheet(name, obj);
                break;
        }
    }
    buildSheet(name, obj) {
        let sheet = this.sheets[name];
        if (sheet === undefined)
            sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
    }
    buildFieldTuid(fields, mainFields) {
        if (fields === undefined)
            return;
        for (let f of fields) {
            let { tuid } = f;
            if (tuid === undefined)
                continue;
            let t = this.getTuid(tuid);
            if (t === undefined)
                continue;
            f._tuid = t.buildTuidBox();
        }
        for (let f of fields) {
            let { owner } = f;
            if (owner === undefined)
                continue;
            let ownerField = fields.find(v => v.name === owner);
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find(v => v.name === owner);
                }
                if (ownerField === undefined) {
                    debugger;
                    throw new Error(`owner field ${owner} is undefined`);
                }
            }
            let { arr, tuid } = f;
            let t = this.getTuid(ownerField._tuid.tuid.name);
            if (t === undefined)
                continue;
            let div = t.div(arr || tuid);
            f._tuid = div && div.buildTuidDivBox(ownerField);
        }
    }
    buildArrFieldsTuid(arrFields, mainFields) {
        if (arrFields === undefined)
            return;
        for (let af of arrFields) {
            let { fields } = af;
            if (fields === undefined)
                continue;
            this.buildFieldTuid(fields, mainFields);
        }
    }
    pullModify(modifyMax) {
        this.tuidsCache.pullModify(modifyMax);
    }
    getUqKey() {
        let uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        return uqKey;
    }
    getUqKeyWithConfig() {
        if (!this.config)
            return;
        let uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        let { dev, alias } = this.config;
        uqKey = capitalCase(dev.alias || dev.name) + capitalCase(alias ?? uqKey);
        return uqKey;
    }
    hasEntity(name) {
        return this.entities[name] !== undefined
            || this.entities[name.toLowerCase()] !== undefined;
    }
    createProxy() {
        let ret = new Proxy(this.entities, {
            get: (target, key, receiver) => {
                let lk = key.toLowerCase();
                if (lk[0] === '$') {
                    switch (lk) {
                        default: throw new Error(`unknown ${lk} property in uq`);
                        case '$': return this.$proxy;
                        case '$name': return this.name;
                    }
                }
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                let func = this[key];
                if (func !== undefined)
                    return func;
                this.errUndefinedEntity(String(key));
            }
        });
        this.proxy = ret;
        this.$proxy = new Proxy(this.entities, {
            get: (target, key, receiver) => {
                let lk = key.toLowerCase();
                let ret = target[lk];
                if (ret !== undefined)
                    return ret;
                let func = this['$' + key];
                if (func !== undefined)
                    return func;
                this.errUndefinedEntity(String(key));
            }
        });
        //this.idCache = new IDCache(this);
        return ret;
    }
    errUndefinedEntity(entity) {
        let err = new Error(`entity ${this.name}.${entity} not defined`);
        err.name = UqError.undefined_entity;
        throw err;
    }
    async apiPost(api, resultType, apiParam) {
        if (resultType === EnumResultType.sql)
            api = 'sql-' + api;
        let ret = await this.uqApi.post(IDPath(api), apiParam);
        return ret;
    }
    async apiActs(param, resultType) {
        // 这边的obj属性序列，也许会不一样
        let arr = [];
        let apiParam = {};
        for (let i in param) {
            arr.push(i);
            apiParam[i] = param[i].map(v => this.buildValue(v));
        }
        apiParam['$'] = arr;
        let ret = await this.apiPost('acts', resultType, apiParam);
        return ret;
    }
    buildValue(v) {
        if (!v)
            return v;
        let obj = {};
        for (let j in v) {
            let val = v[j];
            if (j === 'ID') {
                switch (typeof val) {
                    case 'object':
                        val = val.name;
                        break;
                }
            }
            else if (j === 'time') {
                if (val) {
                    if (Object.prototype.toString.call(val) === '[object Date]') {
                        val = val.getTime();
                    }
                }
            }
            else if (typeof val === 'object') {
                let id = val['id'];
                if (id === undefined) {
                    val = this.buildValue(val);
                }
                else {
                    val = id;
                }
            }
            obj[j] = val;
        }
        return obj;
    }
    Acts = async (param) => {
        //let apiParam = this.ActsApiParam(param);
        let ret = await this.apiActs(param, EnumResultType.data); // await this.apiPost('acts', apiParam);
        let retArr = ret[0].ret.split('\n');
        let arr = [];
        for (let i in param)
            arr.push(i);
        let retActs = {};
        for (let i = 0; i < arr.length; i++) {
            retActs[arr[i]] = ids(retArr[i].split('\t'));
        }
        return retActs;
    };
    AdminGetList = async () => {
        return await this.uqApi.getAdmins();
    };
    AdminSetMe = async () => {
        return await this.uqApi.setMeAdmin();
    };
    AdminSet = async (user, role, assigned) => {
        return await this.uqApi.setAdmin(user, role, assigned);
    };
    AdminIsMe = async () => {
        return await this.uqApi.isAdmin();
    };
    IDValue = (type, value) => {
        if (!type)
            return;
        let ID = this.ids[type.toLowerCase()];
        if (ID === undefined)
            return;
        return ID.valueFromString(value);
    };
    $Acts = async (param) => {
        return await this.apiActs(param, EnumResultType.sql);
    };
    async apiActIX(param, resultType) {
        let { IX, ID, values, IXs } = param;
        let apiParam = {
            IX: entityName(IX),
            ID: entityName(ID),
            IXs: IXs?.map((v) => ({ IX: entityName(v.IX), ix: v.ix })),
            values: values?.map((v) => this.buildValue(v)),
        };
        let ret = await this.apiPost('act-ix', resultType, apiParam);
        return ret;
    }
    ActIX = async (param) => {
        let ret = await this.apiActIX(param, EnumResultType.data);
        return ret[0].ret.split('\t').map(v => Number(v));
    };
    $ActIX = async (param) => {
        let ret = await this.apiActIX(param, EnumResultType.sql);
        return ret;
    };
    async apiActIxSort(param, resultType) {
        let { IX, ix, id, after } = param;
        let apiParam = {
            IX: entityName(IX),
            ix,
            id,
            after,
        };
        return await this.apiPost('act-ix-sort', resultType, apiParam);
    }
    ActIXSort = async (param) => {
        return await this.apiActIxSort(param, EnumResultType.data);
    };
    $ActIXSort = async (param) => {
        return await this.apiActIxSort(param, EnumResultType.sql);
    };
    ActIDProp = async (ID, id, name, value) => {
        await this.uqApi.post('act-id-prop', { ID: ID.name, id, name, value });
    };
    ActID = async (param) => {
        let ret = await this.apiActID(param, EnumResultType.data);
        let r = ret[0].ret.split('\t').map(v => Number(v))[0];
        if (isNaN(r) === true)
            return undefined;
        return r;
    };
    $ActID = async (param) => {
        let ret = await this.apiActID(param, EnumResultType.sql);
        return ret;
    };
    async apiActID(param, resultType) {
        let { ID, value, IX, ix } = param;
        let apiParam = {
            ID: entityName(ID),
            value: this.buildValue(value),
            IX: IX?.map(v => entityName(v)),
            ix: ix?.map(v => this.buildValue(v)),
        };
        return await this.apiPost('act-id', resultType, apiParam);
    }
    async apiActDetail(param, resultType) {
        let { main, detail, detail2, detail3 } = param;
        let postParam = {
            main: {
                name: entityName(main.ID),
                value: toScalars(main.value),
            },
            detail: {
                name: entityName(detail.ID),
                values: detail.values?.map(v => toScalars(v)),
            },
        };
        if (detail2) {
            postParam.detail2 = {
                name: entityName(detail2.ID),
                values: detail2.values?.map(v => toScalars(v)),
            };
        }
        if (detail3) {
            postParam.detail3 = {
                name: entityName(detail3.ID),
                values: detail3.values?.map(v => toScalars(v)),
            };
        }
        let ret = await this.apiPost('act-detail', resultType, postParam);
    }
    ActDetail = async (param) => {
        let ret = await this.apiActDetail(param, EnumResultType.data);
        let val = ret[0].ret;
        let parts = val.split('\n');
        let items = parts.map(v => v.split('\t'));
        ret = {
            main: ids(items[0])[0],
            detail: ids(items[1]),
            detail2: ids(items[2]),
            detail3: ids(items[3]),
        };
        return ret;
    };
    $ActDetail = async (param) => {
        return await this.apiActDetail(param, EnumResultType.sql);
    };
    async apiQueryID(param, resultType) {
        let { ID, IX, IDX } = param;
        if (!IDX) {
            IDX = [ID];
        }
        let ret = await this.apiPost('query-id', resultType, {
            ...param,
            ID: entityName(ID),
            IX: IX?.map(v => entityName(v)),
            IDX: this.IDXToString(IDX),
        });
        return ret;
    }
    QueryID = async (param) => {
        return await this.apiQueryID(param, EnumResultType.data);
    };
    $QueryID = async (param) => {
        return await this.apiQueryID(param, EnumResultType.sql);
    };
    async apiIDTv(ids, resultType) {
        let ret = await this.apiPost('id-tv', resultType, ids);
        return ret;
    }
    async syncUser(user) {
        return await this.uqApi.syncUser(user);
    }
    IDTv = async (ids) => {
        let ret = await this.apiIDTv(ids, EnumResultType.data);
        let retValues = [];
        for (let row of ret) {
            let { $type, $tv } = row;
            if (!$tv)
                continue;
            let ID = this.ids[$type];
            if (!ID)
                continue;
            let { schema } = ID;
            if (!schema) {
                await ID.loadSchema();
                schema = ID.schema;
            }
            let { nameNoVice } = schema;
            if (!nameNoVice)
                continue;
            let values = $tv.split('\n');
            let len = nameNoVice.length;
            for (let i = 0; i < len; i++) {
                let p = nameNoVice[i];
                row[p] = values[i];
            }
            delete row.$tv;
            retValues.push(row);
        }
        return retValues;
    };
    $IDTv = async (ids) => {
        return await this.apiIDTv(ids, EnumResultType.sql);
    };
    async apiIDNO(param, resultType) {
        let { ID, stamp } = param;
        let ret = await this.apiPost('id-no', resultType, { ID: entityName(ID), stamp });
        return ret;
    }
    IDNO = async (param) => {
        return await this.apiIDNO(param, EnumResultType.data);
    };
    IDEntity = (typeId) => {
        return this.entityTypes[typeId];
    };
    $IDNO = async (param) => {
        return await this.apiIDNO(param, EnumResultType.sql);
    };
    async apiIDDetailGet(param, resultType) {
        let { id, main, detail, detail2, detail3 } = param;
        let ret = await this.apiPost('id-detail-get', resultType, {
            id,
            main: entityName(main),
            detail: entityName(detail),
            detail2: entityName(detail2),
            detail3: entityName(detail3),
        });
        return ret;
    }
    IDDetailGet = async (param) => {
        return await this.apiIDDetailGet(param, EnumResultType.data);
    };
    $IDDetailGet = async (param) => {
        return await this.apiIDDetailGet(param, EnumResultType.sql);
    };
    IDXToString(p) {
        if (Array.isArray(p) === true)
            return p.map(v => entityName(v));
        return entityName(p);
    }
    async apiID(param, resultType) {
        let { IDX } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost('id', resultType, {
            ...param,
            IDX: this.IDXToString(IDX),
        });
        return ret;
    }
    cache = {};
    cachePromise = {};
    idObj = async (id) => {
        let obj = this.cache[id];
        if (obj === undefined) {
            let promise = this.cachePromise[id];
            if (promise === undefined) {
                promise = this.apiID(({ id, IDX: undefined }), EnumResultType.data);
                this.cachePromise[id] = promise;
            }
            let ret = await promise;
            obj = ret[0];
            this.cache[id] = (obj === undefined) ? null : obj;
            delete this.cachePromise[id];
        }
        return obj;
    };
    ID = async (param) => {
        return await this.apiID(param, EnumResultType.data);
    };
    $ID = async (param) => {
        return await this.apiID(param, EnumResultType.sql);
    };
    async apiKeyID(param, resultType) {
        let { ID, IDX } = param;
        let ret = await this.apiPost('key-id', resultType, {
            ...param,
            ID: entityName(ID),
            IDX: IDX?.map(v => entityName(v)),
        });
        return ret;
    }
    KeyID = async (param) => {
        return await this.apiKeyID(param, EnumResultType.data);
    };
    $KeyID = async (param) => {
        return await this.apiKeyID(param, EnumResultType.sql);
    };
    async apiIX(param, resultType) {
        let { IX, IX1, IDX } = param;
        //this.checkParam(null, IDX, IX, id, null, page);
        let ret = await this.apiPost('ix', resultType, {
            ...param,
            IX: entityName(IX),
            IX1: entityName(IX1),
            IDX: IDX?.map(v => entityName(v)),
        });
        return ret;
    }
    IX = async (param) => {
        return await this.apiIX(param, EnumResultType.data);
    };
    $IX = async (param) => {
        return await this.apiIX(param, EnumResultType.sql);
    };
    async apiIXValues(param, resultType) {
        let { IX } = param;
        let ret = await this.apiPost('ix-values', resultType, {
            ...param,
            IX: entityName(IX),
        });
        return ret;
    }
    IXValues = async (param) => {
        return await this.apiIXValues(param, EnumResultType.data);
    };
    async apiIXr(param, resultType) {
        let { IX, IX1, IDX } = param;
        //this.checkParam(null, IDX, IX, id, null, page);
        let ret = await this.apiPost('ixr', resultType, {
            ...param,
            IX: entityName(IX),
            IX1: entityName(IX1),
            IDX: IDX?.map(v => entityName(v)),
        });
        return ret;
    }
    IXr = async (param) => {
        return await this.apiIXr(param, EnumResultType.data);
    };
    $IXr = async (param) => {
        return await this.apiIXr(param, EnumResultType.sql);
    };
    async apiKeyIX(param, resultType) {
        let { ID, IX, IDX } = param;
        //this.checkParam(ID, IDX, IX, null, key, page);
        let ret = await this.apiPost('key-ix', resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX),
            IDX: IDX?.map(v => entityName(v)),
        });
        return ret;
    }
    KeyIX = async (param) => {
        return await this.apiKeyIX(param, EnumResultType.data);
    };
    $KeyIX = async (param) => {
        return await this.apiKeyIX(param, EnumResultType.sql);
    };
    async apiIDLog(param, resultType) {
        let { IDX } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost('id-log', resultType, {
            ...param,
            IDX: entityName(IDX),
        });
        return ret;
    }
    IDLog = async (param) => {
        return await this.apiIDLog(param, EnumResultType.data);
    };
    $IDLog = async (param) => {
        return await this.apiIDLog(param, EnumResultType.sql);
    };
    async apiIDSum(param, resultType) {
        let { IDX } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost('id-sum', resultType, {
            ...param,
            IDX: entityName(IDX),
        });
        return ret;
    }
    IDSum = async (param) => {
        return await this.apiIDSum(param, EnumResultType.data);
    };
    $IDSum = async (param) => {
        return await this.apiIDSum(param, EnumResultType.sql);
    };
    async apiIDinIX(param, resultType) {
        let { ID, IX } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost('id-in-ix', resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX),
        });
        return ret;
    }
    IDinIX = async (param) => {
        return await this.apiIDinIX(param, EnumResultType.data);
    };
    $IDinIX = async (param) => {
        return await this.apiIDinIX(param, EnumResultType.sql);
    };
    async apiIDxID(param, resultType) {
        let { ID, IX, ID2 } = param;
        //this.checkParam(null, IDX, null, id, null, page);
        let ret = await this.apiPost('id-x-id', resultType, {
            ...param,
            ID: entityName(ID),
            IX: entityName(IX),
            ID2: entityName(ID2),
        });
        return ret;
    }
    IDxID = async (param) => {
        return await this.apiIDxID(param, EnumResultType.data);
    };
    $IDxID = async (param) => {
        return await this.apiIDxID(param, EnumResultType.sql);
    };
    async apiIDTree(param, resultType) {
        let { ID } = param;
        let ret = await this.apiPost('id-tree', resultType, {
            ...param,
            ID: entityName(ID),
        });
        return ret;
    }
    IDTree = async (param) => {
        return await this.apiIDTree(param, EnumResultType.data);
    };
    $IDTree = async (param) => {
        return await this.apiIDTree(param, EnumResultType.sql);
    };
}
function ids(item) {
    if (!item)
        return;
    let len = item.length;
    if (len <= 1)
        return;
    let ret = [];
    for (let i = 0; i < len - 1; i++)
        ret.push(Number(item[i]));
    return ret;
}
function entityName(entity) {
    if (!entity)
        return;
    if (typeof entity === 'string')
        return entity;
    return entity.name;
}
function toScalars(value) {
    if (!value)
        return value;
    let ret = {};
    for (let i in value) {
        let v = value[i];
        if (typeof v === 'object')
            v = v['id'];
        ret[i] = v;
    }
    return ret;
}
//# sourceMappingURL=uqMan.js.map