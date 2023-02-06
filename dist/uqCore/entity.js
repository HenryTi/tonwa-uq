import { getObjPropIgnoreCase } from '../tool';
const tab = '\t';
const ln = '\n';
const chars = '\\ntbfvr';
const codeBackSlash = chars.charCodeAt(0);
const codeN = chars.charCodeAt(1);
const codeT = chars.charCodeAt(2);
const codeB = chars.charCodeAt(3);
const codeF = chars.charCodeAt(4);
const codeV = chars.charCodeAt(5);
const codeR = chars.charCodeAt(6);
const codes = '\n\t\b\f\v\r';
const codeBN = codes.charCodeAt(0);
const codeBT = codes.charCodeAt(1);
const codeBB = codes.charCodeAt(2);
const codeBF = codes.charCodeAt(3);
const codeBV = codes.charCodeAt(4);
const codeBR = codes.charCodeAt(5);
export class Entity {
    jName;
    schema;
    ver = 0;
    sys;
    uq;
    name;
    typeId;
    schemaLocal;
    uqApi;
    get sName() { return this.jName || this.name; }
    fields;
    arrFields;
    returns;
    constructor(uq, name, typeId) {
        this.uq = uq;
        this.name = name;
        this.typeId = typeId;
        this.sys = this.name.indexOf('$') >= 0;
        this.schemaLocal = this.uq.localMap.item(this.name); // new EntityCache(this);
        this.uqApi = this.uq.uqApi;
    }
    face; // 对应字段的label, placeHolder等等的中文，或者语言的翻译
    fieldMaps = {};
    fieldMap(arr) {
        if (arr === undefined)
            arr = '$';
        let ret = this.fieldMaps[arr];
        if (ret === undefined) {
            let fields;
            if (arr === '$')
                fields = this.fields;
            else if (this.arrFields !== undefined) {
                let arrFields = this.arrFields.find(v => v.name === arr);
                if (arrFields !== undefined)
                    fields = arrFields.fields;
            }
            else if (this.returns !== undefined) {
                let arrFields = this.returns.find(v => v.name === arr);
                if (arrFields !== undefined)
                    fields = arrFields.fields;
            }
            if (fields === undefined)
                return {};
            ret = {};
            for (let f of fields)
                ret[f.name] = f;
            this.fieldMaps[arr] = ret;
        }
        return ret;
    }
    async loadSchema() {
        if (this.schema !== undefined)
            return;
        let schema = this.schemaLocal.get();
        if (!schema) {
            schema = await this.uq.loadEntitySchema(this.name);
        }
        //this.setSchema(schema);
        //this.buildFieldsTuid();
        this.buildSchema(schema);
        await this.loadValues();
    }
    buildSchema(schema) {
        this.setSchema(schema);
        this.buildFieldsTuid();
        //await this.loadValues();
    }
    async loadValues() { }
    // 如果要在setSchema里面保存cache，必须先调用clearSchema
    clearSchema() {
        this.schema = undefined;
    }
    setSchema(schema) {
        if (schema === undefined)
            return;
        let { name, version, permit } = schema;
        this.ver = version || 0;
        this.setJName(name);
        this.schemaLocal.set(schema);
        this.schema = schema;
        this.buildFieldsTuid();
        this.setPermitRole(this.getPermitRole(permit));
    }
    getPermitRole(permit) {
        if (permit === undefined)
            return undefined;
        let p = permit.indexOf('+');
        if (p < 0)
            return permit;
        return permit.substring(0, p);
    }
    setPermitRole(role) {
    }
    setJName(name) {
        if (name !== this.name)
            this.jName = name;
    }
    setKeys() {
    }
    buildFieldsTuid() {
        let { fields, arrs, returns } = this.schema;
        this.fields = fields;
        this.setKeys();
        this.uq.buildFieldTuid(fields);
        this.arrFields = arrs;
        this.uq.buildArrFieldsTuid(arrs, fields);
        this.returns = returns;
        this.uq.buildArrFieldsTuid(returns, fields);
    }
    schemaStringify() {
        return JSON.stringify(this.schema, (key, value) => {
            if (key === '_tuid')
                return undefined;
            return value;
        }, 4);
    }
    tuidFromName(fieldName, arrName) {
        if (this.schema === undefined)
            return;
        let { fields, arrs } = this.schema;
        let entities = this.uq;
        function getTuid(fn, fieldArr) {
            if (fieldArr === undefined)
                return;
            let f = fieldArr.find(v => v.name === fn);
            if (f === undefined)
                return;
            return entities.getTuid(f.tuid);
        }
        let fn = fieldName.toLowerCase();
        if (arrName === undefined)
            return getTuid(fn, fields);
        if (arrs === undefined)
            return;
        let an = arrName.toLowerCase();
        let arr = arrs.find(v => v.name === an);
        if (arr === undefined)
            return;
        return getTuid(fn, arr.fields);
    }
    buildParams(params) {
        let result = {};
        let fields = this.fields;
        if (fields !== undefined)
            this.buildFieldsParams(result, fields, params);
        let arrs = this.arrFields;
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let paramsArr = params[name];
                if (paramsArr === undefined)
                    continue;
                let arrResult = [];
                result[name] = arrResult;
                for (let pa of params) {
                    let rowResult = {};
                    this.buildFieldsParams(rowResult, fields, pa);
                    arrResult.push(rowResult);
                }
            }
        }
        return result;
    }
    buildFieldsParams(result, fields, params) {
        for (let field of fields) {
            let { name, type } = field;
            let d = params[name];
            let val;
            switch (type) {
                case 'datetime':
                    val = this.buildDateTimeParam(d);
                    break;
                case 'date':
                    if (d instanceof Date) {
                        val = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
                    }
                    else {
                        val = d;
                    }
                    break;
                default:
                    switch (typeof d) {
                        default:
                            val = d;
                            break;
                        case 'object':
                            if (d instanceof Date) {
                                val = d;
                                break;
                            }
                            let tuid = field._tuid;
                            if (tuid === undefined)
                                val = d.id;
                            else
                                val = tuid.getIdFromObj(d);
                            break;
                    }
                    break;
            }
            result[name] = val;
        }
    }
    buildDateTimeParam(val) {
        let dt;
        switch (typeof val) {
            default:
                debugger;
                throw new Error('escape datetime field in pack data error: value=' + val);
            case 'undefined': return undefined;
            case 'object':
                dt = val;
                break;
            case 'string':
            case 'number':
                dt = new Date(val);
                break;
        }
        return Math.floor(dt.getTime() / 1000);
    }
    buildDateParam(val) {
        let dt;
        switch (typeof val) {
            default:
                debugger;
                throw new Error('escape datetime field in pack data error: value=' + val);
            case 'undefined': return '';
            case 'string': return val;
            case 'object':
                dt = val;
                break;
            case 'number':
                dt = new Date(val);
                break;
        }
        let ret = dt.toISOString();
        let p = ret.indexOf('T');
        return p > 0 ? ret.substr(0, p) : ret;
    }
    pack(data) {
        let ret = [];
        let fields = this.fields;
        if (fields !== undefined)
            this.packRow(ret, fields, data);
        let arrs = this.arrFields;
        if (arrs !== undefined) {
            for (let arr of arrs) {
                let { name, fields } = arr;
                let arrData = getObjPropIgnoreCase(data, name);
                //if (!arrData) arrData = data[name.toLowerCase()];
                this.packArr(ret, fields, arrData);
            }
        }
        return ret.join('');
    }
    escape(row, field) {
        let d = row[field.name];
        if (d === null)
            return '';
        switch (field.type) {
            case 'datetime':
                return this.buildDateTimeParam(d);
            default:
                switch (typeof d) {
                    default: return d;
                    case 'object':
                        let tuid = field._tuid;
                        if (tuid === undefined)
                            return d.id;
                        return tuid.getIdFromObj(d);
                    case 'string':
                        let len = d.length;
                        let r = '', p = 0;
                        for (let i = 0; i < len; i++) {
                            let c = d.charCodeAt(i), ch;
                            switch (c) {
                                default: continue;
                                case codeBackSlash:
                                    ch = '\\\\';
                                    break;
                                case codeBT:
                                    ch = '\\t';
                                    break;
                                case codeBN:
                                    ch = '\\n';
                                    break;
                                case codeBF:
                                    ch = '\\f';
                                    break;
                                case codeBV:
                                    ch = '\\v';
                                    break;
                                case codeBB:
                                    ch = '\\b';
                                    break;
                                case codeBR:
                                    ch = '\\r';
                                    break;
                            }
                            r += d.substring(p, i) + ch;
                            p = i + 1;
                        }
                        return r + d.substring(p);
                    case 'undefined': return '';
                }
        }
    }
    packRow(result, fields, data) {
        let len = fields.length;
        if (len === 0) {
            result.push(ln);
            return;
        }
        let ret = '';
        ret += this.escape(data, fields[0]);
        for (let i = 1; i < len; i++) {
            let f = fields[i];
            ret += tab + this.escape(data, f);
        }
        result.push(ret + ln);
    }
    packArr(result, fields, data) {
        if (data !== undefined) {
            if (data.length === 0) {
                result.push(ln);
            }
            else {
                for (let row of data) {
                    this.packRow(result, fields, row);
                }
            }
        }
        else {
            result.push(ln);
        }
        result.push(ln);
    }
    cacheFieldsInValue(values, fields) {
        for (let f of fields) {
            let { name, _tuid } = f;
            if (_tuid === undefined)
                continue;
            let id = values[name];
            //_tuid.useId(id);
            values[name] = _tuid.boxId(id);
        }
    }
    unpackTuidIdsOfFields(values, fields) {
        if (fields === undefined) {
            return values;
        }
        let ret = [];
        for (let ln of values) {
            if (!ln)
                continue;
            let len = ln.length;
            let p = 0;
            while (p < len) {
                let ch = ln.charCodeAt(p);
                if (ch === 10) {
                    ++p;
                    break;
                }
                let row = {};
                p = this.unpackRow(row, fields, ln, p);
                ret.push(row);
            }
        }
        return ret;
    }
    unpackSheet(data) {
        let ret = {}; //new this.newMain();
        //if (schema === undefined || data === undefined) return;
        let fields = this.fields;
        let p = 0;
        if (fields !== undefined)
            p = this.unpackRow(ret, fields, data, p);
        let arrs = this.arrFields; //schema['arrs'];
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    unpackReturns(data, returns) {
        if (data === undefined)
            debugger;
        let ret = {};
        let p = 0;
        let arrs = returns || this.returns;
        if (arrs !== undefined) {
            for (let arr of arrs) {
                p = this.unpackArr(ret, arr, data, p);
            }
        }
        return ret;
    }
    // ch=8 backspace, 有什么特别意义吗？看不懂 2022-8-16
    // 根据代码看起来，像是null的意思
    unpackRow(ret, fields, data, p, sep = 9) {
        let ch0 = 0, ch = 0, c = p, i = 0, len = data.length, fLen = fields.length;
        const setFieldValue = () => {
            let f = fields[i];
            let { name } = f;
            if (ch0 !== 8) {
                if (p > c) {
                    let v = data.substring(c, p);
                    ret[name] = this.to(ret, v, f);
                }
            }
            else {
                ret[name] = null;
            }
        };
        for (; p < len; p++) {
            ch0 = ch;
            ch = data.charCodeAt(p);
            if (ch === sep) {
                setFieldValue();
                /*
                let f = fields[i];
                let { name } = f;
                if (ch0 !== 8) {
                    if (p > c) {
                        let v = data.substring(c, p);
                        ret[name] = this.to(ret, v, f);
                    }
                }
                else {
                    ret[name] = null;
                }
                */
                c = p + 1;
                ++i;
                if (i >= fLen) {
                    p = data.indexOf('\n', c);
                    if (p >= 0)
                        ++p;
                    else
                        p = len;
                    return p;
                }
            }
            else if (ch === 10) {
                let f = fields[i];
                let { name } = f;
                if (ch0 !== 8) {
                    if (p > c) {
                        let v = data.substring(c, p);
                        ret[name] = this.to(ret, v, f);
                    }
                }
                else {
                    ret[name] = null;
                }
                ++p;
                ++i;
                return p;
            }
        }
        setFieldValue();
        /*
        let f = fields[i];
        let { name } = f;
        if (ch0 !== 8) {
            let v = data.substring(c);
            ret[name] = this.to(ret, v, f);
        }
        */
        return len;
    }
    to(ret, v, f) {
        switch (f.type) {
            default: return v;
            case 'text':
            case 'char':
                return this.reverseNT(v);
            //case 'time':
            case 'datetime':
            case 'timestamp':
                let n = Number(v);
                let date = isNaN(n) === true ? new Date(v) : new Date(n * 1000);
                return date;
            /*
            case 'date':
                let parts = v.split('-');
                return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
            */
            case 'enum':
            case 'tinyint':
            case 'smallint':
            case 'int':
            case 'bigint':
            case 'dec':
            case 'float':
            case 'double':
                return Number(v);
            case 'id':
                let id = Number(v);
                let { _tuid } = f;
                if (_tuid === undefined)
                    return id;
                return _tuid.boxId(id);
        }
    }
    reverseNT(text) {
        if (text === undefined)
            return;
        if (text === null)
            return;
        let len = text.length;
        let r = '';
        let p = 0;
        for (let i = 0; i < len; i++) {
            let c = text.charCodeAt(i);
            if (c === codeBackSlash) {
                if (i === len - 1)
                    break;
                let c1 = text.charCodeAt(i + 1);
                let ch;
                switch (c1) {
                    default: continue;
                    case codeBackSlash:
                        ch = '\\';
                        break;
                    case codeN:
                        ch = '\n';
                        break;
                    case codeT:
                        ch = '\t';
                        break;
                    case codeB:
                        ch = '\b';
                        break;
                    case codeF:
                        ch = '\f';
                        break;
                    case codeV:
                        ch = '\v';
                        break;
                    case codeR:
                        ch = '\r';
                        break;
                }
                r += text.substring(p, i) + ch;
                p = i + 2;
                ++i;
            }
        }
        r += text.substring(p, len);
        return r;
    }
    unpackArr(ret, arr, data, p) {
        let p0 = p;
        let vals = [], len = data.length;
        let { name, fields } = arr;
        while (p < len) {
            let ch = data.charCodeAt(p);
            if (ch === 10) {
                if (p === p0) {
                    ch = data.charCodeAt(p);
                    if (ch !== 10) {
                        throw new Error('upackArr: arr第一个字符是10，则必须紧跟一个10，表示整个arr的结束');
                    }
                    ++p;
                }
                ++p;
                break;
            }
            let val = {}; //new creater();
            vals.push(val);
            p = this.unpackRow(val, fields, data, p);
        }
        ret[name] = vals;
        return p;
    }
}
//# sourceMappingURL=entity.js.map