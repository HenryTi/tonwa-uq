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
exports.IX = exports.UqIX = exports.IDX = exports.UqIDX = exports.ID = exports.UqID = void 0;
var entity_1 = require("./entity");
var UqIBase = /** @class */ (function (_super) {
    __extends(UqIBase, _super);
    function UqIBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UqIBase.prototype.setPermitRole = function (role) {
        this.permitRole = role;
    };
    return UqIBase;
}(entity_1.Entity));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var UqID = /** @class */ (function (_super) {
    __extends(UqID, _super);
    function UqID() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UqID.prototype, "typeName", {
        get: function () { return 'id'; },
        enumerable: false,
        configurable: true
    });
    UqID.prototype.NO = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uqApi.post('id-no', { ID: this.name })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    ;
    UqID.prototype.setKeys = function () {
        this.keys = this.schema.keys;
    };
    Object.defineProperty(UqID.prototype, "isGlobal", {
        get: function () {
            return this.schema.global;
        },
        enumerable: false,
        configurable: true
    });
    UqID.prototype.getIdFromObj = function (value) { return value['id']; };
    UqID.prototype.valueFromString = function (str) {
        if (!str)
            return undefined;
        var ret = {};
        this.unpackRow(ret, this.fields, str, 0, 12);
        return ret;
    };
    UqID.prototype.cacheTuids = function (defer) { };
    UqID.prototype.valueFromId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uq.QueryID({
                            ID: this,
                            id: [id]
                        })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret[0]];
                }
            });
        });
    };
    UqID.prototype.loadValuesFromIds = function (divName, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uq.QueryID({
                            IDX: [this],
                            id: ids
                        })];
                    case 1:
                        ret = _a.sent();
                        return [2 /*return*/, ret];
                }
            });
        });
    };
    UqID.prototype.cacheTuidFieldValues = function (value) { };
    UqID.prototype.unpackTuidIds = function (values) { return; };
    return UqID;
}(UqIBase));
exports.UqID = UqID;
var ID = /** @class */ (function (_super) {
    __extends(ID, _super);
    function ID() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ID;
}(UqID));
exports.ID = ID;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var UqIDX = /** @class */ (function (_super) {
    __extends(UqIDX, _super);
    function UqIDX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UqIDX.prototype, "typeName", {
        get: function () { return 'idx'; },
        enumerable: false,
        configurable: true
    });
    return UqIDX;
}(UqIBase));
exports.UqIDX = UqIDX;
var IDX = /** @class */ (function (_super) {
    __extends(IDX, _super);
    function IDX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IDX;
}(UqIDX));
exports.IDX = IDX;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var UqIX = /** @class */ (function (_super) {
    __extends(UqIX, _super);
    function UqIX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UqIX.prototype, "typeName", {
        get: function () { return 'ix'; },
        enumerable: false,
        configurable: true
    });
    return UqIX;
}(UqIBase));
exports.UqIX = UqIX;
var IX = /** @class */ (function (_super) {
    __extends(IX, _super);
    function IX() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IX;
}(UqIX));
exports.IX = IX;
/* eslint-enable no-unused-vars */
//# sourceMappingURL=ID.js.map