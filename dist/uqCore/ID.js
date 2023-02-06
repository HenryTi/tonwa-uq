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