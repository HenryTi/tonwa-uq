"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UQsMan = void 0;
var uqMan_1 = require("./uqMan");
var tool_1 = require("../tool");
var UQsMan = /** @class */ (function () {
    function UQsMan(net, uqsSchema) {
        this.uqMans = [];
        this.net = net;
        this.uqsSchema = uqsSchema;
        this.uqMans = [];
        this.collection = {};
    }
    UQsMan.prototype.buildUqs = function (uqDataArr, version, uqConfigs, isBuildingUQ) {
        return __awaiter(this, void 0, void 0, function () {
            var localMap, localCacheVersion, cacheVersion, _i, _a, uqMan, retErrors, _b, uqConfigs_1, uqConfig, dev, name_1, alias, owner, ownerAlias, uqLower, uq;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.init(uqDataArr)];
                    case 1:
                        _c.sent();
                        localMap = this.net.createLocalMap('$app');
                        localCacheVersion = localMap.child('version');
                        cacheVersion = localCacheVersion.get();
                        if (version !== cacheVersion) {
                            for (_i = 0, _a = this.uqMans; _i < _a.length; _i++) {
                                uqMan = _a[_i];
                                uqMan.localMap.removeAll();
                            }
                            localCacheVersion.set(version);
                        }
                        return [4 /*yield*/, this.load()];
                    case 2:
                        retErrors = _c.sent();
                        if (retErrors.length > 0)
                            return [2 /*return*/, retErrors];
                        if (isBuildingUQ === false) {
                            this.setTuidImportsLocal();
                        }
                        if (retErrors.length > 0)
                            return [2 /*return*/, retErrors];
                        if (uqConfigs) {
                            for (_b = 0, uqConfigs_1 = uqConfigs; _b < uqConfigs_1.length; _b++) {
                                uqConfig = uqConfigs_1[_b];
                                dev = uqConfig.dev, name_1 = uqConfig.name, alias = uqConfig.alias;
                                owner = dev.name, ownerAlias = dev.alias;
                                uqLower = (ownerAlias !== null && ownerAlias !== void 0 ? ownerAlias : owner).toLowerCase() + '/' + (alias !== null && alias !== void 0 ? alias : name_1).toLowerCase();
                                uq = this.collection[uqLower];
                                uq.config = uqConfig;
                            }
                        }
                        this.proxy = this.buildUQs();
                        return [2 /*return*/];
                }
            });
        });
    };
    UQsMan.prototype.uq = function (uqName) {
        return this.collection[uqName.toLowerCase()];
    };
    UQsMan.prototype.getUqUserRoles = function (uqLower) {
        return __awaiter(this, void 0, void 0, function () {
            var uqMan, roles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uqMan = this.collection[uqLower];
                        if (uqMan === undefined)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, uqMan.getRoles()];
                    case 1:
                        roles = _a.sent();
                        return [2 /*return*/, roles];
                }
            });
        });
    };
    UQsMan.prototype.init = function (uqsData) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, uqsData_1, uqData, uqOwner, ownerAlias, uqName, uqAlias, uqFullName, uqFull, uq, uqSchema, lower;
            return __generator(this, function (_a) {
                //let promiseInits: PromiseLike<void>[] = [];
                for (_i = 0, uqsData_1 = uqsData; _i < uqsData_1.length; _i++) {
                    uqData = uqsData_1[_i];
                    uqOwner = uqData.uqOwner, ownerAlias = uqData.ownerAlias, uqName = uqData.uqName, uqAlias = uqData.uqAlias;
                    uqFullName = uqOwner + '/' + uqName;
                    uqFull = this.collection[uqFullName];
                    uq = void 0;
                    if (uqFull) {
                        uq = uqFull;
                    }
                    else {
                        uqSchema = this.uqsSchema[uqFullName];
                        uq = new uqMan_1.UqMan(this.net, uqData, uqSchema);
                        this.collection[uqFullName] = uq;
                        //promiseInits.push(uq.init());
                    }
                    this.uqMans.push(uq);
                    lower = uqFullName.toLowerCase();
                    this.collection[lower] = uq;
                    // 别名加入collection
                    if (uqAlias)
                        uqName = uqAlias;
                    if (ownerAlias)
                        uqOwner = ownerAlias;
                    uqFullName = uqOwner + '/' + uqName;
                    lower = uqFullName.toLowerCase();
                    this.collection[lower] = uq;
                }
                return [2 /*return*/];
            });
        });
    };
    UQsMan.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retErrors, promises, _i, _a, uqMan, results, _b, results_1, result, retError;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        retErrors = [];
                        promises = [];
                        //let lowerUqNames:string[] = [];
                        // collection有小写名字，还有正常名字
                        //for (let i in this.collection) {
                        for (_i = 0, _a = this.uqMans; _i < _a.length; _i++) {
                            uqMan = _a[_i];
                            //let lower = (i as string).toLowerCase();
                            //if (lowerUqNames.indexOf(lower) >= 0) continue;
                            //lowerUqNames.push(lower);
                            //let uq = this.collection[i];
                            promises.push(uqMan.loadEntities());
                        }
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        results = _c.sent();
                        for (_b = 0, results_1 = results; _b < results_1.length; _b++) {
                            result = results_1[_b];
                            retError = result;
                            if (retError !== undefined) {
                                retErrors.push(retError);
                            }
                        }
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    UQsMan.prototype.buildUQs = function () {
        var _this = this;
        var uqs = {};
        function setUq(uqKey, proxy) {
            if (!uqKey)
                return;
            var lower = uqKey.toLowerCase();
            uqs[uqKey] = proxy;
            if (lower !== uqKey)
                uqs[lower] = proxy;
        }
        for (var _i = 0, _a = this.uqMans; _i < _a.length; _i++) {
            var uqMan = _a[_i];
            var proxy = uqMan.createProxy();
            setUq(uqMan.getUqKey(), proxy);
            setUq(uqMan.getUqKeyWithConfig(), proxy);
        }
        return new Proxy(uqs, {
            get: function (target, key, receiver) {
                var lk = key.toLowerCase();
                var ret = target[lk];
                if (ret !== undefined)
                    return ret;
                _this.errUndefinedUq(String(key));
            },
        });
    };
    UQsMan.prototype.errUndefinedUq = function (uq) {
        var message = "UQ ".concat(uq, " not defined");
        var err = new Error(message);
        err.name = tool_1.UqError.undefined_uq;
        throw err;
    };
    UQsMan.prototype.getUqMans = function () {
        return this.uqMans;
    };
    UQsMan.prototype.setTuidImportsLocal = function () {
        var ret = [];
        for (var _i = 0, _a = this.uqMans; _i < _a.length; _i++) {
            var uqMan = _a[_i];
            for (var _b = 0, _c = uqMan.tuidArr; _b < _c.length; _b++) {
                var tuid = _c[_b];
                if (tuid.isImport === true) {
                    var error = this.setInner(tuid);
                    if (error)
                        ret.push(error);
                }
            }
        }
        return ret;
    };
    UQsMan.prototype.setInner = function (tuidImport) {
        var from = tuidImport.from;
        var fromName = from.owner + '/' + from.uq;
        var uq = this.collection[fromName];
        if (uq === undefined) {
            //debugger;
            //if (this.net.props.buildingUq !== true) {
            //    console.error(`setInner(tuidImport: TuidImport): uq ${fromName} is not loaded`);
            //}
            return;
        }
        var iName = tuidImport.name;
        var tuid = uq.tuid(iName);
        if (tuid === undefined) {
            //debugger;
            return "setInner(tuidImport: TuidImport): uq ".concat(fromName, " has no Tuid ").concat(iName);
        }
        if (tuid.isImport === true) {
            //debugger;
            return "setInner(tuidImport: TuidImport): uq ".concat(fromName, " Tuid ").concat(iName, " is import");
        }
        tuidImport.setFrom(tuid);
    };
    return UQsMan;
}());
exports.UQsMan = UQsMan;
//# sourceMappingURL=uqsMan.js.map