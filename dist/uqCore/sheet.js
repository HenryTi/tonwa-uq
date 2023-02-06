import { Entity } from './entity';
import { EntityCaller } from './caller';
export class UqSheet extends Entity {
    get typeName() { return 'sheet'; }
    states;
    verify;
    /*
    setStates(states: SheetState[]) {
        for (let state of states) {
            this.setStateAccess(this.states.find(s=>s.name==state.name), state);
        }
    }*/
    setSchema(schema) {
        super.setSchema(schema);
        this.states = schema.states;
        this.verify = schema.verify;
    }
    build(obj) {
        this.states = [];
        for (let op of obj.ops) {
            this.states.push({ name: op, actions: undefined });
        }
        /*
        for (let p in obj) {
            switch(p) {
                case '#':
                case '$': continue;
                default: this.states.push(this.createSheetState(p, obj[p])); break;
            }
        }*/
    }
    createSheetState(name, obj) {
        let ret = { name: name, actions: [] };
        let actions = ret.actions;
        for (let p in obj) {
            let action = { name: p };
            actions.push(action);
        }
        return ret;
    }
    async save(discription, data) {
        let { id } = this.uq;
        let params = { app: id, discription: discription, data: data };
        return await new SaveCaller(this, params).request();
    }
    async saveDebugDirect(discription, data) {
        let { id } = this.uq;
        let params = { app: id, discription: discription, data: data };
        return await new SaveDirectCaller(this, params).request();
    }
    async action(id, flow, state, action) {
        return await new ActionCaller(this, { id: id, flow: flow, state: state, action: action }).request();
    }
    async actionDebugDirect(id, flow, state, action) {
        return await new ActionDirectCaller(this, { id: id, flow: flow, state: state, action: action }).request();
    }
    unpack(data) {
        //if (this.schema === undefined) await this.loadSchema();
        let ret = data[0];
        let brief = ret[0];
        let sheetData = this.unpackSheet(brief.data);
        let flows = data[1];
        return {
            brief: brief,
            data: sheetData,
            flows: flows,
        };
    }
    async getSheet(id) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.getSheet(this.name, id);
        */
        let ret = await new GetSheetCaller(this, id).request();
        if (ret[0].length === 0)
            return await this.getArchive(id);
        return this.unpack(ret);
    }
    async getArchive(id) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.sheetArchive(this.name, id)
        return this.unpack(ret);
        */
        let ret = await new SheetArchiveCaller(this, id).request();
        return this.unpack(ret);
    }
    async getArchives(pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.sheetArchives(this.name, {pageStart:pageStart, pageSize:pageSize});
        return ret;
        */
        let params = { pageStart: pageStart, pageSize: pageSize };
        return await new SheetArchivesCaller(this, params).request();
    }
    async getStateSheets(state, pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.stateSheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
        return ret;
        */
        let params = { state: state, pageStart: pageStart, pageSize: pageSize };
        return await new StateSheetsCaller(this, params).request();
    }
    //createPageStateItems<T>(): PageStateItems<T> {return new PageStateItems<T>(this);}
    async stateSheetCount() {
        /*
        await this.loadSchema();
        let ret:StateCount[] = await this.uqApi.stateSheetCount(this.name);
        return this.states.map(s => {
            let n = s.name, count = 0;
            let r = ret.find(v => v.state === n);
            if (r !== undefined) count = r.count;
            return {state: n, count: count}
        });
        */
        return await new StateSheetCountCaller(this, undefined).request();
    }
    async userSheets(state, user, pageStart, pageSize) {
        let params = { state: state, user: user, pageStart: pageStart, pageSize: pageSize };
        return await new UserSheetsCaller(this, params).request();
    }
    async mySheets(state, pageStart, pageSize) {
        /*
        await this.loadSchema();
        let ret = await this.uqApi.mySheets(this.name, {state:state, pageStart:pageStart, pageSize:pageSize});
        return ret;
        */
        let params = { state: state, pageStart: pageStart, pageSize: pageSize };
        return await new MySheetsCaller(this, params).request();
    }
}
export class Sheet extends UqSheet {
}
class SheetCaller extends EntityCaller {
    get entity() { return this._entity; }
    suffix;
    get path() { return `sheet/${this.entity.name}/${this.suffix}`; }
}
class SaveCaller extends SheetCaller {
    get path() { return `sheet/${this.entity.name}`; }
    buildParams() {
        let { app, discription, data } = this.params;
        return {
            app: app,
            discription: discription,
            data: this.entity.pack(data)
        };
    }
    xresult(res) {
        let { verify } = this.entity;
        if (verify === undefined)
            return res;
        let resVerify = res.verify;
        if (resVerify === undefined || resVerify.length === 0) {
            res.verify = undefined;
            return res;
        }
        let { returns } = verify;
        res.verify = this.entity.unpackReturns(resVerify, returns);
        return res;
    }
}
class SaveDirectCaller extends SaveCaller {
    get path() { return `sheet/${this.entity.name}/direct`; }
}
class ActionCaller extends SheetCaller {
    method = 'PUT';
    get path() { return `sheet/${this.entity.name}`; }
}
class ActionDirectCaller extends ActionCaller {
    get path() { return `sheet/${this.entity.name}/direct`; }
}
class GetSheetCaller extends SheetCaller {
    //protected readonly params: number;  // id
    method = 'GET';
    //private id:number;
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/get/${this.params}`; }
}
class SheetArchiveCaller extends SheetCaller {
    //protected readonly params: number;  // id
    method = 'GET';
    //protected readonly suffix = 'archive';
    buildParams() { }
    get path() { return `sheet/${this.entity.name}/archive/${this.params}`; }
}
class SheetArchivesCaller extends SheetCaller {
    suffix = 'archives';
}
class StateSheetsCaller extends SheetCaller {
    suffix = 'states';
}
class StateSheetCountCaller extends SheetCaller {
    method = 'GET';
    suffix = 'statecount';
    xresult(res) {
        let { states } = this.entity;
        return states.map(s => {
            let n = s.name, count = 0;
            let r = res.find(v => v.state === n);
            if (r !== undefined)
                count = r.count;
            return { state: n, count: count };
        });
    }
}
class UserSheetsCaller extends SheetCaller {
    suffix = 'user-sheets';
    xresult(res) {
        return res;
    }
}
class MySheetsCaller extends SheetCaller {
    suffix = 'my-sheets';
    xresult(res) {
        return res;
    }
}
/*
export class PageStateItems<T> extends PageItems<T> {
    private sheet: Sheet;
    constructor(sheet: Sheet) {
        super(true);
        this.sheet = sheet;
        this.pageSize = 10;
    }
    protected async loadResults(param:any, pageStart:any, pageSize:number):Promise<{[name:string]:any[]}> {
        let ret = await this.sheet.getStateSheets(param, pageStart, pageSize);
        return {$page: ret};
    }
    protected getPageId(item:T) {
        return item === undefined? 0 : (item as any).id;
    }
}
*/
//# sourceMappingURL=sheet.js.map