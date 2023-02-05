"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.UQsBuildingLoader = exports.UQsLoader = void 0;
var uqsMan_1 = require("./uqsMan");
var net_1 = require("../net");
var uqDataLocalStore = 'uq-data-local-storage';
var UQsLoader = /** @class */ (function () {
    function UQsLoader(net, uqConfigVersion, uqConfigs, uqsSchema) {
        this.isBuildingUQ = false;
        this.net = net;
        this.uqConfigVersion = uqConfigVersion;
        this.uqConfigs = uqConfigs;
        this.uqsSchema = uqsSchema;
    }
    UQsLoader.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadUqs()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 返回 errors, 每个uq一行
    UQsLoader.prototype.loadUqs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var uqs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.uqsMan = new uqsMan_1.UQsMan(this.net, this.uqsSchema);
                        return [4 /*yield*/, this.loadUqData(this.uqConfigs)];
                    case 1:
                        uqs = _a.sent();
                        return [4 /*yield*/, this.uqsMan.buildUqs(uqs, this.uqConfigVersion, this.uqConfigs, this.isBuildingUQ)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UQsLoader.prototype.loadUqData = function (uqConfigs) {
        return __awaiter(this, void 0, void 0, function () {
            var uqs, ret, centerAppApi, _a, e_1, err, i, _b, ownerAlias, alias;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        uqs = uqConfigs.map(function (v) {
                            var dev = v.dev, name = v.name, version = v.version, alias = v.alias;
                            var owner = dev.name, ownerAlias = dev.alias;
                            return { owner: owner, ownerAlias: ownerAlias, name: name, version: version, alias: alias };
                        });
                        ret = this.loadLocal(uqs);
                        if (!!ret) return [3 /*break*/, 7];
                        centerAppApi = new net_1.CenterAppApi(this.net, 'tv/');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        if (!(uqs.length === 0)) return [3 /*break*/, 2];
                        _a = [];
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, centerAppApi.uqs(uqs)];
                    case 3:
                        _a = _c.sent();
                        _c.label = 4;
                    case 4:
                        ret = _a;
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _c.sent();
                        debugger;
                        return [3 /*break*/, 6];
                    case 6:
                        if (ret.length < uqs.length) {
                            err = "\u4E0B\u5217UQ\uFF1A\n".concat(uqs.map(function (v) { return "".concat(v.owner, "/").concat(v.name); }).join('\n'), "\u4E4B\u4E00\u4E0D\u5B58\u5728");
                            console.error(err);
                            throw Error(err);
                        }
                        //localStorage
                        this.net.setLocalDbItem(uqDataLocalStore, JSON.stringify(ret));
                        _c.label = 7;
                    case 7:
                        for (i = 0; i < uqs.length; i++) {
                            _b = uqs[i], ownerAlias = _b.ownerAlias, alias = _b.alias;
                            ret[i].ownerAlias = ownerAlias;
                            ret[i].uqAlias = alias;
                        }
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UQsLoader.prototype.loadLocal = function (uqs) {
        // localStorage
        var local = this.net.getLocalDbItem(uqDataLocalStore);
        if (!local)
            return;
        try {
            var ret = JSON.parse(local);
            var _loop_1 = function (uq) {
                var owner = uq.owner, name_1 = uq.name;
                var p = ret.findIndex(function (v) {
                    var uqOwner = v.uqOwner, uqName = v.uqName;
                    return (owner.toLowerCase() === uqOwner.toLowerCase()
                        && name_1.toLowerCase() === uqName.toLowerCase());
                });
                if (p < 0)
                    return { value: void 0 };
            };
            for (var _i = 0, uqs_1 = uqs; _i < uqs_1.length; _i++) {
                var uq = uqs_1[_i];
                var state_1 = _loop_1(uq);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return ret;
        }
        catch (_a) {
            return;
        }
    };
    return UQsLoader;
}());
exports.UQsLoader = UQsLoader;
var UQsBuildingLoader = /** @class */ (function (_super) {
    __extends(UQsBuildingLoader, _super);
    function UQsBuildingLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UQsBuildingLoader.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            var retErrors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isBuildingUQ = true;
                        return [4 /*yield*/, this.loadUqs()];
                    case 1:
                        retErrors = _a.sent();
                        return [2 /*return*/, retErrors];
                }
            });
        });
    };
    return UQsBuildingLoader;
}(UQsLoader));
exports.UQsBuildingLoader = UQsBuildingLoader;
//# sourceMappingURL=uqsLoader.js.map