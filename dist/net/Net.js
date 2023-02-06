import { UqTokenApi } from "./uqApi";
import { UserApi } from "./userApi";
import { HttpChannel } from './httpChannel';
import { buildHosts } from './host';
export class Net {
    centerUrl;
    uqDebug;
    resDebug;
    debugUqs = new Set();
    testing;
    uqChannels = {};
    centerChannel;
    isDevelopment;
    centerToken = undefined;
    props;
    _loginedUserId = 0;
    localDb;
    userApi;
    uqTokenApi;
    constructor(props) {
        this.props = props;
        this.isDevelopment = props.isDevelopment;
        this.testing = props.testing;
        this.localDb = this.props.localDb;
        this.createObservableMap = this.props.createObservableMap;
        this.userApi = new UserApi(this, 'tv/');
        this.uqTokenApi = new UqTokenApi(this, 'tv/');
    }
    async init() {
        if (this.centerUrl !== undefined)
            return;
        let { center } = this.props;
        let { center: centerUrl, uqDebug, uqs, res } = await buildHosts(center, this.isDevelopment);
        this.centerUrl = centerUrl;
        this.uqDebug = uqDebug;
        this.resDebug = res;
        if (uqs !== undefined) {
            for (let uq of uqs) {
                let { db } = uq;
                this.debugUqs.add(db.toLowerCase());
            }
        }
    }
    get fetchTimeout() {
        return this.isDevelopment === true ? 30000 : 50000;
    }
    get loginedUserId() {
        return this._loginedUserId;
    }
    createLocalMap(mapKey) {
        return this.localDb.createLocalMap(mapKey);
    }
    getLocalDbItem(itemKey) {
        return this.localDb.getItem(itemKey);
    }
    setLocalDbItem(itemKey, value) {
        this.localDb.setItem(itemKey, value);
    }
    getResUrl(res) {
        return this.resDebug + res;
    }
    createObservableMap;
    logoutApis() {
        this.uqTokenApi.clearLocal();
        for (let i in this.uqChannels)
            this.uqChannels[i] = undefined;
    }
    setCenterToken(userId, token) {
        this._loginedUserId = userId;
        this.centerToken = token;
        this.centerChannel = undefined;
    }
    clearCenterToken() {
        this.setCenterToken(0, undefined);
    }
    getCenterChannel() {
        if (this.centerChannel !== undefined)
            return this.centerChannel;
        return this.centerChannel = new HttpChannel(this, this.centerUrl, this.centerToken);
    }
    buildUqUrl(db, url, urlTest) {
        let testOrProd;
        let dbToCheck = db.toLowerCase();
        if (this.testing === true) {
            url = urlTest;
            dbToCheck += '$test';
            testOrProd = 'test';
        }
        else {
            testOrProd = 'prod';
        }
        if (this.uqDebug) {
            if (this.debugUqs.has(dbToCheck) === true) {
                url = this.uqDebug;
            }
        }
        if (url.endsWith('/') === false) {
            url += '/';
        }
        return `${url}uq/${testOrProd}/${db}/`;
    }
    isPromise(obj) {
        return (!!obj &&
            (typeof obj === "object" || typeof obj === "function") &&
            typeof obj.then === "function");
    }
    async getHttpChannel(uq) {
        let channel = this.uqChannels[uq];
        if (channel === undefined) {
            this.uqChannels[uq] = channel = new Promise(async (resolve, reject) => {
                let uqToken = await this.initUqToken(uq);
                let { url, token } = uqToken;
                this.uqChannels[uq] = channel = new HttpChannel(this, url, token);
                return resolve(channel);
            });
            return await channel;
        }
        if (this.isPromise(channel) === false)
            return channel;
        return await channel;
    }
    async initUqToken(uq) {
        let [uqOwner, uqName] = uq.split('/');
        let { unit } = this.props;
        let uqToken = await this.uqTokenApi.uq({ unit, uqOwner, uqName });
        if (uqToken.token === undefined)
            uqToken.token = this.centerToken;
        let { db, url, urlTest } = uqToken;
        let uqUrl = this.buildUqUrl(db, url, urlTest);
        console.log('realUrl: %s', uqUrl);
        uqToken.url = uqUrl;
        return uqToken;
    }
}
//# sourceMappingURL=Net.js.map