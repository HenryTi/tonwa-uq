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
exports.Net = void 0;
var uqApi_1 = require("./uqApi");
var userApi_1 = require("./userApi");
var httpChannel_1 = require("./httpChannel");
var host_1 = require("./host");
var Net = /** @class */ (function () {
    function Net(props) {
        this.debugUqs = new Set();
        this.uqChannels = {};
        this.centerToken = undefined;
        this._loginedUserId = 0;
        this.props = props;
        this.isDevelopment = props.isDevelopment;
        this.testing = props.testing;
        this.localDb = this.props.localDb;
        this.createObservableMap = this.props.createObservableMap;
        this.userApi = new userApi_1.UserApi(this, 'tv/');
        this.uqTokenApi = new uqApi_1.UqTokenApi(this, 'tv/');
    }
    Net.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var center, _a, centerUrl, uqDebug, uqs, res, _i, uqs_1, uq, db;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.centerUrl !== undefined)
                            return [2 /*return*/];
                        center = this.props.center;
                        return [4 /*yield*/, (0, host_1.buildHosts)(center, this.isDevelopment)];
                    case 1:
                        _a = _b.sent(), centerUrl = _a.center, uqDebug = _a.uqDebug, uqs = _a.uqs, res = _a.res;
                        this.centerUrl = centerUrl;
                        this.uqDebug = uqDebug;
                        this.resDebug = res;
                        if (uqs !== undefined) {
                            for (_i = 0, uqs_1 = uqs; _i < uqs_1.length; _i++) {
                                uq = uqs_1[_i];
                                db = uq.db;
                                this.debugUqs.add(db.toLowerCase());
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Net.prototype, "fetchTimeout", {
        get: function () {
            return this.isDevelopment === true ? 30000 : 50000;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Net.prototype, "loginedUserId", {
        get: function () {
            return this._loginedUserId;
        },
        enumerable: false,
        configurable: true
    });
    Net.prototype.createLocalMap = function (mapKey) {
        return this.localDb.createLocalMap(mapKey);
    };
    Net.prototype.getLocalDbItem = function (itemKey) {
        return this.localDb.getItem(itemKey);
    };
    Net.prototype.setLocalDbItem = function (itemKey, value) {
        this.localDb.setItem(itemKey, value);
    };
    Net.prototype.getResUrl = function (res) {
        return this.resDebug + res;
    };
    Net.prototype.logoutApis = function () {
        this.uqTokenApi.clearLocal();
        for (var i in this.uqChannels)
            this.uqChannels[i] = undefined;
    };
    Net.prototype.setCenterToken = function (userId, token) {
        this._loginedUserId = userId;
        this.centerToken = token;
        this.centerChannel = undefined;
    };
    Net.prototype.clearCenterToken = function () {
        this.setCenterToken(0, undefined);
    };
    Net.prototype.getCenterChannel = function () {
        if (this.centerChannel !== undefined)
            return this.centerChannel;
        return this.centerChannel = new httpChannel_1.HttpChannel(this, this.centerUrl, this.centerToken);
    };
    Net.prototype.buildUqUrl = function (db, url, urlTest) {
        var testOrProd;
        var dbToCheck = db.toLowerCase();
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
        return "".concat(url, "uq/").concat(testOrProd, "/").concat(db, "/");
    };
    Net.prototype.isPromise = function (obj) {
        return (!!obj &&
            (typeof obj === "object" || typeof obj === "function") &&
            typeof obj.then === "function");
    };
    Net.prototype.getHttpChannel = function (uq) {
        return __awaiter(this, void 0, void 0, function () {
            var channel;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = this.uqChannels[uq];
                        if (!(channel === undefined)) return [3 /*break*/, 2];
                        this.uqChannels[uq] = channel = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            var uqToken, url, token;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.initUqToken(uq)];
                                    case 1:
                                        uqToken = _a.sent();
                                        url = uqToken.url, token = uqToken.token;
                                        this.uqChannels[uq] = channel = new httpChannel_1.HttpChannel(this, url, token);
                                        return [2 /*return*/, resolve(channel)];
                                }
                            });
                        }); });
                        return [4 /*yield*/, channel];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (this.isPromise(channel) === false)
                            return [2 /*return*/, channel];
                        return [4 /*yield*/, channel];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Net.prototype.initUqToken = function (uq) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, uqOwner, uqName, unit, uqToken, db, url, urlTest, uqUrl;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = uq.split('/'), uqOwner = _a[0], uqName = _a[1];
                        unit = this.props.unit;
                        return [4 /*yield*/, this.uqTokenApi.uq({ unit: unit, uqOwner: uqOwner, uqName: uqName })];
                    case 1:
                        uqToken = _b.sent();
                        if (uqToken.token === undefined)
                            uqToken.token = this.centerToken;
                        db = uqToken.db, url = uqToken.url, urlTest = uqToken.urlTest;
                        uqUrl = this.buildUqUrl(db, url, urlTest);
                        console.log('realUrl: %s', uqUrl);
                        uqToken.url = uqUrl;
                        return [2 /*return*/, uqToken];
                }
            });
        });
    };
    return Net;
}());
exports.Net = Net;
//# sourceMappingURL=Net.js.map