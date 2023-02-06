import { Uq } from "./Uq";
export function uqsProxy(uqsMan) {
    const uqs = {};
    function setUq(uqKey, proxy) {
        if (!uqKey)
            return;
        let lower = uqKey.toLowerCase();
        uqs[uqKey] = proxy;
        if (lower !== uqKey)
            uqs[lower] = proxy;
    }
    for (let uqMan of uqsMan.uqMans) {
        let uq = new Uq(uqMan);
        let proxy = uq.$_createProxy();
        setUq(uqMan.getUqKey(), proxy);
        setUq(uqMan.getUqKeyWithConfig(), proxy);
    }
    function onUqProxyError(key) {
        for (let i in uqs) {
            let uqReact = uqs[i];
            uqReact.localMap.removeAll();
        }
        console.error(`uq proxy ${key} error`);
    }
    return new Proxy(uqs, {
        get: (target, key, receiver) => {
            let lk = key.toLowerCase();
            let ret = target[lk];
            if (ret !== undefined)
                return ret;
            debugger;
            console.error(`controller.uqs.${String(key)} undefined`);
            onUqProxyError(String(key));
            return undefined;
        },
    });
}
//# sourceMappingURL=uqsProxy.js.map