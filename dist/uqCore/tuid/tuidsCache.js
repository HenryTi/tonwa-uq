export class TuidsCache {
    uq;
    modifyMax;
    cacheTimer;
    constructor(uq) {
        this.uq = uq;
    }
    cacheTuids(defer) {
        this.clearCacheTimer();
        this.cacheTimer = setTimeout(this.loadIds, defer);
    }
    clearCacheTimer() {
        if (this.cacheTimer === undefined)
            return;
        clearTimeout(this.cacheTimer);
        this.cacheTimer = undefined;
    }
    loadIds = () => {
        this.clearCacheTimer();
        let { tuids } = this.uq;
        for (let i in tuids) {
            let tuid = tuids[i];
            tuid.cacheIds();
        }
    };
    pullModify(modifyMax) {
        if (modifyMax === undefined)
            return;
        let now = Math.floor(Date.now() / 1000);
        if (this.modifyMax === undefined) {
            this.modifyMax = this.uq.localModifyMax.get();
            if (this.modifyMax === undefined) {
                this.modifyMax = {
                    max: modifyMax,
                    seconds: now,
                };
                this.uq.localModifyMax.set(this.modifyMax);
            }
        }
        let { max, seconds } = this.modifyMax;
        let lockGap = 3600;
        if (now - seconds < lockGap)
            return;
        if (modifyMax <= max)
            return;
        let tuidCached = [];
        let { tuids } = this.uq;
        for (let i in tuids) {
            //if (tuids[i].cached === true) 
            tuidCached.push(i);
        }
        if (tuidCached.length === 0)
            return;
        this.modifyMax.seconds = now;
        this.innerPullModify(tuidCached.join('\t'));
    }
    async innerPullModify(tuidLists) {
        let { uqApi, tuids } = this.uq;
        let { max } = this.modifyMax;
        let ret = await uqApi.queueModify(max, 30, tuidLists);
        let group = {};
        let modifyMax = 0;
        for (let modify of ret.queue) {
            let { id, entity, key } = modify;
            if (!key)
                continue;
            let tuid = tuids[entity];
            if (tuid === undefined)
                continue;
            let item = group[entity];
            if (item === undefined) {
                item = group[entity] = { tuid: tuid, ids: [] };
            }
            item.ids.push(key);
            if (id > modifyMax)
                modifyMax = id;
        }
        for (let i in group) {
            let { tuid, ids } = group[i];
            await tuid.modifyIds(ids);
        }
        let now = Math.floor(Date.now() / 1000);
        this.modifyMax = {
            max: modifyMax,
            seconds: now,
        };
        this.uq.localModifyMax.set(this.modifyMax);
    }
}
//# sourceMappingURL=tuidsCache.js.map