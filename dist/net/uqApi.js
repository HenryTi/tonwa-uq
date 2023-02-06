import { ApiBase } from './apiBase';
export class UqApi extends ApiBase {
    // private inited = false;
    // uqOwner: string;
    // uqName: string;
    uq;
    constructor(net, basePath, uq /* uqOwner: string, uqName: string*/) {
        super(net, basePath);
        this.uq = uq;
        //        if (uqName) {
        // this.uqOwner = uqOwner;
        // this.uqName = uqName;
        //            this.uq = uqOwner + '/' + uqName;
        //        }
    }
    /*
    private async init() {
        if (this.inited === true) return;
        await this.net.buildAppUq(this.uq, this.uqOwner, this.uqName);
        this.inited = true;
    }
    */
    async getHttpChannel() {
        return await this.net.getHttpChannel(this.uq);
        /*
        let { uqChannels } = this.net;
        let channel = uqChannels[this.uq];
        if (channel !== undefined) {
            if (Array.isArray(channel) === false) return channel as HttpChannel;
        }
        else {
            channel = uqChannels[this.uq] = [];
        }
        let arr = channel as PromiseValue<any>[];
        return new Promise(async (resolve, reject) => {
            arr.push({ resolve, reject });
            if (arr.length !== 1) return;
            let uqToken = this.net.getUqToken(this.uq); //, this.uqOwner, this.uqName);
            if (!uqToken) {
                //debugger;
                this.inited = false;
                await this.init();
                uqToken = this.net.getUqToken(this.uq);
            }
            let { url, token } = uqToken;
            // this.token = token;
            channel = new HttpChannel(this.net, url, token);
            uqChannels[this.uq] = channel;
            for (let pv of arr) {
                pv.resolve(channel);
            }
        });
        */
    }
    async loadEntities() {
        let ret = await this.get('entities');
        return ret;
    }
    async getAdmins() {
        let ret = await this.get('get-admins');
        return ret;
    }
    async setMeAdmin() {
        await this.get('set-me-admin');
    }
    async setAdmin(user, role, assigned) {
        await this.post('set-admin', { user, role, assigned });
    }
    async isAdmin() {
        let ret = await this.get('is-admin');
        return ret;
    }
    async getRoles() {
        let ret = await this.get('get-roles');
        if (!ret)
            return null;
        let parts = ret.split('|');
        let s = [];
        for (let p of parts) {
            p = p.trim();
            if (!p)
                continue;
            s.push(p);
        }
        if (s.length === 0)
            return null;
        return s;
    }
    async getAllRoleUsers() {
        let ret = await this.get('get-all-role-users');
        return ret;
    }
    async setUserRoles(theUser, roles) {
        await this.post('set-user-roles', { theUser, roles });
    }
    async deleteUserRoles(theUser) {
        await this.get('delete-user-roles', { theUser });
    }
    async allSchemas() {
        return await this.get('all-schemas');
    }
    async schema(name) {
        return await this.get('schema/' + name);
    }
    async queueModify(start, page, entities) {
        return await this.post('queue-modify', { start: start, page: page, entities: entities });
    }
    async syncUser(user) {
        return await this.post('sync-user', { user });
    }
}
export class CenterApiBase extends ApiBase {
    async getHttpChannel() {
        return this.net.getCenterChannel();
    }
}
const uqTokensName = 'uqTokens';
export class UqTokenApi extends CenterApiBase {
    localMap;
    constructor(net, path) {
        super(net, path);
        this.localMap = net.createLocalMap(uqTokensName);
    }
    clearLocal() {
        this.localMap.removeAll();
    }
    async uq(params) {
        let { uqOwner, uqName } = params;
        let un = uqOwner + '/' + uqName;
        let localCache = this.localMap.child(un);
        try {
            let uqLocal = localCache.get();
            if (uqLocal !== undefined) {
                let { unit, user } = uqLocal;
                if (unit !== params.unit || user !== this.net.loginedUserId) {
                    localCache.remove();
                    uqLocal = undefined;
                }
            }
            let nowTick = Math.floor(Date.now() / 1000);
            if (uqLocal !== undefined) {
                let { tick, value } = uqLocal;
                if (value !== undefined && (nowTick - tick) < 24 * 3600) {
                    return Object.assign({}, value);
                }
            }
            let uqParams = Object.assign({}, params);
            //uqParams.testing = this.net.hostMan.testing;
            let ret = await this.get('open/uq-token', uqParams);
            if (ret === undefined) {
                let { unit, uqOwner, uqName } = params;
                let err = `center get app-uq(unit=${unit}, '${uqOwner}/${uqName}') - not exists or no unit-service`;
                throw err;
            }
            uqLocal = {
                unit: params.unit,
                user: this.net.loginedUserId,
                tick: nowTick,
                value: ret,
            };
            localCache.set(uqLocal);
            return Object.assign({}, ret);
        }
        catch (err) {
            localCache.remove();
            throw err;
        }
    }
}
export class CallCenterApi extends CenterApiBase {
    directCall(url, method, body) {
        return this.call(url, method, body);
    }
}
//const appUqsName = 'appUqs';
export class CenterAppApi extends CenterApiBase {
    async appUqs(appOwner, appName) {
        let ret = await this.get('tie/app-uqs', { appOwner, appName });
        return ret;
    }
    async uqs(uqs) {
        return await this.post('open/pure-uqs', uqs);
    }
    async unitxUq(unit) {
        return await this.get('tie/unitx-uq', { unit: unit });
    }
    async changePassword(param) {
        return await this.post('tie/change-password', param);
    }
    async userQuit() {
        await this.get('tie/user-ask-quit', {});
    }
}
//# sourceMappingURL=uqApi.js.map