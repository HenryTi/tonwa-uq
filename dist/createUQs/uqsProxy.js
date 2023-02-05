"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uqsProxy = void 0;
var Uq_1 = require("./Uq");
function uqsProxy(uqsMan) {
    var uqs = {};
    function setUq(uqKey, proxy) {
        if (!uqKey)
            return;
        var lower = uqKey.toLowerCase();
        uqs[uqKey] = proxy;
        if (lower !== uqKey)
            uqs[lower] = proxy;
    }
    for (var _i = 0, _a = uqsMan.uqMans; _i < _a.length; _i++) {
        var uqMan = _a[_i];
        var uq = new Uq_1.Uq(uqMan);
        var proxy = uq.$_createProxy();
        setUq(uqMan.getUqKey(), proxy);
        setUq(uqMan.getUqKeyWithConfig(), proxy);
    }
    function onUqProxyError(key) {
        for (var i in uqs) {
            var uqReact = uqs[i];
            uqReact.localMap.removeAll();
        }
        console.error("uq proxy ".concat(key, " error"));
    }
    return new Proxy(uqs, {
        get: function (target, key, receiver) {
            var lk = key.toLowerCase();
            var ret = target[lk];
            if (ret !== undefined)
                return ret;
            debugger;
            console.error("controller.uqs.".concat(String(key), " undefined"));
            onUqProxyError(String(key));
            return undefined;
        },
    });
}
exports.uqsProxy = uqsProxy;
//# sourceMappingURL=uqsProxy.js.map