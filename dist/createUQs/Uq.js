"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uq = void 0;
var tool_1 = require("../tool");
var Uq = /** @class */ (function () {
    function Uq(uqMan) {
        this.$_uqMan = uqMan;
        this.$_uqSql = this.$_createUqSqlProxy();
    }
    Uq.prototype.$_createProxy = function () {
        var _this = this;
        var ret = new Proxy(this.$_uqMan.entities, {
            get: function (target, key, receiver) {
                if (key === 'SQL') {
                    return _this.$_uqSql;
                }
                var lk = key.toLowerCase();
                if (lk[0] === '$') {
                    switch (lk) {
                        case '$': return _this;
                        case '$name': return _this.$_uqMan.name;
                    }
                }
                var ret = target[lk];
                if (ret !== undefined)
                    return ret;
                var func = _this.$_uqMan[key];
                if (func !== undefined)
                    return func;
                func = _this[key];
                if (func !== undefined)
                    return func;
                _this.errUndefinedEntity(String(key));
            }
        });
        return ret;
    };
    Uq.prototype.$_createUqSqlProxy = function () {
        var _this = this;
        var ret = new Proxy(this.$_uqMan, {
            get: function (target, key, receiver) {
                var ret = target['$' + key];
                if (ret !== undefined)
                    return ret;
                _this.errUndefinedEntity(String(key));
            }
        });
        return ret;
    };
    Uq.prototype.errUndefinedEntity = function (entity) {
        var message = "entity ".concat(this.$_uqMan.name, ".").concat(entity, " not defined");
        var err = new Error(message);
        err.name = tool_1.UqError.undefined_entity;
        throw err;
    };
    return Uq;
}());
exports.Uq = Uq;
//# sourceMappingURL=Uq.js.map