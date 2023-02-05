"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UqMan = exports.fieldDefaultValue = void 0;
/* eslint-disable */
var net_1 = require("../net");
var tuid_1 = require("./tuid");
var action_1 = require("./action");
var sheet_1 = require("./sheet");
var query_1 = require("./query");
var book_1 = require("./book");
var history_1 = require("./history");
var map_1 = require("./map");
var pending_1 = require("./pending");
var tool_1 = require("../tool");
var enum_1 = require("./enum");
var ID_1 = require("./ID");
function fieldDefaultValue(type) {
    switch (type) {
        case 'tinyint':
        case 'smallint':
        case 'int':
        case 'bigint':
        case 'dec':
        case 'float':
        case 'double':
        case 'enum':
            return 0;
        case 'char':
        case 'text':
            return '';
        case 'datetime':
        case 'date':
            return '2000-1-1';
        case 'time':
            return '0:00';
    }
}
exports.fieldDefaultValue = fieldDefaultValue;
function IDPath(path) { return path; }
var EnumResultType;
(function (EnumResultType) {
    EnumResultType[EnumResultType["data"] = 0] = "data";
    EnumResultType[EnumResultType["sql"] = 1] = "sql";
})(EnumResultType || (EnumResultType = {}));
;
var UqMan = /** @class */ (function () {
    function UqMan(net, uqData, uqSchema) {
        var _this = this;
        this.entities = {};
        this.entityTypes = {};
        this.enums = {};
        this.actions = {};
        this.queries = {};
        this.ids = {};
        this.idxs = {};
        this.ixs = {};
        this.sheets = {};
        this.books = {};
        this.maps = {};
        this.histories = {};
        this.pendings = {};
        this.tuids = {};
        this.tuidArr = [];
        this.actionArr = [];
        this.queryArr = [];
        this.idArr = [];
        this.idxArr = [];
        this.ixArr = [];
        this.enumArr = [];
        this.sheetArr = [];
        this.bookArr = [];
        this.mapArr = [];
        this.historyArr = [];
        this.pendingArr = [];
        this.Acts = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret, retArr, arr, i, retActs, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActs(param, EnumResultType.data)];
                    case 1:
                        ret = _a.sent();
                        retArr = ret[0].ret.split('\n');
                        arr = [];
                        for (i in param)
                            arr.push(i);
                        retActs = {};
                        for (i = 0; i < arr.length; i++) {
                            retActs[arr[i]] = ids(retArr[i].split('\t'));
                        }
                        return [2 /*return*/, retActs];
                }
            });
        }); };
        this.AdminGetList = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.getAdmins()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.AdminSetMe = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.setMeAdmin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.AdminSet = function (user, role, assigned) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.setAdmin(user, role, assigned)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.AdminIsMe = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.isAdmin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDValue = function (type, value) {
            if (!type)
                return;
            var ID = _this.ids[type.toLowerCase()];
            if (ID === undefined)
                return;
            return ID.valueFromString(value);
        };
        this.$Acts = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActs(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.ActIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActIX(param, EnumResultType.data)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret[0].ret.split('\t').map(function (v) { return Number(v); })];
                }
            });
        }); };
        this.$ActIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActIX(param, EnumResultType.sql)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        }); };
        this.ActIXSort = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActIxSort(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$ActIXSort = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActIxSort(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.ActIDProp = function (ID, id, name, value) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.post('act-id-prop', { ID: ID.name, id: id, name: name, value: value })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.ActID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActID(param, EnumResultType.data)];
                    case 1:
                        ret = _a.sent();
                        r = ret[0].ret.split('\t').map(function (v) { return Number(v); })[0];
                        if (isNaN(r) === true)
                            return [2 /*return*/, undefined];
                        return [2 /*return*/, r];
                }
            });
        }); };
        this.$ActID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActID(param, EnumResultType.sql)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        }); };
        this.ActDetail = function (param) { return __awaiter(_this, void 0, void 0, function () {
            var ret, val, parts, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActDetail(param, EnumResultType.data)];
                    case 1:
                        ret = _a.sent();
                        val = ret[0].ret;
                        parts = val.split('\n');
                        items = parts.map(function (v) { return v.split('\t'); });
                        ret = {
                            main: ids(items[0])[0],
                            detail: ids(items[1]),
                            detail2: ids(items[2]),
                            detail3: ids(items[3]),
                        };
                        return [2 /*return*/, ret];
                }
            });
        }); };
        this.$ActDetail = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiActDetail(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.QueryID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiQueryID(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$QueryID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiQueryID(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDTv = function (ids) { return __awaiter(_this, void 0, void 0, function () {
            var ret, retValues, _i, ret_1, row, $type, $tv, ID_2, schema, nameNoVice, values, len, i, p;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDTv(ids, EnumResultType.data)];
                    case 1:
                        ret = _a.sent();
                        retValues = [];
                        _i = 0, ret_1 = ret;
                        _a.label = 2;
                    case 2:
                        if (!(_i < ret_1.length)) return [3 /*break*/, 6];
                        row = ret_1[_i];
                        $type = row.$type, $tv = row.$tv;
                        if (!$tv)
                            return [3 /*break*/, 5];
                        ID_2 = this.ids[$type];
                        if (!ID_2)
                            return [3 /*break*/, 5];
                        schema = ID_2.schema;
                        if (!!schema) return [3 /*break*/, 4];
                        return [4 /*yield*/, ID_2.loadSchema()];
                    case 3:
                        _a.sent();
                        schema = ID_2.schema;
                        _a.label = 4;
                    case 4:
                        nameNoVice = schema.nameNoVice;
                        if (!nameNoVice)
                            return [3 /*break*/, 5];
                        values = $tv.split('\n');
                        len = nameNoVice.length;
                        for (i = 0; i < len; i++) {
                            p = nameNoVice[i];
                            row[p] = values[i];
                        }
                        delete row.$tv;
                        retValues.push(row);
                        _a.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, retValues];
                }
            });
        }); };
        this.$IDTv = function (ids) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDTv(ids, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDNO = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDNO(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDEntity = function (typeId) {
            return _this.entityTypes[typeId];
        };
        this.$IDNO = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDNO(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDDetailGet = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDDetailGet(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDDetailGet = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDDetailGet(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.cache = {};
        this.cachePromise = {};
        this.idObj = function (id) { return __awaiter(_this, void 0, void 0, function () {
            var obj, promise, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = this.cache[id];
                        if (!(obj === undefined)) return [3 /*break*/, 2];
                        promise = this.cachePromise[id];
                        if (promise === undefined) {
                            promise = this.apiID(({ id: id, IDX: undefined }), EnumResultType.data);
                            this.cachePromise[id] = promise;
                        }
                        return [4 /*yield*/, promise];
                    case 1:
                        ret = _a.sent();
                        obj = ret[0];
                        this.cache[id] = (obj === undefined) ? null : obj;
                        delete this.cachePromise[id];
                        _a.label = 2;
                    case 2: return [2 /*return*/, obj];
                }
            });
        }); };
        this.ID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiID(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$ID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiID(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.KeyID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiKeyID(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$KeyID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiKeyID(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIX(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIX(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IXValues = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIXValues(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IXr = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIXr(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IXr = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIXr(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.KeyIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiKeyIX(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$KeyIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiKeyIX(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDLog = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDLog(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDLog = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDLog(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDSum = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDSum(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDSum = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDSum(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDinIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDinIX(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDinIX = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDinIX(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDxID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDxID(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDxID = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDxID(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.IDTree = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDTree(param, EnumResultType.data)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.$IDTree = function (param) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiIDTree(param, EnumResultType.sql)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.net = net;
        var id = uqData.id, uqOwner = uqData.uqOwner, uqName = uqData.uqName, newVersion = uqData.newVersion;
        this.newVersion = newVersion;
        this.uqOwner = uqOwner;
        this.uqName = uqName;
        this.uqSchema = uqSchema;
        this.id = id;
        this.name = uqOwner + '/' + uqName;
        this.uqVersion = 0;
        this.localMap = net.createLocalMap(this.name);
        this.localModifyMax = this.localMap.child('$modifyMax');
        this.localEntities = this.localMap.child('$access');
        this.tuidsCache = new tuid_1.TuidsCache(this);
        var baseUrl = 'tv/';
        this.uqApi = new net_1.UqApi(this.net, baseUrl, this.name /* this.uqOwner, this.uqName */);
    }
    UqMan.prototype.getID = function (name) { return this.ids[name.toLowerCase()]; };
    ;
    UqMan.prototype.getIDX = function (name) { return this.idxs[name.toLowerCase()]; };
    ;
    UqMan.prototype.getIX = function (name) { return this.ixs[name.toLowerCase()]; };
    ;
    UqMan.prototype.getRoles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.roles !== undefined)
                            return [2 /*return*/, this.roles];
                        _a = this;
                        return [4 /*yield*/, this.uqApi.getRoles()];
                    case 1:
                        _a.roles = _b.sent();
                        return [2 /*return*/, this.roles];
                }
            });
        });
    };
    UqMan.prototype.tuid = function (name) { return this.tuids[name.toLowerCase()]; };
    UqMan.prototype.tuidDiv = function (name, div) {
        var tuid = this.tuids[name.toLowerCase()];
        return tuid && tuid.div(div.toLowerCase());
    };
    UqMan.prototype.action = function (name) { return this.actions[name.toLowerCase()]; };
    UqMan.prototype.sheet = function (name) { return this.sheets[name.toLowerCase()]; };
    UqMan.prototype.query = function (name) { return this.queries[name.toLowerCase()]; };
    UqMan.prototype.book = function (name) { return this.books[name.toLowerCase()]; };
    UqMan.prototype.map = function (name) { return this.maps[name.toLowerCase()]; };
    UqMan.prototype.history = function (name) { return this.histories[name.toLowerCase()]; };
    UqMan.prototype.pending = function (name) { return this.pendings[name.toLowerCase()]; };
    UqMan.prototype.sheetFromTypeId = function (typeId) {
        for (var i in this.sheets) {
            var sheet = this.sheets[i];
            if (sheet.typeId === typeId)
                return sheet;
        }
    };
    UqMan.prototype.loadEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entities, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        entities = this.localEntities.get();
                        if (!!entities) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.uqApi.loadEntities()];
                    case 1:
                        entities = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!entities)
                            return [2 /*return*/];
                        this.buildEntities(entities);
                        return [2 /*return*/, undefined];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, err_1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UqMan.prototype.buildEntities = function (entities) {
        if (entities === undefined) {
            debugger;
        }
        this.localEntities.set(entities);
        var access = entities.access, tuids = entities.tuids, role = entities.role, version = entities.version, ids = entities.ids;
        this.uqVersion = version;
        this.Role = this.buildRole(role === null || role === void 0 ? void 0 : role.names);
        this.buildTuids(tuids);
        this.buildIds(ids);
        this.buildAccess(access);
    };
    UqMan.prototype.buildRole = function (roleNames) {
        if (roleNames === undefined)
            return;
        var ret = {};
        var _loop_1 = function (i) {
            var items = roleNames[i];
            if (i !== '$') {
                items = items.map(function (v) { return "".concat(i, ".").concat(v); });
            }
            ret[i] = items;
        };
        for (var i in roleNames) {
            _loop_1(i);
        }
        return ret;
    };
    UqMan.prototype.buildTuids = function (tuids) {
        for (var i in tuids) {
            var schema = tuids[i];
            var typeId = schema.typeId, from = schema.from;
            var tuid = this.newTuid(i, typeId, from);
            tuid.sys = true;
        }
        for (var i in tuids) {
            var schema = tuids[i];
            var tuid = this.getTuid(i);
            tuid.setSchema(schema);
        }
        for (var i in this.tuids) {
            var tuid = this.tuids[i];
            tuid.buildFieldsTuid();
        }
    };
    UqMan.prototype.buildIds = function (ids) {
        for (var i in ids) {
            var schema = ids[i];
            var typeId = schema.typeId;
            var ID_3 = this.newID(i, typeId);
            ID_3.setSchema(schema);
        }
    };
    UqMan.prototype.loadEntitySchema = function (entityName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.schema(entityName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqMan.prototype.loadAllSchemas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret, entities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.allSchemas()];
                    case 1:
                        ret = _a.sent();
                        entities = [
                            this.actionArr,
                            this.enumArr,
                            this.sheetArr,
                            this.queryArr,
                            this.bookArr,
                            this.mapArr,
                            this.historyArr,
                            this.pendingArr,
                            this.idArr,
                            this.idxArr,
                            this.ixArr,
                        ];
                        entities.forEach(function (arr) {
                            arr.forEach(function (v) {
                                var entity = ret[v.name.toLowerCase()];
                                if (!entity)
                                    return;
                                var schema = entity.call;
                                if (!schema)
                                    return;
                                v.buildSchema(schema);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UqMan.prototype.getTuid = function (name) {
        return this.tuids[name];
    };
    UqMan.prototype.buildAccess = function (access) {
        for (var a in access) {
            var v = access[a];
            switch (typeof v) {
                case 'string':
                    this.fromType(a, v);
                    break;
                case 'object':
                    this.fromObj(a, v);
                    break;
            }
        }
    };
    UqMan.prototype.cacheTuids = function (defer) {
        this.tuidsCache.cacheTuids(defer);
    };
    UqMan.prototype.setEntity = function (name, entity) {
        this.entities[name] = entity;
        this.entities[name.toLowerCase()] = entity;
        this.entityTypes[entity.typeId] = entity;
    };
    UqMan.prototype.newEnum = function (name, id) {
        var enm = this.enums[name];
        if (enm !== undefined)
            return enm;
        enm = this.enums[name] = new enum_1.UqEnum(this, name, id);
        this.setEntity(name, enm);
        this.enumArr.push(enm);
        return enm;
    };
    UqMan.prototype.newAction = function (name, id) {
        var action = this.actions[name];
        if (action !== undefined)
            return action;
        action = this.actions[name] = new action_1.Action(this, name, id);
        this.setEntity(name, action);
        this.actionArr.push(action);
        return action;
    };
    UqMan.prototype.newTuid = function (name, id, from) {
        var tuid = this.tuids[name];
        if (tuid !== undefined)
            return tuid;
        if (from !== undefined)
            tuid = new tuid_1.TuidImport(this, name, id, from);
        else
            tuid = new tuid_1.TuidInner(this, name, id);
        this.tuids[name] = tuid;
        this.setEntity(name, tuid);
        this.tuidArr.push(tuid);
        return tuid;
    };
    UqMan.prototype.newQuery = function (name, id) {
        var query = this.queries[name];
        if (query !== undefined)
            return query;
        query = this.queries[name] = new query_1.Query(this, name, id);
        this.setEntity(name, query);
        this.queryArr.push(query);
        return query;
    };
    UqMan.prototype.newBook = function (name, id) {
        var book = this.books[name];
        if (book !== undefined)
            return book;
        book = this.books[name] = new book_1.Book(this, name, id);
        this.setEntity(name, book);
        this.bookArr.push(book);
        return book;
    };
    UqMan.prototype.newMap = function (name, id) {
        var map = this.maps[name];
        if (map !== undefined)
            return map;
        map = this.maps[name] = new map_1.Map(this, name, id);
        this.setEntity(name, map);
        this.mapArr.push(map);
        return map;
    };
    UqMan.prototype.newHistory = function (name, id) {
        var history = this.histories[name];
        if (history !== undefined)
            return;
        history = this.histories[name] = new history_1.History(this, name, id);
        this.setEntity(name, history);
        this.historyArr.push(history);
        return history;
    };
    UqMan.prototype.newPending = function (name, id) {
        var pending = this.pendings[name];
        if (pending !== undefined)
            return;
        pending = this.pendings[name] = new pending_1.Pending(this, name, id);
        this.setEntity(name, pending);
        this.pendingArr.push(pending);
        return pending;
    };
    UqMan.prototype.newSheet = function (name, id) {
        var sheet = this.sheets[name];
        if (sheet !== undefined)
            return sheet;
        sheet = this.sheets[name] = new sheet_1.Sheet(this, name, id);
        this.setEntity(name, sheet);
        this.sheetArr.push(sheet);
        return sheet;
    };
    UqMan.prototype.newID = function (name, id) {
        var lName = name.toLowerCase();
        var idEntity = this.ids[lName];
        if (idEntity !== undefined)
            return idEntity;
        idEntity = this.ids[lName] = new ID_1.ID(this, name, id);
        this.setEntity(name, idEntity);
        this.idArr.push(idEntity);
        return idEntity;
    };
    UqMan.prototype.newIDX = function (name, id) {
        var lName = name.toLowerCase();
        var idx = this.idxs[lName];
        if (idx !== undefined)
            return idx;
        idx = this.idxs[lName] = new ID_1.IDX(this, name, id);
        this.setEntity(name, idx);
        this.idxArr.push(idx);
        return idx;
    };
    UqMan.prototype.newIX = function (name, id) {
        var lName = name.toLowerCase();
        var ix = this.ixs[lName];
        if (ix !== undefined)
            return ix;
        ix = this.ixs[lName] = new ID_1.IX(this, name, id);
        this.setEntity(name, ix);
        this.ixArr.push(ix);
        return ix;
    };
    UqMan.prototype.fromType = function (name, type) {
        var parts = type.split('|');
        type = parts[0];
        var id = Number(parts[1]);
        switch (type) {
            default:
                break;
            //case 'uq': this.id = id; break;
            case 'tuid':
                // Tuid should not be created here!;
                //let tuid = this.newTuid(name, id);
                //tuid.sys = false;
                break;
            case 'id':
                this.newID(name, id);
                break;
            case 'idx':
                this.newIDX(name, id);
                break;
            case 'ix':
                this.newIX(name, id);
                break;
            case 'action':
                this.newAction(name, id);
                break;
            case 'query':
                this.newQuery(name, id);
                break;
            case 'book':
                this.newBook(name, id);
                break;
            case 'map':
                this.newMap(name, id);
                break;
            case 'history':
                this.newHistory(name, id);
                break;
            case 'sheet':
                this.newSheet(name, id);
                break;
            case 'pending':
                this.newPending(name, id);
                break;
            case 'enum':
                this.newEnum(name, id);
                break;
        }
    };
    UqMan.prototype.fromObj = function (name, obj) {
        switch (obj['$']) {
            case 'sheet':
                this.buildSheet(name, obj);
                break;
        }
    };
    UqMan.prototype.buildSheet = function (name, obj) {
        var sheet = this.sheets[name];
        if (sheet === undefined)
            sheet = this.newSheet(name, obj.id);
        sheet.build(obj);
    };
    UqMan.prototype.buildFieldTuid = function (fields, mainFields) {
        if (fields === undefined)
            return;
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var f = fields_1[_i];
            var tuid = f.tuid;
            if (tuid === undefined)
                continue;
            var t = this.getTuid(tuid);
            if (t === undefined)
                continue;
            f._tuid = t.buildTuidBox();
        }
        var _loop_2 = function (f) {
            var owner = f.owner;
            if (owner === undefined)
                return "continue";
            var ownerField = fields.find(function (v) { return v.name === owner; });
            if (ownerField === undefined) {
                if (mainFields !== undefined) {
                    ownerField = mainFields.find(function (v) { return v.name === owner; });
                }
                if (ownerField === undefined) {
                    debugger;
                    throw new Error("owner field ".concat(owner, " is undefined"));
                }
            }
            var arr = f.arr, tuid = f.tuid;
            var t = this_1.getTuid(ownerField._tuid.tuid.name);
            if (t === undefined)
                return "continue";
            var div = t.div(arr || tuid);
            f._tuid = div && div.buildTuidDivBox(ownerField);
        };
        var this_1 = this;
        for (var _a = 0, fields_2 = fields; _a < fields_2.length; _a++) {
            var f = fields_2[_a];
            _loop_2(f);
        }
    };
    UqMan.prototype.buildArrFieldsTuid = function (arrFields, mainFields) {
        if (arrFields === undefined)
            return;
        for (var _i = 0, arrFields_1 = arrFields; _i < arrFields_1.length; _i++) {
            var af = arrFields_1[_i];
            var fields = af.fields;
            if (fields === undefined)
                continue;
            this.buildFieldTuid(fields, mainFields);
        }
    };
    UqMan.prototype.pullModify = function (modifyMax) {
        this.tuidsCache.pullModify(modifyMax);
    };
    UqMan.prototype.getUqKey = function () {
        var uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        return uqKey;
    };
    UqMan.prototype.getUqKeyWithConfig = function () {
        if (!this.config)
            return;
        var uqKey = this.uqName.split(/[-._]/).join('').toLowerCase();
        var _a = this.config, dev = _a.dev, alias = _a.alias;
        uqKey = (0, tool_1.capitalCase)(dev.alias || dev.name) + (0, tool_1.capitalCase)(alias !== null && alias !== void 0 ? alias : uqKey);
        return uqKey;
    };
    UqMan.prototype.hasEntity = function (name) {
        return this.entities[name] !== undefined
            || this.entities[name.toLowerCase()] !== undefined;
    };
    UqMan.prototype.createProxy = function () {
        var _this = this;
        var ret = new Proxy(this.entities, {
            get: function (target, key, receiver) {
                var lk = key.toLowerCase();
                if (lk[0] === '$') {
                    switch (lk) {
                        default: throw new Error("unknown ".concat(lk, " property in uq"));
                        case '$': return _this.$proxy;
                        case '$name': return _this.name;
                    }
                }
                var ret = target[lk];
                if (ret !== undefined)
                    return ret;
                var func = _this[key];
                if (func !== undefined)
                    return func;
                _this.errUndefinedEntity(String(key));
            }
        });
        this.proxy = ret;
        this.$proxy = new Proxy(this.entities, {
            get: function (target, key, receiver) {
                var lk = key.toLowerCase();
                var ret = target[lk];
                if (ret !== undefined)
                    return ret;
                var func = _this['$' + key];
                if (func !== undefined)
                    return func;
                _this.errUndefinedEntity(String(key));
            }
        });
        //this.idCache = new IDCache(this);
        return ret;
    };
    UqMan.prototype.errUndefinedEntity = function (entity) {
        var err = new Error("entity ".concat(this.name, ".").concat(entity, " not defined"));
        err.name = tool_1.UqError.undefined_entity;
        throw err;
    };
    UqMan.prototype.apiPost = function (api, resultType, apiParam) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (resultType === EnumResultType.sql)
                            api = 'sql-' + api;
                        return [4 /*yield*/, this.uqApi.post(IDPath(api), apiParam)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiActs = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, apiParam, i, ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        apiParam = {};
                        for (i in param) {
                            arr.push(i);
                            apiParam[i] = param[i].map(function (v) { return _this.buildValue(v); });
                        }
                        apiParam['$'] = arr;
                        return [4 /*yield*/, this.apiPost('acts', resultType, apiParam)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.buildValue = function (v) {
        if (!v)
            return v;
        var obj = {};
        for (var j in v) {
            var val = v[j];
            if (j === 'ID') {
                switch (typeof val) {
                    case 'object':
                        val = val.name;
                        break;
                }
            }
            else if (j === 'time') {
                if (val) {
                    if (Object.prototype.toString.call(val) === '[object Date]') {
                        val = val.getTime();
                    }
                }
            }
            else if (typeof val === 'object') {
                var id = val['id'];
                if (id === undefined) {
                    val = this.buildValue(val);
                }
                else {
                    val = id;
                }
            }
            obj[j] = val;
        }
        return obj;
    };
    UqMan.prototype.apiActIX = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IX, ID, values, IXs, apiParam, ret;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IX = param.IX, ID = param.ID, values = param.values, IXs = param.IXs;
                        apiParam = {
                            IX: entityName(IX),
                            ID: entityName(ID),
                            IXs: IXs === null || IXs === void 0 ? void 0 : IXs.map(function (v) { return ({ IX: entityName(v.IX), ix: v.ix }); }),
                            values: values === null || values === void 0 ? void 0 : values.map(function (v) { return _this.buildValue(v); }),
                        };
                        return [4 /*yield*/, this.apiPost('act-ix', resultType, apiParam)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiActIxSort = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IX, ix, id, after, apiParam;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IX = param.IX, ix = param.ix, id = param.id, after = param.after;
                        apiParam = {
                            IX: entityName(IX),
                            ix: ix,
                            id: id,
                            after: after,
                        };
                        return [4 /*yield*/, this.apiPost('act-ix-sort', resultType, apiParam)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqMan.prototype.apiActID = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, value, IX, ix, apiParam;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, value = param.value, IX = param.IX, ix = param.ix;
                        apiParam = {
                            ID: entityName(ID),
                            value: this.buildValue(value),
                            IX: IX === null || IX === void 0 ? void 0 : IX.map(function (v) { return entityName(v); }),
                            ix: ix === null || ix === void 0 ? void 0 : ix.map(function (v) { return _this.buildValue(v); }),
                        };
                        return [4 /*yield*/, this.apiPost('act-id', resultType, apiParam)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqMan.prototype.apiActDetail = function (param, resultType) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var _d, main, detail, detail2, detail3, postParam, ret;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _d = param, main = _d.main, detail = _d.detail, detail2 = _d.detail2, detail3 = _d.detail3;
                        postParam = {
                            main: {
                                name: entityName(main.ID),
                                value: toScalars(main.value),
                            },
                            detail: {
                                name: entityName(detail.ID),
                                values: (_a = detail.values) === null || _a === void 0 ? void 0 : _a.map(function (v) { return toScalars(v); }),
                            },
                        };
                        if (detail2) {
                            postParam.detail2 = {
                                name: entityName(detail2.ID),
                                values: (_b = detail2.values) === null || _b === void 0 ? void 0 : _b.map(function (v) { return toScalars(v); }),
                            };
                        }
                        if (detail3) {
                            postParam.detail3 = {
                                name: entityName(detail3.ID),
                                values: (_c = detail3.values) === null || _c === void 0 ? void 0 : _c.map(function (v) { return toScalars(v); }),
                            };
                        }
                        return [4 /*yield*/, this.apiPost('act-detail', resultType, postParam)];
                    case 1:
                        ret = _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UqMan.prototype.apiQueryID = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, IX, IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, IX = param.IX, IDX = param.IDX;
                        if (!IDX) {
                            IDX = [ID];
                        }
                        return [4 /*yield*/, this.apiPost('query-id', resultType, __assign(__assign({}, param), { ID: entityName(ID), IX: IX === null || IX === void 0 ? void 0 : IX.map(function (v) { return entityName(v); }), IDX: this.IDXToString(IDX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDTv = function (ids, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.apiPost('id-tv', resultType, ids)];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.syncUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.syncUser(user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UqMan.prototype.apiIDNO = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, stamp, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, stamp = param.stamp;
                        return [4 /*yield*/, this.apiPost('id-no', resultType, { ID: entityName(ID), stamp: stamp })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDDetailGet = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var id, main, detail, detail2, detail3, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = param.id, main = param.main, detail = param.detail, detail2 = param.detail2, detail3 = param.detail3;
                        return [4 /*yield*/, this.apiPost('id-detail-get', resultType, {
                                id: id,
                                main: entityName(main),
                                detail: entityName(detail),
                                detail2: entityName(detail2),
                                detail3: entityName(detail3),
                            })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.IDXToString = function (p) {
        if (Array.isArray(p) === true)
            return p.map(function (v) { return entityName(v); });
        return entityName(p);
    };
    UqMan.prototype.apiID = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('id', resultType, __assign(__assign({}, param), { IDX: this.IDXToString(IDX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiKeyID = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('key-id', resultType, __assign(__assign({}, param), { ID: entityName(ID), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(function (v) { return entityName(v); }) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIX = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IX, IX1, IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IX = param.IX, IX1 = param.IX1, IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('ix', resultType, __assign(__assign({}, param), { IX: entityName(IX), IX1: entityName(IX1), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(function (v) { return entityName(v); }) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIXValues = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IX = param.IX;
                        return [4 /*yield*/, this.apiPost('ix-values', resultType, __assign(__assign({}, param), { IX: entityName(IX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIXr = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IX, IX1, IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IX = param.IX, IX1 = param.IX1, IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('ixr', resultType, __assign(__assign({}, param), { IX: entityName(IX), IX1: entityName(IX1), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(function (v) { return entityName(v); }) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiKeyIX = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, IX, IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, IX = param.IX, IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('key-ix', resultType, __assign(__assign({}, param), { ID: entityName(ID), IX: entityName(IX), IDX: IDX === null || IDX === void 0 ? void 0 : IDX.map(function (v) { return entityName(v); }) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDLog = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('id-log', resultType, __assign(__assign({}, param), { IDX: entityName(IDX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDSum = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var IDX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        IDX = param.IDX;
                        return [4 /*yield*/, this.apiPost('id-sum', resultType, __assign(__assign({}, param), { IDX: entityName(IDX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDinIX = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, IX, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, IX = param.IX;
                        return [4 /*yield*/, this.apiPost('id-in-ix', resultType, __assign(__assign({}, param), { ID: entityName(ID), IX: entityName(IX) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDxID = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, IX, ID2, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID, IX = param.IX, ID2 = param.ID2;
                        return [4 /*yield*/, this.apiPost('id-x-id', resultType, __assign(__assign({}, param), { ID: entityName(ID), IX: entityName(IX), ID2: entityName(ID2) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqMan.prototype.apiIDTree = function (param, resultType) {
        return __awaiter(this, void 0, void 0, function () {
            var ID, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ID = param.ID;
                        return [4 /*yield*/, this.apiPost('id-tree', resultType, __assign(__assign({}, param), { ID: entityName(ID) }))];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    return UqMan;
}());
exports.UqMan = UqMan;
function ids(item) {
    if (!item)
        return;
    var len = item.length;
    if (len <= 1)
        return;
    var ret = [];
    for (var i = 0; i < len - 1; i++)
        ret.push(Number(item[i]));
    return ret;
}
function entityName(entity) {
    if (!entity)
        return;
    if (typeof entity === 'string')
        return entity;
    return entity.name;
}
function toScalars(value) {
    if (!value)
        return value;
    var ret = {};
    for (var i in value) {
        var v = value[i];
        if (typeof v === 'object')
            v = v['id'];
        ret[i] = v;
    }
    return ret;
}
//# sourceMappingURL=uqMan.js.map