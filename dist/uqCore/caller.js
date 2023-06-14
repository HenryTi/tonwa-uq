import { Caller } from '../net';
export class EntityCaller extends Caller {
    tries;
    _entity;
    constructor(entity, params, $$user = undefined, waiting = true) {
        super(params, $$user, waiting);
        this.tries = 0;
        this._entity = entity;
    }
    get entity() { return this._entity; }
    //大多的entityCaller都不需要这个
    //buildParams() {return this.entity.buildParams(this.params);}
    async request() {
        await this.entity.loadSchema();
        let ret = await this.innerRequest();
        return ret;
    }
    async innerCall() {
        return await this.entity.uqApi.xcall(this);
    }
    async innerRequest() {
        let jsonResult = await this.innerCall();
        let { $uq, $modify, res } = jsonResult;
        this.entity.uq.pullModify($modify);
        if ($uq === undefined) {
            let ret = this.xresult(res);
            return ret;
        }
        return await this.retry($uq);
    }
    xresult(res) { return res; }
    get headers() {
        let { ver, uq } = this.entity;
        let { uqVersion, unit } = uq;
        return {
            uq: `${uqVersion}`,
            en: `${ver}`,
            unit: unit === undefined ? undefined : String(unit),
        };
    }
    async retry(schema) {
        ++this.tries;
        if (this.tries > 5)
            throw new Error(`${schema.entity.name} can not get right uq response schema, 5 tries`);
        this.rebuildSchema(schema);
        return await this.innerRequest();
    }
    rebuildSchema(schema) {
        let { uq, entity } = schema;
        if (uq !== undefined) {
            this.entity.uq.buildEntities( /*uq*/);
        }
        if (entity !== undefined) {
            this.entity.setSchema(entity);
        }
    }
}
export class ActionCaller extends EntityCaller {
    get entity() { return this._entity; }
}
export class QueryQueryCaller extends EntityCaller {
    get entity() { return this._entity; }
    ;
    get path() { return `query/${this.entity.name}`; }
    xresult(res) {
        let data = this.entity.unpackReturns(res);
        return data;
    }
    buildParams() { return this.entity.buildParams(this.params); }
}
export class QueryPageCaller extends EntityCaller {
    get params() { return this._params; }
    ;
    get entity() { return this._entity; }
    ;
    //results: {[name:string]:any[]};
    get path() { return `query-page/${this.entity.name}`; }
    buildParams() {
        let { pageStart, pageSize, params } = this.params;
        let p;
        if (params === undefined) {
            p = { key: '' };
        }
        else {
            p = this.entity.buildParams(params);
        }
        /*
        switch (typeof params) {
            case 'undefined': p = {key: ''}; break;
            default: p = _.clone(params); break;
        }
        */
        p['$pageStart'] = pageStart;
        p['$pageSize'] = pageSize;
        return p;
    }
    ;
    xresult(res) {
        let ret = this.entity.unpackReturns(res);
        //return this.results.$page;// as any[];
        return ret;
    }
}
//# sourceMappingURL=caller.js.map