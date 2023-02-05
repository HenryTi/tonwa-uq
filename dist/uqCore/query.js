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
exports.Query = exports.UqQuery = void 0;
var entity_1 = require("./entity");
var caller_1 = require("./caller");
var UqQuery = /** @class */ (function (_super) {
    __extends(UqQuery, _super);
    function UqQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UqQuery.prototype, "typeName", {
        get: function () { return 'query'; },
        enumerable: false,
        configurable: true
    });
    UqQuery.prototype.setSchema = function (schema) {
        _super.prototype.setSchema.call(this, schema);
        var returns = schema.returns;
        this.returns = returns;
        this.isPaged = returns && returns.find(function (v) { return v.name === '$page'; }) !== undefined;
    };
    /*
    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        //this.list = undefined;
    }
    */
    //get hasMore() {return this.more;}
    /*
    async loadPage():Promise<void> {
        if (this.pageSize === undefined) {
            throw new Error('call resetPage(size:number, params:any) first');
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
        let ret = await this.page(this.params, pageStart, this.pageSize+1);
        let page = (ret as any).$page;
        this.list = observable.array([], {deep: false});
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = this.returns.find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length-1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
    }
    */
    UqQuery.prototype.pageCaller = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return new caller_1.QueryPageCaller(this, params, $$user, showWaiting);
    };
    UqQuery.prototype.page = function (params, pageStart, pageSize, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var p, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = { pageStart: pageStart, pageSize: pageSize, params: params };
                        return [4 /*yield*/, this.pageCaller(p, $$user, showWaiting).request()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    UqQuery.prototype.queryCaller = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return new caller_1.QueryQueryCaller(this, params, $$user, showWaiting);
    };
    UqQuery.prototype.query = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.queryCaller(params, $$user, showWaiting).request()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res];
                }
            });
        });
    };
    UqQuery.prototype.table = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var ret, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.query(params, $$user, showWaiting)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret) {
                            return [2 /*return*/, ret[i]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UqQuery.prototype.obj = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.table(params, $$user, showWaiting)];
                    case 1:
                        ret = _a.sent();
                        if (ret.length > 0)
                            return [2 /*return*/, ret[0]];
                        return [2 /*return*/];
                }
            });
        });
    };
    UqQuery.prototype.scalar = function (params, $$user, showWaiting) {
        if ($$user === void 0) { $$user = undefined; }
        if (showWaiting === void 0) { showWaiting = true; }
        return __awaiter(this, void 0, void 0, function () {
            var ret, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obj(params, $$user, showWaiting)];
                    case 1:
                        ret = _a.sent();
                        for (i in ret)
                            return [2 /*return*/, ret[i]];
                        return [2 /*return*/];
                }
            });
        });
    };
    return UqQuery;
}(entity_1.Entity));
exports.UqQuery = UqQuery;
var Query = /** @class */ (function (_super) {
    __extends(Query, _super);
    function Query() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Query;
}(UqQuery));
exports.Query = Query;
//# sourceMappingURL=query.js.map