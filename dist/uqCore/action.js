import { Entity } from './entity';
import { ActionCaller } from './caller';
export class UqAction extends Entity {
    get typeName() { return 'action'; }
    async submit(data, $$user = undefined, waiting = true) {
        let caller = new ActionSubmitCaller(this, data, $$user, waiting);
        let ret = await caller.request();
        return ret;
    }
    async submitReturns(data, $$user = undefined) {
        return await new SubmitReturnsCaller(this, data, $$user).request();
    }
    async submitConvert(data, $$user = undefined) {
        return await new SubmitConvertCaller(this, data, $$user).request();
    }
}
export class Action extends UqAction {
}
export class ActionSubmitCaller extends ActionCaller {
    get path() { return 'action/' + this.entity.name; }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.entity.pack(this.params)
        };
    }
}
class SubmitReturnsCaller extends ActionSubmitCaller {
    get path() { return 'action/' + this.entity.name + '/returns'; }
    xresult(res) {
        let { returns } = this.entity;
        let len = returns.length;
        let ret = {};
        for (let i = 0; i < len; i++) {
            let retSchema = returns[i];
            ret[retSchema.name] = res[i];
        }
        return ret;
    }
}
class SubmitConvertCaller extends ActionSubmitCaller {
    get path() { return 'action-convert/' + this.entity.name; }
    buildParams() {
        return {
            $$user: this.$$user,
            data: this.params
        };
    }
}
//# sourceMappingURL=action.js.map