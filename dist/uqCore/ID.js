import { Entity } from "./entity";
class UqIBase extends Entity {
    permitRole;
    setPermitRole(role) {
        this.permitRole = role;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqID extends UqIBase {
    get typeName() { return 'id'; }
    create;
    update;
    owner;
    keys;
    async NO() {
        let ret = await this.uqApi.post('id-no', { ID: this.name });
        return ret;
    }
    ;
    setKeys() {
        this.keys = this.schema.keys;
    }
    get isGlobal() {
        return this.schema.global;
    }
    getIdFromObj(value) { return value['id']; }
    valueFromString(str) {
        if (!str)
            return undefined;
        let ret = {};
        this.unpackRow(ret, this.fields, str, 0, 12);
        return ret;
    }
    cacheTuids(defer) { }
    async valueFromId(id) {
        let ret = await this.uq.QueryID({
            ID: this,
            id: [id]
        });
        return ret[0];
    }
    async loadValuesFromIds(divName, ids) {
        let ret = await this.uq.QueryID({
            IDX: [this],
            id: ids
        });
        return ret;
    }
    cacheTuidFieldValues(value) { }
    unpackTuidIds(values) { return; }
    unpackJoins(resultMain, resultJoins) {
        let main = {};
        // let results: any[][] = await this.uqApi.post(`id/${this.name}/${id}`, undefined);
        main = this.unpackStr(resultMain?.value, this.fields, undefined);
        let retJoins = [];
        let p = 0;
        let joins = this.schema.joins;
        for (let join of joins) {
            let { ID: IDName, field: fieldName } = join;
            let IDJoin = this.uq.entities[IDName];
            let { fields } = IDJoin;
            let field = fields.find(v => v.name === fieldName);
            let result = resultJoins[p];
            retJoins.push([IDName, result.map(v => this.unpackStr(v.value, fields, field))]);
            ++p;
        }
        return [[this.name, main], retJoins];
    }
    unpackStr(str, fields, exclude) {
        let ret = {};
        let p = 0;
        let ch0 = 0, ch = 0, c = p, i = 0, len = str.length, fLen = fields.length;
        let sep = 12;
        const setFieldValue = () => {
            let f = fields[i];
            if (f === exclude) {
                ++i;
                f = fields[i];
            }
            let { name } = f;
            if (p > c) {
                let v = str.substring(c, p);
                ret[name] = this.to(ret, v, f);
            }
        };
        for (; p < len; p++) {
            ch0 = ch;
            ch = str.charCodeAt(p);
            if (ch === sep) {
                setFieldValue();
                c = p + 1;
                ++i;
                if (i >= fLen)
                    break;
            }
        }
        setFieldValue();
        return ret;
    }
}
export class ID extends UqID {
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIDX extends UqIBase {
    get typeName() { return 'idx'; }
}
export class IDX extends UqIDX {
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class UqIX extends UqIBase {
    get typeName() { return 'ix'; }
}
export class IX extends UqIX {
}
/* eslint-enable no-unused-vars */
//# sourceMappingURL=ID.js.map