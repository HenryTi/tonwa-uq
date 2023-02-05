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
exports.HttpChannel = void 0;
var methodsWithBody = ['POST', 'PUT'];
var HttpChannel = /** @class */ (function () {
    function HttpChannel(net, hostUrl, authToken) {
        this.net = net;
        this.hostUrl = hostUrl;
        this.authToken = authToken;
        this.timeout = net.fetchTimeout;
    }
    HttpChannel.prototype.used = function () {
        this.post('', {});
    };
    HttpChannel.prototype.xcall = function (urlPrefix, caller) {
        return __awaiter(this, void 0, void 0, function () {
            var options, headers, path, method, h, i, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        headers = caller.headers, path = caller.path, method = caller.method;
                        if (headers !== undefined) {
                            h = options.headers;
                            for (i in headers) {
                                //h.append(i, encodeURI(headers[i]));
                                h[i] = encodeURI(headers[i]);
                            }
                        }
                        options.method = method;
                        p = caller.buildParams();
                        if (methodsWithBody.indexOf(method) >= 0 && p !== undefined) {
                            options.body = JSON.stringify(p);
                        }
                        return [4 /*yield*/, this.innerFetch(urlPrefix + path, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.innerFetchResult = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.innerFetch(url, options)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret.res];
                }
            });
        });
    };
    HttpChannel.prototype.get = function (url, params) {
        if (params === void 0) { params = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var keys, c, _i, keys_1, k, v, options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (params) {
                            keys = Object.keys(params);
                            if (keys.length > 0) {
                                c = '?';
                                for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                                    k = keys_1[_i];
                                    v = params[k];
                                    if (v === undefined)
                                        continue;
                                    url += c + k + '=' + params[k];
                                    c = '&';
                                }
                            }
                        }
                        options = this.buildOptions();
                        options.method = 'GET';
                        return [4 /*yield*/, this.innerFetchResult(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.post = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'POST';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetchResult(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.put = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'PUT';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetchResult(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.delete = function (url, params) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = this.buildOptions();
                        options.method = 'DELETE';
                        options.body = JSON.stringify(params);
                        return [4 /*yield*/, this.innerFetchResult(url, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HttpChannel.prototype.fetch = function (url, options, resolve, reject) {
        return __awaiter(this, void 0, void 0, function () {
            var path, now_1, timeOutHandler_1, res, ct, text, error_1, err;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = url;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        console.log('%s-%s %s', options.method, path, options.body || '');
                        now_1 = Date.now();
                        timeOutHandler_1 = setTimeout(function () {
                            throw new Error("webapi timeout: ".concat((Date.now() - now_1), "ms ").concat(url));
                        }, this.timeout);
                        return [4 /*yield*/, fetch(encodeURI(path), options)];
                    case 2:
                        res = _a.sent();
                        if (res.ok === false) {
                            clearTimeout(timeOutHandler_1);
                            console.log('call error %s', res.statusText);
                            throw res.statusText;
                        }
                        ct = res.headers.get('content-type');
                        if (!(ct && ct.indexOf('json') >= 0)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.json().then(function (retJson) { return __awaiter(_this, void 0, void 0, function () {
                                var retError;
                                return __generator(this, function (_a) {
                                    clearTimeout(timeOutHandler_1);
                                    if (retJson.ok === true) {
                                        if (typeof retJson !== 'object') {
                                            debugger;
                                        }
                                        else if (Array.isArray(retJson) === true) {
                                            debugger;
                                        }
                                        return [2 /*return*/, resolve(retJson)];
                                    }
                                    retError = retJson.error;
                                    if (retError === undefined) {
                                        reject('not valid tonwa json');
                                    }
                                    else {
                                        reject(retError);
                                    }
                                    return [2 /*return*/];
                                });
                            }); }).catch(function (error) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    reject(error);
                                    return [2 /*return*/];
                                });
                            }); })];
                    case 3: return [4 /*yield*/, res.text()];
                    case 4:
                        text = _a.sent();
                        clearTimeout(timeOutHandler_1);
                        console.log('text endWait');
                        resolve(text);
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        if (typeof error_1 === 'string') {
                            err = error_1.toLowerCase();
                            if (err.startsWith('unauthorized') === true || err.startsWith('$roles') === true) {
                                return [2 /*return*/];
                            }
                        }
                        console.error('fecth error (no nav.showError): ' + url);
                        return [3 /*break*/, 7];
                    case 7:
                        ;
                        return [2 /*return*/];
                }
            });
        });
    };
    //protected abstract innerFetch(url: string, options: any): Promise<any>;
    HttpChannel.prototype.innerFetch = function (url, options) {
        return __awaiter(this, void 0, void 0, function () {
            var u;
            var _this = this;
            return __generator(this, function (_a) {
                u = this.hostUrl + url;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.fetch(u, options, resolve, reject)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    HttpChannel.prototype.callFetch = function (url, method, body) {
        return __awaiter(this, void 0, void 0, function () {
            var options;
            var _this = this;
            return __generator(this, function (_a) {
                options = this.buildOptions();
                options.method = method;
                options.body = body;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.fetch(url, options, resolve, reject)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    HttpChannel.prototype.buildOptions = function () {
        var headers = this.buildHeaders();
        var options = {
            headers: headers,
            method: undefined,
            body: undefined,
            // cache: 'no-cache',
        };
        return options;
    };
    HttpChannel.prototype.buildHeaders = function () {
        var _a = this, language = _a.language, culture = _a.culture;
        var headers = {};
        headers['Content-Type'] = 'application/json;charset=UTF-8';
        var lang = language !== null && language !== void 0 ? language : '';
        if (culture)
            lang += '-' + culture;
        headers['Accept-Language'] = lang;
        if (this.authToken) {
            headers['Authorization'] = this.authToken;
        }
        return headers;
    };
    return HttpChannel;
}());
exports.HttpChannel = HttpChannel;
//# sourceMappingURL=httpChannel.js.map