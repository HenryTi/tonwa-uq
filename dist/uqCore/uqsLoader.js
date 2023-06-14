import { UQsMan } from "./uqsMan";
const uqDataLocalStore = 'uq-data-local-storage';
export class UQsLoader {
    net;
    uqConfigVersion;
    uqConfigs;
    uqsSchema;
    isBuildingUQ = false;
    uqsMan; // value
    constructor(net, uqConfigVersion, uqConfigs, uqsSchema) {
        this.net = net;
        this.uqConfigVersion = uqConfigVersion;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
    }
    async build() {
        return await this.loadUqs();
    }
    // 返回 errors, 每个uq一行
    async loadUqs() {
        this.uqsMan = new UQsMan(this.net, this.uqsSchema);
        let uqs = await this.loadUqData(this.uqConfigs);
        this.uqsMan.buildUqs(uqs, this.uqConfigVersion, this.uqConfigs, this.isBuildingUQ);
    }
    async loadUqData(uqConfigs) {
        let uqs = uqConfigs.map(v => {
            let { dev, name, version, alias } = v;
            let { name: owner, alias: ownerAlias } = dev;
            return { owner, ownerAlias, name, version, alias };
        });
        /*
        let ret: UqData[] = this.loadLocal(uqs);
        if (!ret) {
            let centerAppApi = new CenterAppApi(this.net, 'tv/');
            try {
                ret = uqs.length === 0 ? [] : await centerAppApi.uqs(uqs);
            }
            catch (e) {
                debugger;
            }
            if (ret.length < uqs.length) {
                let err = `下列UQ：\n${uqs.map(v => `${v.owner}/${v.name}`).join('\n')}之一不存在`;
                console.error(err);
                throw Error(err);
            }
            //localStorage
            this.net.setLocalDbItem(uqDataLocalStore, JSON.stringify(ret));
        }
        for (let i = 0; i < uqs.length; i++) {
            let { ownerAlias, alias } = uqs[i];
            ret[i].ownerAlias = ownerAlias;
            ret[i].uqAlias = alias;
        }
        return ret;
        */
        let ret = uqs.map(v => {
            let { name, alias, owner, ownerAlias } = v;
            let uqData;
            uqData = {
                id: undefined,
                uqName: name,
                uqAlias: alias,
                uqOwner: owner,
                ownerAlias,
                access: undefined,
                newVersion: undefined,
            };
            return uqData;
        });
        return ret;
    }
    loadLocal(uqs) {
        // localStorage
        let local = this.net.getLocalDbItem(uqDataLocalStore);
        if (!local)
            return;
        try {
            let ret = JSON.parse(local);
            for (let uq of uqs) {
                let { owner, name } = uq;
                let p = ret.findIndex(v => {
                    let { uqOwner, uqName } = v;
                    return (owner.toLowerCase() === uqOwner.toLowerCase()
                        && name.toLowerCase() === uqName.toLowerCase());
                });
                if (p < 0)
                    return;
            }
            return ret;
        }
        catch {
            return;
        }
    }
}
export class UQsBuildingLoader extends UQsLoader {
    async build() {
        this.isBuildingUQ = true;
        let retErrors = await this.loadUqs();
        return retErrors;
    }
}
//# sourceMappingURL=uqsLoader.js.map