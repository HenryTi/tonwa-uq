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
exports.buildHosts = void 0;
var debugHosts = {
    center: 'localhost:3000',
    uq: 'localhost:3015',
    res: 'localhost:3015',
};
var fetchOptions = {
    method: "GET",
    // mode: "no-cors", // no-cors, cors, *same-origin
    headers: {
        "Content-Type": "text/plain;charset=UTF-8"
    },
};
function buildHosts(center, isDevelopment) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(isDevelopment === true)) return [3 /*break*/, 2];
                    return [4 /*yield*/, buildDebugHosts(center)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    // let uq: string, res: string;
                    if (center.endsWith('/') === false) {
                        center += '/';
                    }
                    return [2 /*return*/, { center: center, uqDebug: undefined, res: undefined, uqs: undefined }];
            }
        });
    });
}
exports.buildHosts = buildHosts;
function buildDebugHosts(center) {
    return __awaiter(this, void 0, void 0, function () {
        var debugCenter, uq, res, promises, _a, retCenter, retUq, retRes, uqDebug, uqs, json;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (center.endsWith('/') === false) {
                        center += '/';
                    }
                    debugCenter = debugHosts.center, uq = debugHosts.uq, res = debugHosts.res;
                    promises = [debugCenter, uq, res].map(function (v) { return localCheck(v); });
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    _a = _b.sent(), retCenter = _a[0], retUq = _a[1], retRes = _a[2];
                    if (retCenter !== null)
                        center = "http://".concat(debugCenter, "/");
                    uqDebug = undefined;
                    if (retUq !== null) {
                        uqDebug = "http://".concat(uq, "/");
                        json = JSON.parse(retUq);
                        uqs = json.uqs;
                    }
                    else {
                        uq = undefined;
                    }
                    if (retRes !== null) {
                        res = undefined; // 直接指向目的服务器 `http://${res}/`;
                    }
                    else {
                        res = undefined;
                    }
                    return [2 /*return*/, { center: center, uqDebug: uqDebug, res: res, uqs: uqs }];
            }
        });
    });
}
// 因为测试的都是局域网服务器，甚至本机服务器，所以一秒足够了
// 网上找了上面的fetch timeout代码。
// 尽管timeout了，fetch仍然继续，没有cancel
// 实际上，一秒钟不够。web服务器会自动停。重启的时候，可能会比较长时间。也许两秒甚至更多。
//const timeout = 2000;
var timeout = 2000;
function fetchLocalCheck(url) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var resp, text, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    setTimeout(reject, timeout, new Error("Connection timed out"));
                    return [4 /*yield*/, fetch(url, fetchOptions)];
                case 1:
                    resp = _a.sent();
                    if (resp.ok === false) {
                        reject('resp.ok === false');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, resp.text()];
                case 2:
                    text = _a.sent();
                    resolve(text);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    reject(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
}
function localCheck(host) {
    return __awaiter(this, void 0, void 0, function () {
        var url, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!host)
                        return [2 /*return*/, null];
                    url = "http://".concat(host, "/hello");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetchLocalCheck(url)];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    err_2 = _a.sent();
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=host.js.map